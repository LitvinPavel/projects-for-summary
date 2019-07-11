<template>
  <v-card-text style="height: 61vh;">
    <v-layout justify-center column fill-height>
      <section class="text-xs-center">
         <v-select
          :items="fases"
          label="Solo field"
          return-object
          item-text="text"
          item-value="value"
          solo
        ></v-select>
        <span class="grey--text text--darken-1 subheading">
          Выберите FAS блок
        </span>
      </section>
    </v-layout>
  </v-card-text>
</template>

<script>
  export default {
    data: () => ({
      fases: [
        { text: 'FAS_1', value: 1 },
        { text: 'FAS_2', value: 2 },
        { text: 'FAS_3', value: 3 }
      ]
    })
  }
</script>

<style scoped>

</style>