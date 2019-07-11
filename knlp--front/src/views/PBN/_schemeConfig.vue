<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between">
      Конфигурация схемы
    </v-card-title>
    <v-divider></v-divider>
    <v-layout align-center justify-center row mx-4>
      <v-chip class="headline" outline label>
        <b>Модель ВС: </b><i class="pl-2 white--text">{{ $store.state.pbn.aircraft.model }}</i>
      </v-chip>
      <v-spacer></v-spacer>
      <v-chip class="headline" outline label>
        <b>Борт №: </b><i class="pl-2 white--text">{{ $store.state.pbn.aircraft.name }}</i>
      </v-chip>
      <v-spacer></v-spacer>
      <v-chip class="headline" outline label>
        <b>ИКАО Аэропорта: </b><i class="pl-2 white--text">{{ $store.state.pbn.airport.icaoCode }}</i>
      </v-chip>
    </v-layout>
    <v-card-text style="height: 59vh;">
      <v-layout justify-center column fill-height>
        <section class="text-xs-center">
          <v-dialog v-model="confirm" width="600">
            <v-card light>
              <v-card-title class="title grey lighten-2">
                Подтвердите удаление маршрута из схемы
              </v-card-title>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="secondary" flat @click="confirm = false" autofocus>
                  Отмена
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="(scheme.splice(deleteIndex, 1), confirm = false)">
                  Удалить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-layout justify-space-around row nowrap class="mb-2">
            <v-dialog v-model="addSid">
              <v-btn slot="activator" color="primary">
                <v-icon left>mdi-plus</v-icon>
                SID</v-btn>
              <add-sid-star :scheme="scheme" :type="{name: 'SID', value: 'Sids'}" @closed="addSid = false" @saved="save"></add-sid-star>
            </v-dialog>
            <v-dialog v-model="addStar">
              <v-btn slot="activator" color="primary">
                <v-icon left>mdi-plus</v-icon>
                STAR</v-btn>
              <add-sid-star :scheme="scheme" :type="{name: 'STAR', value: 'Stars'}" @closed="addStar = false" @saved="save"></add-sid-star>
            </v-dialog>
            <v-dialog v-model="addApch">
              <v-btn slot="activator" color="primary">
                <v-icon left>mdi-plus</v-icon>
                APPROACH</v-btn>
              <add-apch v-if="addApch" :scheme="scheme" @closed="addApch = false" @saved="save"></add-apch>
            </v-dialog>
            <v-btn :disabled="true" color="primary">
              <v-icon left>mdi-plus</v-icon>
              ROUTE</v-btn>
          </v-layout>
          <v-data-table style="height: 48vh; overflow-y: auto;" :headers="headers" :items="scheme" hide-actions item-key="key">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" v-if="props.item.type === 0">SID</td>
              <td class="text-xs-left" v-if="props.item.type === 1">STAR</td>
              <td class="text-xs-left" v-if="props.item.type === 2">APPROACH</td>
              <td class="text-xs-center">{{ props.item.transitionId }}</td>
              <td class="text-xs-center">{{ props.item.sidStarApproachId }}</td>
              <td class="text-xs-center">{{ props.item.specificationStr }}</td>
              <td class="text-xs-center custom_chip">
                <template v-if="index <= 2">
                  <v-chip v-for="(points, index) in props.item.sequence" :key="index + 'point'" label outline>
                    <span>{{ points.fixId }}</span>
                  </v-chip>
                </template>
                <v-chip v-if="props.item.sequence.length > 3" label>
                  <span>+{{ props.item.sequence.length - 3 }}</span>
                </v-chip>
                <v-btn icon @click="props.expanded = !props.expanded">
                  <v-icon :class="props.expanded ? 'coup' : ''">mdi-chevron-down</v-icon>
                </v-btn>
              </td>
              <td class="justify-center layout px-0">
                <v-btn icon color="error" @click="deleteItem(props.item)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="error" outline>
                Добавьте тип операции полета.
              </v-alert>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card class="sub-table" flat color="grey darken-4">
                <v-card-text>
                  <v-data-table hide-actions :headers="props.item.type !== 2 ? subHeaders : subHeadersApch" :items="props.item.sequence" item-key="fixId">
                    <template slot="headers" slot-scope="props">
                      <td v-for="header in props.headers" :key="header.value"> {{header.text}}</td>
                    </template>
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.fixId }}</td>
                      <td>{{ props.item.pathTermination }}</td>
                      <td>{{ props.item.lat }}</td>
                      <td>{{ props.item.lon }}</td>
                      <td>{{ props.item.isRnavWaypoint ? '+' : '-' }}</td>
                      <td v-if="props.item.isMissedAproach !== null">{{ props.item.isMissedAproach ? '+' : '-' }}</td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </section>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn :to="'/pbn/setup-data'">
        Назад
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="scheme.length < 1" color="primary" depressed @click="submit" @keyup.enter="submit">
        Создать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import AddSidStar from '../../components/PBN/addSchemeElements/AddSidStar.vue'
  import AddApch from '../../components/PBN/addSchemeElements/AddApch.vue'
  import AddRoute from '../../components/PBN/addSchemeElements/AddRoute.vue'
  export default {
    components: {
      'add-sid-star': AddSidStar,
      'add-apch': AddApch,
      'add-route': AddRoute
    },
    data: () => ({
      count: 0,
      checkMApch: null,
      confirm: false,
      deleteIndex: 0,
      addStar: false,
      addSid: false,
      addApch: false,
      addRoute: false,
      headers: [
        { text: 'Тип', value: 'type', align: 'center', sortable: false },
        { text: 'Полоса', value: 'rwy', align: 'center', sortable: false },
        { text: 'Название', value: 'name', align: 'center', sortable: false },
        { text: 'Спецификация', value: 'specification', align: 'center', sortable: false },
        { text: 'Контрольные точки', value: 'points', align: 'center', sortable: false },
        { text: 'Удалить', align: 'right', sortable: false }
      ],
      subHeadersApch: [
        { text: 'Контр. точка', value: 'fixId', align: 'center', sortable: false },
        { text: 'PT', value: 'pathTermination', align: 'center', sortable: false },
        { text: 'Широта', value: 'latitude', align: 'center', sortable: false },
        { text: 'Долгота', value: 'longitude', align: 'center', sortable: false },
        { text: 'RNAV', value: 'isRnavWaypoint', align: 'center', sortable: false },
        { text: 'M-APCH', value: 'isMissedAproach', align: 'center', sortable: false },
      ],
      subHeaders: [
        { text: 'Контр. точка', value: 'fixId', align: 'center', sortable: false },
        { text: 'PT', value: 'pathTermination', align: 'center', sortable: false },
        { text: 'Широта', value: 'latitude', align: 'center', sortable: false },
        { text: 'Долгота', value: 'longitude', align: 'center', sortable: false },
        { text: 'RNAV', value: 'isRnavWaypoint', align: 'center', sortable: false },
      ],
      scheme: [],
      editedIndex: -1,
      defaultItem: {}
    }),
    mounted() {
      this.$store.commit('BACK_PAGE', '/pbn/setup-data')
    },
    methods: {
      subItems(value, check) {
        if (check === null) {
          this.scheme.push()
          return value
        } else if (check) {
          return value
        } else {
          value = value.filter(el => el.isMissedAproach === false)
          return value
        }
      },
      deleteItem(item) {
        this.deleteIndex = this.scheme.indexOf(item)
        this.confirm = true
      },
      close() {
        this.addStar = false
        this.addSid = false
        this.addApch = false
      },
      save(item, check) {
        this.checkMApch = check
        let schemeElement = item
        schemeElement.key = `${item.id}-${this.count}`
        this.scheme.push(schemeElement)
        this.$store.state.pbn.scheme = this.scheme
        this.count++
        this.close()
      },
      submit() {
        if (this.scheme.length >= 1) {
          this.$store.dispatch('SET_RNAV', this.scheme)
          this.$router.push('/pbn/flyby-mode')
        }
      }
    }
  }
</script>
<style>
  table.v-table thead th,
  table.v-table tbody td {
    font-size: 1.2rem;
  }
  .handle {
    cursor: move !important;
    cursor: -webkit-grabbing !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .coup {
    transform: rotate(180deg);
  }
  .custom_chip>span>span.v-chip__content {
    padding: 0 3px;
  }
  .custom_chip>span {
    height: 23px;
  }
</style>

