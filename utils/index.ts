import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const secret = "bht secret key h bhau y"

const plainToHash = async (password: string): Promise<string> => {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(password)
    .digest('hex');

  return hash;
}

const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  const hashedPlainPassword = await plainToHash(plainPassword);
  return hashedPassword === hashedPlainPassword;
};

const generateToken = (payload: any) => {
  const secretKey = process.env.JWT_SECRET_KEY || "";
  const options = {
    expiresIn: '10h'
  };
  payload = JSON.parse(JSON.stringify(payload))

  return jwt.sign(payload, secretKey, options);
};
const decodeToken = (payload: any) => {
  const secretKey = process.env.JWT_SECRET_KEY || "";
  return jwt.verify(payload, secretKey);
};



export { plainToHash, comparePassword, generateToken, decodeToken }