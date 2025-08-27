const ja = {
  common: {
    ok: "OK!",
    okay: "了解",
    cancel: "キャンセル",
    close: "閉じる",
    back: "戻る",
    startButtonText: "ゲーム開始",
    easyLabel: "簡単",
    mediumLabel: "普通",
    hardLabel: "難しい",
    expertLabel: "エキスパート",
    difficulty: "難易度",
    won: "勝利",
    lost: "敗北",
    time: "時間",
    mistakes: "ミス",
    loading: "読み込み中...",
    noPuzzle: "パズルが見つかりません",
    system: "システム",
    light: "ライト",
    dark: "ダーク",
    clearValue: "値をクリア",
  },
  homeScreen: {
    noHistoryTitle: "ゲーム履歴はここに表示されます。",
    historyTitle: "ゲーム履歴",
  },
  settingsScreen: {
    title: "設定",
    description: "アプリの設定をカスタマイズします。",
    labels: {
      language: "言語",
      defaultDifficulty: "デフォルトの難易度",
      clearData: "すべてのデータを消去",
      clearHistory: "スコア履歴を消去",
      theme: "テーマ",
    },
    madeWithLove: "このアプリは Avery Ondo によって❤️で開発されました。",
  },
  endGameScreen: {
    congratulations: "おめでとうございます！",
    betterLuckNextTime: "次回はもっと頑張りましょう！",
    playAgain: "もう一度プレイしますか？",
  },
  howToPlayModal: {
    buttonText: "遊び方",
    title: "数独の遊び方",
    step1title: "1. グリッドを理解する",
    step1desc: "9x9のグリッドは、3x3のサブグリッドが9つに分かれています。",
    step2title: "2. 基本ルール：",
    step2bullet1: "各行には1〜9の数字が重複せずに含まれている必要があります。",
    step2bullet2: "各列には1〜9の数字が重複せずに含まれている必要があります。",
    step2bullet3:
      "9つの3x3サブグリッドそれぞれに1〜9の数字が重複せずに含まれている必要があります。",
  },
  errorScreen: {
    title: "問題が発生しました！",
    friendlySubtitle:
      "エラーが発生したときにユーザーが見る画面です。このメッセージ（`app/i18n/ja.ts`）やレイアウト（`app/screens/ErrorScreen`）をカスタマイズできます。完全に削除したい場合は、`app/app.tsx`の<ErrorBoundary>を確認してください。",
    reset: "アプリをリセット",
  },
  emptyStateComponent: {
    generic: {
      heading: "とても空っぽ...とても悲しい",
      content:
        "まだデータがありません。ボタンをクリックして更新またはアプリを再読み込みしてください。",
      button: "もう一度試す",
    },
  },
}

export default ja
