
const curtain = document.querySelector(".lgt-curtain");
const waiting = document.querySelector(".lgt-waiting");

const duration = 500;
const hold = 300;
const ease = "cubic-bezier(0.65, 0, 0.35, 1)";

const links = document.querySelectorAll("[data-transition]");

// アニメーションを控える設定か確認
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

// 新しいページを開いたときの処理
const entering = sessionStorage.getItem("pageTransition");

if (entering === "true") {
    sessionStorage.removeItem("pageTransition");

    curtain.style.visibility = "visible";
    curtain.style.transform = "translateY(0)";
    waiting.style.opacity = "1";

    if (reduceMotion) {
        curtain.style.visibility = "hidden";
    } else {
        curtain.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(-100%)" }
            ],
            {
                duration,
                easing: ease,
                fill: "forwards"
            }
        ).finished.then(() => {
            curtain.style.visibility = "hidden";
            waiting.style.opacity = "0";
        });
    }
}

// リンクをクリックしたときの処理
links.forEach(link => {
    link.addEventListener("click", async (e) => {

        // 新しいタブで開く操作などは通常どおり
        if (
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey ||
            e.altKey ||
            link.target === "_blank"
        ) {
            return;
        }

        // 同じページなら何もしない
        if (link.href === location.href) {
            return;
        }

        e.preventDefault();

        if (reduceMotion) {
            location.href = link.href;
            return;
        }

        // 遷移先で幕を上へ抜くためのフラグ
        sessionStorage.setItem("pageTransition", "true");

        curtain.style.visibility = "visible";

        const curtainAnimation = curtain.animate(
            [
                { transform: "translateY(100%)" },
                { transform: "translateY(0)" }
            ],
            {
                duration,
                easing: ease,
                fill: "forwards"
            }
        );

        const waitingAnimation = waiting.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(12px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: duration * 0.6,
                delay: duration * 0.5,
                easing: "ease-out",
                fill: "both"
            }
        );

        await Promise.all([
            curtainAnimation.finished,
            waitingAnimation.finished
        ]);

        await new Promise(resolve => setTimeout(resolve, hold));

        location.href = link.href;
    });
});

