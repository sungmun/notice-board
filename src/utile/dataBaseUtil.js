import uuid from 'uuid4';
import { pbkdf2Sync } from 'crypto';
import config from 'config';

export const uuidV4 = () => {
  const hash = uuid().split('-');
  const sortHash = [hash[3], hash[2], hash[1], hash[4], hash[5]];
  return sortHash.join();
};

const salt = config.get('salt');
export const incoding = val => pbkdf2Sync(val, salt, 100000, 64, 'sha512');
