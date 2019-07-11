<template>
  <v-card-text style="height: 64vh;">
    <v-layout justify-center column fill-height>
    <section>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="dates"
        lazy
        transition="scale-transition"
        offset-y
        light
        full-width
        min-width="200px"
      >
        <v-combobox
          slot="activator"
          v-model="dates"
          multiple
          label="Фильтр по дате"
          hide-details
          chips
          small-chips
          readonly
        ></v-combobox>
        <v-date-picker v-model="dates" multiple no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Отменить</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(dates)">Применить</v-btn>
        </v-date-picker>
      </v-menu>
    <v-data-table style="height: 60vh; overflow-y: auto;" :headers="headers" :items="reports" hide-actions item-key="date">
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{props.item.date}}</td>
      <td class="text-xs-left">{{ props.item.type }}</td>
      <td class="text-xs-center custom_chip">
        <v-chip v-for="(files, findex) in props.item.files" :key="findex" v-if="findex <= 4" label outline>
          <span>{{ files.name }}</span>
        </v-chip>
        <v-chip v-if="props.item.files.length > 5" label>
          <span>+{{ props.item.files.length - 5 }}</span>
        </v-chip>
        <v-icon :class="props.expanded ? 'coup' : ''" @click="props.expanded = !props.expanded">
          mdi-chevron-down
        </v-icon>
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
          <v-data-table hide-actions hide-headers :items="props.item.files">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="justify-end layout px-0">
                <v-btn small color="error" class="mt-2" @click="">
                  Выбрать
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </template>
  </v-data-table>
  </section>
  </v-layout>
  </v-card-text>
</template>

<script>
  export default {
    data: () => ({
      dates: ['2019-01-15', '2019-02-06'],
      menu: false,
      headers: [{
          text: 'Дата',
          align: 'left',
          value: 'date'
        },
        {
          text: 'Тип',
          align: 'left',
          sortable: false,
          value: 'type'
        },
        {
          text: 'Файлы',
          align: 'center',
          sortable: false,
          value: 'files'
        }
      ],
      reports: [
        {
          date: '2019-02-06',
          type: 'SID',
          files: [
            {name: 'first', key: 'sid_1'},
            {name: 'second', key: 'sid_2'},
            {name: 'andOther', key: 'sid_3'}
          ]
        },
        {
          date: '2019-01-15',
          type: 'STAR',
          files: [
            {name: 'first', key: 'star_1'},
            {name: 'second', key: 'star_2'},
            {name: 'andOther', key: 'star_3'}
          ]
        },
        {
          date: '2019-01-16',
          type: 'APPCH',
          files: [
            {name: 'first', key: 'appch_1'},
            {name: 'second', key: 'appch_2'},
            {name: 'andOther', key: 'appch_3'}
          ]
        }
      ]
    })
  }
</script>
