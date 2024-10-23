// encryptDataService.js
import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Define your secret key here

const encryptDataService = {
  // Encrypt Function
  encryptData(data) {
    try {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        secretKey
      ).toString();
      return encryptedData;
    } catch (error) {
      console.error('Encryption failed:', error);
      return null;
    }
  },

  // Decrypt Function
  decryptData(encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  },
};

export default encryptDataService;
