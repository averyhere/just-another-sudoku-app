const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    startButtonText: "Start Game",
    easyLabel: "Easy",
    mediumLabel: "Medium",
    hardLabel: "Hard",
    expertLabel: "Expert",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  newGameScreen: {
    title: "Just Another Sudoku",
    description: "Select the difficulty level for your new game.",
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
