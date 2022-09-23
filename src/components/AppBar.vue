<template>
  <v-app-bar app>
    <v-app-bar-title class="hidden-xs-only">
      <router-link
        to="/"
        class="text-decoration-none"
      >
        Vjet Cinema
      </router-link>
    </v-app-bar-title>

    <v-divider
      vertical
      class="mx-2 hidden-sm-and-down"
    />

    <v-spacer class="d-none d-sm-flex d-md-none" />

    <v-btn
      to="/movies"
      exact
      text
      class="mr-1"
    >
      Всі фільми
    </v-btn>

    <v-menu
      open-on-hover
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
        >
          <span>Жанри</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="genre in genres"
          :key="genre.id"
          :to="{
            name: 'movie-board',
            query: { genres: genre.id }
          }"
          exact
        >
          {{ genre.title }}
        </v-list-item>
      </v-list>
    </v-menu>

    <v-divider
      vertical
      class="mx-2 hidden-sm-and-down"
    />

    <v-btn
      icon
      class="mr-1 hidden-sm-and-down"
      @click="searchForMovie"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-text-field
      v-model.trim="search"
      @keydown.enter="searchForMovie"
      hide-details
      placeholder="Введіть назву фільму"
      class="hidden-sm-and-down"
    />
  </v-app-bar>
</template>

<script>
import { genres } from '@/helpers'

export default {
  name: 'AppBar',
  data() {
    return {
      genres,
      search: '',
      isViewSearchField: false
    }
  },
  methods: {
    searchForMovie() {
      this.$router.push(
        Object.assign(
          { name: 'movie-board' },
          this.search
            ? {
                query: { name: this.search }
              }
            : {}
        )
      )
    }
  }
}
</script>

<style>
.search-block-active {
  background: #fff;
  position: absolute;
  z-index: 5;
  width: 100%;
  display: flex;
}
</style>
