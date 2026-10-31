# デシマルストップウォッチ Android アプリ

既存のルート `index.html` を Capacitor で Android アプリに組み込みます。Webサイト本体は変更しません。

## 開発環境
- Node.js と npm
- Android Studio / Android SDK（Android 16 / API 36 以上をターゲットに設定）
- 実機または Android エミュレーター

## 初回セットアップ
リポジトリのルートから実行してください。

```bash
cd android-app
npm install
npm run android:add
npm run android:open
```

Android Studio で Gradle の同期後、`targetSdk` が API 36 以上であることを確認します。アプリを実機で起動し、計測・ラップ・リセット・履歴・コメント・CSVを検証してください。

## Webサイトを更新した後
```bash
cd android-app
npm run android:sync
```

Android Studio で署名付き Android App Bundle (AAB) を生成し、Play Console のテストトラックへアップロードします。署名鍵やパスワードを GitHub にコミットしないでください。

## 公開前の確認事項
- `appId`（`jp.tools.decimalstopwatch`）は仮設定です。公開前に確定してください。
- Android アプリアイコン、スクリーンショット、ストア掲載文、プライバシーポリシー、データセーフティ申告を準備します。
- 新規の個人 Play Console アカウントにはクローズドテスト等の要件があります。
- アプリ内の記録は Web 版とは別の保存領域です。アンインストール時に消える可能性があるため CSV バックアップを案内してください。
- このフォルダはプロジェクトの土台です。AAB のビルド・端末テスト・Play 審査は未実施です。
