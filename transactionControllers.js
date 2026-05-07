const model = require('../models/transactionModel');
const db = require('../models/db');
exports.getHome = (req, res) => {
    const { type, category, month, year } = req.query;
    let sql = 'SELECT * FROM transactions WHERE 1=1';
    let params = [];
    if (type) {
        sql += ' AND type = ?';
        params.push(type);
    }
    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }
    if (month) {
        sql += ' AND DATE_FORMAT(created_at, "%Y-%m") = ?';
        params.push(month);
    }
    if (year) {
        sql += ' AND YEAR(created_at) = ?';
        params.push(year);
    }
    model.getAllTransactions(sql, params, (err, transactions) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            if (t.type === 'income') income += t.amount;
            else expense += t.amount;
        });

        const balance = income - expense;

        res.render('index', {
            transactions,
            income,
            expense,
            balance
        });
    });
};

exports.addTransaction = (req, res) => {
    const { amount, type, category } = req.body;

    if (!amount || amount <= 0) {
        return res.send("Invalid amount");
    }

    model.addTransaction(
        {
            amount: Number(amount),
            type,
            category
        },
        (err) => {
            if (err) {
                console.log(err);
                return res.send("Insert error");
            }
            res.redirect('/');
        }
    );
};

exports.deleteTransaction = (req, res) => {
    const id = parseInt(req.params.id);

    model.deleteTransaction(id, (err) => {
        if (err) {
            console.log(err);
            return res.send("Delete error");
        }
        res.redirect('/');
    });
};

//GRAPH DATA
exports.getMonthlyData = (req, res) => {

    const sql = `SELECT DATE_FORMAT(created_at,"%Y-%m") AS month,SUM(amount) AS total FROM transactions WHERE type = 'expense' GROUP BY month ORDER BY month`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Database error");
        }
        res.json(results);
    });
};

exports.getWeeklyData = (req, res) => {

    const sql = `SELECT YEAR(created_at) AS year, WEEK(created_at) AS week, SUM(amount) AS expense FROM transactions WHERE type = 'expense' GROUP BY year,week ORDER BY year,week`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Database error");
        }
        res.json(results);
    });
};

exports.getCategoryData = (req, res) => {
    model.getCategoryData((err, results) => {
        if (err) {
            console.log(err);
            return res.send("Database error");
        }
        res.json(results);
    });
}

exports.getIncomeData = (req,res) => {
    model.getIncomeData((err,results)=>{
        if(err){
            console.log(err);
            return res.send("Database error");
        }
        res.json(results);
    });
};