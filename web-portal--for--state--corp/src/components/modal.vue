<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header" style="position: relative;">
						<slot name="header">
						</slot>
					</div>
					<div class="modal-body">
						<slot name="body">
							<fieldset>
								<legend class="modal-legend"  v-t="'agreement.subtitle'"></legend>
								<div class="text_login_message">
									<p v-t="'agreement.text_p_1'"></p>
									<p v-t="'agreement.text_p_2'"></p>
									<p v-t="'agreement.text_p_3'"></p>
                                    <ul>
										<li style="list-style: disc;" v-for="(u, u_id) in  $t('agreement.text_ul')" :key="u_id">{{ u }}</li>
									</ul>
									<p v-t="'agreement.text_p_4'"></p>
									<p v-t="'agreement.text_p_5'"></p>
								</div>
							</fieldset>
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							<button class="btn send-custom btn-sm" @click="$emit('close')" v-t="'agreement.accept'"></button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<style>
		.modal-mask {
	  position: fixed;
	  z-index: 9998;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	  display: table;
	  transition: opacity .3s ease;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.modal-container {
	  width: 600px;
	  margin: 0px auto;
		background: url(../img/contentbg.png) repeat scroll 0% 0%;
	  background-color: #9cb7cb;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  transition: all .3s ease;
	  text-align: justify;
		border: 8px solid rgb(100, 125, 145);
		border-radius: 8px;
		-moz-border-radius: 8px;
		-webkit-border-radius: 8px;
		-o-border-radius: 8px;

	}
    .modal-header {
        justify-content: center;
        padding: 0;
        text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
    }

	.modal-legend {
		font-size: 1.4rem;
		text-align: justify;
		vertical-align: top;
		font-weight: 900;
		height: 30px;
	}

	.modal-default-button {
	  float: right;
	}

	.modal-enter {
	  opacity: 0;
	}

	.modal-leave-active {
	  opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
	  -webkit-transform: scale(1.1);
	  transform: scale(1.1);
	}
	.text_login_message {
		height: 250px;
        padding-right: 10px;
		overflow-y: auto;
	}
</style>

