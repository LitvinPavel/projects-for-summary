<template>
  <v-card light>
    <v-card-title class="headline">Подтвердите действие</v-card-title>
    <v-card-text>Вы собираетесь завершить запись сессии</v-card-text>
    <v-card-actions>
      <v-btn flat @click="$emit('stoped', false)">Отменить</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="$emit('stoped', true)">Принять</v-btn>
    </v-card-actions>
  </v-card>
</template>


<style>
  /* .state_index {
    box-shadow: 0 0 5px #fff;
    margin: 2px 2px 2px;
  } */
</style>
