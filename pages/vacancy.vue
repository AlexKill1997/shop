<template lang="pug">
  #v-vacancy
    vBreadcrumbs(:breadcrumbs="breadcrumbs")

    .v-vacancy__wrapper
      .v-vacancy__menu
        img.v-vacancy__menu-image(:src="require('../assets/images/vacancy/vacancy-career.png')")
        ul.v-vacancy__menu-list
          li.v-vacancy__menu-list-item(@click="currentTab = 'work'")
            span Почему работа у нас – это лучший выбор?
            img.v-vacancy__menu-list-item-arrow(:src="require('../assets/images/vacancy/arrow-right.svg')")

          li.v-vacancy__menu-list-item(v-if="loading" @click="currentTab = 'vacancy'")
            span Вакансии
            img.v-vacancy__menu-list-item-arrow(:src="require('../assets/images/vacancy/arrow-right.svg')")

          li.v-vacancy__menu-list-item(@click="currentTab = 'talents'")
            span Мы всегда в поисках талантов
            img.v-vacancy__menu-list-item-arrow(:src="require('../assets/images/vacancy/arrow-right.svg')")

          li.v-vacancy__menu-list-item(@click="currentTab = 'hrCall'")
            span Задать вопрос HR-специалисту
            img.v-vacancy__menu-list-item-arrow(:src="require('../assets/images/vacancy/arrow-right.svg')")

        .v-vacancy__phone-block
          img.v-vacancy__phone-image(:src="require('../assets/images/icons/phone-volume.svg')")
          span.v-vacancy__phone 8 (999) 553-43-89

      div(v-if="currentTab == 'work'")
        .v-vacancy__body
          h2.v-vacancy__body-heading Почему работа у нас – это лучший выбор?
          p.v-vacancy__body-description Для решения поставленных целей и&nbsp;задач компания обладает большой слаженной командой профессионалов, которые прилагают максимум усилий и&nbsp;талантов для дальнейшего развития компании и&nbsp;выхода на&nbsp;новые рынки. Наших сотрудников всегда отличает: уверенность в&nbsp;завтрашнем дне, что актуально для настоящего времени; высокий уровень профессионализма и&nbsp;ответственности за&nbsp;принимаемые решения; и, конечно, стремление к&nbsp;саморазвитию и&nbsp;покорению всевозможных вершин.
          span.v-vacancy__body-subheading Почему работа у нас – это лучший выбор?
          ul.v-vacancy__body-list
            li.v-vacancy__body-list-item
              img.v-vacancy__body-list-image(:src="require('../assets/images/vacancy/checkmark.svg')")
              span Мы&nbsp;открыты для молодых энергичных и&nbsp;желающих построить карьеру в&nbsp;крупной компании;
            li.v-vacancy__body-list-item
              img.v-vacancy__body-list-image(:src="require('../assets/images/vacancy/checkmark.svg')")
              span Стабильность нашей компании позволяет нам строить далеко идущие планы и&nbsp;реализовывать, в&nbsp;короткие сроки, уже существующие;
            li.v-vacancy__body-list-item
              img.v-vacancy__body-list-image(:src="require('../assets/images/vacancy/checkmark.svg')")
              span У&nbsp;нас всегда только официальное трудоустройство с&nbsp;первого дня и&nbsp;своевременная выдача заработной платы;
            li.v-vacancy__body-list-item
              img.v-vacancy__body-list-image(:src="require('../assets/images/vacancy/checkmark.svg')")
              span В&nbsp;нашей компании предоставляется обучение;
            li.v-vacancy__body-list-item
              img.v-vacancy__body-list-image(:src="require('../assets/images/vacancy/checkmark.svg')")
              span Мы&nbsp;будем очень рады видеть в&nbsp;своей команде сотрудников, которые готовы расти развиваться вместе с&nbsp;нами и&nbsp;выводить на&nbsp;самые высокие уровни наш бизнес!

      div(v-if="currentTab == 'vacancy'")
        .v-vacancy__vacancies
          h2.v-vacancy__vacancies-heading Вакансии
          //- .v-vacancy__vacancies-checkbox-group
          //-   .checkbox-group
          //-     input#All(type="checkbox")
          //-     label(for="All") Все сферы
          //-   .checkbox-group
          //-     input#Sales(type="checkbox")
          //-     label(for="Sales") Продажи
          //-   .checkbox-group
          //-     input#Finances(type="checkbox")
          //-     label(for="Finances") Финансы
          //-   .checkbox-group
          //-     input#Accounting(type="checkbox")
          //-     label(for="Accounting") Бухгалтерия
          //-   .checkbox-group
          //-     input#Marketing(type="checkbox")
          //-     label(for="Marketing") Маркетинг
          //-   .checkbox-group
          //-     input#Logistics(type="checkbox")
          //-     label(for="Logistics") Логистика
          //-   .checkbox-group
          //-     input#Administration(type="checkbox")
          //-     label(for="Administration") Администрация
          //-   .checkbox-group
          //-     input#Management(type="checkbox")
          //-     label(for="Management") Управление персоналом

          .v-vacancy__vacancies-list
            .v-vacancy__vacancies-list-overlay(v-if="currentPopup != null")
            .v-vacancy__vacancies-list-item(v-for="(item, index) in vacancies")
              h3.vacancies-heading {{item.name}}
              .vacancies-body
                .vacancies-wrapper
                  p.vacancies-description
                    | Наша компания по&nbsp;продаже строительных и&nbsp;отделочных материалов приглашает в&nbsp;свою команду специалиста по&nbsp;тендерным продажам
                  .vacancies-footer
                    span.vacancies-sendResume Отправить резюме
                    .vacancies-address
                      img.vacancies-address-icon(:src="require('../assets/images/vacancy/geotag.svg')")
                      span {{item.place}}
                .vacancies-attributes
                  .vacancies-attributes-item(@mouseenter="switchPopup('responsibility'); a=index+1" @mouseleave="switchPopup(null)") Обязанности
                  .vacancies-attributes-item(@mouseenter="switchPopup('condition'); b=index+1" @mouseleave="switchPopup(null)") Требования
                  .vacancies-attributes-item(@mouseenter="switchPopup('requirement'); c=index+1" @mouseleave="switchPopup(null)") Условия
                .vacancies-type
                  img.vacancies-type-icon(:src="require('../assets/images/vacancy/hot.png')")
                  span Горящая вакансия
              .v-vacancy__vacancies-list-popup(v-if="currentPopup === 'responsibility' && item.id === a" v-for="(i,ind) in item.responsibility")
                ul(v-for="(i,ind) in item.responsibility")
                  li {{i}}
              .v-vacancy__vacancies-list-popup(v-if="currentPopup === 'condition' && item.id === b")
                ul(v-for="(i,ind) in item.condition")
                  li {{i}}
              .v-vacancy__vacancies-list-popup(v-if="currentPopup === 'requirement' && item.id === c")
                ul(v-for="(i,ind) in item.requirement")
                  li {{i}}
            button.v-vacancy__vacancies-list-button(type="submit") Показать еще


      div(v-if="currentTab == 'talents'")
        .v-vacancy__talents
          h2.v-vacancy__talents-heading Мы всегда в поисках талантов
          .v-vacancy__talents-body
            .v-vacancy__talents-wrapper
              p.v-vacancy__talents-description
                | Наша компания рада видеть в&nbsp;своей команде как настоящих профессионалов, так и&nbsp;юные таланты. Очень часто для эффективного осуществления нашей деятельности мы&nbsp;расширяем штат, открывая позиции, которые помогают нашему бизнесу стать сильнее и&nbsp;выгодно выделять нас среди конкурентов.
                | Вы&nbsp;можете отправить Ваше резюме, указав только сферу деятельности.
              span.v-vacancy__talents-resume Отправить резюме
              h5.v-vacancy__talents-subdesc Мы&nbsp;обязательно рассмотрим его и&nbsp;свяжемся с&nbsp;Вами.
            img(:src="require('../assets/images/vacancy/vacancy-talents.jpg')")

      div(v-if="currentTab == 'hrCall'")
        .v-vacancy__hrCall
          h2.v-vacancy__hrCall-heading Вопрос HR-специалисту
          .v-vacancy__hrCall-wrapper
            form.v-vacancy__hrCall-form
              .hrCall-form__input-group
                label(for="hrName") Ваше имя
                input#hrName(type="text" placeholder="Иванов Иван Иванович")

              .hrCall-form__input-group
                label(for="hrEmail") Эл. почта
                input#hrEmail(type="email" placeholder="ivan@example.com")

              .hrCall-form__input-group
                label(for="hrMsg") Ваш вопрос
                textarea#hrMsg(rows="8" cols="30")

              button.hrCall-form__submit(type="submit") Отправить вопрос
            img.v-vacancy__hrCall-image(:src="require('../assets/images/vacancy/vacancy-hr.png')")

    vCta
