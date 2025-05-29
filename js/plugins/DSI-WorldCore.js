//=======================================================================
// * Plugin Name  : DSI-WorldCore.js
// * Last Updated : 3/9/2025
//========================================================================
/*:
 * @author sirogames
 * @plugindesc (v1.02) This plugin handles time & weather in your game.
 * @target MZ
 * @help 
 * ========================================================================
 * > Description
 * =======================================================================
 * This plugin handles time & weather in your game. 
 * Provide a good framework for time-related and weather-related plugins.
 * ========================================================================
 * > Plugin Commands
 * =======================================================================
 * startNewDay
 * This command will start a new day.
 * This is useful if you want to start a new day in your game.
 * 
 * getTomorrowWeather
 * This command will get the weather for tomorrow. The result will be stored in a variable.
 * You can use that result to do whatever you want, like using it for TV weather forecast, etc...
 * 
 * setTimeStatus
 * This command will set the time status.
 * You can use this command to pause or resume the time.
 * 
 * advanceTime
 * This command will advance the time by a certain amount of days, hours, minutes, and seconds.
 * 
 * setTime
 * This command will set the time to a certain value.
 * You can set the hour, minute, second, month, day, and year.
 * ========================================================================
 * > Map Notetags:
 * ======================================================================
 * <Time Paused>
 * This will pause the time when the player is on this map.
 * 
 * @param weatherConfigs:arr_struct
 * @text Weather Configurations
 * @desc Config for all weather types
 * @type struct<WeatherConfig>[]
 * @default ["{\"weatherId:str\":\"sunny\",\"weatherName:str\":\"Sunny\",\"iconIndex:num\":\"163\"}","{\"weatherId:str\":\"rainy\",\"weatherName:str\":\"Rainy\",\"iconIndex:num\":\"171\"}","{\"weatherId:str\":\"storm\",\"weatherName:str\":\"Storm\",\"iconIndex:num\":\"66\"}","{\"weatherId:str\":\"snowy\",\"weatherName:str\":\"Snowy\",\"iconIndex:num\":\"65\"}"]
 * 
 * @param monthConfigs:arr_struct
 * @text Month Configurations
 * @desc Config for each month
 * @type struct<MonthConfig>[]
 * @default ["{\"totalDays:num\":\"28\",\"monthName:str\":\"Spring\",\"weathers:arr_struct\":\"[\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"sunny\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"70\\\\\\\"}\\\",\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"rainy\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"30\\\\\\\"}\\\"]\"}","{\"totalDays:num\":\"28\",\"monthName:str\":\"Summer\",\"weathers:arr_struct\":\"[\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"sunny\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"70\\\\\\\"}\\\",\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"rainy\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"20\\\\\\\"}\\\",\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"storm\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"10\\\\\\\"}\\\"]\"}","{\"totalDays:num\":\"28\",\"monthName:str\":\"Autumn\",\"weathers:arr_struct\":\"[\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"sunny\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"60\\\\\\\"}\\\",\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"rainy\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"40\\\\\\\"}\\\"]\"}","{\"totalDays:num\":\"28\",\"monthName:str\":\"Winter\",\"weathers:arr_struct\":\"[\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"sunny\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"{\\\\\\\"weatherID:str\\\\\\\":\\\\\\\"snowy\\\\\\\",\\\\\\\"chance:num\\\\\\\":\\\\\\\"70\\\\\\\"}\\\"]\"}"]
 * 
 * @param initWeather:str
 * @text Init Weather Type
 * @desc Enter the weather type you want to start with
 * @default sunny
 * 
 * @param initHour:num
 * @text Init Hour
 * @desc Enter a number
 * @default 6
 * 
 * @param initMinute:num
 * @text Init Minute
 * @desc Enter a number
 * @default 0
 * 
 * @param totalHours:num
 * @text Total Hours
 * @desc Total hours in a day
 * @default 24
 * 
 * @param totalMinutes:num
 * @text Total Minutes
 * @desc Total minutes in an hour
 * @default 60
 * 
 * @param totalSeconds:num
 * @text Total Seconds
 * @desc Total seconds in a minute
 * @default 60
 * 
 * @param timeInterval:num
 * @text Time Update Interval
 * @desc How many frames to wait before updating the time
 * @default 25
 * 
 * @param increaseSecondsAmount:num
 * @text Increase Amount Per Update (Seconds)
 * @desc The amount of seconds to increase per update
 * @default 30
 * 
 * @param weekdayNames:array
 * @text Weekday Names
 * @desc Enter weekday names
 * @type string[]
 * @default ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
 * 
 * @param passoutConfig:struct
 * @text Passout Feature Config
 * @desc Config for passout feature
 * @type struct<PassoutConfig>
 * @default {"enabled:bool":"false","hour:num":"2","minute:num":"0","commonEvent:num":"0"}
 * 
 * @command startNewDay
 * @text Start New Day
 * @desc Call this command to start a new day
 * 
 * @arg wakeupHour:num
 * @text Wakeup Hour
 * @desc Enter a number
 * @default 6
 * 
 * @arg wakeupMinute:num
 * @text Wakeup Minute
 * @desc Enter a number
 * @default 0
 * 
 * @command advanceTime
 * @text Advance Time
 * @desc Call this command to advance the time
 * 
 * @arg days:num
 * @text Days
 * @desc Enter a number
 * @type number
 * @default 0
 * 
 * @arg hours:num
 * @text Hours
 * @desc Enter a number
 * @type number
 * @default 0
 * 
 * @arg minutes:num
 * @text Minutes
 * @desc Enter a number
 * @type number
 * @default 0
 * 
 * @arg seconds:num
 * @text Seconds
 * @desc Enter a number
 * @type number
 * @default 0
 * 
 * @command setTime
 * @text Set Time
 * @desc Call this command to set the time
 * 
 * @arg hour:num
 * @text Hour
 * @type number
 * @desc Enter a number. If this is -1, the hour will not be changed.
 * @default -1
 * 
 * @arg minute:num
 * @text Minute
 * @type number
 * @desc Enter a number. If this is -1, the minute will not be changed.
 * @default -1
 * 
 * @arg second:num
 * @text Second
 * @type number
 * @desc Enter a number. If this is -1, the second will not be changed.
 * @default -1
 * 
 * @arg month:str
 * @text Month Name
 * @desc Enter a month name. If this is None, the month will not be changed.
 * @default None
 * 
 * @arg day:num
 * @text Day
 * @type number
 * @desc Enter a number. If this is -1, the day will not be changed.
 * @default -1
 * 
 * @arg year:num
 * @text Year
 * @type number
 * @desc Enter a number. If this is -1, the year will not be changed.
 * @default -1
 * 
 * @command getTomorrowWeather
 * @text Get Tomorrow Weather
 * @desc Call this command to get the weather for tomorrow
 * 
 * @arg resultVariableId:num
 * @text Result Variable ID
 * @desc Enter a variable ID. The weather type will be stored in this variable.
 * @type variable
 * @default 0
 * 
 * @command setTimeStatus
 * @text Set Time Status
 * @desc Call this command to set the time status
 * 
 * @arg active:bool
 * @text Active
 * @desc Set to true to make the time active, false to pause it.
 * @default true
 * 
 * 
 */
