-- Create syntax for TABLE 'comment'
CREATE TABLE `comment` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `package_id` int(11) NOT NULL,
    `user_id` int(11) NOT NULL,
    `text` longtext NOT NULL,
    `added` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
    `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
    `deleted` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4;-- Create syntax for TABLE 'package'
CREATE TABLE `package` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `slug` varchar(255) NOT NULL DEFAULT '',
    `name` varchar(255) NOT NULL DEFAULT '',
    `user_id` int(11) NOT NULL,
    `description` longtext NOT NULL,
    `readme` longtext NOT NULL,
    `image_id` int(11) DEFAULT NULL,
    `website` varchar(255) NOT NULL DEFAULT '',
    `repository` varchar(255) NOT NULL DEFAULT '',
    `license` varchar(255) NOT NULL DEFAULT '',
    `category` varchar(255) NOT NULL DEFAULT '',
    `tags` varchar(255) DEFAULT '',
    `added` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
    `updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
    `deleted` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `slug_unique` (`slug`),
    KEY `slug_index` (`slug`)
) ENGINE = InnoDB AUTO_INCREMENT = 51 DEFAULT CHARSET = utf8mb4;-- Create syntax for TABLE 'release'
CREATE TABLE `user` (
    `id` int(11) unsigned NOT NULL,
    `login` varchar(255) DEFAULT NULL,
    `avatar_url` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;-- Create syntax for TABLE 'vote'
CREATE TABLE `vote` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int(11) DEFAULT NULL,
    `package_id` int(11) DEFAULT NULL,
    `vote` tinyint(1) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_id` (`user_id`, `package_id`),
    KEY `package_id` (`package_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 28 DEFAULT CHARSET = utf8mb4;CREATE TABLE `image` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `file_type` varchar(11) DEFAULT NULL,
    `file_size` int(11) DEFAULT NULL,
    `file` mediumblob DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4;