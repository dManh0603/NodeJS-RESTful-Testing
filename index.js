const { connectDb } = require('./db');
const Payer = require('./payer')

const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

// [POST] /payers/one --> Thêm mới 1 người đóng thuế
app.post('/payers/one', async function (req, res) {
    const newPayer = req.body;
    const result = await Payer.createPayer(newPayer);
    res.json(result)
})

// [GET] /payers --> Lấy danh sách tất cả người đóng thuế
app.get('/payers', async function (req, res) {
    const result = await Payer.getPayers();
    res.json(result);
})

// [GET] /payers/id/:id --> Tìm người đóng thuế theo id
app.get('/payers/id/:id', async function (req, res) {
    const payerId = req.params.id;
    const result = await Payer.getPayerById(payerId);
    res.json(result);
})

// [PUT] /payers/:id --> Cập nhật người đóng thuế theo id
app.put('/payers/:id', async function (req, res) {
    const payerId = req.params.id;
    const result = await Payer.updatePayer(payerId, req.body);
    res.json(result)
})


// [DELETE] /payers/:id --> Xóa 1 người đóng thuế theo id
app.delete('/payers/:id', async function (req, res) {
    const payerId = req.params.id;
    const result = await Payer.deletePayer(payerId)
    res.json(result);
})

// [POST] /payers/many --> Thêm mới 1 danh sách người đóng thuế
app.post('/payers/many', async function (req, res) {
    const newPayers = req.body.payers;
    const result = await Payer.createPayers(newPayers);
    res.json(result)
})

// [GET] /payers/phone/:phone --> Tìm người đóng thuế theo điện thoại
app.get('/payers/phone/:phone', async function (req, res) {
    const payerPhone = req.params.phone;
    const result = await Payer.getPayerByPhone(payerPhone);
    res.json(result);
})


app.listen(port, () => {
    connectDb()
    console.log(`Server is listening on port ${port}`);
});