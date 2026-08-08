"use client";

import {useRouter } from "next/navigation";

const results = {
    score: 82,
    categories: [
        {
            name: "Communication",
            score: 80,
        },
        {
            name: "Technical Knowledge",
            score: 90,
        },
        {
            name: "Structure",
            score:70,
        },
    ],

    strengths: [
        "Clear comunication",
        "Good technical knowledge",
    ],
    improvements: [
        "Give more specific examples",
        "Quantify your accomplishments",
    ],
    };

function ProgressBar({
    score,
    }: {
        score: number;
    }) {
        return (
            <div className="h-3 w-full overdlow-hidden rounded-full bg-gray-200">
            <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${score}%` }}
                />
            </div>
        );
    }

export default function ResultsPage() {
  const router = useRouter();

  const handlePracticeAgain = () => {
    router.push("/setup");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Interview Complete!
          </h1>

          <p className="mt-2 text-gray-600">
            Here's how you performed in your mock interview.
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Score
          </p>

          <div className="mt-2 text-6xl font-bold text-blue-600">
            {results.score}
            <span className="text-3xl text-gray-400">/100</span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Performance Breakdown
          </h2>

          <div className="space-y-6">
            {results.categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    {category.name}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {category.score}%
                  </span>
                </div>

                <ProgressBar score={category.score} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Strengths
            </h2>

            <ul className="space-y-4">
              {results.strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="mt-0.5 text-lg text-green-600">
                    ✓
                  </span>

                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Improvements
            </h2>

            <ul className="space-y-4">
              {results.improvements.map((improvement) => (
                <li
                  key={improvement}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="mt-0.5 text-lg text-orange-500">
                    •
                  </span>

                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handlePracticeAgain}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Practice Again
          </button>
        </div>
      </div>
    </main>
  );
}