<template>
    <fieldset>
        <legend v-t="'raimRoute.routeTitle'"></legend>
        <b-row>
            <b-col md="6" xl="3">
                <label for="date" v-t="'raimRoute.date'"></label>
                <b-form-input id="date" v-model.trim="date" type="date" required></b-form-input>
            </b-col>
            <b-col md="6" xl="3">
                <label for="time" v-t="'raimRoute.time'"></label>
                <b-form-input id="time" v-model.trim="time" type="time" step="1" required></b-form-input>
            </b-col>
            <b-col md="6" xl="3">
                <label for="interval" v-t="'raimRoute.intervalLabel'"></label>
                <b-form-select id="interval" v-model="select_i" :options="$t('raimRoute.interval')" />
            </b-col>
            <b-col md="6" xl="3">
                <label for="constellation" v-t="'raimRoute.typeConstellat'"></label>
                <b-form-select id="constellation" v-model="select_c" :options="$t('raimRoute.constellation')" />
            </b-col>               
        </b-row>
        <b-row class="mb-2">
            <b-col cols="4"><b-button class="send-custom mt-2" size="sm" @click="getRoute"  v-t="'raimRoute.build'"></b-button></b-col>
            <b-col cols="4"><b-button class="send-custom mt-2" size="sm" @click="saver" v-t="'raimRoute.save'"></b-button></b-col>
            <text-reader  @load="rout = $event" @clear="check = $event" ></text-reader>
        </b-row>
        <div class="ft">
            <table class="table table-hover table-sm border ">
                <thead>
                    <tr><th class="border border-dark border-top-0" scope="col" v-for="head in $t('raimRoute.routeHead')" :key="head">{{head}}</th></tr>
                </thead>
                <tbody>
                    <tr v-for="(body, index) in setRoute.route" :key="index" >
                        <td class="border" ><button type="button" @click="delRaim(index)">&times;</button></td>
                        <td class="border" >{{index+1}}</td>
                        <td class="border" ><b-form-select id="operation" v-model="select_o" :options="$t('raimRoute.operation')" /></td>
                        <td class="border" ><b-form-input id="mask" v-model.trim="mask" type="number" step="1" min="0" max="90" required></b-form-input></td>
                        <td class="border" ><b-form-input id="offset" v-model.trim="offset" type="number" step="1" required></b-form-input></td>    
                        <td class="border" >{{body.icao}}</td>
                        <td class="border" >{{body.recordType}}</td>
                        <td class="border" >{{body.recordSubType}}</td>
                        <td class="border" >{{body.latitude}}</td>
                        <td class="border" >{{body.longitude}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </fieldset>
</template>

<script>
import FileSaver from 'file-saver'
import FileReader from "../../fileReader";

export default {
    props: ['rout1', 'coordinate', 'check'],
    data () {
        return {
            check2: false,
            check: 0,
            text: [],
            file: '',
            date: '',
            time: '',
            select_c: 'gnss',
            select_i: 15,
            routerHead: [ 'Вкл.', '№', 'Тип операции', 'Маска угла возвышения °', 'Смещение в минутах', 'ICAO', 'Тип записи', 'Подтип записи', 'Широта °', 'Долгота °' ],
            mask: 5,
            offset: 0,
            rout: {
                'route': [],
                'coordinate': []
            },
            coord: [],
            select_o: 'router'
        }
    },
    computed: {
        setRoute () {
            // if (this.rout.length > 0 && this.rout1.length <= 0) {
            //     return this.rout
            // } else if (this.rout.length > 0 && this.rout1.length > 0) {
            //     return Object.assign(this.rout, this.rout1)
            // } else if (this.rout.length <= 0 && this.rout1.length < 0)
            console.log(this.check)
            switch (this.check) {
                case 0:
                    return  this.rout1
                case 1:
                    return this.rout
                default:
                    return this. rout
            }
            
        },
        
    },
    methods: {
        delRaim(index) {
            this.setRoute.route.splice(index, 1)
            this.setRoute.coordinate.splice(index, 1)      
        },
        getRoute () {
            this.zoom = 3
            this.$emit('getCoordinate', this.setRoute.coordinate)
        },        
        saver () {
            var data = {
                'route': this.setRoute.route,
                'coordinate': this.setRoute.coordinate
            };
            var blob = new Blob([JSON.stringify(data)], {type:"text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, 'route.json');
        }
    },
    components: {
    'text-reader': FileReader
    },
}
</script>




