export default function Rewards() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white">
      
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900">
        Win Every Month 💰
      </h2>

      {/* Subtext */}
      <p className="mt-4 text-gray-700 max-w-2xl">
        Match your scores with our monthly draw and win exciting rewards.
        The more matches you get, the bigger the prize.
      </p>

      {/* Reward Cards */}
      <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl">
        
        {/* 5 Match */}
        <div className="p-8 rounded-2xl border border-yellow-300 bg-yellow-50 shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-yellow-700">
            5 Matches
          </h3>
          <p className="mt-2 text-gray-800 font-semibold">
            Jackpot 🎯
          </p>
          <p className="mt-2 text-gray-700">
            Win 40% of the total prize pool
          </p>
        </div>

        {/* 4 Match */}
        <div className="p-8 rounded-2xl border border-gray-300 bg-gray-50 shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-gray-900">
            4 Matches
          </h3>
          <p className="mt-2 text-gray-800 font-semibold">
            Big Win
          </p>
          <p className="mt-2 text-gray-700">
            Win 35% of the prize pool
          </p>
        </div>

        {/* 3 Match */}
        <div className="p-8 rounded-2xl border border-blue-300 bg-blue-50 shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-bold text-blue-700">
            3 Matches
          </h3>
          <p className="mt-2 text-gray-800 font-semibold">
            Small Win
          </p>
          <p className="mt-2 text-gray-700">
            Win 25% of the prize pool
          </p>
        </div>

      </div>

    </section>
  );
}