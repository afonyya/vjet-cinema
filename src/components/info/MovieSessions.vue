<template>
  <v-card>
    <v-card-title>Сесії</v-card-title>

    <v-card-text>
      <v-menu
        offset-y
        max-width="290"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="showDate"
            label="Виберіть дату"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :disabled="isLoadPlaces || isLoadBooking"
          />
        </template>
        <v-date-picker
          v-model="showDate"
          :allowed-dates="allowedDates"
          no-title
        />
      </v-menu>

      <v-card
        outlined
        :disabled="isLoadPlaces || isLoadBooking"
      >
        <div
          v-if="!showDate"
          class="py-4"
        >
          Виберіть дату
        </div>

        <v-tabs
          v-else
          v-model="dayTimeTab"
          grow
          show-arrows
          optional
        >
          <v-tab
            v-for="dayTime in dayTimes"
            :key="dayTime"
          >
            {{ dayTime }}
          </v-tab>
        </v-tabs>

        <v-sheet
          height="300"
          width="100%"
          class="d-flex align-center justify-center"
        >
          <span v-if="dayTimeTab === null">Виберіть час</span>

          <AppLoader v-else-if="isLoadPlaces" />

          <v-tabs-items
            v-else
            v-model="dayTimeTab"
          >
            <v-tab-item
              v-for="dayTime in dayTimes"
              :key="dayTime"
            >
              <v-sheet
                height="300"
                width="100%"
                class="d-flex align-center"
              >
                <v-chip-group
                  v-model="seatPlace"
                  active-class="deep-purple--text text--accent-4"
                  column
                >
                  <v-sheet
                    v-for="(row, index) in places"
                    :key="index"
                    class="d-flex justify-center"
                    width="100%"
                  >
                    <v-chip
                      v-for="{ seat, is_free } in row"
                      :key="seat"
                      :value="[index + 1, seat]"
                      :disabled="!is_free"
                      x-small
                      class="seat-place"
                    >
                      {{ seat }}
                    </v-chip>
                  </v-sheet>
                </v-chip-group>
              </v-sheet>
            </v-tab-item>
          </v-tabs-items>
        </v-sheet>
      </v-card>
    </v-card-text>

    <v-card-actions class="px-4">
      <v-spacer />
      <v-btn
        @click="bookPlace"
        :disabled="!seatPlace"
        :loading="isLoadBooking"
        text
        outlined
      >
        Забронювати
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MovieSessions',
  props: {
    movieSessions: Array
  },
  data() {
    return {
      showDate: null,
      dayTimeTab: null,
      seatPlace: null,
      isLoadPlaces: false,
      isLoadBooking: false
    }
  },
  computed: {
    ...mapGetters(['places']),
    showDates() {
      return this.movieSessions.map(session => session.showdate)
    },
    dayTimes() {
      return this.movieSessions
        .find(session => session.showdate === this.showDate)
        .daytime.split(';')
    }
  },
  watch: {
    showDate() {
      this.seatPlace = null
      this.dayTimeTab = null
    },
    async dayTimeTab(val) {
      this.seatPlace = null

      if (val !== null) {
        this.isLoadPlaces = true

        await this.getSessionPlaces({
          movie_id: this.$route.params.id,
          showdate: this.showDate,
          daytime: this.dayTimes[val]
        })

        this.isLoadPlaces = false
      }
    }
  },
  methods: {
    ...mapActions(['getSessionPlaces', 'bookSessionPlace']),
    allowedDates(date) {
      return this.showDates.includes(date)
    },
    async bookPlace() {
      this.isLoadBooking = true

      const [row, seat] = this.seatPlace
      await this.bookSessionPlace({
        movie_id: this.$route.params.id,
        showdate: this.showDate,
        daytime: this.dayTimes[this.dayTimeTab],
        row,
        seat
      })
      this.seatPlace = null

      this.isLoadBooking = false
    }
  },
  mounted() {
    this.showDate = this.showDates[0]
  }
}
</script>

<style scoped>
.seat-place {
  padding: 0 4px;
}
</style>
