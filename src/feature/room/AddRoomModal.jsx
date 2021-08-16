import React, { useState, useRef } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

import { useDispatch, useSelector } from "react-redux";

//components
import ImgUploader from "../../components/ImgUploader";

// elements
import { Button, Input } from "../../elem/index";

//redux
import { __addRoom, __editRoom } from "../../redux/modules/room";
import { setPreview, uploadImageToS3 } from "../../redux/modules/image";
import ImageModule from "../../components/ImageModule";


const AddRoomModal = ({ roomId, showModal, closeModal }) => {
  const dispatch = useDispatch();
  const [roomImg, setRoomImg] = useState("");
  const [contents, setContents] = useState({
    roomImage: "",
    roomName: "",
    subtitle: "",
    tag: "",
  });
  const [isImage, setIsImage] = useState(false);
  const roomList = useSelector((state) => state.room.room);
  const preview = useSelector((state) => state.image.preview);


  const getImgUrlFromS3 = async(callback, file) => {
    const result = await callback(file);
    console.log(result);
    setContents({roomImage : result})
    setRoomImg(result);
  };

  // const fileInput = useRef();

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setContents({ ...contents, [name]: value });
  };



  const saveFile = () => {
    dispatch(__addRoom(contents, roomImg));
    closeModal();
    setIsImage(false);
  };

  const cancelFile = () => {
    closeModal();
    setIsImage(false);
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={cancelFile}></ModalOverlay>
          <ModalContent>
            <ImageBox>

              <ImageModule 
                getImgUrlFromS3={getImgUrlFromS3}
                name="roomImage"
                
              />
            </ImageBox>
            <InputBox>
              <Input
                name="roomName"
                type="text"
                placeholder="방 이름"
                _onChange={changeHandler}
              />
              <Input
                name="subtitle"
                type="text"
                placeholder="부제목"
                _onChange={changeHandler}
              />
              <Input
                name="tag"
                type="text"
                placeholder="태그"
                _onChange={changeHandler}
              />
            </InputBox>
            <BtnBox>
              <Button shape="green-outline" size="150" _onClick={cancelFile}>
                취소
              </Button>
              <Btn>
                <Button size="150" _onClick={saveFile}>
                  만들기
                </Button>
              </Btn>
            </BtnBox>
          </ModalContent>
        </ModalContainer>
      ) : null}
    </>
  );
};
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const ModalOverlay = styled.div`
  position: absolute;

  display: initial;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  padding-top: 5px;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  text-align: center;
`;

const ImageBox = styled.div`
  margin: 0 auto;
  padding: 46px 0 46px 0;
`;

const InputBox = styled.div`
  margin: 0 auto;
  width: 324px;
`;

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: auto auto 0 auto;
  padding-bottom: 46px;
`;

const Btn = styled.div`
  margin-left: -1px;
`;

export default AddRoomModal;
