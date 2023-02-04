import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentDir } from "../store/slice/currentInfoSlice";

const Home = () => {
  const data = useAppSelector((state) => state.data.value.directories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setCurrentDir({
        name: "",
        children: [],
        parent: undefined,
      })
    );
  }, []);
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
