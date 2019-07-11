<template>
<main>
    <header class="d-sm-flex justify-content-sm-end d-md-flex justify-content-md-center">
		<h1 class="col-4" v-t="'raimAir.title'"></h1>
	</header>
    <section>
        <div class="wrapper col">
        <b-row>
            <b-col>
                <fieldset>
                    <legend v-t="'raimAir.searchTitle'"></legend>
                    <form v-on:submit.prevent>
                        <b-row class="text-center mt-2 rounded m-md-auto">
                            <b-col sm="5" lg="1" xl="1" >
                                <label class="form-control md-text-right bg-transparent border-0 col col-md-6 ml-md-auto pt-2" for="icao" v-t="'raimAir.icao'"></label> 
                            </b-col>
                            <b-col sm="6" lg="3" xl="3" class="justify-content-center">
                                <Search @selectObj="airnavBody = $event" class="col-md-6 col-lg-12 mt-1"></Search>
                            </b-col>
                            <b-col sm="12" lg="8" xl="8" class="justify-content-center row">
                                <input v-for="(dataSelect, index) in airnavBody" :key="index" class="form-control col-sm-3 col-lg-3 text-center mt-1" type="text" :placeholder="dataSelect" readonly>
                            </b-col>
                        </b-row>  
                    </form>
                </fieldset>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <fieldset>
                    <legend v-t="'raimAir.requestTitle'"></legend>
                    <form>
                        <Request @getRDA="select_i = $event"></Request>
                        <b-button @click="availabilityRaim" class="send-custom" size="sm" v-t="'raimAir.getForecast'"></b-button> 
                    </form>
                </fieldset>
            </b-col>
        </b-row>
        <b-row v-if="show">
            <b-col>
                <Availability :select="select_i" :Av="av" :length="av_length" :raim="raim.AvalibleTime" :airnavBody="airnavBody"></Availability>
            </b-col>
        </b-row>
        <b-row v-if="show" >
            <b-col lg="auto" sm="12">
                <SatVis :Satellites="satellites"></SatVis>
            </b-col>
            <b-col class="d-flex">
                <Monitoring :monitorinBody="monitoring" class="w-100"></Monitoring>
            </b-col>
        </b-row>
        </div>
    </section>
</main>
	
</template>

<script>
    import favt from '../../img/favt-icon.png'
    import gkovd from '../../img/gkovd-icon.png'
    import nppf from '../../img/nppf-icon.png'
    import Search from './modules/search.vue'
    import Request from './modules/request.vue'
    import Availability from './modules/availability.vue'
    import SatVis from './modules/satVis.vue'
    import Monitoring from './modules/monitoring.vue'
    
    export default {
        data () {
            return {
                show: false,
                favt: favt,
                gkovd: gkovd,
                nppf: nppf,
                satellites: {},
                raim: {},        
                select_i: 15,
                airnavBody: {},
                monitoring: {},
                av: [],
                av_length: 0
            }
        },
        methods: {
            availabilityRaim () {
                return (
                    this.axios.get('../wwwroot/json/raimAirPred.json').then((response) => {
                        this.raim = response.data
                        this.av = Object.keys(this.raim.AvalibleTime)
                        this.av_length = this.av.length-1
                        this.satellites = this.raim.Satellites
                        this.monitoring = this.raim.SatelliteAvailability
                        if (this.airnavBody.Icao !== undefined) {
                            this.show = true
                        }
                    })
                )
            } 
        },
        components: {
            Search,
            Request,
            Availability,
            SatVis,
            Monitoring
        }
    }
</script>

