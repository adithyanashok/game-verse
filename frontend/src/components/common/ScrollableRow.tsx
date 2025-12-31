import type { ReactNode } from "react";
import { Rating } from "@mui/material";

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
  return (
    <div
      onClick={onClick}
      className={`
        flex-shrink-0
        ${width}
        ${height}
        ${padding}
        hover-card
        bg-dark
         overflow-hidden shadow-lg
         cursor-pointer
        ${classes.container ?? ""}
      `}
    >
      {/* IMAGE */}
      {image && <div className={classes.imageWrapper ?? ""}>{image}</div>}

      {/* CONTENT */}
      <div>
        {title && (
          <div className={classes.title ?? "text-white font-semibold mt-4"}>
            {title}
          </div>
        )}

        {showSubtitle && subtitle && (
          <div className={classes.subtitle ?? "text-grey text-xs mt-1"}>
            {subtitle}
          </div>
        )}

        {/* RATING */}
        {rating && (
          <div
            className={`flex items-center gap-2 mt-2 ${
              classes.ratingWrapper ?? ""
            }`}
          >
            <Rating
              value={Number(rating.value.toFixed(1))}
              precision={rating.precision ?? 0.1}
              readOnly
              size={rating.size ?? "small"}
              sx={{
                color: rating.color ?? "#6711bf",
                "& .MuiRating-iconEmpty": {
                  color: rating.emptyColor ?? "#989fab",
                },
                fontSize: rating.size === "small" ? "12px" : "14px",
              }}
            />

            <span className="text-white text-xs font-medium">
              {rating.value.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
