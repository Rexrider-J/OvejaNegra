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
  `contrasena` varchar(20) NOT NULL,
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
  `puesto` ENUM('mozo', 'caja', 'Subgerente', 'Gerente') NOT NULL,
  `contrasena` varchar(20) NOT NULL,
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

-- DATOS DE LA TABLA

INSERT INTO locales (nombre, direccion, telefono, estado_disponibilidad) VALUES 
("Oveja Negra Caballito", "Bogotá 68", "+54 9 1148003415","disponible"),
("Oveja Negra Chacabuco", "Emilio Mitre 1296", "+54 9 11 2176-9555","disponible");

-- Tabla: clientes
INSERT INTO `clientes` (`nombre`, `apellido`, `dni`, `mail`, `telefono`, `fecha_nacimiento`, `contrasena`) VALUES
('Tom', 'Tom', 12345678, 'tom@tom.com', '1122334455', '1990-05-20', '1234'),
('Carlos', 'Lopez', 12345679, 'carloslopez@example.com', '1122334455', '1990-05-20', 'carlos123'),
('Julieta', 'Godoy', 50202020, 'julieta.g@hotmail.com', '1165825496', '1998-02-14', 'juli123'),
('Lucía', 'Martinez', 87654321, 'luciamartinez@example.com', '5566778899',  '1988-11-15', 'lucia456');

-- Tabla: empleados
INSERT INTO `empleados` (`nombre`, `apellido`, `dni`, `mail`, `puesto`, `contrasena`, `id_local`) VALUES
('Tom', 'Tom', 12345678, 'tom@tom.com', 'Mozo', '1234', 1),
('Pedro', 'Fernandez', 22334455, 'pedrofernandez@example.com', 'Mozo', 'mozo123', 1),
('Diego', 'De la Vega', 45202020, 'diegodelavega@admin.com', 'Gerente', '123', 1),
('Bernardo', 'El Mudo', 45101010, 'bernardo.m@admin.com', 'Subgerente', '123', 1),
('Ana', 'Suarez', 99887766, 'anasuarez@example.com', 'Caja', 'asuarez', 2);

-- Tabla: mesas
INSERT INTO `mesas` (`id_local`, `descripcion`, `cupo_maximo`, `estado`) VALUES
(1, 'Mesa 1', 6, 'habilitada'),
(1, 'Mesa 2', 6, 'habilitada'),
(1, 'Mesa 3', 6, 'habilitada'),
(1, 'Mesa 4', 2, 'habilitada'),
(1, 'Mesa 5', 2, 'habilitada'),
(1, 'Mesa 6', 4, 'habilitada'),
(1, 'Mesa 1A', 8, 'habilitada'),
(1, 'Mesa 2A', 8, 'habilitada'),
(1, 'Mesa 3A', 8, 'habilitada'),
(1, 'Mesa 4A', 8, 'habilitada'),
(2, 'Mesa 1', 6, 'habilitada'),
(2, 'Mesa 2', 6, 'habilitada'),
(2, 'Mesa 3', 6, 'habilitada'),
(2, 'Mesa 4', 2, 'habilitada'),
(2, 'Mesa 5', 2, 'habilitada'),
(2, 'Mesa 6', 4, 'habilitada'),
(2, 'Mesa 1A', 8, 'habilitada'),
(2, 'Mesa 2A', 8, 'habilitada'),
(2, 'Mesa 3A', 8, 'habilitada'),
(2, 'Mesa 4A', 8, 'habilitada');

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
('2025-06-15 9:00:00', 'Caja', 1), 
('2025-06-15 12:00:00', 'Limpieza', 1), 
('2025-06-17 9:00:00', 'Caja', 1),  
('2025-06-17 19:00:00', 'Gerente', 4),  
('2025-06-16 19:00:00', 'Subgerente', 6), 
('2025-06-15 19:00:00', 'Caja', 6), 
('2025-06-15 10:00:00', 'Suberente', 6),; 

