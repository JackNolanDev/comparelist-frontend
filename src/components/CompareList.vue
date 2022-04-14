<template>
  <div>
    <div class="container page">
      <h1 class="display-2 text-center mt-2">Compare List</h1>
      <label for="active-list-sel" class="form-label">
        Choose list to explore:
      </label>
      <select v-model="activeList" id="active-list-sel" class="form-select">
        <option value="hardcoverFiction">Hardcover Fiction</option>
        <option value="hardcoverNonfiction">Hardcover Nonfiction</option>
        <option value="paperbackFiction">Paperback Fiction</option>
        <option value="paperbackNonfiction">Paperback NonFiction</option>
      </select>
      <div class="row mt-5 mb-5">
        <div
          v-for="(sublist, name) in filteredLists"
          v-bind:key="name"
          v-bind:class="colClass"
        >
          <h4>{{ sublist.disp }}</h4>
          <div>{{ sublist[activeList].name }}</div>
          <div>
            <i>From {{ formatDate(sublist[activeList].date) }}</i>
          </div>
          <div class="list-group list-group-numbered mt-3">
            <button
              v-for="(book, idx) in sublist[activeList].books"
              v-bind:key="idx"
              v-on:click="bookButton(book)"
              class="list-group-item list-group-item-action d-flex align-items-start book"
            >
              <div class="me-1">{{ book.rank }}.</div>
              <div class="flex-grow-1">
                <div>
                  <b>{{ book.title }}</b>
                </div>
                <div class="mt-1">
                  By {{ book.author }}
                  <span class="text-muted">| {{ book.publisher }}</span>
                </div>
              </div>
              <img
                v-if="book.image"
                v-bind:src="book.image"
                v-bind:alt="'Cover for ' + book.title"
                height="150px"
              />
            </button>
          </div>
          <p>
            TODO: I think it would be nice to have some blurb here describing
            generally how different sources get their information and why the
            lists may be so different.
          </p>
        </div>
      </div>
      <compare-book :given="selectedBook" @toggleVisible="hideModal" />
    </div>
    <page-footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CompareBook from "./CompareBook.vue";
import PageFooter from "./PageFooter.vue";
export default {
  components: { PageFooter, CompareBook },
  name: "CompareList",
  data() {
    return {
      activeList: "hardcoverFiction",
      selectedBook: {},
    };
  },
  computed: {
    ...mapState(["lists"]),
    filteredLists() {
      const l = {};
      Object.entries(this.lists).forEach((pair) => {
        const key = pair[0];
        const map = pair[1];
        if (this.activeList in map) {
          l[key] = map;
        }
      });
      return l;
    },
    colClass() {
      return "col-" + parseInt(12 / Object.keys(this.filteredLists).length);
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toDateString();
    },
    bookButton(book) {
      this.selectedBook = book;
    },
    hideModal() {
      this.selectedBook = {};
    },
  },
};
</script>

<style scoped>
.page {
  position: relative;
  min-height: calc(100vh - 64px);
}
.book {
  min-height: 168px;
}
</style>
