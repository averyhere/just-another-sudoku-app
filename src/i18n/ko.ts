const ko = {
  common: {
    ok: "확인!",
    okay: "알겠어요",
    cancel: "취소",
    close: "닫기",
    back: "뒤로",
    startButtonText: "게임 시작",
    easyLabel: "쉬움",
    mediumLabel: "보통",
    hardLabel: "어려움",
    expertLabel: "전문가",
    difficulty: "난이도",
    won: "승리",
    lost: "패배",
    time: "시간",
    mistakes: "실수",
    loading: "로딩 중...",
    noPuzzle: "퍼즐을 찾을 수 없음",
    system: "시스템",
    light: "라이트",
    dark: "다크",
    clearValue: "값 지우기",
  },
  homeScreen: {
    noHistoryTitle: "게임 기록이 여기에 표시됩니다.",
    historyTitle: "게임 기록",
  },
  settingsScreen: {
    title: "설정",
    description: "앱 설정을 사용자 지정하세요.",
    labels: {
      language: "언어",
      defaultDifficulty: "기본 난이도",
      clearData: "모든 데이터 지우기",
      clearHistory: "점수 기록 지우기",
      theme: "테마",
    },
    madeWithLove: "이 앱은 Avery Ondo가 ❤️로 개발했습니다.",
  },
  endGameScreen: {
    congratulations: "축하합니다!",
    betterLuckNextTime: "다음엔 더 잘할 수 있어요!",
    playAgain: "다시 하시겠습니까?",
  },
  howToPlayModal: {
    buttonText: "플레이 방법",
    title: "스도쿠 플레이 방법",
    step1title: "1. 그리드 이해하기",
    step1desc: "9x9 그리드는 3x3 서브그리드 9개로 나뉩니다.",
    step2title: "2. 기본 규칙:",
    step2bullet1: "각 행에는 1~9의 숫자가 중복 없이 포함되어야 합니다.",
    step2bullet2: "각 열에는 1~9의 숫자가 중복 없이 포함되어야 합니다.",
    step2bullet3: "각 3x3 서브그리드에는 1~9의 숫자가 중복 없이 포함되어야 합니다.",
  },
  errorScreen: {
    title: "문제가 발생했습니다!",
    friendlySubtitle:
      "오류가 발생하면 사용자가 보는 화면입니다. 이 메시지(`app/i18n/ko.ts`)와 레이아웃(`app/screens/ErrorScreen`)을 사용자 지정할 수 있습니다. 완전히 제거하려면 `app/app.tsx`의 <ErrorBoundary>를 확인하세요.",
    reset: "앱 초기화",
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 비어있어요... 너무 슬퍼요",
      content: "아직 데이터가 없습니다. 새로고침하거나 앱을 다시 로드하려면 버튼을 클릭하세요.",
      button: "다시 시도하기",
    },
  },
}

export default ko
