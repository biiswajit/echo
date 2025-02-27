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

## Local setup

The development branch is `main`. This is the branch that all pull
requests should be made against.

1. Clone the repository from [Github](https://github.com/biiswajit/echo/fork)

  ```sh
  git clone https://github.com/<your_github_username>/echo.git
  ```

2. Navigate to the project folder

  ```sh
  cd echo
  ```

3. This project is using `node` version `v22` and `pnpm` version `v9`. Set your node and pnpm version match for this project

  ```sh
  nvm use # match node version match to this project
  corepack enable pnpm  # match pnpm version match to this projct
  ```

4. Install dependencies

  ```sh
  pnpm install
  ```

5. Create .env files

  ```sh
  cd apps/worker && cp .env.example .env && cd ..
  cd web && cp .env.example .env && cd ../..
  cd packages/database && cp .env.example .env && cd ../..
  ```

6. Build internal packages

  > Note: This project using compiled internal packages, so you need to compile them before running the project.

  ```sh
  pnpm run build
  ```

7. Run the project

  > Note: The database will run automatically when you run the project.

  > Note: If you're on `Windows/Mac` system then remove the `sudo` command from `db:stop` and `dev` script from [package.json](./packages/docker/package.json) file.

  ```sh
  pnpm run dev
  ```

## Project architecture

![IMG20250219000258](https://github.com/user-attachments/assets/53143061-adb0-47b0-a8c8-524b0a914665)

| Service | Working |
| :----: |-------------|
| `web` | this is the primary application for handling everying written in next.js |
| `worker` | simple node.js application to offload some taks from the primary application |
| `database` | persistant storage of information, i am using postgresql |
| `cache` | simple redis cache to store previous messages for faster retrival of messages |
| `queue` | radis queue for storing jobs, message, and other information |
| `pub-sub` | for each response from llm provider worker will publish chunks in pub-sub, eventually from pub-sub web application will get the stream |
| `llm providers` | third party llm providers (i'll update the list of llms eventually) |
