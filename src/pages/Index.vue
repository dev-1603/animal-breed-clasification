<template>
  <div>
    <cat v-show="pageView === 'Table'" />
    <catCarousel class="title-card q-mt-sm" v-show="pageView === 'Card'" />
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

@Component({
  components: {
    cat: () => import("./cat"),
    catCarousel: () => import("./catCarousel")
  },
  computed: {
    ...mapGetters("cat", ["currentPageView"])
  },
  methods: {
    ...mapMutations("cat", ["allCats"])
  },
  watch: {
    currentPageView(val) {
      this.pageView = val;
    }
  }
})
export default class Index extends Vue {
  data() {
    return {
      pageView: "Table",
      loadData: false
    };
  }
  async created() {
    const allCAtBreeds = await axios.get("https://api.thecatapi.com/v1/breeds");
    this.allCats(allCAtBreeds);
  }
}
</script>
