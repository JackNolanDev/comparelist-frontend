<template>
  <div class="modal fade" v-bind:class="showModalClass" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 v-if="given" class="modal-title">Compare {{ given.title }}</h4>
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn-close"
          ></button>
        </div>
        <div class="list-group list-group-flush modal-content-scroll">
          <div
            v-for="(book, idx) in matches"
            v-bind:key="'m' + idx"
            class="list-group-item"
          >
            <div class="d-flex justify-content-between">
              <div>
                <small class="fw-light">
                  {{ book.listName }} | {{ book.sublistName }}
                </small>
                <h5>{{ book.title }}</h5>
                <div>
                  By {{ book.author }}
                  <span class="text-muted">| {{ book.publisher }}</span>
                </div>
                <p class="mt-3" v-if="book.desc">
                  <i>{{ book.desc }}</i>
                </p>
              </div>
              <div class="text-end text-nowrap">
                <div>
                  Rank:
                  <span class="display-5">{{ book.rank }}</span>
                </div>
                <div>
                  Last Rank: <b>{{ book.lastRank }}</b>
                </div>
                <div>
                  Weeks on List: <b>{{ book.wol }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn btn-secondary"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import stringSimilarity from "string-similarity";
export default {
  name: "CompareBook",
  props: {
    given: Object,
  },
  computed: {
    ...mapState(["lists"]),
    showModalClass() {
      return !this.given ? "" : "show showModal";
    },
    matches() {
      if (!this.given || !this.lists) {
        return [];
      }
      const m = [];
      Object.values(this.lists).forEach((subList) =>
        Object.values(subList).forEach((list) => {
          if (typeof list === "string") {
            return;
          }
          list.books.forEach((book) => {
            if (
              stringSimilarity.compareTwoStrings(book.title, this.given.title) >
                0.3 &&
              stringSimilarity.compareTwoStrings(
                book.author,
                this.given.author
              ) > 0.3 &&
              stringSimilarity.compareTwoStrings(
                book.publisher,
                this.given.publisher
              ) > 0.3
            ) {
              m.push({
                ...book,
                listName: subList.disp,
                sublistName: list.name,
              });
            }
          });
        })
      );
      return m;
    },
  },
  methods: {
    toggleVisible() {
      this.$emit("toggleVisible");
    },
  },
};
</script>

<style scoped>
.showModal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.modal-content-scroll {
  max-height: 600px;
  overflow-y: scroll;
}
</style>
