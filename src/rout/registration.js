import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function getRegistration(req, res) {
  try {
    res.render("registration", {
      layout: "registration",
      title: messageSusses.success.titleRegistration,
    });
  } catch (error) {
    console.error(error, messageError.errors.getRegistrationError);
  }
}

export async function postRegistration(req, res, usersdb) {
  try {
    let { login, email, password, visibility } = req.body;
    if (req.body.submit) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const existingEmail = await usersdb.findOne({ email: email });
      const existingLogin = await usersdb.findOne({ login: login });
      if (existingEmail && existingLogin) {
        let errorLoginEndEmail = messageError.errors.loginEndEmailError;
        res.render("registration", {
          layout: "registration",
          title: messageSusses.success.titleRegistration,
          errorLoginEndEmail: errorLoginEndEmail,
        });
      } else if (existingEmail || existingLogin) {
        let errorEmail = messageError.errors.notEmailError;
        let errorLogin = messageError.errors.notLoginError;
        res.render("registration", {
          layout: "registration",
          title: messageSusses.success.titleRegistration,
          errorEmail: existingEmail ? errorEmail : "",
          errorLogin: existingLogin ? errorLogin : "",
        });
      } else {
        let user = {
          login: login,
          email: email,
          role: visibility,
          password: hashedPassword,
        };
        await usersdb.insertOne(user);
        res.redirect("/authorization");
        console.log(messageSusses.success.successfulRegistration);
      }
    } else {
      console.error(messageError.errors.registrationError);
    }
  } catch (error) {
    console.error(error, messageError.errors.postRegistrationError);
  }
}
