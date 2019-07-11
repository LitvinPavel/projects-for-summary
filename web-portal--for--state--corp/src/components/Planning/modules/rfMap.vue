<template>
   <fieldset class="position-relative p-0" style="height: 642px; border: 8px solid rgb(100, 125, 145);">
        <v-map style="height: 100%;" :zoom="zoom" :center="center">
            <v-tilelayer :url="url"></v-tilelayer>
        </v-map>
    </fieldset>
</template>

<script>
    import L from 'leaflet'
    import * as Vue2Leaflet from 'vue2-leaflet'

    export default {
    data () {
        return {
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 3,
            center: [64, 100]
        }
    },
    components: {
        'v-map': Vue2Leaflet.LMap,
        'v-tilelayer': Vue2Leaflet.LTileLayer
    }
}
</script>



