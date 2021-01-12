<template lang="pug">
  form.v-profile__container__form(@submit.prevent="saveProfileHandler")
    h2.v-profile__container__form__header Мой профиль:
    .v-profile__container__form__choose
      h3 Выбор профиля:
      .v-profile__container__form__choose__block
        .v-profile__container__form__choose__block__radio
          input#physpeople(type="radio" name="persons" value="phys" v-model="personType" checked)
          label(for="physpeople") Физическое лицо
        .v-profile__container__form__choose__block__radio
          input#urpeople(type="radio" name="persons" value="ur" v-model="personType")
          label(for="urpeople") Юридическое лицо
    .v-profile__container__form__content.phys(v-if=" personType == 'phys' ")
      .v-profile__container__form__content__block-phys
        .v-profile__container__form__content__block-phys__row
          .v-profile__container__form__content__block-phys__row-def Имя:
            span *
          input.v-profile__container__form__content__block-phys__row-put(
            v-model="physName"
            ref="physname"
            required
            placeholder="Имя")
        .v-profile__container__form__content__block-phys__row
          .v-profile__container__form__content__block-phys__row-def Фамилия:
            span *
          input.v-profile__container__form__content__block-phys__row-put(
            v-model="physLastname"
            ref="physlastname"
            required
            placeholder="Фамилия")
        .v-profile__container__form__content__block-phys__row
          .v-profile__container__form__content__block-phys__row-def Основной телефон:
            span *
          input.v-profile__container__form__content__block-phys__row-put(
            type="phone"
            placeholder="+7 (___) ___-__-__"
            v-model="profilePhone"
            ref="profilephone"
            v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
            required
            :readonly="fieldsHasValue.phone"
          )
        .v-profile__container__form__content__block-phys__row
          .v-profile__container__form__content__block-phys__row-def Электронная почта:
          input.v-profile__container__form__content__block-phys__row-put(
            type="email"
            placeholder="адрес почты"
            v-model="profileUserMail"
            ref="profileuseremail"
          )
        .v-profile__container__form__content__block-phys__row
          .v-profile__container__form__content__block-phys__row-def Дата рождения:
          input.v-profile__container__form__content__block-phys__row-put.birthday(
            type="date"
            placeholder="дата рождения"
            v-model="profileBirthday"
            ref="profilebirthday"
          )
      .v-profile__container__form__content__block-phys-foot
        span.v-profile__container__form__content__block-phys-foot-star *
          span  - поля обязательные для заполнения
        .v-profile__container__form__content__block-ur__row__btn
          img.v-profile__container__form__content__block-ur__row__btn-icon(:src="require('@/assets/images/icons/continue-check.svg')")
          button(type="submit").v-profile__container__form__content__block-ur__row__btn-title Сохранить
    .v-profile__container__form__content(v-if=" personType == 'ur' ")
      .v-profile__container__form__content__block-ur
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Имя:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            placeholder="Имя"
            v-model="legalName"
            ref="legalname"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Фамилия:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            placeholder="Фамилия"
            v-model="legalLastname"
            ref="legallastname"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Название организации:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text" 
            placeholder="организация" 
            v-model="legalOrganisation" 
            ref="legalorganisation"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Форма собственности:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            placeholder="форма собственности"
            v-model="legalOwnership"
            ref="legalownership"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Фактический адрес:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            placeholder="фактический адрес"
            v-model="legalActualAddress"
            ref="legalactualaddress"
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Юридический адрес:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            placeholder="действующий адрес"
            v-model="legalAdress"
            ref="legaladress"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def БИК:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalBik"
            ref="legalbik"
            placeholder="012345678"
            maxlength="9"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Корреспонденсткий счет:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalCorScore"
            ref="legalcorscore"
            placeholder="номер счета"
            maxlength="20"
            required
          )
      .v-profile__container__form__content__block-ur
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Наименование банка:
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalBank"
            ref="legalbank"
            placeholder="Наименование банка"
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Расчетный счет:
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalScore"
            ref="legalscore"
            placeholder="расчетный счет"
            maxlength="20"
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def ИНН:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalInn"
            ref="legalinn"
            placeholder="номер ИНН"
            maxlength="10"
            required
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def КПП:
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalKpp"
            ref="legalkpp"
            placeholder="номер КПП"
            maxlength="9"
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Генеральный директор:
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalDirector"
            ref="legaldirector"
            placeholder="ФИО"
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def ОКПО:
          input.v-profile__container__form__content__block-ur__row-put(
            type="text"
            v-model="legalOkpo"
            ref="legalokpo"
            placeholder="12345678"
            maxlength="8"
          )
        .v-profile__container__form__content__block-ur__row
          .v-profile__container__form__content__block-ur__row-def Основной телефон:
            span *
          input.v-profile__container__form__content__block-ur__row-put(
            type="phone"
            placeholder="+7 (___) ___-__-__"
            v-model="legalPhone"
            ref="legalphone"
            v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
            required
            :readonly="fieldsHasValue.phone"
          )

        .v-profile__container__form__content__block-ur__row.last
          span.v-profile__container__form__content__block-ur__row-star *
            span  - поля обязательные для заполнения
          .v-profile__container__form__content__block-ur__row__btn
            img.v-profile__container__form__content__block-ur__row__btn-icon(:src="require('@/assets/images/icons/continue-check.svg')")
            button(type="submit").v-profile__container__form__content__block-ur__row__btn-title Сохранить

