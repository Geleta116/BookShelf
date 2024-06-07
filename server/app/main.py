import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from app.routes.book_route import book_router


from app.infrastructre.db.database import create_tables

if os.getenv("ENV") == "local":
    load_dotenv(dotenv_path=".env.local")
else:
    load_dotenv(dotenv_path=".env.docker")

app = FastAPI() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def startup_event():
    try:
        create_tables()
    except Exception as e:
        print(f"Error during database initialization: {e}")


app.add_event_handler("startup", startup_event)

app.include_router(book_router)
