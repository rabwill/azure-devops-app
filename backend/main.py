from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import Record, SessionLocal
from schema import BillableIn, BillableOut

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/billables")
def search_billables(client: str = "", db: Session = Depends(get_db)):
    return db.query(Record).filter(Record.client.like(f"{client}%")).all()

@app.get("/billables/{id}")
def get_single_billable(id: int, db: Session = Depends(get_db)):
    billable = db.query(Record).filter(Record.id == id).first()
    if not billable:
        raise HTTPException(status_code=404, detail="Billable not found")
    return billable

@app.put("/billable/{id}")
def update_billable(id: int, billable: BillableIn, db: Session = Depends(get_db)):
    db_billable = db.query(Record).filter(Record.id == id).first()
    if not db_billable:
        raise HTTPException(status_code=404, detail="Billable not found")
    for key, value in billable.dict().items():
        setattr(db_billable, key, value)
    db.commit()
    return db_billable

@app.post("/billables", response_model=BillableOut)
def create_billable(billable: BillableIn, db: Session = Depends(get_db)):
    db_billable = Record(**billable.dict())
    db.add(db_billable)
    db.commit()
    db.refresh(db_billable)
    return db_billable
