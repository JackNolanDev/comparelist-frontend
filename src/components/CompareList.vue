<template>
  <div>
    <div class="container page">
      <h1 class="display-2 text-center mt-2">Compare List</h1>
      <label for="active-list-sel" class="form-label"
        >Choose list to explore:</label
      >
      <select v-model="activeList" id="active-list-sel" class="form-select">
        <option value="hardcoverFiction">Hardcover Fiction</option>
        <option value="hardcoverNonfiction">Hardcover Nonfiction</option>
        <option value="paperbackFiction">Paperback Fiction</option>
        <option value="paperbackNonfiction">Paperback NonFiction</option>
      </select>
      <div class="row mt-5 mb-5">
        <div v-for="(sublist, name) in lists" v-bind:key="name" class="col-6">
          {{ name }}
          <ol class="list-group list-group-numbered">
            <li
              v-for="(book, idx) in sublist[activeList].books"
              v-bind:key="idx"
              class="list-group-item d-flex align-items-start"
            >
              <div class="flex-grow-1">
                <div>
                  <b>{{ book.title }}</b>
                </div>
                <div>By {{ book.author }} | {{ book.publisher }}</div>
              </div>
              <img
                v-bind:src="book.image"
                v-bind:alt="'Cover for ' + book.title"
                width="100px"
              />
            </li>
          </ol>
        </div>
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageFooter from "./PageFooter.vue";
export default {
  components: { PageFooter },
  name: "CompareList",
  data() {
    return {
      activeList: "hardcoverFiction",
    };
  },
  computed: {
    ...mapState(["lists"]),
  },
};
</script>

<style scoped>
.page {
  position: relative;
  min-height: calc(100vh - 64px);
}
</style>
