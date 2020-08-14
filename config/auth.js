require('dotenv').config();

module.exports = {

    'googleAuth': {
        'clientId': process.env.CLIENT_ID ,
        'clientSecret': process.env.CLIENT_SECRET,
        'callBackUrl': 'http://localhost:3000/google/auth/redirect'
    }
};