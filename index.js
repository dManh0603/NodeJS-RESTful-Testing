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
    if (result.success) {
        res.status(201).json(result)
        return;
    }
    res.status(500).json(result);
})

// [GET] /payers --> Lấy danh sách tất cả người đóng thuế
app.get('/payers', async function (req, res) {
    const result = await Payer.getPayers();
    if (result.success) {
        res.status(200).json(result)
        return;
    }
    res.status(500).json(result);
})

// [GET] /payers/id/:id --> Tìm người đóng thuế theo id
app.get('/payers/id/:id', async function (req, res) {
    const payerId = req.params.id;
    const result = await Payer.getPayerById(payerId);
    if (result.success) {
        res.status(200).json(result)
        return;
    }
    res.status(500).json(result);
})

// [PUT] /payers/:id --> Cập nhật người đóng thuế theo id
app.put('/payers/:id', async function (req, res) {
    const payerId = req.params.id;
    const result = await Payer.updatePayer(payerId, req.body);
    if (result.success) {
        res.status(200).json(result)
        return;
    }
    res.status(500).json(result);
})


// [DELETE] /payers/:id --> Xóa 1 người đóng thuế theo id
app.delete('/payers/:id', async function (req, res) {
    const payerId = req.params.id;
    const result = await Payer.deletePayer(payerId)
    if (result.success) {
        res.status(200).json(result)
        return;
    }
    res.status(500).json(result);
})

// [POST] /payers/many --> Thêm mới 1 danh sách người đóng thuế
app.post('/payers/many', async function (req, res) {
    const newPayers = req.body.payers;
    const result = await Payer.createPayers(newPayers);
    if (result.success) {
        res.status(200).json(result)
        return;
    }
    res.status(500).json(result);
})

// [GET] /payers/phone/:phone --> Tìm người đóng thuế theo điện thoại
app.get('/payers/phone/:phone', async function (req, res) {
    const payerPhone = req.params.phone;
    const result = await Payer.getPayerByPhone(payerPhone);
    if (result.success) {
        res.status(200).json(result)
        return;
    }
    res.status(500).json(result);;
})


app.listen(port, () => {
    connectDb()
    console.log(`Server is listening on port ${port}`);
});