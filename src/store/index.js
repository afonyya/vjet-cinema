import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieList: [],
    movie: null,
    movieSessions: [],
    sessionPlaces: null
  },
  mutations: {
    SET_MOVIE_LIST(state, list) {
      state.movieList = list
    },
    SET_MOVIE(state, movie) {
      state.movie = movie
    },
    SET_MOVIE_SESSIONS(state, sessions) {
      state.movieSessions = sessions
    },
    SET_SESSION_PLACES(state, places) {
      state.sessionPlaces = places
    },
    SET_BOOK_PLACE(state, { row, seat }) {
      state.sessionPlaces[row - 1][1][seat - 1].is_free = false
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

      if (!response.error_code) {
        commit('SET_MOVIE', ...response.data)
        return true
      }
    },
    async getMovieSessions({ commit }, id) {
      const response = await (
        await fetch(
          `https://cinema-api-test.y-media.io/v1/movieShows?movie_id=${id}`
        )
      ).json()

      !response.error_code && commit('SET_MOVIE_SESSIONS', response.data[id])
    },
    async getSessionPlaces({ commit }, params) {
      commit('SET_SESSION_PLACES', null)

      const response = await (
        await fetch(
          `https://cinema-api-test.y-media.io/v1/showPlaces?${new URLSearchParams(
            params
          )}`
        )
      ).json()

      !response.error_code && commit('SET_SESSION_PLACES', response.data)
    },
    async bookSessionPlace({ commit }, body) {
      const response = await (
        await fetch('https://cinema-api-test.y-media.io/v1/bookPlace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
      ).json()

      !response.error_code &&
        commit('SET_BOOK_PLACE', {
          row: response.data.row,
          seat: response.data.seat
        })
    }
  },
  getters: {
    places: state => state.sessionPlaces?.map(row => row[1])
  }
})
