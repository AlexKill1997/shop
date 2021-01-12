import { mapGetters } from 'vuex'
import vBasePopup from '@/components/popup/v-base-popup.vue'

export default {
  components: {
    vBasePopup,
  },
  computed: {
    ...mapGetters({
      user: 'user/GET_USER'
    })
  }
}