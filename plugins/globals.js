import Vue from 'vue';

Vue.filter('formatDate', (date, i18n) => {
    const [{ iso }] = i18n.locales.filter(({ code }) => {
        return code === i18n.locale;
    });
    const localeIso = iso.replace('_', '-');
    return new Date(date).toLocaleDateString(localeIso, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

Vue.filter('noPAround', function (value) {
    if (value.substring(0, 3) === '<p>') {
        let text = value.substring(3);
        text = text.slice(0, -4);
        return text;
    } else {
        return value;
    }
});

Vue.filter('formatNumber', (number, i18n) => {
    const [{ iso }] = i18n.locales.filter(({ code }) => {
        return code === i18n.locale;
    });
    const localeIso = iso.replace('_', '-');
    return new Intl.NumberFormat(localeIso, { style: 'currency', currency: 'EUR' }).format(number);
});
