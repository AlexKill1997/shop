const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const isDev = process.env.NODE_ENV !== 'production'
const isGenerate = process.env.BUILD_MODE === 'generate'
const express = require('express')
const path = require('path')

module.exports = {
    telemetry: false,
    mode: 'universal',
    ...(!isDev && {
        modern: 'client'
    }),
    /*
     ** Headers of the page
     */
    head: {
        htmlAttrs: {
            lang: 'ru'
        },
        title: 'tdcsk',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, user-scalable=no' },
            { name: "yandex-verification", content: "2777e6c85399f8a3" },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
            // {rel='stylesheet' src="~@/assets/fonts/SFUIDisplay-Regular.eot"}
        ]
    },
    router: {
        prefetchLinks: false,
        extendRoutes(routes, resolve) {
            const itemCardIndex = routes.findIndex(route => route.path === "/products")
            if (itemCardIndex !== -1) routes.splice(itemCardIndex, 1)

            routes.push({
                name: 'products',
                path: '/products/region/:region/:id',
                component: resolve(__dirname, 'pages/products.vue'),
                props: true
            })

            routes.push({
                name: '404',
                path: "*",
                component: resolve(__dirname, 'layouts/404.vue')
            })
        },
        middleware: ['region', 'auth', 'mainData', 'pages', 'clearProducts']
    },

    server: {
        port: 3000,
    },
    /*
     ** Customize the progress-bar color
     */
    loading: "~/components/Loader/Loader.vue",
    /*
     ** Global CSS
     */
    css: [
        'normalize.css',
        './assets/sass/global.sass'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/aos.js", mode: 'client' },
        { src: '~/plugins/ymapPlugin.js', mode: 'client' },
        { src: '~/plugins/v-tooltip.js', mode: 'client' },
        { src: '~/plugins/lingallery.js', mode: 'client' },
        { src: '~/plugins/vuelidate.js' },
        { src: '~/plugins/vue-toastify', mode: 'client' },
        { src: '~/plugins/route-custom-plugin' },
        { src: '~/plugins/mountedHook' }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        // '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // '@nuxtjs/proxy',
        '@nuxtjs/pwa',
        '@nuxtjs/sitemap',
        '@nuxtjs/style-resources',
        'nuxt-trailingslash-module',
        'nuxt-webfontloader', ['cookie-universal-nuxt', { alias: 'cookie' }],
        'nuxt-seo', [
            '@nuxtjs/yandex-metrika',
            {
                id: '69922249',
                webvisor: true,
                // clickmap:true,
                // useCDN:false,
                // trackLinks:true,
                // accurateTrackBounce:true,
            }
        ],
    ],
    // proxy: {
    //     '/api/controllers/services/': { target: 'https://xn--j1ano.com', pathRewrite: {'^/api/controllers/services/': ''}, changeOrigin: true }
    // },
    seo: {
        baseURL: 'https://tdcsk.com',
        name: 'Торговый дом ЦСК',
        title: 'Каталог',
        templateTitle: '%name% - %title%',
        description: 'Строительный гипермаркет'
    },
    webfontloader: {
        events: false,
        google: {
            families: ['Roboto:300,400,500,700,900:cyrillic&display=swap']
        },
        timeout: 5000
    },
    styleResources: {
        sass: [
            '~/assets/sass/*.sass'
        ]
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: process.env.AXIOS_BASE_URL,
        // proxy: true
        credentials: true
    },

    serverMiddleware: [
        "~/api/index.js",
        { path: "catalog/", handler: express.static(path.resolve(__dirname, "csk-admin/data/newCategories/uploads/catalog")) },
        { path: "brands/", handler: express.static(path.resolve(__dirname, "csk-admin/data/newCategories/uploads/brands")) },
        { path: /sitemap.*\.xml/, handler: express.static(path.resolve(__dirname, "static")) }
    ],
    /*
     ** Build configuration
     */
    build: {
        optimizeCss: false,
        filenames: {
            app: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
            chunk: ({ isDev }) => isDev ? '[name].js' : 'js/[contenthash].js',
            css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash].css',
            img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
            font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
        },
        ...(!isDev && {
            html: {
                minify: {
                    collapseBooleanAttributes: true,
                    decodeEntities: true,
                    minifyCSS: true,
                    minifyJS: true,
                    processConditionalComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    trimCustomFragments: true,
                    useShortDoctype: true
                }
            }
        }),
        splitChunks: {
            layouts: true,
            pages: true,
            commons: true
        },
        optimization: {
            minimize: !isDev
        },
        ...(!isDev && {
            extractCSS: {
                ignoreOrder: true
            }
        }),
        transpile: ['vue-lazy-hydration', 'intersection-observer', 'vue-agile'],
        postcss: {
            plugins: {
                ...(!isDev && {
                    cssnano: {
                        preset: ['advanced', {
                            autoprefixer: false,
                            cssDeclarationSorter: false,
                            zindex: false,
                            discardComments: {
                                removeAll: true
                            }
                        }]
                    }
                })
            },
            ...(!isDev && {
                preset: {
                    browsers: 'cover 99.5%',
                    autoprefixer: true
                }
            }),

            order: 'cssnanoLast'
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // config.output.publicPath = '/'
            const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|svg|webp)$/i'
            const vueSvgLoader = [{
                loader: 'vue-svg-loader',
                options: {
                    svgo: false
                }
            }]
            const imageMinPlugin = new ImageminPlugin({
                pngquant: {
                    quality: '50-80',
                    speed: 7,
                    strip: true,
                    dithering: 0,
                    verbose: true
                },
                jpegtran: {
                    progressive: true
                },
                gifsicle: {
                    interlaced: true
                },
                plugins: [
                    imageminMozjpeg({
                        quality: 80,
                        progressive: true
                    })

                ]
            })
            if (!ctx.isDev) config.plugins.push(imageMinPlugin)

            config.module.rules.forEach(rule => {
                if (rule.test.toString() === ORIGINAL_TEST) {
                    rule.test = /\.(png|jpe?g|gif|webp)$/i
                    rule.use = [{
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: ctx.isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]'
                        }
                    }]
                }
            })
            const svgRule = {
                test: /\.svg$/,
                oneOf: [{
                        resourceQuery: /inline/,
                        use: vueSvgLoader
                    },
                    {
                        resourceQuery: /data/,
                        loader: 'url-loader'
                    },
                    {
                        resourceQuery: /raw/,
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'file-loader' // By default, always use file-loader
                    }
                ]
            }

            config.module.rules.push(svgRule) // Actually add the rule
        }

    }
}