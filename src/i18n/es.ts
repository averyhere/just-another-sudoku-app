import { Translations } from "./en"

const es: Translations = {
  common: {
    ok: "OK",
    cancel: "Cancelar",
    back: "Volver",
    startButtonText: "Iniciar Juego",
    easyLabel: "Fácil",
    mediumLabel: "Medio",
    hardLabel: "Difícil",
    expertLabel: "Experto",
  },
  welcomeScreen: {
    postscript:
      "psst — Esto probablemente no es cómo se va a ver tu app. (A menos que tu diseñador te haya enviado estas pantallas, y en ese caso, ¡lánzalas en producción!)",
    readyForLaunch: "Tu app, casi lista para su lanzamiento",
    exciting: "(¡ohh, esto es emocionante!)",
  },
  newGameScreen: {
    title: "Nuevo Juego",
    description: "Selecciona el nivel de dificultad para tu nuevo juego.",
  },
  settingsScreen: {
    title: "Configuración",
    description: "Personaliza la configuración de tu aplicación.",
    labels: {
      language: "Idioma",
      defaultDifficulty: "Dificultad Predeterminada",
      clearData: "Borrar Todos los Datos",
      clearHistory: "Borrar Historial de Puntuaciones",
      theme: "Tema",
    },
  },
  errorScreen: {
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
    reset: "REINICIA LA APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "Muy vacío... muy triste",
      content:
        "No se han encontrado datos por el momento. Intenta darle clic en el botón para refrescar o recargar la app.",
      button: "Intentemos de nuevo",
    },
  },
}

export default es
