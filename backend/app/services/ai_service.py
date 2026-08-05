import json
from openai import OpenAI
from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_questions(
        resume_text: str,
        job_title: str,
        job_description: str,
        interview_type: str,
        question_count: int = 5,
) -> list[dict[str,str]]:
    prompt = f"""
You are an experienced interviewer.

Create {question_count} interview questions for this candidate.

Target role:
{job_title}

Interview type:
{interview_type}

Candidate resume:
{resume_text}

Job description
{job_description}

Return JSON using this exact structure:

{{
"questions": [
{{
"question": "Question text",
"category": "behavioral"
}}
]
}}
"""
    response = client.responses.create(
        model="gpt-5-mini",
        input=prompt,
    )

    text = response.output_text

    data = json.loads(text)

    return data["questions"]