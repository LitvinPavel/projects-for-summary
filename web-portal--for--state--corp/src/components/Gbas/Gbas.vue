<template>
    <main>
        <header class="d-flex justify-content-center">
            <h1 class="text-center col-9" v-t="tabIndex == 0 ? 'gbas.title_map' : 'gbas.title_gnss'"></h1>
        </header>
        <section>
            <b-tabs no-nav-style nav-wrapper-class="tab_custom" v-model="tabIndex">
                <b-tab :title="$t('gbas.map')" active>
                    <Map @getCoordinate="raim = $event"></Map>
                </b-tab>
                <b-tab :title="$t('gbas.more')">
                    <b-row class="contant col-12">
                        <b-col cols="12" md="12" lg="auto">
                            <ChangeAir @changeGbas="Station = $event"  @changeGbasSatellites="satellites = $event" :raim="raim"></ChangeAir>
                        </b-col>
                        <b-col class="d-flex">
                            <Status :Satellites="satellites" :station="Station" :state="$t('gbas.state')" class="w-100"></Status>
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
        </section>
    </main>
</template>

<script>
    import favt from '../../img/favt-icon.png'
    import gkovd from '../../img/gkovd-icon.png'
    import nppf from '../../img/nppf-icon.png'
    import Map from './modules/gbasMap.vue'
    import ChangeAir from './modules/changeAir.vue'
    import Status from './modules/status.vue'
    import SatVis from './modules/satVisGbas.vue'
    export default {
        data() {
            return {
              tabIndex: 0,
                favt: favt,
                gkovd: gkovd,
                nppf: nppf,
                satellites: {},
                Station: {},
                raim: []
            }
        },
        components: {
            Map,
            ChangeAir,
            Status,
            SatVis
        }
    }
</script>
<style>
    .contant {
        background: rgba(250, 250, 250, 0.3);
        border-radius: 15px;
        -moz-border-radius: 15px;
        -webkit-border-radius: 15px;
        -o-border-radius: 15px;
        padding: 8px 8px 8px 8px;
        border: 8px solid rgb(100, 125, 145);
    }
    .sub_tab_custom,
    .tab_custom {
        padding-left: 15px;
    }
    .sub_tab_custom a.active,
    .tab_custom a.active {
        background-color: #ecf0f4;
        margin-bottom: -2px;
        border-bottom-width: 2px;
      border-bottom-style:solid;
      border-bottom-color: #e6ecf0;
    }
    .sub_tab_custom a,
    .tab_custom a {
      background-color: #88A7BF;
      border-top-width: 2px;
      border-left-width: 2px;
      border-right-width: 2px;
      border-bottom-width: 0;
      border-style: groove;
      border-color: threedface;
        color: #363636;
        font-weight: bold;
        border-radius: 5px 5px 0px 0px;
        -o-border-radius: 5px 5px 0px 0px;
        -webkit-border-radius: 5px 5px 0px 0px;
        -moz-border-radius: 5px 5px 0px 0px;
        
        padding: 3px 8px;
    }
</style>
