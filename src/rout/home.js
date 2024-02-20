import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getHome(req, res, usersdb, blogsdb) {
  console.log('getHome')
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    let arrBlogs = await blogsdb
      .find({ status: messageSusses.success.messageApproved })
      .toArray();
    arrBlogs.sort(
      (a, b) => new Date(b.datePublication) - new Date(a.datePublication)
    );
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      res.render("home", {
        arrBlogs: arrBlogs,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        title: messageSusses.success.titleHome,
      });
    } else {
      res.render("home", {
        arrBlogs: arrBlogs,
        title: messageSusses.success.titleHome,
      });
    }
  } catch (err) {
    console.log(err, messageError.errors.getHomeError);
    res.redirect("/registration");
  }
}

export async function postHome(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    let arrBlogs;
    let category = req.body.category;
    if (category == messageSusses.success.ollCategory) {
      arrBlogs = await blogsdb.find().toArray();
    } else {
      arrBlogs = await blogsdb.find({ category: category }).toArray();
    }
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      res.render("category", {
        layout: false,
        arrBlogs: arrBlogs,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        category: category,
        title: messageSusses.success.titleHome,
      });
    } else {
      res.render("category", {
        layout: false,
        arrBlogs: arrBlogs,
        category: category,
        title: messageSusses.success.titleHome,
      });
    }
  } catch (err) {
    console.log(err, messageError.errors.postHomeError);
    res.redirect("/registration");
  }
}
