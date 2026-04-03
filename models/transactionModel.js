const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true,
        min:0
    },
    type:{
        type:String,
        enum:['expense','income'],
        required:true
    },
    note:String,
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    category:{
        type:String,  //can use enum if categories are defined
        required:true
    }
},{timestamps:true})

transactionSchema.index({ addedBy: 1, isDeleted: 1 })
transactionSchema.index({ addedBy: 1, type: 1, isDeleted: 1 })


module.exports = mongoose.model('Transaction', transactionSchema)