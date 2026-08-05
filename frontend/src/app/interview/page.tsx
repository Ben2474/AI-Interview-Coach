"use client"; 

import { useEffect, useState } from "react";

type InterviewQuestion = {
    question: string;
    category: string;
};

export default function InterviewPage() {
    const[questions, setQuestions] = useState<InterviewQuestion[]>([]);

    useEffect(() => {
        const stored = sessionStorage.getItem("interviewQuestions");

        if (stored) {
            setQuestions(JSON.parse(stored));
        }
    }, []);

    return (
        <main className="mx-auto max-w-4xl p-8">
            <h1 className="text-3xl font-bold">
                Interview Questions
            </h1>

            {questions.length === 0 ? (
                <p className="mt-6"> No interview questions found. </p>
            ) : (
                <div className="mt-8 space-y-6">
                    {questions.map((question,index) => (
                        <div
                        key={index}
                        className="rounded border p-5"
                        >
                            <p className="font-semibold">
                Question {index + 1}
              </p>

              <p className="mt-2">
                {question.question}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Category: {question.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}