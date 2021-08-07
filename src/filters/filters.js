define(['../utils/data-utils'], function (dataUtils) {
    Vue.filter('getAnoData', dataUtils.getAnoData);
    Vue.filter('getDataFormatada', dataUtils.getDataFormatada);
})
