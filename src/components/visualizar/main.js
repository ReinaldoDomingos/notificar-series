define(['../../utils/api-utils', '../../js/themoviedb-api', '../../utils/data-utils', '../../filters/filters'],
    function (apiUtils, themoviedbApi, dataUtils) {

        new Vue({
            el: '#app',
            data: {
                serie: null,
                episodios: [],
                filters: apiUtils.getFilters(),
                temporadaSelecionada: null
            },
            async mounted() {
                await this.buscarSerie();
            },
            methods: {
                async buscarTemporadaSerie(temporada) {
                    if (this.temporadaSelecionada === temporada.id) {
                        this.episodios = []
                        temporada.visualizando = false;
                        this.temporadaSelecionada = null;
                    } else {
                        this.temporadaSelecionada = temporada.id;
                        const resposta = await themoviedbApi.buscarTemporadaSerie(this.serie.id, temporada.season_number);
                        temporada.visualizando = true;
                        this.episodios = resposta.data.episodes;
                    }
                },
                async buscarSerie() {
                    const resposta = await themoviedbApi.buscarSerie(this.filters.id);
                    this.serie = resposta.data;
                    themoviedbApi.formatarItem(this.serie);
                }
            }
        });
    });