<template id="changeAir">
    <fieldset>
        <legend v-t="'gbas.changeAirTitle'"></legend>
        <b-form-input type="text" v-model="search" :placeholder="$t('gbas.placeholder')" size="sm"></b-form-input>
        <div class="tb-wrap ft air_tab">
            <table class="table table-hover table-sm border ">
                <thead>
                    <tr>
                        <th class="border border-dark border-top-0" scope="col" v-for="(head, index) in $t('gbas.gbasHead')" :key="index">{{head}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(satellite, index) in filteredList" :key="index" @click="airChange">
                        <td class="border">{{satellite.NameRus}}</td>
                        <td class="border">{{satellite.RusIcao}}</td>
                        <td class="border">{{satellite.EnIcao}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </fieldset>
</template>

<script>
    export default {
        name: 'changeAir',
        props: ['raim'],
        data () {
            return {
                search: '',
                Station:[],
            }
        },
        computed: {
            changed () {
                return {
                    raim: this.raim
                }
            },
            filteredList() {
                return this.raim.filter(satellite => {
                    return satellite.EnIcao.concat(satellite.RusIcao).concat(satellite.NameRus).toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
        methods: {
            airChange: function() {
                this.axios.get('../wwwroot/json/GetRealTime.json').then((response) => {
                    let resultSatellites = response.data.data.Satellites
                    let resultStation = response.data.data.Station
                    this.Station = [
                                resultStation.Airport,
                        resultStation.CityName,
                        resultStation.IdStation,
                        resultStation.LastUpdateDateTime,
                        resultStation.GpsCount,
                        resultStation.GlonassCount,
                        resultStation.LatStd,
                        resultStation.LonStd,
                        resultStation.AltStd,
                        resultStation.LatDiff,
                        resultStation.LonDiff,
                        resultStation.AltDiff
                            ] 
                    this.$emit('changeGbas', this.Station)
                    this.$emit('changeGbasSatellites', resultSatellites)
                })
            }
        }, 
    }
</script>

<style scoped>
    .air_tab {
        max-height: 555px;
        overflow-y: auto;
        min-width: 338px;
    }
</style>