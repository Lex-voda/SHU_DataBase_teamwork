PGDMP  3                    |            db2    16.1    16.1 Q    =           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            >           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            @           1262    17688    db2    DATABASE     �   CREATE DATABASE db2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Simplified)_China.936';
    DROP DATABASE db2;
                postgres    false                        3079    17689    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false            A           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    2            	           1255    17726    check_conflict_times()    FUNCTION     a  CREATE FUNCTION public.check_conflict_times() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    existing_record_s RECORD;
    existing_record_t RECORD;
    new_start_time INT;
    new_end_time INT;
    existing_start_time INT;
    existing_end_time INT;
BEGIN
    new_start_time := CAST(SPLIT_PART(NEW."MRtime", '-', 1) AS INT);
    new_end_time := CAST(SPLIT_PART(NEW."MRtime", '-', 2) AS INT);

    FOR existing_record_s IN SELECT * FROM "MeetingRoomS" WHERE "MRno" = NEW."MRno"
    LOOP
        existing_start_time := CAST(SPLIT_PART(existing_record_s."MRtime", '-', 1) AS INT);
        existing_end_time := CAST(SPLIT_PART(existing_record_s."MRtime", '-', 2) AS INT);
        IF existing_start_time >= new_start_time AND existing_end_time <= new_end_time THEN
            DELETE FROM "MeetingRoomS" WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_s."MRtime";
        ELSIF existing_start_time < new_start_time AND existing_end_time > new_end_time THEN
            UPDATE "MeetingRoomS" SET "MRtime" = existing_start_time::TEXT || '-' || (new_start_time - 1)::TEXT WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_s."MRtime";
            INSERT INTO "MeetingRoomS" ("MRno", "Uno", "MRtime") VALUES (NEW."MRno", existing_record_s."Uno", (new_end_time + 1)::TEXT || '-' || existing_end_time::TEXT);
        ELSIF existing_start_time < new_start_time AND existing_end_time >= new_start_time THEN
            UPDATE "MeetingRoomS" SET "MRtime" = existing_start_time::TEXT || '-' || (new_start_time - 1)::TEXT WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_s."MRtime";
        ELSIF existing_start_time <= new_end_time AND existing_end_time > new_end_time THEN
            UPDATE "MeetingRoomS" SET "MRtime" = (new_end_time + 1)::TEXT || '-' || existing_end_time::TEXT WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_s."MRtime";
        END IF;
    END LOOP;

    FOR existing_record_t IN SELECT * FROM "MeetingRoomT" WHERE "MRno" = NEW."MRno"
    LOOP
        existing_start_time := CAST(SPLIT_PART(existing_record_t."MRtime", '-', 1) AS INT);
        existing_end_time := CAST(SPLIT_PART(existing_record_t."MRtime", '-', 2) AS INT);
        IF existing_start_time >= new_start_time AND existing_end_time <= new_end_time THEN
            DELETE FROM "MeetingRoomT" WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_t."MRtime";
        ELSIF existing_start_time < new_start_time AND existing_end_time > new_end_time THEN
            UPDATE "MeetingRoomT" SET "MRtime" = existing_start_time::TEXT || '-' || (new_start_time - 1)::TEXT WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_t."MRtime";
            INSERT INTO "MeetingRoomT" ("MRno", "Uno", "MRtime") VALUES (NEW."MRno", existing_record_t."Uno", (new_end_time + 1)::TEXT || '-' || existing_end_time::TEXT);
        ELSIF existing_start_time < new_start_time AND existing_end_time >= new_start_time THEN
            UPDATE "MeetingRoomT" SET "MRtime" = existing_start_time::TEXT || '-' || (new_start_time - 1)::TEXT WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_t."MRtime";
        ELSIF existing_start_time <= new_end_time AND existing_end_time > new_end_time THEN
            UPDATE "MeetingRoomT" SET "MRtime" = (new_end_time + 1)::TEXT || '-' || existing_end_time::TEXT WHERE "MRno" = NEW."MRno" AND "MRtime" = existing_record_t."MRtime";
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$;
 -   DROP FUNCTION public.check_conflict_times();
       public          postgres    false                       1255    17727    merge_meeting_times_a()    FUNCTION       CREATE FUNCTION public.merge_meeting_times_a() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    existing_record RECORD;
    new_start_time INT;
    new_end_time INT;
    existing_start_time INT;
    existing_end_time INT;
