<template>
  <div>
    <v-card class="mb-2" style="height: 53vh;">
      <v-form class="mt-1" ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex xs12 text-xs-left px-2>
            <h3 class="title mb-1">Смещение огней от порога</h3>
            <v-text-field solo light validate-on-blur v-model="lampsOffset" :rules="[v => !!v || 'Поле обязательное!']" suffix="Метры"></v-text-field>
          </v-flex>
        </v-layout>
      </v-form> 
      <v-layout>
        <v-flex xs12 px-2>
          <h3 class="title mb-1 mt-1">Огни PAPI</h3>
      <v-data-table :headers="headers" :items="lamps" hide-actions style="height: 477px; overflow-y:auto;">
        <template slot="items" slot-scope="props">
          <td><div class="mb-1">{{ props.item.number }}</div></td>
          <td><div class="mb-1">{{ props.item.litera }}</div></td>
          <td><v-text-field class="mb-1" hide-details @change="editAngle($event, props.item)" solo-inverted :value="props.item.angle"></v-text-field></td>
          <td><v-text-field class="mb-1" hide-details @change="editAngleDeg($event, props.item)" solo-inverted :value="props.item.angleDeg"></v-text-field></td>
        </template>
        <span slot="no-data">У выбранного ВПП нет огней PAPI</span>
      </v-data-table>       
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout>
      <v-btn flat @click="$emit('prev')">Назад</v-btn>
      <v-spacer></v-spacer>
      <v-btn block color="primary"  @click="send">
        Принять
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      headers: [
          {
            text: 'Номер',
            align: 'center',
            sortable: false,
            value: 'number'
          },
          {
            text: 'Литера',
            align: 'center',
            sortable: false,
            value: 'litera'
          },
          {
            text: 'Угол (в минутах)',
            align: 'center',
            sortable: false,
            value: 'angle'
          },
          {
            text: 'Угол (в градусах)',
            align: 'center',
            sortable: false,
            value: 'angleDeg'
          }
        ]
    }),
    computed: {
      lampsOffset: {
        get() {
          return this.$store.getters.LAMPS_OFFSET
        },
        set(val) {
          this.$store.commit('SET_LAMPS_OFFSET', parseFloat(val))
        }
      },
      lamps() {
        return this.$store.getters.LAMPS
      }
    },
    methods: {
      editAngle(val, item) {
        this.lamps[item.number - 1].angle = +val
        this.lamps[item.number - 1].angleDeg = parseFloat(parseFloat(this.lamps[item.number - 1].angle / 60).toFixed(6))
      },
      editAngleDeg(val, item) {
        this.lamps[item.number - 1].angleDeg = +val
        this.lamps[item.number - 1].angle = Math.round(parseFloat(this.lamps[item.number - 1].angleDeg * 60).toFixed(6))
      },
      send() {
        if (this.$refs.form.validate()) {
          this.$emit('next', this.lamps)
        }
      }
    }
  }
</script>

<style scoped>
</style>