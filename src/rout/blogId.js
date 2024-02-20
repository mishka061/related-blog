import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getBlogId(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    let id = req.params.id;
    let blog = await blogsdb.findOne({ _id: new ObjectId(id) });
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      res.render("blogId", {
        blog: blog,
        id: id,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        comment: blog.comment,
        title: messageSusses.success.titleBlogId + "-" + blog.title,
      });
    } else {
      res.render("blogId", {
        blog: blog,
        id: id,
        title: messageSusses.success.titleBlogId + "-" + blog.title,
      });
    }
  } catch (error) {
    console.error(messageError.errors.getBlogIdError, error);
  }
}
