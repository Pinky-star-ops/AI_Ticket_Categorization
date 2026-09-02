import joblib

model_path = "ml/models/priority_model.pkl"

model = joblib.load(model_path)

tickets = [
    "Production database crashed",
    "Payment gateway is failing",
    "Application is running slowly",
    "I need help updating my profile",
    "Production server is completely down"
]

print("\nPriority Predictions:\n")

for ticket in tickets:
    prediction = model.predict([ticket])[0]

    print("Ticket:", ticket)
    print("Priority:", prediction)
    print("-" * 50)