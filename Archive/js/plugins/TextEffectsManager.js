//=============================================================================
// TextEffectsManager.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.1 Advanced control over text outlines and shadows
 * @author Claude
 *
 * @param GlobalSettings
 * @text Global Settings
 * @type struct<GlobalConfig>
 * @default {"RemoveOutlines":"false","RemoveShadows":"false"}
 * @desc Global settings for text effects
 * 
 * @param DialogSettings
 * @text Dialog Settings
 * @type struct<DialogConfig>
 * @default {"RemoveOutlines":"true","RemoveShadows":"true"}
 * @desc Settings for dialog text effects
 * 
 * @param MenuSettings
 * @text Menu Settings
 * @type struct<MenuConfig>
 * @default {"RemoveOutlines":"false","RemoveShadows":"false"}
 * @desc Settings for menu text effects
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin provides advanced control over text outlines and shadows in your
 * RPG Maker MZ game. You can selectively disable effects for different types
 * of windows and text elements.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 * 
 * Configure the parameters to control which text elements have outlines and
 * shadows removed:
 * 
 * - Global Settings: Affects all text in the game
 * - Dialog Settings: Affects message windows and dialog text
 * - Menu Settings: Affects menu windows and UI text
 * 
 * Each section has options to remove outlines and shadows independently.
 */

/*~struct~GlobalConfig:
 * @param RemoveOutlines
 * @text Remove Outlines
 * @type boolean
 * @default false
 * @desc Remove text outlines from all game text
 * 
 * @param RemoveShadows
 * @text Remove Shadows
 * @type boolean
 * @default false
 * @desc Remove text shadows from all game text
 */

/*~struct~DialogConfig:
 * @param RemoveOutlines
 * @text Remove Outlines
 * @type boolean
 * @default true
 * @desc Remove text outlines from dialog text
 * 
 * @param RemoveShadows
 * @text Remove Shadows
 * @type boolean
 * @default true
 * @desc Remove text shadows from dialog text
 */

/*~struct~MenuConfig:
 * @param RemoveOutlines
 * @text Remove Outlines
 * @type boolean
 * @default false
 * @desc Remove text outlines from menu text
 * 
 * @param RemoveShadows
 * @text Remove Shadows
 * @type boolean
 * @default false
 * @desc Remove text shadows from menu text
 */

