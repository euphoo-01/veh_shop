<template>
  <div>
    <h1>Account</h1>
    <p>Hello, {{ firstName }}</p>
    <ButtonUI @click="logout" primary>Log Out</ButtonUI>
  </div>
</template>
<script>
import ButtonUI from '@/components/ui/ButtonUI.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { ButtonUI },
  methods: {
    ...mapActions({ logout: 'user/logout' }),
  },
  computed: {
    ...mapGetters({ firstName: 'user/firstName' }),
  },
};
</script>
<style></style>
