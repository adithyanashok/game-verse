import type { ComponentProps } from "react";
import type ReviewCard from "../pages/Reviews/Components/ReviewCard";

export type Review = ComponentProps<typeof ReviewCard>["review"];
