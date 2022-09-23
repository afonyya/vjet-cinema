<template>
  <div>
    <AppLoader v-if="isLoad" />
    <MovieList
      v-else
      :movieList="movieList"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MovieList from '@/components/list/MovieList'

export default {
  name: 'MovieBoard',
  components: {
    MovieList
  },
  data() {
    return {
      isLoad: false
    }
  },
  computed: {
    ...mapState({
      movieList: state => state.movieList
    })
  },
  watch: {
    $route(value) {
      this._getMovieList(value.query)
    }
  },
  methods: {
    ...mapActions(['getMovieList']),
    async _getMovieList() {
      this.isLoad = true
      await this.getMovieList(this.$route.query)
      this.isLoad = false
    }
  },
  async mounted() {
    await this._getMovieList()
  }
}
</script>
