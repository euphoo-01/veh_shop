<template>
  <section class="account__wrapper">
    <Transition name="fade-left"
      ><ErrorBubble v-if="error.message" :error="error" :onCleanup="clearError"></ErrorBubble
    ></Transition>

    <IconSVG v-if="isLoading" class="account__spinner" of="spinner" size="extralarge" />
    <section v-else class="account__info">
      <h1 class="account_title">{{ userData.username }}'s Account</h1>
      <div class="account__info info__row">
        <img class="account__image" :src="userData.image" :alt="`${userData.username} Avatar`" />
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
          <div class="account__info info__row">
            <IconSVG class="info__icon" of="card" size="large" />
            <p v-if="userData.bank">
              {{ `**** **** **** ${userData.bank.cardNumber.slice(-4)}` }}
            </p>
          </div>
          <div class="account__info info__row">
            <IconSVG class="info__icon" of="bitcoin" size="large" />
            <p v-if="userData.crypto">
              {{ userData.crypto.wallet }}
            </p>
          </div>
        </div>
      </div>
      <div class="account__info info__row"></div>
      <ButtonUI class="account_logout" @click="logout" primary>Log Out</ButtonUI>
    </section>
  </section>
</template>
<script>
// TODO: Настройка для смены темы
import ButtonUI from '@/components/ui/ButtonUI.vue';
import IconSVG from '@/components/IconSVG.vue';
import ErrorBubble from '@/components/ErrorBubble.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: { ButtonUI, ErrorBubble, IconSVG },
  methods: {
    ...mapActions({ logout: 'user/logout', getDetailedUserData: 'user/getDetailedUserData' }),
    ...mapMutations({ clearError: 'user/clearError' }),
  },
  computed: {
    ...mapGetters({ error: 'user/error', userData: 'user/userData', isLoading: 'user/isLoading' }),
  },
  async mounted() {
    await this.getDetailedUserData();
  },
};
</script>
<style>
.account__info {
  display: flex;
  flex-flow: column wrap;
}
.info__column {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0;
  margin-bottom: 16px;
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
  line-height: 0px;
}
.account__spinner {
  margin: 64px auto;
  display: block;
  width: fit-content;
}
</style>