(function() {
    'use strict';
    
    const pluginName = "TextEffectsManager";
    const parameters = PluginManager.parameters(pluginName);
    
    // Parse JSON parameters
    const parseParam = function(param) {
        try {
            return JSON.parse(param);
        } catch (e) {
            return param;
        }
    };
    
    // Parse nested JSON parameters
    const parseStruct = function(paramString) {
        const parsed = parseParam(paramString);
        for (const key in parsed) {
            if (parsed.hasOwnProperty(key)) {
                parsed[key] = parseParam(parsed[key]);
            }
        }
        return parsed;
    };
    
    // Get configuration settings
    const globalConfig = parseStruct(parameters["GlobalSettings"] || '{"RemoveOutlines":"false","RemoveShadows":"false"}');
    const dialogConfig = parseStruct(parameters["DialogSettings"] || '{"RemoveOutlines":"true","RemoveShadows":"true"}');
    const menuConfig = parseStruct(parameters["MenuSettings"] || '{"RemoveOutlines":"false","RemoveShadows":"false"}');
    
    // Convert string 'true'/'false' to boolean
    const toBool = function(value) {
        return value === true || value === "true";
    };
    
    // Global settings
    const globalRemoveOutlines = toBool(globalConfig.RemoveOutlines);
    const globalRemoveShadows = toBool(globalConfig.RemoveShadows);
    
    // Dialog settings
    const dialogRemoveOutlines = toBool(dialogConfig.RemoveOutlines);
    const dialogRemoveShadows = toBool(dialogConfig.RemoveShadows);
    
    // Menu settings
    const menuRemoveOutlines = toBool(menuConfig.RemoveOutlines);
    const menuRemoveShadows = toBool(menuConfig.RemoveShadows);
    
    //=============================================================================
    // Helper Functions
    //=============================================================================
    
    // Check if a window is a dialog/message window
    const isDialogWindow = function(windowObj) {
        return windowObj instanceof Window_Message || 
               windowObj instanceof Window_ChoiceList ||
               windowObj instanceof Window_NameBox;
    };
    
    // Check if a window is a menu window
    const isMenuWindow = function(windowObj) {
        return windowObj instanceof Window_MenuCommand ||
               windowObj instanceof Window_Status ||
               windowObj instanceof Window_Gold ||
               windowObj instanceof Window_Options ||
               windowObj instanceof Window_ItemList ||
               windowObj instanceof Window_SkillList ||
               windowObj instanceof Window_EquipCommand ||
               windowObj instanceof Window_ShopCommand;
    };
    
    // Determine if outlines should be removed for a window
    const shouldRemoveOutlines = function(windowObj) {
        if (globalRemoveOutlines) return true;
        if (isDialogWindow(windowObj) && dialogRemoveOutlines) return true;
        if (isMenuWindow(windowObj) && menuRemoveOutlines) return true;
        return false;
    };
    
    // Determine if shadows should be removed for a window
    const shouldRemoveShadows = function(windowObj) {
        if (globalRemoveShadows) return true;
        if (isDialogWindow(windowObj) && dialogRemoveShadows) return true;
        if (isMenuWindow(windowObj) && menuRemoveShadows) return true;
        return false;
    };
    
    //=============================================================================
    // Remove Outlines
    //=============================================================================
    
    // Override the resetFontSettings method
    const _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
        _Window_Base_resetFontSettings.call(this);
        if (shouldRemoveOutlines(this)) {
            this.contents.outlineWidth = 0;
        }
    };
    
    // Override the _drawTextOutline method
    const _Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
    Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
        // We can't directly access the window from here, so we use global settings
        if (!globalRemoveOutlines) {
            _Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth);
        }
    };
    
    //=============================================================================
    // Remove Shadows
    //=============================================================================
    
    // Override PIXI.TextStyle to disable dropShadow based on context
    if (globalRemoveShadows || dialogRemoveShadows || menuRemoveShadows) {
        // Store the current window being processed
        let currentWindow = null;
        
        // Hook into drawText to track the current window
        const _Window_Base_drawText = Window_Base.prototype.drawText;
        Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
            currentWindow = this;
            _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
            currentWindow = null;
        };
        
        // Hook into drawTextEx to track the current window
        const _Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
        Window_Base.prototype.drawTextEx = function(text, x, y, width) {
            currentWindow = this;
            const result = _Window_Base_drawTextEx.call(this, text, x, y, width);
            currentWindow = null;
            return result;
        };
        
        // Safer approach for shadow removal - override the context shadow settings directly
        const _Bitmap_drawTextBody = Bitmap.prototype._drawTextBody;
        Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
            // Remove shadows by ensuring shadow settings are disabled
            if (globalRemoveShadows || (currentWindow && shouldRemoveShadows(currentWindow))) {
                const context = this.context;
                context.shadowColor = 'rgba(0,0,0,0)';
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
            
            _Bitmap_drawTextBody.call(this, text, tx, ty, maxWidth);
        };
        
        // Safe approach for PIXI Text constructor patching that doesn't rely on descriptor access
        if (PIXI && PIXI.Text) {
            const originalTextConstructor = PIXI.Text;
            
            PIXI.Text = function(text, style) {
                if (style && style.dropShadow) {
                    if (globalRemoveShadows || (currentWindow && shouldRemoveShadows(currentWindow))) {
                        style = Object.assign({}, style);
                        style.dropShadow = false;
                    }
                }
                return new originalTextConstructor(text, style);
            };
            
            // Copy prototype and constructor properties
            PIXI.Text.prototype = originalTextConstructor.prototype;
            PIXI.Text.constructor = originalTextConstructor.constructor;
        }
    }
})(); 