import Graph from "../components/Graph";
import s from "../styles/Home.module.scss";

export default function Home(props) {
  return (
    <div className={s.container}>
      <h1>Your progress :</h1>
      <Graph data={props.data} />
    </div>
  );
}

// Server side imports, to get the datas :
import data from "../data.json";

export async function getStaticProps(context) {
  return {
    props: { data: data },
  };
}
