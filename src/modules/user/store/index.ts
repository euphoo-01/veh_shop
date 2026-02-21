import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { networker, NetworkError } from "@/modules/shared/services/networker";
import { loginUser, getUserData } from "@/modules/user/services/api";
import router from "@/app/config/router";
import type { User } from "@/modules/user/types";

const defaultUser: User = {
  id: 0,
  username: "unknown",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: "",
  address: {
    address: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
  },
};

export const useUserStore = defineStore("user", () => {
  const user = ref<User>({ ...defaultUser });
  const accessToken = ref<string>(localStorage.getItem("accessToken") || "");
  const refreshToken = ref<string>(localStorage.getItem("refreshToken") || "");
  const isAuthorized = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const error = ref<{ status: number | null; message: string | null }>({
    status: null,
    message: null,
  });

  function setTokens(newAccess: string, newRefresh: string) {
    accessToken.value = newAccess;
    refreshToken.value = newRefresh;
    localStorage.setItem("accessToken", newAccess);
    localStorage.setItem("refreshToken", newRefresh);
    isAuthorized.value = true;
  }

  function clearSession() {
    user.value = { ...defaultUser };
    accessToken.value = "";
    refreshToken.value = "";
    isAuthorized.value = false;
    error.value = { status: null, message: null };
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  function setError(status: number, message: string) {
    error.value = { status, message };
  }

  function clearError() {
    error.value = { message: null, status: null };
  }

  async function logout() {
    clearSession();
    await router.push({ name: "login" });
  }

  networker.setAuthHandlers({
    getAccessToken: () => accessToken.value || null,
    getRefreshToken: () => refreshToken.value || null,
    onSessionRefreshed: (newAccess, newRefresh) => {
      setTokens(newAccess, newRefresh);
    },
    onSessionExpired: () => {
      logout();
    },
  });

  async function login(formData: { login: string; password: string }) {
    isLoading.value = true;
    error.value = { status: null, message: null };

    const result = await loginUser(networker, formData.login, formData.password);

    if (result instanceof NetworkError) {
      if (result.status === 400) {
        setError(result.status, "Couldn't find the user credentials.");
      } else {
        setError(result.status, result.message);
      }
      isLoading.value = false;
      return;
    }

    setTokens(result.accessToken, result.refreshToken);
    user.value = {
      id: result.id,
      username: result.username,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      gender: result.gender,
      image: result.image,
      address: result.address,
    };

    isLoading.value = false;
    router.push({ name: "account", params: { username: user.value.username } });
  }

  async function getDetailedUserData() {
    isLoading.value = true;
    const result = await getUserData(networker);

    if (result instanceof NetworkError) {
      setError(result.status, result.message);
      isAuthorized.value = false;
    } else {
      user.value = result;
      isAuthorized.value = true;
    }
    isLoading.value = false;
  }

  async function initSession() {
    if (!accessToken.value && !refreshToken.value) {
      return;
    }
    await getDetailedUserData();
  }

  const username = computed(() => user.value.username);
  const userData = computed(() => user.value);

  return {
    user,
    accessToken,
    refreshToken,
    isAuthorized,
    isLoading,
    error,
    clearError,
    setError,
    username,
    userData,
    login,
    logout,
    initSession,
    getDetailedUserData,
  };
});
