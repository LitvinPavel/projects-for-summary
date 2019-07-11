<template>
    <v-container fluid text-xs-center>
      <v-layout align-center justify-center row fill-height style="height: 70vh;">
        <v-flex style="padding: 24px 24px 16px;">
          <v-btn class="display-1" style="height: 20vh;" outline block :disabled="!$page.papiSelectAircraft.abailable" :to="$page.papiSelectAircraft.link">Летные испытания</v-btn>
          <v-btn class="display-1" style="height: 20vh;" outline block :disabled="!$page.papiReports.abailable" :to="$page.papiReports.link">Отчеты</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    mounted() {
      this.$store.commit('INIT_PAGE_TITLE', 'Облет огней PAPI')
      this.$store.commit('BACK_PAGE', '/')
    }
  }
</script>

