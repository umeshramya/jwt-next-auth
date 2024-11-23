// const {encrypt, decrypt} = require("./lib/jwt")
// // Example usage
// const originalText = "Hello, world!";
// const encryptedText = encrypt(originalText);
// const decryptedText = decrypt(encryptedText);

// console.log("Original Text:", originalText);
// console.log("Encrypted Text:", encryptedText);
// console.log("Decrypted Text:", decryptedText);


const {asymmetricEncrypt, asymmetricDecrypt} = require("./lib/asymtricEncrypt")
// Example usage
// Example usage
const message = 'Hello, secure UHI!';
console.log('Original Message:', message);

try {
  const encryptedMessage = asymmetricEncrypt(message);
  console.log('Encrypted Message:', encryptedMessage);

  const decryptedMessage = asymmetricDecrypt(encryptedMessage);
  console.log('Decrypted Message:', decryptedMessage);
} catch (error) {
  console.error('Error during encryption/decryption:', error.message);
}
