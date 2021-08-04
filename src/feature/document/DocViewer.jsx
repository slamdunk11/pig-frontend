import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux
import { __deleteDoc } from "../../redux/modules/document";

// toast UI viewer
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

// elem
import { Button } from "../../elem";

const DocViewer = () => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();

  const [current, setCurrent] = useState({
    title: "",
    content: "",
  });

  // 최적화 반드시 필요✨
  const currentDoc = useSelector((state) => {
    const idx = state.document.docList.findIndex((doc) => doc.docId === docId);
    return state.document.docList[idx];
  });

  useEffect(() => {
    setCurrent({
      title: currentDoc ? currentDoc.title : "",
      content: currentDoc ? currentDoc.content : "",
    });
  }, [currentDoc, dispatch]);

  const viewerOpt = {
    initialValue: current.content,
  };

  const clickDelete = () => {
    // 정말 삭제할거냐는 안내 모달 필요
    dispatch(__deleteDoc(docId, roomId));
  };

  return (
    <Container>
      <DocTitle>{current.title}</DocTitle>
      <div>
        <button
          onClick={() => history.push(`/workspace/${roomId}/doc/${docId}/edit`)}
        >
          수정
        </button>
        <button onClick={clickDelete}>삭제</button>
      </div>
      {current.content && <Viewer {...viewerOpt}></Viewer>}
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const DocTitle = styled.div`
  // 임시 적용 스타일
  font-size: 30px;
  font-weight: bolder;
`;
export default DocViewer;
