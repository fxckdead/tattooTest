var casper = require('casper').create();
casper.start('http://www.eternaltattoosupply.com/Individual-Bottles_c_3.html');
casper.then(function(){
	var response = this.evaluate(
		function(){
			var categorias = $('section.subcategories_block > div.subcategories > ul li');
			var res = [];
			for (var index = 0; index < categorias.length; index++) {
				var categoria = categorias[index];
				res.push({
					nombre: categoria.textContent.trim(),
					img: categoria.querySelector('img').src,
					url: categoria.querySelector('a').href
				});
			}
			return res;
		}
	);
	console.log(JSON.stringify(response));
});
casper.run();
