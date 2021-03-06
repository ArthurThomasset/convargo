'use strict';
//test
//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury':0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury':0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury':0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  },
  {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  },
   {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  },
  {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  },
   {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  },
  {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  },
   {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function calculPrice(pourcentage, i, j){

	var charge = 0;
	if(deliveries[i].options.deductibleReduction == true){
		var charge = Math.floor(deliveries[i].volume);
	}

	var distance = deliveries[i].distance * truckers[j].pricePerKm;
	var volume = deliveries[i].volume * truckers[j].pricePerVolume*(1 - pourcentage);

	var shippingPrice = distance+volume;


	deliveries[i].price = shippingPrice + charge;

	var commission = (shippingPrice*0.3);
	var insurance = commission/2
	var treasury = Math.ceil(deliveries[i].distance / 500);
	var convargo = commission - (insurance + treasury) + charge;

	deliveries[i].commission.insurance = insurance;

	deliveries[i].commission.treasury = treasury;

	deliveries[i].commission.convargo = convargo;

	for (var z = actors.length - 1; z >= 0; z--) {
		if (actors[z].deliveryId == deliveries[i].id) {
			actors[z].payment[0].amount = shippingPrice + charge;
			actors[z].payment[1].amount = shippingPrice - commission;
			actors[z].payment[2].amount = insurance;
			actors[z].payment[3].amount = treasury;
			actors[z].payment[4].amount = convargo;
		}
	 
	}


		
}

function DecreasingPricing(){
	for (var i = deliveries.length - 1; i >= 0; i--) {
		for (var j = truckers.length - 1; j >= 0; j--) {
		 if (deliveries[i].truckerId == truckers[j].id) {
		 	if(deliveries[i].volume < 5){
		 		var pourcentage = 0;
		 		calculPrice(pourcentage, i, j);}
		 	else if (deliveries[i].volume < 10) { 
		 		var pourcentage = 0.10;
		 		calculPrice(pourcentage, i, j);}
		 	else if (deliveries[i].volume < 25) { 
		 		var pourcentage = 0.30;
		 		calculPrice(pourcentage, i ,j);}
		 	else { 
		 		var pourcentage = 0.5
		 		calculPrice(pourcentage, i,j);}
		 }
		}
	}
}


DecreasingPricing();
console.log(truckers);
console.log(deliveries);
console.log(actors);
