<template>
  <v-card>
    <v-card-title>Дати</v-card-title>

    <v-tabs
      v-model="date"
      grow
    >
      <v-tab
        v-for="session in sessions"
        :key="session.showdate"
      >
        {{ session.showdate }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="date">
      <v-tab-item
        v-for="session in sessions"
        :key="session.showdate"
      >
        <v-bottom-navigation
          v-model="time"
          @change="changeTime"
          grow
        >
          <v-btn
            v-for="time in session.daytime"
            :key="time"
          >
            {{ time }}
          </v-btn>
        </v-bottom-navigation>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MovieSessions',
  props: {
    movieSessions: Array
  },
  data() {
    return {
      date: 0,
      time: null
    }
  },
  computed: {
    sessions() {
      return this.movieSessions.map(session => {
        return {
          daytime: session.daytime.split(';'),
          showdate: session.showdate
        }
      })
    }
  },
  watch: {
    // date() {
    //   this.time = null
    // },
    async time() {
      this.isLoad = true

      const { showdate, daytime } = this.sessions[this.date]
      // console.log(daytime)

      await this.getMoviePlaces({
        movie_id: this.$route.params.id,
        daytime: daytime[this.time],
        showdate
      })

      this.isLoad = false
    }
  },
  methods: {
    ...mapActions(['getMoviePlaces']),
    changeTime() {
      console.log('changeTime')
    }
  }
}
</script>
