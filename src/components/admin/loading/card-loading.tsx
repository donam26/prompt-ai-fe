import React from "react";
import { LOADING_SIZE, CARD_LOADING_SIZE_CLASSES } from "@/constants/loading";

interface CardLoadingProps {
  size: LOADING_SIZE;
}

/**
 * Card loading component with pulse animation
 * Used for card content loading states
 */
const CardLoading: React.FC<CardLoadingProps> = ({ size }) => (
  <div className="flex flex-col justify-center items-center space-y-2">
    <div
      className={`${CARD_LOADING_SIZE_CLASSES[size]} bg-primary/20 rounded-full animate-pulse`}
    />
    <div className="bg-primary/10 rounded-full w-16 h-2 animate-pulse" />
  </div>
);

export default CardLoading;
