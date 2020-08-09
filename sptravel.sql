-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: sptravel
-- ------------------------------------------------------
-- Server version	8.0.16

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
-- Table structure for table `itinerary`
--

DROP TABLE IF EXISTS `itinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary` (
  `itineraryid` int(11) NOT NULL AUTO_INCREMENT,
  `travelid` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `activity` varchar(300) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`itineraryid`),
  KEY `travelid_idx` (`travelid`),
  CONSTRAINT `itinerary to travel link` FOREIGN KEY (`travelid`) REFERENCES `travel` (`travelid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary`
--

LOCK TABLES `itinerary` WRITE;
/*!40000 ALTER TABLE `itinerary` DISABLE KEYS */;
INSERT INTO `itinerary` VALUES (2,2,1,'Asakusa Temple','2020-06-18 13:26:23'),(3,2,2,'Akihabara','2020-06-18 13:35:23'),(4,3,1,'Downtown','2020-06-18 13:35:23'),(6,2,3,'Visit to the East Garderns of the Imperial Palace ','2020-08-03 06:37:02'),(7,2,4,'Teamlabs Borderless','2020-08-03 07:19:45'),(8,2,4,'asdf','2020-08-04 07:22:43');
/*!40000 ALTER TABLE `itinerary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL COMMENT 'Used to match the post to the user who made it',
  `travelid` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `rating` int(11) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `userid_idx` (`userid`),
  KEY `travelid_idx` (`travelid`),
  CONSTRAINT `review to travel link` FOREIGN KEY (`travelid`) REFERENCES `travel` (`travelid`) ON DELETE CASCADE,
  CONSTRAINT `review to user link` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,4,2,'The place were great and the people were friendly!',5,'2020-06-18 13:21:43'),(4,3,2,'Japan is a great place, the weather was nice and the food was excellent!',5,'2020-06-18 13:24:10'),(5,2,3,'Melbourne is great!',4,'2020-06-18 13:34:15');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel`
--

DROP TABLE IF EXISTS `travel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel` (
  `travelid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(400) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int(11) NOT NULL,
  `country` varchar(400) NOT NULL,
  `travelPeriod` varchar(300) NOT NULL,
  PRIMARY KEY (`travelid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel`
--

LOCK TABLES `travel` WRITE;
/*!40000 ALTER TABLE `travel` DISABLE KEYS */;
INSERT INTO `travel` VALUES (2,'10D9N Tokyo','Tokyo, the captial of the land of the rising sun.',3600,'Japan','Mar 2021'),(3,'5D4N Melbourne','Melbourne is a sunny place.',2500,'Australia','Jan 2021'),(5,'6D5N New York','Lincoln Monument',4200,'U.S.','Aug 2021'),(6,'6D5N Macau','Its Macau Yo',2400,'China','Mar 2022'),(9,'5D4N Jakarta','Enjoy a tour in the bustling city of Jakarta, the capitol of Indonesia.',2800,'Indonesia','Jun 2021'),(25,'10D9N Tokyo','Tokyo, the captial of the land of the rising sun.',4000,'Japan','Jun 2021'),(26,'10D9N Tokyo','Tokyo, the captial of the land of the rising sun.',8000,'Japan','Mar 2021'),(27,'10D9N Tokyo','Tokyo, the captial of the land of the rising sun.',3200,'Japan','May 2021');
/*!40000 ALTER TABLE `travel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `email` varchar(500) NOT NULL,
  `profilepicURL` varchar(1000) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(200) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John Doe','john@abc.com','https://www.abc.com/terry.jpg','2020-06-18 08:18:00','password','user'),(2,'David Wallace','david@gmail.com','https://www.abc.com/car.jpg','2020-06-18 08:18:00','password','user'),(3,'Mary Bricker','mary@xyz.com','https://www.abc.com/dog.jpg','2020-06-18 08:18:00','password','user'),(4,'Jamie Toh','jamiet@gmail.com','https://www.abc.com/psa.jpg','2020-06-18 11:01:59','password','user'),(5,'Michael Scott','MScott@gmail.com','https://www.abc.com/paper.jpg','2020-06-18 11:07:54','password','user'),(6,'admin','admin@gmail.com','https://www.abc.com/anon.jpg','2020-06-18 11:01:59','admin','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-10  0:44:04
