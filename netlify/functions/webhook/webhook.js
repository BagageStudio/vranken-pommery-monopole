require('dotenv').config();
const buildClient = require('@datocms/cma-client-node').buildClient;
const buildBlockRecord = require('@datocms/cma-client-node').buildBlockRecord;

const handler = async event => {
    if (!event.body) {
        return {
            statusCode: 400
        };
    }

    const body = JSON.parse(event.body);

    if (body.eventName !== 'order.completed' || body.mode !== process.env.SNIPCART_MODE) {
        return {
            statusCode: 200,
            body: 'Wrong event or mode'
        };
    }

    try {
        const CMAclient = buildClient({ apiToken: process.env.DATOCMS_API_TOKEN });

        const { orders } = await CMAclient.items.find('142447004');

        const invoiceNumber = body.content.invoiceNumber;
        // const invoiceNumber = 'FACTURE-656574';

        const item = await CMAclient.items.update('142447004', {
            orders: [
                buildBlockRecord({
                    item_type: { type: 'item_type', id: '2015768' },
                    invoice_number: invoiceNumber
                }),
                ...orders
            ]
        });

        return {
            statusCode: 200
        };
    } catch (error) {
        console.log(error);
        return { statusCode: 500, body: 'Issue in updating Dato, check the Netlify function logs' };
    }
};

module.exports = { handler };