INSERT INTO local_menu (id_menu, id_local, estado_disponibilidad) VALUES
(1, 1, 'disponible'),
(2, 1, 'disponible'),
(3, 1, 'disponible'),
(4, 1, 'disponible'),
(5, 1, 'disponible'),
(6, 1, 'disponible'),
(7, 1, 'disponible'),
(8, 1, 'disponible'),
(9, 1, 'disponible'),
(10, 1, 'disponible'),
(11, 1, 'disponible'),
(12, 1, 'disponible'),
(13, 1, 'disponible'),
(14, 1, 'disponible'),
(15, 1, 'disponible'),
(16, 1, 'disponible'),
(17, 1, 'disponible'),
(18, 1, 'disponible'),
(19, 1, 'disponible'),
(20, 1, 'disponible'),
(21, 1, 'disponible'),
(22, 1, 'disponible'),
(23, 1, 'disponible'),
(24, 1, 'disponible'),
(25, 1, 'disponible'),
(26, 1, 'disponible'),
(27, 1, 'disponible'),
(28, 1, 'disponible'),
(29, 1, 'disponible'),
(30, 1, 'disponible'),
(31, 1, 'disponible'),
(32, 1, 'disponible'),
(33, 1, 'disponible'),
(34, 1, 'disponible'),
(35, 1, 'disponible'),
(36, 1, 'disponible'),
(37, 1, 'disponible'),
(38, 1, 'disponible'),
(39, 1, 'disponible'),
(40, 1, 'disponible'),
(41, 1, 'disponible'),
(42, 1, 'disponible'),
(43, 1, 'disponible'),
(44, 1, 'disponible'),
(45, 1, 'disponible'),
(46, 1, 'disponible'),
(47, 1, 'disponible'),
(48, 1, 'disponible'),
(49, 1, 'disponible'),
(50, 1, 'disponible'),
(51, 1, 'disponible'),
(52, 1, 'disponible'),
(53, 1, 'disponible'),
(54, 1, 'disponible'),
(55, 1, 'disponible'),
(56, 1, 'disponible'),
(57, 1, 'disponible'),
(58, 1, 'disponible'),
(59, 1, 'disponible'),
(60, 1, 'disponible'),
(61, 1, 'disponible'),
(62, 1, 'disponible'),
(63, 1, 'disponible'),
(64, 1, 'disponible'),
(65, 1, 'disponible'),
(66, 1, 'disponible'),
(67, 1, 'disponible'),
(68, 1, 'disponible'),
(69, 1, 'disponible'),
(70, 1, 'disponible'),
(71, 1, 'disponible'),
(72, 1, 'disponible'),
(73, 1, 'disponible'),
(74, 1, 'disponible'),
(75, 1, 'disponible'),
(76, 1, 'disponible'),
(77, 1, 'disponible'),
(78, 1, 'disponible'),
(79, 1, 'disponible'),
(80, 1, 'disponible'),
(81, 1, 'disponible'),
(82, 1, 'disponible'),
(83, 1, 'disponible'),
(84, 1, 'disponible'),
(85, 1, 'disponible'),
(86, 1, 'disponible'),
(87, 1, 'disponible'),
(88, 1, 'disponible'),
(89, 1, 'disponible'),
(90, 1, 'disponible'),
(91, 1, 'disponible'),
(92, 1, 'disponible'),
(93, 1, 'disponible'),
(94, 1, 'disponible'),
(95, 1, 'disponible'),
(96, 1, 'disponible'),
(97, 1, 'disponible'),
(98, 1, 'disponible'),
(99, 1, 'disponible'),
(100, 1, 'disponible'),
(101, 1, 'disponible'),
(102, 1, 'disponible'),
(103, 1, 'disponible'),
(104, 1, 'disponible'),
(105, 1, 'disponible'),
(106, 1, 'disponible'),
(107, 1, 'disponible'),
(108, 1, 'disponible'),
(109, 1, 'disponible'),
(110, 1, 'disponible'),
(111, 1, 'disponible'),
(1, 2, 'no disponible'),
(2, 2, 'disponible'),
(3, 2, 'disponible'),
(4, 2, 'disponible'),
(5, 2, 'disponible'),
(6, 2, 'no disponible'),
(7, 2, 'disponible'),
(8, 2, 'disponible'),
(9, 2, 'disponible'),
(10, 2, 'disponible'),
(11, 2, 'disponible'),
(12, 2, 'no disponible'),
(13, 2, 'disponible'),
(14, 2, 'disponible'),
(15, 2, 'disponible'),
(16, 2, 'no disponible'),
(17, 2, 'disponible'),
(18, 2, 'disponible'),
(19, 2, 'disponible'),
(20, 2, 'no disponible'),
(21, 2, 'disponible'),
(22, 2, 'disponible'),
(23, 2, 'disponible'),
(24, 2, 'no disponible'),
(25, 2, 'disponible'),
(26, 2, 'disponible'),
(27, 2, 'disponible'),
(28, 2, 'no disponible'),
(29, 2, 'disponible'),
(30, 2, 'no disponible'),
(31, 2, 'disponible'),
(32, 2, 'no disponible'),
(33, 2, 'disponible'),
(34, 2, 'disponible'),
(35, 2, 'disponible'),
(36, 2, 'disponible'),
(37, 2, 'no disponible'),
(38, 2, 'disponible'),
(39, 2, 'disponible'),
(40, 2, 'disponible'),
(41, 2, 'no disponible'),
(42, 2, 'disponible'),
(43, 2, 'disponible'),
(44, 2, 'disponible'),
(45, 2, 'disponible'),
(46, 2, 'disponible'),
(47, 2, 'disponible'),
(48, 2, 'no disponible'),
(49, 2, 'disponible'),
(50, 2, 'disponible'),
(51, 2, 'disponible'),
(52, 2, 'disponible'),
(53, 2, 'disponible'),
(54, 2, 'disponible'),
(55, 2, 'disponible'),
(56, 2, 'no disponible'),
(57, 2, 'disponible'),
(58, 2, 'disponible'),
(59, 2, 'disponible'),
(60, 2, 'disponible'),
(61, 2, 'disponible'),
(62, 2, 'disponible'),
(63, 2, 'disponible'),
(64, 2, 'disponible'),
(65, 2, 'disponible'),
(66, 2, 'disponible'),
(67, 2, 'disponible'),
(68, 2, 'no disponible'),
(69, 2, 'no disponible'),
(70, 2, 'disponible'),
(71, 2, 'disponible'),
(72, 2, 'disponible'),
(73, 2, 'disponible'),
(74, 2, 'disponible'),
(75, 2, 'disponible'),
(76, 2, 'disponible'),
(77, 2, 'disponible'),
(78, 2, 'no disponible'),
(79, 2, 'no disponible'),
(80, 2, 'disponible'),
(81, 2, 'disponible'),
(82, 2, 'disponible'),
(83, 2, 'disponible'),
(84, 2, 'disponible'),
(85, 2, 'disponible'),
(86, 2, 'disponible'),
(87, 2, 'no disponible'),
(88, 2, 'disponible'),
(89, 2, 'disponible'),
(90, 2, 'disponible'),
(91, 2, 'disponible'),
(92, 2, 'disponible'),
(93, 2, 'disponible'),
(94, 2, 'no disponible'),
(95, 2, 'disponible'),
(96, 2, 'disponible'),
(97, 2, 'disponible'),
(98, 2, 'no disponible'),
(99, 2, 'no disponible'),
(100, 2, 'disponible'),
(101, 2, 'disponible'),
(102, 2, 'disponible'),
(103, 2, 'disponible'),
(104, 2, 'disponible'),
(105, 2, 'no disponible'),
(106, 2, 'disponible'),
(107, 2, 'disponible'),
(108, 2, 'disponible'),
(109, 2, 'disponible'),
(110, 2, 'disponible'),
(111, 2, 'disponible');

