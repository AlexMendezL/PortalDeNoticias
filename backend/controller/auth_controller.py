import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from config.settings import settings
from models import user_model
from schemas import user_schema, auth_schema
from services.auth_service import AuthService, oauth


def send_reset_email(to: str, reset_link: str):
    msg = MIMEMultipart()
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Password Reset Request"
    msg["From"] = "news-porta@email.com"
    msg["To"] = to

    html_message = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #333;">Recuperación de contraseña 🔐</h2>
                <p>Hola,</p>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para continuar:</p>
                <p style="text-align: center;">
                    <a href="{reset_link}" 
                       style="background-color: #007bff; color: white; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
                </p>
                <p>Si tú no solicitaste este cambio, puedes ignorar este correo.</p>
                <p style="color: #888;">— El equipo de tu Portal de NewsPage</p>
            </div>
        </body>
    </html> """

    msg.attach(MIMEText(html_message, "html"))
    try:
        with smtplib.SMTP(host=settings.EMAIL_HOST, port=settings.EMAIL_PORT) as smtp:
            if settings.EMAIL_USE_TLS:
                smtp.starttls()
            if settings.EMAIL_LOGIN:
                smtp.login(user=settings.EMAIL_USER, password=settings.EMAIL_PASSWORD)
            smtp.send_message(msg)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error to send email")


class AuthController:
    @staticmethod
    async def signup(user: user_schema.UserCreate, db: Session):
        exist_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()

        if exist_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hash_password = AuthService.get_password_hash(user.password)
        new_user = user_model.User(email=user.email, name=user.name, password=hash_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    async def login(credentials: auth_schema.LoginRequest, db: Session):

        user = db.query(user_model.User).filter(user_model.User.email == credentials.email).first()
        if not user or not user.password:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not user.is_active:
            raise HTTPException(status_code=401, detail="Account is disabled")

        verify_password = AuthService.verify_password(credentials.password, user.password)

        if not verify_password:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        access_token = AuthService.create_access_token({"user_id": str(user.id)})
        refresh_token = AuthService.create_refresh_token({"user_id": str(user.id)})

        return auth_schema.LoginResponse(email=user.email, name=user.name, access_token=access_token,
                                         refresh_token=refresh_token)

    @staticmethod
    async def forget_password(data: auth_schema.ForgetPasswordRequest, db: Session):
        user = db.query(user_model.User).filter(user_model.User.email == data.email).first()
        if user:
            token = AuthService.create_access_token({"user_id": str(user.id)},
                                                    settings.FORGOT_PASSWORD_TOKEN_EXPIRE_MINUTES)
            redirect = f"{settings.FRONTEND_URL}/auth/forgetPasswordConfirm?token={token}"
            send_reset_email(user.email, redirect)

        return {"message": "Email sent"}

    @staticmethod
    async def forget_password_confirm(data: auth_schema.ForgetPasswordConfirmRequest, db: Session):
        token_payload = AuthService.verify_token(data.token)

        if not token_payload or not token_payload["user_id"]:
            raise HTTPException(status_code=401, detail="Invalid action")

        id = token_payload["user_id"]
        user = db.query(user_model.User).filter(user_model.User.id == id).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid action")

        hash_password = AuthService.get_password_hash(data.password)
        user.password = hash_password
        db.commit()

        return {"message": "Password changed successfully"}

    @staticmethod
    async def oauth_login(req: Request, provider: str):
        try:
            redirect_url = getattr(settings, f"{provider.upper()}_REDIRECT_URI")
            return await getattr(oauth, provider).authorize_redirect(req, redirect_url)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error to try login with oauth provider: {provider}")

    @staticmethod
    async def oauth_callback(request: Request, provider: str, db: Session):
        try:
            token = await getattr(oauth, provider).authorize_access_token(request)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error out callback: {str(e)}")

        print("token", token)
        if provider == "google":
            user_info = token.get('userinfo')

            email = user_info.get('email')
            name = user_info.get('name')
            oauth_id = user_info.get('sub')
            avatar_url = user_info.get('picture')
        elif provider == "github":
            user_info = await oauth.github.get('user', token=token)
            user_data = user_info.json()

            email = user_data.get('email')
            name = user_data.get('name')
            oauth_id = str(user_data.get('id'))
            avatar_url = user_data.get('avatar_url')
        elif provider == "facebook":
            user_info = await oauth.facebook.get('me', params={'fields': 'id,name,email,picture'}, token=token)
            user_data = user_info.json()

            email = user_data.get('email')
            name = user_data.get('name')
            oauth_id = user_data.get('id')
            avatar_url = user_data.get('picture', {}).get('data', {}).get('url')

        if not email:
            raise HTTPException(status_code=400, detail="Email not provided by OAuth provider")

        user = db.query(user_model.User).filter(user_model.User.email == email).first()
        if not user:
            user = user_model.User(email=email, name=name, oauth_id=oauth_id, oauth_provider=provider,
                                   avatar_url=avatar_url, is_active=True, is_verified=True)
            db.add(user)
            db.commit()
            db.refresh(user)

        access_token = AuthService.create_access_token({"user_id": str(user.id)})
        refresh_token = AuthService.create_refresh_token({"user_id": str(user.id)})

        frontend_url = f"{settings.FRONTEND_URL}/auth/callback?access_token={access_token}"
        return RedirectResponse(url=frontend_url)
