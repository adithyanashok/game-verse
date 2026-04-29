import { FiMessageSquare, FiShield, FiStar } from "react-icons/fi";

const AuthBanner = () => {
  return (
    <section className="overflow-hidden rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(135deg,rgba(8,16,28,0.98)_0%,rgba(13,20,36,0.94)_55%,rgba(8,16,28,0.98)_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(182,255,59,0.08),transparent_22%)]" />
        <div className="relative flex h-full flex-col justify-between px-6 py-7 sm:px-7 sm:py-8">
          <div>
            <div className="inline-flex h-7 items-center gap-2 rounded-full border border-[rgba(0,212,255,0.16)] bg-[rgba(0,212,255,0.08)] px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#cbeafe]">
              <FiMessageSquare className="h-3.5 w-3.5 text-(--color-blue)" />
              GameVerse access
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">
              Welcome back to the conversation
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#c8d3e4] sm:text-[15px]">
              Pick up where you left off with reviews, discussions, and the
              games everyone is still arguing about.
            </p>

            <div className="mt-8 space-y-3">
              <div className="rounded-[10px] border border-[rgba(0,212,255,0.16)] bg-[linear-gradient(180deg,rgba(0,212,255,0.14),rgba(0,212,255,0.04))] p-4 shadow-lg shadow-black/10">
                <div className="flex items-start gap-3">
                  <FiShield className="mt-0.5 h-5 w-5 text-(--color-blue)" />
                  <div>
                    <p className="text-sm font-black text-white">
                      Secure sign in
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#c8d3e4]">
                      Access your profile, saved activity, and community
                      presence without losing your place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[10px] border border-[rgba(182,255,59,0.16)] bg-[linear-gradient(180deg,rgba(182,255,59,0.14),rgba(182,255,59,0.04))] p-4 shadow-lg shadow-black/10">
                <div className="flex items-start gap-3">
                  <FiStar className="mt-0.5 h-5 w-5 text-[var(--color-lime)]" />
                  <div>
                    <p className="text-sm font-black text-white">
                      Jump straight into what matters
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#c8d3e4]">
                      Track reviews, join live rooms, and keep your player
                      identity in one polished space.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthBanner;
