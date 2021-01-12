<template lang="pug">
#v-itemCard
  //- vPopup(v-if="false")
  .v-popup-layout(v-if='attention', @click='attention = !attention')
  .v-popup-layout-transparent(v-if='changePop != null', @click='changePop = null')
  //- .v-popup-attention(v-if="attention")
  //-   img.v-popup-login__closeIcon.attention(
  //-         :src="require('@/assets/images/icons/close_mark.svg')"
  //-         title="Закрыть окно"
  //-         alt="Закрыть"
  //-         @click="attention = !attention")
  //-   p Внимание! Цвет, характеристики и комплектация товаров, указанные на сайте, могут отличаться от реальных
  vBreadcrumbs(:breadcrumbs='breadcrumbs')
  .v-itemcard__container
    h1.v-itemcard__heading {{ item.title || "Заголовок" }}

  .v-itemcard__subheading
    h3.v-itemcard__article Артикул: {{ item.article }}
    .v-itemcard__consumption(@click='consumption()')
      img.consumption__icon(
        :src='require("@/assets/images/icons/calculator.svg")'
      )
      h4.consumption__title Рассчитать расход материалов

  .v-itemcard__content
    .v-itemcard__content__info
      h1.v-itemcard__content__heading {{ item.title || "Заголовок" }}
      h3.v-itemcard__content__article Артикул: {{ item.article }}
    .v-itemcard__images
      lingallery(
        :iid.sync='currentId',
        :width='600',
        :height='400',
        :accentColor='"#ffe600"',
        :items='images'
      )
      .v-item__favorite-mark(@click='clickFavoritesHandler')
        svg(
          :class='{ isActive: isActive }',
          width='24',
          height='24',
          viewBox='0 0 24 24',
          fill='none',
          xmlns='http://www.w3.org/2000/svg'
        )
          path(
            d='M1.28518 9.81601C1.09463 9.10913 1 8.43319 1 7.78946C1 4.5137 2.53163 2.29573 4.44393 1.44877C6.32385 0.616139 8.88297 0.974507 11.2662 3.50825L11.9931 4.28116L12.7216 3.50968C15.1246 0.965007 17.6927 0.569733 19.566 1.37987C21.4633 2.20032 23 4.40601 23 7.78946C23 8.43294 22.9054 9.1075 22.714 9.81513L22.7138 9.81556C22.0318 12.3412 20.1839 15.1048 17.4002 17.9913L17.4001 17.9914C16.1625 19.275 14.8333 20.4836 13.5019 21.5798C13.0343 21.9637 12.6034 22.3052 12.2175 22.5994L12.2172 22.5996C12.1361 22.6615 12.0633 22.7164 11.9995 22.7643C11.9356 22.7164 11.8629 22.6615 11.7819 22.5997L11.7801 22.5983C11.395 22.3059 10.9646 21.9649 10.4975 21.5802C9.16586 20.4827 7.83751 19.2751 6.59871 17.9913C3.81411 15.1038 1.96732 12.3416 1.28518 9.81601Z',
            stroke='#dc0606',
            stroke-width='2'
          )
      p.v-itemcard__disclamer
        strong Внимание!
        | &nbsp;Цвет, характеристики и&nbsp;комплектация товаров, указанные на&nbsp;сайте, могут отличаться от&nbsp;реальных

    .v-itemcard__info
      .v-itemcard__prices
        .v-itemcard__prices-title Цена&nbsp;{{ item.unit }}
        .v-itemcard__prices-values
          .v-itemcard__prices-clubCost клубная:&nbsp;
            span.clubCost-value(v-if="item.club_cost") {{ item.club_cost }} &#8381;
          .v-itemcard__prices-cost(:class="{'strike': item.discount_price}") розница:&nbsp;
            span.cost-value {{ item.cost }} &#8381;
          template(v-if="item.discount_price")
            .v-itemcard__prices-discount скидка:&nbsp;
              span.discount-value {{item.discount_price }} &#x20bd;
      ul.v-itemcard__prices__circumstances__list
        li.v-itemcard__prices__circumstances__item#delivery
          .v-itemcard__prices__circumstances__item__deliveryPop(
            v-if='changePop === "delivery"'
          )

            img.v-popup-login__closeIcon.attention(
              :src="require('@/assets/images/icons/close_mark.svg')"
              title="Закрыть окно"
              alt="Закрыть"
              @click='changePop=null')
            .v-Popup__header Условия доставки
            ul.v-deliveryPop__hours-list
              li.v-deliveryPop__hours-item
                .v-deliveryPop__hour 5
                .v-deliveryPop__hour__definition часов - среднее время доставки по Москве
              li.v-deliveryPop__hours-item
                .v-deliveryPop__hour 52
                .v-deliveryPop__hour__definition склада в Москве
              li.v-deliveryPop__hours-item
                .v-deliveryPop__hour 152
                .v-deliveryPop__hour__definition автомобиля - размер автопарка
            .v-Popup__footer Рассчитать полную стоимость доставки можно в разделе
              nuxt-link(to="/delivery") &nbsp;доставка
            .v-Popup__arrow
          .circumstances__container(
            @click='changePop === "delivery" ? (changePop = null) : (changePop = "delivery")'
          )
            .circumstances__link
              .circumstances__icon
                img(src='~@/assets/images/icons/delivery6.svg')
              p Условия доставки
            img.circumstances__arrow(
              :class='{ reverse_90: changePop === "delivery" }',
              :src='require("@/assets/images/icons/arrow-right-menu.svg")'
            )
        li.v-itemcard__prices__circumstances__item
          .v-itemcard__prices__circumstances__item__dischargePop(
            v-if='changePop === "discharge"'
          )
            img.v-popup-login__closeIcon.attention(
              :src="require('@/assets/images/icons/close_mark.svg')"
              title="Закрыть окно"
              alt="Закрыть"
              @click='changePop=null')
            .v-Popup__header Разгрузка товара
            .v-Popup__content Включает только выгрузку товаров из машины на землю. Занос в квартиру осуществляется вашими силами.
            .v-Popup__content Цена услуги: 1 руб. за 1 кг.
            br
            .v-Popup__content Минимальная стоимость услуги "Разгрузка и подъем" составляет 800 руб. (один грузчик) и 1600 руб. (два грузчика).
            .v-Popup__footer
              nuxt-link(to='/delivery') Подробная информация
          .circumstances__container(
            @click='changePop === "discharge" ? (changePop = null) : (changePop = "discharge")'
          )
            .circumstances__link
              .circumstances__icon
                img(:src='require("@/assets/images/icons/discharge2.svg")')
              p Разгрузка товара
            img.circumstances__arrow(
              :class='{ reverse_90: changePop === "discharge" }',
              :src='require("@/assets/images/icons/arrow-right-menu.svg")'
            )
        li.v-itemcard__prices__circumstances__item
          .v-itemcard__prices__circumstances__item__elevatorPop(
            v-if='changePop === "elevator"'
          )
            img.v-popup-login__closeIcon.attention(
              :src="require('@/assets/images/icons/close_mark.svg')"
              title="Закрыть окно"
              alt="Закрыть"
              @click='changePop=null')
            .v-Popup__header Подъем на этаж
            .v-Popup__content Гипсокартон / фанера / Листовые материалы - 50 руб. / лист / этаж
            .v-Popup__content Профиль / Рейки / Брус - 25 руб. / шт / этаж
            .v-Popup__content Утеплитель - 25 руб. / упаковка / этаж
            .v-Popup__footer
              nuxt-link(to='/delivery') Подробная информация
          .circumstances__container.last(
            @click='changePop === "elevator" ? (changePop = null) : (changePop = "elevator")'
          )
            .circumstances__link
              .circumstances__icon
                img(:src='require("@/assets/images/icons/elevator2.svg")')
              p Подъем на этаж
            img.circumstances__arrow(
              :class='{ reverse_90: changePop === "elevator" }',
              :src='require("@/assets/images/icons/arrow-right-menu.svg")'
            )
      //- .v-itemcard__modificator
      //-   .v-itemcard__modificator-title МОДИФИКАЦИЯ ТОВАРА:
      //-   .v-itemcard__modificator-list
      //-     .v-itemcard__modificator-list-item(v-for="img in item.images")
      //-       img(:src="getImgPath(img, item.link)")
      //-     //- .v-itemcard__modificator-list-item
      //-     //-   img(:src="require('@/assets/images/popular-items--1.png')")
      //-     //- .v-itemcard__modificator-list-item
      //-     //-   img(:src="require('@/assets/images/popular-items--1.png')")


        //- Комплектация товара может отличаться
        //- .v-itemcard__modificator-img(@click="attention = !attention")
        //-   img(:src="require('@/assets/images/icons/infomodification.svg')")

      .v-itemcard__buttons
        template(v-if='!isInCart(item)')
          .v-itemcard__counter
            input.v-itemcard__counter-value(
              type='number',
              name='quantity',
              v-model='counterItemControls',
              @change='$event.target.value = item.counter',
              min='1',
              step='1'
            )
            .v-itemcard__counter-controlls
              button.increase(
                type='button',
                @click='changeProductCount("increment")'
              ) +
              button.decrease(
                type='button',
                @click='changeProductCount("decrement")'
              ) -

          .v-itemcard__add-to-cart(@click='addToCart')
            span В корзину
          .v-itemcard__one-click-buy(@click='orderClick()')
            span Купить в 1 клик
        template(v-else)
          //- .isCart.isinItemCart
          //-   button.btnisCart.isinBtnItemCart Товар уже добавлен в корзину
          .deleteFromCart(@click='removeItem(item)')
            span.deleteFromCart-btn Удалить из корзины
      //- .v-itemcard__info-disclamers
      //-   .v-itemcard__info-disclamer-item
      //-     h6.disclamer-item__title Внимание:&nbsp;
      //-     span.disclamer-item__text минимальный заказ данного товара составляет&nbsp;&mdash; 50&nbsp;м&sup2;
      //-   .v-itemcard__info-disclamer-item
      //-     h6.disclamer-item__title Доставка:&nbsp;
      //-     span.disclamer-item__text товар будет доставлен с&nbsp;центрального склада


      .v-itemcard__summary-align
        .v-itemcard__summary
          img(:src='require("@/assets/images/items/summary-bg.png")')
        .v-itemcard__summary-wrapper
          h6.v-itemcard__summary-title Итого:&nbsp;
          span.v-itemcard__summary-value.ruble {{ summary }} &#x20bd;

  .v-itemcard__content__menu
    .v-itemcard__description
      ul.v-itemcard__description-nav

        //- a.description-nav__item.rec(
        //-   @click='descriptionSwitch === "rec" ? (descriptionSwitch = null) : (descriptionSwitch = "rec")')
        //-   .circumstances__link
        //-     .circumstances__icon
        //-       img(:src='require("@/assets/images/icons/reccomend_also.svg")')
        //-     span Рекомендуем также
        //-       .colon :
        //-   img.description-nav__item-arrow(
        //-   :class='{ reverse_90: descriptionSwitch == "rec" }',
        //-   src="@/assets/images/icons/arrow-right-menu.svg",
        //-   title='Стрелочка'
        //-   )

        ul.description-nav__item-listprop(
          v-if='descriptionSwitch == "specs"'
        )
          li.speclist-item(v-for='option in item.options')
            div(v-for='(value, key) in option')
              span.speclist-item__title {{ key }}:
              span.speclist-item__value &nbsp;{{ value }}
        a.description-nav__item(
          @click='descriptionSwitch === "specs" ? (descriptionSwitch = null) : (descriptionSwitch = "specs")',
          :class='{ active: descriptionSwitch == "specs" }'
        )
          .circumstances__link
            .circumstances__icon
              img(:src='require("@/assets/images/icons/features.svg")')
            span Характеристики
              span.colon :
          img.description-nav__item-arrow(
            :class='{ reverse_90: descriptionSwitch == "specs" }',
            src="@/assets/images/icons/arrow-right-menu.svg",
            title='Стрелочка'
          )


              //- .special__container( v-else-if="value.constructor === Array")
              //-   template(v-for="(prop, index) in value" v-if="value.constructor === Array")
              //-     span.speclist-item__value__special__mobile  {{prop}}
              //- span.speclist-item__value(v-else) {{ value }}


        .description-nav__item__content(v-if='descriptionSwitch == "desc"')
          h6.description-nav__item__header {{ item.title || "Заголовок" }}
          .description-nav__item__text {{ item.description }}
        a.description-nav__item(
          @click='descriptionSwitch === "desc" ? (descriptionSwitch = null) : (descriptionSwitch = "desc")',
          :class='{ active: descriptionSwitch == "desc" }'
          v-if="item.description"
        )
          .circumstances__link
            .circumstances__icon
              img(:src='require("@/assets/images/icons/decription.svg")')
            p Описание
              span.colon :
          img.description-nav__item-arrow(
            :class='{ reverse_90: descriptionSwitch == "desc" }',
            src="@/assets/images/icons/arrow-right-menu.svg",
            title='Стрелочка'
          )


  .v-itemcard__buttons--mobile
    div
      .v-itemcard__counter-controlls
        button.decrease(
          type='button',
          @click='changeProductCount("decrement")'
        ) –
      .v-itemcard__counter
        input.v-itemcard__counter-value(
          type='number',
          name='quantity',
          v-model='counterItemControls',
          @change='$event.target.value = item.counter',
          min='1',
          step='1'
        )
      .v-itemcard__counter-controlls
        button.increase(
          type='button',
          @click='changeProductCount("increment")'
        ) +
    .v-itemcard__costs--mobile
      .v-itemcard__prices-clubCost клубная:&nbsp;
        span.clubCost-value.ruble(v-if="item.club_cost") {{ item.club_cost }} &#8381; {{ item.unit }}
      .v-itemcard__prices-cost розница:&nbsp;
        span.cost-value.ruble {{ item.cost }} &#8381; {{ item.unit }}
  .v-itemcard__buttons-buy--mobile(v-if="!isInCart(item)")
    .v-itemcard__add-to-cart(@click='addToCart')
      span В корзину
    .v-itemcard__one-click-buy(@click='orderClick()', :key='item.id')
      span Купить в 1 клик
  .v-itemcard__buttons-buy--mobile_else(v-else)
    //- .isCart.isinItemCart
    //-   button.btnisCart.isinBtnItemCart Товар в корзине
    .deleteFromCart(@click='removeItem(item)')
      span.deleteFromCart-btn Удалить из корзины
  .v-itemcard__summary-align.mobile
    .v-itemcard__summary
      img(:src='require("@/assets/images/items/summary-bg.png")')
    .v-itemcard__summary-wrapper
      h6.v-itemcard__summary-title Итого:&nbsp;
      span.v-itemcard__summary-value.ruble {{ summary }} &#x20bd;
  .v-itemcard__reccomend
    h3 Рекомендуем также
      img(:src='require("@/assets/images/divider.png")')
    vItem( v-for='enItem in additionalProducts.currentProductSameItems', :key='enItem.id', :item='enItem')




  .v-itemcard__content__charac
    ul.v-itemcard__description-speclist(v-if='descriptionSwitch == "specs"')
      li.speclist-item(v-for='option in item.options')
        div(v-for='(value, key) in option')
          span.speclist-item__title {{ key }}:
          span.speclist-item__value &nbsp;{{ value }}

    .v-itemcard__description-desc(v-if='descriptionSwitch == "desc"')
      h4.v-itemcard__description-desc-heading {{ item.title }}
      p.v-itemcard__description-desc-content {{ item.description }}

  .v-itemcard__content.bg-gray.recommended
    .v-itemcard__recommended(v-if="same.length || buyed.length")
      h3.v-itemcard__recommended-heading(v-if="same.length" @click="switchRec = 'recommendProduct'" :class="{'border': switchRec === 'recommendProduct'}") Рекомендуем также:
      h3.v-itemcard__recommended-heading(v-if="buyed.length" @click="switchRec = 'withBuy'" :class="{'border': switchRec === 'withBuy'}") С этим покупают:
  .v-itemcard__content.recommended(v-if="same.length || buyed.length")
    .v-itemcard__recommended-list
      vItemHorizontal(v-if="switchRec == 'recommendProduct'" v-for='enItem in additionalProducts.currentProductSameItems', :key='enItem.id', :item='enItem')
      vItemHorizontal(v-if="switchRec == 'withBuy'" v-for='byItem in additionalProducts.currentProductBuyedItems', :key='byItem.id', :item='byItem')
  .v-itemcard__content.bg-gray.recently-viewed
    h3.v-itemcard__recently-viewed-heading Недавно просмотренные:

  .v-itemcard__content.viewed-list
    .v-itemcard__recently-viewed-list
      vItem(v-for='pItem in recentlyProducts', :key='pItem.id', :item='pItem' v-if="pItem.article !== item.article")
  vCta
  vpopupBuy(
    v-if='isBuyPopupVisible'
    :item='item',
    @close='closePopup'
    @open='openThankPopup'
  )
  vPopupConsumptionThank(
    v-if="isConsumptionThanks"
    @close="closePopup"
  )
  vpopupClick(
    v-if="isthankPopupVisible"
    @close ="closePopup"
  )
  vFormPopup(
    v-if='consumptionVisible',
    @close='closePopup'
    @open='openConsumptionThankPopup'
    @callbackhandler="paymentRequestHandler"
    :popupTitle='"Заявка на бесплатный расчёт"',
    :popupDescription='"Оставьте Ваши данные и коментарии наши менеджеры свяжутся с Вами"',
    :nameLeftIcon='"pencil-writing-on-a-paper-sheet.svg"',
    :popupSubmitButtonLabel='"Отправить"',
    :popupWidth='460'
  )
    .popupInputGroup__header-payment-request
      label(for='Payment_Name')
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
      label(for='Payment_Phone')
        | Телефон
        span.redAsterisk
      input#Payment_Phone(
        type="phone"
        placeholder="+7 (999) 123-45-67"
        v-model="calculationPhone"
        ref="calculationphone"
        v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
        required
      )
    .popupInputGroup__header-payment-request
      label(for='Payment_File') Прикрепить файл
      input#Payment_File(
        type='file',
        ref="file"
        accept='.pdf,.png,.jpg,.jpeg',
        multiple
        @change="fileUploadHandler()"
      )
      .v-header__clip-container
    .popupInputGroup__header-payment-request
      label(for='Payment_Company') Название компании
      input#Payment_Companytype(
        "text"
        placeholder="Название компании"
        v-model="calculationCompany"
        ref="calculationcompany"
      )
    .popupInputGroup__header-payment-request
      label(for='Payment_INN') ИНН
      input#Payment_INN(
        type="text"
        placeholder="номер ИНН"
        maxlength="10"
        v-model="calculationInn"
        ref="calculationinn"
      )
    .popupInputGroup__header-payment-request
      label(for='Payment_Comment') Комментарий
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
        )
        label(for='Payment_Agreement')
          | Я даю свое
          span.check_accent &nbsp;согласие на обработку
          | &nbsp;моих персональных данных.
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import vBreadcrumbs from '@/components/breadcrumbs'
import vCta from '@/components/cta'
import vItemHorizontal from '@/components/itemHorizontal'
import vItem from '@/components/Item'
import vPopup from '@/components/popup/v-popup'
import vFormPopup from '@/components/popup/v-form-popup'
import vPopupConsumptionThank from '@/components/popup/v-consumption-thanks-popup.vue';
import vpopupBuy from '@/components/popup/v-popup-buy'
import vPopupThank from '@/components/popup/v-thank-popup'
import vpopupClick from '@/components/popup/v-popup-buyClick'
import vItemHorizontalSmall from '@/components/itemHorizontalSmall'
import favouritesControl from '@/components/mixins/favouritesControl'
import addToCart from '@/components/addToCart'
import addToCartMixin from '@/components/mixins/addToCart'
import imgPath from '@/components/mixins/imgPath'
import payment from '@/components/mixins/paymentRequest'
import { maska } from 'maska'
import { uuid } from 'uuidv4'
import { splice } from '@/api/data/smallCatalog'
import catalogMixin from '@/components/mixins/catalog/categories'

