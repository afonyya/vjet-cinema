import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieList: [],
    movie: null,
    movieSessions: []
  },
  mutations: {
    SET_MOVIE_LIST(state, list) {
      state.movieList = list
    },
    SET_MOVIE(state, movie) {
      state.movie = movie
    },
    SET_MOVIE_SESSIONS(state, sessions) {
      state.sessions = sessions
    }
  },
  actions: {
    async getMovieList({ commit }, params) {
      const response = await (
        await fetch(
          `https://cinema-api-test.y-media.io/v1/movies?${new URLSearchParams(
            params
          )}`
        )
      ).json()

      !response.error_code && commit('SET_MOVIE_LIST', response.data)
    },
    async getMovie({ commit }, id) {
      const response = await (
        await fetch(
          `https://cinema-api-test.y-media.io/v1/movies?movie_id=${id}`
        )
      ).json()

      !response.error_code && commit('SET_MOVIE', ...response.data)
    },
    async getMovieSessions({ commit }, id) {
      const response = await (
        await fetch(
          `https://cinema-api-test.y-media.io/v1/movieShows?movie_id=${id}`
        )
      ).json()

      console.log(response.data[id])

      !response.error_code && commit('SET_MOVIE_SESSIONS', response.data[id])
    }
  }
})
