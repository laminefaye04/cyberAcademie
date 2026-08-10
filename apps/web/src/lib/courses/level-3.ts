import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const PYTHON_BASH_COURSE: Course = {
  id: "python-bash",
  levelId: 3,
  title: "Python / Bash pour la cybersécurité",
  description:
    "Automatiser la reconnaissance et les tâches de sécurité : scripts Bash, sockets, requêtes HTTP et parsing avec Python.",
  xp: 1000,
  modules: [
    {
      id: "py-module-1",
      title: "Bash : les fondations",
      lessons: [
        {
          id: "py-lecon-01",
          title: "Qu'est-ce qu'un script ? Le shebang et chmod +x",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Automatiser : la mission de ce niveau"),
            p(
              "Jusqu'ici, tu as tout fait à la main : explorer ton système, naviguer dans le terminal, interroger le réseau. C'est parfait pour apprendre. Mais un pentester doit lister des centaines de sous-domaines, scanner des milliers de ports, vérifier des dizaines d'URLs. À la main, cela représente des heures de travail répétitif, fatigant, et plein d'erreurs."
            ),
            p(
              "Ce niveau change de braquet : tu vas apprendre à confier ces tâches répétitives à la machine. Un programme ne se fatigue jamais, ne fait jamais de faute de frappe, et fait exactement la même chose à chaque fois. C'est cela, automatiser."
            ),
            h("Un script : une liste de commandes"),
            p(
              "Un script est un simple fichier texte qui contient une suite de commandes, écrites les unes après les autres, comme si tu les tapais dans le terminal. Le mot script vient de l'anglais : un « texte écrit » qui est joué comme un scénario."
            ),
            p(
              "Bash (Bourne-Again SHell) est le programme qui lit et exécute ce texte, ligne par ligne. Créé en 1989 par Brian Fox pour le projet GNU, c'est le shell par défaut de la quasi-totalité des distributions Linux, et le langage de tous les administrateurs système et pentesters."
            ),
            h("Le shebang : la première ligne magique"),
            p(
              "La première ligne d'un script est spéciale : le shebang (#!). Elle indique quel interpréteur doit lire le fichier quand on le lance directement. Si le shebang est #!/bin/bash, le système sait qu'il doit appeler le programme /bin/bash pour exécuter ton fichier."
            ),
            code(`#!/bin/bash
echo "Salut depuis Bash !"`),
            h("Rendre le script exécutable : chmod +x"),
            p(
              "Pour lancer un script directement, il faut aussi qu'il soit exécutable. C'est le rôle de chmod et du droit x (execute)."
            ),
            code(`chmod +x mon-script.sh
./mon-script.sh`),
            p(
              "Sans chmod +x, l'OS répond Permission denied (permission refusée). Tu peux toujours lancer le script avec bash mon-script.sh, même sans droit d'exécution, car c'est toi qui appelles Bash, pas le système."
            ),
            h("Le cycle complet"),
            code(`nano mon-script.sh          # 1. écris le script
chmod +x mon-script.sh     # 2. rends-le exécutable
./mon-script.sh            # 3. lance-le`),
            h("Pourquoi c'est crucial en cybersécurité"),
            p(
              "Un SOC (centre de supervision de sécurité) reçoit chaque matin une liste de 200 serveurs web. Un script Bash boucle sur la liste, récupère le code HTTP de chacun et écrit un rapport. Un humain mettrait des heures ; le script tourne en 2 minutes."
            ),
            list(
              "Gagner du temps : un scan qui prendrait 3 jours à la main se fait en 5 minutes.",
              "Réduire les erreurs : le script fait toujours la même chose, de la même façon.",
              "Standardiser : toute l'équipe utilise le même outil et les mêmes résultats.",
              "Documenter : un script est une preuve de ce qui a été fait (précieux pour un rapport)."
            ),
            callout(
              "Toujours commencer un script par son shebang, le nommer avec l'extension .sh par clarté, et tester d'abord chaque commande à la main dans le terminal avant de l'intégrer au script.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Un script Bash est une liste de commandes dans un fichier texte.",
              "Le shebang #!/bin/bash choisit l'interpréteur quand on lance le fichier directement.",
              "chmod +x ajoute le droit d'exécution indispensable pour lancer ./script.sh.",
              "Un script transforme une action manuelle en action automatisée, répétable à volonté."
            )
          ],
        },
        {
          id: "py-lecon-02",
          title: "Les variables Bash : $var et ${var}",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Une boîte nommée"),
            p(
              "Une variable est une boîte nommée qui stocke une valeur. En Bash, on l'affecte avec le signe = sans espaces : nom=\"valeur\". On la lit en préfixant son nom avec le signe dollar : $nom."
            ),
            code(`#!/bin/bash
cible="192.168.1.10"          # affectation SANS espace autour du =
port=80
echo "Je scanne $cible sur le port $port"
echo "Je scanne \${cible} sur le port \${port}"`),
            h("Les règles d'affectation"),
            list(
              "Pas d'espaces autour du = : port=80, jamais port = 80.",
              "La lecture se fait avec le dollar : echo \"$port\".",
              "Noms explicites en minuscules, mots séparés par _ : ip_cible, fichier_log.",
              "Une valeur contenant un espace doit être entre guillemets."
            ),
            h("Pourquoi les variables changent tout"),
            p(
              "Un script qui contient la même valeur répétée 15 fois est fragile : si la valeur change (par exemple l'adresse IP de la cible), il faut modifier le script en 15 endroits. Avec une variable, tu modifies un seul endroit, en haut du script."
            ),
            h("${var} : délimiter le nom de la variable"),
            p(
              "Les accolades délimitent explicitement le nom de la variable. Elles sont indispensables quand le nom est suivi de caractères qui pourraient être confondus avec lui."
            ),
            code(`couleur="bleu"
echo "$couleurmarine"    # Bash cherche une variable nommée "couleurmarine"
echo "\${couleur}marine"  # affiche "bleu" suivi de "marine" -> bleumarine`),
            h("Exemple réel"),
            p(
              "Un script de recon stocke le domaine cible dans une variable en tête de fichier. Le pentester change UNE ligne (cible=\"example.com\") et relance le script pour une nouvelle mission, sans toucher au reste."
            ),
            callout(
              "Toujours mettre des guillemets doubles autour des variables : \"$var\". Si la valeur contient un espace, sans guillemets Bash la découpe en plusieurs mots et casse le script.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Une variable Bash stocke une valeur : var=valeur, sans espace autour du =.",
              "On la lit avec $var, ou ${var} pour délimiter clairement le nom.",
              "Les variables évitent de répéter les mêmes valeurs dans tout le script.",
              "Une valeur à changer (IP, port, fichier) se place en haut du script."
            )
          ],
        },
        {
          id: "py-lecon-03",
          title: "Les guillemets : simples vs doubles",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Le piège classique du débutant"),
            p(
              "En Bash, il existe deux types de guillemets qui ne se comportent pas pareil. C'est la source de bugs la plus fréquente des scripts débutants, et elle est facile à comprendre."
            ),
            code(`#!/bin/bash
cible="192.168.1.10"
echo '$cible'   # affiche : $cible
echo "$cible"   # affiche : 192.168.1.10`),
            h("Le tableau qui fait la différence"),
            list(
              "Guillemets simples '...' : aucune substitution. Le texte est affiché littéralement.",
              "Guillemets doubles \"...\" : la substitution de variables fonctionne ($var devient sa valeur).",
              "En cybersécurité, une erreur classique est de stocker une commande dans une variable avec des guillemets simples : la commande ne sera jamais interprétée."
            ),
            h("L'analogie du panneau"),
            p(
              "Une chaîne entre guillemets simples est un panneau figé : ce qui est écrit est ce qui est affiché. Entre guillemets doubles, c'est un panneau lumineux : le script remplace chaque $variable par sa valeur avant d'afficher."
            ),
            h("Règle pratique"),
            p(
              "Utilise des guillemets doubles pour conserver la valeur d'une variable, et des guillemets simples quand tu veux du texte brut sans substitution. Une adresse IP, un port, un chemin : on les écrit presque toujours entre guillemets doubles."
            ),
            callout(
              "Règle à retenir : \"...\" pour manipuler des valeurs, '...' pour du texte figé. Un guillemet ouvert doit toujours avoir son fermé, sinon tout le reste du script devient du texte.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Les guillemets simples livrent le texte brut, sans aucune substitution.",
              "Les guillemets doubles autorisent la substitution de variables ($var).",
              "On utilise \"...\" pour les valeurs, '...' pour le texte figé.",
              "Un guillemet non fermé absorbe tout le script et produit des erreurs incompréhensibles."
            )
          ],
        },
        {
          id: "py-lecon-04",
          title: "Entrées et sorties : $1, $2, read, echo, printf",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Un script qui communique avec l'extérieur"),
            p(
              "Un script qui ne peut rien recevoir ni rien afficher est inutile. Il faut pouvoir lui donner une cible (./scan.sh 192.168.1.10) et qu'il te rende un résultat lisible. Ce chapitre couvre les entrées (arguments, clavier) et les sorties (écran)."
            ),
            h("Les arguments positionnels"),
            p(
              "Quand tu lances ./script.sh 192.168.1.10 80, Bash range les arguments dans des variables spéciales : $1 reçoit 192.168.1.10, $2 reçoit 80, $0 contient le nom du script, et $# contient le nombre d'arguments."
            ),
            code(`#!/bin/bash
echo "Nom du script : $0"
echo "Cible : $1"
echo "Port : $2"
echo "Nombre d'arguments : $#"`),
            p(
              "Lancement : ./arguments.sh 192.168.1.10 80. Le script affichera le nom du script, la cible, le port, et le compte 2."
            ),
            h("Lire la saisie au clavier : read"),
            p(
              "La commande read lit une ligne saisie au clavier (ou fournie par un autre programme) et la range dans une variable."
            ),
            code(`#!/bin/bash
echo "Quelle cible veux-tu scanner ?"
read cible
echo "Tu as demandé : $cible"`),
            h("Afficher proprement : echo et printf"),
            p(
              "echo affiche une simple ligne. printf affiche un texte formaté : il imite le printf du langage C et permet un contrôle fin (%s = chaîne, %d = nombre, \\n = saut de ligne)."
            ),
            code(`#!/bin/bash
nom="Alice"
printf "Bonjour %s, tu as %d nouvelles alertes.\n" "$nom" 42
# affiche : Bonjour Alice, tu as 42 nouvelles alertes.`),
            h("Le réflexe professionnel : vérifier ses arguments"),
            p(
              "Un bon script commence par vérifier qu'il a reçu ce qu'il attend. La commande test, détaillée à la leçon suivante, permet de tester si le premier argument est vide et d'afficher un message d'usage."
            ),
            code(`if [ -z "$1" ]; then
    echo "Usage : $0 <cible>"
    exit 1
fi`),
            callout(
              "Préfère printf à echo pour les sorties formatées (alignement, nombres). Et affiche toujours un message d'usage clair quand les arguments manquent.",
              "tip"
            ),
            h("En résumé"),
            list(
              "$1, $2... reçoivent les arguments passés au script ; $0 est le nom du script ; $# le nombre d'arguments.",
              "read lit une saisie au clavier et la range dans une variable.",
              "echo affiche simplement ; printf affiche avec un format précis.",
              "Un bon script commence par vérifier qu'il a reçu ce qu'il attend."
            )
          ],
        },
        {
          id: "py-lecon-05",
          title: "Les conditions : if, then, elif, else et test",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Prendre des décisions"),
            p(
              "Une condition permet au script de choisir un chemin : selon qu'une valeur est vraie ou fausse, on exécute telle ou telle partie. C'est la fourche du chemin d'exécution."
            ),
            p(
              "Scanner 100 ports et n'afficher que les ports ouverts, c'est une décision par port : « si le port répond, affiche-le ; sinon, ignore-le ». Sans conditions, ton script afficherait tout et tu devrais trier toi-même."
            ),
            h("La syntaxe de base"),
            code(`if [ condition ]; then
    # exécuté si la condition est vraie
elif [ autre_condition ]; then
    # exécuté si la première est fausse et la seconde vraie
else
    # exécuté si toutes les conditions sont fausses
fi    # fi = "if" à l'envers : ferme le bloc`),
            h("Les opérateurs de test"),
            p(
              "La condition s'écrit entre crochets [ ... ], un raccourci de la commande test. Il faut un espace après [ et avant ], sinon Bash refuse. Et surtout : les comparaisons de nombres n'utilisent pas les symboles mathématiques mais des lettres."
            ),
            list(
              "[ \"$port\" -eq 80 ] — égalité de nombres (equal).",
              "[ \"$port\" -ne 22 ] — différent (not equal).",
              "[ \"$port\" -lt 1024 ] — inférieur (less than).",
              "[ \"$port\" -gt 80 ] — supérieur (greater than).",
              "[ -f \"logs.txt\" ] — c'est un fichier existant (file).",
              "[ -d \"/var/log\" ] — c'est un dossier (directory).",
              "[ -z \"$1\" ] — la chaîne est vide (zero).",
              "[ -n \"$cible\" ] — la chaîne n'est pas vide.",
              "[ \"$reponse\" = \"oui\" ] — égalité de chaînes.",
              "[ \"$reponse\" != \"non\" ] — inégalité de chaînes."
            ),
            h("Exemple complet"),
            code(`#!/bin/bash
code=404
if [ "$code" -eq 200 ]; then
    echo "Page trouvée !"
elif [ "$code" -eq 404 ]; then
    echo "Page introuvable."
else
    echo "Autre code : $code"
fi`),
            h("Les nombres et les chaînes ne se mélangent pas"),
            p(
              "Comparer des nombres avec -eq, -ne, -lt, -gt et des chaînes avec = ou != : les mélanger est la source classique de bugs. Ne compare jamais un port avec = ni un mot avec -eq."
            ),
            callout(
              "Guillemets doubles autour des variables dans [ ] : [ \"$var\" = \"oui\" ]. Et toujours fermer le bloc avec fi. Un if sans fi fait planter le script.",
              "warning"
            ),
            h("En résumé"),
            list(
              "if / then / elif / else / fi fait choisir un chemin selon une condition.",
              "La condition s'écrit dans [ ... ] (raccourci de la commande test), avec des espaces.",
              "Les nombres se comparent avec -eq, -ne, -lt, -gt ; les chaînes avec = et !=.",
              "On teste les fichiers avec -f, les dossiers avec -d, les chaînes vides avec -z."
            )
          ],
        },
        {
          id: "py-lecon-06",
          title: "Enchaîner les commandes : && et ||",
          type: "exercise",
          duration: "18 min",
          blocks: [
            h("Deux raccourcis très puissants"),
            p(
              "Les symboles && et || enchaînent des commandes en se basant sur leur code de retour. Un code de retour 0 signifie « succès », tout autre valeur signifie « échec ». C'est exactement ce que teste un if, mais en une ligne."
            ),
            code(`mkdir backup && echo "Le dossier backup a été créé"
grep -q "alerte" logs.txt || echo "Aucune alerte trouvée"`),
            p(
              "commande1 && commande2 : exécute commande2 seulement si commande1 a réussi (code 0). C'est le « et ensuite ». commande1 || commande2 : exécute commande2 seulement si commande1 a échoué. C'est le « sinon »."
            ),
            h("À l'atelier"),
            p(
              "Ouvre un terminal dans un dossier d'entraînement et réalise les étapes suivantes, une par une, en observant les sorties."
            ),
            h("Étape 1 — Vérifier une cible avant de continuer"),
            code(`#!/bin/bash
if [ -z "$1" ]; then
    echo "Usage : $0 <cible>"
    exit 1
fi
echo "Scan de la cible : $1"`),
            h("Étape 2 — Créer un dossier et continuer si ça marche"),
            code(`mkdir -p rapports && echo "Le dossier rapports est prêt"`),
            p(
              "Si mkdir échoue (dossier protégé, erreur), le echo ne s'affiche pas. && enchaîne seulement en cas de succès."
            ),
            h("Étape 3 — Vérifier qu'un fichier existe, sinon prévenir"),
            code(`[ -f "notes.txt" ] || echo "Le fichier notes.txt n'existe pas"`),
            h("Étape 4 — Afficher un message conditionnel"),
            code(`[ -n "$2" ] && echo "Deuxième argument reçu : $2"`),
            h("Bilan attendu"),
            list(
              "Étape 1 : sans argument, le script affiche l'usage et s'arrête.",
              "Étape 2 : le message s'affiche si le dossier a bien été créé.",
              "Étape 3 : le message s'affiche car notes.txt n'existe pas (sinon, rien).",
              "Étape 4 : le message s'affiche seulement si un deuxième argument est passé."
            ),
            callout(
              "Ces enchaînements restent de l'entraînement local : tu ne testes que des dossiers et des fichiers que tu crées toi-même. Toute tentative sur des machines ou des fichiers d'autrui sans autorisation est illégale (article 323-1 du code pénal).",
              "danger"
            ),
            h("En résumé"),
            list(
              "commande1 && commande2 : commande2 exécutée seulement si commande1 réussit.",
              "commande1 || commande2 : commande2 exécutée seulement si commande1 échoue.",
              "Le code de retour 0 signifie succès, tout le reste signifie échec.",
              "Pour des logiques multiples, on préfère if / elif / else."
            )
          ],
        },
      ],
    },
    {
      id: "py-module-2",
      title: "Bash : boucles, fonctions et scripts pratiques",
      lessons: [
        {
          id: "py-lecon-07",
          title: "Les boucles : for, while, until",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Répéter : le cœur de l'automatisation"),
            p(
              "Toute la force de l'automatisation vient des boucles. « Tester 1000 ports », « parcourir 200 sous-domaines », « lire 50 fichiers » : ce sont tous des « pour chaque... faire... ». Sans boucle, pas d'automatisation."
            ),
            h("La boucle for : pour chaque élément d'une liste"),
            p(
              "for est idéal quand tu connais à l'avance les valeurs : une liste de ports, une liste de fichiers, une liste d'URLs."
            ),
            code(`#!/bin/bash
for port in 22 80 443 8080; do
    echo "Je teste le port $port"
done`),
            p(
              "for sait aussi lire une liste depuis un fichier (une valeur par ligne), grâce à la substitution de commande que l'on verra à la leçon 8."
            ),
            code(`#!/bin/bash
for url in $(cat urls.txt); do
    echo "Je visite $url"
done`),
            h("La boucle while : tant que la condition est vraie"),
            p(
              "while est idéal pour lire un fichier ligne par ligne, ou pour répéter tant qu'une condition tient."
            ),
            code(`#!/bin/bash
while read -r ligne; do
    echo "Ligne lue : $ligne"
done < urls.txt`),
            p(
              "Le < à la fin redirige le contenu du fichier vers la commande read : à chaque tour, read lit une ligne du fichier. L'option -r empêche les interprétations bizarres des caractères d'échappement."
            ),
            h("La boucle until : jusqu'à ce que la condition devienne vraie"),
            p(
              "until est l'inverse de while : le bloc tourne tant que la condition est fausse."
            ),
            code(`#!/bin/bash
compteur=0
until [ "$compteur" -ge 5 ]; do
    echo "Tentative $compteur"
    compteur=$((compteur + 1))
done`),
            h("Choisir la bonne boucle"),
            list(
              "for : la liste des valeurs est connue à l'avance (ports, fichiers, URLs).",
              "while read : on lit un fichier ligne par ligne, ou on répète selon une condition.",
              "until : on répète jusqu'à ce qu'une condition devienne vraie.",
              "for est plus sûr : pas de risque de boucle infinie par oubli d'incrémentation."
            ),
            callout(
              "Toujours prévoir une limite pour while et until : une boucle sans condition de sortie tourne pour toujours. Fermer la boucle avec done.",
              "tip"
            ),
            h("En résumé"),
            list(
              "for port in ... ; do ... ; done répète pour chaque élément d'une liste.",
              "while read -r ligne ; do ... ; done < fichier lit un fichier ligne par ligne.",
              "until répète jusqu'à ce que la condition devienne vraie.",
              "Les boucles transforment « refaire 1000 fois » en « une ligne qui boucle »."
            )
          ],
        },
        {
          id: "py-lecon-08",
          title: "La substitution de commande : $()",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Récupérer le résultat d'une commande"),
            p(
              "Un script a souvent besoin du résultat d'une autre commande : le nombre de lignes d'un fichier, l'heure actuelle, la sortie de curl. La substitution de commande permet de capturer cette sortie directement."
            ),
            code(`#!/bin/bash
date_du_jour=$(date +%Y-%m-%d)
echo "Aujourd'hui : $date_du_jour"

nb_lignes=$(wc -l < logs.txt)
echo "Le fichier logs.txt contient $nb_lignes lignes"

ip=$(hostname -I | awk '{print $1}')
echo "Mon IP locale : $ip"`),
            h("Fonctionnement"),
            p(
              "Quand Bash voit $(commande), il exécute commande, récupère tout ce qu'elle affiche, et remplace $(commande) par ce texte. L'ancienne syntaxe équivalente est l'accent grave (backtick), moins lisible et plus fragile : on recommande toujours $( )."
            ),
            h("Cas d'usage en cybersécurité"),
            list(
              "Capturer un code HTTP pour le comparer dans un if.",
              "Générer des noms de fichiers avec la date du jour.",
              "Extraire une valeur d'une sortie d'outil (IP, nombre, champ).",
              "Composer des scripts : le résultat d'un outil nourrit le suivant."
            ),
            p(
              "Exemple réel : un script de rapport nomme son fichier de sortie avec la date. Chaque jour, un nouveau rapport, sans jamais écraser le précédent."
            ),
            code(`fichier="rapport-$(date +%Y%m%d).txt"
echo "Rapport : $fichier"`),
            callout(
              "Utilise $( ) plutôt que les backticks, et mets des guillemets doubles autour de la variable qui reçoit la sortie si elle peut contenir des espaces.",
              "tip"
            ),
            h("En résumé"),
            list(
              "$(commande) exécute une commande et place sa sortie dans la ligne courante.",
              "C'est la façon propre de « récupérer un résultat » dans un script.",
              "La sortie capturée peut contenir des espaces : attention aux guillemets.",
              "$( ) s'imbrique facilement, contrairement aux backticks."
            )
          ],
        },
        {
          id: "py-lecon-09",
          title: "Les fonctions Bash",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Regrouper et réutiliser"),
            p(
              "Si tu répètes les mêmes 5 commandes à trois endroits du script, tu risques d'en corriger une au premier endroit et d'oublier les autres. Une fonction regroupe ces commandes sous un nom : tu écris la logique une seule fois et tu l'appelles partout."
            ),
            h("Définir une fonction : deux syntaxes"),
            code(`#!/bin/bash

# syntaxe 1 : "function nom"
function afficher_bonjour {
    echo "Bonjour $1"
}

# syntaxe 2 : nom + parenthèses (la plus répandue)
afficher_port_ouvert() {
    echo "[+] Port ouvert : $1"
}

afficher_bonjour "Alice"
afficher_port_ouvert 8080`),
            h("Les arguments d'une fonction"),
            p(
              "À l'intérieur d'une fonction, $1, $2... désignent les arguments passés à la fonction (pas ceux du script). On peut aussi récupérer le résultat d'une fonction avec $( ) : il suffit qu'elle affiche le résultat."
            ),
            code(`#!/bin/bash
additionner() {
    echo $(( $1 + $2 ))
}
somme=$(additionner 3 4)
echo "3 + 4 = $somme"`),
            h("Exemple réel : factoriser un test"),
            p(
              "Un script de recon définit une fonction verifier_url qui prend une URL, lance curl et affiche le code HTTP. Le script l'appelle dans une boucle sur des centaines d'URLs : des dizaines de lignes se réduisent à quelques-unes."
            ),
            code(`#!/bin/bash
verifier_url() {
    code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 5 "$1")
    echo "$1 -> $code"
}

for url in $(cat urls.txt); do
    verifier_url "$url"
done`),
            callout(
              "Un nom de fonction = un verbe explicite (tester_port, envoyer_alerte). Définis les fonctions avant de les appeler, en haut du script. Les variables déclarées avec local dans une fonction n'existent que pendant son exécution.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Une fonction regroupe des commandes sous un nom et s'appelle par ce nom.",
              "Elle reçoit ses paramètres via $1, $2... à l'intérieur du bloc.",
              "Son résultat s'affiche et se capture avec $( ).",
              "Les fonctions factorisent la logique répétée et rendent le script lisible."
            )
          ],
        },
        {
          id: "py-lecon-10",
          title: "Script pratique : scanner de ports avec nc",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Le couteau suisse réseau : netcat"),
            p(
              "Netcat (nc) est l'outil réseau emblématique. En mode scan, deux options comptent : -z (zero) n'envoie aucune donnée, juste un test de connexion ; -w 1 (wait) abandonne après 1 seconde si la connexion ne s'établit pas."
            ),
            code(`nc -z -w 1 127.0.0.1 22
echo $?   # 0 si le port est ouvert, autre chose sinon`),
            h("Le scanner complet"),
            p("Crée le fichier scan-ports.sh avec l'éditeur de ton choix (nano, vim), rends-le exécutable et lance-le sur 127.0.0.1."),
            code(`#!/bin/bash
# scan-ports.sh — teste une liste de ports sur une cible
IP="$1"

if [ -z "$IP" ]; then
    echo "Usage : ./scan-ports.sh <adresse-IP>"
    exit 1
fi

for port in 22 80 443 8080; do
    if nc -z -w 1 "$IP" "$port" 2>/dev/null; then
        echo "[+] $IP:$port  OUVERT"
    else
        echo "[-] $IP:$port  fermé"
    fi
done`),
            h("Explication ligne par ligne"),
            list(
              "IP=\"$1\" : la cible vient du premier argument.",
              "if [ -z \"$IP\" ] : si l'argument est vide, on affiche l'usage et on s'arrête (exit 1).",
              "for port in 22 80 443 8080 : on teste quatre ports.",
              "nc -z -w 1 \"$IP\" \"$port\" : test de connexion sans envoyer de données.",
              "2>/dev/null : envoie les messages d'erreur de nc dans la « poubelle » système.",
              "if ... ; then : si nc réussit (code 0), le port est ouvert."
            ),
            h("Le rôle du code de retour"),
            p(
              "nc retourne un code de sortie de 0 si la connexion a réussi et un code différent de 0 sinon. La condition if juge précisément sur ce code. C'est ce qui rend l'utilisation de nc dans un if naturelle."
            ),
            code(`chmod +x scan-ports.sh
./scan-ports.sh 127.0.0.1`),
            p(
              "Résultat attendu (les ports dépendent des services actifs sur ta machine) :"
            ),
            code(`[+] 127.0.0.1:22  OUVERT
[-] 127.0.0.1:80  fermé
[-] 127.0.0.1:443  fermé
[-] 127.0.0.1:8080  fermé`),
            h("Erreurs fréquentes"),
            list(
              "Oubli de chmod +x : Permission denied. Corrige avec chmod +x scan-ports.sh.",
              "Espaces autour du = : IP = \"$1\" est lu comme une commande IP. Écris IP=\"$1\".",
              "Oubli des guillemets : \"$IP\" et \"$port\" évitent les découpages bizarres.",
              "nc absent : nc: command not found. Installe-le avec sudo apt install netcat-openbsd."
            ),
            callout(
              "nc -z sur une machine dont tu n'as pas l'autorisation est un scan non sollicité, illégal et détecté par la cible. Entraîne-toi UNIQUEMENT sur 127.0.0.1, sur tes machines virtuelles ou sur les plateformes d'entraînement autorisées (TryHackMe, HackTheBox, Root-Me).",
              "danger"
            ),
            h("En résumé"),
            list(
              "nc -z -w 1 teste une connexion sans envoyer de données et retourne un code utilisable dans un if.",
              "Un scanner de ports associe une variable (IP), une boucle (for) et une condition (if).",
              "Les erreurs de nc se masquent avec 2>/dev/null pour un affichage propre.",
              "On ne teste que des machines autorisées : localhost, VMs, plateformes d'entraînement."
            )
          ],
        },
        {
          id: "py-lecon-11",
          title: "Script pratique : vérifier des URLs avec curl",
          type: "exercise",
          duration: "20 min",
          blocks: [
            h("Contrôler une flotte de sites"),
            p(
              "Vérifier l'état de nombreux sites web (code HTTP, disponibilité, redirection) est une tâche quotidienne de la cybersécurité. On la confie à un script qui lit une liste d'URLs et affiche le code HTTP de chacune."
            ),
            h("La formule magique du code HTTP"),
            code(`curl -s -o /dev/null -w "%{http_code}" -L --max-time 5 https://example.com`),
            p(
              "Décortiquons : -s rend curl silencieux (pas de barre de progression) ; -o /dev/null jette le corps de la réponse dans la poubelle système, on ne veut que le code ; -w \"%{http_code}\" affiche uniquement le code HTTP ; -L suit les redirections ; --max-time 5 abandonne après 5 secondes si la cible ne répond pas."
            ),
            h("Le script verif-urls.sh"),
            p(
              "Crée un fichier urls.txt avec une URL par ligne, puis le script ci-dessous."
            ),
            code(`#!/bin/bash
# verif-urls.sh — codes HTTP d'une liste d'URLs
LISTE="$1"

if [ -z "$LISTE" ] || [ ! -f "$LISTE" ]; then
    echo "Usage : ./verif-urls.sh <fichier-avec-urls>"
    exit 1
fi

while read -r url; do
    code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 5 "$url")
    echo "$code  $url"
done < "$LISTE"`),
            h("Explication"),
            list(
              "LISTE=\"$1\" : le premier argument est le nom du fichier.",
              "[ ! -f \"$LISTE\" ] : teste que le fichier existe (-f = file).",
              "while read -r url : lit chaque ligne du fichier dans url.",
              "code=$(curl ...) : capture le code HTTP de la requête.",
              "-L : suit les redirections (sinon on verrait les codes 301/302).",
              "done < \"$LISTE\" : le fichier est fourni à read via la redirection <."
            ),
            h("Résultat attendu (exemple)"),
            code(`200  https://example.com
403  https://example.com/admin
200  http://example.com
404  https://www.example.org`),
            h("Gérer les lignes vides"),
            p(
              "Une ligne vide dans urls.txt produit un code 000 (curl reçoit une URL vide). Pour les ignorer, ajoute un test au début de la boucle : si la ligne est vide, on passe directement au tour suivant."
            ),
            code(`while read -r url; do
    [ -n "$url" ] || continue
    code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 5 "$url")
    echo "$code  $url"
done < "$LISTE"`),
            p(
              "[ -n \"$url\" ] || continue : si la ligne est vide, continue passe au tour suivant sans exécuter le reste de la boucle."
            ),
            callout(
              "Le script ne teste que les URLs de ton fichier. Si ce fichier contient des sites qui ne t'appartiennent pas, tu dois avoir une autorisation pour les interroger. Un code 404 signifie « page introuvable » mais un 200 sur un sous-domaine inattendu peut être une découverte : un service de sauvegarde exposé est souvent une cible de choix.",
              "warning"
            ),
            h("En résumé"),
            list(
              "curl -s -o /dev/null -w \"%{http_code}\" extrait le code HTTP sans bruit.",
              "Toujours un --max-time sur curl pour ne pas bloquer la boucle.",
              "-L suit les redirections pour obtenir le code final.",
              "Une boucle while read transforme une liste d'URLs en rapport complet."
            )
          ],
        },
        {
          id: "py-lecon-12",
          title: "Parsing en pipeline : grep, cut, awk",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Des montagnes de texte"),
            p(
              "Les logs, les sorties d'outils, les fichiers de configuration sont des masses de texte. Les extraire, les filtrer et les compter est le métier de l'analyste. Le pipeline (le symbole |) envoie la sortie d'une commande dans l'entrée de la suivante : c'est le ruban transporteur du terminal."
            ),
            h("grep : filtrer les lignes"),
            p(
              "grep garde les lignes qui contiennent un motif. C'est le filtre de base, déjà rencontré au niveau 1."
            ),
            code(`grep "404" logs.txt            # les lignes contenant "404"
grep -c "POST" logs.txt          # le nombre de lignes contenant "POST"
grep -i "error" logs.txt         # insensible à la casse`),
            h("cut : découper les champs"),
            p(
              "cut découpe chaque ligne selon un délimiteur et garde les champs choisis. Ici, on découpe sur l'espace (-d ' ') et on garde le premier champ (-f 1)."
            ),
            code(`cut -d ' ' -f 1 logs.txt      # le premier mot de chaque ligne`),
            h("awk : le champ par excellence"),
            p(
              "awk est plus puissant que cut : il découpe aussi, mais permet de traiter chaque champ. $1 désigne le premier champ, $2 le deuxième, etc."
            ),
            code(`awk '{print $1}' logs.txt     # le premier champ de chaque ligne
awk '{print $2}' access.log      # le deuxième champ`),
            h("La recette du top 10 des IPs"),
            p(
              "Dans un log Apache, l'adresse IP est toujours le premier champ. Pour compter les IPs les plus actives, on utilise la chaîne sort | uniq -c | sort -rn."
            ),
            code(`awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -n 10`),
            p(
              "Décomposition : awk extrait les IPs ; sort regroupe les identiques ; uniq -c préfixe chaque ligne par son nombre d'occurrences ; sort -rn trie du plus grand au plus petit (r = reverse, n = numérique) ; head -n 10 garde les 10 premiers."
            ),
            h("Pourquoi uniq a besoin de sort"),
            p(
              "uniq ne compte que les lignes consécutives identiques. Sans le premier sort, le même motif apparaîtrait dans plusieurs blocs et le comptage serait faux. La chaîne complète sort | uniq -c | sort -rn sert en permanence, à retenir."
            ),
            callout(
              "Cette recette est le réflexe SOC : après une alerte, si une IP envoie des milliers de requêtes en quelques minutes, c'est soit un scan, soit un bot, soit une attaque. Le top 10 transforme des millions de lignes en une décision rapide.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Le pipeline | envoie la sortie d'une commande dans l'entrée de la suivante.",
              "grep filtre les lignes qui contiennent un motif.",
              "cut et awk découpent les lignes en champs ; awk est le plus puissant.",
              "sort | uniq -c | sort -rn compte les occurrences : la recette du top 10."
            )
          ],
        },
      ],
    },
    {
      id: "py-module-3",
      title: "Python : les bases",
      lessons: [
        {
          id: "py-lecon-13",
          title: "Pourquoi Python en cybersécurité ?",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Le langage des pentesters"),
            p(
              "Python est un langage de programmation créé en 1991 par le néerlandais Guido van Rossum. C'est un langage interprété (lu et exécuté ligne par ligne par un programme appelé l'interpréteur), à typage dynamique (les variables n'ont pas de type déclaré à l'avance) et multi-plateforme. Le nom « Python » vient des Monty Python, pas du serpent."
            ),
            h("Pourquoi c'est devenu la référence"),
            list(
              "Une bibliothèque immense : des modules prêts à l'emploi pour les sockets, le web, le parsing, la cryptographie.",
              "La rapidité de développement : un outil qui prendrait 50 lignes en C en prend 10 en Python. En cybersécurité, le temps compte.",
              "Les outils de référence sont en Python : on peut lire, comprendre et adapter les outils de la profession."
            ),
            h("Les outils que tu vas recroiser"),
            list(
              "impacket : l'atelier Active Directory (niveaux suivants).",
              "scapy : forger des paquets réseau.",
              "requests : faire des requêtes HTTP.",
              "sqlmap : tester les injections SQL.",
              "Une grande part des scripts d'exploit de Metasploit."
            ),
            h("Python 2 vs Python 3"),
            p(
              "Python 2 n'est plus maintenu depuis 2020. Toujours utiliser Python 3, que l'on lance avec la commande python3."
            ),
            h("La philosophie du langage"),
            p(
              "Le mantra de Python : « There should be one — and preferably only one — obvious way to do it » (« il devrait y avoir une façon — et de préférence une seule — évidente de le faire »). C'est ce qui rend le code Python lisible et les bugs plus rares."
            ),
            h("En résumé"),
            list(
              "Python est un langage interprété, lisible et riche en bibliothèques.",
              "C'est le langage des outils de cybersécurité (impacket, scapy, requests, sqlmap).",
              "On utilise toujours Python 3, jamais Python 2.",
              "Connaître Python, c'est savoir lire et adapter les outils de la profession."
            )
          ],
        },
        {
          id: "py-lecon-14",
          title: "Installer et exécuter Python",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Python est probablement déjà là"),
            p(
              "Python 3 est préinstallé sur la plupart des distributions Linux. Vérifie ta version avec une seule commande."
            ),
            code(`python3 --version`),
            p("Exemple de sortie : Python 3.11.2."),
            h("Lancer un script"),
            code(`python3 mon_script.py`),
            p(
              "L'interpréteur lit mon_script.py et exécute les instructions dans l'ordre, du haut vers le bas."
            ),
            h("Le mode interactif : la calculatrice"),
            p(
              "Tape python3 sans argument : l'invite >>> attend tes instructions. C'est parfait pour tester une idée avant de l'écrire dans un fichier."
            ),
            code(`python3
>>> 2 + 2
4
>>> "bonjour".upper()
'BONJOUR'`),
            h("Le shebang Python"),
            p(
              "Comme pour Bash, on peut rendre un script Python directement exécutable avec un shebang pointant vers l'interpréteur Python."
            ),
            code(`#!/usr/bin/env python3
print("Salut depuis Python !")`),
            code(`chmod +x mon_script.py
./mon_script.py`),
            p(
              "Le shebang #!/usr/bin/env python3 demande au système de chercher l'interpréteur python3 dans le PATH, les dossiers où Linux cherche les programmes. C'est la façon recommandée, car le chemin exact de Python varie selon les systèmes."
            ),
            h("Installer des modules : pip"),
            p(
              "Les modules tiers s'installent avec pip, le gestionnaire de paquets Python. Par exemple, le module requests de la leçon 20."
            ),
            code(`pip install requests`),
            callout(
              "Utilise toujours la commande python3, jamais python, qui peut pointer vers l'ancienne version 2. Teste les petites idées dans l'invité interactif avant d'écrire le script.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Python 3 est préinstallé sur la plupart des Linux : vérifie avec python3 --version.",
              "On exécute un script avec python3 mon_script.py.",
              "Le mode interactif (>>>) sert de calculatrice et de banc d'essai.",
              "Le shebang #!/usr/bin/env python3 rend un script Python directement exécutable."
            )
          ],
        },
        {
          id: "py-lecon-15",
          title: "Variables et types : int, str, list, dict, bool, bytes",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Chaque valeur a un type"),
            p(
              "Comme en Bash, une variable Python est une boîte nommée qui stocke une valeur. Mais contrairement à Bash, chaque valeur a un type précis que le langage respecte strictement. Le type détermine ce qu'on peut faire avec la valeur : on multiplie des nombres, on découpe des textes, on parcourt des listes."
            ),
            p(
              "Comprendre les types, c'est comprendre pourquoi \"3\" + 3 plante alors que 3 + 3 fonctionne."
            ),
            h("Les types principaux"),
            code(`#!/usr/bin/env python3
nom = "Alice"                    # str
age = 30                         # int
note = 14.5                      # float
est_connecte = True              # bool
ports = [22, 80, 443]            # list
machine = {"nom": "web01", "ip": "192.168.1.10"}   # dict
donnees = b"\x00\x01\xff"         # bytes

print(type(nom))                 # <class 'str'>
print(type(ports))               # <class 'list'>
print(machine["ip"])             # 192.168.1.10
print(len(ports))                # 3`),
            h("Les listes : index à partir de 0"),
            p(
              "On accède à un élément d'une liste par son index (position), en commençant à 0. -1 désigne le dernier élément."
            ),
            code(`ports = [22, 80, 443, 8080]
print(ports[0])    # 22
print(ports[3])    # 8080
print(ports[-1])   # 8080  (-1 = le dernier)
ports.append(8443) # ajoute à la fin
print(ports)       # [22, 80, 443, 8080, 8443]`),
            h("Les dictionnaires : clé vers valeur"),
            p(
              "Un dictionnaire associe une clé à une valeur. On accède par la clé, pas par la position."
            ),
            code(`machine = {"nom": "web01", "ip": "192.168.1.10"}
print(machine["nom"])        # web01
machine["port"] = 80         # ajoute une entrée
print("port" in machine)     # True`),
            h("bytes : le langage des réseaux"),
            p(
              "Les réseaux et les fichiers manipulent des octets bruts, une suite de 0 et de 1 regroupés en octets. Quand tu liras une réponse de socket ou un fichier binaire, tu obtiendras un objet bytes, pas une str. Distinguer les deux évite des heures de bug : b\"abc\" n'est pas \"abc\"."
            ),
            code(`b"abc".decode()   # bytes -> str : b"abc" devient "abc"
"abc".encode()    # str -> bytes : "abc" devient b"abc"`),
            callout(
              "Pour le réseau, toujours penser au texte vs octets : on encode ce qu'on envoie (.encode()) et on décode ce qu'on reçoit (.decode()). C'est une des sources d'erreur les plus fréquentes en Python réseau.",
              "warning"
            ),
            h("En résumé"),
            list(
              "Chaque valeur Python a un type : int, str, list, dict, bool, bytes (et float).",
              "Les listes s'indexent par position à partir de 0 ; -1 désigne le dernier.",
              "Les dictionnaires s'indexent par clé, pas par position.",
              "Les données réseau arrivent en bytes et se convertissent avec .decode()."
            )
          ],
        },
        {
          id: "py-lecon-16",
          title: "Conditions et boucles en Python",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("L'indentation est obligatoire"),
            p(
              "Comme en Bash, Python a des conditions (choisir un chemin) et des boucles (répéter). Mais la syntaxe diffère radicalement : Python utilise l'indentation, les espaces en début de ligne, pour délimiter les blocs, là où Bash utilise then, fi, done."
            ),
            p(
              "En Bash, si tu oublies fi, le script plante ; en Python, si tu oublies l'indentation, le programme ne démarre pas. L'indentation n'est pas décorative : elle structure le code."
            ),
            h("Les conditions"),
            code(`#!/usr/bin/env python3
code = 404

if code == 200:
    print("Page trouvée !")
elif code == 404:
    print("Page introuvable.")
else:
    print("Autre code :", code)`),
            h("Les différences cruciales avec Bash"),
            list(
              "Les blocs sont délimités par l'indentation (4 espaces par convention), pas par then/fi.",
              "On termine la ligne par deux-points : après if, elif, else, for, while.",
              "L'égalité se teste avec == (et non =, qui est l'affectation).",
              "Les opérateurs de comparaison sont les symboles mathématiques : ==, !=, <, >, <=, >=.",
              "Les combinaisons logiques s'écrivent en toutes lettres : and, or, not."
            ),
            code(`if code >= 400 and code < 500:
    print("C'est une erreur du client (4xx).")`),
            h("Les boucles"),
            code(`# boucle for : pour chaque élément d'une liste
for port in [22, 80, 443, 8080]:
    print("Je teste le port", port)

# boucle for avec range() : une suite de nombres
for i in range(5):          # 0, 1, 2, 3, 4
    print("Itération", i)

for port in range(1, 1025): # de 1 à 1024 inclus
    print("Port", port)

# boucle while : tant que la condition est vraie
compteur = 0
while compteur < 3:
    print("Tentative", compteur)
    compteur += 1           # équivaut à compteur = compteur + 1`),
            p(
              "range(1, 1025) génère les nombres de 1 à 1024 : c'est exactement le point de départ d'un scan de ports maison."
            ),
            callout(
              "4 espaces d'indentation, jamais de tabulations mélangées aux espaces. Et n'oublie jamais : == pour comparer, = pour affecter.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Python structure avec l'indentation et les deux-points :, pas avec then/fi.",
              "Les comparaisons utilisent ==, <, >, and, or, not.",
              "for parcourt listes et range() ; while répète tant qu'une condition tient.",
              "range(1, 1025) donne les ports 1 à 1024 : la base d'un scan."
            )
          ],
        },
        {
          id: "py-lecon-17",
          title: "Les listes par compréhension",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Construire une liste en une ligne"),
            p(
              "Une liste par compréhension (list comprehension) crée une liste à partir d'une autre, en une seule expression. C'est du sucre syntaxique : plus court, plus lisible, et souvent plus rapide qu'une boucle classique."
            ),
            code(`carres = [x * x for x in range(6)]
print(carres)   # [0, 1, 4, 9, 16, 25]`),
            h("Le squelette"),
            p(
              "[expression for variable in sequence] : pour chaque élément de la séquence, on calcule l'expression et on l'ajoute à la nouvelle liste. On peut lire la ligne comme : « carres = la liste des x au carré pour chaque x dans range(6) »."
            ),
            h("En cybersécurité : parser des arguments"),
            p(
              "Un exemple emblématique : convertir une chaîne de ports séparés par des virgules en liste d'entiers. \"22,80,443\" se découpe avec split(\",\"), puis chaque morceau se convertit avec int()."
            ),
            code(`ports = [int(p) for p in "22,80,443,8080".split(",")]
print(ports)   # [22, 80, 443, 8080]`),
            h("Avec une condition"),
            p(
              "On peut filtrer en ajoutant une condition à la fin : seuls les éléments qui la respectent entrent dans la nouvelle liste."
            ),
            code(`ports_faibles = [p for p in ports if p < 1024]
print(ports_faibles)   # les ports inférieurs à 1024`),
            h("Cas d'usage"),
            list(
              "Convertir une liste d'arguments en entiers.",
              "Nettoyer une liste en éliminant les valeurs vides.",
              "Extraire un champ de chaque ligne d'un fichier.",
              "Préparer une liste de cibles avant un scan."
            ),
            h("En résumé"),
            list(
              "[expr for x in sequence] construit une liste en une ligne.",
              "On peut filtrer avec une condition : [expr for x in seq if condition].",
              "C'est le moyen idiomatique de convertir et de filtrer des listes.",
              "exemple phare : [int(p) for p in \"22,80\".split(\",\")]."
            )
          ],
        },
        {
          id: "py-lecon-18",
          title: "Fonctions def et modules import",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Factoriser son code"),
            p(
              "Comme en Bash, une fonction Python est un bloc de code nommé, réutilisable, qui reçoit des paramètres et peut retourner une valeur. Les fonctions évitent la duplication et rendent le code testable."
            ),
            code(`#!/usr/bin/env python3
def est_pair(nombre):
    """Retourne True si nombre est pair, sinon False."""
    return nombre % 2 == 0

for n in range(1, 6):
    print(n, "pair ?", est_pair(n))`),
            h("Les quatre éléments à retenir"),
            list(
              "def déclare la fonction, son nom et ses paramètres entre parenthèses.",
              "Le corps de la fonction est indenté (4 espaces).",
              "return renvoie une valeur (ou None si absent).",
              "La docstring entre \"\"\" \"\"\" documente le rôle de la fonction."
            ),
            h("Les modules et import"),
            p(
              "Un module est un fichier de code Python (ou une bibliothèque installée) que l'on importe pour réutiliser ses fonctions. Python embarque une bibliothèque standard et peut charger des bibliothèques tierces. Pourquoi réinventer la roue alors que requests existe et est testé par des milliers de personnes ?"
            ),
            code(`import re                     # importe le module entier : re.findall(...)
import sys                    # module du système
from requests import get      # importe une seule fonction : get(...)`),
            h("Installer une bibliothèque tierce"),
            p(
              "Les modules qui ne sont pas dans la bibliothèque standard s'installent avec pip."
            ),
            code(`pip install requests`),
            p(
              "L'exécution d'un script utilise le module sys : sys.argv contient les arguments de la ligne de commande (leçon 23)."
            ),
            callout(
              "Un verbe dans le nom de fonction : extraire_emails, tester_port. Grouper les imports en haut du fichier. Documenter les fonctions importantes avec une docstring.",
              "tip"
            ),
            h("En résumé"),
            list(
              "def nom(parametres): définit une fonction ; return renvoie sa valeur.",
              "Un module est du code réutilisable que l'on charge avec import.",
              "La bibliothèque standard et pip fournissent presque toutes les briques d'un pentester.",
              "Les fonctions factorisent, les modules évitent de réinventer la roue."
            )
          ],
        },
      ],
    },
    {
      id: "py-module-4",
      title: "Python : réseau, web et outils",
      lessons: [
        {
          id: "py-lecon-19",
          title: "Les sockets : socket, connect, connect_ex, timeout",
          type: "theory",
          duration: "18 min",
          blocks: [
            h("La prise réseau"),
            p(
              "Une socket (prise en français) est l'extrémité d'un canal de communication réseau : c'est le mécanisme de base par lequel deux machines échangent des données. Les outils réseau (curl, ssh, navigateur) sont tous construits sur des sockets. Comprendre la socket, c'est comprendre ce que font réellement les outils derrière leur interface."
            ),
            h("Le cycle de vie d'un client socket TCP"),
            code(`#!/usr/bin/env python3
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  # 1. création
s.settimeout(3)                                        # 2. délai max

try:
    s.connect(("example.com", 80))                     # 3. connexion
    s.send(b"HEAD / HTTP/1.1\r\nHost: example.com\r\n\r\n")  # 4. envoi
    reponse = s.recv(4096)                             # 5. réception
    print(reponse.decode(errors="replace"))            # 6. décodage
except socket.timeout:
    print("La connexion a expiré.")
finally:
    s.close()                                          # 7. fermeture`),
            h("Détail de chaque étape"),
            list(
              "Création : socket.socket(famille, type). AF_INET indique Internet (IP), SOCK_STREAM indique TCP. SOCK_DGRAM correspondrait à UDP.",
              "Timeout : s.settimeout(3) impose un maximum de 3 secondes par opération. Sans timeout, le script peut rester bloqué indéfiniment : l'erreur numéro un des débutants.",
              "Connexion : connect((hote, port)) établit la connexion et lève une exception si elle échoue. D'où le try/except.",
              "Envoi : send(data) envoie des octets (bytes). Ici une requête HTTP minimale écrite à la main, avec les \\r\\n du protocole HTTP.",
              "Réception : recv(4096) reçoit au plus 4096 octets. Le serveur peut répondre en plusieurs morceaux.",
              "Décodage : la réponse arrive en bytes, on la transforme en texte avec .decode(). errors=\"replace\" évite de planter sur un caractère imprévu.",
              "Fermeture : close() libère la socket. On la met dans finally pour qu'elle soit fermée même en cas d'erreur."
            ),
            h("connect vs connect_ex : pour le scan de ports"),
            p(
              "Le scanner de ports a un besoin particulier : savoir si une connexion est possible. connect() lève une exception en cas d'échec, ce qui oblige à gérer un try/except pour chaque port. connect_ex est la variante pensée pour cela : elle retourne le code d'erreur (0 si succès, autre chose sinon) au lieu de lever une exception."
            ),
            code(`#!/usr/bin/env python3
import socket

ip = "127.0.0.1"
ports = [22, 80, 443, 8080]

for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    resultat = s.connect_ex((ip, port))
    if resultat == 0:
        print(f"[+] {ip}:{port} OUVERT")
    else:
        print(f"[-] {ip}:{port} fermé")
    s.close()`),
            h("Les f-strings"),
            p(
              "Le f devant la chaîne crée une f-string : les expressions entre accolades sont remplacées par leurs valeurs. f\"[+] {ip}:{port} OUVERT\" affiche par exemple [+] 127.0.0.1:80 OUVERT."
            ),
            callout(
              "Un scan de ports automatique est un acte technique neutre, mais l'usage sans autorisation est illégal et immédiatement visible dans les logs de la cible. Utilise 127.0.0.1, tes machines virtuelles ou les plateformes d'entraînement. Un administrateur teste ses propres serveurs, un pentester agit sur mandat écrit.",
              "danger"
            ),
            h("Bonnes pratiques"),
            list(
              "Toujours un timeout (settimeout), sinon le script peut se bloquer.",
              "Fermer chaque socket créée (close()), sinon on épuise les ressources.",
              "connect_ex pour les scans, connect + try/except pour les dialogues.",
              "send prend des bytes : encoder son texte avec .encode()."
            ),
            h("En résumé"),
            list(
              "socket.socket(AF_INET, SOCK_STREAM) crée une connexion TCP.",
              "connect lève une exception en cas d'échec, connect_ex retourne un code.",
              "send et recv échangent des octets ; le timeout évite les blocages.",
              "Les f-strings (f\"...\") formattent proprement les messages."
            )
          ],
        },
        {
          id: "py-lecon-20",
          title: "Requêtes HTTP avec requests : get, post, session",
          type: "theory",
          duration: "17 min",
          blocks: [
            h("HTTP sans souffrir"),
            p(
              "HTTP (HyperText Transfer Protocol) est le langage du web : un client envoie une requête à un serveur, qui répond avec un contenu et un code de statut. Faire du web à la main avec socket est pénible : il faut gérer les en-têtes, les cookies, les redirections, l'encodage. Le module requests fait tout cela pour toi en une ligne."
            ),
            p("Installation du module (une seule fois) puis premier script :"),
            code(`pip install requests`),
            code(`#!/usr/bin/env python3
import requests

r = requests.get("https://httpbin.org/get")   # 1. requête GET
print("Code de statut :", r.status_code)       # 2. code HTTP
print("En-têtes :", r.headers)                 # 3. en-têtes de la réponse
print("Contenu texte :", r.text[:120])         # 4. corps de la réponse
print("JSON :", r.json())                      # 5. si la réponse est du JSON`),
            h("Analyser la réponse"),
            list(
              "get(url) envoie une requête GET (demander une ressource).",
              "r.status_code est le code HTTP : 200 (OK), 301/302 (redirection), 403 (interdit), 404 (introuvable), 500 (erreur serveur).",
              "r.headers est un dictionnaire des en-têtes (Content-Type, Server, Set-Cookie...).",
              "r.text est le corps de la réponse en texte ; r.json() le décode si le serveur a répondu en JSON."
            ),
            h("POST : envoyer des données"),
            p(
              "data={...} envoie un formulaire classique. C'est exactement ce que fait un navigateur quand tu valides un formulaire de connexion."
            ),
            code(`r = requests.post("https://httpbin.org/post", data={"nom": "alice", "role": "etudiant"})
print(r.status_code)
print(r.json()["form"])    # le serveur renvoie ce qu'il a reçu`),
            h("En-têtes personnalisés"),
            code(`r = requests.get("https://httpbin.org/get", headers={"User-Agent": "CyberAcademy/1.0"})
print(r.request.headers.get("User-Agent"))`),
            h("Sessions et cookies"),
            p(
              "Une session requests.Session() mémorise les cookies et les en-têtes entre les requêtes, comme le ferait un navigateur. C'est indispensable pour simuler un utilisateur qui se connecte puis navigue : le cookie de session doit être renvoyé à chaque requête, sinon le serveur te traite comme un nouvel inconnu à chaque fois."
            ),
            code(`#!/usr/bin/env python3
import requests

s = requests.Session()                      # une seule session réutilisée
s.headers.update({"User-Agent": "CyberAcademy/1.0"})

r = s.get("https://httpbin.org/cookies/set/niveau/3")  # le serveur pose un cookie
print("Cookie reçu :", s.cookies.get("niveau"))        # 3

r2 = s.get("https://httpbin.org/cookies")   # la session renvoie le cookie
print("Le serveur voit :", r2.json())`),
            h("L'analogie du guichet"),
            p(
              "Le HTTP, c'est comme aller à un guichet : le GET c'est « donne-moi le document X », le POST c'est « voici mon formulaire, traite-le », le code 404 c'est « document introuvable », le cookie c'est le tampon qu'on te met sur la main pour que le guichetier te reconnaisse aux autres fenêtres. Sans session, tu perds ton tampon à chaque guichet."
            ),
            h("Bonnes pratiques"),
            list(
              "Toujours vérifier r.status_code avant d'utiliser r.text ou r.json() : une page en erreur ne contient pas les données attendues.",
              "Réutiliser une requests.Session() pour les connexions répétées.",
              "timeout=5 sur chaque requête pour ne jamais bloquer : requests.get(url, timeout=5).",
              "Un User-Agent clair et honnête : certains serveurs rejettent les clients non standard."
            ),
            callout(
              "httpbin.org est un service de test public et gratuit, très utilisé en formation. Il peut être temporairement indisponible (code 5xx) : dans ce cas, ce n'est pas ton script qui est en cause. Réessaie plus tard, ou remplace l'URL par celle d'une cible que tu contrôles, en gardant exactement le même code.",
              "tip"
            ),
            h("En résumé"),
            list(
              "requests.get/post envoie des requêtes HTTP et renvoie un objet avec .status_code, .headers, .text, .json().",
              "data={...} envoie un formulaire classique.",
              "Session() conserve cookies et en-têtes entre les requêtes.",
              "Vérifier le statut et mettre un timeout sont deux réflexes vitaux."
            )
          ],
        },
        {
          id: "py-lecon-21",
          title: "Les expressions régulières avec re",
          type: "theory",
          duration: "17 min",
          blocks: [
            h("Une recette de recherche dans un texte"),
            p(
              "Une expression régulière (regex) est un mini-langage qui décrit un motif à trouver dans un texte. Les logs, les réponses HTTP, les fichiers de configuration sont des masses de texte : trouver toutes les IPs d'un log, toutes les URLs d'une page ou tous les emails d'un fichier à la main est impossible au-delà de quelques dizaines de lignes. La regex est l'outil de parsing du pentester et de l'analyste SOC."
            ),
            h("Les briques du motif"),
            code(`MOTIF        SENS
.            n'importe quel caractère
*            0 fois ou plus (le caractère précédent)
+            1 fois ou plus
?            0 ou 1 fois
[abc]        un des caractères de la liste
[^abc]       tout sauf ces caractères
\\d          un chiffre
\\w          une lettre, un chiffre ou _
\\s          un espace
^            début de la chaîne
$            fin de la chaîne
{n,m}        entre n et m occurrences
(...)        groupe qui capture
\\b          frontière de mot`),
            h("Les deux fonctions principales"),
            list(
              "re.findall(motif, texte) : retourne la liste de toutes les correspondances.",
              "re.search(motif, texte) : cherche la première correspondance et retourne un objet (ou None si rien) ; on lit le résultat avec .group()."
            ),
            h("Extraire les IPs d'un log"),
            code(`#!/usr/bin/env python3
import re

log = """
192.168.1.10 - - [06/Aug/2026:10:12:01] "GET /index.html" 200
192.168.1.55 - - [06/Aug/2026:10:12:03] "POST /login.php" 403
10.0.0.7 - - [06/Aug/2026:10:12:09] "GET /admin" 404
"""

ips = re.findall(r"\\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b", log)
print(ips)   # ['192.168.1.10', '192.168.1.55', '10.0.0.7']`),
            p(
              "Le groupe non capturant (?:...) évite que findall renvoie seulement le contenu du groupe au lieu de la correspondance complète. Sans lui, on obtiendrait des morceaux incomplets. Et la chaîne brute r\"...\" évite que Python interprète les backslashes : r\"\\d\" est bien le motif « chiffre » et non un caractère d'échappement."
            ),
            h("Motifs courants en cybersécurité"),
            code(`Adresse IP    : \\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b
URL http/https : https?://[^\\s\\"'<>]+
Adresse email : [A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}
Numéro de port : :\\d{1,5}`),
            code(`import re

texte = """Contacter support@cyberacademy.fr ou joe@example.org
Site : https://www.cyberacademy.fr/cours et blog : http://blog.cyberacademy.fr/post/7"""

urls = re.findall(r"https?://[^\\s\\"'<>]+", texte)
emails = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}", texte)

print("URLs :", urls)
print("Emails :", emails)`),
            h("Le piège du gourmand (greedy)"),
            p(
              "Par défaut, * et + mangent autant que possible. Pour obtenir plusieurs correspondances au lieu d'une seule énorme, on rend le quantifiant paresseux avec ?."
            ),
            code(`import re
texte = "<b>un</b> et <b>deux</b>"
print(re.findall(r"<b>.*</b>", texte))    # gourmand  : ['<b>un</b> et <b>deux</b>']
print(re.findall(r"<b>.*?</b>", texte))   # paresseux : ['<b>un</b>', '<b>deux</b>']`),
            callout(
              "Toujours tester le motif sur un petit exemple avant de l'utiliser sur des masses de données. Utiliser r\"...\" pour éviter les surprises avec les backslashes. En cas de doute sur les groupes, utiliser (?:...) pour ne pas capturer.",
              "tip"
            ),
            h("En résumé"),
            list(
              "Une regex décrit un motif de texte : \\d, \\w, \\s, ^, $, {...}, (...).",
              "re.findall renvoie toutes les correspondances ; re.search la première.",
              "Les motifs courants couvrent les IPs, les URLs et les emails.",
              "r\"...\" évite les confusions, et ? après * ou + rend la recherche paresseuse."
            )
          ],
        },
        {
          id: "py-lecon-22",
          title: "Exécuter des commandes avec subprocess",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le pont vers le terminal"),
            p(
              "Parfois, l'outil parfait existe déjà en ligne de commande : nmap, curl, dig, whois. Inutile de le réécrire en Python. Le module subprocess permet d'appeler ces commandes depuis Python et d'automatiser leur enchaînement."
            ),
            h("La fonction moderne : subprocess.run()"),
            code(`#!/usr/bin/env python3
import subprocess

resultat = subprocess.run(
    ["hostname"],                 # la commande, découpée en liste de mots
    capture_output=True,          # capture la sortie au lieu de l'afficher
    text=True                     # la sortie est du texte, pas des octets
)

print("Code de retour :", resultat.returncode)
print("Sortie :", resultat.stdout.strip())
print("Erreur :", resultat.stderr)`),
            h("Analyser le résultat"),
            list(
              "La commande est passée comme une liste de mots : [\"ls\", \"-l\", \"/var/log\"]. C'est plus sûr que de construire une grande chaîne.",
              "returncode vaut 0 en cas de succès.",
              "stdout contient la sortie normale, stderr les messages d'erreur."
            ),
            h("Vérifier le succès"),
            code(`import subprocess

commande = subprocess.run(["nmap", "--version"], capture_output=True, text=True)
if commande.returncode == 0:
    print("nmap est installé :", commande.stdout.splitlines()[0])
else:
    print("nmap absent ou erreur :", commande.stderr)`),
            p(
              "Le paramètre check=True simplifie la vérification : si la commande échoue, Python lève une exception au lieu de continuer avec un résultat vide."
            ),
            code(`try:
    subprocess.run(["ls", "/chemin/inexistant"], check=True)
except subprocess.CalledProcessError as e:
    print("La commande a échoué avec le code", e.returncode)`),
            h("Exemple réel"),
            p(
              "Un script Python doit lister les enregistrements DNS d'un site. Il appelle dig via subprocess.run([\"dig\", \"example.com\", \"ANY\", \"+short\"]), capture la sortie, puis parse les résultats avec une regex. Le script combine la puissance de dig et la souplesse de Python."
            ),
            callout(
              "Ne jamais concaténer une saisie utilisateur dans une commande sans l'échapper : risque d'injection de commande, que l'on verra en détail au niveau suivant. La liste de mots [\"ping\", \"-c\", \"1\", ip] est la forme sûre.",
              "danger"
            ),
            h("En résumé"),
            list(
              "subprocess.run(liste_de_mots, capture_output=True, text=True) lance une commande système.",
              "returncode, stdout et stderr exposent le résultat.",
              "check=True transforme un échec en exception.",
              "C'est le pont entre Python et les outils ligne de commande existants."
            )
          ],
        },
        {
          id: "py-lecon-23",
          title: "Les arguments : sys.argv puis argparse",
          type: "theory",
          duration: "14 min",
          blocks: [
            h("Un script réutilisable"),
            p(
              "Un script qui a sa cible en dur dans le code doit être modifié à chaque usage. Un script qui lit ses paramètres en arguments est réutilisable : on lance python3 scan.py 192.168.1.10 80 puis python3 scan.py 10.0.0.5 443 sans toucher au code."
            ),
            h("sys.argv : la liste brute des arguments"),
            p(
              "Quand on lance python3 scan.py 192.168.1.10 80, les mots après le nom du script sont des arguments. Le module sys les expose dans la liste sys.argv : sys.argv[0] est le nom du script, sys.argv[1] le premier argument, etc."
            ),
            code(`#!/usr/bin/env python3
import sys

if len(sys.argv) < 3:
    print("Usage : python3 scan.py <IP> <port>")
    sys.exit(1)          # quitte avec un code d'erreur

ip = sys.argv[1]
port = int(sys.argv[2])  # les arguments arrivent en str : conversion !
print(f"Scan de {ip}:{port}")`),
            h("Convertir les arguments"),
            p(
              "Les arguments arrivent toujours en str. Un port doit être converti avec int() : sans conversion, \"80\" + 1 planterait. C'est une erreur fréquente des débutants."
            ),
            h("argparse : la version professionnelle"),
            p(
              "Pour les vrais outils, on utilise argparse, qui gère automatiquement les options nommées (--cible), les options courtes (-c), l'aide (--help) et les erreurs."
            ),
            code(`#!/usr/bin/env python3
import argparse

parser = argparse.ArgumentParser(description="Scanneur de ports maison")
parser.add_argument("-i", "--ip", required=True, help="IP cible")
parser.add_argument("-p", "--ports", default="22,80,443", help="Ports, séparés par des virgules")
parser.add_argument("-t", "--timeout", type=int, default=1, help="Timeout en secondes")

args = parser.parse_args()

print("Cible :", args.ip)
print("Ports :", args.ports)
print("Timeout :", args.timeout)`),
            p("Lancements possibles :"),
            code(`python3 scan.py -i 127.0.0.1 -p 22,80 -t 2
python3 scan.py --ip 127.0.0.1 --help`),
            h("Pourquoi argparse"),
            list(
              "Les options nommées et courtes fonctionnent automatiquement.",
              "L'aide --help et les messages d'erreur sont générés.",
              "type=int convertit les valeurs tout seul.",
              "L'outil nmap lui-même est un exemple d'interface en ligne de commande : en écrivant tes outils avec argparse, tu reproduis ce standard."
            ),
            h("En résumé"),
            list(
              "sys.argv est la liste brute des arguments ; sys.argv[0] est le nom du script.",
              "Les arguments sont des chaînes qu'il faut convertir avec int() ou float().",
              "argparse ajoute l'interface professionnelle : options, aide, erreurs, conversions.",
              "sys.argv pour 1-2 arguments simples, argparse dès que l'outil grossit."
            )
          ],
        },
        {
          id: "py-lecon-24",
          title: "Paralléliser avec threading",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Le temps, c'est du réseau"),
            p(
              "Un scan de ports séquentiel attend la fin de chaque test avant de passer au suivant : avec 1000 ports et 1 seconde de timeout chacun, le pire cas est 1000 secondes, soit plus de 16 minutes. Mais le temps de connexion à chaque port est indépendant : autant les tester simultanément."
            ),
            h("Un thread : une tâche en parallèle"),
            p(
              "Un thread (fil d'exécution) est une tâche qui tourne en parallèle d'autres tâches dans le même programme. Le module threading permet d'en lancer plusieurs en même temps."
            ),
            code(`#!/usr/bin/env python3
import threading
import time

def tache(nom, duree):
    print(f"Début de {nom}")
    time.sleep(duree)
    print(f"Fin de {nom}")

threads = []
for i in range(3):
    t = threading.Thread(target=tache, args=(f"tache-{i}", i + 1))
    t.start()          # lance le thread
    threads.append(t)

for t in threads:
    t.join()           # attend que chaque thread soit terminé

print("Toutes les tâches sont finies.")`),
            h("Trois méthodes à retenir"),
            list(
              "threading.Thread(target=fonction, args=(...)) crée un thread qui exécutera fonction avec les arguments donnés.",
              ".start() lance réellement le thread : la fonction se met à tourner.",
              ".join() attend la fin du thread. Sans join, le programme principal peut se terminer avant les threads."
            ),
            h("Le pattern « file de travail » (worker pool)"),
            p(
              "Pour un scan de ports, on ne crée pas 65 000 threads : c'est trop. On fixe un nombre de workers (par exemple 100) et chaque worker pioche les ports à tester dans une liste partagée."
            ),
            code(`#!/usr/bin/env python3
import socket
import threading

host = "127.0.0.1"
debut, fin = 1, 1024
nb_workers = 100

ports_a_tester = list(range(debut, fin + 1))
ports_ouverts = []
verrou = threading.Lock()   # protège l'accès aux listes partagées

def tester_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.3)
    if s.connect_ex((host, port)) == 0:
        with verrou:
            ports_ouverts.append(port)
    s.close()

def worker():
    while ports_a_tester:
        port = ports_a_tester.pop()   # pioche le prochain port à tester
        tester_port(port)

workers = [threading.Thread(target=worker) for _ in range(nb_workers)]
for w in workers:
    w.start()
for w in workers:
    w.join()

print("Ports ouverts :", sorted(ports_ouverts))`),
            h("Le verrou (Lock)"),
            p(
              "threading.Lock() garantit que deux threads ne modifient pas la liste ports_ouverts en même temps, ce qui pourrait écraser une valeur. Le bloc with verrou: n'autorise qu'un thread à la fois à l'intérieur."
            ),
            callout(
              "Un scan parallèle massif peut ressembler à une attaque par déni de service. Même sur une cible autorisée, garde un nombre de threads raisonnable (50-100 suffisent largement) et des timeouts courts. Le but est d'être discret et efficace, pas de saturer.",
              "danger"
            ),
            h("En résumé"),
            list(
              "threading.Thread(target=f, args=()) + .start() + .join() exécute des tâches en parallèle.",
              "Le pattern « workers » fixe un nombre de tâches simultanées qui piochent dans une liste.",
              "Un Lock protège les données partagées.",
              "Résultat : un scan 10 à 100 fois plus rapide."
            )
          ],
        },
        {
          id: "py-lecon-25",
          title: "Mini-projet : scanner de ports en Python",
          type: "exercise",
          duration: "25 min",
          blocks: [
            h("L'objectif"),
            p(
              "Tu construis ton premier outil de scan maison. Il fait en Python ce que nmap fait en plus riche, mais tu le comprends ligne à ligne. Dans les niveaux suivants, tu prendras nmap pour de vrai : tu sauras exactement ce qu'il fait derrière l'écran."
            ),
            h("Étape 1 — Le scan séquentiel de base"),
            code(`#!/usr/bin/env python3
import socket

ip = "127.0.0.1"
ports = list(range(1, 1025))

for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    if s.connect_ex((ip, port)) == 0:
        print(f"[+] {ip}:{port} est OUVERT")
    s.close()`),
            p(
              "Teste ce script sur 127.0.0.1. Note que chaque socket est fermée (s.close()) et qu'un timeout court est posé : sans cela, un port muet bloquerait tout."
            ),
            h("Étape 2 — Accepter une cible en argument"),
            p(
              "Un outil réutilisable lit ses paramètres en arguments : l'IP, et éventuellement une liste de ports séparés par des virgules."
            ),
            code(`#!/usr/bin/env python3
import socket
import sys

if len(sys.argv) < 2:
    print("Usage : python3 scan-python.py <IP> [ports]")
    sys.exit(1)

ip = sys.argv[1]

if len(sys.argv) >= 3:
    ports = [int(p) for p in sys.argv[2].split(",")]
else:
    ports = [22, 80, 443, 8080]

for port in ports:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    resultat = s.connect_ex((ip, port))
    if resultat == 0:
        print(f"[+] {ip}:{port} OUVERT")
    else:
        print(f"[-] {ip}:{port} fermé")
    s.close()`),
            p(
              "Lancement : python3 scan-python.py 127.0.0.1 ou python3 scan-python.py 127.0.0.1 22,80,443,8080."
            ),
            h("Étape 3 — La version multi-thread"),
            p(
              "Pour scanner les ports 1 à 1024 vite, on reprend le pattern « workers » de la leçon 24, avec une table des services bien connus."
            ),
            code(`#!/usr/bin/env python3
import socket
import threading

host = "127.0.0.1"
debut, fin = 1, 1024
nb_workers = 50

ports_a_tester = list(range(debut, fin + 1))
ports_ouverts = []
verrou = threading.Lock()

SERVICES = {
    21: "FTP",
    22: "SSH",
    23: "Telnet",
    25: "SMTP",
    53: "DNS",
    80: "HTTP",
    110: "POP3",
    143: "IMAP",
    443: "HTTPS",
    445: "SMB",
    3306: "MySQL",
    5432: "PostgreSQL",
    8080: "HTTP-alt",
}

def tester_port(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.3)
    if s.connect_ex((host, port)) == 0:
        with verrou:
            ports_ouverts.append(port)
    s.close()

def worker():
    while ports_a_tester:
        try:
            port = ports_a_tester.pop()
        except IndexError:
            break
        tester_port(port)

workers = [threading.Thread(target=worker) for _ in range(nb_workers)]
for w in workers:
    w.start()
for w in workers:
    w.join()

ports_ouverts.sort()
print(f"Scan de {host} terminé : {len(ports_ouverts)} port(s) ouvert(s)")
for port in ports_ouverts:
    service = SERVICES.get(port, "inconnu")
    print(f"  [+] {host}:{port}  ({service})")`),
            h("Ce qu'il faut comprendre"),
            list(
              "Le try/except IndexError dans worker gère la course : deux workers peuvent essayer pop() en même temps, et le second n'a plus rien.",
              "Le Lock protège l'ajout à ports_ouverts : sans lui, deux threads pourraient perdre un port.",
              "Le timeout de 0,3 seconde est volontairement court : avec 50 workers, le scan se termine en quelques secondes.",
              "Le dictionnaire SERVICES associe le port à son service bien connu : une table de correspondance simple."
            ),
            p("Résultat attendu (exemple, selon les services actifs sur ta machine) :"),
            code(`Scan de 127.0.0.1 terminé : 2 port(s) ouvert(s)
  [+] 127.0.0.1:22  (SSH)
  [+] 127.0.0.1:8080  (HTTP-alt)`),
            callout(
              "Ce mini-projet est à exécuter UNIQUEMENT sur 127.0.0.1 (ta machine) ou sur des machines virtuelles et plateformes d'entraînement qui t'autorisent les scans. Un scan de ports sur un système tiers sans autorisation écrite est illégal (article 323-1 du code pénal), même « juste pour tester ».",
              "danger"
            ),
            h("En résumé"),
            list(
              "connect_ex + timeout + close() : le trio de base de tout scan.",
              "sys.argv rend l'outil réutilisable sur n'importe quelle cible autorisée.",
              "Les workers + un Lock parallélisent le scan sans saturer.",
              "Tu as maintenant ton propre scanner : dans les prochains niveaux, tu sauras lire ce que fait nmap."
            )
          ],
        },
      ],
    },
    {
      id: "py-module-5",
      title: "Outils du quotidien et passage au niveau 4",
      lessons: [
        {
          id: "py-lecon-26",
          title: "curl avancé : -s, -o, -w, -L, -c, -b, -X, -H, -d, -k",
          type: "theory",
          duration: "16 min",
          blocks: [
            h("Le navigateur sans interface"),
            p(
              "curl (Client URL) est l'outil en ligne de commande pour faire des requêtes HTTP(S). Il est installé partout, même sur les systèmes minimaux, et c'est le compagnon quotidien du pentester : il fait les mêmes requêtes HTTP qu'un navigateur, mais au lieu d'afficher une page, il te montre la réponse brute. Parfait pour voir ce que le navigateur te cache."
            ),
            h("Les 10 options à connaître"),
            list(
              "-s (silent) : n'affiche ni barre de progression ni erreurs.",
              "-o fichier (output) : écrit le corps de la réponse dans un fichier.",
              "-o /dev/null : jette le corps dans la poubelle système, on ne garde que le code.",
              "-w \"%{http_code}\" (write-out) : affiche une variable après la requête.",
              "-L (location) : suit les redirections 301/302 jusqu'au bout.",
              "-c fichier (cookie-jar) : écrit les cookies reçus dans un fichier.",
              "-b fichier (cookie) : envoie les cookies du fichier.",
              "-X METHODE (request) : force la méthode HTTP.",
              "-H \"clé: valeur\" (header) : ajoute un en-tête personnalisé.",
              "-d \"champ=valeur\" (data) : envoie des données (méthode POST par défaut).",
              "-k (insecure) : ignore les erreurs de certificat TLS."
            ),
            h("En pratique"),
            code(`# Récupérer uniquement le code HTTP
curl -s -o /dev/null -w "%{http_code}\n" https://example.com

# Suivre les redirections et afficher le code final
curl -s -L -o /dev/null -w "%{http_code}\n" http://example.com

# Garder les cookies d'une connexion, puis les réutiliser
curl -s -c jar.txt -d "user=alice&pass=secret" https://httpbin.org/post
curl -s -b jar.txt https://httpbin.org/cookies

# Envoyer une méthode et des en-têtes personnalisés
curl -s -X GET -H "Authorization: Bearer token123" -w "%{http_code}\n" https://httpbin.org/get

# Ignorer le certificat (usage autorisé en lab uniquement)
curl -sk https://127.0.0.1:8443`),
            h("Les variables de -w les plus utiles"),
            list(
              "%{http_code} : le code de statut.",
              "%{url_effective} : l'URL finale après les redirections.",
              "%{time_total} : la durée totale de la requête.",
              "%{size_download} : la taille reçue.",
              "%{remote_ip} : l'IP qui a répondu."
            ),
            p(
              "Exemple réel : un pentester suspecte que le serveur suit des redirections vers un domaine de squatting. Une ligne curl -s -L -w \"%{url_effective}\\n\" lui montre immédiatement l'URL finale. L'investigation commence par un curl, pas par un navigateur."
            ),
            h("Bonnes pratiques"),
            list(
              "Combiner -s -o /dev/null -w \"%{http_code}\" pour ne récupérer que le code.",
              "Toujours -L si tu veux l'état final d'une ressource après redirections.",
              "En boucle, mettre un --max-time pour ne pas bloquer.",
              "Commencer par tester la requête à la main avec curl, puis la reproduire en Python."
            ),
            callout(
              "curl -k « ignore » la validation du certificat : cette option ne doit être utilisée que sur des cibles que tu gères ou des labos autorisés. Sur un vrai test, une erreur de certificat est une information en soi : elle se signale, elle ne se masque pas.",
              "warning"
            ),
            h("En résumé"),
            list(
              "curl fait des requêtes HTTP en ligne de commande.",
              "-s silencieux, -o vers fichier, -w \"%{http_code}\" affiche le code, -L suit les redirections.",
              "-c/-b gèrent les cookies, -X force la méthode, -H ajoute des en-têtes, -d envoie des données.",
              "-k ignore les certificats : usage lab uniquement."
            )
          ],
        },
        {
          id: "py-lecon-27",
          title: "Git de base : clone, add, commit, push, log",
          type: "theory",
          duration: "15 min",
          blocks: [
            h("Le journal de bord du code"),
            p(
              "Git est un logiciel de gestion de versions : il enregistre l'historique de tous les changements de tes fichiers. Ton code, tes scripts, ta documentation sont suivis : on peut revenir en arrière, comparer les versions, travailler à plusieurs."
            ),
            p(
              "En cybersécurité, tes scripts évoluent et tes rapports se succèdent. Sans git, tu finis avec des fichiers script_v2_final_VRAI.sh. Avec git, chaque changement est daté, commenté et réversible. Git est aussi le standard pour partager des outils : la majorité des outils de sécurité vivent sur GitHub."
            ),
            h("Les commandes de base"),
            code(`# Récupérer une copie d'un dépôt distant
git clone https://github.com/utilisateur/repertoire.git

# Voir l'état du dépôt (fichiers modifiés, non suivis...)
git status

# Ajouter des fichiers à l'étape « prêt à commiter »
git add script.py
git add .                # ajoute tout

# Enregistrer une version avec un message
git commit -m "Ajout du scanner de ports"

# Voir l'historique des commits
git log --oneline

# Envoyer les commits vers le dépôt distant
git push`),
            h("Le flux de travail"),
            p("Git fonctionne en quatre étapes, comme un journal de bord avec une étagère :"),
            list(
              "Tu modifies tes fichiers (nano, vim, ton éditeur).",
              "git add place les modifications sur l'étagère (zone de staging).",
              "git commit inscrit l'état de l'étagère dans l'historique, avec un message.",
              "git push envoie cet historique vers le dépôt distant (ex. GitHub)."
            ),
            code(`Fichiers modifiés --> git add --> Zone de staging --> git commit --> Historique
                                      (l'« étagère »)            (le « journal »)`),
            h("L'analogie du journal"),
            p(
              "Git est un journal de bord avec points de restauration. Tu n'écris pas « version 3 » en rouge : tu fais un commit, c'est-à-dire que tu inscris dans le journal : « à cette date, voici exactement l'état de mon code, et voici ce que j'ai changé ». On peut toujours revenir à une page du journal."
            ),
            h("Cas d'usage en cybersécurité"),
            list(
              "Versionner ses propres outils, du premier script aux versions finales.",
              "Récupérer des outils open source : un pentester passe sa vie à git clone.",
              "Collaborer et documenter sa démarche de façon traçable.",
              "git status avant et après chaque action pour savoir où on en est."
            ),
            callout(
              "Ne jamais committer de secrets : mots de passe, clés, tokens. Dans un dépôt public, c'est une fuite de données instantanée et indélébile. Vérifie ce que tu ajoutes avec git status.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Git enregistre l'historique de tes fichiers : chaque changement est daté et réversible.",
              "clone copie un dépôt, add met en étagère, commit inscrit une version, push l'envoie au distant.",
              "log montre l'historique ; status montre l'état courant.",
              "C'est l'outil de traçabilité de la profession : versionne tout, dès le premier script."
            )
          ],
        },
        {
          id: "py-lecon-28",
          title: "Démonstrations guidées, cas réels et bonnes pratiques",
          type: "exercise",
          duration: "25 min",
          blocks: [
            h("Mettre les mains dans le cambouis"),
            p(
              "Cette leçon rassemble les quatre outils que tu as construits pendant le niveau, sous leur forme complète, puis deux scénarios réels. Reproduis-les dans un dossier de travail : ce sera ton kit de base pour tous les niveaux suivants."
            ),
            h("Démo 1 — scan-ports.sh : le scanner Bash"),
            code(`#!/bin/bash
# scan-ports.sh — teste les ports 22, 80, 443 sur une IP
IP="$1"

if [ -z "$IP" ]; then
    echo "Usage : ./scan-ports.sh <adresse-IP>"
    exit 1
fi

for port in 22 80 443; do
    if nc -z -w 1 "$IP" "$port" 2>/dev/null; then
        echo "[+] $IP:$port est OUVERT"
    else
        echo "[-] $IP:$port est fermé"
    fi
done`),
            p(
              "chmod +x scan-ports.sh puis ./scan-ports.sh 127.0.0.1. Le trio variable + condition + boucle est exactement la logique de tous les scripts de scan."
            ),
            h("Démo 2 — verif-urls.sh : le vérificateur d'URLs"),
            code(`#!/bin/bash
# verif-urls.sh — codes HTTP d'une liste d'URLs
LISTE="$1"

if [ -z "$LISTE" ] || [ ! -f "$LISTE" ]; then
    echo "Usage : ./verif-urls.sh <fichier-avec-urls>"
    exit 1
fi

while read -r url; do
    [ -n "$url" ] || continue
    code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 5 "$url")
    finale=$(curl -s -o /dev/null -w "%{url_effective}" -L --max-time 5 "$url")
    echo "$code  $url  ->  $finale"
done < "$LISTE"`),
            p(
              "La redirection http:// vers https:// est visible : l'URL finale diffère de l'URL de départ. C'est une information de sécurité importante (un site qui ne force pas HTTPS sur toutes ses URLs peut exposer des données)."
            ),
            h("Démo 3 — session-web.py : session et cookies"),
            code(`#!/usr/bin/env python3
import requests

s = requests.Session()
s.headers.update({"User-Agent": "CyberAcademy-Etudiant/1.0"})

r1 = s.get("https://httpbin.org/get")
print("Code initial :", r1.status_code)
print("En-tête Content-Type :", r1.headers.get("Content-Type"))
print("IP vue par le serveur :", r1.json().get("origin"))

s.get("https://httpbin.org/cookies/set/niveau/3")
print("Cookie mémorisé :", s.cookies.get("niveau"))

r2 = s.get("https://httpbin.org/cookies")
print("Le serveur a reçu :", r2.json().get("cookies"))`),
            p(
              "Deux points professionnels : la session conserve le cookie entre les requêtes (sinon le serveur te traite en inconnu à chaque fois), et on vérifie r1.status_code avant d'utiliser r1.json()."
            ),
            h("Démo 4 — extracteur.py : URLs et emails d'un fichier"),
            code(`#!/usr/bin/env python3
import re
import sys

if len(sys.argv) < 2:
    print("Usage : python3 extracteur.py <fichier>")
    sys.exit(1)

with open(sys.argv[1], "r", encoding="utf-8", errors="ignore") as f:
    texte = f.read()

urls = re.findall(r"https?://[^\s\\"'<>]+", texte)
emails = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", texte)

print("=== URLs ===")
for u in urls:
    print(u)

print("=== Emails ===")
for e in emails:
    print(e)`),
            p(
              "errors=\"ignore\" dans open évite de planter sur un fichier contenant des caractères non décodables : un réflexe pour les fichiers issus d'outils qui produisent du texte sale."
            ),
            h("Cas réel 1 — Énumérer des sous-domaines"),
            p(
              "En phase de recon, la première question est : quels sous-domaines existent ? Avec une liste candidate (www, admin, mail, dev, backup...) et dig, un script Bash teste chaque nom."
            ),
            code(`#!/bin/bash
# enum-sous-domaines.sh — vérifie chaque sous-domaine candidat
DOMAINE="$1"
LISTE="\${2:-sous-domaines.txt}"

if [ -z "$DOMAINE" ]; then
    echo "Usage : ./enum-sous-domaines.sh <domaine> [liste]"
    exit 1
fi

while read -r mot; do
    [ -n "$mot" ] || continue
    nom="$mot.$DOMAINE"
    ip=$(dig +short "$nom" | head -n 1)
    if [ -n "$ip" ]; then
        echo "[+] $nom -> $ip" | tee -a rapport.txt
    fi
done < "$LISTE"`),
            p(
              "tee -a rapport.txt affiche ET ajoute au fichier rapport.txt (-a = append). dig +short renvoie l'IP si le nom existe, rien sinon. Les sous-domaines les plus intéressants pour la suite : admin, backup, dev, test — souvent moins sécurisés que le site principal."
            ),
            h("Cas réel 2 — Vérifier les en-têtes de sécurité de 50 sites"),
            p(
              "Une équipe DevSecOps doit vérifier chaque mois que les sites clients envoient les bons en-têtes de sécurité. Le script compare les en-têtes reçus à la liste attendue et produit un rapport."
            ),
            code(`#!/usr/bin/env python3
import requests

EN_TETES_ATTENDUS = [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
]

with open("sites.txt", "r", encoding="utf-8") as f:
    urls = [ligne.strip() for ligne in f if ligne.strip()]

s = requests.Session()
s.headers.update({"User-Agent": "CyberAcademy-Audit/1.0"})

for url in urls:
    try:
        r = s.get(url, timeout=10)
    except requests.exceptions.RequestException as e:
        print(f"[ERREUR] {url} : {e}")
        continue
    manquants = [h for h in EN_TETES_ATTENDUS if h not in r.headers]
    if manquants:
        print(f"[ALERTE] {url} ({r.status_code}) manque : {', '.join(manquants)}")
    else:
        print(f"[OK] {url} ({r.status_code}) — en-têtes complets")`),
            h("Les bonnes pratiques d'automatisation"),
            list(
              "Toujours tester sur une cible légale : lab, VM, plateformes d'entraînement. La ligne entre « outil » et « délit » n'est pas l'outil mais l'autorisation.",
              "Des timeouts partout : réseau, HTTP, sockets, subprocess. Toute opération qui attend une réponse doit avoir une limite.",
              "Un log propre vaut de l'or : sépare ce que tu affiches (résumé, alertes) de ce que tu écris (tout, avec horodatage).",
              "Structure un script comme un rapport : en-tête de commentaires, variables de configuration en haut, fonctions regroupées.",
              "Commence petit, élargis : un outil de 10 lignes qui marche vaut mieux qu'un outil de 200 lignes qui ne marche pas.",
              "Versionne tout avec git, dès le premier script. Ne commette jamais de secrets."
            ),
            callout(
              "Chaque démonstration et chaque cas réel doivent être reproduits sur 127.0.0.1, sur tes machines virtuelles, ou sur des plateformes d'entraînement qui t'autorisent les scans. Ne teste jamais ces scripts sur une machine sans autorisation écrite : c'est illégal et détectable.",
              "danger"
            ),
            h("En résumé"),
            list(
              "Ton kit de base est prêt : scan-ports.sh, verif-urls.sh, session-web.py, extracteur.py.",
              "Les cas réels (sous-domaines, en-têtes de sécurité) montrent l'automatisation dans le travail quotidien.",
              "L'autorisation est la ligne rouge : lab, VM, plateformes d'entraînement uniquement.",
              "Timeouts, logs propres et git : les réflexes qui font un outil professionnel."
            )
          ],
        },
        {
          id: "py-lecon-29",
          title: "Quiz final du niveau 3",
          type: "quiz",
          duration: "12 min",
          blocks: [
            p(
              "Le grand test de synthèse : 6 questions qui mélangent Bash, Python, sockets, regex, requests et curl. 80 % pour valider le niveau 3."
            ),
            callout(
              "Relis les leçons 1 à 28 si une question te semble difficile : tout ce qui est demandé y est expliqué, et toutes les commandes s'exercent sur 127.0.0.1 ou sur des fichiers que tu crées.",
              "info"
            ),
          ],
          quiz: [
            {
              question: "Quelle commande rend un script Bash directement exécutable ?",
              options: [
                "chmod +x script.sh",
                "bash script.sh",
                "chmod 644 script.sh",
                "./script.sh",
              ],
              answer: 0,
              explanation:
                "chmod +x ajoute le droit d'exécution indispensable pour lancer ./script.sh. bash script.sh fonctionne mais contourne le droit ; chmod 644 donne lecture/écriture sans exécution.",
            },
            {
              question: "Que va afficher echo '$cible' si la variable cible vaut 192.168.1.10 ?",
              options: [
                "192.168.1.10",
                "rien",
                "$cible",
                "une erreur",
              ],
              answer: 2,
              explanation:
                "Les guillemets simples interdisent la substitution : le texte $cible est affiché littéralement. Avec des guillemets doubles, on aurait vu la valeur 192.168.1.10.",
            },
            {
              question: "Quelle commande affiche uniquement le code HTTP d'une URL ?",
              options: [
                "curl url",
                "curl -s -o /dev/null -w \"%{http_code}\" url",
                "curl -L url",
                "curl -X GET url",
              ],
              answer: 1,
              explanation:
                "-s rend curl silencieux, -o /dev/null jette le corps de la réponse, et -w \"%{http_code}\" n'affiche que le code HTTP.",
            },
            {
              question: "Comment créer une socket TCP en Python ?",
              options: [
                "socket.TCP(ip, port)",
                "socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
                "socket.connect(ip)",
                "socket.new(\"tcp\")",
              ],
              answer: 1,
              explanation:
                "socket.socket(famille, type) crée la socket. AF_INET = famille Internet (adresses IP), SOCK_STREAM = TCP. SOCK_DGRAM correspondrait à UDP.",
            },
            {
              question: "Quelle est la différence entre connect et connect_ex ?",
              options: [
                "Aucune, ce sont des synonymes",
                "connect lève une exception en cas d'échec, connect_ex retourne un code",
                "connect est réservé à UDP",
                "connect_ex est plus rapide",
              ],
              answer: 1,
              explanation:
                "Pour un scan de ports, connect_ex évite de gérer une exception par port : il retourne simplement 0 en cas de succès et un code d'erreur sinon.",
            },
            {
              question: "Que renvoie re.findall(motif, texte) ?",
              options: [
                "La première correspondance",
                "Une liste de toutes les correspondances",
                "Un booléen",
                "Un objet Match",
              ],
              answer: 1,
              explanation:
                "findall retourne la liste de toutes les correspondances. search retourne la première sous forme d'objet Match (ou None).",
            },
          ],
        },
        {
          id: "py-lecon-30",
          title: "Cap sur la sécurité web",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("Ce que tu sais faire maintenant"),
            p(
              "Bravo, tu as terminé le niveau 3. Faisons le point sur ce que tu sais faire, car c'est un changement de statut : tu es passé de « utilisateur d'outils » à « fabricant d'outils »."
            ),
            list(
              "Écrire, exécuter et déboguer des scripts Bash : variables, conditions, boucles, fonctions.",
              "Automatiser des requêtes HTTP avec curl et Python requests : codes, redirections, cookies, sessions.",
              "Écrire des scanners de ports avec socket, y compris multi-thread.",
              "Parser des textes et des logs avec les expressions régulières.",
              "Gérer des arguments de ligne de commande (sys.argv, argparse) et lancer des commandes système (subprocess).",
              "Versionner tes outils avec git."
            ),
            h("Bash : l'automatisation directe"),
            list(
              "Rapide, directe, partout : les one-liners et l'assemblage d'outils existants.",
              "curl pour le web, nc pour les ports, grep/awk pour le parsing.",
              "Toutes les commandes des niveaux 1 et 2 deviennent des briques de scripts."
            ),
            h("Python : l'automatisation du raisonnement"),
            list(
              "Structuré, extensible, riche en bibliothèques.",
              "socket, requests, re, subprocess, threading : les briques de tes propres outils.",
              "L'énumération devient un script : scanner, parser les résultats, générer un rapport."
            ),
            h("Le pont vers le niveau 4"),
            p(
              "Tu ne reparleras presque plus de la syntaxe : tu l'utiliseras. Au niveau 4, la sécurité web, tu vas apprendre ce qui se passe de l'autre côté de tes requêtes : comment fonctionnent les serveurs web, comment les attaques se construisent (en-têtes, cookies, sessions, méthodes HTTP, premiers fuzzing), et comment tes scripts Python vont servir à interroger les cibles comme le ferait un vrai pentester."
            ),
            callout(
              "Avec le niveau 3, tu as les outils. Le niveau 4 te donnera les cibles et les techniques. Ton scanner maison, ton vérificateur d'URLs et tes scripts requests seront tes compagnons de chaque leçon.",
              "info"
            ),
            h("Ce qu'il faut retenir de ce niveau"),
            list(
              "Un script transforme une action manuelle en action automatisée, répétable à volonté.",
              "Bash est l'automatisation de la ligne de commande ; Python est l'automatisation du raisonnement.",
              "Un pentester utilise les deux : Bash pour les one-liners, Python pour les outils qui n'existent pas encore.",
              "Tout ce que tu as appris s'exerce légalement sur 127.0.0.1, sur tes machines virtuelles et sur les plateformes d'entraînement autorisées.",
              "Le badge Automate signifie que tu sais fabriquer tes propres outils : c'est la différence entre utilisateur et technicien de la sécurité."
            )
          ],
        },
      ],
    },
  ],
};
