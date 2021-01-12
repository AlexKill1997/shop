import { mapGetters, mapMutations } from 'vuex'

import { transliterate as tr, slugify } from 'transliteration'

export default {
  data: () => ({
    show: false,
  }),
  props: {
    parentShow: {
      type: Boolean
    },
  },
  computed: {
    ...mapGetters({
      PRODUCT_FILTERS: 'product/PRODUCT_FILTERS',
      PRODUCT_PROPERTIES: 'product/PRODUCT_PROPERTIES'
    })
  },
  methods: {
    ...mapMutations({
      setFilterValue: 'product/SET_PRODUCTS_FILTER_VALUES'
    }),

    sl(value) {
      return slugify(tr(value))
    },
    
    /**
     * @description Проверка значений фильтра диапазона
     * @param {String} filterName Название диапазона
     * @param {String} filterType Редактируемая граница диапазона (min или max)
     */
    rangeChanged(filterName, filterType, value, el) {
      let tmpValue = value
      switch (filterType) {
        case 'min':
          if (value < this.PRODUCT_PROPERTIES[filterName].min) {
            value = this.PRODUCT_PROPERTIES[filterName].min
          }
          if (value > this.PRODUCT_FILTERS[filterName].value.max) {
            value = this.PRODUCT_FILTERS[filterName].value.max
          }
          break

        case 'max':
          if (value > this.PRODUCT_PROPERTIES[filterName].max) {
            value = this.PRODUCT_PROPERTIES[filterName].max
          }
          if (value < this.PRODUCT_FILTERS[filterName].value.min) {
            value = this.PRODUCT_FILTERS[filterName].value.min
          }
          break
      }
      this.setFilterValue({
        method: 'input',
        params: { parent: filterName, key: filterType, value: value }
      })
      el.value = value
    },
  }
}