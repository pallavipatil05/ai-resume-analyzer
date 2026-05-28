function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="w-[400px] p-10 rounded-3xl 
      bg-white/10 backdrop-blur-xl border border-white/20">

        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Login
        </h1>

        <div className="mt-8 flex flex-col gap-5">

          <input
            type="email"
            placeholder="Enter Email"
            className="p-4 rounded-xl bg-white/10 border border-white/20 outline-none"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="p-4 rounded-xl bg-white/10 border border-white/20 outline-none"
          />

          <button className="bg-cyan-500 p-4 rounded-xl text-lg hover:scale-105 transition">
            Login
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login