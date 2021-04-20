<template>
  <q-layout view="lhh Lpr lFf" class="col-12">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title :class="$q.screen.lt.sm ? 'three-lines' : ''">
          Animal Classification App
        </q-toolbar-title>

        <span v-if="$q.screen.gt.xs" class="text-h6 q-mr-lg"
          >Current View:
        </span>
        <!-- hide-bottom-space -->
        <q-select
          v-if="$q.screen.gt.xs"
          v-model="pageView"
          dense
          :options="pageViewList"
          style="max-width: 200px;width:25vw"
          :label="$q.screen.lt.sm ? 'Page View' : ''"
          label-color="white"
          borderless
          class="text-white;bg-green"
          color="blue-9"
          @input="val => togglePageView(pageView)"
          ><template v-slot:selected
            ><span class="text-h5 q-pb-sm" style="color:white;font-weight: bold">{{
              pageView
            }}</span></template
          ></q-select
        >
        <div class="row" clickable v-else>
          <q-chip color="green" class="q-mr-none">
            {{ pageView }} View
          </q-chip>
        </div>
        <q-btn
          round
          flat
          size="md"
          icon="more_vert"
          class="float-right q-ma-none q-pa-none"
        >
          <q-menu :offset="[50, 5]">
            <q-list style="max-width: 180px">
              <q-item
                dense
                clickable
                v-close-popup
                v-for="view in pageViewList"
                :key="view"
                @click="
                  pageView = view;
                  togglePageView(pageView);
                "
              >
                <q-item-section v-model="pageView">
                  {{ view }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-tooltip>
            <div class="tooltip-content">
              Page View
            </div>
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container style="max-width:100vw">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
// import EssentialLink from "components/EssentialLink.vue";

import Vue from "vue";
import Component from "vue-class-component";
import { mapMutations } from "vuex";

@Component({
  methods: {
    ...mapMutations("cat", ["togglePageView"])
  }
})
export default class MainLayout extends Vue {
  data() {
    return {
      pageView: "Table",
      pageViewList: ["Table", "Card"]
    };
  }
}
</script>
<style scoped>
.header {
  background: linear-gradient(to left, #82b6f5, #0716bb);
  background-color: #00930c;
  color: aliceblue;
}
.my-menu-link {
  color: red;
  background: #04acca;
}
</style>
