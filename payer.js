const { ObjectId } = require('mongodb');
const { getDb } = require('./db');

function getPayerCollection() {
    return getDb().collection('payers');
}

async function createPayer(payer) {

    try {
        const result = await getPayerCollection().insertOne(payer);
        if (result.insertedId) {
            return { success: true, status: 201, result };
        }
        throw new Error('Failed to insert payer!');
    } catch (error) {
        console.error(error);
        return { success: false, status: 500, error: error.message };
    }
}

async function createPayers(payers) {

    try {
        const result = await getPayerCollection().insertMany(payers);
        if (result.insertedCount > 0) {
            return { success: true, status: 201, result };
        }
        throw new Error('Failed to insert payers!');
    } catch (error) {
        console.error(error);
        return { success: false, status: 500, error: error.message };
    }
}


async function getPayers() {

    try {
        const payers = await getPayerCollection().find().toArray();
        if (payers) {
            return { success: true, status: 200, payers };
        }
        throw new Error('No payer was found!');
    } catch (error) {
        return { success: false, status: 404, error: error.message };
    }

}

async function getPayerById(id) {

    try {
        const payer = await getPayerCollection().findOne({ _id: new ObjectId(id) });
        if (payer) {
            return { success: true, status: 200, payer };
        }
        throw new Error('No payer was found by id!');
    } catch (error) {
        return { success: false, status: 404, error: error.message };
    }
}

async function getPayerByPhone(phone) {

    try {
        const payer = await getPayerCollection().findOne({
            'Thông tin liên hệ.Điện thoại': phone
        });
        if (payer) {
            return { success: true, status: 200, payer };
        }
        throw new Error('No payer was found by phone!');
    } catch (error) {
        return { success: false, status: 404, error: error.message };
    }
}

async function updatePayer(id, payer) {

    try {
        const result = await getPayerCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: payer }
        );
        if (result.modifiedCount > 0) {
            return { success: true, status: 200, result };
        }
        throw new Error('Unable to modify!');
    } catch (error) {
        return { success: false, status: 500, error: error.message };
    }
}

async function deletePayer(id) {

    try {
        const result = await getPayerCollection().deleteOne({
            _id: new ObjectId(id),
        });
        if (result.deletedCount > 0) {
            return { success: true, status: 200, result };
        }
        throw new Error('Unable to delete!');
    } catch (error) {
        return { success: false, status: 500, error: error.message };
    }
}

module.exports = {
    createPayer,
    getPayers,
    getPayerById,
    updatePayer,
    deletePayer,
    getPayerByPhone,
    createPayers
};
