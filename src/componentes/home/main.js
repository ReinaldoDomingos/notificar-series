define(['../../utils/data-utils', '../../extensao/themoviedb-api', '../../lib/grid'],
    function (dataUtils, themoviedbApi) {

        new Vue({
            el: '#app',
            data: {
                lista: [],
                busca: null,
                token: null,
                colunas: [{coluna: 'urlImg', imagem: true}, {coluna: 'title', alternativo: 'name', titulo: 'Titulo'}]
            },
            async mounted() {
                await this.getToken();
            },
            methods: {
                visualizar(item) {
                    location.href = 'visualizarSerie.html?id=' + item.id + '&tipo=' + item.media_type;
                },
                async buscarFilmesOuSeries(pagina) {
                    if (!this.busca) return;
                    let resultado = await themoviedbApi.buscarFilmesOuSeries(this.busca, pagina ? pagina : 1);

                    this.lista = resultado.data;

                    this.lista.results.forEach(item => {
                        themoviedbApi.formatarItem(item);
                    });
                },
                async getToken() {
                    this.token = JSON.parse(localStorage.getItem('themoviedb-token'));

                    if (!this.token || dataUtils.isMenorData(this.token.expires_at, new Date())) {
                        await this.setToken();
                    }
                },
                async setToken() {
                    var resposta = await themoviedbApi.gerarToken();
                    this.token = resposta.data;

                    localStorage.setItem('themoviedb-token', JSON.stringify(this.token));
                }
            }
        })
    });
