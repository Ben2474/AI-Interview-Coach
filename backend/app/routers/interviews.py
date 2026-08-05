from fastapi import APIRouter, HTTPException
from app.schemas import InterviewCreate
from app.services.ai_service import generate_questions

router = APIRouter(
    prefix="/interviews",
    tags=["interviews"],
)

@router.post("/generate")
def create_interview():
    questions = generate_questions(
        resume_text="""
        Bennett Thomas
        Computer Science Graduate
        React
        Python
        Firebase
        SQL
        QA Internship
        """,
        job_title="Software Engineer I",
        job_description="""
        Looking for a software engineer
        with React and Python experience.
        """,
        interview_type="behavioral",
    )

    return {
        "questions": questions
    }