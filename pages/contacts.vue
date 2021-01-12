<template lang="pug">
  #v-contacts
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    h1.v-contacts__heading Контакты:
    .v-contacts__yandex-map-container
      yandexMapContainer

    vCta
</template>

<script>
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import yandexMapContainer from '@/components/yandexMap.vue'
import vCta from '@/components/cta.vue'

export default {
  name: 'Contacts',
  components: {
    vBreadcrumbs,
    yandexMapContainer,
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
          text: 'Контакты'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
#v-contacts
  margin-bottom: 14px
.v-contacts__yandex-map-container
  margin: 0px 45px 20px
  // border: 5px solid $gray-5
.v-contacts__heading
  margin: 15px 0 15px 45px
  font-size: 24px
  color: #000
  letter-spacing: .07em
</style>
