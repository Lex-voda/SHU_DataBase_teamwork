PGDMP              
        |            db    16.1    16.1 I    5           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            6           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            7           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            8           1262    16922    db    DATABASE     ?  CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Simplified)_China.936';
    DROP DATABASE db;
                postgres    false                        3079    17069    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                   false            9           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                        false    2            ?           1259    16923    Admin    TABLE     g   CREATE TABLE public."Admin" (
    "Ano" character varying(8) NOT NULL,
    "Akey" character varying
);
    DROP TABLE public."Admin";
       public         heap    postgres    false            :           0    0 
   TABLE "Admin"    COMMENT     6   COMMENT ON TABLE public."Admin" IS '绠＄悊鍛樹俊鎭?;
          public          postgres    false    216            ?           1259    16928 	   ClassRoom    TABLE     ?  CREATE TABLE public."ClassRoom" (
    "CRno" character varying(4) NOT NULL,
    "Cno" character varying(8),
    "Ctno" character varying(4),
    "CRtime" character varying(4) NOT NULL
);
    DROP TABLE public."ClassRoom";
       public         heap    postgres    false            ;           0    0    TABLE "ClassRoom"    COMMENT     =   COMMENT ON TABLE public."ClassRoom" IS '鏁欏瀹夋帓淇℃伅';
          public          postgres    false    217            ?           1259    16931    College    TABLE     y   CREATE TABLE public."College" (
    "Cono" character varying(2) NOT NULL,
    "Cname" character varying(100) NOT NULL
);
    DROP TABLE public."College";
       public         heap    postgres    false            <           0    0    TABLE "College"    COMMENT     6   COMMENT ON TABLE public."College" IS '瀛﹂櫌淇℃伅