</template>

<script>
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vCta from '@/components/cta.vue'

export default {
  name: 'Vacancy',
  components: {
    vBreadcrumbs,
    vCta
  },
  data() {
    return {
      loading: false,
      // breadcrumbs: ['Главная', 'Вакансии'],
      currentTab: 'work',
      currentPopup: null,
      overlayOpacity: false,
      breadcrumbs: [
         {
            text: 'Главная',
            link: "/"
          },
          {
            text: 'Вакансии'
          },
      ],
      vacancies:[
          {id: 1,
          name: 'Сварщик металлоконструкций (Дорохово)',
          place: 'Московская область, п Дорохово',
          responsibility:[
            'Обслуживание строительного объекта компании',
            'Сварка и сборка металлоконструкций',
            'Работа с металлоконструкциями разных типов, в основном каркасов'
          ],
          condition:[
            'Оформление согласно ТК РФ',
            '5 дневная рабочая неделя',
            'Своевременная выплата заработной платы',
            'Место работы: Московская область, п Дорохово'
          ],
          requirement:[
            'Образование не ниже среднего специального',
            'Опыт работы по специальности не менее 2 лет',
            'Удостоверение сварщика, разряд от 3 и выше'
          ]
          },
          {id: 2,
          name: 'Менеджер по продажам (строительные материалы)',
          place: 'г. Санкт-Петербург, офис м. Чкаловская',
          responsibility:[
            'Выполнение индивидуального плана по продажам',
            'Активные продажи, поиск клиентов',
            'Работа со строительными объектами, рынками, проектными и подрядными,организациями',
            'Согласование коммерческих условий с клиентами',
            'Подготовка коммерческих предложений, ведение переговоров',
            'Развитие долгосрочных партнерских отношений с клиентами',
            'Работа с дебиторской задолженностью'
          ],
          condition:[
            'Опыт продаж строительных материалов от 2-х лет',
            'Умение работать с большим объемом информации, ответственность',
            'Наличие автомобиля',
            'Работа на результат'
          ],
          requirement:[
            'Оформление по ТК РФ',
            'График работы 5/2, с 9 до 18',
            'Зарплата- оклад+%, высокий уровень дохода',
            'Оплата ГСМ и мобильной телефонии',
            'Комфортабельный офис г. Санкт-Петербург, офис м. Чкаловская'
          ]
          },
          {id: 3,
          name: 'Водитель – экспедитор (категории С)',
          place: 'Московская область, п Дорохово',
          responsibility:[
            'ежедневная утренняя загрузка заказов складе компании (Румянцево)',
            'доставка заказов клиентам компании по Москве и Московской области;',
            'работа с документацией',
            'контроль за исправностью автомобиля',
            'контроль и участие в погрузке и разгрузке грузов, размещение его в кузове, обеспечение сохранности в пути.',
          ],
          condition:[
            'график работы: рабочая неделя 5/2 ;',
            'заработная плата 60 000 руб.',
            'оформление по ТК РФ, отпуска и больничные предоставляются;',
            'работа на автомобиле компании ISUZU, MITSUBISHI, не старше 5 лет,стоянка автомобиля в Румянцево.'
          ],
          requirement:[
            'стаж вождения от 3-х лет, права категории «С», аккуратное вождение, соблюдение ПДД;',
            'хорошее знание Москвы и Московской области;',
            'важны ответственность, исполнительность.',
            'Знание правил оформления путевой и товарно-сопроводительной документации.'
          ]
          },
          {id: 4,
          name: 'Грузчик',
          place: 'Московская область, п Дорохово',
          responsibility:[
            'Погрузка-разгрузка товаров;',
            'Комплектовка товаров, сбор товара в соответствии с заказами;',
            'Перемещение товара по складу;'
          ],
          condition:[
            'Внимательность и желание работать.',
            'Опыт работы значения не имеет',
            'Работа не сложная. Всему научим',
          ],
          requirement:[
            'Своевременные выплаты з/п 2 раза в месяц;',
            'График работы: 2/2 ( c 8 до 20.00)',
            'Дружная, активная, профессиональная команда;',
            'Место работы: Московская область, п. Дорохово'
          ]
          },
          {id: 5,
          name: 'Бетонщик',
          place: 'Московская область, п Дорохово',
          responsibility:[
            'Устройство монолитных конструкций',
            'Вязка арматуры',
            'Заливка бетона'
          ],
          condition:[
            'оформление по ТК РФ',
            'основное место работы Московская область Дорохово',
            'Рабочий день: 5/2 с 09-00 до 18-00',
            'Заработная плата по договоренности. Переработки оплачиваются.'
          ],
          requirement:[
            'стаж работы от 2-х лет по специальности',
            'образование среднее специальное.'
          ]
          },
      ],


    }
  },
    methods:{
        switchPopup(namePopup){
          this.currentPopup = namePopup
        },
        // switchPop(){
        //   setTimeout(()=>{this.currentPopup = null},500)
        // }
      }
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'

.v-vacancy__wrapper
  display: flex
  padding: 50px 125px
  justify-content: space-between

.v-vacancy__menu,
.v-vacancy__body,
.v-vacancy__vacancies,
.v-vacancy__talents,
.v-vacancy__hrCall
  background-color: $gray-1
  border: 5px solid $gray-4
  min-height: 542px
  margin-right: 1%
  @include largelaptop
    max-width: 1114px

.v-vacancy__menu
  padding: 19px 0px 31px 0px
  margin-right: 10px
  &-image
    margin-left: 62px
    margin-bottom: 14px
  &-list
    list-style: none
    padding-left: 0
    margin-bottom: 30px
    &-item
      display: flex
      align-items: center
      justify-content: space-between
      background-color: white
      padding: 14px 0px 14px 34px
      width: 480px
      font-size: 18px
      font-weight: 700
      line-height: 21px
      cursor: pointer
      transition: background-color .05s ease
      &:not(:last-child)
        margin-bottom: 5px
      &:hover
        background-color: darken(white, 7%)
      &-arrow
        margin-right: 19px

  .v-vacancy__phone
    color: $red
    font-size: 24px
    font-weight: 900
    line-height: 30px
    &-block
      display: flex
      align-items: center
      margin-left: 70px
    &-image
      margin-right: 40px

.v-vacancy__body,
.v-vacancy__talents,
.v-vacancy__hrCall
  padding: 35px 33px 47px 53px

.v-vacancy__vacancies
  padding: 35px 90px 11px 40px
  position: relative

.v-vacancy__body
  margin-left: 0
  @include largelaptop
    max-width: 1114px
  &-heading
    margin-top: 0px
    margin-bottom: 10px
    font-size: 18px
    line-height: 21px
    font-weight: 700
    text-align: center
  &-subheading
    display: block
    text-align: center
  &-description
    line-height: 19px
    margin-bottom: 10px
  &-list
    list-style: none
    padding: 0 70px
    &-item
      display: flex
      align-items: flex-start
      margin-bottom: 20px
      line-height: 19px
    &-image
      margin-right: 15px

.v-vacancy__talents
  &-heading
    margin-top: 0px
    margin-bottom: 25px
    font-size: 18px
    font-weight: 700
    text-align: center
    color: $text
  &-body
    display: flex
    align-items: center
    flex-direction: row
  &-wrapper
    padding: 0px 55px 20px 0px
  &-description
    font-size: 16px
    line-height: 19px
  &-resume
    display: inline-block
    padding: 4px 12px
    text-decoration: underline
    letter-spacing: .07em
    background-color: $yellow-2
    font-size: 14px
    font-weight: bold
    color: $text
  &-subdesc
    font-size: 14px
    font-weight: 700
    line-height: 16px
    letter-spacing: .07em

.v-vacancy__hrCall
  display: flex
  flex-direction: column
  align-items: center
  &-heading
    margin-top: 0px
    margin-bottom: 42px
    font-size: 18px
    font-weight: 700
    text-align: center
  &-wrapper
    display: flex
    flex-direction: row
    justify-content: center
    padding-left: 85px
    @media screen and(max-width: 1852px)
      padding-left: 0
      justify-content: space-between
  &-form
    width: 482px
    margin-right: 153px
    @media screen and(max-width: 1852px)
      margin-right: 0
  &-image
    margin-right: 96px
    @media screen and(max-width: 1852px)
      margin-right: 0
.hrCall-form__input-group
  display: flex
  justify-content: space-between
  &:not(:last-child)
    margin-bottom: 20px
  & > label
    font-size: 16px
    font-weight: bold
    line-height: 19px
    letter-spacing: .07em
  & > input, & > textarea
    min-width: 335px
    border: 2px solid $gray-4
    padding: 5px 7px
    &:active, &:focus
      outline: 2px solid $red
  & > textarea
    resize: none
  & > input
    height: 26px

.hrCall-form__submit
  border: none
  background-color: $yellow
  padding: 10px 35px
  margin-left: 130px
  font-size: 15px
  font-weight: 700
  text-transform: uppercase
  cursor: pointer

.v-vacancy__vacancies
  &-heading
    margin-top: 0px
    margin-bottom: 11px
    font-size: 18px
    font-weight: 700
    line-height: 21px
    text-align: center
  &-checkbox-group
    display: flex
    flex-direction: row
    justify-content: space-between
    .checkbox-group
      display: flex
      align-items: center
      & > label
        margin-left: 7px
        font-size: 12px
        font-weight: 300
        letter-spacing: .07em
        cursor: pointer
      & > input
        width: 15px
        height: 15px
        position: absolute
        left: -9999px
.v-vacancy__vacancies-list
  margin-top: 20px
  &-item
    position: relative
  &-item:not(:last-child)
    margin-bottom: calc(7px + 10px)
  &-button
    padding: 10px 40px
    border: none
    background-color: $red
    font-size: 16px
    font-weight: 700
    color: white
    text-transform: uppercase
    cursor: pointer
    transition: all .15s ease
    margin: 0 auto
    justify-items: center
    display: flex
    &:hover
      background-color: #e12200
      box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1)

