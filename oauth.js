// var request = require('request');

// var headers = {
//     'accept': 'application/json',
//     'authorization': 'Bearer 37779ffe-2a05-4ccf-99f6-1f29ac76b18e'
// };

// var options = {
//     url: 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/AA16EC3E0327DD083A/doors',
//     headers: headers
// };

// function callback(error, response, body) {
//     console.log(body)
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
// }

// request(options, callback);

// redisClient.set('userId', `${access_token}:${refresh_token}`, () => {




const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const redis = require('redis');
const port = 3000;
const redisClient = redis.createClient();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const authorizationURI = `https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=2860f5bf-782e-4cb2-a080-b830bbf6ec8c&redirect_uri=http://localhost:3000/redirect&scope=mb:vehicle:status:general%20mb:user:pool:reader`;

//  'https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=2860f5bf-782e-4cb2-a080-b830bbf6ec8c&redirect_uri=http://localhost:3000&scope=mb:vehicle:status:general%20mb:user:pool:reader'



app.get('/first', (req, res) => {
    console.log('i am here')
  const authorizationURI = `https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=2860f5bf-782e-4cb2-a080-b830bbf6ec8c&redirect_uri=http://localhost:3000/redirect&scope=mb:vehicle:status:general%20mb:user:pool:reader`;
  res.redirect(authorizationURI);
});

const CLIENT_ID = '<>'
const SECRET_CLIENT_ID = '<>'
const auth = (`${CLIENT_ID}:${SECRET_CLIENT_ID}`).toString('base64');



app.get('/second', async (req, res) => {
  try {
    const tokenObj = await request({
      uri: 'https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/token',
      method: 'POST',
      form: {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: 'http://localhost:3000/redirect',
      },
      headers: {
        authorization: 'Basic ' + auth,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, refresh_token } = JSON.parse(tokenObj);
    
  } catch (err) {
    console.log(`${err.message}`);
  }
});


app.get('/refresh', async (req, res) => {
    try {
      const tokenObj = await request({
        uri: 'https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/token',
        method: 'POST',
        form: {
          grant_type: 'refresh_token',
          refresh_token: req.query.refresh_token,
          redirect_uri: 'http://localhost:3000/redirect',
        },
        headers: {
          authorization: 'Basic ' + auth,
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      const { access_token, refresh_token } = JSON.parse(tokenObj);
      
    } catch (err) {
      console.log(`${err.message}`);
    }
  });

app.get("/redirect", (req, res) => {
    console.log('in redirect')
    console.log( req.query.code );
    // console.log( res );
    res.json( req.query.code );

})

app.listen(port, (req, res) => { 
   
});
