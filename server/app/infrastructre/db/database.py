import os
from abc import ABC, abstractmethod
import psycopg2
from dotenv import load_dotenv

load_dotenv()

class PgDatabase(ABC):
    def __init__(self) -> None:
        super().__init__()

    def connect_to_database(self):
        return psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME")
        )

    def __enter__(self):
        self.connection = self.connect_to_database()
        self.cursor = self.connection.cursor()
        return self

    def __exit__(self, exception_type, exc_val, traceback):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

    
bookTable = "bookS"

def create_tables():
    with PgDatabase() as db:
        db.cursor.execute(f"""
        CREATE TABLE IF NOT EXISTS {bookTable} (
            id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL
        );
        """)
        db.connection.commit()
        print("Tables are created or already exist...")

