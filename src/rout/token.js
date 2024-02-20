import jwt from "jsonwebtoken";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

let secretKey = "12345";
export default secretKey;

export async function getTokenAndCookie(req) {
  try {
    let tokenIsPresent = req.cookies.token ? true : false;
    let decoded, login, userId;
    if (tokenIsPresent) {
      decoded = jwt.verify(req.cookies.token, secretKey);
      login = decoded.login;
      userId = decoded.userId;
      console.log(messageSusses.success.successfulToken);
      return { decoded, login, tokenIsPresent, userId };
    } else {
      console.error(messageError.errors.tokenVerificationError);
    }
  } catch (error) {
    console.log(error, messageError.errors.tokenAndCookieError);
  }
}
