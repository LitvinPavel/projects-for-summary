<template>
<main>
    <header class="d-flex justify-content-center">
		<h1 class="text-center col-9" v-t="'raimRF.title'"></h1>
	</header>
    <section>
        <div class="wrapper col">
            <b-row>
                <b-col order="1" order-xl="2" order-lg="2" order-md="1" order-sm="1" cols="12" lg="5" xl="4" md="12" sm="12">
                    <Request></Request>
                    <Monitoring :monitoringBody="monitoringBody"></Monitoring>
                </b-col>
                <b-col order="2" order-xl="1" order-lg="1" order-md="2" order-sm="2" cols="12" lg="7" xl="8" md="12" sm="12" class="mt-2" id="map">
                    <Map></Map>
                </b-col>
            </b-row>
        </div>
    </section>
</main>	
</template>

<script>
    import gkovd from '../../img/gkovd-icon.png'
    import nppf from '../../img/nppf-icon.png'
    import Request from './modules/request.vue'
    import Monitoring from './modules/monitoring.vue'
    import Map from './modules/rfMap.vue'

    export default {
    data () {
        return {
            myDate: new Date(),
            monitoringBody: {},
        }
    },
    methods: {
        availabilityRaim () {
            return (
                this.axios.get('../wwwroot/json/raimAirPred.json').then((response) => {
                let raim = response.data
                this.monitoringBody = raim.SatelliteAvailability
                }) 
            )
        }
    },
    components: {
        Request,
        Monitoring,
        Map
    }
}
</script>
