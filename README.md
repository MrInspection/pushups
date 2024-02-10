# Push-up Tracker

This is the beginning of a push up tracker.

**BEFORE RUNNING THE PROJECT ON ANYTHING**:

The following files or directories is the production version of **web/** directory.

```
./
--- assets/
--- index.html
--- vite.svg
```

The development files of the Web Client of Push-up tracker it's located in **web/**

## Requirements

- The Latest version of Node.js

## Development

### Discord Bot

```sh
cd bot
npm install # installs all dependencies
echo -e """
DISCORD_TOKEN=""
GUILD_ID=""
CLIENT_ID=""
""" > .env
npm run dev # It uses Nodemon to watch files for changes
```

### Web Application

```bash
cd web
npm install
npm run dev # uses vite for bundler and live server
```
