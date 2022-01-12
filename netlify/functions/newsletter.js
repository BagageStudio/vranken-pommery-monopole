const SibApiV3Sdk = require('sib-api-v3-sdk');

require('dotenv').config();

const createContact = (createDoiContact, apiInstance) => {
    return new Promise((resolve, reject) => {
        apiInstance.createDoiContact(createDoiContact).then(
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

    const createDoiContact = new SibApiV3Sdk.CreateDoiContact(); // CreateDoiContact | Values to create the Double opt-in (DOI) contact

    createDoiContact.email = datas.email;
    createDoiContact.includeListIds = [166];
    // createDoiContact.templateId = 37;
    createDoiContact.redirectionUrl = 'https://www.vrankenpommery.com/';

    try {
        await createContact(createDoiContact, apiInstance);
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
