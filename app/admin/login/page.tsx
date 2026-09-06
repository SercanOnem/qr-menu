"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, User, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Kullanıcı adı veya şifre hatalı.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10">
            <LockKeyhole size={36} className="text-red-500" />
          </div>

          <h1 className="text-3xl font-extrabold">
            Yönetici Girişi
          </h1>

          <p className="mt-2 text-zinc-500">
            DOY DOY 35 Yönetim Paneli
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Kullanıcı Adı
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınız"
                  autoComplete="username"
                  required
                  className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-12 pr-4 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-300">
                Şifre
              </label>

              <div className="relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifreniz"
                  autoComplete="current-password"
                  required
                  className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-12 pr-4 text-white outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-red-600 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={19} />

              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-600">
          DOY DOY 35 · Yönetim Paneli
        </p>
      </div>
    </main>
  );
}