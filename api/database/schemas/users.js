const { Schema } = require('mongoose')
const { MANAGER_FORMAT } = require('../aggregation/helpers/resonse-formats')

const usersSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        region: { type: Schema.Types.ObjectId, ref: 'Regions' }
    }

)

usersSchema.statics.getManager = async function (managerCode, regionSlug) {
    const regionsModel = this.model('regionsModel')
    const region = await new regionsModel().getRegion(regionSlug)
    const managerModel = this.model('usersModel')
    const manager = managerCode ?
        await managerModel.aggregate()
            .match({
                'role': 'manager',
                'region': region._id
            })
            .limit(1)
            .project(MANAGER_FORMAT)
            .toObject() : null
    return manager
}


module.exports = usersSchema