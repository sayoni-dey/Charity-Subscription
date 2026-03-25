"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-white to-gray-100">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
        Turn Your Golf Scores Into{" "}
        <span className="text-blue-600">Real Impact</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-gray-600 max-w-xl">
        Play, win monthly rewards, and support charities you care about — all in one platform.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
        >
          Start Playing
        </button>

        <button
            onClick={() => {
            const section = document.getElementById("how-it-works");
            section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 border border-gray-400 text-gray-800 rounded-xl hover:bg-gray-200 transition"
        >
            Learn More
        </button>
      </div>

    </section>
  );
}