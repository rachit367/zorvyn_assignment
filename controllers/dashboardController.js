const { handleGetDashboardSummary } = require("../services/dashboardService");

async function getDashboardSummary(req, res, next) {
  try {
    const data = await handleGetDashboardSummary();
    
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboardSummary,
};
