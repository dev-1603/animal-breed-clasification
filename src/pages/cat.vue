<template class="bg-white flex-center">
  <q-card outlined>
    <q-table
      dense
      row-key="cursor"
      :filter="filter"
      :data="catBreedData"
      :columns="tableColumns"
      binary-state-sort
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="rowsPerPage"
      class="my-sticky-header-column-table sticky-table-index col-xs-12"
      grid
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top>
        <span class="q-ma-xs text-h3 table-title">{{ "Cat Breeds" }}</span>
        <q-space />
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Type and hit enter"
          style="min-width: 150px;"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <!-- Grid Data display -->
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card class="title-card" v-if="tableData.length">
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.name">
                <q-item-section side>
                  <div v-if="col.name === 'image'" class="col-11">
                    <q-img
                      :src="props.row[col.name] && props.row[col.name].url"
                      :ratio="
                        props.row[col.name] &&
                          Number(props.row[col.name].width) /
                            Number(props.row[col.name].height)
                      "
                      :style="
                        `width: ${
                          $q.screen.lt.sm ? 85 + 'vw' : 320 + 'px'
                        }; height: ${(props.row[col.name] &&
                          Number(props.row[col.name].height)) ||
                          200}px;max-height: 300px; max-width:90vw`
                      "
                      basic
                      alt="./placeholder.png"
                      spinner-color="white"
                      class="rounded-borders"
                    >
                      <template v-slot:default>
                        <q-img
                          v-if="
                            !props.row[col.name] || !props.row[col.name].url
                          "
                          :ratio="1"
                          style="height:200px"
                          src="/placeholder.png"
                        /> </template
                    ></q-img>
                  </div>
                  <div v-else-if="col.name === 'wikipedia_url'">
                    <a
                      :href="props.row[col.name]"
                      target="_blank"
                      class=" text-amber q-mt-sm q-pl-sm"
                    >
                      For More Information
                    </a>
                  </div>
                  <div
                    v-else-if="col.name === 'name'"
                    class="row q-gutter-x-xl q-mt-sm"
                  >
                    <q-item-label class="text-weight-bold"
                      >{{ col.label }}:</q-item-label
                    >
                    <q-space></q-space>
                    <q-item-label>{{ props.row[col.name] }}</q-item-label>
                  </div>

                  <div v-else class="col">
                    <q-item-label class="text-bold"
                      >{{ col.label }}:</q-item-label
                    >
                    <q-item-label
                      class="q-my-sm col-12"
                      :class="
                        props.row[col.name].length >= 120
                          ? 'size-word-wrap three-lines'
                          : ''
                      "
                      >{{ props.row[col.name] }}
                      <q-tooltip
                        max-height="100%"
                        v-if="props.row[col.name].length >= 120"
                        max-width="40%"
                      >
                        <div class="tooltip-content">
                          {{ props.row[col.name] }}
                        </div>
                      </q-tooltip></q-item-label
                    >
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
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
      loading: false,
      spinner: false,
      filter: "",
      tableData: [],
      tableColumns: [
        {
          name: "image",
          align: "center",
          label: "image",
          field: row => row.image,
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "description",
          label: "Description",
          field: row => row.description,
          sortable: true
        },
        {
          name: "wikipedia_url",
          label: "wikipedia",
          field: row => row.wikipedia_url
        }
      ],
      pagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 1000
      },
      rowsPerPage: [5, 10, 20, 30, 50, 100, 200, 300, 400, 500],
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
      rowsNumber: Number(result.headers?.["pagination-count"])
    };
    this.tableData = result.data;
    this.spinner = false;
  }

  async onRequest(props) {
    this.spinner = true;
    const params = {
      page: props?.pagination?.page - 1,
      limit: props?.pagination?.rowsPerPage
    };
    if (props?.filter?.length) {
      params["q"] = props?.filter;
      const tbldata = await this.getFilteredBreed(params);
      this.pagination = {
        ...this.pagination,
        page: Number(tbldata?.page) + 1,
        rowsPerPage: Number(tbldata?.rowsPerPage),
        rowsNumber: Number(tbldata?.rowNumber)
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

<style></style>
