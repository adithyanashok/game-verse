import type { ReactNode } from "react";
import { Rating } from "@mui/material";

type Props = {
  image: ReactNode;
  title: string;
  subtitle: string | ReactNode;
  showSubtitle: boolean;
  rating?: number;
};
const CustomCard = ({
  image,
  title,
  subtitle,
  showSubtitle = false,
  rating,
}: Props) => {
  return (
    <div className="flex-shrink-0 w-[350px]">
      {image}
      <p className="font-bold mt-1 text-white">{title}</p>
      {showSubtitle && <p className="text-gray-500 text-[12px]">{subtitle}</p>}
      {rating !== undefined && (
        <div className="flex items-center gap-2 mt-1">
          <Rating
            sx={{
              "& .MuiRating-iconEmpty": {
                color: "#989fab",
              },
            }}
            style={{ color: "#6711bf" }}
            name="read-only"
            value={Number(rating.toFixed(1))}
            precision={0.1}
            readOnly
            size="small"
          />
          <span className="text-white text-sm font-medium">
            {rating.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
