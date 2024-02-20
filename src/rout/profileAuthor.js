import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getProfileAuthor(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let arrBlogs = await blogsdb.find({ userId: userId }).toArray();
      res.render("profileAuthor", {
        arrBlogs: arrBlogs,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        title: messageSusses.success.titleProfileAuthor,
      });
    } else {
      console.error(messageError.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.err(err, messageError.errors.getProfileError);
    res.redirect("/registration");
  }
}

export async function postStatusBlogs(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let status = req.body.status;
      let arrBlogs;
      if (status === messageSusses.success.ollStatus) {
        arrBlogs = await blogsdb.find({ userId: userId }).toArray();
      } else {
        arrBlogs = await blogsdb
          .find({ userId: userId, status: status })
          .toArray();
      }

      res.render("status", {
        layout: false,
        arrBlogs: arrBlogs,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
      });
    } else {
      console.error(messageError.errors.tokenNotDefined);
      res.redirect("/registration");
    }
  } catch (err) {
    console.err(err, messageError.errors.getProfileError);
    res.redirect("/registration");
  }
}

export async function postSubmittingModerationBlog(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      await blogsdb.updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { status: messageSusses.success.messageWaiting } }
      );
      let arrBlogs = await blogsdb.find({ userId: userId }).toArray();
      res.render("profileAuthor", {
        arrBlogs: arrBlogs,
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
