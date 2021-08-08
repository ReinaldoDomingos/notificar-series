requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../componentes/home'
    }
});

requirejs(['app/main']);