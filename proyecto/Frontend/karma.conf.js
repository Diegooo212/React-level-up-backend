// karma.conf.js
const webpackConfig = require('./config/webpack.config'); // 1. Usamos la config de Webpack que 'eject' creó

module.exports = function(config) {
  config.set({
    // 2. Frameworks que usaremos: Jasmine y Webpack
    frameworks: ['jasmine', 'webpack'],

    // 3. Archivos que Karma debe cargar
    // Le decimos que busque TODOS los archivos .test.tsx en 'src'
    files: [
      'src/**/*.test.tsx',
      'src/**/*.test.ts'
    ],

    // 4. Pre-procesadores: Qué hacer con cada archivo
    // Le decimos: "Usa Webpack (y sourcemaps) para procesar nuestros archivos de test"
    preprocessors: {
      'src/**/*.test.tsx': ['webpack', 'sourcemap'],
      'src/**/*.test.ts': ['webpack', 'sourcemap']
    },

    // 5. Le pasamos la configuración de Webpack de tu proyecto
    // (Le quitamos 'entry' y 'output' porque Karma se encarga de eso)
    webpack: (function() {
      const config = webpackConfig('development');
      config.entry = undefined;
      config.output = undefined;
      config.optimization = undefined; // Desactivamos optimizaciones para tests
      return config;
    })(),

    webpackMiddleware: {
      stats: 'errors-only' // Solo muestra errores, no todo el log
    },

    // 6. Reporters: Dónde mostrar los resultados
    reporters: ['progress'], // Muestra el progreso en la consola
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    
    // 7. Navegador
    browsers: ['Chrome'], // Abrirá un navegador Chrome para correr los tests

    // 8. Integración continua (false = se queda abierto)
    singleRun: false,
    concurrency: Infinity
  });
};