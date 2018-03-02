'use strict';
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');


exports.get = function(event, context) {

  // Grabs ticker from URL
  var ticker = event.pathParameters.currency;

  rp(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ticker}&tsyms=USD`)
    .then(function (response) {
      var json = JSON.parse(response);

      var html = `
      <li class="tile-case">
        <a href="#">
          <div class="tile-primary-content">
            <h1>${json['DISPLAY']['BTC']['USD']['FROMSYMBOL']}</h1>
            <p>${json['RAW']['BTC']['USD']['FROMSYMBOL']}</p>
          </div>
          <div class="tile-secondary-content">
            <h2>${json['DISPLAY']['BTC']['USD']['PRICE']}</h2>
            <p>${json['RAW']['BTC']['USD']['FROMSYMBOL']}</p>
          </div>
          </a>
        </li>
      </ul>
      `;

      context.succeed({
        statusCode: 200,
        body: html,
        headers: {'Content-Type': 'text/html'}
      });
    })
    .catch(function () {
      console.log('error: ', context.error);
    });

};
