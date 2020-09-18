var express = require('express');
var router = express.Router();
var BigCommerce = require("node-bigcommerce");
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
var opn = require('opn');

function getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret) {
    const dateCreated = Math. round((new Date()). getTime() / 1000);
    const  payload = {
        "iss": clientId,
        "iat": dateCreated,
        "jti": uuidv4(),
        "operation": "customer_login",
        "store_hash": storeHash,
        "customer_id": customerId,
    }
    let token = jwt.sign(payload, clientSecret, {algorithm:'HS256'});
    return `${storeUrl}/login/token/${token}`;
};

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const customerId = process.env.customerId;
const storeHash = process.env.storeHash;
const storeUrl = process.env.storeUrl;

/* GET home page. */
router.get('/', function (req, res, next) {
   const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);
   opn(loginUrl);

});



module.exports = router;
