# ミニゲームポータル開発 ＆ 環境引き継ぎ仕様書

## 1. プロジェクト基本情報

* **プロジェクト名:** `200_sigege_mini-GAME`
* **公開ポータル (GitHub Pages):** `[https://sigege-bit.github.io/mini-games/](https://sigege-bit.github.io/mini-games/)`
* **リモートリポジトリ:** `[https://github.com/sigege-bit/mini-games.git](https://github.com/sigege-bit/mini-games.git)`
* **開発環境:** Antigravity IDE (VS Code互換) / Windows 11
* **バージョン管理:** Git for Windows (v2.55.0)

---

## 2. ディレクトリ構成

```text
200_sigege_mini-GAME/
├── index.html            # ポータルサイト本体（ダークサイバー調UI・各ゲームへのハブ）
├── PORTAL_SPEC.md        # ポータルおよび共通UI仕様書
├── PROJECT_STATUS.md     # 本引き継ぎドキュメント
├── 01-stack-tower/
│   └── index.html        # #01 積み上げタワー（単一HTML完結型）
├── 02-catch-game/
│   └── index.html        # #02 キャッチゲーム（単一HTML完結型）
├── 03-space-kicker/
│   └── index.html        # #03 スペースキッカー（単一HTML完結型）
├── 04-emoji-slash/
│   └── index.html        # #04 絵文字スラッシュ（単一HTML完結型）
└── 05-jump-ninja/
    └── index.html        # #05 ジャンプニンジャ（単一HTML完結型）

```

---

## 3. 実装済み共通仕様

各ミニゲーム（`01`〜`05`）は itch.io への単体配布を容易にするため、**単一 `index.html`（HTML+CSS+JS内包）構成**で統一済み。

* **フレームワーク:** Phaser 3 (`phaser.min.js` CDN読み込み)
* **シーン遷移:**
1. `SceneTitle`: タイトル、遊び方、難易度選択、言語切替、サウンドON/OFF
2. `SceneGame`: ゲームプレイ本体
3. `SceneResult`: スコア表示、ランク判定(S/A/B/C)、X(Twitter)シェア、リトライ、「ポータルに戻る」


* **サウンド:** Web Audio API によるシンセサイザー電子音（外部音声ファイル不要）
* **多言語対応:** 日本語 / 英語の即時切り替え（`lang-btn`）
* **ポータル連携:** リザルト画面に `ポータルに戻る (../index.html)` ボタンを標準装備

---

## 4. Git・デプロイ環境のセットアップ状況（完了）

ローカル環境と GitHub リポジトリ（`sigege-bit/mini-games`）の紐付け・認証が完了しており、CLI経由の高速更新が可能です。

* **認証:** Git Credential Manager（ブラウザ経由で認証済み）
* **ユーザー設定:**
* `user.name`: `sigege-bit`
* `user.email`: `sigege@gmail.com`


* **追跡ブランチ:** `origin/main`

### 日常の更新手順（コマンド）

コード修正後は、IDEのターミナル（PowerShell）で以下の3行を実行するだけで GitHub Pages に即座に反映されます。

```powershell
git add -A
git commit -m "更新内容の要約"
git push origin main

```

---

## 5. 今後のタスク・ロードマップ

1. **実機動作確認 (GitHub Pages)**
* PC / スマホブラウザでのポータル遷移、全5ゲームのプレイ、リザルトからのポータル復帰、Xシェア機能の動作検証。


2. **保守性向上の検討（今後の量産化対応）**
* 作品数増加に備え、共通UI・WebAudio処理を `shared/common.js` に外出しするか、単一HTML維持のままビルドスクリプトで管理するかの設計決定。


3. **itch.io 公開準備**
* 各ゲームの ZIP パッケージ化（または HTML 単体アップロード）。
* カバー画像（630×500px）および作品紹介文・タグの整備。