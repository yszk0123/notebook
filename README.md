# Notebook

# Develop
## Environment Variables

| name | description | example |
| --- | --- | --- |
| APP_BASE_URL |  | /notebook |
| HASURA_ADMIN_SECRET | secret key for hasura graphql server | xxx |
| HASURA_GRAPHQL_HOST |  | xxx.herokuapp.com |
| FIREBASE_API_KEY |  | xxx |
| FIREBASE_PROJECT_ID |  | xxx |
| FIREBASE_MESSAGING_SENDER_ID |  | 123 |
| FIREBASE_APP_ID |  | xxx:xxx:xxx:xxx |
| FACEBOOK_APP_ID |  | xxx |
| EXPO_USERNAME | for CI | xxx |
| EXPO_CLI_PASSWORD | for CI | xxx |

## Setup

```bash
# Setup firebase
$ yarn global add firebase-tools
$ firebase login
# Install packages
$ yarn install
```

## Develop

```sh
$ yarn install
$ yarn start
```

## Deploy

```sh
$ yarn deploy
$ open https://yszk0123.github.io/notebook
```

## Update GraphQL Schema

```bash
$ yarn global add graphqurl
$ gq https://yszk0123-notebook.herokuapp.com/v1/graphql -H "X-Hasura-Admin-Secret: $HASURA_ADMIN_SECRET" --introspect > schema.graphql
```
