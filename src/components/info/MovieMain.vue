<template>
  <v-card>
    <v-card-title
      v-html="movie.name"
      class="text-h4"
    />

    <v-card-text>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-avatar
            width="233"
            height="344"
            rounded
          >
            <img :src="movie.image" />
          </v-avatar>
        </v-col>

        <v-col>
          <div
            v-html="additional"
            class="additional text-left"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-left">
          <p class="text-h6">Про що фільм:</p>
          <p v-html="description"></p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MovieMain',
  props: {
    movie: Object
  },
  computed: {
    additional() {
      return this.movie.additional.replaceAll(/<a[^>]*>(.*?)/g, '')
    },
    description() {
      return this.movie.description.replace(/<[^>]*>/g, '')
    }
  }
}
</script>

<style>
.additional > ul {
  list-style: none;
  padding: 0;
}
.additional > ul > li * {
  display: inline;
}
.additional > ul > li > .key {
  font-weight: 600;
}
.additional > ul > li > .val > .age_hint {
  font-weight: 300;
}
</style>
