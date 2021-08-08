define(function () {
    let idioma = 'pt-BR';
    let THEMOVIODB_API = 'https://api.themoviedb.org/3/';
    let THEMOVIODB_IMAGE_URL = 'https://image.tmdb.org/t/p/';
    let API_KEY = 'cad3029ebaa9548ba1203ba00679fdea';

    return {
        gerarToken: async function () {
            let url = THEMOVIODB_API + 'authentication/token/new?api_key=' + API_KEY;
            return await axios.get(url);
        },
        criarURL: function (caminho, parametros) {
            let url = THEMOVIODB_API + caminho + '?api_key=' + API_KEY + '&language=' + idioma;

            if (parametros && parametros.length) {
                for (let i = 0; i < parametros.length; i++) {
                    if (i > 1) {
                        url += '&';
                    }
                    url += '&' + parametros[i].nome + '=' + parametros[i].valor;
                }
            }

            return url;
        },

        buscarFilmesOuSeries: async function (busca, page) {
            let caminho = 'search/multi';
            let parametros = [{nome: 'query', valor: busca}];

            if (page) {
                parametros.push({nome: 'page', valor: page});
            }

            return await axios.get(this.criarURL(caminho, parametros));
        },
        buscarSerieOuFilme: async function (id, tipo, page) {
            let caminho = tipo + '/' + id;
            let parametros = [];

            if (page) {
                parametros.push({nome: 'page', valor: page});
            }

            return await axios.get(this.criarURL(caminho, parametros));
        },
        buscarTemporadaSerie: async function (idSerie, idTemporada, page) {
            let caminho = 'tv/' + idSerie + '/season/' + idTemporada;
            let parametros = [];

            if (page) {
                parametros.push({nome: 'page', valor: page});
            }

            return await axios.get(this.criarURL(caminho, parametros));
        },
        getURLImagem: function (nomeArquivo, tamanho) {
            if (nomeArquivo) {
                return THEMOVIODB_IMAGE_URL + '/' + (tamanho ? tamanho : 'w92') + nomeArquivo;
            }

            return null;
        },
        formatarItem: function (item) {
            if (item.first_air_date) {
                item.dataInicial = item.first_air_date;
            } else if (item.release_date) {
                item.dataInicial = item.release_date;
            }

            item.urlImg = this.getURLImagem(item.poster_path)
        }
    }
});