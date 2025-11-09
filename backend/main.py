from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from config.settings import settings
from routes import auth_router, news_router, user_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Healtcheck API
@app.get(f"{settings.API_PREFIX}/ping")
async def say_hello():
    return {"message": f"pong"}


app.include_router(
    auth_router.router,
    prefix=f"{settings.API_PREFIX}/auth",
    tags=["auth"],
)

app.include_router(
    news_router.router,
    prefix=f"{settings.API_PREFIX}/news",
    tags=["news"],
)

app.include_router(
    user_router.router,
    prefix=f"{settings.API_PREFIX}/user",
    tags=["user"],
)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
