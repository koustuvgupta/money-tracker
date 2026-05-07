const db = require('./db');

exports.getAllTransactions = (sql, params, callback) => {
    db.query(sql + ' ORDER BY created_at DESC', params, callback);
};

exports.addTransaction = (transaction, callback) => {
    const { amount, type, category } = transaction;

    const sql = 'INSERT INTO transactions (amount, type, category) VALUES (?, ?, ?)';
    db.query(sql, [amount, type, category], callback);
};

exports.deleteTransaction = (id, callback) => {
    db.query('DELETE FROM transactions WHERE id = ?', [id], callback);
};

exports.getCategoryData = (callback) => {
    const sql = `SELECT category, SUM(amount) AS total FROM transactions WHERE type='expense' GROUP BY category`;
    db.query(sql, callback);
};

exports.getIncomeData = (callback) => {
    const sql = `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
    SUM(CASE when type = 'expense' THEN amount ELSE 0 END) AS expense FROM transactions GROUP BY month ORDER BY month`;
    db.query(sql, callback);
};