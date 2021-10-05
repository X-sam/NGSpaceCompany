<template>
  <div class="row g-3">
    <div
      v-for="maxCount in [
        { key: 50, func: countTo50, store: costTo50 },
        { key: 100, func: countTo100, store: costTo100 },
        { key: 250, func: countTo250, store: costTo250 },
      ]"
      :key="maxCount.key"
    >
      <div v-if="maxCount.func > 0" class="col-12">
        <div class="heading-6">
          <span>{{ $t(`costTo${maxCount.key}`) }}</span>
        </div>

        <div
          v-for="resource in [
            'titanium',
            'gold',
            'silicon',
            'meteorite',
            'ice',
          ]"
          class="row g-1"
          :key="resource"
        >
          <div class="col-auto d-flex align-items-center">
            <img
              :src="require(`../assets/interface/${resource}.png`)"
              width="12"
              height="12"
            />
          </div>
          <div class="col">
            <small class="text-light">{{ $t(resource) }}</small>
          </div>
          <div class="col-auto">
            <small
              class="text-uppercase"
              :class="{
                'text-light':
                  maxCount.store[resource].count <= data[resource].storage,
                'text-excess':
                  maxCount.store[resource].count <= getStorageCap(resource) &&
                  maxCount.store[resource].count > data[resource].storage,
                'text-danger':
                  maxCount.store[resource].count > getStorageCap(resource),
              }"
              >{{
                numeralFormat(
                  maxCount.store[resource].count.toPrecision(4),
                  "0.[000]a"
                )
              }}</small
            >
          </div>
          <div class="col-auto text-end" style="width: 75px">
            <small
              v-if="
                data[resource].prod <= 0 &&
                maxCount.store[resource].count > data[resource].count
              "
              class="text-normal"
              >---</small
            >
            <small
              v-if="maxCount.store[resource].count <= data[resource].count"
              class="text-success"
              ><i class="fas fa-fw fa-check"></i
            ></small>
            <small
              v-if="
                maxCount.store[resource].count > data[resource].count &&
                maxCount.store[resource].timer > 3600 * 24 * 2
              "
              class="text-timer"
              >{{ $t("bigTimer") }}</small
            >
            <small
              v-if="
                maxCount.store[resource].count > data[resource].count &&
                maxCount.store[resource].timer > 0 &&
                maxCount.store[resource].timer <= 3600 * 24 * 2
              "
              class="text-timer"
              role="timer"
              ><timer :value="maxCount.store[resource].timer"
            /></small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Timer from "./Timer.vue";

import { costToX } from "@/helpers/costToXSegment";

export default {
  components: {
    timer: Timer,
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters(["getStorageCap"]),

    countTo50: function () {
      return 50 - this.data["segment"].count;
    },
    countTo100: function () {
      return 100 - this.data["segment"].count;
    },
    countTo250: function () {
      return 250 - this.data["segment"].count;
    },

    costTo50: function () {
      return costToX(50, this.data);
    },
    costTo100: function () {
      return costToX(100, this.data);
    },
    costTo250: function () {
      return costToX(250, this.data);
    },
  },
  methods: {},
};
</script>