INSERT INTO `menu` (`nombre`, `precio`, `categoria`, `descripcion`, `ruta_imagen`) VALUES
('Expresso', 2500.00, 'Cafeteria', 'Café corto y concentrado con sabor intenso, preparado con granos finamente molidos.', 'img/Fotos/menu/Cafeteria/Espresso.jpg'),
('Cortado en jarrito', 2700.00, 'Cafeteria', 'Café expresso suavizado con un toque de leche caliente, servido en jarrito para conservar su temperatura.', 'img/Fotos/menu/Cafeteria/CortadoJarrito.jpg'),
('Café en jarrito', 2700.00, 'Cafeteria', 'Café negro, con mayor volumen que un espresso y con un sabor intenso con aroma tentador.', 'img/Fotos/menu/Cafeteria/CafeJarrito.jpg'),
('Café en jarrito con crema', 3100.00, 'Cafeteria', 'Café negro servido en jarrito, coronado con una capa suave de crema de leche, que equilibra el sabor intenso del café con una textura cremosa.', 'img/Fotos/menu/Cafeteria/CafeJarritoCrema.jpg'),
('Café con leche/Latte/Cappucchino/Té', 3500.00, 'Cafeteria', 'Combinación de café espresso y abundante leche caliente, té ideal para quienes prefieren un sabor suave y equilibrado.', 'img/Fotos/menu/Cafeteria/Cappuccino.webp'),
('Café con leche XL', 4700.00, 'Cafeteria', 'Versión extra grande del clásico café con leche, ideal para quienes disfrutan de una taza más generosa con sabor suave y reconfortante.', 'img/Fotos/menu/Cafeteria/cafeConLecheXL.jpg'),
('Leche chocolatada/Submarino', 3500.00, 'Cafeteria', 'Leche caliente acompañada con una barra de chocolate que se derrite en la taza, creando una bebida intensa y deliciosa', 'img/Fotos/menu/Cafeteria/lecheChocolatada.jpg'),
('Cappucchino italiano/Caramel macchiato/Mocha', 4700.00, 'Cafeteria', 'Café con leche vaporizada, un toque de vainilla y decorado con suave jarabe de caramelo.', 'img/Fotos/menu/Cafeteria/CaramelMacchiato.png'),
('Café doble', 3900.00, 'Cafeteria', 'Doble shot de espresso para un sabor más intenso y mayor carga de cafeína, ideal para quienes necesitan un extra de energía','img/Fotos/menu/Cafeteria/cafeDoble.jpg'),
('Jugo de naranja', 3200.00, 'Cafeteria', 'Jugo natural exprimido de naranjas frescas, refrescante y lleno de vitamina C, ideal para cualquier momento del día', 'img/Fotos/menu/Cafeteria/JugoDeNaranja.webp'),
('Licuado de banana', 3300.00, 'Cafeteria', 'Bebida cremosa y energética elaborada con banana, leche y un toque de azúcar, ideal para desayunos o meriendas.', 'img/Fotos/menu/Cafeteria/licuadoBanana.png'),
('Licuado de frutos rojos/frutillar', 4100.00, 'Cafeteria', 'Refrescante mezcla de frutas rojas como frutilla, arándano y frambuesa, licuadas con leche o agua, ideal para una bebida natural y antioxidante.', 'img/Fotos/menu/Cafeteria/licuadoFrutosRojos.png'),
('Limonada de menta y jengibre', 5000.00, 'Cafeteria', 'Refrescante limonada natural con un toque de menta fresca y jengibre', 'img/Fotos/menu/Cafeteria/limonadaMentaJengibre.png'),
('Jarra Jugo detox(manzana,zanahoria,ananá y jengibre)', 6000.00, 'Cafeteria', 'Mezcla saludable y revitalizante de manzana, zanahoria, ananá y jengibre, ideal para limpiar el organismo y brindar energía natural.', 'img/Fotos/menu/Cafeteria/jugoDetox.png'),
('Yogurt natural con frutos rojos y granola', 3300.00, 'Cafeteria', 'Yogurt natural cremoso acompañado de frutos rojos frescos y una crujiente granola, perfecto para un desayuno saludable y lleno de energía.', 'img/Fotos/menu/Cafeteria/yogurtGranola.png'),

