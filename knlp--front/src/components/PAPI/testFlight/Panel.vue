<template>
  <v-card>
    <v-card-text style="height: 74vh">
      <v-layout align-center justify-center row>
        <v-chip style="width: 30vw;" class="headline ml-0" outline label>
          <b>ВС №: </b><i class="pl-2 white--text">{{ userData.aircraft.name }}</i>
        </v-chip>
        <v-chip style="width: 40vw;" class="headline ml-0" outline label>
          <b>ИКАО Аэропорта: </b><i class="pl-2 white--text">{{ userData.airport.icaoCode }}</i>
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip style="width: 30vw;" class="headline mr-0" outline label>
          <b>ВПП: </b><i class="pl-2 white--text">{{ userData.airport.runway.identifier }}</i>
        </v-chip>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs6>
          <h3 class="display-1 secondary--text">Облет огня PAPI:</h3>
        </v-flex>
        <v-flex xs6>
          <v-select 
            class="display-1 select_elm clip" 
            v-model="lamp" 
            :items="lamps" 
            :disabled="isFly"
            item-text="litera" 
            item-value="number" 
            persistent-hint
            auto-select-first
            autofocus  
            return-object
          >
            <template slot="selection" slot-scope="data">
              <span>{{ data.item.number }}{{ data.item.litera }}</span>
            </template>
            <template slot="item" slot-scope="data">
              <span class="headline">{{ data.item.number }}{{ data.item.litera }}</span>
            </template>
          </v-select>
        </v-flex>
      </v-layout>
      <v-layout class="box-tab-item" column wrap>
        <v-layout row wrap>
          <v-flex xs12 v-for="(state, sindex) in stateInfo" :key="sindex">
            <v-layout row>
              <v-flex class="headline" grow pa-2>
                <span class="secondary--text">{{ state.text }}</span>
              </v-flex>
              <v-flex class="headline" shrink pa-2>
                <span style="width: 10%;" class="white--text clip">{{ typeof(state.value) !== 'number' ? state.value : state.value.toFixed(5) }}</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider class="my-2"></v-divider>
        <v-layout row wrap>
          <v-flex v-for="(state, s2index) in stateInfo2" :key="s2index" :class="state.xs">
            <v-layout row>
              <v-flex class="headline" grow pa-2>
                <span class="secondary--text">{{ state.text }}</span>
              </v-flex>
              <v-flex class="headline" shrink pa-2>
                <span class="white--text">{{ state.value }}</span>
              </v-flex>
              <v-divider class="mx-2" v-if="s2index % 2 === 0 && s2index <= 5" :key="`divider-vert-${s2index}`" vertical></v-divider>
              <v-divider class="mx-2" v-if="s2index > 5 && (s2index + 1) % 3 !== 0" :key="`divider-vert-${s2index}`" vertical></v-divider>
            </v-layout>
            <v-divider class="my-2" v-if="s2index === 4 || s2index === 5" :key="`divider-hor-${s2index}`"></v-divider>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-layout class="mx-1 btn-action-custom">
        <v-btn style="height: 60px; width: 60%;" class="display-1 ml-1" :color="!isFly ? 'primary' : 'error'" outline @click="$emit('fly')">
          {{!isFly ? 'Начать запись данных' : 'Завершить запись данных' }}
        </v-btn>
        <v-btn block style="height: 60px;" class="display-1 mr-1"  :disabled="!isFly" outline @click="$emit('event')">
          Событие
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import exitCheck from '../../exitCheck.vue'

  export default {
    components: {
      exitCheck
    },
    data() {
      return {
        exit: false,
        exitTo: false,
        stopDialog: false
      }
    },
    mounted() {
      this.$store.commit('SET_CURRENT_LAMP', this.lamps[0])
    },
    computed: {
      isFly: {
        get() {
          return this.$store.getters.IS_FLY
        },
        set(val) {
          this.$store.commit('SET_IS_FLY', val)
        }
      },
      lamp: {
        get() {
          return this.$store.getters.LAMP
        },
        set(val) {
          this.$store.commit('SET_CURRENT_LAMP', val)
        }
      },
      userData() {
        return this.$store.getters.USER_DATA
      },
      lamps() {
        return this.$store.getters.LAMPS
      },
      stateInfo() {
        return [
          { text: 'Расстояние до порога ( м ):', value: this.$store.getters.papiPS.distanceLtpFtp },
          { text: 'Текущий угол глиссады ( ′ ):', value: this.$store.getters.papiPS.currentGpa },
          { text: 'Направление ( ° ):', value: this.$store.getters.papiPS.heading },
        ]
      },
      stateInfo2() {
        return [
          { text: 'SEP Позиция (м):', value: this.$store.getters.papiPS.positionSEP, xs: 'xs6' },
          { text: 'SEP Скорости (м/с):', value: this.$store.getters.papiPS.velocitySEP, xs: 'xs6' },
          { text: 'Скорость 2D (м/с):', value: this.$store.getters.papiPS.velocity2D, xs: 'xs6' },
          { text: 'Скорость X (м/с):', value: this.$store.getters.papiPS.velocityX, xs: 'xs6' },
          { text: 'Скорость Y (м/с):', value: this.$store.getters.papiPS.velocityY, xs: 'xs6' },
          { text: 'Скорость Z (м/с):', value: this.$store.getters.papiPS.velocityZ, xs: 'xs6' },
          { text: 'HDOP:', value: this.$store.getters.papiPS.hdop, xs: 'xs4' },
          { text: 'VDOP:', value: this.$store.getters.papiPS.vdop, xs: 'xs4' },
          { text: 'TDOP:', value: this.$store.getters.papiPS.tdop, xs: 'xs4' }
        ]
      }  
    }
  }
</script>

<style scoped>
.clip {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

