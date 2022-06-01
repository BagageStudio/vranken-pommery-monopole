import { existsSync } from 'fs-extra';

export const getDynamicFiles = customPath => {
    const customPathExists = existsSync(customPath);
    if (!customPathExists) throw new Error('Wrong file path.');
    return import(customPath);
};