('Medialuna', 1400.00, 'Panaderia', 'Panecillo hojaldrado de origen francés, con forma de media luna, crujiente por fuera y suave por dentro. ', 'img/Fotos/menu/Panaderia/medialuna.png'),
('Medialuna con dulce de leche', 2000.00, 'Panaderia', 'Clásica media luna hojaldrada, rellena con cremoso dulce de leche. Perfecta para acompañar el café o disfrutar como un dulce capricho.', 'img/Fotos/menu/Panaderia/medialunaDulcedeLeche.png'),
('Medialuna con nutella', 3000.00, 'Panaderia', 'Elaborado con masa hojaldrada que se caracteriza por su forma de media luna relleno con nutela, su textura crujiente por fuera y suave por dentro', 'img/Fotos/menu/Panaderia/medialunasNutella.jpg'),
('Medialuna de jamón y queso(2U)', 4300.00, 'Panaderia', 'Medialuna salada, rellena con jamón cocido y queso fundido. Crujiente por fuera y suave por dentro, ideal para un desayuno o merienda salada.', 'img/Fotos/menu/Panaderia/MedialunasJamonQueso.png'),
('Donut', 1500.00, 'Panaderia', 'Rosquilla esponjosa y glaseada, con un delicado sabor dulce. Perfecta para el desayuno, la merienda o simplemente para darse un gusto.', 'img/Fotos/menu/Panaderia/donut.jpg'),
('Budin de limón', 2800.00, 'Panaderia', 'Bizcocho húmedo y esponjoso con un toque cítrico de limón natural. Ideal para acompañar el té o el café, con un glaseado suave que realza su sabor.', 'img/Fotos/menu/Panaderia/budinLimon.png'),
('Tostadas(queso crema y mermelada)', 2500.00, 'Panaderia', 'Rebanadas de pan tostado servidas con suave queso crema y una generosa capa de mermelada frutal', 'img/Fotos/menu/Panaderia/tostadasMermelada.png'),
('Medio tostado de miga', 3800.00, 'Panaderia', 'Mitad de sándwich de pan de miga, tostado y relleno con jamón cocido y queso fundido. Ideal como snack liviano o acompañamiento.', 'img/Fotos/menu/Panaderia/medioTostadoMiga.jpg'),
('Tostado figazza', 1500.00, 'Panaderia', 'Sándwich tostado con pan tipo fugazza, relleno de jamón, queso y cebolla caramelizada. ', 'img/Fotos/menu/Panaderia/tostadoFigazza.png'),
('Tostado de miga', 7200.00, 'Panaderia', 'sándwich de pan de miga, relleno con jamón y queso, fresco y suave.', 'img/Fotos/menu/Panaderia/TostadoMiga.jpg'),
('Tostado oveja negra(jamón,queso,lechuga,tomate)', 9300.00, 'Panaderia', 'Sándwich tostado con jamón, queso, lechuga fresca y rodajas de tomate, en pan crujiente. Una opción completa y deliciosa para cualquier momento del día', 'img/Fotos/menu/Panaderia/tostadoOvejaNegra.jpg'),
('Tostado de Morrón(jamón,queso,morrón y huevo)', 9900.00, 'Panaderia', 'Sándwich tostado con jamón, queso, morrón y huevo, en pan crocante. Una combinación sabrosa y nutritiva para cualquier momento.', 'img/Fotos/menu/Panaderia/tostadoMorron.png'),
('Tostada con huevo revuelto', 5100.00, 'Panaderia', 'Rebanada de pan tostado cubierta con huevos revueltos cremosos. Un desayuno simple y nutritivo', 'img/Fotos/menu/Panaderia/tostadoHuevo.png'),
('Tostada con huevo revuelto y bacon', 6800.00, 'Panaderia', 'Rebanada de pan tostado cubierta con huevos revueltos cremosos y crujiente bacon.', 'img/Fotos/menu/Panaderia/tostadoHuevoBaicon.jpg'),
('Tostada con palta y huevo revuelto', 6200.00, 'Panaderia', 'Rebanada de pan tostado con cremoso puré de palta y huevos revueltos suaves.', 'img/Fotos/menu/Panaderia/tostadoPaltaHuevo.png'),

