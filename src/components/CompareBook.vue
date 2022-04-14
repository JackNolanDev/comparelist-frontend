<template>
  <div
    v-on:keyup.esc="toggleVisible()"
    class="modal fade"
    v-bind:class="showModalClass"
    tabindex="-1"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Compare {{ given.title }}</h5>
          <button
            type="button"
            v-on:click="toggleVisible()"
            class="btn-close"
          ></button>
        </div>
        <div class="modal-body">Todo for Jack</div>
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
export default {
  name: "CompareBook",
  props: {
    given: Object,
  },
  computed: {
    ...mapState(["lists"]),
    showModalClass() {
      return Object.keys(this.given).length !== 0 ? "show showModal" : "";
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
</style>
