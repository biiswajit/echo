## Setup

1. Clone the repository from [GitHub](https://github.com/biiswajit/echo/fork).

```
git clone https://github.com/<your_github_username>/echo.git
```

2. Navigate to the project folder.

```
cd echo
```

3. Install all the dependencies via `pnpm` package manager.

```
pnpm install
```

4. Navigate to the `apps/web` folder.

```
cd apps/web
```

5. Create an `.env` file from `.env.example file`.

```
cp .env.example .env
```

6. Run the docker container.

```
pn run docker:up
```
