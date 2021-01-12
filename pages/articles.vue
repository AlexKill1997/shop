<template lang="pug">
  #v-articles
    vBreadcrumbs(:breadcrumbs="breadcrumbs")

    .v-articles
      h1.v-articles__heading.spacing Статьи и советы
      .v-articles__subheader-wrapper
        h2.v-articles__subheader.spacing Рубрики:

      .v-articles__carousel.spacing
        .v-articles__carousel-item
          h3 Гибкая черепица Shinglas&nbsp;&mdash; производимые модели
          img(src="https://via.placeholder.com/265x200.png/")
          img.left_arrow(src="~@/assets/images/icons/left_arrow.png" title="Стрелка влево")
        .v-articles__carousel-item
          h3 Гибкая черепица Shinglas, как правильно выбирать
          img(src="https://via.placeholder.com/265x200.png/")
        .v-articles__carousel-item
          h3 Гибкая черепица Shinglas, определения и&nbsp;критерии
          img(src="https://via.placeholder.com/265x200.png/")
        .v-articles__carousel-item
          h3 Формы и&nbsp;цвета гибкой черепицы Shinglas
          img(src="https://via.placeholder.com/265x200.png/")
        .v-articles__carousel-item
          h3 Гибкая черепица Технониколь Shinglas, нового поколения!
          img(src="https://via.placeholder.com/265x200.png/")
          img.right_arrow(src="~@/assets/images/icons/right_arrow.png" title="Стрелка вправо")
      .v-articles__content.spacing
        .v-articles__content-wrapper
          .v-articles__content-image
            img(src="https://via.placeholder.com/436x330.png/09f/fff")
          .v-articles__content-text
            h4.v-articles__content-heading Гибкая черепица Shinglas&nbsp;&mdash; производимые модели
            p.v-articles__content-paragraph Все мы&nbsp;знаем что строить дом не&nbsp;так легко и&nbsp;просто. Начинается с&nbsp;фундамента и&nbsp;по&nbsp;цепочке до&nbsp;кровли. А&nbsp;вот именно кровля и&nbsp;придает вашему дому хороший вид, элегантность и&nbsp;индивидуальность если ее&nbsp;делать по&nbsp;новым технологиям с&nbsp;применением новых материалов для ее&nbsp;покрытия. В&nbsp;этом вам поможет гибкая битумная черепица Shinglas. Этот вид гибкой черепицы применяется во&nbsp;всей Восточной Европе.
            p.v-articles__content-paragraph Производится черепица Shinglas на&nbsp;заводе с&nbsp;таким&nbsp;же именем&nbsp;&mdash; Shinglas. Этот завод оснащен высокотехнологичным оборудованием американского производства. Черепица адаптирована к&nbsp;различным климатическим условиям.
            p.v-articles__content-paragraph В&nbsp;производстве плитки основным материалом является стеклянная ткань, пропитанная каждой частью толстого слоя модифицированного битума. Верхний слой гибкой черепицы состоит из&nbsp;базальтовой крошки. Базальтовая крошка обеспечивает защиту черепицы от&nbsp;механических повреждений, а&nbsp;также ее&nbsp;цвет. Нижний слой покрыт самоклеющейся морозостойкой битумно-полимерной основой, защищенной съемной фольгой.
            p.v-articles__content-paragraph Гибкая черепица Shinglas имеет большое количество форм срезов и&nbsp;большое количество цветов. Разнообразие форм и&nbsp;широкий спектр цветов чехлов позволяет реализовать индивидуальные решения и&nbsp;получить необычные художественные эффекты. Благодоря гибкости черепицы можно проектировать и&nbsp;конструировать любые конфигураций крыши. Такой материал, каким является гибкая черепица, очень экономичен. При сборке, даже на&nbsp;самых сложных крышах, отходы составляют не&nbsp;более пяти процентов от&nbsp;общего объема.
            p.v-articles__content-paragraph Если у&nbsp;вас самая простая кровля, употребляя гибкую черепицу Shinglas у&nbsp;вас получится очень красивая и&nbsp;привлекательная кровля. Специалистам по&nbsp;монтажу кровли легко работается с&nbsp;гибкой черепицей, а&nbsp;гарантийные сроки не&nbsp;менее 20 лет, зависит от&nbsp;толщины черепицы.
            p.v-articles__content-paragraph Имеются разные модели гибкой черепицы Shinglas. Одна из&nbsp;таких моделей называется Shinglas Континент&nbsp;&mdash; новая модель битумной черепицы. Она имеет максимальную толщину и&nbsp;соответственно и&nbsp;максимальный срок службы. Гибкая черепица Shinglas состоит из&nbsp;шести слоев, а&nbsp;гарантийный срок на&nbsp;гальку Shinglas серии Континент составляет 60 лет. Этот вид черепицы предназначен для наклонных крыш, для частных домов, административных зданий, жилых комплексов и.т.д. Также гибкая черепица Shinglas Континент отличается высокой устойчивостью к&nbsp;выцветению и&nbsp;к&nbsp;другим климатическим факторам.
            p.v-articles__content-paragraph Если хотите обновить крышу вашего старого дома или построили новый дом&nbsp;&mdash; пользуйтесь гибкой битумной черепицей Shinglas. Вы&nbsp;останетесь довольны и&nbsp;не&nbsp;пожалеете, что сделали такой выбор.

    vCta
</template>

<script>
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vCta from '@/components/cta.vue'

export default {
  name: 'Articles',
  components: {
    vBreadcrumbs,
    vCta
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Главная',
          link: "/"
        },
        {
          text: 'Статьи'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.spacing
  margin-left: 45px
  margin-right: 45px

.v-articles
  &__heading
    font-size: 24px
    font-weight: 700
    line-height: 28px
    letter-spacing: .07em
  &__subheader-wrapper
    padding: 0px -45px
    background-color: $gray-3
  &__subheader
    padding: 24px 0px 24px 28px
    background-color: white
    border: 2px solid $yellow
    font-size: 18px
    font-weight: 700
    letter-spacing: .07em
    color: $text

  &__carousel
    display: grid
    grid-template-columns: repeat(5, 1fr)
    grid-column-gap: 20px
    margin-bottom: 54px
    &-item
      display: flex
      flex-direction: column
      align-items: center
      max-width: 350px
      padding-top: 18px
      border: 2px solid #bab4b4
      box-shadow: 0px 4px 4px rgba(0, 0, 0, .25)
      h3
        margin-top: 0px
        margin-bottom: 17px
        font-size: 16px
        font-weight: 700
        letter-spacing: .07em
        text-align: center
        padding: 5px 10px
        background-color: $gray-1
        border: 2px solid $gray-7
  &__content
    border: 5px solid $gray-5
    margin-bottom: 58px
    background: url('~@/assets/images/articles/content-bg.jpg') no-repeat center bottom
    &-wrapper
      display: flex
      padding: 38px 43px 300px 82px
    &-text
      margin-left: 72px
    &-heading
      margin-top: 0px
      text-indent: 37px
      font-size: 18px
      font-weight: 700
      letter-spacing: .07em
      text-transform: uppercase
      color: $text
    &-paragraph
      text-indent: 37px
      color: $text
      line-height: 19px
      letter-spacing: .07em
      color: $text
.left_arrow
  position: relative
  right: 152px
  bottom: 110px
  height: 25px
  cursor: pointer
.right_arrow
  position: relative
  left: 152px
  bottom: 110px
  height: 25px
  cursor: pointer
</style>
