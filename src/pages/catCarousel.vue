<template class="bg-white">
  <q-card flat class="col q-gutter-y-xs">
    <div class="flex flex-center text-align-center">
      <q-input
        outlined
        rounded
        debounce="300"
        v-model="pagination.filter"
        placeholder="Type Breed Name and hit enter"
        style="min-width: 150px; width:400px; max-width:95vw"
        class="q-mb-md col-md-2 col-lg-2 col-xl-2 col-xs-12"
        @keyup.enter="() => onRequest(pagination)"
        @input="() => onRequest(pagination)"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="row  col-12 text-white gradientBg" v-if="tableData.length">
      <q-card-section
        side
        v-show="$q.screen.gt.sm"
        class="col-4 col-md-4 col-lg-4 col-xl-4 col-xs-12 float-left q-gutter-xs  textFont"
        style="height: 60vh"
      >
        <template>
          <div class="row q-gutter-sm" v-for="col in columns" :key="col.name">
            <a
              v-if="col.name === 'wikipedia_url'"
              :href="tableData[slide - 1].wikipedia_url"
              class=" text-amber q-mt-sm q-pl-sm"
              target="_blank"
            >
              For More Information
            </a>
            <div v-else class="row q-gutter-sm">
              <q-item-label class="text-weight-bold"
                >{{ col.label }}:</q-item-label
              >
              <q-item-label class="q-pt-xs"
                >{{
                  tableData[slide - 1] && tableData[slide - 1][col && col.name]
                }}
                {{ col.name === "life_span" ? "Years" : "" }}</q-item-label
              >
            </div>
          </div>
        </template>
        <template>
          <q-list class="row q-gutter-sm">
            <q-item v-for="quality in Object.keys(ratingLabels)" :key="quality">
              <q-item-section class=" row">
                {{ ratingLabels[quality] }}
                <q-rating
                  v-model="tableData[slide - 1][quality]"
                  readonly
                  color="yellow"
                  size="18"
                ></q-rating>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-card-section>
      <q-carousel
        class="col-md-8 col-lg-8 col-xl-8 col-xs-12  "
        swipeable
        animated
        v-model="slide"
        :autoplay="autoplay"
        ref="carousel"
        infinite
        thumbnails
        style="max-width:94.5vw; "
        height="50vh"
        :style="
          $q.screen.gt.xs
            ? 'border-left: 3px solid #1976D2; height:80vh'
            : 'height:50vh'
        "
      >
        <q-carousel-slide
          v-for="(col, colIndex) in tableData"
          :key="col.name"
          :name="colIndex + 1"
          class="column no-wrap"
          :img-src="
            (tableData[colIndex].image && tableData[colIndex].image.url) ||
              './placeholder.png'
          "
        >
        </q-carousel-slide>

        <template v-slot:control>
          <q-carousel-control
            position="top-right"
            :offset="$q.screen.gt.xs ? [18, 18] : [18, 0]"
            class="text-white rounded-borders"
            style="background: rgba(0, 0, 0, .3); padding: 4px 8px;"
          >
            <q-toggle
              dense
              dark
              color="blue-8"
              v-model="autoplay"
              label="Auto Play"
            />
          </q-carousel-control>

          <q-carousel-control
            position="bottom-right"
            :offset="$q.screen.gt.xs ? [18, 18] : [18, 0]"
            class="q-gutter-xs"
          >
            <q-btn
              push
              round
              dense
              color="blue-8"
              text-color="white"
              icon="arrow_left"
              @click="$refs.carousel.previous()"
            />
            <q-btn
              push
              round
              dense
              color="blue-9"
              text-color="white"
              icon="arrow_right"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </template>
      </q-carousel>
      <q-card-section
        v-if="$q.screen.lt.sm"
        class="  col-xs-12 float-left q-gutter-sm"
      >
        <div class="row q-gutter-sm">
          <q-item-label class="text-weight-bold">{{ "Name" }}:</q-item-label>
          <q-item-label class="q-pt-xs">{{
            tableData[slide - 1].name
          }}</q-item-label>
        </div>
        <div class="row q-gutter-sm">
          <q-item-label class="text-bold">{{ "Description" }}: </q-item-label>
          <q-item-label class="q-pt-xs "
            >{{ tableData[slide - 1].description }}
            <q-tooltip
              max-height="100%"
              v-if="tableData[slide - 1].description.length >= 120"
              max-width="40%"
            >
              <div class="tooltip-content">
                {{ tableData[slide - 1].description }}
              </div>
            </q-tooltip></q-item-label
          >
        </div>
        <a
          :href="tableData[slide - 1].wikipedia_url"
          class=" text-white q-mt-sm q-pl-sm"
          style="text-decoration: none;"
          target="_blank"
        >
          <q-btn
            color="blue-grey-10"
            class="text-white"
            dark
            unelevated
            size="md"
            label="Wikipedia"
          />
          <!-- For More Information -->
        </a>
      </q-card-section>
    </div>
    <div v-else>No Data Available</div>
    <q-separator color="primary" spaced="2px" size="3px" />
    <div class="row text-center col-10 ">
      <!-- <q-input
        outlined
        dense
        debounce="300"
        v-model="pagination.filter"
        placeholder="Type and hit enter"
        style="min-width: 150px;"
        class="q-mb-md col-md-2 col-lg-2 col-xl-2 col-xs-12"
        @keyup.enter="() => onRequest(pagination)"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input> -->
      <q-space />
      <q-input
        class="q-mb-md col-md-2 col-lg-2 col-xl-2 col-xs-12"
        v-model="pagination.rowsPerPage"
        label="Breed per Page"
        dense
        outlined
        debounce="500"
        @input="() => onRequest(pagination)"
        @keyup.enter="() => onRequest(pagination)"
      />
      <q-pagination
        class="q-mb-md"
        :class="$q.screen.gt.xs ? 'q-px-xl' : ''"
        v-model="pagination.page"
        :max="pagination.pageCount"
        :max-pages="$q.screen.lt.sm ? 4 : 20"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
        @input="
          () => {
            this.onRequest(pagination);
          }
        "
      />
    </div>
    <q-dialog persistent full-height v-model="spinner" :maximized="true">
      <q-card class="column full-height transparent">
        <q-card-section class="col q-pt-none">
          <div class="q-gutter-md absolute-center z-max">
            <div>
              <q-spinner-clock color="primary" size="5em" />
              <span class="text-white">
                {{ "Please wait While Data is getting Loaded...." }}
              </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapActions } from "vuex";
