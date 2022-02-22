import {hash, compare} from 'bcrypt';

export async function hashPassword(pwd) {
  return hash(pwd, 12);
};

export async function verifyPassword(pwd, hashed) {
  return compare(pwd, hashed);
}