var casper = require('casper').create();

casper.on('remote.message', function(msg) {
	this.echo(msg);
});

casper.start('http://www.cetelem.com.br', function() {
	this.capture('./output/test.png');
	console.log('Testing...');
	var user = this.getElementAttribute('#usuario', 'value');
	console.log('User before: ' + user);
	//casper.sendKeys('#usuario', 'teste');
	this.fillSelectors('form[method="get"]', {
		'input[name="usuario"]': 'teste'
	}, true);
	user = this.getElementAttribute('#usuario', 'value');
	console.log('User after: ' + user);
	//this.click('#button');
});

casper.waitForSelector('input#password', function() {
	console.log('next page...');
	this.capture('./output/test2.png');
});

casper.run();