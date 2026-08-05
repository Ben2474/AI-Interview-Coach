# import json
# from openai import OpenAI
# from app.config import OPENAI_API_KEY

# client = OpenAI(api_key=OPENAI_API_KEY)

# def generate_questions(
#         resume_text: str,
#         job_title: str,
#         job_description: str,
#         interview_type: str,
#         question_count: int = 5,
# ) -> list[dict[str,str]]:
#     prompt = f"""
# You are an experienced interviewer.

# Create {question_count} interview questions for this candidate.

# Target role:
# {job_title}

# Interview type:
# {interview_type}

# Candidate resume:
# {resume_text}

# Job description
# {job_description}

# Return JSON using this exact structure:

# {{
# "questions": [
# {{
# "question": "Question text",
# "category": "behavioral"
# }}
# ]
# }}
# """
#     response = client.responses.create(
#         model="gpt-5-mini",
#         input=prompt,
#     )

#     text = response.output_text

#     data = json.loads(text)

#     return data["questions"]

def generate_questions(
        resume_text,
        job_title,
        job_description,
        interview_type,
        question_count=5,
):
    return [
        {
            "id": 1,
            "question": "Tell me about yourself.",
            "category": "Behavioral",
            "difficulty": "Easy",
        },

        {
            "id": 2,
            "question": "Describe a python project you worked on.",
            "category": "Technical",
            "difficulty": "Medium",
        },

        {
            "id": 3,
            "question": "Explain object-oriented programming.",
            "category": "Technical",
            "difficulty": "Medium",
        },

        {
            "id": 4,
            "question": "Describe a time you worked on a team.",
            "category": "Behavioral",
            "difficulty": "Easy",
        },

        {
            "id": 5,
            "question": "Why do you want to work here?.",
            "category": "Behavioral",
            "difficulty": "Easy",
        },
    ]

def evaluate_answer(question,answer):
    return {
        "score": 8,
        "strengths": [
            "Good structure",
            "Clear communication"
        ],
        "improvements": [
            "Provide more technical detail",
            "Include measurable impact"
        ],
        "sample_answer":
        "A stronger answer could include..."
    }