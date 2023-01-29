import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row } from "../assets/style/common";
import Item from "../components/Item";
import Modal from "../components/Modal";
import { useAppSelector } from "../store/hooks";
import { Children, Directory, File } from "../store/Mockup";

const Detail = () => {
  const { id } = useParams();
  const data = useAppSelector((state) =>
    state.value.directories.find((server) => server.id === parseInt(id!))
  );
  const [isAddModalShow, setIsAddModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false);

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

  const handleClickButton = (mode: "ADD" | "DELETE" | "UPDATE") => {
    setIsAddModalShow(mode === "ADD");
    setIsDeleteModalShow(mode === "DELETE");
    setIsUpdateModalShow(mode === "UPDATE");
  };

  return (
    <>
      <Link to="/">
        <button>뒤로가기</button>
      </Link>
      <Col>
        <div>
          <button onClick={() => handleClickButton("ADD")}>추가</button>
          <button onClick={() => handleClickButton("DELETE")}>수정</button>
          <button onClick={() => handleClickButton("UPDATE")}>삭제</button>
        </div>
        {paintTree(data?.directories.children!)}
      </Col>
      <div>
        <Row>
          <div>이름</div>
          <div>파일크기</div>
          <div>수정시간</div>
          <div>{`${isAddModalShow}`}</div>
        </Row>
      </div>
      <Modal
        title="파일 삭제"
        isShow={isDeleteModalShow}
        onClose={() => setIsDeleteModalShow(false)}
        activeFunction={() => {}}
        confirmComment="추가"
        closingComment="취소"
      />
      <Modal
        title="파일 수정"
        isShow={isUpdateModalShow}
        onClose={() => setIsUpdateModalShow(false)}
        activeFunction={() => {}}
        confirmComment="수정"
        closingComment="취소"
      />
      <Modal
        title="파일 추가"
        isShow={isAddModalShow}
        onClose={() => setIsAddModalShow(false)}
        activeFunction={() => {}}
        confirmComment="삭제"
        closingComment="취소"
      />
    </>
  );
};
export default Detail;
