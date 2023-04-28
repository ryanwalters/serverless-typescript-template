# serverless-typescript-template

An opinionated Serverless Framework template for TypeScript

## Features

- Automated deployments with [CircleCI](https://circleci.com/)
- Automated GitHub releases with semantic versioning and changelog generation with [semantic-release](https://github.com/semantic-release/semantic-release)
- Automated dependency updates with [Renovate](https://www.mend.io/renovate/)
- Automated testing with [GitHub Actions](https://docs.github.com/en/actions)
- Automated linting and formatting on commit with [Prettier](https://prettier.io/), [commitlint](https://commitlint.js.org/#/), and [husky](https://typicode.github.io/husky/)

## Getting started

There are two ways to get started using this template:

1. Run the following command:
   ```bash
   npx serverless create -u https://github.com/ryanwalters/serverless-typescript-template -p <project-name>
   ```
2. Click "Use this template" and select either "Create a new repository" or "Open in a codespace"

   ![image](https://user-images.githubusercontent.com/881783/235012375-7ced7c1f-ad8c-44b9-8378-d1f5b3d23762.png)

> **Note**: Don't forget to enable Renovate on your newly created repository!

## Installation/deployment instructions

> **Requirements**: NodeJS 18. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Install dependencies and run your project locally

- Run `npm install`
- Run `npm run dev`

  - This will start a local server listening on port `3000` using serverless-offline plugin
  - You can now send a `POST` request to `http://localhost:3000/dev/hello` with a payload containing a string property named `name` to test your lambda locally

    ```
    curl --location --request POST 'http://localhost:3000/dev/hello' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Ryan"
    }'
    ```

### Deploy your service

Pushes to the `dev`, `qa`, and `production` branches will trigger a deployment via CircleCI to the corresponding AWS environment. Please see `.circleci/config.yml` for more details.

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Test your service

Pushes to all branches will kick off a GitHub Action that will run the test suite. Please see `.github/workflows/test.yml` for more details. You can also run the test suite locally by running `npm run test`.

### Releases

Pushes to the `production` branch will trigger a GitHub Action that will create a new GitHub Release. Please see `.github/workflows/release.yml` for more details.

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `utils` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   └── hello
│   │       ├── handler.ts      # `Hello` lambda source code
│   │       ├── index.ts        # `Hello` lambda Serverless configuration
│   │       ├── mocks.ts        # `Hello` lambda input parameter, if any, for local invocation
│   │       ├── schema.ts       # `Hello` lambda input event JSON-Schema
│   │       └── test.ts         # `Hello` lambda test suite
│   │
│   └── utils                    # Lambda shared code
│       └── api-gateway.ts       # API Gateway specific helpers
│       └── handler-resolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
└── tsconfig.paths.json         # Typescript paths
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless`
