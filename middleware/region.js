const cookie = require('cookie');

export default async({ req, app, store, $axios, params, redirect }) => {
    if (!req) return

    let regionSlug;
    const cookies = cookie.parse(req.headers.cookie || '')
    regionSlug = params.region || cookies.region

    const { regionCookie, region } = await store.dispatch(`setCityMiddleware`, { $axios, region: regionSlug })
        if (region) app.$cookie.set('region', regionCookie)
        else redirect("/")

    params.region = regionCookie
}