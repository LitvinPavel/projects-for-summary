<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-window v-model="step">
      <v-window-item :value="1">
        <input-search-data></input-search-data>
      </v-window-item>
      <v-window-item :value="2">
        <search-result></search-result>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="step !== 1" @click="step--">
        Назад
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step !== 2" color="primary" @click="step++">
        Далее
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import searchResult from '../../components/PBN/reports/searchResult.vue'
  import inputSearchData from '../../components/PBN/reports/inputSearchData.vue'
  export default {
    components: {
      searchResult,
      inputSearchData
    },
    data: () => ({
      step: 1
    }),
    mounted() {
      this.$store.commit('BACK_PAGE', '/pbn')
    },
    computed: {
      currentTitle() {
        switch (this.step) {
          case 1:
            return 'Ввод данных для поиска'
          default:
            return 'Результат поиска'
        }
      }
    }
  }
</script>
