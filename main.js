var casper = require('casper').create();
var userName = casper.cli.get('user') + '';
var password = casper.cli.get('pass') + '';

//require("utils").dump(casper.cli);

casper.on('remote.message', function(msg){
	this.echo(msg);
});


casper.start('http://www.cetelem.com.br', function() {
	this.capture('./output/Step1.png');
	console.log('### Step1: Fill username ###');

	this.fillSelectors('form[method="get"]', {
		'input[name="usuario"]': userName
	}, true);
});

casper.waitForSelector('input#password', function() {
	console.log('### Step2: Fill password ###');
	this.capture('./output/Step2.png');
	

	for (var i = 0; i < password.length; i++)
	{
		this.click('#tecladoVirtual table tr td input[value="'+ password[i] +'"]');
	}

	this.capture('./output/Step2_1.png');	

	console.log('### Step3: Enter account overview page ###');
	
	this.click('#acessarBt img');
	this.capture('./output/Step3.png');
});

casper.waitForSelector('.destaqueVerde', function(){
	console.log('### Step4: Evaluate credit card information ###');
	this.capture('./output/Step4.png');

	var data = this.evaluate(function(){
		var result = [];
		var limitData = document.querySelectorAll('#dadosCartaoInternetBanking span');
		var creditCardData = document.querySelectorAll('#dadosCartaoInternetBanking2 span');
		
		for (var i = 1; i < limitData.length; i++){
			var obj = {};
			obj[limitData[i].innerText] = limitData[++i].innerText;
			result.push(obj);
		}

		for (var i = 1; i < creditCardData.length; i++){
			var obj = {};
			obj[creditCardData[i].innerText] = creditCardData[++i].innerText;
			result.push(obj);	
		}

		return result;
	});
	
	console.log('--- Credit Card Informations JSON Data ---');
	console.log(JSON.stringify(data));
});

casper.run(function() {
    this.echo('### Done ###').exit();
});