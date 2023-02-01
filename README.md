# Cattle

The new generation of JOJ Frontend. Built with [Vite](https://vitejs.dev/).

## Requirements

- node.js >= 16
- pnpm

## Before Start

This frontend project uses submodule to synchronize OpenAPI interfaces with the backend.

Run the following commands in the project directory.

```bash
git submodule init
git submodule update
```

This will pull the `openapi.json` into directory `openapi`.

If the backend updated `openapi.json`, you need to pull the latest version by:

```bash
cd openapi
git checkout xxx # If you want a different branch
git pull
```

## Development

Please install `pnpm` first. This project uses `pnpm` as package manager. You can modify your registry to boost downloading.

Install dependencies:

```bash
$ pnpm install
```

After that, you can pick a following approach you prefer to start developing.

### Staging (recommended)

Run the frontend locally, while connecting to the backend deployed on a staging server.

```bash
$ pnpm dev:staging
```

Now the frontend is running on `localhost:5173`.

We need some extra setup to overcome the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).

#### Install Whistle (proxy server)

- Install [whistle](https://github.com/avwo/whistle)
  to proxy the local frontend to the staging domain.
- Start whistle by executing `w2 start` and the whistle server shall be running on `localhost:8899`.
- Visit `localhost:8899` and add a single rule:

```
nichujie.xyz 127.0.0.1:5173
```

Whistle, as a proxy server, now proxies `nichujie.xyz` to `127.0.0.1:5173`.

#### Install SwitchyOmega (for chrome)

Visiting `nichujie.xyz` in your browser now will hit the staging server, rather than your local frontend. This is becuase we have only setup the proxy server, but have not configure our browser to use that server.

Install [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) if you are using chrome. (For other browsers please refer to docs). And in settings of SwitchyOmega, have such config:

![omega](https://wproxy.org/whistle/img/switchyomega.jpg)

Remember to switch on the proxy profile in the dropdown menu of the plugin.

Now you can visit `nichujie.xyz` in your browser to access your **local frontend server**. After you save your code locally, the webpage shall reload automatically.

> Staging is a type of environment that lies between development (local) and production (online). Developers don't need to setup the backend services (database, message queue, server...), but just bring up the frontend and connect to the backend on a remote server.

### Local Development

You can also run the backend on your local machine. Please check [joj-deploy-lite](https://github.com/joint-online-judge/joj-deploy-lite) to setup the backend in one command.

Then, start the local frontend:

```bash
$ pnpm dev
```

The frontend will run on `127.0.0.1:5173` by default. All requests to the backend are proxied to `127.0.0.1:34765`.

In this mode, signing in by OAuth2 is difficult. You are recommended to use the simple

> Note: Please always use 127.0.0.1:5173 instead of localhost:5173 to avoid issues about same-site cookie policies.

### Production Staging

TODO: In the future, we may setup a staging development environment which runs frontend locally, while connecting to
online (production) backend service.

## Build

To build and deploy, run:

```bash
$ pnpm build
```

## Commands

### Generate API Client

- `pnpm gen:api` - generate API client with local `openapi.json`.
- `pnpm gen:api-dev` - generate API client with `openapi.json` fetched from local backend server.
- `pnpm gen:api-staging` - generate API client with local `openapi.json` fetched from staging (remote) backend server.

### Development

- `pnpm dev` - run `pnpm gen:api-dev`, and start a dev server.
- `pnpm dev:staging` - run `pnpm gen:api-staging`, and start a dev server.

### Deploy

- `pnpm build` - build for production. The generated files will be on the `dist` folder. (need to generate API client first)
- `pnpm preview` - locally preview the production build.

### Testing & Linting

- `pnpm test` - run unit and integration tests related to changed files based on git.
- `pnpm test:ci` - run all unit and integration tests in CI mode.
- `pnpm test:e2e` - run all e2e tests with the Cypress Test Runner.
- `pnpm test:e2e:headless` - run all e2e tests headlessly.
- `pnpm format` - format all files with Prettier.
- `pnpm lint` - runs TypeScript, ESLint and Stylelint.
- `pnpm validate` - runs `lint`, `test:ci` and `test:e2e:ci`.

## Documentation

To learn more about this project, please refer to this [site](https://joint-online-judge.github.io/cattle/learning/).

## Contribute

Please refer to this [doc](https://joint-online-judge.github.io/#github-workflow) for our workflow.
