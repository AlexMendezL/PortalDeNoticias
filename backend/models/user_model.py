import datetime
import uuid

from sqlalchemy import Uuid, Column, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base

from config.db import metadata, engine

Base = declarative_base(metadata=metadata)


class User(Base):
    __tablename__ = "user"
    id = Column(Uuid, primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    password = Column(String, nullable=True)

    # OAuth fields
    oauth_provider = Column(String, nullable=True)  # google, facebook, github
    oauth_id = Column(String, nullable=True)  # ID del proveedor
    avatar_url = Column(String, nullable=True)

    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.datetime.now)
    updated_at = Column(DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)

Base.metadata.create_all(bind=engine)