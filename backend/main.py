from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from config.settings import settings
from routes import auth_router, news_router, user_router

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Healtcheck API
@app.get(
    f"{settings.API_PREFIX}/ping",
    summary="Health check endpoint",
    description=(
            "Este endpoint permite verificar si la API está en funcionamiento. "
            "Responde con un mensaje simple para confirmar la disponibilidad del servicio."
    ),
    tags=["Health"],
)
async def health_check():
    """
    Realiza una comprobación del estado de la API.

    Returns:
        HealthCheckResponse: Un objeto con un mensaje indicando que la API responde correctamente.
    """
    return {"message": f"pong"}


app.include_router(
    auth_router.router,
    prefix=f"{settings.API_PREFIX}/auth",
)

app.include_router(
    news_router.router,
    prefix=f"{settings.API_PREFIX}/news",
)

app.include_router(
    user_router.router,
    prefix=f"{settings.API_PREFIX}/user",
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
