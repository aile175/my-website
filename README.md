# 株式会社サクラ工業 コーポレートサイト

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?logo=github&logoColor=white)

## サイト概要

**株式会社サクラ工業**のコーポレートサイトです。  
埼玉県川口市を拠点に、電気設備工事における外構工事を手がける専門会社の魅力を伝えるため、  
「**人々に光を**」というコンセプトのもと、洗練されたデザインと高いパフォーマンスを両立しました。

🌐 **Live Site**: [https://www.sakura-kogyo.jp](https://www.sakura-kogyo.jp)

---

## 使用技術

| カテゴリ | 技術 |
|---------|------|
| **マークアップ** | HTML5 (Semantic HTML) |
| **スタイリング** | CSS3 (CSS Custom Properties / CSS Variables) |
| **スクリプト** | Vanilla JavaScript (ES6+) |
| **ホスティング** | GitHub Pages |
| **フォント** | Google Fonts (Noto Sans JP, Noto Serif JP, Outfit) |

### フレームワーク・ライブラリ不使用の理由

- **軽量・高速**: 外部依存を排除し、最小限のファイルサイズを実現
- **保守性**: ライブラリのバージョン管理やセキュリティ更新が不要
- **学習コスト**: 引き継ぎ時の学習コストを最小化

---

## ディレクトリ構成

```
sakura-kogyo-v2/
├── .nojekyll
├── 404.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── favicon-source.png
│   │   ├── ogp.jpg
│   │   └── (その他の画像ファイル...)
│   └── js/
│       └── main.js
├── index.html
├── privacy.html
├── robots.txt
└── sitemap.xml
```

---

## こだわりポイント

### 1. パフォーマンス最適化

- **CSS/JSの外部化**: キャッシュ効率を最大化
- **Google Fontsの最適化**: `preconnect` による接続の事前確立
- **Intersection Observer**: 画面外の要素はアニメーションを停止し、GPU負荷を軽減
- **requestAnimationFrame**: スクロールイベントをデバウンス処理

### 2. サーバーレス運用 (GitHub Pages)

- **ゼロコスト運用**: 独自ドメイン以外の維持費不要
- **高可用性**: GitHubのCDNによる安定配信
- **シンプルなデプロイ**: `git push` のみで本番反映
- **`.nojekyll`配置**: Jekyllビルドをスキップし、そのまま配信

### 3. Canvas パーティクルアニメーション

- **ヒーローセクション**: 接続線を持つ幻想的なパーティクル
- **モバイルナビゲーション**: メニュー展開時の没入感演出
- **パフォーマンス配慮**: 
  - 画面サイズに応じたパーティクル数の動的調整
  - 画面外では `cancelAnimationFrame` でアニメーション停止

### 4. SEO / ローカルSEO対策

- **構造化データ (JSON-LD)**: LocalBusiness / ElectricalContractor スキーマ
- **OGP完備**: LINE / X / Facebook でのシェア最適化
- **Geo Tags**: 地域検索での上位表示を狙う
- **セマンティックHTML**: 適切な見出し階層、WAI-ARIA属性

### 5. アクセシビリティ (WCAG 2.1 AA準拠を目指す)

- **キーボードナビゲーション**: ESCキーでモバイルメニュー閉じる
- **ARIA属性**: `aria-label`, `aria-expanded`, `aria-controls` の適切な使用
- **スクリーンリーダー対応**: 装飾要素に `aria-hidden="true"`
- **フォーカス管理**: 視覚的なフォーカスインジケーター

### 6. レスポンシブデザイン

- **モバイルファースト**: 900px以下で専用ナビゲーション
- **iPhone SE対応**: 横画面での特別な調整
- **CSS clamp()**: 流動的なフォントサイズ

---

## ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/your-username/sakura-kogyo.git
cd sakura-kogyo

# ローカルサーバーで起動（Python 3の場合）
python -m http.server 8000

# ブラウザで確認
open http://localhost:8000
```

---

## デプロイ

### GitHub Pages

1. リポジトリの `Settings` → `Pages` を開く
2. Source を `main` ブランチ、`/ (root)` に設定
3. `Save` をクリック
4. 数分後、`https://your-username.github.io/sakura-kogyo/` で公開

### カスタムドメイン

1. DNSにCNAMEレコードを設定: `www` → `your-username.github.io`
2. GitHub Pages設定で Custom domain を入力
3. `Enforce HTTPS` にチェック

---

## ブラウザサポート

| ブラウザ | バージョン |
|---------|-----------|
| Chrome | 最新2バージョン |
| Firefox | 最新2バージョン |
| Safari | 最新2バージョン |
| Edge | 最新2バージョン |
| iOS Safari | 最新2バージョン |
| Chrome Android | 最新2バージョン |

---

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

## 制作者

**Yuki** - Web Designer / Frontend Engineer

---

## 謝辞

- [Google Fonts](https://fonts.google.com/) - 美しい日本語フォント
- [GitHub Pages](https://pages.github.com/) - 無料ホスティング

---

<p align="center">
  <strong>Light to the People - 人々に光を</strong><br>
  <small>&copy; 2025 株式会社サクラ工業</small>
</p>