BEGIN
    new_start_time := CAST(SPLIT_PART(NEW."MRtime", '-', 1) AS INT);
    new_end_time := CAST(SPLIT_PART(NEW."MRtime", '-', 2) AS INT);

    FOR existing_record IN SELECT * FROM "MeetingRoomA" WHERE "MRno" = NEW."MRno" AND "Ano" = NEW."Ano"
    LOOP
        existing_start_time := CAST(SPLIT_PART(existing_record."MRtime", '-', 1) AS INT);
        existing_end_time := CAST(SPLIT_PART(existing_record."MRtime", '-', 2) AS INT);

        IF new_start_time - 1 = existing_end_time OR new_end_time + 1 = existing_start_time THEN
            UPDATE "MeetingRoomA" SET "MRtime" = LEAST(existing_start_time, new_start_time)::TEXT || '-' || GREATEST(existing_end_time, new_end_time)::TEXT WHERE "MRno" = NEW."MRno" AND "Ano" = NEW."Ano";
            RETURN NULL;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.merge_meeting_times_a();
       public          postgres    false                       1255    17728    merge_meeting_times_s()    FUNCTION       CREATE FUNCTION public.merge_meeting_times_s() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    existing_record RECORD;
    new_start_time INT;
    new_end_time INT;
    existing_start_time INT;
    existing_end_time INT;
BEGIN
    new_start_time := CAST(SPLIT_PART(NEW."MRtime", '-', 1) AS INT);
    new_end_time := CAST(SPLIT_PART(NEW."MRtime", '-', 2) AS INT);

    FOR existing_record IN SELECT * FROM "MeetingRoomS" WHERE "MRno" = NEW."MRno" AND "Sno" = NEW."Sno"
    LOOP
        existing_start_time := CAST(SPLIT_PART(existing_record."MRtime", '-', 1) AS INT);
        existing_end_time := CAST(SPLIT_PART(existing_record."MRtime", '-', 2) AS INT);

        IF new_start_time - 1 = existing_end_time OR new_end_time + 1 = existing_start_time THEN
            UPDATE "MeetingRoomS" SET "MRtime" = LEAST(existing_start_time, new_start_time)::TEXT || '-' || GREATEST(existing_end_time, new_end_time)::TEXT WHERE "MRno" = NEW."MRno" AND "Sno" = NEW."Sno";
            RETURN NULL;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.merge_meeting_times_s();
       public          postgres    false                       1255    17729    merge_meeting_times_t()    FUNCTION       CREATE FUNCTION public.merge_meeting_times_t() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    existing_record RECORD;
    new_start_time INT;
    new_end_time INT;
    existing_start_time INT;
    existing_end_time INT;
BEGIN
    new_start_time := CAST(SPLIT_PART(NEW."MRtime", '-', 1) AS INT);
    new_end_time := CAST(SPLIT_PART(NEW."MRtime", '-', 2) AS INT);

    FOR existing_record IN SELECT * FROM "MeetingRoomT" WHERE "MRno" = NEW."MRno" AND "Tno" = NEW."Tno"
    LOOP
        existing_start_time := CAST(SPLIT_PART(existing_record."MRtime", '-', 1) AS INT);
        existing_end_time := CAST(SPLIT_PART(existing_record."MRtime", '-', 2) AS INT);

        IF new_start_time - 1 = existing_end_time OR new_end_time + 1 = existing_start_time THEN
            UPDATE "MeetingRoomT" SET "MRtime" = LEAST(existing_start_time, new_start_time)::TEXT || '-' || GREATEST(existing_end_time, new_end_time)::TEXT WHERE "MRno" = NEW."MRno" AND "Tno" = NEW."Tno";
            RETURN NULL;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$;
 .   DROP FUNCTION public.merge_meeting_times_t();
       public          postgres    false            �            1259    17730    Admin    TABLE     g   CREATE TABLE public."Admin" (
    "Ano" character varying(8) NOT NULL,
    "Akey" character varying
);
    DROP TABLE public."Admin";
       public         heap    postgres    false            B           0    0    TABLE "Admin"    COMMENT     6   COMMENT ON TABLE public."Admin" IS '管理员信息';
          public          postgres    false    216            �            1259    17735 	   ClassRoom    TABLE     �   CREATE TABLE public."ClassRoom" (
    "CRno" character varying(4) NOT NULL,
    "Cno" character varying(8),
    "Ctno" character varying(4),
    "CRtime" character varying(4) NOT NULL
);
    DROP TABLE public."ClassRoom";
       public         heap    postgres    false            C           0    0    TABLE "ClassRoom"    COMMENT     =   COMMENT ON TABLE public."ClassRoom" IS '教室安排信息';
          public          postgres    false    217            �            1259    17738    College    TABLE     y   CREATE TABLE public."College" (
    "Cono" character varying(2) NOT NULL,
    "Cname" character varying(100) NOT NULL
);
    DROP TABLE public."College";
       public         heap    postgres    false            D           0    0    TABLE "College"    COMMENT     6   COMMENT ON TABLE public."College" IS '学院信息
