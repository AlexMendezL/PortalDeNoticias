from fastapi import APIRouter, HTTPException, Depends

from middleware.auth_middleware import get_current_user

from controller.news_controller import NewsController

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)


@router.get(
    "/ping",
    summary="Health check del módulo de noticias",
    description="Permite verificar que el módulo de noticias está activo y respondiendo correctamente.",
    tags=["News"]
)
def ping():
    """Endpoint de prueba para confirmar que el módulo de noticias está operativo."""
    return {"message": "pong news"}


@router.get(
    "/news",
    summary="Obtener todas las noticias",
    description=(
            "Consulta la API externa [Spaceflight News API](https://api.spaceflightnewsapi.net/) "
            "para obtener una lista de artículos recientes."
    ),
    tags=["News"]
)
def news():
    """
    Recupera las últimas noticias de la API externa de Spaceflight News.

    Returns:
        Un objeto JSON con los artículos más recientes.
    """
    return NewsController.get_articles("articles")


@router.get(
    "/categories",
    summary="Listar categorías disponibles",
    description="Devuelve las categorías de contenido disponibles: artículos, blogs y reportes.",
    tags=["News"]
)
def categories():
    """Retorna las categorías que pueden consultarse en la API externa."""
    return {"data": ["article", "blogs", "reports"]}


@router.get(
    "/detail/{category}/{id}",
    summary="Obtener detalle de una noticia",
    description="Recupera el detalle de una noticia específica desde la API externa, según su categoría e ID.",
    tags=["News"]
)
def detail(category: str, id: int):
    """
    Obtiene la información detallada de una noticia.

    Args:
        category: Categoría de la noticia (articles, blogs, reports).
        id: ID de la noticia en la API externa.

    Returns:
        Un objeto JSON con la información detallada de la noticia.
    """
    return NewsController.get_articles(f"{category}/{id}")


@router.get(
    "/relatedNews/{category}/{news_site}",
    summary="Obtener noticias relacionadas por fuente",
    description="Devuelve todas las noticias relacionadas a un mismo sitio de noticias (news_site) dentro de una categoría.",
    tags=["News"]
)
def related_news(category: str, news_site: str):
    """
    Obtiene noticias relacionadas por sitio de origen.

    Args:
        category: Categoría de la noticia (articles, blogs, reports).
        news_site: Nombre del sitio de noticias (por ejemplo, 'NASA', 'Space.com').

    Returns:
        Noticias publicadas por el mismo sitio en la categoría indicada.
    """
    return NewsController.get_articles(f"{category}/?news_site={news_site}")


@router.get(
    "/newsByCategory/{category}",
    summary="Obtener noticias por categoría",
    description="Recupera las noticias de una categoría específica (articles, blogs o reports).",
    tags=["News"]
)
def news_by_category(category: str | int):
    """
    Obtiene las noticias de una categoría específica.

    Args:
        category: Nombre o identificador de la categoría (articles, blogs, reports).

    Returns:
        Lista de noticias pertenecientes a la categoría solicitada.
    """
    return NewsController.get_articles(f"{category}")
