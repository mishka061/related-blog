import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getDeleteBlog(req, res, usersdb, blogsdb) {
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
        console.log('id', id)
         await blogsdb.deleteOne({ _id: new ObjectId(id)})
        res.redirect(`/profile/${user.role}`);
        console.log(messageSusses.success.deletedSuusses);
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(messageError.errors.getEditBlogError, err);
    res.status(500).send(messageError.errors.internalServerError);
  }
}

