import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report


# -----------------------------
# 1. Load dataset
# -----------------------------

data_path = "ml/data/tickets.csv"

df = pd.read_csv(data_path)

print("Dataset loaded successfully!")
print(f"Total tickets: {len(df)}")

print("\nCategories:")
print(df["category"].value_counts())


# -----------------------------
# 2. Remove missing values
# -----------------------------

df = df.dropna(subset=["subject", "description", "category"])


# -----------------------------
# 3. Combine subject + description
# -----------------------------

df["text"] = (
    df["subject"].astype(str)
    + " "
    + df["description"].astype(str)
)


# -----------------------------
# 4. Input and target
# -----------------------------

X = df["text"]
y = df["category"]


# -----------------------------
# 5. Split dataset
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print(f"\nTraining samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")


# -----------------------------
# 6. Create ML pipeline
# -----------------------------

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


# -----------------------------
# 7. Train model
# -----------------------------

print("\nTraining model...")

model.fit(X_train, y_train)

print("Training completed!")


# -----------------------------
# 8. Evaluate model
# -----------------------------

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:")
print(f"{accuracy:.2%}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# -----------------------------
# 9. Save model
# -----------------------------

model_path = "ml/models/category_model.pkl"

joblib.dump(model, model_path)

print(f"\nModel saved to: {model_path}")