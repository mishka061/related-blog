import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function postComment(req, res, usersdb, blogsdb) {
  console.log('postComment');
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    const id = req.params.id;
    const blog = await blogsdb.findOne({ _id: new ObjectId(id) });
    if (!blog) {
      console.error("Blog not found");
      return res.status(404).send("Blog not found");
    }
    const newComment = req.body.comment;
    blog.comments = blog.comments || [];
    blog.comments.push(newComment);
    await blogsdb.updateOne(
      { _id: new ObjectId(id) },
      { $set: { comments: blog.comments } }
    );
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      const user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      res.render("comments", {
        layout: false,
        newComment: newComment,
        tokenIsPresent: tokenIsPresent,
        login: login,
        role: user.role,
        title: messageSusses.success.titleBlogId + "-" + blog.title,
      });
    } else {
      res.render("comments", {
        layout: false,
        comments: blog.comments,
        title: messageSusses.success.titleBlogId + "-" + blog.title,
      });
    }
  } catch (error) {
    console.error(messageError.errors.getBlogIdError, error);
    res.status(500).json({ error: messageError.errors.getBlogIdError });
  }
}
