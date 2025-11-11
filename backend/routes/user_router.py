from fastapi import APIRouter, Depends
from schemas import user_schema
from middleware.auth_middleware import get_current_user

from controller.user_controller import UserController

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)

@router.get(
    "/ping",
    summary="Health check del módulo de usuarios",
    description="Permite verificar que el servicio de usuarios está en funcionamiento.",
    tags=["Users"]
)
def ping():
    """Endpoint de prueba que confirma la disponibilidad del módulo de usuarios."""
    return {"message": "pong user"}


@router.get(
    "/me",
    response_model=user_schema.MeResponse,
    summary="Obtener información del usuario autenticado",
    description="Devuelve los datos del usuario actual autenticado mediante el token JWT.",
    tags=["Users"]
)
def me(current_user: user_schema.MeResponse = Depends(get_current_user)):
    """
    Obtiene la información del usuario autenticado.

    Args:
        current_user: Usuario actual obtenido a través del middleware de autenticación.

    Returns:
        Datos del usuario autenticado, incluyendo información básica del perfil.
    """
    return UserController.me(current_user)
