# SHU_DataBase_teamwork
2023春季数据库2课程作业代码仓库

#### 杂项写前面

日志文件名格式：与请求头同时创建，请求头不变，文件名不变

```
YYYY/MM/DD_hhmmss_xxxx.log    e.g:2024/04/24_132355_abcd.log (xxxx是请求头的最后四位)
```

后文在表之间使用 `|` 表示外自然连接 $\Join$

本项目默认以`0`代表否，即其标志的事件没有通过

==文档修改可能发生在任何地方，请借助git工具查看修改处或仔细阅读！==

#### 文档日志写前面

```
2024/4/16:	数据库；界面与功能-登录界面
2024/4/24:	界面与功能-初始界面；界面与功能-学生端功能界面
2024/5/4:	更新了数据库设计，完善了外键不是主键的问题
			更新了查询的通信字典
			修改了请求头的存储位置为Header属性
			完成了界面与功能部分的全部文档
2024/5/5:	更新了数据库的表，增加ProjMem维护项目队员名单
 			MeetingRoom表拆解为MeetingRoomS，MeetingRoomT和MeetingRoomA
			修改了对应的通信字典和函数路由
2024/5/6:	修改了项目成员的通信字典，修改了会议室查询函数路由
			修改了数据库格式说明
			增加了格式断言设计（触发器还没想好做什么，数据库有没有自动随机数的命令啊）
2024/5/7:	完善了会议室预约功能作为核心展示项目
			触发器，写好了！
2024/5/9:	更新了教师端
2024/5/10: 	修改了文档中Ctime为CRtime，完成了管理员端
			为了强调一致性，相同的函数只定义一次，删除了重复的函数说明
			为了方便后端代码复用，在大部分重复的函数通信字典中使用Uno作为用户编号
			注意：文档说明中为了区分，使用Sno,Tno和Uno作为说明，但实际使用的关键字以通信字典为准
2024/5/12:	修改了会议室查询的通信字典
2024/5/13:	所有的flag都改为 True/Fasle
			修改了我的预约查询的通信字典
			所有的路由都改为POST
2024/5/14:  修复了会议室字典的一些问题
```



## 项目设计

基于 flask 和 next.js 开发的 python+Web 项目

### 数据库

#### 表

| 表           | 属性集                               | 描述                 |
| ------------ | ------------------------------------ | -------------------- |
| College      | {Cono,Cname}                         | 学院信息             |
| Admin        | {Ano,Akey}                           | 管理员信息           |
| Teacher      | {Tno,Tkey,Tname,Tlevel,Tgender,Cono} | 教师信息             |
| Student      | {Sno,Skey,Sname,Grade,Sgender,Cono}  | 学生信息             |
| Course       | {Cno,Cname,Credit,Ctno,Tno}          | 课程信息             |
| Scredit      | {Sno,Cno,Pass}                       | 学分完成情况         |
| Tcredit      | {Tno,Cno}                            | 教分完成情况         |
| Project      | {Pno,Pname,Sno,Tno}                  | 项目情况             |
| ProjMem      | {Pno,Sno}                            | 项目队员表           |
| ClassRoom    | {CRno,Cno,Ctno,CRtime}               | 教室安排信息         |
| MeetingRoomS | {MRno,Sno,MRtime}                    | 会议室预约学生情况   |
| MeetingRoomT | {MRno,Tno,MRtime}                    | 会议室预约教师情况   |
| MeetingRoomA | {MRno,Ano,MRtime}                    | 会议室预约管理员情况 |

属性格式说明：

- `College`：`Cono` 是2位定长数字编号
- `Admin`：`Ano`是以0开头的8位定长数字编号
- `Teacher`：`Tno`是以1开头的8位定长数字编号，第2、3位对应学院号，第4位对应性别（0男1女）； `Tlevel` 是职称：`{讲师|副教授|教授}`
- `Student`：`Sno`是以2开头的8位定长数字编号，第2、3位对应学院号，第4位对应性别（0男1女）
- `Course`：`Cno`是8位定长数字编号；`Tno`是从`1001`升序的序号
- `Project`：`Pno`是8位定长数字编号，前两位与指导老师的学院号相同，第3、4位对应队长学号的后两位
- `ClassRoom`：`CRno`是4位定长编号，第1位为字母`A-H`代表楼号，第二位不以0开头代表楼层，剩下两位数字为层内编号；`CRtime`格式类似`四1-2`，第二位最大值为`12`，第一位数字不应大于第二位，且最小为`1`
- `MeetingRoomX`：`MRno`是4位定长编号，第1位为字母`M`代表会议室，第二位不以0开头代表楼层，剩下两位数字为层内编号；`MRtime`格式类似`1-2`，代表当天的时间，第二位数最大值为`12`，第一位数字不应大于第二位，且最小为`1`

