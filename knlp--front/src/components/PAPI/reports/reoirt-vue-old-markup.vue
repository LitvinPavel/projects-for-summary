<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card light class="grey darken-3" style="height: 100vh; overflow-y: hidden;">
              <v-toolbar dark>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="headline">Предварительный просмотр</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="primary">Выгрузить отчет</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text 
            class="white ml-3 my-3 pa-0" 
            style="height: calc(100vh - 90px); width: 97%; overflow-y: hidden; box-shadow: 0 0 15px rgba(0,0,0,0.8);"
          >
            <img class="mb-3" width="175" height="45" src='../../../img/spectr_logo_dark.png' alt="spectr_logo" />
            <v-layout row>
              <table class="__reports_table">
                <tr>
                  <td style="width: 30%;">
                    Аэропорт: UUBC<br>ВПП: 31 - Нет<br>Борт: 67469
                  </td>
                  <td style="width: 30%;">
                    Начало проверки:<br>09:59:36 03.12.2017<br>Окончание проверки:<br>10:10:06 03.12.2017<br>Оператор: Зильберштейн
                  </td>
                  <td class="text-xs-center" style="width: 40%; text-decoration: underline;">
                    <span>Примечания</span>
                  </td>
                </tr>
              </table>
    </v-layout>
    <v-layout row class="mt-3 justify-center font-weight-black">
      УГН
    </v-layout>
    <v-layout row class="mt-1 justify-center">
      <div class="text-xs-center" style="border: 1px solid black; width: 30%;"><span>180.0</span></div>
    </v-layout>
    <v-layout row class="mt-3 justify-center font-weight-black">
      Требуемые углы установки огней
    </v-layout>
    <v-layout row class="mt-1 justify-center">
      <div class="text-xs-center"><span>1 (D)</span></div>
    </v-layout>
    <v-layout row class="mt-1 justify-center">
      <div class="text-xs-center" style="border: 1px solid black; width: 100%;"><span>180.0</span></div>
    </v-layout>
    <v-layout row class="mt-3 justify-center font-weight-black">
      Предельные значения углов устрановки огней
    </v-layout>
    <v-layout row class="mt-1 justify-center">
      <div class="text-xs-center" style="border: 1px solid black; width: 100%;"><span>179.0 - 181.0</span></div>
    </v-layout>
    <v-layout row>
      <table class="__reports_table mt-4">
        <tr>
          <td colspan="3" style="background: #ccffcc;" class="text-xs-center font-weight-black">
            Углы установки огней
          </td>
        </tr>
        <tr>
          <td rowspan="2" class="text-xs-center pt-2">
            Номер отметки
          </td>
          <td colspan="2" style="background: #ccffcc;" class="text-xs-center font-weight-black">
            1 (D)
          </td>
        </tr>
        <tr>
          <td class="text-xs-center">
            Удаление (км.)
          </td>
          <td class="text-xs-center">
            Угол (мин.)
          </td>
        </tr>
        <tr v-for="angle in checkLampAngles" :key="angle.id" class="text-xs-center">
          <td>{{ angle.id }}</td>
          <td>{{ angle.offset }}</td>
          <td>{{ angle.angle }}</td>
        </tr>
        <tr class="text-xs-center font-weight-black" style="background: #ccffcc;">
          <td>Средний угол</td>
          <td colspan="2">{{ averageAngle }}</td>
        </tr>
      </table>
    </v-layout>
    <v-layout row class="mt-5">
      <v-spacer></v-spacer>
      <div class="mr-5 text-xs-center" style="border-top: 1px solid black; width: 20%;">Подпись</div>
      <div class="mr-5 text-xs-center" style="border-top: 1px solid black; width: 20%;">Расшифровка</div>
    </v-layout>
          </v-card-text>
      </v-card>
  </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['dialog'],
    data: () => ({
      airport: 'UUBC',
      aircraft: '67469',
      startCheck: '09:59:36 03.12.2018',
      endCheck: '10:10:06 03.12.2018',
      operator: 'Зильберштейн',
      ugn: 180.0,
      lamp: '1(D)',
      lampAngle: 180.0,
      angleLimit: '179.0 - 181.0',
      checkLampAngles: [
        { id: 1, offset: 6.7, angle: 176.4 },
        { id: 2, offset: 5.04, angle: 157.8 },
        { id: 3, offset: 4.6, angle: 157.6 },
        { id: 4, offset: 3.92, angle: 161.2 },
        { id: 5, offset: 3.62, angle: 162.7 },
        { id: 6, offset: 3.3, angle: 163.4 },
        { id: 7, offset: 3.01, angle: 165.4 },
        { id: 8, offset: 2.77, angle: 160.2 },
        { id: 9, offset: 2.37, angle: 167.2 },
        { id: 10, offset: 2.1, angle: 167.0 },
        { id: 11, offset: 1.46, angle: 178.9 }
      ],
      averageAngle: 178.9
    })
  }
</script>

<style scoped>
  .__reports_table {
    border-collapse: collapse;
    width: 100%;
  }
  .__reports_table td {
    border: 1px solid black;
    padding-left: 5px;
    vertical-align: top;
  }
</style>