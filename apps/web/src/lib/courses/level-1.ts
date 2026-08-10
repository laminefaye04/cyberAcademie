import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const LINUX_FUNDAMENTALS_COURSE: Course = {
  id: "linux-fundamentals",
  levelId: 1,
  title: "Linux Fundamentals",
  description:
    "Maîtriser l'environnement Linux en ligne de commande : navigation, fichiers, permissions, processus et outils du quotidien.",
  xp: 750,
  modules: [
    {
      id: "linux-module-1",
      title: "Le shell, les flux et les pipes",
      lessons: [
        {
          id: "linux-lecon-01",
          title: "Le shell et la ligne de commande",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Ton nouvel atelier : le terminal"),
            p(
              "Jusqu'ici, tu as manipulé ton ordinateur par des fenêtres et des clics. Les professionnels de la sécurité travaillent autrement : ils tapent des commandes dans un terminal. C'est plus rapide, plus précis et surtout plus puissant, car tout ce que l'on fait à la main peut ensuite être automatisé."
            ),
            p(
              "Trois mots reviennent tout le temps : le terminal est la fenêtre qui affiche le texte, le shell est le programme qui lit tes commandes et les exécute, et le prompt est l'invite qui t'attend, souvent de la forme utilisateur@machine:dossier."
            ),
            code(`alice@blackbox:~$ echo "Bonjour CyberAcademy"\nBonjour CyberAcademy\nalice@blackbox:~$`),
            h("La première commande : echo"),
            p(
              "echo affiche ce qu'on lui donne, comme un écho dans la montagne. C'est la commande idéale pour commencer : elle ne fait rien de dangereux, elle se contente de renvoyer du texte."
            ),
            code(`echo "J'apprends le shell"\nJ'apprends le shell`),
            h("Connaître ta machine"),
            p(
              "Quelques commandes sans risque te renseignent sur l'endroit où tu es. whoami affiche ton nom d'utilisateur, hostname donne le nom de la machine, uname -a décrit le système."
            ),
            code(`whoami\nhostname\nuname -a`),
            h("Bienvenue dans la ligne de commande"),
            list(
              "Le terminal est la fenêtre, le shell est le moteur, le prompt est l'invite.",
              "echo affiche du texte, whoami, hostname et uname -a te situent.",
              "Tu peux taper chaque commande ci-dessus chez toi sans aucun risque."
            ),
            callout(
              "Le réflexe à adopter dès maintenant : un terminal ouvert en permanence, et chaque nouvelle commande testée. C'est en tapant que l'on retient.",
              "tip"
            ),
            callout(
              "Toutes les commandes de ce cours se pratiquent sur ta propre machine ou sur un labo qui t'y autorise (VM, HackTheBox, TryHackMe, les labos CyberAcademy). Tester sans autorisation sur la machine de quelqu'un d'autre est un délit (article 323-1 du code pénal).",
              "danger"
            )
          ]
        },
        {
          id: "linux-lecon-02",
          title: "Les flux : stdin, stdout et stderr",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Chaque programme possède trois tuyaux"),
            p(
              "Quand un programme tourne dans le shell, il communique par trois tuyaux. stdin (l'entrée standard) apporte les données, en général ce que tu tapes au clavier. stdout (la sortie standard) transporte le résultat normal vers l'écran. stderr (la sortie d'erreur) transporte les messages d'erreur, également vers l'écran."
            ),
            code(`stdin  (clavier)   ──▶  [programme]  ──▶  stdout (écran)\n                                   └──▶  stderr (écran)`),
            h("L'analogie du chef"),
            p(
              "Imagine un chef qui reçoit les commandes de la salle (stdin), qui rend les plats au service (stdout) et qui signale un plat raté à la plonge (stderr). Les trois flux servent à des choses différentes, et pouvoir les séparer est précieux."
            ),
            h("stdout et stderr ne se mélangent pas"),
            p(
              "Lance une commande qui fonctionne et une commande qui échoue : les résultats normaux et les erreurs proviennent de tuyaux différents. C'est cette séparation qui permettra de tout rediriger intelligemment."
            ),
            code(`ls /etc/hostname\nls /fichier-inexistant`),
            h("À retenir"),
            list(
              "stdin apporte les données, stdout renvoie le résultat, stderr signale les erreurs.",
              "Les deux sorties s'affichent à l'écran mais restent distinctes.",
              "On peut les rediriger séparément : c'est l'objet de la prochaine leçon."
            ),
            callout(
              "Retiens bien la distinction stdout/stderr : dans les scripts professionnels, on veut souvent tout conserver sauf les erreurs, ou l'inverse.",
              "tip"
            )
          ]
        },
        {
          id: "linux-lecon-03",
          title: "Les redirections : >, >> et 2>",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Enregistrer la sortie dans un fichier"),
            p(
              "Le caractère > redirige la sortie standard vers un fichier au lieu de l'écran. Si le fichier n'existe pas, il est créé ; s'il existe, il est écrasé sans demander ton avis."
            ),
            code(`echo "Bonjour" > notes.txt\ncat notes.txt\nBonjour`),
            h("Ajouter sans écraser : >>"),
            p(
              "Pour compléter un fichier sans perdre son contenu, on utilise >>. C'est comme écrire à la suite d'une page plutôt que de recommencer la page."
            ),
            code(`echo "deuxième ligne" >> notes.txt\ncat notes.txt\nBonjour\ndeuxième ligne`),
            h("Capturer les erreurs : 2>"),
            p(
              "Le flux stderr porte le numéro 2, et stdout le numéro 1. Le caractère 2> redirige donc les erreurs vers un fichier, pendant que les résultats normaux restent à l'écran."
            ),
            code(`ls /fichier-inexistant 2> erreurs.log\ncat erreurs.log`),
            h("Tout mélanger au même endroit : 2>&1"),
            p(
              "L'expression 2>&1 dit au shell : les erreurs vont là où va la sortie normale. Très utile pour garder un journal complet de ce que fait une commande."
            ),
            code(`ls /etc/hostname /fichier-inexistant > journal.txt 2>&1\ncat journal.txt`),
            h("La poubelle magique : /dev/null"),
            p(
              "Quand on veut juste jeter un flux, on le redirige vers /dev/null, un fichier spécial qui avale tout ce qu'on lui donne. Indispensable pour ignorer des erreurs attendues."
            ),
            code(`ls /fichier-inexistant 2>/dev/null`),
            callout(
              "Le danger de > : il écrase sans demander. Si un fichier précieux porte le même nom, il est perdu. Réfléchis toujours avant de rediriger.",
              "warning"
            ),
            callout(
              "Habitude pro : vérifie ce que tu écris avec cat juste après la redirection, et n'écrase jamais un fichier dont tu n'as pas de copie.",
              "tip"
            )
          ]
        },
        {
          id: "linux-lecon-04",
          title: "Le pipe | : enchaîner les commandes",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Faire travailler les commandes ensemble"),
            p(
              "Le caractère | (pipe, tube) branche la sortie standard d'une commande sur l'entrée standard de la suivante. Deux petites commandes réunies font soudain un outil puissant."
            ),
            code(`ls | wc -l`),
            p(
              "Ici, ls liste les fichiers et wc -l compte les lignes. Le pipe fait passer la liste à la commande de comptage : tu obtiens le nombre de fichiers et de dossiers."
            ),
            h("Lire un pipe à voix haute"),
            p(
              "La meilleure façon de comprendre un pipe est de le lire en remplaçant | par « puis ». ls | wc -l se lit : « liste les fichiers, puis compte les lignes »."
            ),
            code(`who | wc -l`),
            h("Enchaîner plusieurs pipes"),
            p(
              "On peut enchaîner autant de pipes que nécessaire. Chaque commande affine le résultat du précédent."
            ),
            code(`cat /etc/passwd | cut -d: -f1 | sort | head -5`),
            p(
              "cat affiche le fichier, cut extrait le premier champ de chaque ligne (le nom de compte), sort les trie, head ne garde que les cinq premiers."
            ),
            h("À retenir"),
            list(
              "Le pipe envoie la sortie d'une commande dans l'entrée de la suivante.",
              "On peut enchaîner des dizaines de pipes.",
              "Un pipe se lit « puis » : affiche, puis trie, puis prend les premiers."
            ),
            callout(
              "Les pipes sont le cœur de la philosophie Unix : des petits outils qui font une chose et la passent au suivant. Ton niveau 0 t'a appris les briques ; ici tu apprends à les assembler.",
              "info"
            )
          ]
        },
        {
          id: "linux-lecon-05",
          title: "Les variables d'environnement",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Des paramètres qui vivent dans le shell"),
            p(
              "Le shell connaît des variables : des noms qui contiennent des valeurs, comme HOME qui contient ton dossier personnel ou USER ton nom d'utilisateur. Pour lire une variable, on fait précéder son nom d'un $."
            ),
            code(`echo $HOME\necho $USER\necho $SHELL`),
            h("La plus célèbre : PATH"),
            p(
              "PATH contient la liste des dossiers où le shell cherche les commandes que tu tapes. Quand tu tapes ls, le shell fouille chaque dossier de PATH jusqu'à trouver un programme nommé ls."
            ),
            code(`echo $PATH`),
            p(
              "Les dossiers sont séparés par des deux-points. Ajouter un dossier à PATH permettra au shell d'y trouver tes commandes personnelles."
            ),
            h("Créer sa propre variable"),
            p(
              "Pour stocker une valeur, on écrit nom=valeur sans espaces autour du signe =, puis on lit la valeur avec $nom."
            ),
            code(`prenom="Alice"\necho $prenom\nAlice`),
            h("Variable de shell ou d'environnement ?"),
            p(
              "Une variable simple n'existe que dans le shell courant. Pour la transmettre aux programmes enfants, on l'exporte avec export. C'est la différence entre variable locale et variable d'environnement."
            ),
            code(`export PROJET=/home/alice/projet\necho $PROJET`),
            h("Les variables utiles du quotidien"),
            list(
              "HOME : ton dossier personnel.",
              "USER : ton nom d'utilisateur.",
              "PATH : où chercher les commandes.",
              "PWD : le dossier où tu te trouves.",
              "LANG : la langue du système."
            ),
            callout(
              "printenv affiche toutes les variables d'environnement, et printenv NOM en affiche une seule. Un réflexe de diagnostic très utile.",
              "tip"
            ),
            callout(
              "Ne stocke jamais de mot de passe ou de clé dans une variable visible dans l'historique : tout ce qui passe par la ligne de commande peut laisser une trace.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-06",
          title: "Personnaliser le shell : .bashrc et les alias",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Un shell qui te ressemble"),
            p(
              "À chaque ouverture d'un terminal, le shell lit le fichier ~/.bashrc (si tu utilises bash) et exécute tout ce qu'il contient. C'est là que l'on configure des raccourcis, des couleurs, des messages d'accueil."
            ),
            h("Créer des alias : des raccourcis de commandes"),
            p(
              "Un alias remplace une commande par une autre. Le célèbre ll pour ls -l en est l'exemple classique."
            ),
            code(`alias ll="ls -l"\nll`),
            h("Le PATH à la maison"),
            p(
              "Tu peux créer un dossier bin dans ta maison et l'ajouter à PATH, pour que tes propres scripts soient trouvés comme les commandes du système."
            ),
            code(`mkdir -p ~/bin\nexport PATH="$HOME/bin:$PATH"`),
            p(
              "L'ajout se fait en premier dans PATH, pour que tes versions personnelles prennent le dessus si le nom existe déjà."
            ),
            h("Éditer et appliquer"),
            p(
              "Ouvre le fichier avec nano, ajoute tes lignes, puis applique-les sans rouvrir de terminal avec source."
            ),
            code(`nano ~/.bashrc\nsource ~/.bashrc`),
            h("À retenir"),
            list(
              "~/.bashrc est exécuté à chaque ouverture de terminal.",
              "Les alias créent des raccourcis, source ~/.bashrc les applique.",
              "Ajouter ~/bin à PATH permet de lancer ses propres scripts."
            ),
            callout(
              "source revient à « recharger » le fichier dans le shell courant. Après une modification, c'est plus rapide que de fermer et rouvrir le terminal.",
              "tip"
            ),
            callout(
              "Ne copie jamais un .bashrc trouvé sur Internet sans l'avoir lu : un fichier de configuration peut contenir du code malveillant qui s'exécute à chaque terminal ouvert.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-07",
          title: "L'historique et la complétion",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("Le shell se souvient de tout"),
            p(
              "Tout ce que tu tapes est mémorisé dans un historique. La commande history affiche les dernières commandes numérotées, et la flèche ↑ permet de les rappeler une à une."
            ),
            code(`history`),
            h("Réutiliser une commande"),
            p(
              "!! rejoue la toute dernière commande, et !42 rejoue la commande numéro 42 de l'historique."
            ),
            code(`!!\n!42`),
            h("Chercher dans l'historique"),
            p(
              "Le raccourci Ctrl+R ouvre une recherche dans l'historique : tape quelques lettres, et le shell retrouve la commande correspondante."
            ),
            code(`history | grep ssh`),
            h("La complétion : l'alliée de tes doigts"),
            p(
              "La touche Tab complète automatiquement les noms de commandes et de fichiers. Tape le début d'un nom puis Tab : le shell propose ou complète. Si plusieurs choix existent, appuie deux fois sur Tab."
            ),
            h("Les raccourcis clavier indispensables"),
            list(
              "Ctrl+R : rechercher dans l'historique.",
              "Ctrl+A / Ctrl+E : aller au début ou à la fin de la ligne.",
              "Ctrl+U : effacer toute la ligne.",
              "Ctrl+C : interrompre la commande en cours.",
              "Ctrl+L : effacer l'écran."
            ),
            callout(
              "La complétion et Ctrl+R font gagner un temps considérable. Les professionnels les utilisent sans même y penser.",
              "tip"
            )
          ]
        },
      ],
    },
    {
      id: "linux-module-2",
      title: "Naviguer et manipuler les fichiers",
      lessons: [
        {
          id: "linux-lecon-08",
          title: "Se repérer : pwd, ls et cd",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Où suis-je ?"),
            p(
              "Quand tu ouvres un terminal, tu te trouves dans un dossier, le plus souvent ton dossier personnel. Pour savoir précisément où tu es, la commande pwd (print working directory) affiche le chemin du dossier courant."
            ),
            code(`pwd\n/home/alice`),
            h("Que contient ce dossier ?"),
            p(
              "ls liste le contenu du dossier courant. Avec des options, elle devient bavarde : ls -l affiche les détails, ls -a montre aussi les fichiers cachés (ceux qui commencent par un point)."
            ),
            code(`ls\nls -l\nls -a`),
            h("Déchiffrer ls -l"),
            p(
              "Chaque ligne de ls -l décrit un élément : type et permissions, nombre de liens, propriétaire, groupe, taille, date de modification et nom."
            ),
            code(`-rw-r--r-- 1 alice alice  42  6 août 14:00 notes.txt\n^ perms  ^     ^      ^taille  ^date      ^nom`),
            h("Se déplacer : cd"),
            p(
              "cd (change directory) change de dossier. cd /var/log amène dans le dossier des journaux système, cd ~ (ou juste cd) revient à la maison."
            ),
            code(`cd /var/log\npwd\ncd ~\npwd`),
            h("Les mouvements essentiels"),
            list(
              "cd .. : remonter d'un niveau.",
              "cd - : revenir au dossier précédent.",
              "cd ~ ou cd : aller dans ta maison.",
              "cd / : aller à la racine."
            ),
            callout(
              "La sortie exacte peut différer selon la distribution, mais le sens reste toujours le même.",
              "tip"
            ),
            callout(
              "On ne teste jamais rm (suppression) sur des fichiers importants. Nous le verrons bientôt : supprime uniquement ce que tu peux perdre.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-09",
          title: "Les chemins : absolus et relatifs",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Deux façons de désigner un fichier"),
            p(
              "Un chemin absolu commence par / et décrit le trajet depuis la racine : /home/alice/notes.txt désigne toujours le même fichier, où que tu sois. Un chemin relatif se calcule depuis le dossier courant : notes.txt signifie « le fichier notes.txt, ici »."
            ),
            code(`cd /home/alice\ncat notes.txt\ncat /home/alice/notes.txt`),
            h("Les trois abréviations magiques"),
            list(
              ". : le dossier courant.",
              ".. : le dossier parent.",
              "~ : ton dossier personnel, où que tu sois."
            ),
            code(`ls .\nls ..\nls ~\nls /`),
            h("L'arborescence Unix"),
            p(
              "Tout part de la racine /, un seul arbre unique. Voici les dossiers que tu croiseras sans cesse."
            ),
            code(`/              racine\n├── /home      dossiers des utilisateurs\n├── /etc       configuration système\n├── /var/log   journaux\n├── /usr/bin   programmes installés\n└── /tmp       fichiers temporaires`),
            h("Le réflexe chemin"),
            p(
              "Les outils de sécurité affichent souvent des chemins absolus dans leurs rapports. Savoir lire /etc/ssh/sshd_config d'un coup d'œil, c'est savoir où l'on cherche et pourquoi."
            ),
            callout(
              "La complétion (Tab) t'aide à écrire des chemins longs sans faute de frappe. Utilise-la systématiquement.",
              "tip"
            )
          ]
        },
        {
          id: "linux-lecon-10",
          title: "Lire des fichiers : cat, less, head et tail",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("cat : afficher un fichier"),
            p(
              "cat (concatenate) affiche le contenu d'un fichier à l'écran. Pratique pour les petits fichiers."
            ),
            code(`cat /etc/hostname\ncat /etc/os-release`),
            h("less : lire les gros fichiers"),
            p(
              "Pour un fichier qui tient sur plusieurs écrans, less affiche une page à la fois. Espace pour descendre, b pour remonter, q pour quitter, et / pour chercher un mot."
            ),
            code(`less /etc/services`),
            h("head et tail : les extrémités"),
            p(
              "head affiche le début d'un fichier, tail la fin. Avec un nombre en option, on précise le nombre de lignes."
            ),
            code(`head -5 /etc/passwd\ntail -10 /var/log/syslog`),
            h("tail -f : suivre un fichier en direct"),
            p(
              "L'option -f (follow) fait défiler un fichier en temps réel au fur et à mesure qu'il grossit. C'est LE réflexe pour surveiller un journal en train de s'écrire. Pour sortir : Ctrl+C."
            ),
            code(`tail -f /var/log/syslog`),
            h("Quand utiliser quoi ?"),
            list(
              "cat : petit fichier, lecture rapide.",
              "less : gros fichier, lecture interactive.",
              "head : juste le début.",
              "tail : la fin, souvent la plus intéressante.",
              "tail -f : surveiller en direct."
            ),
            callout(
              "Sur un serveur, presque tout passe par les journaux : connexions, erreurs, tentatives d'intrusion. tail -f est ton poste d'observation.",
              "tip"
            ),
            callout(
              "tail -f ne se termine jamais seul : il faut l'arrêter avec Ctrl+C. Pas de panique, c'est le comportement normal.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-11",
          title: "Créer et manipuler : touch, mkdir, cp, mv, rm",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("touch : créer un fichier vide"),
            p(
              "touch crée un fichier vide, ou met à jour sa date de modification s'il existe déjà. Simple et sans danger."
            ),
            code(`touch rapport.txt\nls -l rapport.txt`),
            h("mkdir : créer des dossiers"),
            p(
              "mkdir (make directory) crée un dossier. L'option -p crée au passage tous les dossiers intermédiaires manquants."
            ),
            code(`mkdir projet\nmkdir -p projet/src/composants\nls -R projet`),
            h("cp : copier"),
            p(
              "cp copie un fichier. Pour copier un dossier entier et son contenu, il faut l'option -r (récursif)."
            ),
            code(`cp rapport.txt copie.txt\ncp -r projet archive_projet`),
            h("mv : déplacer ou renommer"),
            p(
              "mv déplace un fichier, et si la destination est un nom plutôt qu'un dossier, il le renomme. C'est le couteau suisse des fichiers."
            ),
            code(`mv rapport.txt projet/\nmv copie.txt notes.txt`),
            h("rm : supprimer, et bien y réfléchir"),
            p(
              "rm supprime définitivement, sans corbeille. rm -r supprime un dossier et tout son contenu. Ajoute -i pour que le shell demande confirmation avant chaque suppression."
            ),
            code(`rm notes.txt\nrm -r projet\nrm -ri dossier`),
            callout(
              "rm est définitif : pas de corbeille, pas d'aller-retour. Avant une suppression en cascade, vérifie la liste avec ls, et teste toujours dans un dossier de brouillon (par exemple /tmp).",
              "danger"
            ),
            callout(
              "La combinaison rm -rf sur le mauvais chemin est l'une des erreurs les plus destructrices connues. Tape lentement, vérifie le chemin, et commence par rm -ri tant que tu doutes.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-12",
          title: "Les liens : ln et ln -s",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Deux noms pour une même donnée"),
            p(
              "Un fichier est identifié par un numéro interne, l'inode. Le lien dur (hard link) crée un deuxième nom qui pointe vers le même inode : deux noms, une seule donnée. Si tu modifies l'un, l'autre change aussi."
            ),
            code(`echo "secret" > original.txt\nln original.txt dur.txt\nls -li original.txt dur.txt`),
            p(
              "Les deux fichiers portent le même numéro d'inode (la première colonne de ls -i). Ce sont deux portes vers la même pièce."
            ),
            h("Le lien symbolique : un raccourci"),
            p(
              "Le lien symbolique (symlink) est un petit fichier qui pointe vers un chemin. C'est le raccourci de l'explorateur de fichiers : si la cible disparaît, le raccourci devient cassé."
            ),
            code(`ln -s original.txt raccourci\nls -l raccourci`),
            p(
              "ls -l montre la flèche : raccourci -> original.txt. Le lien symbolique se voit donc immédiatement, contrairement au lien dur."
            ),
            h("Pourquoi s'en servir ?"),
            list(
              "Pointeur stable vers un fichier qui peut changer d'emplacement.",
              "Les distributions Linux en font un usage massif, par exemple /etc/alternatives.",
              "En sécurité, un lien symbolique vers /etc/shadow serait une porte dérobée : on vérifie toujours où pointe un lien."
            ),
            callout(
              "Un lien symbolique ne contient qu'un chemin. Créer un lien ne duplique jamais les données : inutile de s'inquiéter de l'espace disque.",
              "tip"
            ),
            callout(
              "Si tu trouves un lien symbolique étrange sur un serveur (vers /etc/passwd, /etc/shadow ou un dossier sensible), vérifie ce qu'il fait avant de le laisser en place.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-13",
          title: "Les jokers (wildcards)",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Des motifs pour désigner plusieurs fichiers"),
            p(
              "Les jokers permettent de désigner plusieurs fichiers d'un coup. L'étoile * remplace n'importe quelle suite de caractères, ? remplace exactement un caractère, et [abc] remplace une lettre parmi celles listées."
            ),
            code(`ls *.txt\nls rapport?.txt\nls [abc]*.log`),
            h("L'étoile : la plus utilisée"),
            p(
              "*.txt désigne tous les fichiers se terminant par .txt. *.log tous les journaux. * tout court, tout le contenu du dossier."
            ),
            code(`ls *.txt\ncp *.md docs/`),
            h("Les combinaisons"),
            p(
              "On peut combiner : ??-*.backup, *[0-9].txt. Le crochet [0-9] désigne un chiffre, [a-z] une lettre minuscule."
            ),
            h("Vérifier avant d'agir"),
            p(
              "Le shell étend le joker avant d'exécuter la commande : echo * montre exactement ce que la commande suivante recevrait. Un moyen sûr de prévisualiser."
            ),
            code(`echo *\necho *.txt`),
            callout(
              "Quand un motif ne correspond à rien, le shell le laisse tel quel. Un rm *.tmp sans fichier .tmp tenterait de supprimer un fichier nommé « *.tmp ».",
              "tip"
            ),
            callout(
              "rm * efface tout ce qu'il voit. Avant une suppression par joker, fais toujours un echo * d'abord, et reste dans un dossier de brouillon.",
              "warning"
            )
          ]
        },
      ],
    },
    {
      id: "linux-module-3",
      title: "Rechercher, transformer, surveiller",
      lessons: [
        {
          id: "linux-lecon-14",
          title: "Chercher : grep, find et locate",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("grep : chercher un motif dans des fichiers"),
            p(
              "grep affiche les lignes qui contiennent un motif. C'est l'outil de recherche par contenu le plus utilisé au monde : dans un log, une config, un rapport."
            ),
            code(`grep "root" /etc/passwd`),
            h("Les options qui changent tout"),
            list(
              "-i : ignorer la casse (Root = root).",
              "-w : mot entier seulement (pas « roots »).",
              "-v : lignes qui ne contiennent PAS le motif.",
              "-r : parcourir un dossier entier, récursivement.",
              "-n : afficher le numéro de ligne."
            ),
            code(`grep -i "erreur" /var/log/syslog\ngrep -w "port" config.txt\ngrep -v "^#" /etc/ssh/sshd_config`),
            h("find : chercher par nom, taille ou date"),
            p(
              "find parcourt réellement l'arborescence et trouve des fichiers selon leurs caractéristiques : nom, type, taille, date."
            ),
            code(`find /home -name "*.conf"\nfind / -name "flag.txt" 2>/dev/null\nfind /var -size +100M\nfind /tmp -mtime -1`),
            h("locate : la base indexée"),
            p(
              "locate interroge une base de données construite à l'avance par updatedb : instantané, mais pas forcément à jour. Parfait quand on se souvient du nom d'un fichier."
            ),
            code(`sudo updatedb\nlocate sshd_config`),
            callout(
              "grep cherche dans les fichiers, find cherche des fichiers, locate cherche vite dans une base. Trois outils, trois situations.",
              "tip"
            ),
            callout(
              "find / balaye toute la machine et peut prendre du temps. Restreins toujours ta recherche à la zone utile, et pense à 2>/dev/null pour ignorer les dossiers interdits.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-15",
          title: "Transformer le texte : sed, awk, cut et tr",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("sed : remplacer dans le flux"),
            p(
              "sed (stream editor) transforme du texte ligne par ligne. La commande s/ancien/nouveau/ remplace la première occurrence de chaque ligne."
            ),
            code(`echo "chat chien" | sed "s/chat/renard/"`),
            h("sed en direct sur un fichier : -i"),
            p(
              "Sans option, sed écrit sur la sortie sans toucher au fichier. Avec -i, il modifie le fichier directement. À utiliser avec précaution, car c'est irréversible."
            ),
            code(`sed -i "s/ancien/nouveau/" fichier.txt`),
            h("cut : découper en colonnes"),
            p(
              "cut extrait des morceaux de chaque ligne. -d: choisit le séparateur deux-points, -f1 garde le premier champ. Indispensable avec des fichiers comme /etc/passwd."
            ),
            code(`cut -d: -f1 /etc/passwd`),
            h("tr : transformer des caractères"),
            p(
              "tr remplace des caractères par d'autres, ou en supprime. tr «a-z» «A-Z» met tout en majuscules, tr -d supprime."
            ),
            code(`echo "cyberacademy" | tr "a-z" "A-Z"\necho "a bb c" | tr -s " "`),
            h("awk : découper et agréger"),
            p(
              "awk est plus puissant : il découpe chaque ligne en champs ($1, $2...) et peut calculer. C'est l'outil des analystes de logs."
            ),
            code(`awk -F: '{print $1}' /etc/passwd\nawk '{print NR, $1}' fichier.txt`),
            callout(
              "Ces outils s'assemblent par des pipes : grep pour filtrer, cut pour extraire, sort pour trier. C'est exactement le « puis » du pipe.",
              "tip"
            ),
            callout(
              "sed -i est définitif. Entraîne-toi d'abord sans -i, en regardant la sortie à l'écran, avant de modifier de vrais fichiers.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-16",
          title: "Archiver et compresser : tar, gzip et zip",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Archiver n'est pas compresser"),
            p(
              "Archiver, c'est rassembler plusieurs fichiers en un seul conteneur. Compresser, c'est réduire la taille des données. On fait souvent les deux à la fois."
            ),
            h("tar : le conteneur universel"),
            p(
              "tar (tape archive) rassemble des fichiers. Les options classiques : -c créer, -x extraire, -t lister, -z compresser avec gzip, -v détailler, -f nommer le fichier."
            ),
            code(`tar -czvf archive.tar.gz dossier/\ntar -tzvf archive.tar.gz\ntar -xzvf archive.tar.gz`),
            p(
              "On lit souvent -czvf comme un mot : « crée une archive gzippée, verbeuse, dans ce fichier »."
            ),
            h("gzip : compresser un fichier"),
            p(
              "gzip compresse un fichier tout seul et l'ajoute .gz. gunzip fait l'inverse."
            ),
            code(`gzip rapport.txt\ngunzip rapport.txt.gz`),
            h("zip : le format de partage"),
            p(
              "zip et unzip parlent le format le plus répandu, celui qu'on échange avec les autres systèmes."
            ),
            code(`zip -r archive.zip dossier/\nunzip archive.zip`),
            h("Vérifier avant d'extraire"),
            p(
              "Lister une archive avant de l'extraire est un réflexe de sécurité : on sait exactement ce qui va atterrir sur le disque."
            ),
            code(`tar -tzvf archive.tar.gz\nunzip -l archive.zip`),
            callout(
              "Une archive reçue de l'extérieur peut contenir des chemins piégés (../../etc). Lis toujours la liste avant d'extraire, et extrais dans un dossier vide.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-17",
          title: "Les processus : ps, top, kill et crontab",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Un processus, c'est un programme qui tourne"),
            p(
              "Chaque programme en cours d'exécution est un processus, identifié par un numéro : le PID (process ID). Voir les processus, c'est voir ce que la machine est en train de faire."
            ),
            code(`ps aux\nps -ef`),
            h("Lire ps aux"),
            p(
              "Les colonnes principales : USER (le propriétaire), PID, %CPU et %MEM (consommation), et COMMAND (la commande lancée). C'est le premier réflexe quand la machine est lente."
            ),
            h("top : la vue en direct"),
            p(
              "top rafraîchit l'affichage en continu, trié par consommation. Touche P pour trier par CPU, M par mémoire, q pour quitter."
            ),
            code(`top`),
            h("Arrêter un processus : kill"),
            p(
              "kill envoie un signal au processus. Par défaut, le signal 15 (TERM) demande poliment d'arrêter. Le signal 9 (KILL) force l'arrêt, sans donner la moindre chance de sauvegarder."
            ),
            code(`kill 1234\nkill -9 1234\nkillall firefox`),
            h("Lancer en arrière-plan"),
            p(
              "Ajouter & à la fin d'une commande la lance en arrière-plan : le shell redevient disponible immédiatement. pgrep permet de retrouver des processus par leur nom."
            ),
            code(`sleep 300 &\npgrep -a sleep`),
            h("Planifier avec crontab"),
            p(
              "crontab -e ouvre l'éditeur des tâches planifiées. Chaque ligne suit le format : minutes, heures, jour du mois, mois, jour de la semaine, commande."
            ),
            code(`crontab -e\n0 3 * * * /home/alice/sauvegarde.sh`),
            callout(
              "La ligne ci-dessus lance la sauvegarde tous les jours à 3 h du matin. Cinq champs séparés par des espaces : minute, heure, jour du mois, mois, jour de la semaine.",
              "info"
            ),
            callout(
              "kill -9 est le dernier recours : un processus interrompu en plein travail peut corrompre ses fichiers. Essaye toujours le signal poli (15) d'abord.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-18",
          title: "Les ressources : df, du, free et lsof",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le disque plein ? df"),
            p(
              "df (disk free) montre l'utilisation des partitions. L'option -h affiche des tailles lisibles (Go, Mo)."
            ),
            code(`df -h`),
            h("Qui prend de la place ? du"),
            p(
              "du (disk usage) estime la taille des dossiers. -sh donne le total d'un dossier, et le tri avec sort -h classe par taille croissante."
            ),
            code(`du -sh /var/log\ndu -sh * | sort -h`),
            h("La mémoire : free"),
            p(
              "free affiche la mémoire vive et le swap. -h rend la lecture humaine."
            ),
            code(`free -h`),
            h("Les fichiers ouverts : lsof"),
            p(
              "lsof liste les fichiers ouverts par les processus. En sécurité, c'est un bijou : lsof -i montre les connexions réseau, lsof -p <PID> les fichiers qu'utilise un processus."
            ),
            code(`lsof -i\nlsof -p 1234`),
            h("Cas pratique : le disque qui déborde"),
            p(
              "Quand un serveur rame, on cherche en deux temps : df -h pour confirmer que le disque est plein, puis du -sh pour trouver le dossier fautif."
            ),
            code(`df -h\ndu -sh /* 2>/dev/null | sort -h`),
            callout(
              "Un fichier supprimé mais encore ouvert continue d'occuper le disque. lsof +L1 affiche ces fichiers « fantômes » qui trahissent souvent un processus à redémarrer.",
              "tip"
            )
          ]
        },
        {
          id: "linux-lecon-19",
          title: "Les permissions : chmod, chown, umask et les bits spéciaux",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Rappel : lecture, écriture, exécution"),
            p(
              "Chaque fichier possède des permissions pour trois catégories : le propriétaire (u), le groupe (g) et les autres (o). Chaque catégorie peut lire (r), écrire (w) et exécuter (x)."
            ),
            code(`-rw-r--r-- 1 alice alice 42  6 août 14:00 notes.txt\n │ │└┴┘ └┴┘\n │ │  └── groupe\n │ └──── propriétaire\n └────── type (- fichier, d dossier)`),
            h("chmod en symbolique"),
            p(
              "chmod modifie les permissions. On désigne la catégorie, le signe (+ pour ajouter, - pour retirer) et le droit."
            ),
            code(`chmod u+x script.sh\nchmod g-w fichier.txt\nchmod a+r rapport.txt`),
            h("chmod en octal : les trois chiffres"),
            p(
              "On peut aussi chiffrer les droits : r=4, w=2, x=1, et on additionne. 750 signifie rwx pour le propriétaire, r-x pour le groupe, rien pour les autres."
            ),
            code(`chmod 750 script.sh\nchmod 600 cle_privee\nchmod 644 index.html`),
            h("chown : changer le propriétaire"),
            p(
              "chown change le propriétaire (et le groupe avec la forme propriétaire:groupe). Souvent réservé au superutilisateur."
            ),
            code(`sudo chown alice:alice fichier.txt`),
            h("umask : les droits par défaut"),
            p(
              "umask définit les permissions retirées à la création de chaque nouveau fichier. Le 022 classique donne 755 pour les dossiers et 644 pour les fichiers."
            ),
            code(`umask\numask 022`),
            h("Les bits spéciaux : SUID, SGID, sticky"),
            list(
              "SUID (4) : le programme s'exécute avec l'identité de son propriétaire, comme /usr/bin/passwd.",
              "SGID (2) : héritage du groupe du dossier pour les nouveaux fichiers.",
              "Sticky (1) : dans un dossier, seuls le propriétaire et root peuvent supprimer, comme dans /tmp."
            ),
            code(`ls -l /usr/bin/passwd\nls -ld /tmp\nfind / -type f -perm -4000 2>/dev/null`),
            callout(
              "Un fichier SUID qui n'a rien à y faire est une porte dérobée classique : il permet d'exécuter du code avec les droits d'un autre. Sur un serveur, find -perm -4000 est un réflexe d'audit.",
              "danger"
            ),
            callout(
              "Une clé privée SSH doit être en 600 : lisible et modifiable par toi seul. En 644, tout le monde peut la lire, et donc se connecter à ta place.",
              "tip"
            )
          ]
        },
      ],
    },
    {
      id: "linux-module-4",
      title: "Réseau, utilisateurs et scripts",
      lessons: [
        {
          id: "linux-lecon-20",
          title: "Le réseau local de base",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Qui suis-je sur le réseau ?"),
            p(
              "Avant de toucher au réseau, on se présente. hostname donne le nom de la machine, hostname -I son adresse IP, et ip a détaille toutes les interfaces."
            ),
            code(`hostname\nhostname -I\nip a`),
            h("La passerelle : la porte de sortie"),
            p(
              "ip route affiche la table de routage. La ligne default via <adresse> montre la passerelle, par laquelle part tout le trafic vers l'extérieur."
            ),
            code(`ip route`),
            h("La cible est-elle vivante ? ping"),
            p(
              "ping envoie une sonde ICMP et attend la réponse. -c 4 envoie quatre paquets puis s'arrête. C'est le test de présence par excellence."
            ),
            code(`ping -c 4 127.0.0.1\nping -c 4 <passerelle>`),
            h("Qui écoute sur quels ports ? ss"),
            p(
              "ss liste les connexions et les ports en écoute. -t TCP, -u UDP, -l en écoute, -p le processus, -n sans résolution de nom."
            ),
            code(`ss -tulpn`),
            h("De l'adresse au nom : host et dig"),
            p(
              "host et dig transforment un nom en adresse IP (résolution DNS). C'est l'outil de recon le plus basique qui existe."
            ),
            code(`host example.com\ndig +short example.com`),
            callout(
              "Toutes ces commandes s'observent sur ta propre machine sans aucune autorisation spéciale : ip a, ss, ping 127.0.0.1. Rien de plus tant que tu n'as pas de contrat.",
              "info"
            ),
            callout(
              "Scanner, tester ou ping une machine qui ne t'appartient pas sans autorisation écrite est un délit (article 323-1 du code pénal). Le réseau s'apprend chez soi ou sur un labo autorisé.",
              "danger"
            )
          ]
        },
        {
          id: "linux-lecon-21",
          title: "Utilisateurs, groupes et sudo",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Linux est multi-utilisateurs"),
            p(
              "Plusieurs personnes partagent la même machine, chacune avec son compte. Les commandes whoami et id disent qui tu es, who et last montrent qui est connecté."
            ),
            code(`whoami\nid\nwho\nlast`),
            h("Où sont stockés les comptes ?"),
            p(
              "Le fichier /etc/passwd liste les comptes et leurs dossiers personnels. Les mots de passe, eux, sont dans /etc/shadow, lisible uniquement par root."
            ),
            code(`cat /etc/passwd\nsudo cat /etc/shadow`),
            h("Les groupes : des permissions partagées"),
            p(
              "Un groupe est une équipe. groups affiche tes groupes, /etc/group les liste tous. On donne souvent l'accès à un dossier via le groupe plutôt qu'individuellement."
            ),
            code(`groups\ncat /etc/group`),
            h("Gérer les comptes"),
            p(
              "useradd crée un utilisateur, passwd fixe son mot de passe, groupadd crée un groupe, usermod -aG ajoute un utilisateur à un groupe. Ces opérations demandent les droits de root."
            ),
            code(`sudo useradd -m -s /bin/bash carl\nsudo passwd carl\nsudo groupadd equipe\nsudo usermod -aG equipe alice`),
            h("sudo : le pouvoir avec modération"),
            p(
              "sudo exécute une commande en tant que root, après vérification du mot de passe. sudo -l montre ce que ton compte a le droit de faire."
            ),
            code(`sudo -l\nsudo whoami`),
            callout(
              "Le principe du moindre privilège : un utilisateur n'a que les droits nécessaires à son travail. sudo n'est pas un jouet, et le compte root n'est pas destiné au quotidien.",
              "danger"
            ),
            callout(
              "Jamais de mot de passe en clair dans une commande : il apparaîtrait dans l'historique et dans ps aux. Les outils demandent le mot de passe de façon interactive pour une bonne raison.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-22",
          title: "Les variables Bash en profondeur",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Les guillemets font la différence"),
            p(
              "Les guillemets doubles laissent le shell développer les variables ; les apostrophes les figent. Compare :"
            ),
            code(`prenom="Alice"\necho "Bonjour $prenom"\necho 'Bonjour $prenom'`),
            h("Récupérer la sortie d'une commande"),
            p(
              "On peut stocker le résultat d'une commande dans une variable avec $( ). C'est la substitution de commandes."
            ),
            code(`aujourdhui=$(date)\necho $aujourdhui`),
            h("Les paramètres positionnels"),
            p(
              "Dans un script, $1, $2, ... contiennent les arguments passés à la ligne de commande, et $# leur nombre."
            ),
            code(`./script.sh cible.txt\n# dans le script : $1 = cible.txt, $# = 1`),
            h("Les valeurs par défaut"),
            p(
              "L'expression \${nom:-valeur} utilise la valeur si la variable est définie, sinon la valeur de secours. Très utile pour des scripts robustes."
            ),
            code(`echo \${PORT:-8080}\nPORT=9000\necho \${PORT:-8080}`),
            h("Attention aux espaces et aux caractères spéciaux"),
            list(
              "Pas d'espaces autour du signe = : nom=valeur et non nom = valeur.",
              "Un espace dans une valeur se protège par des guillemets.",
              "Le point-virgule sépare deux commandes sur une même ligne.",
              "$(( )) réalise un calcul : $(( 5 + 3 ))."
            ),
            code(`taille=$(( 5 + 3 ))\necho $taille`),
            callout(
              "Les erreurs classiques viennent des espaces et de l'oubli des guillemets. Quand une valeur contient des espaces, mets toujours les guillemets autour.",
              "tip"
            )
          ]
        },
        {
          id: "linux-lecon-23",
          title: "Les conditions : if, test et [ ]",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Faire des choix dans le shell"),
            p(
              "Le shell peut exécuter du code seulement si une condition est vraie. La syntaxe : if [ condition ]; then ... fi."
            ),
            code(`if [ -f /etc/hostname ]; then\n  echo "Le fichier existe"\nfi`),
            h("Lire la syntaxe"),
            list(
              "if : ouvre le test.",
              "[ condition ] : le test, avec des espaces obligatoires.",
              "then : ce qui s'exécute si la condition est vraie.",
              "fi : ferme le bloc (if écrit à l'envers)."
            ),
            h("Les tests de fichiers les plus utiles"),
            code(`[ -f fichier ]   vrai si c'est un fichier\n[ -d dossier ]    vrai si c'est un dossier\n[ -r fichier ]    vrai si lisible\n[ -x fichier ]    vrai si exécutable`),
            h("if / elif / else"),
            p(
              "else gère le cas contraire, elif enchaîne un autre test."
            ),
            code(`if [ -f /etc/ssh/sshd_config ]; then\n  echo "Serveur SSH configuré"\nelif [ -d /etc/ssh ]; then\n  echo "Dossier présent, fichier absent"\nelse\n  echo "Pas de SSH ici"\nfi`),
            h("Comparer des valeurs"),
            p(
              "Pour les nombres : -eq (égal), -ne (différent), -gt (plus grand), -lt (plus petit). Pour les chaînes : = et !=. Le ! inverse un test."
            ),
            code(`[ 5 -gt 3 ] && echo "cinq est plus grand"\nnom="alice"\nif [ "$nom" = "alice" ]; then echo "Salut Alice"; fi`),
            callout(
              "Les espaces autour des crochets et du signe = sont obligatoires : [ -f fichier ] est correct, [-f fichier] ne l'est pas. C'est la première source d'erreur en scripting.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-24",
          title: "Les boucles : for et while",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Répéter sans se fatiguer"),
            p(
              "Une boucle exécute un bloc plusieurs fois. La boucle for parcourt une liste de valeurs."
            ),
            code(`for fichier in *.txt; do\n  echo "Fichier : $fichier"\ndone`),
            h("Parcourir une liste d'adresses"),
            p(
              "La boucle for s'adapte à n'importe quelle liste, y compris les adresses IP : c'est le début de l'automatisation en sécurité."
            ),
            code(`for ip in 192.168.1.1 192.168.1.2 192.168.1.3; do\n  ping -c 1 $ip\ndone`),
            h("while : tant que la condition est vraie"),
            p(
              "while répète le bloc tant que la condition reste vraie. Avec la lecture d'un fichier ligne par ligne, on traite des listes entières."
            ),
            code(`while read ligne; do\n  echo "Lu : $ligne"\ndone < liste.txt`),
            h("Piloter les boucles"),
            list(
              "break : sortir immédiatement de la boucle.",
              "continue : passer directement à l'itération suivante.",
              "Ctrl+C : interrompre une boucle infinie."
            ),
            code(`for n in 1 2 3 4 5; do\n  [ "$n" -eq 3 ] && continue\n  echo $n\ndone`),
            callout(
              "Boucle + find ou boucle + grep, et tu viens d'automatiser une tâche d'audit entière. Ce niveau 1 pose exactement ces briques.",
              "tip"
            ),
            callout(
              "Une boucle mal écrite peut tourner à l'infini. Garde toujours Ctrl+C à portée de main et teste sur des listes minuscules d'abord.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-25",
          title: "Écrire des scripts et des fonctions",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("De l'interactif au fichier"),
            p(
              "Un script est un fichier qui contient des commandes exécutées l'une après l'autre. On le crée avec un éditeur, puis on le lance comme un programme."
            ),
            code(`#!/bin/bash\necho "Démarrage de l'audit"\nwhoami\ndate`),
            h("La première ligne : le shebang"),
            p(
              "#!/bin/bash indique au système quel interpréteur utiliser pour ce script. C'est la toute première ligne, sans espace au début."
            ),
            h("Rendre le script exécutable"),
            p(
              "Un script est d'abord un texte. On lui donne le droit d'exécution avec chmod +x, puis on le lance avec ./."
            ),
            code(`chmod +x audit.sh\n./audit.sh`),
            h("Recevoir des arguments"),
            p(
              "Les arguments passés au script se retrouvent dans $1, $2... Le script devient réutilisable : la cible change, le script reste."
            ),
            code(`#!/bin/bash\necho "Cible : $1"\nping -c 4 "$1"`),
            h("Créer des fonctions"),
            p(
              "Une fonction regroupe des commandes sous un nom, pour les réutiliser dans le script."
            ),
            code(`salutation() {\n  echo "Bonjour, $1 !"\n}\nsalutation "Alice"\nsalutation "Bob"`),
            h("Les bonnes pratiques du débutant"),
            list(
              "Lire entièrement un script avant de l'exécuter.",
              "Tester sur un petit échantillon avant la vraie cible.",
              "set -e arrête le script à la première erreur.",
              "Le code de sortie d'une commande se lit avec echo $?."
            ),
            code(`set -e\nls /fichier-inexistant\necho $?`),
            callout(
              "Ne lance jamais un script trouvé sur Internet ou reçu d'un inconnu sans l'avoir lu ligne par ligne : un script peut tout faire sur ta machine.",
              "danger"
            ),
            callout(
              "set -e évite les erreurs silencieuses : dès qu'une commande échoue, le script s'arrête au lieu de continuer avec des données douteuses.",
              "tip"
            )
          ]
        },
        {
          id: "linux-lecon-26",
          title: "tmux et screen : des sessions qui survivent",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le problème : la session coupée"),
            p(
              "Quand tu te connectes à un serveur en SSH et que la connexion tombe, tout ce qui tournait dans le terminal s'arrête. Une analyse de plusieurs heures, perdue. La solution s'appelle tmux : des sessions qui survivent à la déconnexion."
            ),
            h("tmux en quatre commandes"),
            code(`tmux new -s pentest\ntmux ls\ntmux attach -t pentest\n# détacher : Ctrl+b puis d`),
            h("Le réflexe détacher"),
            p(
              "Dans une session tmux, Ctrl+b puis d la détache : le terminal se referme, mais la session continue de tourner en arrière-plan. On la retrouve avec tmux attach -t pentest, même depuis un autre ordinateur."
            ),
            h("Les fenêtres et les panneaux"),
            list(
              "Ctrl+b c : nouvelle fenêtre (un peu un onglet).",
              "Ctrl+b n / p : fenêtre suivante / précédente.",
              "Ctrl+b % : panneau vertical.",
              "Ctrl+b \" : panneau horizontal.",
              "Ctrl+b , : renommer la fenêtre."
            ),
            h("screen : l'alternative plus simple"),
            p(
              "screen propose le même principe avec une syntaxe proche : screen -S nom pour créer, screen -r nom pour reprendre."
            ),
            code(`screen -S session\nscreen -r session`),
            callout(
              "Sur une mission réelle, tout se lance dans tmux : l'énumération, l'exploitation, le journal. Si la connexion saute, rien n'est perdu.",
              "tip"
            ),
            callout(
              "Entraîne-toi maintenant, en local, avant d'en avoir besoin : la première vraie session n'est pas le moment d'apprendre les raccourcis.",
              "warning"
            )
          ]
        },
      ],
    },
    {
      id: "linux-module-5",
      title: "Mise en pratique et validation",
      lessons: [
        {
          id: "linux-lecon-27",
          title: "Démonstrations pratiques",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Un chantier complet dans le terminal"),
            p(
              "Mets en œuvre tout ce que tu as appris dans un petit projet, dans un dossier de brouillon. On construit, on manipule, on analyse."
            ),
            code(`mkdir -p ~/labo/{logs,docs,tmp}\ncd ~/labo\ntouch logs/{app,erreur}.log\necho "erreur: connexion refusée" > logs/erreur.log\nls -R`),
            h("Analyser des journaux en pipeline"),
            p(
              "Reprends le pipe : filtre les erreurs, compte les occurrences, trie les plus fréquentes."
            ),
            code(`grep -i "erreur" logs/*.log | sort | uniq -c | sort -rn`),
            h("Fabriquer un rapport"),
            p(
              "Redirige le résultat vers un fichier, puis vérifie son contenu."
            ),
            code(`grep -c "erreur" logs/*.log > rapport.txt\ncat rapport.txt`),
            h("Observer la machine"),
            p(
              "Trie les processus par consommation de CPU, prends les cinq premiers."
            ),
            code(`ps aux --sort=-%cpu | head -5`),
            h("Nettoyer"),
            p(
              "Une fois le labo terminé, on le supprime proprement."
            ),
            code(`cd ~\nrm -r ~/labo`),
            callout(
              "Refais ces gestes jusqu'à ce qu'ils deviennent des réflexes : les démos répétées sont ce qui construit la mémoire du pentester.",
              "tip"
            ),
            callout(
              "Travaille toujours dans ~/labo ou /tmp. Ne joue jamais avec des commandes de ce genre dans des dossiers système.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-28",
          title: "Cas réel : une machine compromise",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Le scénario"),
            p(
              "Tu viens d'obtenir un premier accès à une machine Linux, dans le cadre d'un contrat d'audit autorisé. Voici la méthode minimale d'exploration d'un système : se présenter, regarder, chercher, écouter."
            ),
            h("1. Qui suis-je, quels droits ai-je ?"),
            code(`id\nwhoami\nsudo -l\nhostname`),
            h("2. Où sont les fichiers intéressants ?"),
            p(
              "On cherche les fichiers de configuration, les fichiers cachés, les scripts de sauvegarde. Les fichiers .env contiennent souvent des secrets de connexion."
            ),
            code(`find /home -type f -name "*.conf" 2>/dev/null\nfind / -name ".env" 2>/dev/null\ngrep bash /etc/passwd`),
            h("3. Qui écoute sur la machine ?"),
            code(`ss -tulpn`),
            h("4. Chercher des secrets mal gardés"),
            code(`grep -rn "password" /home/alice/ 2>/dev/null | head`),
            h("5. Documenter, encore documenter"),
            p(
              "Chaque commande va dans un journal : c'est la base du rapport final. En pentest, on ne se souvient pas, on consigne."
            ),
            list(
              "Identifier l'utilisateur et ses droits avant toute chose.",
              "Chercher les fichiers de configuration et les secrets.",
              "Écouter les ports ouverts et les connexions actives.",
              "Tout consigner : date, commande, sortie."
            ),
            callout(
              "Ce scénario est fictif et ne vaut que sur une machine que tu possèdes ou qu'un contrat autorise. Refaire ces commandes sur une machine tiers sans autorisation écrite est un délit puni par l'article 323-1 du code pénal.",
              "danger"
            )
          ]
        },
        {
          id: "linux-lecon-29",
          title: "Chasse au trésor avec find",
          type: "exercise",
          duration: "15 min",
          blocks: [
            h("L'exercice"),
            p(
              "Construis un terrain de jeu puis retrouve des fichiers cachés grâce à find. Tout se passe dans ton dossier de brouillon."
            ),
            code(`mkdir -p ~/labo/treasure/data\ncd ~/labo/treasure\ntouch backup.tar.gz .env config.old note.txt\ncd data\ntouch user.txt admin.txt config.txt\ncd ..`),
            h("Objectif 1 : les archives"),
            p(
              "Trouve tous les fichiers .gz ou .tar.gz de l'arbre."
            ),
            code(`find . -name "*.gz"`),
            h("Objectif 2 : les fichiers cachés"),
            p(
              "Retrouve les fichiers qui commencent par un point, mais seulement les fichiers, pas les dossiers."
            ),
            code(`find . -name ".*" -type f`),
            h("Objectif 3 : par la date et la taille"),
            p(
              "Trouve les fichiers modifiés aujourd'hui, puis ceux qui dépassent une certaine taille."
            ),
            code(`find . -mtime -1\nfind . -size +10k`),
            h("Objectif 4 : les motifs combinés"),
            p(
              "Une seule commande pour trouver les fichiers de configuration OU les fichiers cachés : les parenthèses regroupent, -o signifie « ou »."
            ),
            code(`find . -type f \\( -name "*.conf" -o -name ".*" \\)`),
            h("Bonus pentester : les SUID"),
            p(
              "Sur une vraie machine, ce piège de permissions se trouve en une commande."
            ),
            code(`find / -type f -perm -4000 2>/dev/null`),
            callout(
              "2>/dev/null fait taire les erreurs de permission et rend la sortie lisible. C'est le petit geste qui change tout.",
              "tip"
            ),
            callout(
              "Reste dans ~/labo pour les exercices. Un find sur tout le système avec des motifs larges peut être très long et très bavard.",
              "warning"
            )
          ]
        },
        {
          id: "linux-lecon-30",
          title: "Quiz final — Linux Fundamentals",
          type: "quiz",
          duration: "8 min",
          blocks: [
            p(
              "Dernière étape avant le niveau suivant. Tu dois obtenir au moins 80 % de bonnes réponses pour valider ce niveau et gagner tes 750 XP."
            ),
            callout(
              "Relis les leçons qui te semblent floues avant de répondre : tout ce qui est demandé a été vu dans ce niveau."
            ),
          ],
          quiz: [
            {
              question: "Quel caractère envoie la sortie d'une commande vers un fichier ?",
              options: ["|", ">", "&", "%"],
              answer: 1,
              explanation:
                "> redirige la sortie standard vers un fichier. | envoie la sortie vers la commande suivante.",
            },
            {
              question: "Que fait la commande pwd ?",
              options: [
                "Elle affiche le mot de passe de l'utilisateur",
                "Elle change de mot de passe",
                "Elle affiche le chemin du dossier courant",
                "Elle supprime le dossier courant",
              ],
              answer: 2,
              explanation:
                "pwd (print working directory) affiche le chemin du dossier où l'on se trouve.",
            },
            {
              question: "Quelle commande liste les fichiers en affichant aussi les fichiers cachés ?",
              options: ["ls -a", "cat -l", "cd -a", "pwd -a"],
              answer: 0,
              explanation:
                "ls -a affiche tout, y compris les éléments qui commencent par un point.",
            },
            {
              question: "Que crée la commande ln -s original raccourci ?",
              options: [
                "Une copie complète du fichier original",
                "Un lien symbolique qui pointe vers original",
                "Un dossier nommé raccourci",
                "Un fichier compressé",
              ],
              answer: 1,
              explanation:
                "ln -s crée un lien symbolique, un raccourci vers la cible. Les données ne sont pas dupliquées.",
            },
            {
              question: "Quelle commande affiche les ports en écoute sur la machine ?",
              options: ["ls -l", "ss -tulpn", "echo $PORT", "free -h"],
              answer: 1,
              explanation:
                "ss -tulpn montre les connexions et les ports en écoute, avec le processus concerné.",
            },
            {
              question: "Que signifie chmod 600 pour un fichier ?",
              options: [
                "Lecture et écriture pour le propriétaire uniquement",
                "Tout le monde peut le lire et l'exécuter",
                "Le fichier est supprimé",
                "Le fichier devient exécutable par tous",
              ],
              answer: 0,
              explanation:
                "6 = rw pour le propriétaire, 0 pour le groupe, 0 pour les autres : personne d'autre n'y accède.",
            },
            {
              question: "Quel fichier est exécuté à l'ouverture d'un terminal bash ?",
              options: ["/etc/passwd", "~/.bashrc", "~/.ssh", "/var/log"],
              answer: 1,
              explanation:
                "~/.bashrc est relu à chaque nouveau terminal. On y place alias et variables personnelles.",
            },
            {
              question: "Dans un script, que fait la première ligne #!/bin/bash ?",
              options: [
                "Elle commente le script entier",
                "Elle indique l'interpréteur à utiliser",
                "Elle supprime le fichier",
                "Elle change les permissions",
              ],
              answer: 1,
              explanation:
                "Le shebang #! indique au système quel programme (ici bash) doit exécuter le script.",
            },
            {
              question: "Quelle commande surveille un journal qui s'écrit en temps réel ?",
              options: ["cat /var/log", "tail -f /var/log/syslog", "ls -l", "ps aux"],
              answer: 1,
              explanation:
                "tail -f suit le fichier et affiche les nouvelles lignes au fur et à mesure. On sort avec Ctrl+C.",
            },
            {
              question: "Que fait le pipe | entre deux commandes ?",
              options: [
                "Il exécute les deux commandes en même temps",
                "Il envoie la sortie de la première vers l'entrée de la seconde",
                "Il supprime la première commande",
                "Il compare les deux commandes",
              ],
              answer: 1,
              explanation:
                "Le pipe connecte la sortie standard d'une commande à l'entrée standard de la suivante.",
            },
          ],
        },
        {
          id: "linux-lecon-31",
          title: "Cap sur le niveau 2 — Networking",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("Pourquoi le réseau maintenant ?"),
            p(
              "Tu sais piloter une machine Linux de fond en comble : fichiers, processus, permissions, scripts. Mais une machine isolée ne fait pas un système d'information. Un pentester n'entre jamais par la fenêtre : il se connecte au réseau. C'est le niveau 2."
            ),
            h("Ce que tu maîtrises désormais"),
            list(
              "Le shell et ses flux : redirections, pipes, variables, historique.",
              "La navigation et la manipulation des fichiers et des permissions.",
              "La recherche et la transformation de texte : grep, find, sed, awk.",
              "L'observation de la machine : processus, ressources, ports, comptes.",
              "Les premières briques de script et de gestion de sessions."
            ),
            h("Le niveau 2 t'attend"),
            p(
              "Le prochain niveau plonge dans l'architecture réseau : le modèle OSI, TCP/IP, les adresses IP, le DNS, le protocole HTTP et l'analyse de trafic avec tcpdump."
            ),
            h("Le pont entre les deux niveaux"),
            p(
              "Tout ce que tu as appris ici sera réutilisé : ping, ip, ss et les pipes deviennent la matière première de l'analyse réseau. Un log d'attaque se lit avec grep, une liste d'adresses se trie avec sort et cut."
            ),
            callout(
              "Petit avant-goût : le niveau 2 commence par une simple question — comment savoir si une machine est vivante sur le réseau ? La réponse utilise exactement les outils que tu manipules déjà.",
              "info"
            ),
            h("Ce qu'il faut retenir de ce niveau"),
            list(
              "Tout se pilote en ligne de commande, et tout peut se rediriger et s'enchaîner.",
              "Chaque action s'observe et se documente sur sa propre machine.",
              "Les permissions et les processus expliquent 80 % des incidents.",
              "Le niveau 2 transforme ces gestes en lecture du réseau."
            )
          ],
        },
      ],
    },
  ],
};
