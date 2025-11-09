from pydantic import BaseModel


class NewsSchema(BaseModel):
    id: str
    name: str
