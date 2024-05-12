--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    "Ano" character varying(8) NOT NULL,
    "Akey" character varying
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: TABLE "Admin"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Admin" IS '绠＄悊鍛樹俊鎭?;


--
-- Name: ClassRoom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ClassRoom" (
    "CRno" character varying(4) NOT NULL,
    "Cno" character varying(8),
    "Ctno" character varying(4),
    "CRtime" character varying(4) NOT NULL
);


ALTER TABLE public."ClassRoom" OWNER TO postgres;

--
-- Name: TABLE "ClassRoom"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."ClassRoom" IS '鏁欏瀹夋帓淇℃伅';


--
-- Name: College; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."College" (
    "Cono" character varying(2) NOT NULL,
    "Cname" character varying(100) NOT NULL
);


ALTER TABLE public."College" OWNER TO postgres;

--
-- Name: TABLE "College"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."College" IS '瀛﹂櫌淇℃伅
';


--
-- Name: Course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Course" (
    "Cno" character varying(8) NOT NULL,
    "Cname" character varying(100),
    "Credit" character varying(1),
    "Ctno" character varying(3),
    "Tno" character varying(8)
);


ALTER TABLE public."Course" OWNER TO postgres;

--
-- Name: TABLE "Course"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Course" IS '璇剧▼淇℃伅';


--
-- Name: MeetingRoomA; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MeetingRoomA" (
    "MRno" character varying(4) NOT NULL,
    "Ano" character varying(8),
    "MRtime" character varying(4) NOT NULL
);


ALTER TABLE public."MeetingRoomA" OWNER TO postgres;

--
-- Name: TABLE "MeetingRoomA"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."MeetingRoomA" IS '浼氳瀹ら绾︾鐞嗗憳鎯呭喌';


--
-- Name: MeetingRoomS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MeetingRoomS" (
    "MRno" character varying(4) NOT NULL,
    "Sno" character varying(8),
    "MRtime" character varying(4) NOT NULL
);


ALTER TABLE public."MeetingRoomS" OWNER TO postgres;

--
-- Name: TABLE "MeetingRoomS"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."MeetingRoomS" IS '浼氳瀹ら绾﹀鐢熸儏鍐?;


--
-- Name: MeetingRoomT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MeetingRoomT" (
    "MRno" character varying(4) NOT NULL,
    "Tno" character varying(8),
    "MRtime" character varying(4) NOT NULL
);


ALTER TABLE public."MeetingRoomT" OWNER TO postgres;

--
-- Name: TABLE "MeetingRoomT"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."MeetingRoomT" IS '浼氳瀹ら绾︽暀甯堟儏鍐?;


--
-- Name: ProjMen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjMen" (
    "Pno" character varying(8) NOT NULL,
    "Sno" character varying(8) NOT NULL
);


ALTER TABLE public."ProjMen" OWNER TO postgres;

--
-- Name: TABLE "ProjMen"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."ProjMen" IS '椤圭洰闃熷憳琛?;


--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    "Pno" character varying(8) NOT NULL,
    "Pname" character varying(100),
    "Sno" character varying(8),
    "Tno" character varying(8)
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: TABLE "Project"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Project" IS '椤圭洰鎯呭喌';


--
-- Name: Scredit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Scredit" (
    "Sno" character varying(8) NOT NULL,
    "Cno" character varying(8) NOT NULL,
    "Pass" character varying(10)
);


ALTER TABLE public."Scredit" OWNER TO postgres;

--
-- Name: TABLE "Scredit"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Scredit" IS '瀛﹀垎瀹屾垚鎯呭喌';


--
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    "Sno" character varying(8) NOT NULL,
    "Skey" character varying,
    "Sname" character varying(100),
    "Grade" character varying(4),
    "Sgender" character varying(2),
    "Cono" character(2)
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- Name: TABLE "Student"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Student" IS '瀛︾敓淇℃伅';


--
-- Name: Tcredit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tcredit" (
    "Tno" character varying(8) NOT NULL,
    "Cno" character varying(8) NOT NULL,
    "Pass" character varying(1)
);


ALTER TABLE public."Tcredit" OWNER TO postgres;

--
-- Name: TABLE "Tcredit"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Tcredit" IS '鏁欏垎瀹屾垚鎯呭喌';


