/**
 * Encrypts text using AES-256-CBC
 * @param {string} text - Text to encrypt
 * @returns {string} - Encrypted text in base64 format
 */
declare function encrypt(text: string): string;
/**
 * Decrypts text using AES-256-CBC
 * @param {string} encryptedText - Text to decrypt
 * @returns {string} - Decrypted text in utf-8 format
 */
declare function decrypt(encryptedText: string): string;
export { encrypt, decrypt };
//# sourceMappingURL=encrypt.d.ts.map