.vacancies
  &-heading
    font-size: 16px
    font-weight: 700
    margin-top: 10px
    margin-bottom: 0
    line-height: 19px
    text-decoration: underline

  &-body
    display: flex
    flex-direction: row

  &-footer
    display: flex
    flex-direction: row
    align-items: center

  &-address
    display: flex
    align-items: center

  &-description
    margin-top: 5px
    margin-bottom: 2px
    font-size: 12px
    line-height: 14px
    color: $text
    padding-right: 40px

  &-sendResume
    display: inline-block
    padding: 2px 4px
    background-color: $yellow-2
    font-size: 10px
    font-weight: bold
    letter-spacing: .07em
    text-decoration: underline

  &-address
    margin-left: 20px
    font-size: 10px
    font-weight: bold
    letter-spacing: .07em
    color: $red
    &-icon
      margin-right: 6px

  &-attributes
    display: flex
    flex-direction: row
    position: relative
    &-item
      display: flex
      justify-content: center
      align-items: center
      padding: 13px 8px
      width: 114px
      border: 2px solid $gray-4
      background-color: white
      font-size: 16px
      font-weight: 700
      color: $text
      text-align: center
      cursor: pointer
      height: fit-content
      &:not(:last-child)
        margin-right: 10px

  &-type
    display: flex
    flex-direction: column
    width: 92px
    align-items: center
    text-align: center
    margin-left: 17px
    margin-top: -12px
    font-size: 11px
    font-weight: 700
    line-height: 12px
    color: $text
    &-icon
      margin-bottom: 6px

// input
//   -webkit-appearance: none
//   border-radius: 0

.v-vacancy__vacancies-list-popup
  position: absolute
  left: 50%
  top: 100%
  transform: translate(-50%)
  z-index: 100
  background-color: #fff
  font-size: 18px
  border: 2px solid $red
  padding: 10px 8px
  ul
    padding-left: 15px
    margin: 0
    li
      padding-left: 0

// .v-vacancy__vacancies-list-overlay
//   position: absolute
//   width: 100%
//   height: 100%
//   background: #F6F6F6
//   top: 0
//   left: 0
//   opacity: 0.5
//   z-index: 10


.v-vacancy__wrapper
  div:nth-child(2)
    width: 100%
</style>
