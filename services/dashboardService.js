const transactionModel = require("../models/transactionModel");

async function handleGetDashboardSummary() {
    const transactions = await transactionModel.find({ 
        isDeleted: false 
    }).sort({ createdAt: -1 }).lean();


    let totalIncome = 0;
    let totalExpense = 0;
    
    let categoryMap = {};
    let trendsMap = {};


    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];

        if (t.type === 'income') {
            totalIncome += t.amount;
        } else if (t.type === 'expense') {
            totalExpense += t.amount;
        }

        // categories 
        let catKey = t.type + "_" + t.category;
        
        if (!categoryMap[catKey]) {
            categoryMap[catKey] = {
                type: t.type,
                category: t.category,
                totalAmount: 0
            };
        }
        categoryMap[catKey].totalAmount += t.amount;

        //  monthly trends
        let date = new Date(t.createdAt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let trendKey = year + "_" + month + "_" + t.type;
        
        if (!trendsMap[trendKey]) {
            trendsMap[trendKey] = {
                year: year,
                month: month,
                type: t.type,
                totalAmount: 0
            };
        }
        trendsMap[trendKey].totalAmount += t.amount;
    }

    let categoryBreakdown = Object.values(categoryMap);
    let monthlyTrends = Object.values(trendsMap);

    // sort the monthly trends 
    for (let i = 0; i < monthlyTrends.length; i++) {
        for (let j = i + 1; j < monthlyTrends.length; j++) {
            if (monthlyTrends[i].year > monthlyTrends[j].year || 
               (monthlyTrends[i].year === monthlyTrends[j].year && monthlyTrends[i].month > monthlyTrends[j].month)) {
                let temp = monthlyTrends[i];
                monthlyTrends[i] = monthlyTrends[j];
                monthlyTrends[j] = temp;
            }
        }
    }

    // 10 most recent transactions
    let recentActivity = [];
    let activityLimit = 10;
    if (transactions.length < 10) {
        activityLimit = transactions.length;
    }
    
    for (let i = 0; i < activityLimit; i++) {
        recentActivity.push(transactions[i]);
    }

    let netBalance = totalIncome - totalExpense;

    return {
        overview: {
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            netBalance: netBalance,
        },
        categoryBreakdown: categoryBreakdown,
        monthlyTrends: monthlyTrends,
        recentActivity: recentActivity
    };
}

module.exports = {
    handleGetDashboardSummary
};
