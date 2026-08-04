from fastapi import APIRouter, File, HTTPException, UploadFile
from pypdf import PdfReader
from io import BytesIO

router = APIRouter(
    prefix="/resumes", tags=["resumes"],
)

@router.post("/extract")
async def extract_resume(
    file: UploadFile = File(...)
) -> dict[str,str]:
    allowed_types = {
        "application/pdf",
        "text/plain",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and text files are supported.",
        )
    
    content = await file.read()

    if file.content_type == "application/pdf":
        reader = PdfReader(BytesIO(content))
        resume_text = "\n".join(
            page.extract_text() or ""
            for page in reader.pages
        )
    else:
        resume_text = content.decode("utf-8")

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable resume text was found",
        )
        
    return {
        "filename": file.filename or "resume",
        "text": resume_text,
    }
