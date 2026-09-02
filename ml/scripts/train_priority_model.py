import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score


# Load dataset
data_path = "ml/data/priority_dataset.csv"

df = pd.read_csv(data_path)

print("Dataset loaded successfully")
print(df.head())

# Features and labels
X = df["text"]
y = df["priority"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Create ML pipeline
model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            lowercase=True,
            stop_words="english"
        )
    ),
    (
        "classifier",
        LogisticRegression(
            max_iter=1000
        )
    )
])

# Train model
print("\nTraining priority model...")

model.fit(X_train, y_train)

print("Training completed!")

# Evaluate
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nAccuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, predictions))

# Save model
model_path = "ml/models/priority_model.pkl"

joblib.dump(model, model_path)

print("\nPriority model saved to:")
print(model_path)