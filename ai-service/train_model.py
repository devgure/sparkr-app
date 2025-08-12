"""
AI Model Training Script for Sparkr Dating App
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

# Generate synthetic dataset for demonstration
np.random.seed(42)
n_samples = 1000

data = {
    'age_diff': np.random.randint(0, 30, n_samples),
    'same_gender_pref': np.random.choice([0, 1], n_samples),
    'distance_km': np.random.exponential(20, n_samples),
    'common_interests': np.random.randint(0, 10, n_samples),
    'matched': np.random.choice([0, 1], n_samples, p=[0.7, 0.3])
}

# Create more realistic data based on compatibility rules
for i in range(n_samples):
    # Higher chance of match if age difference is small
    if data['age_diff'][i] < 5:
        if np.random.random() < 0.6:
            data['matched'][i] = 1
    
    # Higher chance of match if same gender preference
    if data['same_gender_pref'][i] == 1:
        if np.random.random() < 0.5:
            data['matched'][i] = 1
    
    # Lower chance of match if distance is large
    if data['distance_km'][i] > 50:
        if np.random.random() < 0.2:
            data['matched'][i] = 1

df = pd.DataFrame(data)

# Display basic statistics
print("Dataset shape:", df.shape)
print("\nFirst few rows:")
print(df.head())

print("\nTarget distribution:")
print(df['matched'].value_counts(normalize=True))

# Prepare features and target
X = df[['age_diff', 'same_gender_pref', 'distance_km', 'common_interests']]
y = df['matched']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"\nModel Accuracy: {accuracy:.3f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("\nFeature Importance:")
print(feature_importance)

# Save the model
joblib.dump(model, 'model/compatibility_model.pkl')
print("\nModel saved as 'model/compatibility_model.pkl'")

# Create visualizations
plt.figure(figsize=(15, 5))

# 1. Target distribution
plt.subplot(1, 3, 1)
df['matched'].value_counts().plot(kind='bar')
plt.title('Match Distribution')
plt.xlabel('Matched')
plt.ylabel('Count')

# 2. Age difference vs match
plt.subplot(1, 3, 2)
sns.boxplot(data=df, x='matched', y='age_diff')
plt.title('Age Difference by Match Status')

# 3. Feature importance
plt.subplot(1, 3, 3)
sns.barplot(data=feature_importance, x='importance', y='feature')
plt.title('Feature Importance')

plt.tight_layout()
plt.savefig('model_training_results.png')
plt.show()

print("\nTraining complete! Model and results saved.")