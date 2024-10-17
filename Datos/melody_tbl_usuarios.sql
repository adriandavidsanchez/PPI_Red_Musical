-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: melody
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_usuarios`
--

DROP TABLE IF EXISTS `tbl_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuarios` (
  `contacto` bigint NOT NULL,
  `contrasenia` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fecha_subida_cancion` datetime(6) NOT NULL,
  `imagen_usuario` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `id_usuario_genero` bigint DEFAULT NULL,
  PRIMARY KEY (`contacto`),
  UNIQUE KEY `UK8qp3fnpuv1qx97rn5ns7qhj8g` (`email`),
  KEY `FK5q38057vxv9fgjohckvvk2cic` (`id_usuario_genero`),
  CONSTRAINT `FK5q38057vxv9fgjohckvvk2cic` FOREIGN KEY (`id_usuario_genero`) REFERENCES `tbl_generos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuarios`
--

LOCK TABLES `tbl_usuarios` WRITE;
/*!40000 ALTER TABLE `tbl_usuarios` DISABLE KEYS */;
INSERT INTO `tbl_usuarios` VALUES (3011111111,'HombresG123','HombresG@exemple.com','2024-09-30 23:18:43.854913','Hombre-g.jpg','Hombres G','cantautor',1),(3022222222,'WillieColon123','WillieColon@exemple.com','2024-09-30 23:03:41.493019','Willie-colon.jpg','Willie Colon','cantautor',2),(3033333333,'EneasPerdomo123','EneasPerdomo@exemple.com','2024-09-30 23:18:43.854913','EneasPerdomo.jpg','Eneas Perdomo','cantautor',3),(3044444444,'Michael123','Michael@exemple.com','2024-09-30 23:43:03.923606','Michael.jpg','Michael Jackson','cantautor',4),(3055555555,'Louis123','LouisArmstrong@exemple.com','2024-09-30 23:18:43.854913','LouisArmstrong.jpg','Louis Armstrong','cantautor',5),(3066666666,'Beethoven123','Beethoven@exemple.com','2024-09-30 23:18:43.854913','Beethoven.jpg','Beethoven','cantautor',6),(3077777777,'DaddyYankee123','DaddyYankee@exemple.com','2024-09-30 23:18:43.854913','DaddyYankee.jpg','Daddy Yankee','cantautor',7),(3088888888,'MCing123','MCing@exemple.com','2024-09-30 23:18:43.854913','MCing.jpg','MCing','cantautor',8),(3099999999,'CarlosGardel123','CarlosGardel@exemple.com','2024-09-30 23:18:43.854913','CarlosGardel.jpg','Carlos Gardel','cantautor',9),(3101010101,'DaftPunk123','DaftPunk@exemple.com','2024-09-30 23:18:43.854913','DaftPunk.jpg','Daft Punk','cantautor',10);
/*!40000 ALTER TABLE `tbl_usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-17  6:25:32
