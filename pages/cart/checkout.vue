<template lang="pug">
  #v-checkout
    NuxtChild
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    .v-checkout

      h1.v-checkout__heading(v-show="currentStep == 2") Личные данные
      h1.v-checkout__heading(v-show="currentStep == 3") Способ доставки
      h1.v-checkout__heading(v-show="currentStep == 4") Завершение
      .v-checkout__stepper
        .v-checkout__stepper-item(:class="{stepperDisabled: complete}")
          nuxt-link(to="/cart")
            span Корзина
        .v-checkout__stepper-item(:class="{ stepperActive: currentStep == 2, stepperDisabled: currentStep < 2 || complete }" @click="changeStep(2)")
          span Личные данные
        .v-checkout__stepper-item(:class="{ stepperActive: currentStep == 3, stepperDisabled: currentStep < 3 || complete }" @click="changeStep(3)")
          span Способ доставки
        .v-checkout__stepper-item(:class="{ stepperActive: currentStep == 4, stepperDisabled: currentStep < 4 }")
          span Завершение
      .v-checkout__title--mobile
        h1 Мой профиль
      .v-checkout__container(v-show="currentStep == 2")
        nuxt-link.arrow_back(to="/cart")
          img.arrow_icon(:src="require('@/assets/images/icons/arrow-right-menu_checkout.svg')")
          .line-for-arrow  Назад
        .v-checkout__wrapper
          h2.v-checkout__title Тип профиля:
          .v-checkout__body
            .v-checkout__header
              input#individual-person(type="radio" name="persons" value="individual" v-model="personType")
              label(for="individual-person") Физическое лицо

              input#legal-person(type="radio" name="persons" value="legal" v-model="personType")
              label(for="legal-person") Юридическое лицо

            form.v-checkout__form.form-idv(@submit.prevent="gotoDelivery" v-show="personType === 'individual'")
              .v-checkout__input-group
                label(for="idv-name") Имя
                  //- span.star &nbsp;*
                input#idv-name(
                  type="text"
                  placeholder="Иван"
                  v-model="physName"
                  ref="physname"
                  :readonly="fieldsHasValue.name"
                )

              .v-checkout__input-group
                label(for="idv-lastname") Фамилия
                  //- span.star &nbsp;*
                input#idv-lastname(
                  type="text"
                  placeholder="Иванов"
                  v-model="physLastname"
                  ref="lastname"
                  :readonly="fieldsHasValue.lastname"
                )

              .v-checkout__input-group
                label(for="idv-phone") Основной телефон
                  span.star &nbsp;*
                input#idv-phone(
                  type="phone"
                  placeholder="+7 (___) ___-__-__"
                  ref="phone"
                  minLength="12"
                  v-model="physicalPhone"
                  v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
                  :readonly="fieldsHasValue.phone"
                )
                .error(v-if="!$v.physData.physicalPhone.required && $v.physData.physicalPhone.$dirty && !$v.physData.physicalPhone.minLength")
                  span Введите номер телефона

              .v-checkout__checkbox-group.ind
                input#isProceed(type="checkbox" v-model="physicalAgree")
                label(for="isProceed") Я подтверждаю свою дееспособность, согласие на получение информации об оформлении и получении заказа, согласие на обработку персональных данных в соответствии с указанным здесь текстом
                .error(v-if="$v.physData.physicalAgree.$invalid")
                  span Необходимо согласиться с условиями

              button(type="submit" ref="userFormSubmit" style="display:none;")


            form.v-checkout__form.form-legal(@submit.prevent="gotoDelivery" v-show="personType === 'legal'")
              .v-checkout__legal-wrapper
                .v-checkout__input-group
                  label(for="legal-name") Имя:
                    span.star &nbsp;*
                  input#legal-name(
                    type="text"
                    placeholder="Иван"
                    v-model="legalName"
                    ref="legalname"
                    :readonly="fieldsHasValue.name")
                  .error(v-if="!$v.legalData.legalName.required && $v.legalData.legalName.$dirty")
                    span Введите имя
                .v-checkout__input-group
                  label(for="legal-lastname") Фамилия:
                    span.star &nbsp;*
                  input#legal-lastname(
                    type="text"
                    placeholder="Иванов"
                    v-model="legalLastname"
                    ref="legallastname"
                    :readonly="fieldsHasValue.lastname")
                  .error(v-if="!$v.legalData.legalLastname.required && $v.legalData.legalLastname.$dirty")
                    span Введите фамилию
                .v-checkout__input-group
                  label(for="legal-organisation") Название организации:
                    span.star &nbsp;*
                  input#legal-organisation(
                    type="text"
                    placeholder="организация"
                    v-model="legalOrganisation"
                    ref="legalorganisation"
                    :readonly="fieldsHasValue.organisation"
                  )
                  .error(v-if="!$v.legalData.legalOrganisation.required && $v.legalData.legalOrganisation.$dirty")
                    span Введите название организации
                .v-checkout__input-group
                  label(for="legal-phone") Основной телефон:
                    span.star &nbsp;*
                  input#legal-phone(
                    type="phone"
                    placeholder="+7 (___) ___-__-__"
                    minLength="12"
                    v-model="legalPhone"
                    ref="legalphone"
                    v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
                    :readonly="fieldsHasValue.phone"
                  )
                  .error(v-if="!$v.legalData.legalPhone.required && $v.legalData.legalPhone.$dirty && !$v.legalData.legalPhone.minLength")
                    span Введите номер телефона
                .v-checkout__input-group
                  label(for="legal-ownership") Форма собственности:
                    span.star &nbsp;*
                  input#legal-ownership(
                    type="text"
                    placeholder="форма собственности"
                    v-model="legalOwnership"
                    ref="legalownership"
                    :readonly="fieldsHasValue.ownership")
                  .error(v-if="!$v.legalData.legalOwnership.required && $v.legalData.legalOwnership.$dirty")
                    span введи форму
                .v-checkout__input-group
                  label(for="legal-actualaddress") Фактический адрес:
                    span.star &nbsp;*
                  input#legal-actualaddress(
                    type="text"
                    placeholder="фактический адрес"
                    v-model="legalActualAddress"
                    ref="legalactualaddress"
                    :readonly="fieldsHasValue.ur_actualAddress"
                  )
                  .error(v-if="!$v.legalData.legalActualAddress.required && $v.legalData.legalActualAddress.$dirty")
                    span Введите фактический адрес

                .v-checkout__input-group
                  label(for="legal-address") Юридический адрес:
                    span.star &nbsp;*
                  input#legal-address(
                    type="text"
                    placeholder="юридический адрес"
                    v-model="legalAdresse"
                    ref="legaladresse"
                    :readonly="fieldsHasValue.ur_address"
                  )

                  .error(v-if="!$v.legalData.legalAdresse.required && $v.legalData.legalAdresse.$dirty")
                    span Укажите юридический адрес

                .v-checkout__input-group
                  label(for="legal-okpo") ОКПО:
                  input#legal-okpo(
                    type="text"
                    placeholder="12345678"
                    maxlength="8"
                    v-model="legalOkpo"
                    ref="legalokpo"
                    :readonly="fieldsHasValue.okpo"
                  )

                .v-checkout__input-group
                  label(for="legal-bik") БИК:
                    span.star &nbsp;*
                  input#legal-bik(
                    type="text"
                    placeholder="012345678"
                    maxlength="9"
                    v-model="legalBik"
                    ref="legalbik"
                    :readonly="fieldsHasValue.bik"
                  )

                  .error(v-if="!$v.legalData.legalBik.required && $v.legalData.legalBik.$dirty")
                    span Укажите БИК

              .v-checkout__legal-wrapper
                .v-checkout__input-group
                  label(for="legal-bankname") Наименование банка:
                  input#legal-bankname(
                    type="text"
                    placeholder="название банка"
                    v-model="legalBank"
                    ref="legalbank"
                    :readonly="fieldsHasValue.bank"
                  )

                .v-checkout__input-group
                  label(for="legal-score") Расчетный счет:
                  input#legal-score(
                    type="text"
                    placeholder="номер счёта"
                    v-model="legalScore"
                    ref="legalscore"
                    maxlength="20"
                    :readonly="fieldsHasValue.account_number"
                  )

                .v-checkout__input-group
                  label(for="legal-corescore") Корреспонденсткий счет:
                    span.star &nbsp;*
                  input#legal-corescore(
                    type="text"
                    v-model="legalCoreScore"
                    ref="legalcorscore"
                    placeholder="номер счета"
                    maxlength="20"
                    :readonly="fieldsHasValue.ur_corScore"
                  )
                  .error(v-if="!$v.legalData.legalCorScore.required && $v.legalData.legalCorScore.$dirty")
                    span Введите номер счёта

                .v-checkout__input-group
                  label(for="legal-inn") ИНН:
                    span.star &nbsp;*
                  input#legal-inn(
                    type="text"
                    placeholder="номер ИНН"
                    v-model="legalInn"
                    ref="legalinn"
                    maxlength="10"
                    :readonly="fieldsHasValue.inn"
                  )
                  .error(v-if="!$v.legalData.legalInn.required && $v.legalData.legalInn.$dirty")
                    span Введите корректный ИНН

                .v-checkout__input-group
                  label(for="legal-kpp") КПП:
                  input#legal-kpp(
                    type="text"
                    placeholder="номер КПП"
                    maxlength="9"
                    v-model="legalKpp"
                    ref="legalkpp"
                    :readonly="fieldsHasValue.kpp"
                  )

                .v-checkout__input-group
                  label(for="legal-director") Генеральный директор:
                  input#legal-director(
                    type="text"
                    placeholder="Ф.И.О."
                    v-model="legalDirector"
                    ref="legaldirector"
                    :readonly="fieldsHasValue.director"
                  )

                .v-checkout__checkbox-group
                  input#isProceed_1(type="checkbox" v-model="legalAgree")
                  label(for="isProceed_1") Я подтверждаю свою дееспособность, согласие на получение информации об оформлении и получении заказа, согласие на обработку персональных данных в соответствии с указанным здесь текстом
                  .error(v-if="$v.legalData.legalAgree.$invalid")
                    span Необходимо согласиться с условиями
              button(type="submit" ref="userFormSubmit" style="display:none;")

        .v-checkout__wrapper.v-checkout__grid-wrapper
          .v-checkout__payment-type
            h2.v-checkout__title Способ оплаты:
            .v-checkout__payment-content
              .v-checkout__payment-type-group
                input#payment__cash(type="radio" name="payment-type[]" v-model="paymentType" value="cash" checked)
                label(for="payment__cash") Оплата наличными при получении:

              .v-checkout__payment-type-group
                input#payment__card(type="radio" name="payment-type[]" v-model="paymentType" value="cartReceiving")
                label(for="payment__card") Оплата банковской картой при получении:

              .v-checkout__payment-type-group
                input#payment__card-on-site(type="radio" name="payment-type[]" v-model="paymentType" value="cartSite")
                label(for="payment__card-on-site") Оплата банковской картой на сайте:

              .v-checkout__payment-type-group
                input#payment__bank-transfer(type="radio" name="payment-type[]" v-model="paymentType" value="bankTransfer")
                label(for="payment__bank-transfer") Банковский перевод:

          .v-checkout__continue(@click="$refs.userFormSubmit.click()")
            .v-checkout__continue-wrapper
              img.v-checkout__continue-icon(:src="require('@/assets/images/icons/continue-check.svg')")
              span.v-checkout__continue-title Продолжить
          .v-checkout__save(@click="$refs.userFormSubmit.click()")
            .v-checkout__save-wrapper
              span.v-checkout__save-title Сохранить
      .v-checkout__container.third(v-show="currentStep == 3")
        .arrow_back(@click="currentStep = 2")
          img.arrow_icon(:src="require('@/assets/images/icons/arrow-right-menu_checkout.svg')")
          .line-for-arrow  Назад
        .v-checkout__wrapper
          h2.v-checkout__title Заказать доставку:
          .v-checkout__body-delivery
            p.v-checkout__delivery-description Окончательная стоимость данной услуги будет рассчитана специалистом нашей компании при обработке Вашего заказа на основании параметров заказываемого товара и тарифов, опубликованных в разделе "Доставка".

            form.v-checkout__delivery-form.form-delivery(action="#" method="POST" @submit.prevent="sendDataUser")
              .v-checkout__delivery-wrapper
                .v-checkout__delivery-form-group
                  label(for="") Населённый пункт:
                    span.star &nbsp;*
                  input(type="text" v-model="adressData.city" required)
                .v-checkout__delivery-form-group
                  label(for="") Улица:
                    span.star &nbsp;*
                  input(type="text" v-model="adressData.street" required)
                .v-checkout__delivery-form-group
                  label(for="") Дом:
                    span.star &nbsp;*
                  input(type="text" v-model="adressData.house" required)
                .v-checkout__delivery-form-group
                  label(for="") Корпус:
                  input(type="text" v-model="adressData.building")
                .v-checkout__delivery-form-group
                  label(for="") Квартира:
                  input(type="text" v-model="adressData.appt")
                .v-checkout__delivery-field-require
                  span.star &nbsp;*&nbsp;
                  | - поля обязательные для заполнения

              .v-checkout__delivery-wrapper-manager
                .v-checkout__delivery-form-group--textarea
                  label(for="textarea") Дополнительная информация:
                  textarea(id="textarea" rows="6" cols="51" v-model="comment")
                .v-checkout__delivery-form-group--manager
                  label 
                    p Введите номер персонального менеджера:
                    input(type="text" palceholder="номер менеджера" v-model="managerNumber" ref="managernumber" @input="manageVerify")
                  span.manager-type(v-if="manager")
                    | Ваш менеджер:
                    span.manager-name &#160;{{ manager.name}} {{manager.surname}}
                  span(v-else)
                    | {{ managerError }}
                  //- .star
                  //-   span Если вы знаете номер персонального менеджера
                 
              button(type="submit" ref="deliveryFormSubmit" style="display:none;")

                //- .v-checkout__delivery-summary
                  span.v-checkout__delivery-summary-title Стоимость доставки:
                  span.v-checkout__delivery-summary-value 1000 &nbsp; &#8381; &nbsp;

        .v-checkout__wrapper.v-checkout__grid-wrapper
          .v-checkout__body-map
            .v-checkout__yandex-map
              yandexMap(
                v-if="pageReady"
                :coords="[52.403687, 39.715173]"
                style="width: 503px; height: 283px"
                zoom="4"
              )

          .v-checkout__continue
            .v-checkout__continue-wrapper
              img.v-checkout__continue-icon(:src="require('@/assets/images/icons/continue-check.svg')")
              span.v-checkout__continue-title(@click="$refs.deliveryFormSubmit.click()") Продолжить
          .v-checkout__save(@click="currentStep = 4")
            .v-checkout__save-wrapper
              span.v-checkout__save-title(@click="$refs.deliveryFormSubmit.click()") Сохранить
      .v-checkout__container(v-show="currentStep == 4")
        .arrow_back(@click="currentStep = 3")
          img.arrow_icon(:src="require('@/assets/images/icons/arrow-right-menu_checkout.svg')")
          .line-for-arrow  Назад
        .v-checkout__wrapper.final
          .v-checkout__body-order
            .v-checkout__body-order-img 
              img(src="@/assets/images/LOGO_RUS.png" title="Логотип", alt="logo")
            h3.v-checkout__order-heading Спасибо за
              span.star &nbsp;покупку
              | !
              p.order__status Ваш заказ получен!
              .order__thanks 
                span.letter Ц
                span еним 
                span.letter С
                span воих 
                span.letter К
                span лиентов
            .v-checkout__order-container
              p.v-checkout__order-description Вам отправлено сообщение на&nbsp;ваш номер телефона с&nbsp;подробной информацией о&nbsp;заказе. Статус заказа доступен в 
               nuxt-link.v-checkout__order-account(to="/account") личном кабинете
              .v-checkout__order-prop
                h4.prop-heading Номер Вашего заказа:
                p.prop-value.star {{paymentData.orderNumber}}
              .v-checkout__order-prop
                h4.prop-heading Количество позиций товаров:
                p.prop-value.font-bold {{paymentData.count}}
              .v-checkout__order-prop
                h4.prop-heading Сумма заказа:
                p.prop-value.font-bold.ruble {{paymentData.price}} &#8381;
              .v-checkout__order-controlls
                a.v-checkout__order-controlls-print(:href="paymentData.orderFile" target="_blank") Печать заказа
                nuxt-link.v-checkout__order-controlls-toshop(to="/") Вернуться в магазин
                nuxt-link.v-checkout__order-controlls-toshop-mobile(to="/") Вернуться в магазин

      //- .v-checkout__wrapper(v-show="currentStep == 4")
      //-   .v-checkout__discount
      //-     h5.v-checkout__discount-heading Товары со скидкой:
      //-     .v-checkout__discount-container
      //-       .v-checkout__discount-item
      //-         vItem(
      //-           v-for="n in additionalProducts.popularItems"
      //-           :key="n.id"
      //-           :item="n"
      //-         )

      //- .v-checkout__wrapper(v-show="currentStep == 4")
      //-   .v-checkout__discount
      //-     h5.v-checkout__discount-heading Выбор покупателей
      //-     .v-checkout__discount-container
      //-       .v-checkout__discount-item
      //-         vItem(
      //-           v-for="n in additionalProducts.salesItems"
      //-           :key="n.id"
      //-           :item="n"
      //-         )
    vCta
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { required, minLength, alpha, helpers, numeric } from 'vuelidate/lib/validators'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import vBreadcrumbs from '@/components/breadcrumbs'
import vCta from '@/components/cta'
import vItem from '@/components/Item'
import { maska } from 'maska'
import { values } from '~/api/data/smallCatalog'