('Milkshake Chocolate/DDL/Frutilla/Vinilla', 5100.00, 'Milkshake', 'Bebida cremosa y refrescante elaborada con helado y leche, disponible en varios sabores: chocolate, dulce de leche, frutilla y vainilla.', 'img/Fotos/menu/Milkshakes/chocolateMilkshake.png'),
('Milkshake Oreo: Milkshake de vainillas,Oreos y chocolate rallado', 5900.00, 'Milkshake', 'Delicioso milkshake de helado de vainilla, galletas Oreo trituradas y chocolate rallado. Cremoso y lleno de sabor.', 'img/Fotos/menu/Milkshakes/milkshakeOreo.png'),
('Milshake Nutella: Milkshake de vainilla, nutella y chocolate rallado.', 6500.00, 'Milkshake', 'Delicioso milkshake de helado de vainilla, Nutella cremosa y chocolate rallado. Una mezcla irresistible para los amantes del chocolate y avellanas.', 'img/Fotos/menu/Milkshakes/milkshakeNutella.png'),
('Milkshake Oveja Negra: Milkshake de chocolate,rocklets y donut', 7100.00, 'Milkshake', 'Milkshake de helado de chocolate con rocklets y trozos de donut. Una explosión dulce y colorida.', 'img/Fotos/menu/Milkshakes/milkshakeRocklets.png'),
('Waffle dulce de leche', 4300.00, 'Waffles', 'Waffle dorado y crujiente cubierto con abundante dulce de leche. Un clásico irresistible para los amantes de lo dulce.', 'img/Fotos/menu/Waffles/waffleDDL.jpg'),
('Waffle dulce de leche y crema', 4800.00, 'Waffles', 'Waffle caliente y crujiente cubierto con dulce de leche y crema chantilly.', 'img/Fotos/menu/Waffles/waffleDDLCrema.jpg'),
('waffle nutella, frutos rojos y banana', 6500.00, 'Waffles', 'Waffle tibio cubierto con Nutella, rodajas de banana y frutos rojos frescos. Un postre equilibrado entre lo dulce, lo frutal y lo irresistible.', 'img/Fotos/menu/Waffles/waffleNutellaFrutosR.png'),
('Waffle helado y salsa a elección:Helado de Chocolate,DDL,Frutilla,Vainilla.chocolate', 6500.00, 'Waffles', 'Waffle tibio acompañado con una bocha de helado a elección (chocolate, dulce de leche, frutilla o vainilla) y bañado con salsa a gusto (chocolate, dulce de leche o caramelo).', 'img/Fotos/menu/Waffles/waffleHeladoSalsa.jpg'),
('Waffle de oreo: helado de vainilla, oreos y salsa de DDL', 9400.00, 'Waffles', 'Waffle tibio servido con helado de vainilla, trozos de galletas Oreo y bañado en salsa de dulce de leche. Un postre indulgente y lleno de sabor.', 'img/Fotos/menu/Waffles/waffleOreo.jpg'),
('Waffle de frutos rojos: Helado de vainilla, frutos rojos y salsa de chocolate', 9400.00, 'Waffles', 'Waffle tibio con helado de vainilla, frutos rojos frescos y un toque de salsa de chocolate. Un postre equilibrado entre lo dulce y lo frutal.', 'img/Fotos/menu/Waffles/wafflesFrutosRojos.png'),
('Waffle de nutella y helado: Helado de vainilla, salsa DDL', 12600.00, 'Waffles', 'Waffle tibio untado con Nutella, acompañado de helado de vainilla y bañado en salsa de dulce de leche. Una combinación irresistible para los amantes del chocolate.', 'img/Fotos/menu/Waffles/waffleNutellaHelado.png'),
('Waffle Oveja Negra: con helado de vainilla y DDL, rocklets, y salsa de chocolate.', 12600.00, 'Waffles', 'Waffle tibio con helado de vainilla y dulce de leche, cubierto con rocklets y bañado en salsa de chocolate. Colorido, cremoso y lleno de sabor.', 'img/Fotos/menu/Waffles/WaffleOvejaNegra.jpeg'),
('Waffle salado: jamón, queso, huevo y cheddar', 7400.00, 'Waffles', 'Waffle crujiente y salado, relleno con jamón, queso, huevo y un toque de queso cheddar fundido.', 'img/Fotos/menu/Waffles/wafflesSalados.png'),

