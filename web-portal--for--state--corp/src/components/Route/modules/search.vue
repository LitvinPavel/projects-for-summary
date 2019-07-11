<template>
    <fieldset>
        <legend v-t="'raimRoute.searchTitle'"></legend>
        <form>
            <b-row>
                <b-form-group horizontal :label-cols="3" label-size="sm" :label="$t('raimRoute.icao')" label-for="icao">
                    <b-form-input id="icao" size="sm" v-model.trim="icao" type="text" placeholder="UUEE" required></b-form-input>
                </b-form-group>
                <b-col class="ml-2"><b-button class="send-custom" size="sm" @click="searchRaim(icao)" v-t="'raimRoute.find'"></b-button></b-col>   
                <b-col class="ml-2"><b-button class="send-custom" size="sm" @click="clearSearch" v-t="'raimRoute.clear'"></b-button></b-col>        
            </b-row>
            <div class="ft">
                <table class="table table-hover table-sm border">
                    <thead>
                        <tr><th class="border border-dark border-top-0" scope="col" v-for="(head, index) in $t('raimRoute.airnavHead')" :key="index">{{head}}</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, key) in airnavBody" :key="key" @click="addRaim(key)">
                            <td class="border" >{{value.IcaoIdent}}</td>
                            <td class="border" >{{value.RecordType}}</td>
                            <td class="border" >{{value.RecordSubType}}</td>
                            <td class="border" >{{value.Latitude}}</td>
                            <td class="border" >{{value.Longitude}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>                  
        </form>
    </fieldset>
</template>

<script>
export default {
    data () {
        return {
            routerBody: [],
            searchBody: {},
            routerCoordinate: [],
            icao: '',
            airnavBody: []
        }
    },
    methods: {
        searchRaim (icao) {
        return (
            this.axios.get('../wwwroot/json/arnadPoints.json').then((response) => {
            this.airnavBody = response.data
            })
        )
        },
        clearSearch () {
        return this.airnavBody = [] 
        },
        addRaim (key) {
            let value = this.airnavBody
            this.searchBody = {
                'route': this.routerBody,
                'coordinate': this. routerCoordinate
            }
            return (
            this.routerBody.push({status: 'accepted', select_o: 'route', mask: 5, offset: 0, icao: value[key].IcaoIdent, recordType: value[key].RecordType, recordSubType: value[key].RecordSubType, latitude: value[key].Latitude, longitude: value[key].Longitude } ),
            this.routerCoordinate.push({ lng: value[key].Longitude, lat: value[key].Latitude }),
            
            this.$emit('getBody', this.searchBody),
            // this.$emit('getSearch', this.routerCoordinate),
            this.$emit('getCheck', 0)

            )
        }
    }
}
</script>