//========================================================================
// Custom Structs
//========================================================================
/*~struct~MonthConfig:
 * @param totalDays:num
 * @text Total Days
 * @desc Enter a number
 * @default 28
 * 
 * @param monthName:str
 * @text Month Name (Season)
 * @desc Enter a string
 * @default Spring
 * 
 * 
 * @param weathers:arr_struct
 * @text Weather In Month Configurations
 * @desc Enter an array of object
 * @type struct<MonthWeatherConfig>[]
 * @default []
 * 
 */
/*~struct~WeatherConfig:
 * @param weatherId:str
 * @text Weather ID
 * @desc Enter a unique string that identifies the weather type
 * 
 * @param weatherName:str
 * @text Weather Name
 * @desc Name of the weather type
 * 
 * @param iconIndex:num
 * @text Icon Index
 * @desc Enter a number
 * @default 0
 */
/*~struct~MonthWeatherConfig:
 * @param weatherID:str
 * @text Weather ID
 * @desc Enter a unique string that identifies the weather type
 * @default 
 * 
 * @param chance:num
 * @text Chance
 * @desc The chance of this weather occurring. The higher the number, the more likely it is to occur.
 * @default 0
 */
/*~struct~PassoutConfig:
 * @param enabled:bool
 * @text Feature Enabled 
 * @desc Set to ON to enable the passout feature
 * @type boolean
 * @default false
 * 
 * @param hour:num
 * @text Hour
 * @desc Enter the hour that the player will pass out
 * @default 0
 * @type number
 * @min 0
 * @max 23
 * 
 * @param minute:num
 * @text Minute
 * @desc Enter the minute that the player will pass out
 * @default 0
 * @type number
 * @min 0
 * @max 59
 * 
 * @param commonEvent:num
 * @text Common Event
 * @desc Enter a number
 * @type common_event
 * @default 0
 */
