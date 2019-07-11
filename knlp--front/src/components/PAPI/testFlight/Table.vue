<template>
  <v-card style="padding-top: 15px;">
          <v-card-text>
            <v-layout class="box-tab-item justify-center mb-2">
              <h2 class="display-1">{{lamp.number}}{{ lamp.litera }}</h2>
            </v-layout>

            <v-data-table style="height:480px; overflow-y: auto;" item-key="distanceLtpFtp" :headers="headersTable" :items="CHEAT_TABLE" hide-actions >
              <template slot="items" slot-scope="props">
                <tr :active="props.item.isSelected">
                  <td class="text-xs-center" @click="props.item.isSelected = !props.item.isSelected"><v-checkbox :input-value="props.item.isSelected" primary hide-details></v-checkbox></td>
                  <td class="text-xs-center">{{ typeof(props.item.distanceLtpFtp) !== 'number' ? props.item.distanceLtpFtp : props.item.distanceLtpFtp.toFixed() }}</td>
                  <td class="text-xs-center">{{ typeof(props.item.elevation) !== 'number' ? props.item.elevation : props.item.elevation.toFixed() }}</td>
                  <td class="text-xs-center">{{ typeof(props.item.heading) !== 'number' ? props.item.heading : props.item.heading.toFixed(1) }}</td>
                  <td class="text-xs-center">{{ typeof(props.item.currentGpa) !== 'number' ? props.item.currentGpa : props.item.currentGpa.toFixed(1) }}</td>
                </tr>
              </template>
              <template slot="no-data">
                <td colspan="8" class="pt-2 black" style="text-align: center;">
                  <span></span>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <span class="headline">Средний угол:</span>
            <span class="headline pl-2">{{averageAngle}}</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="isFly" @click="toForm">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
</template>

<script>
  export default {
    data() {
      return {
        selected: [],
        headersTable: [
          {
            text: 'Активно',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'IsSelected'
          },
          {
            text: 'Удаление',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'DistanceLtpFtp'
          },
          {
            text: 'Высота',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'Elevation'
          },
          {
            text: 'Азимут',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'Heading'
          },
          {
            text: 'Текущий угол',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'CurrentGpa'
          }
        ],
        sumCurrentGpa: 0,
        quantIsSelected: 0
      }
    },
    computed: {
      lamp() {
        return this.$store.getters.LAMP
      },
      isFly(){
          return this.$store.getters.IS_FLY
      },
      CHEAT_TABLE: {
        get() {
          return this.$store.getters.CHEAT_TABLE
        },
        set(val) {
          this.$store.commit('UPDATE_CHEAT_TABLE', val)
        }
      },
      averageAngle() {
        let quantity = 0,
            sum = 0
        this.CHEAT_TABLE.forEach(item => {
          if (item.isSelected) {
            ++quantity
            sum = sum + item.currentGpa
          }
        })
        if (isNaN(sum / quantity)) {
          return 0.0
        } else {
          return (sum / quantity).toFixed(1)
        }
      }
    },
    methods: {
      toForm() {
        this.$http.post(`Procedure/SavePapiChecks`, this.CHEAT_TABLE)
          .then(() => {
            this.$store.commit('IS_ERROR', { Message: 'Данные успешно сохранены.', state: 'primary' })
          })
          .catch(err => {
            this.$store.commit('IS_ERROR', { Message: 'При сохранении возникла ошибка.', state: 'red' })
          } )
      }
    }
  }
</script>

<style scoped>

</style>