import { type AxiosResponse } from "axios";
import instance from "./request";

interface getScreditRes {
  Scredit: Array<{
    Sno: string;
    Cno: string;
    Pass: '0' | '1';
  }>
}

interface getCourseReq {
  KeyWords: {
    Cno: string;
    Cname: string;
    Credit: string;
    Ctno: string;
    Tname: string;
    Ctime: string;
  }
}

interface getCourseRes {
  Course: Array<{
    Cno: string;
    Cname: string;
    Credit: string;
    Ctno: string;
    Ctime: string;
    Tname: string;
  }>
}

interface getProjectRes {
  Project: Array<
    {
      Pno: string;
      Pname: string;
      Sno: string;
      Sname: string;
      Tno: string;
      Tname: string;
    }
  >,
  ProjMen: Array<
    Array<
      {
        Sno: string;
        Sname: string;
      }
    >
  >
}

interface postProjectReq {
  Info: {
    Pname: string;
    PSno: Array<string>;
    PTno: string;
  }
}

interface postProjectRes {
  flag: '1' | '0';
}

interface getClassRoomReq {
  KeyWords: {
    CRno: string;
    Cno: string;
    Ctno: string;
    CRtime: string;
  }
}

interface getClassRoomRes {
  ClassRoom: Array<{
    CRno: string;
    Cname: string;
    Cno: string;
    Ctno: string;
    CRtime: string;
    Tname: string;
  }>
}

interface getMeetingRoomReq {
  KeyWords: {
    MRno: string;
    MRtime: string;
  }
}

interface getMeetingRoomRes {
  MeetingRoom: Array<{
    MRno: string;
    MRtime: string;
  }>
}

interface postMeetingRoomReq {
  Info: {
    MRno: string;
    MRtime: string;
    Sno: string;
  }
}

interface postMeetingRoomRes {
  flag: '1' | '0';
}

const StudentServiceApi = {
  getScredit: async (Uno: string) =>
    await instance.get<any, AxiosResponse<Partial<getScreditRes>>>(
      "/Scredit_Inquire",
      {
        params: {
          Uno: Uno,
        },
      }
    ),
  getCourse: async (data: Partial<getCourseReq>) =>
    await instance.post<getCourseReq, AxiosResponse<Partial<getCourseRes>>>(
      "/Course_Inquire",
      data
    ),
  getProject: async (Sno: string) =>
    await instance.get<any, AxiosResponse<Partial<getProjectRes>>>(
      "/Project_Inquire",
      {
        params: {
          Sno: Sno,
        },
      }
    ),
  postProject: async (data: Partial<postProjectReq>) =>
    await instance.post<postProjectReq, AxiosResponse<Partial<postProjectRes>>>(
      "/Project_Insert",
      data
    ),
  getClassRoom: async (data: Partial<getClassRoomReq>) =>
    await instance.post<getClassRoomReq, AxiosResponse<Partial<getClassRoomRes>>>(
      "/ClassRoom_Inquire",
      data
    ),
  getMeetingRoom: async (data: Partial<getMeetingRoomReq>) =>
    await instance.post<getMeetingRoomReq, AxiosResponse<Partial<getMeetingRoomRes>>>(
      "/MeetingRoom_Inquire",
      data
    ),
  postMeetingRoom: async (data: Partial<postMeetingRoomReq>) =>
    await instance.post<postMeetingRoomReq, AxiosResponse<Partial<postMeetingRoomRes>>>(
      "/MeetingRoomS_Inser_S",
      data
    ),
};

const TeacherServiceApi = {};

const AdminServiceApi = {};

const API = {
  StudentServiceApi,
  TeacherServiceApi,
  AdminServiceApi,
};

export default API;
