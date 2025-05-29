/*:
 * @target MZ
 * @plugindesc EVA游戏时间系统 v1.0.0 by Seki
 * @author Seki
 * @help
 * 
 * EVA游戏时间系统
 * ================
 * 
 * 这是一个为EVA主题RPG Maker MZ游戏设计的独立时间系统。
 * 
 * 基础规则：
 * - 虚构纪元：L.C.（Lilith Calendar）
 * - 起始时间：L.C.0001年 1月 1日 上午6:00
 * - 每年4个月，每月30天，共120天
 * - 时间推进：现实10秒 = 游戏10分钟（可暂停）
 * 
 * 月份名称：
 * 1月：春月 2月：夏月 3月：秋月 4月：冬月
 * 
 * 星期名称：
 * 第一天：星期一 第二天：星期二 ... 第七天：星期日
 * 
 * 插件指令：
 * - 进入睡眠：推进时间到次日6:00
 * - 暂停时间：暂停时间流逝
 * - 恢复时间：恢复时间流逝
 * - 设置时间：设置具体的时间
 * 
 * 脚本接口：
 * - $gameSystem.getCurrentDate() // 返回 "L.C.0001-M1-D3"
 * - $gameSystem.getCurrentTime() // 返回 {hour: 14, minute: 30}
 * - $gameSystem.getTimeString() // 返回完整时间字符串
 * - $gameSystem.isFestivalToday() // 判断今日是否节日
 * - $gameSystem.getFestivalName() // 获取今日节日名称
 * - $gameSystem.enterSleep() // 进入睡眠
 * - $gameSystem.canEnterMap(mapId) // 判断是否可进入地图
 * - $gameSystem.pauseTime() // 暂停时间
 * - $gameSystem.resumeTime() // 恢复时间
 * 
 * @command enterSleep
 * @text 进入睡眠
 * @desc 推进时间到次日上午6:00
 * 
 * @command pauseTime
 * @text 暂停时间
 * @desc 暂停时间流逝
 * 
 * @command resumeTime
 * @text 恢复时间
 * @desc 恢复时间流逝
 * 
 * @command setTime
 * @text 设置时间
 * @desc 设置具体的游戏时间
 * 
 * @arg year
 * @text 年份
 * @type number
 * @min 1
 * @desc 设置年份
 * @default 1
 * 
 * @arg month
 * @text 月份
 * @type number
 * @min 1
 * @max 4
 * @desc 设置月份 (1-4)
 * @default 1
 * 
 * @arg day
 * @text 日期
 * @type number
 * @min 1
 * @max 30
 * @desc 设置日期 (1-30)
 * @default 1
 * 
 * @arg hour
 * @text 小时
 * @type number
 * @min 0
 * @max 23
 * @desc 设置小时 (0-23)
 * @default 6
 * 
 * @arg minute
 * @text 分钟
 * @type number
 * @min 0
 * @max 59
 * @desc 设置分钟 (0-59)
 * @default 0
 * 
 * @param timeDisplaySettings
 * @text 时间显示设置
 * 
 * @param showTimeInMenu
 * @text 在主菜单显示时间
 * @parent timeDisplaySettings
 * @type boolean
 * @desc 是否在ESC主菜单显示当前时间
 * @default true
 * 
 * @param menuTimeX
 * @text 菜单时间X位置
 * @parent timeDisplaySettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 主菜单时间显示的X坐标
 * @default 20
 * 
 * @param menuTimeY
 * @text 菜单时间Y位置
 * @parent timeDisplaySettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 主菜单时间显示的Y坐标
 * @default 20
 * 
 * @param menuTimeFontSize
 * @text 菜单时间字体大小
 * @parent timeDisplaySettings
 * @type number
 * @min 12
 * @max 32
 * @desc 主菜单时间显示的字体大小
 * @default 18
 * 
 * @param menuTimeColor
 * @text 菜单时间字体颜色
 * @parent timeDisplaySettings
 * @type string
 * @desc 主菜单时间显示的字体颜色
 * @default #ffffff
 * 
 * @param timeFlowSettings
 * @text 时间流逝设置
 * 
 * @param timeFlowRate
 * @text 时间流逝速率
 * @parent timeFlowSettings
 * @type number
 * @min 1
 * @max 100
 * @desc 现实多少秒对应游戏10分钟
 * @default 10
 * 
 * @param pauseInMenu
 * @text 菜单中暂停时间
 * @parent timeFlowSettings
 * @type boolean
 * @desc 是否在菜单界面暂停时间流逝
 * @default true
 * 
 * @param pauseInBattle
 * @text 战斗中暂停时间
 * @parent timeFlowSettings
 * @type boolean
 * @desc 是否在战斗中暂停时间流逝
 * @default true
 * 
 * @param sleepSettings
 * @text 睡眠设置
 * 
 * @param sleepCommonEvent
 * @text 睡眠后执行公共事件
 * @parent sleepSettings
 * @type common_event
 * @desc 睡眠后执行的公共事件ID (0为不执行)
 * @default 0
 * 
 * @param wakeUpHour
 * @text 起床时间
 * @parent sleepSettings
 * @type number
 * @min 0
 * @max 23
 * @desc 睡眠后醒来的时间（小时）
 * @default 6
 * 
 * @param festivals
 * @text 节日设置
 * @type struct<Festival>[]
 * @desc 配置游戏中的节日
 * @default []
 * 
 * @param mapTimeRestrictions
 * @text 地图时间限制
 * @type struct<MapTimeRestriction>[]
 * @desc 配置地图的时间访问限制
 * @default []
 * 
 * @param toneSettings
 * @text 色调设置
 * 
 * @param useGlobalTone
 * @text 使用全局色调
 * @parent toneSettings
 * @type boolean
 * @desc 是否启用全局时间色调变化
 * @default true
 * 
 * @param globalToneSchedule
 * @text 全局色调时间表
 * @parent toneSettings
 * @type struct<ToneSchedule>[]
 * @desc 全局色调变化时间表
 * @default ["{\"hour\":\"6\",\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\",\"gray\":\"0\"}","{\"hour\":\"18\",\"red\":\"34\",\"green\":\"-34\",\"blue\":\"-68\",\"gray\":\"0\"}","{\"hour\":\"20\",\"red\":\"-68\",\"green\":\"-68\",\"blue\":\"0\",\"gray\":\"68\"}"]
 * 
 * @param mapToneSettings
 * @text 地图独立色调
 * @type struct<MapToneSettings>[]
 * @desc 配置地图的独立色调设置
 * @default []
 */

