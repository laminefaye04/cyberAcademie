import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const WEB_SECURITY_COURSE: Course = {
  id: "web-security",
  levelId: 4,
  title: "Web Security",
  description:
    "Comprendre l'architecture des applications web et leurs failles : HTTP/HTTPS, cookies et sessions, TLS, APIs REST, en-têtes de sécurité et les premiers outils du pentester web.",
  xp: 1000,
  modules: [
    {
      id: "web-module-1",
      title: "Le web en 5 minutes",
      lessons: [
        {
          id: "web-lecon-01",
          title: "Le web : client et serveur",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Pourquoi le web est partout"),
            p(
              "Regarde autour de toi : la banque, la boutique en ligne, le réseau social, la messagerie, la borne de la gare, l'application météo de ton téléphone... Presque tout ce qui échange des données passe aujourd'hui par le web : un ensemble de services accessibles via le protocole HTTP (HyperText Transfer Protocol)."
            ),
            p(
              "Pourquoi est-ce le cœur de la sécurité ? Parce que c'est la plus grande surface d'attaque jamais construite. Un cambrioleur classique doit se déplacer de quartier en quartier ; un attaquant web, lui, peut rester assis sur son canapé et sonner à des millions de portes par seconde, sans jamais bouger. C'est par le web que passent la majorité des compromissions de données."
            ),
            h("Deux rôles : le client et le serveur"),
            p(
              "Toute conversation sur le web met en scène deux acteurs. Le client est celui qui demande : ton navigateur, ta commande curl, une application mobile. Le serveur est celui qui répond : une machine qui stocke les pages, les articles, les comptes utilisateurs, et qui les renvoie à qui les demande."
            ),
            p(
              "Le client et le serveur ne se connaissent pas et ne s'observeront jamais : ils communiquent uniquement par messages. C'est le protocole, HTTP, qui définit précisément comment formuler une demande et comment formuler une réponse. Sans ce contrat partagé, un navigateur d'un éditeur ne pourrait pas parler à un serveur d'un autre éditeur."
            ),
            h("L'analogie du restaurant"),
            p(
              "Tu es au restaurant. Tu es le client : tu regardes la carte et tu commandes. Le serveur prend ta commande, la transmet à la cuisine, et te rapporte le plat. Dans le web, le serveur (le programme) fait exactement cela : il reçoit ta commande (la requête), la cuisine répond (le calcul, la base de données), et il te rapporte le plat (la réponse)."
            ),
            code(`Client (navigateur, curl, app mobile)\n   │  1. « Je veux la page /accueil »   (la requête)\n   ▼\nServeur web (Apache, Nginx, application)\n   │  2. « Voici la page HTML »        (la réponse)\n   ▼\nClient`),
            h("Ce que tu vas apprendre dans ce niveau"),
            list(
              "Lire une requête et une réponse HTTP dans les moindres détails, comme un mécanicien qui lit les voyants avant de démonter le moteur.",
              "Comprendre comment les sites te reconnaissent : les cookies et les sessions.",
              "Comprendre pourquoi le cadenas HTTPS est important, et comment il peut être attaqué.",
              "Forger tes propres requêtes avec curl et les intercepter avec des proxies.",
              "Découvrir des pages cachées par fuzzing, et vérifier les en-têtes de sécurité en quelques secondes."
            ),
            h("Le cadre légal, tout de suite"),
            p(
              "Une règle absolue avant tout : tu n'as le droit de tester que tes propres machines, tes propres applications, ou des cibles explicitement autorisées. Ta machine, localhost (127.0.0.1), tes containers Docker, et les plateformes d'entraînement (TryHackMe, HackTheBox, Root-Me, PortSwigger Web Security Academy)."
            ),
            callout(
              "Tester, scanner ou sonder un site qui ne t'appartient pas sans autorisation écrite est un délit, en France comme ailleurs (article 323-1 du code pénal). Même un simple curl intensif peut être pénalement sanctionné. Ce n'est pas une menace : c'est la ligne rouge de toute la profession.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Le web = des clients qui demandent et des serveurs qui répondent.",
              "HTTP est le langage commun : une requête puis une réponse.",
              "C'est par le web que passent la plupart des attaques modernes.",
              "On ne teste que ses machines, son localhost, ses labs, ou des cibles autorisées."
            )
          ],
        },
        {
          id: "web-lecon-02",
          title: "Comment une page web s'affiche",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Une page, une cascade d'étapes"),
            p(
              "Tu tapes une adresse, tu appuies sur Entrée, et la page apparaît en une fraction de seconde. Entre ces deux instants, ta machine a enchaîné une dizaine d'opérations. Les comprendre, c'est comprendre où un attaquant peut s'immiscer."
            ),
            h("Étape 1 — Le DNS : transformer un nom en adresse"),
            p(
              "Le navigateur ne sait pas où se trouve exemple.fr : ce nom n'est qu'une étiquette. Il demande à un annuaire, le DNS (Domain Name System), de le traduire en adresse IP. C'est le standard d'immeuble : tu cherches une pharmacie, on te dit « au 42 rue des Lilas »."
            ),
            code(`dig +short exemple.fr\n93.184.216.34\n\n(dig interroge l'annuaire DNS directement. Retiens-le : il reviendra souvent.)`),
            h("Étape 2 — La connexion et la requête"),
            p(
              "Une fois l'adresse IP connue, le navigateur ouvre une connexion vers le port 80 (HTTP) ou 443 (HTTPS), puis envoie sa requête : « donne-moi la page /accueil ». C'est exactement ce que tu vois si tu demandes à curl d'être bavard."
            ),
            code(`curl -v https://exemple.fr/\n\n> GET / HTTP/1.1\n> Host: exemple.fr\n> User-Agent: Mozilla/5.0 ...\n>\n< HTTP/1.1 200 OK\n< Server: nginx/1.18.0\n< ...\n< (le corps de la page suit)`),
            h("Étape 3 — La réponse et le rendu"),
            p(
              "Le serveur renvoie le document demandé, généralement du HTML, la structure de la page. Mais ce HTML ne fait que décrire le squelette : la page réelle est une œuvre collective. Le navigateur lit le HTML, découvre qu'il faut aussi charger des feuilles de style CSS (l'apparence), des scripts JavaScript (les comportements), des images, des polices... et envoie une nouvelle requête pour chacune."
            ),
            list(
              "HTML : la structure, le squelette de la page.",
              "CSS : l'apparence, les couleurs, la mise en page.",
              "JavaScript : les comportements, les interactions, les appels en arrière-plan.",
              "Ressources : images, polices, vidéos, chacune étant une requête séparée."
            ),
            h("Pourquoi cela intéresse un pentester"),
            p(
              "Une page web n'est pas un bloc : c'est une conversation de dizaines de requêtes entre ton navigateur et des serveurs. Chaque requête est une occasion d'observer, de comprendre, et plus tard de modifier. Les outils que tu vas apprendre (curl, DevTools, proxies) servent exactement à regarder ces conversations en face."
            ),
            callout(
              "La leçon à retenir : quand un site te semble être « un seul bloc », il est en réalité une superposition de requêtes indépendantes. Un pentester ne voit jamais « le site » : il voit une suite d'échanges.",
              "info"
            ),
            h("En résumé"),
            list(
              "Le DNS traduit un nom de domaine en adresse IP.",
              "Le navigateur envoie une requête HTTP et reçoit une réponse.",
              "Le HTML est le squelette ; CSS et JavaScript viennent compléter la page.",
              "Chaque image, script ou appel API est une requête séparée."
            )
          ],
        },
        {
          id: "web-lecon-03",
          title: "HTTP en profondeur : requête et réponse",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le langage que tout le web parle"),
            p(
              "HTTP est le langage que parlent un client (ton navigateur, ton curl) et un serveur web. C'est un protocole requête-réponse : le client demande, le serveur répond. Et surtout : ces échanges sont du texte clair lisible, contrairement à bien des protocoles binaires. C'est une chance immense pour nous : on peut tout lire, tout comprendre, et tout forger à la main."
            ),
            h("Une requête en trois parties"),
            list(
              "La ligne de départ : la méthode (l'action voulue), le chemin, et la version. Exemple : GET /catalogue/velo.html HTTP/1.1.",
              "Les en-têtes : des lignes Nom: valeur qui décrivent la requête. Chaque en-tête est une métadonnée : qui parle, quoi demander, avec quels cookies.",
              "Le corps : optionnel, présent surtout avec POST. C'est la « lettre » envoyée : données de formulaire, contenu d'un fichier, JSON."
            ),
            code(`POST /connexion HTTP/1.1\nHost: exemple.fr\nUser-Agent: Mozilla/5.0 ...\nContent-Type: application/x-www-form-urlencoded\nCookie: session=ab12cd34ef\n\nuser=alice&pass=secret123\n^ligne de départ   ^en-têtes            ^corps`),
            h("Les en-têtes de requête à connaître"),
            list(
              "Host : le nom de domaine demandé (obligatoire en HTTP/1.1). Il révèle quel site, parmi ceux hébergés sur la même IP, est visé.",
              "User-Agent : le logiciel qui parle. Totalement falsifiable : les bots se cachent souvent derrière un navigateur connu.",
              "Cookie : les cookies du client pour ce site. Si le cookie est faible, c'est une cible.",
              "Content-Type : le format du corps (formulaire, JSON...). Il révèle le type d'API attendu.",
              "Authorization : les identifiants (Basic, Bearer JWT...). Sa présence indique un mécanisme d'authentification à tester.",
              "Referer : la page d'où vient le client. Une fuite d'informations : elle révèle la chaîne de navigation."
            ),
            h("Une réponse en trois parties"),
            p(
              "La réponse a la même structure : une ligne de statut (version, code à trois chiffres, signification), des en-têtes, et un corps (la page, le JSON, l'image, ou rien)."
            ),
            code(`HTTP/1.1 200 OK\nServer: nginx/1.18.0\nSet-Cookie: session=xyz; HttpOnly; Secure\nLocation: /accueil\nContent-Type: text/html; charset=utf-8\n\n<!doctype html> ... (le corps)`),
            h("Les en-têtes de réponse à surveiller"),
            list(
              "Server : le logiciel serveur et sa version (Apache/2.4.41, nginx/1.18). Une recherche de vulnérabilités connues commence ici.",
              "Set-Cookie : l'ordre donné au navigateur de stocker un cookie. C'est lui qui installe la session.",
              "Content-Type : le format du corps. Un JSON servi en text/html peut révéler un mauvais réglage.",
              "Location : la cible d'une redirection (avec un code 3xx).",
              "X-Powered-By : la technologie (PHP, ASP.NET...). De la divulgation d'information."
            ),
            h("L'analogie de la lettre"),
            p(
              "Une requête HTTP est une lettre : l'enveloppe porte l'adresse (la ligne de départ et les en-têtes), et la lettre elle-même est le corps. Le serveur lit l'adresse, ouvre, et rédige une lettre-réponse. C'est pour cela que l'on parle d'en-têtes (headers) : ils sont littéralement en tête du message."
            ),
            callout(
              "Règle d'or du pentester : ne fais jamais confiance à un en-tête. User-Agent, Referer, Cookie peuvent être totalement falsifiés par le client. Un serveur qui se fie à un en-tête pour une décision de sécurité prend un risque.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Une requête = ligne de départ + en-têtes + corps optionnel.",
              "Une réponse = ligne de statut + en-têtes + corps.",
              "Chaque en-tête est une métadonnée qui en dit long sur le serveur et sur le client.",
              "Le serveur est sans mémoire : il s'appuie sur les cookies pour te reconnaître."
            )
          ],
        },
        {
          id: "web-lecon-04",
          title: "Les méthodes HTTP : GET, POST, PUT, DELETE",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("La méthode : l'action voulue"),
            p(
              "La méthode HTTP (aussi appelée verbe) est le premier mot de la ligne de départ. Elle dit au serveur quelle action tu veux effectuer : lire, créer, remplacer, supprimer... C'est le vocabulaire d'actions du protocole, sans lequel le serveur ne saurait pas ton intention."
            ),
            code(`GET /panier HTTP/1.1\nPOST /recherche HTTP/1.1\nOPTIONS /api/ HTTP/1.1`),
            h("Le tableau des méthodes"),
            list(
              "GET : récupérer une ressource. Il ne doit jamais modifier l'état du serveur.",
              "POST : envoyer des données / créer. C'est le véhicule des formulaires.",
              "PUT : remplacer ou créer une ressource. S'il est autorisé sans contrôle, il permet d'écrire des fichiers sur le serveur.",
              "DELETE : supprimer une ressource. Sans contrôle d'autorisation, destruction de données.",
              "PATCH : modification partielle. Comme PUT, une écriture potentielle si mal contrôlé.",
              "HEAD : identique à GET mais sans le corps. Parfait pour la reconnaissance : tester l'existence sans télécharger.",
              "OPTIONS : demander les méthodes autorisées. Il révèle le « menu » des actions possibles.",
              "TRACE : écho de la requête reçue. À désactiver : il peut refléter des cookies (attaque XST)."
            ),
            h("GET ne doit jamais modifier l'état"),
            p(
              "GET est prévu pour lire. Si une application modifie des données à la suite d'un simple GET, c'est un bug sérieux : un navigateur peut précharger des URLs, un moteur peut indexer la page, et des conséquences non désirées se déclenchent sans l'intention de l'utilisateur. C'est aussi la porte des attaques CSRF, que tu verras au niveau 5."
            ),
            h("OPTIONS : demander le menu"),
            p(
              "Avant de tester une URL, le réflexe est d'interroger OPTIONS : le serveur répond souvent avec un en-tête Allow qui liste les méthodes acceptées. C'est le serveur qui te montre lui-même son vocabulaire autorisé."
            ),
            code(`curl -X OPTIONS -i https://lab/api\n\nHTTP/1.1 200 OK\nAllow: GET, HEAD, OPTIONS\n...`),
            h("HEAD : sonder sans télécharger"),
            p(
              "HEAD demande exactement ce que renverrait un GET, mais sans le corps. Utile pour vérifier l'existence d'un fichier ou d'un endpoint, sans en payer le poids et sans en afficher le contenu."
            ),
            code(`curl -I https://lab/admin\nHTTP/1.1 403 Forbidden\n...`),
            h("Les implications sécurité"),
            list(
              "Un serveur qui accepte PUT sans authentification : n'importe qui peut déposer un fichier, par exemple une page de phishing, directement sur le domaine.",
              "Un DELETE sans contrôle d'autorisation : destruction de données à distance.",
              "Un TRACE actif : réflexion des en-têtes, donc potentiellement des cookies si HttpOnly manque.",
              "Une méthode inattendue qui fonctionne = un serveur mal configuré ou une autorisation absente : à noter."
            ),
            callout(
              "Tester les méthodes non prévues est une étape clé du pentest web : un serveur peut accepter des actions dangereuses qu'il ne devrait pas. Mais ces tests (surtout PUT et DELETE) ne se font que sur des cibles autorisées : sur un serveur de production, une méthode destructive peut détruire des données.",
              "warning"
            ),
            h("En résumé"),
            list(
              "GET lit, POST envoie, PUT remplace, DELETE supprime, PATCH modifie partiellement.",
              "HEAD sonde sans corps, OPTIONS liste les méthodes autorisées, TRACE reflète.",
              "Tester les méthodes inattendues révèle des serveurs mal configurés.",
              "Les méthodes destructives se testent uniquement en lab."
            )
          ],
        },
        {
          id: "web-lecon-05",
          title: "Les codes de statut : de 1xx à 5xx",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Trois chiffres qui racontent tout"),
            p(
              "Le code de statut est un nombre à trois chiffres dans la première ligne de la réponse. Il dit au client ce qui s'est passé : succès, redirection, erreur du client ou du serveur. Pour le pentester, c'est un révélateur : chaque code raconte comment le serveur réagit à ta tentative, et une réaction anormale est souvent un indice."
            ),
            h("Les cinq familles"),
            p("La première décimale indique la famille. Ce langage codé est universel, compris par tous les clients du monde."),
            code(`1xx  Informational   le serveur a reçu la demande, le traitement continue\n2xx  Success         la demande a réussi\n3xx  Redirection     il faut aller voir ailleurs\n4xx  Client Error    la demande est mauvaise (côté client)\n5xx  Server Error    le serveur a échoué (côté serveur)`),
            h("Les codes à connaître par cœur"),
            list(
              "200 OK : la ressource existe et est renvoyée.",
              "201 Created : une création a réussi (un POST ou PUT a fonctionné).",
              "204 No Content : succès mais rien à renvoyer, fréquent après une modification.",
              "301 / 308 : déplacement permanent. Suis l'en-tête Location.",
              "302 / 303 : déplacement temporaire. Très utilisé après un login réussi : Location: /dashboard.",
              "400 Bad Request : requête mal formée. Tu as peut-être mal construit ta requête.",
              "401 Unauthorized : authentification requise. Le serveur ne sait pas qui tu es.",
              "403 Forbidden : tu es reconnu, mais interdit d'accès.",
              "404 Not Found : ressource inexistante. Le code normal du fuzzing.",
              "405 Method Not Allowed : la ressource existe mais pas avec cette méthode. Essaie OPTIONS.",
              "429 Too Many Requests : tu as été limité en fréquence. Ralentis.",
              "500 Internal Server Error : le serveur a planté. Un trésor : un crash est souvent déclenché par une entrée inattendue.",
              "503 Service Unavailable : serveur surchargé ou en maintenance."
            ),
            h("La nuance capitale : 401 contre 403"),
            p(
              "Le piège classique du débutant. 401 Unauthorized répond à la question « qui es-tu ? » : l'authentification (la preuve d'identité) a échoué ou manque. 403 Forbidden répond à « as-tu le droit ? » : ton identité est connue, mais l'accès est refusé. L'authentification a réussi, l'autorisation a échoué."
            ),
            p(
              "Cette nuance est cruciale en fuzzing : un site qui renvoie 403 au lieu de 404 pour une ressource inexistante divulgue l'existence d'un chemin interdit. Un 403 sur /admin prouve que /admin existe. C'est une information précieuse que tu raterais en traitant le 403 comme un simple « pas autorisé »."
            ),
            h("Lire les codes comme un pentester"),
            p(
              "Pendant un fuzzing d'annuaire, le 404 est la réponse « normale » pour un chemin absent. Tout autre code — 200, 301, 500, 403 — signale un chemin qui existe. Pendant un test de connexion, un 302 vers une page de succès confirme que les identifiants sont bons."
            ),
            code(`http://127.0.0.1:8080/admin    (Status: 403)\nhttp://127.0.0.1:8080/backup   (Status: 200)\nhttp://127.0.0.1:8080/zzz      (Status: 404)\n\nLe 403 et le 200 sont des découvertes. Le 404 est le bruit normal.`),
            callout(
              "Ne conclus jamais sur un seul code : vérifie toujours le corps de la réponse. Un serveur peut renvoyer 200 avec une page d'erreur générique pour tout chemin inexistant. Dans ce cas, on compare les tailles de réponse. Et note chaque 500 : ce sont les points où le serveur accepte des entrées malformées.",
              "tip"
            ),
            h("En résumé"),
            list(
              "1xx info, 2xx succès, 3xx redirection, 4xx erreur client, 5xx erreur serveur.",
              "401 = qui es-tu ? (authentification). 403 = tu n'as pas le droit (autorisation).",
              "En fuzzing, le 404 est normal ; tout autre code est un signal.",
              "On regarde toujours le corps et la taille, jamais seulement le code."
            )
          ],
        },
        {
          id: "web-lecon-06",
          title: "Les en-têtes HTTP : des métadonnées qui en disent long",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Qu'est-ce qu'un en-tête ?"),
            p(
              "Un en-tête est une ligne de la forme Nom: valeur qui accompagne une requête ou une réponse. Les en-têtes sont des métadonnées : ils décrivent le message, sans être le message lui-même. Et ils sont incroyablement bavards pour qui sait les lire."
            ),
            h("Du côté de la requête"),
            p(
              "Quand tu ouvres une page, ton navigateur envoie une requête qui ressemble à ceci. Chaque ligne raconte quelque chose sur le client et sur l'intention."
            ),
            code(`GET /accueil HTTP/1.1\nHost: exemple.fr\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\nCookie: session=ab12cd34\nReferer: https://moteur-de-recherche.fr/`),
            p(
              "Le Host dit quel site est demandé parmi ceux partagés sur la même adresse IP (les vhosts). Le User-Agent révèle le logiciel — et peut être menti. Le Cookie expose la session. Le Referer montre d'où l'on vient."
            ),
            h("Du côté de la réponse"),
            code(`HTTP/1.1 200 OK\nServer: nginx/1.18.0\nSet-Cookie: session=xyz; HttpOnly; Secure\nContent-Type: text/html; charset=utf-8\nX-Powered-By: PHP/7.4\nDate: Mon, 05 Jan 2026 14:22:00 GMT`),
            p(
              "Le Server et le X-Powered-By divulguent la technologie et ses versions : la première ligne d'une recherche de vulnérabilités connues (CVE). Le Set-Cookie installe la session. La Date révèle l'heure du serveur, dont la dérive peut trahir l'infrastructure."
            ),
            h("La divulgation par les en-têtes"),
            p(
              "Un site qui envoie à la fois Server: Apache/2.4.41 et X-Powered-By: PHP/7.4 te donne gratuitement son identité complète. À toi de chercher les failles connues de ces versions précises. C'est de la divulgation d'information : le serveur devrait en dire moins. Certaines entreprises retirent même ces en-têtes."
            ),
            h("Les en-têtes de sécurité (aperçu)"),
            p(
              "Certains en-têtes de réponse sont des « consignes » que le serveur donne au navigateur pour se comporter plus prudemment. Tu les détailleras à la leçon 26, mais voici leurs noms dès maintenant."
            ),
            list(
              "Content-Security-Policy (CSP) : n'exécute que les sources approuvées (contre le XSS).",
              "X-Frame-Options : interdit l'affichage dans une iframe (contre le clickjacking).",
              "Strict-Transport-Security (HSTS) : impose HTTPS pour ce domaine.",
              "X-Content-Type-Options: nosniff : interdit de « deviner » le type d'un fichier.",
              "Referrer-Policy : limite les informations envoyées dans le Referer."
            ),
            callout(
              "Retiens bien la leçon de la leçon 3 : un en-tête ne prouve rien. Le client peut forger n'importe quel en-tête de requête, et le serveur peut en omettre ou en mentir. Les en-têtes sont des indices, jamais des preuves d'identité.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Les en-têtes sont des métadonnées : Nom: valeur, en requête et en réponse.",
              "Server et X-Powered-By révèlent les technologies et versions (divulgation).",
              "Host, Cookie, Referer, Authorization racontent la requête.",
              "Les en-têtes de sécurité (CSP, XFO, HSTS...) sont des consignes au navigateur."
            )
          ],
        },
        {
          id: "web-lecon-07",
          title: "HTTPS et TLS : pourquoi le cadenas compte",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("HTTP en clair : une carte postale"),
            p(
              "HTTP en clair est une carte postale : n'importe qui sur le chemin — routeur, point Wi-Fi, fournisseur d'accès, attaquant du réseau — peut lire le contenu. Tes mots de passe, tes cookies, tes messages défilent lisibles pour tout observateur. Un mot de passe envoyé en HTTP est un secret crié dans la rue."
            ),
            h("HTTPS : la lettre scellée"),
            p(
              "HTTPS (HyperText Transfer Protocol Secure) est simplement HTTP transporté par-dessus TLS (Transport Layer Security), un protocole qui chiffre les échanges. Avec HTTPS, seul le destinataire peut lire le contenu : la carte postale devient une lettre scellée. Le web moderne exige le chiffrement pour tout : mots de passe, cookies, paiements."
            ),
            p(
              "À noter : SSL est l'ancien nom de TLS. On dit encore « certificat SSL » par habitude, mais SSL est obsolète et dangereux depuis 2015-2016. La référence aujourd'hui est TLS 1.2 et 1.3."
            ),
            h("Le handshake en quatre temps"),
            p(
              "Avant tout échange chiffré, le client et le serveur doivent se mettre d'accord sur des clés. Version simplifiée :"
            ),
            code(`1. ClientHello   : « Je supporte TLS 1.3, TLS 1.2, AES... »\n2. ServerHello   : « Utilisons TLS 1.3. Voici mon certificat. »\n3. Vérification  : le client vérifie le certificat\n                   (validité, domaine, chaîne de confiance)\n4. Échange       : les deux parties construisent la même clé secrète\n                   puis les données circulent chiffrées`),
            h("Le certificat et la chaîne de confiance"),
            p(
              "Le point crucial : avant de lui confier des secrets, le client doit vérifier à qui il parle. Un certificat est un document numérique qui associe un domaine à une clé publique, et qui est signé par une autorité. Le navigateur fait confiance aux autorités préinstallées (les racines), et le certificat du site doit être signé, directement ou indirectement, par l'une d'elles."
            ),
            code(`Autorité de certification racine (préinstallée dans ton navigateur)\n        │ signe\n        ▼\nAutorité intermédiaire (optionnelle)\n        │ signe\n        ▼\nCertificat du site (le fameux « cadenas »)\n   CN  : exemple.fr\n   SAN : exemple.fr, www.exemple.fr\n   valide du ... au ...`),
            p(
              "Le CN (Common Name) est le nom principal du certificat ; le SAN (Subject Alternative Name) est la liste des domaines autorisés — c'est lui qui est vérifié aujourd'hui. La chaîne de confiance est une chaîne de parrainage : je fais confiance à ce site parce qu'il est signé par une autorité en qui j'ai confiance."
            ),
            h("Comment TLS est attaqué"),
            list(
              "Man-in-the-middle (MITM) : l'attaquant s'intercale entre toi et le serveur. Défense : vérifier les certificats — le MITM doit présenter un certificat qui fait peur au navigateur.",
              "SSL stripping : l'attaquant transforme https:// en http:// sur ton réseau ; le navigateur voit de l'HTTP « normal ». Défense : HSTS, qui interdit l'HTTP pour ce domaine.",
              "Mauvais certificat ou auto-signé : un serveur utilise un certificat non signé par une autorité. Défense : ne jamais ignorer l'avertissement du navigateur.",
              "Versions obsolètes : SSL 3.0, TLS 1.0/1.1 ou des chiffrements faibles permettent de casser le chiffrement. Défense : n'accepter que TLS 1.2+."
            ),
            h("HSTS : interdire l'HTTP"),
            p(
              "L'en-tête Strict-Transport-Security (HSTS) dit au navigateur : « pour ce domaine, jamais d'HTTP, toujours du HTTPS ». La consigne est mémorisée après une première visite en HTTPS. C'est la défense principale contre le SSL stripping."
            ),
            callout(
              "Le « cadenas » du navigateur ne garantit pas que le site est honnête : il garantit seulement que la connexion est chiffrée et que le certificat est valide. Et dans un lab (certificat auto-signé), on utilise curl -k pour ignorer la vérification — mais jamais sur Internet : un avertissement de certificat est un danger réel.",
              "warning"
            ),
            h("En résumé"),
            list(
              "HTTPS = HTTP chiffré par TLS. SSL est l'ancien nom, obsolète.",
              "Le handshake échange des clés après vérification du certificat.",
              "La chaîne de confiance va de l'autorité racine au certificat du site (CN, SAN).",
              "Attaques : MITM, SSL stripping (contré par HSTS), mauvais certificats, versions faibles."
            )
          ],
        },
      ],
    },
    {
      id: "web-module-2",
      title: "Le côté client : le navigateur et ses secrets",
      lessons: [
        {
          id: "web-lecon-08",
          title: "HTML, CSS et JavaScript : le trio du client",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Trois langages, trois rôles"),
            p(
              "Ce qui s'affiche dans ton navigateur est produit par trois langages qui ne font pas le même métier. Les connaître, c'est savoir quoi chercher quand on inspecte un site."
            ),
            list(
              "HTML : la structure. Les murs de la maison : titres, paragraphes, images, formulaires.",
              "CSS : l'apparence. La décoration : couleurs, tailles, positions, polices.",
              "JavaScript : le comportement. L'électricité et la plomberie : interactions, animations, appels au serveur."
            ),
            code(`<!doctype html>\n<html>\n  <head><title>Ma première page</title></head>\n  <body>\n    <h1>Bonjour</h1>\n    <p>Ceci est un paragraphe de structure.</p>\n    <script>\n      console.log("Ceci est du comportement");\n    </script>\n  </body>\n</html>`),
            h("Une règle absolue : tout le client est visible"),
            p(
              "HTML, CSS et JavaScript sont téléchargés par ton navigateur : l'utilisateur peut donc tous les lire, et tous les modifier. Rien de ce qui tourne côté client n'est « caché » ni « protégé ». Une clé d'API cachée dans le JavaScript est une clé volée pour quiconque ouvre la console."
            ),
            callout(
              "Ne stocke jamais de secret dans le JavaScript : clé d'API, mot de passe, jeton. Tout ce qui part vers le navigateur est public par nature. Les développeurs inexpérimentés font cette erreur : tu la détecteras dès le niveau suivant.",
              "danger"
            ),
            h("Le JavaScript, porte des failles"),
            p(
              "Le JavaScript construit les pages dynamiques et parle au serveur. Mais s'il exécute des données non vérifiées, il peut devenir un outil d'attaque : c'est le XSS (cross-site scripting), la faille la plus répandue du web. Tu l'étudieras en détail au niveau 5 ; retiens pour l'instant qu'un script qui fait confiance à une entrée est une faille."
            ),
            h("Inspecter le code source"),
            p(
              "Tu peux voir le code source de n'importe quelle page : dans le navigateur avec un clic droit → « Afficher le code source de la page », ou en ligne de commande avec curl."
            ),
            code(`curl -s https://exemple.fr/ | head -40\n\n(les 40 premières lignes du HTML renvoyé par le serveur)`),
            h("En résumé"),
            list(
              "HTML structure, CSS apparence, JavaScript comportement.",
              "Tout le code client est visible et modifiable par l'utilisateur.",
              "Aucun secret ne doit vivre dans le navigateur.",
              "Le JavaScript qui exécute des entrées non vérifiées = faille XSS (niveau 5)."
            )
          ],
        },
        {
          id: "web-lecon-09",
          title: "Les formulaires : comment tes données voyagent",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le formulaire : la porte d'entrée du site"),
            p(
              "La quasi-totalité des interactions avec un site passe par des formulaires : connexion, recherche, inscription, paiement. Un formulaire a une action (où envoyer), une méthode (comment envoyer) et des champs (quoi envoyer). Comprendre cela, c'est comprendre où les données vont réellement atterrir."
            ),
            h("La méthode GET : les données dans l'URL"),
            p(
              "Avec GET, les données du formulaire sont encodées dans l'adresse, sous la forme nom=valeur séparés par des &. C'est parfait pour une recherche, que l'on veut pouvoir partager ou ajouter aux favoris."
            ),
            code(`https://exemple.fr/recherche?q=cadeau&cat=livres\n                       │      │        │\n                     le chemin   les paramètres`),
            p(
              "Mais cette visibilité a un coût : l'adresse complète se retrouve dans l'historique du navigateur, dans les journaux du serveur, dans l'en-tête Referer. On n'y met jamais de mot de passe."
            ),
            h("La méthode POST : les données dans le corps"),
            p(
              "Avec POST, les données voyagent dans le corps de la requête, invisible dans l'URL. C'est la méthode des connexions et des inscriptions."
            ),
            code(`POST /connexion HTTP/1.1\nHost: exemple.fr\nContent-Type: application/x-www-form-urlencoded\n\nuser=alice&pass=secret123`),
            p(
              "Attention : « invisible dans l'URL » ne veut pas dire « chiffré ». Sans HTTPS, un POST en clair est tout aussi lisible qu'un GET par quiconque observe le réseau."
            ),
            h("Reproduire un formulaire avec curl"),
            p(
              "Le pentester ne clique pas dans les formulaires : il les reproduit à la main. Le corps x-www-form-urlencoded se traduit en une option -d de curl."
            ),
            code(`curl -X POST -d "user=alice&pass=secret123" https://lab/connexion`),
            h("Les paramètres : la matière des attaques"),
            p(
              "Chaque champ d'un formulaire devient un paramètre que le serveur va traiter. Et chaque paramètre peut être modifié avant l'envoi : un champ « quantité », un champ « prix », un champ « rôle », un champ « id »... C'est exactement ce que les failles d'autorisation et d'injection exploiteront au niveau 5."
            ),
            callout(
              "Ne t'envoie jamais un mot de passe ou une donnée sensible sans HTTPS : sur un réseau Wi-Fi public, quiconque peut lire la requête. Et teste toujours tes requêtes de formulaire en lab, jamais sur une cible qui ne t'appartient pas.",
              "warning"
            ),
            h("En résumé"),
            list(
              "GET met les données dans l'URL (visible partout). POST les met dans le corps.",
              "Le format classique d'un formulaire : nom=valeur&nom2=valeur2.",
              "curl -d reproduit un formulaire : c'est la base de tout test.",
              "Chaque paramètre est modifiable : les formulaires sont la porte des failles."
            )
          ],
        },
        {
          id: "web-lecon-10",
          title: "Les cookies : la mémoire du navigateur",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("HTTP est sans état"),
            p(
              "HTTP est un protocole sans état (stateless) : chaque requête est indépendante des précédentes. Le serveur oublie tout entre deux requêtes. Sans un petit arrangement, il ne saurait pas que la page 2 que tu demandes vient de la même personne que la page 1."
            ),
            h("Le cookie : la carte d'identité de poche"),
            p(
              "Le cookie est un petit fragment de texte (quelques centaines d'octets) que le serveur demande au navigateur de stocker avec l'en-tête Set-Cookie, et que le navigateur renvoie automatiquement à chaque requête suivante vers le même site avec l'en-tête Cookie. C'est la « carte d'identité de poche » : le serveur, sans mémoire, s'en sert pour te reconnaître."
            ),
            code(`1. Serveur      :  Set-Cookie: session=ab12cd34; HttpOnly; Secure\n2. Navigateur   :  je stocke le cookie pour ce domaine\n3. Requêtes     :  Cookie: session=ab12cd34   (renvoyé automatiquement)\n4. Expiration   :  le cookie disparaît (date ou fermeture du navigateur)`),
            h("Les attributs de sécurité d'un cookie"),
            list(
              "Secure : le cookie n'est envoyé qu'en HTTPS. Sans lui, il circule en clair et peut être intercepté.",
              "HttpOnly : le cookie est invisible pour le JavaScript. Sans lui, un XSS peut le voler via document.cookie.",
              "SameSite : contrôle l'envoi du cookie entre sites (Strict, Lax, None). Sans lui, risque de CSRF.",
              "Domain : à quels domaines l'envoyer. Une portée trop large étend l'exposition.",
              "Path : à quels chemins l'envoyer. Une portée trop large inonde inutilement.",
              "Expires / Max-Age : durée de vie. Sans eux, cookie « de session », effacé à la fermeture du navigateur."
            ),
            h("Deux usages très différents"),
            p(
              "Le cookie de session (d'authentification) identifie une personne connectée. S'il est volé, l'attaquant prend l'identité de la victime : c'est le cookie le plus sensible. Le cookie de suivi (tracking) sert à la publicité pour reconnaître un visiteur entre plusieurs sites : sensible pour la vie privée, pas pour l'authentification."
            ),
            h("Analyser les cookies comme un pentester"),
            p(
              "En pentest, on regarde les cookies d'une cible en quelques secondes. Un cookie prévisible (session=1, session=2...) peut être deviné. Un cookie sans HttpOnly peut être volé par un XSS. Un cookie sans Secure circule en clair sur HTTP."
            ),
            code(`curl -sI https://lab/connexion | grep -i set-cookie\n\nSet-Cookie: session=7d3f2a...; HttpOnly; Secure; SameSite=Lax`),
            callout(
              "Le cookie de session est un sésame : s'il est volé ou deviné, l'identité tombe avec. Vérifie toujours HttpOnly, Secure et SameSite sur chaque cookie de session, et méfie-toi d'un cookie court ou incrémental.",
              "warning"
            ),
            h("En résumé"),
            list(
              "HTTP est sans état ; le cookie apporte la mémoire.",
              "Set-Cookie pose, Cookie renvoie : cycle de vie en 4 temps.",
              "Secure (HTTPS only), HttpOnly (invisible au JS), SameSite (portée entre sites).",
              "Le cookie de session est un sésame : à protéger et à analyser."
            )
          ],
        },
        {
          id: "web-lecon-11",
          title: "Les sessions : la clé et le coffre",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Distinguer cookie et session"),
            p(
              "Une session est l'ensemble du contexte d'une conversation : qui est connecté, ce qu'il y a dans le panier, ses préférences. Comme HTTP est sans mémoire, le serveur stocke ce contexte côté serveur, et le relie au client par un identifiant de session (session ID), en général porté par un cookie."
            ),
            p(
              "L'image à garder : l'identifiant est la clé, les données de la session sont le coffre, et le coffre reste côté serveur. Si tout le contexte était dans le cookie, l'utilisateur pourrait le modifier (mettre « rôle : admin »). En gardant les données côté serveur et seulement la clé chez le client, le serveur reste maître de ce qui est vrai."
            ),
            h("Le cycle d'une session"),
            code(`1. Première visite : le serveur crée un identifiant aléatoire, le pose en\n   cookie, et stocke côté serveur : session X = { rien encore }\n2. Connexion       : le serveur associe X à { utilisateur: "alice", rôle: "user" }\n3. Requêtes        : le client renvoie le cookie ; le serveur retrouve le coffre\n   et sait que c'est alice.\n4. Déconnexion     : la session est détruite, la clé ne vaut plus rien.`),
            h("L'attaque n°1 : le vol de session"),
            p(
              "Le session hijacking consiste à obtenir l'identifiant de la victime et à l'utiliser à sa place. Moyens d'obtention : vol du cookie par XSS (si pas de HttpOnly), interception sur un réseau non chiffré (si pas de Secure), journal de Referer, mauvais partage du cookie. Défenses : HttpOnly + Secure + HTTPS partout, et régénération de l'identifiant après connexion."
            ),
            h("L'attaque n°2 : la fixation de session"),
            p(
              "La session fixation consiste à imposer à la victime un identifiant que l'attaquant connaît déjà — en le posant lui-même, par exemple en lui envoyant un lien qui pose le cookie — puis à attendre qu'elle se connecte. La session devient alors celle de la victime connectée, et l'attaquant, qui connaît l'identifiant, est connecté comme elle."
            ),
            p(
              "La défense principale est simple et radicale : régénérer l'identifiant de session au moment de la connexion. Nouveau cookie après login, et l'identifiant fourni par l'URL n'est jamais accepté."
            ),
            h("Tester la gestion de session d'un site"),
            list(
              "Le cookie change-t-il après connexion ? Sinon, fixation possible.",
              "Le cookie est-il prévisible ou devinable ? Court, incrémental, encodé sans hasard.",
              "La session expire-t-elle après déconnexion et après inactivité ?",
              "Deux sessions simultanées sont-elles possibles ?",
              "HttpOnly et Secure sont-ils présents ?"
            ),
            code(`curl -c cookies.txt -d "user=alice&pass=secret" -L http://127.0.0.1:8080/login\ncat cookies.txt\ncurl -b cookies.txt http://127.0.0.1:8080/profil`),
            callout(
              "Deux requêtes curl séparées n'ont aucune mémoire l'une de l'autre : sans -c/-b, la session est perdue. Et un identifiant de session prévisible (session=1, session=2...) est devinable : c'est une faille de la classe A02 du futur niveau 5.",
              "tip"
            ),
            h("En résumé"),
            list(
              "La session = le coffre côté serveur ; l'identifiant = la clé dans le cookie.",
              "Vol de session : on prend ta clé. Fixation : on te donne une clé qu'on connaît.",
              "Défenses : clés fortes et aléatoires, régénération au login, attributs sécurisés.",
              "En test : on vérifie la prévisibilité, la régénération et l'expiration."
            )
          ],
        },
        {
          id: "web-lecon-12",
          title: "Same-Origin Policy et CORS : qui parle à qui",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("L'origine : le trio schéma + domaine + port"),
            p(
              "Avant de parler de règles, il faut une définition précise. L'origine d'une page est la combinaison de trois choses : le schéma (http ou https), le domaine (exemple.fr) et le port (443 par défaut). Deux pages ont la même origine si et seulement si les trois concordent."
            ),
            code(`https://exemple.fr:443\n^scheme    ^domaine   ^port\n\nhttps://exemple.fr/accueil  et  https://exemple.fr/profil  → même origine\nhttps://api.exemple.fr      et  https://exemple.fr          → origines différentes`),
            h("La Same-Origin Policy : la règle de base"),
            p(
              "La Same-Origin Policy (SOP) est la règle de sécurité fondamentale du navigateur : une page ne peut lire les données d'une autre origine sans autorisation explicite. Sans elle, n'importe quel site pourrait lire ta boîte mail ou ta banque en ouvrant la page en arrière-plan. La SOP protège aussi tes cookies : un site ne peut pas lire les cookies d'un autre site."
            ),
            h("CORS : l'autorisation de lire"),
            p(
              "Mais le web a besoin de faire communiquer des origines différentes (une app qui appelle une API distante). C'est le rôle du CORS (Cross-Origin Resource Sharing) : le serveur cible donne explicitement la permission de lire ses réponses, via des en-têtes."
            ),
            code(`Access-Control-Allow-Origin: https://ami-autorise.fr\nAccess-Control-Allow-Credentials: true`),
            p(
              "Le navigateur fait respecter cette règle : si l'en-tête n'autorise pas l'origine de la page, le JavaScript ne peut pas lire la réponse. C'est le serveur qui décide, pas le client."
            ),
            h("Pourquoi cela compte en sécurité"),
            list(
              "La SOP est le mur qui t'empêche, depuis un site malveillant, de lire les données de ta banque.",
              "Un CORS mal configuré (Access-Control-Allow-Origin: *) peut abaisser ce mur : on l'étudiera au niveau 5.",
              "Attention : le CORS ne protège pas le serveur contre les requêtes elles-mêmes — curl, lui, ignore totalement le CORS.",
              "Un pentester teste les en-têtes CORS : une configuration trop ouverte = fuite de données possibles."
            ),
            callout(
              "Point clé : le navigateur applique la SOP et le CORS, mais un outil comme curl ne les applique jamais. Si une API renvoie des données à curl sans authentification, c'est le serveur qui est à blâmer, pas le navigateur.",
              "info"
            ),
            h("En résumé"),
            list(
              "Une origine = schéma + domaine + port.",
              "La Same-Origin Policy interdit de lire les données d'une autre origine.",
              "CORS = l'autorisation explicite donnée par le serveur via des en-têtes.",
              "curl ignore CORS : le vrai garde-fou doit être côté serveur."
            )
          ],
        },
        {
          id: "web-lecon-13",
          title: "AJAX et fetch : les requêtes en arrière-plan",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("La page qui se met à jour sans recharger"),
            p(
              "Regarde une carte qui se déplace, un « j'aime » qui se compte, une messagerie qui reçoit des messages sans que tu fasses rien : la page ne se recharge pas. Ces applications envoient des requêtes en arrière-plan, sans rechargement : c'est AJAX (Asynchronous JavaScript And XML, aujourd'hui surtout du JSON)."
            ),
            h("fetch : l'outil moderne"),
            p(
              "La façon moderne d'envoyer une requête AJAX en JavaScript est la fonction fetch. Elle envoie une requête HTTP, attend la réponse, et la transforme en données exploitables."
            ),
            code(`fetch("https://exemple.fr/api/produits")\n  .then(function (reponse) {\n    return reponse.json();\n  })\n  .then(function (donnees) {\n    console.log(donnees);\n  });`),
            h("Comparer avec curl"),
            p(
              "Ce que fait cette fonction JavaScript, curl le fait aussi — sans navigateur, sans page. Comprendre l'un, c'est comprendre l'autre."
            ),
            code(`# côté navigateur (fetch)\nfetch("https://exemple.fr/api/produits")\n\n# même requête en curl\ncurl -s https://exemple.fr/api/produits`),
            h("Voir les requêtes AJAX : les DevTools"),
            p(
              "Quand une page fait des appels en arrière-plan, tu ne vois rien à l'écran. Mais l'onglet Réseau (Network) des DevTools enregistre chaque requête : méthode, URL, en-têtes, réponse. C'est là que se trouve la vraie conversation d'une application moderne."
            ),
            h("Pourquoi le pentester adore les requêtes AJAX"),
            list(
              "Les applications modernes exposent leurs fonctionnalités sous forme d'endpoints d'API, souvent moins protégés que les pages.",
              "Chaque appel AJAX révèle une URL, des paramètres, parfois des jetons ou des clés.",
              "Les réponses JSON sont faciles à lire et à rejouer avec curl.",
              "Tout ce que fait le JavaScript est modifiable : l'utilisateur a le contrôle final."
            ),
            callout(
              "Rappel : une clé d'API visible dans les appels fetch est une clé publique. Le serveur ne doit jamais considérer que ce qui vient du navigateur est fiable.",
              "tip"
            ),
            h("En résumé"),
            list(
              "AJAX = requêtes en arrière-plan, sans recharger la page.",
              "fetch est l'outil JavaScript moderne ; curl fait la même chose en ligne de commande.",
              "Les DevTools montrent chaque requête AJAX avec ses en-têtes.",
              "Les endpoints d'API vus dans le trafic sont des cibles de choix."
            )
          ],
        },
        {
          id: "web-lecon-13b",
          title: "Quiz — Le navigateur et ses secrets",
          type: "quiz",
          duration: "8 min",
          blocks: [
            p(
              "Vérifie tes acquis sur le côté client du web : HTML, formulaires, cookies et requêtes."
            ),
          ],
          quiz: [
            {
              question:
                "Pourquoi ne doit-on jamais cacher un secret dans le JavaScript ?",
              options: [
                "Parce que tout le code client est visible et modifiable",
                "Parce que le JavaScript ne peut pas stocker de variables",
                "Parce que les navigateurs interdisent les chaînes",
                "Parce que le JavaScript chiffre automatiquement",
              ],
              answer: 0,
              explanation:
                "HTML, CSS et JavaScript sont téléchargés par le navigateur : tout ce qui y vit est public par nature.",
            },
            {
              question: "Avec GET, où sont placées les données d'un formulaire ?",
              options: [
                "Dans l'URL, sous forme nom=valeur",
                "Dans le corps de la requête",
                "Dans un cookie",
                "Dans l'en-tête User-Agent",
              ],
              answer: 0,
              explanation:
                "GET encode les données dans l'adresse. POST les met dans le corps de la requête.",
            },
            {
              question: "L'attribut HttpOnly sur un cookie de session...",
              options: [
                "Le rend invisible pour le JavaScript",
                "Le chiffre de bout en bout",
                "L'empêche d'expirer",
                "Le rend plus rapide à envoyer",
              ],
              answer: 0,
              explanation:
                "HttpOnly empêche le JavaScript (et donc une éventuelle XSS) de lire le cookie.",
            },
            {
              question: "Que fait la Same-Origin Policy ?",
              options: [
                "Elle empêche une page de lire les données d'une autre origine",
                "Elle chiffre toutes les requêtes",
                "Elle bloque les images",
                "Elle désactive les cookies",
              ],
              answer: 0,
              explanation:
                "La SOP est le mur de sécurité fondamental du navigateur : une page ne peut lire les données d'une autre origine sans autorisation.",
            },
          ],
        },
      ],
    },
    {
      id: "web-module-3",
      title: "Le côté serveur : l'architecture des applications",
      lessons: [
        {
          id: "web-lecon-14",
          title: "L'architecture d'une application web : les 3 tiers",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Une app web est un système en couches"),
            p(
              "Une application web n'est pas un programme unique : c'est un système en couches qui transforme une requête HTTP en action réelle. L'architecture classique est dite 3-tiers : le client (ce qui s'affiche), le serveur d'application (la logique) et la base de données (le stockage)."
            ),
            h("Les trois tiers"),
            list(
              "Client (front-end) : le navigateur exécute HTML, CSS et JavaScript. C'est la seule partie visible. Il envoie des requêtes au serveur.",
              "Serveur d'application (back-end) : le programme qui exécute la logique métier. Il reçoit les requêtes, décide quoi faire (vérifier la session, calculer un prix, chercher un article) et répond. Technos courantes : Node.js, PHP, Python, Java, Go.",
              "Base de données : le stockage. SQL (MySQL, PostgreSQL, SQLite) ou NoSQL (MongoDB). Elle stocke utilisateurs, articles, commandes, sessions."
            ),
            h("Le chemin d'une requête"),
            code(`[ Navigateur ]\n     │  HTML + CSS + JavaScript (le client)\n     │      │\n     │      └── AJAX ─▶ [ API REST (serveur d'application) ]\n     │                        │  logique métier\n     │                        ▼\n     │               [ Base de données ]\n     │      ◀── réponse JSON ──┘\n     ▼\n [ Mise à jour partielle de la page ]`),
            h("Pourquoi séparer les couches ?"),
            p(
              "Séparer les couches permet de faire évoluer, réparer et sécuriser chaque partie indépendamment. Le serveur n'expose que ce dont le client a besoin ; la base de données reste cachée derrière lui. Et surtout : comprendre cette architecture, c'est savoir où chercher quand on teste."
            ),
            h("Où un pentester cherche-t-il ?"),
            list(
              "Le front : XSS dans les champs, comportements du JavaScript, identifiants exposés.",
              "L'API : entrées non validées, autorisations absentes, endpoints oubliés (/api/, /v1/, /graphql).",
              "Le serveur : versions, configuration, fichiers exposés.",
              "Les endpoints d'API sont souvent des mines : moins testés, parfois protégés plus faiblement que la partie publique."
            ),
            callout(
              "Règle absolue de l'architecture : le client n'est jamais une source de vérité. Tout ce qui tourne dans le navigateur (JavaScript, données, clés API) est visible et modifiable par l'utilisateur. Le serveur doit valider ce qu'il reçoit.",
              "info"
            ),
            h("En résumé"),
            list(
              "Une app web = client + serveur d'application + base de données.",
              "Les requêtes passent par HTTP, souvent via une API REST, en AJAX.",
              "Le serveur n'expose que ce dont le client a besoin.",
              "Le pentester cherche la faille dans l'une de ces couches ; l'API est un terrain privilégié."
            )
          ],
        },
        {
          id: "web-lecon-15",
          title: "Les serveurs web : Nginx et Apache",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Le serveur web : le facteur qui répond"),
            p(
              "Le serveur web est le programme qui reçoit les requêtes HTTP et renvoie les réponses : il lit la requête, trouve la ressource demandée ou appelle l'application, et renvoie le résultat. C'est le premier maillon du côté serveur, et le premier que tu rencontres quand tu testes."
            ),
            h("Apache et Nginx : les deux géants"),
            list(
              "Apache : le vétéran (1995). Très configurable, célèbre pour ses fichiers .htaccess par répertoire.",
              "Nginx : plus récent (2004), très rapide, champion des serveurs de contenu statique et des proxies.",
              "Tous deux sont présents sur la majorité des sites du monde : savoir les reconnaître est essentiel."
            ),
            h("Le serveur se révèle dans l'en-tête Server"),
            p(
              "Le premier geste d'un pentester sur une cible inconnue : lire les en-têtes. L'en-tête Server dit quel logiciel tourne et souvent quelle version. Avec la version, on cherche les vulnérabilités connues."
            ),
            code(`curl -sI https://exemple.fr\n\nHTTP/1.1 200 OK\nServer: nginx/1.18.0\nDate: Mon, 05 Jan 2026 14:22:00 GMT\n...`),
            h("Les fichiers de configuration"),
            p(
              "Chaque serveur a ses fichiers de configuration, que l'on retrouve dans les labs et sur les machines Linux."
            ),
            code(`/etc/nginx/nginx.conf          (Nginx : configuration principale)\n/etc/nginx/sites-enabled/     (les sites de Nginx)\n/etc/apache2/apache2.conf     (Apache : configuration principale)\n/etc/apache2/sites-enabled/   (les sites d'Apache)`),
            h("Les vhosts : plusieurs sites, une seule IP"),
            p(
              "Une seule adresse IP peut héberger des dizaines de sites. C'est l'en-tête Host qui dit au serveur lequel servir. C'est pour cela que Host est obligatoire en HTTP/1.1 : sans lui, le serveur ne sait pas quelle application invoquer. En pentest, tester un autre Host peut révéler des sites internes oubliés."
            ),
            callout(
              "Un serveur web mal configuré est une porte ouverte : listage de répertoires, fichiers de config exposés, versions obsolètes avec failles connues. C'est souvent la première faille que tu trouveras — et la plus bête.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Le serveur web reçoit la requête et renvoie la réponse.",
              "Apache et Nginx dominent le web ; l'en-tête Server révèle leur version.",
              "Les vhosts permettent plusieurs sites sur une IP, choisis via l'en-tête Host.",
              "La configuration par défaut est rarement sûre : on la vérifie."
            )
          ],
        },
        {
          id: "web-lecon-16",
          title: "Reverse proxy et load balancing",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le reverse proxy : le standard d'immeuble"),
            p(
              "Un reverse proxy est un programme placé devant les serveurs : tout le trafic entrant passe par lui, et il le transmet aux serveurs internes. C'est le standard d'immeuble qui reçoit le courrier à l'adresse publique et le distribue aux appartements."
            ),
            code(`Client\n   │\n   ▼\n[ Reverse proxy / Load balancer ]   ← le seul exposé sur Internet\n   │              │\n   ▼              ▼\n[ Serveur 1 ]  [ Serveur 2 ]        ← cachés derrière, sur le réseau interne`),
            h("Ce que le reverse proxy apporte"),
            list(
              "TLS centralisé : une seule configuration HTTPS devant tous les serveurs.",
              "Protection : il peut bloquer des attaques, limiter le débit, filtrer.",
              "Cache : les réponses statiques sont servies sans recharger l'application.",
              "Masquage : les serveurs internes n'ont pas d'adresse publique : ils sont invisibles."
            ),
            h("Le load balancer : répartir la charge"),
            p(
              "Quand un site reçoit trop de requêtes pour une seule machine, on en met plusieurs derrière un load balancer, qui répartit le trafic entre elles. L'utilisateur ne voit jamais qu'il parle à trois machines différentes : pour lui, c'est un seul site."
            ),
            h("Les en-têtes ajoutés par les proxies"),
            p(
              "Les proxies et load balancers ajoutent des en-têtes pour transmettre l'information au serveur final. Les deux plus connus : X-Forwarded-For (l'adresse IP d'origine du client) et X-Forwarded-Proto (le schéma d'origine)."
            ),
            code(`X-Forwarded-For: 203.0.113.5\nX-Forwarded-Proto: https`),
            p(
              "Piège à retenir : ces en-têtes sont fournis par le client... ou peuvent l'être. Un attaquant peut forger X-Forwarded-For pour mentir sur son origine, et certains serveurs s'y fient pour autoriser l'accès (par exemple « autoriser les IP internes »). Tu verras ces contournements au niveau 5."
            ),
            callout(
              "Quand tu testes, rappelle-toi : derrière un proxy, la vraie IP et la vraie architecture sont cachées. L'en-tête Server que tu vois peut être celui du proxy, pas celui de l'application. Et un X-Forwarded-For forgé peut révéler une confiance excessive.",
              "info"
            ),
            h("En résumé"),
            list(
              "Le reverse proxy se place devant les serveurs : TLS, protection, cache, masquage.",
              "Le load balancer répartit le trafic entre plusieurs machines.",
              "X-Forwarded-For et X-Forwarded-Proto transmettent l'information d'origine.",
              "Ces en-têtes sont falsifiables : un serveur qui s'y fie est vulnérable."
            )
          ],
        },
        {
          id: "web-lecon-17",
          title: "Bases de données et SQL",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le stockage central"),
            p(
              "Derrière presque chaque application web, il y a une base de données : le cerveau qui stocke les utilisateurs, les articles, les commandes, les messages. Elle est cachée derrière le serveur d'application, mais c'est la pièce la plus précieuse : c'est là que sont les secrets."
            ),
            h("SQL : le langage des bases relationnelles"),
            p(
              "SQL (Structured Query Language) est le langage pour interroger les bases relationnelles. Quatre opérations de base, calquées sur le CRUD : SELECT (lire), INSERT (créer), UPDATE (modifier), DELETE (supprimer)."
            ),
            code(`SELECT nom, email FROM utilisateurs WHERE id = 42;\n\nSELECT    → je veux lire\nnom, email → quelles colonnes\nFROM utilisateurs → dans quelle table\nWHERE id = 42 → pour quelle ligne`),
            h("L'analogie du tableur géant"),
            p(
              "Une base relationnelle est un tableur géant et organisé : des tableaux (tables) à colonnes (champs) et lignes (enregistrements), reliés entre eux. Les utilisateurs dans une table, les commandes dans une autre, reliées par l'identifiant de l'utilisateur."
            ),
            h("Les bases que tu croiseras"),
            list(
              "MySQL : très répandue dans le web (le M de LAMP).",
              "PostgreSQL : robuste et open source, appréciée des applications modernes.",
              "SQLite : une base dans un fichier, parfaite pour les petites apps et les labs.",
              "MongoDB : une base NoSQL, qui stocke des documents JSON au lieu de tables."
            ),
            h("L'erreur fatale : l'entrée de l'utilisateur dans une requête"),
            p(
              "Le serveur doit souvent chercher un utilisateur par son nom. Si le programme colle directement la valeur reçue du client dans la requête SQL, l'utilisateur peut écrire du SQL à la place d'une valeur : c'est l'injection SQL, la faille la plus destructrice du web. Un exemple célèbre de requête que l'on peut provoquer :"
            ),
            code(`SELECT * FROM utilisateurs\nWHERE user = 'admin' AND pass = '' OR '1'='1';\n\n                     '------ la valeur entrée par l'utilisateur ------'\nSi le programme colle cette valeur dans la requête, la condition OR '1'='1'\nest toujours vraie : l'attaquant entre sans mot de passe.`),
            callout(
              "L'injection SQL peut révéler toute une base de données : mots de passe, cartes bancaires, documents. C'est une faille de la classe A03 du niveau 5, que tu exploiteras en détail. Retiens le principe dès maintenant : une base de données qui ne valide pas ses entrées est une bombe.",
              "danger"
            ),
            h("En résumé"),
            list(
              "La base de données stocke les données précieuses derrière le serveur.",
              "SQL lit (SELECT), écrit (INSERT), modifie (UPDATE), supprime (DELETE).",
              "MySQL, PostgreSQL, SQLite, MongoDB sont les bases courantes.",
              "Coller une entrée utilisateur dans une requête SQL = injection SQL."
            )
          ],
        },
        {
          id: "web-lecon-18",
          title: "Les API REST et le JSON",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Une application sans pages : les API"),
            p(
              "Les applications modernes ne servent plus toujours des pages : elles exposent des services, des API, que les pages comme les applications mobiles vont interroger. L'utilisateur final ne voit jamais l'API ; il voit son résultat."
            ),
            h("REST : des ressources et des méthodes"),
            p(
              "REST (REpresentational State Transfer) est un style d'API où les ressources (utilisateurs, articles) sont identifiées par des URLs et manipulées avec les méthodes HTTP que tu connais déjà."
            ),
            code(`GET    /api/users      → liste les utilisateurs\nGET    /api/users/5    → lit l'utilisateur 5\nPOST   /api/users      → crée un utilisateur\nPATCH  /api/users/5    → modifie partiellement l'utilisateur 5\nDELETE /api/users/5    → supprime l'utilisateur 5`),
            h("Le JSON : le format des réponses"),
            p(
              "Les réponses d'une API REST sont typiquement du JSON (JavaScript Object Notation), un format texte simple composé de couples nom: valeur. Il se lit et se construit à la main : un atout pour le pentester."
            ),
            code(`{\n  "id": 42,\n  "nom": "Alice",\n  "email": "alice@exemple.fr",\n  "roles": ["user"]\n}`),
            h("Tester une API à la main avec curl"),
            p(
              "Le navigateur te cache les appels API. curl, lui, les parle couramment. Pour du JSON, on envoie l'en-tête Content-Type approprié et un corps au format JSON."
            ),
            code(`curl -s https://exemple.fr/api/users\n\ncurl -s -X POST https://exemple.fr/api/users \\\n  -H "Content-Type: application/json" \\\n  -d '{"nom": "Bob", "email": "bob@exemple.fr"}'`),
            h("Les bonnes pratiques côté serveur"),
            list(
              "Valider chaque entrée reçue du client : format, longueur, type, plage.",
              "Vérifier les autorisations sur chaque endpoint, pas seulement à l'entrée.",
              "Ne jamais exposer de clés, de secrets ou d'objets internes dans les réponses.",
              "Ne jamais faire confiance à un paramètre venu du client (prix, rôle, quantité)."
            ),
            callout(
              "Une API qui fait confiance au client est une faille. Un exemple classique : l'application envoie la quantité et le prix avec la requête, et le serveur les accepte sans vérifier le stock. L'utilisateur peut alors mettre une quantité négative ou modifier le prix. Le serveur doit être la seule source de vérité.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Les API REST exposent des ressources via des URLs et les méthodes HTTP.",
              "Le JSON est le format des réponses : simple à lire, simple à forger.",
              "curl -H \"Content-Type: application/json\" -d '...' parle à une API.",
              "Valider les entrées et vérifier les autorisations : la base de la sécurité d'une API."
            )
          ],
        },
        {
          id: "web-lecon-19",
          title: "L'authentification : sessions, JWT et OAuth",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le problème de l'identité"),
            p(
              "Comment le serveur sait-il que tu es toi ? Trois grandes familles de solutions coexistent : les sessions classiques (avec cookie), les jetons signés (JWT), et la délégation (OAuth). Les reconnaître, c'est savoir ce que tu testes."
            ),
            h("La session classique : cookie + coffre serveur"),
            p(
              "C'est le mécanisme de la leçon 11 : le serveur stocke la session côté serveur (le coffre) et donne au client une clé dans un cookie. Simple, efficace, et tout le savoir reste côté serveur. On la repère aux cookies PHPSESSID, JSESSIONID ou ASP.NET_SessionId."
            ),
            h("JWT : le jeton qui contient tout"),
            p(
              "Le JWT (JSON Web Token) inverse la logique : au lieu d'une clé vers un coffre serveur, c'est un jeton autonome qui contient les informations, signé par le serveur pour qu'elles ne puissent pas être modifiées. Il se présente en trois parties séparées par des points."
            ),
            code(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWxpY2UiLCJyb2xlIjoidXNlciJ9.tXv...

header     : {"alg":"HS256","typ":"JWT"}     (l'algorithme)\npayload    : {"user":"alice","role":"user"} (les données)\nsignature  : vérifie que rien n'a été modifié (signée par le serveur)`),
            p(
              "En-tête et payload sont simplement encodés : n'importe qui peut les lire. Seule la signature protège leur intégrité. Un JWT avec un algorithme faible ou un secret devinable est un trésor pour l'attaquant (niveau 5)."
            ),
            h("OAuth : déléguer la connexion"),
            p(
              "Le bouton « Se connecter avec Google » repose sur OAuth : ton application demande à un fournisseur d'identité de confirmer qui tu es, puis reçoit un jeton qu'elle présente à ses propres serveurs. L'application ne stocke pas ton mot de passe : elle délègue la vérification."
            ),
            h("Les pièges de l'authentification"),
            list(
              "Un identifiant de session dans l'URL : il se retrouve dans les journaux et l'historique. Interdit.",
              "Des jetons sans expiration : volés une fois, valables pour toujours.",
              "Un JWT avec un secret faible ou un algorithme « none » : la signature peut être contournée.",
              "Pas de régénération du cookie après connexion : fixation de session possible.",
              "Des sessions qui n'expirent jamais, même après déconnexion."
            ),
            callout(
              "Retiens la règle d'or : jamais d'identifiant de session dans l'URL, jamais de secret dans le client, toujours une expiration réelle. Ces trois réflexes t'éviteront la plupart des failles d'authentification.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Sessions : une clé dans le cookie, le coffre côté serveur.",
              "JWT : un jeton autonome signé (header.payload.signature), lisible par tous.",
              "OAuth : déléguer la vérification d'identité à un fournisseur.",
              "Les pièges : jetons dans l'URL, secrets faibles, absence d'expiration, fixation."
            )
          ],
        },
      ],
    },
    {
      id: "web-module-4",
      title: "La boîte à outils du pentester web",
      lessons: [
        {
          id: "web-lecon-20",
          title: "Les DevTools : voir le trafic du navigateur",
          type: "exercise",
          duration: "15 min",
          blocks: [
            h("Objectif"),
            p(
              "Le navigateur te montre la page finale, pas la mécanique. Les DevTools (outils de développement, touche F12) te montrent la mécanique : chaque requête, chaque en-tête, chaque stockage. C'est le premier réflexe de tout pentester web."
            ),
            h("Ouvrir les DevTools"),
            p(
              "Dans n'importe quel navigateur moderne, la touche F12 ouvre les outils de développement. Les onglets importants pour nous : Réseau (Network), Console, Sources et Application."
            ),
            h("L'onglet Réseau : la conversation réelle"),
            list(
              "Chaque requête générée par la page y apparaît : documents, images, scripts, appels AJAX.",
              "Clique sur une requête pour voir ses en-têtes, sa réponse, son timing.",
              "La barre de filtre permet de ne garder que les requêtes d'un type (XHR/fetch).",
              "L'onglet Réseau ne ment pas : c'est ce qui est réellement envoyé et reçu."
            ),
            h("L'onglet Application : cookies et stockage"),
            p(
              "L'onglet Application liste les cookies du site avec leurs attributs, et les stockages locaux (localStorage, sessionStorage). Utile pour vérifier d'un coup d'œil HttpOnly, Secure, SameSite, et pour repérer des données sensibles stockées dans le navigateur."
            ),
            h("L'onglet Sources : le code du client"),
            p(
              "Sources affiche tous les fichiers chargés par la page : HTML, CSS, JavaScript. On peut y chercher des clés d'API, des endpoints, des commentaires oubliés. Rappelle-toi la leçon 8 : tout ce qui est ici est public."
            ),
            h("Exercice guidé"),
            p(
              "Ouvre https://httpbin.org/get dans ton navigateur, puis F12 → onglet Réseau, et recharge la page. Observe la requête, ses en-têtes, et la réponse JSON. En parallèle, la même requête en ligne de commande :"
            ),
            code(`curl -v https://httpbin.org/get`),
            p(
              "Compare : ce que le navigateur envoie (User-Agent, Accept, cookies...) et ce que curl envoie. Tu viens de voir de tes propres yeux ce que le mode verbeux de curl révèle."
            ),
            callout(
              "Les DevTools fonctionnent sur n'importe quelle page que tu consultes : regarder, c'est toujours autorisé. Mais modifier des requêtes, scanner, ou tester n'est légal que sur tes machines, tes apps, ou des cibles autorisées.",
              "danger"
            ),
            h("En résumé"),
            list(
              "F12 ouvre les DevTools : Réseau, Application, Sources, Console.",
              "L'onglet Réseau montre chaque requête avec ses en-têtes et sa réponse.",
              "L'onglet Application montre les cookies et leurs attributs.",
              "Les DevTools sont le pont entre le navigateur et curl."
            )
          ],
        },
        {
          id: "web-lecon-21",
          title: "curl en profondeur : ton couteau suisse",
          type: "exercise",
          duration: "16 min",
          blocks: [
            h("Objectif"),
            p(
              "curl est l'outil de requêtes HTTP le plus répandu sur Linux et macOS : la loupe du pentester. Il ne cache rien, n'exécute pas de JavaScript et te laisse contrôler chaque détail de la requête. Cette leçon te donne les options indispensables."
            ),
            h("Les options de base"),
            list(
              "-s : silencieux, sans la barre de progression.",
              "-v : verbeux, affiche toute la conversation (en-têtes compris).",
              "-i : affiche les en-têtes de réponse avec le contenu.",
              "-I : HEAD uniquement, les en-têtes sans le contenu.",
              "-X : choisit la méthode (GET, POST, PUT, DELETE...).",
              "-H : ajoute un en-tête personnalisé.",
              "-d : envoie des données dans le corps (POST).",
              "-b : envoie un cookie ; -c : enregistre les cookies reçus.",
              "-L : suit les redirections."
            ),
            h("Interroger des serveurs différents"),
            p(
              "Tu peux tester n'importe quelle URL, IP ou hôte, avec ou sans port : c'est ainsi qu'on interroge des services internes ou des machines d'un réseau."
            ),
            code(`curl -s http://10.10.10.5/                 # un serveur web\ncurl -sI http://10.10.10.5:8080/            # un serveur sur un autre port\ncurl -sI https://exemple.fr/                # un site en HTTPS\ncurl -sI http://10.10.10.5:1337/            # un port inhabituel`),
            h("Envoyer des méthodes et des données"),
            p(
              "La même option -d change de méthode selon le contexte : -d seule fait un POST classique (application/x-www-form-urlencoded), comme un formulaire."
            ),
            code(`curl -X POST -d "user=alice&pass=secret" http://localhost:8080/login\ncurl -X PUT  -d '{"prix": 0}' -H "Content-Type: application/json" http://localhost:8080/api/commande/12`),
            h("Suivre les redirections et les cookies"),
            p(
              "Beaucoup de sites font des redirections (301/302). Sans -L, curl s'arrête ; avec -L, il suit. Et -c/-b permettent de garder une session comme le navigateur."
            ),
            code(`curl -sL -c cookies.txt http://localhost:8080/login -d "user=alice&pass=secret"\ncurl -s -b cookies.txt http://localhost:8080/profil`),
            h("Comprendre le mode verbeux"),
            p(
              "L'option -v affiche chaque étape : résolution DNS, connexion TCP, envoi des en-têtes, réception de la réponse. Pour le pentester, c'est la traduction exacte de ce que le serveur a vu."
            ),
            code(`$ curl -sv https://exemple.fr/\n* Resolving example.com: 93.184.215.14\n> GET / HTTP/2\n> Host: exemple.fr\n> User-Agent: curl/8.4.0\n<\n< HTTP/2 200\n< server: nginx/1.24.0`),
            callout(
              "curl n'exécute pas JavaScript et n'applique ni Same-Origin Policy ni CORS : il fait exactement ce que tu lui demandes. C'est sa force, mais aussi une responsabilité : ces requêtes doivent rester dans les limites de tes autorisations.",
              "warning"
            ),
            h("En résumé"),
            list(
              "-v, -i, -I, -L : voir la conversation complète et suivre les redirections.",
              "-X, -d, -H : contrôler méthode, corps et en-têtes.",
              "-b, -c : gérer les cookies comme un navigateur.",
              "curl ne cache rien et n'exécute rien : tu contrôles tout."
            )
          ],
        },
        {
          id: "web-lecon-22",
          title: "Burp Suite et OWASP ZAP : l'atelier du pentester",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Le proxy intercepteur : placer un miroir"),
            p(
              "Les DevTools montrent le trafic, mais ne permettent pas de le modifier à la volée. Les outils d'interception (Burp Suite, OWASP ZAP) se placent entre le navigateur et le serveur : un miroir où tu vois, arrêtes et modifies chaque requête avant qu'elle parte."
            ),
            code(`[ Navigateur ]  ⇄  [ PROXY (Burp / ZAP) ]  ⇄  [ Serveur ]\n                      ↑\n              tout passe par ici :\n              tu peux voir, modifier, rejouer`),
            h("Burp Suite : la référence commerciale"),
            p(
              "Burp Suite est l'outil de référence du pentest web : un proxy intercepteur riche, avec répéteur (rejouer une requête modifiée), intruder (fuzzing automatisé), et bien plus. La version gratuite (Community) suffit pour apprendre."
            ),
            h("OWASP ZAP : l'alternative libre"),
            p(
              "ZAP (Zed Attack Proxy) est le jumeau libre et open source, géré par l'OWASP. Même principe : proxy, interception, scan automatisé, répéteur. C'est l'outil recommandé pour débuter sans licence."
            ),
            h("Ce qu'un proxy intercepteur sait faire"),
            list(
              "Intercepter et modifier une requête avant son envoi : changer une valeur, un cookie, une méthode.",
              "Rejouer une requête telle quelle (répéteur) : tester une entrée modifiée sans repasser par la page.",
              "Suivre une session entière : cookies, jetons, redirections.",
              "Scanner automatiquement des failles connues (dans les versions complètes)."
            ),
            h("Le flux de travail type"),
            p(
              "Tu navigues normalement dans ton navigateur configuré pour passer par le proxy ; chaque requête apparaît dans l'outil. Tu en reprends une, tu la modifies dans le répéteur, et tu observes la réponse. Cette boucle « je maîtrise la requête » est le cœur du test web manuel."
            ),
            h("Ce que l'automatisation ne remplace pas"),
            p(
              "Un scan automatique trouve des failles connues, mais pas les failles logiques : une autorisation manquante, une promotion de rôle, un paramètre oublié. Ces failles-là se trouvent en réfléchissant, pas en lançant un scanner. Tu apprendras cette réflexion au niveau 5."
            ),
            callout(
              "Burp et ZAP s'installent et se testent librement sur ton propre site ou un lab local. Lancer un scan contre un site qui ne t'appartient pas sans autorisation est illégal, même avec un scanner « qui fait tout tout seul ».",
              "danger"
            ),
            h("En résumé"),
            list(
              "Burp Suite et OWASP ZAP sont des proxies intercepteurs : voir, modifier, rejouer.",
              "Le répéteur rejoue une requête modifiée : la boucle d'exploration du pentester.",
              "Burp = référence commerciale (version Community gratuite) ; ZAP = libre et open source.",
              "Les scanners ne remplacent pas la réflexion : les failles logiques restent à toi de trouver."
            )
          ],
        },
        {
          id: "web-lecon-23",
          title: "L'énumération : explorer les répertoires et fichiers",
          type: "exercise",
          duration: "16 min",
          blocks: [
            h("Objectif"),
            p(
              "Un site ne se limite jamais à sa page d'accueil : il cache des répertoires, des fichiers de sauvegarde, des panneaux d'administration, des fichiers de configuration. Les découvrir, c'est faire de l'énumération. C'est la première phase de tout test : la reconnaissance."
            ),
            h("Tester les chemins probables à la main"),
            p(
              "Avant tout outil, le bon sens : de nombreuses ressources ont des noms prévisibles. Une petite liste à tester à la main, en cherchant les statuts différents de 404."
            ),
            code(`/admin        /login        /backup\n/robots.txt   /sitemap.xml  /.git/\n/config       /api/         /phpmyadmin\n/.env         /index.php.bak\n\n$ curl -s -o /dev/null -w "%{http_code}\\n" http://10.10.10.5/admin\n404\n$ curl -s -o /dev/null -w "%{http_code}\\n" http://10.10.10.5/robots.txt\n200`),
            h("robots.txt : la carte que le site t'offre"),
            p(
              "Le fichier robots.txt existe pour dire aux moteurs de recherche quoi indexer... ou pas. Paradoxalement, il révèle souvent des chemins que le propriétaire veut cacher. Un pentester le lit en premier : tout ce qui est exclu est potentiellement intéressant."
            ),
            code(`User-agent: *\nDisallow: /admin\nDisallow: /private/rapports-2025.pdf\nDisallow: /config/`),
            h("L'énumération automatisée avec une liste de mots"),
            p(
              "La méthode à la main s'arrête vite. L'automatisation consiste à tester des centaines de mots avec un dictionnaire de noms probables. L'outil standard est gobuster (recommandé) ou ffuf, que tu peux apprendre par toi-même avec le man :"
            ),
            code(`$ gobuster dir -u http://10.10.10.5/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt\n\n/admin                 (Status: 301)\n/assets                (Status: 200)\n/server-status         (Status: 403)\n`),
            h("Lire les résultats : la statuette magique"),
            p(
              "200 = la ressource existe ; 301 = elle existe et redirige ; 403 = elle existe mais refusée (donc intéressante) ; 404 = elle n'existe pas. C'est la différence entre 403 et 404 qui est précieuse : un 403 confirme que le chemin existe mais est protégé."
            ),
            callout(
              "L'énumération est de la reconnaissance : elle se fait sur des cibles autorisées uniquement. Sur un lab, tout est permis ; sur le net, elle est illégale sans autorisation écrite.",
              "danger"
            ),
            h("En résumé"),
            list(
              "L'énumération découvre les répertoires et fichiers cachés d'un site.",
              "robots.txt et les noms prévisibles (/admin, /backup) donnent les premiers indices.",
              "gobuster ou ffuf testent des listes de mots en masse.",
              "403 ≠ 404 : une ressource refusée est souvent une ressource réelle."
            )
          ],
        },
        {
          id: "web-lecon-24",
          title: "Le fuzzing : tester toutes les entrées possibles",
          type: "exercise",
          duration: "16 min",
          blocks: [
            h("Objectif"),
            p(
              "Quand une entrée d'une application peut prendre des valeurs inattendues, il faut les tester : c'est le fuzzing. On envoie à un paramètre des tonnes de valeurs (longues, bizarres, avec des caractères spéciaux) et on observe la réponse. Le fuzzing trouve des failles que l'œil humain ne devine pas."
            ),
            h("Où fouille-t-on ?"),
            list(
              "Les paramètres d'une URL : ?id=42, ?page=accueil, ?role=user.",
              "Les champs de formulaires : texte, nombres, email, dates.",
              "Les en-têtes : User-Agent, Referer, Host, X-Forwarded-For.",
              "Les cookies : valeur, nom, attributs.",
              "Les identifiants en chemin : /users/42, /articles/12, /fichier/3."
            ),
            h("Tester à la main, d'abord"),
            p(
              "Quelques valeurs suffisent pour commencer : des valeurs absentes, nulles, négatives, énormes, avec des caractères spéciaux, avec du texte au lieu d'un nombre."
            ),
            code(`$ curl -s "http://localhost:8080/articles?id="\n$ curl -s "http://localhost:8080/articles?id=0"\n$ curl -s "http://localhost:8080/articles?id=-1"\n$ curl -s "http://localhost:8080/articles?id=999999"\n$ curl -s "http://localhost:8080/articles?id=abc"\n\nComparer les réponses : une d'entre elles sort-elle du lot ?`),
            h("Charger la liste avec un outil"),
            p(
              "Pour tester des centaines de valeurs, on génère les requêtes en boucle. En bash, une boucle avec curl fait le travail ; ffuf et Burp Intruder font la même chose plus vite et mieux."
            ),
            code(`for id in 0 1 2 3 4 10 100 1000 -1 abc none null; do\n  echo "--- id=\\$id ---"\n  curl -s "http://localhost:8080/articles?id=\\$id"\ndone`),
            h("Lire la réponse : l'erreur est une information"),
            p(
              "Une valeur inattendue provoque souvent une erreur différente : un message détaillé, un code 500, une trace de pile, du SQL dans le texte. Chaque écart est une information : le serveur n'a pas su gérer cette entrée, ce qui est exactement ce qu'on cherchait à savoir."
            ),
            callout(
              "Le fuzzing est du test de robustesse : les valeurs sont volontairement aberrantes, et c'est le serveur qui doit les refuser proprement. À toi de distinguer « l'appli a renvoyé une belle page d'erreur » (bien) de « l'appli a envoyé une requête SQL avec mes données » (très mal).",
              "warning"
            ),
            h("En résumé"),
            list(
              "Le fuzzing envoie des valeurs inattendues à chaque entrée de l'application.",
              "On commence à la main : valeurs nulles, négatives, énormes, avec caractères spéciaux.",
              "La boucle bash + curl automatise ; ffuf et Burp Intruder passent à l'échelle.",
              "Chaque erreur est une information : le serveur n'a pas su gérer une entrée."
            )
          ],
        },
        {
          id: "web-lecon-25",
          title: "Reconnaître une vulnérabilité : les indices",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le but de toutes les étapes précédentes"),
            p(
              "Recon, énumération, fuzzing, test des paramètres : tout cela sert à repérer des indices, des anomalies qui trahissent une faille. Cette leçon t'apprend à lire ces indices et à les trier. Un pentester n'est pas quelqu'un qui lance des outils, c'est quelqu'un qui remarque ce qui cloche."
            ),
            h("Les signes d'erreur révélateurs"),
            list(
              "Une erreur détaillée : chemin de fichiers, noms de tables, versions de logiciels. Le serveur parle trop.",
              "Un comportement différent selon la valeur : une entrée change la réponse (candidat au test).",
              "Un 500 quand les autres valeurs donnent 200 ou 404 : une entrée fait planter l'application.",
              "Des délais différents : une entrée fait attendre le serveur (indice de requêtes lourdes ou de time-based).",
              "Des en-têtes manquants ou étranges : pas de CSP, pas de X-Frame-Options, un Server inhabituel."
            ),
            h("Tester une hypothèse à la fois"),
            p(
              "Quand tu as un soupçon, tu construis un test qui le confirme ou l'infirme, en ne changeant qu'une seule chose à la fois. Tu compares la réponse de référence et la réponse modifiée : si tout diffère, tu tiens quelque chose."
            ),
            code(`# test 1 : référence\n$ curl -s "http://localhost:8080/articles?id=1"\n\n# test 2 : la même requête, un seul paramètre modifié\n$ curl -s "http://localhost:8080/articles?id=1'"\n\n# Si la réponse change radicalement, l'entrée n'est pas filtrée : on creuse.`),
            h("La méthode : le tri en entonnoir"),
            p(
              "On ne teste pas tout en même temps : on rétrécit. D'abord la surface (tout ce que l'app accepte), puis les candidats (les entrées qui réagissent bizarrement), puis un test précis sur chaque candidat. Chaque étape réduit le nombre de requêtes à examiner en profondeur."
            ),
            h("Le plus important : rester méthodique"),
            p(
              "Les débutants spamment les entrées ; les professionnels documentent. Pour chaque test : quel était le soupçon, quelle requête, quelle réponse attendue, quelle réponse obtenue. C'est cette rigueur qui permet de conclure « faille confirmée » ou « fausse piste » — et de le prouver dans un rapport."
            ),
            callout(
              "Tu ne trouveras jamais ce que tu ne sais pas reconnaître. C'est pour cela que chaque leçon de ce parcours te donne les signes : le niveau 5 (OWASP) classera ces indices en familles. Entraîne-toi dès maintenant à remarquer la différence entre une réponse normale et une réponse anormale.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Les indices : erreurs détaillées, comportements différents, 500, délais, en-têtes étranges.",
              "Un test change une seule variable, pour comparer proprement.",
              "L'entonnoir : surface → candidats → tests précis.",
              "Documenter chaque test : la rigueur fait le professionnel."
            )
          ],
        },
        {
          id: "web-lecon-26",
          title: "Les en-têtes de sécurité : les barrières invisibles",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Des défenses qui ne se voient pas à l'écran"),
            p(
              "Certaines protections web ne se voient pas : ce sont des en-têtes que le serveur renvoie dans ses réponses, et que le navigateur applique automatiquement. Les lire, c'est vérifier si le site a verrouillé sa porte ou l'a laissée ouverte."
            ),
            h("Les en-têtes à connaître"),
            list(
              "Content-Security-Policy (CSP) : indique au navigateur quels contenus (scripts, images, styles) il a le droit de charger. Sans CSP, une XSS peut charger ce qu'elle veut.",
              "X-Frame-Options / frame-ancestors : interdit l'intégration du site dans une page d'un autre site (clickjacking).",
              "Strict-Transport-Security (HSTS) : force le HTTPS pour toutes les visites futures.",
              "X-Content-Type-Options: nosniff : empêche le navigateur de deviner le type d'un fichier.",
              "Referrer-Policy : contrôle quelles informations le navigateur envoie comme référent."
            ),
            h("Vérifier les en-têtes d'un site"),
            code(`$ curl -sI https://exemple.fr\n\nHTTP/1.1 200 OK\nServer: nginx\nContent-Security-Policy: default-src 'self'\nX-Frame-Options: DENY\nStrict-Transport-Security: max-age=63072000\nX-Content-Type-Options: nosniff\n\n# Si ces lignes sont absentes, le site n'a pas posé ces barrières.`),
            h("Pourquoi c'est important"),
            p(
              "Ces en-têtes ne protègent pas contre les failles de l'application, mais ils en limitent l'impact. Une CSP bien configurée réduit fortement l'efficacité d'une XSS ; X-Frame-Options élimine le clickjacking. Leur absence n'est pas une faille en soi, mais un manque de défense en profondeur."
            ),
            h("Un réflexe de vérification"),
            p(
              "Avant de creuser une app, regarde ses en-têtes : c'est gratuit, rapide, et ça donne un premier état de santé. Des en-têtes absents sur une app qui gère des données sensibles, c'est déjà un constat pour ton rapport."
            ),
            callout(
              "Petit piège : parfois le serveur a déjà l'en-tête, mais avec une valeur faible (X-Frame-Options: SAMEORIGIN au lieu de DENY, ou une CSP avec 'unsafe-inline'). Lire la valeur, pas seulement la présence, fait la différence.",
              "tip"
            ),
            h("En résumé"),
            list(
              "CSP, X-Frame-Options, HSTS, nosniff, Referrer-Policy : cinq barrières utiles.",
              "curl -sI montre en un coup d'œil les en-têtes de sécurité d'un site.",
              "Leur absence n'est pas une faille directe, mais un défaut de défense en profondeur.",
              "Lire la valeur des en-têtes, pas seulement leur présence."
            )
          ],
        },
      ],
    },
    {
      id: "web-module-5",
      title: "Le pentest en action : du lab au quiz final",
      lessons: [
        {
          id: "web-lecon-27",
          title: "Démo guidée : monter un lab web sur localhost",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Objectif"),
            p(
              "Il est temps de mettre les mains dans le cambouis : tu montes un petit serveur web vulnérable sur ta machine et tu le testes. Tout se passe sur localhost : rien ne sort de ta machine, c'est ton terrain d'entraînement personnel."
            ),
            h("Étape 1 : installer le serveur"),
            p(
              "Un mini serveur suffit : Python, présent partout, permet de servir un répertoire en une commande. Attention, ce serveur est volontairement minimaliste : il n'est pas fait pour Internet, et c'est justement pour cela qu'il reste sur localhost."
            ),
            code(`$ mkdir ~/lab-web && cd ~/lab-web\necho "Bienvenue dans ton lab" > index.html\n$ python3 -m http.server 8080\nServing HTTP on 0.0.0.0 port 8080 ...`),
            h("Étape 2 : voir les logs comme le serveur les voit"),
            p(
              "Chaque requête que tu envoies s'affiche dans le terminal du serveur : méthode, chemin, statut. C'est exactement ce que voit un serveur web, et c'est une perspective précieuse : tu vérifies si la requête est arrivée telle que tu l'as écrite."
            ),
            code(`127.0.0.1 - - "GET / HTTP/1.1" 200 -\n127.0.0.1 - - "GET /robots.txt HTTP/1.1" 404 -`),
            h("Étape 3 : faire parler le serveur avec curl"),
            p(
              "Ton serveur est une cible parfaite : tu peux l'interroger en toutes méthodes, tester des chemins, des en-têtes, sans aucune conséquence. Essaie :"
            ),
            code(`$ curl -s http://localhost:8080/\nBienvenue dans ton lab\n\n$ curl -I http://localhost:8080/secret\nHTTP/1.1 404 NOT FOUND\n\n$ curl -X PUT -d "test" http://localhost:8080/\nHTTP/1.1 501 Unsupported method ('PUT')\n\n$ gobuster dir -u http://localhost:8080/ -w /usr/share/wordlists/dirb/common.txt`),
            h("Étape 4 : pousser un peu plus loin"),
            list(
              "Crée d'autres fichiers (admin.html, backup.zip, .env) et observe comment les trouver.",
              "Teste ce que le serveur répond à des chemins bizarres (../.., %2e%2e, \\, espaces).",
              "Compare les réponses de ton lab avec celles de sites publics que tu consultes.",
              "Note dans un carnet ce que tu observes : c'est ta future méthode."
            ),
            callout(
              "Ce serveur est volontairement simple et fragile : c'est la condition pour s'entraîner sans risque. Il ne doit JAMAIS être exposé sur Internet : aucune authentification, aucun filtrage. Sur ton lab, tout est permis ; dès que tu sors de chez toi, tout devient encadré par la loi.",
              "danger"
            ),
            h("En résumé"),
            list(
              "python3 -m http.server 8080 crée un serveur de test local en une commande.",
              "Les logs du serveur montrent chaque requête reçue : la vue côté serveur.",
              "curl et gobuster s'entraînent sur localhost sans aucun danger.",
              "Un lab local est ton terrain ; le monde réel est encadré."
            )
          ],
        },
        {
          id: "web-lecon-28",
          title: "Les failles réelles : quand le web fait les gros titres",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Du cours aux failles du monde réel"),
            p(
              "Chaque concept que tu as appris a déjà servi à des attaques réelles, certaines gigantesques. Ces exemples ne sont pas là pour faire peur : ils montrent que les failles naissent toujours des mêmes oublis — entrées non validées, secrets mal gardés, confiance mal placée."
            ),
            h("Les failles XSS : du code injecté dans des pages de confiance"),
            p(
              "La XSS (Cross-Site Scripting, cours de la leçon 8 et du niveau 5) consiste à faire exécuter du code JavaScript malveillant dans la page d'un site légitime. Votre victime, c'est le visiteur : son cookie, sa session, son clavier. Des sites d'entreprises entières ont été pillés par des XSS que les visiteurs déclenchaient sans le savoir."
            ),
            h("L'injection SQL : la faille qui a vidé des bases"),
            p(
              "Pendant des années, des attaquants ont lu les bases de données du monde entier en passant par des champs de connexion. Des millions de comptes et de mots de passe fuis, parce qu'une requête SQL était construite avec du texte non contrôlé (leçon 17). La leçon à retenir : la validation des entrées n'est pas une option."
            ),
            h("Le vol de sessions : entrer sans mot de passe"),
            p(
              "Quand un cookie de session est volé (par XSS, par une page non sécurisée, par un clic), l'attaquant n'a pas besoin du mot de passe : il a déjà la clé du coffre (leçon 11). D'où l'importance de HttpOnly, Secure, SameSite et de l'expiration des sessions."
            ),
            h("Les secrets exposés : .env et compagnie"),
            p(
              "Des fichiers de configuration (.env), des dépôts git oubliés (.git/), des sauvegardes (backup.zip) ont livré des clés d'API et des mots de passe à des milliers de scanners automatiques. L'énumération de la leçon 23 sert exactement à ça : les attaquants automatisent la recherche de ces fichiers."
            ),
            h("Ce qui change avec les attaques automatisées"),
            p(
              "Aujourd'hui, la plupart des attaques ne sont pas dirigées : ce sont des scanners qui balaient Internet en continu à la recherche des mêmes faiblesses. Un serveur mal configuré, un fichier exposé, une version obsolète : les robots trouvent avant les humains. D'où la nécessité de toujours durcir ses serveurs."
            ),
            callout(
              "Ces exemples sont vécus par d'autres : ils servent à t'apprendre la prudence, pas à être reproduits. Les attaques sur des systèmes que tu ne possèdes pas sont illégales, et les failles réelles se réparent, elles ne se divulguent pas par l'exploitation.",
              "warning"
            ),
            h("En résumé"),
            list(
              "XSS : du code exécuté dans la page d'un site de confiance, au détriment du visiteur.",
              "Injection SQL : des bases entières lues via des entrées non validées.",
              "Vol de session : entrer dans un compte avec le cookie, sans le mot de passe.",
              "Secrets exposés : .env, .git, sauvegardes : ce que l'énumération automatique cherche.",
              "Les scanners automatisés trouvent les faiblesses avant les humains."
            )
          ],
        },
        {
          id: "web-lecon-29",
          title: "Projet guidé : analyser un site de lab de bout en bout",
          type: "exercise",
          duration: "25 min",
          blocks: [
            h("Objectif"),
            p(
              "Ce projet rassemble tout le parcours en une seule mission : analyser un site de laboratoire local de la reconnaissance au rapport. Tu prends une cible que tu contrôles (ton lab de la leçon 27, ou un lab d'entraînement que tu as installé), et tu appliques la méthode complète."
            ),
            h("Phase 1 : la reconnaissance passive"),
            list(
              "Ouvre le site dans le navigateur, F12, observe les onglets Réseau et Application.",
              "Note le nom du serveur, les en-têtes, les cookies et leurs attributs.",
              "Vérifie la présence des en-têtes de sécurité (leçon 26)."
            ),
            h("Phase 2 : l'énumération"),
            p(
              "Trouve les chemins cachés du site avec les techniques de la leçon 23, puis explore les fichiers trouvés un par un. Vérifie robots.txt et les fichiers probables."
            ),
            code(`$ curl -s http://localhost:8080/robots.txt\n$ gobuster dir -u http://localhost:8080/ -w /usr/share/wordlists/dirb/common.txt -q`),
            h("Phase 3 : le test des entrées"),
            p(
              "Identifie chaque paramètre que le site accepte (formulaires, paramètres d'URL), puis fuzz-les méthodiquement comme à la leçon 24. Compare chaque réponse à la réponse de référence et note les anomalies."
            ),
            h("Phase 4 : la synthèse"),
            list(
              "Classe tes observations : expositions (répertoires, fichiers), robustesse (réponses aux valeurs aberrantes), défenses (en-têtes, cookies).",
              "Pour chaque constat : quelle preuve (capture de requête/réponse), quel impact potentiel.",
              "Termine par des recommandations concrètes, même simples : limiter le serveur, corriger la config."
            ),
            h("Phase 5 : le rapport"),
            p(
              "Un pentest ne vaut que par son rapport. Structure : résumé, périmètre, méthode, constats, preuves, recommandations. Écris-le comme si tu le remettais à un client."
            ),
            callout(
              "La différence entre un amateur et un professionnel, c'est la documentation : chaque constat doit pouvoir être reproduit par quelqu'un d'autre. Si ta capture ne permet pas de refaire le test, elle est incomplète.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Une mission complète : reconnaître, énumérer, tester, synthétiser, rapporter.",
              "Chaque observation doit avoir une preuve reproductible.",
              "Le rapport structure tes constats : résumé, périmètre, méthode, preuves, recommandations.",
              "Le professionnalisme, c'est la méthode, pas l'outil."
            )
          ],
        },
        {
          id: "web-lecon-30",
          title: "Quiz final et bilan du niveau",
          type: "quiz",
          duration: "15 min",
          blocks: [
            h("Le moment de vérifier tes acquis"),
            p(
              "Ce quiz valide les fondamentaux du web et de la sécurité côté web. Réponds sans regarder les cours, puis compare avec les explications."
            ),
            h("Bilan du niveau"),
            p(
              "Félicitations, tu as terminé le niveau Web Security ! Tu sais maintenant :"
            ),
            list(
              "lire et écrire les méthodes, codes et en-têtes HTTP.",
              "comprendre HTTPS/TLS, les cookies, les sessions, la SOP et le CORS.",
              "reconnaître le rôle du client, du serveur, de l'API et de la base de données.",
              "utiliser les DevTools et curl pour observer et interroger le web.",
              "énumérer, fuzzer et documenter des tests de robustesse.",
              "expliquer les grandes familles de failles : XSS, injection SQL, vol de session."
            ),
            h("Ce qui t'attend au niveau 5 : OWASP Top 10"),
            p(
              "Le niveau suivant classe tout ce que tu as découvert dans le référentiel de référence : l'OWASP Top 10. Tu y approfondiras l'exploitation et la protection de chaque famille de failles, avec l'injection, la XSS, l'authentification, les accès, les fichiers et les secrets."
            ),
            h("Les règles qui ne changent jamais"),
            list(
              "Tu ne testes que tes machines, tes applications, ou des cibles autorisées.",
              "La méthode prime : documenter, comparer, prouver.",
              "Le serveur est la seule source de vérité : le client peut toujours mentir.",
              "La curiosité et la prudence font le bon pentester."
            ),
            callout(
              "Ce niveau est une base solide : le niveau 5 va maintenant t'apprendre à transformer tes observations en tests structurés. Continue : l'OWASP Top 10 t'attend.",
              "info"
            ),
            h("Prochaine étape : le niveau 5"),
            p(
              "Chaque famille de faille que tu as croisée ici (XSS, SQLi, sessions, en-têtes) devient une classe à part entière au niveau OWASP : principes, exploitation, prévention, exemples. À toi de jouer, future analyste sécurité web !"
            )
          ],
          quiz: [
            {
              question: "En HTTP/1.1, quelle est la méthode qui NE CHERCHE PAS à modifier l'état du serveur ?",
              options: [
                "GET",
                "POST",
                "PUT",
                "DELETE",
              ],
              answer: 0,
              explanation:
                "GET est une méthode sûre (safe) : elle sert à lire une ressource sans effet de bord. POST crée, PUT modifie, DELETE supprime."
            },
            {
              question: "Quelle est la signification du code 404 ?",
              options: [
                "Erreur interne du serveur",
                "Ressource introuvable",
                "Redirection permanente",
                "Requête incorrecte",
              ],
              answer: 1,
              explanation:
                "404 Not Found signifie que la ressource demandée n'existe pas. 500 est une erreur serveur, 301 une redirection, 400 une requête malformée."
            },
            {
              question: "Quel en-tête le serveur utilise-t-il pour dire au client d'utiliser le HTTPS pour toutes les prochaines visites ?",
              options: [
                "Content-Security-Policy",
                "X-Frame-Options",
                "Strict-Transport-Security",
                "Referrer-Policy",
              ],
              answer: 2,
              explanation:
                "HSTS (Strict-Transport-Security) force le client à n'utiliser que HTTPS. CSP limite les contenus chargés, X-Frame-Options protège du clickjacking."
            },
            {
              question: "Que signifie la Same-Origin Policy pour le navigateur ?",
              options: [
                "Toutes les origines peuvent lire toutes les pages",
                "Une page ne peut lire les données d'une autre origine sans autorisation",
                "Les cookies ne sont jamais envoyés",
                "Les sites sont tous sur le même domaine",
              ],
              answer: 1,
              explanation:
                "La SOP interdit par défaut la lecture croisée entre origines. Le CORS, autorisation du serveur, permet d'y déroger explicitement."
            },
            {
              question: "Le cookie ci-dessous est présent : Set-Cookie: sid=abc; HttpOnly; Secure; SameSite=Strict. Que peut faire le JavaScript de la page ?",
              options: [
                "Lire la valeur du cookie sid",
                "Impossible : HttpOnly interdit la lecture par JavaScript",
                "Écrire un nouveau cookie sans HttpOnly",
                "Le JavaScript voit tous les cookies du domaine",
              ],
              answer: 1,
              explanation:
                "L'attribut HttpOnly interdit l'accès au cookie par JavaScript, limitant le vol via XSS. Secure force HTTPS et SameSite limite les envois croisés."
            },
            {
              question: "Qu'est-ce que l'injection SQL ?",
              options: [
                "Injecter du JavaScript dans une page",
                "Coller une entrée utilisateur dans une requête SQL sans validation",
                "Envoyer des millions de requêtes à un serveur",
                "Forcer le HTTPS d'un site",
              ],
              answer: 1,
              explanation:
                "L'injection SQL consiste à insérer du code SQL dans une requête par une entrée non validée. Le JavaScript injecté dans une page est la XSS."
            },
            {
              question: "Quelle est la bonne pratique de sécurité pour le stockage des sessions ?",
              options: [
                "Placer l'identifiant de session dans l'URL",
                "Utiliser un cookie avec HttpOnly, Secure et SameSite",
                "Ne jamais faire expirer les sessions",
                "Garder le même identifiant après la connexion",
              ],
              answer: 1,
              explanation:
                "Un cookie protégé (HttpOnly, Secure, SameSite) et une session régénérée après connexion avec expiration sont les bases du durcissement des sessions."
            },
            {
              question: "Quel est le rôle d'un reverse proxy ?",
              options: [
                "Masquer les sites derrière lui et gérer le trafic entrant",
                "Afficher des pages d'erreur",
                "Compresser les images du site",
                "Traduire les adresses IP en noms",
              ],
              answer: 0,
              explanation:
                "Le reverse proxy se place devant les serveurs : TLS, cache, filtrage et masquage des machines internes."
            }
          ],
        },
      ],
    },
  ],
};

