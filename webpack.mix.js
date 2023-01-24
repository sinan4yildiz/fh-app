require('mix-tailwindcss')

const mix = require('laravel-mix')

/*
* Scripts
*
* */
mix.js(`resources/js/app.js`, `public/js/app.min.js`)
   .react()
   .version()

/*
* Styles
*
* */
mix.sass(`resources/css/app.scss`, `public/css/app.min.css`)
   .tailwind()
   .options({})
   .version()

mix.webpackConfig({})
