<template>
  <div class="col-12">
    <div class="row gx-2">
      <div class="col">
        <div v-if="!data[id].unlocked" class="card card-body">
          <span class="text-muted">{{ $t("locked") }}</span>
        </div>

        <div
          v-if="data[id].unlocked && data[id].status == 'owned'"
          class="card card-body"
        >
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <div class="row g-3">
                <div class="col-auto">
                  <span class="h6 text-light">{{ $t(data[id].id) }}</span>
                </div>
                <div
                  v-if="data[id].donor"
                  class="col-auto d-flex align-items-center small"
                >
                  <i class="fas fa-fw fa-star text-donor me-1"></i>
                  <span>{{ $t("donorStar") }}</span>
                </div>
                <div class="col-12 small">
                  <div class="row gy-2 gx-3">
                    <div class="col-auto text-light">
                      <div class="row g-1 align-items-center">
                        <div class="col-auto d-flex align-items-center">
                          <img
                            :src="
                              require(`../assets/interface/${data[id].resource1}.png`)
                            "
                            width="12"
                            height="12"
                          />
                        </div>
                        <div class="col-auto">
                          <span class="text-normal">{{
                            $t(data[id].resource1)
                          }}</span>
                        </div>
                        <div class="col-auto small">
                          <span
                            v-if="data[id].donor == false"
                            class="text-success"
                            >+25%</span
                          >
                          <span
                            v-if="data[id].donor == true"
                            class="fw-bold text-donor"
                            >+50%</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-auto text-light">
                      <div class="row g-1 align-items-center">
                        <div class="col-auto d-flex align-items-center">
                          <img
                            :src="
                              require(`../assets/interface/${data[id].resource2}.png`)
                            "
                            width="12"
                            height="12"
                          />
                        </div>
                        <div class="col-auto">
                          <span class="text-normal">{{
                            $t(data[id].resource2)
                          }}</span>
                        </div>
                        <div class="col-auto small">
                          <span
                            v-if="data[id].donor == false"
                            class="text-success"
                            >+25%</span
                          >
                          <span
                            v-if="data[id].donor == true"
                            class="fw-bold text-donor"
                            >+50%</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-12 col-md-6"
              v-if="data['overlordProgram'].count > 0"
            >
              <div v-if="data[id].subStatus == 'none'" class="row g-3">
                <div class="col-12 small">
                  <span>{{ $t("beforeChecking") }}</span>
                </div>
                <costs :costs="data[id].probeCosts" />
                <div class="col-12 text-end">
                  <button class="btn" @click="check(id)">
                    {{ $t("check") }}
                  </button>
                </div>
              </div>
              <div
                v-if="
                  data[id].subStatus == 'probed' && data[id].atmosphere == true
                "
                class="row g-3"
              >
                <div class="col-12 small">
                  <span>{{ $t("beforeTerraforming") }}</span>
                </div>
                <costs :costs="data[id].terraformCosts" />
                <div class="col-12 text-end">
                  <button class="btn" @click="terraform(id)">
                    {{ $t("terraform") }}
                  </button>
                </div>
              </div>
              <div
                v-if="
                  data[id].subStatus == 'probed' && data[id].atmosphere == false
                "
                class="row g-3"
              >
                <small class="text-normal">{{ $t("noAtmosphere") }}</small>
              </div>
              <div v-if="data[id].subStatus == 'terraformed'" class="row g-3">
                <div class="col-12 small">
                  <span>{{ $t("beforeStatue") }}</span>
                </div>
                <costs :costs="data[id].statueCosts" />
                <div class="col-12 text-end">
                  <button class="btn" @click="buildStatue(id)">
                    {{ $t("build") }}
                  </button>
                </div>
              </div>
              <div v-if="data[id].subStatus == 'statued'" class="row g-3">
                <small class="text-success text-uppercase">{{
                  $t("statueBuilt")
                }}</small>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="data[id].unlocked && data[id].status != 'owned'"
          class="card card-body"
        >
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <div class="row g-3">
                <div class="col-auto">
                  <span class="h6 text-light">{{ $t(data[id].id) }}</span>
                </div>
                <div
                  v-if="data[id].donor"
                  class="col-auto d-flex align-items-center small"
                >
                  <i class="fas fa-fw fa-star text-donor me-1"></i>
                  <span>{{ $t("donorStar") }}</span>
                </div>
                <div class="col-12 small">
                  <div>
                    <span class="text-normal">{{ $t("distance") }}</span>
                    <span class="ms-2 text-light">{{ data[id].distance }}</span>
                  </div>
                  <div>
                    <span class="text-normal">{{ $t("planets") }}</span>
                    <span class="ms-2 text-light">{{ data[id].planets }}</span>
                  </div>
                </div>
                <div class="col-12 small">
                  <div class="row gy-2 gx-3">
                    <div class="col-auto text-light">
                      <div class="row g-1">
                        <div class="col-auto d-flex align-items-center">
                          <img
                            :src="
                              require(`../assets/interface/${data[id].resource1}.png`)
                            "
                            width="12"
                            height="12"
                          />
                        </div>
                        <div class="col-auto">
                          <span class="text-normal">{{
                            $t(data[id].resource1)
                          }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto text-light">
                      <div class="row g-1">
                        <div class="col-auto d-flex align-items-center">
                          <img
                            :src="
                              require(`../assets/interface/${data[id].resource2}.png`)
                            "
                            width="12"
                            height="12"
                          />
                        </div>
                        <div class="col-auto">
                          <span class="text-normal">{{
                            $t(data[id].resource2)
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="row g-3">
                <costs v-if="data[id].count == 0" :costs="data[id].costs" />

                <div v-if="data[id].count > 0" class="col-12">
                  <div class="heading-6">{{ $t("stats") }}</div>
                  <div class="row g-1 gx-3">
                    <div class="col-auto">
                      <span class="small text-normal">{{ $t("power") }}</span>
                      <span class="ms-2 text-light">{{
                        getStarPower(id)
                      }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="small text-normal">{{ $t("defense") }}</span>
                      <span class="ms-2 text-light">{{
                        getStarDefense(id)
                      }}</span>
                    </div>
                    <div class="col-auto">
                      <span class="small text-normal">{{ $t("speed") }}</span>
                      <span class="ms-2 text-light">{{
                        getStarSpeed(id)
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row gx-1 gy-3 justify-content-end">
                    <div v-if="data[id].count == 0" class="col-auto">
                      <button class="btn" @click="build({ id: id, count: 1 })">
                        {{ $t("explore") }}
                      </button>
                    </div>
                    <div v-if="data[id].count > 0" class="col-auto">
                      <button
                        class="btn"
                        @click="
                          $root.activeStar = id;
                          $root.spyModal.show();
                        "
                      >
                        {{ $t("spy") }}
                      </button>
                    </div>
                    <div v-if="data[id].count > 0" class="col-auto">
                      <button
                        class="btn"
                        @click="
                          $root.activeStar = id;
                          $root.invadeModal.show();
                        "
                      >
                        {{ $t("invade") }}
                      </button>
                    </div>
                    <div v-if="data[id].count > 0" class="col-auto">
                      <button
                        class="btn"
                        @click="
                          $root.activeStar = id;
                          $root.absorbModal.show();
                        "
                      >
                        {{ $t("absorb") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Costs from "./Costs.vue";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  props: ["id"],
  components: {
    costs: Costs,
  },
  computed: {
    ...mapState(["data"]),
    ...mapGetters(["getStarPower", "getStarDefense", "getStarSpeed"]),
  },
  methods: {
    ...mapActions(["build", "check", "terraform", "buildStatue"]),
  },
};
</script>
