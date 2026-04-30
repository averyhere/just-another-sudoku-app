const ar = {
  common: {
    ok: "موافق!",
    okay: "حسنًا",
    cancel: "إلغاء",
    close: "إغلاق",
    back: "عودة",
    startButtonText: "ابدأ اللعبة",
    easyLabel: "سهل",
    mediumLabel: "متوسط",
    hardLabel: "صعب",
    expertLabel: "خبير",
    difficulty: "الصعوبة",
    won: "فزت",
    lost: "خسرت",
    time: "الوقت",
    mistakes: "الأخطاء",
    loading: "جار التحميل...",
    noPuzzle: "لم يتم العثور على لغز",
    system: "النظام",
    light: "فاتح",
    dark: "داكن",
    clearValue: "مسح القيمة",
    enabled: "مفعل",
    disabled: "معطل",
  },
  tabs: {
    dashboard: "لوحة القيادة",
    gameboard: "العب سودوكو",
    settings: "الإعدادات",
  },
  homeScreen: {
    noHistoryTitle: "سيتم عرض سجل ألعابك هنا.",
    historyTitle: "سجل الألعاب",
  },
  settingsScreen: {
    title: "الإعدادات",
    description: "خصص إعدادات التطبيق.",
    labels: {
      language: "اللغة",
      defaultDifficulty: "الصعوبة الافتراضية",
      clearData: "مسح جميع البيانات",
      clearHistory: "مسح سجل النقاط",
      theme: "السمة",
    },
    madeWithLove: "تم تطوير هذا التطبيق بحب ❤️ بواسطة Avery Ondo.",
  },
  endGameScreen: {
    congratulations: "تهانينا!",
    betterLuckNextTime: "حظًا أوفر في المرة القادمة!",
    playAgain: "هل تريد اللعب مرة أخرى؟",
  },
  howToPlayModal: {
    buttonText: "كيفية اللعب",
    title: "كيفية لعب السودوكو",
    step1title: "1. فهم الشبكة",
    step1desc: "شبكة 9x9 مقسمة إلى تسعة مربعات فرعية 3x3.",
    step2title: "2. القواعد الأساسية:",
    step2bullet1: "يجب أن تحتوي كل صف على الأرقام من 1 إلى 9 دون تكرار.",
    step2bullet2: "يجب أن تحتوي كل عمود على الأرقام من 1 إلى 9 دون تكرار.",
    step2bullet3: "يجب أن يحتوي كل مربع فرعي 3x3 على الأرقام من 1 إلى 9 دون تكرار.",
  },
  errorScreen: {
    title: "حدث خطأ ما!",
    friendlySubtitle:
      "هذه هي الشاشة التي سيرى المستخدمون عند حدوث خطأ. يمكنك تخصيص هذه الرسالة (في `app/i18n/ar.ts`) وربما التصميم أيضًا (`app/screens/ErrorScreen`). إذا أردت إزالتها تمامًا، تحقق من <ErrorBoundary> في `app/app.tsx`.",
    reset: "إعادة ضبط التطبيق",
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغ جدًا... محزن جدًا",
      content: "لا توجد بيانات حتى الآن. حاول الضغط على الزر للتحديث أو إعادة تحميل التطبيق.",
      button: "لنحاول مرة أخرى",
    },
  },
}

export default ar
