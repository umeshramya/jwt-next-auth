const {encrypt, decrypt} = require("./lib/jwt")
// Example usage
const originalText = "Hello, world!";
const encryptedText = encrypt(originalText);
const decryptedText = decrypt(encryptedText);

console.log("Original Text:", originalText);
console.log("Encrypted Text:", encryptedText);
console.log("Decrypted Text:", decryptedText);



