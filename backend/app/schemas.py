from pydantic import BaseModel, Field

class InterviewCreate(BaseModel):
    job_title: str = Field(min_length=2, max_length=150)
    company: str | None = Field(default=None, max_length=150)
    job_description: str = Field(min_length=20)
    resume_text: str = Field(min_length=20)
    interview_type: str
    question_count: int = Field(default=5, ge=1, le=10)

class QuestionResponse(BaseModel):
    question: str
    category: str