export default {
  name: 'ItemCard',
  components: {
    vBreadcrumbs,
    vCta,
    vItemHorizontal,
    vItemHorizontalSmall,
    vItem,
    vPopup,
    vpopupBuy,
    vPopupThank,
    vFormPopup,
    vpopupClick,
    vPopupConsumptionThank
  },

  async asyncData({ $axios, params, store, route, redirect }) {
    let product
    const tmpProduct = await $axios.$get(`/api/getProduct/${params.id}`)
    
    if(!tmpProduct.same) tmpProduct.same = []
    if(!tmpProduct.buyed) tmpProduct.buyed = []

    tmpProduct.counter = 1

    if(params.item) product = params.item
    else product = tmpProduct
    product.same = tmpProduct.same
    product.buyed = tmpProduct.buyed

    const same = product.same.map(s => ({ ...s, counter: 1, type: "currentSame", id: uuid() }))
    delete product.same
    const buyed = product.buyed.map(b => ({ ...b, counter: 1, type: "currentBuyed", id: uuid() }))
    delete product.buyed

    store.commit('product/SET_CURRENT_PRODUCT', {
      ...product,
      type: 'page',
      id: uuid(),
    })

    store.commit("product/SET_CURRENT_PRODUCT_SAME_ITEMS", same)
    store.commit("product/SET_CURRENT_PRODUCT_BUYED_ITEMS", buyed)

    return {
      onHover: false,
      isBuyPopupVisible: false,
      consumptionVisible: false,
      isthankPopupVisible: false,
      isConsumptionThanks: false,
      switchRec: 'recommendProduct',
      breadcrumbs: [
        {
          text: 'Главная',
          link: '/'
        },
        {
          text: 'Каталог',
          link: '/catalog'
        },
        {
          text: product.title
        }
      ],
      counter: 1,
      currentId: null,
      attention: false,
      changePop: null,
      elevatorPop: false,
      deliveryPop: false,
      descriptionSwitch: null
    }
  },

  directives: { maska },

  computed: {
    ...mapGetters({
      item: 'product/GET_CURRENT_PRODUCTS',
      additionalProducts: 'product/GET_ADDITIONAL_PRODUCTS',
      recentlyProducts: 'product/GET_WATCHEDITEMS'
    }),

    same() {
      return this.additionalProducts.currentProductSameItems
    },

    buyed() {
      return this.additionalProducts.currentProductBuyedItems
    },

    images() {
      const { images } = this.item
      if (images && images.length > 0) {
        return images.map((img, index) => {
          const imgPath = this.getImgPath(this.item.path, this.item.slug, img)
          return {
            id: index,
            src: imgPath,
            thumbnail: imgPath
          }
        }) 
      } else {
        const imgPath = this.getImgPath(this.item.path, this.item.slug)
        return [
          {
            id: 0,
            src: imgPath,
            thumbnail: imgPath
          }
        ]
      }
    },

    summary() {
      const sum = this.item.counter * (this.item.discount_price ? this.item.discount_price : this.item.cost)
      return sum.toFixed(2)
    },
    
    head: () => 
      this.$seo({
        title: this.item.meta.title,
        keywords: this.item.meta.keywords,
        description: this.item.meta.description,
      })
  },
  methods: {
  ...mapMutations({watchedItems: 'product/ADD_WATCHED_ITEM'}),

    increaseValue(value) {
      let temp = value
      temp += 1
      return temp
    },
    decreaseValue(value) {
      let temp = value
      if (temp > 1) temp -= 1
      return temp
    },
    onChange(event) {
      ;+event.target.value <= 0
        ? (this.counter = 1)
        : (this.counter = +event.target.value)
    },
    orderClick() {
      this.isBuyPopupVisible = true
    },
    closeFavoritePopup() {
      this.isFavoriteVisible = false
    },
    closePopup() {
      this.isthankPopupVisible = false
      this.isBuyPopupVisible = false
      this.isConsumptionThanks = false
      this.consumptionVisible = false
    },
    closePopupCallBack() {
      this.consumptionVisible = false
      this.openThankPopup()
    },
    consumptionPopupCallback() {
      this.consumptionVisible = false
      this.openConsumptionThankPopup()
    },
    openConsumptionThankPopup() {
      this.isConsumptionThanks = true
    },
    consumption() {
      this.consumptionVisible = true
    },
    openThankPopup() {
      this.isthankPopupVisible = true
    }
  },
  mounted() {
    if (window.innerWidth > 480) {
      this.descriptionSwitch = 'specs'
    }
    this.$root.$on('openOneClickBuyPopup', () => {
      this.showOneClickBuyPopup()
    })

    // Добавление просмотренного item в LocalStorage
    let item = this.item
    this.watchedItems({ ...item, type: 'watched' })
  },
  created() {
    this.$on("close:calculation", this.consumptionPopupCallback.bind(this))
  },
  mixins: [favouritesControl, addToCartMixin, imgPath, payment, catalogMixin]
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'

.lingalleryContainer
  display: flex
  justify-content: center
  width: 100%
  position: relative
  grid-area: gallery
  @include phones
    height: unset
  .lingallery
    display: flex
    flex-direction: row-reverse
    width: 100%
    position: relative
    @include tablets

      flex-direction: column
      margin-bottom: 15px
    @include phones

      margin-bottom: 0
    figure
      object-fit: contain
      img
        position: static
        width: 100%
        height: 100%

    @include tablets
      align-items: center
    .lingallery_thumbnails
      width: 100px !important
      @include tablets
        width: 100% !important
        margin: 10px 0
      @include phones
        margin: 0
        display: none
      &::before
        @include tablets
          display: none
          // content: 'Модификация товара:'
          text-transform: uppercase
          color: $red
          font-size: 16px
          font-weight: 700
          line-height: 19px
        @include phones
          text-align: center
          font-size: 12px
          display: flex
          justify-content: center
    .lingallery_thumbnails_content
      display: flex
      flex-direction: column
      @include tablets
        flex-direction: row
      @include phones
        display: none
      img
        @include tablets
          width: 100px
          height: 100px
          border: 2px solid #BBBBBB
          margin-right: 15px
        @include phones
          margin: 0
  &_elem
    img
      width: 100%
.v-itemcard
  @include tablets
    position: relative
  &__images
    display: grid
    grid-template-columns: 90px 400px 40px
    grid-template-rows: 400px 100px
    grid-template-areas: 'gallery gallery favorite' 'disclamer disclamer disclamer'
    @include tablets
      grid-template-rows: auto
      grid-template-areas: 'gallery gallery favorite'
      grid-template-columns: 90px calc(100% - 130px) 40px
    @include phones
      // grid-template-areas: 'gallery gallery gallery' 'disclamer disclamer disclamer'
      width: 100%
      display: flex
    .v-item__favorite-mark
      top: 0
      position: static
      justify-self: center
      grid-area: favorite
      @include tablets
        width: 100%
      @include phones
        position: absolute
        grid-area: unset
        top: 120px
        left: unset
        justify-content: flex-end
        width: 30px
        height: 30px
        top: 172px
        right: 15px

  &__container
    padding: 0px 45px

  &__heading
    margin: 14px 0px
    font-size: 24px
    font-weight: 700
    line-height: 28px
    letter-spacing: .07em
    @include tablets
      margin-top: 20px
      text-align: center
    @include phones
      font-size: 14px
      margin: 0
      line-height: 16px
      display: none
  &__disclamer
    grid-area: disclamer
    width: 100%
  &__subheading
    display: flex
    justify-content: space-between
    align-items: center
    background-color: $gray-1
    padding: 0px 45px
    margin-bottom: 50px
    @include tablets
      display: flex
      justify-content: center
      background-color: unset
      text-align: center
      margin-bottom: unset
    @include phones
      display: flex
      flex-direction: column
      padding: 0 20px

  &__article
    font-size: 18px
    line-height: 21px
    font-weight: 700
    color: $text
    @include phones
      font-size: 12px
      font-weight: normal
      margin: 0
      line-height: 14px
      display: none

  &__consumption
    display: flex
    align-items: center
    flex-direction: row
    border-left: 2px solid $text
    padding-left: 40px
    cursor: pointer
    @include tablets
      display: none
    @include phones
      padding-left: unset
      border-left: unset
    .consumption__title
      margin-left: 20px
      color: $red
      text-decoration: none
      font-size: 16px
      font-weight: bold
      line-height: 19px


  &__content
    display: flex
    flex-direction: row
    justify-content: center
    margin-bottom: 30px

    padding: 0 30px
    @include max
      justify-content: center
    @include largelaptop
      flex-wrap: wrap
      padding: 0 30px
    @include tablets
      padding: 10px
      padding-bottom: 0
    @include phones
      padding: 10px 7px 0
      color: black
      margin: 0
      margin-bottom: 0
    @media screen and(max-width: 352px)
      margin-bottom: 0
      border: none
      margin: 0

  &__main-image
    margin-left: 75px

  &__info
    margin-left: 11.56vw
    @media screen and (max-width: 1461px)
      margin: 40px 11.56vw
    @include tablets
      margin: 17px 20px
      width: 100%
    @include phones
      margin: 0
      width: 100%

  &__prices
    display: flex
    flex-direction: row
    align-items: center
    border: 2px solid $gray-4
    background-color: $gray-1
    width: 587px
    @include tablets
      display: none
    @media screen and (max-width: 665px)
      flex-direction: column
    &-title
      display: inline-block
      width: 270px
      padding: 56px 0px
      text-align: center
      font-size: 24px
      font-weight: 700
      line-height: 28px
      letter-spacing: .07em
      border-right: 2px solid $gray-4
      @media screen and (max-width: 665px)
        border-right: unset
        border-bottom: 2px solid $gray-4
        width: 100%

    &-values
      display: flex
      flex-direction: column
      width: 67%
      @media screen and (max-width: 665px)
        width: 100%
    &-clubCost, &-cost
      display: inline-block
      width: 286px
      padding: 20px 20px 20px 30px
      font-size: 16px
      font-weight: 700
      line-height: 19px
      letter-spacing: .07em
      width: 100%
      text-align: center
      @media screen and (max-width: 665px)
        width: 100%
      @include phones
        text-align: left
        background-color: white
        padding: 0
        font-size: 16px
    &-clubCost
      color: $red
      border-bottom: 2px solid $gray-4
      @include phones
        border-bottom: 2px solid transparent
    &-discount
      color: $red
      letter-spacing: .07em
      text-align: center
      @include phones
        margin-bottom: 5px
        border-bottom: none
        font-size: 16px

  &__buttons
    display: flex
    align-items: center
    // justify-content: space-between
    justify-content: center
    margin-top: 40px
    margin-bottom:
    @media screen and (max-width: 665px)
      display: flex
      flex-direction: column
    @include tablets
      display: none
    .isinItemCart
      // margin-left: 216px
      max-width: 400px
      position: relative
      width: 49%
      margin-right: 2%
      .isinBtnItemCart
        padding: 12px
        margin: 0
      .card-closeIcon
        position: absolute
        right: 7px
        top: 5px
        cursor: pointer
    .deleteFromCart
      height: 100%
      display: flex
      justify-content: center
      width: 49%
      padding: 12px
      border: 3px dashed red
      cursor: pointer
    &-buy--mobile_else
      display: none
      @include phones
        display: flex
        justify-content: center
        height: 30px
        margin-bottom: 15px
      .isCart.isinItemCart
        width: 49%
        .btnisCart.isinBtnItemCart
          height: 30px
      .deleteFromCart
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        width: 49%
        padding: 0
        border: 3px dashed #ffe600
        height: 30px
        &-btn
          font-size: 13px

    &-buy--mobile
      display: none
      @include tablets
        display: grid
        grid-template-columns: 1fr 1fr
        padding: 0 5px
        grid-gap: 25px
        justify-items: center
        align-items: center
        width: 100%
      @include phones
        flex-direction: column
        display: flex
        justify-content: space-between
        grid-gap: 0
        padding: 0 20px
        margin-bottom: 15px
        @media screen and(max-width: 352px)
          padding: 0 10px
        div
          display: flex
          align-items: center
          justify-content: center
          min-width: unset
          width: 130px
          max-width: 200px
          padding: 12px 32px
          @include phones
            width: auto
            padding: 0
          span
            text-align: center
            white-space: nowrap
            font-size: calc(12px + (16 - 12) * ((100vw - 320px) / (1920 - 320)))
            @include phones
              padding: 14px 5px
              font-size: 14px
        .v-itemcard__add-to-cart
          height: 35px
          background: $red
          // border: 2px solid #FFE600
          box-sizing: border-box
          @include phones
            width: 100%
            margin-bottom: 20px
            height: auto
            border: none
        .v-itemcard__one-click-buy
          height: 35px
          background: #FFE600
          // border: 2px solid $red
          box-sizing: border-box
          @include phones
            width: 100%
            height: auto
            border: none
            background: $red
            color: white
    &--mobile
      display: none
      @include tablets
        display: grid
        max-width: 600px
        margin: 0 auto
        grid-template-columns: 1fr 1fr
        position: relative
      @include phones
        display: flex
        margin: 20px 0
        flex-direction: column
        align-items: center

        .increase, .decrease
          width: 40px !important
          height: 40px !important
          background: white
          display: flex
          align-items: center
          justify-content: center
          @include phones
            width: 35px !important
            height: 35px !important
        .increase
          margin-right: 20px
          @include phones
            margin-right: 0
        div
          display: flex
          @include phones
            justify-content: center
      .v-itemcard__counter
        display: flex
        width: 100%
        @include phones
          width: fit-content

        input
          height: 40px
          @include phones
            height: 35px
    &__disclamers
      margin-top: 30px

  &__costs--mobile
    display: flex
    flex-direction: column
    justify-content: center
    @include phones
      margin-top: 20px
    span
      font-family: Roboto
      font-style: normal
      font-weight: bold
      font-size: calc(12px + (16 - 12) * ((100vw - 320px) / (1920 - 320)))
      line-height: 14px
      letter-spacing: 0.07em
      display: flex
      align-items: center
      @include phones
        font-size: 20px
    span:first-child

  &__counter
    display: flex
    margin-right: 10px
    @media screen and (max-width: 665px)
      margin-right: 0
      width: 226px
    @include tablets
      display: none
    &-value
      width: 80px
      height: 48px
      border: 2px solid $yellow
      border-radius: 0px
      font-size: 24px
      letter-spacing: .07em
      text-align: center
      &:active, &:hover
        outline: none
      &::-moz-focus-inner
        border: 0
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button
        -webkit-appearance: none
        margin: 0
    input[type=number]
      -moz-appearance: textfield

    &-controlls
      display: flex
      flex-direction: column
      .decrease, .increase
        line-height: 16px
        width: 35px
        height: 24px
        border: 2px solid $yellow
        border-radius: 0px
        font-size: 22px
        cursor: pointer
        padding: 0
        display: flex
        align-items: center
        justify-content: center
        background-color: white
        @include phones
          line-height: 25px
          font-size: 18px
        &:active, &:focus
          outline: none
        &::-moz-focus-inner
          border: 0

  &__one-click-buy, &__add-to-cart
    min-width: 226px
    text-transform: uppercase
    text-align: center
    font-size: 18px
    font-weight: 700
    padding: 12px 0px
    cursor: pointer

  &__add-to-cart
    color: white
    background-color: $red
    // border: 2px solid $yellow
    margin-right: 10px
    @media screen and (max-width: 665px)
      margin: 20px 0
    @include phones
      margin: 0
      border: none
  &__one-click-buy
    color: white
    // background-color: $yellow
    // border: 2px solid $red
    background-color: $red
    @include phones
      border: none

  &__info-disclamers
    margin-top: 30px
    @include phones
      margin-top: 17px
  &__info-disclamer-item
    display: flex
    flex-direction: row
    align-items: flex-end
    @include tablets
      align-items: flex-start
      flex-direction: column
    &:first-child
      margin-bottom: 5px
    .disclamer-item__title
      margin: 0px
      font-size: 16px
      font-weight: 700
      line-height: 19px
      letter-spacing: .07em
      color: $red
      @include tablets
        text-transform: uppercase
      @include phones
        font-size: 12px

    .disclamer-item__text
      color: $text
      letter-spacing: .07em
      @include phones
        font-size: 10px

  &__summary
    margin-top: 41px
    margin-left: 112px
    @include phones
      background-image: none
      padding: 0
      width: 200px
      display: block
      margin-top: 0
      margin-left: 60px

    &-align
      display: flex
      justify-content: center
      position: relative
      @include phones
        display: none
      &.mobile
        display: none !important
        @include phones
          margin-bottom: 20px !important
          display: flex !important
    &-wrapper
      width: 200px
      position: absolute
      top: 79px
      margin-right: 0
      @include phones
        display: flex
        flex-direction: column
        justify-content: center
        margin-right: 0
        top: 7px


    img
      @include phones
        width: 100%
    &-value
      display: block
    &-title, &-value
      font-size: 24px
      font-weight: 700
      line-height: 28px
      letter-spacing: .07em
      text-align: center
      color: white
      @include phones
        font-size: 20px
        text-align: center
    &-title
      margin: 0px
      margin-right: 0
    
    &-value
      margin-top: 10px
      @include phones
        margin-right: 0
        margin-top: 0
  &__disclamer
    $d-padding: 15px
    padding: $d-padding
    letter-spacing: .07em
    font-size: 16px
    font-weight: 400
    color: $text
    border: 2px dashed $yellow
    width: 598px - 2 * $d-padding + 2px
    margin-top: 15px
    margin-bottom: 0px
    @include laptop
      width: 100%
    @include tablets
      display: none
  &__description
    @include tablets
      width: 100%
  &__description-nav
    padding-left: 0px
    margin: 0px
    display: flex
    flex-direction: row
    list-style: none
    background-color: #e6e6e6
    padding: 0 30px
    @include tablets
      width: 100%
      flex-direction: column-reverse
      padding: 20px
      background-color: white
    @include phones
      padding: 7px
      padding-top: 0
      padding-bottom: 0px
    @media screen and(max-width: 352px)
      padding: 0 10px
    .description-nav__item
      padding: 25px 80px

      letter-spacing: .07em
      font-size: 20px
      font-weight: 700
      cursor: pointer
      color: black
      @include tablets
        padding: 25px 40px
        width: 100%
        text-align: center
      @include phones
        font-size: 16px
        text-align: left
        padding: 10px
        border: 2px solid #BAB4B4
        border-top: none
        // margin-bottom: 5px
        display: flex
        justify-content: space-between
        background-color: white
        align-items: center
    .active
      @media screen and(min-width:481px)
        background-color: white
        border: 2px solid $yellow
        padding: 23px 78px

  &__description-speclist
    margin: 0
    margin-top: 20px
    padding-left: 60px
    display: flex
    flex-wrap: wrap

    @include mediumlaptop
      display: flex
      flex-wrap: wrap
      justify-content: center
    @include phones
      display: none
    .speclist-item
      display: flex
      justify-content: space-between
      padding: 18px 39px 18px 34px
      border: 2px solid #bab4b4
      margin-bottom: 20px
      margin-right: 10px
      font-size: 20px
      font-weight: 400
      line-height: 23px
      letter-spacing: .07em
      align-items: center
      @media screen and (max-width: 886px)
        width: 300px
      @include phones
        flex-wrap: wrap
        font-size: 12px
        text-transform: none
        margin-top: 10px

  &__description-desc
    padding: 10px 30px 10px 60px
    &-content
      font-size: 16px
      line-height: 27px
      letter-spacing: .07em

      color: $text
      @include phones
        display: none


    &-heading
      margin-top: 0px
      font-size: 20px
      font-weight: 700
      line-height: 23px
      letter-spacing: .07em
      color: $text
      margin-bottom: 0

  &__recommended-heading, &__recently-viewed-heading
    margin: 0px
    padding: 25px 55px
    font-size: 20px
    font-weight: 700
    line-height: 21px
    letter-spacing: .07em
    @include phones
      display: none
  &__recently-viewed-heading
    background-color: white
    border: 2px solid $yellow
    margin-left: 30px
  &__recommended-heading
    cursor: pointer

  &__recently-viewed-list
    display: flex
    flex-wrap: wrap
    justify-content: center
    @include phones
      display: none

  &__oneclick-container
    padding: 0px 15px
    @include phones
      padding: 0px 5px
    .oneclick__input-group
      display: flex
      justify-content: space-between
      margin-bottom: 20px
      label
        @include phones
          font-size: 14px
      input, textarea
        background-color: $gray-1
        border: none
        padding: 5px 10px
        width: 230px
        font-size: 14px
        font-weight: 300
        letter-spacing: .07em
        @include phones
          width: 170px
      textarea
        resize: none


    .oneclick__input-group--checkbox
      display: flex
      align-items: center
      &:not(:last-child)
        margin-bottom: 6px
      input
        margin-right: 8px
      label
        font-size: 12px
        font-weight: 300
        letter-spacing: .07em
  &__modificator
    margin-top: 15px
    @include tablets
      display: none
    &-title
      color: $red
      font-size: 16px
      font-weight: 700
      line-height: 19px
      margin-bottom: 15px
    &-list
      display: flex
      justify-content: flex-start
      &-item
        width: 100px
        height: 90px
        border: 2px solid #BBBBBB
        margin-right: 30px
        img
          object-fit: cover
          width: 100%
          height: 100%

.clubCost-value, .cost-value, .discount-value
  font-size: 24px
  font-weight: 700
  line-height: 30px
  letter-spacing: .07em

.bg-gray
  background-color: $gray-3
  justify-content: flex-start

.v-itemcard__recommended-list
  @include phones
    display: none

.v-itemcard__content.bg-gray.recently-viewed
  @include phones
    display: none


.v-itemcard__content.recommended
  @include phones
    display: none
.v-itemcard__content.viewed-list
  @include phones
    display: none


.v-itemcard__content__menu
  background-color: #e6e6e6
  padding: 0 30px
  @include phones
    padding: 0
    background-color: white

.description-nav__item-arrow
  display: none
  @include phones
    display: block
    transform: rotate(0deg)
    width: 16px
    height: 18px

.reverse_90
  transform: rotate(90deg)

.description-nav__item__text
  font-size: 12px
  font-weight: normal
  text-transform: none
  @include phones
    font-size: 14px
    font-weight: bold
.description-nav__item__header
  margin: 0
  font-size: 14px
  margin-bottom: 10px
  @include phones
    color: $red
.description-nav__item__text, .description-nav__item__header, .description-nav__item-listprop
  display: none
  @include phones
    display: block

.speclist-item
  @include phones
    font-size: 14px
    text-transform: none
    font-weight: normal
    display: flex
    justify-content: space-between
    margin-top: 10px
  &:first-child
    margin-top: 0
.description-nav__item-listprop
  margin: 0
  padding: 0
  width: 100%
  font-size: 12px
  @include phones
    padding: 10px
    border: 2px solid $gray-4
    border-top: none
.mobileCard
  @include phones
    display: none !important

.v-itemcard__content__charac
  @include phones
    display: none

.v-itemcard__content__heading
  display: none
  @include phones
    display: block
    font-size: 14px
    line-height: 16px
    margin: 0
    text-align: center
    margin-bottom: 10px
.v-itemcard__content__article
  display: none
  @include phones
    display: block
    font-size: 12px
    line-height: 16px
    font-weight: normal
    margin: 0
    text-align: center
    color: $red
    font-weight: 700
.description-nav__item__item-recommend
  font-weight: bold
  font-size: 12px
  text-decoration-line: underline
  background: yellow
  margin-right: 10px
  margin-bottom: 10px
  padding: 4px
  @media screen and(max-width: 400px)
    font-size: 14px

.description-nav__item-listprop-rec
  display: flex
  flex-wrap: wrap
  margin: 0
  padding: 0
  list-style: none
  max-width: 350px
  margin-top: 10px
  @include phones
    padding: 10px 10px 0
    margin: 0
    border: 2px solid #BAB4B4
    border-top: none
.description-nav__item.rec
  display: none
  @include phones
    display: flex

.description-nav__item__wrapper-for-list
  span
    font-weight: bold
    font-size: 12px
    line-height: 14px
    margin-bottom: 10px

.v-itemcard__modificator-img
  display: none
  @include phones
    display: block
    position: absolute
    width: 20px
    height: 15px
    top: 0
    top: -152px
    left: 242px

.v-popup-layout
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.46)
  position: fixed
  z-index: 100
  top: 0
