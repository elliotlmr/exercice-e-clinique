import s from "../../styles/components/graph/Column.module.scss";
import { useEffect, useState } from "react";

export default function Column(props) {
  const [data] = useState(props.data);
  const [average, setAverage] = useState(0);
  let { func, total } = props;

  useEffect(() => {
    setAverage(calculateAverage());
    if (total === 0) {
      func(average);
    }
  }, [average, setAverage, func, total]);

  function calculateAverage() {
    // Calcul de la moyenne pondérée (arrondie au pourcent près) d'une catégorie.
    let total = 0;
    let weight = 0;
    // Pour chaque réponse, calculer : (( valeurChoix * ponderation ) / ponderation ).
    for (let i = 0; i < data.length; i++) {
      total += data[i].valeurChoix * data[i].ponderation;
      weight += data[i].ponderation;
    }
    return Math.floor((total / weight) * 100);
  }

  return (
    <div className={s.container}>
      <div
        className={s.column}
        style={{
          height: `${average}%`,
        }}
      >
        {/* Intégration de smiley ( toujouts positifs ) en fonction du résultat */}
        <div className={s.popup}>
          <p>
            {average}%<br />
            {average > 90
              ? "🤩"
              : average > 74
              ? "😁"
              : average > 50
              ? "😄"
              : average > 25
              ? "😊"
              : "😌"}
          </p>
        </div>
      </div>
      <p className={s.name}>
        {props.name[0].toUpperCase() + props.name.substr(1)}
      </p>
    </div>
  );
}
