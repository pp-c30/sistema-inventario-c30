-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2021 a las 19:47:31
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id_articulo` int(10) NOT NULL,
  `categoria` int(100) NOT NULL,
  `cant_total` int(100) NOT NULL,
  `cant` int(100) NOT NULL,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `seccion` int(100) NOT NULL,
  `estado` tinyint(10) NOT NULL,
  `valor` float NOT NULL,
  `img` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `origen` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `public_id` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`id_articulo`, `categoria`, `cant_total`, `cant`, `fecha_alta`, `fecha_baja`, `descripcion`, `seccion`, `estado`, `valor`, `img`, `origen`, `public_id`) VALUES
(40, 2, 500, 200, '2020-12-10', NULL, 'Tuerca Hexagonal Inoxidable M5', 1, 1, 212, 'http://res.cloudinary.com/dcbnlcpb6/image/upload/v1608170863/iu8wcuztlvvadwxqqgfv.jpg', 'Aporte Taller', 'iu8wcuztlvvadwxqqgfv'),
(41, 1, 60, 60, '2019-04-18', NULL, 'Pinza Universal 6\" Black Jack Mango Ergonómico', 1, 1, 527, 'http://res.cloudinary.com/dcbnlcpb6/image/upload/v1608171341/rrgvoj5oqcyw8qmtfzcr.png', 'Aporte Taller', 'rrgvoj5oqcyw8qmtfzcr'),
(42, 5, 75, 75, '2020-12-31', NULL, 'Alicate Corte Diagonal 6\" Acero Pretul Comfort Grip - (PCD-6PX)', 1, 1, 355, 'http://res.cloudinary.com/dcbnlcpb6/image/upload/v1608171473/vgp9pn6fwkud9ocncg42.jpg', 'Aporte Taller', 'vgp9pn6fwkud9ocncg42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `descripcion` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `descripcion`) VALUES
(1, 'Pinzas'),
(2, 'Tuercas'),
(5, 'Alicate'),
(6, 'Destornillador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `id_movimiento` int(10) NOT NULL,
  `id_articulo` int(10) NOT NULL,
  `destino_seccion` int(10) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado` tinyint(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `movimiento`
--

INSERT INTO `movimiento` (`id_movimiento`, `id_articulo`, `destino_seccion`, `fecha_hora`, `cantidad`, `estado`) VALUES
(47, 40, 23, '2020-12-17 07:43:54', 200, 0),
(48, 40, 16, '2020-12-17 08:15:36', 100, 0),
(49, 40, 23, '2020-12-17 08:17:32', 50, 0),
(50, 40, 16, '2020-12-17 08:17:32', 150, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

CREATE TABLE `seccion` (
  `id_seccion` int(11) NOT NULL,
  `nombre_seccion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `seccion`
--

INSERT INTO `seccion` (`id_seccion`, `nombre_seccion`) VALUES
(1, 'Pañol'),
(15, 'Electricidad I y II'),
(16, 'Carpinteria'),
(23, 'Ajuste I y II');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id_articulo`),
  ADD KEY `categoria` (`categoria`),
  ADD KEY `seccion` (`seccion`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `destino_seccion` (`destino_seccion`);

--
-- Indices de la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD PRIMARY KEY (`id_seccion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id_articulo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `id_movimiento` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `seccion`
--
ALTER TABLE `seccion`
  MODIFY `id_seccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `articulo_ibfk_2` FOREIGN KEY (`seccion`) REFERENCES `seccion` (`id_seccion`) ON UPDATE CASCADE,
  ADD CONSTRAINT `articulo_ibfk_3` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`id_categoria`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`destino_seccion`) REFERENCES `seccion` (`id_seccion`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