.v-popup-layout-transparent
  width: 100%
  height: 100%
  background-color: transparent
  position: fixed
  z-index: 10
  top: 0
  @media screen and(max-width: 852px)
    display: none

.v-popup-attention
  top: 40%
  left: 10%
  right: 10%
  max-width: 360px
  position: fixed
  z-index: 110
  background-color: white
  border: 2px dashed #FFE600
  padding: 20px

  p
    font-size: 16px
    text-align: center
    font-weight: 400

.v-popup-login__closeIcon.attention
  right: 3px
  top: 4px
  cursor: pointer
  position: absolute
  @include phones
    display: none
.v-popup-login__closeIcon.pop
  @media screen and(max-width: 852px)
    display: none
.lingallery figure
  @include phones
    width: 200px !important
    height: 200px !important

.speclist-item__title
  font-weight: bold
  color: $red

.speclist-item__value
  font-size: 18px
  @include phones
    font-size: 14px
    max-width: 173px
    text-align: right

a.control.left, a.control.right
  display: none !important

.description-nav__item > span
  display: flex
  align-items: center

.special__container
  display: flex
  flex-wrap: wrap
  max-width: 163px
.speclist-item__value__special__mobile
  text-align: right
  width: 100%

.v-itemcard__prices__circumstances__list
  margin: 0
  padding: 0
  display: flex
  justify-content: space-between
  position: relative
  background-color: #f6f6f6
  z-index: 11
  @media screen and(max-width: 852px)
    flex-direction: column
    margin-top: 20px
  @include phones
    background-color: white


