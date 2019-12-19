<template>
    <v-container>
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
    
        <v-btn class="mr-4" @click="submit" type="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
        </form>
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