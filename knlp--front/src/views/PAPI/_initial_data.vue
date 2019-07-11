<template>
  <v-card>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card-title class="headline font-weight-regular justify-space-between">
      Ввод исходных данных для облета
    </v-card-title>
    <v-divider></v-divider>
    
    <v-card-text style="height: 64vh;">
      <v-layout justify-center column fill-height>
        <section>
        <h3 class="headline mb-1">ФИО оператора</h3>
        <v-text-field solo light v-model="name" required :rules="[v => !!v || 'Введите ФИО оператора']" @focus="resetValidation" clearable></v-text-field>
        <h3 class="headline mb-1">Бортовой номер</h3>
        <v-text-field solo light v-model="aircraft" required :rules="[v => !!v || 'Введите номер борта']" @focus="resetValidation" clearable></v-text-field>
        <h3 class="headline mb-1">Аэропорт</h3>
        <v-text-field solo light v-model="airport" required :rules="[v => !!v || 'Введите ИКАО-код аэропорта']" @focus="resetValidation" clearable></v-text-field>
        </section>
      </v-layout>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="$router.go(-1)">
        Назад
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
      :disabled="!valid"
      color="primary"
      @click="validate"
    >
      Далее
    </v-btn>
    </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: 'Зильберштейн',
      aircraft: 67469,
      airport: 'UUWW'
    }),
    mounted() {
      this.$store.commit('BACK_PAGE', '/papi')
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.$store.commit('SAVE_USER_DATA', {
            name: this.name,
            aircraft: this.aircraft,
            airport: this.airport
          })
          this.$router.push('/papi/fas-selected')
        }
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      }
    }
  }
</script>