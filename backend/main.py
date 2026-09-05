from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from pathlib import Path

app = FastAPI()


# -----------------------------
# Load ML Model
# -----------------------------



MODEL_PATH = Path(__file__).resolve().parent.parent / "ml" / "models" / "category_model.pkl"

model = joblib.load(MODEL_PATH)


# -----------------------------
# Request Schema
# -----------------------------

class TicketRequest(BaseModel):
    text: str


# -----------------------------
# AI Category Prediction
# -----------------------------

@app.post("/ai/predict-category")
def predict_category(ticket: TicketRequest):

    prediction = model.predict([ticket.text])[0]

    probabilities = model.predict_proba([ticket.text])[0]

    confidence = max(probabilities) * 100

    return {
        "ticket": ticket.text,
        "predicted_category": prediction,
        "confidence_score": round(confidence, 2)
    }