require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const app = express();

const port = process.env.PORT;

function authenticatedRoute(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_TOKEN);
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

app.listen(port, () => console.log(`Server listening on port ${port}`));
