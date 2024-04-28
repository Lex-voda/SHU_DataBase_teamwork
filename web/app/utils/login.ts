import axios from "axios";
import { error, success } from "./message";

async function signInClicked(username: string, password: string) {
  try {
    // console.log(`${process.env.NEXT_PUBLIC_HOST}`);
    let result='failed';
    axios
      .post(`https://47.120.68.102/api/nofresh/moderationPlatform/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (res.data.status === 200) {
            success("登陆成功");
            localStorage.setItem(
              "xcuserInfo",
              JSON.stringify({
                username: username,
                permission: res.data.permission,
                userId: res.data.reviewerId,
              })
            );
            localStorage.setItem("xcAuthorization", res.data.token);
            result= "success";
          } else {
            error("登录失败！");
            if (res.data.status === 401) {
              console.log(res.data?.msg);
            }
          }
        }
      })
      .catch((err: any) => {
        console.log("signin: ", err);
        error("Signin Error: " + err);
      });
    return result;
  } catch (err: any) {
    console.log("signin: ", err);
    error("Signin Error: " + err);
  }
}

async function logoutClicked() {
  if (process.env.NEXT_PUBLIC_TEST !== "test") {
    localStorage.removeItem("xcuserInfo");
    localStorage.removeItem("xcAuthorization");
  }
  window.location.href = "/";
}

export { logoutClicked, signInClicked };
