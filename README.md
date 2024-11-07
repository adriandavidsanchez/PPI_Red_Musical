# Aplicación web de subida y reproducción de canciones

Esta aplicación web permite a los usuarios (cantautores) subir y compartir sus canciones, así como escuchar las canciones de otros usuarios.

## todas las dependencias que se solicitan para el Frontend

* npm install react-router-dom
* npm install axios
* npm install firebase
* npm install styled-components
* npm install bootstrap
* npm install react-bootstrap
* npm install lucide-react

## Estructura de la base de datos

La aplicación cuenta con las siguientes tablas en la base de datos MySQL:

* **tbl_generos**
  * `id_genero` (INT, Primary Key)
  * `nombre_genero` (VARCHAR)

* **tbl_usuarios**
  * `id_usuario` (INT, Primary Key) 
  * `usuario` (VARCHAR)
  * `email` (VARCHAR)
  * `fecha_registro` (DATETIME)
  * `imagen` (VARCHAR)
  * `nombre` (VARCHAR)
  * `rol` (VARCHAR)
  * `id_genero` (INT, Foreign Key referencing `tbl_generos`)

* **tbl_canciones**
  * `id_cancion` (INT, Primary Key)
  * `descripcion` (TEXT)
  * `archivo` (VARCHAR)
  * `fecha_subida` (DATE)
  * `imagen` (VARCHAR)
  * `titulo` (VARCHAR)
  * `letra` (TEXT)
  * `id_usuario` (INT, Foreign Key referencing `tbl_usuarios`)
  * `id_genero` (INT, Foreign Key referencing `tbl_generos`)

* **tbl_comentario_cancion**
  * `id_comentario` (INT, Primary Key)
  * `id_cancion` (INT, Foreign Key referencing `tbl_canciones`)
  * `comentario` (TEXT)
  * `fecha_comentario` (DATETIME)
  * `id_usuario` (INT, Foreign Key referencing `tbl_usuarios`)
  * `id_respuesta` (INT, Foreign Key referencing `tbl_comentario_cancion`)

## Instrucciones de inserción de datos

Para insertar los datos proporcionados en las tablas correspondientes, ejecuta las siguientes consultas SQL:

