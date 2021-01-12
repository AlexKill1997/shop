<template lang="pug">
svg(viewbox='0 0 200 200')
  defs
    filter#blurFilter(y='-5' height='40')
      fegaussianblur(in='SourceGraphic' stddeviation='3' y='-')
  circle(r='80' cx='95' cy='110' fill='none' stroke-width='12' stroke='#e0e0e0' filter='url(#blurFilter)')
  circle(r='80' cx='100' cy='100' fill='none' stroke-width='12' stroke='#ccc' stroke-dasharray='502,4 502,4' stroke-linecap='round')
  circle(r='24' cx='172' cy='123' fill='#e0e0e0' stroke-width='0' stroke='#e0e0e0' filter='url(#blurFilter)')
  circle(r='80' cx='100' cy='100' fill='none' stroke-width='12' stroke='#F3F5F6' stroke-dashoffset='-42' :style="{ strokeDasharray: `${getPercentWhite()} 502.4`}" stroke-linecap='round')
  circle(r='80' cx='100' cy='100' fill='none' stroke-width='12'    stroke-dashoffset='-45' stroke-dasharray='502.4' :style="{ strokeDasharray: `${getPercent()} 502.4`, stroke: `${getColor}`}" stroke-linecap='round')
  text(x='100' y='125' font-family='Arial' font-size='70' text-anchor='middle' fill='#444')
    | {{percent}}
  g
    circle(r='24' cx='175' cy='120' fill='#F3F5F6' stroke-width='0' stroke='#F3F5F6')
    circle(r='20' cx='175' cy='120' :style="{ fill: `${getColor}`}" stroke-width='0' stroke='orangered')
    text(x='175' y='126' font-family='Arial' font-size='18' text-anchor='middle' fill='#fff')
      | %
    
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      required: true,
      default: () => 0
    }
  },
  computed: {
    getColor() {
      const { percent } = this

      switch(true) {
        case percent < 30:
          return 'red'
          break;
        case percent < 70:
          return 'orange'
          break;
        default:
          return 'green'
      }
    },
    
  },
  methods: {
    getPercent() {
      return 502.4 / 100*this.percent
    },
    getPercentWhite(){
      return 502.4 / 100 * this.percent + 8
    }

  }
}
</script>

<style lang="sass" scoped>
svg
  width: 200px
  height: 200px
  @media screen and(max-width:480px)
    display: none
</style>