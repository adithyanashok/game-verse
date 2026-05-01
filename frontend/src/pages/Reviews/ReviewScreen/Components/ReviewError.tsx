import { FiAlertCircle } from "react-icons/fi";

interface Props {
  message?: string | null | undefined;
}

const ReviewError = ({ message }: Props) => (
  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-6 shadow-xl shadow-black/20">
    <div className="flex items-start gap-3">
      <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
      <div>
        <h1 className="text-lg font-black text-white">Review unavailable</h1>
        <p className="mt-1 text-sm text-red-100/80">{message}</p>
      </div>
    </div>
  </div>
);

export default ReviewError;