('Aros de cebolla - Porción completa', 7100.00, 'Starters', 'Crujientes aros de cebolla empanizados y fritos, perfectos para acompañar cualquier comida o para disfrutar como snack.', 'img/Fotos/Menu/Starters/arosDeCebolla.png'),
('Aros de cebolla - 1/2 Porción', 4300.00, 'Starters', 'Crujientes aros de cebolla empanizados y fritos, perfectos para acompañar cualquier comida o para disfrutar como snack.', 'img/Fotos/Menu/Starters/arosDeCebolla.png'),
('Papas fritas - 1/2 Porción', 3900.00, 'Starters', 'Media porción de papas fritas bien crocantes', 'img/Fotos/Menu/Starters/PapasFritas.png'),
('Papas fritas - Porción completa', 6400.00, 'Starters', 'Porción completa de papas fritas bien corcantes', 'img/Fotos/Menu/Starters/PapasFritas.png'),
('Papas con cheddar y bacon - 1/2 Porción', 5700.00, 'Starters', 'Media porción de papas con cheddar y bacon', 'img/Fotos/Menu/Starters/PapasBaicon.png'),
('Papas con cheddar y bacon - Porción completa', 9500.00, 'Starters', 'Porción completa de papas con cheddar y bacon', 'img/Fotos/Menu/Starters/PapasBaicon.png'),
('Nuggets - 1/2 Porción', 3900.00, 'Starters', 'Media porción de nuggets', 'img/Fotos/Menu/Starters/Nuggets.png'),
('Nuggets - Porción completa', 6400.00, 'Starters', 'Porción completa de nuggets', 'img/Fotos/Menu/Starters/Nuggets.png'),

('Hamburguesa con queso - Junior 80gr.', 6300.00, 'Burgers', 'Carne, queso cheddar, salsa de cebolla, ketchup y mostaza', 'img/Fotos/Menu/Burgers/HamburguesaQueso.png'),
('Hamburguesa con queso - Doble Junior', 9000.00, 'Burgers', 'Carne, queso cheddar, salsa de cebolla, ketchup y mostaza', 'img/Fotos/Menu/Burgers/HamburguesaQueso.png'),
('Hamburguesa con queso - Premium 125gr.', 9800.00, 'Burgers', 'Carne, queso cheddar, salsa de cebolla, ketchup y mostaza', 'img/Fotos/Menu/Burgers/HamburguesaQueso.png'),
('Hamburguesa con queso - Doble Premium', 12300.00, 'Burgers', 'Carne, queso cheddar, salsa de cebolla, ketchup y mostaza', 'img/Fotos/Menu/Burgers/HamburguesaQueso.png'),
('Hamburguesa clásica - Junior 80gr.', 7100.00, 'Burgers', 'Carne, cheddar, lechuga, tomate', 'img/Fotos/Menu/Burgers/HamburguesaClasica.png'),
('Hamburguesa clásica - Doble Junior', 9900.00, 'Burgers ', 'Carne, cheddar, lechuga, tomate', 'img/Fotos/Menu/Burgers/HamburguesaClasica.png'),
('Hamburguesa clásica - Premium 125gr.', 10600.00, 'Burgers ', 'Carne, cheddar, lechuga, tomate', 'img/Fotos/Menu/Burgers/HamburguesaClasica.png'),
('Hamburguesa clásica - Doble Premium', 14000.00, 'Burgers ', 'Carne, cheddar, lechuga, tomate', 'img/Fotos/Menu/Burgers/HamburguesaClasica.png'),
('Hamburguesa napolitana - Junior 80gr.', 7100.00, 'Burgers', 'Carne, muzzarella, jamón y tomate', 'img/Fotos/Menu/Burgers/HamburguesaNapolitana.png'),
('Hamburguesa napolitana - Doble Junior', 9900.00, 'Burgers', 'Carne, muzzarella, jamón y tomate', 'img/Fotos/Menu/Burgers/HamburguesaNapolitana.png'),
('Hamburguesa napolitana - Premium 125gr.', 10600.00, 'Burgers', 'Carne, muzzarella, jamón y tomate', 'img/Fotos/Menu/Burgers/HamburguesaNapolitana.png'),
('Hamburguesa napolitana - Doble Premium', 14000.00, 'Burgers', 'Carne, muzzarella, jamón y tomate', 'img/Fotos/Menu/Burgers/HamburguesaNapolitana.png'),
('Hamburguesa bacon - Junior 80gr.', 7100.00, 'Burgers', 'Carne, cheddar, bacon y salsa barbacoa', 'img/Fotos/Menu/Burgers/HamburguesaBacon.png'),
('Hamburguesa bacon - Doble Junior', 9900.00, 'Burgers', 'Carne, cheddar, bacon y salsa barbacoa', 'img/Fotos/Menu/Burgers/HamburguesaBacon.png'),
('Hamburguesa bacon - Premium 125gr.', 10600.00, 'Burgers', 'Carne, cheddar, bacon y salsa barbacoa', 'img/Fotos/Menu/Burgers/HamburguesaBacon.png'),
('Hamburguesa bacon - Doble Premium', 14000.00, 'Burgers', 'Carne, cheddar, bacon y salsa barbacoa', 'img/Fotos/Menu/Burgers/HamburguesaBacon.png'),
('Hamburguesa Oveja Negra - Junior 80gr.', 8100.00, 'Burgers', 'Carne, muzzarella, lechuga, tomate, bacon, salsa de cebolla, ketchup, mostaza', 'img/Fotos/Menu/Burgers/HamburguesaOvejaNegra.png'),
('Hamburguesa Oveja Negra - Doble Junior', 10900.00, 'Burgers', 'Carne, muzzarella, lechuga, tomate, bacon, salsa de cebolla, ketchup, mostaza', 'img/Fotos/Menu/Burgers/HamburguesaOvejaNegra.png'),
('Hamburguesa Oveja Negra - Premium 125gr.', 11500.00, 'Burgers', 'Carne, muzzarella, lechuga, tomate, bacon, salsa de cebolla, ketchup, mostaza', 'img/Fotos/Menu/Burgers/HamburguesaOvejaNegra.png'),
('Hamburguesa Oveja Negra - Doble Premium', 15000.00, 'Burgers', 'Carne, muzzarella, lechuga, tomate, bacon, salsa de cebolla, ketchup, mostaza', 'img/Fotos/Menu/Burgers/HamburguesaOvejaNegra.png'),

