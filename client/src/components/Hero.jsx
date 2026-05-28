function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-[80vh] px-6">

      <h1 className="text-7xl font-bold leading-tight">
        Smart <span className="text-cyan-400">AI Resume</span>
        <br />
        Analysis Platform
      </h1>

      <p className="mt-6 text-xl text-gray-300 max-w-3xl">
        Analyze resumes using Artificial Intelligence,
        ATS checking, skill extraction, and career recommendations.
      </p>

      <div className="mt-10 flex gap-6">

        <button className="px-8 py-4 rounded-2xl bg-cyan-500 text-lg hover:scale-105 transition">
          Get Started
        </button>

        <button className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg text-lg hover:bg-white/20 transition">
          Learn More
        </button>

      </div>

    </section>
  )
}

export default Hero