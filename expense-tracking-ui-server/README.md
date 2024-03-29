# expense-tracking-ui-server

UI Server that processes expenses and inserts them on a spreadsheet

## Development

Install all the dependencies the project requires to be built.

```bash
npm i

```

To properly run this service, you will need to a setup a `.env` file. Start by creating a copy of the `.env.tpl` file and fill the variables with values appropriate for the execution context.

|          Variable Name       | Variable Description   |
| :--------------------------: | :--------------------- |
|      `VAPID_PUBLIC_KEY`      | VAPID public key.      |
|      `BACKEND_ENDPOINT`       | Backend URL endpoint.      |
|      `KEY_FILE_PATH`         | SSL Key.               |
|      `CERTIFICATE_FILE_PATH` | SSL Certificate.       |
|      `HTTP_PORT`             | HTTP Port where application will be running.       |
|      `HTTPS_PORT`            | HTTPS Port where application will be running.       |

Run the local server via `npm run start`


## Contact

This template was prepared by:

- João Freitas, @freitzzz
- Rute Santos, @rutesantos4

Contact us for freelancing work!
