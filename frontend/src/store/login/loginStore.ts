import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import http from "../../utils/http-commons";
import type { RootState } from "../store";

interface userLoginState {
  isLoading: boolean;
  token: {
    access_token: string;
    refresh_token: string;
  };
  user: {
    user_id: number;
    username: string;
    nickname: string;
    labeling: string;
    followPrivate: boolean;
    labelCharSrc: string;
    profileImg: string | undefined;

    email: string;
    isAdmin: string;
  };
  auth: boolean;
}

export interface signUpType {
  user_id: string;
  username: string;
  labeling: string;
  email: string;
  password: string;
}

export const fetchSignUpThunk = createAsyncThunk(
  "user/fetchSignUp",
  async (
    { user_id, labeling, password, email, username }: signUpType,
    tunkAPI
  ) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/user/regist`,
      {
        email: email,
        labeling: labeling,
        nickname: username,
        password: password,
        username: user_id,
      }
    );

    return response.data;
  }
);

export const fetchLoginRefreshThunk = createAsyncThunk(
  "user/refreshLogin",
  async () => {
    try {
      const response = await http.get(`/jwt/refresh`);
      return response.data;
    } catch (e: any) {
      console.log(e);
    }
  }
);

export const fetchLoginThunk = createAsyncThunk(
  "user/fetchLogin",
  async (
    { id, password }: { id: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `
        ${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          username: id,
          password,
        }
      );

      const issuedTImeString = `&{new Date().getTime()}`;
      const issuedTime = parseInt(issuedTImeString);

      const token = JSON.stringify({
        accessToken: response.data.tokens.accessToken,
        expireTime: issuedTime + response.data.tokens.expireMilliSec,
        refreshToken: response.data.tokens.refreshToken,
      });
      localStorage.setItem("token", token);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const initialState: userLoginState = {
  isLoading: false,
  token: {
    access_token: "",
    refresh_token: "",
  },
  user: {
    user_id: 0,
    username: "",
    nickname: "",
    labeling: "",
    email: "",
    isAdmin: "",
    followPrivate: false,
    labelCharSrc: "",
    profileImg: "",
  },
  auth: false,
};

export const LoginSlice = createSlice({
  name: "LoginStore",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        user_id: 0,
        username: "",
        nickname: "",
        labeling: "",
        email: "",
        isAdmin: "",
        followPrivate: false,
        labelCharSrc: "",
        profileImg: "",
      };
      state.auth = false;
      localStorage.removeItem("token");
    },
    snsLogin: (state, action) => {
      state.token = {
        ...state.token,
        access_token: action.payload.accessToken,
        refresh_token: action.payload.refreshToken,
      };
      state.auth = true;
      state.user = {
        ...state.user,
        user_id: action.payload.user_id,
        username: action.payload.username,
        nickname: action.payload.nickname,
        labeling: action.payload.labeling,
        isAdmin: action.payload.isAdmin,
        email: action.payload.email,
      };
      const token = JSON.stringify({
        accessToken: action.payload.accessToken,
        expireTime: action.payload.expireTime,
        refreshToken: action.payload.refreshToken,
      });
      localStorage.setItem("token", token);
    },
    userModify: (state, action) => {
      state.user = {
        ...state.user,
        nickname: action.payload.nickname,
        followPrivate: action.payload.followPrivate,
        labeling: action.payload.labeling,
      };
    },
    proFileModify: (state, action) => {
      state.user = {
        ...state.user,
        profileImg: action.payload.profileImg,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginRefreshThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoginRefreshThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auth = true;
      state.token = {
        access_token: action.payload.tokens.accessToken,
        refresh_token: action.payload.tokens.refreshToken,
      };
      state.user = {
        user_id: action.payload.userInfo.userId,
        email: action.payload.userInfo.email,
        labeling: action.payload.userInfo.labeling,
        nickname: action.payload.userInfo.nickname,
        isAdmin: action.payload.userInfo.isAdmin,
        username: action.payload.userInfo.username,
        followPrivate: action.payload.userInfo.followPrivate,
        labelCharSrc: action.payload.userInfo.labelCharSrc,
        profileImg: action.payload.userInfo.profileImg,
      };
    });
    builder.addCase(fetchLoginRefreshThunk.rejected, (state) => {
      state.isLoading = false;
      alert("로그인에 실패하였습니다.");
    });
    builder.addCase(fetchSignUpThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUpThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      alert("회원가입에 성공하였습니다.");
    });
    builder.addCase(fetchSignUpThunk.rejected, (state) => {
      state.isLoading = false;
      alert("회원가입에 실패하였습니다.");
    });
    builder.addCase(fetchLoginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.auth = true;
      state.token = {
        access_token: action.payload.tokens.accessToken,
        refresh_token: action.payload.tokens.refreshToken,
      };
      state.user = {
        user_id: action.payload.user.userId,
        email: action.payload.user.email,
        labeling: action.payload.user.labeling,
        nickname: action.payload.user.nickname,
        isAdmin: action.payload.user.isAdmin,
        username: action.payload.user.username,
        followPrivate: action.payload.user.followPrivate,
        labelCharSrc: action.payload.user.labelCharSrc,
        profileImg: action.payload.user.profileImg,
      };
    });
    builder.addCase(fetchLoginThunk.rejected, (state) => {
      state.isLoading = false;
      alert("로그인에 실패하였습니다.");
    });
  },
});

export const { logout, userModify, proFileModify, snsLogin } =
  LoginSlice.actions;

export const loginState = (state: RootState) => state.userReducer;

export default LoginSlice.reducer;
