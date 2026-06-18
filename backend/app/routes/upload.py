from fastapi import APIRouter, UploadFile, File

from app.services.file_service import save_file
from app.services.pdf_loader import load_pdf
from app.services.chunker import create_chunks
from app.services.vector_store import create_vector_store

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    filename = save_file(file)

    file_path = f"uploads/{filename}"

    documents = load_pdf(file_path)

    chunks = create_chunks(documents)

    for chunk in chunks:
        chunk.metadata["filename"] = filename

    vectorstore = create_vector_store(chunks)


    return {
        "filename": filename,
        "pages": len(documents),
        "chunks": len(chunks)
    }