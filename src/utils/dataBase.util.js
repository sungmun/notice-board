import uuid from 'uuid4';
import { scryptSync } from 'crypto';

export const uuidV4 = () => {
  const hash = uuid().split('-');
  const sortHash = [hash[3], hash[2], hash[1], hash[4], hash[5]];
  return sortHash.join('');
};

export const inCodingPassword = (val, salt) => {
  return scryptSync(val, salt, 64, { N: 1024 }).toString('hex');
};

export const validPassword = (inputPassword, password, salt) => {
  const hash = scryptSync(inputPassword, salt, 64, { N: 1024 }).toString('hex');
  return hash === password;
};
