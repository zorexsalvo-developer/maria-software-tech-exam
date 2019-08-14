-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Plan'
-- 
-- ---

DROP TABLE IF EXISTS `Plan`;
		
CREATE TABLE `Plan` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` CHAR NOT NULL,
  `hmo` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Cart'
-- 
-- ---

DROP TABLE IF EXISTS `Cart`;
		
CREATE TABLE `Cart` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `status` INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Item'
-- 
-- ---

DROP TABLE IF EXISTS `Item`;
		
CREATE TABLE `Item` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `cart` INTEGER NOT NULL,
  `plan` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Organization'
-- 
-- ---

DROP TABLE IF EXISTS `Organization`;
		
CREATE TABLE `Organization` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` CHAR NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Terms'
-- 
-- ---

DROP TABLE IF EXISTS `Terms`;
		
CREATE TABLE `Terms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `plan` INTEGER NULL DEFAULT NULL,
  `payment_term` CHAR NOT NULL,
  `amount` INT NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Plan` ADD FOREIGN KEY (hmo) REFERENCES `Organization` (`id`);
ALTER TABLE `Item` ADD FOREIGN KEY (cart) REFERENCES `Cart` (`id`);
ALTER TABLE `Item` ADD FOREIGN KEY (plan) REFERENCES `Plan` (`id`);
ALTER TABLE `Terms` ADD FOREIGN KEY (plan) REFERENCES `Plan` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Plan` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Cart` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Item` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Organization` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Terms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Plan` (`id`,`name`,`hmo`) VALUES
-- ('','','');
-- INSERT INTO `Cart` (`id`,`status`) VALUES
-- ('','');
-- INSERT INTO `Item` (`id`,`cart`,`plan`) VALUES
-- ('','','');
-- INSERT INTO `Organization` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Terms` (`id`,`plan`,`payment_term`,`amount`) VALUES
-- ('','','','');