//========================================================================
// Plugin Code
//========================================================================
var Imported = Imported || {};
Imported["DSI-WorldCore"] = true;

/** @type {DSI_WorldCoreParams} */
const WorldCoreParams = PluginManager.parametersEx('DSI-WorldCore');

PluginManager.registerCommand('DSI-WorldCore', 'startNewDay', (args) => {
    WorldManager.inst.startNewDay(args.wakeupHour, args.wakeupMinute);
});

PluginManager.registerCommand('DSI-WorldCore', 'advanceTime', (args) => {
    if (args.days) {
        WorldManager.inst.addDays(args.days);
    }
    if (args.hours) {
        WorldManager.inst.addHours(args.hours);
    }
    if (args.minutes) {
        WorldManager.inst.addMinutes(args.minutes);
    }
    if (args.seconds) {
        WorldManager.inst.addSeconds(args.seconds);
    }
    WorldManager.inst.refreshTimeHud();
    WorldManager.inst.callTintUpdateCallback();
});

PluginManager.registerCommand('DSI-WorldCore', 'setTime', (args) => {
    if (args.hour >= 0) {
        WorldManager.inst.setHour(args.hour);
    }
    if (args.minute >= 0) {
        WorldManager.inst.setMinute(args.minute);
    }
    if (args.second >= 0) {
        WorldManager.inst.setSecond(args.second);
    }
    if (args.year >= 1) {
        WorldManager.inst.setYear(args.year);
    }
    if (args.month.length == 0 || args.month != "None") {
        WorldManager.inst.setMonthName(args.month);
    }
    if (args.day >= 0) {
        WorldManager.inst.setDay(args.day);
    }
    WorldManager.inst.refreshTimeHud();
    WorldManager.inst.callTintUpdateCallback();
});

PluginManager.registerCommand('DSI-WorldCore', 'getTomorrowWeather', (args) => {
    if (args.resultVariableId) {
        const weather = WorldManager.inst.getTomorrowWeatherName();
        ESL.Engine.setVar(args.resultVariableId, weather);
    } else {
        throw new Error('Result Variable ID is not set');
    }
});

PluginManager.registerCommand('DSI-WorldCore', 'setTimeStatus', (args) => {
    if (args.active) {
        WorldManager.inst.resumeTime();
    } else {
        WorldManager.inst.pauseTime();
    }
});

