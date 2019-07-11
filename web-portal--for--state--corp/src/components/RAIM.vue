<template>
  <main>
    <header class="d-flex justify-content-center">
      <h1 class="text-center col-9" v-t="'raim.title'"></h1>
    </header>
      <div class="d-flex justify-content-center">
        <div class="raim_img d-inline-block">
          <router-link to="/RAIM/Air">
            <img width="100%" height="100%" :class="tower_img" @mouseover="tower_img='tower' , text_img=true" @mouseout="tower_img='tower_bw'">
          </router-link>
          <div class="raim_text">
            <div v-t="'raim.textAir'"></div>
          </div>
        </div>
        <div class="raim_img d-inline-block">
          <router-link to="/RAIM/Route">
            <img width="100%" height="100%" :class="plane_img" @mouseover="plane_img='plane' , text_img=true" @mouseout="plane_img='plane_bw'">
          </router-link>
          <div class="raim_text">
            <div v-t="'raim.textRoute'"></div>
          </div>
        </div>
        <div class="raim_img d-inline-block">
          <router-link to="/RAIM/RFT">
            <img width="100%" height="100%" :class="earth_img" @mouseover="earth_img='earth' , text_img=true" @mouseout="earth_img='earth_bw'">
          </router-link>
          <div class="raim_text">
            <div v-t="'raim.textRf'"></div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="log_1_raim text-center" v-t="'raim.subTitleAir'"></div>
        <div class="log_2_raim text-center" v-t="'raim.subTitleRoute'"></div>
        <div class="log_3_raim text-center" v-t="'raim.subTitleRf'"></div>
      </div>
    </main>
</template>

<script>

  export default {
    data () {
      return {
        earth_img: "earth_bw",
        plane_img: "plane_bw",
        tower_img: "tower_bw",
        text_img: false
      };
    }
  };
</script>
<style scoped>

  .earth_bw {
    background: url(../img/raim/ter_rf_bw.png) no-repeat top center;
  }
  .earth {
    background: url(../img/raim/ter_rf.jpg) no-repeat top center;
  }
  .plane_bw {
    background: url(../img/raim/plane_bw.jpg) no-repeat top center;
  }
  .plane {
    background: url(../img/raim/plane.jpg) no-repeat top center;
  }
  .tower_bw {
    background: url(../img/raim/tower_bw.jpg) no-repeat top center;
  }
  .tower {
    background: url(../img/raim/tower.jpg) no-repeat top center;
  }
  .raim_img {
    border: solid 1px gray;
    border-radius: 10px;
    -o-border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    height: 350px;
    overflow: hidden;
    position: relative;
    width: 250px;
    margin-right: 30px;
  }
  .raim_img:last-child {
    margin-right: 0;
  }
  .raim_text {
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    -o-border-bottom-left-radius: 10px;
    -o-border-bottom-right-radius: 10px;
    -moz-border-bottom-left-radius: 10px;
    -moz-border-bottom-right-radius: 10px;
    -webkit-border-bottom-left-radius: 10px;
    -webkit-border-bottom-right-radius: 10px;
    bottom: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    width: 100%;
    font-size: 16px;
    padding: 4px;
  }
  main div:hover>.raim_text {
    height: 105px;
    opacity: 0.8;
    transition-property: height, opacity;
    transition-duration: 0.5s;
  }
  .log_1_raim,
  .log_2_raim,
  .log_3_raim {
    color: #184369;
    font-size: 24px;
    margin-top: 20px;
    text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
  }
  .log_1_raim {
    margin-right: 120px;
    margin-left: 40px;
  }
  .log_2_raim {
    margin-right: 95px;
  }
  @media (max-width: 642px) {
        .log_1_raim,
  .log_2_raim,
  .log_3_raim {
    color: rgb(218, 218, 218);
    font-size: 18px;
    margin-top: 12px;
    text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
  }
  .log_1_raim {
    margin-right: 80px;
    margin-left: 10px;
  }
  .log_2_raim {
    margin-right: 60px;
  }
    }

@media screen and (min-width: 642px) and (max-width: 768px) {
        .log_1_raim,
  .log_2_raim,
  .log_3_raim {
    color: rgb(218, 218, 218);
    font-size: 20px;
    margin-top: 15px;
    text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
  }
  .log_1_raim {
    margin-right: 90px;
    margin-left: 20px;
  }
  .log_2_raim {
    margin-right: 85px;
  }
    }
  
</style>