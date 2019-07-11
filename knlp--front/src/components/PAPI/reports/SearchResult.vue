<template>
  <v-card-text style="height: 64vh;">
    <v-layout row>
      <v-flex xs12 sm6 class="my-2 px-1">
      <v-date-picker
          dark
          class="__picker"
          v-model="date1"
          :events="arrayEvents"
          :allowed-dates="allowedDates"
          :picker-date.sync="pickerDate"
          :first-day-of-week="1"
          @input="changed"
          locale="ru-ru"
          event-color="green lighten-1"
        ></v-date-picker>
      </v-flex>
      <v-flex xs12 sm6 class="mt-5 px-1">
        <div class="subheading">Сессии в выбранную дату</div>
        <ul class="ma-3">
          <li>Аэропорт: {{ selected.airport }}</li>
          <li>Борт №: {{ selected.aircraft }}</li>
        </ul>
      </v-flex>
    
    </v-layout>
  </v-card-text>
</template>

<script>
  export default {
    data: () => ({
      arrayEvents: [],
      date1: new Date().toISOString().substr(0, 10),
      pickerDate: null,
      selected: {},
      events: [
        { airport: 'UUCC', aircraft: '67469', date: '2019-03-01' },
        { airport: 'UUBB', aircraft: '67439', date: '2019-03-02' },
        { airport: 'UUCW', aircraft: '67443', date: '2019-03-03' }
      ]
    }),
    mounted () {
      this.events.forEach(el => {
        this.arrayEvents.push(el.date)
      })
    },
    watch: {
      pickerDate(val) {
        console.log('Можно добавить подгрузку на выбранный месяц - ' + val)
      }
    },
    methods: {
      allowedDates(val) {
        if (this.arrayEvents) {
          return this.arrayEvents.includes(val)
        }
        
      },
      changed($event) {
        this.events.forEach(el => {
        if ($event === el.date) {
          this.selected = el
        }
      })
      }
    }
  }
</script>

<style>
.__picker td>button>div, .__picker th, .__picker {
  font-size: 1.2rem;
}
</style>