class WorldManager extends ESL.Engine.GameService {
    /**
     * WorldManager
     */
    constructor() {
        super();
        WorldManager.inst = this;
        this.loadConfigs();
        this.initMembers();
    }
    /**
     * Load Configs
     */
    loadConfigs() {
        this._weatherTable = {};
        WorldCoreParams.weatherConfigs.forEach((config) => {
            this._weatherTable[config.weatherId] = config;
        });
        this._passoutConfig = WorldCoreParams.passoutConfig;
    }
    /**
     * Get Month Config
     */
    getMonthConfig() {
        return WorldCoreParams.monthConfigs[this._monthIndex];
    }
    /**
     * Get Weather Config
     * @returns {WeatherConfig}
     */
    getWeatherConfig(type) {
        return this._weatherTable[type];
    }
	/**
     * Is Valid Month Name
     * @param {string} name
     */
    isValidMonthName(name) {
        return WorldCoreParams.monthConfigs.some((config) => config.monthName === name);
    }
    /**
     * Init Members
     */
    initMembers() {
        this._monthIndex = 0;
        this._day = 1;
        this._hour = WorldCoreParams.initHour;
        this._extendingHour = this._hour;
        this._minute = WorldCoreParams.initMinute;
        this._second = 0;
        this._totalDays = 0;
        this._frameCounter = 0;
        this._year = 1;
        this._weatherType = WorldCoreParams.initWeather;
        this._tomorrowWeather = null;
        this._active = true;

        this._onNewDayListeners = [];
    }
	/**
     * Register On New Day Listener
     * @param {Function} listener
     */
    registerOnNewDayListener(listener) {
        if (typeof listener === 'function') {
            this._onNewDayListeners.push(listener);
        } else {
            throw new Error('Listener must be a function');
        }
    }
    /**
     * Get Month
     */
    getMonth() {
        return this._monthIndex;
    }
    /**
     * Get Month Name
     */
    getMonthName() {
        // 优先使用Seki时间系统的月份信息
        if ($gameSystem && $gameSystem._timeSystem && typeof $gameSystem._timeSystem.month !== 'undefined') {
            return `${$gameSystem._timeSystem.month}月`;
        }
        return this.getMonthConfig().monthName;
    }
    /**
     * Get Day
     */
    getDay() {
        // 优先使用Seki时间系统的日期信息
        if ($gameSystem && $gameSystem._timeSystem && typeof $gameSystem._timeSystem.day !== 'undefined') {
            return $gameSystem._timeSystem.day;
        }
        return this._day;
    }
    /**
     * Get Weekday
     */
    getWeekday() {
        // 优先使用Seki时间系统的星期信息
        if ($gameSystem && $gameSystem._timeSystem && $gameSystem._timeSystem.weekday) {
            return $gameSystem._timeSystem.weekday;
        }
        const weekdayIndex = (this._totalDays) % WorldCoreParams.weekdayNames.length;
        return WorldCoreParams.weekdayNames[weekdayIndex];
    }
    /**
     * Get Weather
     */
    getWeather() {
        return this._weatherType;
    }
    /**
     * Get Weather Name
     */
    getWeatherName() {
        return this.getWeatherConfig(this._weatherType).weatherName;
    }
    /**
     * Get Weather Icon
     */
    getWeatherIcon() {
        return this.getWeatherConfig(this._weatherType).iconIndex;
    }
    /**
     * Get Hour
     */
    getHour() {
        // 优先使用Seki时间系统的时间
        if ($gameSystem && $gameSystem._timeSystem && typeof $gameSystem._timeSystem.hour !== 'undefined') {
            return $gameSystem._timeSystem.hour;
        }
        return this._hour;
    }
    /**
     * Set Hour
     * @param {number} hour
     */
    setHour(hour) {
        this._hour = hour;
        // 如果Seki时间系统存在，也同步到Seki系统（可选）
        if ($gameSystem && $gameSystem._timeSystem && typeof $gameSystem._timeSystem.hour !== 'undefined') {
            // 注释掉这行，避免修改Seki系统
            // $gameSystem._timeSystem.hour = hour;
        }
    }
    /**
     * Get Minute
     */
    getMinute() {
        // 优先使用Seki时间系统的时间
        if ($gameSystem && $gameSystem._timeSystem && typeof $gameSystem._timeSystem.minute !== 'undefined') {
            return $gameSystem._timeSystem.minute;
        }
        return this._minute;
    }
    /**
     * Set Minute
     * @param {number} minute
     */
    setMinute(minute) {
        this._minute = minute;
        // 如果Seki时间系统存在，也同步到Seki系统（可选）
        if ($gameSystem && $gameSystem._timeSystem && typeof $gameSystem._timeSystem.minute !== 'undefined') {
            // 注释掉这行，避免修改Seki系统
            // $gameSystem._timeSystem.minute = minute;
        }
    }
    /**
     * Get Second
     */
    getSecond() {
        return this._second;
    }
    /**
     * Set Second
     * @param {number} second
     */
    setSecond(second) {
        this._second = second;
    }
    /**
     * Get Total Days
     */
    getTotalDays() {
        return this._totalDays;
    }
	/**
     * Set Day
     * @param {number} day
     */
    setDay(day) {
        const monthConfig = this.getMonthConfig();
        if (day < 1 || day > monthConfig.totalDays) {
            throw new Error('Invalid day value');
        }
        this._day = day;
    }
    /**
     * Get Year
     */
    getYear() {
        return this._year;
    }
    /**
     * Set Year
     * @param {number} year
     */
    setYear(year) {
        this._year = year;
    }
	/**
     * Set Month Index
     * @param {number} monthIndex
     */
    setMonthIndex(monthIndex) {
        if (monthIndex < 0 || monthIndex >= WorldCoreParams.monthConfigs.length) {
            throw new Error('Invalid month index');
        }
        this._monthIndex = monthIndex;
    }
	/**
     * Set Month Name
     * @param {string} monthName
     */
    setMonthName(monthName) {
        for (const monthConfig of WorldCoreParams.monthConfigs) {
            if (monthConfig.monthName === monthName) {
                this._monthIndex = WorldCoreParams.monthConfigs.indexOf(monthConfig);
                return;
            }
        }
        throw new Error('Invalid month name');
    }
    /**
     * Pause Time
     */
    pauseTime() {
        this._active = false;
    }
    /**
     * Resume Time
     */
    resumeTime() {
        this._active = true;
    }
    /**
     * Save Properties
     */
    saveProperties() {
        return [
            ["_monthIndex", this._monthIndex],
            ["_day", this._day],
            ["_hour", this._hour],
            ["_extendingHour", this._extendingHour],
            ["_active", this._active],
            ["_passingOut", this._passingOut],
            ["_minute", this._minute],
            ["_second", this._second],
            ["_totalDays", this._totalDays],
            ["_year", this._year],
            ["_weatherType", this._weatherType],
            ["_tomorrowWeather", this._tomorrowWeather],
            ["_frameCounter", this._frameCounter]
        ]
    }
    /**
     * Add Seconds
     * @param {number} seconds
     */
    addSeconds(seconds) {
        this._second += seconds;
        if (this._second >= WorldCoreParams.totalSeconds) {
            const remainingSeconds = this._second - WorldCoreParams.totalSeconds;
            this._second = 0;
            this.addMinutes(1);
            this.addSeconds(remainingSeconds);
        }
    }
    /**
     * Add Minutes
     * @param {number} minutes
     */
    addMinutes(minutes) {
        this._minute += minutes;
        if (this._minute >= WorldCoreParams.totalMinutes) {
            const remainingMinutes = this._minute - WorldCoreParams.totalMinutes;
            this._minute = 0;
            this.addHours(1);
            this.addMinutes(remainingMinutes);
        }
    }
    /**
     * Add Hours
     * @param {number} hours
     */
    addHours(hours) {
        this._hour += hours;
        this._extendingHour += hours;
        if (this._hour >= WorldCoreParams.totalHours) {
            const remainingHours = this._hour - WorldCoreParams.totalHours;
            this._hour = 0;
            this.addDays(1);
            this.addHours(remainingHours);
        }
        this.callTintUpdateCallback();
    }
    /**
     * Add Days
     * @param {number} days
     */
    addDays(days) {
        const monthConfig = this.getMonthConfig();
        this._day += days;
        this._totalDays += days;
        if (this._day > monthConfig.totalDays) {
            const remainingDays = this._day - monthConfig.totalDays;
            this._day = 0;
            this.addMonths(1);
            this.addDays(remainingDays);
        }
        this.refreshTodayWeather();
        for (var i = 0; i < days; i++) {
            this._onNewDayListeners.forEach((listener) => {
                listener();
            });
        }
    }
    /**
     * Add Months
     * @param {number} months
     */
    addMonths(months) {
        this._monthIndex += months;
        if (this._monthIndex >= WorldCoreParams.monthConfigs.length) {
            const remainingMonths = this._monthIndex - WorldCoreParams.monthConfigs.length;
            this._monthIndex = 0;
            this.addYears(1);
            this.addMonths(remainingMonths);
        }
    }
    /**
     * Add Years
     * @param {number} years
     */
    addYears(years) {
        this._year += years;
    }
    /**
     * Randomize Weather
     */
    randomizeWeather() {
        const monthConfig = this.getMonthConfig();
        const weathers = monthConfig.weathers;
        const pool = [];
        for (const weather of weathers) {
            const weatherId = weather.weatherID;
            const chance = weather.chance;
            for (let i = 0; i < chance; i++) {
                pool.push(weatherId);
            }
        }
        return ESL.Array.randomElement(pool);
    }
    /**
     * Get Today Weather
     */
    refreshTodayWeather() {
        this._weatherType = this._tomorrowWeather ? this._tomorrowWeather : this.randomizeWeather();
        this._tomorrowWeather = null;
    }
    /**
     * Get Tomorrow Weather
     */
    getTomorrowWeather() {
        if (this._tomorrowWeather) {
            return this._tomorrowWeather;
        }
        const currentDay = this.getDay();
        const currentMonth = this.getMonth();
        const currentYear = this.getYear();
        const currentWeather = this.getWeather();

        this.addDays(1);
        const tomorrowWeather = this.getWeather();

        this._day = currentDay;
        this._monthIndex = currentMonth;
        this._year = currentYear;
        this._weatherType = currentWeather;
        this._totalDays -= 1;
        this._tomorrowWeather = tomorrowWeather;
        return tomorrowWeather;
    }
	/**
     * Get Tomorrow Weather Name
     */
    getTomorrowWeatherName() {
        const tomorrowWeather = this.getTomorrowWeather();
        return this.getWeatherConfig(tomorrowWeather).weatherName;
    }
    /**
     * New Day
     */
    startNewDay(wakeupHour = 6, wakeupMinute = 0) {
        this.addDays(1);
        this._hour = wakeupHour;
        this._extendingHour = wakeupHour;
        this._minute = wakeupMinute;
        this._passingOut = false;
        this.refreshTimeHud();
        this.callTintUpdateCallback();
    }
    /**
     * On Map Update
     */
    onMapUpdate() {
        if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
            return;
        }
        if (!this._active) {
            return;
        }
        if (this.isTimePausedOnCurrentMap()) {
            return;
        }
        this.updateTime();
    }
    /**
     * Update Time
     */
    updateTime() {
        this._frameCounter++;
        if (this._frameCounter >= WorldCoreParams.timeInterval) {
            this._frameCounter = 0;
            this.addSeconds(WorldCoreParams.increaseSecondsAmount);
            this.refreshTimeHud();
        }
        this.updatePassout();
    }
    /**
     * Update Passout
     */
    updatePassout() {
        if (!this._passoutConfig.enabled) {
            return;
        }
        if (this._passingOut) {
            return;
        }
        const extendingHour = this._extendingHour;
        const minute = this.getMinute();
        const extendingPassoutHour = this._passoutConfig.hour >= 0 ? WorldCoreParams.totalHours + this._passoutConfig.hour : this._passoutConfig.hour;
        const passoutMinute = this._passoutConfig.minute;        
        if (extendingHour >= extendingPassoutHour && minute >= passoutMinute) {
            const commonEventId = this._passoutConfig.commonEvent;
            if (commonEventId) {
                $gameTemp.reserveCommonEvent(commonEventId);
            }
            this._passingOut = true;
        }
    }
    /**
     * Is Time Pause On Current Map
     */
    isTimePausedOnCurrentMap() {
        return !!$dataMap.meta["Time Paused"];
    }
    /**
     * Set Time Hud
     * Any addon plugin mush have a refresh method so that it can be called when the time is updated
     * This method will throw an error if the refresh method is not defined
     * You should call this method in your addon plugin to set the time hud
     * @param {PIXI.DisplayObject} timeHud
     */
    setTimeHud(timeHud) {
        if (!timeHud.refresh && typeof timeHud.refresh !== "function") {
            throw new Error('Time Hud must have a refresh method');
        }
        this._timeHud = timeHud;
        this._timeHud.refresh();
    }
    /**
     * Refresh Time Hud
     */
    refreshTimeHud() {
        if (this._timeHud) {
            this._timeHud.refresh();
        }
    }
    /**
     * Set Tint Update Callback
     * @param {Function} callback
     */
    setTintUpdateCallback(callback) {
        this._tintUpdateCallback = callback;
    }
    /**
     * Call Tint Update Callback
     */
    callTintUpdateCallback() {
        if (this._tintUpdateCallback) {
            this._tintUpdateCallback();
        }
    }
}

/** @type {WorldManager} */
WorldManager.inst = null;
ESL.addGameService("WorldManager", WorldManager);

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
//========================================================================
// END OF PLUGIN
//========================================================================