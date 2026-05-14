import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getRequiredEnv = (key) => {
  const value = process.env[key];

  if (!value || String(value).trim() === '') {
    throw new Error(`[ENV_CONFIG_ERROR] Missing required environment variable: ${key}`);
  }

  return value;
};

const getOptionalEnv = (key, defaultValue) => {
  const value = process.env[key];
  return value && String(value).trim() !== '' ? value : defaultValue;
};

export const envConfig = Object.freeze({
  NODE_ENV: getRequiredEnv('NODE_ENV'),
  MONGO_URI: getRequiredEnv('MONGO_URI'),
  JWT_SECRET: getRequiredEnv('JWT_SECRET'),
  JWT_EXPIRES_IN: getOptionalEnv('JWT_EXPIRES_IN', '30d'),
});
