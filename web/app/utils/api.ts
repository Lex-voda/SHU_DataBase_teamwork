import { type AxiosResponse } from "axios";
import instance from "./request";

interface commonRes {
  status: number;
  freshToken?: string;
  msg?: string;
}

interface getNoteInfoRes {
  status: number;
  freshToken?: string;
  content?: {
    noteTitle: string;
    noteContent: string;
    authorNickname: string;
    lastModifyTime: string; //TODO:questioned
    location: string;
    status: "waiting" | "approved" | "disapproved" | "delete";
    resources: Array<{ mediaType: "img" | "video"; url: string }>;
  };
  msg?: string;
}

interface approveNoteReq {
  noteId: Array<number>;
  action: "approve" | "disapprove" | "delete" | "restore";
  comment: string;
}

interface getNoteListRes {
  status: number;
  freshToken?: string;
  noteList?: Array<{
    noteId: number;
    title: string;
    coverImg: string;
    authorNickname: string;
    authorAvatar: string;
    status: "waiting" | "approved" | "disapproved" | "delete";
    uploadTime: string; //TODO:questioned
  }>;
  msg?: string;
}

const CheckServiceApi = {
  getNoteInfo: async (noteId: number) =>
    await instance.get<any, AxiosResponse<Partial<getNoteInfoRes>>>(
      "/getNoteInfo",
      {
        params: {
          noteId: noteId,
        },
      }
    ),
  approveNote: async (data: Partial<approveNoteReq>) =>
    await instance.post<approveNoteReq, AxiosResponse<Partial<commonRes>>>(
      "/approveNote",
      data
    ),
  getNoteList: async () =>
    await instance.get<any, AxiosResponse<Partial<getNoteListRes>>>(
      "/getNoteList"
    ),
};

interface getReviewerListRes {
  status: number;
  freshToken?: string;
  reviewerList?: Array<{ reviewerId: number; username: string }>;
  msg?: string;
}

interface registerReviewerReq {
  username: string;
  password: string;
}

interface deleteReviewerReq {
  reviewerId: Array<number>;
}

const AuthyServiceApi = {
  getReviewerList: async () =>
    await instance.get<any, AxiosResponse<Partial<getReviewerListRes>>>(
      "/getReviewerList"
    ),
  registerReviewer: async (data: Partial<registerReviewerReq>) =>
    await instance.post<registerReviewerReq, AxiosResponse<Partial<commonRes>>>(
      "/registerReviewer",
      data
    ),
  deleteReviewer: async (data: Partial<deleteReviewerReq>) =>
    await instance.post<deleteReviewerReq, AxiosResponse<Partial<commonRes>>>(
      "/deleteReviewer",
      data
    ),
};

const API = {
  CheckServiceApi,
  AuthyServiceApi,
};

export default API;
