#!/usr/bin/env python3
"""Daily strategy tuner for the trader agent.

Purpose:
- Load the latest market data and engineered features.
- Train a few candidate models (XGBoost, LightGBM, simple LSTM).
- Evaluate each on a recent validation window (e.g., last 30 days).
- Pick the model/config with the best Sharpe ratio and acceptable draw‑down.
- Write the winning hyper‑parameters into `agents/trader/config.json` which the live trader reads.

The script is intended to be run once per day via a cron job (`daily‑strategy‑tune`).
"""

import json
import os
import pandas as pd
import numpy as np
from pathlib import Path

# --- Paths ---------------------------------------------------------------
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
FEATURES_DIR = BASE_DIR / "features"
CONFIG_PATH = BASE_DIR / "config.json"

# --- Helper functions ----------------------------------------------------
def load_features():
    # Load the most recent feature file (assumes YYYYMMDD.parquet naming)
    files = sorted(FEATURES_DIR.glob("features_*.parquet"), reverse=True)
    if not files:
        raise FileNotFoundError("No feature files found in {}".format(FEATURES_DIR))
    return pd.read_parquet(files[0])

def generate_target(df):
    # Simple target: next‑hour price change (binary: 1 if up, 0 if down)
    df = df.copy()
    df["target"] = (df["close"].shift(-1) > df["close"]).astype(int)
    df = df.dropna()
    return df

def train_xgboost(X, y):
    from xgboost import XGBClassifier
    model = XGBClassifier(
        n_estimators=200,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.9,
        colsample_bytree=0.9,
        eval_metric="logloss",
        n_jobs=4,
    )
    model.fit(X, y)
    return model

def evaluate_model(model, X, y):
    preds = model.predict_proba(X)[:, 1]
    # Convert probabilities to binary signals with 0.5 threshold
    signals = (preds > 0.5).astype(int)
    # Simple P&L assuming 1 unit per trade
    returns = signals * (y * 2 - 1)  # +1 for win, -1 for loss
    sharpe = np.mean(returns) / (np.std(returns) + 1e-9) * np.sqrt(252)
    drawdown = np.max(np.maximum.accumulate(returns) - returns)
    return {"sharpe": sharpe, "drawdown": drawdown}

def main():
    # Load data
    df = load_features()
    df = generate_target(df)
    # Split into train/validation (last 30 days as validation)
    split_idx = int(len(df) * 0.8)
    train_df = df.iloc[:split_idx]
    val_df   = df.iloc[split_idx:]

    X_train = train_df.drop(columns=["target", "close"]).values
    y_train = train_df["target"].values
    X_val   = val_df.drop(columns=["target", "close"]).values
    y_val   = val_df["target"].values

    # Train candidate models
    models = {}
    models["xgboost"] = train_xgboost(X_train, y_train)
    # Could add more models (LightGBM, LSTM) later

    # Evaluate
    best_score = -np.inf
    best_cfg = {}
    for name, mdl in models.items():
        evals = evaluate_model(mdl, X_val, y_val)
        # Simple ranking: higher Sharpe, lower drawdown
        score = evals["sharpe"] - evals["drawdown"] * 0.1
        if score > best_score:
            best_score = score
            best_cfg = {
                "model": name,
                "params": mdl.get_params() if hasattr(mdl, "get_params") else {},
                "sharpe": evals["sharpe"],
                "drawdown": evals["drawdown"],
            }

    # Write chosen config
    CONFIG_PATH.write_text(json.dumps(best_cfg, indent=2))
    print("[strategy_tuner] Updated config with best model:", best_cfg["model"])

if __name__ == "__main__":
    main()
