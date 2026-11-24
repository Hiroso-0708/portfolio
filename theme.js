
//配色一覧
const themes = [
    "natural",
    "candy",
    "sunset",
    "retro",
    "popart",
    "mono"
];

//HTMLのルート要素
const root = document.documentElement;

//切り替えボタン
const themeButton = document.querySelector("#theme-toggle");

//保存されているテーマを取得
const savedTheme = localStorage.getItem("theme");

//保存されたテーマが配色一覧に含まれているか確認し、初期テーマを設定
const initialTheme = themes.includes(savedTheme) ? savedTheme : "natural";

root.dataset.theme = initialTheme;

// ボタンを押したときの処理
if (themeButton) {
    themeButton.addEventListener("click", () => {

        // 現在のテーマの位置を取得
        const currentIndex = themes.indexOf(root.dataset.theme);

        // 次のテーマの位置を計算
        const nextIndex = (currentIndex + 1) % themes.length;

        // 次のテーマを取得
        const nextTheme = themes[nextIndex];

        // テーマを変更
        root.dataset.theme = nextTheme;

        // 選択したテーマを保存
        localStorage.setItem("theme", nextTheme);
    });
}
