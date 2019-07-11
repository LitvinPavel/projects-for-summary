<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between pb-0">
      Выбор ВПП
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <template slot="header">
              <span class="title">+ ВПП</span>
            </template>
            <v-card>
                <v-layout px-5>
                  <v-text-field v-model="identifier" solo light></v-text-field>
                  <v-btn color="primary" :disabled="!identifier" @click="add">Добавить</v-btn>
                </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
      <v-layout justify-center column fill-height>
        <section class="text-xs-center">
          <v-data-table
            :headers="headers"
            :items="airport.runways"
            hide-actions
            item-key="identifier"
            style="max-height: 445px; overflow-y:auto;"
          >
            <template slot="items" slot-scope="props">
              <td class="title">
                {{ props.item.identifier }}</td>
              <td v-if="props.item.runwayInfo.lamps" class="text-xs-center custom_chip">
                <template v-for="(lamp, lamp_id) in props.item.runwayInfo.lamps">
                  <v-chip :key="lamp_id + 'lamp'"  v-if="lamp_id <= 4" label outline>
                    <span class="title">{{ lamp.angle }}({{ lamp.litera }})</span>
                  </v-chip>
                </template>
                <v-chip v-if="props.item.runwayInfo.lamps.length > 5" label>
                  <span>+{{ props.item.runwayInfo.lamps.length - 5 }}</span>
                </v-chip>
              </td>
              <td class="text-xs-right">
                <v-layout row>
                  <v-btn icon color="red" @click="isRemove(props.item)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn icon color="primary" @click="submit(props.item)">
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
                </v-layout>
              </td>
            </template>
            <span slot="no-data">У выбранного аэропорта нет полос</span>
          </v-data-table>
        </section>
      </v-layout>
    </v-card-text>
    <v-dialog v-model="dellDialog" max-width="490">
      <v-card light>
        <v-card-title class="headline">Подтвердите действие</v-card-title>
        <v-card-text>Вы собираетесь удалить ВПП <b>{{ isDell.identifier }}</b></v-card-text>
        <v-card-actions>
          <v-btn flat @click="dellDialog = false">Отменить</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="remove">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      dellDialog: false,
      isDell: false,
      identifier: null,
      headers: [{
          text: 'ВПП',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Огни PAPI',
          align: 'center',
          sortable: false,
          value: 'lamps'
        },
        {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions'
        }
      ]
    }),
    mounted() {
      this.$store.commit('BACK_PAGE', '/papi/airport-selected')
    },
    computed: {
      airport: {
        get() {
          return this.$store.getters.AIRPORT
        },
        set(val) {
          this.$store.commit('SAVE_AIRPORT', val)
        }
      }
    },
    methods: {
      add() {
        let rw = this.airport.runways
        rw.push({
          identifier: this.identifier.toUpperCase(),
          runwayInfo: null
        })
        let air = {
          id: this.airport.id,
          icaoCode: this.airport.icaoCode,
          name: this.airport.name,
          runways: rw
        }
        this.$store.commit('CLEAR_ERROR')
        this.$http.post(`papidb/Update`, air, {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then(res => {
            this.$store.commit('IS_ERROR', {
              Message: `Аэропорт ${res.data.name} успешно обновлен`,
              state: 'primary'
            })
            this.airport.runways = res.data.runways
          })
          .catch(err => {
            this.$store.commit('IS_ERROR', {
              Message: err.response.data.Message,
              state: 'red'
            })
          })
      },
      isRemove(val) {
        this.dellDialog = true
        this.isDell = val
      },
      remove() {
        const index = this.airport.runways.indexOf(this.isDell)
        this.airport.runways.splice(index, 1)
        this.$store.commit('CLEAR_ERROR')
        this.$http.post(`papidb/Update`, this.airport, {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then(res => {
            this.$store.commit('IS_ERROR', {
              Message: `Аэропорт ${res.data.name} успешно обновлен`,
              state: 'primary'
            })
            this.airport.runways = res.data.runways
            this.dellDialog = false
          })
          .catch(err => {
            this.$store.commit('IS_ERROR', {
              Message: err.response.data.Message,
              state: 'red'
            })
            this.dellDialog = false
          })
      },
      submit(val) {
        this.$store.dispatch('SAVE_RUNWAY_INFO', val)
        this.$router.push('/papi/vpp-preview')
      }
    }
  }
</script>
