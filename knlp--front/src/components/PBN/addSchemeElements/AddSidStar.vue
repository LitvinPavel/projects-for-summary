<template>
    <v-card light>
      <v-card-title>
        <span class="headline">Добавление {{ type.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-select 
          v-model="rwy"
          :items="$store.state.pbn.airport.runways"
          label="Выберите полосу..."
          persistent-hint
          @change="getSidStarNames"
          :menu-props="{ maxHeight: '400' }"
          single-line
          required
          light
        ></v-select>
        <v-select v-model="name"
                  :items="names"
                  item-text="sidStarApproachId"
                  :label="`Выберите ${type.name}...`"
                  persistent-hint
                  return-object
                  @change="selectSidStar"
                  :menu-props="{ maxHeight: '400' }"
                  single-line
                  required
                  light>
          <template slot="no-data">
            <span class="pa-2">Нет данных</span>
          </template>
        </v-select>
        <v-select v-model="specification"
                  :items="specifications"
                  item-text="text"
                  :label="`Выберите спецификацию...`"
                  persistent-hint
                  return-object
                  :menu-props="{ maxHeight: '400' }"
                  single-line
                  required
                  light>
          <template slot="no-data">
            <span class="pa-2">Нет данных</span>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('closed')">Отмена</v-btn>
        <v-btn :disabled="!isSaved" color="primary" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    props: ['type', 'scheme'],
    data: () => ({
      typeID: '',
      rwy: '',
      specifications: [
        { text: 'RNAV_10', value: 0 },
        { text: 'RNAV_5', value: 1 },
        { text: 'RNAV_4', value: 2 },
        { text: 'RNAV_2', value: 3 },
        { text: 'RNAV_1', value: 4 }
      ],
      specification: { text: 'RNAV_1', value: 4 },
      name: {},
      names: [],
      isSaved: false,
      elScheme: {}
    }),
    methods: {
      selectSidStar(selected) {
        this.elScheme = selected
        this.isSaved = true
      },
      save() {
        this.elScheme.specification = this.specification.value
        this.elScheme.specificationStr = this.specification.text
        this.$emit('saved', this.elScheme)
        this.type.name = ''
        this.rwy = ''
        this.name = ''
        this.specification = { text: 'RNAV_1', value: 4 }
      },
      getSidStarNames(selectedRunway) {
        this.$http.get(`arnad/Find${this.type.value}?icao=${this.$store.state.pbn.airport.icaoCode}&runwayId=${selectedRunway}`)
              .then(res => {
                if (!res) {
                  const error = {
                    status: true,
                    message: 'ERR_CONNECTION_REFUSED'
                  }
                  this.$store.commit('IS_ERROR', error)
                }
                this.names = res.data
              })
              .catch(err => {
                const error = {
                  status: true,
                  message: err.response.data
                }
                this.$store.commit('IS_ERROR', error)
              })
      }
    }
  }
</script>
