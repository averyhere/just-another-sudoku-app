const hi = {
  common: {
    ok: "ठीक है!",
    okay: "ठीक है",
    cancel: "रद्द करें",
    close: "बंद करें",
    back: "वापस",
    startButtonText: "गेम शुरू करें",
    easyLabel: "आसान",
    mediumLabel: "मध्यम",
    hardLabel: "कठिन",
    expertLabel: "विशेषज्ञ",
    difficulty: "कठिनाई",
    won: "जीत गए",
    lost: "हार गए",
    time: "समय",
    mistakes: "गलतियाँ",
    loading: "लोड हो रहा है...",
    noPuzzle: "कोई पहेली नहीं मिली",
    system: "सिस्टम",
    light: "हल्का",
    dark: "गहरा",
    clearValue: "मान साफ़ करें",
    enabled: "सक्षम",
    disabled: "अक्षम",
  },
  homeScreen: {
    noHistoryTitle: "आपका गेम इतिहास यहाँ दिखेगा।",
    historyTitle: "गेम इतिहास",
  },
  settingsScreen: {
    title: "सेटिंग्स",
    description: "अपने ऐप सेटिंग्स को अनुकूलित करें।",
    labels: {
      language: "भाषा",
      defaultDifficulty: "डिफ़ॉल्ट कठिनाई",
      clearData: "सभी डेटा साफ़ करें",
      clearHistory: "स्कोर इतिहास साफ़ करें",
      theme: "थीम",
    },
    madeWithLove: "यह ऐप ❤️ के साथ Avery Ondo द्वारा विकसित किया गया है।",
  },
  endGameScreen: {
    congratulations: "बधाई हो!",
    betterLuckNextTime: "अगली बार बेहतर किस्मत!",
    playAgain: "फिर से खेलें?",
  },
  howToPlayModal: {
    buttonText: "कैसे खेलें",
    title: "सुडोकू कैसे खेलें",
    step1title: "1. ग्रिड को समझें",
    step1desc: "9x9 ग्रिड नौ 3x3 उपग्रिड में विभाजित है।",
    step2title: "2. मूल नियम:",
    step2bullet1: "हर पंक्ति में 1-9 तक की संख्याएँ बिना दोहराव के होनी चाहिए।",
    step2bullet2: "हर कॉलम में 1-9 तक की संख्याएँ बिना दोहराव के होनी चाहिए।",
    step2bullet3: "हर 3x3 उपग्रिड में 1-9 तक की संख्याएँ बिना दोहराव के होनी चाहिए।",
  },
  errorScreen: {
    title: "कुछ गलत हो गया!",
    friendlySubtitle:
      "यह वह स्क्रीन है जो आपके उपयोगकर्ता त्रुटि होने पर देखेंगे। आप इस संदेश को (`app/i18n/hi.ts`) और शायद लेआउट को भी (`app/screens/ErrorScreen`) अनुकूलित कर सकते हैं। यदि आप इसे पूरी तरह से हटाना चाहते हैं, तो `app/app.tsx` में <ErrorBoundary> देखें।",
    reset: "ऐप रीसेट करें",
  },
  emptyStateComponent: {
    generic: {
      heading: "बहुत खाली... बहुत दुखी",
      content:
        "अभी तक कोई डेटा नहीं मिला। ताज़ा करने या ऐप को पुनः लोड करने के लिए बटन पर क्लिक करें।",
      button: "फिर से प्रयास करें",
    },
  },
}

export default hi
