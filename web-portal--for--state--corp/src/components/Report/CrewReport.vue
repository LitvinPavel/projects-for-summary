<template>
    <main>
        <header class="d-flex justify-content-center">
            <h1 class="text-center col-9" v-t="'report.title'"></h1>
        </header>
        <section>
            <b-row>
                <fieldset style="width: 100%;">
                    <b-form @submit="onSubmit">
                        <b-row class="form-border-bottom">
                            <b-col md="4" class="mt-3">
                                <label for="name" v-t="'report.name'"></label>
                                <b-form-input size="sm" type="text" id="name" v-model.trim="name" :placeholder="$t('report.nameplace')" required />
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="phone" v-t="'report.phone'"></label>
                                <b-form-input size="sm" type="text" id="phone" v-model.trim="phone" required />
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="email" v-t="'report.email'"></label>
                                <b-form-input size="sm" type="email" id="email" v-model.trim="email" required />
                            </b-col>
                        </b-row>
                        <b-row class="form-border-bottom">
                            <b-col md="4" class="mt-3">
                                <label for="date" v-t="'report.date'"></label>
                                <b-form-input size="sm" id="date" v-model.trim="date" type="date" required></b-form-input>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="time" v-t="'report.time'"></label>
                                <b-form-input size="sm" id="time" v-model.trim="time" type="time" required></b-form-input>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="duration" v-t="'report.duration'"></label>
                                <b-form-input size="sm" id="duration" v-model.trim="duration" type="number"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="form-border-bottom">
                            <b-col md="8" class="mt-3">
                                <label for="eventPoint" v-t="'report.eventPoint'"></label>
                                <b-form-input size="sm"
                                              id="eventPoint"
                                              v-model.trim="eventPoint"
                                              type="text"
                                              aria-describedby="eventPointSub"
                                              :placeholder="$t('report.eventPointPlace')">
                                </b-form-input>
                                <b-form-text id="eventPointSub" v-t="'report.eventPointSub'"></b-form-text>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="echelon" v-t="'report.echelon'"></label>
                                <b-form-input size="sm" id="echelon" v-model.trim="echelon" type="text"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="form-border-bottom">
                            <b-col md="4" class="mt-3">
                                <label for="flight" v-t="'report.flight'"></label>
                                <b-form-input size="sm" id="flight" v-model.trim="flight" type="text" placeholder="SU0001"></b-form-input>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="aircraftType" v-t="'report.aircraftType'"></label>
                                <b-form-input size="sm" id="aircraftType" v-model.trim="aircraftType" type="text"></b-form-input>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="boardNumber" v-t="'report.boardNumber'"></label>
                                <b-form-input size="sm" id="boardNumber" v-model.trim="boardNumber" type="text"></b-form-input>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="isPortableReceiver" v-t="'report.isPortableReceiver'"></label>
                                <b-form-select size="sm" id="isPortableReceiver" v-model="isPortableReceiver" :options="$t('report.portableReceiver')" />
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="receiverModel" v-t="'report.receiverModel'"></label>
                                <b-form-input size="sm" id="receiverModel" v-model.trim="receiverModel" type="text"></b-form-input>
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="isGpsOnly" v-t="'report.isGpsOnly'"></label>
                                <b-form-select size="sm" id="isGpsOnly" v-model="isGpsOnly" :options="$t('report.gpsOnly')" />
                            </b-col>
                            <b-col md="3" class="mt-3">
                                <label for="alarmRAIM" v-t="'report.isAlarmRAIM'"></label>
                                <b-form-select size="sm" id="alarmRAIM" v-model="alarmRAIM" :options="$t('report.alarmRAIM')" />
                            </b-col>
                            <b-col md="2" class="mt-3">
                                <label for="isGLS" v-t="'report.isGLS'"></label>
                                <b-form-select size="sm" id="isGLS" v-model="isGLS" :options="$t('report.GLS')" />
                            </b-col>
                            <b-col md="3" class="mt-3">
                                <label for="isAlarmGLS" v-t="'report.isAlarmGLS'"></label>
                                <b-form-select size="sm" id="isAlarmGLS" v-model="isAlarmGLS" :options="$t('report.alarmGLS')" />
                            </b-col>
                            <b-col md="4" class="mt-3">
                                <label for="sattelites" v-t="'report.sattelites'"></label>
                                <b-form-input size="sm" id="sattelites" v-model.trim="sattelites" type="number"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="form-border-bottom p-3">
                            <b-col md="12" class="mt-3">
                                <label for="characterFailure" v-t="'report.characterFailure'"></label>
                                <b-form-select size="sm" id="characterFailure" v-model="characterFailure" :options="$t('report.characterType')" />
                            </b-col>
                            <b-col md="12" class="mt-3">
                                <label for="comment" v-t="'report.comment'"></label>
                                <b-form-input size="sm" id="comment" v-model.trim="comment" type="text"></b-form-input>
                            </b-col>
                            <div class="g-recaptcha mt-3" data-sitekey="6LcR1mkUAAAAAAE82AVpOfXUuP6Lq2-WUruQcjmZ" required></div>
                        </b-row>

                        <button type="submit" class="send-custom mt-2" v-t="'report.send'"></button>
                    </b-form>
                </fieldset>
            </b-row>
        </section>
    </main>
</template>

<script>
    export default {
        data: () => ({
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            duration: '',
            eventPoint: '',
            echelon: '',
            flight: '',
            aircraftType: '',
            boardNumber: '',
            isPortableReceiver: '',
            receiverModel: '',
            isGpsOnly: '',
            alarmRAIM: '',
            isGLS: '',
            isAlarmGLS: '',
            sattelites: '',
            characterFailure: '',
            comment: ''
        }),
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$store.state.report = [
                    { text: this.$t('report.name'), value: this.name },
                    { text: this.$t('report.phone'), value: this.phone },
                    { text: this.$t('report.email'), value: this.email },
                    { text: this.$t('report.date'), value: this.date },
                    { text: this.$t('report.time'), value: this.time },
                    { text: this.$t('report.duration'), value: this.duration },
                    { text: this.$t('report.eventPoint'), value: this.eventPoint },
                    { text: this.$t('report.echelon'), value: this.echelon },
                    { text: this.$t('report.flight'), value: this.flight },
                    { text: this.$t('report.aircraftType'), value: this.aircraftType },
                    { text: this.$t('report.boardNumber'), value: this.boardNumber },
                    { text: this.$t('report.isPortableReceiver'), value: this.isPortableReceiver },
                    { text: this.$t('report.receiverModel'), value: this.receiverModel },
                    { text: this.$t('report.isGpsOnly'), value: this.isGpsOnly },
                    { text: this.$t('report.isAlarmRAIM'), value: this.alarmRAIM },
                    { text: this.$t('report.isGLS'), value: this.isGLS },
                    { text: this.$t('report.isAlarmGLS'), value: this.isAlarmGLS },
                    { text: this.$t('report.sattelites'), value: this.sattelites },
                    { text: this.$t('report.characterFailure'), value: this.characterFailure },
                    { text: this.$t('report.comment'), value: this.comment }
                ]
                this.$router.push("/ReportSaved")
            },
        }
    }
</script>

<style>
    .form-border-bottom {
        margin-top: 5px;
        margin-bottom: 5px;
        padding-bottom: 15px;
        background: rgba(255, 255, 255, .4);
        box-shadow: 0 0 2px rgba(0,0,0,0.5);
    }
</style>