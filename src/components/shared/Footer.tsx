import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-sm text-slate-500">
          © 2025 FridgetoFork. Dibuat dengan ❤️ untuk dapur Indonesia.
        </p>
      </div>
    </footer>
  );
}