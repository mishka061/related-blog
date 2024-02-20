import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getEditBlog(req, res, usersdb, blogsdb) {
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
        let id = req.params.id
        let blog = await blogsdb.findOne({ _id: new ObjectId(id)})
      res.render("edit", {
        blog: blog,
        id: id,
        tokenIsPresent: tokenIsPresent,
        user: user,
        role: user.role,
        title: messageSusses.success.titleEditBlog
      });
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(messageError.errors.getEditBlogError, err);
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
  
export async function postEditBlog(req, res, usersdb, blogsdb) {
  try {
    let { description, title, text, status, id } = req.body;
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

      let form = {
        title: title,
        description: description,
        text: text,
        status: status,
        userId: userId,
        role: user.role,
        datePublication: datePublication,
      };
      await blogsdb.updateOne({ _id: new ObjectId(id) },{$set:form});

      res.redirect('/home');
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(messageError.errors.postCreateBlogError, err);
    res.status(500).send(messageError.errors.internalServerError);
  }
}
