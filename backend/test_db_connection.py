
import psycopg2 
from dotenv import load_dotenv 
import os

load_dotenv()

user= os.getenv("SUPABASE_USER")
password=os.getenv("SUPABASE_PASS")
host=os.getenv("SUPABASE_HOST")
port=os.getenv("SUPABASE_PORT")
database=os.getenv("SUPABASE_DB")

def testing():
    try:
        conn = psycopg2.connect(dbname = database, user = user, password = password, host = host, port = port)
        print("Connection successful", flush=True)
        conn.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    testing()