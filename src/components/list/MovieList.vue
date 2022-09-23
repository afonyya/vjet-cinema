<template>
  <div>
    <h2 class="text-h2 mb-4 text-left">{{ title }}</h2>

    <v-row v-if="movieList.length">
      <v-col
        v-for="movie in movieList"
        :key="movie.id"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>

    <p
      v-else
      class="text-h5"
    >
      Фільмів не знайдено
    </p>
  </div>
</template>

<script>
import MovieCard from '@/components/list/MovieCard'
import { genres } from '@/helpers'

export default {
  name: 'MovieList',
  components: {
    MovieCard
  },
  props: {
    movieList: Array
  },
  data() {
    return {
      genres
    }
  },
  computed: {
    title() {
      if (this.$route.query.name) {
        return `Результати пошуку: ${this.$route.query.name}`
      } else if (this.$route.query.genres) {
        return genres.find(genre => genre.id === +this.$route.query.genres)
          ?.title
      } else return 'Всі фільми'
    }
  }
}
</script>
