import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getProfileAdministrator(req, res, usersdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let arrUsers = await usersdb.find().toArray();
      res.render("profileAdministrator", {
        arrUsers: arrUsers,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        title: messageSusses.success.titleProfileAdministrator,
      });
    } else {
      console.error(messageError.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.log(err, messageError.errors.getProfileError);
    res.redirect("/registration");
  }
}

export async function postProfileAdministrator(req, res, usersdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent } = tokenInfo;
      let id = req.body.id;
      const user = await usersdb.findOne({ _id: new ObjectId(id) });
      if (!user) {
        console.error(messageError.errors.userNotDefined);
        return res.status(404).send(messageError.errors.userNotDefined);
      }
      await usersdb.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role: req.body.role } }
      );
      let arrUsers = await usersdb.find().toArray();
      res.render("profileAdministrator", {
        arrUsers: arrUsers,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
      });
    } else {
      console.error(messageError.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.log(err, messageError.errors.getProfileError);
    res.redirect("/registration");
  }
}
