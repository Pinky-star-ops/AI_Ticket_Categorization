from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.ticket import Ticket
from sqlalchemy import func
from app.models.category import Category

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    total_tickets = db.query(Ticket).count()

    open_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "OPEN")
        .count()
    )

    closed_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "CLOSED")
        .count()
    )

    pending_tickets = (
        db.query(Ticket)
        .filter(Ticket.status == "PENDING")
        .count()
    )

    critical_tickets = (
        db.query(Ticket)
        .filter(Ticket.priority == "CRITICAL")
        .count()
    )

    return {
        "total": total_tickets,
        "open": open_tickets,
        "closed": closed_tickets,
        "pending": pending_tickets,
        "critical": critical_tickets
    }
@router.get("/categories")
def get_category_stats(db: Session = Depends(get_db)):

    results = (
        db.query(
            Category.name,
            func.count(Ticket.id).label("count")
        )
        .outerjoin(
            Ticket,
            Ticket.category_id == Category.id
        )
        .group_by(Category.id, Category.name)
        .order_by(func.count(Ticket.id).desc())
        .all()
    )

    return {
        "categories": [
            {
                "name": name,
                "count": count
            }
            for name, count in results
        ]
    }