备注：

- `Project`表中的 `Sno` 是队长的学号
- 项目队员表`ProjMem`记录了队员的学号
- 课程表中没有上课地点和时间的信息，结合教室表才是完整的课程表
- 所有属性都是字符串

#### 触发器

注：我们的触发器设计因为特殊的时间格式只用课程知识无法满足，需要借助触发器函数实现，请借助gpt和相关文档开发

- 格式检查断言：任何对表的注入都需要满足格式要求，需要进行断言检查，尽管大部分表没有开放给用户的注入接口，但是也要设计对应的格式检查断言（报告内容+++）
- `MeetingRoomX`触发器：因为管理员通过相较于教师和学生更高的预约优先级来管理会议室的使用，因此当当`MeetingRoomA`发生插入时，触发器需要检查`MeetingRoomS`和`MeetingRoomS`与管理员预约的会议室相同的表项，以排除时间冲突，具体来说：
  - 设`MeetingRoomS`和`MeetingRoomST`中对会议室`H`的预约时间为 `X`，`MeetingRoomA`中新插入的对会议室`H`的预约时间为`Y`
  - 如果$X\in Y$，则直接删除`MeetingRoomS`和`MeetingRoomS`中对会议室`H`的预约
  - 如果$X\cap Y\neq \emptyset$，则修改`MeetingRoomS`和`MeetingRoomS`中对会议室`H`的预约时间为`X-Y`


### 界面与功能

#### 登录界面

##### 登录

前端：

- 输入账号、密码
- 传输账号、密码（哈希后）

后端：

- 核对账号密码，识别正确性
- 将用户编号+密码+登录时间拼接后做哈希，请求头的认证 `Authorization=SHA256(Uno+Key+Time)`
- 记录日志
- 返回正确性标志和用户身份

数据库只储存哈希后的密码

函数路由：`Login`

日志：

```
--Login--Uno:{Uno},Key:{SHA256(Key)},statue:{statue},Authorization:{Authorization}
```

通信字典：

```json
{ 
 "Uno":"" ,
 "Key":"" ,
 "status":"" ->"A"|"T"|"S",
 "flag": "" -> {"False"|"True"},
 "Authorization":""
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

- 进入本页面后自动：传输 `Sno` 和 `Authorization` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Sno` 返回 `Scredit|Course` 表项中的信息（注：在 `Scredit` 标记为 `Pass=="0"` 的课程学分应0）
- 日志记录

函数路由：`Scredict_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Scredit|Course",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Sno":"" 
 			},
 "Scredit":[
    		{
             "Cno":"",
             "Cname":"",
             "Credit":""
            } 
 			]
}
```

##### 课程信息查询

前端：

- 传输 `{Cno|Cname|Credit|Ctno|Tname|CRtime}` 和 `Authorization` 进行查询（注：查询条目是任意项可选的，允许多条目以且逻辑查询）
- 得到信息后展示表项

后端：

- 根据 `{Cno|Cname|Credit|Ctno|Tname|CRtime}` 返回 `Course|Teacher|ClassRoom` 表项中的信息
- 日志记录

函数路由：`Course_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Course|Teacher|ClassRoom",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Cno":"" ,
     		"Cname":"" ,
     		"Credit":"" ,
     		"Ctno":"" ,
     		"Tname":"" ,
     		"CRtime":"" 
 			},
 "Course":[{
    		"Cno":"",
     		"Cname":"" ,
     		"Credit":"" ,
     		"Ctno":"" ,
     		"Tname":"" ,
     		"CRtime":"" 
			}	
 		   ]
}
```

##### 项目申报与查询

前端：

- 进入本页面后自动：传输 `Sno` 和 `Authorization` 进行查询
- 得到信息后展示表项
- 申报界面：
  - 输入：项目名称，项目队员的学号，指导老师的工号
  - 自动将当前用户设为队长
  - 传输

后端：

- 查询：

  - 根据 `Sno` 返回 `Project|ProjMem|Stedunt|Teacher` 表项中的信息

  - 日志记录

函数路由：`Project_Inquire_S[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Project|ProjMem|Stedunt|Teacher",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Sno":"" 
 			},
 "Project":[
     		{
             "Pno":"",
             "Pname":"",
             "Sno":"",
             "Sname":"",
             "Tno":"",
             "Tname":""
            }
 		   ],
 "ProjMen":[
     		[
     		{
             "Sno":"",
             "Sname":""
            }
            ]
 		   ]
}
```

