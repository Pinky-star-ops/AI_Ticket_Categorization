import joblib

# Load trained model
model = joblib.load("ml/models/category_model.pkl")


# -----------------------------
# Test ticket
# -----------------------------

ticket = "My laptop keyboard is not working"


# -----------------------------
# Predict category
# -----------------------------

prediction = model.predict([ticket])

# Get probability for each category
probabilities = model.predict_proba([ticket])

# Get highest probability
confidence = max(probabilities[0]) * 100


# -----------------------------
# Display result
# -----------------------------

print("Ticket:")
print(ticket)

print("\nPredicted Category:")
print(prediction[0])

print("\nConfidence Score:")
print(f"{confidence:.2f}%")