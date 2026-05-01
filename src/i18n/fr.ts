const fr = {
  common: {
    ok: "OK!",
    okay: "D'accord",
    cancel: "Annuler",
    close: "Fermer",
    back: "Retour",
    startButtonText: "Commencer le jeu",
    easyLabel: "Facile",
    mediumLabel: "Moyen",
    hardLabel: "Difficile",
    expertLabel: "Expert",
    difficulty: "Difficulté",
    won: "Gagné",
    lost: "Perdu",
    time: "Temps",
    mistakes: "Erreurs",
    loading: "Chargement...",
    noPuzzle: "Aucune grille trouvée",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
    clearValue: "Effacer la valeur",
    enabled: "Activé",
    disabled: "Désactivé",
  },
  tabs: {
    dashboard: "Tableau de bord",
    gameboard: "Jouer au Sudoku",
    settings: "Paramètres",
  },
  homeScreen: {
    noHistoryTitle: "Votre historique de jeu s'affichera ici.",
    historyTitle: "Historique des jeux",
  },
  settingsScreen: {
    title: "Paramètres",
    description: "Personnalisez les paramètres de l'application.",
    labels: {
      language: "Langue",
      defaultDifficulty: "Difficulté par défaut",
      clearData: "Effacer toutes les données",
      clearHistory: "Effacer l'historique des scores",
      theme: "Thème",
    },
    madeWithLove: "Cette application a été développée avec ❤️ par Avery Ondo.",
  },
  endGameScreen: {
    congratulations: "Félicitations !",
    betterLuckNextTime: "Bonne chance la prochaine fois !",
    playAgain: "Rejouer ?",
  },
  howToPlayModal: {
    buttonText: "Comment jouer",
    title: "Comment jouer au Sudoku",
    step1title: "1. Comprendre la grille",
    step1desc: "La grille 9x9 est divisée en neuf sous-grilles 3x3.",
    step2title: "2. Règles de base :",
    step2bullet1: "Chaque ligne doit contenir les chiffres de 1 à 9, sans répétition.",
    step2bullet2: "Chaque colonne doit contenir les chiffres de 1 à 9, sans répétition.",
    step2bullet3:
      "Chacune des neuf sous-grilles 3x3 doit contenir les chiffres de 1 à 9, sans répétition.",
  },
  errorScreen: {
    title: "Une erreur s'est produite !",
    friendlySubtitle:
      "Ceci est l'écran que vos utilisateurs verront en cas d'erreur. Vous pouvez personnaliser ce message (dans `app/i18n/fr.ts`) et probablement la mise en page aussi (`app/screens/ErrorScreen`). Pour le supprimer complètement, consultez le composant <ErrorBoundary> dans `app/app.tsx`.",
    reset: "RÉINITIALISER L'APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "Tellement vide... tellement triste",
      content:
        "Aucune donnée trouvée pour l'instant. Essayez de cliquer sur le bouton pour actualiser ou recharger l'application.",
      button: "Essayons à nouveau",
    },
  },
}

export default fr
