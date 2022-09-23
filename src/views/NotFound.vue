<template>
  <v-row>
    <v-col>
      <h3 class="text-h3">Упс, 404</h3>
      <p>Сторінка, яку ви шукали, не існує</p>
      <v-btn
        to="/"
        outlined
      >
        Заберіть мене звідси
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
