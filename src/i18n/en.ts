const en = {
  common: {
    ok: "OK!",
    okay: "Okay",
    cancel: "Cancel",
    close: "Close",
    back: "Back",
    startButtonText: "Start Game",
    easyLabel: "Easy",
    mediumLabel: "Medium",
    hardLabel: "Hard",
    expertLabel: "Expert",
    difficulty: "Difficulty",
    won: "Won",
    lost: "Lost",
    time: "Time",
    mistakes: "Mistakes",
    loading: "Loading...",
    noPuzzle: "No puzzle found",
    system: "System",
    light: "Light",
    dark: "Dark",
    clearValue: "ClearValue",
    enabled: "Enabled",
    disabled: "Disabled",
  },
  homeScreen: {
    noHistoryTitle: "Your game history will display here.",
    historyTitle: "Game History",
  },
  settingsScreen: {
    title: "Settings",
    description: "Customize your app settings.",
    labels: {
      language: "Language",
      defaultDifficulty: "Default Difficulty",
      clearData: "Clear All Data",
      clearHistory: "Clear Score History",
      theme: "Theme",
    },
    madeWithLove: "This app was developed with ❤️ by Avery Ondo.",
  },
  endGameScreen: {
    congratulations: "Congratulations!",
    betterLuckNextTime: "Better luck next time!",
    playAgain: "Play again?",
  },
  howToPlayModal: {
    buttonText: "How to Play",
    title: "How to play Sudoku",
    step1title: "1. Understand the Grid",
    step1desc: "The 9x9 grid is divided into nine 3x3 subgrids.",
    step2title: "2. Basic Rules:",
    step2bullet1: "Each row must contain the numbers 1-9, without any repetition.",
    step2bullet2: "Each column must contain the numbers 1-9, without any repetition.",
    step2bullet3:
      "Each of the nine 3x3 subgrids must contain the numbers 1-9, without any repetition.",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