import _ from "lodash";

@Component({
  methods: {
    ...mapActions("cat", ["getBreeds", "getFilteredBreed"])
  }
})
export default class Cat extends Vue {
  data() {
    return {
      autoplay: false,
      slide: 1,
      spinner: false,
      filter: "",
      tableData: [],
      columns: [
        {
          name: "name",
          label: "Name"
        },
        {
          name: "description",
          label: "Description"
        },
        {
          name: "origin",
          label: "Origin"
        },
        {
          name: "life_span",
          label: "Life Span"
        },
        {
          name: "temperament",
          label: "Temperament"
        },
        {
          name: "child_friendly",
          label: "Child Friendly"
        },
        {
          name: "wikipedia_url",
          label: "wikipedia"
        }
      ],
      pagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 1000,
        pageCount: 1,
        filter: ""
      },
      ratingLabels: {
        affection_level: "Affection Level",
        adaptability: "Adaptability",
        child_friendly: "Child Friendly",
        energy_level: "Energy Level",
        health_issues: "Health Issues",
        intelligence: "Intelligence",
        social_needs: "Social Needs",
        stranger_friendly: "Stranger Friendly"
      },
      rowsPerPage: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      contentStyle: {
        backgroundColor: "#ffffff",
        color: "#ffffff"
      },

      contentActiveStyle: {
        backgroundColor: "#ffffff",
        color: "black"
      },

      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "10px",
        opacity: 0.75
      }
    };
  }

  get catBreedData() {
    return this.tableData;
  }

  set catBreedData(val) {
    this.tableData = val;
  }

  created() {
    this.getBreed(
      { page: 0, limit: 10 },
      {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 1000
      }
    );
  }

  async getBreed(params = {}) {
    this.spinner = true;
    const result = await this.getBreeds(params);
    this.pagination = {
      ...this.pagination,
      page: Number(result.headers?.["pagination-page"]) + 1,
      rowsPerPage: Number(result.headers?.["pagination-limit"]),
      pageCount:
        Number(result.headers?.["pagination-count"]) /
        Number(result.headers?.["pagination-limit"]),
      rowsNumber: Number(result.headers?.["pagination-count"])
    };
    this.spinner = false;
    this.tableData = result.data;
  }

  async onRequest(props) {
    this.spinner = true;
    const params = {
      page: props?.page - 1,
      limit: props?.rowsPerPage
    };
    if (props?.filter?.length) {
      params["q"] = props?.filter;
      const tbldata = await this.getFilteredBreed(params);
      this.pagination = {
        ...this.pagination,
        page: Number(tbldata?.page) + 1,
        rowsPerPage: Number(tbldata?.rowsPerPage),
        pageCount: Number(tbldata?.rowNumber) / Number(tbldata?.rowsPerPage)
      };
      this.tableData = tbldata.data;
      this.spinner = false;
    } else this.getBreed(params);
  }
  getimageStyle(col) {
    return "width: 300px; max-width:80vw";
  }
}
</script>

<style scoped>
.custom-caption {
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.gradientBg {
  background: linear-gradient(to right, #1449c4, #ff919a, #34c3eb);
}
.textFont {
  font-size: 15px;
}
.q-item-label {
  padding: 0%;
}
</style>
