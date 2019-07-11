<template>
  <main>
    <header class="d-flex justify-content-center">
      <h1 class="text-center col-9" v-t="'raimRoute.title'"></h1>
    </header>
    <section>
      <button class="send-custom" @click="show = !show" v-t="show ? 'raimRoute.hidden_params' : 'raimRoute.show_params'"></button>
      <transition name="slide-fade">
        <b-row v-if="show">
          <Search style="width: 100%;" @getBody="routerBody = $event" @getCheck="check = $event"></Search>
          <Route style="width: 100%;" :check="check" :coordinate="routerCoordinate" :rout1="routerBody" @getCoordinate="icaoCoordinate = $event"></Route>
        </b-row>
      </transition>
      <b-col class="mt-2" id="map">
        <Map :icaoCoordinate="icaoCoordinate"></Map>
      </b-col>
    </section>
  </main>
</template>

<script>
  import Route from './modules/route.vue'
  import Search from './modules/search.vue'
  import Map from './modules/routeMap.vue'
  export default {
    data() {
      return {
        show: true,
        check: 0,
        icaoCoordinate: [],
        routerBody: [],
        routerCoordinate: [],
      }
    },
    computed: {
      rand() {
        return {
          icaoCoordinate: this.icaoCoordinate
        }
      }
    },
    components: {
      Route,
      Search,
      Map
    }
  }
</script>
<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease-in;
  }
  .slide-fade-leave-active {
    transition: all .3s ease-out;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
