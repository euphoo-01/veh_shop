<template>
  <section class="catalogue__list">
    <TransitionGroup name="list__animation_wrapper">
      <div class="catalogue__item" v-for="vehicle in vehicles" :key="vehicle.id">
        <div class="item__container">
          <img class="item__image" :src="vehicle.thumbnail" :alt="`${vehicle.title} Image`" />
        </div>

        <h2>{{ vehicle.title }}</h2>
        <h2>
          <b>{{ vehicle.price }} $</b>
        </h2>
      </div>
    </TransitionGroup>
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

.list__animation_wrapper-move,
.list__animation_wrapper-enter-active,
.list__animation_wrapper-leave-active {
  transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.list__animation_wrapper-leave-active {
  position: absolute;
}

.list__animation_wrapper-enter-from,
.list__animation_wrapper-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
