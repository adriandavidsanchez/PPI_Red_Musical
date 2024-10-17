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
-- Table structure for table `tbl_comentario_cancion`
--

DROP TABLE IF EXISTS `tbl_comentario_cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_comentario_cancion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `calificacion` int NOT NULL,
  `comentario_cancion` varchar(1000) DEFAULT NULL,
  `fecha_comentario` datetime(6) NOT NULL,
  `id_cancion_comentario` bigint DEFAULT NULL,
  `id_usuario_comentario` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp8h4yhdm8inp6ydacosjy7nua` (`id_cancion_comentario`),
  KEY `FKgosrcg2mhga6fffrp0htl40ky` (`id_usuario_comentario`),
  CONSTRAINT `FKgosrcg2mhga6fffrp0htl40ky` FOREIGN KEY (`id_usuario_comentario`) REFERENCES `tbl_usuarios` (`contacto`),
  CONSTRAINT `FKp8h4yhdm8inp6ydacosjy7nua` FOREIGN KEY (`id_cancion_comentario`) REFERENCES `tbl_canciones` (`id_cancion`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_comentario_cancion`
--

LOCK TABLES `tbl_comentario_cancion` WRITE;
/*!40000 ALTER TABLE `tbl_comentario_cancion` DISABLE KEYS */;
INSERT INTO `tbl_comentario_cancion` VALUES (4,5,'Este es un comentario sobre la canción.','2024-10-15 17:00:00.000000',1,3022222222),(5,4,'Este es un comentario sobre la canción.','2024-10-15 17:00:00.000000',1,3011111111),(6,4,'Este es un comentario sobre la canción.','2024-10-15 17:00:00.000000',2,3033333333),(7,5,'hola prueba do2','2024-10-17 03:58:18.725000',2,3101010101),(8,1,'hola marca\n','2024-10-17 04:04:35.689000',2,3101010101),(9,5,'buena cancion xd','2024-10-17 04:34:16.311000',2,3101010101),(10,5,'hola amorcito','2024-10-17 04:40:35.548000',2,3101010101),(11,1,'cagada de cancion','2024-10-17 04:40:46.681000',2,3101010101);
/*!40000 ALTER TABLE `tbl_comentario_cancion` ENABLE KEYS */;
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
