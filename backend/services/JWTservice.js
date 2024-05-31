const jwt= require('jsonwebtoken');


const ACCESS_TOEKN_SECRET="9ee83ee1a859be9cc37efe9e9c0118d36de91aa20bb064e090c79f0871280d15088de3bc86ecb4d4caccfaff5435cbac72598cec63d0fb5da241ecd4fa71aa68"

const REFRESH_TOKEN_SECRET= "9ee83ee1a859be9cc37efe9e9c0118d36de91aa20bb064e090c79f0871280d15088de3bc86ecb4d4caccfaff5435cbac72598cec63d0fb5da241ecd4fa71aa68"

class JWTService{
    // sign access token
    signAccessToken(payload, expiryTime, secret= ACCESS_TOEKN_SECRET){
        return jwt.sign(payload, secret, {expiresIn: expiryTime})
    }

    // sign refresh token

    signRefreshToken(payload, expiryTime, secret= REFRESH_TOKEN_SECRET){
        return jwt.sign(payload, secret, {expiresIn: expiryTime})
    }



    // verify access token
    // verify refresh token

    // store refresh token 
}