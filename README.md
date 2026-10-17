# Personal Messaging Workspace

**React · Express · Socket.IO · MySQL · Flutter templates**

A personal messaging prototype exploring web chat, authentication and real-time events. The project includes a React client, a Node.js backend and root-level Flutter integration templates.

This is an independent learning project. It is not an official WhatsApp client, and the checked-in source does not establish a working integration with the WhatsApp network.

## What the source contains

- React login and chat pages under [frontend](frontend).
- Express authentication routes and a health endpoint under [backend](backend).
- Socket.IO handlers for messages, typing and online/offline events.
- MySQL database configuration and a [schema template](backend-schema.sql).
- Flutter source fragments such as [android-app-main.dart](android-app-main.dart).

**Status:** development prototype. The mobile files are templates rather than a complete checked-in Flutter application. Group chat, persistence and delivery receipts need end-to-end validation before being described as complete.

## Local development

Use Node.js/npm compatible with the package manifests and a local MySQL database.

1. Review [backend-.env.example](backend-.env.example) and create a local `backend/.env` using your own database settings and a generated JWT secret.
2. Review and import [backend-schema.sql](backend-schema.sql) into that database.
3. Start the backend:

```bash
cd backend
npm install
npm run dev
```

4. Start the web client in another terminal:

```bash
cd frontend
npm install
npm start
```

The backend defaults to port `5000`; its process health route is `/health`. Review frontend service URLs and allowed origins before connecting the two processes.

## Repository map

| Location | Role |
| --- | --- |
| [backend/index.js](backend/index.js) | Express server and Socket.IO events |
| [backend/routes](backend/routes) | Authentication routes |
| [frontend/src](frontend/src) | Web client |
| [android-app-pubspec.yaml](android-app-pubspec.yaml) | Mobile dependency template |
| [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md) | Earlier assembly/setup notes |

Earlier setup notes describe intended layouts that may differ from the current snapshot. The directories and manifests above are the starting point for source review. No production deployment or complete test result is claimed.

Part of [Datta Dhebe's engineering portfolio](https://github.com/DattaDhebe).
