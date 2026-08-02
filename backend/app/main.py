from fastapi import FastAPI
from sqlalchemy import text
from app.database.database import engine

app = FastAPI(title="AI Ticket Categorization API")


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Backend is running 🚀"
    }


@app.get("/db-test")
def db_test():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return {
        "message": "Database Connected Successfully!"
    }