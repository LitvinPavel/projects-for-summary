<template id="status">
    <b-tabs no-nav-style nav-wrapper-class="sub_tab_custom mt-1">
        <b-tab :title="$t('gbas.stateLabel')" active>
            <fieldset>
                <b-row class="pr-3">
                    <b-col>
                        <label  v-for="(name, index) in state" :key="index" class="input-group-prepend p-2" :for="index" >{{name}}</label>
                    </b-col>
                    <b-col>
                        <b-form-input class="p-2 m-2" readonly type="text" size="sm" v-for="(state, index) in station" :value="state" :key="index"></b-form-input>
                    </b-col>
                </b-row>
            </fieldset>
        </b-tab>
        <b-tab :title="$t('gbas.diffTitle')">
            <fieldset>
                <div class="d-flex pt-2 pb-1 justify-content-center">
                    <svg width="380" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">                                  
                        <circle v-for="c in svgW.circle" :key="c.r" class="circle" cx="225" cy="150" :r="c.r" :stroke="c.stroke"></circle>        
                        <text v-for="t in svgW.text" :key="t.x" :x="t.x" :y="t.y" text-anchor="middle" :fill="t.fill" font-family="Arial" font-size="15px" font-weight="normal">       
                            <tspan dy="5.5">{{t.mess}}</tspan>        
                        </text> 
                        <text x="41" y="270" text-anchor="middle" fill="orange" font-family="Arial" font-size="15px" font-weight="normal">       
                            <tspan dy="5.5">{{$t('gbas.terminal')}}</tspan>        
                        </text>     
                        <text x="30" y="290" fill="red" text-anchor="middle" font-family="Arial" font-size="15px" font-weight="normal">       
                            <tspan dy="5.5">{{$t('gbas.router')}}</tspan>        
                        </text> 
                        <path fill="none" stroke="#999" d="M240,150H210" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>        
                        <path fill="none" stroke="#999" d="M225,135V165" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>        
                        <circle cx="225" cy="150" r="2" fill="#6cc36c" stroke="#6cc36c" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle>        
                    </svg>
                </div>
                <div class="mt-4 mb-4 pt-1 d-flex justify-content-center border-top border-secondary">
                    <svg height="202" version="1.1" width="380" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.1875px;">        
                        <path v-for="(p, index) in svgH.path" :key="'p-'+index" fill="none" :stroke="p.stroke" :d="p.d" stroke-width="1.5" 
                            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>       
                        <text v-for="(t, index) in svgH.text" :key="'t-'+index" :x="t.x" :y="t.y" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" 
                            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: bold; 
                            font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial;" stroke-width="" font-size="12px" font-weight="bold">        
                            <tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">{{t.mess}}</tspan>        
                        </text>
                        <path fill="none" stroke="#3779ac" d="M45,100.27H360" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>        
                        <text x="175" y="100.27" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000" 
                            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: bold; 
                            font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial;" stroke-width="" font-size="12px" font-weight="bold">
                            <tspan dy="4.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">0.09</tspan>        
                        </text>        
                    </svg>
                </div>
            </fieldset>
        </b-tab>
        <b-tab :title="$t('gbas.autTitle')">
            <fieldset>
                <div class="d-flex pt-2 pb-1 justify-content-center">
                    <svg width="380" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">                                  
                        <circle v-for="c in svgW.circle" :key="c.r" class="circle" cx="225" cy="150" :r="c.r" :stroke="c.stroke"></circle>        
                        <text v-for="t in svgW.text" :key="t.x" :x="t.x" :y="t.y" text-anchor="middle" :fill="t.fill" font-family="Arial" font-size="15px" font-weight="normal">       
                            <tspan dy="5.5">{{t.mess}}</tspan>        
                        </text>
                        <text x="41" y="270" text-anchor="middle" fill="orange" font-family="Arial" font-size="15px" font-weight="normal">       
                            <tspan dy="5.5">{{$t('gbas.terminal')}}</tspan>        
                        </text>     
                        <text x="30" y="290" fill="red" text-anchor="middle" font-family="Arial" font-size="15px" font-weight="normal">       
                            <tspan dy="5.5">{{$t('gbas.router')}}</tspan>        
                        </text>        
                        <path fill="none" stroke="#999" d="M240,150H210" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>        
                        <path fill="none" stroke="#999" d="M225,135V165" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>        
                        <circle cx="225" cy="150" r="2" fill="#6cc36c" stroke="#6cc36c" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle>        
                    </svg>
                </div>
                <div class="mt-4 mb-4 pt-1 d-flex justify-content-center border-top border-secondary">
                    <svg height="202" version="1.1" width="380" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.1875px;">        
                        <path v-for="(p, index) in svgH.path" :key="'p-'+index" fill="none" :stroke="p.stroke" :d="p.d" stroke-width="1.5" 
                            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>       
                        <text v-for="(t, index) in svgH.text" :key="'t-'+index" :x="t.x" :y="t.y" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000000" 
                            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: bold; 
                            font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial;" stroke-width="" font-size="12px" font-weight="bold">        
                            <tspan dy="4" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">{{t.mess}}</tspan>        
                        </text>
                        <path fill="none" stroke="#3779ac" d="M45,100.27H360" stroke-width="1" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path>        
                        <text x="175" y="100.27" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#000" 
                            style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: bold; 
                            font-stretch: normal; font-size: 12px; line-height: normal; font-family: Arial;" stroke-width="" font-size="12px" font-weight="bold">
                            <tspan dy="4.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">0.09</tspan>        
                        </text>        
                    </svg>
                </div>
            </fieldset>
        </b-tab>
        <b-tab :title="$t('gbas.visibleTitle')">
            <fieldset style="min-height: 585px;">
                <SatVis :Satellites="Satellites"></SatVis>
            </fieldset>
        </b-tab>
    </b-tabs>
</template>

<script>
import SatVis from './satVisGbas.vue'
    export default {
        name: 'status',
        props: ['station', 'Satellites', 'state'],
        data() {
            return {
                svgW: {
                    circle: [ {r: "144", stroke: "red"}, {r: "126", stroke: "orange"}, {r: "93", stroke: "#0000ff"}, {r: "36", stroke: "#008000"}, ],
                    text: [ {x: "33", y: "230", fill: "#008000", mess: "APV PA"}, {x: "21", y: "250", fill: "#0000ff", mess: "NPA"}, ]
                },
                svgH: {
                    path: [ {stroke: "red", d: "M45,24H360"}, {stroke: "orange", d: "M45,50H360"}, {stroke: "#0000ff", d: "M45,68H360"}, {stroke: "#6cc36c", d: "M45,100H360"}, 
                            {stroke: "#0000ff", d: "M45,132H360"}, {stroke: "orange", d: "M45,150H360"}, {stroke: "red", d: "M45,176H360"} ],
                    text: [ {x: "20", y: "24", mess: "APV I"}, {x: "20", y: "50", mess: "APV II"}, {x: "15", y: "68", mess: "PA I"}, {x: "22", y: "100", mess: "0"}, 
                            {x: "15", y: "132", mess: "PA I"}, {x: "20", y: "150", mess: "APV II"}, {x: "20", y: "176", mess: "APV I"}, ]
                }
            }
        },
        computed: {
            changed() {
                
                return {
                    state: this.state,
                    station: this.station,
                    Satellites: this.Satellites
                }
            }
        },
        components: {
            SatVis
        }
    }
</script>
