CREATE TABLE Users (uuid INTEGER PRIMARY KEY, username TEXT, displayname TEXT, passkey TEXT);

INSERT INTO Users VALUES (0, "Pie_Master", "The_Pie", "1Very_SecureP@ssw0rd");
INSERT INTO Users VALUES (1, "Cheeasd", "sdv", "sdvwewef");
INSERT INTO Users VALUES (2, "wefw", "sdv", "23423442");
INSERT INTO Users VALUES (3, "wefwefwf", "sdv", "6543223");
INSERT INTO Users VALUES (4, "sdv", "sdvsv", "234524");
INSERT INTO Users VALUES (5, "dsv", "sdv", "1Very_Sfddfgd");
INSERT INTO Users VALUES (6, "sdvsdv", "sdv", "@ssw0rd");

SELECT username FROM Users WHERE 