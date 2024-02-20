import express from "express";
import expressHandlebars from "express-handlebars";
import __dirname from "./__dirname.js";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from 'path';
import { messageError } from "./src/messages/messagesErrors.js";
import { getRegistration, postRegistration } from "./src/rout/registration.js";
import { getCreateBlog, postCreateBlog } from "./src/rout/createBlog.js";
import { getEditBlog, postEditBlog } from "./src/rout/edit.js";
import { getDeleteBlog } from "./src/rout/delete.js";
import { getHome, postHome } from "./src/rout/home.js";
import { getBlogId } from "./src/rout/blogId.js";
import { postComment } from "./src/rout/comment.js";
import {
  getProfileAuthor,
  postStatusBlogs,
  postSubmittingModerationBlog,
} from "./src/rout/profileAuthor.js";
import {
  getProfileModerator,
  postProfileModerator,
} from "./src/rout/profileModerator.js";
import {
  getProfileAdministrator,
  postProfileAdministrator,
} from "./src/rout/profileAdministrator.js";
import { getAuthorisation, postAuthorisation } from "./src/rout/authorization.js";

const handlebars = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
    eq: function (arg1, arg2) {
      return arg1 === arg2;
    },
  },
});
let app = express();
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views/"));

app.use(express.static(__dirname + "/dist/images/"));
app.use(express.static(__dirname + "/dist/img"));
app.use(express.static(__dirname + "/dist/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");
let mongoClient = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");
try {
  let mongo = await mongoClient.connect();
  let db = mongo.db("related-blog");
  let usersdb = db.collection("users");
  let blogsdb = db.collection("blogs");

  app.get("/registration", async function (req, res) {
    await getRegistration(req, res);
  });

  app.post("/registration", async function (req, res) {
    await postRegistration(req, res, usersdb);
  });

  app.get("/authorization", async function (req, res) {
    await getAuthorisation(req, res, usersdb);
  });

  app.post("/authorization", async function (req, res) {
    await postAuthorisation(req, res, usersdb);
  });

  app.get("/", async function (req, res) {
    await getHome(req, res, usersdb, blogsdb);
  });

  app.post("/category", upload, async function (req, res) {
    await postHome(req, res, usersdb, blogsdb);
  });

  app.get("/profile/moderator", async function (req, res) {
    await getProfileModerator(req, res, usersdb, blogsdb);
  });

  app.post("/profile/moderator", upload, async function (req, res) {
    await postProfileModerator(req, res, usersdb, blogsdb);
  });

  app.get("/profile/administrator", async function (req, res) {
    await getProfileAdministrator(req, res, usersdb);
  });

  app.post("/profile/administrator", upload, async function (req, res) {
    await postProfileAdministrator(req, res, usersdb);
  });

  app.get("/blog/:id", async function (req, res) {
    await getBlogId(req, res, usersdb, blogsdb);
  });

  app.post("/blog/:id/comments", upload, async function (req, res) {
    await postComment(req, res, usersdb, blogsdb);
  });

  app.get("/profile/author", async function (req, res) {
    await getProfileAuthor(req, res, usersdb, blogsdb);
  });

  app.post("/profile/author/status", upload, async function (req, res) {
    await postStatusBlogs(req, res, usersdb, blogsdb);
  });

  app.post("/profile/author", async function (req, res) {
    await postSubmittingModerationBlog(req, res, usersdb, blogsdb);
  });

  app.get("/createBlog", async function (req, res) {
    await getCreateBlog(req, res, usersdb, blogsdb);
  });

  app.post("/createBlog", upload, async function (req, res) {
    await postCreateBlog(req, res, usersdb, blogsdb);
  });

  app.get("/edit/:id", async function (req, res) {
    await getEditBlog(req, res, usersdb, blogsdb);
  });

  app.post("/edit/:id", async function (req, res) {
    await postEditBlog(req, res, usersdb, blogsdb);
  });
  app.get("/delete/:id", async function (req, res) {
    await getDeleteBlog(req, res, usersdb, blogsdb);
  });
} catch (err) {
  console.error(err, "no connected db");
}

app.use(function (req, res) {
  res.status(404).render("404", {
    layout: "404",
    title: messageError.errors.titleError,
  });
});

app.listen(3000, function () {
  console.log("running");
});
