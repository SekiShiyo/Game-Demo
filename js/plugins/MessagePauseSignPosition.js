/*:
 * @target MZ
 * @plugindesc 调整对话窗口暂停标志（向下箭头）的位置
 * @author Claude
 * @help
 * 
 * 这个插件允许你调整对话窗口中暂停标志（向下箭头）的位置。
 * 
 * @param xOffset
 * @text X轴偏移
 * @desc 暂停标志在X轴上的偏移量（正数向右，负数向左）
 * @default 0
 * @type number
 * @min -500
 * @max 500
 * 
 * @param yOffset
 * @text Y轴偏移
 * @desc 暂停标志在Y轴上的偏移量（正数向下，负数向上）
 * @default -10
 * @type number
 * @min -500
 * @max 500
 */

(function() {
    'use strict';
    
    // 获取插件参数
    const pluginName = "MessagePauseSignPosition";
    const parameters = PluginManager.parameters(pluginName);
    const xOffset = Number(parameters['xOffset'] || 0);
    const yOffset = Number(parameters['yOffset'] || -10);
    
    // 保存原始的刷新暂停标志函数
    const _Window_refreshPauseSign = Window.prototype._refreshPauseSign;
    
    // 重写刷新暂停标志函数
    Window.prototype._refreshPauseSign = function() {
        // 调用原始函数
        _Window_refreshPauseSign.call(this);
        
        // 调整暂停标志位置
        this._pauseSignSprite.x += xOffset;
        this._pauseSignSprite.y += yOffset;
    };
})(); 