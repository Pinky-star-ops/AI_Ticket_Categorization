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


# -----------------------------
# Display result
# -----------------------------

print("Ticket:")
print(ticket)

print("\nPredicted Category:")
print(prediction[0])