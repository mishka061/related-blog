import jwt from "jsonwebtoken";
import secretKey from "./token.js";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";
import bcrypt from "bcrypt";

export async function getAuthorisation(req, res) {
  try {
    res.render("authorization", {
      layout: "registration",
      title: messageSusses.success.titleAuthorisation,
    });
  } catch (error) {
    console.error(error, messageError.errors.getAuthorisationError);
  }
}

export async function postAuthorisation(req, res, usersdb) {
  try {
    let { email, password } = req.body;
    if (req.body.submit) {
      let user = await usersdb.findOne({ email });
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          let token = jwt.sign(
            {
              login: user.login,
              password: user.password,
              userId: user._id,
            },
            secretKey,
            { expiresIn: "12h" }
          );
          res.cookie("token", token);
          console.log(messageSusses.success.successfulAuthorization);
          res.redirect("/");
        } else {
          let errorAuthorization = messageError.errors.emailEndLoginlNotFoundError;
          res.render("authorization", {
            layout: "registration",
            errorAuthorization: errorAuthorization,
          });
          console.error(messageError.errors.authorizationError);
        }
      } else {
        let errorAuthorization = messageError.errors.emailEndLoginlNotFoundError;
        res.render("authorization", {
          layout: "registration",
          errorAuthorization: errorAuthorization,
        });
        console.error(messageError.errors.authorizationError);
      }
    } else {
      console.error(messageError.errors.postRegistrationError);
    }
  } catch (err) {
    console.error(messageError.errors.postAuthorizationError, err);
  }
}