注：`Project`和`ProjMen` 每一项是对齐的，即相同的下标代表同一个项目`ProjMen[i]`存储了第`i`个项目的成员信息

- 申报
  - 根据 `Info` 对 `Project`  表进行注入
  - 日志记录

函数路由：`Project_Insert[POST]`

日志：

```
--Insert--Authorization:{},Table:"Project|ProjMen",Info:{Info}
```

通信字典：

```json 
{
 "Info":{
 		"Pname":"", 
 		"PSno":[""],
     	"PTno":"",
 		},
 "flag":"" {"True"|"False"}
}
```

注：`PSno`中的第一个`Sno`为队长

##### 教室使用查询

前端：

- 传输 `CRno|CRtime|Cno|Ctno` 和 `Authorization` 进行查询
- 得到信息后展示表项

后端：

- 根据 `CRno|CRtime|Cno|Ctno` 返回 `ClassRoom` 表项中的信息

- 日志记录

函数路由：`ClassRoom_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"ClassRoom|Teacher|Course",Keywords:{Keywords}
```

通信字典：

```json
{
  "Keywords":{
     		"CRno":"" ,
     		"CRtime":"" ,
     		"Cno":"" ,
     		"Ctno":"" ,
 			},
 "ClassRoom":[
     		{
            "CRno":"" ,
     		"CRtime":"" ,
     		"Cno":"" ,
            "Cname":"" ,
     		"Ctno":"",
            "Tname":""
       	 	}
			]
}
```

##### 会议室预约

==这是核心功能，包含增删查改和触发器的使用==

==如果你实在看不懂文档要求，请配合SHU图书馆座位预约系统理解==

只能预约当天时间

前端：

信息展示与预约

- 进入本页面后自动：传输 ` 空查询` 和 `Authorization` 进行查询

- 得到信息后展示表项，表项设计如下：
  - 每个会议室一个展示栏，包含信息：会议室号、当日时间安排
  - 时间安排用时间块展示，每个时间块代表一个课时
  - 空闲的时间块上标记其代表的课时索引，例如 `1`，可预约空闲时间块是白色的，不可预约空闲块是灰色的（时间已经过了就不能约了）
  - 已经被预约的时间段不显示课时索引，而是显示预约者的学号姓名；且一个预约者拥有一个随机的颜色，其预约的时间块被修改为预约者的颜色
  - 每个展示栏有一个预约按钮

- 整个预约界面有一个`我的预约`入口，进入后可以管理预约：
  - `我的预约`中只展示与当前用户有关的会议室预约表项，例如当前用户预约了`M101`和`M102`两个会议室，则在界面中只展示两个会议室表项，表项的展示内容与`预约界面`基本一致，修改处如下：
    - 我的预约表项没有预约控件，修改为`续约`和`取消`控件

  - 如果当前预约后续有时间段空闲，可以进行续约，预约操作与预约一致，选择可预约时间后进行续约（后续空闲时间段都可以选择，不是一定要紧挨着的）

  - 取消预约则删除整个会议室表项中与当前用户有关的预约信息


后端：

- 信息展示与查询：
  - 根据 `MRno` 返回 `MeetingRoomS` |`MeetingRoomT`| `MeetingRoomA`表项中的信息
  - 日志记录
  

函数路由：`MeetingRoom_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"MeetingRoomS|MeetingRoomT|MeetingRoomA",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"MRno":""
 			},
 "MeetingRoom":[
     			{
                "MRno":"" ,
                "MRtime":[""],
                "Uno":[""]
                }
 				]
}
```

- 预约与续约
  - 根据 `MRno+MRtime+Sno` 对 `MeetingRoomS` 表进行注入，同时返回数据库的合法性判断
  - 日志记录

函数路由：`MeetingRoomS_Insert_S[POST]`

日志：

```
--Insert--Authorization:{Authorization},Table:"MeetingRoomS",Info:{Info},flag:{flag}
```

通信字典：

```json
{
 "Info":{
     	"MRno":"", 
        "MRtime":[""], 
        "Uno":"" 
 		},
 "flag":"" {"True"|"False"}
}
```

- 查询我的预约：
  - 根据 `MRno|MRtime|SNO` 返回 `MeetingRoomS` |`MeetingRoomT`| `MeetingRoomA`表项中的信息
  - 日志记录

函数路由：`My_MeetingRoom_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"MeetingRoomS|MeetingRoomT|MeetingRoomA",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Uno":""
 			},
 "MeetingRoom":[
     			{
                "Uno":[""] ,
                "MRno":"" ,
                "MRtime":[""],
                }
 				]
}
```

