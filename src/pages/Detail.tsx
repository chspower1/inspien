import { Link, useParams } from "react-router-dom";
import { Col, Row } from "../assets/style/common";
import Item from "../components/Item";
import { useAppSelector } from "../store/hooks";
import { Children, Directory, File } from "../store/Mockup";

const Detail = () => {
  const params = useParams();
  console.log(params);
  const data = useAppSelector((state) =>
    state.value.directories.find((server) => server.id === parseInt(params.id!))
  );
  console.log(data);

  const paintTree = (children: Children) => {
    return children.map((item) => {
      if (item.type === "DIRECTORY")
        return (
          <>
            {item.name}
            <div>{paintTree(item.children)}</div>
          </>
        );
      else return <>{item.name}</>;
    });
  };

  return (
    <>
      <Link to="/">
        <button>뒤로가기</button>
      </Link>
      <Col>
        <div>
          <button>추가</button>
          <button>수정</button>
          <button>삭제</button>
        </div>
        {paintTree(data?.directories.children!)}
      </Col>
      <div>
        <Row>
          <div>이름</div>
          <div>파일크기</div>
          <div>수정시간</div>
        </Row>
      </div>
    </>
  );
};
export default Detail;
