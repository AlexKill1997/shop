import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data: () => ({
        isCountLoadingAccess: false,
    }),
    computed: {
        ...mapGetters({
            categoryChanged: 'category/GET_CHANGED'
        })
    },
    methods: {
        ...mapActions({
            countProducts: 'product/countProducts'
        }),
        ...mapMutations({
            setLoading: 'category/SET_LOADING'
        }),
    },
    created() {
        this.setLoading(false)
    },
    watch: {
        categoryChanged(val) {
            this.isCountLoadingAccess = true
        }
    },
    mounted() {
        if (!this.isCountLoadingAccess) this.countProducts(this.getRoute)
        this.isCountLoadingAccess = false
    }
}