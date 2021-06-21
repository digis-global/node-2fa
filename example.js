/* eslint-disable @typescript-eslint/no-var-requires */
const twoFactor = require("./dist");

console.log("*******************************");
console.log("Generating New Secret");
const newSecret = twoFactor.generateSecret({ name: "My Awesome App", account: "test" });
console.log(newSecret);

console.log("*******************************");
console.log("Generating New Token With Secret " + newSecret.secret);
const newToken = twoFactor.generateToken(newSecret.secret);
console.log(newToken);

console.log("*******************************");
console.log("Verifying Valid Token");
console.log(twoFactor.verifyToken(newSecret.secret, newToken.token));

console.log("*******************************");
console.log("Verifying Invalid Token");
console.log(twoFactor.verifyToken(newSecret.secret, "11111"));

console.log("*******************************");
console.log("Done");
