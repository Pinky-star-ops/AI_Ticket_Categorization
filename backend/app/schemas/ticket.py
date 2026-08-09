from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TicketCreate(BaseModel):
    title: str
    description: str
    priority: str = "MEDIUM"
    category_id: Optional[int] = None
    team_id: Optional[int] = None


class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    category_id: Optional[int] = None
    team_id: Optional[int] = None


class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    priority: str
    category_id: Optional[int]
    team_id: Optional[int]
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True