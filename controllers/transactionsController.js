const {
  handleGetAllRecords,
  handleGetRecord,
  handleDeleteRecord,
  handleAddRecord,
  handleUpdateRecord,
} = require("../services/transactionsService");

async function getAllRecords(req, res, next) {
  try {
    const { type, page, limit, category, date } = req.query;
    const user_id = req.user_id;
    const data = await handleGetAllRecords(user_id, type, page, limit, category, date);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function getRecord(req, res, next) {
  try {
    const { record_id } = req.params;
    if (!record_id) {
      const err = new Error("record_id is required");
      err.status = 400;
      return next(err);
    }
    const data = await handleGetRecord(record_id);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function addRecord(req, res, next) {
  try {
    const { amount, type, note, category } = req.body;
    const user_id = req.user_id;
    if (!amount || !type || !category) {
      const err = new Error("amount, type, and category are required");
      err.status = 400;
      return next(err);
    }
    const data = await handleAddRecord(amount, type, note, user_id, category);
    res.status(201).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function updateRecord(req, res, next) {
  try {
    const { record_id } = req.params;
    const { amount, type, note, category } = req.body;
    if (!record_id) {
      const err = new Error("record_id is required");
      err.status = 400;
      return next(err);
    }
    const data = await handleUpdateRecord(amount, type, note, record_id, category);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteRecord(req, res, next) {
  try {
    const { record_id } = req.params;
    if (!record_id) {
      const err = new Error("record_id is required");
      err.status = 400;
      return next(err);
    }
    await handleDeleteRecord(record_id);
    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllRecords,
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
};
