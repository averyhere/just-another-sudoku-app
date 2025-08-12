import { Translations } from "./en"

const ar: Translations = {
  common: {
    ok: "نعم",
    cancel: "حذف",
    back: "خلف",
    startButtonText: "بدء اللعبة",
    easyLabel: "سهل",
    mediumLabel: "متوسط",
    hardLabel: "صعب",
    expertLabel: "خبير",
  },
  welcomeScreen: {
    postscript:
      "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
    readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
    exciting: "اوه هذا مثير",
  },
  newGameScreen: {
    title: "لعبة جديدة",
    description: "اختر مستوى الصعوبة للعبة الجديدة.",
  },
  settingsScreen: {
    title: "الإعدادات",
    description: "تخصيص إعدادات التطبيق الخاص بك.",
    labels: {
      language: "اللغة",
      defaultDifficulty: "الصعوبة الافتراضية",
      clearData: "مسح جميع البيانات",
      clearHistory: "مسح تاريخ النتائج",
      theme: "السمة",
    },
  },
  errorScreen: {
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغة جداً....حزين",
      content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
      button: "لنحاول هذا مرّة أخرى",
    },
  },
}

export default ar
