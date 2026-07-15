import { BookHeart } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center pt-12 pb-8 px-4">
      <div className="inline-flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-md">
          <BookHeart className="w-5 h-5 text-white" />
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Rylee&apos;s Journal
      </h1>
      <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-md mx-auto">
        A little space where I share my thoughts, feelings, and weekly adventures with you, Dad 💜
      </p>
    </header>
  );
}
