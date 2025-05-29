/*:
 * @target MZ
 * @plugindesc Message Window Customizer v1.0 by SekiShiyo
 * @author SekiShiyo
 * @url 
 * @help MessageWindowCustomizer.js
 * 
 * 这个插件允许你自定义消息窗口（对话框）的大小和位置。
 * 你可以在插件管理器中设置宽度、高度、水平位置和垂直位置。
 * 
 * ============================================================================
 * 使用方法：
 * ============================================================================
 * 1. 在插件管理器中激活此插件
 * 2. 配置所需的窗口参数
 * 3. 保存并测试游戏
 * 
 * ============================================================================
 * 更新历史：
 * ============================================================================
 * v1.0 - 初始版本
 * 
 * @param windowWidth
 * @text 对话框宽度
 * @desc 设置消息窗口的宽度（像素）。设为0则使用默认宽度。
 * @type number
 * @min 0
 * @max 2000
 * @default 600
 * 
 * @param windowHeight
 * @text 对话框高度
 * @desc 设置消息窗口的高度。设为0则使用默认高度（自动计算）。
 * @type number
 * @min 0
 * @max 1000
 * @default 0
 * 
 * @param positionX
 * @text 水平位置
 * @desc 设置消息窗口的水平位置。-1=居中，0=左对齐，其他数值=具体像素位置
 * @type number
 * @min -1
 * @max 2000
 * @default -1
 * 
 * @param positionY
 * @text 垂直位置
 * @desc 设置消息窗口的垂直位置。-1=底部，0=顶部，其他数值=具体像素位置
 * @type number
 * @min -1
 * @max 1000
 * @default -1
 * 
 * @param enableCustomPosition
 * @text 启用自定义位置
 * @desc 是否启用自定义位置设置。关闭则使用默认位置逻辑。
 * @type boolean
 * @default true
 */

(() => {
    'use strict';
    
    const pluginName = "MessageWindowCustomizer";
    const parameters = PluginManager.parameters(pluginName);
    
    const windowWidth = Number(parameters['windowWidth']) || 600;
    const windowHeight = Number(parameters['windowHeight']) || 0;
    const positionX = Number(parameters['positionX']);
    const positionY = Number(parameters['positionY']);
    const enableCustomPosition = parameters['enableCustomPosition'] === 'true';
    
    // 重写消息窗口的矩形设置函数
    Scene_Message.prototype.messageWindowRect = function() {
        // 计算宽度
        let ww;
        if (windowWidth > 0) {
            ww = windowWidth;
        } else {
            // 使用默认宽度计算
            ww = Graphics.boxWidth - 2 * $dataSystem.windowPadding;
        }
        
        // 计算高度
        let wh;
        if (windowHeight > 0) {
            wh = windowHeight;
        } else {
            // 使用默认高度计算（4行文本高度 + 8像素边距）
            wh = this.calcWindowHeight(4, false) + 8;
        }
        
        // 计算位置
        let wx, wy;
        
        if (enableCustomPosition) {
            // 使用自定义位置
            if (positionX === -1) {
                // 水平居中
                wx = (Graphics.boxWidth - ww) / 2;
            } else {
                // 使用指定位置
                wx = positionX;
            }
            
            if (positionY === -1) {
                // 底部对齐（默认RPG Maker行为）
                wy = Graphics.boxHeight - wh;
            } else {
                // 使用指定位置
                wy = positionY;
            }
        } else {
            // 使用默认位置逻辑
            wx = (Graphics.boxWidth - ww) / 2;
            wy = Graphics.boxHeight - wh;
        }
        
        // 确保窗口不会超出屏幕边界
        wx = Math.max(0, Math.min(wx, Graphics.boxWidth - ww));
        wy = Math.max(0, Math.min(wy, Graphics.boxHeight - wh));
        
        return new Rectangle(wx, wy, ww, wh);
    };
})(); 