<template>
    <fieldset>
        <legend v-t="'raimRF.requestTitle'"></legend>
        <form>
            <b-form-group horizontal :label-cols="4" label-size="sm" :label="$t('raimRF.date')" label-for="date">
                <b-form-input id="date" v-model.trim="date" type="date" size="sm" :value="myDate && myDate.toISOString().split('T')[0]" ></b-form-input>
            </b-form-group>
            <b-form-group horizontal :label-cols="4" label-size="sm" :label="$t('raimRF.time')" label-for="time">
                <b-form-input id="time" v-model.trim="time" type="time" step="1" size="sm" :value="myTime" ></b-form-input>
            </b-form-group>
            <b-form-group horizontal :label-cols="4" label-size="sm" :label="$t('raimRF.typeOperation')" label-for="operation">
                <b-form-select id="operation" v-model="select_o" :options="$t('raimRF.operation')" size="sm"/>
            </b-form-group>    
            <b-form-group horizontal :label-cols="4" label-size="sm" :label="$t('raimRF.mask')" label-for="mask">
                <b-form-input id="mask" v-model.trim="mask" type="number" size="sm" ></b-form-input>
            </b-form-group>     
            <b-form-group horizontal :label-cols="4" label-size="sm" :label="$t('raimRF.typeConstellat')" label-for="constellation">
                <b-form-select id="constellation" v-model="select_c" :options="$t('raimRF.constellation')"  size="sm"/>
            </b-form-group> 
            <b-form-group horizontal :label-cols="4" label-size="sm" :label="$t('raimRF.intervalLabel')" label-for="interval">
                <b-form-select id="interval" v-model="select_i" :options="$t('raimRF.interval')" size="sm"/>
            </b-form-group>           
            <b-button @click="availabilityRaim" class="send-custom mt-2" size="sm" v-t="'raimRF.getForecast'"></b-button> 
        </form>
    </fieldset>
</template>

<script>
export default {
    data () {
        return {
            myDate: new Date(), 
            date: '',
            time: '',
            mask: 5, 
            select_c: 'gnss',
            select_i: '15',
            select_o: 'npa',
        }
    },
    computed: {
        myTime() {
  	        return (
                this.time =this.myDate.toISOString().split('T')[1], 
                this.time =this.time.split('.')[0]
            )
        },
    },
}
</script>


