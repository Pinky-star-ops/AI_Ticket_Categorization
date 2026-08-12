from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.category import Category

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/")
def create_category(
    name: str,
    description: str = None,
    db: Session = Depends(get_db)
):
    existing_category = (
        db.query(Category)
        .filter(Category.name == name)
        .first()
    )

    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    category = Category(
        name=name,
        description=description
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.get("/")
def get_categories(
    db: Session = Depends(get_db)
):
    return db.query(Category).all()