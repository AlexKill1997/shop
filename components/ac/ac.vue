<template lang="pug">
  .accordion#accordion
    .accordion__item(v-for=" (item,index) in menuRoutes")
      .accordion__item__head(@click="b === index ? b =  null : b = index"  :class="{active: b===index}")
        //- img(:src="catImg[item.categoryName]")
        img(:src="getImgPath(item.iconPath, item.cSlug, item.icon)")

        span {{ item.categoryName}}
      .accordion__item__body(v-for="(subitem,i) in item.children" :key="subitem.subcategoryName"
       @click="a === i ? a=null  : a=i" :class="{isActive: a===i}")

        .accordion__item__body__wrap(v-if="subitem.children.length>1" )
          .accordion__item__body__wrap__pic
            img.rightPic(:src="require('@/assets/images/items/arrow-circle1.svg')" )
          nuxt-link.accordion__item__body__second(:to="getRoute(subitem._id)") {{subitem.categoryName}}

        .accordion__item__body__wrap(v-else="subitem.children.length>1" )
          .accordion__item__body__wrap__pic
            img(:src="require('@/assets/images/items/arrow-circle2.svg')" )
          nuxt-link.accordion__item__body__wrap__link-all(:to="getRoute(subitem._id)") {{ subitem.categoryName}}
        .accordion__item__body__sub(v-for="subsubitem in subitem.children" v-if="subitem.children.length>1" )
          .accordion__item__body__sub__wrap__rectangle
          nuxt-link.accordion__item__body__sub__wrap(:to="getRoute(subsubitem._id)")
            span {{subsubitem.categoryName}}





</template>

<script>
import { mapState } from 'vuex'
import imgPathMixin from '@/components/mixins/imgPath'

export default {
  data() {
    return {
      active: 'active',
      reverso: 'reverso',
      a: null,
      b: null,
      isActive: 'isActive',
      // catImg: {
      //   'СТРОИТЕЛЬНЫЕ ИНСТРУМЕНТЫ': require('@/assets/images/icons/dropMenuIcons/materialIcon.svg'),
      //   ТЕПЛОЗВУКОИЗОЛЯЦИЯ: require('@/assets/images/icons/dropMenuIcons/isolation1.svg'),
      //   'ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/trim.svg'),
      //   'ДРЕВЕСНО-ПЛИТНЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/drevesno - plitnie.svg'),
      //   'ГИПСОКАРТОННЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/metalloprokat.svg'),
      //   'ОБЩЕСТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ': require('@/assets/images/icons/dropMenuIcons/obshestroitelnye1.svg'),
      //   'Все для кровли': require('@/assets/images/icons/dropMenuIcons/roof.svg'),
      //   КРЕПЕЖ: require('@/assets/images/icons/dropMenuIcons/crepej1.svg'),
      //   'МЕТАЛЛОПРОКАТ': require('@/assets/images/icons/dropMenuIcons/metall1svg.svg')
      // },
      hasClass: {
        open: false
      },
      currentIndex: null
    }
  },
  computed: {
    // ...mapGetters(['GET_MENU_ROUTES', 'GET_MENU_DROPDOWNS']),
    ...mapState(['menuRoutes', 'menuDropdowns']),
    dropd() {
      return this.menuDropdowns
    }
  },

  methods: {
    getSubArray(subcat) {
      if(subcat.brands) return subcat.brands
      else if(subcat.childrenTR) return subcat.childrenTR
    },
    accordion() {
      // console.log("this.hasClass.open = !this.hasClass.open")
      //   if (this.hasClass.open) {
      //     console.log("this.hasClass.open = !this.hasClass.open")
      //     this.hasClass.open = !this.hasClass.open
      //   } else {
      //     this.hasClass.open = true
      //     console.log("this.hasClass.open = true")
      // }
      //   var matches = document.querySelectorAll('.accordion__item__head')
      //   for(var i = 0; i < matches.length; i++){
      //     matches[i].classList.remove('active');
      //   }
      //   event.target.classList.toggle('active');
      // }
    }
  },
  mixins: [imgPathMixin]
}
</script>


<style lang="sass">
@import "./layouts/mixins.sass"

.accordion
  transition: all ease 1s
  width: 100%
  display: none
  @include tablets
    display: block
    background: white
  &__item
    position: relative
    padding: 5px 5px 0

    &__head
      cursor: pointer
      padding: 8px 30px 8px 2%
      transition: all ease 1s
      display: flex
      align-items: center
      background: #f6f6f6
      font-weight: bold
      font-size: 16px
      img
        margin-right: 2%
        width: 30px
        height: 30px

    &__head::after
      content: ' > '
      position: absolute
      right: 16px
      transform: rotate(90deg) scaleY(2)
      top: 20px
    &__body
      display: none
      transition: all ease 1s
      cursor: pointer
      &__text::after
        content: ' > '
        position: absolute
        right: 16px
        font-size: 20px
      &__sub
        display: none

.reverso
  transform: rotate(180deg)
.accordion__item__head.active ~ .accordion__item__body
  display: block !important
  transition: all ease 1s

.accordion__item__body.isActive .accordion__item__body__sub
  display: flex !important
  align-items: center
  a
    text-decoration: none
    color: $text
    font-weight: bold
    font-size: 16px

.accordion__item__head.active:after
  content: ' < '

.accordion__item__body.isActive .accordion__item__body__wrap__arrow
  transform: rotate(180deg) !important
.accordion__item__body__wrap
  display: flex
  align-items: center
  font-weight: bold
  &__pic
    margin: 0 5px
    width: 20px
    height: 20px
    transform: rotate(180deg)
    img
      height: 100%

.accordion__item__body__wrap > span
  margin-left: 5px


.accordion__item__body__sub
  padding-left: 15px
  padding-top: 15px
  background-color: white
  font-size: 16px


.accordion__item__body__wrap__arrow
  font-size: 20px
  font-weight: bold
  margin-right: 10px
  width: 10px

a
  text-decoration: none
  color: black
.accordion__item__body__wrap
  text-decoration: none
  color: black
  height: 35px
  &:first-child
    padding-top: 0


@keyframes accordion
  0%
    height: 0
  100%
    height: 100%

.accordion__item__body__second
  font-weight: bold
  font-size: 16px
.accordion__item__body
  border-top: 5px solid white
  border-bottom: none
  background-color: #f6f6f6
  margin: 0 5px

.accordion__item__body__second
  margin: 5px

.accordion__item__body__sub__wrap__rectangle
  width: 5px
  background-color: yellow
  height: 18px
  margin-right: 5px
  font-weight: bold


.accordion__item__body.isActive :nth-child(2)
  // padding-top: 5px
// .accordion__item__body.isActive > div:nth-child(2)
//   padding-top: 0 !important




.accordion__item > div.accordion__item__body.isActive > div:nth-child(2)
  padding-top: 5px

.accordion__item__body__wrap__link-all
  width: 100%
  margin: 5px


div.accordion__item__body.isActive > div.accordion__item__body__wrap > div > .rightPic
  transform: rotate(180deg)
</style>
