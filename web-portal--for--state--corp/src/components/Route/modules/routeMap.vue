<template>
   <fieldset class="position-relative p-0" style="height: 600px; border: 8px solid rgb(100, 125, 145);">
        <v-map style="height: 100%;" :zoom="zoom" :center="center">
            <v-icondefault></v-icondefault>
            <v-tilelayer :url="url"></v-tilelayer>
            <v-marker-cluster :options="clusterOptions" @clusterclick="click()">
                <v-marker v-for="c in icaoCoordinate" :lat-lng="c" :key="c.id" :icon="icon">        
                    <v-tooltip><tooltip-content :data="c" /></v-tooltip>
                </v-marker>
            </v-marker-cluster>
            <v-polyline :lat-lngs="icaoCoordinate"></v-polyline>
        </v-map>
    </fieldset>
</template>

<script>
    import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
    import L from 'leaflet'
    import * as Vue2Leaflet from 'vue2-leaflet'
    import iconUrl from '../../../img/icon/rtm-g.png'
    import shadowUrl from '../../../img/icon/rtm-gr.png'
    import TooltipContent from './TooltipContent.vue'

    export default {
        props: ['icaoCoordinate'],
    data () {
        let icon = L.icon({
            iconUrl: iconUrl,
            iconSize: [12,12]
        })
        return {
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 2,
            center: [37.485585, 55.78658],
            icon: icon, lng: 0, lat: 0,
            clusterOptions: {}, 
            
        }
    },
    computed: {
        coordinate () {
            return {
                icaoCoordinate: this.icaoCoordinate
            }
        }
    },
    components: {
        'v-map': Vue2Leaflet.LMap,
        'v-tilelayer': Vue2Leaflet.LTileLayer,
        'v-icondefault': Vue2Leaflet.LIconDefault,
        'v-marker': Vue2Leaflet.LMarker,
        'v-marker-cluster': Vue2LeafletMarkercluster,
        'v-polyline' : Vue2Leaflet.LPolyline,
        'v-tooltip' : Vue2Leaflet.LTooltip,
        'TooltipContent' : TooltipContent
    }
}
</script>



