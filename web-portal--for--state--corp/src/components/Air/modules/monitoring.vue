<template>
    <fieldset id="monitoringData">
        <legend v-t="'raimAir.monitoringTitle'"></legend>
        <div class="tb-wrap list ft">
            <table class="table table-hover table-sm border ">
                <thead><tr><th class="border border-dark border-top-0" scope="col" v-for="(head, index) in $t('raimAir.monitorinHead')" :key="index">{{head}}</th></tr></thead>
                <tbody>
                    <tr v-for="(body, index) in monitorinBody" :key="index">
                        <td class="border" >{{body.Constellation=='1' ?$t('raimAir.constellation[1].text'):$t('raimAir.constellation[2].text')}}</td>
                        <td class="border" >{{body.SV}}</td>
                        <td class="border" >{{body.IsAvailable==true ? $t('raimAir.available') : $t('raimAir.notavailable')}}</td>
                        <td class="border" >{{body.Reason}}</td>
                    </tr>
                </tbody>
            </table>
        </div>                  
    </fieldset>
</template>

<script>
export default {
    name: 'monitoringData',
    props: ['monitorinBody'],
    computed: {
        visibility () {
            return {
                monitorinBody: this.monitorinBody
            }
        }
    } 
}
</script>

<style>
.tb-wrap.list {
    height: 388px;
}
</style>
