require('dotenv').config();

module.exports = {

    'googleAuth': {
        'clientId': process.env.CLIENT_ID ,
        'clientSecret': process.env.CLIENT_SECRET,
        'callBackUrl': process.env.GOOGLE_CALLBACK
    }, 
    'facebookAuth': {
        'clientId': process.env.FB_ID,
        'clientSecret': process.env.FB_SECRECT,
        'callBackUrl': process.env.FB_CALLBACK
    }
};