('Cambiar papas por aros de cebolla', 2400.00, 'Adicionales', 'Adicional: cambio de papas por aros de cebolla', 'img/Fotos/Menu/Adicionales/arosDeCebolla.png'),
('Adicional papas con cheddar y bacon', 2100.00, 'Adicionales', 'Adicional de papas con cheddar y bacon', 'img/Fotos/Menu/Adicionales/PapasBaicon.png'),
('Adicional huevo frito', 700.00, 'Adicionales', 'Adicional de huevo frito', 'img/Fotos/Menu/Adicionales/Huevo.png'),

('Milanesa - Sin papas', 6700.00, 'Milanesas', 'Milanesa sola, sin papas', 'img/Fotos/Menu/Milanesas/MilanesaNormal.png'),
('Milanesa - Con papas', 8900.00, 'Milanesas', 'Milanesa acompañada con papas fritas', 'img/Fotos/Menu/Milanesas/MilanesaNormal.png'),
('Milanesa a caballo - Sin papas', 8000.00, 'Milanesas', 'Milanesa con huevo frito, sin papas', 'img/Fotos/Menu/Milanesas/MilanesaACaballo.png'),
('Milanesa a caballo - Con papas', 10200.00, 'Milanesas', 'Milanesa con huevo frito, acompañada con papas', 'img/Fotos/Menu/Milanesas/MilanesaACaballo.png'),
('Milanesa clásica - Sin papas', 9700.00, 'Milanesas', 'Milanesa con lechuga, tomate y muzzarella, sin papas', 'img/Fotos/Menu/Milanesas/MilanesaClasica.png'),
('Milanesa clásica - Con papas', 11900.00, 'Milanesas', 'Milanesa con lechuga, tomate y muzzarella, acompañada con papas', 'img/Fotos/Menu/Milanesas/MilanesaClasica.png'),
('Milanesa napolitana - Sin papas', 9700.00, 'Milanesas', 'Milanesa con jamón, muzzarella y tomate, sin papas', 'img/Fotos/Menu/Milanesas/milanesaNapolitana.png'),
('Milanesa napolitana - Con papas', 11900.00, 'Milanesas', 'Milanesa con jamón, muzzarella y tomate, acompañada con papas', 'img/Fotos/Menu/Milanesas/milanesaNapolitana.png'),
('Milanesa bacon - Sin papas', 9700.00, 'Milanesas', 'Milanesa con cheddar, bacon y salsa barbacoa, sin papas', 'img/Fotos/Menu/Milanesas/milanesaBacon.png'),
('Milanesa bacon - Con papas', 11900.00, 'Milanesas', 'Milanesa con cheddar, bacon y salsa barbacoa, acompañada con papas', 'img/Fotos/Menu/Milanesas/milanesaBacon.png'),
('Milanesa Oveja Negra - Sin papas', 10700.00, 'Milanesas', 'Milanesa con muzzarella, lechuga, tomate y bacon, sin papas', 'img/Fotos/Menu/Milanesas/milanesaOvejaNegra.png'),
('Milanesa Oveja Negra - Con papas', 12900.00, 'Milanesas', 'Milanesa con muzzarella, lechuga, tomate y bacon, acompañada con papas', 'img/Fotos/Menu/Milanesas/milanesaOvejaNegra.png'),
('2 Superpanchos', 4000.00, 'Hotdogs', '2 superpanchos clásicos con su respectivos salsas', 'img/Fotos/Menu/Hotdogs/2Salchichas.png'),
('Superpancho', 2400.00, 'Hotdogs', 'Superpancho clásico', 'img/Fotos/Menu/Hotdogs/superpancho.png'),
('Salchicha alemana', 3700.00, 'Hotdogs', 'Salchicha alemana tradicional', 'img/Fotos/Menu/Hotdogs/SalchichaAlemana.png'),
('Superpancho con papas fritas', 4800.00, 'Hotdogs', 'Superpancho acompañado de papas fritas', 'img/Fotos/Menu/Hotdogs/SuperpanchoPapas.jpg'),
('Alemana con papas fritas', 6300.00, 'Hotdogs', 'Salchicha alemana acompañada de papas fritas', 'img/Fotos/Menu/Hotdogs/salchichaAlemanaPapas.png'),
('Ensalada Caesar', 11100.00, 'Ensaladas', 'Lechuga, tomate, queso, huevo, pollo crispy y salsa caeser', 'img/Fotos/Menu/Ensaladas/ensaladaCesar.png'),
('Línea Coca Cola 500ml', 2200.00, 'Bebidas', NULL, 'img/Fotos/Menu/Bebidas/CCl.png'),
('Línea Coca Cola 1L', 4000.00, 'Bebidas', NULL, 'img/Fotos/Menu/Bebidas/CocaCola1L.png'),
('Agua saborizada Manzana o Pomelo 500ml', 2200.00, 'Bebidas', NULL, 'img/Fotos/Menu/Bebidas/AQUARIUS-agua-manzana-x500cc.png'),
('Agua con o sin gas 500ml', 2200.00, 'Bebidas', NULL, 'img/Fotos/Menu/Bebidas/Agua-Villavicencio-Sin-Gas-500-ml.png'),
('Quilmes 473ml', 3900.00, 'Bebidas', NULL, 'img/Fotos/Menu/Bebidas/Cerveza-QUILMES-CRISTAL-Lata-473ml.png'),
('Imperial o Andes Rubia/Roja/Negra 473ml', 3900.00, 'Bebidas', NULL, 'img/Fotos/Menu/Bebidas/imperial-lager-cerveza-lata-473-ml-e1603837257931.png'),
('Affogato', 7900.00, 'Postres', '2 bochas de helado de vainilla y café', 'img/Fotos/Menu/Postres/Affogato.png'),
('Copa Oreo', 6700.00, 'Postres', '2 bochas de helado de DDL de Oreo', 'img/Fotos/Menu/Postres/CopaOreo.png'),
('Copa Rocklet', 6700.00, 'Postres', '2 bochas de helado a elección con rocklets y salsa', 'img/Fotos/Menu/Postres/CopaRocklets.png');

INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES
('Cortado en jarrito + 1 medialuna', 3400.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/cortadoJarrito.png'),
('Cortado en jarrito + 2 medialunas', 4800.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/cortadoJarrito2Medialunas.jpeg'),
('Café con leche + 2 medialunas', 5500.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/cafeConLeche2Medialunas.jpeg'),
('Café con leche XL + 2 medialunas', 6800.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/cafeConLecheXL2Medialunas.jpeg'),
('Café con leche + donut', 4600.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/cafeConLecheDonut.jpeg'),
('Café con leche XL', 4700.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/cafeConLecheXL.jpeg'),
('Cortado + budin de limón', 4400.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/CortadBudinLimon.jpeg'),
('Jugo de naranja + 1/2 tostado de miga', 3900.00, 'Promo', NULL, 'img/Fotos/Promos y combos/Promos/jugoNaranjaTostado.jpeg');

INSERT INTO menu (nombre, precio, categoria, descripcion, ruta_imagen) VALUES
('Brunch Oveja Negra', 14500.00, 'Brunch', 'Infusión (café, café con leche, té), jugo de naranja, huevos revueltos, tostadas con queso en pan de campo.', 'img/Fotos/Promos y combos/Brunch/brunchOvejaNegra.jpeg'),
('Brunch Western', 14500.00, 'Brunch', 'Infusión (café, café con leche, té), jugo de naranja, huevos revueltos, tostado de jamón y queso en pan de campo.', 'img/Fotos/Promos y combos/Brunch/brunchWester.jpeg');

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