--
-- Name: Teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Teacher" (
    "Tno" character varying(8) NOT NULL,
    "Tkey" character varying,
    "Tname" character varying(100),
    "Tlevel" character varying(3),
    "Tgender" character varying(2),
    "Cono" character varying(2)
);


ALTER TABLE public."Teacher" OWNER TO postgres;

--
-- Name: TABLE "Teacher"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Teacher" IS '鏁欏笀淇℃伅';


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" ("Ano", "Akey") FROM stdin;
01234567	ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f
01234568	f14f286ca435d1fa3b9d8041e8f06aa0af7ab28ea8edcd7e11fd485a100b632b
01234569	e70f267e1812a825b68ab747aaad5b36a3f1e227a1ae06ee95769a30ddc41e3d
01234570	6a5ef7bdbf8db33f0192c3a106dbe58fd9651f5d7bf8b094897eebd2b5514194
01234571	3ea515c21b28d53cc24ace2a96ee4dcb2aaad5341c57ae30f27edb98e750acd2
\.


--
-- Data for Name: ClassRoom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ClassRoom" ("CRno", "Cno", "Ctno", "CRtime") FROM stdin;
A101	00000001	001	涓€1-1
A102	00000002	002	浜?-2
A103	00000003	001	涓?-3
A104	00000004	002	鍥?-4
A105	00000005	003	浜?-5
\.


--
-- Data for Name: College; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."College" ("Cono", "Cname") FROM stdin;
01	璁＄畻鏈哄闄?
02	澶栬瀛﹂櫌
03	缁忔祹绠＄悊瀛﹂櫌
04	鑹烘湳涓庤璁″闄?
05	鐞嗗闄?
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Course" ("Cno", "Cname", "Credit", "Ctno", "Tno") FROM stdin;
00000001	鏁版嵁搴撳師鐞?3	001	10100001
00000002	鎿嶄綔绯荤粺	4	002	10100002
00000003	璇█瀛︽璁?3	001	10200003
00000004	鑻辫鍐欎綔涓庝慨杈?3	002	10210004
00000005	缁忔祹瀛﹀師鐞?4	003	10310005
00000006	绠＄悊瀛﹀璁?3	001	10300006
00000007	鑹烘湳鍙?4	003	10410007
00000008	璁捐鍩虹	3	002	10400008
00000009	鏁板鍒嗘瀽	4	001	10510009
00000010	鐗╃悊瀹為獙	3	003	10500010
\.


--
-- Data for Name: MeetingRoomA; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MeetingRoomA" ("MRno", "Ano", "MRtime") FROM stdin;
M201	01234567	涓€1-1
M202	01234568	浜?-2
M203	01234569	涓?-3
M204	01234570	鍥?-4
M205	01234571	浜?-5
\.


--
-- Data for Name: MeetingRoomS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MeetingRoomS" ("MRno", "Sno", "MRtime") FROM stdin;
M101	20100001	涓€1-1
M102	20100002	浜?-2
M103	20200003	涓?-3
M104	20210004	鍥?-4
M105	20310005	浜?-5
\.


--
-- Data for Name: MeetingRoomT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MeetingRoomT" ("MRno", "Tno", "MRtime") FROM stdin;
M301	10100001	涓€1-1
M302	10100002	浜?-2
M303	10200003	涓?-3
M304	10210004	鍥?-4
M305	10310005	浜?-5
\.


--
-- Data for Name: ProjMen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjMen" ("Pno", "Sno") FROM stdin;
01010001	20100001
02030002	20200003
03050003	20310005
04070004	20410007
05090005	20510009
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" ("Pno", "Pname", "Sno", "Tno") FROM stdin;
01010001	澶ф暟鎹垎鏋愪笌鎸栨帢	20100001	10100001
02030002	澶栬鏁欒偛涓庤法鏂囧寲浜ゆ祦	20200003	10200003
03050003	鍒涙柊涓庡垱涓氱鐞?20310005	10310005
04070004	鍒涙剰璁捐涓庡搧鐗岃惀閿€	20410007	10410007
05090005	澶╂枃瀛︿笌瀹囧畽鎺㈢储	20510009	10510009
\.


