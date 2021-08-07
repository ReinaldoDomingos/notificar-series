requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../components/home'
    }
});

requirejs(['app/main']);