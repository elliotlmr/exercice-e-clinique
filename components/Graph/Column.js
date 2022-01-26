import s from "../../styles/components/graph/Column.module.scss";
import { useEffect, useState } from "react";

export default function Column(props) {
  const [data] = useState(props.data);
  const [average, setAverage] = useState(0);
  let { func, total } = props;

  useEffect(() => {
    function calculateAverage() {
      // Calcul de la moyenne pondérée (arrondie au pourcent près) d'une catégorie.
      let totalValue = 0;
      let weight = 0;
      // Pour chaque réponse, calculer : (( valeurChoix * ponderation ) / ponderation ).
      for (let i = 0; i < data.length; i++) {
        totalValue += data[i].valeurChoix * data[i].ponderation;
        weight += data[i].ponderation;
      }
      return Math.floor((totalValue / weight) * 100);
    }

    setAverage(calculateAverage());

    if (total === 0) {
      func(average);
    }
  }, [average, setAverage, func, total, data]);

  return (
    <div className={s.container}>
      {/* Affichage d'une colone du graphique en fonction de la moyenne pondérée calculée par calculateAverage() */}
      <div
        className={s.column}
        style={{
          height: `${average}%`,
          backgroundColor:
            average >= 75
              ? "var(--color-yellow)"
              : average >= 50
              ? "var(--color-green)"
              : "var(--color-dark)",
        }}
      >
        {/* Intégration de smiley positifs en fonction du résultat en pourcentage au passage de la souris / mobile touch */}
        <div className={s.popup}>
          <p
            style={{
              color: average >= 75 && "var(--color-green)",
            }}
          >
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
    </div>
  );
}
