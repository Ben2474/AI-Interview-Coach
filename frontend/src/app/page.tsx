import Link from "next/link";

export default function Homepage() {
    return (
        <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-8">
            <h1 className="text-5xl font-bold">
                AI Interview Coach
            </h1>

            <p className="mt-4 text-center text-lg text-gray-600">
                Practice personalized interview questions based on your resume and your job description.
            </p>

            <Link
            href="/setup"
            className="mt-8 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Start Interview
            </Link>
        </main>
    );
}