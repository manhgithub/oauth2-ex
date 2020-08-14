require('dotenv').config();

module.exports = {

    'googleAuth': {
        'clientId': process.env.CLIENT_ID ,
        'clientSecret': process.env.CLIENT_SECRET,
        'callBackUrl': 'http://localhost:3000/google/auth/redirect'
    }, 
    'facebookAuth': {
        'clientId': process.env.FB_ID,
        'clientSecret': process.env.FB_SECRECT,
        'callBackUrl': 'http://localhost:3000/facebook/auth/redirect'
    }
};