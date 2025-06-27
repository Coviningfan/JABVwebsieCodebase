import os
from fastapi import FastAPI
import psycopg2

app = FastAPI()

DATABASE_URL = os.environ["DATABASE_URL"]

@app.get("/api/cost-rates")
def get_cost_rates():
    conn = psycopg2.connect(DATABASE_URL)
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM cost_rates;")
        rows = cur.fetchall()
    conn.close()
    return rows
