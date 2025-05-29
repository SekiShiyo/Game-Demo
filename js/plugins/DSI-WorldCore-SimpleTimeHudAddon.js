//=======================================================================
// * Plugin Name  : DSI-WorldCore-SimpleTimeHudAddon.js
// * Last Updated : 3/13/2025
//========================================================================
/*:
 * @author sirogames
 * @plugindesc (v1.0) A addon plugin for DSI-WorldCore.js that adds a simple time hud to the game.
 * @target MZ
 * @help 
 * ========================================================================
 * > How to use
 * ========================================================================
 * 1. Place this plugin below DSI-WorldCore.js in the plugin manager.
 * 2. Set the parameters to your liking.
 * 3. You can use switch to control the visibility of the time hud. Check out the param [Visible Switch ID].
 * 
 * @param displayFormat:str
 * @text Time Format
 * @desc You can use the following variables: %hour, %minute, %second.
 * @default %hour:%minute:%second
 * 
 * @param timeColorCode:num
 * @text Time Color Code
 * @desc Enter a number
 * @default 16
 * 
 * @param timeFontSize:num
 * @text Time Font Size
 * @desc Enter a number
 * @default 40
 * 
 * @param extraInfo:note
 * @text Extra Info
 * @desc You can use the following variables: %year, %month, %day, %weekday, %weather, %weatherIcon. Control codes can be used also.
 * @default "Year %year - %month %day \\c[21](%weekday)\\c[0]\n\\c[1]Weather:\\c[0] %weather %weatherIcon"
 * @type note
 * 
 * @param visibleSwitchId:num
 * @text Visible Switch ID
 * @desc Enter a switch ID. Turn on to show the time hud.
 * @type switch
 * @default 0
 * 
 * @param displayPosition:struct
 * @text Display Position
 * @desc Enter a position object
 * @type struct<PositionObject>
 * @default {"x:num":"10","y:num":"10"}
 * 
 * @param displaySize:struct
 * @text Display Size
 * @desc Enter a size object
 * @type struct<ISize>
 * @default {"width:num":"350","height:num":"132"}
 * 
 * @param monthColorCodes:arr_num
 * @text Month Color Codes
 * @desc Enter an array of number
 * @type number[]
 * @default ["27","29","14","23"]
 * 
 */
//========================================================================
// Plugin Code
//========================================================================
var Imported = Imported || {};
Imported["DSI-WorldCore-SimpleTimeHudAddon"] = true;

/** @type {DSI_WorldCore_SimpleTimeHudAddonParams} */
const TimeHudParams = PluginManager.parametersEx('DSI-WorldCore-SimpleTimeHudAddon');

