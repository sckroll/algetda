declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-d3-network'

declare module '@/assets/scss/*.scss' {
  const styles: any
  export = styles
}
