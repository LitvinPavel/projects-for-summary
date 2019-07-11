<template>
	<div id="app">
        <div class="container">
            <div class="content">
                <nav class="d-flex justify-content-center nav-wrap">
                    <router-link to="/" class="topmenu col-2" v-t="'nav.home'"></router-link>
                    <router-link to="/RAIM" class="topmenu col-2">
                        <span v-t="'nav.raim'"></span>
                        <div class="submenu col">
                            <router-link to="/RAIM/Air" v-t="'nav.raimAir'"></router-link>
                            <router-link to="/RAIM/Route" v-t="'nav.raimRoute'"></router-link>
                            <router-link to="/RAIM/RFT" v-t="'nav.raimRf'"></router-link>
                        </div>
                    </router-link>
                    <router-link to="/Gbas" class="topmenu col-2" v-t="'nav.gbas'"></router-link>
                    <router-link to="/CrewReport" class="topmenu col-2" v-t="'nav.report'"></router-link>
                    <b-dropdown variant="link" size="small">
                        <template slot="button-content">
                            <b-img width="20" height="14" :title="lang.locale" :alt="lang.locale" class="m-1" :src="lang.locale == 'RUS' ? flag_rus : flag_eng" />
                            <span style="color: #47728f;">{{ lang.locale }}</span>
                        </template>
                        <b-dropdown-item @click="lang.locale = 'RUS'" class="drop">Русский</b-dropdown-item>
                        <b-dropdown-item @click="lang.locale = 'ENG'" class="drop">English</b-dropdown-item>
                    </b-dropdown>
                </nav>
                <modal v-if="show" @close="persist">
                    <div slot="header">
                        <h1 v-t="'agreement.title'"></h1>
                        <b-dropdown variant="link" size="small" style="position: absolute; right: 0; top: 0;">
                            <template slot="button-content">
                                <b-img width="20" height="14" :title="lang.locale" :alt="lang.locale" class="m-1" :src="lang.locale == 'RUS' ? flag_rus : flag_eng" />
                                <span style="color: #47728f;">{{ lang.locale }}</span>
                            </template>
                            <b-dropdown-item @click="lang.locale = 'RUS'" class="drop">Русский</b-dropdown-item>
                            <b-dropdown-item @click="lang.locale = 'ENG'" class="drop">English</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </modal>
                <router-view></router-view>
            </div>
            <footer>
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <router-link to="/RAIM/Air" class="nav-link" v-t="'nav.raimAir'"></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/RAIM/Route" class="nav-link" v-t="'nav.raimRoute'"></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/RAIM/RFT" class="nav-link" v-t="'nav.raimRf'"></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Gbas" class="nav-link" v-t="'nav.gbas'"></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/CrewReport" class="topmenu col-2" v-t="'nav.report'"></router-link>
                    </li>
                </ul>
            </footer>
        </div>
	</div>
</template>
<script>
import {i18n} from './main.js'
import flag_eng from './img/flag_eng.png'
import flag_rus from './img/flag_rus.png'
import Modal from './components/modal.vue'
  export default {
        data() {
            return {
                changeLang: false,
                lang: i18n,
                flag_eng: flag_eng,
                flag_rus: flag_rus,
                show: false
            }
        },
        mounted() {
            function getCookie(token) {
                var matches = document.cookie.match(new RegExp(
                    "(?:^|; )" + token.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                ));
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }
            if (!getCookie('token')) {
                this.show = true
            } else {
                this.show = false
            }
        },
        methods: {
            persist() {
                //Здесь обращение к серверу за токеном и запись его в cookie.token
                let date = new Date(new Date().getTime() + 60 * 60 * 1000);
                document.cookie = "token=the lifetime of this token is up to: " + date.toLocaleString() + "; path=/; expires=" + date.toUTCString();
                this.show = false
            }
        },
        components: {
            'modal': Modal
        }
}
</script>

