const { Schema } = require('mongoose')
const manageUserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    region: { type: Schema.Types.ObjectId, ref: 'Regions'},
    regionTitle: {type: String, required: true, ref: 'Regions'},
    client: {type: Schema.Types.ObjectId, required: false, ref: 'Clients'},
    typeForm: {type: String, required: false},


    inn: {type: Number, required: false},
    comment: {type: String, required: false},
    company: {type: String, required: false},
    paymentStatus: {type: String, required: false}

  },
  { timestamps: true }
)

manageUserSchema.methods.createManageUser = async function (user, regionSlug, formType) {
  console.log('Входящий параметр: ', user);
  const regionModel = this.model('regionsModel')
  const usercallback = this.model('callbacksModel')
  const clientsModel = this.model('clientsModel')
  const region = await new regionModel().getRegion(regionSlug)

  const client = await clientsModel.findOne({phone: user.phone}).lean()
  try {
    const newcallback = new usercallback(user)
      newcallback.regionTitle = region.title
      newcallback.typeForm = formType
      newcallback.region = region._id

      newcallback.comment = user.comment
      newcallback.company = user.company
      newcallback.inn = user.inn
      newcallback.paymentStatus = user.type


    if (client) {
      let currentClient = client._id
      newcallback.client = currentClient
      console.log('Данные с формы ', newcallback)
    } else {
      console.log('клиент не найден')
    }
    await newcallback.save()
  } catch(e) {
    console.log(e)
  }
}

module.exports = manageUserSchema