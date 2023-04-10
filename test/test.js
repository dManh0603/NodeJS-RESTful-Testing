const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const url = 'localhost:8000';

chai.use(chaiHttp);

describe('[PUT] /payers/:id', () => {
    let originalPayer;
    let id = '6434384915cce570b5db5f81';

    before(async () => {
        // Save the original payer data
        const response = await chai.request(url)
            .get(`/payers/id/${id}`);
        delete response.body.payer._id
        originalPayer = response.body.payer;

        // Assert that the response is successful
        assert.equal(response.body.status, 200);
        assert.isTrue(response.body.success);
    });

    it('should update payer data', async () => {
        // Make the PUT request to update the payer data
        const response = await chai.request(url)
            .put(`/payers/${id}`)
            .send({
                "Họ và tên": "Nguyễn Văn A",
                "Tuổi": "30",
                "Căn cước": "123456789",
                "Thông tin liên hệ": {
                    "Điện thoại": "0987654321",
                    "Email": "nguyenvana@gmail.com",
                    "Địa chỉ": "123 Đường ABC, Quận XYZ, TP. HCM"
                },
                "Người phụ thuộc": [
                    "0123456789",
                    "0234567890"
                ]
            });

        // Assert that the response is successful
        assert.equal(response.body.status, 200);
        assert.isTrue(response.body.success);
    });

    after(async () => {
        // Put the original payer data back
        const response = await chai.request(url)
            .put(`/payers/${id}`)
            .send(originalPayer);

        // Assert that the response is successful
        assert.equal(response.body.status, 200);
        assert.isTrue(response.body.success);
    });

});

describe('[GET]', () => {
    let phone = '098589811';
    it('should get the payer via phone', async () => {
        const response = await chai.request(url)
            .get(`/payers/phone/${phone}`)
        assert.equal(response.body.status, 200);
        assert.isTrue(response.body.success);

    })
})