';
          public          postgres    false    218            �            1259    17741    Course    TABLE     �   CREATE TABLE public."Course" (
    "Cno" character varying(8) NOT NULL,
    "Cname" character varying(100),
    "Credit" character varying(1),
    "Ctno" character varying(3),
    "Tno" character varying(8)
);
    DROP TABLE public."Course";
       public         heap    postgres    false            E           0    0    TABLE "Course"    COMMENT     4   COMMENT ON TABLE public."Course" IS '课程信息';
          public          postgres    false    219            �            1259    17744    MeetingRoomA    TABLE     �   CREATE TABLE public."MeetingRoomA" (
    "MRno" character varying(4) NOT NULL,
    "Ano" character varying(8),
    "MRtime" character varying(6) NOT NULL
);
 "   DROP TABLE public."MeetingRoomA";
       public         heap    postgres    false            F           0    0    TABLE "MeetingRoomA"    COMMENT     L   COMMENT ON TABLE public."MeetingRoomA" IS '会议室预约管理员情况';
          public          postgres    false    220            �            1259    17747    MeetingRoomS    TABLE     �   CREATE TABLE public."MeetingRoomS" (
    "MRno" character varying(4) NOT NULL,
    "Sno" character varying(8),
    "MRtime" character varying(10) NOT NULL
);
 "   DROP TABLE public."MeetingRoomS";
       public         heap    postgres    false            G           0    0    TABLE "MeetingRoomS"    COMMENT     I   COMMENT ON TABLE public."MeetingRoomS" IS '会议室预约学生情况';
          public          postgres    false    221            �            1259    17750    MeetingRoomT    TABLE     �   CREATE TABLE public."MeetingRoomT" (
    "MRno" character varying(4) NOT NULL,
    "Tno" character varying(8),
    "MRtime" character varying(6) NOT NULL
);
 "   DROP TABLE public."MeetingRoomT";
       public         heap    postgres    false            H           0    0    TABLE "MeetingRoomT"    COMMENT     I   COMMENT ON TABLE public."MeetingRoomT" IS '会议室预约教师情况';
          public          postgres    false    222            �            1259    17753    ProjMen    TABLE     t   CREATE TABLE public."ProjMen" (
    "Pno" character varying(8) NOT NULL,
    "Sno" character varying(8) NOT NULL
);
    DROP TABLE public."ProjMen";
       public         heap    postgres    false            I           0    0    TABLE "ProjMen"    COMMENT     8   COMMENT ON TABLE public."ProjMen" IS '项目队员表';
          public          postgres    false    223            �            1259    17756    Project    TABLE     �   CREATE TABLE public."Project" (
    "Pno" character varying(8) NOT NULL,
    "Pname" character varying(100),
    "Sno" character varying(8),
    "Tno" character varying(8)
);
    DROP TABLE public."Project";
       public         heap    postgres    false            J           0    0    TABLE "Project"    COMMENT     5   COMMENT ON TABLE public."Project" IS '项目情况';
          public          postgres    false    224            �            1259    17759    Scredit    TABLE     �   CREATE TABLE public."Scredit" (
    "Sno" character varying(8) NOT NULL,
    "Cno" character varying(8) NOT NULL,
    "Pass" character varying(10)
);
    DROP TABLE public."Scredit";
       public         heap    postgres    false            K           0    0    TABLE "Scredit"    COMMENT     ;   COMMENT ON TABLE public."Scredit" IS '学分完成情况';
          public          postgres    false    225            �            1259    17762    Student    TABLE     �   CREATE TABLE public."Student" (
    "Sno" character varying(8) NOT NULL,
    "Skey" character varying,
    "Sname" character varying(100),
    "Grade" character varying(4),
    "Sgender" character varying(2),
    "Cono" character(2)
);
    DROP TABLE public."Student";
       public         heap    postgres    false            L           0    0    TABLE "Student"    COMMENT     5   COMMENT ON TABLE public."Student" IS '学生信息';
          public          postgres    false    226            �            1259    17767    Tcredit    TABLE     �   CREATE TABLE public."Tcredit" (
    "Tno" character varying(8) NOT NULL,
    "Cno" character varying(8) NOT NULL,
    "Pass" character varying(1)
);
    DROP TABLE public."Tcredit";
       public         heap    postgres    false            M           0    0    TABLE "Tcredit"    COMMENT     ;   COMMENT ON TABLE public."Tcredit" IS '教分完成情况';
          public          postgres    false    227            �            1259    17770    Teacher    TABLE     �   CREATE TABLE public."Teacher" (
    "Tno" character varying(8) NOT NULL,
    "Tkey" character varying,
    "Tname" character varying(100),
    "Tlevel" character varying(3),
    "Tgender" character varying(2),
    "Cono" character varying(2)
);
    DROP TABLE public."Teacher";
       public         heap    postgres    false            N           0    0    TABLE "Teacher"    COMMENT     5   COMMENT ON TABLE public."Teacher" IS '教师信息';
          public          postgres    false    228            .          0    17730    Admin 
   TABLE DATA           0   COPY public."Admin" ("Ano", "Akey") FROM stdin;
    public          postgres    false    216   �q       /          0    17735 	   ClassRoom 
   TABLE DATA           F   COPY public."ClassRoom" ("CRno", "Cno", "Ctno", "CRtime") FROM stdin;
    public          postgres    false    217   �r       0          0    17738    College 
   TABLE DATA           4   COPY public."College" ("Cono", "Cname") FROM stdin;
    public          postgres    false    218   s       1          0    17741    Course 
   TABLE DATA           K   COPY public."Course" ("Cno", "Cname", "Credit", "Ctno", "Tno") FROM stdin;
    public          postgres    false    219   es       2          0    17744    MeetingRoomA 
   TABLE DATA           A   COPY public."MeetingRoomA" ("MRno", "Ano", "MRtime") FROM stdin;
    public          postgres    false    220   at       3          0    17747    MeetingRoomS 
   TABLE DATA           A   COPY public."MeetingRoomS" ("MRno", "Sno", "MRtime") FROM stdin;
    public          postgres    false    221   �t       4          0    17750    MeetingRoomT 
   TABLE DATA           A   COPY public."MeetingRoomT" ("MRno", "Tno", "MRtime") FROM stdin;
    public          postgres    false    222   u       5          0    17753    ProjMen 
   TABLE DATA           1   COPY public."ProjMen" ("Pno", "Sno") FROM stdin;
    public          postgres    false    223   bu       6          0    17756    Project 
   TABLE DATA           A   COPY public."Project" ("Pno", "Pname", "Sno", "Tno") FROM stdin;
    public          postgres    false    224   �u       7          0    17759    Scredit 
   TABLE DATA           9   COPY public."Scredit" ("Sno", "Cno", "Pass") FROM stdin;
    public          postgres    false    225   �v       8          0    17762    Student 
   TABLE DATA           W   COPY public."Student" ("Sno", "Skey", "Sname", "Grade", "Sgender", "Cono") FROM stdin;
    public          postgres    false    226   �w       9          0    17767    Tcredit 
   TABLE DATA           9   COPY public."Tcredit" ("Tno", "Cno", "Pass") FROM stdin;
    public          postgres    false    227   2z       :          0    17770    Teacher 
   TABLE DATA           X   COPY public."Teacher" ("Tno", "Tkey", "Tname", "Tlevel", "Tgender", "Cono") FROM stdin;
    public          postgres    false    228   �z       s           2606    17776    Admin Admin_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("Ano");
 >   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "Admin_pkey";
       public            postgres    false    216            u           2606    17778    ClassRoom ClassRoom_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."ClassRoom"
    ADD CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("CRno", "CRtime");
 F   ALTER TABLE ONLY public."ClassRoom" DROP CONSTRAINT "ClassRoom_pkey";
       public            postgres    false    217    217            w           2606    17780    College College_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."College"
    ADD CONSTRAINT "College_pkey" PRIMARY KEY ("Cono");
 B   ALTER TABLE ONLY public."College" DROP CONSTRAINT "College_pkey";
       public            postgres    false    218            y           2606    17782    Course Course_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("Cno");
 @   ALTER TABLE ONLY public."Course" DROP CONSTRAINT "Course_pkey";
       public            postgres    false    219            {           2606    17784    MeetingRoomA MeetingRoomA_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."MeetingRoomA"
    ADD CONSTRAINT "MeetingRoomA_pkey" PRIMARY KEY ("MRno", "MRtime");
 L   ALTER TABLE ONLY public."MeetingRoomA" DROP CONSTRAINT "MeetingRoomA_pkey";
       public            postgres    false    220    220            }           2606    17786    MeetingRoomS MeetingRoomS_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."MeetingRoomS"
    ADD CONSTRAINT "MeetingRoomS_pkey" PRIMARY KEY ("MRno", "MRtime");
 L   ALTER TABLE ONLY public."MeetingRoomS" DROP CONSTRAINT "MeetingRoomS_pkey";
       public            postgres    false    221    221                       2606    17788    MeetingRoomT MeetingRoomT_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."MeetingRoomT"
    ADD CONSTRAINT "MeetingRoomT_pkey" PRIMARY KEY ("MRno", "MRtime");
 L   ALTER TABLE ONLY public."MeetingRoomT" DROP CONSTRAINT "MeetingRoomT_pkey";
       public            postgres    false    222    222            �           2606    17790    ProjMen ProjMen_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "ProjMen_pkey" PRIMARY KEY ("Pno", "Sno");
 B   ALTER TABLE ONLY public."ProjMen" DROP CONSTRAINT "ProjMen_pkey";
       public            postgres    false    223    223            �           2606    17792    Project Project_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("Pno");
 B   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_pkey";
       public            postgres    false    224            �           2606    17794    Scredit Scredit_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Scredit_pkey" PRIMARY KEY ("Sno", "Cno");
 B   ALTER TABLE ONLY public."Scredit" DROP CONSTRAINT "Scredit_pkey";
       public            postgres    false    225    225            �           2606    17796    Student Student_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("Sno");
 B   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "Student_pkey";
       public            postgres    false    226            �           2606    17798    Tcredit Tcredit_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Tcredit_pkey" PRIMARY KEY ("Cno", "Tno");
 B   ALTER TABLE ONLY public."Tcredit" DROP CONSTRAINT "Tcredit_pkey";
       public            postgres    false    227    227            �           2606    17800    Teacher Teacher_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("Tno");
 B   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT "Teacher_pkey";
       public            postgres    false    228            �           2620    17801    MeetingRoomA check_conflict    TRIGGER     �   CREATE TRIGGER check_conflict BEFORE INSERT ON public."MeetingRoomA" FOR EACH ROW EXECUTE FUNCTION public.check_conflict_times();
 6   DROP TRIGGER check_conflict ON public."MeetingRoomA";
       public          postgres    false    265    220            �           2620    17883 "   MeetingRoomA check_meeting_times_a    TRIGGER     �   CREATE TRIGGER check_meeting_times_a BEFORE INSERT ON public."MeetingRoomA" FOR EACH ROW EXECUTE FUNCTION public.merge_meeting_times_a();
 =   DROP TRIGGER check_meeting_times_a ON public."MeetingRoomA";
       public          postgres    false    279    220            �           2620    17803 "   MeetingRoomS check_meeting_times_s    TRIGGER     �   CREATE TRIGGER check_meeting_times_s BEFORE INSERT ON public."MeetingRoomS" FOR EACH ROW EXECUTE FUNCTION public.merge_meeting_times_s();
 =   DROP TRIGGER check_meeting_times_s ON public."MeetingRoomS";
       public          postgres    false    221    277            �           2620    17882 "   MeetingRoomT check_meeting_times_t    TRIGGER     �   CREATE TRIGGER check_meeting_times_t BEFORE INSERT ON public."MeetingRoomT" FOR EACH ROW EXECUTE FUNCTION public.merge_meeting_times_t();
 =   DROP TRIGGER check_meeting_times_t ON public."MeetingRoomT";
       public          postgres    false    278    222            �           2606    17805    MeetingRoomA Admin    FK CONSTRAINT     x   ALTER TABLE ONLY public."MeetingRoomA"
    ADD CONSTRAINT "Admin" FOREIGN KEY ("Ano") REFERENCES public."Admin"("Ano");
 @   ALTER TABLE ONLY public."MeetingRoomA" DROP CONSTRAINT "Admin";
       public          postgres    false    220    4723    216            �           2606    17810    Teacher College    FK CONSTRAINT     y   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "College" FOREIGN KEY ("Cono") REFERENCES public."College"("Cono");
 =   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT "College";
       public          postgres    false    228    4727    218            �           2606    17815    Student College    FK CONSTRAINT     y   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "College" FOREIGN KEY ("Cono") REFERENCES public."College"("Cono");
 =   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "College";
       public          postgres    false    226    218    4727            �           2606    17820    Course Course    FK CONSTRAINT     u   ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 ;   ALTER TABLE ONLY public."Course" DROP CONSTRAINT "Course";
       public          postgres    false    228    4747    219            �           2606    17825    Scredit Course    FK CONSTRAINT     u   ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");
 <   ALTER TABLE ONLY public."Scredit" DROP CONSTRAINT "Course";
       public          postgres    false    225    219    4729            �           2606    17830    Tcredit Course    FK CONSTRAINT     u   ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");
 <   ALTER TABLE ONLY public."Tcredit" DROP CONSTRAINT "Course";
       public          postgres    false    219    4729    227            �           2606    17835    ClassRoom Course    FK CONSTRAINT     w   ALTER TABLE ONLY public."ClassRoom"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");
 >   ALTER TABLE ONLY public."ClassRoom" DROP CONSTRAINT "Course";
       public          postgres    false    219    4729    217            �           2606    17840    ProjMen Project    FK CONSTRAINT     w   ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "Project" FOREIGN KEY ("Pno") REFERENCES public."Project"("Pno");
 =   ALTER TABLE ONLY public."ProjMen" DROP CONSTRAINT "Project";
       public          postgres    false    223    4739    224            �           2606    17845    Scredit Student    FK CONSTRAINT     w   ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 =   ALTER TABLE ONLY public."Scredit" DROP CONSTRAINT "Student";
       public          postgres    false    4743    225    226            �           2606    17850    Project Student    FK CONSTRAINT     w   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 =   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Student";
       public          postgres    false    224    4743    226            �           2606    17855    ProjMen Student    FK CONSTRAINT     w   ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 =   ALTER TABLE ONLY public."ProjMen" DROP CONSTRAINT "Student";
       public          postgres    false    223    226    4743            �           2606    17860    Tcredit Teacher    FK CONSTRAINT     w   ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 =   ALTER TABLE ONLY public."Tcredit" DROP CONSTRAINT "Teacher";
       public          postgres    false    227    228    4747            �           2606    17865    Project Teacher    FK CONSTRAINT     w   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 =   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Teacher";
       public          postgres    false    228    224    4747            �           2606    17870    MeetingRoomT Teacher    FK CONSTRAINT     |   ALTER TABLE ONLY public."MeetingRoomT"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 B   ALTER TABLE ONLY public."MeetingRoomT" DROP CONSTRAINT "Teacher";
       public          postgres    false    228    4747    222            �           2606    17875    MeetingRoomS s    FK CONSTRAINT     t   ALTER TABLE ONLY public."MeetingRoomS"
    ADD CONSTRAINT s FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 :   ALTER TABLE ONLY public."MeetingRoomS" DROP CONSTRAINT s;
       public          postgres    false    226    221    4743            .   �   x�5��m1��3�Z�Ž����#ɿ?�� ���=sl[9��>�k+X�4/SbX^�@���jKɴ�o]�?�?�!׊��x�s��¹d��8I>���6���K @*S~H��Cz�N�ꑶ,"Z�5��Y`����uu��$�GCn`v�d>����R;G��V�#mw���o�ɦ��{}H�����M����5��WW��q���b��tn�jz������`c�      /   X   x�s440�4� Ð�ɎC]C.GC#��a��dW���H�&a��i�k�0�I��u<�=�P�$a
