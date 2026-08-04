from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Interview Coach API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "AI Interview Coach API is running"}

@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}