</template>

<script>
import { maska } from 'maska'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: "profile",
  data:()=>({
    personType: 'phys',
    physicalUser: {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      birthday: ''
    },
    legalUser: {
      name: '',
      lastname: '',
      organisation: '',
      ownership: '',
      actualAddress: '',
      ur_corScore: '',
      ur_address: '',
      bik: '',
      bank: '',
      account_number: '',
      inn: '',
      kpp: '',
      director: '',
      okpo: '',
      phone: '',
    },

    fieldsHasValue: {
      name: false,
      lastname: false,
      phone: false,
      email: false,
      birthday: false,
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

  directives: { maska },
  created() {
    if (this.USER !== null ) {
      this.fieldsHasValue.name = !!this.USER.name
      this.fieldsHasValue.lastname = !!this.USER.lastname
      this.fieldsHasValue.phone = !!this.USER.phone
      this.fieldsHasValue.email = !!this.USER.email
      this.fieldsHasValue.birthday = !!this.USER.birthday
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
      this.physicalUser.email = this.USER.email
      this.physicalUser.birthday = this.USER.birthday

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
      USER: 'user/GET_USER'
    }),

    physData() {
      return {
        physicalFirstname: this.physicalUser.name,
        physicalLastname: this.physicalUser.lastname,
        physicalPhone: this.physicalUser.phone,
        physicalMail: this.physicalUser.email,
        physicalBirthday: this.physicalUser.birthday
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
        legalDirector: this.legalUser.director
      }
    },

    physName: {
      get() {
        return this.USER.name
      },
      set(name) {
        name = name.replace(/\d/g, '')
        this.$refs.physname.value = name
        this.updateField('name', name)
      }
    },
    physLastname: {
      get() {
        return this.USER.lastname
      },
      set(lastname) {
        name = name.replace(/\d/g, '')
        this.$refs.physlastname.value = lastname
        this.updateField('lastname', lastname)
      }
    },
    profilePhone: {
      get() {
        return this.USER.phone
      },
      set(phone) {
        this.$refs.profilephone.value = phone
        this.physicalUser.phone = phone
      }
    },
    profileUserMail: {
      get() {
        return this.USER.email
      },
      set(email) {
        this.$refs.profileuseremail.value = email
        this.physicalUser.email = email
        this.updateField('email', email)
      }
    },
    profileBirthday: {
      get() {
        const { birthday } = this.USER
        const date = birthday ? new Date(birthday) : null
        if(date && date.constructor === Date) return `${date.toISOString().slice(0,10)}`
        else return ""
      },
      set(date) {
        const dateObj = this.$refs.profilebirthday.valueAsDate
        // this.$refs.profilebirthday.value = dateObj
        this.physicalUser.birthday = dateObj
        this.updateField('birthday', dateObj)
      }
    },

    legalName: {
      get() {
        return this.USER.name
      },
      set(name) {
        name = name.replace(/\d/g, '')
        this.$refs.legalname.value = name
        this.updateField('name', name)
      }
    },
    legalLastname: {
      get() {
        return this.USER.lastname
      },
      set(lastname) {
        name = name.replace(/\d/g, '')
        this.$refs.legallastname.value = lastname
        this.updateField('lastname', lastname)
      }
    },
    legalOrganisation: {
      get() {
        return this.USER.organisation
      },
      set(organisation) {
        organisation = organisation.replace(/\d/g, '')
        this.$refs.legalorganisation.value = organisation
        this.updateField('organisation', organisation)
      }
    },
    legalOwnership: {
      get() {
        return this.USER.ownership
      },
      set(ownership) {
        ownership = ownership.replace(/\d/g, '')
        this.$refs.legalownership.value = ownership
        this.updateField('ownership', ownership)
      }
    },
    legalActualAddress: {
      get() {
        return this.USER.ur_actualAddress
      },
      set(address) {
        this.$refs.legalactualaddress.value = address
        this.updateField('ur_actualAddress', address)
      }
    },

    legalCorScore: {
      get() {
        return this.USER.ur_corScore
      },
      set(score) {
        score = score.replace(/\D/g, '')
        this.$refs.legalcorscore.value = score
        this.updateField('ur_corScore', score)
      }
    },
    legalAdress: {
      get() {
        return this.USER.ur_address
      },
      set(address) {
        this.$refs.legaladress.value = address
        this.updateField('ur_address', address)
      }
    },
    legalBik: {
      get() {
        return this.USER.bik
      },
      set(bik) {
        bik = bik.replace(/\D/g, '')
        this.$refs.legalbik.value = bik
        this.updateField('bik', bik)
      }
    },
    legalBank: {
      get() {
        return this.USER.bank
      },
      set(bank) {
        bank = bank.replace(/\d/g, '')
        this.$refs.legalbank.value = bank
        this.updateField('bank', bank)
      }
    },
    legalScore: {
      get() {
        return this.USER.account_number
      },
      set(score) {
        score = score.replace(/\D/g, '')
        this.$refs.legalscore.value = score
        this.updateField('account_number', score)
      }
    },
    legalInn: {
      get() {
        return this.USER.inn
      },
      set(inn) {
        inn = inn.replace(/\D/g, '')
        this.$refs.legalinn.value = inn
        this.updateField('inn', inn)
      }
    },
    legalKpp: {
      get() {
        return this.USER.kpp
      },
      set(kpp) {
        kpp = kpp.replace(/\D/g, '')
        this.$refs.legalkpp.value = kpp
        this.updateField('kpp', kpp)
      }
    },
    legalDirector: {
      get() {
        return this.USER.director
      },
      set(director) {
        director = director.replace(/\d/g, '')
        this.$refs.legaldirector.value = director
        this.updateField('director', director)
      }
    },
    legalOkpo: {
      get() {
        return this.USER.okpo
      },
      set(okpo) {
        okpo = okpo.replace(/\D/g, '')
        this.$refs.legalokpo.value = okpo
        this.updateField('okpo', okpo)
      }
    },
    legalPhone: {
      get() {
        return this.USER.phone
      },
      set(phone) {
        this.$refs.legalphone.value = phone
        this.legalUser.phone = phone
      }
    }
  },
  methods: {
    ...mapMutations({
      updateUserField: "user/UPDATE_USER_FIELD"
    }),
    ...mapActions({
      updateUserRequest: "user/updateUserRequest"
    }),

    updateField(key, value) {
      this.updateUserField({ key, value })
    },

    saveProfileHandler() {
      const { USER } = this

      let userData = {
        name: USER.name,
        lastname: USER.lastname,
        phone: USER.phone
      }
      switch (this.personType) {
        case 'phys':
          userData = {
            ...userData,
            email: USER.email,
            birthday: USER.birthday
          }
          break;

        case 'ur':
          userData = {
            ...userData,
            account_number: USER.account_number,
            actualAddress: USER.actualAddress,
            bank: USER.bank,
            bik: USER.bik,
            director: USER.director,
            inn: USER.inn,
            kpp: USER.kpp,
            okpo: USER.okpo,
            organisation: USER.organisation,
            ownership: USER.ownership,
            ur_actualAddress: USER.ur_actualAddress,
            ur_address: USER.ur_address,
            ur_corScore: USER.ur_corScore
          }
          break;
      }
      this.updateUserRequest(userData)
      .then(status => {
        if (status) this.$vToastify.success('', "Данные успешно обновленны")
        else this.$vToastify.error('', 'При сохранении произошла ошибка')
      })
    }
  }
}
</script>
<style lang="sass">
@import '@/layouts/mixins.sass'

.v-profile__container__form
  padding: 20px
  box-sizing: border-box
  @include phones
    padding: 15px
  @media screen and(max-width: 370px)
    padding: 0
  &__header
    margin: 0
    font-size: 20px
    margin-bottom: 20px
    @include phones
      display: none
  &__choose
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 15px
    width: 70%
    @include phones
      width: 100%
    &__block
      display: flex
      width: 50%
      justify-content: space-between
      @include phones
        width: 100%
      &__radio
        @include phones
        input
          margin-right: 5px
        label
          @include phones
            font-size: 14px
            width: 100%

    h3
      margin: 0
      font-size: 16px
      @include phones
        display: none
  &__content.phys
    display: block
  &__content
    display: flex
    justify-content: space-between
    @include phones
      flex-direction: column
    &__block-phys
      width: 50%
      margin-bottom: 142px
      @include phones
        width: inherit
      &__row:last-child
        margin-bottom: 0
      &__row
        display: flex
        justify-content: space-between
        margin-bottom: 15px
        align-items: center
        &-put
          height: 46px
          border: 2px solid #DADADA
          text-align: center
          border-radius: 0
          -webkit-appearance: none
          @include phones
            height: 25px
            font-size: 14px
          @media screen and(max-width: 340px)
            width: 170px
        &-put::placeholder
          @include phones
            line-height: 25px
        &-def
          font-size: 14px
          text-align: center
          @include phones
            text-align: left
          span
            color: $red
    &__block-phys-foot
      display: flex
      justify-content: space-between
      align-items: center
      @include phones
        justify-content: center
      &-star
        color: $red
        font-size: 12px
        @include phones
          display: none
        span
          color: black
    &__block-ur
      width: 45%
      @include phones
        width: inherit
      &__row:last-child
        margin-bottom: 0
        @include phones
          margin-bottom: 15px
      &__row.last
        justify-content: space-between
        @include phones
          justify-content: center
      &__row
        display: flex
        justify-content: space-between
        margin-bottom: 15px
        align-items: center
        &-star
          @include phones
            display: none
        span
          font-size: 12px
          color: $red
          span
            color: black
        &-def
          font-size: 14px
          span
            color: $red
        &-put
          height: 46px
          border: 2px solid #DADADA
          text-align: center
          -webkit-appearance: none
          border-radius: 0
          @include phones
            height: 25px
            width: 170px
            font-size: 14px
          @media screen and(max-width: 350px)
            width: 130px
        &-put::placeholder
          @include phones
            line-height: 25px
        &__btn
          background-color: $red
          display: flex
          align-items: center
          cursor: pointer
          img
            padding: 11px 7px
            border-right: 3px solid white
          &-title
            color: #fff !important
            padding: 11px 36px
            font-size: 16px
            font-weight: 700
            text-transform: uppercase
            border: none
            outline: none
            background: $red
            cursor: pointer

.birthday 
  width: 217px
  @include phones
    width: 197px
  @media screen and(max-width: 340px)
    width: 170px
#v-account > div > div > div.v-account__container__content__greyback > form > div.v-profile__container__form__content > div:nth-child(2) > div:nth-child(7)
  margin-top: 20px
  @include phones
    margin-top: 0
</style>
