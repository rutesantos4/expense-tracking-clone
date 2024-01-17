# setup

To contribute to this project or build everything locally, start by cloning the repository:

```bash
git clone https://github.com/rutesantos4/expense-tracking-clone
```

Afterwards, install the client-side Git hooks to automatically format and lint the project before pushing new commits.

```bash
./hooks/INSTALL
```

Then, install all the dependencies the project requires to be built.

```bash
npm i

```

To properly run this service, you will need to a setup a `.env` file. Start by creating a copy of the `.env.tpl` file and fill the variables with values appropriate for the execution context.

|     Variable Name     | Variable Description                                      |
| :-------------------: | :-------------------------------------------------------- |
|    `spreadsheetId`    | Id of Google spreadsheet.                                 |
|   `credentialsFile`   | Path to the file that contains the Google API credentials |
|    `vapidSubject`     | VAPID subject.                                            |
|   `vapidPublicKey`    | VAPID public key.                                         |
|   `vapidPrivateKey`   | VAPID private key.                                        |
|  `subscriptionsFile`  | Path to the Subscriptions file.                           |
|     `keyFilePath`     | SSL Key.                                                  |
| `certificateFilePath` | SSL Certificate.                                          |
|      `httpPort`       | HTTP Port where application will be running.              |
|      `httpsPort`      | HTTPS Port where application will be running.             |

If everything finished successfully, you're ready to start hacking around! The table below will onboard you on the available commands to use.

| Script                 | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `npm run build`        | transpile and bundle files in `.cjs`, `.js`, `.d.ts` and respective source-maps |
| `npm run start`        | run the project with `swc` compilation                                          |
| `npm run test`         | run the unit tests                                                              |
| `npm run lint`         | analyze and lint the project                                                    |
| `npm run format`       | format the project based on lint feedback                                       |
| `npm run docs`         | generate docs site                                                              |
| `npm run docs:publish` | generate docs site and publish it to GitHub Pages                               |
