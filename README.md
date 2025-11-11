# Documentación del Proyecto

## 1. Descripción General

Este proyecto es una aplicación web para visualizar noticias.  
Consta de un frontend en `React (Vite)` y un backend en `FastAPI`, los cuales se comunican mediante una API REST.  
El proyecto utiliza `docker` para la orquestación y ejecución en entornos locales, desarrollo o producción.

---

## 2. Tecnologías

| Componente    | Tecnología                | Descripción                                                                     |
|---------------|---------------------------|---------------------------------------------------------------------------------|
| Frontend      | React + Vite              | Aplicación web en React usando Vite como bundler y servidor de desarrollo.      |
| Backend       | FastAPI                   | API REST basada en Python y FastAPI.                                            |
| Base de datos | PostgreSQL                | Base de datos relacional utilizada por el backend.                              |
| SMTP CATCHER  | smtp4dev                  | Servidor de correo SMP,IMAP y POP3 para simular el envio y recepción de correos |
| Contenedores  | Docker + Compose          | Herramientas para construcción y ejecución de contenedores.                     |
| Autenticación | OAuth2 (Google, Facebook) | Integración de login social mediante OAuth2.                                    |

---

## 3. Variables de Entorno

### 3.1 Frontend (`frontend/.env`)

| Variable       | Valor de Ejemplo            | Descripción                   |
|----------------|-----------------------------|-------------------------------|
| `VITE_API_URL` | `http://localhost:8000/api` | URL base del backend FastAPI. |

**Ubicación:** `frontend/.env`

---

### 3.2 Backend (`backend/.env`)

| Variable                               | Valor de Ejemplo                                    | Descripción                                                                |
|----------------------------------------|-----------------------------------------------------|----------------------------------------------------------------------------|
| `DEBUG`                                | `True`                                              | Activa el modo debug del backend.                                          |
| `DATABASE_URL`                         | `postgresql+psycopg2://user:pass@host:5432/db_name` | Cadena de conexión a la base de datos PostgreSQL.                          |
| `SECRET_KEY`                           | `supersecretkey`                                    | Clave secreta para generación de tokens JWT.                               |
| `API_PREFIX`                           | `/api`                                              | Prefijo para las rutas del backend.                                        |
| `ALLOWED_ORIGINS`                      | `http://localhost:5173`                             | Orígenes permitidos para CORS.                                             |
| `GOOGLE_CLIENT_ID`                     | `client_id`                                         | ID de cliente Google OAuth2.                                               |
| `GOOGLE_CLIENT_SECRET`                 | `secret`                                            | Secreto de cliente Google OAuth2.                                          |
| `GOOGLE_REDIRECT_URI`                  | `http://localhost:8080/google/callback`             | URL de redirección para Google OAuth2.                                     |
| `FACEBOOK_CLIENT_ID`                   | `client_id`                                         | ID de aplicación Facebook OAuth2.                                          |
| `FACEBOOK_CLIENT_SECRET`               | `secret`                                            | Secreto de aplicación Facebook OAuth2.                                     |
| `FACEBOOK_REDIRECT_URI`                | `http://localhost:8080/facebook/callback`           | URL de redirección para Facebook OAuth2.                                   |
| `EMAIL_HOST`                           | `host`                                              | Servidor SMTP para envío de correos.                                       |
| `EMAIL_HOST_USER`                      | `""`                                                | Usuario para autenticación SMTP.                                           |
| `EMAIL_HOST_PASSWORD`                  | `""`                                                | Contraseña para autenticación SMTP.                                        |
| `EMAIL_PORT`                           | `25`                                                | Puerto SMTP.                                                               |
| `EMAIL_FROM`                           | `noticias@email.com`                                | Correo remitente por defecto.                                              |
| `EMAIL_USE_TLS`                        | `False`                                             | Activar TLS para SMTP.                                                     |
| `EMAIL_LOGIN`                          | `False`                                             | Indica si se debe usar autenticación SMTP.                                 |
| `FORGOT_PASSWORD_TOKEN_EXPIRE_MINUTES` | `10`                                                | Tiempo de expiración en minutos para tokens de recuperación de contraseña. |
| `FRONTEND_URL`                         | `http://localhost`                                  | URL base del frontend para redirecciones.                                  |

**Ubicación:** `backend/.env`

---

## 5. Ejecución con Docker ent

### 5.1 Requisitos

- **Docker** ≥ 24.x
- **Docker Compose** ≥ 2.x

### 5.2 Ambiente de desarrollo

Construir imagenes

```shell
docker compose -f dev.docker-compose.yaml build --no-cache
```

Ejecutar ambientes

```shell
docker compose -f dev.docker-compose.yaml up -d
```

#### 5.2.1 Acceso utiles a los Servicios

| Servicio               | URL                           | Descripción                                                     |
|------------------------|-------------------------------|-----------------------------------------------------------------|
| Frontend               | `http://localhost:5173`       | Aplicación web React (Vite).                                    |
| Backend                | `http://localhost:8000`       | API de FastAPI.                                                 |
| Documentación API      | `http://localhost:8000/docs`  | Documentación interactiva generada automáticamente por FastAPI. |
| Documentación API      | `http://localhost:8000/redoc` | Documentación interactiva generada automáticamente por FastAPI. |
| Visualizador de correo | `http://localhost:1080`       | Documentación interactiva generada automáticamente por FastAPI. |
| PgAdmin                | `http://localhost:8080`       | Documentación interactiva generada automáticamente por FastAPI. |

---

## 6. Comandos Útiles

| Comando                                     | Descripción                                                 |
|---------------------------------------------|-------------------------------------------------------------|
| `docker-compose logs -f`                    | Ver los logs de todos los contenedores en tiempo real.      |
| `docker-compose down`                       | Detener y eliminar los contenedores.                        |
| `docker-compose up -d`                      | Iniciar los contenedores en modo detach (en segundo plano). |
| `docker exec -it <backend-name> /bin/bash`  | Acceder al contenedor del backend.                          |
| `docker exec -it <frontend-name> /bin/bash` | Acceder al contenedor del frontend.                         |

---

## 7. Notas Finales

- La API externa utilizada es [Spaceflight News API](https://api.spaceflightnewsapi.net/).
- Para entornos locales, asegúrate de configurar correctamente los archivos `.env`.
- En caso de errores de conexión, revisar logs con `docker-compose logs backend`.
