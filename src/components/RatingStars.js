import { useState } from "react";
import "./RatingStars.css";
import Star from "./Star";
export default function RatingStars({ setUserRating }) {
  const [rating, setRating] = useState(0);
  const [temprating, setTempRating] = useState(0);
  return (
    <div className="rating-stars">
      {Array.from({ length: 10 }).map((star, index) => (
        <Star
          rating={rating}
          temprating={temprating}
          setRating={setRating}
          setUserRating={setUserRating}
          setTempRating={setTempRating}
          num={index + 1}
          key={index}
        />
      ))}
    </div>
  );
}
