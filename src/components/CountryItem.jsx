import styles from "./CountryItem.module.css";

const CountryItem = ({ country }) => {
  return (
    <li className={styles.countryItem}>
      <span>{country.country}</span>
    </li>
  );
};

export default CountryItem;
