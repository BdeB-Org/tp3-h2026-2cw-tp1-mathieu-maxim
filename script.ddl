-- Généré par Oracle SQL Developer Data Modeler 24.3.1.351.0831
--   à :        2026-05-19 10:28:16 HAE
--   site :      Oracle Database 11g
--   type :      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE
--1. Table Client
CREATE TABLE Client 
    ( 
     client_id           NUMBER  NOT NULL , 
     client_nom          VARCHAR2 (150) , 
     client_email        VARCHAR2 (150) , 
     client_TypeDeMembre VARCHAR2 (150)
--  ERROR: VARCHAR2 size not specified (fixed)
                    
    ) 
;

ALTER TABLE Client 
    ADD CONSTRAINT Client_PK PRIMARY KEY ( client_id ) ;
--2. Table Commande
CREATE TABLE Commande 
    ( 
     commande_id            NUMBER  NOT NULL , 
     commande_MontantTotale INTEGER , 
     commande_date          DATE , 
     mode_recup             VARCHAR2 (150)  NOT NULL , 
     Client_client_id       NUMBER  NOT NULL 
    ) 
;

ALTER TABLE Commande 
    ADD CONSTRAINT Commande_PK PRIMARY KEY ( commande_id, Client_client_id ) ;
--3. Detail Commande
CREATE TABLE Detail_Commande 
    ( 
     quantite                                        INTEGER,
     Commande_commande_id                            NUMBER  NOT NULL , 
     Commande_Client_client_id                       NUMBER  NOT NULL , 
     Produit_produit_ID                              NUMBER  NOT NULL , 
--  ERROR: Column name length exceeds maximum allowed length(30) (FIXED) 
     Produit_GP_Alimentaire_ID NUMBER  NOT NULL 
    ) 
;

ALTER TABLE Detail_Commande 
    ADD CONSTRAINT Detail_Commande_PK PRIMARY KEY ( Commande_commande_id, Commande_Client_client_id, Produit_produit_ID, Produit_Groupe_Alimentaire_groupeAlimentaire_ID ) ;
--4. Table Groupe Alimentaiaire
CREATE TABLE Groupe_Alimentaire 
    ( 
     groupeAlimentaire_ID  NUMBER  NOT NULL , 
     groupeAlimentaire_nom VARCHAR2 (150) 
    ) 
;

ALTER TABLE Groupe_Alimentaire 
    ADD CONSTRAINT Groupe_Alimentaire_PK PRIMARY KEY ( groupeAlimentaire_ID ) ;
--5. Table Produit
CREATE TABLE Produit 
    ( 
     produit_ID                              NUMBER  NOT NULL , 
     produit_nom                             VARCHAR2 (150) , 
     produit_prix                            NUMBER , 
     produit_date_arr                        DATE , 
     produit_date_exp                        DATE , 
     produit_quantite                        INTEGER , 
     produit_origine                         VARCHAR2 (150) , 
--  ERROR: Column name length exceeds maximum allowed length(30) (FIXED) 
     Produit_GP_Alimentaire_ID NUMBER  NOT NULL 
    ) 
;

ALTER TABLE Produit 
    ADD CONSTRAINT Produit_PK PRIMARY KEY ( produit_ID, Groupe_Alimentaire_groupeAlimentaire_ID ) ;
--6. Table Commande
ALTER TABLE Commande 
    ADD CONSTRAINT Commande_Client_FK FOREIGN KEY ( Client_client_id) 
    REFERENCES Client 
    ( 
     client_id
    ) 
;

ALTER TABLE Detail_Commande 
    ADD CONSTRAINT Detail_Commande_Commande_FK FOREIGN KEY 
    ( 
     Commande_commande_id,
     Commande_Client_client_id
    ) 
    REFERENCES Commande 
    ( 
     commande_id,
     Client_client_id
    ) 
;

ALTER TABLE Detail_Commande 
    ADD CONSTRAINT Detail_Commande_Produit_FK FOREIGN KEY 
    ( 
     Produit_produit_ID,
    Produit_GP_Alimentaire_ID
    ) 
    REFERENCES Produit 
    ( 
     produit_ID,
    Produit_GP_Alimentaire_ID
    ) 
;

ALTER TABLE Produit 
  ADD CONSTRAINT Produit_Groupe_Alimentaire_FK FOREIGN KEY ( Produit_GP_Alimentaire_ID ) 
    REFERENCES Groupe_Alimentaire ( groupeAlimentaire_ID)
    ;
    
    COMMIT;
    



-- Rapport récapitulatif d'Oracle SQL Developer Data Modeler : 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             0
-- ALTER TABLE                              9
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   4(FIXED)
-- WARNINGS                                 0git 