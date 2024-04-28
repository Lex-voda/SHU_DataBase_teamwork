import { success, error } from "@/app/utils/message";
import API from "@/app/utils/api";

const columns = [
  { name: "ID", iid: "reviewerId" },
  { name: "NAME", iid: "username" },
  { name: "ACTIONS", iid: "actions" },
];

let users: Array<{ reviewerId: number; username: string }> = [];

if (process.env.NEXT_PUBLIC_TEST === "test") {
  users = [
    {
      reviewerId: 0,
      username: "nich",
    },
    {
      reviewerId: 1,
      username: "nich",
    },
    {
      reviewerId: 2,
      username: "nich",
    },
    {
      reviewerId: 3,
      username: "nich",
    },
    {
      reviewerId: 4,
      username: "nich",
    },
    {
      reviewerId: 5,
      username: "nich",
    },
  ];
} else {
  try {
    API.AuthyServiceApi.getReviewerList()
      .then((res) => {
        if (res.status === 200) {
          if (res.data.status === 200) {
            if (res.data.reviewerList) users = res.data.reviewerList;
            if (res.data.freshToken)
              localStorage.setItem("xcAuthorization", res.data.freshToken);
            success("获取审核人员列表成功");
          } else {
            error("获取审核人员列表失败！");
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
        console.log("Get Reviewer List Error: ", err);
        error("Get Reviewer List Error: " + err);
      });
  } catch (err: any) {
    console.log("Get Reviewer List Error: ", err);
    error("Get Reviewer List Error: " + err);
  }
}

export { columns, users };