export default {
  name: 'Checkout',
  components: {
    yandexMap,
    ymapMarker,
    vBreadcrumbs,
    vCta,
    vItem
  },
  data: () => ({
    breadcrumbs: [
      {
        text: 'Главная',
        link: "/"
      },
      {
        text: 'Корзина',
        link: "/cart"
      },
      {
        text: "Оформление заказа"
      }
    ],
    personType: 'individual',
    currentStep: 2,
    pageReady: false,
    complete: false,
    item: {
      image: 'item-1.png',
      title: 'Металлочерепица ГрандЛайн Modern PE(0,45)',
      clubCost: 303,
      cost: 305,
      unit: 'м2',
      article: '62966'
    },

    physicalUser: {
      name: '',
      lastname: '',
      phone: '',
      agree: false,
      payment: 'cash'
    },
    legalUser: {
      name: '',
      lastname: '',
      organisation: '',
      phone: '',
      ownership: '',
      ur_actualAddress: '',
      okpo: '',
      ur_address: '',
      bik: '',
      bank: '',
      account_number: '',
      ur_corScore: '',
      inn: '',
      kpp: '',
      director: '',
      agree: false,
      payment: 'cash'
    },
    adressData: {
      city: '',
      street: '',
      house: '',
      building: '',
      appt: '',
      managerNumber: '',
    },
    comment: '',
    payment: 'cash',
    manager: null,
    managerError: '',

    fieldsHasValue: {
      name: false,
      lastname: false,
      phone: false,
      organisation: false,
      ownership: false,
      ur_actualAddress: false,
      ur_address: false,
      okpo: false,
      bik: false,
      bank: false,
      account_number: false,
      ur_corScore: false,
      inn: false,
      kpp: false,
      director: false
    }
  }),

  validations: {
    physData: {
      physicalPhone: {required, minLength: minLength(12)},
      physicalAgree: {
        checked: v => v
      }
    },
    legalData: {
      legalOrganisation: {required},
      legalName: {required},
      legalLastname: {required},
      legalPhone: {required, minLength: minLength(12)},
      legalOwnership: {required},
      legalActualAddress: {required},
      legalAdresse: {required},
      legalBik: {required},
      legalCorScore: {required},
      legalInn: {required},
      legalAgree: {
        checked: v => v
      }
    },
    adressData: {
      city: {required},
      street: {required},
      house: {required}
    }
  },

  directives: { maska },
  created() {
    if (this.USER !== null ) {
      this.fieldsHasValue.name = !!this.USER.name
      this.fieldsHasValue.lastname = !!this.USER.lastname
      this.fieldsHasValue.phone = !!this.USER.phone
      this.fieldsHasValue.organisation = !!this.USER.organisation
      this.fieldsHasValue.ownership = !!this.USER.ownership
      this.fieldsHasValue.ur_actualAddress = !!this.USER.ur_actualAddress
      this.fieldsHasValue.ur_address = !!this.USER.ur_address
      this.fieldsHasValue.okpo = !!this.USER.okpo
      this.fieldsHasValue.bik = !!this.USER.bik
      this.fieldsHasValue.bank = !!this.USER.bank
      this.fieldsHasValue.account_number = !!this.USER.account_number
      this.fieldsHasValue.ur_corScore = !!this.USER.ur_corScore
      this.fieldsHasValue.inn = !!this.USER.inn
      this.fieldsHasValue.kpp = !!this.USER.kpp
      this.fieldsHasValue.director = !!this.USER.director

      this.physicalUser.name = this.USER.name
      this.physicalUser.lastname = this.USER.lastname
      this.physicalUser.phone = this.USER.phone
      this.legalUser.name = this.USER.name
      this.legalUser.lastname = this.USER.lastname
      this.legalUser.phone = this.USER.phone
      this.legalUser.organisation = this.USER.organisation
      this.legalUser.ownership = this.USER.ownership
      this.legalUser.ur_actualAddress = this.USER.ur_actualAddress
      this.legalUser.ur_address = this.USER.ur_address
      this.legalUser.okpo = this.USER.okpo
      this.legalUser.bik = this.USER.bik
      this.legalUser.bank = this.USER.bank
      this.legalUser.account_number = this.USER.account_number
      this.legalUser.ur_corScore = this.USER.ur_corScore
      this.legalUser.inn = this.USER.inn
      this.legalUser.kpp = this.USER.kpp
      this.legalUser.director = this.USER.director
    }
  },
  computed: {
    ...mapGetters({
      cartProducts: 'cart/GET_PRODUCTS_FROM_CART',
      additionalProducts: 'product/GET_ADDITIONAL_PRODUCTS',
      paymentData: 'payment/GET_PAYMENT',
      USER: 'user/GET_USER',
    }),
    physData() {
      return {
        physicalFirstname: this.physicalUser.name,
        physicalLastname: this.physicalUser.lastname,
        physicalPhone: this.physicalUser.phone,
        physicalAgree: this.physicalUser.agree
      }
    },

    legalData() {
      return {
        legalName: this.legalUser.name,
        legalLastname: this.legalUser.lastname,
        legalOrganisation: this.legalUser.organisation,
        legalPhone: this.legalUser.phone,
        legalOwnership: this.legalUser.ownership,
        legalActualAddress: this.legalUser.ur_actualAddress,
        legalAdresse: this.legalUser.ur_address,
        legalOkpo: this.legalUser.okpo,
        legalBik: this.legalUser.bik,
        legalBank: this.legalUser.bank,
        legalScore: this.legalUser.account_number,
        legalCorScore: this.legalUser.ur_corScore,
        legalInn: this.legalUser.inn,
        legalKpp: this.legalUser.kpp,
        legalDirector: this.legalUser.director,
        legalAgree: this.legalUser.agree
      }
    },

    deliveryData() {
      return {
        city: this.adressData.city,
        street: this.adressData.street,
        house: this.adressData.house,
        building: this.adressData.building,
        appt: this.adressData.appt,
        manager: this.adressData.managerNumber
      }
    },

    physName: {
      get() {
        return this.physicalUser.name
      },

      set(name){
        name = name.replace(/\d/g, '')
        this.$refs.physname.value = name
        this.physicalUser.name = name
      }
    },

    physLastname: {
      get() {
        return this.physicalUser.lastname
      },

      set(lastname) {
        lastname = lastname.replace(/\d/g, '')
        this.$refs.lastname.value = lastname
        this.physicalUser.lastname = lastname
      },
    },

    physicalPhone: {
      get() {
        return this.physicalUser.phone
      },
      set(phone) {
        this.$refs.phone.value = phone
        this.physicalUser.phone = phone
      }
    },

    physicalAgree: {
      get() {
        return this.physicalUser.agree
      },

      set(agree) {
        this.physicalUser.agree = agree
      }
    },

    legalName: {
      get() {
        return this.legalUser.name
      },

      set(legalname) {
        legalname = legalname.replace(/\d/g, '')
        this.$refs.legalname.value = legalname
        this.legalUser.name = legalname
      }
    },

    legalLastname: {
      get() {
        return this.legalUser.lastname
      },

      set(legalLastname) {
        legalLastname = legalLastname.replace(/\d/g, '')
        this.$refs.legallastname.value = legalLastname
        this.legalUser.lastname = legalLastname
      }
    },

    legalOrganisation: {
      get() {
        return this.legalUser.organisation
      },

      set(organisation) {
        organisation = organisation.replace(/\d/g, '')
        this.$refs.legalorganisation.value = organisation
        this.legalUser.organisation = organisation
      }
    },

    legalPhone: {
      get() {
        return this.legalUser.phone
      },

      set(phone) {
        this.$refs.legalphone.value = phone
        this.legalUser.phone = phone
      }
    },

    legalOwnership: {
      get() {
        return this.legalUser.ownership
      },
      set(ownership) {
        ownership = ownership.replace(/\d/g, '')
        this.$refs.legalownership.value = ownership
        this.legalUser.ownership = ownership
      }
    },

    legalActualAddress: {
      get() {
        return this.legalUser.ur_actualAddress
      },
      set(address) {
        this.$refs.legalactualaddress.value = address
        this.legalUser.ur_actualAddress = address
      }
    },

    legalOkpo: {
      get() {
        return this.legalUser.okpo
      },

      set(okpo) {
        okpo = okpo.replace(/\D/g, '')
        this.$refs.legalokpo.value = okpo
        this.legalUser.okpo = okpo
      }
    },

    legalAdresse: {
      get() {
        return this.legalUser.ur_address
      },

      set(adresse) {
        this.$refs.legaladresse.value = adresse
        this.legalUser.ur_address = adresse
      }
    },

    legalBik: {
      get() {
        return this.legalUser.bik
      },

      set(bik) {
        bik = bik.replace(/\D/g, '')
        this.$refs.legalbik.value = bik
        this.legalUser.bik = bik
      }
    },

    legalBank: {
      get() {
        return this.legalUser.bank
      },

      set(bank) {
        bank = bank.replace(/\d/g, '')
        this.$refs.legalbank.value = bank
        this.legalUser.bank = bank
      }
    },

    legalScore: {
      get() {
        return this.legalUser.account_number
      },

      set(score) {
        score = score.replace(/\D/g, '')
        this.$refs.legalscore.value = score
        this.legalUser.account_number = score
      }
    },

    legalCoreScore: {
      get() {
        return this.legalUser.ur_corScore
      },
      set(score) {
        score = score.replace(/\D/g, '')
        this.$refs.legalcorscore.value = score
        this.legalUser.ur_corScore = score
      }
    },
    legalInn: {
      get() {
        return this.legalUser.inn
      },

      set(innNumber) {
        innNumber = innNumber.replace(/\D/g, '')
        this.$refs.legalinn.value = innNumber
        this.legalUser.inn = innNumber
      }
    },

    legalKpp: {
      get() {
        return this.legalUser.kpp
      },

      set(kppNumber) {
        kppNumber = kppNumber.replace(/\D/g, '')
        this.$refs.legalkpp.value = kppNumber
        this.legalUser.kpp = kppNumber
      }
    },

    legalDirector: {
      get() {
        return this.legalUser.director
      },

      set(fio) {
        fio = fio.replace(/\d/g,'')
        this.$refs.legaldirector.value = fio
        this.legalUser.director = fio
      }
    },

    legalAgree: {
      get() {
        return this.legalUser.agree
      },

      set(agree) {
        this.legalUser.agree = agree
      }
    },

    paymentType: {
      get() {
        return this.payment
      },

      set(payment) {
        this.payment = payment
      }
    },

    managerNumber: {
      get() {
        return this.adressData.managerNumber
      },
      set(number) {
        number = number.replace(/\D/g, '')
        this.$refs.managernumber.value = number
        this.adressData.managerNumber = number
      }
    }
  },

  methods:{
    ...mapActions({
      sendUserData: 'payment/getDeliveryResponse',
      clearCart: 'cart/clearCart',
      verifyManager: 'orders/verifyManager'
    }),
    changeStep(numberStep){
      if(numberStep < this.currentStep){
        this.currentStep = numberStep
      }
    },

    gotoDelivery() {
      let personDataKey

      if(this.personType === 'individual') {
        personDataKey = 'physData'
        if(this.$v[personDataKey].$invalid) {
          this.$v[personDataKey].$touch()
          return
        }
        this.currentStep = 3
      }

      if(this.personType === 'legal') {
        personDataKey = 'legalData'
        if(this.$v[personDataKey].$invalid) {
          this.$v[personDataKey].$touch()
          return
        }
        this.currentStep = 3
      }
    },

    sendDataUser() {
      let userData
      switch (this.personType) {
        case 'individual':
          userData = this.physicalUser
          break;

        case 'legal':
          userData = this.legalUser
          break;
      }
      userData.userType = this.personType
      userData.products = this.cartProducts.map(product => ({
        article: product.article,
        quantity: product.counter
      }))
      userData.payment = this.payment
      userData.delivery = this.deliveryData
      userData.comment = this.comment
      userData.manager = this.adressData.managerNumber

      console.log(userData)
      this.sendUserData(userData)
      .then(success => {
        if(success) {
          this.currentStep = 4
          this.complete = true
          this.clearCart()
          this.$vToastify.success("", "Заказ успешно оформлен")
        }
        else {
          this.$vToastify.error("", "Что-то пошло не так")
        }
      })
    },

    async manageVerify(event) {
      const { value } = event.target
      if (value) {
        const data = await this.verifyManager(value)
        const { status, manager, error } = data
        if (status) {
          this.manager = manager

        } else {
          this.managerError = error
        }
      }
      
    }
  },
  mounted() {
    this.pageReady = true

    if (window.innerWidth < 481) {
      this.physicalUser.agree = true
      this.legalUser.agree = true
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/layouts/mixins.sass'
@import '@/assets/sass/checkboxStyles/checkbox.sass'

.v-checkout
  padding: 0px 45px
  @include tablets
    padding: 20px 16px
  @include phones
    padding: 0
    padding-top: 15px
  &__title
    &--mobile
      display: none
      @include tablets
        display: block
        h1
          font-family: Roboto
          font-style: normal
          font-weight: normal
          font-size: 16px
          line-height: 18px
          letter-spacing: 0.07em
          @include phones
            display: none
    @include tablets
      display: none
  &__heading
    font-size: 24px
    line-height: 28px
    letter-spacing: .07em
    @include tablets
      display: none
  &__header
    @include tablets
      display: flex
      font-size: 12px
      justify-content: space-between !important
    @include phones
      justify-content: center !important
  &__stepper
    display: flex
    @include tablets
      display: none
    &-item
      position: relative
      display: inline-block
      flex-grow: 1
      flex-shrink: 0
      padding: 12px
      text-align: center
      line-height: 16px
      font-size: 14px
      border-top: 2px solid $red
      border-bottom: 2px solid $red
      text-transform: uppercase
      letter-spacing: .07em
      background-color: #fff
      a
        text-decoration: none
        color: $text
      &:first-child
        border-top-left-radius: 3px
        border-bottom-left-radius: 3px
        border-left: 2px solid $red
      &:last-child
        border-top-right-radius: 3px
        border-bottom-right-radius: 3px
        border-right: 2px solid $red
        span::before, span::after
          display: none

      span::before
        content: ''
        display: block
        width: 0px
        height: 0px
        border-top: 21px solid transparent
        border-bottom: 21px solid transparent
        border-left: 21px solid $red
        position: absolute
        bottom: 0
        top: 50%
        margin-top: -21px
        left: 100%
        z-index: 2
      span::after
        content: ''
        display: block
        width: 0px
        height: 0px
        border-top: 20px solid transparent
        border-bottom: 20px solid transparent
        border-left: 20px solid white
        position: absolute
        bottom: 0
        top: 50%
        margin-top: -20px
        margin-left: -2px
        left: 100%
        z-index: 2

    .stepperActive
      font-weight: 700
      background-color: white
      cursor: default
      span::after
        border-left-color: white

    .stepperDisabled
      a
        color: $gray-4
        cursor: default
        pointer-events: none
      color: $gray-4
      background-color: $gray-6
      text-decoration: none
      cursor: default
      span::after
        border-left-color: $gray-6

  &__body
    background-color: $gray-1
    border: 3px solid $gray-4
    padding: 30px 50px 30px 80px
    min-width: 1064px
    @media screen and (max-width: 1600px)
      min-width: unset
    @media screen and (max-width: 880px)
      padding: 30px 30px 80px
    @include tablets
      max-width: 330px
      background-color: unset
      border: unset
      padding: 20px 0
      margin: 0 auto
    @include phones
      max-width: none
      margin: 0
      padding-bottom: 0

    &-delivery
      display: flex
      align-items: center
      flex-direction: column
      background-color: $gray-1
      border: 3px solid $gray-4
      padding: 40px 11px 37px 30px
      max-width: 100%
      @include phones
        padding: 10px
        border: 2px solid $gray-4
      @media screen and(max-width: 335px)
        padding: 5px
    &-map
      margin-top: 50px
      margin-left: 20px
      padding: 12px
      background-color: $gray-1
      border: 3px solid $gray-4
      margin-bottom: 20px
      @media screen and(max-width: 801px)
        display: none
    &-order
      display: flex
      flex-direction: column
      align-items: center
      padding: 30px 50px
      background-color: $gray-1
      border: 3px solid $gray-4
      max-width: 1011px
      // width: 88.9vw
      &-img
        width: 96px
        position: relative
        left: -203px
        top: -12px
        @include phones
          position: static
          width: auto
        img
          position: absolute
          @include phones
            position: static


      @include phones
        padding: 10px
        border: 2px solid $gray-4
      .order__status
        font-size: 16px
      .order__thanks
        .letter
          color: $red

  &__delivery-form-group--textarea
    display: flex
    flex-direction: column

    label
      font-size: 14px
      letter-spacing: .07em
    textarea
      font-size: 14px
      border: 2px solid $gray-7
      margin-top: 8px
      resize: none
      @include phones
      width: 100%

  &__grid-wrapper

    @media screen and (max-width: 1600px)
      // margin-top: 20px
    @media screen and (max-width: 1400px)
      grid-template-rows: 70% 40%
    @include tablets
      display: flex
      justify-content: center
      flex-direction: column
      margin-top: 10px
  &__title
    font-size: 18px
    font-weight: 700
    letter-spacing: .07em

  &__form
    display: flex
    flex-direction: column
    margin-top: 30px
    & input
      height: 46px
      max-width: 200px
      border: 2px solid $gray-7
      @include phones
        max-width: none
  &__input-group
    display: flex
    align-items: center
    justify-content: space-between
    margin-top: 13px
    flex-wrap: wrap
    height: 53px
    @include tablets
      display: flex
      margin-bottom: 40px
    @include phones
      margin-bottom: 10px
      margin-top: 0
    // &:last-of-type
    //  margin-bottom: 0
    label
      margin-right: 16px
      cursor: pointer
      font-size: 14px
      @include phones
        margin-right: 0
      &:hover ~ input
        border: 2px solid #3d3d3d
        transition: all .1s ease
    input
      font-size: calc(10px + (14 - 10) * ((100vw - 320px) / (1920 - 320)))
      font-weight: 700
      letter-spacing: .07em
      text-align: center
      transition: all .1s ease
      @include tablets
        background: #FFFFFF
        border: 2px solid #DADADA
        box-sizing: border-box
        padding: 6px 7px
        width: 130px
        height: 25px
        margin-bottom: unset
      @include phones
        width: 100%
        font-size: 16px
    .error
      display: flex
      justify-content: flex-end
      span
        padding-right: 4px
        @include phones

    input::placeholder
      font-size: 12px


  &__checkbox-group
    display: flex
    align-items: flex-start
    max-width: 928px
    margin-bottom: 10px
    flex-wrap: wrap
    label
      font-size: 10px
      font-weight: 400
      line-height: 12px
      letter-spacing: .07em
      color: $text
      margin-left: 8px
      cursor: pointer
    input
      height: auto
    input[type="checkbox"]:checked + label:after,
    input[type="checkbox"]:not(:checked) + label:after
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
    input[type="checkbox"]:not(:checked) + label:after,
      opacity: 0
    input[type="checkbox"]:checked + label:after,
      opacity: 1
    .error
      padding-left: 30px
  &__payment-type
    display: flex
    flex-direction: column
    margin-left: 20px
    @include tablets
      margin-left: 0
    &-group
      input
        margin-right: 8px
      label
        cursor: pointer
      &:not(:last-child)
        margin-bottom: 20px

  &__payment-content
    padding: 25px 28px
    border: 3px solid $gray-4
    background-color: $gray-1
    min-width: 401px
    margin-bottom: 10px
    @include tablets
      min-width: auto
      font-size: 14px
    @include phones
      margin-bottom: 20px
      padding: 25px 28px
    @media screen and(max-width: 396px)
      padding: 25px 12px

  &__container
    display: flex
    flex-direction: row
    margin-bottom: 60px
    margin-top: 38px
    justify-content: space-between
    @media screen and (max-width: 1400px)
      flex-wrap: wrap
      justify-content: center
    @include tablets
      display: flex
      flex-direction: column
      margin-bottom: 15px
      margin-top: 0
    @include phones
      padding: 0 10px !important
    @media screen and(max-width: 350px)
      padding: 0 5px !important
  &__header
    display: flex
    justify-content: center
    margin-bottom: 60px
    @include phones
    margin-bottom: 20px
  &__save
    display: none
    @include tablets
      display: flex
      align-self: end
      text-align: center
      margin-left: 20px
      width: 100%
      height: 40px
      cursor: pointer
      justify-self: end
    @include phones
      justify-content: center
      margin-left: 0
      &-wrapper
        display: flex
        align-items: center
        background-color: $red
        color: white

      &-title
        padding: 11px 36px
        font-size: 16px
        font-weight: 700
        line-height: 18px
        text-transform: uppercase
  &__continue
    display: flex
    align-self: end
    margin-left: 20px
    width: 211px
    height: 40px
    cursor: pointer
    justify-self: end
    @include tablets
      display: none
    &-wrapper
      display: flex
      align-items: center
      background-color: $red
      color: white
    &-title
      padding: 11px 36px
      font-size: 16px
      font-weight: 700
      line-height: 18px
      text-transform: uppercase
    &-icon
      padding: 11px 7px
      border-right: 3px solid white

  &__delivery
    &-description
      font-size: 12px
      line-height: 14px
      letter-spacing: .07em
      margin-bottom: 37px
    &-form-group
      display: flex
      align-items: center
      max-width: 400px
      justify-content: space-between
      &:not(:last-child)
        margin-bottom: 10px
      label
        font-size: 14px
        line-height: 16px
        letter-spacing: .07em
        margin-right: 16px
        @include phones
          margin-right: 10px
      input
        height: 16px
        padding: 15px 0px
        @media screen and(max-width:374px)
          width: 180px
      input
        border: 2px solid $gray-7
        text-align: center

    &-summary
      margin-top: 15px
      padding: 14px
      background-color: white
      border: 2px solid $yellow
      display: flex
      flex-direction: row
      justify-content: center
      @include phones
        padding: 5px
      &-title, &-value
        display: inline-block
        font-size: 16px
        font-weight: 700
        line-height: 14px
        text-transform: uppercase
        @include phones
          font-size: 14px
      &-title
        margin-right: 8px

      &-value
        color: $red

    &-field-require
      margin-top: 30px
      margin-bottom: 20px
      @include phones
        margin-top: 10px
        margin-bottom: 10px

  &__order
    &-heading
      margin-top: 0px
      margin-bottom: 30px
      font-size: 18px
      font-weight: 700
      letter-spacing: .07em
      line-height: 21px
      text-align: center
      @include phones
        font-size: 14px
    &-container
      max-width: 905px
    &-description
      font-size: 14px
      line-height: 16px
      letter-spacing: .07em
      color: $text
    &-account
      color: $red
      text-decoration: none
    &-prop
      display: flex
      align-items: center
      justify-content: space-between
      .prop-heading, .prop-value
        letter-spacing: .07em
        @include phones
          font-size: 14px

    &-controlls
      display: flex
      justify-content: center
      margin-top: 10px
      &-print, &-toshop
        width: 250px
        display: block
        padding: 14px 0px
        text-align: center
        line-height: 19px
        font-weight: 700
        color: $text
        text-transform: uppercase
        cursor: pointer
        text-decoration: none
        @include phones
          width: 40%
          font-size: 12px
          padding: 5px 0px
          display: flex
          align-items: center
          justify-content: center
      &-print
        background-color: $red
        color: #fff
        text-decoration: none
        @include phones
          display: none
      &-toshop
        border: 2px solid $red
        background-color: white
        @include phones
          display: none
        &-mobile
          display: none
          @include phones
            display: flex
            border: 2px solid $red
            background-color: white
            color: $text
            text-decoration: none
            text-transform: uppercase
            justify-content: center
            align-items: center
            font-size: 12px
            padding: 0 5px

  &__discount
    padding: 15px
    background-color: $gray-1
    border: 2px solid $gray-4
    margin-bottom: 30px
    @include phones
      display: none
    &-heading
      margin-top: 0px
      margin-bottom: 20px
      font-size: 18px
      letter-spacing: .07em
      text-transform: uppercase
      color: $text
      text-indent: 15px
      margin-top: 20px

    &-container
      display: flex
      justify-content: center
      .v-checkout__discount-item
        display: flex


#individual-person, #legal-person
  margin-right: 6px

#legal-person
  margin-left: 36px

.form-legal
  display: grid
  grid-template-columns: 1fr 1fr
  grid-tempalte-rows: repeat(7, 1fr)
  grid-gap: 168px
  @include tablets
    display: flex
    flex-wrap: wrap
    justify-content: center
    grid-gap: unset

.form-delivery
  display: flex
  flex-wrap: wrap
  justify-content: space-around
  width: 100%
.form-idv
  margin: 0 auto
  justify-content: center

  .v-checkout__checkbox-group:nth-child(4)
    margin-top: 46px
    @include phones
      margin-top: 0
.font-bold
  font-weight: 700

.v-checkout__delivery-wrapper
  margin-left: 5px

.arrow_back
  cursor: pointer
  width: 25px
  margin-left: 20px
  margin-bottom: 15px
  margin-right: 15px
  text-decoration: none
  display: none
  @include phones
    display: flex
  img
    transform: rotate(0deg)
  .line-for-arrow
    display: none

    @include phones
      display: flex
      color: black
      margin-left: 10px
      align-items: center
.arrow_icon
  display: none
  @include phones
    display: block
    width: 100%
    transform: rotate(180deg)

.v-checkout__wrapper.final
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  @include phones
    margin-top: 30px
  .v-checkout__body-order
    width: 635px
    @include phones
      width: auto
.v-checkout__checkbox-group > input[type="checkbox"]
  position: absolute
  left: -9999px
#v-checkout > div.v-checkout > div:nth-child(6) > div:nth-child(2) > div > form.v-checkout__form.form-idv > div:nth-child(4) > label,
#v-checkout > div.v-checkout > div:nth-child(6) > div:nth-child(2) > div > form.v-checkout__form.form-idv > div:nth-child(5) > label,
#v-checkout > div.v-checkout > div:nth-child(6) > div:nth-child(2) > div > form.v-checkout__form.form-legal > div:nth-child(2) > div:nth-child(6) > label,
#v-checkout > div.v-checkout > div:nth-child(6) > div:nth-child(2) > div > form.v-checkout__form.form-legal > div:nth-child(2) > div:nth-child(7) > label
  margin-left: 4px !important
  padding-top: 2px
p.prop-value.star
  font-weight: bold
span.star
  color: $red
.error
  font-size: 12px
  color: #757575
  width: 100%
  span
    font-weight: 300 !important

.v-checkout__checkbox-group.ind
  height: 55px !important
// .v-checkout__checkbox-group label
//   font-size: 12px

#v-checkout > div.v-checkout > div:nth-child(6)
  padding: 0 50px
  @include phones
    padding: 0

#idv-name, #idv-lastname, #idv-phone
  @include phones
    width: 160px

#v-checkout > div.v-checkout > div.v-checkout__container.third > div:nth-child(2) > div > form > div.v-checkout__delivery-wrapper-manager > div.v-checkout__delivery-form-group--manager > label > input
  width: 100%
  
.v-checkout__delivery-form-group--manager
  margin: 10px 0
  label
    font-size: 14px
    input
      margin: 8px 0
      height: 16px
      border: 2px solid #dadada
      height: 16px
      padding: 15px 0px
      text-align: center

#v-checkout > div.v-checkout > div.v-checkout__container.third > div:nth-child(2) > div > form > div.v-checkout__delivery-wrapper-manager
  max-width: 432px
.manager-type
  font-size: 14px
  .manager-name
    color: $red
</style>
