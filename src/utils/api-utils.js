define([], function () {
    return {
        buscarListagem: function (url, page, size, sort, direction, filter) {
            if (page !== undefined && size !== undefined) {
                url += '?page=' + page + '&size=' + size;
            }
            if (sort) {
                url += '&sort=' + sort;
            }
            if (direction) {
                url += '&direction=' + direction;
            }
            return axios.get(url);
        },
        buscar: function (url) {
            return axios.get(url);
        },
        buscarRegistro: function (url, id) {
            return buscar(url + '/' + id);
        },
        salvarRegistro: function (url, registro, atributoId) {
            if (registro.id || (atributoId && registro[atributoId])) {
                return axios.put(url + '/' + (atributoId ? registro[atributoId] : registro.id), registro);
            }
            return axios.post(url, registro);
        },
        deletarRegistro: function (url, id) {
            return axios.delete(url + '/' + id);
        },
        filtroEnum: function (enumObjeto, enums) {
            return enumObjeto ? enums.filter(semestre => semestre.chave === enumObjeto)[0].valor : '';
        },
        getFilters: function () {
            let filters = location.search.replace('?', '').split('&');
            let mapFilters = {};
            filters.forEach(filter => {
                mapFilters[filter.split('=')[0]] = filter.split('=')[1];
            });
            return mapFilters;
        }
    }
});