';
          public          postgres    false    218            ?           1259    16934    Course    TABLE     ?  CREATE TABLE public."Course" (
    "Cno" character varying(8) NOT NULL,
    "Cname" character varying(100),
    "Credit" character varying(1),
    "Ctno" character varying(3),
    "Tno" character varying(8)
);
    DROP TABLE public."Course";
       public         heap    postgres    false            =           0    0    TABLE "Course"    COMMENT     4   COMMENT ON TABLE public."Course" IS '璇剧▼淇℃伅';
          public          postgres    false    219            ?           1259    16937    MeetingRoomA    TABLE     ?  CREATE TABLE public."MeetingRoomA" (
    "MRno" character varying(4) NOT NULL,
    "Ano" character varying(8),
    "MRtime" character varying(4) NOT NULL
);
 "   DROP TABLE public."MeetingRoomA";
       public         heap    postgres    false            >           0    0    TABLE "MeetingRoomA"    COMMENT     L   COMMENT ON TABLE public."MeetingRoomA" IS '浼氳瀹ら绾︾鐞嗗憳鎯呭喌';
          public          postgres    false    220            ?           1259    16940    MeetingRoomS    TABLE     ?  CREATE TABLE public."MeetingRoomS" (
    "MRno" character varying(4) NOT NULL,
    "Sno" character varying(8),
    "MRtime" character varying(4) NOT NULL
);
 "   DROP TABLE public."MeetingRoomS";
       public         heap    postgres    false            ?           0    0    TABLE "MeetingRoomS"    COMMENT     I   COMMENT ON TABLE public."MeetingRoomS" IS '浼氳瀹ら绾﹀鐢熸儏鍐?;
          public          postgres    false    221            ?           1259    16943    MeetingRoomT    TABLE     ?  CREATE TABLE public."MeetingRoomT" (
    "MRno" character varying(4) NOT NULL,
    "Tno" character varying(8),
    "MRtime" character varying(4) NOT NULL
);
 "   DROP TABLE public."MeetingRoomT";
       public         heap    postgres    false            @           0    0    TABLE "MeetingRoomT"    COMMENT     I   COMMENT ON TABLE public."MeetingRoomT" IS '浼氳瀹ら绾︽暀甯堟儏鍐?;
          public          postgres    false    222            ?           1259    16946    ProjMen    TABLE     t   CREATE TABLE public."ProjMen" (
    "Pno" character varying(8) NOT NULL,
    "Sno" character varying(8) NOT NULL
);
    DROP TABLE public."ProjMen";
       public         heap    postgres    false            A           0    0    TABLE "ProjMen"    COMMENT     8   COMMENT ON TABLE public."ProjMen" IS '椤圭洰闃熷憳琛?;
          public          postgres    false    223            ?           1259    16949    Project    TABLE     ?  CREATE TABLE public."Project" (
    "Pno" character varying(8) NOT NULL,
    "Pname" character varying(100),
    "Sno" character varying(8),
    "Tno" character varying(8)
);
    DROP TABLE public."Project";
       public         heap    postgres    false            B           0    0    TABLE "Project"    COMMENT     5   COMMENT ON TABLE public."Project" IS '椤圭洰鎯呭喌';
          public          postgres    false    224            ?           1259    16952    Scredit    TABLE     ?  CREATE TABLE public."Scredit" (
    "Sno" character varying(8) NOT NULL,
    "Cno" character varying(8) NOT NULL,
    "Pass" character varying(10)
);
    DROP TABLE public."Scredit";
       public         heap    postgres    false            C           0    0    TABLE "Scredit"    COMMENT     ;   COMMENT ON TABLE public."Scredit" IS '瀛﹀垎瀹屾垚鎯呭喌';
          public          postgres    false    225            ?           1259    16955    Student    TABLE     ?  CREATE TABLE public."Student" (
    "Sno" character varying(8) NOT NULL,
    "Skey" character varying,
    "Sname" character varying(100),
    "Grade" character varying(4),
    "Sgender" character varying(2),
    "Cono" character(2)
);
    DROP TABLE public."Student";
       public         heap    postgres    false            D           0    0    TABLE "Student"    COMMENT     5   COMMENT ON TABLE public."Student" IS '瀛︾敓淇℃伅';
          public          postgres    false    226            ?           1259    16960    Tcredit    TABLE     ?  CREATE TABLE public."Tcredit" (
    "Tno" character varying(8) NOT NULL,
    "Cno" character varying(8) NOT NULL,
    "Pass" character varying(1)
);
    DROP TABLE public."Tcredit";
       public         heap    postgres    false            E           0    0    TABLE "Tcredit"    COMMENT     ;   COMMENT ON TABLE public."Tcredit" IS '鏁欏垎瀹屾垚鎯呭喌';
          public          postgres    false    227            ?           1259    16963    Teacher    TABLE     ?  CREATE TABLE public."Teacher" (
    "Tno" character varying(8) NOT NULL,
    "Tkey" character varying,
    "Tname" character varying(100),
    "Tlevel" character varying(3),
    "Tgender" character varying(2),
    "Cono" character varying(2)
);
    DROP TABLE public."Teacher";
       public         heap    postgres    false            F           0    0    TABLE "Teacher"    COMMENT     5   COMMENT ON TABLE public."Teacher" IS '鏁欏笀淇℃伅';
          public          postgres    false    228            &          0    16923    Admin 
   TABLE DATA           0   COPY public."Admin" ("Ano", "Akey") FROM stdin;
    public          postgres    false    216            '          0    16928 	   ClassRoom 
   TABLE DATA           F   COPY public."ClassRoom" ("CRno", "Cno", "Ctno", "CRtime") FROM stdin;
    public          postgres    false    217            (          0    16931    College 
   TABLE DATA           4   COPY public."College" ("Cono", "Cname") FROM stdin;
    public          postgres    false    218            )          0    16934    Course 
   TABLE DATA           K   COPY public."Course" ("Cno", "Cname", "Credit", "Ctno", "Tno") FROM stdin;
    public          postgres    false    219            *          0    16937    MeetingRoomA 
   TABLE DATA           A   COPY public."MeetingRoomA" ("MRno", "Ano", "MRtime") FROM stdin;
    public          postgres    false    220            +          0    16940    MeetingRoomS 
   TABLE DATA           A   COPY public."MeetingRoomS" ("MRno", "Sno", "MRtime") FROM stdin;
    public          postgres    false    221            ,          0    16943    MeetingRoomT 
   TABLE DATA           A   COPY public."MeetingRoomT" ("MRno", "Tno", "MRtime") FROM stdin;
    public          postgres    false    222            -          0    16946    ProjMen 
   TABLE DATA           1   COPY public."ProjMen" ("Pno", "Sno") FROM stdin;
    public          postgres    false    223            .          0    16949    Project 
   TABLE DATA           A   COPY public."Project" ("Pno", "Pname", "Sno", "Tno") FROM stdin;
    public          postgres    false    224            /          0    16952    Scredit 
   TABLE DATA           9   COPY public."Scredit" ("Sno", "Cno", "Pass") FROM stdin;
    public          postgres    false    225            0          0    16955    Student 
   TABLE DATA           W   COPY public."Student" ("Sno", "Skey", "Sname", "Grade", "Sgender", "Cono") FROM stdin;
    public          postgres    false    226            1          0    16960    Tcredit 
   TABLE DATA           9   COPY public."Tcredit" ("Tno", "Cno", "Pass") FROM stdin;
    public          postgres    false    227            2          0    16963    Teacher 
   TABLE DATA           X   COPY public."Teacher" ("Tno", "Tkey", "Tname", "Tlevel", "Tgender", "Cono") FROM stdin;
    public          postgres    false    228            o           2606    16969    Admin Admin_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("Ano");
 >   ALTER TABLE ONLY public."Admin" DROP CONSTRAINT "Admin_pkey";
       public            postgres    false    216            q           2606    16971    ClassRoom ClassRoom_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."ClassRoom"
    ADD CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("CRno", "CRtime");
 F   ALTER TABLE ONLY public."ClassRoom" DROP CONSTRAINT "ClassRoom_pkey";
       public            postgres    false    217    217            s           2606    16973    College College_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."College"
    ADD CONSTRAINT "College_pkey" PRIMARY KEY ("Cono");
 B   ALTER TABLE ONLY public."College" DROP CONSTRAINT "College_pkey";
       public            postgres    false    218            u           2606    16975    Course Course_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("Cno");
 @   ALTER TABLE ONLY public."Course" DROP CONSTRAINT "Course_pkey";
       public            postgres    false    219            w           2606    16977    MeetingRoomA MeetingRoomA_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."MeetingRoomA"
    ADD CONSTRAINT "MeetingRoomA_pkey" PRIMARY KEY ("MRno", "MRtime");
 L   ALTER TABLE ONLY public."MeetingRoomA" DROP CONSTRAINT "MeetingRoomA_pkey";
       public            postgres    false    220    220            y           2606    16979    MeetingRoomS MeetingRoomS_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."MeetingRoomS"
    ADD CONSTRAINT "MeetingRoomS_pkey" PRIMARY KEY ("MRno", "MRtime");
 L   ALTER TABLE ONLY public."MeetingRoomS" DROP CONSTRAINT "MeetingRoomS_pkey";
       public            postgres    false    221    221            {           2606    16981    MeetingRoomT MeetingRoomT_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."MeetingRoomT"
    ADD CONSTRAINT "MeetingRoomT_pkey" PRIMARY KEY ("MRno", "MRtime");
 L   ALTER TABLE ONLY public."MeetingRoomT" DROP CONSTRAINT "MeetingRoomT_pkey";
       public            postgres    false    222    222            }           2606    16983    ProjMen ProjMen_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "ProjMen_pkey" PRIMARY KEY ("Pno", "Sno");
 B   ALTER TABLE ONLY public."ProjMen" DROP CONSTRAINT "ProjMen_pkey";
       public            postgres    false    223    223                       2606    16985    Project Project_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("Pno");
 B   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Project_pkey";
       public            postgres    false    224            ?           2606    16987    Scredit Scredit_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Scredit_pkey" PRIMARY KEY ("Sno", "Cno");
 B   ALTER TABLE ONLY public."Scredit" DROP CONSTRAINT "Scredit_pkey";
       public            postgres    false    225    225            ?           2606    16989    Student Student_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("Sno");
 B   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "Student_pkey";
       public            postgres    false    226            ?           2606    16991    Tcredit Tcredit_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Tcredit_pkey" PRIMARY KEY ("Cno", "Tno");
 B   ALTER TABLE ONLY public."Tcredit" DROP CONSTRAINT "Tcredit_pkey";
       public            postgres    false    227    227            ?           2606    16993    Teacher Teacher_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("Tno");
 B   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT "Teacher_pkey";
       public            postgres    false    228            ?           2606    16994    MeetingRoomA Admin 
   FK CONSTRAINT     x   ALTER TABLE ONLY public."MeetingRoomA"
    ADD CONSTRAINT "Admin" FOREIGN KEY ("Ano") REFERENCES public."Admin"("Ano");
 @   ALTER TABLE ONLY public."MeetingRoomA" DROP CONSTRAINT "Admin";
       public          postgres    false    220    216    4719            ?           2606    16999    Teacher College 
   FK CONSTRAINT     y   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT "College" FOREIGN KEY ("Cono") REFERENCES public."College"("Cono");
 =   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT "College";
       public          postgres    false    228    4723    218            ?           2606    17004    Student College 
   FK CONSTRAINT     y   ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "College" FOREIGN KEY ("Cono") REFERENCES public."College"("Cono");
 =   ALTER TABLE ONLY public."Student" DROP CONSTRAINT "College";
       public          postgres    false    226    4723    218            ?           2606    17009 
   Course Course 
   FK CONSTRAINT     u   ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 ;   ALTER TABLE ONLY public."Course" DROP CONSTRAINT "Course";
       public          postgres    false    228    219    4743            ?           2606    17014    Scredit Course 
   FK CONSTRAINT     u   ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");
 <   ALTER TABLE ONLY public."Scredit" DROP CONSTRAINT "Course";
       public          postgres    false    219    225    4725            ?           2606    17019    Tcredit Course 
   FK CONSTRAINT     u   ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");
 <   ALTER TABLE ONLY public."Tcredit" DROP CONSTRAINT "Course";
       public          postgres    false    4725    219    227            ?           2606    17024    ClassRoom Course 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."ClassRoom"
    ADD CONSTRAINT "Course" FOREIGN KEY ("Cno") REFERENCES public."Course"("Cno");
 >   ALTER TABLE ONLY public."ClassRoom" DROP CONSTRAINT "Course";
       public          postgres    false    4725    219    217            ?           2606    17029    ProjMen Project 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "Project" FOREIGN KEY ("Pno") REFERENCES public."Project"("Pno");
 =   ALTER TABLE ONLY public."ProjMen" DROP CONSTRAINT "Project";
       public          postgres    false    4735    223    224            ?           2606    17034    Scredit Student 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."Scredit"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 =   ALTER TABLE ONLY public."Scredit" DROP CONSTRAINT "Student";
       public          postgres    false    4739    226    225            ?           2606    17039    Project Student 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 =   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Student";
       public          postgres    false    224    226    4739            ?           2606    17044    ProjMen Student 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."ProjMen"
    ADD CONSTRAINT "Student" FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 =   ALTER TABLE ONLY public."ProjMen" DROP CONSTRAINT "Student";
       public          postgres    false    4739    223    226            ?           2606    17049    Tcredit Teacher 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."Tcredit"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 =   ALTER TABLE ONLY public."Tcredit" DROP CONSTRAINT "Teacher";
       public          postgres    false    227    4743    228            ?           2606    17054    Project Teacher 
   FK CONSTRAINT     w   ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 =   ALTER TABLE ONLY public."Project" DROP CONSTRAINT "Teacher";
       public          postgres    false    228    224    4743            ?           2606    17059    MeetingRoomT Teacher 
   FK CONSTRAINT     |   ALTER TABLE ONLY public."MeetingRoomT"
    ADD CONSTRAINT "Teacher" FOREIGN KEY ("Tno") REFERENCES public."Teacher"("Tno");
 B   ALTER TABLE ONLY public."MeetingRoomT" DROP CONSTRAINT "Teacher";
       public          postgres    false    228    4743    222            ?           2606    17064    MeetingRoomS s 
   FK CONSTRAINT     t   ALTER TABLE ONLY public."MeetingRoomS"
    ADD CONSTRAINT s FOREIGN KEY ("Sno") REFERENCES public."Student"("Sno");
 :   ALTER TABLE ONLY public."MeetingRoomS" DROP CONSTRAINT s;
       public          postgres    false    226    4739    221            &   ?  x?惿m1盼3?Z戒⑼龡#煽?悽 墬?sl[9??﹌+X?/SbX^籃箙﹋K纱卭]鐓???讑乓x俿访鹿d崁8I>嵊?埀桲 @*S~H?僀z?N掙懚,"Z?Y`杼?輚u?$僄Cn`v飀>€泭疪;GV?mw惏梠浬?羺{}H劆酠笍á5WW绎q及腷?豻n坖z靠搠?燻c?     '   X   x渟440?€ 脨笊?C]C.GC#?坅涅dW彙?H?&a昭i╧?両榾u<?跴?$a