class Window_TimeHud extends Window_Base {
    /**
     * Refresh
     */
    refresh() {
        this.contents.clear();
        let dx = 0;
        let dy = 0;
        const lh = this.lineHeight();
        const cw = this.contentsWidth();
        this.changeTextColor(ColorManager.textColor(TimeHudParams.timeColorCode));
        this.contents.fontSize = TimeHudParams.timeFontSize;
        this.contents.fontBold = true;
        this.drawText(this.getCurrentTime(), dx, dy, cw, 'center');
        this.resetFontSettings();
        dy += lh;
        const extraInfo = this.getExtraInfo();
        if (extraInfo) {
            extraInfo.split(/\n/).forEach((line, index) => {
                const textSize = this.textSizeEx(line);
                const drawX = dx + (cw - textSize.width) / 2;
                const drawY = dy + index * lh;
                this.drawTextEx(line, drawX, drawY, cw);
            });
        }
    }
    /**
     * Get Current Time
     */
    getCurrentTime() {
        const hour = WorldManager.inst.getHour();
        const minute = WorldManager.inst.getMinute();
        const second = WorldManager.inst.getSecond();
        const format = TimeHudParams.displayFormat || 'hour:minute:second';
        const hourStr = String(hour).padStart(2, '0');
        const minuteStr = String(minute).padStart(2, '0');
        const secondStr = String(second).padStart(2, '0');
        const formattedTime = format
            .replace('%hour', hourStr)
            .replace('%minute', minuteStr)
            .replace('%second', secondStr);
        return formattedTime;
    }
    /**
     * Get Extra Info
     * @returns {string}
     */
    getExtraInfo() {
        /** @type {string} */
        const extraInfo = TimeHudParams.extraInfo || '';
        const year = WorldManager.inst.getYear();
        const month = WorldManager.inst.getMonthName();
        const day = WorldManager.inst.getDay();
        const weekday = WorldManager.inst.getWeekday();
        const weather = WorldManager.inst.getWeatherName();
        const weatherIcon = WorldManager.inst.getWeatherIcon();

        const monthColorCode = TimeHudParams.monthColorCodes[WorldManager.inst.getMonth()] || 0;
        return extraInfo
            .replace('%year', year)
            .replace('%month', `\\c[${monthColorCode}]${month}\\c[0]`)
            .replace('%day', day)
            .replace('%weekday', weekday)
            .replace('%weather', weather)
            .replace('%weatherIcon', "\\i[" + weatherIcon + "]");
    }
	/**
     * Update
     */
    update() {
        super.update();
        this.updateVisibility();
    }
    /**
     * Update Visibility
     */
    updateVisibility() {
        const switchId = TimeHudParams.visibleSwitchId;
        if (switchId > 0) {
            this.visible = ESL.Engine.getSwitch(switchId);
        } else {
            this.visible = false;
        }
    }
}

var DSI_WorldCore_SimpleTimeHudAddon_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
    DSI_WorldCore_SimpleTimeHudAddon_Scene_Map_createAllWindows.call(this);
    this.createTimeHud();
}

Scene_Map.prototype.createTimeHud = function () {
    var pos = TimeHudParams.displayPosition;
    var size = TimeHudParams.displaySize;
    const rect = new Rectangle(pos.x, pos.y, size.width, size.height);
    this._timeHudWindow = new Window_TimeHud(rect);
    this._timeHudWindow.updateVisibility();
    this.addWindow(this._timeHudWindow);
    WorldManager.inst.setTimeHud(this._timeHudWindow);
}

//========================================================================
// Basic Structs
//========================================================================
/*~struct~PositionObject:
 * @param x:num
 * @text x
 * @desc X position
 *
 * @param y:num
 * @text y
 * @desc Y Position
 *
 */
/*~struct~ISize:
* @param width:num
* @text Width
* @desc Enter a number
*
* @param height:num
* @text Height
* @desc Enter a number
*
*/
/*~struct~RectObject:
 * @param x:num
 * @text x
 * @desc X position
 *
 * @param y:num
 * @text y
 * @desc Y Position
 *
 * @param width:num
 * @text width
 * @desc Width
 *
 * @param height:num
 * @text height
 * @desc Height
 *
 */
/*~struct~SoundEffect:
 * @param name:str
 * @text name
 * @type file
 * @dir audio/se/
 * @desc Choose the name of SE you want to use.
 *
 * @param volume:num
 * @text volume
 * @default 70
 * @desc Choose the volume value of the se
 *
 * @param pitch:num
 * @text pitch
 * @default 100
 * @desc Choose the pitch value of the se
 *
 * @param pan:num
 * @text pan
 * @default 0
 * @desc Choose the pan value of the se
 *
 */
/*~struct~BackgroundMusic:
 * @param name:str
 * @text name
 * @type file
 * @dir audio/bgm/
 * @desc Choose the name of BGM you want to use.
 *
 * @param volume:num
 * @text volume
 * @default 70
 * @desc Choose the volume value of the bgm
 *
 * @param pitch:num
 * @text pitch
 * @default 100
 * @desc Choose the pitch value of the bgm
 *
 * @param pan:num
 * @text pan
 * @default 0
 * @desc Choose the pan value of the bgm
 *
 */
//========================================================================
// END OF PLUGIN
//========================================================================