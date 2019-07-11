<template>
  <v-card color="black">
    <v-toolbar dark>
      <v-btn icon dark @click="$emit('saved')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="headline">Конфигурация приемника</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="primary" @click="$emit('saved')">Применить</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <h1 class="display-1 mb-3">Частота приемника</h1>
      <v-text-field solo light v-model="frequency" clearable></v-text-field>
      <span class="grey--text text--darken-1 subheading">
        108025 кГц - 117975 кГц
      </span>
      <h1 class="display-1 mb-3">RSDS</h1>
      <v-text-field solo light v-model="channel" clearable></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      frequency: 114350,
      channel: 5
    })
  }
</script>