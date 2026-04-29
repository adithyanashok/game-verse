import { FiSend } from "react-icons/fi";

const NewsLetter = () => {
  return (
    <section className="w-full bg-[#070b16] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border-t border-[rgba(0,212,255,0.14)] pt-10 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-lime)]">
            Newsletter
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
            Stay updated with GameVera
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#aeb7c8]">
            Get new reviews, trending picks, and community highlights delivered
            to your inbox.
          </p>
        </div>

        <form className="flex w-full max-w-md rounded-full border border-[rgba(0,212,255,0.14)] bg-[#0d1424] p-1.5 backdrop-blur md:min-w-[420px]">
          <input
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-[#8f98aa] focus:outline-none"
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
          />

          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-lime)] px-5 py-3 text-sm font-bold text-[#07101a] transition hover:bg-[#ccff6f]"
            type="submit"
          >
            <FiSend className="h-4 w-4" />
            <span className="hidden sm:inline">Subscribe</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
