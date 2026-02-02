<template>
  <main class="account">
    <Transition name="fade-left"
      ><ErrorBubble v-if="error.message" :error="error" :onCleanup="clearError"></ErrorBubble
    ></Transition>
    <h1 class="account_title">Account</h1>
    <IconSVG v-if="isLoading" class="account__spinner" of="spinner" size="extralarge" />

    <section v-else class="account__info">
      <div class="account__info info__column">
        <div class="account__info info__row">
          <img
            class="account__image"
            :src="userData.image"
            :alt="`${userData.username} Avatar`"
            crossorigin="anonymous"
          />
          <div class="account__info info__column">
            <p><b>Firstname: </b>{{ userData.firstName }}</p>
            <p><b>Lastname: </b>{{ userData.lastName }}</p>
            <p><b>Gender: </b>{{ userData.gender }}</p>
          </div>
        </div>
        <div class="account__info info__row">
          <div class="account__info info__column">
            <h3>Address</h3>
            <p><b>Full Address: </b> {{ userData.address.address }}</p>
            <p><b>City: </b> {{ userData.address.city }}</p>
            <p><b>State: </b> {{ userData.address.state }}</p>
            <p><b>Postal: </b> {{ userData.address.postalCode }}</p>
          </div>
          <div class="account__info info__column">
            <h3>Payment Methods</h3>
            <div class="info__payment info__row">
              <IconSVG class="info__icon" of="card" size="large" />
              <p v-if="userData.bank">
                {{ `**** **** **** ${userData.bank.cardNumber.slice(-4)}` }}
              </p>
            </div>
            <div class="info__payment info__row">
              <IconSVG class="info__icon" of="bitcoin" size="large" />
              <p v-if="userData.crypto">
                {{ userData.crypto.wallet }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="account__settings info__column">
        <h3 class="settings__title">Settings</h3>
        <label for="select-theme">Change theme:</label>
        <SelectUI placeholder="Change theme:" name="select-theme" v-model="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </SelectUI>
        <ButtonUI class="settings__logout" @click="logout" primary>Log Out</ButtonUI>
      </div>
    </section>
  </main>
</template>
<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';
import SelectUI from '@/components/ui/SelectUI.vue';
import IconSVG from '@/components/IconSVG.vue';
import ErrorBubble from '@/components/ErrorBubble.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: { ButtonUI, ErrorBubble, IconSVG, SelectUI },
  methods: {
    ...mapActions({
      logout: 'user/logout',
      getDetailedUserData: 'user/getDetailedUserData',
    }),
    ...mapMutations({ clearError: 'user/clearError', setTheme: 'settings/setTheme' }),
  },
  computed: {
    ...mapGetters({
      error: 'user/error',
      userData: 'user/userData',
      isLoading: 'user/isLoading',
      currentTheme: 'settings/currentTheme',
    }),
    theme: {
      get() {
        return this.currentTheme;
      },
      set(value) {
        this.setTheme(value);
      },
    },
  },
  async mounted() {
    await this.getDetailedUserData();
  },
};
</script>
<style>
.account__info {
  display: flex;
  position: relative;
  height: 100%;
  flex-flow: row wrap;
  flex: 3;
  justify-content: center;
}
.info__column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
  margin-bottom: 16px;
  line-height: 1;
  min-width: fit-content;
}
.account__image {
  max-width: 250px;
  max-height: 250px;
}
.info__row {
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
  align-items: flex-start;
  width: 100%;
}
.info__payment {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}
.info__payment p {
  margin: 0;
  word-break: break-all;
  overflow-wrap: anywhere;
}
.info__icon {
  flex-shrink: 0;
}
.account__spinner {
  margin: 64px auto;
  display: block;
  width: fit-content;
}
.account__settings {
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  gap: 16px;
  flex: 1;
  background-color: color-mix(in srgb, var(--secondary-color) 10%, var(--background-color));
  height: 100vh;
  padding: 16px;
  height: auto;
  margin-left: 16px;
}
</style>
