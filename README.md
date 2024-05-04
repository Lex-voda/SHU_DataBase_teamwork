# SHU_DataBase_teamwork
2023春季数据库2课程作业代码仓库

#### 杂项写前面

日志文件名格式：与请求头同时创建，请求头不变，文件名不变

```
YYYY/MM/DD_hhmmss_xxxx.log    e.g:2024/04/24_132355_abcd.log (xxxx是请求头的最后四位)
```

后文在表之间使用 `|` 表示自然连接 $\Join$​

==文档修改可能发生在任何地方，请借助git工具查看修改处或仔细阅读！==

#### 文档日志写前面

```
2024/4/16：数据库；界面与功能-登录界面
2024/4/24：界面与功能-初始界面；界面与功能-学生端功能界面
2024/5/4： 更新了数据库设计，完善了外键不是主键的问题
		   更新了查询的通信字典
		   修改了请求头的存储位置为Header属性
		   完成了界面与功能部分的全部文档
```



## 项目设计

基于 flask 和 next.js 开发的 python+Web 项目

### 数据库

#### 表

| 表          | 属性集                               | 描述           |
| ----------- | ------------------------------------ | -------------- |
| College     | {Cono,Cname}                         | 学院信息       |
| Admin       | {Ano,Akey}                           | 管理员信息     |
| Teacher     | {Tno,Tkey,Tname,Tlevel,Tgender,Cono} | 教师信息       |
| Student     | {Sno,Skey,Sname,Grade,Sgender,Cono}  | 学生信息       |
| Course      | {Cno,Cname,Credit,Ctno,Tno}          | 课程信息       |
| Scredit     | {Sno,Cno,Pass}                       | 学分完成情况   |
| Tcredit     | {Tno,Cno}                            | 教分完成情况   |
| Project     | {Pno,Pname,Puno,Pstatus}             | 项目情况       |
| ClassRoom   | {CRno,Cno,Ctno,CRtime}               | 教室安排信息   |
| MeetingRoom | {MRno,Uno,MRtime}                    | 会议室预约情况 |

备注：

- `uno` 代表此属性可能是 `sno` 或 `tno`
- 教师表中的 `Tlevel` 是职称：`{讲师|副教授|教授}`
- 课程表中的 `Ctno` 是相对教师号，格式`1001`
- 项目表中的 `Pstatus` ：0-队员，1-队长，2-指导老师
- 课程表中没有上课地点和时间的信息，结合教室表才是完整的课程表，`CRtime`和`MRtime`的格式是`四1-2`
- 教室号`CRno`的格式是`{A-H}+{1-5}+{0-3}+{1-9}`
- 会议室号`MRno`的格式是`{M}+{1-5}+{0-3}+{1-9}`
- 所有属性都是字符串

#### 触发器



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

函数路由：`Login`

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

函数路由：`Scredict_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Scredit",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Uno":"" ->str
 			} ->dict,
 "Scredit":[] ->list(dict(Scredit))
}
```

##### 课程信息查询

前端：

- 传输 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 和 `RequestHeader` 进行查询（注：查询条目是任意项可选的，允许多条目以且逻辑查询）
- 得到信息后展示表项

后端：

- 根据 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 返回 `Course|Teacher` 表项中的信息
- 日志记录

函数路由：`Course_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Course|Teacher",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Cno":"" ->str,
     		"Cname":"" ->str,
     		"Credit":"" ->str,
     		"Ctno":"" ->str,
     		"Tname":"" ->str,
     		"Ctime":"" ->str
 			} ->dict,
 "Course":[] ->list(dict(Course|Teacher))
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

函数路由：`Project_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Project",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Sno":"" ->str
 			} ->dict,
 "Project":[] ->list(dict(Project))
}
```

- 申报
  - 根据 `Info` 对 `Project`  表进行注入
  - 日志记录

函数路由：`Project_Insert`

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
 					{"no":"", ->str
 					 "status":"", ->str{"0"|"1"|"2"}
 					}
 				  ]	->list(dict)
 		}, ->dict
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

函数路由：`ClassRoom_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"ClassRoom",Keywords:{Keywords}
```

通信字典：

```json
{
  "Keywords":{
     		"CRno":"" ->str,
     		"CRtime":"" ->str,
     		"Cno":"" ->str,
     		"Ctno":"" ->str,
 			} ->dict,
 "ClassRoom":[] ->list(dict(ClassRoom))
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
  - 注：预约以一课时为单位

后端：

- 信息展示与查询

  - 根据 `MRno|MRtime|Uno` 返回 `MeetingRoom` 表项中的信息


  - 日志记录

函数路由：`MeetingRoom_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"MeetingRoom",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"MRno":"" ->str,
     		"MRtime":"" ->str,
     		"Uno":"" ->str
 			} ->dict,
 "MeetingRoom":[] ->list(dict(MeetingRoom))
}
```

- 预约
  - 根据 `MRno+MRtime+Uno` 对 `MeetingRoom` 表进行注入，同时判断合法性
  - 日志记录

函数路由：`MeetingRoom_Insert`

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
 		} ->dict,
 "RequestHeader":"", ->str
 "flag":"" ->str{"0"|"1"}
}
```

#### 教师端功能界面

##### 教分完成情况

前端：

- 进入本页面后自动：传输 `Uno` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Uno` 返回 `Tcredit` 表项中的信息
- 日志记录

