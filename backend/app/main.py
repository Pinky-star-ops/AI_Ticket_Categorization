from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.user import User

from app.routes.auth import router as auth_router
from app.routes.user import router as user_router
from app.models import user
from app.models import category
from app.models import team
from app.models import ticket
from app.models import comment
from app.routes.ticket import router as ticket_router
from app.routes.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.category import router as category_router
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Ticket Categorization API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(dashboard_router)
app.include_router(category_router)

app.include_router(ticket_router)
@app.get("/")
def home():
    return {
        "message": "AI Ticket Categorization API"
    }