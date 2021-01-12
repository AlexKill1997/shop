<template lang="pug">
  div.error__wrapper
    h1.error__wrapper_title 404 Страница не найдена!
    NuxtLink(to="/").error__home Перейти на главную
</template>

<style lang="sass">
  .error__wrapper
    text-align: center
    margin: 100px
    h1
      color: $red
      text-align: center
    .error__home
        text-decoration: none
        color: #000
        text-align: center
</style>