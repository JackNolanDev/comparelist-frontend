<template>
  <div>
    <div v-if="list === 'nyt'">
      <p>Details on NYT bestsellers list.</p>
    </div>
    <div v-else-if="list === 'indie'">
      <p>Details on IndieBound bestsellers list.</p>
    </div>
    <div v-else-if="list === 'publishers'">
      <p>Details on Publishers Weekly bestsellers list.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListDetails",
  props: {
    list: String,
  },
};
</script>
