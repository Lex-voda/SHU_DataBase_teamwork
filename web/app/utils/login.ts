import axios from "axios";
import { error, success } from "./message";
import sha256 from './sha256.js';

async function signInClicked(uno: string, password: string) {
  try {
    // console.log(sha256(password));
    if (process.env.NEXT_PUBLIC_TEST === "test") {
      return process.env.NEXT_PUBLIC_STATUS;
    }
    let result = 'failed';
    await axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/Login`, {
        Uno: uno,
        Key: sha256(password),
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (res.data.flag == "True") {
            success("登陆成功");
            localStorage.setItem(
              "dbuserInfo",
              JSON.stringify({
                Uno: uno,
                status: res.data.status,
              })
            );
            localStorage.setItem("dbAuthorization", res.data.Authorization);
            result= res.data.status;
          } else {
            error("登录失败！");
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
    localStorage.removeItem("dbuserInfo");
    localStorage.removeItem("dbAuthorization");
  }
  window.location.href = "/";
}

export { logoutClicked, signInClicked };
