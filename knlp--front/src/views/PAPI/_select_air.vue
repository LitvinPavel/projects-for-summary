<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between">
      Выбор аэропорта
    </v-card-title>
    <v-divider></v-divider>
    
    <v-card-text style="height: 64vh;">
      <v-layout justify-center column>
        <section class="text-xs-center">
          <v-card>
    <v-card-title>
      <v-dialog v-model="isAddAir" fullscreen>
      <v-btn slot="activator" block color="primary">
        <v-icon left>mdi-plus</v-icon>
        <span>Добавить</span>
      </v-btn>
      <add-air @closed="isAddAir = false" @added="addNew"></add-air>
      </v-dialog>
            
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchAir"
        append-icon="mdi-magnify"
        label="Поиск"
        solo
        light
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      item-key="id"
      style="max-height: 373px; overflow-y:auto;"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.icaoCode }}</td>
        <td class="text-xs-center custom_chip">
          <template v-for="(vpp, vpp_id) in props.item.runways" >
            <v-chip :key="vpp_id + 'vpp'"  v-if="vpp_id <= 4" label outline>
              <span>{{ vpp.identifier }}</span>
            </v-chip>
          </template>
          <v-chip v-if="props.item.runways.length > 5" label>
            <span>+{{ props.item.runways.length - 5 }}</span>
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
      <span slot="no-data">Начните поиск аэропорта</span>
    </v-data-table>
  </v-card>
        </section>
      </v-layout>
    </v-card-text>
    <v-dialog v-model="dellDialog" max-width="490">
      <v-card light>
        <v-card-title class="headline">Подтвердите действие</v-card-title>
        <v-card-text>Вы собираетесь удалить аэропорт <b>{{ isDell.name }}</b></v-card-text>
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
  import AddAir from '../../components/PAPI/air/AddAir.vue'
  export default {
    components: {
      AddAir
    },
    data: () => ({
      isAddAir: false,
      dellDialog: false,
      isDell: false,
      searchAir: null,
      search: '',
        headers: [
          {
            text: 'Аэропорт',
            align: 'center',
            value: 'name'
          },
          {
            text: 'ИКАО',
            align: 'center',
            sortable: false, 
            value: 'icao'
          },
          {
            text: 'ВПП',
            align: 'center',
            sortable: false,
            value: 'vpp'
          },
          {
            text: '',
            align: 'center',
            sortable: false,
            value: 'action'
          }
        ],
        items: []
    }),
    mounted() {
      this.$store.commit('BACK_PAGE', '/papi')
      
    },
    watch: {
      searchAir(val) {
        if (val) {
          if (val.length > 1) {
            this.$http.get(`/papidb/Find?icao=${val}`)
              .then(res => {
                this.items = res.data
              })
              .catch(err => {
                console.log(err)
              })

            
          }
        }
      }
    },
    methods: {
      addNew(val) {
        this.items = this.items.concat(val)
        this.isAddAir = false
      },
      submit(val) {
        this.$store.commit('SAVE_AIRPORT', val)
        this.$router.push('/papi/vpp-selected')
      },
      isRemove(val) {
        this.dellDialog = true
        this.isDell = val
      },
      remove() {
          this.$http.delete(`papidb/delete?id=${this.isDell.id}`)
          const index = this.items.indexOf(this.isDell)
          this.items.splice(index, 1)
          this.dellDialog = false
        
      }
    }
  }
</script>

<style>
input {
  text-transform: uppercase;
}
</style>

