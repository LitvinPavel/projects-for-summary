<template>
	<div id="layout">
            <div class="logo d-lg-inline-flex">
                <a href="https://www.favt.ru/" target="_blank"><b-img :src='favt' center width="77" height="57" alt="favt" class="my-1" /></a>
				<a href="http://www.gkovd.ru/" target="_blank"><b-img :src='gkovd' center width="77" height="57" alt="gkovd" class="my-1" /></a>
				<a href="javascript:void(0);" target="_blank"><b-img :src='nppf' center width="77" height="57" alt="nppf" class="my-1" /></a>
            </div>
            <router-view></router-view>
	</div>
</template>

<script>
    import favt from  '../img/favt-icon.png'
    import gkovd from '../img/gkovd-icon.png'
    import nppf from '../img/nppf-icon.png'
	export default {
		data: function() {
			return {
				favt: favt,
                gkovd: gkovd,
                nppf: nppf,
			}
		}
	}
</script>

<style>
main {
    background: url(../img/bg-spectr.png) no-repeat center center;
    min-height: 780px;	
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
.logo {
    position: absolute;
    left: 20px;
    top: 0;
}
.row, .col, .col-3, .col-4, .col-6, .col-9, .col-sm-12, .col-md-12, .col-lg-5, .col-xl-4, .col-sm-12, .col-md-12, .col-lg-7, .col-xl-8{
    padding: 0;
    margin: 0;
}
.send-custom {
    background-color: #88A7BF;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    -o-border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -webkit-appearance: none;
    color: #363636;
    font-weight: bold;
    margin: 0 auto;
    width: 100%;
    text-transform: uppercase;
}
.send-custom:hover {
    background: #dadada;
    border: 1px solid #999999;
    color: #212121;
    text-decoration: none;
}
.wrapper {
    background: rgba(250,250,250,0.3);
    border-radius: 15px;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    -o-border-radius: 15px;
    margin: 10px auto;
    padding: 10px;
    border: 8px solid rgb(100, 125, 145);
}
.tb-wrap {
    background-color: rgba(250,250,250,0.6);
    border: 1px solid rgb(121, 121, 121);
    border-top: none;
    overflow: auto;
    overflow-y: scroll;
}
@media (max-width: 992px) {
    header {
      margin-top: 60px;
      margin-bottom: 60px;
    }
  }
</style>