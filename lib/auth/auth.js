import {hash, compareSync} from 'bcrypt';

export async function hashPassword(pwd) {
  return hash(pwd, 12);
}

export function verifyPassword(pwd, hashed) {
  return compareSync(pwd, hashed);
}