define([], function () {
    function gerarDataDeString(data) {
        return new Date(data);
    }

    return {
        getDataFormatada: function (dataStr) {
            let data = gerarDataDeString(dataStr);
            return data.getUTCDate() + '/' + (data.getUTCMonth()+1) + '/' + data.getFullYear();
        },
        getAnoData(data) {
            return gerarDataDeString(data).getFullYear();
        },
        isMenorData: function (data1, data2) {
            return gerarDataDeString(data1) < gerarDataDeString(data2);
        }
    }
})