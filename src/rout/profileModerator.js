import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messageError } from "../messages/messagesErrors.js";
import { messageSusses } from "../messages/messagesSusses.js";

export async function getProfileModerator(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      const { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let allBlogs = await blogsdb.find().toArray();
      let arrBlogs = await blogsdb
        .find({ status: messageSusses.success.messageWaiting })
        .toArray();
      res.render("profileModerator", {
        allBlogs: allBlogs,
        arrBlogs: arrBlogs,
        tokenIsPresent: tokenIsPresent,
        login: login,
        user: user,
        role: user.role,
        title: messageSusses.success.titleProfileModerator,
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

export async function postProfileModerator(req, res, usersdb, blogsdb) {
  try {
    const tokenInfo = await getTokenAndCookie(req, usersdb);
    if (tokenInfo) {
      let { login, tokenIsPresent, userId } = tokenInfo;
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      let blogId = req.body.blogId;
      let commentToDelete = req.body.comments;
      let status = req.body.status;
      let allBlogs = await blogsdb.find().toArray();
      let arrBlogs;
      if (commentToDelete) {
        await blogsdb.updateOne(
          { _id: new ObjectId(blogId) },
          { $pull: { comments: commentToDelete } }
        );
        arrBlogs = await blogsdb
          .find({ status: messageSusses.success.messageWaiting })
          .toArray();
      }
      if (status === messageSusses.success.messageWaiting) {
        await blogsdb.updateOne(
          { _id: new ObjectId(blogId) },
          { $set: { status: messageSusses.success.messageApproved } }
        );
        await blogsdb.findOne({ status: messageSusses.success.messageWaiting });
      }
      if (status === messageSusses.success.messageWaiting) {
        await blogsdb.updateOne(
          { _id: new ObjectId(blogId) },
          {
            $set: {
              status: messageSusses.success.messageDraft,
              rejectComment: req.body.rejectComment,
            },
          }
        );
        arrBlogs = await blogsdb
          .find({ status: messageSusses.success.messageWaiting })
          .toArray();
      }
      res.render("profileModerator", {
        arrBlogs: arrBlogs,
        allBlogs: allBlogs,
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
