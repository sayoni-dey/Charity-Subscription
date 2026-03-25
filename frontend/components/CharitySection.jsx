export default function CharitySection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-50">
      
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900">
        Play for Something Bigger ❤️
      </h2>

      {/* Subtext */}
      <p className="mt-4 text-gray-700 max-w-2xl">
        A portion of every subscription goes directly to charities you choose.
        Your game creates real-world impact.
      </p>

      {/* Charity Cards */}
      <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl">
        
        {/* Charity 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
          <h3 className="text-xl font-semibold">Education for All</h3>
          <p className="mt-2 text-gray-700">
            Helping underprivileged children access quality education.
          </p>
        </div>

        {/* Charity 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
          <h3 className="text-xl font-semibold">Healthcare Access</h3>
          <p className="mt-2 text-gray-700">
            Providing medical support to communities in need.
          </p>
        </div>

        {/* Charity 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
          <h3 className="text-xl font-semibold">Clean Water Initiative</h3>
          <p className="mt-2 text-gray-700">
            Ensuring access to safe drinking water worldwide.
          </p>
        </div>

      </div>

    </section>
  );
}