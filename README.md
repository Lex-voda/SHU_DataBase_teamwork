# SHU_DataBase_teamwork
2023春季数据库2课程作业代码仓库

#### 杂项写前面

日志文件名格式：与请求头同时创建，请求头不变，文件名不变

```
YYYY/MM/DD_hhmmss_xxxx.log    e.g:2024/04/24_132355_abcd.log (xxxx是请求头的最后四位)
```

#### 文档日志写前面

```
2024/4/16：数据库；界面与功能-登录界面
2024/4/24：界面与功能-初始界面；界面与功能-学生端功能界面
```



## 项目设计

基于 flask 和 next.js 开发的 python+Web 项目

### 数据库

| 表          | 属性集                          | 描述           |
| ----------- | ------------------------------- | -------------- |
| College     | {Cono,Cname}                    | 学院信息       |
| Admin       | {Ano,Akey}                      | 管理员信息     |
| Teacher     | {Tno,Tkey,Tname}                | 教师信息       |
| Student     | {Sno,Skey,Sname,Grade}          | 学生信息       |
| Course      | {Cno,Cname,Credit,Ctno,Tname}   | 课程信息       |
| Scredit     | {Sno,Cno,Pass}                  | 学分完成情况   |
| Tcredit     | {Tno,Cno}                       | 教分完成情况   |
| Project     | {Pno,Pname,Puno,Psname,Pstatus} | 项目情况       |
| ClassRoom   | {CRno,Cno,Ctno,CRtime}          | 教室安排信息   |
| MeetingRoom | {MRno,Uno,MRtime}               | 会议室预约情况 |

备注：

- `uno` 代表此属性可能是 `sno` 或 `tno`
- 课程表中的 `Ctno` 是相对教师号，格式`1001`
- 项目表中的 `Pstatus` ：0-队员，1-队长，2-指导老师
- 课程表中没有上课地点和时间的信息，结合教室表才是完整的课程表，`CRtime`和`MRtime`的格式是`四1-2`
- 所有属性都是字符串

### 界面与功能

#### 登录界面

##### 登录

前端：

- 输入账号、密码
- 传输账号、密码（哈希后）

后端：

- 核对账号密码，识别正确性
- 将用户编号+密码+登录时间拼接后做哈希，得到请求头
- 记录日志
- 返回正确性标志和用户身份

数据库只储存哈希后的密码

日志：

```
--Login--Uno:{Uno},Key:{SHA256(Key)},statue:{statue},RequestHeader:{RequestHeader}
```

通信字典：

```json
{ 
 "Uno":"" ->str,
 "Key":"" ->str,
 "statue":"" ->str:{"A"|"T"|"S"},
 "flag": ->bool,
 "RequestHeader":""->str:[SHA256(Uno+Key+Time)]
}
```

#### 初始界面

前端：初始界面显示个人信息

功能选择，根据控件进行页面切换

- 学生端：【学分完成情况|课程信息查询|项目申报与查询|教室使用查询|会议室预约】
- 教师端：【教分完成情况|课程信息查询|项目查询|教室使用查询|会议室预约】
- 管理员端：【学生管理|教师管理|课程管理|项目管理|教室管理|会议室管理】

#### 学生端功能界面

##### 学分完成情况

前端：

- 进入本页面后自动：传输 `Uno` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Uno` 返回 `Scredit` 表项中的信息
- 日志记录

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Scredit",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":"" ->str(Uno),
 "RequestHeader":"" ->str,
 "Scredit":[] ->list(dic(Scredit))
}
```

##### 课程信息查询

前端：

- 传输 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 和 `RequestHeader` 进行查询（注：查询条目是任意项可选的，允许多条目以且逻辑查询）
- 得到信息后展示表项

后端：

- 根据 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 返回 `Course` 表项中的信息
- 日志记录

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Course",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":"" ->str,
 "RequestHeader":"" ->str,
 "Course":[] ->list(dic(Course))
}
```

##### 项目申报与查询

前端：

- 进入本页面后自动：传输 `Sno` 和 `RequestHeader` 进行查询
- 得到信息后展示表项
- 申报界面：
  - 输入：项目名称，项目队员的名字、学号，指导老师的名字、工号
  - 自动将当前用户设为队长
  - 传输

后端：

- 查询：

  - 根据 `Sno` 返回 `Project` 表项中的信息

  - 日志记录

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Project",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":"" ->str,
 "RequestHeader":"" ->str,
 "Project":[] ->list(dic(Project))
}
```

- 申报
  - 根据 `Info` 对 `Project`  表进行注入
  - 日志记录

日志：

```
--Insert--RequestHeader:{},Table:"Project",Info:{Info}
```

通信字典：

```json 
{
 "Info":{
 		"Pname":"", ->str
 		"Pmember":[
 					{"name":"", ->str
 					 "no":"", ->str
 					 "status":"", ->str{"0"|"1"|"2"}
 					}
 				  ]	->list(dic)
 		}, ->dic
 "RequestHeader":"" ->str,
 "flag":"" ->str{"0"|"1"}
}
```

##### 教室使用查询

前端：

- 传输 `CRno|CRtime|Cno|Ctno` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `CRno|CRtime|Cno|Ctno` 返回 `ClassRoom` 表项中的信息

- 日志记录

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"ClassRoom",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":"" ->str,
 "RequestHeader":"" ->str,
 "ClassRoom":[] ->list(dic(ClassRoom))
}
```

##### 会议室预约

前端：

- 信息展示与查询

  - 进入本页面后自动：传输 ` 空查询` 和 `RequestHeader` 进行查询

  - 得到信息后展示表项

- 预约

  - 输入`MRtime`进行预约，使用控件选择 `MRno` ，自动传输 `Uno`
  - 显示预约成功或失败信息

后端：

- 信息展示与查询

  - 根据 `MRno|MRtime|Uno` 返回 `MeetingRoom` 表项中的信息


  - 日志记录

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"MeetingRoom",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":"" ->str,
 "RequestHeader":"" ->str,
 "MeetingRoom":[] ->list(dic(MeetingRoom))
}
```

- 预约
  - 根据 `MRno+MRtime+Uno` 对 `MeetingRoom` 表进行注入，同时判断合法性
  - 日志记录

日志：

```
--Insert--RequestHeader:{RequestHeader},Table:"MeetingRoom",Info:{Info}
```

通信字典：

```json
{
 "Info":{
     	"MRno":"", ->str
        "MRtime":"", ->str
        "Uno":"" ->str
 		} ->dic,
 "RequestHeader":"", ->str
 "flag":"" ->str{"0"|"1"}
}
```





