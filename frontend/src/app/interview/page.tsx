"use client"; 

import { useEffect, useState } from "react";

type InterviewQuestion = {
  id?: number;
  question: string;
  category: string;
  difficulty: string;
};

export default function InterviewPage() {
    const[questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const[currentQuestion, setCurrentQuestion] = useState(0);
    const[answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        const stored = sessionStorage.getItem("interviewQuestions");

        if (stored) {
          const parsedQuestions: InterviewQuestion[] = JSON.parse(stored);

          setQuestions(parsedQuestions);
          setAnswers(new Array(parsedQuestions.length).fill(""));
        }
    }, []);

    if (questions.length === 0) {
      return (
        <main className="mx-auto max-w-4xl p-8">
            <h1 className="text-3xl font-bold">
                Interview
            </h1>

            <p className="mt-4">
              No interview questions found.
            </p>
            </main>
      );
    }

    const question = questions[currentQuestion];

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    function handleAnswerChange(
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) {
      const updatedAnswers = [...answers];

      updatedAnswers[currentQuestion] = event.target.value;

      setAnswers(updatedAnswers);
    }

    function handleNext() {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }

    function handlePrevious() {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    }

    return (
      <main className="mx-auto max-w-3xl p-8">
        <div>
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Mock Interview
          </h1>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span>Interview Progress</span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-black transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

        <div className="mt-8 rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <span className="rounded bg-gray-100 px-3 py-1 text-sm">
              {question.category}
            </span>

            {question.difficulty && (
              <span className="=text-sm text-gray-500">
                {question.difficulty}
              </span>
            )}
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            {question.question}
          </h2>

          <textarea
          className="mt-6 min-h-48 w-full rounded border p-4"
          placeholder="Type your answer here..."
          value={answers[currentQuestion] || ""}
          onChange={handleAnswerChange}
          />

          <div className="mt-6 flex justify-between">
            <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="rounded border px-5 py-3 disabled:cursor-not-allowed disabled: opacity-50"
            >
              Previous
            </button>

            <button
            type="button"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className="rounded bg-black px-5 py-3 text-white disabled:cursor-not-allowed disabled: opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    );    
}