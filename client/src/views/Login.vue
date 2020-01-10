<template>
     <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs6
            sm6
            md5
          >
            <v-card class="elevation-12"
              height = 600
              center
              shaped
            >
              <v-toolbar
                color="cyan darken-2"
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                flat
                height = 175
              >
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text> 
                <form @submit.prevent="login">
                    <v-text-field
                    v-model="username"
                    :error-messages="userNameErrors"
                    :counter="10"
                    label="Pseudonyme"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                    ></v-text-field>
                    <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="passwordErrors"
                    label="Mot de passe"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                 :bottom=true 
                 class="ma-2" outlined color="cyan darken-2" @click="submit" type="submit">Se Connecter</v-btn>
                </form>
              </v-card-text>
              <v-card-actions>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import { required, minLength, between, maxLength} from 'vuelidate/lib/validators'

export default {
  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required }
  },

  data: () => ({
    username: '',
    password: '',
    select: null,
  }),

  computed: {
    userNameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.maxLength && errors.push('Le pseudonyme doit faire moins de 10 caractères')
      !this.$v.username.required && errors.push('Le pseudonyme est requis.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Mot de passe requis.')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch();
    },
    clear () {
      this.$v.$reset();
      this.username = '';
      this.password = '';
    },
    login () {
      const username = this.username 
      const password = this.password
      this.$store.dispatch('login', { username, password })
      .then(() => this.$router.push('/'))
      .catch(err => {
        this.$notify({
          type: 'error',
          group: 'foo',
          title: 'Echec de la connexion',
          text: 'Votre identifiant et/ou votre mot de passe sont incorrects.'
        });
      });
    }
  },
}
</script>