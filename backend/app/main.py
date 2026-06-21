import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router
from app.routes.documents import router as document_router


app = FastAPI(
    title="Enterprise RAG Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://enterprise-rag-platform-1mfcjdlel-code-cretaor.vercel.app"
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(document_router)

@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }
