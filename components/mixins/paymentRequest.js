import {mapActions} from 'vuex'
export default {
    data: () => ({
        calculation: {
            name: '',
            phone: '',
            company: '',
            inn: '',
            comment: '',
            agree: true,
            files: [],
            type: 'Заявка на расчет'
        },
    }),
    computed: {
        calculationName: {
            get() {
              return this.calculation.name
            },
      
            set(name) {
              name = name.replace(/\d/g, '')
              this.$refs.calculationname.value = name
              this.calculation.name = name
            }
        },
      
        calculationPhone: {
            get() {
                return this.calculation.phone
            },
        
            set(phone) {
                this.$refs.calculationphone.value = phone
                this.calculation.phone = phone
            }
        },
      
        calculationCompany: {
            get() {
                return this.calculation.company
            },
        
            set(company) {
                this.$refs.calculationcompany.value = company
                this.calculation.company = company
            }
        },
      
        calculationInn: {
            get() {
                return this.calculation.inn
            },
        
            set(number) {
                number = number.replace(/\D/g, '')
                this.$refs.calculationinn.value = number
                this.calculation.inn = number
            }
        },
    
        calculationComment: {
            get() {
                return this.calculation.comment
            },
        
            set(comment) {
                this.$refs.calculationcomment.value = comment
                this.calculation.comment = comment
            }
        },
    
        calculationAgree: {
            get() {
                return this.calculation.agree
            },
        
            set(agree) {
                this.calculation.agree = agree
            }
        },
    },
    methods: {
    ...mapActions({
        sendPayment: 'callback/sendHeaderPayment'
    }),

    fileUploadHandler() {
        this.calculation.files = this.$refs.file.files
    },
    paymentRequestHandler() {
        // if(this.$v.calculation.$invalid) {
        //   this.$v.calculation.$touch()
        //   return
        // }
        const calculationData = {
          name: this.calculation.name,
          phone: this.calculation.phone,
          company: this.calculation.company,
          inn: this.calculation.inn,
          comment: this.calculation.comment,
          agree: this.calculation.agree,
          type: this.calculation.type
        }

        const formData = new FormData()

        const { files } = this.calculation

        formData.append('paymentClient', JSON.stringify(calculationData))

        Array.from(files).forEach((file, index) => {
            formData.append(`file_${index}`, file)
        })

        this.sendPayment(formData)
        this.calculation.name = ''
        this.calculation.phone = '',
        this.calculation.company = '',
        this.calculation.inn = '',
        this.calculation.comment = '',
        this.calculation.agree = false
        this.calculation.files = []
        
        this.$emit("close:calculation")
        // this.closePopupCallBack()
      }
    }
}