� 1��FM1�5����� |��      0   T   x�30�|�n��uӟ���t���3qq>]2����0�1����϶�=*��5�|ѹ�ٜ�Ov��X�hL�*F��� �I9`      1   �   x�M�]j�@���,F&��ֽ��!(�Q�>$!/��mJ���d~��^3�y���;��^��l�J��v�� �F<��=0��,�߭�jlS�<uP �:��T�vf7s��e1Ł��^/��W��Y���-'�1je����\3o�&b��@.	��*}�\���.(�ܢ6�J�>{�D�(/��ͩR�-��,IY���s�5OM�&v%hwP��.�I���72a]B�cwE��9      2   A   x�5���0�w���G�H�_���9G�C��1��E��9Zc=O���?Kr�&z�xo ,Jx      3   D   x�5̹�@B�x�e=��u���L���#�	��8��s%,�����T+e镴�Jc��;:��> >:�v      4   L   x�U��	�PD���^"���E:��:���r3���yKLyQR°�l���%M)	���N��|����� 7��N      5   N   x�M���0�s=Le4�.����H=a����09R���� ~j�8JR�	},�$mY��||������\���      6   �   x�m��N1����aș��w�a�n�$B"����q₧��ַ�딥����B
�(ty�ى'J��.�*�Lr>�f �5E#"i?�<[���~���L�?%u!#bH.mV�p�����g����������ڈ���V]��:��5�����;��M��|��i6�廻�q�h��|g>w0������w�*�+��y����>����ۖ����      7     x�m�[r�0D�oXL��Ï�d���d,j���EZ6������W;W��-�L�VL��a�6avAnW��3+�C>=�)��l��[0���z���k==Z1S0s��N����yH?��z$;�M!g`�l���բ���ٞ��@N�fl�MXo��j�_�Y:�H&`
f`6��G��]sq��2{d�)�����	�`�]sO�I=�	�r9�܀܄������~�zd;=�)��9� ������<<nS�d�0k�s�6��k�������
PS      8   K  x�]�An7F��S��H�w��sdI]�.�k��uw#F����ڷ(���j��<~��r<��ZGh+��.E%WwvZmTAʥYșp��ӫ5m&e�����O�����)�'<�1-(�+�˨��\`���,ֱ۪MkӇ�	��4��ޅ���^����?8n8�Y�B�M�r�f��jfΝ�h�D�6�̩\E�����p�����7��77|��$ƑL���w��AqP����m�
�b��A�Z��9�cg�Z����q��g8m8'���!f�P��bc�iX��@W�c��]۬�m8�����W��X�l8m��EG�N���cǾr^�$N�3jqY=`R�X�}�?�Q9E,�/���/ۼ&�<*A���r����I3�xq$��K�b�:Xd���//������6/��[�#����C�c�WH����%�	��^�
Y,�{�i�D����q��3<���5�G�'D�eEhH�a�̪H�qhT� ��J�h��Y�C�������?ߙ��;��b	�2�ηh�Y\��Jˢ��ӚY�:� ���/%���_>>]��ΜO?�p:��Ȕ7      9   U   x�5ι�0C��&}{��?GL)T���Bp�=�C�!��jXe6YK��zX��HcN���-�Jcn���I��������P"3      :   P  x�U���^7����X�%[�ҍd������.�!�e �!��i���w:���L����{t�d��@��I������pn��e��K�}��\�
�!4hz�.]��t|��|{����p�>O9e8�8�ua硵���b�=W��3Vͺ���}��6��N׍Z�{uy�ܤ������w�����%͖r��ڑ��Z�MU�����)��<�Pcђ�G�(���|q��2}��o�5�R�cn����2���mR_.L��[|`Yj�6�9T���?~<����|���T��@����1�꘨*���F(5�%�l�M�l�u8�������#g�_6;É�K/�d[�Lhh+�%�#[#��,f�"nX��b��yI����ٛG�lx��[bZH����6	"��V$S��"b��g��$��'x:~�����G����{2��I�C�Ckc�W�^ְ(В�b�qT�S�����W�/O�ߙͧ-^�x4{Bt�W4��m)�l��9�.�
��=*�2F��C��o���)}w�6�SN�5ԛXd��ߣ:��Xm՞Y`�w�JmDT�\ԇ�0lD�/7��Ϗv�N?�p:���A'�     