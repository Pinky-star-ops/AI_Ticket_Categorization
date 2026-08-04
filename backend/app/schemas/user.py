from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):

    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):

    email: EmailStr
    password: str


class UserResponse(BaseModel):

    id: int
    name: str
    email: EmailStr
    role: str
    
class UserUpdate(BaseModel):
    name: str
    
class ChangePassword(BaseModel):
    old_password: str
    new_password: str

    class Config:
        from_attributes = True