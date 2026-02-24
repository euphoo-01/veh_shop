<template>
  <v-container class="account fill-height align-start">
    <v-fade-transition hide-on-leave>
      <v-alert
        v-if="error.message"
        type="error"
        :text="error.message"
        closable
        variant="tonal"
        @click:close="clearError"
        class="mb-4 w-100"
        rounded="0"
      ></v-alert>
    </v-fade-transition>

    <h1 class="text-h4 font-weight-bold mb-8 w-100">Account</h1>

    <div v-if="isLoading" class="d-flex justify-center w-100 my-16">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <v-row v-else class="account__container w-100 ma-0">
      <v-col cols="12" md="9">
        <AccountDetails :user="user" />
      </v-col>
      <v-col cols="12" md="3" class="d-flex justify-end">
        <AccountSettings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AccountDetails from "@/modules/account/components/AccountDetails.vue";
import AccountSettings from "@/modules/account/components/AccountSettings.vue";
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const userStore = useUserStore();

const { error, user, isLoading } = storeToRefs(userStore);
const { getDetailedUserData, clearError } = userStore;

onMounted(async () => {
  await getDetailedUserData();
});
</script>

<style scoped></style>
