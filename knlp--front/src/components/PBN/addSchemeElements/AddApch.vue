<template>
    <v-card light>
      <v-card-title>
        <span class="headline">Добавление {{ type.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="name"
          :items="names"
          item-text="sidStarApproachId"
          label="Выберите APCH..."
          persistent-hint
          return-object
          @change="selectApproach"
          :menu-props="{ maxHeight: '400' }"
          single-line
          required
          light
        >
          <template slot="no-data">
            <span class="pa-2">Нет данных</span>
          </template>
        </v-select>
        <v-checkbox
          label="Missed Aproach"
          v-model="mApchCheck"
        ></v-checkbox>
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
    props: ['scheme'],
    data: () => ({
      rwy: '',
      name: {},
      names: [],
      elScheme: {},
      type: {
        name: 'APCH', 
        value: 'Apch' 
      },
      isSaved: false,
      mApchCheck: false
    }),
    mounted() {
      this.getApproachNames()
    },
    methods: {
      selectApproach(selected) {
        this.elScheme = selected
        this.isSaved = true
        
      },
      save() {
        if (!this.mApchCheck) {
          this.elScheme.sequence = this.elScheme.sequence.filter(el => el.isMissedAproach === false)
        } else {
          this.elScheme.sequence = this.elScheme.sequence
        }
        this.elScheme.mApch = this.mApchCheck
        this.$emit('saved', this.elScheme)
        
        this.name = ''
        this.mApchCheck = false
      },
      getApproachNames() {
        this.$http.get(`arnad/Find${this.type.value}?icao=${this.$store.state.pbn.airport.icaoCode}`)
              .then(res => {
                this.names = res.data
              })
              .catch(err => {
                if (err.response.statusText) {
                  const error = {
                    status: true,
                    message: err.response.statusText
                  }
                  this.$store.commit('IS_ERROR', error)
                } else if (!err.response) {
                  const error = {
                    status: true,
                    message: 'ERR_CONNECTION_REFUSED'
                  }
                  this.$store.commit('IS_ERROR', error)
                } else {
                  const error = {
                    status: true,
                    message: err.response.data
                  }
                  this.$store.commit('IS_ERROR', error)
                }
              })
      }
    }
  }
</script>
