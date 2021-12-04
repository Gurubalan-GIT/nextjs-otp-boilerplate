import CryptoJS from "crypto-js";

export const encrypt = (plaintext) => {
  return plaintext
    ? CryptoJS.AES.encrypt(
        plaintext,
        process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY
      ).toString()
    : null;
};

export const decrypt = (cipherText) => {
  return cipherText
    ? CryptoJS.AES.decrypt(
        cipherText,
        process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY
      ).toString(CryptoJS.enc.Utf8)
    : null;
};
