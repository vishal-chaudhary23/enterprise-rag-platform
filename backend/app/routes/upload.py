from fastapi import APIRouter, UploadFile, File

from app.services.file_service import save_file

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    filename = save_file(file)

    return {
        "filename": filename,
        "status": "uploaded"
    }