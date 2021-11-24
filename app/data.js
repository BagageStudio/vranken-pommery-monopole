export const getHierarchyFromProducts = products => {
    return products.reduce((brands, product) => {
        const category = product.category;
        const cuvee = category.cuvee;
        const brand = cuvee.brand;

        // Only if brand does not exists yet
        if (brandDoesntExist(brands, brand)) {
            brands[brand.id] = { ...brand, cuvees: {} };
        }

        // Only if cuvee does not exists yet
        if (cuveeDoesntExist(brands[brand.id].cuvees, cuvee)) {
            brands[brand.id].cuvees[cuvee.id] = { ...cuvee, categories: {} };
        }

        // Only if category does not exists yet
        if (categoryDoesntExist(brands[brand.id].cuvees[cuvee.id].categories, category)) {
            brands[brand.id].cuvees[cuvee.id].categories[category.id] = { ...category, products: [] };
        }

        brands[brand.id].cuvees[cuvee.id].categories[category.id].products.push(product);

        return brands;
    }, {});
};

const brandDoesntExist = (brands, brand) => {
    return !Object.entries(brands).some(([id, _]) => id === brand.id);
};

const cuveeDoesntExist = (cuvees, cuvee) => {
    return !Object.entries(cuvees).some(([id, _]) => id === cuvee.id);
};

const categoryDoesntExist = (categories, category) => {
    return !Object.entries(categories).some(([id, _]) => id === category.id);
};
