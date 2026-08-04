from datetime import datetime
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class InterviewSession(Base):
    __tablename__="interview_sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    job_title: Mapped[str] = mapped_column(String(150))
    company: Mapped[str | None] = mapped_column(String(150), nullable=True)
    job_description: Mapped[str] = mapped_column(Text)
    interview_type: Mapped[str] = mapped_column((String(50)))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    questions: Mapped[list["Question"]] = relationship(back_populates="session", cascade="all, delete-orphan",)

class Question(Base):
    __tablename__="questions"

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("interview_sessions.id"))
    question_text: Mapped[str] = mapped_column(Text)
    category: Mapped[str] = mapped_column(String(50))
    position: Mapped[int] = mapped_column(Integer)
    session: Mapped["InterviewSession"] = relationship(back_populates="questions")
    answer: Mapped["Answer | None"] = relationship(back_populates="question", uselist=False, cascade="all, delete-orphan",)

class Answer(Base):
    __tablename__="answers"

    id: Mapped[int] = mapped_column(primary_key=True)
    question_id: Mapped[int] = mapped_column(ForeignKey("questions.id"), unique=True,)
    answer_text: Mapped[str] = mapped_column(Text)
    audio_url: Mapped[str | None] = mapped_column(String(500),nullable=True,)
    question: Mapped["Question"] = relationship(back_populates="answer")
    feedback: Mapped["Feedback | None"] = relationship(back_populates="answer", uselist=False, cascade="all, delete_orphan",)


class Feedback(Base):
    __tablename__="feedback"

    id: Mapped[int] = mapped_column(primary_key=True)
    answer_id: Mapped[int] = mapped_column(ForeignKey("answers.id"), unique=True,)
    relevance_score: Mapped[int] = mapped_column(Integer)
    clarity_score: Mapped[int] = mapped_column(Integer)
    specificity_score: Mapped[int] = mapped_column(Integer)
    structure_score: Mapped[int] = mapped_column(Integer)
    impact_score: Mapped[int] = mapped_column(Integer)
    strengths: Mapped[str] = mapped_column(Text)
    improvements: Mapped[str] = mapped_column(Text)
    improved_answer: Mapped[str] = mapped_column(Text)
    answer: Mapped["Answer"] = relationship(back_populates="feedback")



    