<template>
  <v-layout class="appear" align-center column justify-center fill-height>
    <img class="mb-5" width="350" height="90" src='../img/spectr_big.png' alt="spectr" />
    <div class="btn" style="width: 100%; text-align: center;">
      <v-btn class="display-1" outline :disabled="!activePages.rnavActive" :to="$page.pbn.link">PBN (RNAV, RNP)</v-btn>
      <v-btn class="display-1" outline :disabled="!activePages.knlpActive" :to="$page.knlp.link">КНЛП</v-btn>
      <v-btn class="display-1" outline :disabled="!activePages.papiActive" :to="$page.papi.link">Облет огней PAPI</v-btn>
      <v-btn class="display-1" outline color="teal" @click="openSetting=true">Настройки</v-btn>
      <v-dialog v-model="openSetting" fullscreen hide-overlay transition="dialog-bottom-transition">
        <main-setting v-if="openSetting" v-model="openSetting" :activePanel="null" :autoClose="false" @saved="save"></main-setting>
      </v-dialog>
    </div>
  </v-layout>
</template>

<script>
import MainSetting from '../components/MainSetting.vue'

export default {
  components: {
    MainSetting
  },
  data: () => ({
    openSetting: false
  }),
  computed: {
    activePages() {
      return this.$store.getters.activePages
    }
  },
  methods: {
    save() {this.openSetting = false} 
  }
}
</script>


<style>
  html {
    overflow-y: hidden;
  }
  .theme--dark.application {
    background: #000;
  }
  .appear {
    animation: emersionappear 1s ease-in-out;
  }
  .btn button,
  .btn a {
    height: 15vh;
    width: 70vw;
  }
  @keyframes emersionappear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
