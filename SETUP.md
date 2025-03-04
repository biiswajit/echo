# Local setup

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
  # create .env file in databse package
  cp packages/services/database/.env.example packages/services/database/.env
  # create .env file in docker package
  cp docker/.env.example docker/.env
  ```

6. Build internal packages

  > Note: This project using compiled internal packages, so you need to compile them before running the project.

  ```sh
  pnpm build
  ```

7. Run the project

  > Note: The database will run automatically when you run the project.

  > Note: If you're on `Windows/Mac` system then remove the `sudo` command from `db:stop` and `dev` script from [package.json](./packages/services/database/package.json) file.

  ```sh
  pnpm dev
  ```