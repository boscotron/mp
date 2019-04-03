var express = require('express');
var router = express.Router();
const mercadopago = require('mercadopago');

const engines = require('consolidate');
mercadopago.configure({
  sandbox: true,
  access_token: 'TEST-4274414704237423-112521-e5b7609e7cb1e0e46d793ba0d33f1f77-2900829'
});
console.log(mercadopago.payment);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pago/:item', function(req, res, next) {
  let b ={
    "1":{
      "nombre":"casco",
      "precio":15
    },
    "2":{
      "nombre":"rodilleras",
      "precio":15
    }
  };
  if(b[req.params.item].nombre!=undefined){
    // Create a preference structure
var preference = {
  items: [
    {
      id: '1234',
      title: 'Enormous Iron Gloves',
      quantity: 7,
      currency_id: 'MXN',
      unit_price: 83.56
    }
  ],
  payer: {
    email: 'lillian.beer@hotmail.com'
  }
};

mercadopago.preferences.create(preference)
  .then(function (preference) {
    const p = preference;
    console.clear();
    console.log(p.body.sandbox_init_point);


    console.log(b[req.params.item],req.params);
    
    res.render('index', { title: 'Express' , boton_pagar:p.body.sandbox_init_point});
    // Do something if preference has been created successfully
  }).catch(function (error) {
    console.log('error',error);
    
    // If an error has occurred
  });
    /*
    const t = b[req.params.item];
    mercadopago.payment.create({
      description: t.nombre,
      transaction_amount: t.precio,
      payment_method_id: 'rapipago',
      payer: {
        email: 'test_user_3931694@testuser.com',
        identification: {
          type: 'DNI',
          number: '34123123'
        }
      }
    }).then(function (mpResponse) {
      console.log("RESPUESTA MP >>>>>>>>>>>>>>>>>",mpResponse);
    }).catch(function (mpError) {
      console.log(mpError);
    })*/
}
});

module.exports = router;
