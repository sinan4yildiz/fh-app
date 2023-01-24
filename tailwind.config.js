/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/**/*.{js,jsx,blade.php,scss}'
    ],
    theme: {
        extend: {}
    },
    corePlugins: {
        aspectRatio: false
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries')
    ]
}
