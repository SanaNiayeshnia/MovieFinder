import "./Star.css";
export default function Star({
  rating,
  temprating,
  setRating,
  setTempRating,
  setUserRating,
  num,
}) {
  return (
    <i
      className={`${
        num <= (temprating || rating) ? "fa-solid" : "fa-regular"
      } fa-star star`}
      onClick={() => {
        setRating(num);
        setUserRating(num);
      }}
      onMouseEnter={() => setTempRating(num)}
      onMouseLeave={() => setTempRating(0)}
    ></i>
  );
}
