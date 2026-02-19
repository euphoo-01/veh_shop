<template>
  <div class="account__info info__column">
    <div class="account__info info__row">
      <img
        class="account__image"
        :src="userData?.image"
        :alt="`${userData?.username} Avatar`"
        crossorigin="anonymous"
      />
      <div class="account__info info__column">
        <p><b>Firstname: </b>{{ userData?.firstName }}</p>
        <p><b>Lastname: </b>{{ userData?.lastName }}</p>
        <p><b>Gender: </b>{{ userData?.gender }}</p>
      </div>
    </div>
    <div class="account__info info__row">
      <div class="account__info info__column">
        <h3>Address</h3>
        <p><b>Full Address: </b> {{ userData?.address?.address }}</p>
        <p><b>City: </b> {{ userData?.address?.city }}</p>
        <p><b>State: </b> {{ userData?.address?.state }}</p>
        <p><b>Postal: </b> {{ userData?.address?.postalCode }}</p>
      </div>
      <div class="account__info info__column">
        <h3>Payment Methods</h3>
        <div class="info__payment info__row">
          <IconSVG class="info__icon" of="card" size="large" />
          <p v-if="userData?.bank">
            {{ `**** **** **** ${userData.bank.cardNumber.slice(-4)}` }}
          </p>
        </div>
        <div class="info__payment info__row">
          <IconSVG class="info__icon" of="bitcoin" size="large" />
          <p v-if="userData?.crypto">
            {{ userData.crypto.wallet }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconSVG from "@/components/IconSVG.vue";

export default {
  name: "AccountDetails",
  components: {
    IconSVG,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
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
</style>
