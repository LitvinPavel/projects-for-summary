<template>
    <div>
        <header class="d-flex justify-content-center">
            <h1 class="col-md-9 col-xs-12" v-t="'home.title'"></h1>
        </header>
		<main class="d-flex justify-content-center">
			<div class="col-xs-3 col-sm-2 col-lg-1 mt-5">
				<a href="https://www.favt.ru/" target="_blank"><b-img :src='favt' center width="77" height="57" alt="favt" class="my-1" /></a>
				<a href="http://www.gkovd.ru/" target="_blank"><b-img :src='gkovd' center width="77" height="57" alt="gkovd" class="my-1" /></a>
				<a href="javascript:void(0);" target="_blank"><b-img :src='nppf' center width="77" height="57" alt="nppf" class="my-1" /></a>
			</div>
			<div class="col-11">
				<p v-t="'home.text_1'"></p>
                <p v-t="'home.text_2'"></p>
                <p v-t="'home.text_3'"></p>
                <h2 style="color: #184369; font-size: 20px; font-weight: 700;" v-t="'home.subtitle_1'"></h2>
                <p v-t="'home.text_1_1'"></p>
                <p v-t="'home.text_1_2'"></p>
                <h4 style="color: #184369; font-size: 20px; font-weight: 700;" v-t="'home.subtitle_2'"></h4>
                <p v-t="'home.text_2_1'"></p>
                <p v-t="'home.text_2_2'"></p>
                <p v-t="'home.text_2_3'"></p>
                <p v-t="'home.text_2_4'"></p>
			</div>
		</main>
    </div>
</template>

<script>
import favt from '../img/favt-icon.png'
import gkovd from '../img/gkovd-icon.png'
import nppf from '../img/nppf-icon.png'

export default {
	data: function () {
		return {
			favt: favt,
			gkovd: gkovd,
            nppf: nppf
		}
    }
}
</script>

<style scoped>
    main {
        background: url(../img/bg-spectr.png) no-repeat top center;
        min-height: 580px;	
    }
    p {
        font-size: 20px;
        color: black;
        text-shadow: -2px 4px 6px rgba(250, 250, 250, 0.35);
    }
    header {
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;
        color: #184369;
        text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
        font-weight: normal;
    }
    header>h1 {
        font-size: 30px;
    }
    @media (max-width: 768px) {
        header {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        header>h1 {
            font-size: 20px;
        }
        p {
            font-size: 14px;
        }
    }
</style>
