# Contributing to Echo

This guide will help you setup the project locally
and start contributing to the repository.

## Prerequisites

- [Node.js](https://nodejs.org/en) version >=22
- [Turborepo](https://turbo.build/)
- [Pnpm package manager](https://pnpm.io/) version >=9.0.0
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Postgres](https://hub.docker.com/_/postgres)
- [Redis stack](https://hub.docker.com/r/redis/redis-stack)

## Project architecture

![Project Architecture](https://raw.githubusercontent.com/biiswajit/assets/b7359b88081feda1005832f80a168eb8fc9c91a3/echo_architecture_v0.0.png)

## Setup guide

For local setup follow this [setup guide](./SETUP.md)

## Before commit

### Check code formatting

This project uses prettier to maintain code formatting throughout the project, you can check the [rules](.prettierrc). Before making any commit to this codebase make sure you run

```sh
    pnpm prettier:check
```

to check whether your edited files have right formatting or not. If there is any formatting issue then run

```sh
    pnpm prettier:format
```

command to reformat the file.

### Check code linting

This project uses eslint for code linting. Please make sure to run

```sh
    pnpm formatter:lint
```

to check for any linting issue. If there is some issue with code linting then run

```sh
    pnpm formatter:fix
```

to auto fix those issues.
