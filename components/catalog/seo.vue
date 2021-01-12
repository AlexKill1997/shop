<template lang="pug">
    .seo__container
        .seo__container-description(v-html="seocontent")
</template>

<script>
export default {
    name: 'seo',
    props: {
        seocontent: {
            type: String,
            default: () => ''
        }
    }
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'
.seo__container
    margin-bottom: 40px
    .seo__container-description
        @include tablets
            display: none
        h1
            font-size: 24px
        h2
            font-size: 22px
        h3
            font-size: 20px
        h4
            font-size: 18px
        h5
            font-size: 16px   
    li, p
        line-height: 24px
        font-size: 14px
      
</style>