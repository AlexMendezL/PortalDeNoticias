from fastapi import HTTPException
import requests

API_NEWS = "https://api.spaceflightnewsapi.net/v4"


class NewsController:
    @staticmethod
    def get_articles(resource):
        try:
            response = requests.get(f"{API_NEWS}/{resource}", timeout=15)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=502, detail=f"Error to connect to extern API: {e}")

        data = response.json()
        return data
