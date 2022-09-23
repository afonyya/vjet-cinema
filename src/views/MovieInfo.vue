<template>
  <div>
    <AppLoader v-if="isLoad" />
    <MovieMain
      v-else
      :movie="movie"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MovieMain from '@/components/info/MovieMain'

export default {
  name: 'MovieInfo',
  components: {
    MovieMain
  },
  data() {
    return {
      isLoad: true
    }
  },
  computed: {
    ...mapState({
      movie: state => state.movie
    })
  },
  methods: {
    ...mapActions(['getMovie'])
  },
  async mounted() {
    await this.getMovie(this.$route.params.id)
    this.isLoad = false
  }
}
</script>
