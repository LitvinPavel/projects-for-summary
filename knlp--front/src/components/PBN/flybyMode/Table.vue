<template>
  <v-card style="padding-top: 15px;">
          <v-card-text>
            <v-layout class="box-tab-item justify-center mb-2">
              <h2 class="display-1">{{ $store.state.pbn.route.sidStarApproachId }}</h2>
            </v-layout>

            <v-data-table class="flyby" :headers="headersTable" :items="$store.state.pbn.tableRoute" hide-actions>
              <template slot="no-data">
                <td colspan="8" class="pt-2 black" style="text-align: center;">
                  <span></span>
                </td>
              </template>
              <template slot="items" slot-scope="props">
                <tr :class="props.item.positionStatus.isButtonPressed ? 'non-active' : ''">
                  <td class="text-xs-center">{{ props.item.time }}</td>
                  <td class="text-xs-center">{{ props.item.positionStatus.totalDistance }}</td>
                  <td class="text-xs-center">{{ props.item.positionStatus.segmentName === '' ? '-' : props.item.positionStatus.segmentName }}</td>
                  <td class="text-xs-center">{{ props.item.positionStatus.heading }}</td>
                  <td class="text-xs-center">{{ props.item.positionStatus.offset }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
</template>

<script>
  export default {
    data() {
      return {
        headersTable: [
          {
            text: 'Время',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'time'
          },
          {
            text: 'Дист. (м)',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'totalDistance'
          },
          {
            text: 'Отрезок',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'segmentName'
          },
          {
            text: 'Курс (°)',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'heading'
          },
          {
            text: 'Откл. (М)',
            align: 'center',
            sortable: false,
            class: 'headline',
            value: 'offset'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>