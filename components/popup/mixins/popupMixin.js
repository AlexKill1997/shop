export default {
  
  props: {
    /**
     * Заголовок всплывающего окна
     */
    popupTitle: {
      type: String,
      default: ''
    },
    /**
     * Описание под заголовком
     */
    popupDescription: {
      type: String,
      default: ''
    },
    /**
     * Название иконки из папки icons
     */
    nameLeftIcon: {
      type: String,
      default: ''
    },
    /**
     * Ширина попапа
     */
    popupWidth: {
      type: Number,
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    }
  }
}