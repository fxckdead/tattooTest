// 0º Definir librerias a incluir
var mysql = require('mysql');
var async = require('async');
var exec = require('child_process').exec;


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "tattooScrapper"
});

async.waterfall([
	function(next){
		// 1º obtener las categorias
		exec('casperjs ./categoriasTinta.js', {}, (error, stdout, stderr) => {
			if(error){
				return next(error);
			}
			var data = JSON.parse(stdout);
			return next(null, data);
		});
	},
	function(data, next){
		// 2º Guardar en la base de datos
		// 2.1 Conectarse a la base de datos
		console.log('-> data', data);
		con.connect(function(err, conn){
			if(err){ return next(err); }
			console.log('-> Conectado a la db');
			return next(null, data)
		});
	},
	function(data, next){
		async.each(data, function(row, tick){
			// 2.2 genero query
			var sql = "INSERT INTO categoriasTinta (nombre, img,url) VALUES (?, ?, ?)";
			console.log('\t=> SQL: ' + sql);
			// 2.3 ejecuto la query
			con.query(sql, [row.nombre, row.img, row.url],function (err, result) {
				return tick(err);
			});
		}, next);
	}
], function(error, result){
	console.log('final', error, result) ;
	if(error){
		console.log('-> Error cascada: ', error);
		process.exit(1);
	}
	process.exit();
});
