from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI()

# Load pre-trained model (compatibility score)
try:
    model = joblib.load("model/compatibility_model.pkl")
except:
    # Create a dummy model if not exists
    import sklearn
    from sklearn.ensemble import RandomForestClassifier
    X = np.array([[1]][[1]][[1]][[1]])
    y = np.array([1])
    model = RandomForestClassifier()
    model.fit(X, y)

class MatchRequest(BaseModel):
    user1_age: int
    user2_age: int
    user1_gender: str
    user2_gender: str
    preference_match: bool
    common_interests: int

@app.post("/match-score")
def predict_match(request: MatchRequest):
    features = np.array([[
        abs(request.user1_age - request.user2_age),
        1 if request.preference_match else 0,
        50,  # dummy distance
        request.common_interests
    ]])
    try:
        score = model.predict_proba(features)[0][1]
    except:
        score = 0.5  # default score
    return {"compatibility_score": float(score)}