<template>
    <fieldset id="satelliteVisibility">
        <legend id="raim" v-t="'raimAir.visibleTitle'"></legend>
        <div id="sv-box">
            <svg width="380" height="380" version="1.1" xmlns="http://www.w3.org/2000/svg">                          
                <circle v-for="radius in circleRadius" :key="radius" class="circle" cx="190" cy="190" :r="radius" stroke="#999"></circle>                
                <path stroke="#808080" d="M190,370V11"></path>
                <path stroke="#808080" d="M370,190H11"></path>
                <text x="175" y="20" text-anchor="middle" font-family="Arial" font-size="12px" font-weight="bold">
                    <tspan dy="4">360</tspan>
                </text>
                <text x="356" y="200" text-anchor="middle" font-family="Arial" font-size="12px" font-weight="bold">
                    <tspan dy="4">90</tspan>
                </text>
                <text x="20" y="346" text-anchor="middle" fill="#0000ff" font-family="Arial" font-size="15px" font-weight="normal">
                    <tspan dy="5.5">GPS</tspan>
                </text>
                <text x="40" y="366" text-anchor="middle" fill="#008000" font-family="Arial" font-size="15px" font-weight="normal">
                    <tspan dy="5.5" v-t="'raimAir.constellation[2].text'"></tspan>
                </text>
                <circle v-for="(stat, index) in Satellites" :cx="stat.x+190" :cy="stat.y+190" :key="'circle-'+index" r="8" :fill="[stat.Constellation==1 ? 'blue' : 'green']" :stroke="[stat.Constellation==1 ? 'blue' : 'green']" fill-opacity="0.1"></circle>
                <text v-for="(text, index) in Satellites" :key="'text-'+index" :x="text.x+190" :y="text.y+190" text-anchor="middle" fill="dark" font-family="Arial" font-size="10px" font-weight="800">
                    <tspan dy="3" :title="[text.x, text.y]">{{text.SatelliteNumber}}</tspan>
                </text>
            </svg>
        </div>
    </fieldset>
</template>

<script>

export default {
    name: 'satelliteVisibility',
    props: ['Satellites'],
    data () {
        return {
            circleRadius: ["180", "135", "90", "45"]
        }
    },
    computed: {
        visibility () {
            return {
                Satellites: this.Satellites
            }
        }
    }
}
</script>
<style>
#sv-box {
    background-color: #ffffff;
    border: 1px solid #356AA0;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -webkit-border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;  
}
.circle {
    fill: transparent;
    stroke: #999;
}
line {
    fill: transparent;
    stroke: #999;
}
</style>
