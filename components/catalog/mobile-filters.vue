<template lang="pug">
  .v-catalog__popup-filter(v-if="filterShow && Object.values(PRODUCT_FILTERS).length > 0")
    .v-catalog__popup__filters
      img.v-popup-login__closeIcon(
        :src="require('@/assets/images/icons/close_mark.svg')"
        title="Закрыть окно"
        alt="Закрыть"
        @click="$emit('close')")
      ul.filters__list__open(v-if="Object.keys(PRODUCT_FILTERS).length")
        .filters__list__open__def Фильтр товаров
          .filters__list__open__icon-divider
            img(src="@/assets/images/divider.png")
        li.filters__list-item(v-for="(filter, name, index) of PRODUCT_FILTERS" v-if="show ? index < 100 : index < 28 " :key="name")
          .filters__header(
            @click="setFilterValue({ method: 'opener', params: { key: name, value: !filter.opened } })"
          )
            p.filters__heading {{ name }}
            img.categories__icon(:class="{turn:filter.opened == true}" :src="require('@/assets/images/items/arrow-circle1.svg')" title="Свернуть")

          .filters__range(v-if="filter.value.constructor === Object && filter.opened == true")
            input.range-input(
              type="number"
              :min="PRODUCT_PROPERTIES[name].min"
              :max="PRODUCT_PROPERTIES[name].max"
              :value="filter.value.min"
              @change="rangeChanged(name, 'min', $event.target.value, $event.target)"
              step="1")
            span &nbsp;—&nbsp;
            input.range-input(
              type="number"
              :value="filter.value.max"
              :min="PRODUCT_PROPERTIES[name].min"
              :max="PRODUCT_PROPERTIES[name].max"
              @change="rangeChanged(name, 'max', $event.target.value, $event.target)"
              step="1")

          transition(name="fade")
            .input-wrapper(v-if="filter.opened == true")
              .input-group(
                v-if="filter.value.constructor === Array"
                v-for="item in filter.value"
                :key="filter.value.indexOf(item)"
              )
                  input.input-group__input(
                    type="checkbox"
                    :name="`${sl(item.name)}-${sl(item)}`"
                    :value="item.value"
                    :id="`${sl(item.name)}-${sl(item)}`"
                    @change="setFilterValue({ method: 'checkbox', params: { parent: name, key: item.name, value: !item.value } })"
                  )
                  label.input-group__label(:for="`${sl(item.name)}-${sl(item)}`") {{ item.name }}
      .show_more(v-if="parentShow && show == false && Object.values(PRODUCT_FILTERS).length > 28" @click="show = true")  + показать еще
      .show_less(v-if="parentShow && show == true && Object.values(PRODUCT_FILTERS).length > 28" @click="show = false") - скрыть
      .categories__buttons__open
        span.categories__buttons-apply(@click="$emit('apply')") Применить
        span.categories__buttons-clear(@click="$emit('clear')") Очистить
</template>

<script>
import filtersMixin from '@/components/mixins/catalog/filters';

export default {
  props: {
    filterShow: {
      type: Boolean
    }
  },
  mixins: [filtersMixin]
}
</script>
