<template>
  <div>
    <v-card class="mb-2" style="height: 53vh;">
      <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout>
              <v-flex xs12 text-xs-left px-2>
                <v-layout row nowrap>
                  <span class="title mb-1">Угол глиссады</span>
                  <v-spacer></v-spacer>
                  <v-btn-toggle v-model="dimension">
                    <v-btn flat :disabled="dimension" :value="true" >
                      <span class="white--text">Градусы</span>
                    </v-btn>
                    <v-btn flat :disabled="!dimension" :value="false" >
                      <span class="white--text">Минуты</span>
                    </v-btn>
                  </v-btn-toggle>
                </v-layout>
                <v-text-field validate-on-blur v-model="gpa" solo light :rules="[v => !!v || 'Поле обязательное!']"></v-text-field>
                <h3 class="title mb-1">Высота пролета над порогом</h3>
                <v-text-field solo light validate-on-blur v-model="tch" :rules="[v => !!v || 'Поле обязательное!']" suffix="Метры"></v-text-field>
                <h3 class="title mb-1">Магнитическое склонение</h3>
                <v-text-field solo light validate-on-blur v-model="magneticBearing" :rules="[v => !!v || 'Поле обязательное!']" hide-details suffix="Градусы"></v-text-field>
              </v-flex>
            </v-layout>
      </v-form>        
    </v-card>
    <v-layout>
      <v-btn flat @click="$emit('prev')">Назад</v-btn>
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
      dimension: true
    }),
    watch: {
      dimension(val) {
        if (val) {
          this.gpa = parseFloat(parseFloat(this.gpa / 60).toFixed(6))
            
          } else {
            this.gpa = Math.round(parseFloat(this.gpa * 60).toFixed(6))
          }
      }
    },
    computed: {
      tch: {
        get() {
          return this.$store.getters.TCH
        },
        set(val) {
          this.$store.commit('SET_TCH', parseFloat(val))
        }
      },
      gpa: {
        get() {
          return this.$store.getters.GPA
        },
        set(val) {
          this.$store.commit('SET_GPA', val)
        }
      },
      magneticBearing: {
        get() {
          return this.$store.getters.MAGNETIC_BEARING
        },
        set(val) {
          this.$store.commit('SET_MAGNETIC_BEARING', parseFloat(val))
        }
      }
    },
    methods: {
      send() {
        if (this.$refs.form.validate()) {
          if(!this.dimension) {
            this.dimension = !this.dimension
          }
          this.$emit('next')
        }
      }
    }
  }
</script>

<style scoped>

</style>