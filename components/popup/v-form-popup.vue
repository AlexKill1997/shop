<template lang="pug">
  vBasePopup(
    ref="parent"
    :popupTitle='popupTitle',
    :popupDescription='popupDescription',
    :nameLeftIcon='nameLeftIcon',
    :popupWidth='popupWidth'
  )
    template(v-slot:content)
      form.v-popup(@submit.prevent="callbackHandler")
        .v-popup__header
          template(v-if="$slots.header !== undefined")
            slot(name="header")
          template(v-else)
            img(v-if="nameLeftIcon.length > 0" :src="require(`../../assets/images/icons/${nameLeftIcon}`)")
            .v-popup__header-descWrapper
              span.v-popup__header-title {{ popupTitle }}
              span.v-popup__header-desc {{ popupDescription }}
            img.v-popup__header-closeIcon(
              :src="require('../../assets/images/icons/close_mark.svg')"
              title="Закрыть окно"
              alt="Закрыть"
              @click="closePopup")
        .v-popup__content
          slot(name="default")
        .v-popup__footer(v-if="popupSubmitButtonLabel || !popupSubmitButtonLabel == 'false'")
          button.popup-submit {{ popupSubmitButtonLabel }}
</template>

<script>
import vBasePopup from '@/components/popup/v-base-popup.vue';
import popupMixin from '@/components/popup/mixins/popupMixin';

export default {
  name: "FormPopup",
  props: {
    popupSubmitButtonLabel: {
      type: [String, Boolean],
      default: 'Отправить'
    },
    parent: {
      type: Object
    }
  },
  components: {
    vBasePopup
  },
  methods: {
    callbackHandler() {
      this.$emit('callbackhandler')
    }
  },
  mounted() {
    const parent = this.$refs.parent
    parent.$on("close", this.closePopup.bind(this))
  },
  mixins: [popupMixin]
}
</script>