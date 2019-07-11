<template>
    <fieldset  id="availabilityRaim">
        <legend>{{$t('raimAir.avalTitle')}} - <b>{{airnavBody.Icao}}</b></legend>
        <b-progress height="40px" class="mt-1"  :max="select*2">
            <b-progress-bar v-for="(progress, name, index) in raim" :value="1" :variant="progress" :key="index" v-b-tooltip.hover :title="name" class="border"></b-progress-bar>
        </b-progress>
        <b-row>
            <b-col cols="6" class="border-bottom border-right border-left border-dark pt-1 mt-1"></b-col>
            <b-col cols="6" class="border-bottom border-right border-left border-dark pt-1 mt-1"></b-col>
            <b-col cols="12" class="d-flex justify-content-between p-0">
                <b-col cols="4" class="text-left">{{Av[0]}}</b-col><b-col cols="4" class="text-center">{{Av[select]}}</b-col><b-col cols="4" class="text-right" >{{Av[length]}}</b-col>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-end">
                <b-col sm="6" lg="2">
                    <span class="pr-3 pl-3 mr-1 bg-success"></span> <span v-t="'raimAir.success'"></span>   
                </b-col>
                <b-col sm="6" lg="2">
                    <span class="pr-3 pl-3 mr-1 bg-danger"></span> <span v-t="'raimAir.error'"></span>   
                </b-col>
            </b-col>
        </b-row>
    </fieldset>   
</template>

<script>

export default {
    name: 'availabilityRaim',
    props: ['select', 'Av', 'length', 'raim', 'airnavBody'],
    computed: {
        progress () {
                return {
                    select: this.select,
                    Av: this.Av,
                    length: this.length,
                    raim: this.raim,
                    airnavBody: this.airnavBody
                }
            }
    }
    
  
}
</script>
<style>
.row {
    margin: 0;
    padding: 0;
}
</style>
