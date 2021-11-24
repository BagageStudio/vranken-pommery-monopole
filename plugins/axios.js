export default function ({ $axios, $config: { datoApiToken, graphqlEndpoint } }, inject) {
    const dato = $axios.create();

    // Set the secret token only in dev or server env
    dato.setToken(datoApiToken, 'Bearer');

    // Set baseURL to the main DatoCMS endpoint
    dato.setBaseURL(graphqlEndpoint);

    inject('dato', dato);
}
