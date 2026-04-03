const transactionModel = require("../models/transactionModel");

async function handleGetAllRecords(user_id,type,page,limit,category,date) {
    const filter = {
        isDeleted: false
    }
    if (user_id) filter.addedBy = user_id
    if (type) filter.type = type
    if (category) filter.category = category

    page = Number(page) || 1
    limit = Number(limit) || 10
    const skip=(page-1)*limit

    if (date) {
        const start = new Date(date)
        const end = new Date(date)
        end.setHours(23, 59, 59, 999)
        filter.createdAt = {
            $gte: start,
            $lte: end
        }
    }

    const record = await transactionModel.find(filter)
        .populate({path:'addedBy' ,select:'name'})
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .lean()

    const total = await transactionModel.countDocuments(filter)

    return {
        total,
        page,
        limit,
        data: record
    }
}

async function handleGetRecord(record_id) {
    const record=await transactionModel.findById(record_id)
        .populate({path:'addedBy' ,select:'name'})
        .lean()
    return record
}


async function handleDeleteRecord(record_id) {
    await transactionModel.updateOne({
        _id: record_id
    }, {
        $set: { isDeleted: true }
    });
}

async function handleAddRecord(amount,type,note,addedBy,category) {
    const record=await transactionModel.create({
        amount,
        type,
        note:note|| '',
        addedBy,
        category
    })
    return record
}

async function handleUpdateRecord(amount,type,note,record_id,category) {
    const data={}
    if (note!==undefined) data.note = note
    if (type!==undefined) data.type = type
    if (category!==undefined) data.category = category
    if (amount!==undefined) data.amount = amount
    const record=await transactionModel.findOneAndUpdate({
        _id:record_id
    },
    {
        $set:data
    },
    {new:true})
    return record
}

module.exports={
    handleAddRecord,
    handleDeleteRecord,
    handleGetAllRecords,
    handleGetRecord,
    handleUpdateRecord
}