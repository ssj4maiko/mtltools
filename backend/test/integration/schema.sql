CREATE TABLE novels (
  id smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  code char(20) NOT NULL,
  nameOriginal varchar(100) NOT NULL,
  nameCustom varchar(255) DEFAULT NULL,
  driver varchar(255) DEFAULT NULL,
  numberChapters smallint(5) unsigned NOT NULL DEFAULT 0,
  flagSyosetu tinyint(3) unsigned NOT NULL DEFAULT 1,
  flagR18 tinyint(3) unsigned NOT NULL DEFAULT 0,
  completed tinyint(3) unsigned NOT NULL DEFAULT 0,
  addedBy varchar(255) NOT NULL,
  `show` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  UNIQUE KEY novels_code_unique (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE chapters (
  idNovel smallint(5) unsigned NOT NULL,
  `no` smallint(5) unsigned NOT NULL,
  arc varchar(100) DEFAULT NULL,
  title varchar(100) DEFAULT NULL,
  textOriginal longtext DEFAULT NULL,
  textRevision longtext DEFAULT NULL,
  textCustom longtext DEFAULT NULL,
  dateOriginalPost datetime DEFAULT NULL,
  dateOriginalRevision datetime DEFAULT NULL,
  dateCreated timestamp NOT NULL DEFAULT current_timestamp(),
  dateRevision datetime DEFAULT NULL,
  noCode varchar(25) DEFAULT NULL,
  hasText tinyint(1) AS (textOriginal IS NOT NULL) STORED,
  PRIMARY KEY (idNovel, `no`),
  KEY chapters_idnovel_hastext (idNovel, hasText)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE dictionaries (
  id smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  language varchar(15) NOT NULL,
  dateCreated timestamp NOT NULL DEFAULT current_timestamp(),
  dateRevision datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE novelsDictionaries (
  id smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  idNovel smallint(5) unsigned NOT NULL,
  idDictionary smallint(5) unsigned NOT NULL,
  PRIMARY KEY (id),
  KEY novelsdictionaries_idnovel_foreign (idNovel),
  KEY novelsdictionaries_iddictionary_foreign (idDictionary),
  CONSTRAINT novelsdictionaries_iddictionary_foreign FOREIGN KEY (idDictionary) REFERENCES dictionaries (id),
  CONSTRAINT novelsdictionaries_idnovel_foreign FOREIGN KEY (idNovel) REFERENCES novels (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dictionaryCategories (
  id mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  idDictionary smallint(5) unsigned NOT NULL,
  name varchar(20) NOT NULL,
  PRIMARY KEY (id),
  KEY dictionarycategories_iddictionary_foreign (idDictionary),
  CONSTRAINT dictionarycategories_iddictionary_foreign FOREIGN KEY (idDictionary) REFERENCES dictionaries (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE dictionaryEntries (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  idCategory mediumint(8) unsigned NOT NULL,
  entryOriginal text DEFAULT NULL,
  entryTranslation varchar(150) NOT NULL,
  description varchar(1500) DEFAULT NULL,
  length tinyint(3) unsigned NOT NULL,
  idDictionary smallint(6) DEFAULT NULL,
  sufix mediumint(8) unsigned DEFAULT NULL,
  prefix mediumint(8) unsigned DEFAULT NULL,
  simplified varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY dictionaryentries_idcategory_foreign (idCategory),
  KEY dictionaryentries_sufix_foreign (sufix),
  KEY dictionaryentries_prefix_foreign (prefix),
  CONSTRAINT dictionaryentries_idcategory_foreign FOREIGN KEY (idCategory) REFERENCES dictionaryCategories (id),
  CONSTRAINT dictionaryentries_prefix_foreign FOREIGN KEY (prefix) REFERENCES dictionaryCategories (id),
  CONSTRAINT dictionaryentries_sufix_foreign FOREIGN KEY (sufix) REFERENCES dictionaryCategories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
