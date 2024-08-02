-- Table: public.mg_menu

-- DROP TABLE IF EXISTS public.mg_menu;

CREATE TABLE IF NOT EXISTS public.mg_menu
(
    menu_id integer NOT NULL,
    menu_nm character varying(100) COLLATE pg_catalog."default" NOT NULL,
    menu_url character varying(100) COLLATE pg_catalog."default",
    p_menu_id integer,
    menu_icon character varying(50) COLLATE pg_catalog."default",
    menu_desc character varying(200) COLLATE pg_catalog."default",
    menu_srt integer,
    enabled_flag character(1) COLLATE pg_catalog."default" NOT NULL DEFAULT 'Y'::bpchar,
    created_by integer NOT NULL,
    creation_date timestamp without time zone NOT NULL,
    last_updated_by integer NOT NULL,
    last_update_date timestamp without time zone NOT NULL,
    CONSTRAINT mg_menu_pk PRIMARY KEY (menu_id)
        USING INDEX TABLESPACE ts_smart
)

TABLESPACE ts_smart;

ALTER TABLE IF EXISTS public.mg_menu
    OWNER to admin;
-- Index: mg_menu_n1

-- DROP INDEX IF EXISTS public.mg_menu_n1;

CREATE INDEX IF NOT EXISTS mg_menu_n1
    ON public.mg_menu USING btree
    (p_menu_id ASC NULLS LAST)
    TABLESPACE ts_smart;

-- SEQUENCE: public.mg_menu_s

-- DROP SEQUENCE IF EXISTS public.mg_menu_s;

CREATE SEQUENCE IF NOT EXISTS public.mg_menu_s
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.mg_menu_s
    OWNER TO admin;


-- Table: public.mg_code

-- DROP TABLE IF EXISTS public.mg_code;

CREATE TABLE IF NOT EXISTS public.mg_code
(
    code_id integer NOT NULL,
    code character varying(30) COLLATE pg_catalog."default" NOT NULL,
    code_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    code_name_local character varying(100) COLLATE pg_catalog."default",
    code_desc character varying(200) COLLATE pg_catalog."default",
    order_seq integer,
    enabled_flag character(1) COLLATE pg_catalog."default" NOT NULL DEFAULT 'Y'::bpchar,
    created_by integer NOT NULL,
    creation_date timestamp without time zone NOT NULL,
    last_updated_by integer NOT NULL,
    last_update_date timestamp without time zone NOT NULL,
    CONSTRAINT mg_code_pk PRIMARY KEY (code_id)
        USING INDEX TABLESPACE mg_smart,
    CONSTRAINT mg_code_uk1 UNIQUE (code)
        USING INDEX TABLESPACE mg_smart
)

TABLESPACE mg_smart;

ALTER TABLE IF EXISTS public.mg_code
    OWNER to admin;


-- Table: public.mg_code_detail

-- DROP TABLE IF EXISTS public.mg_code_detail;

CREATE TABLE IF NOT EXISTS public.mg_code_detail
(
    code_detail_id integer NOT NULL,
    code_id integer NOT NULL,
    value character varying(20) COLLATE pg_catalog."default" NOT NULL,
    meaning character varying(300) COLLATE pg_catalog."default",
    description character varying(1000) COLLATE pg_catalog."default",
    order_seq integer,
    enabled_flag character(1) COLLATE pg_catalog."default" NOT NULL DEFAULT 'Y'::bpchar,
    attribute_01 character varying(100) COLLATE pg_catalog."default",
    attribute_02 character varying(100) COLLATE pg_catalog."default",
    attribute_03 character varying(100) COLLATE pg_catalog."default",
    created_by integer NOT NULL,
    creation_date timestamp without time zone NOT NULL,
    last_updated_by integer NOT NULL,
    last_update_date timestamp without time zone NOT NULL,
    CONSTRAINT mg_code_detail_pk PRIMARY KEY (code_detail_id)
        USING INDEX TABLESPACE mg_smart,
    CONSTRAINT mg_code_detail_uk1 UNIQUE (code_id, value)
        USING INDEX TABLESPACE mg_smart
)

TABLESPACE mg_smart;

ALTER TABLE IF EXISTS public.mg_code_detail
    OWNER to admin;
-- Index: mg_code_detail_n1

-- DROP INDEX IF EXISTS public.mg_code_detail_n1;

CREATE INDEX IF NOT EXISTS mg_code_detail_n1
    ON public.mg_code_detail USING btree
    (code_id ASC NULLS LAST)
    WITH (deduplicate_items=True)
    TABLESPACE mg_smart;