.v-itemcard__prices__circumstances__item
  display: flex
  justify-content: center
  width: 100%
  align-items: center
  padding: 15px 0
  border: 2px solid #bab4b4
  font-weight: bold

  border-top: none
  border-right: none
  @media screen and(max-width: 852px)
    flex-direction: column-reverse
    padding: 0
    border: none

.v-itemcard__prices__circumstances__item:last-child
  border-right: 2px solid #bab4b4
  @include phones
    border-right: none
  .v-itemcard__prices__circumstances__item__elevatorPop
    @include phones
      border-top: none
      border-bottom: 2px solid #bab4b4

.circumstances__icon
  margin-right: 8px
  width: 30px
  height: 30px
  img
    width: 100%

.v-itemcard__prices__circumstances__item__deliveryPop, .v-itemcard__prices__circumstances__item__dischargePop, .v-itemcard__prices__circumstances__item__elevatorPop
  background: white
  position: absolute
  bottom: 60px
  padding: 10px
  // padding-top: 10px
  width: 410px
  border: 2px solid red
  font-weight: normal
  @media screen and(max-width: 852px)
    position: relative
    bottom: 0
    border: none
    background: white
    border: 2px solid #bab4b4
    border-bottom: none
    width: 100%
.v-deliveryPop__hours-list
  margin: 0
  padding: 0
  list-style-type: none
  @media screen and(max-width: 852px)
    font-size: 14px
