export default async ({ store, $axios, params }) => {
    if (store.getters['GET_MAIN_DATA_LOADED']) return
    const { region } = params
    await store.dispatch('fetchData', { $axios, region: region })
}