函数路由：`Tcredict_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Tcredit",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Uno":"" ->str
 			} ->dict,
 "Scredit":[] ->list(dict(Scredit))
}
```

##### 课程信息查询

前端：

- 传输 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 和 `RequestHeader` 进行查询（注：查询条目是任意项可选的，允许多条目以且逻辑查询）
- 得到信息后展示表项

后端：

- 根据 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 返回 `Course|Teacher` 表项中的信息
- 日志记录

函数路由：`Course_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Course|Teacher",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Cno":"" ->str,
     		"Cname":"" ->str,
     		"Credit":"" ->str,
     		"Ctno":"" ->str,
     		"Tname":"" ->str,
     		"Ctime":"" ->str
 			} ->dict,
 "Course":[] ->list(dict(Course))
}
```

##### 项目查询

前端：

- 进入本页面后自动：传输 `Sno` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Sno` 返回 `Project` 表项中的信息

- 日志记录

函数路由：`Project_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Project",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Sno":"" ->str
 			} ->dict,
 "Project":[] ->list(dict(Project))
}
```

##### 教室使用查询

前端：

- 传输 `CRno|CRtime|Cno|Ctno` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `CRno|CRtime|Cno|Ctno` 返回 `ClassRoom` 表项中的信息

- 日志记录

函数路由：`ClassRoom_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"ClassRoom",Keywords:{Keywords}
```

通信字典：

```json
{
  "Keywords":{
     		"CRno":"" ->str,
     		"CRtime":"" ->str,
     		"Cno":"" ->str,
     		"Ctno":"" ->str,
 			} ->dict,
 "ClassRoom":[] ->list(dict(ClassRoom))
}
```

##### 会议室预约

前端：

- 信息展示与查询

  - 进入本页面后自动：传输 ` 空查询` 和 `RequestHeader` 进行查询

  - 得到信息后展示表项

  - 注：预约以一课时为单位

- 预约

  - 输入`MRtime`进行预约，使用控件选择 `MRno` ，自动传输 `Uno`
  - 显示预约成功或失败信息

后端：

- 信息展示与查询

  - 根据 `MRno|MRtime|Uno` 返回 `MeetingRoom` 表项中的信息


  - 日志记录

函数路由：`MeetingRoom_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"MeetingRoom",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"MRno":"" ->str,
     		"MRtime":"" ->str,
     		"Uno":"" ->str
 			} ->dict,
 "MeetingRoom":[] ->list(dict(MeetingRoom))
}
```

- 预约
  - 根据 `MRno+MRtime+Uno` 对 `MeetingRoom` 表进行注入，同时判断合法性
  - 日志记录

函数路由：`MeetingRoom_Insert`

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
 		} ->dict,
 "flag":"" ->str{"0"|"1"}
}
```

#### 管理员端功能界面

##### 学生信息查询

前端：

- 进入本页面后自动：传输 `Sno|Sname|Grade|Sgender|Cono` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Sno` 返回 `Student|College` 表项中的信息
- 日志记录

函数路由：`Student_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Student|College",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Sno":"" ->str,
     		"Sname":"" ->str,
     		"Grade":"" ->str,
     		"Sgender":"" ->str,
     		"Cono":"" ->str
 			} ->dict,
 "Scredit":[] ->list(dict(Student|College))
}
```

##### 教师信息查询

前端：

- 进入本页面后自动：传输 `Tno|Tname|Tgender|Tlevel|Cono` 和 `RequestHeader` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Sno` 返回 `Teacher|College` 表项中的信息
- 日志记录

函数路由：`Teacher_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"Teacher|College",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Tno":"" ->str,
     		"Tname":"" ->str,
     		"Tlevel":"" ->str,
     		"Tgender":"" ->str,
     		"Cono":"" ->str
 			} ->dict,
 "Scredit":[] ->list(dict(Teacher|College))
}
```

##### 会议室管理

前端：

- 信息展示与查询

  - 进入本页面后自动：传输 ` 空查询` 和 `RequestHeader` 进行查询

  - 得到信息后展示表项

- 管理

  - 使用控件选择 `MRno` 进行预约管理，前端展示已被预约的时间段和空闲时间段；
  - 管理员可以把已经被预约的时间段置空，或禁止某时间段被预约（即以管理员身份进行预约）
  - 显示管理成功或失败信息
  - 注：预约以一课时为单位

后端：

- 信息展示与查询

  - 根据 `MRno|MRtime|Uno` 返回 `MeetingRoom` 表项中的信息


    - 日志记录


函数路由：`MeetingRoom_Inquire`

日志：

```
--Inquire--RequestHeader:{RequestHeader},Table:"MeetingRoom",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"MRno":"" ->str,
     		"MRtime":"" ->str,
     		"Uno":"" ->str
 			} ->dict,
 "MeetingRoom":[] ->list(dict(MeetingRoom))
}
```

- 预约
  - 根据 `MRno+MRtime+Uno` 对 `MeetingRoom` 表进行注入，同时判断合法性
  - 日志记录

函数路由：`MeetingRoom_Insert`

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
 		} ->dict,
 "flag":"" ->str{"0"|"1"}
}
```
