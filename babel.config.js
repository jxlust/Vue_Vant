module.exports = {
  presets: [
    '@vue/app',
    /*{
         polyfills: [
           'es6.promise',
           'es6.symbol'
         ]
       }*/
    /* {
       useBuiltIns: 'entry'// import '@babel/polyfill
     }*/
  ],

  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  // 

}