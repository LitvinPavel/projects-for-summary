<template>
    <b-col id="map">
        <fieldset class="position-relative p-0" style="height: 600px; border: 8px solid rgb(100, 125, 145);">
            <v-map style="height: 100%;" :zoom="zoom" :minZoom="minZoom" :maxZoom="maxZoom" :center="center">
                <v-tilelayer :url="url"></v-tilelayer>
                <v-marker v-for="c in icaoCoordinate" :lat-lng="[c.Latitude, c.Longitude]" :key="c.Latitude" :icon="iconText(c.EnIcao,c.NameRus)" > 
                    <v-popup><popup-content :data="c" /></v-popup>
                </v-marker>  
                <v-circle v-for="(point, index) in icaoCoordinate" 
                    :lat-lng="[point.Latitude, point.Longitude]" 
                    :color="optionsCircle.color" 
                    :opacity="optionsCircle.opacity" 
                    :weight="optionsCircle.weight"
                    :fillColor="optionsCircle.fillColor"
                    :radius="optionsCircle.radius"
                    :key="index">
                </v-circle>
            </v-map>
        </fieldset>
    </b-col>
</template>

<script>
    import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
    import L from 'leaflet'
    import * as Vue2Leaflet from 'vue2-leaflet'
    import iconUrl from '../../../img/icon/rtm-g.png'
    import PopupContentGbas from './popupContentGbas.vue'

    export default {
    data () {
        return {
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 3,
            minZoom: 3,
            maxZoom: 18,
            center: [64, 100],
            icaoCoordinate: [],
            optionsCircle: {
                color: "green",
                fillColor:"green", 
                radius: 350000,
                weight: 0.6,
                opacity: 0.5  
            }
        }
    },
    beforeCreate () {
        this.axios.get('../wwwroot/json/GetLkks.json').then((response) => {
            this.icaoCoordinate = response.data
            this.$emit('getCoordinate', this.icaoCoordinate)
        })   
    },
    methods: {
        iconText (icao, name) {
            return this.icon = L.divIcon({
                html: `<div class="mt-1 my-label">${icao}<br>(${name})</div>`  
            })
        }
    },
    components: {
        'v-map': Vue2Leaflet.LMap,
        'v-tilelayer': Vue2Leaflet.LTileLayer,
        'v-marker': Vue2Leaflet.LMarker,
        'v-popup': Vue2Leaflet.LPopup,
        'v-circle' : Vue2Leaflet.LCircle,
        'PopupContent' : PopupContentGbas
    }
}
</script>
<style>
.leaflet-div-icon {
    background-image: url('../../../img/icon/rtm-g.png');
    background-position: center;
    width: 8px;
    height: 8px;
    border-radius: 10px;
}
.my-label {
    position: absolute;
    width: 250px;
    font-size: 11px;
    font-weight: bold;
    color: white;
    padding-top: 5px;
    margin-left: -120px;
    text-align: center;
    text-shadow: black 1px 1px 0, black -1px -1px 0, black -1px 1px 0, black 1px -1px 0;
}
</style>