--
-- Data for Name: Scredit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Scredit" ("Sno", "Cno", "Pass") FROM stdin;
20100001	00000001	1
20100001	00000002	0
20100001	00000003	0
20100001	00000004	0
20100001	00000005	1
20100001	00000006	1
20100001	00000007	0
20100001	00000008	1
20100001	00000009	1
20100001	00000010	0
20100002	00000001	1
20100002	00000002	1
20100002	00000003	0
20100002	00000004	1
20100002	00000005	1
20100002	00000006	0
20100002	00000007	0
20100002	00000008	1
20100002	00000009	1
20100002	00000010	1
20200003	00000001	0
20200003	00000002	0
20200003	00000003	0
20200003	00000004	0
20200003	00000005	0
20200003	00000006	1
20200003	00000007	1
20200003	00000008	1
20200003	00000009	1
20200003	00000010	0
20210004	00000001	0
20210004	00000002	1
20210004	00000003	0
20210004	00000004	0
20210004	00000005	1
20210004	00000006	1
20210004	00000007	0
20210004	00000008	0
20210004	00000009	0
20210004	00000010	0
20310005	00000001	1
20310005	00000002	0
20310005	00000003	0
20310005	00000004	1
20310005	00000005	1
20310005	00000006	1
20310005	00000007	0
20310005	00000008	0
20310005	00000009	0
20310005	00000010	1
20300006	00000001	1
20300006	00000002	1
20300006	00000003	1
20300006	00000004	1
20300006	00000005	1
20300006	00000006	1
20300006	00000007	0
20300006	00000008	1
20300006	00000009	0
20300006	00000010	0
20410007	00000001	1
20410007	00000002	0
20410007	00000003	0
20410007	00000004	1
20410007	00000005	1
20410007	00000006	1
20410007	00000007	1
20410007	00000008	0
20410007	00000009	1
20410007	00000010	0
20400008	00000001	1
20400008	00000002	0
20400008	00000003	1
20400008	00000004	0
20400008	00000005	1
20400008	00000006	0
20400008	00000007	1
20400008	00000008	1
20400008	00000009	1
20400008	00000010	1
20510009	00000001	1
20510009	00000002	0
20510009	00000003	0
20510009	00000004	0
20510009	00000005	0
20510009	00000006	0
20510009	00000007	1
20510009	00000008	1
20510009	00000009	1
20510009	00000010	0
20500010	00000001	1
20500010	00000002	1
20500010	00000003	0
20500010	00000004	1
20500010	00000005	1
20500010	00000006	1
20500010	00000007	1
20500010	00000008	0
20500010	00000009	1
20500010	00000010	0
\.


--
-- Data for Name: Student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Student" ("Sno", "Skey", "Sname", "Grade", "Sgender", "Cono") FROM stdin;
20100001	ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f	寮犲┓	澶т竴	0	01
20100002	f14f286ca435d1fa3b9d8041e8f06aa0af7ab28ea8edcd7e11fd485a100b632b	鐜嬩紵	澶т竴	0	01
20200003	e70f267e1812a825b68ab747aaad5b36a3f1e227a1ae06ee95769a30ddc41e3d	鏉庝附	澶т簩	0	02
20210004	6a5ef7bdbf8db33f0192c3a106dbe58fd9651f5d7bf8b094897eebd2b5514194	鍒樺己	澶т簩	1	02
20310005	3ea515c21b28d53cc24ace2a96ee4dcb2aaad5341c57ae30f27edb98e750acd2	闄堝啗	澶т笁	1	03
20300006	5e11d3cb9f16b04652b2bf00f9f6d5db5294d6fb965539db244ecbf97e3286d3	鏉ㄦ磱	澶т笁	0	03
20410007	65f25c73143807cfd90a8e21ac506b39058506d2399b861856014a659c566e1d	榛勮姵	澶у洓	1	04
20400008	ba1c05926cbfd177ca1c0a2f9db96f42324ee439990b42763aee4a5b81ea9869	璧靛	澶у洓	0	04
20510009	9dd3fe15326ffa3213c6bacd226e79237d2c9d7e31d5b848d9d8a9cc093d0a2a	鍛ㄦ澃	澶у洓	1	05
20500010	924592b9b103f14f833faafb67f480691f01988aa457c0061769f58cd47311bc	鍚撮潤	澶у洓	0	05
\.


--
-- Data for Name: Tcredit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tcredit" ("Tno", "Cno", "Pass") FROM stdin;
10100001	00000001	1
10100002	00000002	1
10200003	00000003	1
10210004	00000004	1
10310005	00000005	1
10300006	00000006	1
10410007	00000007	1
10400008	00000008	1
10510009	00000009	1
10500010	00000010	1
\.


