<template lang="pug">
    .search__category
      .search__category__icon
        img(:src="catImg[category.categoryName] || require('@/assets/images/items/arrow-circle1.svg')" )
      span {{category.categoryName}}
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => {}
    }


    },
    data:()=>({
    catImg: {
        'СТРОИТЕЛЬНЫЕ ИНСТРУМЕНТЫ': require('@/assets/images/icons/dropMenuIcons/materialIcon.svg'),
        ТЕПЛОЗВУКОИЗОЛЯЦИЯ: require('@/assets/images/icons/dropMenuIcons/insulation.svg'),
        'ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/trim.svg'),
        'ДРЕВЕСНО-ПЛИТНЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/drevesno - plitnie.svg'),
        'ГИПСОКАРТОННЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/metalloprokat.svg'),
        'ОБЩЕСТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/obshestroitelnye.svg'),
        'ВСЕ ДЛЯ КРОВЛИ': require('@/assets/images/icons/dropMenuIcons/roof.svg'),
        КРЕПЕЖ: require('@/assets/images/icons/dropMenuIcons/fastener.svg'),
        'МЕТАЛЛОПРОКАТ': require('@/assets/images/icons/dropMenuIcons/metalloprokat.svg')
      }
  })

}
</script>
<style lang="sass">
@import '@/layouts/mixins.sass'

.search__category
  display: flex
  margin-left: 10px
  align-items: center
  .search__category__icon
    width: 15px
    height: 15px
    margin-right: 10px
    @include phones
      width: 15px
      height: 15px
    img
      transform: rotate(-90deg)
      height: 100%
  span
    @include phones
      text-align: center
      height: 17px
      width: 100%
      overflow: hidden
      display: -webkit-box
      -webkit-line-clamp: 1
      -webkit-box-orient: vertical
      text-overflow: ellipsis
</style>
