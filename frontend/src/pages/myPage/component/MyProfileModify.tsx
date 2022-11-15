/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  MyProfileModifyLabelingButton,
  MyProfileModifyLabelingDiv,
  MyProFileModifyLabelingFollowOpenButton,
  MyProfileModifyLabelingFollowOpenWrapper,
  MyProfileModifyLabelingInput,
  MyProfileModifyLabelingInputWrapper,
  MyProFileModifyLabelingModifyButton,
  MyProFileModifyLabelingModifyWrapper,
  MyProfileModifyLabelingNameDiv,
  MyProfileModifyLabelingWrapper,
  MyProfileModifyWrapper,
} from "../styles/MyProfileModify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hoc/useStoreHooks";
import { useFetchUserInfo } from "../../../hoc/useFetch";
import { useNavigate } from "react-router-dom";
import {
  useUploadProfileImg,
  useUserInfoModify,
} from "../../../hoc/useMutation";
import { userModify } from "../../../store/login/loginStore";
import { MyFollowProfileWrapperDiv } from "../styles/MyFollowWrapperStyle";
import http from "../../../utils/http-commons";

const MyProfileModify = () => {
  const userInfo = useAppSelector((store) => store.userReducer.user);
  const [profileImg, setProfileImg] = useState<File>();
  const profileRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError } = useFetchUserInfo(userInfo.user_id);
  const [followOpen, setFollowOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const navigator = useNavigate();
  const { mutate, isLoading: mutateLoading } = useUserInfoModify();
  const { mutate: myProfileUploadMutate } = useUploadProfileImg();
  const dispatch = useAppDispatch();
  console.log(data);
  useEffect(() => {
    if (
      !isLoading &&
      data &&
      data.userInfo.followPrivate !== undefined &&
      data.userInfo.nickname
    ) {
      setFollowOpen(data.userInfo.followPrivate);
      setNickname(data.userInfo.nickname);
    }
  }, [isLoading, data]);

  const profileImgModify = async (e: any) => {
    myProfileUploadMutate({ file: e.target.files[0] });
  };
  const profileImgModifyButton = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (profileRef !== null && profileRef.current) {
      profileRef.current.click();
    }
  };
  if (isLoading) {
    return <div>로딩중?</div>;
  } else if (!isLoading && data) {
    return (
      <MyProfileModifyWrapper>
        {/* 레이블링 */}
        <MyProfileModifyLabelingWrapper>
          <h2>당신의 레이블링</h2>

          <MyProfileModifyLabelingDiv>
            <MyProfileModifyLabelingButton>
              재검사 하러가기
            </MyProfileModifyLabelingButton>
            <MyProfileModifyLabelingNameDiv>
              {data.userInfo.labelName}
            </MyProfileModifyLabelingNameDiv>
          </MyProfileModifyLabelingDiv>
        </MyProfileModifyLabelingWrapper>
        {/* 정보 바꾸기 */}
        <MyProfileModifyLabelingInputWrapper>
          <div onClick={profileImgModifyButton}>
            {data.userInfo.proImgSrc ? (
              <MyFollowProfileWrapperDiv url={data.userInfo.proImgSrc} />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 60 }} />
            )}
          </div>

          <input
            type="File"
            ref={profileRef}
            accept=".png, .jpg"
            name="imgFile"
            onChange={profileImgModify}
            css={css`
              display: none;
            `}
          />

          <MyProfileModifyLabelingInput
            value={data.userInfo.username}
            disabled
          />
          <MyProfileModifyLabelingInput
            value={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNickname((prev) => {
                return e.target.value;
              });
            }}
          />
          <MyProfileModifyLabelingInput value={data.userInfo.email} disabled />
        </MyProfileModifyLabelingInputWrapper>
        {/* 팔로워 팔로잉 공개 여부 */}
        <MyProfileModifyLabelingFollowOpenWrapper>
          <div> 팔로워, 팔로잉 공개여부</div>
          <MyProFileModifyLabelingFollowOpenButton
            onClick={() => {
              setFollowOpen((prev) => {
                return !prev;
              });
            }}
          >
            {followOpen ? "공개" : "비공개"}
          </MyProFileModifyLabelingFollowOpenButton>
        </MyProfileModifyLabelingFollowOpenWrapper>
        {/* 수정 버튼 */}
        <MyProFileModifyLabelingModifyWrapper>
          <MyProFileModifyLabelingModifyButton
            onClick={() => {
              mutate(
                {
                  label: userInfo.labeling,
                  followPrivate: followOpen,
                  nickname,
                },
                {
                  onSuccess: () => {
                    dispatch(
                      userModify({ nickname, labeling: userInfo.labeling })
                    );
                    alert("회?원?정?보?변?경?완?료?");
                  },
                }
              );
            }}
          >
            수정
          </MyProFileModifyLabelingModifyButton>
        </MyProFileModifyLabelingModifyWrapper>
      </MyProfileModifyWrapper>
    );
  } else {
    console.log(isError);
    return (
      <div>
        에러가 발생하였습니다.
        <button
          onClick={() => {
            navigator("/");
          }}
        >
          홈으로 이동
        </button>
      </div>
    );
  }
};

export default MyProfileModify;
