import { useEffect, useState } from "react";

import Spinner from "./Spinner";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const Base_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Form = () => {
  const { isLoading, createCity } = useCities();
  const navigate = useNavigate();

  const [mapLatitude, mapLongitude] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    if (!mapLatitude && !mapLongitude) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(
          `${Base_URL}?latitude=${mapLatitude}&longitude=${mapLongitude}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "that doesn't seem to be a city. Please click somewhere else."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [mapLatitude, mapLongitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat: mapLatitude, lng: mapLongitude },
    };

    await createCity(newCity);
    navigate("/app/cities");
  };

  if (!mapLatitude && !mapLongitude)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;
