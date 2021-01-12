import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            region: "GET_CURRENT_CITY"
        })
    },
    methods: {
        isDev() {
            return process.env.NODE_ENV !== 'production'
        },

        getImgPath(path, slug, img) {
            if (!img) return `https://цск.com/uploads/default.jpeg`

            if (img.includes('default')) {
                return `https://цск.com${path}${img}`
            }

            else return `https://цск.com${path}${this.region._id}/${slug}/${img}`
        },
    }
}
