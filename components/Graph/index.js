import { useState } from "react";
import s from "../../styles/components/graph/Graph.module.scss";
import Column from "./Column";

export default function Graph(props) {
  const [data] = useState(Object.entries(props.data));
  const [total, setTotal] = useState(0);

  function pullData(colAverage) {
    setTotal((total += colAverage));
  }

  return (
    <div className={s.container}>
      {/* Affichage du graphique, en fonction des données */}
      <div className={s.graph}>
        <div className={s.topGraph}>
          <div className={s.percents}>
            <p>100%</p>
            <p>0%</p>
          </div>
          <div className={s.colContainer}>
            {data &&
              data.map((category, i) => (
                <Column
                  key={i}
                  name={category[0]}
                  data={category[1]}
                  func={pullData}
                  total={total}
                />
              ))}
          </div>
        </div>
        <div className={s.bottomGraph}>
          {data &&
            data.map((category, i) => (
              <p key={i} className={s.catName}>
                {category[0][0].toUpperCase() + category[0].substr(1)}
              </p>
            ))}
        </div>
      </div>
      {/* Affichage du score global, avec smiley, en fonction du résultat de la moyenne totale des données du graphique */}
      <h2 className={s.globalScore}>
        Global score : {total / data.length}%{" "}
        {total / data.length > 90
          ? "🤩"
          : total / data.length > 74
          ? "😁"
          : total / data.length > 50
          ? "😄"
          : total / data.length > 25
          ? "😊"
          : "😌"}
      </h2>
    </div>
  );
}