- 取消预约
  - 根据 `MRno+Sno` 对 `MeetingRoomS` 表进行表项删除
  - 日志记录

函数路由：`My_MeetingRoom_Delete_S[POST]`

日志：

```
--Delete--Authorization:{Authorization},Table:"MeetingRoomS",Key:{Info},flag:{flag}
```

通信字典：

```json
{
 "Key":{
     	"MRno":"", 
        "Uno":"" 
 		},
 "flag":"" {"True"|"False"}
}
```

#### 教师端功能界面

##### 教分完成情况

前端：

- 进入本页面后自动：传输 `Tno` 和 `Authorization` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Tno` 返回 `Tcredit|Course` 表项中的信息
- 日志记录

函数路由：`Tcredict_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Tcredit|Course",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Tno":"" 
 			},
 "Tcredit":[
    		{
             "Cno":"",
             "Cname":"",
             "Credit":""
            } 
 			]
}
```

##### 课程信息查询

前端：

- 传输 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 和 `Authorization` 进行查询（注：查询条目是任意项可选的，允许多条目以且逻辑查询）
- 得到信息后展示表项

后端：

- 根据 `{Cno|Cname|Credit|Ctno|Tname|Ctime}` 返回 `Course|Teacher` 表项中的信息
- 日志记录

函数路由：`Course_Inquire[POST]`

##### 项目查询

前端：

- 进入本页面后自动：传输 `Tno` 和 `Authorization` 进行查询
- 得到信息后展示表项
- 申报界面：
  - 输入：项目名称，项目队员的名字、学号，指导老师的名字、工号
  - 自动将当前用户设为队长
  - 传输

后端：

- 查询：
  - 根据 `Tno` 返回 `Project|ProjMem|Stedunt|Teacher` 表项中的信息
  - 日志记录

函数路由：`Project_Inquire_T[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Project|ProjMem|Stedunt|Teacher",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Tno":"" 
 			},
 "Project":[
     		{
             "Pno":"",
             "Pname":"",
             "Sno":"",
             "Sname":"",
             "Tno":"",
             "Tname":""
            }
 		   ],
 "ProjMen":[
     		[
     		{
             "Sno":"",
             "Sname":""
            }
            ]
 		   ]
}
```

##### 教室使用查询

前端：

- 传输 `CRno|CRtime|Cno|Ctno` 和 `Authorization` 进行查询
- 得到信息后展示表项

后端：

- 根据 `CRno|CRtime|Cno|Ctno` 返回 `ClassRoom` 表项中的信息
- 日志记录

函数路由：`ClassRoom_Inquire[POST]`

##### 会议室预约

只能预约当天时间

前端：

信息展示与预约

- 进入本页面后自动：传输 `空查询` 和 `Authorization` 进行查询
- 得到信息后展示表项，表项设计如下：
  - 每个会议室一个展示栏，包含信息：会议室号、当日时间安排
  - 时间安排用时间块展示，每个时间块代表一个课时
  - 空闲的时间块上标记其代表的课时索引，例如 `1`，可预约空闲时间块是白色的，不可预约空闲块是灰色的（时间已经过了就不能约了）
  - 已经被预约的时间段不显示课时索引，而是显示预约者的学号姓名；且一个预约者拥有一个随机的颜色，其预约的时间块被修改为预约者的颜色
  - 每个展示栏有一个预约按钮
- 整个预约界面有一个`我的预约`入口，进入后可以管理预约：
  - `我的预约`中只展示与当前用户有关的会议室预约表项，例如当前用户预约了`M101`和`M102`两个会议室，则在界面中只展示两个会议室表项，表项的展示内容与`预约界面`基本一致，修改处如下：
    - 我的预约表项没有预约控件，修改为`续约`和`取消`控件
  - 如果当前预约后续有时间段空闲，可以进行续约，预约操作与预约一致，选择可预约时间后进行续约（后续空闲时间段都可以选择，不是一定要紧挨着的）
  - 取消预约则删除整个会议室表项中与当前用户有关的预约信息

后端：

- 信息展示与查询：
  - 根据 `MRno|MRtime` 返回 `MeetingRoomS` |`MeetingRoomT`| `MeetingRoomA`表项中的信息
    - 日志记录

函数路由：`MeetingRoom_Inquire[POST]`

- 预约与续约
  - 根据 `MRno+MRtime+Sno` 对 `MeetingRoomT` 表进行注入，同时返回数据库的合法性判断
  - 日志记录

函数路由：`MeetingRoomS_Inser_T[POST]`

日志：

```
--Insert--Authorization:{Authorization},Table:"MeetingRoomT",Info:{Info},flag:{flag}
```

通信字典：

```json
{
 "Info":{
     	"MRno":"", 
        "MRtime":[""], 
        "Uno":[""] 
 		},
 "flag":"" {"True"|"False"}
}
```

- 查询我的预约：
  - 根据 `MRno|MRtime|SNO` 返回 `MeetingRoomS` |`MeetingRoomT`| `MeetingRoomA`表项中的信息
  - 日志记录

函数路由：`My_MeetingRoom_Inquire[POST]`

- 取消预约
  - 根据 `MRno+Tno` 对 `MeetingRoomT` 表进行表项删除
  - 日志记录

函数路由：`My_MeetingRoom_Delete_T[POST]`

日志：

```
--Delete--Authorization:{Authorization},Table:"MeetingRoomT",Key:{Info},flag:{flag}
```

通信字典：

```json
{
 "Key":{
     	"MRno":"", 
        "Uno":"" 
 		},
 "flag":"" {"True"|"False"}
}
```

#### 管理员端功能界面

##### 学生信息查询

前端：

- 进入本页面后自动：传输 `Sno|Sname|Grade|Sgender|Cono|Cname` 和 `Authorization` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Sno|Sname|Grade|Sgender|Cono|Cname` 返回 `Student|College` 表项中的信息
- 日志记录

