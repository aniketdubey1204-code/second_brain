import streamlit as st
import pandas as pd
import plotly.express as px
import json
import os
import time
import requests
from datetime import datetime

# --- CONFIGURATION ---
st.set_page_config(page_title="AI Strategy Battle Royale", layout="wide")
LOG_FILE = "master_trading_battle.json"

# --- STYLING (FIXED LINE) ---
st.markdown("""
    <style>
    .main { background-color: #0e1117; }
    .stMetric { background-color: #161b22; border-radius: 10px; padding: 15px; border: 1px solid #30363d; }
    </style>
    """, unsafe_allow_html=True) 

# --- FUNCTIONS ---
def get_coindcx_price(pair="BTCINR"):
    try:
        url = "https://public.coindcx.com/market_data/current_prices"
        response = requests.get(url, timeout=5)
        data = response.json()
        return data.get(pair, "N/A")
    except Exception:
        return "Conn Error"

def load_data():
    if not os.path.exists(LOG_FILE) or os.stat(LOG_FILE).st_size == 0:
        return pd.DataFrame()
    data = []
    with open(LOG_FILE, 'r') as f:
        for line in f:
            line = line.strip()
            if not line: continue
            try:
                data.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    if not data: return pd.DataFrame()
    df = pd.DataFrame(data)
    if 'cumulative_pnl' in df.columns:
        df['cumulative_pnl'] = pd.to_numeric(df['cumulative_pnl'], errors='coerce').fillna(0.0)
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        df = df.sort_values('timestamp')
    return df

st.title("⚔️ AI Trading Strategy: Battle Royale")

st.sidebar.header("📡 Live Market Feed (CoinDCX)")
btc_p = get_coindcx_price("BTCINR")
eth_p = get_coindcx_price("ETHINR")
st.sidebar.metric("BTC/INR", f"₹{btc_p}")
st.sidebar.metric("ETH/INR", f"₹{eth_p}")
st.sidebar.markdown("---")

placeholder = st.empty()

while True:
    df = load_data()
    with placeholder.container():
        if not df.empty:
            m1, m2, m3 = st.columns(3)
            teams = {"Team_A": "🚀 Scalper", "Team_B": "📈 Trend", "Team_C": "📉 Reversion"}
            cols = [m1, m2, m3]
            for i, (team_id, team_name) in enumerate(teams.items()):
                team_df = df[df['team'] == team_id]
                if not team_df.empty:
                    latest = team_df.iloc[-1]
                    val = latest['cumulative_pnl']
                    status = latest.get('status', 'IDLE')
                    cols[i].metric(team_name, f"{val:.2f}%", f"Status: {status}", delta_color="normal" if val >= 0 else "inverse")
                else:
                    cols[i].metric(team_name, "0.00%", "Status: Waiting...")

            st.write("### 📊 Performance Battle (Equity Curve)")
            fig = px.line(df, x='timestamp', y='cumulative_pnl', color='team',
                          markers=True, template="plotly_dark",
                          color_discrete_map={"Team_A": "#FFD700", "Team_B": "#00CCFF", "Team_C": "#00FF7F"})
            fig.update_layout(hovermode="x unified")
            st.plotly_chart(fig, use_container_width=True)

            with st.expander("📝 View Live Trade Audit Logs"):
                st.dataframe(df.tail(20).sort_values('timestamp', ascending=False), use_container_width=True)
        else:
            st.warning("Awaiting data... OpenClaw must write to `master_trading_battle.json` in JSONL format.")

    time.sleep(5)
    st.rerun()