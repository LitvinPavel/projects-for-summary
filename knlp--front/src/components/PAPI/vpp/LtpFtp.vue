<template>
  <div>
    <v-card class="mb-2" style="height: 53vh;">
      <v-form ref="form" class="mt-1" v-model="valid" lazy-validation>
            <v-layout>
              <v-flex xs12 text-xs-left mt-1 px-2>
                <v-layout row nowrap>
                  <v-spacer></v-spacer>
                  <v-btn-toggle v-model="coordDimension">
                    <v-btn flat :disabled="coordDimension" :value="true" >
                      <span class="white--text">Градусы</span>
                    </v-btn>
                    <v-btn flat :disabled="!coordDimension" :value="false" >
                      <span class="white--text">Десятичные</span>
                    </v-btn>
                  </v-btn-toggle>
                </v-layout>
                <span class="title">Широта порога ВПП</span>
                <v-text-field 
                  v-if="!coordDimension" 
                  solo 
                  light
                  validate-on-blur
                  v-model="ltpFtpLatitude" 
                  :rules="[v => !!v || 'Поле обязательное!']"
                ></v-text-field>
                <v-layout v-if="coordDimension" row nowrap>
                  <v-text-field v-model="coordMinutsLat.DD"  solo light validate-on-blur>
                    <template slot="append">
                      <span class="black--text headline">°</span>
                    </template>
                  </v-text-field>
                  <v-text-field v-model="coordMinutsLat.MM" solo light validate-on-blur>
                    <template slot="append">
                      <span class="black--text headline">'</span>
                    </template>
                  </v-text-field>
                  <v-text-field v-model="coordMinutsLat.SS" solo light validate-on-blur>
                    <template slot="append">
                      <span class="black--text headline">"</span>
                    </template>
                  </v-text-field>
                </v-layout>

                <v-layout row nowrap>
                  <span class="title mb-1">Долгота порога ВПП</span>
                  <v-spacer></v-spacer>
                </v-layout>
                <v-text-field 
                  v-if="!coordDimension" 
                  solo 
                  light
                  :value="'1'"
                  validate-on-blur  
                  v-model="ltpFtpLongitude" 
                  :rules="[v => !!v || 'Поле обязательное!']" 
                >
                </v-text-field>
                <v-layout v-if="coordDimension" row nowrap>
                  <v-text-field v-model="coordMinutsLong.DD"  solo light validate-on-blur>
                    <template slot="append">
                      <span class="black--text headline">°</span>
                    </template>
                  </v-text-field>
                  <v-text-field v-model="coordMinutsLong.MM" solo light validate-on-blur>
                    <template slot="append">
                      <span class="black--text headline">'</span>
                    </template>
                  </v-text-field>
                  <v-text-field v-model="coordMinutsLong.SS" solo light validate-on-blur>
                    <template slot="append">
                      <span class="black--text headline">"</span>
                    </template>
                  </v-text-field>
                </v-layout>
                
                <h3 class="title mb-1">Высота порога ВПП</h3>
                <v-text-field solo light validate-on-blur v-model="ltpFtpElevation" suffix="Метры"></v-text-field>
              </v-flex>
            </v-layout>
      </v-form>        
    </v-card>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn color="primary"  @click="send">
        Далее
      </v-btn>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      coordMinutsLat: {
        DD: 0,
        MM: 0,
        SS: 0
      },
      coordMinutsLong: {
        DD: 0,
        MM: 0,
        SS: 0
      },
      coordDimension: false,
    }),
    watch: {
      coordDimension(val) {
        if (val) {
          this.coordMinutsLat.DD = Math.trunc(this.ltpFtpLatitude)
          this.coordMinutsLat.MM = Math.trunc((this.ltpFtpLatitude - this.coordMinutsLat.DD) * 60)
          this.coordMinutsLat.SS = parseFloat((((this.ltpFtpLatitude - this.coordMinutsLat.DD) * 60 - this.coordMinutsLat.MM) * 60).toFixed(5))

          this.coordMinutsLong.DD = Math.trunc(this.ltpFtpLongitude)
          this.coordMinutsLong.MM = Math.trunc((this.ltpFtpLongitude - this.coordMinutsLong.DD) * 60)
          this.coordMinutsLong.SS = parseFloat((((this.ltpFtpLongitude - this.coordMinutsLong.DD) * 60 - this.coordMinutsLong.MM) * 60).toFixed(5))
          } else {
            this.ltpFtpLongitude = (+this.coordMinutsLong.DD + (+this.coordMinutsLong.MM / 60) + (+this.coordMinutsLong.SS / 3600)).toFixed(5)
            this.ltpFtpLatitude = (+this.coordMinutsLat.DD + (+this.coordMinutsLat.MM / 60) + (+this.coordMinutsLat.SS / 3600)).toFixed(5)
          }
      }
    },
    computed: {
      ltpFtpLatitude: {
        get() {
          return parseFloat(this.$store.getters.LTP_FTP_LATITUDE)
        },
        set(val) {
          this.$store.commit('SET_LTP_FTP_LATITUDE', parseFloat(val))
        }
      },
      ltpFtpLongitude: {
        get() {
          return parseFloat(this.$store.getters.LTP_FTP_LONGITUDE)
        },
        set(val) {
          this.$store.commit('SET_LTP_FTP_LONGITUDE', parseFloat(val))
        }
      },
      ltpFtpElevation: {
        get() {
          return this.$store.getters.LTP_FTP_ELEVATION
        },
        set(val) {
          this.$store.commit('SET_LTP_FTP_ELEVATION', parseFloat(val))
        }
      }
    },
    methods: {
      send() {
        if (this.$refs.form.validate()) {
          if(this.coordDimension) {
            this.ltpFtpLongitude = +this.coordMinutsLong.DD + (+this.coordMinutsLong.MM / 60) + (+this.coordMinutsLong.SS / 3600)
            this.ltpFtpLatitude = +this.coordMinutsLat.DD + (+this.coordMinutsLat.MM / 60) + (+this.coordMinutsLat.SS / 3600)
          }
          this.$emit('next')
          console.log(this.ltpFtpLatitude, this.ltpFtpLongitude, this.ltpFtpElevation)
        }
      }
    }
  }
</script>

<style scoped>

</style>