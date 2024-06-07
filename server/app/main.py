import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.book_route import book_router
from fastapi.middleware.cors import CORSMiddleware


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

app.include_router(book_router)