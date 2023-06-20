--
-- PostgreSQL database dump
--

-- Dumped from database version 11.20
-- Dumped by pg_dump version 11.20

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: user; Type: TABLE; Schema: public; Owner: pgusr
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    city character varying NOT NULL,
    state character varying NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO pgusr;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: pgusr
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO pgusr;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pgusr
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: pgusr
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: pgusr
--

COPY public."user" (id, name, email, city, state, latitude, longitude, password, "createdAt", "updatedAt") FROM stdin;
1	Mohamed	rrrokhtar@gmail.com	Stevens Point	Wisconsin	44.5	-89.5	$2b$10$Yr.7sPrEKlaQ5jeZYXjZounE.Fyn9ADpXggycS/LWgDGjvNtLP9vq	2023-06-20 17:24:34.458609	2023-06-20 17:24:34.458609
2	example	example@example.com	San Francisco	California	37.8072792	-122.4780652	$2b$10$pjje3iz91XKLjIohNK/xee4weUDtmLUnkFh3fr/Dt7nl3SAjoDjVy	2023-06-20 22:43:45.508908	2023-06-20 22:43:45.508908
3	test	test@test.com	San Francisco	California	37.8072792	-122.4780652	$2b$10$jmk8Upac7XJS4SGO6DD03edGoRSoKqzqm032rDQx7GOvKAbhSeN7e	2023-06-20 22:49:17.405055	2023-06-20 22:49:17.405055
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pgusr
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: pgusr
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: pgusr
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- PostgreSQL database dump complete
--