?1寔FM1?鍔雁忖 |?€      (   T   x?0鋦眓狍u訜唾鮰聿?qq>]2砼0?珞蔟隙?*溞5醸压胭滜Ov艚X?hL聰?F弸? 癐9`      )   ?  x淢怾j翤厽?F&檳纸??(璔?$!/mJ亿蚫~?鏭3羪肩?囜淾纨l朖??v潅 糉<=0冑,圻jlS€<uP ?过T焩f7se1艁撪^/臻嘩哆Y?'?je?巴蔦3o?b火淍.	??}孿躞?(?堍6跩?{揇?/嘣桐R?,IY€气s?OM?v%hwP牧.窱??2a]B?cwE垖9      *   A   x?壬
€0纖?愖G奌鬫秳?G匔ㄦ1奏E碣9Zc=O幷?Kr?z?xo ,Jx      +   @   x?? 1霖鈘>0汤黴?x庐9?嗏釭F>IIZJ挅挃?瀂覗憯e$兓?s      ,   A   x?时?B?霣N??(L躏G誒W楃`悒鎶?慹"*?99?邰垉???      -   B   x?噬
 1厉R?_娨K#悧?傾2緗?&K!%i)?Iy4`s)搐-ZlW挶l??!?t      .   ?  x?蜬
