<template>
  <div class="account__info w-100">
    <v-row class="mb-4" align="start">
      <v-col cols="12" sm="auto" class="d-flex justify-center justify-sm-start">
        <v-img
          :src="user?.image"
          :alt="`${user?.username} Avatar`"
          width="150"
          height="150"
          cover
          crossorigin="anonymous"
          class="account__image rounded"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </template>
        </v-img>
      </v-col>

      <v-col
        cols="12"
        sm="auto"
        class="d-flex flex-column ga-2 justify-center pt-4 pt-sm-0"
        alignSelf="center"
      >
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">Firstname: </strong>{{ user?.firstName }}
        </p>
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">Lastname: </strong>{{ user?.lastName }}
        </p>
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">Gender: </strong>{{ user?.gender }}
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6" class="d-flex flex-column ga-2">
        <h3 class="text-h6 font-weight-bold mb-2">Address</h3>
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">Full Address: </strong> {{ user?.address?.address }}
        </p>
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">City: </strong> {{ user?.address?.city }}
        </p>
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">State: </strong> {{ user?.address?.state }}
        </p>
        <p class="text-body-1 mb-0">
          <strong class="font-weight-bold">Postal: </strong> {{ user?.address?.postalCode }}
        </p>
      </v-col>

      <v-col cols="12" md="6" class="d-flex flex-column ga-2">
        <h3 class="text-h6 font-weight-bold mb-2">Payment Methods</h3>
        <div class="d-flex align-center ga-2 text-body-1">
          <v-icon icon="mdi-credit-card" size="large"></v-icon>
          <span v-if="user?.bank">
            {{ `**** **** **** ${user.bank.cardNumber.slice(-4)}` }}
          </span>
        </div>
        <div class="d-flex align-center ga-2 text-body-1">
          <v-icon icon="mdi-bitcoin" size="large"></v-icon>
          <span v-if="user?.crypto">
            {{ user.crypto.wallet }}
          </span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const { user } = toRefs(props);
</script>

<style scoped></style>
