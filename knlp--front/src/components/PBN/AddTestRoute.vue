<template>
  <v-card>
    <v-card-text>
        <v-form v-model="valid" ref="form">
            <v-card-text>
              <v-layout row mb-3>
                <v-flex px-1 xs4>
                  <v-text-field 
                    v-model="testRoute.sidStarApproachId"  
                    clearable 
                    light 
                    label="Идентификатор" 
                    single-line 
                    solo>
                  </v-text-field>
                </v-flex>
                <v-flex px-1 xs4>
                  <v-select 
                    v-model.number="testRoute.type"
                    :items="types"
                    item-text="text"
                    item-value="value"
                    label="Тип"
                    persistent-hint
                    :menu-props="{ maxHeight: '400' }"
                    single-line
                    required
                    solo
                    light>
                    <template slot="no-data">
                      <span class="pa-2">Нет данных</span>
                    </template>
                  </v-select>
                </v-flex>
                <v-flex px-1 xs4>
                  <v-select 
                    v-model.number="testRoute.specification"
                    :items="specifics"
                    item-text="text"
                    item-value="value"
                    label="Спецификация"
                    persistent-hint
                    :menu-props="{ maxHeight: '400' }"
                    single-line
                    required
                    solo
                    light>
                    <template slot="no-data">
                      <span class="pa-2">Нет данных</span>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
              
              <template v-for="(sequence, sequence_id) in testRoute.sequence" >
                <v-layout :key="sequence_id+'sequence'" style="align-items: baseline;">
                  <v-text-field 
                :rules="[v => !!v || 'Поле обязательно! Для удаления нажмите Х']"  
                class="ma-1" 
                light 
                v-model.number="sequence.latitude" 
                label="latitude" 
                single-line 
                solo>
              </v-text-field>
              <v-text-field 
                :rules="[v => !!v || 'Поле обязательно! Для удаления нажмите Х']" 
                class="ma-1" 
                light 
                v-model.number="sequence.longitude"
                label="longitude" 
                single-line 
                solo>
              </v-text-field>
              <v-icon dark @click="removeSequence(sequence_id)">mdi-close</v-icon>
                </v-layout>
              </template>
              <v-btn @click="addSequence(sequenceID++)" block small>
                <v-icon left>mdi-plus</v-icon>
                <span>Контрольную точку</span>
              </v-btn>
            </v-card-text>
        </v-form>
      </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
<template v-if="success">
  <span class="success--text">Применено</span>
  <v-icon color="success" class="mr-3">mdi-check</v-icon>
</template>
      <v-btn color="primary" :disabled="!valid || testRoute.sequence.length <= 0" @click="added">Добавить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['success'],
    data: () => ({
      sequenceID: 1,
      valid: false,
      testRoute: {
        id:null,
		    airportIcaoId:'',
        type: null,
        specification: null,
        specificationStr: '',
        transitionId:'',
        sidStarApproachId: '',
        rnavSpecification:null,
        sequence: []
      },
      types: [
        { text: 'SID', value: 0 },
        { text: 'STAR', value: 1 },
        { text: 'APPROACH', value: 2 }
      ],
      specifics: [
        { text: 'RNAV_10', value: 0 },
        { text: 'RNAV_5', value: 1 },
        { text: 'RNAV_4', value: 2 },
        { text: 'RNAV_2', value: 3 },
        { text: 'RNAV_1', value: 4 }
      ]
    }),
    mounted() {
      this.addSequence(0)
    },
    methods: {
      addSequence(id) {
        let defaultSequence = {
                  id:null,
                  orderId:null,
                  fixId:'',
                  pathTermination:'',
                  isRnavWaypoint:true,
                  isMissedAproach:null,
                  latitude:null,
                  lat:'',
                  longitude:null,
                  lon:'',
                  waypointType:''
                }
        this.testRoute.sequence.splice(id, 1, defaultSequence)
      },
      removeSequence(id) {
        this.testRoute.sequence.splice(id, 1)
      },
      added() {
        if (this.$refs.form.validate()) {
          if (this.testRoute.sequence.length > 0) {
            console.log(this.testRoute)
            this.$store.commit('GET_SUCCESS', true)
            this.testRoute= {
              id:null,
              airportIcaoId:'',
              type: null,
              specification: null,
              specificationStr: '',
              transitionId:'',
              sidStarApproachId: '',
              rnavSpecification:null,
              sequence: []
            }

            // this.airs.name = this.airs.name.toUpperCase()
            // this.airs.icaoCode = this.airs.icaoCode.toUpperCase()
            // this.$store.commit('CLEAR_ERROR')
            // this.$http.post(`papidb/Add`, this.airs, {
            //   headers: { 'Content-type': 'application/json' }
            // })
            // .then(res => {
            //   this.$store.commit('IS_ERROR', { Message: `Аэропорт ${res.data.name} успешно добавлен`, state: 'primary' })
            //   this.$emit('added', res.data)
            // })
            // .catch(err => {
            //   this.$store.commit('IS_ERROR', { Message: err.response.data.Message, state: 'red' })
            // } 
            // )
          }
        }
        
        
      }
    }
  }
</script>
