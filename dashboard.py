import streamlit as st
import pandas as pd
import plotly.express as px
import json
import os
import time
import requests

# Page Configuration
st.set_page_config(page_title="AI Strategy Battle Royale", layout="wide")

# CoinDCX Live Price Function
def get_coindcx_price(pair="BTCINR"):
    try:
        url = "https://public.coindcx.com/market_data/current_prices"
        response = requests.get(url)
        data = response.json()
        return data.get(pair, "N/A")
    except:
        return "Conn Error"

st.title("⚔️ AI Trading Strategy: Battle Royale")

# Sidebar: Live CoinDCX Widget
st.sidebar.header("📡 Live Market Feed (CoinDCX)")
btc_price = get_coindcx_price("BTCINR")
eth_price = get_coindcx_price("ETHINR")
st.sidebar.metric("BTC/INR", f"₹{btc_price}")
st.sidebar.metric("ETH/INR", f"₹{eth_price}")
st.sidebar.markdown("---")

LOG_FILE = "master_trading_battle.json"

def load_data():
    if not os.path.exists(LOG_FILE):
        return pd.DataFrame()
    with open(LOG_FILE, 'r') as f:
        try:
            # Reading line by line for real-time JSONL
            data = [json.loads(line) for line in f if line.strip()]
            return pd.DataFrame(data)
        except:
            return pd.DataFrame()

placeholder = st.empty()

while True:
    df = load_data()
    with placeholder.container():
        if not df.empty:
            col1, col2, col3 = st.columns(3)
            for team in ['Team_A', 'Team_B', 'Team_C']:
                team_data = df[df['team'] == team]
                if not team_data.empty:
                    latest = team_data.iloc[-1]
                    if team == 'Team_A': col1.metric("🚀 Scalper (A)", f"{latest['cumulative_pnl']}%", latest['status'])
                    elif team == 'Team_B': col2.metric("📈 Trend (B)", f"{latest['cumulative_pnl']}%", latest['status'])
                    else: col3.metric("📉 Reversion (C)", f"{latest['cumulative_pnl']}%", latest['status'])

            fig = px.line(df, x='timestamp', y='cumulative_pnl', color='team',
                         title="Real-Time Strategy Competition", template="plotly_dark")
            st.plotly_chart(fig, use_container_width=True)
            
            with st.expander("Recent Activity Logs"):
                st.dataframe(df.tail(10), use_container_width=True)
        else:
            st.info("Waiting for OpenClaw agents to write data to master_trading_battle.json...")

    time.sleep(5)
    st.rerun()