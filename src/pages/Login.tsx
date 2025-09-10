import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/service/user";

export default function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => userLogin(email, password),
    onSuccess: (data) => {
      console.log("Login success:", data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-zinc-800">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-zinc-800 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-zinc-800 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-zinc-800 px-4 py-3 font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-zinc-700 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