--
-- Data for Name: Teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Teacher" ("Tno", "Tkey", "Tname", "Tlevel", "Tgender", "Cono") FROM stdin;
10100001	ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f	寮犱笁	璁插笀	0	01
10100002	f14f286ca435d1fa3b9d8041e8f06aa0af7ab28ea8edcd7e11fd485a100b632b	鏉庡洓	鍓暀鎺?0	01
10200003	e70f267e1812a825b68ab747aaad5b36a3f1e227a1ae06ee95769a30ddc41e3d	鐜嬩簲	鏁欐巿	0	02
10210004	6a5ef7bdbf8db33f0192c3a106dbe58fd9651f5d7bf8b094897eebd2b5514194	璧靛叚	璁插笀	1	02
10310005	3ea515c21b28d53cc24ace2a96ee4dcb2aaad5341c57ae30f27edb98e750acd2	瀛欎竷	鍓暀鎺?1	03
10300006	5e11d3cb9f16b04652b2bf00f9f6d5db5294d6fb965539db244ecbf97e3286d3	鍛ㄥ叓	鏁欐巿	0	03
10410007	65f25c73143807cfd90a8e21ac506b39058506d2399b861856014a659c566e1d	鍚翠節	璁插笀	1	04
10400008	ba1c05926cbfd177ca1c0a2f9db96f42324ee439990b42763aee4a5b81ea9869	閮戝崄	鍓暀鎺?0	04
10510009	9dd3fe15326ffa3213c6bacd226e79237d2c9d7e31d5b848d9d8a9cc093d0a2a	閽卞崄涓€	鏁欐巿	1	05
10500010	924592b9b103f14f833faafb67f480691f01988aa457c0061769f58cd47311bc	瀛斿崄浜?璁插笀	0	05
\.


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("Ano");


--
-- Name: ClassRoom ClassRoom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ClassRoom"
    ADD CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("CRno", "CRtime");


--
-- Name: College College_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."College"
    ADD CONSTRAINT "College_pkey" PRIMARY KEY ("Cono");


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("Cno");


--
-- Name: MeetingRoomA MeetingRoomA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomA"
    ADD CONSTRAINT "MeetingRoomA_pkey" PRIMARY KEY ("MRno", "MRtime");


--
-- Name: MeetingRoomS MeetingRoomS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomS"
    ADD CONSTRAINT "MeetingRoomS_pkey" PRIMARY KEY ("MRno", "MRtime");


--
-- Name: MeetingRoomT MeetingRoomT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomT"
    ADD CONSTRAINT "MeetingRoomT_pkey" PRIMARY KEY ("MRno", "MRtime");


--
-- Name: ProjMen ProjMen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "ProjMen_pkey" PRIMARY KEY ("Pno", "Sno");


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("Pno");


--
-- Name: Scredit Scredit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Scredit_pkey" PRIMARY KEY ("Sno", "Cno");


--
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("Sno");


--
-- Name: Tcredit Tcredit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Tcredit_pkey" PRIMARY KEY ("Cno", "Tno");


--
-- Name: Teacher Teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("Tno");


--
-- Name: MeetingRoomA Admin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomA"
    ADD CONSTRAINT "Admin" FOREIGN KEY ("Ano") REFERENCES public."Admin"("Ano");


--
-- Name: Teacher College; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "College" FOREIGN KEY ("Cono") REFERENCES public."College"("Cono");


--
-- Name: Student College; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "College" FOREIGN KEY ("Cono") REFERENCES public."College"("Cono");


--
-- Name: Course Course; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");


--
-- Name: Scredit Course; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");


--
-- Name: Tcredit Course; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");


--
-- Name: ClassRoom Course; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ClassRoom"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");


--
-- Name: ProjMen Project; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "Project" FOREIGN KEY ("Pno") REFERENCES public."Project"("Pno");


--
-- Name: Scredit Student; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");


--
-- Name: Project Student; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");


--
-- Name: ProjMen Student; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");


--
-- Name: Tcredit Teacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");


--
-- Name: Project Teacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");


--
-- Name: MeetingRoomT Teacher; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomT"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");


--
-- Name: MeetingRoomS s; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MeetingRoomS"
    ADD CONSTRAINT s FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");


--
-- PostgreSQL database dump complete
--

