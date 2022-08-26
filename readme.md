# Tropinha News bot

Bot with quick everyday utilities and fun features made specifically for some friends.

## Setup

- Make sure you have Node installed
- Clone the repo
- Download dependencies: `yarn`
- Setup your env file _(see .env.example)_
- Start the application: `yarn start`

## Commands

- `yarn start`: start server with the port defined in the env _(default port is 5000)_
- `yarn dev`: start server with live reload
- `yarn build`: builds the server code so it can be packaged
- `yarn test`: run unit tests
- `yarn lint`: run prettier checks
- `yarn lint:fix`: run prettier fixer

## Docker

This bot is published publicly as a Docker Image, so you should be able to run it anywhere you can run a Docker Container.

Before running it, prepare an env file (edit the info below before running the command):

```sh
cat > ./.env <<EOL
# your telegram token
TELEGRAM_TOKEN=telegram-token

# port to run the bot
PORT=5000

# token for the edu tropinha api
TROPINHA_TOKEN=tropinha-token

# url to edu tropinha api
API_URL=https://tropinha.somewhere.br

# token for open weather map api
CLIMATE_TOKEN=climate-token
EOL
```

Then start the container

```sh
docker run --env-file ./.env armand1m/tropinha-news
```

## Kubernetes

Kubernetes manifests are available at the `./kubernetes` folder describing the deployment. These are compatible and tailored specifically for usage with `kustomize`.

Create a secret named `tropinha-news-secret` with the respective literals:

```sh
kubectl create secret generic tropinha-news-secrets \
    --from-literal=telegram_token='<telegram-token>' \
    --from-literal=tropinha_token='<tropinha-token>' \
    --from-literal=api_url='<api-url>' \
    --from-literal=climate_token='<climate-token>'
```

Then apply the manifest to your cluster:

```sh
kubectl apply -f ./kubernetes/deployment.yml
```

## How to contribute

- Fork if needed.
- Create a branch with the name of your feature/fix
- Open a PR
- Make sure the build is passing
- You need 1 approval to merge

## Links

### [TASKS](https://github.com/joaopedev/TropinhaNews/projects/1)
