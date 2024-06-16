CREATE DATABASE agenda;
USE agenda;

CREATE TABLE categoria (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) UNIQUE NOT NULL,
  email varchar(150) NOT NULL,
  password varchar(50) NOT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE compromisso (
  id int NOT NULL AUTO_INCREMENT,
  id_usuario int NOT NULL,
  id_categoria int NOT NULL,
  titulo varchar(45)  NOT NULL,
  descricao text NOT NULL,
  data_inicio datetime NOT NULL,
  data_fim datetime NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_compromisso_categoria FOREIGN KEY (id_categoria) REFERENCES categoria (id),
  CONSTRAINT fk_compromisso_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE lembrete (
  id INT NOT NULL AUTO_INCREMENT,
  id_compromisso INT NOT NULL,
  data_notificacao DATETIME NOT NULL,
  som_notificacao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_lembrete_crompromisso FOREIGN KEY (id_compromisso) REFERENCES compromisso (id) 
  );

