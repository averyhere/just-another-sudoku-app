import { Translations } from "./en"

const ja: Translations = {
  common: {
    ok: "OK",
    cancel: "キャンセル",
    back: "戻る",
    startButtonText: "ゲーム開始",
    easyLabel: "簡単",
    mediumLabel: "普通",
    hardLabel: "難しい",
    expertLabel: "上級者",
  },
  welcomeScreen: {
    postscript:
      "注目！ — このアプリはお好みの見た目では無いかもしれません(デザイナーがこのスクリーンを送ってこない限りは。もしそうなら公開しちゃいましょう！)",
    readyForLaunch: "このアプリはもう少しで公開できます！",
    exciting: "(楽しみですね！)",
  },
  newGameScreen: {
    title: "新しいゲーム",
    description: "新しいゲームの難易度を選択してください。",
  },
  settingsScreen: {
    title: "設定",
    description: "アプリの設定をカスタマイズしてください。",
    labels: {
      language: "言語",
      defaultDifficulty: "デフォルトの難易度",
      clearData: "すべてのデータを削除",
      clearHistory: "スコア履歴を削除",
      theme: "テーマ",
    },
  },
  errorScreen: {
    title: "問題が発生しました",
    friendlySubtitle:
      "本番では、エラーが投げられた時にこのページが表示されます。もし使うならこのメッセージに変更を加えてください(`app/i18n/jp.ts`)レイアウトはこちらで変更できます(`app/screens/ErrorScreen`)。もしこのスクリーンを取り除きたい場合は、`app/app.tsx`にある<ErrorBoundary>コンポーネントをチェックしてください",
    reset: "リセット",
  },
  emptyStateComponent: {
    generic: {
      heading: "静かだ...悲しい。",
      content:
        "データが見つかりません。ボタンを押してアプリをリロード、またはリフレッシュしてください。",
      button: "もう一度やってみよう",
    },
  },
}

export default ja
