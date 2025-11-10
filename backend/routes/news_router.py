from fastapi import APIRouter, HTTPException, Depends
import requests

from middleware.auth_middleware import get_current_user

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)


def get_api_url(category: str) -> str:
    return f"https://api.spaceflightnewsapi.net/v4/{category}"


# "https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=10"
#  https://api.spaceflightnewsapi.net/v4/blogs/
# https://api.spaceflightnewsapi.net/v4/reports/


@router.get("/ping", )
def ping():
    return {"message": "pong news"}


@router.get("/news")
def news():
    url = get_api_url("articles")
    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error to connect to extern API: {e}")

    data = response.json()
    return data


@router.get("/categories")
def categories():
    return {"data": ["article", "blogs", "reports"]}


@router.get("/detail/{category}/{id}")
def detail(category: str, id: int):
    url = f"{get_api_url(category)}/{id}"
    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error to connect to extern API: {e}")

    data = response.json()
    return data


@router.get("/relatedNews/{category}/{news_site}")
def related_news(category: str, news_site: str):
    url = f"{get_api_url(category)}/?news_site={news_site}"
    print(url)
    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error to connect to extern API: {e}")

    data = response.json()
    return data


@router.get("/newsByCategory/{category}")
def news_by_category(category: str | int):
    url = get_api_url(category)
    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error to connect to extern API: {e}")

    data = response.json()
    return {"data": data}
