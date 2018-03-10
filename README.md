# Instrucciones

- Instalar NodeJS (https://nodejs.org/es/)
- Instalar CasperJS (http://casperjs.org/) globalmente `npm install casperjs --global`
- Ingresar al path de este proyecto y ejecutar `npm install` (instalará las independencias definidas en packages.json)
- Crear la base de datos MySQL llamada "tattooScrapper"
- Crear tabla de prueba con el siguiente SQL:

````
CREATE TABLE `categoriasTinta` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `img` text,
  `url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
````

- Ejecutar la prueba con ````node index.js````

