require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Pushup } = require("./Pushups");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

const port = process.env.PORT;

function authenticatedRoute(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.data = data;
    next();
  } catch (err) {
    next(err);
  }
}

app.get("/getDiscordData", async (req, res) => {
  const code = req.query.code;
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code: code,
    scope: "identity",
    redirect_uri: process.env.REDIRECT_URI,
  };

  // Exchange the authorization code for an access token
  let response = await axios.post(
    "https://discord.com/api/oauth2/token",
    new URLSearchParams(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const accessToken = response.data.access_token;

  // Use the access token to fetch user data
  response = await axios.get("https://discord.com/api/v9/users/@me", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = response.data;

  const { id, username, avatar, discriminator, locale } = userData;

  const token = jwt.sign(
    { id, username, avatar, discriminator, locale },
    process.env.JWT_SECRET
  );

  res.redirect(`${process.env.DASHBOARD_URL}?token=${token}`);
});

app.get("/pushups", authenticatedRoute, async (req, res) => {
  console.log(req.data);
  const pushup = await Pushup.findOne({ user_id: req.data.id });
  await pushup.updateToday();
  res.json({
    pushups: pushup.pushups_today,
  });
});

app.post("/pushups", authenticatedRoute, async (req, res) => {
  const { pushups } = req.body;

  const push = await Pushup.findOne({ user_id: req.data.id });

  await push.insertPushup(pushups);
  res.json({ error: false, message: "Pushups updated" });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