函数路由：`Student_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Student|College",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Sno":"" ,
     		"Sname":"" ,
     		"Grade":"" ,
     		"Sgender":"" ,
     		"Cono":"",
     		"Cname":""
 			},
 "Scredit":[
     		{
            "Sno":"" ,
     		"Sname":"" ,
     		"Grade":"" ,
     		"Sgender":"" ,
     		"Cname":""
            }
 			]
}
```

##### 教师信息查询

前端：

- 进入本页面后自动：传输 `Tno|Tname|Tgender|Tlevel|Cono|Cname` 和 `Authorization` 进行查询
- 得到信息后展示表项

后端：

- 根据 `Tno|Tname|Tgender|Tlevel|Cono|Cname` 返回 `Teacher|College` 表项中的信息
- 日志记录

函数路由：`Teacher_Inquire[POST]`

日志：

```
--Inquire--Authorization:{Authorization},Table:"Teacher|College",Keywords:{Keywords}
```

通信字典：

```json
{
 "Keywords":{
     		"Tno":"" ,
     		"Tname":"" ,
     		"Tlevel":"" ,
     		"Tgender":"" ,
     		"Cono":"",
     		"Cname":"" 
 			},
 "Scredit":[
     		{
     		"Tno":"" ,
     		"Tname":"" ,
     		"Tlevel":"" ,
     		"Tgender":"" ,
     		"Cname":"" 
 			}
 			]
}
```

##### 会议室管理

前端：

- 信息展示与查询

  - 进入本页面后自动：传输 ` 空查询` 和 `Authorization` 进行查询

  - 得到信息后展示表项

- 管理（管理员预约）

  - 管路员预约的界面和学生已经教师端完全一致，此处不再赘述

后端：

- 信息展示与查询

  - 根据 `MRno|MRtime|Uno` 返回 `MeetingRoomS|MeetingRoomT|MeetingRoomA` 表项中的信息
  - 日志记录

函数路由：`MeetingRoom_Inquire[POST]`

- 预约与续约
  - 根据 `MRno+MRtime+Ano` 对 `MeetingRoomA` 表进行注入，同时返回数据库的合法性判断
  - 日志记录

函数路由：`MeetingRoomS_Inser_A[POST]`

日志：

```
--Insert--Authorization:{Authorization},Table:"MeetingRoomA",Info:{Info},flag:{flag}
```

通信字典：

```json
{
 "Info":{
        "MRno":"", 
        "MRtime":"", 
        "Uno":"" 
        },
 "flag":"" {"True"|"False"}
}
```

- 查询我的预约：
  - 根据 `MRno|MRtime|ANO` 返回 `MeetingRoomS` |`MeetingRoomT`| `MeetingRoomA`表项中的信息
  - 日志记录

函数路由：`My_MeetingRoom_Inquire[POST]`

- 取消预约
  - 根据 `MRno+Ano` 对 `MeetingRoomA` 表进行表项删除
  - 日志记录

函数路由：`My_MeetingRoom_Delete_A[POST]`

日志：

```
--Delete--Authorization:{Authorization},Table:"MeetingRoomA",Key:{Info},flag:{flag}
```

通信字典：

```json
{
 "Info":{
     	"MRno":"", 
        "MRtime":"", 
        "Uno":"" 
 		},
 "flag":"" {"True"|"False"}
}
```

