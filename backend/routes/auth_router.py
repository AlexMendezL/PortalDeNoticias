from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from starlette import status

from config.db import get_db
from controller.auth_controller import AuthController
from schemas import user_schema, auth_schema

router = APIRouter()


@router.get(
    "/ping",
    summary="Health check del módulo de autenticación",
    description="Permite verificar que el servicio de autenticación está en funcionamiento.",
    tags=["Auth"]
)
def ping():
    """Endpoint de prueba que confirma la disponibilidad del módulo de autenticación."""
    return {"message": "pong auth"}


@router.post(
    "/signup",
    status_code=status.HTTP_201_CREATED,
    response_model=user_schema.UserBase,
    summary="Registro de nuevo usuario",
    description="Crea un nuevo usuario en el sistema con la información proporcionada.",
    tags=["Auth"]
)
async def signup(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo usuario en la base de datos.

    Args:
        user: Datos de registro del usuario (email, contraseña, etc.).
        db: Sesión de base de datos inyectada mediante dependencia.

    Returns:
        Información básica del usuario recién creado.
    """
    return await AuthController.signup(user, db)


@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
    response_model=auth_schema.LoginResponse,
    summary="Inicio de sesión",
    description="Permite a un usuario autenticarse con sus credenciales.",
    tags=["Auth"]
)
async def login(user: auth_schema.LoginRequest, db: Session = Depends(get_db)):
    """
    Inicia sesión de usuario.

    Args:
        user: Credenciales de inicio de sesión (email y contraseña).
        db: Sesión de base de datos.

    Returns:
        Token JWT y datos del usuario autenticado.
    """
    return await AuthController.login(user, db)


@router.post(
    "/forget_password",
    status_code=status.HTTP_200_OK,
    summary="Solicitud de restablecimiento de contraseña",
    description="Envía un correo electrónico al usuario con instrucciones para restablecer su contraseña.",
    tags=["Auth"]
)
async def forget_password(data: auth_schema.ForgetPasswordRequest, db: Session = Depends(get_db)):
    """
    Envía un enlace de restablecimiento de contraseña al correo electrónico del usuario.

    Args:
        data: Dirección de correo del usuario que solicita restablecer su contraseña.
        db: Sesión de base de datos.
    """
    return await AuthController.forget_password(data, db)


@router.post(
    "/forget_password_confirm", status_code=status.HTTP_200_OK,
    summary="Confirmación de restablecimiento de contraseña",
    description="Confirma el cambio de contraseña utilizando el token de recuperación enviado por correo.",
    tags=["Auth"]
)
async def forget_password_confirm(data: auth_schema.ForgetPasswordConfirmRequest, db: Session = Depends(get_db)):
    """
    Cambia la contraseña del usuario tras verificar el token de restablecimiento.

    Args:
        data: Datos del token de recuperación y la nueva contraseña.
        db: Sesión de base de datos.
    """
    return await AuthController.forget_password_confirm(data, db)


@router.get(
    "/login/google",
    summary="Inicio de sesión con Google",
    description="Redirige al flujo de autenticación OAuth2 de Google.",
    tags=["Auth", "OAuth"]
)
async def login_via_google(request: Request):
    """Inicia el proceso de autenticación con Google OAuth2."""
    return await AuthController.oauth_login(request, "google")


@router.get(
    "/google/callback",
    summary="Callback de Google OAuth2",
    description="Procesa la respuesta de Google tras la autenticación y crea/inicia sesión del usuario.",
    tags=["Auth", "OAuth"]
)
async def google_callback(request: Request, db: Session = Depends(get_db)):
    """Maneja la respuesta de Google y completa el flujo de inicio de sesión OAuth2."""
    return await AuthController.oauth_callback(request, "google", db)


@router.get(
    "/login/facebook",
    summary="Inicio de sesión con Facebook",
    description="Redirige al flujo de autenticación OAuth2 de Facebook.",
    tags=["Auth", "OAuth"]
)
async def login_via_facebook(request: Request):
    """Inicia el proceso de autenticación con Facebook OAuth2."""
    return await AuthController.oauth_login(request, "facebook")


@router.get(
    "/facebook/callback",
    summary="Callback de Facebook OAuth2",
    description="Procesa la respuesta de Facebook tras la autenticación y crea/inicia sesión del usuario.",
    tags=["Auth", "OAuth"]
)
async def facebook_callback(request: Request, db: Session = Depends(get_db)):
    """Maneja la respuesta de Facebook y completa el flujo de inicio de sesión OAuth2."""
    return await AuthController.oauth_callback(request, "facebook", db)
