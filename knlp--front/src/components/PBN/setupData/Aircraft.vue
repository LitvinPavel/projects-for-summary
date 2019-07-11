<template>
  <div>
    <v-dialog light v-model="createAircraft" >
      <v-card>
        <v-card-title class="headline">Добавить новое ВС</v-card-title>
        <v-card-text>
          <v-text-field v-model="newAircraft.model" label="Введите тип ВС" light></v-text-field>
          <v-text-field v-model="newAircraft.name" label="Введите номер ВС" light></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="createAircraft = false">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addAircraft">
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-autocomplete
        v-model="aircraft"
        :items="aircrafts"
        :search-input.sync="getAircraft"
        @input="$emit('saved', aircraft)"
        label="№ ВС..."
        validate-on-blur
        hide-no-data
        item-text="name"
        autofocus
        return-object
        solo
        light
        >
        <v-slide-x-reverse-transition
          slot="append"
          mode="out-in"
        >
        <v-icon color="primary" x-large @click="createAircraft=true">mdi-plus</v-icon>
        </v-slide-x-reverse-transition>
        <template slot="no-data">
          <span class="pa-2">Нет данных</span>
        </template>
      </v-autocomplete>
  </div>
</template>

<script>
  export default {
    data: () => ({
      createAircraft: false,
      newAircraft: {
        id: 0,
        name: '',
        model: ''
      },
      aircraft: {
        id: 0,
        name: '',
        model: ''
      },
      aircrafts: [],
      getAircraft: null
    }),
    watch: {
      getAircraft(val) {
            this.$http.get(`Aircraft/Find?name=${val}`)
              .then(res => {
                this.aircrafts = res.data
              })
              .catch(err => {
                  const error = {
                    status: true,
                    message: err.response.data
                  }
                  this.$store.commit('IS_ERROR', error)
              })
      }
    },
    methods: {
      save() {
        this.$store.state.pbn.aircraft = this.aircraft
      },
      addAircraft() {
        if (this.newAircraft.name.length > 2) {
          this.$http.post(`Aircraft/Add`, this.newAircraft, {
              headers: { 'Content-type': 'application/json' }
            })
            .then(() => {
              this.createAircraft = false
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>