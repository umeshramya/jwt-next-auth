"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Generate a random key and initialization vector (IV)
const key = crypto_1.default.randomBytes(32); // 256-bit key for AES-256
const iv = crypto_1.default.randomBytes(16); // 16 bytes for AES-CBC
/**
 * Encrypts text using AES-256-CBC
 * @param {string} text - Text to encrypt
 * @returns {string} - Encrypted text in base64 format
 */
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}
exports.encrypt = encrypt;
/**
 * Decrypts text using AES-256-CBC
 * @param {string} encryptedText - Text to decrypt
 * @returns {string} - Decrypted text in utf-8 format
 */
function decrypt(encryptedText) {
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.decrypt = decrypt;
//# sourceMappingURL=encrypt.js.map