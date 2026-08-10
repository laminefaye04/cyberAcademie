import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const COMPUTER_FUNDAMENTALS_COURSE: Course = {
  id: "computer-fundamentals",
  levelId: 0,
  title: "Computer Fundamentals",
  description:
    "Comprendre le fonctionnement d'un ordinateur, de son système d'exploitation, de ses fichiers et de ses permissions : la base de tout.",
  xp: 500,
  modules: [
    {
      id: "cf-module-1",
      title: "Qu'est-ce qu'un ordinateur ?",
      lessons: [
        {
          id: "cf-lecon-01",
          title: "Les 4 briques d'un ordinateur",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Bienvenue dans le niveau 0. Avant de parler de sécurité, il faut comprendre l'outil que nous allons protéger : l'ordinateur. Aucun prérequis n'est nécessaire, nous partons de zéro."
            ),
            p(
              "Un ordinateur peut sembler compliqué, mais il se résume à quatre grandes briques qui travaillent ensemble. Pour les retenir, nous allons utiliser l'analogie d'une cuisine."
            ),
            h("La cuisine, une bonne analogie"),
            p(
              "Imagine un chef qui doit préparer un repas. Il a besoin d'ingrédients, d'un plan de travail, d'un frigo pour les conserver et d'ustensiles pour cuisiner. Chaque élément a un rôle précis."
            ),
            list(
              "Le cuisinier = le processeur (CPU) : c'est lui qui fait le travail.",
              "Le plan de travail = la mémoire (RAM) : c'est là que le travail en cours se déroule.",
              "Le frigo = le stockage (le disque) : c'est là que les choses se conservent dans la durée.",
              "Les ustensiles = les périphériques : ils permettent de manipuler et d'échanger."
            ),
            h("La première brique : le processeur (CPU)"),
            p(
              "CPU signifie Central Processing Unit, l'unité centrale de traitement. On l'appelle aussi simplement le processeur. C'est le cerveau de la machine : toutes les opérations de calcul passent par lui."
            ),
            p(
              "C'est le cuisinier qui tranche, mélange et assaisonne. Sans lui, rien ne se passe. Nous verrons en détail comment il fonctionne dans la prochaine leçon."
            ),
            h("La deuxième brique : la mémoire (RAM)"),
            p(
              "RAM signifie Random Access Memory, la mémoire à accès aléatoire. C'est le plan de travail du chef : un espace très rapide où l'on pose ce qui est en cours d'utilisation."
            ),
            list(
              "Elle est très rapide : les calculs s'y font en un clin d'œil.",
              "Elle est volatile : elle s'efface dès que l'ordinateur s'éteint.",
              "Elle est limitée : un ordinateur n'a que quelques gigaoctets de RAM."
            ),
            h("La troisième brique : le stockage (le disque)"),
            p(
              "Le stockage est le frigo : c'est là que les données sont conservées pour longtemps, même quand l'ordinateur est éteint. On y garde tes photos, tes documents, tes programmes."
            ),
            p(
              "On parle souvent de HDD (Hard Disk Drive, disque à plateaux magnétiques) ou de SSD (Solid State Drive, disque à puces électroniques). Les SSD sont plus rapides que les HDD."
            ),
            h("La quatrième brique : les périphériques"),
            p(
              "Les périphériques sont les ustensiles : clavier, souris, écran, enceintes, webcam. Ils servent à communiquer avec la machine, à lui donner des ordres et à recevoir ses réponses."
            ),
            p(
              "Le clavier et la souris sont des périphériques d'entrée (ils font entrer des informations), l'écran et les enceintes sont des périphériques de sortie (ils font sortir des informations)."
            ),
            callout(
              "Les quatre briques sont interdépendantes : si l'une manque, l'ordinateur est inutilisable. Un processeur sans mémoire ne peut rien calculer, une mémoire sans disque ne garde rien."
            ),
            callout(
              "Tu n'as pas besoin de connaître l'électronique interne pour comprendre un ordinateur. Retiens seulement le rôle de chaque brique.",
              "tip"
            ),
            callout(
              "Ne démonte jamais un ordinateur allumé ni sans comprendre ce que tu fais : certains composants restent chargés même éteints.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-02",
          title: "Le processeur (CPU) en détail",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Nous avons vu que le processeur (CPU, Central Processing Unit) est le cerveau de l'ordinateur. Rentrons maintenant dans le détail pour comprendre comment il travaille."
            ),
            h("Une machine à exécuter des instructions"),
            p(
              "Le CPU ne réfléchit pas comme un humain. Il exécute des instructions, c'est-à-dire des ordres très simples et très précis : additionner deux nombres, lire une valeur en mémoire, comparer deux valeurs."
            ),
            p(
              "Chaque programme, même le plus sophistiqué, n'est qu'une très longue suite de ces petites instructions. La magie vient du fait qu'elles s'enchaînent des milliards de fois par seconde."
            ),
            h("Le cycle : chercher, décoder, exécuter"),
            p(
              "Pour chaque instruction, le processeur suit toujours le même rituel en trois temps. C'est le cycle fetch-decode-execute (chercher, décoder, exécuter)."
            ),
            list(
              "Fetch (chercher) : le CPU va chercher la prochaine instruction en mémoire.",
              "Decode (décoder) : le CPU traduit cette instruction en actions électroniques qu'il sait réaliser.",
              "Execute (exécuter) : le CPU réalise réellement l'action, puis le cycle recommence avec l'instruction suivante."
            ),
            p(
              "C'est comme un cuisinier qui lit sa recette ligne par ligne : il lit une étape (chercher), il la comprend (décoder), il la réalise (exécuter), puis il passe à la suivante."
            ),
            h("La vitesse : les gigahertz (GHz)"),
            p(
              "On mesure la vitesse d'un processeur en gigahertz, noté GHz. Un hertz est un cycle par seconde, et giga signifie milliard : un processeur à 1 GHz effectue donc environ 1 milliard de cycles par seconde."
            ),
            p(
              "Un processeur à 3 GHz peut donc répéter le cycle chercher-décoder-exécuter environ 3 milliards de fois chaque seconde. C'est ce qui rend l'ordinateur si rapide à nos yeux."
            ),
            p(
              "Attention : plus de gigahertz ne veut pas toujours dire plus rapide. La conception du processeur et le nombre de cœurs comptent aussi. C'est comme comparer des cuisiniers : un chef expérimenté et lent peut surpasser un débutant très rapide."
            ),
            h("Les cœurs : plusieurs cuisiniers à la fois"),
            p(
              "Un cœur (core) est une unité de calcul complète. Un processeur avec plusieurs cœurs peut exécuter plusieurs tâches en parallèle, comme plusieurs cuisiniers dans la même cuisine."
            ),
            list(
              "Un processeur 1 cœur fait une seule chose à la fois.",
              "Un processeur 2 cœurs (double cœur) en fait deux en parallèle.",
              "Un processeur 4 cœurs (quadri-cœur) en fait quatre en parallèle."
            ),
            p(
              "C'est pour cela que ton ordinateur peut écouter de la musique, afficher une vidéo et surfer en même temps : les cœurs se partagent le travail."
            ),
            callout(
              "Ne compare jamais deux processeurs uniquement sur leurs gigahertz : le nombre de cœurs, la mémoire cache et la génération comptent tout autant.",
              "tip"
            ),
            callout(
              "Le CPU ne gère pas seul les images. Pour les jeux et la vidéo, une carte graphique (GPU, Graphics Processing Unit) décharge le processeur d'une partie du travail.",
              "info"
            ),
            callout(
              "Un processeur qui travaille dur chauffe : les ventilateurs et radiateurs servent à le refroidir. Un CPU surchauffé ralentit ou s'éteint pour se protéger.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-03",
          title: "La mémoire : RAM et disque",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Beaucoup de débutants confondent la RAM et le disque parce que les deux servent à « stocker » des choses. En réalité, ils ont deux métiers bien différents, comme le plan de travail et le frigo."
            ),
            h("Le plan de travail : la RAM"),
            p(
              "RAM signifie Random Access Memory, la mémoire à accès aléatoire. C'est la mémoire de travail : on y dépose ce qui est utilisé en ce moment même."
            ),
            list(
              "Rapide : l'échange avec le processeur est quasi instantané.",
              "Volatile : tout s'efface quand l'ordinateur s'éteint.",
              "Petite : en général entre 4 et 32 gigaoctets (Go) sur un ordinateur personnel."
            ),
            p(
              "Quand tu écris un texte sans l'enregistrer, il vit dans la RAM. C'est pour cela qu'une coupure de courant efface tes modifications non enregistrées : la RAM a tout perdu."
            ),
            h("Le frigo : le disque"),
            p(
              "Le disque (HDD, Hard Disk Drive, ou SSD, Solid State Drive) est le stockage durable : il conserve tes données même sans électricité, pendant des années."
            ),
            list(
              "Lent comparé à la RAM : un SSD reste des dizaines de fois plus lent qu'elle.",
              "Durable : il ne perd rien à l'extinction.",
              "Grand : de 128 Go à plusieurs téraoctets (To) sur un ordinateur personnel."
            ),
            p(
              "Ton système d'exploitation, tes photos et tes programmes dorment dans le frigo. Quand tu ouvres un programme, il est copié du disque vers la RAM pour être utilisé."
            ),
            h("Vitesse contre capacité"),
            p(
              "Voici le résumé du duel entre les deux mémoires, à retenir comme un mini-tableau."
            ),
            list(
              "RAM : vitesse très élevée, capacité faible, contenu volatile.",
              "Disque : vitesse plus faible, capacité énorme, contenu conservé.",
              "Rôle de la RAM : travailler. Rôle du disque : conserver."
            ),
            h("Quand la RAM est pleine"),
            p(
              "Quand la RAM est saturée, l'ordinateur utilise une partie du disque en complément : c'est ce qu'on appelle le swap. Comme le disque est plus lent, tout ralentit nettement."
            ),
            p(
              "C'est le système d'exploitation (dont nous parlerons au module 2) qui décide quoi garder en RAM et quoi envoyer sur le disque. Un manque de RAM rend une machine lente, même avec un processeur puissant."
            ),
            callout(
              "Éteindre sans enregistrer = perdre ce qui est en RAM. L'ordinateur ne te « perd » pas tes fichiers, il ne peut simplement pas les garder dans une mémoire volatile.",
              "info"
            ),
            callout(
              "« Ma RAM est pleine » ne veut pas dire « mon disque est plein ». Fermer des programmes inutiles libère de la RAM ; vider la corbeille libère du disque.",
              "warning"
            ),
            callout(
              "Si ta machine rame avec beaucoup d'onglets ouverts, ajouter de la RAM est souvent plus efficace que de changer de processeur.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-04",
          title: "Le langage de la machine : le binaire",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Nous savons maintenant que le processeur calcule et que les mémoires gardent des données. Mais de quelle « langue » parle la machine ? Réponse : le binaire."
            ),
            h("Des interrupteurs allumés ou éteints"),
            p(
              "Au cœur d'un ordinateur, tout est électrique. Un circuit est soit sous tension, soit pas. On représente ces deux états par deux chiffres : 1 (tension présente) et 0 (tension absente)."
            ),
            p(
              "C'est comme une série d'interrupteurs : chacun est soit allumé (1), soit éteint (0). Avec assez d'interrupteurs, on peut représenter n'importe quelle information."
            ),
            h("Le bit, la plus petite brique"),
            p(
              "Un bit (contraction de binary digit, chiffre binaire) est la plus petite unité d'information : un 0 ou un 1. Un seul bit ne peut représenter que deux choses : éteint ou allumé, noir ou blanc, oui ou non."
            ),
            h("Regrouper les bits en octets"),
            p(
              "Tout seul, un bit est trop petit. On regroupe donc les bits par paquets de 8 : un paquet de 8 bits s'appelle un octet (byte en anglais)."
            ),
            p(
              "Avec 8 bits, on obtient 2 puissance 8 combinaisons possibles, c'est-à-dire 256 valeurs différentes, de 00000000 à 11111111."
            ),
            list(
              "00000000 = la valeur zéro.",
              "00000001 = la valeur un.",
              "11111111 = la valeur 255.",
              "Au total : 256 valeurs différentes possibles avec un octet."
            ),
            h("Les tailles : Ko, Mo, Go, To"),
            p(
              "Quand on parle de la taille d'un fichier ou d'une mémoire, on compte en octets, avec des préfixes. En pratique, on utilise souvent les puissances de 1024 (2 puissance 10)."
            ),
            list(
              "1 Ko (kilooctet) ≈ 1 000 octets, souvent 1 024 octets.",
              "1 Mo (mégaoctet) ≈ 1 000 Ko.",
              "1 Go (gigaoctet) ≈ 1 000 Mo.",
              "1 To (téraoctet) ≈ 1 000 Go."
            ),
            p(
              "Pour te donner une idée : un court document texte pèse quelques Ko, une photo quelques Mo, une vidéo plusieurs Go."
            ),
            h("Pourquoi le binaire ?"),
            p(
              "Parce que les circuits électroniques sont fiables avec deux états nets (allumé ou éteint). Et surtout, tout peut être représenté avec des nombres : les caractères d'un texte, les couleurs d'une image, les sons."
            ),
            p(
              "Chaque lettre que tu tapes est transformée en un nombre, puis en binaire. Le processeur ne voit que des 0 et des 1 : c'est le seul langage qu'il comprend vraiment."
            ),
            callout(
              "Tu n'auras jamais besoin d'écrire toi-même du binaire. Mais savoir qu'il existe t'aidera à comprendre les permissions (module 4) et les adresses réseau (module 5).",
              "info"
            ),
            callout(
              "Attention aux confusions d'unités : un octet vaut 8 bits, pas 1 bit. Les débits réseau s'affichent souvent en bits par seconde, ce qui explique des chiffres qui semblent étranges.",
              "warning"
            ),
            callout(
              "Pour t'entraîner mentalement : avec 4 bits tu peux compter de 0 à 15, avec 8 bits de 0 à 255. Chaque bit supplémentaire double le nombre de valeurs possibles.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-05",
          title: "Exercice — connaître sa propre machine",
          type: "exercise",
          duration: "20 min",
          blocks: [
            p(
              "Objectif : découvrir la configuration de ta propre machine, en n'utilisant que des commandes qui affichent des informations. Ces commandes ne modifient rien : tu peux les exécuter sans risque."
            ),
            h("Étape 1 : ouvrir un terminal"),
            p(
              "Un terminal est une fenêtre dans laquelle on tape des commandes en texte. Sur beaucoup de systèmes Linux, le raccourci Ctrl+Alt+T ouvre un terminal. Tu y verras une invite de commande qui attend ta saisie."
            ),
            code(`uname -a`),
            p(
              "Résultat attendu : une ligne qui commence par « Linux » et qui contient des détails sur ton système d'exploitation et son noyau."
            ),
            h("Étape 2 : observer le processeur"),
            p(
              "Tape la commande suivante pour afficher les informations sur ton processeur (CPU, Central Processing Unit)."
            ),
            code(`lscpu`),
            p(
              "Résultat attendu : une liste de lignes. Cherche « Architecture » et « CPU(s) » : la première indique le type de la machine, la seconde le nombre de cœurs."
            ),
            h("Étape 3 : observer la mémoire"),
            p(
              "Tape la commande suivante pour voir l'état de ta mémoire (RAM, Random Access Memory). L'option -h signifie human-readable, « lisible par un humain », et affiche les tailles en Go."
            ),
            code(`free -h`),
            p(
              "Résultat attendu : un tableau. Regarde la colonne « total » de la ligne « Mem » : c'est ta quantité totale de RAM en gigaoctets."
            ),
            h("Étape 4 : observer le disque"),
            p(
              "Tape la commande suivante pour voir l'espace disponible sur tes disques."
            ),
            code(`df -h`),
            p(
              "Résultat attendu : une liste de lignes. La colonne « Size » indique la taille de chaque partition, la colonne « Avail » l'espace encore disponible."
            ),
            h("Étape 5 : noter tes résultats"),
            p(
              "Note quelque part les valeurs relevées : nombre de cœurs, quantité de RAM, espace disque. Ces notions reviendront tout au long du parcours."
            ),
            callout(
              "Ces quatre commandes (uname, lscpu, free, df) sont uniquement en lecture : elles ne modifient aucun fichier et ne cassent rien.",
              "info"
            ),
            callout(
              "Chaque machine est différente : si tes valeurs ne ressemblent pas à celles des exemples, c'est parfaitement normal. L'important est de savoir les lire.",
              "warning"
            ),
            callout(
              "Si un mot te semble flou (noyau, partition...), pas de panique : les prochaines leçons et le niveau 1 les expliquent un par un.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-06",
          title: "Quiz — Les fondations",
          type: "quiz",
          duration: "7 min",
          blocks: [
            p(
              "Cinq questions pour vérifier que les bases sont solides. Réfléchis bien avant de répondre : chaque question a une seule bonne réponse."
            ),
            callout(
              "Ne regarde pas la correction avant d'avoir répondu : c'est en se trompant qu'on apprend le mieux.",
              "tip"
            )
          ],
          quiz: [
            {
              question: "Que signifie le sigle CPU ?",
              options: [
                "Central Processing Unit",
                "Central Power Unit",
                "Computer Personal Unit",
                "Central Program Upgrade"
              ],
              answer: 0,
              explanation:
                "CPU signifie Central Processing Unit, l'unité centrale de traitement : c'est le cerveau qui exécute les instructions."
            },
            {
              question:
                "Quelle mémoire perd son contenu dès que l'ordinateur s'éteint ?",
              options: [
                "Le disque dur",
                "La RAM",
                "Le processeur",
                "La carte graphique"
              ],
              answer: 1,
              explanation:
                "La RAM est une mémoire volatile : elle ne garde les données que tant qu'elle est alimentée en électricité. Le disque, lui, conserve tout."
            },
            {
              question: "Combien de bits composent un octet ?",
              options: ["4", "8", "16", "32"],
              answer: 1,
              explanation:
                "Un octet (byte) est composé de 8 bits et peut représenter 2 puissance 8, soit 256 valeurs différentes."
            },
            {
              question: "Quel est le rôle principal du disque (le stockage) ?",
              options: [
                "Exécuter les calculs",
                "Afficher l'image à l'écran",
                "Garder les données même éteint",
                "Se connecter à Internet"
              ],
              answer: 2,
              explanation:
                "Le disque (HDD ou SSD) sert au stockage durable : il conserve fichiers et programmes même quand la machine est éteinte."
            },
            {
              question:
                "En quelle unité mesure-t-on généralement la vitesse d'un processeur ?",
              options: [
                "Gigaoctet (Go)",
                "Gigahertz (GHz)",
                "Bit",
                "Pixel"
              ],
              answer: 1,
              explanation:
                "La vitesse d'un CPU se mesure en gigahertz (GHz), soit des milliards de cycles par seconde. Le gigaoctet mesure une quantité de données, pas une vitesse."
            }
          ]
        }
      ]
    },
    {
      id: "cf-module-2",
      title: "Le système d'exploitation",
      lessons: [
        {
          id: "cf-lecon-07",
          title: "Le rôle du système d'exploitation",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Un ordinateur, c'est du matériel : processeur, mémoire, disque, écran. Mais ce matériel ne sait rien faire tout seul. Il faut un chef d'orchestre : le système d'exploitation."
            ),
            h("L'intermédiaire entre toi et la machine"),
            p(
              "Le système d'exploitation, noté OS (Operating System), est le programme principal de l'ordinateur. Windows, macOS, Linux, Android ou iOS : ce sont tous des systèmes d'exploitation."
            ),
            p(
              "Il fait le lien entre le matériel (la cuisine) et les programmes que tu utilises (les recettes). Sans lui, chaque programme devrait gérer lui-même la mémoire, le disque et les périphériques, ce qui créerait un chaos total."
            ),
            h("L'analogie du chef d'orchestre"),
            p(
              "Imagine un orchestre : les musiciens sont le matériel, chacun joue son instrument. Sans chef, ils joueraient chacun dans son coin, sans rythme commun. Le chef d'orchestre, c'est l'OS : il coordonne tout."
            ),
            list(
              "Gérer la mémoire : il distribue la RAM aux programmes qui en ont besoin.",
              "Gérer les fichiers : il organise et range les données sur le disque.",
              "Gérer les programmes : il les lance, les suspend et les arrête.",
              "Gérer les périphériques : il dialogue avec le clavier, la souris, l'écran.",
              "Gérer les utilisateurs : il sait qui tu es et ce que tu as le droit de faire."
            ),
            h("Le multitâche : faire plusieurs choses à la fois"),
            p(
              "Quand tu écoutes de la musique et que tu surfs en même temps, c'est l'OS qui partage le temps du processeur entre les deux programmes. Il alterne très vite, si vite que tu as l'impression que tout est simultané."
            ),
            p(
              "C'est comme un chef qui surveille plusieurs plats à la fois : il passe d'un feu à l'autre très rapidement, et aucun plat ne brûle."
            ),
            h("Sans OS, que se passerait-il ?"),
            p(
              "Chaque programme devrait réinventer la gestion du matériel. Deux programmes se battraient pour le même clavier, le même écran, la même mémoire. Ce serait l'anarchie, et aucune application ne pourrait tourner en même temps qu'une autre."
            ),
            p(
              "L'OS est donc la fondation sur laquelle tout le reste repose. Le comprendre, c'est déjà faire un énorme pas en cybersécurité."
            ),
            callout(
              "Tu parles déjà à un OS chaque jour sans le voir : chaque clic, chaque fenêtre, chaque fichier passe par lui. L'OS est toujours en arrière-plan.",
              "info"
            ),
            callout(
              "En sécurité, l'OS est une cible privilégiée : les attaquants cherchent à l'exploiter. C'est pour cela qu'il faut installer ses mises à jour régulièrement.",
              "warning"
            ),
            callout(
              "Connaître ton OS (sa version, son type) est le tout premier réflexe d'un futur analyste : note-le quelque part.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-08",
          title: "Le noyau et l'espace utilisateur",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Le système d'exploitation n'est pas un bloc sans relief : il a un cœur très privilégié, le noyau, et une périphérie où vivent les programmes ordinaires. Cette séparation est capitale en sécurité."
            ),
            h("Le noyau : le cœur de l'OS"),
            p(
              "Le noyau (kernel en anglais) est la partie du système d'exploitation qui parle directement au matériel. Il gère le processeur, la mémoire, les disques et les périphériques."
            ),
            p(
              "Le noyau tourne dans ce qu'on appelle l'espace noyau (kernel space), avec des privilèges maximaux : il peut accéder à toutes les ressources de la machine sans aucune restriction."
            ),
            h("L'espace utilisateur : le monde des programmes"),
            p(
              "Les programmes que tu utilises (navigateur, éditeur de texte, jeu) tournent dans l'espace utilisateur (user space), avec des droits limités. Ils ne peuvent pas toucher librement au matériel."
            ),
            list(
              "Espace noyau : le noyau, tout est permis, rien ne le filtre.",
              "Espace utilisateur : tes programmes, droits limités, actions surveillées."
            ),
            h("Les demandes passent par le noyau"),
            p(
              "Quand un programme de l'espace utilisateur veut lire un fichier, écrire sur le disque ou utiliser le réseau, il le demande au noyau via ce qu'on appelle un appel système (system call)."
            ),
            p(
              "Le noyau vérifie alors si le programme a bien le droit de faire cette action, puis l'exécute pour lui. Le programme ne manipule jamais le matériel directement."
            ),
            h("Pourquoi c'est important en sécurité"),
            p(
              "Si un programme malveillant est bloqué en espace utilisateur, il ne peut pas casser l'ensemble de la machine : il est comme un prisonnier dans une cellule verrouillée."
            ),
            p(
              "C'est pour cela que beaucoup d'attaques tentent « d'élever leurs privilèges » : réussir à passer de l'espace utilisateur vers l'espace noyau pour obtenir tous les droits. C'est une course permanente entre attaquants et concepteurs."
            ),
            callout(
              "Retiens cette image : l'espace utilisateur est un bac à sable. Les programmes y jouent avec des règles, et le noyau est le surveillant qui vérifie chaque sortie.",
              "tip"
            ),
            callout(
              "Ne supprime jamais au hasard des fichiers du système, surtout dans les dossiers sensibles : tu pourrais casser le fonctionnement de toute la machine.",
              "warning"
            ),
            callout(
              "Sur une vraie machine, ne lance jamais une commande dont tu ne comprends pas l'effet, en particulier avec des droits d'administrateur (root) : une erreur peut toucher le noyau et le système entier.",
              "danger"
            )
          ]
        },
        {
          id: "cf-lecon-09",
          title: "Les programmes et les processus",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "On dit souvent « lancer un programme ». Mais techniquement, un programme sur le disque et un programme en cours d'exécution sont deux choses différentes. On les appelle programme et processus."
            ),
            h("La recette et la cuisine"),
            p(
              "Un programme est une recette : une suite d'instructions stockée dans un fichier, qui dort sur le disque. Tant qu'elle n'est pas ouverte, il ne se passe rien."
            ),
            p(
              "Un processus, c'est la cuisine en train de se faire : la recette en cours d'exécution, avec ses ingrédients dans la RAM et le cuisinier (le processeur) qui la suit étape par étape."
            ),
            p(
              "Quand tu ouvres un programme, le système d'exploitation crée un processus : il lui réserve de la mémoire, il le planifie sur le processeur, et il suit son état."
            ),
            h("Le processus a un numéro : le PID"),
            p(
              "Chaque processus reçoit un identifiant unique, le PID (Process Identifier). C'est sa carte d'identité sur la machine : personne d'autre ne porte le même numéro."
            ),
            p(
              "Ouvre deux fois ton navigateur : tu obtiendras deux processus, avec deux PID différents, même s'ils viennent du même programme."
            ),
            h("Le cycle de vie d'un processus"),
            list(
              "Lancé : l'utilisateur ou un autre programme le démarre.",
              "Actif : il occupe le processeur et la mémoire, parfois en alternance avec d'autres.",
              "En attente : il dort en attendant un événement (un clic, une réponse réseau).",
              "Terminé : son travail fini, le processus libère sa mémoire et disparaît."
            ),
            p(
              "Le multitâche fonctionne grâce à ces allers-retours : l'OS suspend un processus, donne le processeur à un autre, puis revient. Tout va si vite que l'ensemble paraît fluide."
            ),
            h("Pourquoi c'est important en sécurité"),
            p(
              "Un programme malveillant est aussi un processus. Savoir lister et identifier les processus permet de repérer ce qui tourne anormalement sur une machine."
            ),
            callout(
              "Au niveau 1, tu apprendras à observer les processus avec des commandes comme ps ou top. Pour l'instant, retiens la différence : programme = recette, processus = cuisine.",
              "info"
            ),
            callout(
              "Ne tue jamais les processus des autres sans comprendre ce qu'ils font : tu pourrais arrêter un service dont dépend toute la machine.",
              "warning"
            ),
            callout(
              "Le PID deviendra ton meilleur allié : en cas de doute sur un système, la première question est « quels processus tournent, et qui les a lancés ? ».",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-10",
          title: "Le démarrage d'un ordinateur",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Entre le moment où tu appuies sur le bouton et l'apparition de ton bureau, il se passe une suite d'étapes bien ordonnée. C'est comme la cérémonie d'ouverture d'un bâtiment : chaque étape prépare la suivante."
            ),
            h("Le tout premier acteur : BIOS ou UEFI"),
            p(
              "BIOS signifie Basic Input Output System, le système élémentaire d'entrée-sortie. Son successeur moderne, l'UEFI (Unified Extensible Firmware Interface), a la même fonction principale."
            ),
            p(
              "Le BIOS/UEFI est un petit programme stocké sur une puce de la carte mère. C'est le concierge qui ouvre la porte et vérifie que tout est en ordre avant d'ouvrir le bâtiment."
            ),
            h("Les étapes du démarrage"),
            list(
              "1. Tu appuies sur le bouton : l'électricité arrive à tous les composants.",
              "2. Le BIOS/UEFI fait le POST (Power-On Self Test) : il vérifie que la mémoire et les composants essentiels répondent.",
              "3. Le BIOS/UEFI cherche un chargeur d'amorçage (bootloader) sur le disque.",
              "4. Le bootloader charge le noyau du système d'exploitation en mémoire.",
              "5. Le noyau prend le contrôle : il détecte le matériel, monte les disques et lance les services de base.",
              "6. Un écran de connexion (login) apparaît : tu t'identifies avec ton nom d'utilisateur et ton mot de passe.",
              "7. Ton bureau (interface graphique) se charge : l'ordinateur est prêt."
            ),
            h("Le bootloader, passeur essentiel"),
            p(
              "Le bootloader (chargeur d'amorçage) est un petit programme qui fait le lien entre le BIOS/UEFI et le système : il sait où se trouve le noyau et le met en mémoire. Sans lui, le système ne démarre jamais."
            ),
            h("Pourquoi c'est important en sécurité"),
            p(
              "Si un attaquant pouvait modifier le bootloader, il pourrait détourner tout le démarrage et installer sa porte dérobée avant même que le système ne se lance."
            ),
            p(
              "C'est pourquoi les machines récentes utilisent le Secure Boot : une fonction de l'UEFI qui refuse de charger un bootloader non signé par un fabricant de confiance."
            ),
            callout(
              "Retiens les trois grandes étapes : BIOS/UEFI → bootloader → noyau. Le reste (services, bureau) en découle.",
              "tip"
            ),
            callout(
              "Un démarrage lent ne vient pas forcément du processeur : un disque lent ou trop plein est une cause très fréquente.",
              "info"
            ),
            callout(
              "Les étapes exactes varient un peu selon les machines et les systèmes : c'est normal. Ce qui compte, c'est la logique générale.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-11",
          title: "Quiz — Le système d'exploitation",
          type: "quiz",
          duration: "7 min",
          blocks: [
            p(
              "Cinq questions sur le système d'exploitation, le noyau, les processus et le démarrage. Prends ton temps."
            ),
            callout(
              "Relis la leçon en cas de doute : toutes les réponses sont dans le texte du module 2.",
              "info"
            )
          ],
          quiz: [
            {
              question:
                "Quel est le rôle principal du système d'exploitation ?",
              options: [
                "Faire le lien entre le matériel et les programmes",
                "Faire les mises à jour du navigateur",
                "Créer les fichiers de l'utilisateur",
                "Accélérer la connexion Internet"
              ],
              answer: 0,
              explanation:
                "Le système d'exploitation est l'intermédiaire entre le matériel (CPU, RAM, disque) et les programmes : il gère les ressources et les partage."
            },
            {
              question: "Que fait le noyau (kernel) ?",
              options: [
                "Il affiche le bureau graphique",
                "Il parle directement au matériel avec des privilèges maximaux",
                "Il range les fichiers dans des dossiers",
                "Il gère uniquement le mot de passe"
              ],
              answer: 1,
              explanation:
                "Le noyau contrôle le matériel et tourne dans l'espace noyau avec tous les privilèges, tandis que les programmes normaux vivent en espace utilisateur."
            },
            {
              question: "Un processus, c'est...",
              options: [
                "Un fichier exécutable stocké sur le disque",
                "Un type de mémoire",
                "Un programme en cours d'exécution",
                "Une adresse IP"
              ],
              answer: 2,
              explanation:
                "Le programme est la « recette » stockée sur le disque ; le processus est cette recette en train de s'exécuter, avec son numéro unique : le PID."
            },
            {
              question: "Que signifie le sigle PID ?",
              options: [
                "Process Identifier",
                "Program Input Device",
                "Personal Internet Data",
                "Power Interrupt Delay"
              ],
              answer: 0,
              explanation:
                "PID signifie Process Identifier : chaque processus reçoit un numéro unique qui permet au système, et à toi, de le suivre."
            },
            {
              question:
                "Au démarrage, quel composant vérifie les éléments essentiels puis lance le bootloader ?",
              options: [
                "Le disque dur",
                "Le BIOS ou l'UEFI",
                "Le navigateur",
                "La RAM"
              ],
              answer: 1,
              explanation:
                "Le BIOS (ou son successeur l'UEFI) fait le POST, cherche un bootloader sur le disque et le lance ; le bootloader charge ensuite le noyau."
            }
          ]
        }
      ]
    },
    {
      id: "cf-module-3",
      title: "Les fichiers et le système de fichiers",
      lessons: [
        {
          id: "cf-lecon-12",
          title: "Qu'est-ce qu'un fichier ?",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Tes documents, tes photos, tes programmes : tout ce qui vit sur un ordinateur est rangé sous forme de fichiers. Un fichier est la plus petite unité de données que tu peux nommer et retrouver."
            ),
            h("Des données nommées et rangées"),
            p(
              "Un fichier, c'est une suite de données (du texte, une image, du son...) à laquelle on donne un nom et une place. Le nom est la poignée qui permet de le retrouver."
            ),
            p(
              "Comme dans un classeur : chaque feuille est un fichier, l'étiquette en haut permet de savoir ce qu'elle contient. Sans nom, impossible de retrouver quoi que ce soit."
            ),
            h("L'extension : une étiquette de type"),
            p(
              "L'extension est la partie du nom après le dernier point : .txt, .jpg, .mp3, .py. Elle indique le type attendu du fichier."
            ),
            p(
              "Mais attention : l'extension n'est qu'une étiquette, elle ne change pas le contenu. Renommer image.jpg en image.txt ne transforme pas l'image en texte : seul le nom change, les données restent celles d'une image."
            ),
            h("La taille d'un fichier"),
            p(
              "La taille d'un fichier est la place qu'il occupe, comptée en octets (rappel du module 1 : un octet = 8 bits)."
            ),
            list(
              "Un court document texte : quelques Ko (kilooctets).",
              "Une photo prise avec un téléphone : de 2 à 5 Mo (mégaoctets).",
              "Un film : de 1 à 4 Go (gigaoctets)."
            ),
            h("Les grands types de fichiers"),
            list(
              "Le texte : .txt, .docx, .pdf.",
              "Les images : .jpg, .png.",
              "Le son : .mp3, .wav.",
              "La vidéo : .mp4, .avi.",
              "Les programmes : des fichiers exécutables qui contiennent des instructions."
            ),
            p(
              "Le même contenu peut exister sous plusieurs formats : une photo en .jpg pèse moins lourd qu'en .png, par exemple. Le format est un compromis entre qualité, taille et compatibilité."
            ),
            h("Les fichiers vivent dans des dossiers"),
            p(
              "Un fichier est rangé dans un dossier (aussi appelé répertoire). Un dossier peut contenir d'autres dossiers : c'est ce qui forme la hiérarchie que nous allons explorer dans la prochaine leçon."
            ),
            callout(
              "Sur les systèmes Unix/Linux, presque tout est traité comme un fichier : même les disques et les périphériques ont une « fiche » dans le système de fichiers.",
              "info"
            ),
            callout(
              "Donne à tes fichiers des noms clairs et explicites (exemple : rapport-stage-2026.txt). Tu te remercieras dans six mois quand tu devras les retrouver.",
              "tip"
            ),
            callout(
              "Ne touche jamais aux fichiers des autres sans leur autorisation : modifier ou supprimer un fichier qui ne t'appartient pas est une violation grave, et dans bien des cas une infraction.",
              "danger"
            )
          ]
        },
        {
          id: "cf-lecon-13",
          title: "La hiérarchie Unix",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Les dossiers d'un système Unix ne sont pas un tas en vrac : ils forment un arbre unique, une grande hiérarchie qui part d'une seule racine. Comprendre cette organisation, c'est savoir où regarder."
            ),
            h("Un arbre à l'envers"),
            p(
              "Imagine un arbre dont la racine est en haut : tout part d'un seul point, et tout descend de lui. Sur Unix, ce point unique est le dossier racine, noté avec un simple slash : /."
            ),
            p(
              "Le slash / est le dossier qui contient absolument tout le système. Chaque autre dossier descend de cette racine, comme une branche descend du tronc."
            ),
            h("Les grands quartiers du système"),
            p(
              "Les systèmes Unix et Linux partagent la même organisation de base. Voici les quartiers que tu dois connaître, comme on connaît les quartiers de sa ville."
            ),
            list(
              "/bin : les programmes essentiels du système, disponibles pour tous.",
              "/etc : les fichiers de configuration (réglages) des programmes et du système.",
              "/home : les dossiers personnels des utilisateurs.",
              "/tmp : les fichiers temporaires, nettoyés au redémarrage.",
              "/var/log : les journaux (logs), la mémoire des événements du système.",
              "/usr : les programmes installés sur la machine."
            ),
            h("Le chemin : l'adresse d'un fichier"),
            p(
              "Le chemin (path) est l'adresse d'un fichier dans l'arbre, écrite en suivant les branches. Les dossiers y sont séparés par des slash."
            ),
            list(
              "/home/alice/notes.txt : le fichier notes.txt dans le dossier d'alice.",
              "Le slash au début signifie « à partir de la racine ».",
              "Les chemins peuvent descendre plusieurs niveaux : /home/alice/travail/rapport.txt."
            ),
            h("Le raccourci de la maison : ~"),
            p(
              "Le symbole ~ (tilde) est un raccourci vers ton propre dossier personnel, celui qui porte ton nom dans /home. Écrire ~ revient à écrire /home/tonnom."
            ),
            p(
              "C'est l'équivalent de ton appartement dans l'immeuble : tu peux toujours rentrer chez toi en disant « chez moi » (le ~), sans connaître l'adresse complète."
            ),
            callout(
              "Inutile de mémoriser tous les dossiers par cœur : retiens la logique de l'arbre et les quatre ou cinq quartiers principaux, le reste viendra avec la pratique.",
              "tip"
            ),
            callout(
              "Le dossier /tmp est nettoyé au redémarrage : n'y range jamais un travail important que tu veux garder.",
              "warning"
            ),
            callout(
              "Les journaux dans /var/log sont une mine d'or en sécurité : ils enregistrent qui s'est connecté, quand, et ce qui s'est passé. On apprendra à les lire au niveau suivant.",
              "info"
            )
          ]
        },
        {
          id: "cf-lecon-14",
          title: "Les métadonnées et l'inode",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Un fichier, ce n'est pas seulement du contenu. Autour de lui vivent des informations qui le décrivent : son nom, son propriétaire, ses permissions, ses dates. Ce sont les métadonnées."
            ),
            h("La fiche d'identité du fichier"),
            p(
              "Métadonnées signifie « données sur les données » : des informations qui décrivent un fichier sans être son contenu lui-même."
            ),
            list(
              "Le nom du fichier (l'étiquette pour le retrouver).",
              "Le propriétaire : l'utilisateur à qui il appartient.",
              "Le groupe : le groupe d'utilisateurs auquel il est rattaché.",
              "Les permissions : qui peut lire, écrire ou exécuter.",
              "La taille : sa place sur le disque.",
              "Les dates : de création, de dernière modification, de dernier accès."
            ),
            h("L'inode : la fiche cachée"),
            p(
              "Sur Unix/Linux, ces métadonnées sont rangées dans une petite structure appelée inode. Chaque fichier a son inode ; le nom que tu vois n'est qu'une étiquette qui pointe vers lui."
            ),
            p(
              "Conséquence étonnante : renommer un fichier ne change pas son contenu, ni son inode. Tu ne fais que changer l'étiquette qui pointe vers la même fiche."
            ),
            h("Pourquoi c'est important en sécurité"),
            p(
              "Le propriétaire et les permissions décident qui peut faire quoi avec le fichier : c'est la porte d'entrée que nous étudierons au module 4."
            ),
            p(
              "Les dates sont précieuses : si un fichier système a été modifié à une heure où personne ne devait y toucher, c'est peut-être un signe d'intrusion. Les métadonnées racontent l'histoire d'un fichier."
            ),
            callout(
              "Tu ne verras pas souvent l'inode lui-même, mais tu verras ses effets à chaque commande ls -l : propriétaire, permissions, taille et date s'affichent devant tes yeux.",
              "info"
            ),
            callout(
              "Une commande comme stat permet d'afficher les métadonnées d'un fichier en détail ; nous la découvrirons plus tard dans le parcours.",
              "tip"
            ),
            callout(
              "En cas d'incident, les dates et le propriétaire d'un fichier peuvent prouver qu'il a été modifié : les bons analystes vérifient toujours les métadonnées.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-15",
          title: "Premiers pas en ligne de commande",
          type: "theory",
          duration: "15 min",
          blocks: [
            p(
              "Jusqu'ici, nous avons parlé des fichiers. Maintenant, apprenons à les voir, les parcourir et les lire dans le terminal. C'est le point de départ de toutes les compétences à venir."
            ),
            h("Le terminal et l'invite de commande"),
            p(
              "Le terminal est une fenêtre où tu dialogues avec l'ordinateur en texte : tu tapes une commande, tu appuies sur Entrée, et la machine répond. La ligne qui t'attend s'appelle l'invite de commande (prompt)."
            ),
            p(
              "Pour l'instant, ne t'inquiète pas de mémoriser : chaque commande sera expliquée une par une, avec son pourquoi."
            ),
            h("Où suis-je ? La commande pwd"),
            p(
              "pwd signifie Print Working Directory, « affiche le répertoire de travail ». Elle affiche le dossier où tu te trouves actuellement. C'est ton point de départ dans l'arbre."
            ),
            code(`pwd`),
            p(
              "Résultat : un chemin comme /home/alice. Tu sais ainsi dans quel dossier tu te trouves."
            ),
            h("Que contient ce dossier ? La commande ls"),
            p(
              "ls signifie list, « lister ». Elle affiche le contenu du dossier courant : ses fichiers et ses sous-dossiers."
            ),
            code(`ls`),
            p(
              "La variante ls -la est la plus utile : -l affiche un format long (permissions, propriétaire, taille, date) et -a affiche aussi les fichiers cachés, ceux dont le nom commence par un point."
            ),
            code(`ls -la`),
            p(
              "Résultat : une liste où chaque ligne décrit un fichier ou un dossier, les fichiers cachés compris (par exemple .bashrc ou .config)."
            ),
            h("Me déplacer : la commande cd"),
            p(
              "cd signifie Change Directory, « changer de répertoire ». Elle permet de se déplacer dans l'arbre."
            ),
            code(`cd /tmp`),
            p(
              "Cette commande t'amène dans le dossier /tmp. Deux repères essentiels : cd .. remonte d'un niveau vers le dossier parent, et cd ~ (ou simplement cd) te ramène dans ton dossier personnel."
            ),
            h("Lire un fichier : la commande cat"),
            p(
              "cat signifie concatenate, « concaténer ». Elle affiche le contenu d'un fichier texte directement dans le terminal."
            ),
            code(`cat /etc/hostname`),
            p(
              "Résultat : une ligne qui affiche le nom de ta machine. cat lit le fichier et l'écrit à l'écran, rien de plus."
            ),
            callout(
              "Le terminal n'est pas dangereux en soi : c'est ce qu'on lui demande qui peut l'être. Une commande qui affiche, comme cat, ne change rien sur ton système.",
              "info"
            ),
            callout(
              "Utilise la touche Tab pour compléter automatiquement les chemins et les noms de fichiers, et les flèches haut/bas pour retrouver les commandes précédentes.",
              "tip"
            ),
            callout(
              "Ne copie-colle jamais une commande vue sur un site douteux sans comprendre ce qu'elle fait : une commande apparemment innocente peut modifier ou supprimer des fichiers.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-16",
          title: "Exercice — explorer comme un aventurier",
          type: "exercise",
          duration: "20 min",
          blocks: [
            p(
              "Objectif : te promener dans le système de fichiers comme un explorateur, en n'utilisant que des commandes de lecture. Tu ne modifieras ni ne supprimeras rien : la consigne est d'observer."
            ),
            h("Étape 1 : partir de ta maison"),
            p(
              "Ouvre un terminal, puis affiche le dossier où tu te trouves."
            ),
            code(`pwd`),
            p(
              "Résultat attendu : tu es dans ton dossier personnel, un chemin qui commence par /home."
            ),
            h("Étape 2 : inspecter ta maison en détail"),
            code(`ls -la`),
            p(
              "Résultat attendu : une liste détaillée. Repère les entrées qui commencent par un point : ce sont des fichiers et dossiers cachés. Repère aussi les lignes commençant par d : ce sont des dossiers."
            ),
            h("Étape 3 : visiter /etc"),
            code(`cd /etc`),
            code(`ls`),
            p(
              "Résultat attendu : la liste des fichiers de configuration du système. N'y touche pas : contente-toi d'observer, comme on lit les panneaux dans un quartier inconnu."
            ),
            h("Étape 4 : visiter /tmp"),
            code(`cd /tmp`),
            code(`ls`),
            p(
              "Résultat attendu : le dossier des fichiers temporaires. Il est peut-être vide, ou presque : c'est normal, c'est un lieu de passage."
            ),
            h("Étape 5 : revenir à ta maison"),
            code(`cd ~`),
            code(`pwd`),
            p(
              "Résultat attendu : tu es revenu dans ton dossier personnel. Le ~ t'a ramené chez toi, comme prévu."
            ),
            h("Étape 6 : faire le bilan"),
            p(
              "Refais le voyage mentalement : pwd pour te situer, ls -la pour inspecter, cd pour te déplacer. Tu viens de faire tes premiers pas de navigateur du système."
            ),
            callout(
              "Toutes ces commandes sont en lecture pure : personne ne modifie rien, aucune donnée n'est touchée. Tu peux refaire cet exercice autant de fois que tu veux.",
              "info"
            ),
            callout(
              "Résiste à la tentation de créer, déplacer ou supprimer des fichiers pour « voir ce que ça fait » : dans /etc et /tmp, les conséquences peuvent être réelles.",
              "warning"
            ),
            callout(
              "Note sur un carnet le nom des dossiers que tu découvres : tu t'en serviras aux niveaux suivants.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-17",
          title: "Quiz — Fichiers et dossiers",
          type: "quiz",
          duration: "7 min",
          blocks: [
            p(
              "Cinq questions sur les fichiers, la hiérarchie Unix et les premières commandes du terminal."
            ),
            callout(
              "Si une question parle d'une commande, demande-toi : que fait cette commande exactement ?",
              "tip"
            )
          ],
          quiz: [
            {
              question: "Sur un système Unix, que représente le symbole / ?",
              options: [
                "Le dossier personnel de l'utilisateur",
                "La racine du système de fichiers",
                "Un fichier caché",
                "Le dossier des journaux"
              ],
              answer: 1,
              explanation:
                "Le slash / est la racine : le dossier qui contient tout le reste du système de fichiers. C'est l'origine de l'arbre des dossiers."
            },
            {
              question:
                "Dans quel dossier trouve-t-on les fichiers de configuration du système ?",
              options: ["/home", "/tmp", "/etc", "/var/log"],
              answer: 2,
              explanation:
                "/etc rassemble les fichiers de configuration. /home contient les dossiers personnels, /tmp les fichiers temporaires et /var/log les journaux."
            },
            {
              question: "Où sont stockés les journaux (logs) du système ?",
              options: ["/var/log", "/bin", "/home", "/root"],
              answer: 0,
              explanation:
                "Les journaux qui enregistrent l'activité du système se trouvent dans /var/log. Ils sont précieux en sécurité pour détecter des anomalies."
            },
            {
              question: "Que fait la commande pwd ?",
              options: [
                "Elle change de dossier",
                "Elle liste le contenu du dossier",
                "Elle affiche le dossier courant",
                "Elle supprime un fichier"
              ],
              answer: 2,
              explanation:
                "pwd (print working directory) affiche le chemin du dossier où tu te trouves. C'est le point de départ de toute exploration."
            },
            {
              question: "La commande ls -la permet de...",
              options: [
                "Lister les fichiers avec détails, y compris les fichiers cachés",
                "Créer un dossier",
                "Afficher le contenu d'un fichier",
                "Modifier les permissions"
              ],
              answer: 0,
              explanation:
                "ls -la combine -l (format long : permissions, propriétaire, taille, date) et -a (affiche aussi les fichiers cachés, qui commencent par un point)."
            }
          ]
        }
      ]
    },
    {
      id: "cf-module-4",
      title: "Utilisateurs et permissions",
      lessons: [
        {
          id: "cf-lecon-18",
          title: "Utilisateurs et groupes",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Un ordinateur peut servir à plusieurs personnes, et même chez toi, il héberge des programmes de provenances diverses. Il faut donc savoir qui est qui, et qui a le droit de faire quoi."
            ),
            h("Pourquoi isoler les utilisateurs"),
            p(
              "Dans une entreprise, une école ou sur un serveur, plusieurs personnes utilisent la même machine. Chacune doit avoir ses propres fichiers, et surtout : personne ne doit pouvoir lire ou modifier ceux des autres."
            ),
            p(
              "Même quand tu es seul sur ta machine, l'isolation protège : un programme malveillant qui tourne sous ton nom ne pourra toucher qu'à ce que ton utilisateur a le droit de toucher."
            ),
            h("L'utilisateur root, le superutilisateur"),
            p(
              "Il existe un utilisateur spécial, nommé root : l'administrateur du système. Il a tous les droits, sans exception. C'est lui qui installe les logiciels, gère les comptes et répare la machine."
            ),
            p(
              "En sécurité, la règle est claire : on n'utilise root que lorsque c'est indispensable. Avec tous les droits, une seule erreur peut détruire tout le système."
            ),
            h("L'utilisateur courant : toi"),
            p(
              "Quand tu te connectes, tu deviens un utilisateur ordinaire avec un nom et des droits limités. Tu peux travailler dans ton dossier personnel, mais tu ne peux pas modifier le système à ta guise."
            ),
            h("Qui suis-je ? La commande whoami"),
            p(
              "La commande whoami (« qui suis-je ») affiche le nom de l'utilisateur sous lequel tu es connecté."
            ),
            code(`whoami`),
            p(
              "Résultat : ton nom d'utilisateur. Si tu vois « root », tu es connecté en administrateur : vérifie que c'est bien voulu."
            ),
            h("Les groupes : des équipes de droits"),
            p(
              "Un groupe rassemble plusieurs utilisateurs qui partagent des droits communs. Par exemple, un groupe « dev » dont tous les membres peuvent lire les fichiers du projet."
            ),
            p(
              "Chaque fichier appartient à un utilisateur ET à un groupe. C'est comme une salle de classe : chaque élève a son casier personnel (l'utilisateur), et toute la classe partage certains espaces (le groupe)."
            ),
            callout(
              "La commande id affiche ton identité complète : ton utilisateur, tes groupes et leurs numéros. Nous la détaillerons au niveau 1.",
              "info"
            ),
            callout(
              "Ne te connecte jamais en root pour « voir si ça marche » sans comprendre précisément ce que tu vas faire : avec les pleins pouvoirs, l'erreur est sans filet.",
              "danger"
            ),
            callout(
              "Retiens le réflexe : d'abord savoir qui je suis (whoami), ensuite savoir ce que j'ai le droit de faire (les permissions).",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-19",
          title: "Les permissions : rwx expliquées",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Les permissions sont les règles qui disent, pour chaque fichier ou dossier : qui peut lire, qui peut écrire, qui peut exécuter. Les comprendre, c'est comprendre comment se protègent les données."
            ),
            h("Les trois actions de base"),
            p(
              "Trois lettres reviennent partout : r, w, x. Elles correspondent à trois actions possibles sur un fichier ou un dossier."
            ),
            list(
              "r (read) : lire. Sur un fichier, voir son contenu. Sur un dossier, lister les fichiers qu'il contient.",
              "w (write) : écrire. Sur un fichier, le modifier. Sur un dossier, créer ou supprimer des fichiers dedans.",
              "x (execute) : exécuter. Sur un fichier, le lancer comme programme. Sur un dossier, entrer dedans (avec cd)."
            ),
            h("Les trois cercles de personnes"),
            p(
              "Ces actions s'appliquent à trois cercles de personnes, pour chacun desquels on définit les droits."
            ),
            list(
              "u (user) : le propriétaire du fichier.",
              "g (group) : le groupe auquel le fichier est rattaché.",
              "o (others) : tous les autres utilisateurs."
            ),
            h("Décoder la première colonne de ls -l"),
            p(
              "La commande ls -l affiche, en début de chaque ligne, dix caractères qui résument le type et les permissions."
            ),
            code(`ls -l`),
            p(
              "Prenons l'exemple -rw-r--r--. Comment le lire ?"
            ),
            list(
              "Le premier caractère : - pour un fichier ordinaire, d pour un dossier.",
              "Ensuite 3 groupes de 3 lettres, pour le propriétaire, le groupe, puis les autres.",
              "Un tiret à la place d'une lettre signifie que le droit est absent."
            ),
            p(
              "Dans -rw-r--r-- : le propriétaire a rw- (lecture et écriture), le groupe a r-- (lecture seule), les autres ont r-- (lecture seule)."
            ),
            p(
              "Autre exemple : -rwxr-xr-x signifie que le propriétaire peut tout faire, tandis que le groupe et les autres peuvent lire et exécuter, mais pas modifier."
            ),
            callout(
              "Entraîne-toi à lire ces dix caractères comme une phrase : type, puis droits du propriétaire, puis droits du groupe, puis droits des autres.",
              "tip"
            ),
            callout(
              "Une seule permission mal réglée peut exposer un fichier secret : un fichier en r--r--r-- est lisible par absolument tous les utilisateurs de la machine.",
              "warning"
            ),
            callout(
              "Le propriétaire d'un fichier (ou root) peut modifier ses permissions. Les autres utilisateurs, eux, ne le peuvent pas.",
              "info"
            )
          ]
        },
        {
          id: "cf-lecon-20",
          title: "La notation octale et chmod",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Écrire rwxr-xr-x est long. Les administrateurs utilisent souvent une écriture en chiffres, la notation octale. C'est un code simple, basé sur des additions : 4, 2, 1."
            ),
            h("Le code 4-2-1"),
            p(
              "Chaque droit possède une valeur : la lecture vaut 4, l'écriture vaut 2, l'exécution vaut 1. On additionne ces valeurs pour obtenir le total d'un cercle."
            ),
            list(
              "r = 4",
              "w = 2",
              "x = 1",
              "Pas de droit = 0"
            ),
            h("Le tableau des totaux"),
            p(
              "Voici les totaux les plus courants, à garder comme une table de référence."
            ),
            list(
              "7 = rwx : lecture, écriture et exécution.",
              "6 = rw- : lecture et écriture, sans exécution.",
              "5 = r-x : lecture et exécution, sans écriture.",
              "4 = r-- : lecture seule.",
              "0 = --- : aucun droit."
            ),
            h("Trois chiffres, trois cercles"),
            p(
              "La permission complète s'écrit avec trois chiffres : le premier pour le propriétaire, le second pour le groupe, le troisième pour les autres."
            ),
            list(
              "644 = rw-r--r-- : le propriétaire peut lire et écrire, les autres seulement lire.",
              "755 = rwxr-xr-x : le propriétaire peut tout, les autres peuvent lire et exécuter.",
              "700 = rwx------ : le propriétaire peut tout, personne d'autre n'a aucun droit."
            ),
            p(
              "Ainsi, 644 pour un fichier ordinaire, 755 pour un programme ou un dossier de travail, et 700 pour ce qui doit rester strictement privé."
            ),
            h("La commande chmod"),
            p(
              "chmod signifie Change Mode, « changer le mode ». C'est la commande qui modifie les permissions d'un fichier."
            ),
            code(`chmod 600 fichier.txt`),
            p(
              "Cette commande donne lecture et écriture au propriétaire uniquement (6 = rw-), et aucun droit au groupe ni aux autres (00). C'est le réglage typique d'un fichier secret."
            ),
            p(
              "Pour changer les permissions d'un fichier, il faut en être le propriétaire (ou être root). Les autres utilisateurs ne peuvent pas modifier les droits d'un fichier qui ne leur appartient pas."
            ),
            callout(
              "chmod existe aussi en forme symbolique (par exemple chmod u+w fichier), mais la forme octale est simple, précise et la plus utilisée.",
              "info"
            ),
            callout(
              "La valeur 777 donne tous les droits à tout le monde (rwxrwxrwx) : à éviter presque toujours, sauf cas très particuliers que nous verrons plus tard.",
              "warning"
            ),
            callout(
              "Avant chaque chmod, pose-toi la question : qui a réellement besoin de cet accès ? Le moins de droits possible est la meilleure politique.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-21",
          title: "Le bit setuid et les pièges",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "En lisant des permissions, tu tomberas parfois sur un « s » étrange à la place du « x ». Ce n'est pas une erreur : c'est le bit setuid, une permission spéciale à comprendre avec précaution."
            ),
            h("Le s dans ls -l"),
            p(
              "Regardons un exemple réel, la commande qui permet de changer son mot de passe."
            ),
            code(`ls -l /usr/bin/passwd`),
            p(
              "Résultat typique : -rwsr-xr-x. Le « s » à la place du « x » du propriétaire indique que le bit setuid est activé."
            ),
            h("setuid : changer son identité le temps de la tâche"),
            p(
              "setuid signifie set user ID, « définir l'identifiant de l'utilisateur ». Quand un programme possède ce bit, il s'exécute avec les droits du propriétaire du fichier (souvent root), et non ceux de la personne qui l'a lancé."
            ),
            p(
              "Pourquoi faire ça ? Parce que changer son mot de passe impose de modifier un fichier système réservé à root. Le programme passwd porte donc le bit setuid pour obtenir juste ce droit, au moment précis où il en a besoin."
            ),
            h("Pourquoi c'est dangereux en sécurité"),
            p(
              "Un programme setuid mal conçu est une porte vers les pleins pouvoirs : si un attaquant parvient à l'exploiter, il peut obtenir les droits du propriétaire du fichier, c'est-à-dire souvent ceux de root."
            ),
            list(
              "Un programme setuid doit appartenir à un utilisateur de confiance et n'accorder que le strict nécessaire.",
              "Un attaquant qui remplace un programme setuid par son propre programme devient root à son insu.",
              "Les fichiers setuid doivent être surveillés : une apparition inattendue d'un « s » est un signal d'alarme."
            ),
            callout(
              "Si tu vois un « s » à la place du « x » dans ls -l, tu sais maintenant que c'est du setuid : un programme qui tourne avec les droits de son propriétaire.",
              "warning"
            ),
            callout(
              "Ne teste jamais les pièges de permissions sur une machine qui n'est pas la tienne : modifier les droits ou les programmes d'autrui est dangereux et illégal.",
              "danger"
            ),
            callout(
              "Au niveau 0, il suffit de savoir reconnaître le « s » et de comprendre le risque. Le détail du setuid sera approfondi plus tard.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-22",
          title: "Exercice — protéger un fichier secret",
          type: "exercise",
          duration: "20 min",
          blocks: [
            p(
              "Objectif : créer un fichier de test, observer ses permissions par défaut, puis les durcir avec chmod. Tout se passe dans TON dossier personnel, sur TA machine."
            ),
            h("Étape 1 : aller dans ta maison"),
            code(`cd ~`),
            p(
              "Résultat attendu : aucune erreur, tu es dans ton dossier personnel."
            ),
            h("Étape 2 : créer un dossier de travail"),
            p(
              "La commande mkdir (make directory) crée un dossier."
            ),
            code(`mkdir test-permissions`),
            p(
              "Résultat attendu : rien ne s'affiche, et le dossier test-permissions existe maintenant dans ta maison."
            ),
            h("Étape 3 : entrer dans le dossier"),
            code(`cd test-permissions`),
            h("Étape 4 : créer un fichier de test"),
            p(
              "Le message est écrit dans le fichier secret.txt avec une simple redirection. Utilise un mot de passe FICTIF, jamais un vrai."
            ),
            code(`echo "mot de passe fictif" > secret.txt`),
            p(
              "Résultat attendu : le fichier secret.txt est créé, il contient le texte entre guillemets."
            ),
            h("Étape 5 : observer les permissions par défaut"),
            code(`ls -l secret.txt`),
            p(
              "Résultat attendu : une ligne comme -rw-r--r--. Tout le monde peut lire ce fichier : trop ouvert pour un secret."
            ),
            h("Étape 6 : protéger le fichier"),
            code(`chmod 600 secret.txt`),
            code(`ls -l secret.txt`),
            p(
              "Résultat attendu : la ligne est devenue -rw-------. Seul le propriétaire peut lire et écrire : c'est exactement ce que nous voulions."
            ),
            h("Étape 7 (optionnel) : voir le danger de 777"),
            p(
              "Juste pour l'observer, tu peux ouvrir les droits à tout le monde puis refermer aussitôt."
            ),
            code(`chmod 777 secret.txt`),
            code(`ls -l secret.txt`),
            code(`chmod 600 secret.txt`),
            p(
              "Résultat attendu : tu vois -rwxrwxrwx apparaître (tout le monde peut tout), puis -rw------- revenir. Ne laisse jamais un fichier en 777.\n"
            ),
            h("Étape 8 : nettoyer"),
            p(
              "La commande rm (remove) supprime ton fichier de test. Ne l'utilise que sur des fichiers dont tu es sûr, dans ton propre espace."
            ),
            code(`rm secret.txt`),
            code(`cd ~`),
            p(
              "Résultat attendu : le fichier a disparu et tu es revenu dans ta maison. Ton dossier test-permissions reste, tu pourras le réutiliser plus tard."
            ),
            callout(
              "Travaille uniquement dans ton dossier personnel (~) : c'est le seul endroit où tu as le droit de créer et modifier librement des fichiers.",
              "warning"
            ),
            callout(
              "Ne fais cet exercice que sur TA propre machine, jamais sur une machine d'entreprise, d'école ou appartenant à quelqu'un d'autre.",
              "danger"
            ),
            callout(
              "N'utilise jamais un vrai mot de passe pour ces entraînements : un fichier de test doit rester un fichier de test.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-23",
          title: "Quiz — Permissions et sécurité",
          type: "quiz",
          duration: "7 min",
          blocks: [
            p(
              "Cinq questions sur les utilisateurs, les permissions rwx et la notation octale."
            ),
            callout(
              "Pour chaque question, essaie de te représenter concrètement le fichier et ses droits avant de répondre.",
              "tip"
            )
          ],
          quiz: [
            {
              question: "Que permet la permission de lecture (r) sur un fichier ?",
              options: [
                "Lire le contenu du fichier",
                "Modifier le fichier",
                "Exécuter le fichier",
                "Supprimer le fichier"
              ],
              answer: 0,
              explanation:
                "r (read) permet de lire le contenu. Modifier demande w (write), exécuter demande x (execute)."
            },
            {
              question: "Dans -rw-r--r--, que peut faire le groupe ?",
              options: [
                "Tout",
                "Lire uniquement",
                "Lire et écrire",
                "Rien"
              ],
              answer: 1,
              explanation:
                "Les trois caractères du groupe sont r-- : lecture seule. Le propriétaire (rw-) peut lire et écrire, les autres (r--) ne peuvent que lire."
            },
            {
              question: "En notation octale, que vaut rwx ?",
              options: ["4", "5", "6", "7"],
              answer: 3,
              explanation:
                "On additionne r=4, w=2 et x=1 : 4 + 2 + 1 = 7. Un fichier en 700 n'est accessible qu'à son propriétaire."
            },
            {
              question: "Que fait la commande chmod 600 fichier.txt ?",
              options: [
                "Elle donne tous les droits à tout le monde",
                "Elle rend le fichier illisible",
                "Elle donne lecture et écriture au propriétaire uniquement",
                "Elle supprime le fichier"
              ],
              answer: 2,
              explanation:
                "600 = rw------- : le propriétaire peut lire et écrire, personne d'autre n'a aucun droit. C'est le réglage typique d'un fichier secret."
            },
            {
              question: "Le bit setuid (le « s » dans ls -l) signifie que...",
              options: [
                "Le fichier est secret",
                "Le programme s'exécute avec les droits du propriétaire du fichier",
                "Le fichier est en lecture seule",
                "Le fichier est un virus"
              ],
              answer: 1,
              explanation:
                "Avec setuid, un programme tourne avec les droits du propriétaire du fichier (souvent root) et non ceux de l'utilisateur qui le lance. Utile pour passwd, mais dangereux s'il est mal utilisé."
            }
          ]
        }
      ]
    },
    {
      id: "cf-module-5",
      title: "Le réseau : première rencontre",
      lessons: [
        {
          id: "cf-lecon-24",
          title: "Qu'est-ce qu'un réseau ?",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Un ordinateur seul ne communique avec personne. Dès que deux machines échangent des informations, elles forment un réseau. Le plus connu de tous est Internet."
            ),
            h("L'analogie du système postal"),
            p(
              "Le réseau fonctionne un peu comme la poste : tu écris une adresse sur une enveloppe, la poste achemine le courrier, et le destinataire le reçoit. Sur un réseau, les messages sont découpés en petits morceaux appelés paquets."
            ),
            p(
              "Chaque machine joue à tour de rôle le rôle d'expéditeur et de destinataire. Les paquets voyagent de machine en machine, comme des lettres qui passent de main en main jusqu'à leur destinataire."
            ),
            h("Les identifiants de la maison"),
            p(
              "Pour qu'un paquet arrive au bon endroit, chaque machine doit être identifiable. Trois notions reviendront sans cesse."
            ),
            list(
              "L'adresse IP : l'adresse de la maison, elle identifie la machine sur le réseau.",
              "L'adresse MAC : l'identité de la carte réseau, une sorte d'immatriculation gravée en usine.",
              "Le port : le numéro de la porte, il désigne le service précis sur la machine."
            ),
            h("IP et MAC : les sigles"),
            p(
              "IP signifie Internet Protocol : c'est l'ensemble de règles qui permet aux machines de s'envoyer des données, et par extension le nom des adresses utilisées. MAC signifie Media Access Control : c'est l'identifiant unique attribué à chaque carte réseau."
            ),
            h("Pourquoi partager des informations"),
            p(
              "Le réseau n'est pas une fin en soi : il sert à échanger. Les usages les plus courants :"
            ),
            list(
              "Partager des fichiers entre machines.",
              "Surfer sur le Web et consulter ses mails.",
              "Jouer à plusieurs, discuter, regarder des vidéos.",
              "Faire fonctionner les objets connectés de la maison."
            ),
            p(
              "Le plus grand réseau du monde est Internet : il relie des milliards de machines sur toute la planète, comme un système postal planétaire."
            ),
            callout(
              "Tu n'as pas besoin de connaître l'électronique pour comprendre le réseau : retiens l'image de la poste, des paquets et des adresses.",
              "info"
            ),
            callout(
              "Les mots « paquet », « adresse » et « port » reviendront tout au long du parcours. Familiarise-toi avec eux dès maintenant.",
              "tip"
            ),
            callout(
              "Sur un réseau, les données échangées peuvent être observées par d'autres machines. C'est le sujet de tout un pan de la cybersécurité.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-25",
          title: "L'adresse IP et le port",
          type: "theory",
          duration: "14 min",
          blocks: [
            p(
              "Pour joindre un service sur une machine, il faut deux coordonnées : l'adresse de la maison (l'IP) et le numéro de la porte (le port)."
            ),
            h("L'adresse de la maison : l'IP"),
            p(
              "L'adresse IP (Internet Protocol) identifie une machine sur un réseau, un peu comme une adresse postale identifie une maison dans une ville."
            ),
            p(
              "La version la plus répandue est IPv4 : quatre nombres entre 0 et 255, séparés par des points. Exemple : 192.168.1.10."
            ),
            list(
              "192.168.1.10 se lit comme une adresse en quatre blocs.",
              "Chaque bloc peut aller de 0 à 255.",
              "Cela permet des milliards de combinaisons, mais pas assez pour le monde entier."
            ),
            p(
              "Il existe aussi une version plus récente, IPv6, avec des adresses bien plus longues comme 2001:db8::1. Elle a été créée car les adresses IPv4 commencent à manquer."
            ),
            h("Le numéro de la porte : le port"),
            p(
              "Une même machine fait plusieurs choses à la fois : elle sert des pages web, reçoit des mails, héberge des jeux. Le port précise de quel service il s'agit."
            ),
            p(
              "L'adresse IP est la maison, le port est la porte : une lettre adressée à la maison peut arriver par la porte principale ou par la porte de service. Sur le réseau, chaque service a son numéro de porte attitré."
            ),
            list(
              "80 et 443 : les ports du Web (80 pour le Web classique, 443 pour le Web chiffré).",
              "22 : le port de SSH (Secure Shell), une connexion de commande à distance.",
              "25 : le port de l'acheminement des mails."
            ),
            p(
              "L'adresse complète d'un service, c'est donc l'association d'une IP et d'un port : on rejoint la bonne maison, puis la bonne porte."
            ),
            h("Ta propre machine : localhost"),
            p(
              "Il existe une adresse spéciale qui désigne toujours ta propre machine : 127.0.0.1, souvent appelée localhost. C'est la boucle locale : quand tu t'y connectes, tu parles à toi-même."
            ),
            callout(
              "Une adresse IP peut changer au fil du temps (on parle d'adresse dynamique). C'est normal : ce qui compte, c'est de savoir la retrouver quand on en a besoin.",
              "info"
            ),
            callout(
              "Retiens : 127.0.0.1 = moi-même. C'est l'adresse que ta machine utilise pour se tester et se parler.",
              "tip"
            ),
            callout(
              "Ne laisse jamais un service de ta machine ouvert à tout le réseau sans comprendre ce que cela implique : une porte ouverte peut être franchie par n'importe qui.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-26",
          title: "Qui es-tu sur le réseau ?",
          type: "exercise",
          duration: "15 min",
          blocks: [
            p(
              "Objectif : découvrir le nom et les adresses de ta machine, puis vérifier qu'elle sait se parler à elle-même. Toutes les commandes ci-dessous sont en lecture : elles n'envoient rien à l'extérieur."
            ),
            h("Étape 1 : connaître ton nom de machine"),
            p(
              "La commande hostname affiche le nom que ta machine porte sur le réseau."
            ),
            code(`hostname`),
            p(
              "Résultat attendu : un nom, parfois fantaisiste (comme le nom d'un produit ou d'un personnage). C'est l'étiquette de ta machine."
            ),
            h("Étape 2 : lister tes adresses IP"),
            p(
              "La commande ip a (address) affiche les interfaces réseau et leurs adresses IP."
            ),
            code(`ip a`),
            p(
              "Résultat attendu : une ou plusieurs interfaces. Cherche l'adresse 127.0.0.1, c'est ta boucle locale. Repère aussi ton adresse locale, souvent en 192.168.x.x ou 10.x.x.x."
            ),
            h("Étape 3 : te parler à toi-même"),
            p(
              "La commande ping envoie un petit paquet et attend la réponse. Interrogeons d'abord l'adresse 127.0.0.1."
            ),
            code(`ping 127.0.0.1`),
            p(
              "Résultat attendu : des lignes qui annoncent une réponse immédiate. Ta machine se répond à elle-même : la boucle locale fonctionne."
            ),
            p(
              "Pour arrêter le ping, appuie sur Ctrl+C : le terminal retrouve ton invite de commande."
            ),
            h("Étape 4 : faire pareil avec localhost"),
            code(`ping localhost`),
            p(
              "Résultat attendu : le même comportement. Le nom localhost pointe vers l'adresse 127.0.0.1 : tu as vérifié que le nom et l'adresse désignent la même machine."
            ),
            h("Étape 5 : interpréter ce que tu as vu"),
            list(
              "Une adresse commençant par 127 : toujours toi, c'est la boucle locale.",
              "Une adresse en 192.168.x.x ou 10.x.x.x : souvent ton réseau local privé.",
              "Le hostname : le nom que les autres machines de ton réseau utilisent pour te désigner."
            ),
            callout(
              "Ces commandes sont purement locales : elles n'envoient aucun paquet vers l'extérieur et ne modifient rien sur ta machine.",
              "info"
            ),
            callout(
              "Ne scanne jamais le réseau des autres ni les machines qui ne t'appartiennent pas : explorer le réseau d'autrui sans autorisation est interdit et illégal.",
              "danger"
            ),
            callout(
              "Retiens ta petite adresse locale (souvent en 192.168.x.x) : elle te servira quand tu apprendras à connecter des machines entre elles.",
              "tip"
            )
          ]
        },
        {
          id: "cf-lecon-27",
          title: "Quiz — Le réseau en survol",
          type: "quiz",
          duration: "6 min",
          blocks: [
            p(
              "Quatre questions pour vérifier ta première rencontre avec le réseau."
            ),
            callout(
              "Si tu hésites entre deux réponses, repense à l'analogie de la poste et de la maison.",
              "tip"
            )
          ],
          quiz: [
            {
              question: "À quoi sert une adresse IP ?",
              options: [
                "À identifier une machine sur un réseau",
                "À stocker des fichiers",
                "À accélérer le processeur",
                "À chiffrer les mots de passe"
              ],
              answer: 0,
              explanation:
                "L'adresse IP (Internet Protocol) est l'adresse de la « maison » : elle identifie une machine sur un réseau, comme une adresse postale."
            },
            {
              question: "Dans l'analogie de la maison, le port correspond à...",
              options: [
                "La boîte aux lettres",
                "Le numéro de la porte",
                "Le jardin",
                "La rue"
              ],
              answer: 1,
              explanation:
                "L'adresse IP est la maison, le port est le numéro de la porte : il désigne le service précis (web, mail...) sur la machine."
            },
            {
              question: "Quelle adresse désigne ta propre machine ?",
              options: [
                "0.0.0.0",
                "255.255.255.255",
                "127.0.0.1",
                "192.0.2.1"
              ],
              answer: 2,
              explanation:
                "127.0.0.1 est la boucle locale (loopback) : l'adresse que ta machine utilise pour se parler à elle-même, souvent appelée localhost."
            },
            {
              question: "Un paquet, sur un réseau, c'est...",
              options: [
                "Un logiciel de messagerie",
                "Un message découpé pour être acheminé sur le réseau",
                "Un type de câble",
                "Un dossier compressé"
              ],
              answer: 1,
              explanation:
                "Les données envoyées sur un réseau sont découpées en petits morceaux appelés paquets, que chaque machine achemine vers la bonne adresse."
            }
          ]
        }
      ]
    },
    {
      id: "cf-module-6",
      title: "Synthèse et suite du parcours",
      lessons: [
        {
          id: "cf-lecon-28",
          title: "Récapitulatif visuel",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Tu viens de traverser l'ordinateur de la machine brute jusqu'au réseau. Prends une grande inspiration : c'est le moment de rassembler tout ce que tu as appris, comme on regarde une carte après un long voyage."
            ),
            h("Le voyage en cinq arrêts"),
            list(
              "1. Le matériel : la machine et ses quatre briques.",
              "2. Le système d'exploitation : le chef d'orchestre.",
              "3. Les fichiers : l'arbre, la racine, les métadonnées.",
              "4. Les utilisateurs et les permissions : qui peut faire quoi.",
              "5. Le réseau : les adresses et les ports pour communiquer."
            ),
            h("Chaque notion et son mot-clé"),
            p(
              "Pour chaque étape du voyage, retiens le mot-clé qui la résume. C'est ton tableau de bord personnel."
            ),
            list(
              "Le matériel → CPU, RAM, disque, binaire.",
              "Le système d'exploitation → noyau, processus, PID.",
              "Les fichiers → la racine /, /home, les métadonnées.",
              "Les permissions → rwx, chmod 600, root.",
              "Le réseau → adresse IP, port, localhost."
            ),
            h("Ce que tu sais maintenant faire"),
            p(
              "Arrête-toi un instant et mesure le chemin parcouru. Tu sais déjà :"
            ),
            list(
              "Ouvrir un terminal et te repérer avec pwd.",
              "Inspecter un dossier avec ls -la.",
              "Lire les permissions d'un fichier.",
              "Protéger un fichier avec chmod.",
              "Connaître le nom et les adresses de ta machine."
            ),
            p(
              "L'important n'est pas de tout retenir par cœur : c'est de savoir où chercher et de comprendre la logique. Le reste viendra avec la pratique."
            ),
            callout(
              "Ce niveau était la fondation de tout le parcours : chaque mot-clé que tu maîtrises est une brique pour les niveaux suivants.",
              "info"
            ),
            callout(
              "Refais les exercices du niveau dans trois jours, sans regarder les corrections : tu verras que les notions se sont ancrées toutes seules.",
              "tip"
            ),
            callout(
              "La connaissance sans l'éthique est dangereuse : tout ce que tu apprends ici sert à protéger, jamais à nuire.",
              "warning"
            )
          ]
        },
        {
          id: "cf-lecon-29",
          title: "Quiz final du niveau 0",
          type: "quiz",
          duration: "10 min",
          blocks: [
            p(
              "Six questions qui mélangent tout le cours : matériel, système, fichiers, permissions et réseau. C'est le grand bilan du niveau 0."
            ),
            callout(
              "Prends ton temps et relis les leçons si nécessaire : ce quiz valide les bases sur lesquelles tout le parcours s'appuie.",
              "info"
            )
          ],
          quiz: [
            {
              question: "Quelles sont les quatre grandes briques d'un ordinateur ?",
              options: [
                "CPU, RAM, stockage, périphériques",
                "Souris, clavier, écran, enceintes",
                "Internet, Wi-Fi, Bluetooth, USB",
                "Linux, Windows, macOS, Android"
              ],
              answer: 0,
              explanation:
                "La CPU (le cerveau), la RAM (le plan de travail), le stockage (le frigo) et les périphériques (les outils de communication) sont les quatre briques essentielles."
            },
            {
              question: "Quelle est la différence principale entre la RAM et le disque ?",
              options: [
                "La RAM est durable, le disque est volatile",
                "La RAM est volatile et rapide, le disque est durable et plus lent",
                "Il n'y a aucune différence",
                "La RAM stocke les programmes, le disque stocke la mémoire"
              ],
              answer: 1,
              explanation:
                "La RAM est un plan de travail rapide qui s'efface à l'extinction ; le disque est un frigo qui garde tout, même sans électricité."
            },
            {
              question: "Le noyau d'un système d'exploitation tourne dans...",
              options: [
                "L'espace utilisateur",
                "L'espace noyau",
                "Le navigateur",
                "Le BIOS"
              ],
              answer: 1,
              explanation:
                "Le noyau tourne dans l'espace noyau, avec des privilèges maximaux sur le matériel. Les programmes normaux tournent dans l'espace utilisateur, avec des droits limités : c'est une barrière de sécurité fondamentale."
            },
            {
              question: "Que permet la commande chmod 700 dossier ?",
              options: [
                "Que le propriétaire ait tous les droits, les autres rien",
                "Que tout le monde ait tous les droits",
                "De supprimer le dossier",
                "De cacher le dossier"
              ],
              answer: 0,
              explanation:
                "700 = rwx------ : le propriétaire peut lire, écrire et entrer ; le groupe et les autres n'ont aucun droit."
            },
            {
              question: "Le sigle PID correspond à...",
              options: [
                "Process Identifier",
                "Program Input Data",
                "Personal Identity Document",
                "Private Internet Device"
              ],
              answer: 0,
              explanation:
                "PID signifie Process Identifier : le numéro unique qu'un système donne à chaque processus pour le suivre et le gérer."
            },
            {
              question: "Pourquoi l'isolation entre utilisateurs est-elle importante en sécurité ?",
              options: [
                "Pour économiser de l'électricité",
                "Pour qu'un utilisateur (ou un programme) ne puisse pas toucher aux fichiers des autres",
                "Pour accélérer Internet",
                "Pour que les fichiers soient plus gros"
              ],
              answer: 1,
              explanation:
                "L'isolation fait qu'un utilisateur ou un programme malveillant ne peut accéder qu'à ses propres fichiers : les dégâts sont limités à son espace."
            }
          ]
        },
        {
          id: "cf-lecon-30",
          title: "Cap sur Linux",
          type: "theory",
          duration: "13 min",
          blocks: [
            p(
              "Bravo, tu as terminé le niveau 0. Avant de passer au niveau suivant, faisons le point sur ce qui t'attend : Linux, l'environnement de travail des professionnels de la sécurité."
            ),
            h("Pourquoi Linux ?"),
            p(
              "Linux est un système d'exploitation dont le noyau, nommé Linux, est libre : n'importe qui peut le consulter, l'étudier et le modifier. Cette ouverture en fait un outil d'apprentissage idéal."
            ),
            list(
              "Les serveurs qui font tourner le Web utilisent massivement Linux.",
              "Les routeurs, objets connectés et box internet fonctionnent souvent sous Linux.",
              "La plupart des outils professionnels de cybersécurité tournent sous Linux."
            ),
            p(
              "Autrement dit : comprendre Linux, c'est comprendre les machines que tu rencontreras dans la vraie vie de la sécurité."
            ),
            h("On s'entraîne sans risque : la machine virtuelle"),
            p(
              "Pour t'entraîner, tu n'installeras rien sur ton ordinateur personnel : tu utiliseras une machine virtuelle, c'est-à-dire un ordinateur complet simulé à l'intérieur de ton propre ordinateur."
            ),
            p(
              "C'est un bac à sable parfait : si tu casses tout, tu recrées une machine toute neuve en quelques minutes, sans aucun impact sur ton système."
            ),
            h("Ce qu'on va y faire au niveau 1"),
            p(
              "Au niveau 1, tu vas mettre en pratique tout ce que tu as appris ici, en ligne de commande."
            ),
            list(
              "Naviguer dans l'arbre des fichiers avec pwd, ls et cd, en douceur.",
              "Créer, copier, déplacer et supprimer tes propres fichiers.",
              "Observer les processus qui tournent sur la machine.",
              "Lire les journaux et comprendre les services.",
              "Gérer les utilisateurs et les permissions de façon concrète."
            ),
            p(
              "Chaque commande apprise te rapproche de la compréhension du Web, des serveurs et des attaques réelles. Tout s'enchaîne."
            ),
            callout(
              "Le terminal deviendra ton meilleur ami : c'est l'outil le plus puissant et le plus précis de toute la machine.",
              "info"
            ),
            callout(
              "Tout ce qu'on apprendra s'exerce sur SES machines ou sur des machines d'entraînement, jamais sur celles des autres : c'est la règle d'or du parcours.",
              "danger"
            ),
            callout(
              "Reste curieux et patient : chaque professionnel de la sécurité a commencé exactement où tu es aujourd'hui, à zéro.",
              "tip"
            ),
            p(
              "Félicitations pour ce niveau 0. La suite t'attend : Linux n'a plus de secrets pour toi que quelques leçons."
            )
          ]
        }
      ]
    },
  ],
};
