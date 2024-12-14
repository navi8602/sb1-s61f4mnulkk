import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export const hashPassword = async (password) => {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
};

export const comparePasswords = async (supplied, stored) => {
  const [hashedPassword, salt] = stored.split('.');
  const buf = await scryptAsync(supplied, salt, 64);
  return buf.toString('hex') === hashedPassword;
};