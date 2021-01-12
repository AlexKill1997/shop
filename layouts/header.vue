<template lang="pug">
  #v-header(:class="{'addMarginForFixedHeader': active}")

    .arrow_for_navigation(v-if="arrowScroll" @click="scrollToTop")
      img(src="@/assets/images/icons/arrow_toTop.svg")
    vFormPopup(
      v-if="isPaymentRequestVisible"
      @close="closePopup"
      @callbackhandler="paymentRequestHandler"
      @open='openConsumptionPopup'
      :popupTitle="'Заявка на бесплатный расчёт'"
      :popupDescription="'Оставьте Ваши данные и коментарии наши менеджеры свяжутся с Вами'"
      :nameLeftIcon="'pencil-writing-on-a-paper-sheet.svg'"
      :popupSubmitButtonLabel="'Отправить'"
      :popupWidth="460")
      .popupInputGroup__header-payment-request
        label(for="Payment_Name")
          | Ваше имя
          span.redAsterisk
        input(
          type="text"
          placeholder="Иванов Иван Иванович"
          v-model="calculationName"
          ref="calculationname"
          required
        )
      .popupInputGroup__header-payment-request
        label(for="Payment_Phone")
          | Телефон
          span.redAsterisk
        input#Payment_Phone(
          type="phone"
          placeholder="+7 (999) 123-45-67"
          v-model="calculationPhone"
          ref="calculationphone"
          v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
          minLength="12"
          required
        )
      .popupInputGroup__header-payment-request
        label#Payment(for="Payment_File") Прикрепить файл
        input#Payment_File.addFile(
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          ref="file"
          multiple
          @change="fileUploadHandler()"
        )
      .popupInputGroup__header-payment-request
        label(for="Payment_Company") Название компании
        input#Payment_Company(
          type="text"
          placeholder="Название компании"
          v-model="calculationCompany"
          ref="calculationcompany"
        )
      .popupInputGroup__header-payment-request
        label(for="Payment_INN") ИНН
        input#Payment_INN(
          type="text"
          placeholder="номер ИНН"
          maxlength="10"
          v-model="calculationInn"
          ref="calculationinn"
        )
      .popupInputGroup__header-payment-request
        label(for="Payment_Comment") Комментарий
        textarea#Payment_Comment(
          cols="30"
          rows="5"
          placeholder="Оставьте свои пожелания здесь"
          v-model="calculationComment"
          ref="calculationcomment"
        )
      .popupInputGroup__header-payment-request
        .popupInputGroup_CheckWrapper
          input#Payment_Agreement(
            type="checkbox"
            v-model="calculationAgree"
            require
          )
          label(for="Payment_Agreement")
            | Я даю свое
            span.check_accent &nbsp;согласие на обработку
            | &nbsp;моих персональных данных.


    template(v-if="isConsumsionThanks")
      vPopupConsumptionThank(@close="closePopup")

    vFormPopup(
      v-if="isFeedbackVisible"

      @close="closePopup"
      @callbackhandler="callbackhandler"
      @open='openThankPopup'

      :popupTitle="'Бесплатный звонок'"
      :popupDescription="'Оставьте Ваши данные и наши менеджеры свяжутся с Вами'"
      :nameLeftIcon="'phone-volume.svg'"
      :popupSubmitButtonLabel="'Отправить'")
      .popupInputGroup
        label(for="Payment_Name")
          | Ваше имя
          span.redAsterisk
        input#Payment_Name(
          type="text"
          placeholder="Иванов Иван Иванович"
          v-model="name"
          ref="name"
          required
        )
      .popupInputGroup
        label(for="Payment_Phone")
          | Телефон
          span.redAsterisk
        input#Payment_Phone(
          type="phone"
          placeholder="+7 (999) 123-45-67"
          v-model="phone"
          ref="phone"
          v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
          minLength="12"
          required
        )
      .popupInputGroup
        .popupInputGroup_CheckWrapper
          input#Payment_Agreement(
            type="checkbox"
            v-model="agree"
            checked
            required
          )
          label(for="Payment_Agreement")
            | Я даю свое
            span.check_accent &nbsp;согласие на обработку
            | &nbsp;моих персональных данных.

    template(v-if="isthankPopupVisible")
      vThankPopup(@close="closePopup")
    vPopupLogin(
      v-if="authPopup"
      @close="closePopup"
      @recovery="openRecoveryMassagePopup"
      @recoverError="openErrorRecoverPopup"
    )
    template(v-if="recoveryMassagePopup")
      vPopupRecoveryMessage(
        @close="closePopup"
      )
    template(v-if="isRecoverError")
      vPopupRecoverMessageError(@close="closePopup")
    .v-header#header
      nuxt-link.v-header__mainPage(to="/" @click="closeAll()")
        img.v-header__logo(src="~@/assets/images/LOGO_RUS.png" title="Логотип")
        span.v-header__logo-desc Центр строительной комплектации
      .v-overlay(:class="{'overlay': dropDowns.setCity.open}" @click="hide")
      .v-header__info
        ul.v-header__info-list
          li.v-header__info-list-item(v-for="phone in currentCity.phones")
            a.phone(:href="`tel:+${phone}`") {{ phone }}
          li.v-header__info-list-item.setCity(@click="toggle('setCity')" :class="{'setCityDialog': dropDowns.setCity.open}" )
            span.v-header__info-list-item-title {{ currentCity.title }}
            img.v-header__info-list-item-icon(src="@/assets/images/icons/arrow-down.svg" title="Стрелочка")
            ul.setCity-dropdown-menu
              li.setCity-dropdown-menu-item(
                v-for="region in mainContent.regions.options"
                :key="region.id"
                @click="$store.dispatch('setCity', {region, router: $router})"
              )
                span {{ region.title }}

      nav.v-header__nav
        ul.v-header__nav-list
          li.v-header__nav-list-item#PaymentRequest(@click="showPaymentRequest")
            .v-header__nav-list-item-icon
              img(src="~@/assets/images/icons/letter1.svg")
            span.v-header__nav-list-item-title Заявка на расчёт

          li.v-header__nav-list-item(@click="closeAll()")
            nuxt-link.v-header__nav-link(to="/about")
              .v-header__nav-list-item-icon
                img(src="~@/assets/images/icons/about1.svg")
              span.v-header__nav-list-item-title О нас

          li.v-header__nav-list-item(@click="closeAll()")
            nuxt-link.v-header__nav-link(to="/certificates")
              .v-header__nav-list-item-icon
                img(src="~@/assets/images/icons/certificate2.svg")
              span.v-header__nav-list-item-title Сертификаты

          //- li.v-header__nav-list-item#Customers(@click="toggle('customers')" :class="{'customersDropDownOpen': dropDowns.customers.open}")
          //-   img.v-header__nav-list-item-icon(src="~@/assets/images/icons/customer.png")
          //-   span.v-header__nav-list-item-title Покупателям
          //-   ul.customers-dropdown-menu
          //-     nuxt-link(to="/delivery" @click="closeAll()")
          //-       li.customers-dropdown-menu__item
          //-         span Доставка
          //-     nuxt-link(to="/payment" @click="closeAll()")
          //-       li.customers-dropdown-menu__item
          //-         span Оплата
          li.v-header__nav-list-item(@click="closeAll()")
            nuxt-link.v-header__nav-link(to="/payment")
              .v-header__nav-list-item-icon
                img(src="~@/assets/images/icons/customer_nav1.svg")
              span.v-header__nav-list-item-title Покупателям

          li.v-header__nav-list-item(@click="closeAll()")
            nuxt-link.v-header__nav-link(to="/delivery")
              .v-header__nav-list-item-icon
                img.v-header__nav-list-item-icon(src="~@/assets/images/icons/delivery2.svg")
              span.v-header__nav-list-item-title Доставка

          //- li.v-header__nav-list-item(@click="closeAll()")
          //-   nuxt-link.v-header__nav-link(to="/wholesalers")
          //-     img.v-header__nav-list-item-icon(src="~@/assets/images/icons/wholesalers.png")
          //-     span.v-header__nav-list-item-title Оптовикам
          //- li.v-header__nav-list-item(@click="closeAll()")
          //-   nuxt-link.v-header__nav-link(to="/articles")
          //-     img.v-header__nav-list-item-icon(src="~@/assets/images/icons/articles.svg")
          //-     span.v-header__nav-list-item-title Статьи
          li.v-header__nav-list-item(@click="closeAll()")
            nuxt-link.v-header__nav-link(to="/contacts")
              .v-header__nav-list-item-icon
                img(src="~@/assets/images/icons/contact-phone1.svg")
              span.v-header__nav-list-item-title Контакты

      .v-header__feedback#Feedback(@click="showFeedback")
        span.v-header__feedback-desc Заказать звонок

    .v-overlay_mobile(:class="{'overlay_mobile': mobile}" @click="hide")

    .v-subheader(:class="{'fixed':active}")
      .v-subheader__mobile-catalog#mobile-catalog(@click="hideBurger")
        vBurger( :class="{'isMobile': mobile, }" v-if="disabled" )

      .mobile-dropdown(v-show="mobile")
        .dropdown-wrap
          ul.dropdown__list
            li.v-subheader__info-list-item.setCity(@click="toggle('setCity')" :class="{'setCityDialog': dropDowns.setCity.open}" )
              span.v-subheader__info-list-item-title {{ currentCity.title }}
              img.v-header__info-list-item-icon(src="@/assets/images/icons/arrow-down.svg" title="Стрелочка")
              ul.setCity-dropdown-menu.mobile
                li.setCity-dropdown-menu-item(
                  v-for="region in mainContent.regions.options"
                  :key="region.id"
                  @click="$store.dispatch('setCity', {region, router: $router})"
                )
                  span {{ region.title }}
            li.v-subheader__info-list-item(@click="hide")
              nuxt-link.v-subheader__nav-link(to="/" @click="closeAll()")
                img.v-subheader-icon(src="~@/assets/images/icons/catalog_3.svg")
                span.v-subheader-list-title Каталог товаров
            li.v-subheader__info-list-item(@click="hide")
              nuxt-link.v-subheader__nav-link(to="/favorites" @click="closeAll()")
                img.v-subheader-icon(src="~@/assets/images/icons/heart_black_3.svg")
                span.v-subheader-list-title Избранное
            li.v-subheader__info-list-item(@click="hide")
              nuxt-link.v-subheader__nav-link(to="/cart")
                img(src="~@/assets/images/icons/cart_3.svg")
                span.v-subheader-list-title Корзина
            li.v-subheader__info-list-item(@click="hide")
              nuxt-link.v-subheader__nav-link(to="/delivery")
                img.v-subheader-icon(src="~@/assets/images/icons/delivery_4.svg")
                span.v-subheader-list-title Доставка
            li.v-subheader__info-list-item(@click="hide")
              nuxt-link.v-subheader__nav-link(to="/payment")
                img.v-subheader-icon(src="~@/assets/images/icons/payment_1.svg")
                span.v-subheader-list-title Оплата
          .v-subheader__phones
            p Есть вопросы? Звоните!
            p.contacts__phone(v-for="phone in footerPhones.phones")
              a.phone(:href="`tel:${phone}`") {{ phone }}
            p Круглосуточно
          .dropdown__footer
            .dropdown__footer__text
              p.copyright__bold &copy;&nbsp;2010&nbsp;&mdash; 2020&nbsp;
              p.copyright__bold ООО &laquo;Торговый Дом ЦСК&raquo;
              a.copyright__bold(href='https://roboweb.site/') Разработка и продвижение
              a.copyright__bold(href='https://roboweb.site/') RoboWeb Team.
              p Все права защищены
            .dropdown__footer-socials
              .dropdown__footer-socials__container
                a.dropdown__footer-socials__container-icon(href='https://vk.com/public199794333')
                  img(src="~@/assets/images/icons/vk-round-angle.svg" title="vk")
                a.dropdown__footer-socials__container-icon(href="https://www.facebook.com/tdcsk")
                  img(src="~@/assets/images/icons/facebook-round-angle.svg" title="facebook")
                a.dropdown__footer-socials__container-icon(href="https://www.instagram.com/td_csk/")
                  img(src="~@/assets/images/icons/instagram-round-angle.svg" title="instagram")
                a.dropdown__footer-socials__container-icon(href="https://www.youtube.com/channel/UC-8OyKVIHwCAHKNXSIGCz9g")
                  img(src="~@/assets/images/icons/youtube-round-angle.svg" title="youtube")

      nuxt-link.v-header__mainPage(v-if="disabled" to="/" @click="closeAll()")
        img.v-subheader__logo(src="~@/assets/images/logo_mobile_black1.svg" title="Логотип")
      .v-overlay(:class="{'overlay': dropDowns.catalog.open}" @click="hide")
      .v-subheader__catalog-content(:class="{'catalogDropDownOpen': dropDowns.catalog.open}")
        transition(name='fade')
          .catalog-dropdown-menu(:class="{'top':active}")
            //- по клику на категорию создаётся объект подкатегории в data()
            .catalog-dropdown-menu-item(
              v-for="item in menuRoutes"
              :key="`${item.cSlug}`"
              @mouseenter="toggleSublistItem(item.cSlug)"
              @mouseleave="toggleSublistItem(item.cSlug)"
            )
              nuxt-link.catalog-dropdown-menu-item-link(
                :to="item.url"
              )

                .catalog-dropdown-menu-item-inner
                  .catalog-dropdown-menu-item-inner--img
                    //- img(:src="catImg[item.categoryName]")
                    img(:src="getImgPath(item.iconPath, item.cSlug, item.icon)")

                  span.dropdown-menu-item-title {{ item.categoryName }}
                  img.dropdown-menu-item-arrow(v-if="item.children.length > 0" :src="require('../assets/images/icons/arrow-right-menu.svg')")
                .overflow_h(v-if="item.children.length > 0")
                  .catalog-dropdown-sublist
                    vDropdown.vDropdown(
                      v-if="dropd[item.cSlug].open"
                      v-for="subitem in item.children"
                      :key="`${item.cSlug}-${subitem.cSlug}`"
                      :class="{ 'catalogSubdropOpen': dropd[item.cSlug].open}"
                      @mouseenter.native="toggleSublistItem(item.cSlug, subitem.cSlug)"
                      @mouseleave.native="toggleSublistItem(item.cSlug, subitem.cSlug)"
                    )
                      .catalog-subdrop
                        nuxt-link.catalog-subdrop-item(:to="subitem.url" @click.native="closeAll(); $route.meta.cSlug" )
                          .catalog-subdrop-item__pic
                            img(:src="require('@/assets/images/items/arrow-circle1.svg')" )
                          span {{ subitem.categoryName}}
                          img.dropdown-menu-item-arrow--secondList(v-if="subitem.children.length > 0" :src="require('../assets/images/icons/arrow-right-menu.svg')")
                        .overflow_h(v-if="subitem.children.length > 0")
                          .catalog-dropdown-sublist
                            vDropdown.vDropdown(
                              v-if="dropd[item.cSlug][subitem.cSlug].open"
                              v-for="grandItem in subitem.children"
                              :key="`${item.cSlug}-${subitem.cSlug}-${grandItem.cSlug}`"
                              :class="{ 'catalogSubdropOpen': dropd[item.cSlug][subitem.cSlug].open}"
                            )
                              .catalog-subdrop
                                nuxt-link.catalog-subdrop-item(:to="grandItem.url" @click.native="closeAll();")
                                  .catalog-subdrop-item__pic
                                    img(:src="require('@/assets/images/items/arrow-circle1.svg')" )
                                  span {{grandItem.categoryName}}
      .v-subheader__catalog#catalog(@click="toggle('catalog')")
        vBurger(:class="{'isActive': dropDowns.catalog.open}")
        span.v-subheader__catalog-desc Каталог товаров


      .v-subheader__search
        Search
      .v-subheader__personal--container(v-if="disabled")
        .v-subheader-account__wrap
          template(v-if="user")
            .v-subheader__account.v-subheader-account.auth(@click="loginDropdown = !loginDropdown")
              .v-subheader__account-icon
                img( src="~@/assets/images/icons/personal-account-bold1.svg")
                img( src="~@/assets/images/icons/personal-account-bold.svg")
              span.v-subheader__account-title Личный кабинет
              Transition(name="dropdown")
                ul.v-subheader-account__dropdown.v-subheader-account-dropdown(v-if="loginDropdown")
                  li.v-subheader-account-dropdown__item
                    nuxt-link.v-subheader-account-dropdown__link(to="/account")
                      span.v-subheader-account-dropdown__text Перейти в личный кабинет
                  li.v-subheader-account-dropdown__item
                    a.v-subheader-account-dropdown__link(@click.prevent="logoutHandler")
                      span.v-subheader-account-dropdown__text Выйти
          template(v-else)
            .v-subheader__account(@click="showAccountLogin")
              .v-subheader__account-icon
                img( src="~@/assets/images/icons/personal-account-bold1.svg")
                img( src="~@/assets/images/icons/personal-account-bold.svg")
              span.v-subheader__account-title Личный кабинет
        .v-subheader__favorites
          nuxt-link.v-subheader__favorites(to="/favorites")
            .v-subheader__favorites-icon
              svg(:class="{'isActive': GET_FAVORITES.length > 0}" stroke="#bab4b4" fill="none" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg")
                path(d="M1.28518 9.81601C1.09463 9.10913 1 8.43319 1 7.78946C1 4.5137 2.53163 2.29573 4.44393 1.44877C6.32385 0.616139 8.88297 0.974507 11.2662 3.50825L11.9931 4.28116L12.7216 3.50968C15.1246 0.965007 17.6927 0.569733 19.566 1.37987C21.4633 2.20032 23 4.40601 23 7.78946C23 8.43294 22.9054 9.1075 22.714 9.81513L22.7138 9.81556C22.0318 12.3412 20.1839 15.1048 17.4002 17.9913L17.4001 17.9914C16.1625 19.275 14.8333 20.4836 13.5019 21.5798C13.0343 21.9637 12.6034 22.3052 12.2175 22.5994L12.2172 22.5996C12.1361 22.6615 12.0633 22.7164 11.9995 22.7643C11.9356 22.7164 11.8629 22.6615 11.7819 22.5997L11.7801 22.5983C11.395 22.3059 10.9646 21.9649 10.4975 21.5802C9.16586 20.4827 7.83751 19.2751 6.59871 17.9913C3.81411 15.1038 1.96732 12.3416 1.28518 9.81601Z" stroke="#dc0606" stroke-width="2")
            span.v-subheader__favorites-title Избранное
              template(v-if="GET_FAVORITES.length > 0")
                |  (
                span.v-subheader__favorites-title-sub  {{GET_FAVORITES.length}}
                |  )
        nuxt-link.v-subheader__cart.main(to="/cart")
          .v-subheader__cart-icon
            img.v-subheader__cart-icon(src="~@/assets/images/icons/cart_4.svg")
          span.v-subheader__cart-title(v-if="cart.length > 0")
            | Корзина (
            span.v-subheader__cart-title-sub  {{ cart.length }}
            |  )
          span.v-subheader__cart-title(v-else) Корзина пуста
      .v-subheader__search.mob
        Search(@disabledLogo="notShowTopPage" @abledLogo="showTopPage")
        nuxt-link.v-subheader__cart(to="/cart")
          img.v-subheader__cart-icon(src="~@/assets/images/icons/shop-cart.svg")
          span.v-subheader__cart-title(v-if="cart.length > 0")
            span.v-subheader__cart-title-sub(v-if="cart.length <10") 0{{ cart.length }}
            span.v-subheader__cart-title-sub(v-else) {{ cart.length }}




</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { slugify } from 'transliteration'
import vBurger from '@/components/burger/burger'
import Search from '@/components/search/search'
import vFormPopup from '@/components/popup/v-form-popup.vue'
import vPopupConsumptionThank from '@/components/popup/v-consumption-thanks-popup.vue'
import vThankPopup from '@/components/popup/v-thank-popup'
import vPopupRecoveryMessage from '@/components/popup/v-recovery-message-popup.vue'
import vPopupRecoverMessageError from '@/components/popup/v-recovery-error-message-popup.vue'
import vPopupLogin from '@/components/popup/v-popup-login.vue'
import vDropdown from '@/components/dropdown.vue'
import payment from '@/components/mixins/paymentRequest'
import imgPathMixin from '@/components/mixins/imgPath'

import { required } from 'vuelidate/lib/validators'
import { maska } from 'maska'
export default {
  /**
   * TODO:
   *    # сформировать имена dropdown-меню на основе menuRoutes.
   *      возможное решение через одинаковые свойства computed и watch (https://qna.habr.com/q/563876)
   *      возможно ещё через глубокую копию как в каталоге
   *    # отредактировать динамическую маршрутизацию – нужно для ссылок из выпадающего списка
   *    # отредактировать маршрутизацию для прямого перехода по ссылке, не затрагивая главную страницу
   *    # возможно сгруппировать категории внутри списка товаров, начиная каждый с заголовка (categoryName)
   *    # написать API для получения товаров выбранной категории
   */
  name: 'Header',
  components: {
    vFormPopup,
    vPopupLogin,
    vDropdown,
    vBurger,
    Search,
    vPopupConsumptionThank,
    vPopupRecoveryMessage,
    vThankPopup,
    vPopupRecoverMessageError
  },

  data: () => ({
      popup: true,
      disabled: true,
      arrowScroll: false,
      auth: false,
      active: false,
      mobile:false,
      isPaymentRequestVisible: false,
      recoveryMassagePopup: false,
      isFeedbackVisible: false,
      loginDropdown: false,
      isPage: 'page',
      opened: false,
      dropDowns: {
        customers: { open: false },
        setCity: {
          open: false
        },
        catalog: {
          open: false,
          categories: {}
        }
      },

      callbackForm: {
        name: '',
        phone: '',
        agree: true
      },
      isthankPopupVisible: false,
      isConsumsionThanks: false,
      isRecoverError: false,

      // catImg: {
      //   'СТРОИТЕЛЬНЫЕ ИНСТРУМЕНТЫ': require('../assets/images/icons/dropMenuIcons/materialIcon.svg'),
      //   ТЕПЛОЗВУКОИЗОЛЯЦИЯ: require('../assets/images/icons/dropMenuIcons/isolation1.svg'),
      //   'ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ': require('../assets/images/icons/dropMenuIcons/trim.svg'),
      //   'ДРЕВЕСНО-ПЛИТНЫЕ МАТЕРИАЛЫ': require('../assets/images/icons/dropMenuIcons/drevesno - plitnie.svg'),
      //   'ГИПСОКАРТОННЫЕ МАТЕРИАЛЫ': require('../assets/images/icons/dropMenuIcons/metalloprokat.svg'),
      //   'ОБЩЕСТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ': require('../assets/images/icons/dropMenuIcons/obshestroitelnye1.svg'),
      //   'Все для кровли': require('../assets/images/icons/dropMenuIcons/roof.svg'),
      //   КРЕПЕЖ: require('../assets/images/icons/dropMenuIcons/crepej1.svg'),
      //   'МЕТАЛЛОПРОКАТ': require('../assets/images/icons/dropMenuIcons/metall1svg.svg')
      // }
  }),

  validations: {
    callbackForm: {
      name: {required},
      phone: {required},
      agree: {
        checked: v => v
      }
    }
  },

  directives: { maska },

  computed: {
    ...mapGetters((['GET_PAGE'])),
    ...mapGetters({
      mainContent: 'GET_MAIN_CONTENT',
      currentCity: 'GET_CURRENT_CITY',
      isPageNow: 'GET_PAGE',
      footerPhones: 'GET_CURRENT_CITY'
    }),
    ...mapGetters({
      GET_FAVORITES: "favorites/GET_FAVORITES",
    }),
    ...mapGetters({
      cart: "cart/GET_PRODUCTS_FROM_CART",
      user: "user/GET_USER",
      authPopup: 'auth/GET_AUTH_POPUP'
    }),
    ...mapState(['menuRoutes', 'menuDropdowns']),

    name: {
      get() {
        return this.callbackForm.name
      },

      set(name) {
        name = name.replace(/\d/g, '')
        this.$refs.name.value = name
        this.callbackForm.name = name
      }
    },

    phone: {
      get() {
        return this.callbackForm.phone
      },

      set(phone) {
        this.$refs.phone.value = phone
        this.callbackForm.phone = phone
      }
    },

    agree: {
      get() {
        return this.callbackForm.agree
      },
      set(agree) {
        this.callbackForm.agree = agree
      }
    },

    dropd() {
      return this.menuDropdowns
    }

  },
  watch: {
    dropd() {}
  },
  created() {
    this.$on("close:calculation", this.consumptionPopupCallback.bind(this))
  },
  mounted() {

    // let some = document.querySelector('file-chosen')
    // some.addEventListener('click', )
    // this.$root.$on('paymentPopup', () => {
    //   this.isPaymentRequestVisible = true
    // }),

    (window.document.onscroll = () => {
      // this.popup = true
      // if(this.isPageNow==="index" && this.popup){
      //   this.$vToastify.success("Бренд успешно обновлен!", "Добро пожаловать!");
      // }
      this.dropDowns.setCity.open = false
      var scroll =  document.documentElement.scrollHeight
      var screen = document.documentElement.clientHeight
      var diff = scroll - screen
      let header = document.getElementById('header')
      if(window.innerWidth > 481){
        if(header.offsetTop > 120.16){
          if (window.scrollY > header.offsetHeight ) this.active = true
          else this.active = false
        }
        else{
          if (window.scrollY > 120.16 ) this.active = true
          else this.active = false
        }
      }
      else{
        if ( diff > 300 && window.scrollY > 120.16 ) this.active = true
        else this.active = false
        }

      if(window.scrollY > 700) this.arrowScroll = true
      else this.arrowScroll = false

    })
  },

  methods: {
    ...mapActions({
      logout: "auth/userLogout",
      sendcallBack: 'callback/sendHeaderCallBack',
      sendPayment: 'callback/sendHeaderPayment'
    }),
    ...mapMutations({
      setAuthPopupVisible: "auth/SET_AUTH_POPUP"
    }),
    // sendYandexMetrikaEvent(eventName) {
    //   this.$yandexMetrika.reachGoal(eventName);
    // },
    notShowTopPage (){
      this.disabled=false

    },
    showTopPage(){
      this.disabled=true
    },

    getSubArray(subcat) {
      if(subcat.brands) return subcat.brands
      else if(subcat.childrenTR) return subcat.childrenTR
    },
    hide(){
      if(this.mobile){
        this.mobile = false
      }
      if(this.dropDowns.catalog.open){
        this.dropDowns.catalog.open = false
      }
      if(this.dropDowns.setCity.open){
        this.dropDowns.setCity.open = false
      }
    },
    scrollToTop(){
      window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    },

    hideBurger(){
      if(this.mobile){
      this.mobile = false
      }
      else{
        this.mobile = true
      }
    },

    showPaymentRequest() {
      this.isPaymentRequestVisible = true
    },
    showFeedback() {
      this.isFeedbackVisible = true
      // this.$yandexMetrika.reachGoal('order a call')
    }, 
    showAccountLogin() {
      // this.isAccountLoginVisible = true
      this.setAuthPopupVisible(true)
    },
    closePopup() {
      this.isPaymentRequestVisible = false
      this.isFeedbackVisible = false
      this.isthankPopupVisible = false
      this.isConsumsionThanks = false
      this.recoveryMassagePopup = false
      this.isRecoverError = false
      this.isAuthError = false
      // this.isAccountLoginVisible = false
      this.setAuthPopupVisible(false)
    },
    consumptionPopupCallback() {
      this.isPaymentRequestVisible = false
      this.openConsumptionPopup()
    },
    closePopupCallBack() {
      this.isPaymentRequestVisible = false
      this.isFeedbackVisible = false
      this.openThankPopup()
    },
    openThankPopup() {
      this.isthankPopupVisible = true
    },
    openConsumptionPopup() {
      this.isConsumsionThanks = true
    },
    openRecoveryMassagePopup() {
      this.recoveryMassagePopup = true
    },
    openErrorRecoverPopup() {
      this.isRecoverError = true
    },
    toggle(dropDownName, subDropdownName) {
      if (dropDownName === 'catalog') {
        for (const key in this.dropDowns.catalog.categories) {
          this.dropDowns.catalog.categories[key].open = false
          for (const keyItem in this.dropDowns.catalog.categories[key]) {
            if (typeof keyItem == 'object') {
              this.dropDowns.catalog.categories[key][keyItem].open = false
            }
          }
        }
      }

      for (let key in this.dropDowns) {
        if (key === dropDownName) {
          this.dropDowns[key].open = !this.dropDowns[key].open
        } else {
          this.dropDowns[key].open = false
        }
      }
    },

    toggleSublistItem(cat, subcat) {
      this.$store.commit('SET_CURRENT_CATEGORY_DROPDOWN', { cat, subcat })
    },
    closeAll() {
      // закрываем все поп-апы
      this.closePopup()
      // закрываем все выпадающие меню
      for (const item in this.dropDowns) {
        this.dropDowns[item].open = false
      }
      // закрываем все выпадающие подменю
      for (const item in this.dropDowns.catalog.categories) {
        this.dropDowns.catalog.categories[item].open = false
      }
    },
    sl(str) {
      return slugify(str)
    },
    checkDropdown(key) {
      if (this.dropDowns.catalog.categories[key] === undefined) {
        return false
      } else if (this.dropDowns.catalog.categories[key].open === true) {
        return true
      } else {
        return false
      }
    },
    logoutHandler() {
      this.$router.push('/')
      setTimeout(() => {
        this.logout()
      }, 200)
    },

    callbackhandler() {
      const callbackData = {
        name: this.callbackForm.name,
        phone: this.callbackForm.phone,
        agree: this.callbackForm.agree
      }
      this.sendcallBack(callbackData)

      this.callbackForm.name = ''
      this.callbackForm.phone = ''
      this.callbackForm.agree = false

      this.closePopupCallBack()
    }
  },
  mixins: [imgPathMixin, payment]
}
</script>

<style lang="sass">
@import "./mixins.sass"

#v-header
  position: relative
  z-index: 13
  width: 100%

#PaymentRequest, #Customers
  cursor: pointer
  transition: color .1s ease
  // img
  //   margin-top: 3px
  &:hover
    color: $red
#Feedback
  cursor: pointer
  transition: all .15s ease
  &:hover
    box-shadow: 0px 4px 8px rgba($text, .2)
.setCity, #catalog
  cursor: pointer
#catalog
  @include phones
    display: none

.popupInputGroup, .popupInputGroup__header-payment-request
  margin-bottom: 20px
  display: flex
  justify-content: space-between
  align-items: center
  & > input, textarea
    border: none
    padding: 5px 10px
    background-color: $gray-1
    font-size: 14px
    font-weight: bold
    color: $text
    width: 70%
    &:active, &:focus
      outline-color: $red
  textarea
    height: 75px
    resize: none
  & > label
    font-size: 16px
    font-weight: bold
    letter-spacing: .07em

  &_CheckWrapper
    display: flex
    align-items: center
    label
      margin-left: 3px
      font-size: 12px
      font-weight: 300
      letter-spacing: .07em
      display: inline-block
      position: relative
      padding-left: 28px
      line-height: 20px
      cursor: pointer
      font-weight: bold
      @media screen and( max-width: 480px)
        padding-left: 26px
        line-height: 14px
        margin-left: 2px
    label:before
      content: ""
      position: absolute
      left: -3px
      top: 0px
      width: 20px
      height: 20px
      border: 2px solid #BAB4B4
      background-color: #ffffff
    label:after
      content: ""
      position: absolute
      -webkit-transition: all 0.2s ease
      -moz-transition: all 0.2s ease
      -o-transition: all 0.2s ease
      transition: all 0.2s ease
    label:after
      left: 0
      top: 4px
      width: 12px
      height: 7px
      border-radius: 1px
      border-left: 4px solid #FF0202
      border-bottom: 4px solid #FF0202
      -webkit-transform: rotate(-45deg)
      -moz-transform: rotate(-45deg)
      -o-transform: rotate(-45deg)
      -ms-transform: rotate(-45deg)
      transform: rotate(-45deg)

    input
      position: absolute
      left: -9999px
    input[type="checkbox"]:not(:checked) + label:after,
      opacity: 0

    input[type="checkbox"]:checked + label:after,
      opacity: 1
      left: 1px
      top: 4px
      width: 12px
      height: 7px
      border-radius: 1px
      border-left: 4px solid #FF0202
      border-bottom: 4px solid #FF0202
      -webkit-transform: rotate(-45deg)
      -moz-transform: rotate(-45deg)
      -o-transform: rotate(-45deg)
      -ms-transform: rotate(-45deg)
      transform: rotate(-45deg)
    .check_accent
      font-weight: 700
  .redAsterisk:after
    content: '*'
    font-weight: bold
    color: $red
  .v-header__clip-container
    left: -18px
.popupInputGroup
  &__header-payment-request
    & > input, textarea
      width: 55%
    & > label
      margin-left: 0
.v-header
  display: flex
  justify-content: space-between
  align-items: center
  height: 96px
  padding: 0 30px
  background-color: white
  @media screen and (max-width: 1350px)
    justify-content: space-between
  @include phones
    display: none

  &__mainPage
    display: flex
    align-items: center
    text-decoration: none
    @include phones
      margin-bottom: 10px
  &__logo
    margin: 6px 4px 6px 30px
  &__logo-desc
    max-width: 83px
    font-weight: 700
    font-size: 10px
    text-transform: uppercase
    color: $text
  &__info
    &-list
      margin-left: 55px
      padding-left: 0
      width: 250px
      @media screen and (max-width: 1350px)
        margin-left: unset
    &-list-item
      list-style: none
      margin-bottom: 5px
      font-weight: 700
      font-size: 16px
      line-height: 19px
      white-space: nowrap
      text-decoration: none
      a
        text-decoration: none
      &-title
        width: 280px
      &-icon
        margin-left: 4px
  &__info.mobile
    display: none
    @include phones
      display: flex
  &__info-list.mobile
    @include phones
      padding-left: 15px
  &__info-item.mobile
    @include phones
      text-align: center
      width: 110px
      font-size: calc(8px + (12 - 8) * ((100vw - 320px) / (480 - 320)))

  &__nav
    display: flex
    align-items: center
    margin: 0 100px
    @media screen and (max-width: 2175px)
       margin: 0 58px
    @media screen and (max-width: 1900px)
      margin: 0 80px
    @include laptop
      margin: 0 30px
    @media screen and (max-width: 1350px)
      display: none
    &-link
      display: flex
      align-items: center
      text-decoration: none
      color: $text
      transition: color .1s ease

      &:hover
        color: $red

    &-list
      display: flex
      align-items: center
      flex-wrap: wrap
      padding-left: 0
    &-list-item
      list-style: none
      display: flex
      align-items: center


      &-icon
        margin-top: unset !important
      &:not(:last-child)
        margin-right: 70px
        @media screen and(max-width: 2100px)
          margin-right: 50px
        @include largelaptop
          margin-right: 30px
      &-title
        display: inline-block
        margin-left: 8px
        font-weight: bold
        font-size: 18px
        @media screen and(max-width: 2100px)
          font-size: 16px
        @include largelaptop
          font-size: 16px
  &__feedback
    background-color: $red
    padding: 10px 42px
    font-size: 16px
    white-space: nowrap
    @include tablets
      width: 150px
      padding: 10px 20px
    @media screen and (max-width: 690px)
      display: none
    &-desc
      font-weight: bold
      font-size: calc(12px + (16 - 12) * ((100vw - 320px) / (1920 - 320)))
      color: white
      text-transform: uppercase
  &__clip-container
    position: absolute
    img
      position: relative
      left: 420px
      top: 2px
.v-subheader
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
  padding: 25px 30px 25px 95px
  background-color: $gray-1
  border-bottom: 2px solid #EFEFEF
  @include phones
    flex-wrap: wrap

  @include mediumlaptop
    justify-content: space-between
    padding: 25px 30px 25px 61px
  @include tablets
    padding: 10px
  @include phones
    justify-content: space-between
    align-items: center
    padding: 3%
  &__logo
    display: none
    @include phones
      display: block
      margin: 0 35%
  &__mobile-catalog

  &__catalog
    display: flex
    align-items: center
    position: relative
    margin-right: auto
    z-index: 120
    @include mediumlaptop
      margin-left: 10px
    @include tablets
      display: none
    &-content
      position: relative

    &-icon
      margin-right: 8px
      padding: 10px 7.5px
    &-desc
      margin-left: 8px
      font-weight: 700
      font-size: 16px
      color: $text
      @include laptop
        width: min-content

  &__search
    width: 40%
    display: flex
    align-items: center
    position: relative
    margin-right: auto
    @include mediumlaptop
      margin-left: 10px
    @include tablets
      width: 60%
    @include phones
      position: static
      display: flex
      margin-right: 20px
      width: 30px
      display: none
      margin: 0
    &-input
      border: 2px solid white
      padding: 13px 27px
      width: 100%
      font-weight: bold
      outline-color: $red
      font-size: calc(10px + (16 - 10) * ((100vw - 320px) / (1920 - 320)))
      @media screen and (max-width: 900px)
        padding: 13px 27px 13px 5px
      @include phones
        padding: 13px 5px 13px 30px

    &-input.show
      @include phones
        display: flex
        top: 97px
        left: 0
        right: 0
        z-index: 60
        // max-width: 372px
        box-shadow: 0 1px 10px lightgrey
        margin-right: 5px
        font-size: 16px
        align-items: center
        justify-content: center

    &-input.show::placeholder
      @include phones
        font-size: 12px
        line-height: 18px
        text-align: center
        font-weight: bold
    &-button
      display: flex
      justify-content: center
      align-items: center
      width: 30px
      height: 37px
      position: absolute
      right: 15px
      border: none
      cursor: pointer
      transition: all .15s ease
      background-color: transparent
      outline: none
      top: 5px
      @media screen and (max-width: 900px)
        right: 0
      @include phones
        background: transparent
        right: unset
        top: unset
        z-index: 80

  &__personal--container
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    @media screen and (max-width: 1620px)
      jusify-content: center
    @include phones
      align-items: baseline
  &__account, &__favorites
    display: flex
    justify-content: center
    flew-direction: row
    align-items: center

    &-title
      display: inline-block
      margin-left: 10px
      font-weight: 700
      font-size: 16px
      @include mediumlaptop
        display: none
  &__account
    &-title
      margin-left: 20px
  &__favorites
    @include phones
      display: none
  &__account
    cursor: pointer
    display: flex
    @include phones
      align-items: flex-end
      position: relative
    &::before
      position: relative
      content: ''
      background: grey
      width: 10px
      height: 10px
      border-radius: 100%
      top: 0px
      right: -43px
      @include phones
        position: absolute
        content: ''
        background: grey
        width: 5px
        height: 5px
        border-radius: 100%
        top: 0
        right: -3px
    &.auth::before
      background: #27AE60
    @include phones
      display: block
      margin-right: 2px
  &__favorites a
    margin: 0 100px
    width: 163px
    text-decoration: none
    color: $text
    @include mediumlaptop
      width: unset
      margin: 0 10px
    @media screen and (max-width: 1620px)
      margin: 0 50px
    @media screen and (max-width: 1620px)
      margin: 0 15px 0 25px
    @include phones
      margin: 0
    .isActive
      stroke: $red
  &__favorites
    &-title
      &-sub
        color: $red !important
    &-icon
      display: flex
      align-items: center
  &__cart
    $px: 15px
    display: flex
    align-items: center
    text-decoration: none
    padding: 10px 37px
    background: #fff
    min-width: 220px
    @media screen and (max-width: 1830px)
      min-width: 210px
    @include mediumlaptop
      justify-content: center
      margin-left: unset
      padding: 13px
      min-width: unset
      background: transparent
    @include phones
      background-color: #f6f6f6
      padding: 0
      position: relative
      flex-direction: row-reverse
    &-title
      margin-left: 10px
      font-weight: bold
      font-size: 16px
      line-height: 16px
      color: $text
      @include mediumlaptop
        display: none
      @include phones
        display: block
        font-size: 12px
        margin-right: 8px
        position: absolute
        top: 0
        left: 14px
      &-sub
        color: $red

.v-subheader-account
  cursor: pointer
  position: relative
  &__wrap
    position: relative

  &__dropdown
    margin-left: 0
    position: absolute
    top: 35px
    width: 250px
    overflow: hidden
    background-color: #fff
    box-shadow: 0 0 2px 1px $gray-3
    @include phones
      right: 0
      z-index: 110
      width: auto
      width: 200px
      box-shadow: 0 0 10px black
.v-subheader-account-dropdown
  padding: 0
  margin: 0
  &__list
    margin: 0
    padding: 0
    width: 100%

  &__item
    width: 100%
    list-style-type: none
  &__link
    padding: 10px 15px
    color: $text
    text-decoration: none
    display: block
    width: 100%

  &__text
    display: block
    width: 100%
    @include phones
      font-size: 14px
// Dropdowns
.customers-dropdown-menu, .setCity-dropdown-menu, .catalog-dropdown-menu
  display: none
  position: absolute
  list-style: none
  padding-left: 0px
  top: 64px
  z-index: 5000
  background-color: white
  padding: 5px
  box-shadow: 0px 2px 8px rgba($text, .1)
.catalog-dropdown-menu
  top: 50px
  left: -50px
  padding: 0
  padding-bottom: 10px

  &::-webkit-scrollbar
    width: 6px
  &::-webkit-scrollbar-thumb
    background-color: $gray-5
    border-radius: 10px
  .dropdown-menu-item-arrow--secondList
    position: absolute
    right: 10px
.setCity-dropdown-menu
  top: 86px
  height: 500px
  overflow: auto
  &::-webkit-scrollbar 
    -webkit-appearance: none
  

  &::-webkit-scrollbar:vertical 
    width: 10px
  

  &::-webkit-scrollbar:horizontal 
    height: 12px
  

  &::-webkit-scrollbar-thumb 
    background-color: rgba(0, 0, 0, .5)
    border-radius: 10px
    border: 2px solid #ffffff
  

  &::-webkit-scrollbar-track 
    border-radius: 10px
    background-color: #ffffff
  
.customersDropDownOpen .customers-dropdown-menu
  display: block
  & > a
    text-decoration: none
  .customers-dropdown-menu__item
    display: flex
    align-items: center
    justify-content: center
    width: 143px
    height: 20px
    margin-bottom: 5px
    border: 2px solid #dadada
    background-color: $gray-1
    color: $text
    font-size: 14px
    font-weight: bold
    letter-spacing: .07em
.setCityDialog .setCity-dropdown-menu
  display: flex
  flex-direction: column
  .setCity-dropdown-menu-item
    display: inline-block
    padding: 15px 8px
    min-width: 210px
    text-align: center
    letter-spacing: .07em
    font-size: 14px
    font-weight: bold
    line-height: 16px
    background-color: $gray-1
    border: 2px solid #bab4b4
    transition: background-color .05s ease
    cursor: pointer
    &:hover
      background-color: darken($gray-1, 4%)
    &:not(:last-child)
      margin-bottom: 5px
.catalogDropDownOpen .catalog-dropdown-menu
  display: flex
  flex-direction: column
  width: 413px

  .catalog-dropdown-menu-item
    padding: 0 7px
    cursor: pointer
    font-size: calc(12px + (14 - 12) * ((100vw - 320px) / (1920 - 320)))
    &:first-child
      padding-top: 7px
    &-link
      display: block
      text-decoration: none
      color: $text
    &-inner
      padding: 7px
      width: 100%
      height: 46px
      display: flex
      align-items: center
      justify-content: space-between
      background-color: $gray-1
      &--img
        width: 30px
        display: flex
        justify-content: center
        align-items: center
        img
          width: 100%
    &:hover
      .catalog-dropdown-menu-item-inner
        background-color: darken($gray-1, 4%)
    &:not(:last-child)
      margin-bottom: 5px
    .dropdown-menu-item
      &-image
        margin-right: 14px
      &-title
        width: 100%
        margin-right: auto
        margin-left: 1rem
        font-size: 16px
        font-weight: bold
        line-height: 16px
        letter-spacing: .07em
  .selectedCategory
    background-color: darken($gray-1, 10%)
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0

.fixed
  position: fixed
  z-index: 100
  top: 0
  transition: 100
  box-shadow: 0 0 20px grey


.dropdown__list
  padding-inline-start: 0




.mobile-dropdown
  position: absolute
  z-index: 100
  top: 49px
  border: 10px solid #f6f6f6
  background-color: white
  left: 10px
.dropdown-wrap
  padding: 20px
  min-width: 275px
.dropdown__list
  list-style-type: none
  padding-left: 0
  margin: 0
  margin-bottom: 20px



.v-subheader__phones
  font-size: 14px
  font-weight: bold
  margin-bottom: 20px

p
  margin: 0
.dropdown__footer
  text-align: center
  font-size: 14px
  &-socials
    display: flex
    justify-content: center
    &__container
      width: 80%
      display: flex
      justify-content: space-between
      a
        display: block
        width: 30px
        img
          width: 100%
          height: 100%
  &__text
    margin-bottom: 20px
.copyright__bold
  font-weight: bold
a.copyright__bold
  text-decoration: none
  color: #000
  font-weight: bold
  display: block

.v-subheader__info-list-item
  margin-bottom: 20px
  text-decoration: none
.v-subheader__nav-link
  text-decoration: none
  display: flex
  align-items: center
.v-subheader__info-list-item
  font-weight: bold
  font-size: 16px
.v-subheader-icon
  height: 25px
  width: 25px
  stroke-width: 10 !important
.v-subheader-list-title
  color: black
  text-decoration: none
  margin-left: 4%
.v-subheader__mobile-catalog
  display: none
  @include phones
    display: block
.setCity-dropdown-menu.mobile
  top: 50px
  height: 223px
  overflow-y: scroll
.v-subheader__search.mobile
  display: none
  width: 100%
  @include phones
    display: flex
    justify-content: space-between

.v-subheader__arrow
  display: none
  @include phones
    display: block



.v-subheader__cart.main
  width: 232px
  @media screen and(max-width: 1366px)
    width: auto
  @include phones
    display: none

.v-subheader__favorites-icon svg
  stroke: $red

.v-overlay_mobile
  @include phones
    position: absolute
    background-color: transparent
    width: 100vh
    height: 100vh
    z-index: 100
    position: fixed
    display: none

.overlay_mobile
  display: block

.v-overlay
  width: 250vh
  height: 200vh
  z-index: 100
  position: fixed
  left: 0
  display: none
  background-color: transparent

.overlay
  display: block


.v-after-subheader
  width: 100%
  height: 120px


.v-subheader__cart-title-sub
  font-weight: bold
  font-size: 16px
  @include phones
    font-weight: bold
    font-size: 20px
    top: -6px
    right: 0
    position: absolute
    transform: rotate(25deg)
  // @media screen and(max-width: 430px)

.addMarginForFixedHeader
  margin-top: 96px
  @include phones
    margin-top: 135px

// .top
//   top: 98px !important
//   @include phones
//     top: 0


a.phone
  color: $text
  
  @include phones
    margin-bottom: 10px
    line-height: 28px
    letter-spacing: .07em
    color: $red
    margin: 10px 10px 5px
    font-size: 18px
    display: block
a.phone.last
  @include phones
    margin: 5px 10px 10px

.overflow_h
  position: absolute
  top: 0px
  left: 100%
  height: 100%
  background-color: trasparent

  .catalog-dropdown-sublist
    overflow: auto
    height: auto
    max-height: 100%


.choosen
  width: 55%
  display: flex
  justify-content: space-between

  label#file-btn
    background-color: grey
    color: white
    padding: 1px 6px
    font-size: 14px
    cursor: pointer
  span#file-chosen
    font-size: 14px
    font-weight: bold
    color: $red
    height: 16px
    overflow: hidden
    max-width: 120px

#Payment_File
  overflow: hidden

.arrow_for_navigation
  position: fixed
  width: 50px
  bottom: 3vh
  right: 3vw
  cursor: pointer
  z-index: 100
  img
    width: 100%



.v-subheader__search.mob
  display: none
  @include phones
    display: flex
    width: 100%

.none
  display: none


.dropdown
  &-enter-active,
  &-leave-active
    transition: .5s max-height, .5s box-shadow

  &-enter,
  &-leave-to
    max-height: 0
    box-shadow: 0 0 0 0 transparent

  &-enter-to,
  &-leave
    max-height: 300px
    box-shadow: 0 0 2px 1px $gray-3



.v-header__nav-list-item-icon
  width: 30px
  height: 30px
  @media screen and(max-width: 1885px)
    margin-bottom: 10px
  img
    width: 100%

.v-subheader__cart-icon, .v-subheader__account-icon
  width: 30px
  height: 30px
  display: block
  @include phones
    width: 21px
    height: 21px
  img
    width: 100%

.v-subheader__account-icon
  img:nth-child(2)
    display: none
    @include phones
      display: block
.v-subheader__account-icon
  img:first-child
    @include phones
      display: none

.catalog-subdrop-item span
  margin-top: 1px
  max-width: 350px



</style>
