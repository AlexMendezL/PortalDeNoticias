FROM python:3.11-slim

# Variables de entorno
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.7.1 \
    POETRY_VIRTUALENVS_CREATE=false

# Instalar dependencias del sistema y Poetry
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    curl \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && ln -s /root/.local/bin/poetry /usr/local/bin/poetry \
    && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de Poetry
COPY pyproject.toml poetry.lock* ./

# Instalar dependencias
RUN poetry install --no-root

# Copiar código
COPY . .

# Puerto
EXPOSE 8000

# Comando de desarrollo con hot reload
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]