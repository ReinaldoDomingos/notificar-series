requirejs.config({
    baseUrl: 'lib',
    paths: {
        visualizar: '../components/visualizar'
    }
});

requirejs(['visualizar/main']);