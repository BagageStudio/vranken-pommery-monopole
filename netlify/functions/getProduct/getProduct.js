require('dotenv').config();
const axios = require('axios');

const handler = async event => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing email' })
        };
    }

    const buff = Buffer.from(process.env.SNIPCART_SECRET_API_KEY);

    const productId = JSON.parse(event.body).id;

    try {
        const product = await axios
            .get(`https://app.snipcart.com/api/products/${productId}`, {
                headers: {
                    Authorization: `Basic ${buff.toString('base64')}`,
                    Accept: 'application/json'
                }
            })
            .then(data => data.data);

        return {
            statusCode: 200,
            body: JSON.stringify({ product })
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 200, body: 'Cant get availability' };
    }
};

module.exports = { handler };
