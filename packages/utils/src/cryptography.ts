import Sm4js from 'sm4js';

const sm4 = new Sm4js({
  key: 'JeF8U9wHFOMfs2Y8',
  mode: 'ecb',
  cipherType: 'base64'
});

export const $c = {
  encrypt: (text: string | number) => sm4.encrypt(text),
  decrypt: (text: string | number) => sm4.decrypt(text)
};
