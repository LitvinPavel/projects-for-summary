<template>
    <fieldset>
        <legend v-t="'raimRF.monitoringTitle'"></legend>
        <div class="tb-wrap list-plan ft">
            <table class="table table-hover table-sm border ">
                <thead><tr><th class="border border-dark border-top-0" scope="col" v-for="(head, index) in $t('raimRF.monitorinHead')" :key="index">{{head}}</th></tr></thead>
                <tbody>
                    <tr v-for="(body, index) in monitoringBody" :key="index">
                        <td class="border" >{{body.Constellation=='1' ?$t('raimRF.constellation[1].text'):$t('raimRF.constellation[2].text')}}</td>
                        <td class="border" >{{body.SV}}</td>
                        <td class="border" >{{body.IsAvailable==true ? $t('raimRF.available') : $t('raimRF.notavailable')}}</td>
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
    props: ['monitoringBody'],
    computed: {
        visibility () {
            return {
                monitoringBody: this.monitoringBody
            }
        }
    } 
}
</script>

<style>
.tb-wrap {
    background-color: rgba(250,250,250,0.6);
    border: 1px solid rgb(121, 121, 121);
    border-top: none;
    overflow: auto;
    overflow-y: scroll;
}
@media (min-width: 992px) {
    .list-plan {
        height: 212px;
    }
}
</style>
