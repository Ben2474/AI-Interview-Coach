"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type InterviewQuestion = {
    question: string;
    category: string;
};

export default function SetupPage() {
    const router = useRouter();
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [interviewType, setInterviewType] = useState("behavioral");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit (event:FormEvent) {
        event.preventDefault();
        setLoading(true);
        setError("");

    try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interviews/generate`,
    {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        job_title: jobTitle,
        company,
        jobDescription,
        resumeText,
        interviewType,
        question_count: 5,
        }),
    }
    );

            if(!response.ok) {
                throw new Error("Could not create interview.");
            }

            const data: {
                questions: InterviewQuestion[];
            } = await response.json();

            sessionStorage.setItem(
                "interviewQuestions",
                JSON.stringify(data.questions)
            );
            sessionStorage.setItem(
                "interviewDetails",
                JSON.stringify({
                    jobTitle,
                    company,
                    jobDescription,
                })
            );

            router.push("/interview");
        } catch (err) {
            setError(
                err instanceof Error
                ? err.message
                : "An unexpected error occured/"
            );
        } finally {
            setLoading(false);
        }
    }
return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">
        Create Practice Interview
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <input
          className="w-full rounded border p-3"
          placeholder="Target job title"
          value={jobTitle}
          onChange={(event) =>
            setJobTitle(event.target.value)
          }
          required
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Company"
          value={company}
          onChange={(event) =>
            setCompany(event.target.value)
          }
        />

        <textarea
          className="min-h-40 w-full rounded border p-3"
          placeholder="Paste job description"
          value={jobDescription}
          onChange={(event) =>
            setJobDescription(event.target.value)
          }
          required
        />

        <textarea
          className="min-h-40 w-full rounded border p-3"
          placeholder="Paste resume text"
          value={resumeText}
          onChange={(event) =>
            setResumeText(event.target.value)
          }
          required
        />

        <select
          className="w-full rounded border p-3"
          value={interviewType}
          onChange={(event) =>
            setInterviewType(event.target.value)
          }
        >
          <option value="behavioral">Behavioral</option>
          <option value="technical">Technical</option>
          <option value="mixed">Mixed</option>
        </select>

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        <button
          className="rounded bg-black px-5 py-3 text-white"
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Generating..."
            : "Generate Interview"}
        </button>
      </form>
    </main>
  );
}