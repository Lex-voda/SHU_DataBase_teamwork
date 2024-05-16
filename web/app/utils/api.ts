import { type AxiosResponse } from "axios";
import instance from "./request";

interface getScreditReq {
  Keywords: {
    Sno: string;
  }
}

interface getTcreditReq {
  Keywords: {
    Tno: string;
  }
}

interface getScreditRes {
  Scredit: Array<{
    Cname: string;
    Cno: string;
    Credit: string;
  }>
}

interface getTcreditRes {
  Tcredit: Array<{
    Cname: string;
    Cno: string;
    Credit: string;
  }>
}

interface getCourseReq {
  Keywords: {
    Cno: string;
    Cname: string;
    Credit: string;
    Ctno: string;
    Tname: string;
    CRtime: string;
  }
}

interface getCourseRes {
  Course: Array<{
    Cno: string;
    Cname: string;
    Credit: string;
    Ctno: string;
    CRtime: string;
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
  flag: 'True' | 'False';
}

interface getClassRoomReq {
  Keywords: {
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
  Keywords: {
    MRno: string;
  }
}

interface getMeetingRoomRes {
  MeetingRoom: Array<{
    MRno: string;
    MRtime: Array<string>;
    Uno: Array<string>;
  }>
}

interface postMeetingRoomReq {
  Info: {
    MRno: string;
    MRtime: Array<string>;
    Uno: Array<string>;
  }
}

interface postMeetingRoomRes {
  flag: 'True' | 'False';
}

interface getMyMeetingRoomReq {
  Keywords: {
    Uno: string;
  }
}

interface getMyMeetingRoomRes {
  MeetingRoom: Array<{
    MRno: string;
    MRtime: Array<string>;
    Uno: Array<string>;
  }>
}

interface cancelMeetingRoomReq {
  Key: {
    MRno: string;
    Uno: string;
  }
}

interface cancelMeetingRoomRes {
  flag: 'True' | 'False';
}

const StudentServiceApi = {
  getScredit: async (Sno: string) =>
    await instance.post<getScreditReq, AxiosResponse<Partial<getScreditRes>>>(
      "/Scredit_Inquire",
      {
        Keywords: {
          Sno: Sno,
        },
      }
    ),
  getCourse: async (data: Partial<getCourseReq>) =>
    await instance.post<getCourseReq, AxiosResponse<Partial<getCourseRes>>>(
      "/Course_Inquire",
      data
    ),
  getProject: async (Sno: string) =>
    await instance.post<getScreditReq, AxiosResponse<Partial<getProjectRes>>>(
      "/Project_Inquire_S",
      {
        Keywords: {
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
      "/MeetingRoomS_Insert_S",
      data
    ),
  getMyMeetingRoom: async (data: Partial<getMyMeetingRoomReq>) =>
    await instance.post<getMyMeetingRoomReq, AxiosResponse<Partial<getMyMeetingRoomRes>>>(
      "/My_MeetingRoom_Inquire",
      data
    ),
  cancelMeetingRoom: async (data: Partial<cancelMeetingRoomReq>) =>
    await instance.post<cancelMeetingRoomReq, AxiosResponse<Partial<cancelMeetingRoomRes>>>(
      "/My_MeetingRoom_Delete_S",
      data
    ),
};

const TeacherServiceApi = {
  getTcredit: async (Tno: string) =>
    await instance.post<getTcreditReq, AxiosResponse<Partial<getTcreditRes>>>(
      "/Tcredit_Inquire",
      {
        Keywords: {
          Tno: Tno,
        },
      }
    ),
  getProject: async (Tno: string) =>
    await instance.post<getTcreditReq, AxiosResponse<Partial<getProjectRes>>>(
      "/Project_Inquire_T",
      {
        Keywords: {
          Tno: Tno,
        },
      }
    ),
  getMeetingRoom: async (data: Partial<getMeetingRoomReq>) =>
    await instance.post<getMeetingRoomReq, AxiosResponse<Partial<getMeetingRoomRes>>>(
      "/MeetingRoom_Inquire",
      data
    ),
  postMeetingRoom: async (data: Partial<postMeetingRoomReq>) =>
    await instance.post<postMeetingRoomReq, AxiosResponse<Partial<postMeetingRoomRes>>>(
      "/MeetingRoomS_Insert_T",
      data
    ),
  getMyMeetingRoom: async (data: Partial<getMyMeetingRoomReq>) =>
    await instance.post<getMyMeetingRoomReq, AxiosResponse<Partial<getMyMeetingRoomRes>>>(
      "/My_MeetingRoom_Inquire",
      data
    ),
  cancelMeetingRoom: async (data: Partial<cancelMeetingRoomReq>) =>
    await instance.post<cancelMeetingRoomReq, AxiosResponse<Partial<cancelMeetingRoomRes>>>(
      "/My_MeetingRoom_Delete_T",
      data
    ),
};

interface studentInquireReq {
  Keywords: {
    Sno: string,
    Sname: string,
    Grade: string,
    Sgender: string,
    Cono: string,
    Cname: string,
  },
}

interface studentInquireRes {
  Student: Array<{
    Sno: string,
    Sname: string,
    Grade: string,
    Sgender: string,
    Cname: string
  }>
}

interface teacherInquireReq {
  Keywords: {
    Tno: string,
    Tname: string,
    Tlevel: string,
    Tgender: string,
    Cono: string,
    Cname: string,
  },
}

interface teacherInquireRes {
  Teacher: Array<
    {
      Tno: string,
      Tname: string,
      Tlevel: string,
      Tgender: string,
      Cname: string
    }
  >
}

const AdminServiceApi = {
  getStudent: async (data: Partial<studentInquireReq>) =>
    await instance.post<studentInquireReq, AxiosResponse<Partial<studentInquireRes>>>(
      "/Student_Inquire",
      data
    ),
  getTeacher: async (data: Partial<teacherInquireReq>) =>
    await instance.post<teacherInquireReq, AxiosResponse<Partial<teacherInquireRes>>>(
      "/Teacher_Inquire",
      data
    ),
  getMeetingRoom: async (data: Partial<getMeetingRoomReq>) =>
    await instance.post<getMeetingRoomReq, AxiosResponse<Partial<getMeetingRoomRes>>>(
      "/MeetingRoom_Inquire",
      data
    ),
  postMeetingRoom: async (data: Partial<postMeetingRoomReq>) =>
    await instance.post<postMeetingRoomReq, AxiosResponse<Partial<postMeetingRoomRes>>>(
      "/MeetingRoomS_Insert_A",
      data
    ),
  getMyMeetingRoom: async (data: Partial<getMyMeetingRoomReq>) =>
    await instance.post<getMyMeetingRoomReq, AxiosResponse<Partial<getMyMeetingRoomRes>>>(
      "/My_MeetingRoom_Inquire",
      data
    ),
  cancelMeetingRoom: async (data: Partial<cancelMeetingRoomReq>) =>
    await instance.post<cancelMeetingRoomReq, AxiosResponse<Partial<cancelMeetingRoomRes>>>(
      "/My_MeetingRoom_Delete_A",
      data
    ),
};

const API = {
  StudentServiceApi,
  TeacherServiceApi,
  AdminServiceApi,
};

export default API;