<style>
	html {
	 min-height: 100%;	
	}
	body {
		margin: 0;
		padding: 0;
    background: #e9eef2;
    background: -webkit-linear-gradient(top,#e9eef2,#7a9fba);
    background: -o-linear-gradient(top,#e9eef2,#7a9fba);
    background: -moz-linear-gradient(top,#e9eef2,#7a9fba);
		background: linear-gradient(to bottom, #e9eef2, #7a9fba);
		height: 100%;
		font-family: "Times New Roman", "Times CY", "Nimbus Roman No9 L", serif;
	}
	section {
		padding: 15px 10px;
		margin: 10px auto;
		background: rgba(216, 227, 235, 0.7);
		border-radius: 17px;
	}
	li {
		list-style: none;
	}
	a,
	a:hover {
		text-decoration: none;
	}
	.submenu>a,
	.nav-wrap>a {
		display: block;
		border: 1px solid #98b4cc;
		text-align: center;
		padding: 5px 0px;
		color: #47728f;
	}
	.submenu>a:hover,
	.nav-wrap>a:hover {
		background: #6692b6;
		color: white;
		cursor: pointer;
	}
	.submenu {
		padding: 0;
		margin-top: 5px;
		background: #e2e8ee;
		position: absolute;
		visibility: hidden;
		z-index: 1;
		transform-origin: 10% 10%;
		transform: rotateX(-90deg);
		transition: .3s linear;
	}
	a:hover>.submenu {
		transform: rotateX(0deg);
		visibility: visible;
		opacity: 1;
	}
	.container-fluid {
  		height: 100%;
	}
	.content {
		min-height: calc(100vh - 80px);
	}
	footer {
		color: #ffffff;
		border-top: 1px solid #ffffff;
	}
	footer a {
		color: #fff;
	}
	footer a:hover {
		color: #184369;
    	text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
	}
	fieldset {
		background-color: rgba(250, 250, 250, 0.6);
		border-radius: 7px;
		-moz-border-radius: 7px;
		-webkit-border-radius: 7px;
		-o-border-radius: 7px;
		height: auto;
		width: auto;
		display: block;
		-webkit-margin-start: 2px;
		-webkit-margin-end: 2px;
		-webkit-padding-before: 0.35em;
		-webkit-padding-start: 0.75em;
		-webkit-padding-end: 0.75em;
		-webkit-padding-after: 0.625em;
		min-width: -webkit-min-content;
		border-width: 2px;
		border-style: groove;
		border-color: threedface;
		border-image: initial;
	}
	legend {
		height: 18px;
		-webkit-padding-start: 2px;
		-webkit-padding-end: 2px;
		border-width: initial;
		border-style: none;
		border-color: initial;
		border-image: initial;
		width: auto;
		font-size: 1rem;
		margin-bottom: 0;
	}
	.ft {
		border: 1px solid rgb(180, 180, 180);
		background-color: rgba(250, 250, 250, 0.6);
	}
	.ft th {
		background: -moz-linear-gradient(top, rgb(255, 255, 255) 0%, rgb(202, 202, 202) 100%);
		background: -webkit-linear-gradient(top, rgb(255, 255, 255) 0%, rgb(202, 202, 202) 100%);
		background: -o-linear-gradient(top, rgb(255, 255, 255) 0%, rgb(202, 202, 202) 100%);
		background: -ms-linear-gradient(top, rgb(255, 255, 255) 0%, rgb(202, 202, 202) 100%);
		background: linear-gradient(to bottom, rgb(255, 255, 255) 0%, rgb(202, 202, 202) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#cacaca', GradientType=0);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(255, 255, 255, 1)), color-stop(100%, rgba(202, 202, 202, 1)));
		height: 24px;
		font-size: 14px;
		padding: 6px;
	}
	.ft tr.over {
		background-color: #ffffff!important;
	}
	.ft tr.over.current-row {
		background-color: #B5C1C8!important;
	}
	.ft tr:nth-child(2n) {
		background-color: #DADFE2;
	}
	.ft td {
		cursor: default;
		font-size: 14px;
		height: 24px;
		padding: 4px;
	}
	.ft tbody,
	.ft thead {
		text-align: center;
	}
	.dropdown-menu {
		background: #e2e8ee !important;
	}
	.drop {
		color: #47728f;
		background: inherit;
	}
	.drop:hover, drop:active, drop:focus {
		background: #6692b6;
		color: white;
		border: none;
	}
  .dropdown-toggle::after {
    color: #6692b6;
  }
    table {
        display: table;
        border-collapse: separate;
        border-spacing: 2px;
        border-color: grey;
    }
</style>