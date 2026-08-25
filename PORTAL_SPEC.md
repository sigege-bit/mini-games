# Shigege Games ミニゲーム共通仕様書 (PORTAL_SPEC.md)

## 1. 基本構成
- **ファイル構成**: 1ゲームにつき `index.html` 1ファイル完結（HTML/CSS/JS/プロシージャルWebAudioを内包）。
- **解像度/配置**: Phaser 3.80.1 / FITモード（幅480px × 高さ800px目安、中央配置）。
- **外部アセット**: 画像・音声の外部ファイル読み込みゼロ（絵文字、Canvas描画、Web Audio APIのみ）。

## 2. 共通UI・シーン規格
### タイトルシーン (SceneTitle)
- **ヘッダー上部**:
  - 左: サウンド切替ピル型トグル `[ 🔊 SFX ON | 🔇 OFF ]`
  - 右: 言語切替ピル型トグル `[ 🇯🇵 日本語 | 🇺🇸 English ]`
- **中央**: タイトル、サブコピー、メインアイコン（浮遊アニメーション）、あそびかたカード（3行ルール）。
- **下部**: ハイスコア表示、ふわふわ浮遊Tween付きスタートボタン。

### リザルトシーン (SceneResult)
- **スコア表示**: 今回スコア ＆ BEST SCORE（更新時はNEW演出）。
- **ボタン配置**:
  1. `[ 🔄 RETRY (もう一回) ]`（最優先・大型ボタン）
  2. `[ 🐦 SHARE ON X (ポスト) ]`（スコア付きURL共有）
  3. `[ 🏠 TITLE (タイトルへ) ]` ＆ `[ 🌐 MORE GAMES (ポータル) ]`（2列配置）
  - ※ MORE GAMES は `../index.html`（ポータル）を同一タブで開く。

---

## 3. 確定ゲーム一覧（マスターテキスト）

### #01: 積む積む (Stack Tower)
- 🇯🇵 キャッチコピー: タイミングよくブロックを積み上げろ！
- 🇺🇸 Subtitle: Stack blocks with perfect timing!
- アイコン: 📦
- ルール1: 👆 タップで動くブロックを配置 / Tap / Space to place moving block
- ルール2: ⚡ ズレた部分は削落！ピッタリ重ねてコンボ / Match edges perfectly for combo bonuses
- ルール3: 🛡️ 完全にはみ出したらゲームオーバー / Misaligned parts get sliced off

### #02: キャッチミーイフユーニャン (Catch Me If You Nyan)
- 🇯🇵 キャッチコピー: 好物を集めてコンボ！爆弾は回避せよ！
- 🇺🇸 Subtitle: Catch treats, dodge bombs, and build combos!
- アイコン: 🐱
- ルール1: ↔️ 左右ドラッグ / 移動でネコを操作 / Drag / Slide left & right to move cat
- ルール2: ⚡ 好物を連続キャッチしてフィーバー突入！ / Catch treats in succession for Fever Mode!
- ルール3: 🛡️ 💣 🧅 🍫 はキケン！(猫に毒/ライフ減) / Avoid 💣 🧅 🍫 ! (Poisonous to cats!)

### #03: 超人サッカー (Space Kicker)
- 🇯🇵 キャッチコピー: 狙い撃ち＆超連射！宇宙最強の防衛戦！
- 🇺🇸 Subtitle: Aim, curve & rapid-fire cosmic shots!
- アイコン: ⚽
- ルール1: 👆 スワイプで狙ってタップで連続シュート！ / Drag to aim & tap to rapid-fire kicks
- ルール2: ⚡ ボール反射＆コンボで敵軍を粉砕せよ！ / Ricochet balls & chain combos to crush foes
- ルール3: 🛡️ 🚨最下部ゴールラインを死守せよ！ / Defend the bottom goal line from breach

### #04: 闘犬乱舞 (Doggy Slash)
- 🇯🇵 キャッチコピー: 飛び交う絵文字を一筆両断！爽快スラッシュ！
- 🇺🇸 Subtitle: Slash flying emojis with ninja precision!
- アイコン: 🐶
- ルール1: 👆 スワイプで刀筋を描いて食材を一刀両断！ / Swipe to draw blade trail and slice targets!
- ルール2: ⚡ 同時斬りでコンボ＆金の龍🐉で大量得点！ / Multi-slice for Combos & Golden Dragon 🐉 bonus!
- ルール3: 🛡️ 💣爆弾斬撃、または見逃し3回で終了 / Avoid slicing 💣 Bombs or missing 3 targets!

### #05: 花のピョンピョン丸 (Pyonpyon Ninja)
- 🇯🇵 キャッチコピー: ミリ単位の目測と度胸試し！爽快ジャンプ！
- 🇺🇸 Subtitle: Hold to charge power and leap across rooftops!
- アイコン: 🌸🥷
- ルール1: 👆 画面長押しでパワーチャージ（グググ…） / Hold screen to charge jump power
- ルール2: 🚀 指を離して屋上へ放物線大ジャンプ！ / Release finger to leap across rooftops
- ルール3: 🎯 中心着地でPERFECT！踏み外して落下で終了 / Land in center for PERFECT! Fall off to Game Over