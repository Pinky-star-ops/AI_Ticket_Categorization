from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.dependencies import get_current_user, get_current_admin
from app.models.user import User
from app.schemas.user import UserResponse
from app.schemas.user import (
    UserResponse,
    UserUpdate,
    ChangePassword
)

router = APIRouter(
    tags=["Users"]
)


@router.get(
    "/profile",
    response_model=UserResponse
)
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return current_user


@router.get(
    "/admin/users",
    response_model=list[UserResponse]
)
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):

    users = db.query(User).all()

    return users

@router.put("/profile", response_model=UserResponse)
def update_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    current_user.name = user_data.name
    db.commit()
    db.refresh(current_user)
    return current_user

@router.put("/change-password")
def change_password(
    password_data: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not verify_password(password_data.old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Old password incorrect")

    current_user.password = hash_password(password_data.new_password)

    db.commit()

    return {"message": "Password updated successfully"}