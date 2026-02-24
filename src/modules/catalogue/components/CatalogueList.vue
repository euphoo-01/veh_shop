<template>
  <section class="catalogue__list-wrapper">
    <TransitionGroup name="list__animation_wrapper" tag="div" class="catalogue__list">
      <v-card
        v-for="(vehicle, index) in vehicles"
        :key="vehicle.id"
        class="catalogue__item"
        @click="goToProductCard(vehicle.id)"
        elevation="0"
        color="transparent"
        rounded="0"
      >
        <div class="item__container">
          <v-img
            :src="vehicle.thumbnail"
            :alt="`${vehicle.title} Image`"
            class="item__image"
            cover
            :eager="index < 4"
            crossorigin="anonymous"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                <v-progress-circular indeterminate color="primary" size="24"></v-progress-circular>
              </div>
            </template>
          </v-img>
        </div>

        <div class="item__content mt-4 text-center">
          <h2 class="text-subtitle-1 font-weight-regular text-truncate mb-1">
            {{ `${vehicle.brand} ${vehicle.title}` }}
          </h2>
          <h2 class="text-h6 font-weight-bold">{{ vehicle.price }} $</h2>
        </div>
      </v-card>
    </TransitionGroup>
  </section>
</template>

<script setup lang="ts">
import type { ProductPreview, Product } from "@/modules/vehicle/types";
import { useRouter } from "vue-router";
import { toRefs } from "vue";

const props = defineProps<{ vehicles: ProductPreview<Product>[] }>();
const router = useRouter();

const { vehicles } = toRefs(props);

function goToProductCard(id: Product["id"]) {
  router.push({ name: "product", params: { id } });
}
</script>

<style scoped>
.catalogue__list-wrapper {
  width: 100%;
}

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
  transition:
    background-color 0.2s cubic-bezier(0.075, 0.82, 0.165, 1),
    outline 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 250px;
  cursor: pointer;
  outline: 1px solid transparent;
}

.catalogue__item:hover {
  background-color: color-mix(in srgb, var(--primary-color) 20%, transparent) !important;
  outline: 1px var(--primary-color) solid;
}

.item__container {
  width: 100%;
  aspect-ratio: 1;
  display: block;
  overflow: hidden;
}

.item__image {
  width: 100%;
  height: 100%;
  transform: scale(1.3);
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
