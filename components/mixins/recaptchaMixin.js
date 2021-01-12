import { backendRecaptchaCheck } from '@/services/recaptcha'

export default {
  data: () => ({
    recaptcha: false
  }),
  computed: {
    siteKey() {
      return this.$store.getters['GET_SITE_KEY']
    }
  },
  methods: {
    recaptchaExecute() {
      return this.$refs.recaptcha.$emit("verify", "none")
      
      this.$refs.recaptcha.execute()
    },
    recaptchaCheck(token, callback) {
      return callback()
      return backendRecaptchaCheck(token)
        .then((isValid) => {
          if (isValid) {
            this.recaptcha = true
            return callback()
          }
      })
    }
  }
}