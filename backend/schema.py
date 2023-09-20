from pydantic import BaseModel

class BillableIn(BaseModel):
    partner: str
    client: str
    work: str
    hours: int
    status: str

class BillableOut(BillableIn):
    id: int
