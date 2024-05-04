import { success, error } from "@/app/utils/message";
import API from "@/app/utils/api";

const columns = [
  { name: "ID", iid: "noteId" },
  { name: "AUTHOR", iid: "authorNickname" },
  { name: "NOTE", iid: "title" },
  { name: "UPLOAD TIME", iid: "uploadTime" },
  { name: "STATUS", iid: "status" },
  { name: "ACTIONS", iid: "actions" },
];

const statusOptions = [
  { name: "已通过", iid: "approved" },
  { name: "未通过", iid: "disapproved" },
  { name: "待审核", iid: "waiting" },
];

let notes: Array<{
  noteId: number;
  title: string;
  coverImg: string;
  authorNickname: string;
  authorAvatar: string;
  status: "waiting" | "approved" | "disapproved" | "delete";
  uploadTime: string; //TODO:questioned
}> = [];

if (process.env.NEXT_PUBLIC_TEST === "test") {
  notes = [
    {
      noteId: 0,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 1,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 2,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 3,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "disapproved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 4,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 5,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "disapproved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 6,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 7,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 8,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 9,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 10,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 11,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 12,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 13,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 14,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "disapproved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 15,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 16,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 17,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 18,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "disapproved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 19,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 20,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 21,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "approved",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 22,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "waiting",
      uploadTime: "2024-02-02",
    },
    {
      noteId: 23,
      title: "title",
      coverImg: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      authorNickname: "Nicholas",
      authorAvatar: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      status: "disapproved",
      uploadTime: "2024-02-02",
    },
  ];
} else {
  try {
    API.CheckServiceApi.getNoteList()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.status === 200) {
            if (res.data.noteList) notes = res.data.noteList;
            if (res.data.freshToken)
              localStorage.setItem("xcAuthorization", res.data.freshToken);
            success("获取游记列表成功");
          } else {
            error("获取游记列表失败！");
            if (res.data.status === 401) {
              console.log(res.data?.msg);
              if (res.data?.msg === 'Authentication expires.') {
                error("登录已过期，请重新登录！");
                if (process.env.NEXT_PUBLIC_TEST !== "test") {
                  localStorage.removeItem("xcuserInfo");
                  localStorage.removeItem("xcAuthorization");
                }
                window.location.href = "/login";
              }
            }
          }
        }
      })
      .catch((err: any) => {
        console.log("Get Note List Error: ", err);
        error("Get Note List Error: " + err);
      });
  } catch (err: any) {
    console.log("Get Note List Error: ", err);
    error("Get Note List Error: " + err);
  }
}

export { columns, notes, statusOptions };