/*~struct~Festival:
 * @param month
 * @text 月份
 * @type number
 * @min 1
 * @max 4
 * @desc 节日所在月份 (1-4)
 * 
 * @param day
 * @text 日期
 * @type number
 * @min 1
 * @max 30
 * @desc 节日所在日期 (1-30)
 * 
 * @param name
 * @text 节日名称
 * @type string
 * @desc 节日的名称
 */

/*~struct~MapTimeRestriction:
 * @param mapId
 * @text 地图ID
 * @type number
 * @min 1
 * @desc 受限制的地图ID
 * 
 * @param startHour
 * @text 开始时间（小时）
 * @type number
 * @min 0
 * @max 23
 * @desc 允许进入的开始时间
 * @default 6
 * 
 * @param endHour
 * @text 结束时间（小时）
 * @type number
 * @min 0
 * @max 23
 * @desc 允许进入的结束时间
 * @default 18
 * 
 * @param restrictionMessage
 * @text 限制提示信息
 * @type string
 * @desc 无法进入时显示的提示信息
 * @default 这个时间无法进入此地。
 */

/*~struct~ToneSchedule:
 * @param hour
 * @text 时间（小时）
 * @type number
 * @min 0
 * @max 23
 * @desc 色调变化的时间点
 * 
 * @param red
 * @text 红色值
 * @type number
 * @min -255
 * @max 255
 * @desc 红色色调值
 * @default 0
 * 
 * @param green
 * @text 绿色值
 * @type number
 * @min -255
 * @max 255
 * @desc 绿色色调值
 * @default 0
 * 
 * @param blue
 * @text 蓝色值
 * @type number
 * @min -255
 * @max 255
 * @desc 蓝色色调值
 * @default 0
 * 
 * @param gray
 * @text 灰度值
 * @type number
 * @min 0
 * @max 255
 * @desc 灰度色调值
 * @default 0
 */

/*~struct~MapToneSettings:
 * @param mapId
 * @text 地图ID
 * @type number
 * @min 1
 * @desc 使用独立色调的地图ID
 * 
 * @param toneSchedule
 * @text 色调时间表
 * @type struct<ToneSchedule>[]
 * @desc 该地图的独立色调时间表
 * @default []
 */

