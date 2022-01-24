# Cattle

The new generation of JOJ Frontend. Powered by [Umi.js](https://umijs.org/).

## Requirements

* node.js >= 10.13
* yarn

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

## Getting Started

Please install `yarn` first. This project uses `yarn` as package manager. You can modify your registry to boost downloading or install `tyarn` if you are in China following this [page](https://umijs.org/zh-CN/docs/getting-started).  

Install dependencies,

```bash
$ yarn
```

### Local Development

Start the dev server,

```bash
$ yarn start
```

Then the frontend will run on 127.0.0.1:8000 by default. If you want to develop in a completely offline environment,
you then need to start the backend server: [horse](https://github.com/joint-online-judge/horse). 

You may also need to start the [judger](https://github.com/joint-online-judge/tiger) on your computer (which is not recommended) in order to have complete function of JOJ.

> Note: Please always use 127.0.0.1:8000 instead of localhost:8000, because there will be some issue related to same-site cookie policies.

### Staging

Run the frontend locally, while connecting to the backend deployed on a staging server.

```bash
$ yarn start:staging
```

> Staging is a type of environment that lies between development (local) and production (online). Deploying the backend service
> on 

We need some extra setup to overcome the same-origin policy. Install [whistle](https://github.com/avwo/whistle)
to proxy the local frontend to the staging domain:
* Install [whistle](https://github.com/avwo/whistle)
* Install [SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) if you are using chrome. (For other browsers please refer to docs). And in settings of SwitchyOmega, have such config:
![omega](https://github.com/joint-online-judge/cattle/blob/master/img/omega.png?raw=true)
* Start whistle and type in a single proxy rule:
```
nichujie.xyz 127.0.0.1:8000
```
Then you should have your `127.0.0.1:8000` proxied to `nichujie.xyz`.

Now you can visit `nichujie.xyz` in your browser to access your **local frontend server**. After you save your code locally, the webpage shall reload automatically. 

### Production Staging

TODO: In the future, we may setup a staging development environment which runs frontend locally, while connecting to 
online (production) backend service.

### Build for Production

To build and deploy,

```bash
$ yarn build
```
