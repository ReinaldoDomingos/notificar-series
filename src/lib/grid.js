Vue.component('grid', {
    props: ['lista', 'atributos', 'atributosSelecionaveis', 'funcao', 'funcaoEditar',
        'funcaoExcluir', 'funcaoSalvar', 'funcaoClique', 'isModoVisualizar', 'escoderBototes'],
    data() {
        return {
            maximoPaginasExibidas: 10
        };
    },
    template: `
      <div>
      <div class="caixa grid">
        <button v-show="funcaoEditar" @click="funcaoEditar()" class="btn btn-primary float-left"
                style="margin-bottom: 20px;">Adicionar
        </button>
        <div class="table-responsive-xl">
          <table class="table table-hover">
            <thead>
            <tr>
              <th v-for="atributo in atributos">{{ atributo.titulo }}</th>
              <th v-for="atributo in atributosSelecionaveis">{{ atributo.titulo }}</th>
              <th v-show="!escoderBototes && atributos && atributos.length && (funcaoEditar || funcaoExcluir || isModoVisualizar)">
                Ações
              </th>
            </tr>
            </thead>
            <tbody>
            <tr @click="funcaoClique(item)" v-for="item in lista.results">
              <td v-for="atributo in atributos">
                <span
                    v-show="!atributo.editavel && !atributo.imagem">{{ item[atributo.coluna] ? item[atributo.coluna] : item[atributo.alternativo] }}</span>
                <caixa-de-numero v-show="atributo.editavel" :valor="item" :campo="atributo.coluna"></caixa-de-numero>
                <img v-if="atributo.imagem" class="logo-imagem" v-bind:src="item[atributo.coluna]" alt="">
              </td>
              <td v-for="atributo in atributosSelecionaveis">
                <caixa-de-selecao :on-selecionar="funcaoSalvar(item)" :valor="item"
                                  v-bind:campo="atributo.chaveObjeto" :lista="atributo.lista"
                                  chave-combo="this" campo-combo="nome">
                </caixa-de-selecao>
              </td>
              <td v-show="!escoderBototes && atributos && atributos.length && (funcaoEditar || funcaoExcluir || isModoVisualizar)">
                <a v-show="isModoVisualizar" class="btn" @click="funcaoEditar(item.id, true)">
                  <i class="material-icons">visibility</i>
                </a>
                <a v-show="funcaoEditar" class="btn" @click="funcaoEditar(item.id)">
                  <i class="material-icons">edit</i>
                </a>
                <a v-show="funcaoSalvar" class="btn" @click="funcaoSalvar(item)()">
                  <i class="material-icons">check</i>
                </a>
                <a v-show="funcaoExcluir" class="btn" @click="funcaoExcluir(item)">
                  <i class="material-icons">clear</i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
          <nav v-if="lista.results" class="paginacao">
            <ul class="pagination">
              <li @click="paginaAnterior" v-bind:class="{disabled:lista.page===1}" class="page-item">
                <a class="page-link">Anterior</a>
              </li>
              <li @click="irPagina(pagina)" class="page-item" v-for="pagina in ultimaPagina"
                  v-bind:class="{active: pagina === lista.page}">
                <a class="page-link">{{ pagina }}</a>
              </li>
              <li @click="proximaPagina"
                  v-bind:class="{disabled:lista.total_pages===1 || lista.page === lista.total_pages}"
                  class="page-item">
                <a class="page-link">Próximo</a>
              </li>
            </ul>
            <span class="contagem">Exibindo {{ lista.results.length }} resultados</span>
          </nav>
        </div>
      </div>
      </div>
    `,
    mounted() {
        this.setMaximoPaginasExibidas();
        window.onresize = this.setMaximoPaginasExibidas;
    },
    computed: {
        ultimaPagina() {
            let ultimaPagina = this.lista.page + this.numeroPaginasExibidas;
            return ultimaPagina <= this.lista.total_pages ? ultimaPagina : this.lista.total_pages;
        },
        numeroPaginasExibidas() {
            return this.lista.total_pages <= this.maximoPaginasExibidas ?
                this.lista.total_pages : this.maximoPaginasExibidas;
        }
    },
    methods: {
        setMaximoPaginasExibidas() {
            if (window.innerWidth < 900) {
                this.maximoPaginasExibidas = 5;
            } else {
                this.maximoPaginasExibidas = 10;
            }
        },
        paginaAnterior() {
            if (this.lista.page > 1) {
                this.funcao(this.lista.page - 1);
            }
        },
        proximaPagina() {
            if (this.lista.page < this.lista.total_pages) {
                this.funcao(this.lista.page + 1);
            }
        },
        irPagina(pagina) {
            console.log(pagina)
            this.funcao(pagina);
        }
    }
});