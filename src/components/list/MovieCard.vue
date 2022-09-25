<template>
  <v-card
    hover
    height="100%"
    class="d-flex flex-column align-center pt-4"
    :to="detailedRoute"
  >
    <v-avatar
      width="233"
      height="344"
      rounded
    >
      <v-img
        :src="movie.image"
        contain
      />
    </v-avatar>

    <v-card-title
      v-html="movie.name"
      class="justify-center flex-grow-1 break-word"
    />
  </v-card>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  computed: {
    detailedRoute() {
      return {
        name: 'movie-info',
        params: {
          id: this.movie.id
        }
      }
    }
  }
}
</script>

<style scoped>
.break-word {
  word-break: keep-all !important;
}
</style>
