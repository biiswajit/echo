from fastapi import FastAPI

app = FastAPI()

@app.get("/greet/{name}")
async def greet(name):
    return {"message": f"hello, {name}"}