(() => {
    'use strict';
    
    // 获取插件参数
    const pluginName = "Seki_TimeSystem";
    const parameters = PluginManager.parameters(pluginName);
    
    // 解析参数
    const showTimeInMenu = parameters['showTimeInMenu'] === 'true';
    const menuTimeX = Number(parameters['menuTimeX'] || 20);
    const menuTimeY = Number(parameters['menuTimeY'] || 20);
    const menuTimeFontSize = Number(parameters['menuTimeFontSize'] || 18);
    const menuTimeColor = String(parameters['menuTimeColor'] || '#ffffff');
    
    const timeFlowRate = Number(parameters['timeFlowRate'] || 10);
    const pauseInMenu = parameters['pauseInMenu'] === 'true';
    const pauseInBattle = parameters['pauseInBattle'] === 'true';
    
    const sleepCommonEvent = Number(parameters['sleepCommonEvent'] || 0);
    const wakeUpHour = Number(parameters['wakeUpHour'] || 6);
    
    const festivals = JSON.parse(parameters['festivals'] || '[]').map(festival => JSON.parse(festival));
    const mapTimeRestrictions = JSON.parse(parameters['mapTimeRestrictions'] || '[]').map(restriction => JSON.parse(restriction));
    
    const useGlobalTone = parameters['useGlobalTone'] === 'true';
    const globalToneSchedule = JSON.parse(parameters['globalToneSchedule'] || '[]').map(tone => JSON.parse(tone));
    const mapToneSettings = JSON.parse(parameters['mapToneSettings'] || '[]').map(settings => {
        const parsed = JSON.parse(settings);
        parsed.toneSchedule = JSON.parse(parsed.toneSchedule || '[]').map(tone => JSON.parse(tone));
        return parsed;
    });
    
    // 月份和星期名称映射
    const MONTH_NAMES = ['', '春月', '夏月', '秋月', '冬月'];
    const WEEKDAY_NAMES = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    //=============================================================================
    // Game_System - 时间系统核心
    //=============================================================================
    
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.initializeTimeSystem();
    };
    
    Game_System.prototype.initializeTimeSystem = function() {
        this._gameTime = {
            year: 1,
            month: 1,
            day: 1,
            hour: 6,
            minute: 0,
            isPaused: false,
            lastRealTime: Date.now()
        };
    };
    
    Game_System.prototype.updateGameTime = function() {
        if (!this._gameTime) {
            this.initializeTimeSystem();
        }
        
        if (this._gameTime.isPaused) return;
        
        // 检查是否需要暂停
        if (pauseInMenu && SceneManager._scene instanceof Scene_Menu) return;
        if (pauseInBattle && $gameParty.inBattle()) return;
        
        const currentRealTime = Date.now();
        const elapsed = currentRealTime - this._gameTime.lastRealTime;
        
        if (elapsed >= timeFlowRate * 1000) { // 每隔指定秒数推进10分钟
            this.advanceTime(10);
            this._gameTime.lastRealTime = currentRealTime;
        }
    };
    
    Game_System.prototype.advanceTime = function(minutes) {
        this._gameTime.minute += minutes;
        
        while (this._gameTime.minute >= 60) {
            this._gameTime.minute -= 60;
            this._gameTime.hour += 1;
            
            if (this._gameTime.hour >= 24) {
                this._gameTime.hour = 0;
                this._gameTime.day += 1;
                
                if (this._gameTime.day > 30) {
                    this._gameTime.day = 1;
                    this._gameTime.month += 1;
                    
                    if (this._gameTime.month > 4) {
                        this._gameTime.month = 1;
                        this._gameTime.year += 1;
                    }
                }
            }
        }
        
        // 更新地图色调
        this.updateMapTone();
    };
    
    Game_System.prototype.getCurrentDate = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        return `L.C.${String(this._gameTime.year).padStart(4, '0')}-M${this._gameTime.month}-D${this._gameTime.day}`;
    };
    
    Game_System.prototype.getCurrentTime = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        return {
            hour: this._gameTime.hour,
            minute: this._gameTime.minute
        };
    };
    
    Game_System.prototype.getTimeString = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        
        const year = `L.C.${String(this._gameTime.year).padStart(4, '0')}年`;
        const month = MONTH_NAMES[this._gameTime.month];
        const day = `第${this._gameTime.day}日`;
        const weekday = this.getWeekday();
        const timeOfDay = this._gameTime.hour < 12 ? '上午' : '下午';
        const displayHour = this._gameTime.hour === 0 ? 12 : 
                           this._gameTime.hour > 12 ? this._gameTime.hour - 12 : this._gameTime.hour;
        const time = `${timeOfDay}${displayHour}:${String(this._gameTime.minute).padStart(2, '0')}`;
        
        return `${year} ${month} ${day}（${weekday}） ${time}`;
    };
    
    Game_System.prototype.getWeekday = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        
        // 计算从L.C.0001年1月1日开始的总天数
        const totalDays = (this._gameTime.year - 1) * 120 + 
                         (this._gameTime.month - 1) * 30 + 
                         (this._gameTime.day - 1);
        
        // 假设L.C.0001年1月1日是星期一
        const weekdayIndex = (totalDays + 1) % 7;
        return WEEKDAY_NAMES[weekdayIndex];
    };
    
    Game_System.prototype.isFestivalToday = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        
        return festivals.some(festival => 
            festival.month == this._gameTime.month && 
            festival.day == this._gameTime.day
        );
    };
    
    Game_System.prototype.getFestivalName = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        
        const festival = festivals.find(festival => 
            festival.month == this._gameTime.month && 
            festival.day == this._gameTime.day
        );
        
        return festival ? festival.name : '';
    };
    
    Game_System.prototype.getCurrentFestival = function() {
        // 为闲聊系统提供的接口，返回当前节日的名称
        return this.getFestivalName();
    };
    
    Game_System.prototype.enterSleep = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        
        // 推进到次日指定时间
        this._gameTime.day += 1;
        this._gameTime.hour = wakeUpHour;
        this._gameTime.minute = 0;
        
        // 处理月份和年份翻转
        if (this._gameTime.day > 30) {
            this._gameTime.day = 1;
            this._gameTime.month += 1;
            
            if (this._gameTime.month > 4) {
                this._gameTime.month = 1;
                this._gameTime.year += 1;
            }
        }
        
        // 更新地图色调
        this.updateMapTone();
        
        // 执行睡眠后公共事件
        if (sleepCommonEvent > 0) {
            $gameTemp.reserveCommonEvent(sleepCommonEvent);
        }
    };
    
    Game_System.prototype.canEnterMap = function(mapId) {
        if (!this._gameTime) this.initializeTimeSystem();
        
        const restriction = mapTimeRestrictions.find(r => r.mapId == mapId);
        if (!restriction) return true;
        
        const currentHour = this._gameTime.hour;
        const startHour = Number(restriction.startHour);
        const endHour = Number(restriction.endHour);
        
        if (startHour <= endHour) {
            return currentHour >= startHour && currentHour <= endHour;
        } else {
            // 跨夜情况
            return currentHour >= startHour || currentHour <= endHour;
        }
    };
    
    Game_System.prototype.getMapRestrictionMessage = function(mapId) {
        const restriction = mapTimeRestrictions.find(r => r.mapId == mapId);
        return restriction ? restriction.restrictionMessage : '这个时间无法进入此地。';
    };
    
    Game_System.prototype.pauseTime = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        this._gameTime.isPaused = true;
    };
    
    Game_System.prototype.resumeTime = function() {
        if (!this._gameTime) this.initializeTimeSystem();
        this._gameTime.isPaused = false;
        this._gameTime.lastRealTime = Date.now();
    };
    
    Game_System.prototype.setTime = function(year, month, day, hour, minute) {
        if (!this._gameTime) this.initializeTimeSystem();
        
        this._gameTime.year = Math.max(1, year);
        this._gameTime.month = Math.max(1, Math.min(4, month));
        this._gameTime.day = Math.max(1, Math.min(30, day));
        this._gameTime.hour = Math.max(0, Math.min(23, hour));
        this._gameTime.minute = Math.max(0, Math.min(59, minute));
        this._gameTime.lastRealTime = Date.now();
        
        this.updateMapTone();
    };
    
    Game_System.prototype.updateMapTone = function() {
        if (!$gameMap || !SceneManager._scene) return;
        
        const currentMapId = $gameMap.mapId();
        let toneSchedule = globalToneSchedule;
        
        // 检查是否有地图独立色调设置
        if (!useGlobalTone) return;
        
        const mapToneSetting = mapToneSettings.find(setting => setting.mapId == currentMapId);
        if (mapToneSetting && mapToneSetting.toneSchedule.length > 0) {
            toneSchedule = mapToneSetting.toneSchedule;
        }
        
        if (toneSchedule.length === 0) return;
        
        const currentHour = this._gameTime.hour;
        
        // 找到当前时间应用的色调
        let currentTone = null;
        for (let i = toneSchedule.length - 1; i >= 0; i--) {
            if (currentHour >= Number(toneSchedule[i].hour)) {
                currentTone = toneSchedule[i];
                break;
            }
        }
        
        // 如果没找到，使用最后一个（跨夜情况）
        if (!currentTone && toneSchedule.length > 0) {
            currentTone = toneSchedule[toneSchedule.length - 1];
        }
        
        if (currentTone && SceneManager._scene instanceof Scene_Map) {
            const red = Number(currentTone.red);
            const green = Number(currentTone.green);
            const blue = Number(currentTone.blue);
            const gray = Number(currentTone.gray);
            
            $gameScreen.startTint([red, green, blue, gray], 60);
        }
    };
    
    //=============================================================================
    // Scene_Map - 地图场景扩展
    //=============================================================================
    
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        $gameSystem.updateGameTime();
    };
    
    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_onMapLoaded.call(this);
        $gameSystem.updateMapTone();
    };
    
    //=============================================================================
    // Scene_Menu - 菜单场景扩展
    //=============================================================================
    
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        if (showTimeInMenu) {
            this.createTimeDisplay();
        }
    };
    
    Scene_Menu.prototype.createTimeDisplay = function() {
        this._timeSprite = new Sprite();
        this._timeSprite.bitmap = new Bitmap(400, 60);
        this._timeSprite.x = menuTimeX;
        this._timeSprite.y = menuTimeY;
        this.addChild(this._timeSprite);
        this.refreshTimeDisplay();
    };
    
    Scene_Menu.prototype.refreshTimeDisplay = function() {
        if (!this._timeSprite) return;
        
        this._timeSprite.bitmap.clear();
        this._timeSprite.bitmap.fontFace = $gameSystem.mainFontFace();
        this._timeSprite.bitmap.fontSize = menuTimeFontSize;
        this._timeSprite.bitmap.textColor = menuTimeColor;
        
        const timeString = $gameSystem.getTimeString();
        this._timeSprite.bitmap.drawText(timeString, 0, 0, 400, 60);
    };
    
    const _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
        _Scene_Menu_update.call(this);
        if (this._timeSprite && Graphics.frameCount % 60 === 0) {
            this.refreshTimeDisplay();
        }
    };
    
    //=============================================================================
    // Game_Player - 玩家移动限制
    //=============================================================================
    
    const _Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
        // 在预约传送时就检查地图限制，避免传送过程中的问题
        if (!$gameSystem.canEnterMap(mapId)) {
            const message = $gameSystem.getMapRestrictionMessage(mapId);
            $gameMessage.add(message);
            SoundManager.playBuzzer(); // 播放错误音效
            return; // 直接返回，不执行传送
        }
        
        // 如果检查通过，正常执行传送
        _Game_Player_reserveTransfer.call(this, mapId, x, y, d, fadeType);
    };
    
    //=============================================================================
    // Game_Interpreter - 事件指令扩展
    //=============================================================================
    
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function(params) {
        // command201 是"传送玩家"事件指令
        const mapId = params[1] || $gamePlayer._newMapId || $gameMap.mapId();
        
        if (!$gameSystem.canEnterMap(mapId)) {
            const message = $gameSystem.getMapRestrictionMessage(mapId);
            $gameMessage.add(message);
            SoundManager.playBuzzer();
            return true; // 返回true表示指令已完成，但不执行传送
        }
        
        // 如果检查通过，正常执行传送指令
        return _Game_Interpreter_command201.call(this, params);
    };
    
    //=============================================================================
    // 插件指令
    //=============================================================================
    
    PluginManager.registerCommand(pluginName, "enterSleep", args => {
        $gameSystem.enterSleep();
    });
    
    PluginManager.registerCommand(pluginName, "pauseTime", args => {
        $gameSystem.pauseTime();
    });
    
    PluginManager.registerCommand(pluginName, "resumeTime", args => {
        $gameSystem.resumeTime();
    });
    
    PluginManager.registerCommand(pluginName, "setTime", args => {
        const year = parseInt(args.year) || 1;
        const month = parseInt(args.month) || 1;
        const day = parseInt(args.day) || 1;
        const hour = parseInt(args.hour) || 6;
        const minute = parseInt(args.minute) || 0;
        
        $gameSystem.setTime(year, month, day, hour, minute);
    });
    
})(); 