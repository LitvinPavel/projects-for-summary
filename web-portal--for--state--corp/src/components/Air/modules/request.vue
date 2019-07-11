<template>
    <b-row class="mb-2">
        <b-col md="4">
            <label for="date" v-t="'raimAir.date'"></label>
            <b-form-input id="date" v-model.trim="date" type="date" size="sm" :value="myDate && myDate.toISOString().split('T')[0]" required></b-form-input>
        </b-col>
        <b-col md="4">
            <label for="time" v-t="'raimAir.time'"></label>
            <b-form-input id="time" v-model.trim="time" type="time" step="1" size="sm" :value="myTime" required></b-form-input>
        </b-col>    
        <b-col md="4">
            <label for="operation" v-t="'raimAir.typeOperation'"></label>
            <b-form-select id="operation" v-model="select_o" :options="$t('raimAir.operation')" size="sm"/>
            
        </b-col>
        <b-col md="4">
            <label for="mask" v-t="'raimAir.mask'"></label>
            <b-form-input id="mask" v-model.trim="mask" type="number" size="sm"></b-form-input>
        </b-col>
        <b-col md="4">
            <label for="constellation" class="p-0" v-t="'raimAir.typeConstellat'"></label>
            <b-form-select id="constellation" v-model="select_c" :options="$t('raimAir.constellation')" size="sm"/>
        </b-col>    
        <b-col md="4">
            <label for="interval" v-t="'raimAir.intervalLabel'"></label>
            <b-form-select id="interval" v-model="select_i" @input="$emit('getRDA', select_i)"  :options="$t('raimAir.interval')" size="sm"/>
        </b-col>      
    </b-row>         
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
            select_o: 'terminal',
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

