import re

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()


def clean_text(text):
    # Convert to string
    text = str(text)

    # Lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)

    # Remove special characters and numbers
    text = re.sub(r"[^a-zA-Z\s]", " ", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    # Split into words
    words = text.split()

    # Remove stopwords
    words = [
        word for word in words
        if word not in stop_words
    ]

    # Lemmatization
    words = [
        lemmatizer.lemmatize(word)
        for word in words
    ]

    # Join words
    return " ".join(words)


if __name__ == "__main__":

    examples = [
        "MY LAPTOP IS NOT WORKING!!!",
        "I cannot connect to the Wi-Fi.",
        "The applications are crashing repeatedly.",
        "Please reset my password immediately!"
    ]

    for text in examples:
        print("Original :", text)
        print("Cleaned  :", clean_text(text))
        print("-" * 50)