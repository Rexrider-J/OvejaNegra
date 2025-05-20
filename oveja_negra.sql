CREATE DATABASE  IF NOT EXISTS `oveja_negra` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `oveja_negra`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: oveja_negra
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `contraseña` varchar(20) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `unq_dni_nombre_apellido` (`dni`, `nombre`, `apellido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `puesto` varchar(50) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `id_local` int(11) NOT NULL,
  PRIMARY KEY (`id_empleado`),
  UNIQUE KEY `dni` (`dni`),
  KEY `id_local` (`id_local`),
  UNIQUE KEY `unq_dni_nombre_apellido` (`dni`, `nombre`, `apellido`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_local`) REFERENCES `locales` (`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locales`
--

DROP TABLE IF EXISTS `locales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locales` (
  `id_local` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL UNIQUE,
  `direccion` varchar(255) NOT NULL UNIQUE,
  `telefono` varchar(20) DEFAULT NULL UNIQUE,
  `estado_disponibilidad` ENUM('disponible', 'no disponible') NOT NULL,
  PRIMARY KEY (`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locales`
--

LOCK TABLES `locales` WRITE;
/*!40000 ALTER TABLE `locales` DISABLE KEYS */;
/*!40000 ALTER TABLE `locales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `ruta_imagen` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local_menu`
--

DROP TABLE IF EXISTS `local_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local_menu` (
  `id_local_menu` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `id_menu` INT(11) NOT NULL,
  `id_local` INT(11) NOT NULL,
  `estado_disponibilidad` ENUM('disponible', 'no disponible') NOT NULL,
  FOREIGN KEY (`id_menu`) REFERENCES `menu`(`id_menu`),
  FOREIGN KEY (`id_local`) REFERENCES `locales`(`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

LOCK TABLES `local_menu` WRITE;
/*!40000 ALTER TABLE `local_menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `local_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id_mesa` int(11) NOT NULL AUTO_INCREMENT,
  `id_local` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `cupo_maximo` int(2) not null,
  `estado`ENUM('habilitada', 'deshabilitada') NOT NULL,
  PRIMARY KEY (`id_mesa`),
  KEY `id_local` (`id_local`),
  CONSTRAINT `mesas_ibfk_1` FOREIGN KEY (`id_local`) REFERENCES `locales` (`id_local`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) not NULL,
  `id_mesa` int(11) NOT NULL,
  `fecha_reserva` datetime NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `fecha_modificacion_cancelacion` datetime DEFAULT NULL,
  `cant_personas` int(2) NOT NULL,
  `id_estado_reserva` int(11) NOT NULL,
  `modificado_cancelado_por` int(11) DEFAULT NULL,
  `tipo_modificado_cancelado` ENUM('cliente', 'empleado', 'administrador') DEFAULT NULL,
  `cambio_mesa` int(11) DEFAULT NULL, -- Ahora es INT y puede ser NULL
  PRIMARY KEY (`id_reserva`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_mesa` (`id_mesa`),
  KEY `id_estado_reserva` (`id_estado_reserva`),
  KEY `cambio_mesa` (`cambio_mesa`), -- Índice nuevo para la FK
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`),
  CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`id_estado_reserva`) REFERENCES `estado_reserva` (`id_estado_reserva`),
  CONSTRAINT `reservas_ibfk_4` FOREIGN KEY (`cambio_mesa`) REFERENCES `mesas` (`id_mesa`) -- Nueva clave foránea
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'oveja_negra'
--


DROP TABLE IF EXISTS `empleado_funcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado_funcion` (
  `id_empleado_funcion` int(11) NOT NULL AUTO_INCREMENT,
  `dia_hora` datetime NOT NULL,
  `funcion` ENUM('Mozo', 'Caja', 'Limpieza', 'Gerente','Subgerente') NOT NULL,
  `id_empleado` int(11) NOT NULL,
  PRIMARY KEY (`id_empleado_funcion`),
  KEY `id_empleado` (`id_empleado`),
  UNIQUE KEY unq_funcion_empleado_hora (id_empleado, dia_hora),
  CONSTRAINT `empleado_funcion_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `estado_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_reserva` (
  `id_estado_reserva` int(11) NOT NULL AUTO_INCREMENT,
  `estados` ENUM('cancelada', 'realizada/concretada', 'realizada/anulada', 'reservada') NOT NULL,
  PRIMARY KEY (`id_estado_reserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*DATOS DE LA TABLA

INSERT INTO locales (nombre, direccion, telefono, estado_disponibilidad)
VALUES ("Oveja Negra Chacabuco", "Emilio Mitre 1296", "+54 9 11 2176-9555","disponible");
-- Tabla: administradores

-- Tabla: clientes
INSERT INTO `clientes` (`nombre`, `apellido`, `dni`, `mail`, `telefono`, `fecha_nacimiento`, `contraseña`) VALUES
('Carlos', 'Lopez', 12345678, 'carloslopez@example.com', '1122334455', '1990-05-20', 'carlos123'),
('Lucía', 'Martinez', 87654321, 'luciamartinez@example.com', '5566778899',  '1988-11-15', 'lucia456');

-- Tabla: empleados
INSERT INTO `empleados` (`nombre`, `apellido`, `dni`, `mail`, `puesto`, `contraseña`, `id_local`) VALUES
('Pedro', 'Fernandez', 22334455, 'pedrofernandez@example.com', 'Mozo', 'mozo123', 1),
('Ana', 'Suarez', 99887766, 'anasuarez@example.com', 'Caja', 'asuarez', 2);

-- Tabla: menu
INSERT INTO `menu` (`nombre`, `precio`, `categoria`, `descripcion`) VALUES
('Hamburguesa Especial', 1500.00, 'Comida', 'Hamburguesa completa con papas'),
('Pizza Margarita', 1800.00, 'Comida', 'Pizza con mozzarella, tomate y albahaca');

-- Tabla: mesas
INSERT INTO `mesas` (`id_local`, `descripcion`, `cupo_maximo`, `estado`) VALUES
(1, 'Mesa cerca de la ventana', 4, 'habilitada'),
(2, 'Mesa en la terraza', 6, 'habilitada');

-- Tabla: estado_reserva
INSERT INTO `estado_reserva` (`estados`) VALUES
('reservada'),
('cancelada');

-- Tabla: reservas
INSERT INTO `reservas` (`id_cliente`, `id_mesa`, `fecha_reserva`, `observaciones`, `fecha_modificacion_cancelacion`, `cant_personas`, `id_estado_reserva`, `modificado_cancelado_por`, `tipo_modificado_cancelado`, `cambio_mesa`) VALUES
(1, 1, '2025-05-01 20:00:00', 'Mesa junto a la ventana', NULL, 4, 1, 1, 'cliente', NULL),
(2, 2, '2025-05-02 21:30:00', 'Cumpleaños', NULL, 6, 1, 2, 'empleado', NULL);

-- Tabla: empleado_funcion
INSERT INTO `empleado_funcion` (`dia_hora`, `funcion`, `id_empleado`) VALUES
('2025-05-01 18:00:00', 'Mozo', 1),
('2025-05-02 19:00:00', 'Caja', 2),
--('2025-05-02 19:00:00', 'Caja', 2),('2025-05-02 19:00:00', 'Mozo', 2),
('2025-05-02 18:00:00', 'Caja', 2);

INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES
(1, 1, 'disponible'),
(1, 2, 'no disponible'),
(2, 1, 'disponible'),
(2, 2, 'disponible');
*/
--
-- Dumping routines for database 'oveja_negra'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


