<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card light class="grey darken-3" style="height: 100vh; overflow-y: hidden;">
              <v-toolbar dark>
            <v-btn icon dark color="red" @click="dialog = false">
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
          <iframe src="/PapiReport/generate/5" style="width: 100%; height: 100%;" frameborder="0"></iframe>
          </v-card-text>
      </v-card>
  </v-dialog>
  </div>
</template>

<script>
  export default {
    props: ['dialog']
  }
</script>