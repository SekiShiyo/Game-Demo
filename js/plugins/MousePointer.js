/*:
 * @target     MZ
 * @plugindesc v1.0 Custom mouse pointer that switches image on click. 
 * @author SekiShiyo
 * @url https://github.com/SekiShiyo/RMMZ/blob/main/MousePointer
 * 
 * @param defaultCursor
 * @text Default Cursor Image
 * @type file
 * @dir img/system
 * @desc The image shown as the default mouse cursor 
 *
 * @param clickCursor
 * @text Clicked Cursor Image
 * @type file
 * @dir img/system
 * @desc The image shown when the mouse is pressed or clicked
 *
 * @help
 * This plugin replaces the default system cursor with a custom image.
 * It also switches to another image when the mouse is pressed.
 * Works across all scenes and avoids using PIXI sprites to prevent rendering issues.
 * Free for commercial and non-commercial use. Attribution optional but appreciated.
 * Authored by SekiShiyo.
 */

(() => {
    const params = PluginManager.parameters("MousePointer") || {};
    const defaultCursor = params["defaultCursor"] || "Cursor1";
    const clickCursor = params["clickCursor"] || "Cursor2";

    let isPressed = false;

    // 设置光标图像（使用 CSS）
    function updateCursorImage(imageName) {
        const url = `url("img/system/${imageName}.png"), auto`;
        document.body.style.cursor = url;
    }

    // 初始设置
    window.addEventListener("load", () => {
        updateCursorImage(defaultCursor);
    });

    // 在每帧检测按压状态
    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _SceneManager_updateMain.call(this);

        const nowPressed = TouchInput.isPressed();
        if (nowPressed !== isPressed) {
            isPressed = nowPressed;
            updateCursorImage(isPressed ? clickCursor : defaultCursor);
        }
    };
})();