<template>
  <v-card color="black" class="hide-overflow" style="position: relative;">
    <v-form v-model="valid" ref="form">
    <v-toolbar absolute dark scroll-off-screen scroll-target="#scrolling-techniques">
      <v-btn icon dark @click="$emit('closed')">
        <v-icon x-large color="red">mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="display-1 font-weight-thin">Настройки</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <v-btn color="primary" :disabled="!valid || airs.runways.length <= 0" @click="added">Добавить</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div id="scrolling-techniques" class="scroll-y" style="max-height: 100vh;">
      <v-card-text style="margin-top: 80px;">
          <v-layout row mb-3>
          <v-flex px-1 xs9>
              <v-text-field
                v-model="airs.name"
                :rules="[v => !!v || 'Поле Аэропорт обязательно!', v => v.length <= 20 || 'Название Аэропорта не может превышать 20-ти символов']" 
                clearable 
                light  
                label="Аэропорт" 
                single-line 
                solo
              ></v-text-field>
          </v-flex>
          <v-flex px-1 xs3>
            <v-text-field
              v-model="airs.icaoCode"
              :rules="[v => !!v || 'Поле ИКАО обязательно!', v => v.length <= 4 || 'Название ИКАО не может превышать 4-х символов']" 
              clearable 
              light 
              label="ИКАО" 
              single-line 
              solo>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-btn @click="addVpp(vppID++)" block small>
          <v-icon left>mdi-plus</v-icon>
          <span>ВПП</span>
        </v-btn>
        <v-text-field
          :rules="[v => !!v || 'Поле обязательно! Для удаления полосы нажмите Х', v => v.length <= 7 || 'Название полосы не может превышать 7-и символов']"
          @change="setVpp(runway_id, $event)" 
          class="mb-1"
          light
          :value="runway.identifier"
          v-for="(runway, runway_id) in airs.runways" 
          :key="runway_id+'runway'" 
          label="ВПП" 
          single-line 
          solo
        >
          <template slot="append-outer">
            <v-icon dark @click="removeVpp(runway_id)">mdi-close</v-icon>      
          </template>
        </v-text-field>
        
      </v-card-text>
    </div>
    </v-form>
  </v-card>
</template>
<script>

  export default {
    data: () => ({
      vppID: 1,
      valid: false,
      airs: {
        name: '',
        icaoCode: '',
        runways: []
      }  
    }),
    mounted() {
      this.addVpp(0)
    },
    methods: {
      addVpp(id) {
        let defaultVpp = {
          identifier: ''
        }
        this.airs.runways.splice(id, 1, defaultVpp)
      },
      setVpp(id, val) {
        let vpp = {
          identifier: val
        }
        this.airs.runways.splice(id, 1, vpp)
        console.log(this.airs)
      },
      removeVpp(id) {
        this.airs.runways.splice(id, 1)
      },
      addManual(val) {
        console.log(val)
        this.airs = val
      },
      added() {
        if (this.$refs.form.validate()) {
          if (this.airs.runways.length > 0) {
            this.airs.name = this.airs.name.toUpperCase()
            this.airs.icaoCode = this.airs.icaoCode.toUpperCase()
            this.$store.commit('CLEAR_ERROR')
            this.$http.post(`papidb/Add`, this.airs, {
              headers: { 'Content-type': 'application/json' }
            })
            .then(res => {
              this.$store.commit('IS_ERROR', { Message: `Аэропорт ${res.data.name} успешно добавлен`, state: 'primary' })
              this.$emit('added', res.data)
            })
            .catch(err => {
              this.$store.commit('IS_ERROR', { Message: err.response.data.Message, state: 'red' })
            } 
            )
          }
        }
        
        
      }
    }
  }
</script>

<style scoped>

</style>