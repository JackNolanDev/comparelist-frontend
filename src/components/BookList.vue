<template>
  <div>
    {{ header }}
  </div>
</template>

<script>
export default {
  name: "BookList",
  props: {
    section: String,
    header: String,
  },
};
</script>

<style scoped></style>
