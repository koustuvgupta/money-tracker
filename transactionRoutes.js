const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionControllers');

router.get('/',controller.getHome);
router.post('/add',controller.addTransaction);
router.post('/delete/:id',controller.deleteTransaction);
router.get('/monthly-data',controller.getMonthlyData);
router.get('/weekly-data',controller.getWeeklyData);
router.get('/category-data',controller.getCategoryData);
router.get('/income-expense-data',controller.getIncomeData);
module.exports = router;