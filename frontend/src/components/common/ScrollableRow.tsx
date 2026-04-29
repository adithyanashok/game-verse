import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
  type ReactEventHandler,
  type ReactNode,
} from "react";
import { Rating } from "@mui/material";
import clsx from "clsx";
import { FiImage } from "react-icons/fi";

type CardClasses = {
  container?: string;
  imageWrapper?: string;
  title?: string;
  subtitle?: string;
  ratingWrapper?: string;
};

type RatingConfig = {
  value: number;
  precision?: number;
  size?: "small" | "medium" | "large";
  color?: string;
  emptyColor?: string;
};

type Props = {
  image?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  showSubtitle?: boolean;

  rating?: RatingConfig;

  padding?: string;
  width?: string;
  height?: string;

  classes?: CardClasses;

  onClick?: () => void;
};

type ImageElementProps = {
  onError?: ReactEventHandler<HTMLImageElement>;
  className?: string;
  style?: CSSProperties;
};

const CustomCard = ({
  image,
  title,
  subtitle,
  showSubtitle = true,
  rating,

  padding = "p-3",
  width = "w-[250px] md:w-[350px]",
  height = "h-[220px]",

  classes = {},
  onClick,
}: Props) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const renderImage = () => {
    if (!isValidElement(image)) {
      return image;
    }

    if (image.type !== "img") {
      return image;
    }

    const imageElement = image as ReactElement<ImageElementProps>;

    return cloneElement(imageElement, {
      onError: (event) => {
        imageElement.props.onError?.(event);
        event.currentTarget.style.opacity = "0";
      },
    });
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={clsx(
        "group relative flex-shrink-0 overflow-hidden rounded-[8px]",
        "border border-[rgba(0,212,255,0.12)] bg-[linear-gradient(180deg,rgba(18,26,44,0.96),rgba(9,14,28,0.96))]",
        "shadow-[0_18px_45px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.03]",
        "transition duration-300 ease-out hover:-translate-y-1 hover:border-[rgba(0,212,255,0.38)] hover:shadow-[0_22px_55px_rgba(0,0,0,0.34),0_0_26px_rgba(0,212,255,0.12)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]",
        "cursor-pointer",
        width,
        height,
        padding,
        classes.container
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-[linear-gradient(90deg,transparent,var(--color-blue),var(--color-lime),transparent)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />

      {image && (
        <div
          className={clsx(
            "relative overflow-hidden rounded-[6px] border border-white/[0.06] bg-[linear-gradient(135deg,#10243a,#18102d)]",
            classes.imageWrapper
          )}
        >
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,212,255,0.18)] bg-[#07101a]/70">
              <FiImage className="h-5 w-5 text-[var(--color-blue)]" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa7bd]">
              Preview unavailable
            </span>
          </div>
          <div className="relative z-10 transition duration-500 ease-out group-hover:scale-[1.04]">
            {renderImage()}
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,transparent_42%,rgba(7,11,22,0.58)_100%)] opacity-80" />
        </div>
      )}

      <div className="relative min-h-0">
        {title && (
          <div
            className={
              classes.title ??
              "mt-4 line-clamp-2 text-sm font-black leading-5 text-white"
            }
          >
            {title}
          </div>
        )}

        {showSubtitle && subtitle && (
          <div
            className={
              classes.subtitle ??
              "mt-1 line-clamp-1 text-xs font-semibold text-[#9aa7bd]"
            }
          >
            {subtitle}
          </div>
        )}

        {rating && (
          <div
            className={clsx(
              "mt-2 flex items-center gap-2",
              classes.ratingWrapper
            )}
          >
            <Rating
              value={Number(rating.value.toFixed(1))}
              precision={rating.precision ?? 0.1}
              readOnly
              size={rating.size ?? "small"}
              sx={{
                color: rating.color ?? "var(--color-lime)",
                "& .MuiRating-iconEmpty": {
                  color: rating.emptyColor ?? "rgba(255,255,255,0.24)",
                },
                fontSize: rating.size === "small" ? "12px" : "14px",
              }}
            />

            <span className="rounded-full border border-[rgba(182,255,59,0.2)] bg-[rgba(182,255,59,0.1)] px-2 py-0.5 text-xs font-black text-[var(--color-lime)]">
              {rating.value.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
