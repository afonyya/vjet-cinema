<template>
  <div>
    <AppLoader v-if="isLoad" />

    <div v-else>
      <MovieMain :movie="movie" />
      <MovieSessions
        :movieSessions="movieSessions"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MovieMain from '@/components/info/MovieMain'
import MovieSessions from '@/components/info/MovieSessions'

export default {
  name: 'MovieInfo',
  components: {
    MovieMain,
    MovieSessions
  },
  data() {
    return {
      isLoad: true
    }
  },
  computed: {
    ...mapState({
      movie: state => state.movie,
      movieSessions: state => state.movieSessions
    })
  },
  methods: {
    ...mapActions(['getMovie', 'getMovieSessions'])
  },
  async mounted() {
    const result = await this.getMovie(this.$route.params.id)
    result && (await this.getMovieSessions(this.$route.params.id))
    this.isLoad = false
  }
}
</script>
