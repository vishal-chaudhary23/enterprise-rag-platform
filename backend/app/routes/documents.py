from fastapi import APIRouter
import os
from app.services.retriever import get_vector_store

router = APIRouter()

UPLOAD_DIR = "uploads"

@router.get("/documents")
def get_documents():

    files = os.listdir(UPLOAD_DIR)

    return {
        "documents" : files
    }

@router.delete("/documents/{filename}")
def delete_document(filename: str):

    vectorstore = get_vector_store()

    results = vectorstore.get(
        where={
            "filename": filename
        }
    )

    ids = results["ids"]

    if ids:
        vectorstore.delete(ids=ids)

    file_path = f"uploads/{filename}"

    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "message": f"{filename} deleted",
        "deleted_chunks": len(ids)
    }