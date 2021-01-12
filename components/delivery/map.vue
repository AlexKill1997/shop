<template lang="pug">
  #deliveryMapContainer
    yandex-map(
        :coords="[55.73452935158388, 37.1657998489398]"
        ref="deliveryMapContainer"
        v-if="pageReady"
        style="width: 100%; height: 100%"
        zoom="10"
    )
        slot
</template>

<script src="@/plugins/script.js"></script>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  name: 'DeliveryMapContainer',
  components: {
    yandexMap,
    ymapMarker
  },
  data() {
    return {
      pageReady: false
    }
  },
  mounted(){
    this.pageReady = true
  }
}
</script>

<style lang="sass">
@import '../../layouts/mixins.sass'
#deliveryMapContainer
  width: 100%
  height: 100%
  @include phones
    display: none

  img
      width: unset
  .ymaps-2-1-77-controls__control_toolbar
      display: none
  .ymaps-2-1-77-zoom
      display: none
</style>
