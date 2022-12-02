# Zip Pay task

## Preparing the environment

1. Prepare PostgreSQL database with two schemas: one with the name of choosing and one named `test`.
2. Create .env file based on the .env.example file. Fill out every variable and set `NODE_ENV` to `DEV`.
3. Install all the required packages with `npm i`.

## Running tests

- E2E tests: `npm run test:e2e`
- Unit tests: `npm test`

## Running the server

1. Start the server with `npm start`. The explorer is available at `http://localhost:3000/explorer`.
