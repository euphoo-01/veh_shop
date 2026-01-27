<template>
  <section class="catalogue__list">
    <div class="catalogue__item" v-for="vehicle in vehicles" :key="vehicle.id">
      <div class="item__container">
        <img class="item__image" :src="vehicle.images[1]" :alt="`${vehicle.title} Image`" />
      </div>

      <h2>{{ vehicle.title }}</h2>
      <h2>
        <b>{{ vehicle.price }} $</b>
      </h2>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    vehicles: Array,
  },
};
</script>
<style>
.catalogue__list {
  display: flex;
  flex-flow: row wrap;
  padding: 16px;
  gap: 16px;
  margin: 0 auto;
  justify-content: center;
}

.catalogue__item {
  padding: 16px;
  transition: background-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.catalogue__item:hover {
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent);
  cursor: pointer;
}
.item__image {
  width: 100%;
  height: 100%;
  transform: scale(1.3);
}
.item__container {
  width: 230px;
  height: 230px;
  display: block;
  overflow: hidden;
}
</style>
