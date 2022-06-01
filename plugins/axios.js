export default function ({ $axios, $config: { datoApiToken, datoApiUrl } }, inject) {
    const dato = $axios.create();

    // Set the secret token only in dev or server env
    dato.setToken(datoApiToken, 'Bearer');

    // Set baseURL to the main DatoCMS endpoint
    dato.setBaseURL(datoApiUrl);

    inject('dato', dato);
}
