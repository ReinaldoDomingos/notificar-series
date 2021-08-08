requirejs.config({
    baseUrl: 'lib',
    paths: {
        visualizar: '../componentes/visualizar'
    }
});

requirejs(['visualizar/main']);