.v-deliveryPop__hours-item
  display: flex
  align-items: center
  margin-bottom: 10px
.v-deliveryPop__hour
  height: 30px
  width: 30px
  background: #f6f6f6
  display: flex
  justify-content: center
  align-items: center
  font-weight: bold

.v-Popup__header
  padding-bottom: 10px
  margin-bottom: 10px
  border-bottom: 2px dashed grey
  font-weight: bold
  @media screen and(max-width: 852px)
    display: none

.v-deliveryPop__hour__definition
  margin-left: 10px

.circumstances__link
  display: flex
  align-items: center
  cursor: pointer
  // @media screen and(max-width: 852px)
  //   margin-left: 10px
.circumstances__arrow
  display: none
  @media screen and(max-width: 852px)
    width: 16px
    height: 18px
    display: block
    // margin-right: 10px

.circumstances__container
  display: flex
  @media screen and(max-width: 852px)
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 10px
    border: 2px solid #bab4b4
    border-bottom: none
.circumstances__container.last
  @include phones
    border-bottom: 2px solid #bab4b4
.v-Popup__footer
  @media screen and(max-width: 852px)
    font-size: 14px
  a
    text-decoration: underline
    color: $red
    cursor: pointer
    @media screen and(max-width: 852px)
      font-size: 14px




