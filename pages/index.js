import Graph from "../components/Graph";
import s from "../styles/Home.module.scss";
import data from "../data.json";

export default function Home(props) {
  return (
    <div className={s.container}>
      <h1>Your progress :</h1>
      <Graph data={data} />
    </div>
  );
}