```sql
-- Insertar géneros
INSERT INTO `tbl_generos` VALUES (6,'Clasica'),(10,'Electrica'),(8,'Hip hop'),(5,'Jazz'),(3,'Joropo'),(4,'Pop'),(7,'Reggaeton'),(1,'Rock'),(2,'Salsa'),(9,'Tango');

-- Insertar usuarios
INSERT INTO `tbl_usuarios` VALUES (3011111111,'HombresG123','HombresG@exemple.com','2024-09-30 23:18:43.854913','Hombre-g.jpg','Hombres G','cantautor',1),(3022222222,'WillieColon123','WillieColon@exemple.com','2024-09-30 23:03:41.493019','Willie-colon.jpg','Willie Colon','cantautor',2),(3033333333,'EneasPerdomo123','EneasPerdomo@exemple.com','2024-09-30 23:18:43.854913','EneasPerdomo.jpg','Eneas Perdomo','cantautor',3),(3044444444,'Michael123','Michael@exemple.com','2024-09-30 23:43:03.923606','Michael.jpg','Michael Jackson','cantautor',4),(3055555555,'Louis123','LouisArmstrong@exemple.com','2024-09-30 23:18:43.854913','LouisArmstrong.jpg','Louis Armstrong','cantautor',5),(3066666666,'Beethoven123','Beethoven@exemple.com','2024-09-30 23:18:43.854913','Beethoven.jpg','Beethoven','cantautor',6),(3077777777,'DaddyYankee123','DaddyYankee@exemple.com','2024-09-30 23:18:43.854913','DaddyYankee.jpg','Daddy Yankee','cantautor',7),(3088888888,'MCing123','MCing@exemple.com','2024-09-30 23:18:43.854913','MCing.jpg','MCing','cantautor',8),(3099999999,'CarlosGardel123','CarlosGardel@exemple.com','2024-09-30 23:18:43.854913','CarlosGardel.jpg','Carlos Gardel','cantautor',9),(3101010101,'DaftPunk123','DaftPunk@exemple.com','2024-09-30 23:18:43.854913','DaftPunk.jpg','Daft Punk','cantautor',10);

-- Insertar canciones
INSERT INTO `tbl_canciones` VALUES (1,'Una declaración juvenil de amor, capturando la emoción de los primeros sentimientos románticos.','Hombres G  - Te Quiero.mp3','2024-09-30','Hombre-g-te-quiero.jpg','Te Quiero',NULL,3011111111,1),(2,'Un tema sobre el desamor y la frustración de perder a una pareja, con un tono energético.','Hombres G - Devuélveme a mi chica.mp3','2021-09-30','Hombre-g-devuelveme-a-mi-chica.jpg','Devuélveme a mi chica',NULL,3011111111,1),(3,'Una divertida y desenfadada canción sobre las complicaciones del amor, con un toque de humor.','Hombres G - El ataque de las chicas cocodrilo.mp3','2020-09-30','Hombre-g-ataque-de- las-chicas-cocodrilo.jpg','El ataque de las chicas cocodrilo',NULL,3011111111,1),(4,'Canción de desamor sobre la frustración de no poder expresar los sentimientos a un ser querido.','Willie Colon - Sin Poderte Hablar.mp3','2019-09-30','Willie-Colon-Sin-Poderte-Hablar.jpg','Sin Poderte Hablar',NULL,3022222222,2),(5,'Un canto a la pasión y el amor romántico, lleno de emoción y lirismo.','Willie colon - Idilio.mp3','2019-09-29','Willie-Idilio.jpg','Idilio',NULL,3022222222,2),(6,'Homenaje a la vida artística y libre, celebrando la belleza de la música y la creatividad.\n\n','Willy Colon Bohemia.mp3','2019-09-28','Willie-colon-boemia.jpg','Bohemia',NULL,3022222222,2),(7,'Un homenaje a las tradiciones llaneras, celebrando la vida rural y la alegría pastoral.','Eneas Perdomo-El Becerrito.mp3','2018-09-27','Eneas Perdomo-El Becerrito.jpg','El Becerrito',NULL,3033333333,3),(8,'Una canción que captura la esencia festiva de las celebraciones populares de los llanos.\n\n','Eneas Perdomo-Fiesta en Elorza.mp3','2018-09-26','Eneas Perdomo-Fiesta en Elorza.jpg','Fiesta en Elorza',NULL,3033333333,3),(9,'Melancólica reflexión sobre los paisajes llaneros y el amor, usando metáforas de la naturaleza.\n\n','Eneas Perdomo-Sombra en los Médanos.mp3','2018-09-25','Eneas Perdomo-Sombra en los Médanos.jpg','Sombra en los Médanos',NULL,3033333333,3),(10,'Un llamado a evitar la violencia y elegir la paz, con un fuerte mensaje de resistencia.\n\n','Michael Jackson - Beat It.mp3','2017-09-24','Michael Jackson - Beat It.jpg','Beat It',NULL,3044444444,4),(11,'Reflexión sobre la fama y las acusaciones falsas, basada en experiencias personales.','Michael Jackson - Billie Jean.mp3','2017-09-23','Michael Jackson - Billie Jean.jpg','Billie Jean',NULL,3044444444,4),(12,'Historia de un crimen, con un ritmo acelerado y una atmósfera de tensión y misterio.\n\n','Michael Jackson - Smooth Criminal.mp3','2017-09-22','Michael Jackson - Smooth Criminal.jpg','Smooth Criminal',NULL,3044444444,4),(13,'Sin Descripcion','Electronica1 (1).mpeg','2024-10-12','Imgelectronica (1).jpeg','El Razyo',' ',3101010101,10),(14,'Sin Descripcion','Electronica1 (3).mpeg','2024-10-12','Imgelectronica (3).jpeg','Luz armonias','',3101010101,10),(15,'me enamore de la mejor amiga de mi novia','Y2meta.app - Olvidarla (320 kbps).mp3','2024-10-12','Captura de pantalla 2024-10-12 214841.png','olvidarla','',3022222222,2),(16,'Sin Descripcion','Daft Punk - Veridis Quo (Official Video).mp3','2016-09-21','Daft Punk - Veridis Quo (Official Video).jpg','Veridis Quo',NULL,3101010101,10),(17,'\n\"Just the Two of Us\" es una balada suave de R&B que celebra la conexión entre dos personas.','Just the Two of Us (feat. Bill Withers).mp3','2016-09-20','Just the Two of Us (feat. Bill Withers).jpg','Just the Two of Us',NULL,3055555555,5),(18,'\"Hit the Road Jack\" es una canción de R&B enérgica sobre despedirse tras una ruptura.\n\n\n\n\n','Hit the road Jack!.mp3','2016-09-19','Hit the road Jack!.jpg','Hit the road Jack!',NULL,3055555555,5),(19,'\"Stand By Me\" de Ben E. King es una emotiva balada soul sobre el apoyo incondicional y la lealtad en tiempos difíciles.','Ben E. King — Stand By Me [Letra + Video].mp3','2016-09-18','Ben E. King — Stand By Me.jpg','Stand By Me',NULL,3055555555,5),(20,'El Nocturno op.9 No.2 de Chopin es una pieza romántica para piano, suave y melódica, que evoca serenidad y nostalgia.','Chopin - Nocturne op.9 No.2.mp3','2015-09-17','Chopin - Nocturne op.9 No.2.jpg','Nocturne op.9 No.2',NULL,3066666666,6),(21,'Una pieza para piano profundamente emotiva y melancólica, famosa por su atmósfera tranquila y misteriosa.','CLARO DE LUNA - BEETHOVEN.mp3','2015-09-16','CLARO DE LUNA - BEETHOVEN.jpg','Claro de Luna',NULL,3066666666,6),(22,'La Danza del Hada de Azúcar de Tchaikovsky es una delicada y mágica pieza orquestal del ballet El Cascanueces, que evoca ligereza y encanto.','Danza del Hada de Azúcar - Tchaikovsky.mp3','2015-09-15','Danza del Hada de Azúcar - Tchaikovsky.jpg','Danza del Hada de Azúcar',NULL,3066666666,6),(23,'\n\"Que Tengo Que Hacer\" es mi manera de pedir una segunda oportunidad en el amor, mezclando ritmo pegajoso con sentimientos profundos.','Que Tengo Que Hacer - Daddy Yankee.mp3','2014-09-14','Que Tengo Que Hacer - Daddy Yankee.jpg','Que Tengo Que Hacer',NULL,3077777777,7),(24,'\"No Me Dejes Solo\" es una canción en la que expreso el deseo de mantener una relación y no perder a esa persona especial, con el flow característico del reggaetón.','Daddy Yankee - No Me Dejes Solo.mp3','2014-09-13','Daddy Yankee - No Me Dejes Solo.jpg','No Me Dejes Solo',NULL,3077777777,7),(25,'\"Rompe\" es un tema de energía pura, diseñado para encender la fiesta con su ritmo contundente y letras que motivan a romper con todo y destacar.','Daddy Yankee - Rompe (HDTV-1080p).mp3','2014-09-12','Daddy Yankee - Rompe (HDTV-1080p).jpg','Rompe',NULL,3077777777,7),(26,'\n\"Mcing Hip Hop\" se centra en la habilidad lírica y la improvisación, donde los MCs cuentan historias y conectan con el público.','hip hop mcing.mp3','2013-09-13','mcing.jpg','mcing',NULL,3088888888,8),(27,'\"Still D.R.E.\" es un himno del hip-hop donde Dr. Dre y Snoop Dogg celebran su legado y la permanencia en la industria, con un ritmo icónico y letras contundentes.','Dr. Dre - Still D.R.E. ft. Snoop Dogg.mp3','2013-09-12','Dr. Dre - Still D.R.E. ft. Snoop Dogg.jpg','Dr. Dre - Still D.R.E. ft.',NULL,3088888888,8),(28,'\"Hip Hop\" de dead prez es una poderosa declaración sobre la cultura hip-hop, abordando temas de lucha, conciencia social y autenticidad en la música.','dead prez - Hip Hop (Digital Video).mp3','2013-09-11','dead prez - Hip Hop (Digital Video).jpg','Dead Prez',NULL,3088888888,8),(29,'\"Ódiame\" es una expresión de dolor por un amor perdido, donde invito a la persona a odiarme, pero también a recordar lo que vivimos juntos. Es un reflejo profundo de mis emociones en el desamor.','Ódiame, Julio Jaramillo - Video.mp3','2012-09-10','Ódiame, Julio Jaramillo - Video.jpg','Ódiame',NULL,3099999999,9),(30,'\"Ayer y Hoy\" refleja mi nostalgia por un amor que perdura, hablando de recuerdos del pasado y sentimientos que siguen vivos en el presente.','Ayer y Hoy - Julio Jaramillo (Letra).mp3','2012-09-09','Ayer y Hoy - Julio Jaramillo (Letra).jpg','Ayer y Hoy',NULL,3099999999,9),(31,'\"Rondando Tu Esquina\" expresa mi anhelo y tristeza al estar cerca de un amor no correspondido, reflejando el deseo y el sufrimiento de observar desde la distancia.','Rondando Tu Esquina - Julio Jaramillo - Letra.mp3','2012-09-08','Rondando Tu Esquina - Julio Jaramillo - Letra.jpg','Rondando Tu Esquina',NULL,3099999999,9),(32,'\"Venezia\" de Hombres G es una canción que evoca un amor nostálgico y perdido, utilizando la hermosa ciudad de Venecia como metáfora de sentimientos intensos.','Hombres G - Venezia.mp3','2024-10-17','Hombres G - Venezia.jpg','Venezia','',3011111111,4);

-- Insertar comentarios de canciones
INSERT INTO `tbl_comentario_cancion` VALUES (4,5,'Este es un comentario sobre la canción.','2024-10-15 17:00:00.000000',1,3022222222),(5,4,'Este es un comentario sobre la canción.','2024-10-15 17:00:00.000000',1,3011111111),(6,4,'Este es un comentario sobre la canción.','2024-10-15 17:00:00.000000',2,3033333333),(7,5,'hola prueba do2','2024-10-17 03:58:18.725000',2,3101010101),(8,1,'hola marca\n','2024-10-17 04:04:35.689000',2,3101010101),(9,5,'buena cancion xd','2024-10-17 04:34:16.311000',2,3101010101),(10,5,'hola amorcito','2024-10-17 04:40:35.548000',2,3101010101),(11,1,'cagada de cancion','2024-10-17 04:40:46.681000',2,3101010101);
