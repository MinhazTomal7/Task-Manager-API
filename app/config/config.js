import * as path from "path";

export const MONGODB_CONNECTION="Your Connection String"
export const JWT_EXPIRATION_TIME = 60*60*24*30;

export const EMAIL_HOST = "Your host";
export const EMAIL_PORT = "Your Port";
export const EMAIL_USER = "Your user";
export const EMAIL_PASSWORD = "Your Password";

export const MAX_JSON_SIZE = "50mb";
export const URL_ENCODED = true;


export const REQUEST_LIMIT_TIME = 15 * 60 * 1000; // 15 Min
export const REQUEST_LIMIT_NUMBER = 3000; // Per 15 Min 3000 Request Allowed


export const WEB_CACHE=false;
export const PORT=5050

export function UPLOAD_FOLDER(filename){
    return path.resolve(process.cwd(), 'storage', filename )
}