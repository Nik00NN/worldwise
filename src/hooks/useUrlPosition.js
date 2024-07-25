import { useSearchParams } from "react-router-dom";

const useUrlPosition = () => {
  const [searchParams] = useSearchParams();

  const mapLatitude = searchParams.get("lat");
  const mapLongitude = searchParams.get("lng");

  return [mapLatitude, mapLongitude];
};

export { useUrlPosition };
