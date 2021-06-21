# Node-2fa
___
Two factor integration for node js.

This module uses [otplib](libhttps://github.com/yeojz/otplib)  which implements TOTP ( RFC 6238 ) (the Authenticator standard), which is based on HOTP ( RFC 4226 ) to provide codes that are exactly compatible with all other Authenticator apps and services that use them.

## Usage
___

`npm install `

```
const twoFactor = require('');

const secret = twofactor.generateSecret({ name: "My First App", account: "testAccount" });

    output =>  
    { 
        secret: 'AC6RQM7AQYJ5KFOMRM2U5MZU7YARXJXO',
        uri:'otpauth://totp/App?secret=AC6RQM7AQYJ5KFOMRM2U5MZU7YARXJXO&issuer=App',
        qr:'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/App%3Fsecret=AC6RQM7AQYJ5KFOMRM2U5MZU7YARXJXO%26issuer=App' 
    }
    

const token = twofactor.generateToken("XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W");
    output => { token: 138441 }
    
twofactor.verifyToken("XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W", "138441");  
    output => { true }  
    
twofactor.verifyToken("XDQXYCP5AC6FA32FQXDGJSPBIDYNKK5W", "000000");  
    output => { false }      
```

## API
___

### generateSecret(_options_)

Options is an object which contains name and account. This name will be show in the authenticator app when the user scans the qr code and
open the authenticator app.

This function will return a response object with 32-character secret , uri which is able to generate own QR code and qr with direct link to a QR code served via HTTPS by the Google Chart API.

### generateSecret(_options_)

Option is an object which contains secret and this returns an object  containing a 6-character token.

### verifyToken(_secret, token_) 

This function checks the time-based matches the token from the secret key and returns the boolean value. (true or false)


