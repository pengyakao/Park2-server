-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 06 月 16 日 05:59
-- 伺服器版本： 10.4.21-MariaDB
-- PHP 版本： 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `park2`
--
CREATE DATABASE IF NOT EXISTS `park2` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `park2`;

-- --------------------------------------------------------

--
-- 資料表結構 `activity`
--

CREATE TABLE `activity` (
  `actID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `actTitle` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `actInfo` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `actSdate` date NOT NULL,
  `actEdate` date NOT NULL,
  `actStime` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `actEtime` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `actPlace` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `actClass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `actGuests` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `actImg` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `activity`
--

INSERT INTO `activity` (`actID`, `actTitle`, `actInfo`, `actSdate`, `actEdate`, `actStime`, `actEtime`, `actPlace`, `actClass`, `actGuests`, `actImg`) VALUES
(01, 'DJ Night', '音樂是中性的，從不同的靈魂消化出的感受，也許能從中獲得救贖，或因此結交擁有共同品味的朋友！', '2022-04-09', '2022-04-09', '20:00', '21:30', 'PARK2 B1', '音樂表演', 'Koto', 'activity1.jpg'),
(02, '我出去一下', '城市裡的戶外生活篇，這次除了體驗活動外，還特別安排了Bell\'s Camping主持的戶外露營必備晚間焚火儀式、以及伴隨火光由艸聲手碟帶來的空靈音樂表演！', '2022-06-18', '2022-06-19', '14:00', '21:00', 'PARK2 1F&B1', '風格市集', '艸聲手碟&東東', 'activity2.jpg'),
(03, '植日森', 'PARK2有一個傳說，在 #每個月 #第二個 #星期四，有一群精靈會在這裡出現，替植物們澆水、除草、修剪雜枝', '2022-06-09', '2022-06-09', NULL, NULL, 'PARK2 1F', 'Dress Code', NULL, 'activity3.jpg'),
(04, 'PPK設計師交流之夜', '9位名人講者解密、草悟道限定美食、怪怪組曲DJ表演壓軸演出！', '2022-05-06', '2022-05-06', '19:00', '21:30', 'PARK2 1F', '交流演講', '留白計畫－王奕翔&家務室－賀丞右&PARK2－張懷安', 'activity4.jpg');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`actID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `activity`
--
ALTER TABLE `activity`
  MODIFY `actID` tinyint(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