?呩盰屲?麾bTきPkA
>@P阫`Q箥火?螚?r埲i椟莱+彅嶤^g?錎r:o刚 ?俓?.????0?薍'瞲琰鐰?x恥笭:疡婂Q紪ペ擸噘'€:B?實?当l?噳蓈遡谭?X珛t~瞋:锃Q慥N峰}豬?裪
!~}搎o      /     x渕襕r?D裲XL手脧絛肴d,j㈣駿Z6崙舟腙W;W窥-L甐L?蘟?6avAnW腠3+蠧>=???l漓[0猾絲鼩膋==Z1S0s?鸑?东舮H?瘣z$;鐟M!g`?l蚂壅鲶贋綐@N?fl€MXo來j馹閅:鱄&`
f`6愧G?筣sq窒2{d?樍瑑
?禶廬sO?I=??r9囓€軇?壅饪蟒~渮d;=?榿9?洶?壅?<nS廳?k恠?6?毂k钶沱刖??PS      0   K  x淽揂n7FS垽H墂閱dI]?乲磱uw#F廛沏诜(?偽j屴<~鷦r<愭猌Gh+／.E%WwvZmTA圣
Y葯p辶荧5m&eャ顝泔O轼蟑)?'<?-(?+?栓\`葡?郦直Mk訃?凹4敦迏哀過苓?8n8驜塎
?r梖綎jf螡膆罝?6程‐E嵅?螋p貊??7|珬$茟L骶歸AqP垑魃m?胋A蟌氈9籧g?Z荫q鼯g8m8'毱?!f廝抢bcX繊@W?c珠]郜渕8Η鳢廤楃X辧8m鴰EG奛ｋ楣c蔷r^?N?jqY=`R颴?}?臦9E,?/炨?/奂&釁<*A雸r??我I3穢q$辙K哹?Xd偋?/崆邋6/就[?#尝剮C璫?WH倓%?存^?Y,峽僫贒鱼屯q3<熱纪5〨?D卐EhH遖⑻狧誵hT?视J骽Y蒀乱耠趺?邫髥?敁b	锂2砦穐孻\J刷胞託Y?鈵 毟?/%魬巁>>]?螠O?:濥葦7      1   U   x?喂
?C掩&}{楈?GL)T躐繠p?螩?jXe6YK惆藌X?貶cN?胲-貸cn??買悃
佧樫銹"3      2   P  x淯摿奮7呑??[镆峝傧??潚.?衑 ?i茹黽:??扡镪{t?d锐@毇I牤尵尗pn钿e跹K畗热\??4hz?]巩t||{戭黳?O9e8?8?ua纭祼靡b?W橊3V秃?雯}6栕N讔Z簕uy苘ゃ廨蒿譿椷?蜄r茈€趹尰Z玀U潿皷?杼<c褣軬?烚箌q2}囥唎?盧榗n暡2?谪mR_.L叭[|`Yj??T悮?~<灲|仐
?蠤堮米1瓣槰*??F(5?苐覯鷏攗8︺眭?g俖6;脡翶/胐[甃hh+??[#旉?f?nX?禸?亂I钦脬贈G蝜x葩[bZH?ē?聣	"锠蘓$S??b潯gㄊ$儤'x:~獹卧
呤{2厬I怌嶤kc?W?^职(袙璪恽qT?Sコ?O櫷?^抶4{Bt橶4?秏)騦偉9??踮=*?F栤用o飪君)}w?颯N?詻Xd丙撸:Xm諡Y`﹚認mDT昞試?lD?7酉弙奛?:濥鯝'?    
