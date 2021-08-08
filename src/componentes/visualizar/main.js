define(['../../utils/api-utils', '../../extensao/themoviedb-api', '../../utils/data-utils', '../../filters/filters','../../lib/buttons'],
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
                await this.buscarSerieOuFilme();
            },
            methods: {
                voltar() {
                    location.href = '.';
                },
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
                async buscarSerieOuFilme() {
                    const resposta = await themoviedbApi.buscarSerieOuFilme(this.filters.id, this.filters.tipo);
                    this.serie = resposta.data;
                    themoviedbApi.formatarItem(this.serie);

                    this.serie.titulo = this.serie.name ? this.serie.name : this.serie.title;
                }
            }
        });
    });