const es = {
  common: {
    ok: "¡OK!",
    okay: "Vale",
    cancel: "Cancelar",
    close: "Cerrar",
    back: "Atrás",
    startButtonText: "Comenzar juego",
    easyLabel: "Fácil",
    mediumLabel: "Medio",
    hardLabel: "Difícil",
    expertLabel: "Experto",
    difficulty: "Dificultad",
    won: "Ganado",
    lost: "Perdido",
    time: "Tiempo",
    mistakes: "Errores",
    loading: "Cargando...",
    noPuzzle: "No se encontró ningún rompecabezas",
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
    clearValue: "Borrar valor",
    enabled: "Habilitado",
    disabled: "Deshabilitado",
  },
  homeScreen: {
    noHistoryTitle: "Tu historial de juegos se mostrará aquí.",
    historyTitle: "Historial de juegos",
  },
  settingsScreen: {
    title: "Configuración",
    description: "Personaliza la configuración de la aplicación.",
    labels: {
      language: "Idioma",
      defaultDifficulty: "Dificultad predeterminada",
      clearData: "Borrar todos los datos",
      clearHistory: "Borrar historial de puntuaciones",
      theme: "Tema",
    },
    madeWithLove: "Esta app fue desarrollada con ❤️ por Avery Ondo.",
  },
  endGameScreen: {
    congratulations: "¡Felicidades!",
    betterLuckNextTime: "¡Mejor suerte la próxima vez!",
    playAgain: "¿Jugar de nuevo?",
  },
  howToPlayModal: {
    buttonText: "Cómo jugar",
    title: "Cómo jugar Sudoku",
    step1title: "1. Entiende la cuadrícula",
    step1desc: "La cuadrícula de 9x9 se divide en nueve subcuadrículas de 3x3.",
    step2title: "2. Reglas básicas:",
    step2bullet1: "Cada fila debe contener los números del 1 al 9, sin repetir.",
    step2bullet2: "Cada columna debe contener los números del 1 al 9, sin repetir.",
    step2bullet3:
      "Cada una de las nueve subcuadrículas de 3x3 debe contener los números del 1 al 9, sin repetir.",
  },
  errorScreen: {
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios cuando ocurra un error. Puedes personalizar este mensaje (ubicado en `app/i18n/es.ts`) y probablemente el diseño también (`app/screens/ErrorScreen`). Si quieres eliminarlo por completo, revisa el componente <ErrorBoundary> en `app/app.tsx`.",
    reset: "REINICIAR APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "Tan vacío... tan triste",
      content:
        "No se encontraron datos aún. Intenta hacer clic en el botón para actualizar o recargar la app.",
      button: "Intentémoslo de nuevo",
    },
  },
}

export default es
