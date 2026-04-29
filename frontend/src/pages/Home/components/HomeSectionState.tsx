import { FiAlertCircle } from "react-icons/fi";

type HomeSectionStateProps = {
  title: string;
  message: string;
};

export default function HomeSectionState({
  title,
  message,
}: HomeSectionStateProps) {
  return (
    <div className="mx-4 rounded-[10px] border border-red-500/20 bg-[linear-gradient(180deg,rgba(127,29,29,0.18),rgba(13,20,36,0.92))] px-5 py-10 text-center shadow-xl shadow-black/10 sm:mx-6 lg:mx-8">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-400/20 bg-red-500/12">
        <FiAlertCircle className="h-5 w-5 text-red-200" />
      </div>
      <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-red-100/90">
        {message}
      </p>
    </div>
  );
}
