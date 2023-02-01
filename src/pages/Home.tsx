import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const Home = () => {
  const data = useAppSelector((state) => state.data.directories);
  return (
    <>
      {data.map(({ id }) => (
        <Link to={`server/${id}`} key={id}>
          <div>server #{id}</div>
        </Link>
      ))}
    </>
  );
};
export default Home;
