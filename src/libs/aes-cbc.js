const CryptoJS = require("crypto-js");

let _secretKey = "20ee31190d1d3dd624846e81c782c5b8d531bd40";

export default {
  encrypt: function(message) {
    let key = CryptoJS.enc.Utf8.parse(_secretKey);
    let iv = CryptoJS.lib.WordArray.random(16);

    let encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    let ciphertext = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);

    return ciphertext;
  },

  decrypt: function(ciphertext) {
    try {
      if(ciphertext === null || ciphertext === '' || ciphertext === undefined)
        return "";

      let key = CryptoJS.enc.Utf8.parse(_secretKey);
      let ciphertextAndIV = CryptoJS.enc.Base64.parse(ciphertext);
      let iv = ciphertextAndIV.clone();
      iv.sigBytes = 16;
      iv.clamp();

      let encrypted = ciphertextAndIV.clone();
      encrypted.words.splice(0, 4); // remove IV
      encrypted.sigBytes -= 16;

      let decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: encrypted,
        },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      return ''
    }
  },

  nullCheckToJsonParse: function (str) {
    if (str){
      return JSON.parse(str);
    }else {
      return '';
    }
  }
};
