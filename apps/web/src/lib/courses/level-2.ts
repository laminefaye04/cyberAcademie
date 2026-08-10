import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const NETWORKING_COURSE: Course = {
  id: "networking",
  levelId: 2,
  title: "Networking",
  description:
    "Comprendre les protocoles et l'architecture réseau : modèle OSI, TCP/IP, DNS, HTTP et analyse de trafic.",
  xp: 750,
  modules: [
    {
      id: "net-module-1",
      title: "Les bases du réseau",
      lessons: [
        {
          id: "net-lecon-01",
          title: "Qu'est-ce qu'un réseau ?",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Pourquoi des réseaux ?"),
            p(
              "Un ordinateur seul est comme une personne isolée dans son bureau : utile, mais limité. Dès que tu veux partager un fichier, imprimer, jouer à plusieurs, discuter ou aller sur le web, il faut relier les machines entre elles. C'est exactement cela, un réseau : un ensemble d'ordinateurs et d'appareils capables de communiquer."
            ),
            p(
              "L'idée clé : un réseau permet le partage. On partage des données (fichiers, pages web, messages), mais aussi des ressources (une imprimante, une connexion Internet, un serveur). Sans réseau, chaque machine est une île."
            ),
            h("L'analogie de la ville"),
            p(
              "Imagine une ville. Chaque maison est un ordinateur, chaque rue est un câble, chaque carrefour à feux est un appareil qui dirige le trafic (un commutateur ou un routeur). Ta maison a une adresse : c'est l'adresse IP de ta machine. Le facteur, lui, lit le numéro de la maison : c'est le rôle de l'adresse MAC."
            ),
            p(
              "Cette analogie fonctionne partout dans ce cours. Quand tu ouvres un site web, c'est comme envoyer une lettre à une autre maison située à l'autre bout de la ville (ou du monde), et attendre la réponse."
            ),
            h("Le vocabulaire de base"),
            list(
              "Nœud : tout appareil connecté au réseau (ordinateur, téléphone, imprimante, serveur).",
              "Lien : la connexion physique ou sans fil entre deux nœuds (câble Ethernet, fibre, Wi-Fi).",
              "LAN (Local Area Network) : un réseau local, limité à un endroit : la maison, l'école, le bureau. Le quartier de notre ville.",
              "WAN (Wide Area Network) : un réseau étendu, qui relie des LAN entre eux sur de grandes distances. Internet est le plus grand WAN.",
              "Internet : le réseau de tous les réseaux, qui interconnecte des millions de LAN à travers le monde."
            ),
            h("Internet : un réseau de réseaux"),
            p(
              "Internet n'est pas une machine géante au centre du monde : c'est un assemblage de réseaux qui se prêtent les connexions les uns aux autres. Ta box chez toi est un petit routeur qui relie ton LAN (ta maison) au WAN (le réseau de ton fournisseur d'accès), lui-même relié à d'autres réseaux."
            ),
            p(
              "Quand deux réseaux se rencontrent, un routeur décide où envoyer chaque paquet. C'est l'échangeur d'autoroute : il sait par quelle bretelle faire sortir les voitures pour qu'elles arrivent à destination le plus vite possible."
            ),
            h("Les paquets : des lettres"),
            p(
              "On n'envoie jamais un fichier entier d'un coup. On le découpe en petits morceaux appelés paquets (packets). Chaque paquet est une lettre avec son expéditeur, son destinataire et un numéro qui permet de tout remettre dans l'ordre à l'arrivée."
            ),
            p(
              "Découper présente un avantage énorme : si un paquet se perd, on ne renvoie que celui-là, pas tout le livre. Et comme chaque paquet voyage indépendamment, plusieurs routes du réseau peuvent travailler en même temps."
            ),
            callout(
              "Point important : quand un site te semble être un seul bloc, il est en réalité servi par des dizaines de machines (des serveurs) et découpé en des centaines de paquets qui voyagent indépendamment. Derrière chaque page web, il y a une logistique comparable à celle d'un service postal mondial."
            ),
            h("En résumé"),
            list(
              "Un réseau relie des machines pour partager des données et des ressources.",
              "LAN = réseau local (le quartier), WAN = réseau étendu, Internet = réseau des réseaux.",
              "Les données voyagent par petits paquets, comme des lettres.",
              "Chaque machine a une adresse pour qu'on puisse lui envoyer ces lettres."
            )
          ],
        },
        {
          id: "net-lecon-02",
          title: "Le modèle OSI : 7 couches",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Pourquoi découper en couches ?"),
            p(
              "Envoyer des données, c'est une opération complexe : il faut du matériel, des adresses, un contrôle de la qualité, une organisation du dialogue... On ne fait pas tout d'un coup. On découpe le problème en 7 étages, appelés couches. Chaque couche ne s'occupe que de sa mission et fait confiance aux couches voisines."
            ),
            p(
              "C'est comme l'expédition d'un colis international : le vendeur (couche haute) prépare le produit, le service d'emballage l'enveloppe, le transporteur l'étiquette, le chauffeur le charge, le facteur le dépose. Chacun ajoute quelque chose, sans se soucier de ce que font les autres."
            ),
            h("Les 7 couches en un regard"),
            list(
              "Couche 1 — Physique : le câble, l'électricité, les ondes radio. La route.",
              "Couche 2 — Liaison de données (Data Link) : l'adresse MAC et les trames. Le facteur du quartier qui lit le numéro de la maison.",
              "Couche 3 — Réseau (Network) : l'adresse IP et le routage. La ville qui choisit la route.",
              "Couche 4 — Transport : TCP et UDP, les ports. Le colis avec son numéro de suivi.",
              "Couche 5 — Session : ouvrir, maintenir et fermer une conversation.",
              "Couche 6 — Présentation : encoder, traduire, parfois chiffrer les données.",
              "Couche 7 — Application : le service que tu utilises : HTTP, DNS, FTP, e-mail."
            ),
            h("Couche 1 — Physique"),
            p(
              "C'est le support brut : un câble en cuivre, une fibre optique, le Wi-Fi. Cette couche transporte des 0 et des 1 sous forme de signaux électriques, lumineux ou radio. Elle ne comprend rien, elle ne fait que déplacer de l'énergie."
            ),
            h("Couche 2 — Liaison de données"),
            p(
              "Cette couche organise les bits en trames et utilise l'adresse MAC pour joindre une machine directement voisine sur le même câble. C'est le facteur qui connaît chaque maison de sa rue. Les commutateurs (switchs) travaillent à cette couche."
            ),
            h("Couche 3 — Réseau"),
            p(
              "C'est ici qu'intervient l'adresse IP. La couche 3 sait lire l'adresse complète du destinataire et choisit la route à travers les routeurs. C'est le plan de la ville : peu importe la rue immédiate, on sait comment traverser."
            ),
            h("Couche 4 — Transport"),
            p(
              "Cette couche s'occupe du transport des données d'une application à l'autre, en utilisant les ports. TCP garantit que tout arrive en ordre ; UDP va vite mais sans garantie. C'est le colis avec un numéro de suivi et un nom de destinataire (le port)."
            ),
            h("Couche 5 — Session"),
            p(
              "Elle gère la conversation : ouverture, maintien, fermeture. Comme une pause café : on se salue, on discute, on se quitte proprement. Cette couche est aujourd'hui très légère, TCP s'en chargeant en grande partie."
            ),
            h("Couche 6 — Présentation"),
            p(
              "Elle traduit les données dans un format que les applications comprennent : encodage, compression, parfois chiffrement. C'est le service de traduction entre deux personnes qui ne parlent pas la même langue."
            ),
            h("Couche 7 — Application"),
            p(
              "C'est la couche que tu touches vraiment : le navigateur (HTTP), le résolveur de noms (DNS), le client e-mail (SMTP/IMAP). Le protocole HTTP, que l'on verra en détail, vit ici."
            ),
            h("L'analogie de l'envoi de colis"),
            p(
              "Reprenons notre colis. Tu écris un message (couche 7). Une étiquette indique le format du message (couche 6). Une conversation est ouverte avec le destinataire (couche 5). Le colis reçoit un numéro de suivi et une porte (couche 4). On écrit l'adresse complète de la ville (couche 3). Le chauffeur lit le numéro de la maison précise (couche 2). Enfin, le camion roule sur la route (couche 1). À l'arrivée, on fait l'inverse : la couche 1 reçoit les signaux, la couche 2 vérifie la maison, la couche 3 la ville, la couche 4 le numéro de suivi, et ainsi de suite jusqu'à ce que ton application reçoive le message. C'est cela, la désencapsulation : chaque couche ne retire que sa propre enveloppe, dans le bon ordre."
            ),
            h("Un moyen de mémoriser"),
            code(`Couche 7  Application\nCouche 6  Présentation\nCouche 5  Session\nCouche 4  Transport\nCouche 3  Réseau (Network)\nCouche 2  Liaison de données (Data Link)\nCouche 1  Physique\n\nDe bas en haut, une astuce anglaise :\nPlease Do Not Throw Sausage Pizza Away`),
            h("En résumé"),
            list(
              "Le modèle OSI (Open Systems Interconnection) découpe les communications réseau en 7 couches.",
              "Chaque couche a une mission précise et ne connaît pas le détail des autres.",
              "On ajoute des informations (étiquettes) en descendant, on les retire en montant.",
              "Retiens surtout les couches 2 (MAC), 3 (IP), 4 (TCP/UDP) et 7 (HTTP) : 90 % du réseau quotidien s'y joue."
            )
          ],
        },
        {
          id: "net-lecon-03",
          title: "TCP/IP en 4 couches",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Simplifier le modèle"),
            p(
              "Le modèle OSI est parfait pour apprendre, mais le monde réel utilise un modèle plus compact appelé TCP/IP, du nom des deux protocoles fondateurs : TCP (Transmission Control Protocol) et IP (Internet Protocol). Il regroupe les 7 couches OSI en 4."
            ),
            h("Les 4 couches de TCP/IP"),
            list(
              "Application : regroupe les couches 5, 6 et 7 du modèle OSI. C'est là que vivent HTTP, DNS, SMTP...",
              "Transport : correspond à la couche 4. TCP et UDP y travaillent, avec les ports.",
              "Internet (Réseau) : correspond à la couche 3. IP y travaille, avec les adresses IP et le routage.",
              "Accès au réseau (Link) : regroupe les couches 1 et 2. Le câble, le Wi-Fi, l'adresse MAC, les trames Ethernet."
            ),
            h("Comparaison OSI / TCP/IP"),
            list(
              "OSI 7 Application / 6 Présentation / 5 Session  →  TCP/IP Application",
              "OSI 4 Transport  →  TCP/IP Transport",
              "OSI 3 Réseau  →  TCP/IP Internet",
              "OSI 2 Liaison / 1 Physique  →  TCP/IP Accès au réseau"
            ),
            p(
              "Dans la pratique, quand un technicien parle de la pile réseau (the network stack), il parle de ces couches qui s'empilent, de la plus concrète (le câble) à la plus abstraite (le navigateur)."
            ),
            h("L'encapsulation : des poupées russes"),
            p(
              "Quand une donnée descend les couches, chaque couche ajoute sa propre enveloppe autour des données précédentes. C'est exactement comme emboîter des enveloppes : la plus petite contient la donnée, et chaque enveloppe suivante porte l'adresse nécessaire à l'étape suivante."
            ),
            p("Voici à quoi ressemble une requête HTTP qui sort de ta machine, vue de l'intérieur vers l'extérieur :"),
            code(`Données brutes :         « Bonjour »\nCouche Application :     HTTP  « Bonjour »\nCouche Transport :       TCP   port 443  | HTTP  « Bonjour »\nCouche Internet :        IP    203.0.113.5 | TCP | HTTP  « Bonjour »\nCouche Accès réseau :    MAC   ...        | IP | TCP | HTTP  « Bonjour »\nCâble / ondes :          01010110111101100110111111001110 ...`),
            p(
              "Chaque enveloppe a un nom technique : à la couche 4 on parle de segment TCP, à la couche 3 de paquet IP, à la couche 2 de trame Ethernet. Ce sont les mêmes données, simplement emballées de plus en plus."
            ),
            h("La désencapsulation"),
            p(
              "À la réception, on fait le chemin inverse : la couche 2 enlève l'enveloppe MAC, la couche 3 enlève l'enveloppe IP, la couche 4 enlève l'enveloppe TCP, et la couche Application récupère enfin la donnée originale. Chaque couche ne lit que sa propre enveloppe : c'est pour cela qu'elles peuvent fonctionner indépendamment."
            ),
            p(
              "Cette indépendance est la force du modèle : tu peux changer le câble (couche 1) sans toucher au navigateur (couche 7), et tu peux utiliser HTTP sur TCP comme sur UDP (HTTP/3) sans tout réécrire."
            ),
            h("En résumé"),
            list(
              "TCP/IP est le modèle réel utilisé par Internet, en 4 couches.",
              "Chaque couche ajoute une enveloppe (en-tête) aux données : c'est l'encapsulation.",
              "À la réception, chaque couche retire son enveloppe : c'est la désencapsulation.",
              "Les noms à retenir : segment TCP, paquet IP, trame Ethernet."
            )
          ],
        },
        {
          id: "net-lecon-04",
          title: "Les adresses IP",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Pourquoi une adresse ?"),
            p(
              "Pour qu'une lettre arrive à destination, il faut une adresse précise. Sur un réseau, cette adresse s'appelle l'adresse IP (Internet Protocol). Reprends l'analogie de la ville : l'adresse IP, c'est ton adresse postale complète (numéro, rue, ville). Le préfixe du réseau correspond au quartier, la partie restante identifie ta maison dans le quartier."
            ),
            h("IPv4 : quatre nombres"),
            p(
              "La version la plus répandue, IPv4, est une suite de 4 nombres séparés par des points, chacun entre 0 et 255. Chaque nombre est un octet (8 bits)."
            ),
            code(`192.168.1.42\n\nChaque groupe va de 0 à 255 :\n192 . 168 . 1 . 42\n quartier  maison`),
            p(
              "Avec 4 octets, on peut écrire environ 4,3 milliards d'adresses différentes. C'était énorme en 1981... et largement insuffisant aujourd'hui. D'où l'IPv6, qui arrive en renfort."
            ),
            h("Le masque de sous-réseau"),
            p(
              "Une adresse IP seule ne dit pas où s'arrête le quartier et où commence la maison. Le masque de sous-réseau répond à cette question : il découpe l'adresse en deux parties, le réseau (le quartier) et la machine (la maison)."
            ),
            code(`Adresse :  192.168.1.42\nMasque :   255.255.255.0\n\nLa partie réseau est 192.168.1 (les 3 premiers octets).\nLa partie machine est .42 (le dernier octet).`),
            h("CIDR : la notation raccourcie"),
            p(
              "Écrire le masque en entier (255.255.255.0) est lourd. On utilise la notation CIDR (Classless Inter-Domain Routing) : on ajoute un slash puis le nombre de bits réservés au réseau. Pour 255.255.255.0, ce sont 24 bits."
            ),
            code(`192.168.1.0/24\n\n= 256 adresses possibles (de .0 à .255)\n= réseau 192.168.1, masque 255.255.255.0`),
            p(
              "Dans un /24, les 8 derniers bits sont libres : 2^8 = 256 adresses. Dans un /16, les 16 derniers bits sont libres : 2^16 = 65 536 adresses. Plus le nombre après le slash est petit, plus le réseau est grand."
            ),
            h("Les adresses privées"),
            p(
              "Tu n'as pas le droit d'inventer n'importe quelle adresse publique : les adresses sont gérées mondialement. Mais pour nos réseaux internes, des plages spéciales ont été réservées : les adresses privées. Elles ne circulent pas sur Internet et peuvent être réutilisées par tout le monde."
            ),
            list(
              "10.0.0.0/8 — les grands réseaux internes d'entreprise (10.x.x.x).",
              "172.16.0.0/12 — les réseaux privés moyens (de 172.16.0.0 à 172.31.255.255).",
              "192.168.0.0/16 — les réseaux de maison, de très loin les plus courants (192.168.x.x)."
            ),
            p(
              "C'est ta box qui possède l'adresse publique réelle. Les machines de ton LAN ont des adresses privées, et la box traduit les allers-retours grâce à la technique du NAT (Network Address Translation) : elle réécrit l'adresse d'origine des paquets qui partent, puis distribue les réponses au bon appareil. C'est le standard d'immeuble qui centralise le courrier et le redistribue par appartement."
            ),
            h("La boucle locale : 127.0.0.1"),
            p(
              "L'adresse 127.0.0.1 (et plus largement toute la plage 127.0.0.0/8) est réservée à la boucle locale (loopback) : elle désigne toujours ta propre machine, quel que soit le réseau. Son nom est localhost. Teste toujours un service local avec 127.0.0.1 : c'est rapide, sans conséquence pour les autres, et parfait pour l'apprentissage."
            ),
            code(`ping -c 4 127.0.0.1\n\nPING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.036 ms\n4 packets transmitted, 4 received, 0% packet loss`),
            h("IPv6 en bref"),
            p(
              "IPv6 utilise des adresses 128 bits, écrites en 8 groupes hexadécimaux. Il remplace progressivement IPv4 pour donner une adresse à chaque appareil du monde. Sa boucle locale est ::1."
            ),
            code(`IPv4 :  192.168.1.42\nIPv6 :  fe80::1a2b:3c4d:5e6f:7890\nloopback IPv6 : ::1`),
            h("En résumé"),
            list(
              "L'adresse IP identifie une machine sur un réseau ; IPv4 = 4 octets, IPv6 = 128 bits.",
              "Le masque / CIDR découpe l'adresse entre réseau et machine.",
              "Les plages privées (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) servent aux LAN.",
              "127.0.0.1 / localhost désigne toujours ta propre machine."
            )
          ],
        },
        {
          id: "net-lecon-05",
          title: "L'adresse MAC et ARP",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Deux adresses pour une même machine"),
            p(
              "Tu possèdes deux identités sur un réseau : l'adresse IP (l'adresse postale, qui peut changer selon l'endroit où tu te trouves) et l'adresse MAC (ton identité physique, gravée dans ton matériel, qui ne change jamais)."
            ),
            p(
              "L'adresse MAC (Media Access Control) est un identifiant unique attribué par le fabricant à chaque carte réseau. Elle ressemble à 6 groupes de 2 chiffres ou lettres hexadécimaux."
            ),
            code(`aa:bb:cc:dd:ee:ff\n\n6 groupes de 2 caractères hexadécimaux (0-9, a-f).\nLes 3 premiers groupes identifient le fabricant,\nles 3 derniers identifient la carte elle-même.`),
            h("L'analogie : plaque d'immatriculation et adresse postale"),
            p(
              "L'adresse MAC, c'est la plaque d'immatriculation de ta voiture : elle est unique et liée au véhicule, quelle que soit la route où il roule. L'adresse IP, c'est l'adresse de ta destination : elle change selon le réseau sur lequel tu te connectes, comme ton adresse change si tu déménages."
            ),
            list(
              "MAC : physique, fixe, unique au monde, utilisée à la couche 2 (liaison).",
              "IP : logique, changeable, dépend du réseau, utilisée à la couche 3 (réseau).",
              "Une carte réseau peut changer d'adresse IP, jamais d'adresse MAC (sauf spoofing)."
            ),
            h("Pourquoi les deux ?"),
            p(
              "Un réseau local ne comprend que le langage de la couche 2 : les trames et les adresses MAC. Internet, lui, parle en adresses IP. Il faut donc un pont entre les deux mondes : ce pont s'appelle ARP."
            ),
            h("ARP : l'annuaire du quartier"),
            p(
              "ARP (Address Resolution Protocol) répond à une question très précise : à quelle adresse MAC correspond cette adresse IP du voisin ? C'est le facteur qui demande dans la rue : qui habite au numéro 42 ?"
            ),
            p(
              "Quand ta machine veut joindre l'adresse IP 192.168.1.1, elle diffuse un message ARP à tout le quartier (broadcast) : Qui possède 192.168.1.1 ? La machine concernée répond : C'est moi, voici mon adresse MAC. Ta machine note la réponse dans un tableau pour ne pas redemander à chaque fois."
            ),
            h("Voir la table ARP de sa machine"),
            code(`arp -a\n\n? (192.168.1.1) at aa:bb:cc:11:22:33 on eth0\n? (192.168.1.42) at 11:22:33:44:55:66 on eth0`),
            p(
              "La commande équivalente moderne est ip neigh. Tu peux tester les deux. Ces tables sont vidées régulièrement, car les voisins peuvent changer."
            ),
            h("Un mot sur la sécurité"),
            p(
              "ARP ne vérifie pas qui répond : n'importe quelle machine du réseau peut prétendre posséder une adresse IP (c'est l'empoisonnement ARP, une technique d'attaque classique qu'on verra dans les niveaux suivants). Pour l'instant, retiens simplement le mécanisme de base."
            ),
            h("En résumé"),
            list(
              "L'adresse MAC est l'identité physique fixe de la carte réseau.",
              "L'adresse IP est l'adresse logique, dépendante du réseau.",
              "ARP traduit les adresses IP du voisinage en adresses MAC.",
              "La table ARP (arp -a, ip neigh) mémorise ces correspondances."
            )
          ],
        },
        {
          id: "net-lecon-06",
          title: "Exercice — explorer son réseau",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Objectif"),
            p(
              "Mettre les mains dans le cambouis : inspecter sa propre machine, découvrir son adresse IP, sa passerelle et tester la connectivité locale. Tout se passe sur TA machine, dans TON réseau : aucun impact pour les autres."
            ),
            callout(
              "Règle d'or de ce cours : tu n'explores et ne testes QUE ta propre machine ou ton propre réseau local. Scanner ou sonder une machine qui ne t'appartient pas est illégal en France (article 323-1 du code pénal), même par curiosité.",
              "danger"
            ),
            h("Étape 1 — Voir ses interfaces"),
            code(`ip a`),
            p("Cette commande liste tes interfaces réseau. Cherche ces éléments :"),
            list(
              "lo : l'interface de boucle locale, adresse 127.0.0.1/8. Elle représente ta machine elle-même.",
              "eth0, enp3s0 ou wlan0 : ton interface filaire ou Wi-Fi réelle.",
              "inet 192.168.1.42/24 : ton adresse IP, suivie de la longueur de masque /24.",
              "La mention UP indique que l'interface est active."
            ),
            code(`1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 192.168.1.42/24 brd 192.168.1.255 scope global eth0`),
            h("Étape 2 — Voir sa table de routage"),
            code(`ip route`),
            p(
              "La ligne qui commence par default via est la plus importante : elle indique la passerelle (gateway), c'est-à-dire la porte de sortie de ton réseau. Dans un réseau de maison, c'est l'adresse de ta box."
            ),
            code(`default via 192.168.1.1 dev eth0\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.42`),
            h("Étape 3 — Identifier sa passerelle"),
            p(
              "Prends l'adresse après default via (ici 192.168.1.1). Retiens-la : c'est le routeur qui connecte ton quartier au reste du monde."
            ),
            h("Étape 4 — Tester la boucle locale"),
            code(`ping -c 4 127.0.0.1`),
            p(
              "Résultat attendu : 4 paquets envoyés, 4 reçus, 0 % de perte. La réponse est quasi instantanée car le paquet ne sort même pas de ta machine."
            ),
            h("Étape 5 — Tester sa passerelle"),
            p("Remplace <GATEWAY> par l'adresse trouvée à l'étape 2, par exemple 192.168.1.1."),
            code(`ping -c 4 <GATEWAY>`),
            p(
              "Si la passerelle répond, ton lien local fonctionne : tu arrives à parler à ton propre quartier. Un ping vers 127.0.0.1 réussi mais vers la passerelle en échec indique un problème de câble, Wi-Fi ou de configuration."
            ),
            h("Étape 6 — Connaître son nom de machine"),
            code(`hostname\nhostname -I`),
            p(
              "La première commande donne le nom de ta machine sur le réseau, la seconde sa liste d'adresses IP. Ces informations servent souvent à se repérer, et à repérer les autres machines."
            ),
            h("Résultat attendu"),
            list(
              "ip a affiche une interface lo (127.0.0.1) et une interface réelle avec une adresse 192.168.x.x ou 10.x.x.x.",
              "ip route montre une ligne default via <adresse>.",
              "ping -c 4 127.0.0.1 renvoie 4/4 paquets reçus.",
              "ping -c 4 <GATEWAY> renvoie aussi 4/4 paquets reçus si le réseau local est sain.",
              "hostname -I affiche ton adresse IP actuelle."
            ),
            callout(
              "Si le ping vers la passerelle échoue, vérifie que tu es bien connecté au Wi-Fi ou au câble, puis relance ip a : ton adresse IP est-elle présente ? Ces deux commandes (ip a, ip route) sont le réflexe numéro 1 de tout dépannage réseau.",
              "tip"
            )
          ],
        },
        {
          id: "net-lecon-07",
          title: "Quiz — Les bases",
          type: "quiz",
          duration: "6 min",
          blocks: [
            p(
              "Réponds aux questions suivantes pour valider les bases du réseau. Tu dois obtenir au moins 80 % de bonnes réponses."
            ),
            callout(
              "Relis les leçons 1 à 5 si une question te semble difficile : tout ce qui est demandé y est expliqué."
            ),
          ],
          quiz: [
            {
              question: "Un LAN (Local Area Network) est un réseau qui...",
              options: [
                "couvre une zone géographique étendue comme un pays",
                "relie des appareils proches, dans un même lieu (maison, bureau)",
                "ne relie que deux ordinateurs par un câble USB",
                "est le réseau privé réservé au gouvernement",
              ],
              answer: 1,
              explanation:
                "LAN signifie Local Area Network : un réseau local limité à un endroit (le quartier de l'analogie). Internet, qui couvre le monde, est un WAN.",
            },
            {
              question: "Dans l'analogie du réseau postal, un paquet correspond à...",
              options: [
                "un camion de livraison",
                "l'adresse de l'expéditeur uniquement",
                "le routeur central d'Internet",
                "un morceau de données envoyé sur le réseau",
              ],
              answer: 3,
              explanation:
                "Un paquet (packet) est un morceau de données découpé avant l'envoi, comme une lettre. Les camions sont les liens et les routeurs les échangeurs.",
            },
            {
              question: "L'adresse 127.0.0.1 (localhost) sert à...",
              options: [
                "contacter le serveur DNS de son fournisseur",
                "se connecter à Internet",
                "tester sa propre machine, en boucle",
                "joindre un voisin sur le même réseau",
              ],
              answer: 2,
              explanation:
                "La plage 127.0.0.0/8, dont 127.0.0.1, est réservée à la boucle locale : elle désigne toujours ta propre machine. Les paquets n'en sortent jamais.",
            },
            {
              question: "Le rôle d'un routeur est de...",
              options: [
                "chiffrer toutes les connexions du réseau",
                "attribuer une adresse MAC à chaque machine",
                "convertir un nom de domaine en adresse IP",
                "faire transiter les paquets entre réseaux en choisissant le chemin",
              ],
              answer: 3,
              explanation:
                "Le routeur travaille à la couche 3 : il lit l'adresse IP de destination et choisit la route (l'échangeur d'autoroute). Le DNS traduit les noms, le DHCP attribue les adresses.",
            },
          ],
        },
      ],
    },
    {
      id: "net-module-2",
      title: "TCP, UDP et les ports",
      lessons: [
        {
          id: "net-lecon-08",
          title: "TCP en profondeur",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Transmettre de façon fiable"),
            p(
              "TCP (Transmission Control Protocol) est le protocole de la couche 4 qui garantit que les données arrivent complètes et en ordre. C'est le service postal avec accusé de réception : chaque lettre est numérotée, suivie, et renvoyée si elle se perd."
            ),
            p(
              "Sans TCP, ton navigateur ne saurait jamais si la page est arrivée entière : il manquerait des morceaux, dans le désordre. TCP rend tout cela invisible pour toi."
            ),
            h("Les segments"),
            p(
              "TCP découpe les données en segments : des morceaux numérotés. Chaque segment porte le numéro de séquence (sa position dans le flux) et le numéro d'acquittement (quel segment on attend ensuite). Grâce à cela, le destinataire peut remettre les segments dans l'ordre et détecter les pertes."
            ),
            h("Le triple handshake : la poignée de main"),
            p(
              "Avant d'envoyer la moindre donnée, TCP établit la connexion avec un échange de trois messages appelé triple handshake. Imagine deux personnes qui se serrent la main avant de discuter : c'est un accord mutuel de commencer."
            ),
            list(
              "1. Le client envoie SYN (synchronize) : « Je veux ouvrir une connexion. »",
              "2. Le serveur répond SYN-ACK : « D'accord, je suis prêt, et toi ? »",
              "3. Le client envoie ACK (acknowledge) : « Parfait, je suis prêt. »"
            ),
            p("Sous forme d'un schéma, avec le temps qui descend :"),
            code(`Client                       Serveur\n   |                            |\n   |------- SYN --------------->|  (je veux parler)\n   |<----- SYN-ACK ------------|   (moi aussi, et toi ?)\n   |------- ACK --------------->|  (allons-y !)\n   |                            |\n   |===== échange de données ===|`),
            h("Les flags"),
            p(
              "Les messages TCP portent des drapeaux (flags), de petits bits qui donnent un sens au message. En voici les principaux :"
            ),
            list(
              "SYN : demande d'ouverture de connexion.",
              "ACK : accusé de réception.",
              "FIN : demande de fermeture de connexion.",
              "RST : annulation brutale (connexion réinitialisée).",
              "PSH : demande de livrer immédiatement les données."
            ),
            p(
              "Ces flags sont visibles dans les captures réseau, et les scanners de ports les utilisent pour sonder discrètement les services."
            ),
            h("Fermer une connexion"),
            p(
              "Quand le dialogue est fini, on ne coupe pas la ligne brutalement : on se dit au revoir. Le client envoie FIN, le serveur répond ACK puis FIN, le client renvoie ACK. Ce démontage en quatre messages garantit que chaque côté a bien fini d'envoyer ses données."
            ),
            h("Ce que TCP garantit"),
            list(
              "Fiabilité : les segments perdus sont retransmis.",
              "Ordre : les segments sont remis dans l'ordre d'origine.",
              "Contrôle de flux : l'émetteur ne sature pas le récepteur.",
              "Contrôle de congestion : on ralentit si le réseau est encombré."
            ),
            h("En résumé"),
            p(
              "TCP est le protocole de la fiabilité : poignée de main avant, numéros de suivi pendant, au revoir à la fin. C'est lui qui transporte HTTP, SSH, le courrier et presque tout le trafic web classique."
            )
          ],
        },
        {
          id: "net-lecon-09",
          title: "UDP, le rapide",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("L'autre protocole de la couche 4"),
            p(
              "Tout le trafic ne mérite pas la lourdeur de TCP. Parfois, on préfère la vitesse à la perfection. UDP (User Datagram Protocol) est ce transport minimaliste : il envoie des datagrammes sans connexion préalable, sans accusé de réception, sans réordonnancement."
            ),
            p(
              "L'analogie est simple : TCP, c'est une lettre recommandée avec accusé de réception ; UDP, c'est une carte postale lancée dans la boîte. Elle arrive peut-être, peut-être dans le désordre, et personne ne la redemandera."
            ),
            h("Un en-tête minuscule"),
            p(
              "UDP ajoute très peu d'informations : juste les ports source et destination, la longueur et une somme de contrôle. Rien à voir avec la lourdeur de TCP. Moins d'en-tête = moins d'octets à transporter = plus rapide."
            ),
            h("Pourquoi choisir la perte plutôt que la fiabilité ?"),
            p(
              "Parce que pour certaines applications, attendre une retransmission est pire qu'en perdre un morceau. Un appel vidéo qui attend chaque paquet perdu serait plein de saccades. Mieux vaut recevoir la suite immédiatement et accepter un micro-trou."
            ),
            h("Les grands cas d'usage d'UDP"),
            list(
              "DNS : une question, une réponse, un datagramme. Pas besoin de poignée de main pour demander une adresse.",
              "DHCP : un ordinateur qui n'a pas encore d'adresse IP ne peut pas établir de connexion TCP ; UDP lui permet de diffuser sa demande.",
              "Voix sur IP et visioconférence : les appels (VoIP) tolèrent les pertes mais pas le retard.",
              "Streaming et jeux en ligne : la latence prime, quelques trames perdues passent inaperçues.",
              "Envois diffusés (broadcast/multicast) : toucher plusieurs machines d'un coup est naturel en UDP."
            ),
            h("TCP ou UDP : la comparaison"),
            list(
              "Connexion : TCP établit une connexion (handshake), UDP n'en établit aucune.",
              "Fiabilité : TCP garantit l'arrivée et l'ordre, UDP n'offre aucune garantie.",
              "Vitesse : UDP est plus rapide et plus léger, TCP a un coût d'en-tête et de contrôle.",
              "Cas typiques : TCP pour HTTP, SSH, FTP, e-mail ; UDP pour DNS, DHCP, VoIP, jeux.",
              "En-tête : TCP est volumineux, UDP fait 8 octets."
            ),
            callout(
              "Retiens le compromis fondamental : TCP vend de la fiabilité contre de la lenteur, UDP vend de la vitesse contre de l'incertitude. Choisir entre les deux, c'est choisir ce qu'on accepte de perdre.",
              "info"
            ),
            h("En résumé"),
            list(
              "UDP est un transport sans connexion, sans fiabilité, mais rapide et léger.",
              "Ses données s'appellent des datagrammes.",
              "On l'utilise quand le temps de réponse est critique et que les pertes sont acceptables.",
              "DNS, DHCP, la VoIP et les jeux reposent sur UDP."
            )
          ],
        },
        {
          id: "net-lecon-10",
          title: "Les ports",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Une machine peut héberger beaucoup de services"),
            p(
              "Ton ordinateur parle à la fois à un site web, à un serveur de messagerie, à une visioconférence... Comment le serveur sait-il à quel service s'adressent les données ? Grâce au port : un numéro logique qui identifie l'application destinataire, comme une porte dans un immeuble."
            ),
            p(
              "Reprends l'analogie : l'adresse IP, c'est l'adresse de l'immeuble. Le port, c'est la porte de l'appartement. Le trio complet est donc adresse IP + port : 192.168.1.42:443. On parle de socket."
            ),
            code(`127.0.0.1:22\n   ^        ^\nadresse   porte (port SSH)\n\nL'adresse trouve l'immeuble, le port trouve l'appartement.`),
            h("Les trois grandes familles de ports"),
            list(
              "Ports 0-1023 : ports bien connus (well-known), privilégiés. Les services système et les protocoles standards s'y installent.",
              "Ports 1024-49151 : ports enregistrés, attribués à des applications connues.",
              "Ports 49152-65535 : ports éphémères, choisis au hasard par ta machine pour chaque connexion sortante."
            ),
            h("Les ports à connaître"),
            list(
              "22 — SSH : l'administration à distance sécurisée.",
              "53 — DNS : la résolution de noms.",
              "80 — HTTP : le web en clair.",
              "443 — HTTPS : le web chiffré.",
              "445 — SMB : le partage de fichiers Windows.",
              "3306 — MySQL : la base de données.",
              "3389 — RDP : le bureau à distance Windows."
            ),
            h("Pourquoi un pentester regarde les ports"),
            p(
              "Chaque port ouvert est une porte ouverte sur un service. Et chaque service est un logiciel qui peut contenir des failles. Avant d'attaquer une machine, on fait une énumération : quels ports sont ouverts, quels services tournent dessus, quelles versions ? C'est le point de départ de toute la démarche offensive."
            ),
            p(
              "Une machine qui n'expose que le port 22 (SSH) offre peu de surface d'attaque ; une machine qui expose 80, 443, 445, 3306 et 3389 en offre beaucoup. Comprendre les ports, c'est comprendre où chercher."
            ),
            callout(
              "Ouvrir un port sur une machine, c'est inviter le monde entier à toquer à cette porte. Par défaut, ton ordinateur personnel ne doit exposer AUCUN port vers Internet. On n'ouvre des ports que pour un vrai besoin, et uniquement sur sa propre machine dans le cadre de ce cours.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Le port identifie le service (la porte de l'immeuble) ; le couple IP:port est unique.",
              "Les ports 0-1023 sont privilégiés et réservés aux protocoles standards.",
              "SSH=22, DNS=53, HTTP=80, HTTPS=443, SMB=445, MySQL=3306, RDP=3389.",
              "Énumérer les ports ouverts d'une machine, c'est le premier geste du pentester."
            )
          ],
        },
        {
          id: "net-lecon-11",
          title: "ICMP et la commande ping",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("ICMP : le service de messagerie du réseau"),
            p(
              "Avant que les données circulent, le réseau a besoin de se parler à lui-même : est-ce que la machine est joignable ? Est-ce que la route est trop longue ? Ce langage de coulisses s'appelle ICMP (Internet Control Message Protocol). Il ne transporte pas tes données : il transporte des messages de contrôle et d'erreur."
            ),
            p(
              "L'outil le plus célèbre basé sur ICMP est ping, qui envoie un message de demande d'écho (echo request) et attend une réponse d'écho (echo reply). C'est comme crier « Coucou ! » dans une pièce et attendre l'écho."
            ),
            h("Essayer ping"),
            code(`ping -c 4 127.0.0.1\n\nPING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.036 ms\n64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.045 ms\n\n--- 127.0.0.1 ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss`),
            p(
              "Le paramètre -c 4 limite l'envoi à 4 paquets. Le temps (time) indique la latence : le temps d'aller-retour en millisecondes. Sur la boucle locale, il est minuscule."
            ),
            h("TTL : le compteur de survie"),
            p(
              "Chaque paquet IP porte un TTL (Time To Live), un compteur qui diminue à chaque routeur traversé. S'il atteint zéro, le paquet est détruit et un message ICMP est renvoyé à l'émetteur. Ce mécanisme évite qu'un paquet perdu ne circule éternellement dans le réseau."
            ),
            h("mtr et traceroute : le voyage du paquet"),
            p(
              "traceroute exploite le TTL pour cartographier le chemin : il envoie des paquets avec un TTL de 1 (le premier routeur répond), puis 2 (le deuxième répond), etc. Chaque saut apparaît dans la liste."
            ),
            code(`traceroute -n 8.8.8.8\n\n 1  192.168.1.1       1.2 ms\n 2  10.10.0.1         8.1 ms\n 3  213.246.128.1    12.4 ms\n 4  8.8.8.8          15.8 ms`),
            p(
              "mtr combine ping et traceroute : il affiche le chemin ET la qualité de chaque saut en continu, avec les pertes de paquets. En mode rapport, il s'arrête tout seul."
            ),
            code(`mtr -r -c 5 1.1.1.1`),
            callout(
              "traceroute et mtr utilisent parfois des sondes qui nécessitent des droits élevés. Si le système te le demande, préfixe la commande par sudo. C'est sans danger : tu sondes une adresse publique banale, ce que font des millions de machines chaque jour.",
              "tip"
            ),
            h("Ce que ping ne prouve PAS"),
            p(
              "Important : un ping qui répond ne veut PAS dire qu'un service est accessible. Ta box peut répondre aux pings alors qu'aucun site ne tourne dessus. À l'inverse, un serveur peut bloquer les pings (pare-feu) tout en servant très bien le web."
            ),
            p(
              "Ping teste la couche réseau (la machine est-elle vivante ?). Pour savoir si un SERVICE est accessible, il faut tester un port précis avec un outil comme netcat ou nmap, que nous allons voir."
            ),
            h("En résumé"),
            list(
              "ICMP porte les messages de contrôle du réseau ; ping l'utilise pour l'écho.",
              "ping -c 4 <adresse> teste si une machine répond, et mesure la latence.",
              "TTL limite la vie des paquets ; traceroute et mtr en tirent le chemin.",
              "Un ping qui répond n'implique aucun service ouvert : il faut tester les ports."
            )
          ],
        },
        {
          id: "net-lecon-12",
          title: "Exercice — tester des ports localement",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Objectif"),
            p(
              "Observer les ports déjà ouverts sur ta machine, puis ouvrir un listener et t'y connecter. Tu vas comprendre ce qu'est réellement un port ouvert. Tout se passe sur 127.0.0.1."
            ),
            callout(
              "Ce que tu vas tester est TON propre ordinateur, via la boucle locale. N'applique JAMAIS cette démarche à une machine qui ne t'appartient pas, ni à une adresse publique sans autorisation écrite.",
              "danger"
            ),
            h("Étape 1 — Lister les ports en écoute"),
            code(`ss -tulpn`),
            p(
              "ss affiche les sockets (connexions). Les options : -t pour les ports TCP, -u pour UDP, -l pour ceux qui écoutent (listening), -p pour le processus, -n pour les numéros sans résolution DNS."
            ),
            code(`Netid  State   Local Address:Port   Process\nudp     UNCONN  0.0.0.0:53             users:((\"systemd-resolve\"))\ntcp    LISTEN  127.0.0.1:631          users:((\"cupsd\"))\nudp    UNCONN  127.0.0.53:53           users:((\"systemd-resolve\"))`),
            p(
              "Chaque ligne est une porte ouverte. La colonne Local Address:Port montre l'adresse et le port ; Process montre le logiciel derrière. Sur une machine Linux fraîche, tu verras surtout des services système."
            ),
            h("Étape 2 — Comprendre la sortie"),
            list(
              "LISTEN : le port est ouvert et attend des connexions.",
              "State UNCONN pour UDP : un port UDP en attente.",
              "127.0.0.1:631 : ce service n'écoute QUE sur la boucle locale, donc inaccessible depuis l'extérieur.",
              "0.0.0.0:53 : ce service écoute sur toutes les interfaces, donc joignable depuis le réseau local."
            ),
            p(
              "Si tu ne vois pas la colonne Process, relance avec sudo : afficher le processus de chaque port nécessite des privilèges."
            ),
            h("Étape 3 — Ouvrir un listener avec netcat"),
            p("Ouvre un terminal et lance un petit serveur d'écoute sur le port 4444 :"),
            code(`nc -lvnp 4444`),
            p(
              "Les options : -l pour écouter, -v pour le mode verbeux, -n pour ne pas résoudre les noms, -p pour préciser le port. netcat (nc) est le couteau suisse des ports, on l'étudiera en détail au module 4."
            ),
            h("Étape 4 — Vérifier que le port est maintenant ouvert"),
            p("Dans un second terminal, relance la commande et cherche 4444 :"),
            code(`ss -tulpn | grep 4444\n\ntcp  LISTEN  0  4096  127.0.0.1:4444  0.0.0.0:*  users:((\"nc\",pid=5678,fd=3))`),
            p(
              "Tu viens de créer un port ouvert : le netcat écoute sur 127.0.0.1:4444. C'est exactement ce que voit un scanner de ports."
            ),
            h("Étape 5 — S'y connecter"),
            p("Toujours dans le second terminal, connecte-toi :"),
            code(`nc 127.0.0.1 4444`),
            p(
              "Tape un message comme bonjour puis Entrée. Retourne dans le premier terminal : le texte s'y est affiché. Tu as établi une vraie connexion TCP entre deux processus de ta machine, via le port 4444."
            ),
            h("Étape 6 — Fermer proprement"),
            p(
              "Appuie sur Ctrl+C dans les deux terminaux pour fermer le listener et la connexion. Vérifie avec ss -tulpn que le port 4444 a disparu : un port fermé est invisible pour un scanner."
            ),
            h("Résultat attendu"),
            list(
              "ss -tulpn liste les ports en écoute avec leurs processus.",
              "nc -lvnp 4444 ouvre un listener visible dans ss.",
              "nc 127.0.0.1 4444 s'y connecte et transmet un message.",
              "Après Ctrl+C, le port 4444 n'apparaît plus dans ss."
            ),
            callout(
              "Retiens la leçon : un port ouvert est un programme qui écoute. Fermer le programme ferme le port. La commande ss -tulpn est la première chose qu'un administrateur (ou un attaquant) lance pour cartographier une machine.",
              "tip"
            )
          ],
        },
        {
          id: "net-lecon-13",
          title: "Quiz — TCP, UDP, ports",
          type: "quiz",
          duration: "6 min",
          blocks: [
            p(
              "Vérifie ta compréhension de TCP, UDP et des ports. Minimum 80 % pour valider."
            ),
            callout(
              "Les réponses se trouvent dans les leçons 8 à 12. Pas de panique si un détail t'échappe : relis le passage concerné."
            ),
          ],
          quiz: [
            {
              question: "Le triple handshake de TCP est l'échange de messages :",
              options: [
                "SYN, SYN-ACK, ACK",
                "SYN, ACK, SYN-ACK",
                "GET, POST, PUT",
                "Discover, Offer, Request, Acknowledge",
              ],
              answer: 0,
              explanation:
                "TCP ouvre une connexion en trois temps : le client envoie SYN, le serveur répond SYN-ACK, le client confirme avec ACK. DORA est le cycle du DHCP, pas de TCP.",
            },
            {
              question: "UDP est préféré à TCP pour...",
              options: [
                "transférer un fichier sans aucune perte",
                "les appels vocaux et le streaming, car la rapidité prime",
                "établir une connexion sécurisée avec une poignée de main",
                "toutes les communications web",
              ],
              answer: 1,
              explanation:
                "UDP n'offre ni fiabilité ni ordre mais va vite : parfait pour la VoIP, le streaming et les jeux, où une perte ponctuelle vaut mieux qu'un retard. Les fichiers sans perte exigent TCP.",
            },
            {
              question: "Un port est...",
              options: [
                "l'adresse MAC de l'interface",
                "le nom du câble réseau",
                "une adresse IPv6",
                "une porte logique vers un service sur une machine",
              ],
              answer: 3,
              explanation:
                "Le port numérote les services d'une machine : l'adresse IP trouve l'immeuble, le port trouve la porte de l'appartement. Sans lui, impossible de savoir quelle application doit recevoir les données.",
            },
            {
              question: "Le port 443 est associé à...",
              options: ["SSH", "HTTP", "HTTPS", "DNS"],
              answer: 2,
              explanation:
                "443 est le port du web chiffré (HTTPS). SSH utilise 22, le web en clair (HTTP) utilise 80, et le DNS utilise 53.",
            },
          ],
        },
      ],
    },
    {
      id: "net-module-3",
      title: "DNS, DHCP et HTTP",
      lessons: [
        {
          id: "net-lecon-14",
          title: "Le DNS : l'annuaire d'Internet",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Un annuaire gigantesque"),
            p(
              "Tu ne peux pas mémoriser 93.184.215.14 pour aller sur un site. Mais tu mémorises example.com sans effort. Le DNS (Domain Name System) est l'annuaire qui fait le lien : il traduit les noms de domaine en adresses IP, et inversement."
            ),
            p(
              "L'analogie est l'annuaire téléphonique : tu cherches le nom de la personne pour trouver son numéro. Sauf que pour Internet, cet annuaire est distribué sur des millions de machines à travers le monde."
            ),
            h("La hiérarchie du nom"),
            p(
              "Un nom de domaine comme www.example.com se lit de droite à gauche, du plus général au plus précis. C'est une arborescence :"
            ),
            list(
              ". (racine) : le sommet, géré par des serveurs racines dans le monde. Il connaît les domaines de premier niveau.",
              "TLD (Top-Level Domain) : .com, .org, .fr... Chaque TLD est géré par un registre.",
              "example.com : le domaine de second niveau, géré par son propriétaire (le registrant).",
              "www : un sous-domaine, par exemple www.example.com ou blog.example.com."
            ),
            p(
              "À chaque niveau, un serveur autoritaire a autorité sur ses sous-domaines. Le DNS fonctionne comme un interrogatoire en cascade : qui gère .com ? Qui gère example.com ? C'est lui."
            ),
            h("Le résolveur"),
            p(
              "Ta machine ne parle pas directement aux serveurs racines. Elle s'adresse à un résolveur : ton fournisseur d'accès (ou 1.1.1.1, 8.8.8.8) en possède. Le résolveur fait le voyage pour toi et te remet la réponse."
            ),
            code(`Ton navigateur\n    |  www.example.com ?\n    v\nRésolveur DNS (ton FAI)\n    |  1. demande au serveur racine : qui gère .com ?\n    |  2. demande au serveur .com : qui gère example.com ?\n    |  3. demande au serveur de example.com : adresse de www ?\n    |  4. reçoit 93.184.215.14\n    v\nTon navigateur se connecte à 93.184.215.14`),
            h("Le cache : la mémoire qui va vite"),
            p(
              "Demander une adresse à chaque visite serait lent. Les réponses DNS sont donc mémorisées (mises en cache) à plusieurs endroits : ton navigateur, ton système, le résolveur. Chaque réponse a une durée de vie (TTL) après laquelle on redemande."
            ),
            p(
              "C'est pour cela qu'un changement de serveur d'un site peut mettre quelques heures à être visible partout : les caches du monde entier doivent expirer."
            ),
            h("Le DNS, cible des attaquants"),
            p(
              "Si on détourne le DNS d'un utilisateur (empoisonnement du cache, faux résolveur), on peut lui faire croire qu'il visite sa banque alors qu'il est sur un site pirate : l'adresse IP renvoyée est fausse. C'est une des grandes familles d'attaques réseau, on y reviendra."
            ),
            h("En résumé"),
            list(
              "Le DNS (Domain Name System) traduit les noms de domaine en adresses IP.",
              "Sa hiérarchie : racine, TLD (.com, .fr), domaine autoritaire, sous-domaines.",
              "Le résolveur fait le travail à ta place ; la réponse est mise en cache avec une durée de vie (TTL).",
              "Le DNS est une cible de choix : le détourner, c'est diriger l'utilisateur n'importe où."
            )
          ],
        },
        {
          id: "net-lecon-15",
          title: "Les enregistrements DNS",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Un domaine, plusieurs réponses"),
            p(
              "Un domaine n'est pas qu'une adresse IP. Le DNS peut répondre à de nombreuses questions : où est le site ? Où est le courrier ? Qui est autorisé à envoyer du mail ? Quel est le serveur qui fait autorité ? Chaque réponse est un enregistrement DNS, caractérisé par un type."
            ),
            h("Le type A : l'adresse IPv4"),
            p(
              "L'enregistrement A associe un nom à une adresse IPv4. C'est le plus utilisé : quand tu tapes un site, c'est lui qu'on cherche."
            ),
            code(`www.example.com.  3600  IN  A  93.184.215.14`),
            h("Le type AAAA : l'adresse IPv6"),
            p(
              "Même rôle que le A, mais pour une adresse IPv6. Un domaine peut avoir les deux : A pour les réseaux IPv4, AAAA pour les réseaux IPv6."
            ),
            code(`www.example.com.  3600  IN  AAAA  2606:2800:220:1:248:1893:25c8:1946`),
            h("Le type CNAME : l'alias"),
            p(
              "CNAME (Canonical Name) fait pointer un nom vers un autre nom, qui aura lui-même un enregistrement A. C'est un simple raccourci : blog.example.com pointe vers exemple.example.com."
            ),
            code(`blog.example.com.  3600  IN  CNAME  exemple.example.com.`),
            h("Le type MX : la messagerie"),
            p(
              "MX (Mail eXchange) indique quel serveur reçoit le courrier d'un domaine. Il porte une priorité : plus le nombre est petit, plus le serveur est préféré."
            ),
            code(`example.com.  3600  IN  MX  10 mail.example.com.\nexample.com.  3600  IN  MX  20 mail2.example.com.`),
            h("Le type TXT : le texte libre"),
            p(
              "TXT stocke du texte arbitraire, souvent des codes de vérification de domaine ou des règles anti-pourriel (SPF, DKIM). Les attaquants adorent vérifier ces enregistrements pour trouver des failles de configuration."
            ),
            code(`example.com.  3600  IN  TXT  "v=spf1 include:_spf.example.com ~all"`),
            h("Le type NS : les serveurs autoritaires"),
            p(
              "NS (Name Server) déclare quels serveurs font autorité pour un domaine. C'est l'annuaire qui dit qui est responsable."
            ),
            code(`example.com.  3600  IN  NS  ns1.dns-provider.com.\nexample.com.  3600  IN  NS  ns2.dns-provider.com.`),
            h("Le type SOA : l'en-tête du domaine"),
            p(
              "SOA (Start Of Authority) est le premier enregistrement d'une zone : il identifie le serveur principal, l'adresse e-mail du contact, et les durées de vie par défaut. C'est la carte d'identité de la zone. Récapitulatif des types :"
            ),
            list(
              "A : nom vers adresse IPv4 — l'essentiel du web.",
              "AAAA : nom vers adresse IPv6.",
              "CNAME : alias vers un autre nom.",
              "MX : serveur de messagerie, avec priorité.",
              "TXT : texte libre (vérifications, anti-pourriel).",
              "NS : serveurs autoritaires du domaine.",
              "SOA : informations générales de la zone."
            ),
            h("En résumé"),
            p(
              "Chaque type d'enregistrement répond à une question précise sur le domaine. Savoir les lire, c'est savoir interroger un domaine comme un enquêteur : on passe de l'adresse au serveur de mail puis aux serveurs autoritaires."
            )
          ],
        },
        {
          id: "net-lecon-16",
          title: "dig et host",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Interroger le DNS directement"),
            p(
              "Navigateur et système font la résolution pour toi, en silence. Mais en cybersécurité, on veut VOIR les réponses brutes. Les outils dig, host et nslookup interrogent directement les serveurs DNS et affichent les détails."
            ),
            h("dig : le couteau suisse du DNS"),
            code(`dig example.com`),
            p("Voici une sortie type, commentée :"),
            code(`; <<>> DiG 9.18.19 <<>> example.com\n;; global options: +cmd\n;; Got answer:\n;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 51234\n;; flags: qr rd ra; QUERY: 1, ANSWER: 1\n\n;; QUESTION SECTION:\n;example.com.          IN  A\n\n;; ANSWER SECTION:\nexample.com.    3600   IN  A  93.184.215.14\n\n;; Query time: 23 msec\n;; SERVER: 1.1.1.1#53(1.1.1.1)`),
            list(
              "QUESTION SECTION : la question posée (quel A pour example.com ?).",
              "ANSWER SECTION : la réponse (93.184.215.14) avec sa durée de vie de 3600 secondes.",
              "status: NOERROR : tout s'est bien passé.",
              "SERVER : le résolveur interrogé (1.1.1.1, port 53).",
              "Query time : le temps de réponse."
            ),
            h("Demander un type précis"),
            p("dig accepte un type d'enregistrement en argument. Pour le courrier, les alias, ou le texte :"),
            code(`dig example.com MX\ndig example.com TXT\ndig example.com CNAME`),
            p("L'option +short donne une réponse dépouillée, idéale pour les scripts :"),
            code(`dig +short example.com\n93.184.215.14`),
            h("host : la version rapide"),
            p("host est plus simple et lisible par un humain. Il interroge le type A par défaut, ou le type demandé :"),
            code(`host example.com\nexample.com has address 93.184.215.14\n\nhost example.com MX\nexample.com mail is handled by 10 mail.example.com.`),
            h("nslookup : l'outil historique"),
            code(`nslookup example.com\nServer: 127.0.0.53\nAddress: 127.0.0.53#53\n\nNon-authoritative answer:\nName: example.com\nAddress: 93.184.215.14`),
            p(
              "La mention Non-authoritative answer signifie que la réponse vient du cache d'un résolveur, pas directement du serveur autoritaire. C'est normal dans 99 % des cas."
            ),
            h("Le transfert de zone AXFR : pourquoi c'est dangereux"),
            p(
              "Normalement, on demande une réponse à la fois. Un transfert de zone (AXFR) demande TOUT le contenu du domaine d'un coup : tous les noms, toutes les adresses. C'est comme demander l'annuaire téléphonique complet au lieu d'un numéro."
            ),
            code(`dig @ns1.example.com example.com AXFR`),
            p(
              "Si le serveur autoritaire est mal configuré, il renvoie tout, ce qui révèle à un attaquant la liste des serveurs, postes et services du domaine. Les administrateurs doivent bloquer AXFR sauf vers des serveurs de secours autorisés."
            ),
            callout(
              "Le transfert de zone n'est pas illégal à tester sur UN domaine qui t'appartient, mais le tester sur un domaine tiers est du recel de données et peut constituer une infraction. En TP, ne le pratique que sur ta propre machine ou un domaine d'entraînement fourni.",
              "warning"
            ),
            h("En résumé"),
            list(
              "dig donne la réponse complète et commentée ; +short la réduit à l'essentiel.",
              "host est rapide et lisible ; nslookup est l'outil historique.",
              "On précise le type : dig exemple.com MX, dig exemple.com TXT...",
              "AXFR transfère toute une zone : un trésor pour un attaquant, un danger si mal configuré."
            )
          ],
        },
        {
          id: "net-lecon-17",
          title: "DHCP : attribuer une adresse",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Donner une adresse à chaque machine"),
            p(
              "Quand tu branches ton ordinateur sur un réseau, il doit obtenir une adresse IP, une passerelle, un serveur DNS... Le faire à la main sur des centaines de machines serait ingérable. Le DHCP (Dynamic Host Configuration Protocol) automatise tout."
            ),
            p(
              "C'est le standard d'immeuble : à l'arrivée d'un nouvel habitant, le gestionnaire (le serveur DHCP) lui attribue automatiquement un appartement, lui explique la porte de sortie (la passerelle) et l'annuaire (le DNS)."
            ),
            h("Le cycle DORA"),
            p("L'attribution d'une adresse se déroule en quatre messages, qu'on résume par l'acronyme DORA :"),
            list(
              "D — Discover : la machine diffuse à tout le quartier : « Y a-t-il un serveur DHCP ici ? Je n'ai pas d'adresse. »",
              "O — Offer : le serveur répond : « Je te propose l'adresse 192.168.1.100 pour un certain temps. »",
              "R — Request : la machine demande officiellement : « Je veux cette adresse 192.168.1.100. »",
              "A — Acknowledge : le serveur confirme : « C'est à toi, voici la passerelle et le DNS. »"
            ),
            code(`Client                     Serveur DHCP\n   |------ Discover ---------->|   je n'ai pas d'adresse\n   |<----- Offer --------------|   je te propose .100\n   |------ Request ------------>|   je prends .100\n   |<----- Acknowledge --------|   confirmé + passerelle + DNS`),
            h("Pourquoi UDP ?"),
            p(
              "Au moment de Discover, la machine n'a pas encore d'adresse IP : impossible d'établir une connexion TCP. DHCP passe donc par UDP, qui permet d'envoyer des messages sans connexion, en diffusion sur le réseau local."
            ),
            h("Le bail : louer plutôt qu'acheter"),
            p(
              "L'adresse n'est pas donnée pour toujours : elle est louée pour une durée appelée bail (lease), typiquement quelques heures à quelques jours. Quand le bail expire, la machine redemande. Ainsi, un parc d'ordinateurs plus petit que la plage d'adresses peut s'organiser : les adresses libres repassent dans le pool."
            ),
            h("IP fixe vs DHCP"),
            list(
              "DHCP : automatique, flexible, idéal pour les postes de travail, smartphones, imprimantes.",
              "IP fixe : configurée à la main ou réservée côté DHCP, idéale pour les serveurs dont l'adresse ne doit jamais changer.",
              "Beaucoup d'administrateurs utilisent des réservations DHCP : l'adresse est attribuée automatiquement, mais toujours la même à la même machine."
            ),
            h("Et la sécurité ?"),
            p(
              "Un serveur DHCP pirate (rogue DHCP) peut distribuer de fausses passerelles ou de faux DNS pour détourner tout le trafic du réseau. C'est une attaque simple et redoutable : tout le monde fait confiance à l'adresse reçue."
            ),
            h("En résumé"),
            list(
              "DHCP (Dynamic Host Configuration Protocol) attribue automatiquement adresse IP, passerelle et DNS.",
              "Le cycle DORA : Discover, Offer, Request, Acknowledge.",
              "L'adresse est louée pour un bail, renouvelé régulièrement.",
              "Un DHCP pirate peut rediriger tout un réseau : une attaque classique de niveau supérieur."
            )
          ],
        },
        {
          id: "net-lecon-18",
          title: "HTTP de base",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le web en clair"),
            p(
              "HTTP (HyperText Transfer Protocol) est le protocole de la couche Application qui fait tourner le web. C'est une conversation entre un client (ton navigateur, curl...) et un serveur, faite de requêtes et de réponses."
            ),
            p(
              "L'analogie du restaurant : tu passes une commande au serveur (requête), la cuisine prépare (le serveur web traite), et on t'apporte le plat (réponse). Le menu est la liste des ressources disponibles."
            ),
            h("La requête"),
            p(
              "Une requête HTTP commence par une ligne de commande : la méthode, le chemin demandé et la version du protocole. Suivent des en-têtes qui décrivent le client et la demande."
            ),
            code(`GET / HTTP/1.1\nHost: example.com\nUser-Agent: curl/8.5.0\nAccept: */*`),
            h("La réponse"),
            p(
              "Le serveur répond par une ligne de statut : la version, un code à trois chiffres et un message. Suivent des en-têtes puis le corps (le contenu de la page)."
            ),
            code(`HTTP/1.1 200 OK\nServer: nginx\nContent-Type: text/html\nContent-Length: 1256\nDate: Thu, 06 Aug 2026 10:00:00 GMT\n\n<!DOCTYPE html><html>...<body>Bonjour</body></html>`),
            h("Les méthodes"),
            list(
              "GET : demander une ressource (une page, une image). Ne modifie rien côté serveur.",
              "POST : envoyer des données au serveur (formulaire, connexion). Modifie l'état du serveur.",
              "PUT et DELETE : créer/remplacer ou supprimer une ressource.",
              "HEAD : comme GET, mais sans le corps : juste les en-têtes. Très utile en reconnaissance."
            ),
            h("Les codes de statut, la langue des serveurs"),
            list(
              "200 OK : tout a fonctionné, voici la ressource.",
              "301 Moved Permanently : la page a déménagé, suivez la nouvelle adresse.",
              "403 Forbidden : compris, mais interdit d'accès (identifiants insuffisants, règle de sécurité).",
              "404 Not Found : la ressource demandée n'existe pas.",
              "500 Internal Server Error : le serveur a planté en interne."
            ),
            p(
              "Ces codes sont tes meilleurs amis pour comprendre une réponse : un 403 et un 404 ne révèlent pas la même chose, un 500 peut cacher un bug à exploiter."
            ),
            h("HTTP vs HTTPS"),
            p(
              "HTTP envoie tout en clair : n'importe qui sur le chemin peut lire les requêtes et les réponses. HTTPS (HTTP Secure) passe par un chiffrement TLS : le contenu est illisible pour les observateurs. On testera des sites HTTPS avec openssl s_client."
            ),
            h("En résumé"),
            list(
              "HTTP est une conversation requête/réponse entre client et serveur.",
              "Méthodes clés : GET (lire), POST (envoyer), HEAD (en-têtes seuls).",
              "Codes clés : 200 OK, 301 redirection, 403 interdit, 404 introuvable, 500 erreur serveur.",
              "HTTP est en clair, HTTPS chiffre avec TLS."
            )
          ],
        },
        {
          id: "net-lecon-19",
          title: "Exercice — voyager sur le web",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Objectif"),
            p(
              "Suivre le chemin réel d'une visite web : de la résolution DNS à la réponse HTTP. Tu n'interroges que des sites publics et bien connus : aucun accès non autorisé, c'est exactement ce que fait un navigateur."
            ),
            callout(
              "Ces commandes interrogent des serveurs publics comme le ferait n'importe quel navigateur. C'est légal et quotidien. Ce qui reste INTERDIT, c'est d'attaquer ces serveurs, de les scanner de façon agressive ou de tenter d'accéder à leurs coulisses.",
              "info"
            ),
            h("Étape 1 — Résoudre un nom en adresse"),
            code(`dig +short example.com\nhost example.com`),
            p(
              "Résultat attendu : une adresse IPv4. Le site exemple.com est géré par l'IANA, l'organisme qui régit les noms : sa réponse est donc très stable."
            ),
            h("Étape 2 — Observer le serveur sans charger la page"),
            code(`curl -I https://example.com`),
            p("L'option -I envoie une requête HEAD : le serveur répond avec les en-têtes seulement, sans le corps. Regarde ce qui revient :"),
            list(
              "HTTP/2 200 : le code de statut, ici un succès.",
              "server: ... : la technologie du serveur (ou son camouflage).",
              "content-type: text/html : la nature de la réponse.",
              "date: ... : l'heure du serveur, une information de timing parfois précieuse.",
              "expires / cache-control : la gestion du cache."
            ),
            h("Étape 3 — Charger le contenu"),
            code(`curl https://example.com`),
            p(
              "Cette fois tu reçois le corps de la page : du HTML. C'est la réponse complète que ton navigateur interpréterait pour afficher la page."
            ),
            h("Étape 4 — Voir la version historique de l'outil"),
            code(`nslookup example.com`),
            p("Compare avec la sortie de dig : le résolveur interrogé, l'adresse obtenue. Tu peux aussi demander un autre type :"),
            code(`dig example.com MX\nhost example.com TXT`),
            h("Étape 5 — Qui possède ce domaine ?"),
            p(
              "whois interroge les registres publics pour donner le propriétaire d'un domaine. Sur example.com tu verras l'IANA ; sur d'autres domaines, des données parfois partielles (masquées pour la vie privée)."
            ),
            code(`whois example.com`),
            callout(
              "whois peut ne pas être installé. Sur Debian/Ubuntu : sudo apt install whois. Les données whois sont publiques et le sont depuis 30 ans : les consulter est totalement légal.",
              "tip"
            ),
            h("Étape 6 — Observer une connexion chiffrée"),
            p("Ouvre une vraie connexion TLS avec le serveur et affiche son certificat (tape Q pour quitter) :"),
            code(`openssl s_client -connect example.com:443`),
            p(
              "Tu verras le certificat, son émetteur, ses dates de validité et les chiffrements négociés. C'est le tunnel HTTPS vu de l'intérieur."
            ),
            h("Résultat attendu"),
            list(
              "dig +short et host donnent une adresse IPv4.",
              "curl -I affiche un code 200 et des en-têtes.",
              "curl renvoie le HTML de la page.",
              "dig example.com MX liste les serveurs de courrier.",
              "whois example.com affiche l'IANA comme titulaire.",
              "openssl s_client affiche le certificat TLS du site."
            ),
            callout(
              "Tu viens de dérouler la chaîne complète d'une visite web : DNS, TCP/TLS, HTTP. C'est exactement le chemin qu'on décompose en pentest, sauf qu'on le fait ici à ciel ouvert et sur des serveurs publics inoffensifs.",
              "tip"
            )
          ],
        },
        {
          id: "net-lecon-20",
          title: "Quiz — DNS, DHCP, HTTP",
          type: "quiz",
          duration: "7 min",
          blocks: [
            p(
              "Dernière vérification avant les outils : DNS, DHCP et HTTP doivent être solides. 80 % minimum pour valider."
            ),
            callout(
              "Leçons 14 à 19. La question du cache est piège : relis bien le passage sur le TTL des enregistrements."
            ),
          ],
          quiz: [
            {
              question: "Le rôle du DNS est de...",
              options: [
                "chiffrer les paquets",
                "scanner les ports",
                "traduire un nom de domaine en adresse IP",
                "attribuer des adresses MAC",
              ],
              answer: 2,
              explanation:
                "Le DNS (Domain Name System) est l'annuaire d'Internet : il traduit les noms (example.com) en adresses IP (93.184.215.14). Les adresses MAC sont attribuées par les fabricants, pas par le DNS.",
            },
            {
              question: "Un enregistrement MX indique...",
              options: [
                "le serveur de messagerie du domaine",
                "l'adresse du routeur",
                "le nom du résolveur",
                "le mot de passe du domaine",
              ],
              answer: 0,
              explanation:
                "MX (Mail eXchange) désigne les serveurs qui reçoivent le courrier d'un domaine, avec une priorité (plus le nombre est petit, plus le serveur est préféré).",
            },
            {
              question: "Dans DHCP, l'acronyme DORA signifie...",
              options: [
                "DNS, OSI, Router, ARP",
                "Discover, Offer, Request, Acknowledge",
                "Data, Object, Route, Access",
                "Download, Open, Read, Accept",
              ],
              answer: 1,
              explanation:
                "DORA est le cycle d'attribution d'adresse : la machine découvre un serveur (Discover), reçoit une offre (Offer), demande l'adresse (Request), et le serveur confirme (Acknowledge).",
            },
            {
              question: "Un code HTTP 404 signifie...",
              options: [
                "la requête a réussi",
                "la ressource demandée est introuvable",
                "l'accès est refusé",
                "une erreur interne du serveur",
              ],
              answer: 1,
              explanation:
                "404 Not Found : le serveur n'a rien trouvé à cette adresse. 200 = succès, 403 = accès refusé, 500 = erreur interne du serveur.",
            },
            {
              question: "Le cache DNS permet de...",
              options: [
                "chiffrer les requêtes",
                "bloquer les virus",
                "mémoriser des résolutions récentes pour aller plus vite",
                "changer d'adresse IP",
              ],
              answer: 2,
              explanation:
                "Les réponses DNS sont mémorisées (navigateur, système, résolveur) avec une durée de vie TTL : une résolution déjà faite évite de redemander l'annuaire à chaque visite.",
            },
          ],
        },
      ],
    },
    {
      id: "net-module-4",
      title: "Les outils du réseau",
      lessons: [
        {
          id: "net-lecon-21",
          title: "nmap : le scanner",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le scanner de ports"),
            p(
              "nmap (Network Mapper) est l'outil de référence pour cartographier un réseau : il découvre les machines, les ports ouverts, les services et leurs versions. C'est le premier outil qu'un pentester apprend."
            ),
            p(
              "Imagine un détective qui sonne à toutes les portes d'un immeuble pour savoir lesquelles sont ouvertes et ce qu'il y a derrière. C'est exactement ce que fait nmap sur les ports d'une machine."
            ),
            h("Avant de commencer : le cadre légal"),
            callout(
              "Scanner une machine qui ne t'appartient pas est une infraction pénale, même un simple scan. Dans CE cours, nmap ne s'utilise QUE sur 127.0.0.1 (ta propre machine) ou sur un réseau de lab qui t'appartient. Rien d'autre.",
              "danger"
            ),
            h("Un scan simple sur la boucle locale"),
            code(`nmap 127.0.0.1`),
            p("Résultat attendu : la liste des ports ouverts sur TA machine (les services système que tu as vus avec ss). Regarde la sortie :"),
            code(`Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for localhost (127.0.0.1)\nHost is up (0.0005s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT     STATE    SERVICE\n22/tcp   open     ssh\n80/tcp   open     http\n\nNmap done: 1 IP address (1 host up) scanned in 1.25 seconds`),
            h("Lire une sortie"),
            list(
              "PORT : le numéro de port et son protocole (tcp/udp).",
              "STATE : l'état du port.",
              "SERVICE : la déduction par défaut à partir du numéro (pas une preuve !).",
              "Not shown: N closed ports : les ports fermés, silencieusement ignorés."
            ),
            h("Les états d'un port"),
            list(
              "open : un service accepte les connexions. C'est une porte ouverte.",
              "closed : le port répond, mais aucun service n'écoute. Porte fermée, mais là.",
              "filtered : aucune réponse, probablement un pare-feu qui filtre. Porte invisible ou blindée."
            ),
            h("Les options à connaître"),
            list(
              "-sS : scan SYN (stealth), envoie un SYN et regarde la réponse sans ouvrir de vraie connexion. Nécessite les droits root.",
              "-sV : version detection, identifie le service et sa version derrière chaque port ouvert.",
              "-p- : scanne tous les ports de 1 à 65535 au lieu des 1000 plus courants. Long mais exhaustif.",
              "-O : détection d'OS (distingue Linux, Windows, routeur...). Nécessite les droits root.",
              "-T4 : agressivité du scan, de -T0 (discret, lent) à -T5 (rapide, bruyant)."
            ),
            h("Un scan complet sur la boucle locale"),
            code(`sudo nmap -sS -sV -p- 127.0.0.1`),
            p(
              "Ce scan parcourt tous les ports, identifie les services ouverts et leurs versions. Sur ta machine tu verras tes services systèmes ; si tu as lancé un netcat, le port 4444 apparaîtra comme un service inconnu."
            ),
            h("Pourquoi c'est l'outil n°1"),
            p(
              "En une commande, nmap répond aux questions fondatrices d'une attaque : quelles machines sont là, quelles portes sont ouvertes, quels logiciels derrière. Toute la suite (exploitation, élévation de privilèges) dépend de ces réponses."
            ),
            callout(
              "Retiens bien : le SERVICE affiché par nmap est une déduction à partir du port, pas une certitude. Un service exposé sur le port 8080 peut être n'importe quoi. Seule la détection de version (-sV) confirme ce qui tourne vraiment.",
              "warning"
            ),
            h("En résumé"),
            list(
              "nmap scanne les ports d'une machine : open, closed, filtered.",
              "Options clés : -sS (SYN), -sV (versions), -p- (tous les ports), -O (OS), -T (vitesse).",
              "Uniquement sur 127.0.0.1 dans ce cours : scanner sans autorisation est illégal.",
              "La déduction de service se confirme avec -sV."
            )
          ],
        },
        {
          id: "net-lecon-22",
          title: "netcat : le couteau suisse",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Un outil, mille usages"),
            p(
              "netcat (commande nc) est l'outil polyvalent des réseaux : se connecter, écouter, envoyer un fichier, tester un port. En quelques caractères, il remplace des dizaines d'utilitaires. D'où son surnom de couteau suisse."
            ),
            p(
              "Déjà utilisé dans les exercices, on le formalise maintenant. Le principe est simple : nc <adresse> <port> se connecte, nc -l <port> écoute."
            ),
            h("Se connecter à un port"),
            code(`nc 127.0.0.1 4444`),
            p(
              "Ouvre une connexion TCP vers 127.0.0.1 sur le port 4444. Si un service écoute, tu dialogues avec lui ; sinon la connexion échoue (connection refused)."
            ),
            h("Tester si un port est ouvert"),
            p(
              "Sans aucun service sur 4444, la connexion est refusée : le port est fermé. Avec un listener, elle passe. Cette différence, c'est exactement ce que nmap détecte."
            ),
            h("Ouvrir un listener"),
            code(`nc -lvnp 4444`),
            list(
              "-l : mode écoute (listen), netcat attend une connexion.",
              "-v : verbeux, affiche ce qui se passe.",
              "-n : pas de résolution DNS, on reste sur des chiffres.",
              "-p 4444 : le port à écouter."
            ),
            p(
              "Quand un client se connecte, tout ce qu'il envoie s'affiche dans ce terminal, et tout ce que tu tapes est envoyé au client. C'est un chat rudimentaire, ou un serveur de test."
            ),
            h("Envoyer un fichier"),
            p("netcat peut aussi transférer des fichiers. Côté réception (le client) :"),
            code(`nc 127.0.0.1 4444 > message_recu.txt`),
            p("Côté émission (le listener), on lui fait lire un fichier au lieu du clavier :"),
            code(`nc -lvnp 4444 < message.txt`),
            p(
              "Quand la connexion s'établit, le contenu de message.txt part dans le flux et se retrouve dans message_recu.txt. Simple et brut, sans aucune sécurité."
            ),
            h("Le bon réflexe avec netcat"),
            list(
              "Tester un port : nc -zv 127.0.0.1 22 (v = verbeux, z = scan sans envoyer de données).",
              "Bavarder entre deux terminaux : un listener + un connecteur.",
              "Servir un message : nc -lvnp <port> < fichier.",
              "Récupérer une réponse : nc <adresse> <port> > sortie.txt."
            ),
            h("Le danger du reverse shell"),
            p(
              "netcat peut aussi exécuter un shell via l'option -e : un attaquant qui obtient l'exécution de commandes sur ta machine peut ouvrir un shell vers SA machine (reverse shell), prenant le contrôle total. C'est pour cela qu'un nc en écoute sur une machine doit te mettre la puce à l'oreille."
            ),
            callout(
              "Si tu trouves une écoute netcat inattendue sur un poste, c'est un signal d'alarme : quelqu'un peut attendre qu'on s'y connecte pour récupérer des fichiers ou un shell. Ne la ferme pas sans alerter.",
              "danger"
            ),
            h("En résumé"),
            list(
              "nc <adresse> <port> se connecte ; nc -lvnp <port> écoute.",
              "Options clés : -l (listen), -v (verbeux), -n (pas de DNS), -p (port).",
              "netcat transfère des fichiers et dialogue sans aucune sécurité.",
              "Un listener netcat peut servir de reverse shell : reste vigilant."
            )
          ],
        },
        {
          id: "net-lecon-23",
          title: "tcpdump : écouter le trafic",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Voir les paquets passer"),
            p(
              "Jusqu'ici, tu as vu les ports, les services, les noms. Mais il existe une observation bien plus fine : regarder les paquets eux-mêmes, un par un, alors qu'ils circulent sur ton interface. C'est le rôle de tcpdump."
            ),
            p(
              "tcpdump est le renifleur (sniffer) de référence en ligne de commande : il capture les paquets qui transitent et les affiche. C'est une caméra posée sur le câble."
            ),
            h("Le cadre légal, encore et toujours"),
            callout(
              "Capturer le trafic d'un réseau est extrêmement intrusif : cela expose les données privées de tout le monde. Dans ce cours, on ne capture QUE le trafic de la boucle locale (l'interface lo), c'est-à-dire ta machine vers elle-même.",
              "danger"
            ),
            h("Capturer sur la boucle locale"),
            p("L'interface lo (loopback) porte tout le trafic entre processus de ta machine : parfait pour apprendre. L'option -A affiche le contenu en ASCII, donc lisible."),
            code(`sudo tcpdump -i lo -A port 8080`),
            p(
              "Le préfixe sudo est nécessaire : lire les paquets requiert des privilèges. La commande reste bloquée en écoute ; interromps-la avec Ctrl+C. N'affiche rien tant qu'aucun trafic ne passe sur le port 8080."
            ),
            h("Sauvegarder la capture"),
            p("Capturer et lire en direct n'est pas pratique pour analyser. On écrit les paquets dans un fichier avec -w, puis on le relit avec -r :"),
            code(`sudo tcpdump -i lo -w capture.pcap\nsudo tcpdump -r capture.pcap`),
            p(
              "Le format .pcap est le standard de capture : Wireshark, tshark et tcpdump le lisent tous."
            ),
            h("Les filtres"),
            p("Sans filtre, tcpdump affiche tout, c'est illisible. Les filtres ciblent : port, host, protocole, source, destination. On peut les combiner avec and, or, not."),
            code(`sudo tcpdump -i lo port 53\nsudo tcpdump -i lo host 127.0.0.1\nsudo tcpdump -i lo port 80 and host 127.0.0.1\nsudo tcpdump -i lo tcp and port 443`),
            h("Lire une ligne de capture"),
            code(`13:42:01.123456 IP 127.0.0.1.45678 > 127.0.0.1.8080: Flags [S], seq 1000, win 65495, length 0`),
            list(
              "13:42:01.123456 : l'heure de la capture.",
              "IP : le protocole de la couche 3.",
              "127.0.0.1.45678 > 127.0.0.1.8080 : adresse et port source vers adresse et port destination.",
              "Flags [S] : les drapeaux TCP, ici SYN (début de connexion).",
              "length 0 : aucune donnée utile, c'est le handshake."
            ),
            h("Pourquoi le trafic en clair est lisible"),
            p(
              "HTTP, DNS, FTP, Telnet et bien d'autres envoient leurs données sans chiffrement : ce que tu vois avec -A, c'est exactement ce que voit un attaquant posé sur le même réseau. Un mot de passe envoyé en HTTP est une lettre ouverte.\nHTTPS, lui, chiffre le contenu : tcpdump montre la connexion, mais pas les données (c'est du charabia illisible)."
            ),
            h("En résumé"),
            list(
              "tcpdump capture les paquets qui passent sur une interface.",
              "sudo tcpdump -i lo -A : capture en clair sur la boucle locale.",
              "-w enregistre dans un fichier .pcap, -r relit ce fichier.",
              "Les filtres port/host/protocole ciblent le trafic ; le trafic non chiffré est lisible."
            )
          ],
        },
        {
          id: "net-lecon-24",
          title: "Wireshark et tshark",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("La version graphique du renifleur"),
            p(
              "tcpdump est puissant mais son affichage en texte est difficile à déchiffrer. Wireshark est la même chose en version graphique : il capture le trafic et te montre chaque paquet découpé en champs, avec une interface visuelle."
            ),
            p(
              "C'est l'outil incontournable de l'analyse réseau : quand un problème est invisible, on ouvre Wireshark et on regarde ce que les paquets racontent."
            ),
            h("Wireshark en trois volets"),
            list(
              "La liste des paquets : chaque ligne est un paquet, avec heure, source, destination et protocole.",
              "Le détail du paquet sélectionné : les couches empilées (Ethernet, IP, TCP, HTTP), chaque champ étiqueté.",
              "L'octet brut : le contenu du paquet en hexadécimal et en texte, où l'on retrouve les données en clair."
            ),
            p(
              "C'est exactement l'encapsulation du module 1, visualisée : on ouvre les enveloppes les unes après les autres."
            ),
            h("Le suivi de flux"),
            p(
              "Un seul échange (par exemple une requête HTTP) s'étale sur des dizaines de paquets, mélangés aux autres. Wireshark propose le suivi de flux (Follow Stream) : il reconstitue la conversation complète dans l'ordre, comme un échange de lettres remis dans une suite logique. Idéal pour retrouver un mot de passe ou un message transmis en clair."
            ),
            h("Les filtres d'affichage"),
            p(
              "Au lieu de noyer l'écran, Wireshark filtre l'affichage avec un mini-langage. Contrairement aux filtres de tcpdump (capture), ceux-ci ne touchent pas aux paquets déjà capturés : ils ne font que masquer."
            ),
            code(`http\nip.addr == 127.0.0.1\ntcp.port == 8080\nhttp.request.method == \"GET\"\ndns.qry.name contains \"example\"`),
            p(
              "Ces expressions fonctionnent telles quelles dans tshark avec l'option -Y."
            ),
            h("tshark : Wireshark en ligne de commande"),
            p(
              "tshark est le moteur de Wireshark sans l'interface graphique : utile sur un serveur sans écran, ou pour traiter des captures en série. Il lit les fichiers .pcap et applique les mêmes filtres."
            ),
            code(`tshark -r capture.pcap\n\ntshark -r capture.pcap -Y http\n\ntshark -r capture.pcap -Y http.request.method == \"GET\" -T fields -e http.request.uri`),
            p(
              "L'option -T fields -e http.request.uri extrait uniquement la colonne demandée : le parfait petit script de tri sur des centaines de paquets."
            ),
            h("Le trio tcpdump / tshark / Wireshark"),
            list(
              "tcpdump : capture et filtrage en ligne de commande, léger, toujours installé.",
              "tshark : analyse avancée en ligne de commande, mêmes filtres que Wireshark.",
              "Wireshark : analyse graphique interactive, idéale pour explorer et suivre les flux."
            ),
            callout(
              "Une méthode classique : on capture avec tcpdump dans un fichier .pcap, puis on ouvre ce fichier dans Wireshark pour l'analyser tranquillement. Aucune capture en direct n'est nécessaire au moment de l'analyse.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Wireshark visualise les paquets par couches : liste, détail, octets bruts.",
              "Le suivi de flux reconstitue une conversation complète.",
              "Les filtres d'affichage (http, ip.addr, tcp.port) masquent le reste.",
              "tshark fait le même travail en ligne de commande, sans interface graphique."
            )
          ],
        },
        {
          id: "net-lecon-25",
          title: "Exercice — capturer le flag",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Objectif"),
            p(
              "Le but du jeu : lancer un petit serveur sur ta machine, capturer son trafic avec tcpdump, et retrouver le message secret (le flag) dans les paquets. C'est un mini-CTF de réseau, 100 % sur la boucle locale."
            ),
            callout(
              "Tout se passe sur l'interface lo (127.0.0.1) : tu ne captes QUE ta propre machine. Capturer le trafic d'un autre réseau sans accord est illégal, même pour un TP.",
              "danger"
            ),
            h("Étape 1 — Préparer le message secret"),
            code(`printf 'FLAG{tcpdump_maitrise}' > message.txt\ncat message.txt`),
            p(
              "Vérifie que le fichier contient bien le flag. Tu peux changer le mot du flag, mais garde la forme FLAG{...} pour t'entraîner à le repérer."
            ),
            h("Étape 2 — Lancer un petit serveur"),
            p(
              "Terminal 1 : ouvre un serveur éphémère avec netcat. Il lit le fichier et l'envoie à quiconque se connecte :"
            ),
            code(`nc -lvnp 8080 < message.txt`),
            p(
              "Attention : cette commande reste bloquée en attente de connexion. Laisse ce terminal ouvert."
            ),
            h("Étape 3 — Mettre la caméra en marche"),
            p(
              "Terminal 2 : démarre la capture sur la boucle locale, port 8080, avec l'affichage en clair :"
            ),
            code(`sudo tcpdump -i lo -A port 8080`),
            p(
              "La commande reste en écoute. Laisse ce terminal ouvert lui aussi."
            ),
            h("Étape 4 — Déclencher le trafic"),
            p(
              "Terminal 3 : interroge le serveur avec curl, comme le ferait un navigateur :"
            ),
            code(`curl http://127.0.0.1:8080/`),
            p(
              "Tu devrais voir le flag s'afficher dans la réponse de curl. Mais la vraie question est : que s'est-il passé dans le terminal de tcpdump ?"
            ),
            h("Étape 5 — Retrouver le flag dans la capture"),
            p(
              "Retourne dans le terminal 2. La capture montre le handshake TCP puis les données HTTP en clair, avec le flag lisible en ASCII :"
            ),
            code(`13:42:01.123456 IP 127.0.0.1.45678 > 127.0.0.1.8080: Flags [S], seq 1000, win 65495, length 0\n13:42:01.123890 IP 127.0.0.1.8080 > 127.0.0.1.45678: Flags [S.], seq 2000, ack 1001, length 0\n13:42:01.124201 IP 127.0.0.1.45678 > 127.0.0.1.8080: Flags [P.], ack 2001, length 73\nGET / HTTP/1.1\nHost: 127.0.0.1:8080\nUser-Agent: curl/8.5.0\nAccept: */*\n\n13:42:01.124510 IP 127.0.0.1.8080 > 127.0.0.1.45678: Flags [P.], seq 1:21, ack 74, length 20\nFLAG{tcpdump_maitrise}`),
            p(
              "Le flag apparaît en clair dans le corps de la réponse HTTP. Interromps la capture avec Ctrl+C."
            ),
            h("Étape 6 — Sauvegarder pour la postérité"),
            p(
              "Refais la capture en la sauvant dans un fichier, puis relis-la (fais Ctrl+C après le curl) :"
            ),
            code(`sudo tcpdump -i lo -A -w capture.pcap port 8080\n\ntcpdump -r capture.pcap`),
            h("Résultat attendu"),
            list(
              "Le flag est affiché par curl et visible dans la sortie de tcpdump.",
              "Tu reconnais le handshake SYN / SYN-ACK / ACK dans les premières lignes.",
              "Les données HTTP (requête GET, réponse) apparaissent en clair.",
              "Le fichier capture.pcap se relit correctement avec tcpdump -r."
            ),
            callout(
              "Tu viens de faire exactement ce que fait un attaquant sur un réseau sans protection : capter le trafic et lire les données en clair. C'est pour cela que le HTTP est remplacé par le HTTPS : un message chiffré est inexploitable pour celui qui le capture.",
              "tip"
            )
          ],
        },
        {
          id: "net-lecon-26",
          title: "Quiz — Les outils",
          type: "quiz",
          duration: "7 min",
          blocks: [
            p(
              "Dernière vérification avant la synthèse : nmap, netcat, tcpdump, Wireshark. 80 % minimum pour valider."
            ),
            callout(
              "Leçons 21 à 25. Pense au cadre légal : chaque outil a sa zone interdite hors de ta machine."
            ),
          ],
          quiz: [
            {
              question: "Quelle commande liste les ports en écoute avec leur processus ?",
              options: ["ss -tulpn", "ip a", "dig", "traceroute"],
              answer: 0,
              explanation:
                "ss -tulpn montre les sockets TCP (-t) et UDP (-u) en écoute (-l), avec processus (-p) et numéros (-n). ip a montre les adresses, pas les ports.",
            },
            {
              question: "L'état 'filtered' d'un port dans nmap signifie...",
              options: [
                "le port est ouvert et accueille des connexions",
                "le port est fermé",
                "le port est probablement filtré par un pare-feu",
                "le port n'existe pas",
              ],
              answer: 2,
              explanation:
                "filtered : aucune réponse au probe, en général un pare-feu qui bloque ou ignore. open = service qui écoute, closed = port présent mais rien derrière.",
            },
            {
              question: "Pour ouvrir un listener netcat sur le port 4444 :",
              options: ["nc 127.0.0.1 4444", "nc -lvnp 4444", "nc -e 4444", "nc -r 4444"],
              answer: 1,
              explanation:
                "-l lance l'écoute, -v le mode verbeux, -n pas de DNS, -p précise le port : nc -lvnp 4444. nc 127.0.0.1 4444, lui, se connecte.",
            },
            {
              question: "Pour capturer le trafic loopback en texte clair :",
              options: ["ss -i lo -A", "nmap -i lo", "sudo tcpdump -i lo -A", "dig -i lo"],
              answer: 2,
              explanation:
                "sudo tcpdump -i lo -A capture sur l'interface lo et affiche le contenu en ASCII. Les autres options n'existent pas pour ces outils.",
            },
            {
              question: "Le trafic capturé par tcpdump apparaît en clair lorsque...",
              options: [
                "le service est chiffré (HTTPS)",
                "le service envoie ses données sans chiffrement (HTTP, DNS, FTP...)",
                "le service utilise UDP",
                "le service utilise le port 443",
              ],
              answer: 1,
              explanation:
                "HTTP, DNS, FTP et Telnet transportent leurs données sans chiffrement : lisibles par n'importe qui capture. HTTPS chiffre tout : tcpdump ne voit que la connexion.",
            },
          ],
        },
      ],
    },
    {
      id: "net-module-5",
      title: "Synthèse",
      lessons: [
        {
          id: "net-lecon-27",
          title: "Récapitulatif visuel",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("La carte du réseau en une page"),
            p(
              "On rassemble tout : chaque couche, son protocole phare, et l'outil qui permet de l'observer. Voici la table de synthèse du niveau 2 :"
            ),
            list(
              "Couche 7 Application → HTTP, DNS → dig, host, curl, openssl s_client",
              "Couche 4 Transport → TCP, UDP → ss, nc, nmap",
              "Couche 3 Réseau → IP, ICMP, ARP → ip a, ip route, ping, mtr, traceroute, arp",
              "Couche 2 Liaison → MAC, Ethernet → arp, tcpdump",
              "Couche 1 Physique → câbles, ondes → tcpdump (observation du signal brut)"
            ),
            p(
              "Cette table est ta feuille de route : pour comprendre un problème réseau, on commence par se demander à quelle couche il se situe."
            ),
            h("Le voyage d'un paquet, raconté"),
            p(
              "Prenons une visite complète de https://example.com et suivons le paquet du bout des doigts :"
            ),
            list(
              "1. Tu tapes https://example.com. Le navigateur ne connaît pas l'adresse : il interroge le DNS (dig permet de le voir), qui répond 93.184.215.14.",
              "2. Le navigateur ouvre une connexion TCP vers le port 443 : SYN, SYN-ACK, ACK (nmap et ss permettent de vérifier qu'il écoute).",
              "3. Le chiffrement TLS s'établit (openssl s_client montre le certificat).",
              "4. La requête HTTP GET part, encapsulée : HTTP dans TCP, TCP dans IP, IP dans la trame Ethernet (tcpdump ou Wireshark la montrent).",
              "5. Ta machine consulte ARP pour trouver la MAC de la passerelle et envoie la trame au routeur.",
              "6. Le routeur lit l'adresse IP de destination et achemine le paquet de nœud en nœud (traceroute et mtr dessinent le chemin).",
              "7. Le serveur répond ; la réponse refait le chemin en sens inverse, désencapsulée couche par couche.",
              "8. Ton navigateur affiche la page. Mission accomplie, en moins d'une seconde, des dizaines de fois par minute."
            ),
            h("La boîte à outils du niveau 2"),
            code(`ip a                 interfaces et adresses IP\nip route             table de routage\nping -c 4            test de présence (ICMP)\nmtr -r -c 5          chemin et qualité de route\nss -tulpn            ports en écoute\nnc -lvnp <port>      listener / connexion\nnmap -sV 127.0.0.1   scan de ports local\ndig / host           résolution DNS\ncurl -I              en-têtes HTTP\nopenssl s_client     certificat TLS\nsudo tcpdump -i lo   capture de trafic`),
            h("Les idées qui traversent tout le niveau"),
            list(
              "Tout voyage est un emboîtement d'enveloppes (encapsulation), retirées à l'arrivée (désencapsulation).",
              "Une machine se repère par l'IP (logique) et la MAC (physique) ; ARP fait le pont.",
              "Un service se trouve par un port ; un port ouvert est un programme qui écoute.",
              "TCP garantit, UDP va vite : on choisit selon ce qu'on veut perdre.",
              "Le DNS traduit les noms, le DHCP attribue les adresses, HTTP parle avec le web.",
              "Toute la démarche offensive commence par observer : ports, services, trafic."
            ),
            callout(
              "Bravo, tu as parcouru tout le niveau. Relis cette leçon quand un outil te semble flou : c'est la carte mentale du réseau qui se construit ici.",
              "tip"
            )
          ],
        },
        {
          id: "net-lecon-28",
          title: "Quiz final du niveau 2",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Le grand test de synthèse : 6 questions mélangeant tout le niveau. 80 % pour valider le niveau 2."
            ),
            callout(
              "Cette fois, aucune indication de leçon. Si tu hésites, reviens sur la leçon 27 (récapitulatif) avant de relire les détails."
            ),
          ],
          quiz: [
            {
              question: "Dans le modèle OSI, la couche 3 (Réseau) s'occupe de...",
              options: [
                "l'adressage IP et du routage",
                "l'adressage MAC",
                "la présentation des données",
                "la poignée de main TCP",
              ],
              answer: 0,
              explanation:
                "La couche 3 gère l'adresse IP et le choix du chemin (routage). La MAC est à la couche 2, la poignée de main TCP à la couche 4, la présentation à la couche 6.",
            },
            {
              question: "Le triple handshake SYN / SYN-ACK / ACK sert à...",
              options: [
                "résoudre un nom de domaine",
                "établir une connexion TCP fiable",
                "obtenir une adresse IP via DHCP",
                "nettoyer le cache DNS",
              ],
              answer: 1,
              explanation:
                "Le triple handshake est le début de toute connexion TCP : les deux parties confirment être prêtes. Résoudre un nom relève du DNS, obtenir une adresse du DHCP.",
            },
            {
              question: "L'adresse 192.168.1.0/24 est...",
              options: [
                "une adresse publique routable sur Internet",
                "une adresse privée (plage 192.168.0.0/16)",
                "une adresse de la boucle locale",
                "une adresse MAC",
              ],
              answer: 1,
              explanation:
                "192.168.1.0/24 tombe dans la plage privée 192.168.0.0/16, réservée aux réseaux internes (maison, bureau). Elle ne circule pas sur Internet sans NAT.",
            },
            {
              question: "Un enregistrement CNAME permet de...",
              options: [
                "faire pointer un alias vers un autre nom",
                "stocker un message texte",
                "désigner le serveur de messagerie",
                "préciser la durée de vie du domaine",
              ],
              answer: 0,
              explanation:
                "CNAME (Canonical Name) fait pointer un nom vers un autre nom, qui possède son propre enregistrement A. Le texte libre est TXT, la messagerie est MX.",
            },
            {
              question: "Quelle commande montre le chemin que traversent les paquets vers une destination ?",
              options: ["ss", "hostname", "traceroute", "arp"],
              answer: 2,
              explanation:
                "traceroute (et mtr) affiche chaque saut jusqu'à la destination, en jouant sur le TTL. ss liste les ports, hostname donne le nom de la machine, arp montre la table du voisinage.",
            },
            {
              question: "Un pentester doit scanner...",
              options: [
                "tous les réseaux de son fournisseur d'accès",
                "uniquement les machines pour lesquelles il a l'autorisation",
                "n'importe quelle adresse publique",
                "uniquement les adresses commençant par 10.",
              ],
              answer: 1,
              explanation:
                "Scanner sans autorisation est une infraction pénale (article 323-1 du code pénal). L'autorisation est la ligne rouge de toute la profession : on ne teste que ses machines ou celles couvertes par un contrat.",
            },
          ],
        },
        {
          id: "net-lecon-29",
          title: "Cap sur Python et Bash",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("Pourquoi automatiser maintenant ?"),
            p(
              "Tu sais maintenant faire, à la main, tout ce qu'un technicien réseau fait : explorer, scanner, analyser, capturer. Mais fais-le 200 fois, sur 20 machines, avec les résultats à classer... et la main ne suffit plus. C'est là qu'interviennent les scripts."
            ),
            p(
              "L'automatisation, c'est le réseau en série : au lieu de taper nc à la main pour tester 10 000 ports, on écrit 5 lignes qui le font pour nous et sortent un rapport. Le niveau 3 t'apprendra exactement cela avec deux langages."
            ),
            h("Bash : le ciment de Linux"),
            list(
              "Variables, conditions et boucles pour enchaîner tes commandes.",
              "Les commandes de ce niveau (ping, ss, dig, curl...) deviennent des briques de scripts.",
              "Un script bash, c'est une suite d'instructions que tu aurais tapées toi-même, répétables à volonté."
            ),
            h("Python : le langage des pentesters"),
            list(
              "Lecture et écriture de fichiers, traitement de données en masse.",
              "Modules réseau (socket, requests, scapy) pour construire ses propres outils.",
              "L'automatisation de l'énumération : scanner, parser les résultats, générer un rapport."
            ),
            h("Le pont entre les deux niveaux"),
            p(
              "Tous les concepts de ce niveau seront réutilisés en script : la résolution DNS devient un appel de fonction, le scan de ports une boucle, la capture un fichier à analyser. Apprendre le réseau maintenant, c'est préparer le terrain pour écrire des outils qui l'exploitent."
            ),
            callout(
              "Petit avant-goût : le prochain niveau commence par des scripts bash qui font des requêtes réseau, puis Python qui parle à un serveur. Tu n'auras pas à réapprendre le réseau : tu le piloteras.",
              "info"
            ),
            h("Ce qu'il faut retenir de ce niveau"),
            list(
              "Un réseau, c'est des couches, des adresses et des protocoles qui travaillent ensemble.",
              "Chaque outil (ip, ping, ss, nmap, nc, tcpdump, dig, curl) regarde une couche précise.",
              "Tout s'observe sur sa propre machine en toute légalité.",
              "Le niveau 3 transforme ces gestes manuels en automatisation."
            )
          ],
        },
      ],
    },
  ],
};
