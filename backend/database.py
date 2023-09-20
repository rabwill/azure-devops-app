from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'db.sqlite3')}"
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    partner = Column(String, index=True)
    client = Column(String, index=True)
    work = Column(String)
    hours = Column(Integer)
    status = Column(String, index=True)

Base.metadata.create_all(bind=engine)
