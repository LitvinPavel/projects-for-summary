<template>
   <v-card color="black">
    <v-toolbar dark>
      <v-btn icon dark @click="$emit('closed')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="headline">{{ formTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="primary" @click="$emit('saved', editedItem)">Применить</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text >
      <v-stepper v-model="e1" dark>
        <v-stepper-header >
          <v-stepper-step :editable="valid.fasId" :complete="e1 > 1" step="1">Полоса</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :editable="valid.rwy" :complete="e1 > 2" step="2">Полоса</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :editable="valid.ltpFtp" :complete="e1 > 3" step="3">LTP/FTP</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :editable="valid.fpap" :complete="e1 > 4" step="4">FPAP</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :editable="valid.gpa" :complete="e1 > 5" step="5">GPA</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="6">Проверка</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>

          <v-stepper-content step="1">
            <v-card class="mb-2" style="height: 62vh;">
              <h1 class="display-1 mb-5">Полоса</h1>
              <v-form v-model="valid.rwy">
                <h3 class="headline">Литералы полосы</h3>
                <v-select v-model="editedItem.params.lRwy" :items="literalRwy" label="Выберите литеру полосы" :rules="rules" solo light></v-select>
                
                <h3 class="headline mt-5">Номер полосы</h3>
                <v-text-field 
                  solo 
                  light 
                  v-model="editedItem.params.nRwy" 
                  :rules="[v => !!v || 'Поле обязательное!', v => (v >= 1 && v <= 36) || 'Укажите число в диапазоне от 1 до 36']" 
                  clearable
                ></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  1-36
                </span>
              </v-form>
            </v-card>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid.rwy" @click="e1 = 2">
                Далее
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-2" style="height: 62vh;">
              <h1 class="display-1 mb-3">LTP/FTP</h1>
              <v-form v-model="valid.ltpFtp">
                <h3 class="title">Широта порога ВПП</h3>
                <v-text-field 
                  solo 
                  light 
                  v-model="editedItem.params.latVPP" 
                  :rules="[v => !!v || 'Поле обязательное!', v => (v >= 0 && v <= 360) || 'Не верный формат значения. Укажите значение в градусах']" 
                  clearable
                ></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  градусы
                </span>
                <h3 class="title mt-3">Долгота порога ВПП</h3>
                <v-text-field 
                  solo 
                  light 
                  v-model="editedItem.params.longVPP" 
                  :rules="[v => !!v || 'Поле обязательное!', v => (v >= 0 && v <= 360) || 'Не верный формат значения. Укажите значение в градусах']" 
                  clearable
                ></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  градусы
                </span>
                <h3 class="title mt-3">Высота порога ВПП</h3>
                <v-text-field solo light v-model="editedItem.params.altVPP" :rules="rules" clearable></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  метры
                </span>
              </v-form>
            </v-card>
            <v-layout>
              <v-btn flat @click="e1 = 1">Назад</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid.ltpFtp" @click="e1 = 3">
                Далее
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-2" style="height: 62vh;">
              <h1 class="display-1 mb-3">FPAP</h1>
              <v-form v-model="valid.fpap">
                <h3 class="title">Смещение FPAP (по широте)</h3>
                <v-text-field 
                  solo 
                  light 
                  v-model="editedItem.params.latOffsetFPAP" 
                  :rules="[v => !!v || 'Поле обязательное!', v => (v >= 0 && v <= 360) || 'Не верный формат значения. Укажите значение в градусах']" 
                  clearable
                ></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  градусы
                </span>
                <h3 class="title mt-5">Смещение FPAP (по долготе)</h3>
                <v-text-field 
                  solo 
                  light 
                  v-model="editedItem.params.longOffsetFPAP" 
                  :rules="[v => !!v || 'Поле обязательное!', v => (v >= 0 && v <= 360) || 'Не верный формат значения. Укажите значение в градусах']" 
                  clearable
                ></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  градусы
                </span>
              </v-form>
            </v-card>
            <v-layout>
              <v-btn flat @click="e1 = 2">Назад</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid.fpap" @click="e1 = 4">
                Далее
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card class="mb-2" style="height: 62vh;">
              <h1 class="display-1 mb-5">GPA</h1>
              <v-form v-model="valid.gpa">
                <v-layout row nowrap>
                  <span class="headline">Угол глиссады</span>
                <v-spacer></v-spacer>
                <v-btn-toggle v-model="dimension">
                  <v-btn flat :value="true" @click="isDimension">
                    Градусы
                  </v-btn>
                  <v-btn flat :value="false" @click="isDimension">
                    Минуты
                  </v-btn>
                </v-btn-toggle>
                </v-layout>
                <v-text-field v-model="editedItem.params.glideAngle" solo light :rules="rules" clearable></v-text-field>
                <h3 class="headline mt-5">Высота пересечения порога</h3>
                <v-text-field solo light v-model="editedItem.params.altIntersec" :rules="rules" clearable></v-text-field>
                <span class="grey--text text--darken-1 subheading">
                  метры
                </span>
              </v-form>
            </v-card>
            <v-layout>
              <v-btn flat @click="e1 = 3">Назад</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid.gpa" @click="e1 = 5">
                Далее
              </v-btn>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card class="mb-2" style="height: 65vh;">
              <v-data-table :headers="headers" :items="preview" hide-actions class="point_table">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.value }}</td>
                  <td class="text-xs-right">{{ props.item.dimension }}</td>
                </template>
              </v-data-table>
            </v-card>
            <v-layout>
              <v-btn flat @click="e1 = 4">Назад</v-btn>
              <v-spacer></v-spacer>
            </v-layout>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ['editedItem', 'editedIndex'],
    data: () => ({
      e1: 0,
      valid: {
        ltpFtp: false,
        fpap: false,
        gpa: false
      },
      rules: [
        v => !!v || 'Поле обязательное!'
      ],
      dimension: true,
      literalRwy: ['Нет', 'L', 'R', 'C'],
      headers: [
        { text: 'Название', align: 'left', sortable: false, value: 'name' },
        { text: 'Значение', align: 'center', sortable: false, value: 'value' },
        { text: 'Размерность', align: 'right', sortable: false, value: 'dimension' },
      ]
    }),
    computed: {
      validation() {
        return Object.values(this.valid).find(el=>el===false) === undefined ? false : true
      },
      formTitle() {
        return this.editedIndex === -1 ? 'Добавление FAS блока' : 'Изменение FAS блока'
      },
      preview () {
        return [
        {name: 'RPDS', value: this.editedItem.params.rpds, dimension: '0-48'},
        {name: 'RPI', value: this.editedItem.params.rpi, dimension: '3-4 СИМВОЛА'},
        {name: 'Литералы полосы', value: this.editedItem.params.lRwy, dimension: '1-36'},
        {name: 'Номер полосы', value: this.editedItem.params.nRwy, dimension: 'R, L, C, НЕТ'},
        {name: 'Широта порога ВПП', value: this.editedItem.params.latVPP, dimension: 'ГРАДУСЫ'},
        {name: 'Долгота порога ВПП', value: this.editedItem.params.longVPP, dimension: 'ГРАДУСЫ'},
        {name: 'Высота порога ВПП', value: this.editedItem.params.altVPP, dimension: 'МЕТРЫ'},
        {name: 'Смещение FPAP (по широте)', value: this.editedItem.params.latOffsetFPAP, dimension: 'ГРАДУСЫ'},
        {name: 'Смещение FPAP (по долготе)', value: this.editedItem.params.longOffsetFPAP, dimension: 'ГРАДУСЫ'},
        {name: 'Угол глиссады', value: this.editedItem.params.glideAngle, dimension: 'ГРАДУСЫ'},
        {name: 'Высота пересечения порога', value: this.editedItem.params.altIntersec, dimension: 'МЕТРЫ'}
      ]
      } 
    },
    methods: {
      isDimension () {
        this.editedItem.params.glideAngle = this.dimension ? Math.round(parseFloat(this.editedItem.params.glideAngle * 60).toFixed(6)) : parseFloat(parseFloat(this.editedItem.params.glideAngle / 60).toFixed(6))
      }
    }
  }
</script>

<style scoped>

  .v-messages__message {
    font-size: 1.3rem;
  }
  .point_table {
    height: 64vh;
    overflow-y: auto;
  }

</style>