.v-Popup__content
  @media screen and(max-width: 852px)
    font-size: 14px

.v-itemcard__content__info
  margin-bottom: 20px

input.v-itemcard__counter-value
  -webkit-appearance: none
  border-radius: 0

.itemCard__closeIcon
  position: absolute
  top: 4px
  right: 4px
  cursor: pointer

#Payment_File
  overflow: hidden
#file-upload-button
  background-color: white

input.v-itemcard__counter-value
  border-right: none
  @include phones
    border-left: none

.v-itemcard__counter-controlls
  .increase
    border-bottom: none
    @include phones
      border-bottom: 2px solid #ffe600
.v-itemcard__recommended-heading
  margin-left: 30px


.v-itemcard__recommended
  display: flex

.border
  background-color: white
  border: 2px solid $yellow
  padding: 23px 53px

div.v-itemcard__content__menu > div > ul > a.description-nav__item > div > div,
div.v-itemcard__content__menu > div > ul > a:nth-child(3) > div > div
  display: none
  @include phones
    display: block


.description-nav__item__content
  @include phones
    padding: 10px
    font-size: 14px
    border: 2px solid $gray-4
    border-top: none

.colon
  @include phones
    display: none


#\39 0105 > div.v-itemcard__buttons-buy--mobile > div.v-itemcard__add-to-cart > span
  @include phones
    padding: 14px 26.25px !important

.v-itemcard__reccomend
  display: none
  @include phones
    margin-bottom: 20px
    display: block
  h3
    margin: 0
    font-size: 18px
    position: relative
    color: white
    margin-bottom: 20px
    padding: 3px
    padding-left: 10px
    img
      position: absolute
      top: 0
      height: 100%
      left: 0
      width: 97%
      z-index: -1
</style>
