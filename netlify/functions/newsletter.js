const SibApiV3Sdk = require('sib-api-v3-sdk');

require('dotenv').config();

const createContact = (createContact, apiInstance) => {
    return new Promise((resolve, reject) => {
        apiInstance.createContact(createContact).then(
            function () {
                resolve('API called successfully.');
            },
            function (error) {
                reject(error);
            }
        );
    });
};

exports.handler = async function (event, context) {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing email' })
        };
    }

    const datas = JSON.parse(event.body);

    if (!datas.email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing email' })
        };
    }

    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

    const apiInstance = new SibApiV3Sdk.ContactsApi();

    const createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = datas.email;
    createContact.includeListIds = [166];
    // createContact.templateId = 37;
    createContact.redirectionUrl = 'https://www.vrankenpommery.com/';

    try {
        await createContact(createContact, apiInstance);
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error creating contact' })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Contact created' })
    };
};
