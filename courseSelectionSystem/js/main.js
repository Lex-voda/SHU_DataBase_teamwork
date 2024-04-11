
var tested = false;        //测试时设置为true，正式使用时设置为false
var flaskurl = "http://127.0.0.1:5000";
var currentuser;
setInterval(() => {
    currentuser = document.getElementsByClassName("nav-no")[0].innerHTML;
}, 50);
var Authorization;

//处理登录
document.getElementById("login-submit").onclick = function () {

    if (tested) {
        // turnStudent();
        // turnTeacher();
        turnManager();
        return;
    }

    var username = document.getElementById("username").value;
    document.getElementsByClassName("nav-no")[0].innerHTML = username;

    var password = document.getElementById("password").value;
    var data = {
        login_info: {
            username: username,
            password: SHA256(password)
        }
    };
    var dataStr = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${flaskurl}/login/`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dataStr);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            if (res.status == "success") {
                Authorization = res.Authorization;
                document.getElementById("sname").innerHTML = res.user_info.name;
                document.getElementById("sschool").innerHTML = res.user_info.school;
                document.getElementById("sgrade").innerHTML = res.user_info.level;
                document.getElementById("ssex").innerHTML = res.user_info.gender;
                turnStudent();
            } else {
                alert(res.message);
            }
        }
    }
}

//处理跳转不同界面
function turnStudent() {
    document.getElementsByClassName("login-frame")[0].style.display = "none";
    document.getElementsByClassName("menu-student")[0].style.display = "block";
    document.getElementsByClassName("main-frame")[0].style.display = "block";
    document.getElementsByClassName("aside-sinfo")[0].style.display = "block";
}

function turnTeacher() {
    document.getElementsByClassName("login-frame")[0].style.display = "none";
    document.getElementsByClassName("menu-teacher")[0].style.display = "block";
    document.getElementsByClassName("main-frame")[0].style.display = "block";
    document.getElementsByClassName("aside-sinfo")[0].style.display = "block";
}

function turnManager() {
    document.getElementsByClassName("login-frame")[0].style.display = "none";
    document.getElementsByClassName("menu-admin")[0].style.display = "block";
    document.getElementsByClassName("main-frame")[0].style.display = "block";
    document.getElementsByClassName("aside-sinfo")[0].style.display = "block";
}

//处理学生操作
function handleChooseArticleItemShow(i) {
    for (let j = 0; j < 3; j++) {
        document.getElementsByClassName("article-item")[j].style.display = "none";
    }
    document.getElementsByClassName("article-item")[i].style.display = "block";
}

function handleChangeThead(mode, thinnerHTMLs) {
    let elemId;
    if (mode == "enroll") { elemId = "inquiryTableTheadTr"; }
    else if (mode == "drop") { elemId = "dropTableTheadTr"; }
    else if (mode == "schedule") { elemId = "scheduleTableTheadTr"; }
    document.getElementById(elemId).innerHTML = ``;
    for (let i = 0; i < thinnerHTMLs.length; i++) {
        let newth = document.createElement("th");
        newth.innerHTML = thinnerHTMLs[i];
        newth.style.width = `${100 / thinnerHTMLs.length}%`;
        document.getElementById(elemId).appendChild(newth);
    }
}

document.getElementById("student-select").onclick = function () {
    handleChooseArticleItemShow(0);
}
document.getElementById("student-drop").onclick = function () {
    handleChooseArticleItemShow(1);
    handleCurrentCourseQuery();
}
document.getElementById("student-scheduleInquiry").onclick = function () {
    handleChooseArticleItemShow(2);
    handleScheduleQuery(2);
}
document.getElementById("teacher-scheduleInquiry").onclick = function () {
    handleChooseArticleItemShow(2);
    handleScheduleQuery(1);
}
var adminChoose = 0;    //0默认，2查询id为学生，1查询id为老师
document.getElementById("admin-enroll").onclick = function () {
    appendIdSelect();
    handleChooseArticleItemShow(0);
}
document.getElementById("admin-drop").onclick = function () {
    if (adminChoose == 0) { return; }
    handleChooseArticleItemShow(1);
    handleCurrentCourseQuery();
}
document.getElementById("admin-schedule").onclick = function () {
    if (adminChoose == 0) { return; }
    handleChooseArticleItemShow(2);
}

//处理退出
function logoutHandler() {
    window.location.reload();
}

document.getElementsByClassName("nav-logout")[0].onclick = logoutHandler;
document.getElementById("redlogout").onclick = logoutHandler;

//处理点击menu-xxx-title
var menuMasked = false;
function menucontentHandler(user, deltaY) {
    if (!menuMasked) {
        document.getElementsByClassName("menu-mask")[user].style.transform = `translateY(-${deltaY}vh)`;
        menuMasked = true;
    } else {
        document.getElementsByClassName("menu-mask")[user].style.transform = `translateY(0)`;
        menuMasked = false;
    }
}
document.getElementById("menu-student-title").onclick = function () { menucontentHandler(0, 10.5) };
document.getElementById("menu-teacher-title").onclick = function () { menucontentHandler(1, 3.5) };
document.getElementById("menu-admin-title").onclick = function () { menucontentHandler(2, 10.5) };


//处理选课课程查询
function handleCourseQuery() {
    var courseNo = document.getElementById("courseNo").value;
    var courseName = document.getElementById("courseName").value;
    var teacherNo = document.getElementById("teacherNo").value;
    var teacherName = document.getElementById("teacherName").value;
    var courseTime = document.getElementById("courseTime").value;
    var courseCredit = document.getElementById("courseCredit").value;
    var data;
    if (adminChoose == 0 || adminChoose == 2) {
        data = {
            course_info: {
                kch: courseNo,
                kcm: courseName,
                xf: courseCredit,
                jsh: teacherNo,
                jsxm: teacherName,
                sksj: courseTime
            },
            action: "get_schedule"
        };
    }
    else if (adminChoose == 1) {
        data = {
            course_info: {
                kch: courseNo,
                kcm: courseName,
                xf: courseCredit
            },
            action: "get_schedule"
        };
    }
    var dataStr = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    if (tested) { xhr.open("get", "test.json"); }
    else { xhr.open("POST", `${flaskurl}/get_schedule/`, true); }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", Authorization);
    if (tested) { xhr.send(null); }
    else { xhr.send(dataStr); }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            if (res.status == "success") {
                var courseInfo = res.course_info;
                let theadarray = [];
                if (adminChoose == 0) {
                    theadarray = ["课程号", "课程名", "学分", "教师号", "教师姓名", "上课时间", "操作"];
                }
                else if (adminChoose == 1) {
                    theadarray = ["课程号", "课程名", "学分", "最大人数", "操作"];
                }
                else if (adminChoose == 2) {
                    theadarray = ["课程号", "课程名", "学分", "教师号", "教师姓名", "上课时间", "最大人数", "操作"];
                }
                showEnrollInquiry(courseInfo, theadarray);
            } else {
                alert(res.message);
            }
        }
    }
}
document.getElementById("courseInquiry").onclick = handleCourseQuery;


//处理退课当前课程查询
function handleCurrentCourseQuery() {
    var data;
    if (adminChoose == 0) {
        data = {
            action: "get_schedule",
        };
    }
    else if (adminChoose == 1 || adminChoose == 2) {
        data = {
            action: "get_schedule",
            user_info: {
                id: userid
            }
        }
    }
    var dataStr = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    if (tested) { xhr.open("get", "test.json"); }
    else { xhr.open("POST", `${flaskurl}/get_schedule/`, true); }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", Authorization);
    if (tested) { xhr.send(null); }
    else { xhr.send(dataStr); }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            if (res.status == "success") {
                var courseInfo = res.course_info;
                let theadarray = [];
                if (adminChoose == 0) {
                    theadarray = ["课程号", "课程名", "学分", "教师号", "教师姓名", "上课时间", "最大人数", "操作"];
                }
                else if (adminChoose == 1) {
                    theadarray = ["课程号", "课程名", "学分", "选课人数", "最大人数", "操作"];
                }
                else if (adminChoose == 2) {
                    theadarray = ["课程号", "课程名", "学分", "教师号", "教师姓名", "上课时间", "最大人数", "操作"];
                }
                showDropInquiry(courseInfo, theadarray);
            }
            else {
                alert(res.message);
            }
        }
    }
}

//处理课程变动
function handleSelectCourse(kch, jshorsksj, action, sksj = null) {
    var data;
    if (adminChoose == 0) {
        data = {
            course_info: {
                kch: kch,
                jsh: jshorsksj
            },
            action: action
        };
    }
    else if (adminChoose == 1 || adminChoose == 2) {
        if (action == "enroll") {
            data = {
                course_info: {
                    kch: kch,
                    jsh: jshorsksj
                },
                user_info: {
                    id: userid
                },
                action: action
            }
        }
        else {
            data = {
                course_info: {
                    kch: kch,
                    jsh: jshorsksj,
                    sksj: sksj
                },
                user_info: {
                    id: userid
                },
                action: action
            }
        }
    }
    var dataStr = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    if (action == "enroll") {
        xhr.open("POST", `${flaskurl}/student_enroll/`, true);
    }
    if (action == "drop") {
        xhr.open("POST", `${flaskurl}/drop_course/`, true);
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", Authorization);
    xhr.send(dataStr);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            if (res.status == "success") {
                if (action == "enroll") {
                    if (adminChoose == 1) {
                        alert("开课成功！")
                    }
                    else {
                        alert("选课成功！");
                    }
                }
                if (action == "drop") {
                    alert("退课成功！");
                }
            } else {
                alert(res.message);
            }
        }
    }
}

//处理课程表查询
var xuhao = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var week = ["一", "二", "三", "四", "五"];
function handleScheduleQuery(quiryType) {
    var data = {
        action: "get_schedule",
        Authorization: Authorization
    };
    var dataStr = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    if (tested) { xhr.open("get", "test.json"); }
    else { xhr.open("POST", `${flaskurl}/get_schedule/`, true); }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", Authorization);
    if (tested) { xhr.send(null); }
    else { xhr.send(dataStr); }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            if (res.status == "success") {
                var courseInfo = res.course_info;
                let theadarray = [];
                if (quiryType == 2) {
                    theadarray = ["序号", "课程号", "课程名", "学分", "教师号", "教师姓名", "上课时间", "最大人数"];
                }
                else if (quiryType == 1) {
                    theadarray = ["序号", "课程号", "课程名", "上课时间", "最大人数"];
                }
                showScheduleInquiry(quiryType, courseInfo, theadarray);
            }
            else {
                alert(res.message);
            }
        }
    }
}

var userid;
//管理员添加学号/工号查询
function appendIdSelect() {
    let newdiv = document.createElement("div");
    let newinput = document.createElement("input");
    let newspan = document.createElement("span");
    let newbutton = document.createElement("button");
    newspan.innerHTML = "学号/工号：";
    newbutton.innerHTML = "查询";
    newinput.style.marginRight = "0.5vw";
    newdiv.appendChild(newspan);
    newdiv.appendChild(newinput);
    newdiv.appendChild(newbutton);
    newdiv.style.position = "absolute";
    newdiv.style.left = "1vw";
    newdiv.style.top = "1vw";
    newdiv.style.padding = "0.3vw";
    newdiv.style.fontSize = "1.2vw";
    document.getElementsByClassName("box-inquiry-title")[0].appendChild(newdiv);
    newbutton.onclick = function () {

        var data = {
            action: "get_info",
            user_info: {
                id: newinput.value
            }
        };
        userid = newinput.value;
        var dataStr = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        if (tested) { xhr.open("get", "test.json"); }
        else { xhr.open("POST", `${flaskurl}/get_info/`, true); }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", Authorization);
        if (tested) { xhr.send(null); }
        else { xhr.send(dataStr); }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var res = JSON.parse(xhr.responseText);
                if (res.status == "success") {
                    if (res.user_info.role == "1") {
                        adminChoose = 1;
                        showScheduleInquiry(3, res.course_info, ["序号", "课程号", "课程名", "学分", "上课时间", "最大人数"]);
                    }
                    if (res.user_info.role == "2") {
                        adminChoose = 2;
                        showScheduleInquiry(4, res.course_info, ["序号", "课程号", "课程名", "学分", "教师号", "教师姓名", "上课时间", "最大人数"]);
                    }
                } else {
                    alert(res.message);
                }
            }
        }
    }
}

//显示选课查询结果
function showEnrollInquiry(courseInfo, thead) {
    document.getElementById("courseInquiryResult").innerHTML = "";
    handleChangeThead("enroll", thead);
    for (let i = 0; i < courseInfo.length; i++) {
        let infoarray = [];
        if (adminChoose == 0) {
            infoarray = [courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].jsh, courseInfo[i].jsxm, courseInfo[i].sksj]
        }
        else if (adminChoose == 1) {
            infoarray = [courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].zdrs]
        }
        else if (adminChoose == 2) {
            infoarray = [courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].jsh, courseInfo[i].jsxm, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        let newtr = document.createElement("tr");
        for (let i = 0; i < infoarray.length + 1; i++) {
            let newth = document.createElement("th");
            if (i == infoarray.length) {
                let newbutton = document.createElement("button");
                if (adminChoose == 1) { newbutton.innerHTML = "开课"; }
                else { newbutton.innerHTML = "选课"; }
                newbutton.onclick = function () {
                    if (adminChoose == 1) { handleSelectCourse(courseInfo[i].kch, courseInfo[i].sksj, "enroll"); }
                    else { handleSelectCourse(courseInfo[i].kch, courseInfo[i].jsh, "enroll"); }
                }
                newth.appendChild(newbutton);
            }
            else {
                newth.innerHTML = infoarray[i];
            }
            newth.style.width = `${100 / infoarray.length}%`;
            newtr.appendChild(newth);
        }
        document.getElementById("courseInquiryResult").appendChild(newtr);
    }
}

//显示退课查询结果
function showDropInquiry(courseInfo, thead) {
    document.getElementById("currentSelectedResult").innerHTML = "";
    handleChangeThead("drop", thead);
    for (let i = 0; i < courseInfo.length; i++) {
        let infoarray = [];
        if (adminChoose == 0) {
            infoarray = [courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].jsh, courseInfo[i].jsxm, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        else if (adminChoose == 1) {
            infoarray = [courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        else if (adminChoose == 2) {
            infoarray = [courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].jsh, courseInfo[i].jsxm, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        let newtr = document.createElement("tr");
        for (let i = 0; i < infoarray.length + 1; i++) {
            let newth = document.createElement("th");
            if (i == infoarray.length) {
                let newbutton = document.createElement("button");
                if (adminChoose == 1) { newbutton.innerHTML = "关课"; }
                else { newbutton.innerHTML = "退课"; }
                newbutton.onclick = function () {
                    if (adminChoose == 1) { handleSelectCourse(courseInfo[i].kch, courseInfo[i].jsh, "drop", courseInfo[i].sksj); }
                    else { handleSelectCourse(courseInfo[i].kch, courseInfo[i].jsh, "drop"); }
                }
                newth.appendChild(newbutton);
            }
            else {
                newth.innerHTML = infoarray[i];
            }
            newth.style.width = `${100 / infoarray.length}%`;
            newtr.appendChild(newth);
        }
        document.getElementById("currentSelectedResult").appendChild(newtr);
    }
}

//管理员显示课表
function showScheduleInquiry(quiryType, courseInfo, thead) {
    document.getElementById("currentSelectedResult2").innerHTML = "";
    handleChangeThead("schedule", thead);
    for (let i = 0; i < courseInfo.length; i++) {
        let infoarray = [];
        if (quiryType == 1) {
            infoarray = [xuhao[i], courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        else if (quiryType == 2) {
            infoarray = [xuhao[i], courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].jsh, courseInfo[i].jsxm, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        else if (quiryType == 3) {
            infoarray = [xuhao[i], courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        else if (quiryType == 4) {
            infoarray = [xuhao[i], courseInfo[i].kch, courseInfo[i].kcm, courseInfo[i].xf, courseInfo[i].jsh, courseInfo[i].jsxm, courseInfo[i].sksj, courseInfo[i].zdrs]
        }
        let newtr = document.createElement("tr");
        for (let i = 0; i < infoarray.length; i++) {
            let newth = document.createElement("th");
            newth.innerHTML = infoarray[i];
            newth.style.width = `${100 / infoarray.length}%`;
            newtr.appendChild(newth);
        }
        for (let j = 0; j < 5; j++) {
            if (courseInfo[i].sksj[0] == week[j]) {
                let str = courseInfo[i].sksj.slice(1);
                let pos = str.indexOf("-");
                let start = Number(str.slice(0, pos));
                let end = Number(str.slice(pos + 1));
                let leg = end - start + 1;
                for (let k = 0; k < leg; k++) {
                    document.getElementsByClassName("schedule-item")[j + (start - 1 + k) * 5].innerHTML = xuhao[i];
                }
            }
        }
        document.getElementById("currentSelectedResult2").appendChild(newtr);
    }
}




/**

 *

 * Secure Hash Algorithm (SHA256)

 * http://www.webtoolkit.info/

 *

 * Original code by Angel Marin, Paul Johnston.

 *

 **/

function SHA256(s) {

    var chrsz = 8;

    var hexcase = 0;

    function safe_add(x, y) {

        var lsw = (x & 0xFFFF) + (y & 0xFFFF);

        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);

        return (msw << 16) | (lsw & 0xFFFF);

    }

    function S(X, n) { return (X >>> n) | (X << (32 - n)); }

    function R(X, n) { return (X >>> n); }

    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }

    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }

    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }

    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }

    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }

    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256(m, l) {

        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);

        var a, b, c, d, e, f, g, h, i, j;

        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);

        m[((l + 64 >> 9) << 4) + 15] = l;

        for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];

            b = HASH[1];

            c = HASH[2];

            d = HASH[3];

            e = HASH[4];

            f = HASH[5];

            g = HASH[6];

            h = HASH[7];

            for (var j = 0; j < 64; j++) {

                if (j < 16) W[j] = m[j + i];

                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);

                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;

                g = f;

                f = e;

                e = safe_add(d, T1);

                d = c;

                c = b;

                b = a;

                a = safe_add(T1, T2);

            }

            HASH[0] = safe_add(a, HASH[0]);

            HASH[1] = safe_add(b, HASH[1]);

            HASH[2] = safe_add(c, HASH[2]);

            HASH[3] = safe_add(d, HASH[3]);

            HASH[4] = safe_add(e, HASH[4]);

            HASH[5] = safe_add(f, HASH[5]);

            HASH[6] = safe_add(g, HASH[6]);

            HASH[7] = safe_add(h, HASH[7]);

        }

        return HASH;

    }

    function str2binb(str) {

        var bin = Array();

        var mask = (1 << chrsz) - 1;

        for (var i = 0; i < str.length * chrsz; i += chrsz) {

            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);

        }

        return bin;

    }

    function Utf8Encode(string) {

        string = string.replace(/\r\n/g, "\n");

        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {

                utftext += String.fromCharCode(c);

            }

            else if ((c > 127) && (c < 2048)) {

                utftext += String.fromCharCode((c >> 6) | 192);

                utftext += String.fromCharCode((c & 63) | 128);

            }

            else {

                utftext += String.fromCharCode((c >> 12) | 224);

                utftext += String.fromCharCode(((c >> 6) & 63) | 128);

                utftext += String.fromCharCode((c & 63) | 128);

            }

        }

        return utftext;

    }

    function binb2hex(binarray) {

        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";

        var str = "";

        for (var i = 0; i < binarray.length * 4; i++) {

            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +

                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);

        }

        return str;

    }

    s = Utf8Encode(s);

    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));

}
