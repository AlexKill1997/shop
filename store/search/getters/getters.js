export default {
    GET_ARTICLE_SEARCH: ({ articleSearch }) => articleSearch.value,
    GET_ARTICLE_SEARCH_RESULT: ({ articleSearch }) => articleSearch.articlePreviewField,
    GET_REQUEST_COMPLETE: ({ articleSearch }) => articleSearch.isRequestComplete,

    GET_SEARCH_VALUE: ({ mainSearch }) => mainSearch.value,
    GET_SEARCH_RESULT_PRODUCTS: ({ mainSearch }) => mainSearch.results.products,
    GET_SEARCH_RESULT_CATEGORY: ({ mainSearch }) => mainSearch.results.categories,
    GET_SEARCH_REQUEST_COMPLETE: ({ mainSearch }) => mainSearch.isRequestComplete
}