<template>
  <div id="app">
    <compare-list />
  </div>
</template>

<script>
import CompareList from "./components/CompareList.vue";

export default {
  name: "App",
  components: {
    CompareList,
  },
  beforeMount() {
    this.$store.dispatch("fetchLists");
  },
};
</script>
