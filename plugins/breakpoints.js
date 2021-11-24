import Vue from 'vue';
import { BREAKPOINTS } from '~/app/constants.js';

const init = function ({ list = BREAKPOINTS, defaultBreakpoint = 'xxl' } = {}) {
    Vue.prototype.$breakpoints = {
        list,
        defaultBreakpoint: list[defaultBreakpoint]
    };
    return Vue.prototype.$breakpoints.defaultBreakpoint;
};

const defaultBreakpoint = init();

export { defaultBreakpoint };
