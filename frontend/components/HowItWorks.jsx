export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white"
    >
      <h2 className="text-4xl font-bold text-blue-600">
        How It Works
      </h2>

      <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl">
        
        {/* Step 1 */}
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">1. Enter Scores</h3>
          <p className="mt-2 text-gray-600">
            Add your latest golf scores (max 5). Keep them updated.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-gray-700">2. Monthly Draw</h3>
          <p className="mt-2 text-gray-800">
            Every month, winning numbers are generated automatically.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 border rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-700">3. Win + Donate</h3>
          <p className="mt-2 text-gray-600">
            Match scores to win prizes while contributing to charity.
          </p>
        </div>

      </div>
    </section>
  );
}