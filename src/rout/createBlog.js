import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";
import fs from "fs";

export async function getCreateBlog(req, res, usersdb) {
  try {
    const { login, tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );
    let user = await usersdb.findOne({
      _id: new ObjectId(userId),
      login: login,
    });
    if (user && tokenIsPresent) {
      res.render("createBlog", {
        token: req.cookies.token,
        tokenIsPresent: tokenIsPresent,
        user: user,
        role: user.role,
        title: messageSusses.success.titleCreateBlog,
      });
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(messageError.errors.getCreateBlogError, err);
    res.status(500).send(messageError.errors.internalServerError);
  }
}

function addZero(num) {
  if (num >= 0 && num <= 9) {
    return "0" + num;
  } else {
    return num;
  }
}

export async function postCreateBlog(req, res, usersdb, blogsdb) {
  try {
    let { description, title, text, status, category } = req.body;
    const { login, tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );
    let user = await usersdb.findOne({
      _id: new ObjectId(userId),
      login: login,
    });
     if (user && tokenIsPresent) {
      let date = new Date();
      let datePublication =
        addZero(date.getFullYear()) +
        "-" +
        addZero(date.getMonth() + 1) +
        "-" +
        addZero(date.getDate());

      let image = req.file;
      const imagePath = `img/${image.originalname}`;
      fs.writeFileSync(imagePath, fs.readFileSync(image.path));
      let form = {
        img: image.originalname,
        title: title,
        description: description,
        text: text,
        category: category,
        status: status,
        userId: userId,
        role: user.role,
        datePublication: datePublication,
      };
      await blogsdb.insertOne(form);
      res.redirect(`/profile/${user.role}`);
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(messageError.errors.postCreateBlogError, err);
    res.status(500).send(messageError.errors.internalServerError);
  }
}
