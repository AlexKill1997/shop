<template lang="pug">
  #v-certificates
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    h1.v-certificates__heading Сертификаты:
    .v-certificates__container
      .v-certificates__container-item(v-for="i in 21")
        img.v-certificates__container-item-image(:src="require(`../assets/images/certificates/image ${i}.jpg`)")
    vCTA
</template>

<script>
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vCTA from '@/components/cta.vue'

export default {
  name: 'Certificates',
  components: {
    vBreadcrumbs,
    vCTA
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Главная',
          link: "/"
        },
        {
          text: 'Сертификаты'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.v-certificates__heading
  margin: 15px 0px 15px 45px
  font-size: 24px
  color: $text
  letter-spacing: .07em

.v-certificates__container
  display: flex
  flex-wrap: wrap
  justify-content: center
  &-item
    display: flex
    border: 3px solid $red
    margin: 15px
    &-image
      min-width: 100%
      object-fit: cover
</style>
