<template>
  <v-card>
    <v-card-text style="height: 74vh">
      <v-layout align-center justify-center row>
        <v-chip style="width: 35vw;" class="headline ml-0" outline label>
          <b>Тип ВС: </b><i style="width: 18vw;" class="pl-2 white--text clip">{{ aircraft.model }}</i>
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip style="width: 25vw;" class="headline" outline label>
          <b>ВС №: </b><i style="width: 13vw;" class="pl-2 white--text  clip">{{ aircraft.name }}</i>
        </v-chip>
        <v-spacer></v-spacer>
        <v-chip style="width: 40vw;" class="headline mr-0" outline label>
          <b>ИКАО Аэропорта: </b><i class="pl-2 white--text">{{ route.airportIcaoId }}</i>
        </v-chip>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs3>
          <h3 class="display-1 secondary--text">Маршрут:</h3>
        </v-flex>
        <v-flex xs9>
          <v-select 
            class="display-1 select_elm clip" 
            v-model="route" 
            :items="scheme" 
            item-text="sidStarApproachId" 
            item-value="sidStarApproachId" 
            persistent-hint
            @change="changedRoute"
            auto-select-first
            autofocus 
            :disabled="isActiveFly" 
            return-object
          >
            <template slot="selection" slot-scope="data">
              <span>{{ data.item.sidStarApproachId }} - {{ selectType( data.item.type) }}</span>
              <span v-if="data.item.transitionId" class="ml-2">({{ data.item.transitionId }})</span>
              <!-- <span v-for="(seq, seq_id) in data.item.sequence" :key="'select'+ seq_id" class="ml-2 title">[{{ seq.fixId }}]</span> -->
            </template>
            <template slot="item" slot-scope="data">
              <span class="headline">{{ data.item.sidStarApproachId }} - {{ selectType( data.item.type) }}</span>
              <span v-if="data.item.transitionId" class="headline ml-2">({{ data.item.transitionId }})</span>
              <span v-for="(seq, seq_id) in data.item.sequence" :key="'item'+ seq_id" class="headline ml-2">[{{ seq.fixId }}]</span>
            </template>
          </v-select>
        </v-flex>
      </v-layout>
      <v-layout class="box-tab-item" column wrap>
        <v-layout row wrap>
          <v-flex xs6 v-for="(state, sindex) in stateInfo" :key="'s'+sindex">
            <v-layout row>
              <v-flex class="headline" grow pa-2>
                <span class="secondary--text">{{ state.text }}</span>
              </v-flex>
              <v-flex class="headline" shrink pa-2>
                <span class="white--text">{{ state.value }}</span>
              </v-flex>
              <v-divider class="mx-2" v-if="sindex % 2 === 0" :key="`divider-${sindex}`" vertical></v-divider>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider class="my-2"></v-divider>
        <v-layout row wrap>
          <v-flex v-for="(state, s2index) in stateInfo2" :key="'s2'+s2index" :class="state.xs">
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
        <v-btn style="height: 60px; width: 60%;" class="display-1 ml-1" :color="!isActiveFly ? 'primary' : 'error'" outline @click="$emit('startFly')">
          {{!isActiveFly ? 'Начать запись данных' : 'Завершить запись данных' }}
        </v-btn>
        <v-btn block style="height: 60px;" class="display-1 mr-1"  :disabled="!isActiveFly" outline @click="$emit('startEvent')">
          Событие
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    computed: {
      aircraft() {
        return this.$store.getters.AIRCRAFT
      },
      isActiveFly() {
        return this.$store.getters.isActiveFly
      },
      route() {
        return this.$store.getters.route
      },
      scheme() {
        return this.$store.getters.scheme
      },
      position() {
        return this.$store.getters.position
      },
      stateInfo() {
        let routeState = ''
        switch (this.position.positionStatus.routeState) {
          case 0:
            routeState = 'Вне маршрута'
            break
          case 1:
            routeState = 'На маршруте'
            break
          case 2:
            routeState = 'На маршруте'
            break
          case 3:
            routeState = 'Вне маршрута'
            break
          default:
            routeState = ''
            break
        }
        return [
          { text: 'Расстояние до (м):', value: this.position.positionStatus.distanceToNextPoint },
          { text: 'Курс (°):', value: this.position.positionStatus.heading },
          { text: 'Следующая точка:', value: this.position.positionStatus.nextPoint },
          { text: 'Отрезок:', value: this.position.positionStatus.segmentName === '' ? '-' : this.position.positionStatus.segmentName },
          { text: 'Пройдено (м):', value: this.position.positionStatus.totalDistance },
          { text: 'Нахождение ВС в коридоре (%):', value: this.position.positionStatus.offsetPercent },
          { text: 'Пройдено от маршрута (%):', value: this.position.positionStatus.totalPercent },
          { text: 'Этап полета:', value: routeState },
        ]
      },
      stateInfo2() {
        return [
          { text: 'SEP Позиция (м):', value: this.position.positionStatus.positionSEP, xs: 'xs6' },
          { text: 'SEP Скорости (м/с):', value: this.position.positionStatus.velocitySEP, xs: 'xs6' },
          { text: 'Скорость 2D (м/с):', value: this.position.positionStatus.velocity2D, xs: 'xs6' },
          { text: 'Скорость X (м/с):', value: this.position.positionStatus.velocityX, xs: 'xs6' },
          { text: 'Скорость Y (м/с):', value: this.position.positionStatus.velocityY, xs: 'xs6' },
          { text: 'Скорость Z (м/с):', value: this.position.positionStatus.velocityZ, xs: 'xs6' },
          { text: 'HDOP:', value: this.position.positionStatus.hdop, xs: 'xs4' },
          { text: 'VDOP:', value: this.position.positionStatus.vdop, xs: 'xs4' },
          { text: 'TDOP:', value: this.position.positionStatus.tdop, xs: 'xs4' }
        ]
      }  
    },
    methods: {
      selectType(type) {
        switch (type) {
          case 0:
            return 'SID'
            break
          case 1:
            return 'STAR'
            break
          case 2:
            return 'APPROACH'
            break
          default:
            return 'тип не определен'
        }
      },
      changedRoute($event) {
        this.$store.dispatch('CHANGED_ROUTE', $event)
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