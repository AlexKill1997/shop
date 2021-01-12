<template lang="pug">
  #v-footer
    //- .v-footer__masonry-wrapper
    //-   .v-footer__masonry-wrapper-grid(v-for="(group, name, index) in seoLinks")
    //-     .v-footer__masonry-wrapper-grid__item
    //-       h5.v-footer__heading {{ name }}
    //-       ul.v-footer__list
    //-         li.v-footer__list-item(v-for="item in group")
    //-           a(href="#") {{ item }}



    .v-footer__contacts
      .v-footer__phones
        p Есть вопросы? Звоните!
          span.contacts__phone(v-for="phone in footerPhones.phones")
            a.phone(:href="`tel:${phone}`") {{ phone }}
          //- | или
          //- span.contacts__phone
          //-   | +7 (495) 134-28-06
          //- | круглосуточно

      .v-footer__messengers
        p Или пишите!
        img(src="~@/assets/images/icons/footer-whatsapp.svg")
        img(src="~@/assets/images/icons/footer-viber.svg")
    .v-footer__nav
      ul.v-footer__nav-list
        //- li.v-footer__nav-list-item
        //-   nuxt-link.v-footer__link(to="/vacancy")
        //-     img.v-footer__nav-list-item-icon(src="~@/assets/images/icons/user_40x40.png")
        //-     span.v-footer__nav-list-item-title Вакансии
        li.v-footer__nav-list-item
          nuxt-link.v-footer__link(to="/payment")
            img.v-footer__nav-list-item-icon.first(src="~@/assets/images/icons/customer_nav.svg")
            span.v-footer__nav-list-item-title Покупателям
        li.v-footer__nav-list-item
          nuxt-link.v-footer__link(to="/certificates")
            img.v-footer__nav-list-item-icon(src="~@/assets/images/icons/certificate_30x38.svg")
            span.v-footer__nav-list-item-title Сертификаты
        li.v-footer__nav-list-item
          nuxt-link.v-footer__link(to="/delivery")
            img.v-footer__nav-list-item-icon(src="~@/assets/images/icons/delivery1.svg")
            span.v-footer__nav-list-item-title Доставка
        li.v-footer__nav-list-item
          nuxt-link.v-footer__link(to="/payment")
            img.v-footer__nav-list-item-icon(src="~@/assets/images/icons/wallet_40x40.svg")
            span.v-footer__nav-list-item-title Оплата
    .v-footer__extra
      .v-footer__extra__mobile-app
        .v-footer__extra__mobile-app__header Наши мобильные приложения
        .v-footer__extra__mobile-app__icon-container
        img.v-footer__extra__mobile-app__icon-container__icon(src="~@/assets/images/icons/mobile-app/google.svg")
        img.v-footer__extra__mobile-app__icon-container__icon(src="~@/assets/images/icons/mobile-app/ios.svg") 
        img.v-footer__extra__mobile-app__icon-container__icon(src="~@/assets/images/icons/mobile-app/telegram.svg")
      .v-footer__extra__payment-system
        .v-footer__extra__payment-system__header Мы принимаем к оплате
        .v-footer__extra__payment-system__icon-container
          img.v-footer__extra__payment-system__icon-container__icon(src="~@/assets/images/icons/payment-system/visa_logo.svg")
          img.v-footer__extra__payment-system__icon-container__icon(src="~@/assets/images/icons/payment-system/old_visa_logo.svg")   
          img.v-footer__extra__payment-system__icon-container__icon(src="~@/assets/images/icons/payment-system/mastercard.svg")   
          img.v-footer__extra__payment-system__icon-container__icon(src="~@/assets/images/icons/payment-system/maestro.svg")   
          img.v-footer__extra__payment-system__icon-container__icon(src="~@/assets/images/icons/payment-system/mir.svg")   

    .v-footer__information
      .v-footer__information-socials
        a.v-footer__information-socials-item(href='https://vk.com/public199794333')
          img(src="~@/assets/images/icons/vk-round-angle.svg" title="vk")
        a.v-footer__information-socials-item(href="https://www.facebook.com/tdcsk")
          img(src="~@/assets/images/icons/facebook-round-angle.svg" title="facebook")
        a.v-footer__information-socials-item(href="https://www.instagram.com/td_csk/")
          img(src="~@/assets/images/icons/instagram-round-angle.svg" title="instagram")
        a.v-footer__information-socials-item(href="https://www.youtube.com/channel/UC-8OyKVIHwCAHKNXSIGCz9g")
          img(src="~@/assets/images/icons/youtube-round-angle.svg" title="youtube")
      .v-footer__information__metrica
        a(href="https://metrika.yandex.ru/stat/?id=69922249&amp;from=informer" target="_blank" rel="nofollow")
          img(src="https://informer.yandex.ru/informer/69922249/3_0_FFFFFFFF_FFFFFFFF_0_pageviews" style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer" data-cid="69922249" data-lang="ru")
        iframe(src="https://yandex.ru/sprav/widget/rating-badge/184351801990" width="150" height="50" frameborder="0") 
        a(href="https://webmaster.yandex.ru/siteinfo/?site=https://tdcsk.com")
          img(width="88" height="31" alt="" border="0" src="https://yandex.ru/cycounter?https://tdcsk.com&theme=light&lang=ru")
        


      ul.v-footer__information-list
        li.v-footer__information-list-item
          p.copyright &copy;&nbsp;2010&nbsp;&mdash; 2020&nbsp;ООО &laquo;Торговый Дом ЦСК&raquo; интернет-магазин строительных материалов.
        li.v-footer__information-list-item
          p Политика конфиденциальности
        li.v-footer__information-list-item
          p Условия пользования
        li.v-footer__information-list-item
          a(href="https://roboweb.site/").copyright Разработка и продвижение RoboWebTeam. Все права защищены
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Footer',
  // props: {
  //   seoLinks: {
  //     type: Object,
  //     default: () => {}
  //   }
  // }
  computed: {
    ...mapGetters({
      footerPhones: 'GET_CURRENT_CITY'
    })
  }
}
</script>

<style lang="sass">
@import './footer.sass'
</style>
