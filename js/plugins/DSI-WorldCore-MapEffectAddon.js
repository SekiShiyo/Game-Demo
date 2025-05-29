//=======================================================================
// * Plugin Name  : DSI-WorldCore-MapEffectAddon.js
// * Last Updated : 3/13/2025
//========================================================================
/*:
 * @author sirogames
 * @plugindesc (v1.0) A addon plugin for DSI-WorldCore.js that add map effects like weather effects & tint to the game.
 * @target MZ
 * @help 
 * ========================================================================
 * > Description
 * =======================================================================
 * This plugin is an addon for DSI-WorldCore.js that allows you to add map effects 
 * like weather effects and tint to the game.
 * 
 * Put this plugin below DSI-WorldCore.js in the plugin manager.
 * Setup the parameters in the plugin manager.
 * ========================================================================
 * > Map Notetags
 * ======================================================================
 * <Ignore Weather Effect>
 * This will ignore the weather effect for this map. 
 * Use this if you want to control map weather by yourself.
 * 
 * <Ignore Tint Effect>
 * This will ignore the tint effect for this map. 
 * Use this if you want to control map tint by yourself.
 * 
 * @param weatherConfigs:arr_struct
 * @text Weather Effect Configurations
 * @desc Config for all weather types
 * @type struct<RpgMakerWeatherEffectConfig>[]
 * @default ["{\"weatherId:str\":\"rainy\",\"weather:str\":\"rain\",\"strength:num\":\"5\",\"eval:note\":\"\\\"\\\"\",\"tintConfigs:arr_struct\":\"[\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-20\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-30\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-30\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-15\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-15\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-40\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-50\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-40\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-100\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-110\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-100\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"23\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-200\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-200\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-190\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"50\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"weatherId:str\":\"snowy\",\"weather:str\":\"snow\",\"strength:num\":\"3\",\"eval:note\":\"\\\"\\\"\",\"tintConfigs:arr_struct\":\"[\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-10\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-10\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-15\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-15\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-40\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-50\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-40\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-100\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-110\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-100\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"23\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-200\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-200\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-190\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"50\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"weatherId:str\":\"storm\",\"weather:str\":\"storm\",\"strength:num\":\"8\",\"eval:note\":\"\\\"\\\"\",\"tintConfigs:arr_struct\":\"[\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"6\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-10\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-10\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"16\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-5\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"17\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-15\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-15\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"5\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"18\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-40\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-50\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-40\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-100\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-110\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-100\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"40\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"hour:num\\\\\\\":\\\\\\\"23\\\\\\\",\\\\\\\"red:num\\\\\\\":\\\\\\\"-200\\\\\\\",\\\\\\\"green:num\\\\\\\":\\\\\\\"-200\\\\\\\",\\\\\\\"blue:num\\\\\\\":\\\\\\\"-190\\\\\\\",\\\\\\\"gray:num\\\\\\\":\\\\\\\"50\\\\\\\",\\\\\\\"eval:note\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 * 
 * @param tintConfigs:arr_struct
 * @text Default Tint Configurations
 * @desc Config for all tint types
 * @type struct<RpgMakerTintConfig>[]
 * @default ["{\"hour:num\":\"6\",\"red:num\":\"10\",\"green:num\":\"-10\",\"blue:num\":\"-10\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"7\",\"red:num\":\"-5\",\"green:num\":\"-5\",\"blue:num\":\"-5\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"8\",\"red:num\":\"0\",\"green:num\":\"0\",\"blue:num\":\"0\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"16\",\"red:num\":\"10\",\"green:num\":\"-5\",\"blue:num\":\"-5\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"17\",\"red:num\":\"30\",\"green:num\":\"-15\",\"blue:num\":\"-15\",\"gray:num\":\"5\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"18\",\"red:num\":\"-40\",\"green:num\":\"-50\",\"blue:num\":\"-40\",\"gray:num\":\"10\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"20\",\"red:num\":\"-100\",\"green:num\":\"-110\",\"blue:num\":\"-100\",\"gray:num\":\"40\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"23\",\"red:num\":\"-200\",\"green:num\":\"-200\",\"blue:num\":\"-190\",\"gray:num\":\"50\",\"eval:note\":\"\\\"\\\"\"}"]
 * 
 * @param tintTransitionDuration:num
 * @text Tint Transition Duration
 * @desc Enter a number
 * @default 120
 */
//========================================================================
// Custom Structs
//========================================================================
/*~struct~RpgMakerWeatherEffectConfig:
 * @param weatherId:str
 * @text Weather ID
 * @desc Enter a unique string that identifies the weather type
 * 
 * @param weather:str
 * @text Weather Effect Type (RPG Maker)
 * @desc Enter a string
 * @default none
 * @type combo
 * @option none
 * @option rain
 * @option storm
 * @option snow
 * 
 * @param strength:num
 * @text Strength
 * @desc Enter a number
 * @default 0
 * @type number
 * @min 0
 * @max 10
 * 
 * @param eval:note
 * @text Custom Code 
 * @desc This is a custom code that will be executed when the it is the time to apply the weather.
 * @default ""
 * @type note
 * 
 * @param tintConfigs:arr_struct
 * @text Weather Tint Configurations
 * @desc Config for all tint types
 * @type struct<RpgMakerTintConfig>[]
 * @default ["{\"hour:num\":\"6\",\"red:num\":\"10\",\"green:num\":\"-10\",\"blue:num\":\"-10\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"7\",\"red:num\":\"-5\",\"green:num\":\"-5\",\"blue:num\":\"-5\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"8\",\"red:num\":\"0\",\"green:num\":\"0\",\"blue:num\":\"0\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"16\",\"red:num\":\"10\",\"green:num\":\"-5\",\"blue:num\":\"-5\",\"gray:num\":\"0\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"17\",\"red:num\":\"30\",\"green:num\":\"-15\",\"blue:num\":\"-15\",\"gray:num\":\"5\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"18\",\"red:num\":\"-40\",\"green:num\":\"-50\",\"blue:num\":\"-40\",\"gray:num\":\"10\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"20\",\"red:num\":\"-100\",\"green:num\":\"-110\",\"blue:num\":\"-100\",\"gray:num\":\"40\",\"eval:note\":\"\\\"\\\"\"}","{\"hour:num\":\"23\",\"red:num\":\"-200\",\"green:num\":\"-200\",\"blue:num\":\"-190\",\"gray:num\":\"50\",\"eval:note\":\"\\\"\\\"\"}"]
 * 
 */
/*~struct~RpgMakerTintConfig:
 * @param hour:num
 * @text Hour 
 * @desc The hour of the day that the tint will be applied
 * @default 0
 * @type number
 * @min 0
 * @max 23
 * 
 * @param red:num
 * @text Red (-255, 255)
 * @desc Enter a number
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * 
 * @param green:num
 * @text Green (-255, 255)
 * @desc Enter a number
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * 
 * @param blue:num
 * @text Blue (-255, 255)
 * @desc Enter a number
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * 
 * @param gray:num
 * @text Gray (0-255)
 * @desc Enter a number
 * @default 0
 * @type number
 * @min 0
 * @max 255
 * 
 * @param eval:note
 * @text Custom Code 
 * @desc This is a custom code that will be executed when the it is the time to apply the tint.
 * @default ""
 * @type note
 */
//========================================================================
// Plugin Code
//========================================================================
var Imported = Imported || {};
Imported["DSI-WorldCore-WeatherAddon"] = true;

/** @type {DSI_WorldCore_MapEffectAddonParams} */
const MapEffectAddonParams = PluginManager.parametersEx('DSI-WorldCore-MapEffectAddon');

MapEffectAddonParams.tintConfigs = MapEffectAddonParams.tintConfigs.sort((a, b) => { a.hour - b.hour });

var DSI_WorldCore_WeatherAddon_Scene_Map_start = Scene_Map.prototype.start;
/**
 * Start
 */
Scene_Map.prototype.start = function () {
    DSI_WorldCore_WeatherAddon_Scene_Map_start.call(this);
    this.refreshMapWeather();
    this.refreshMapTint();
}
/**
 * Refresh Map Weather
 */
Scene_Map.prototype.refreshMapWeather = function () {
    const weatherConfigs = MapEffectAddonParams.weatherConfigs;
    let weatherType = null;
    let weatherStrength = 0;
    let weatherCode = null;
    if (weatherConfigs && !$dataMap.meta['Ignore Weather Effect']) {
        const currentWeather = WorldManager.inst.getWeather();
        const weatherConfig = this.getWeatherConfigById(currentWeather);
        if (weatherConfig) {
            weatherType = weatherConfig.weather;
            weatherStrength = weatherConfig.strength;
            weatherCode = weatherConfig.eval;
        }
    }
    if (weatherType) {
        $gameScreen.changeWeather(weatherType, weatherStrength, 0);
        if (weatherCode) {
            try {
                eval(weatherCode);
            } catch (e) {
                console.error("Error executing custom weather code:", e);
            }
        }
    } else {
        $gameScreen.changeWeather("none", 0, 0);
    }
};
/**
 * Get Weather Config By Id
 * @param {string} weatherId
 */
Scene_Map.prototype.getWeatherConfigById = function (weatherId) {
    const weatherConfigs = MapEffectAddonParams.weatherConfigs;
    for (const config of weatherConfigs) {
        if (config.weatherId === weatherId) {
            return config;
        }
    }
    return null;
}
/**
 * Refresh Map Tint
 */
Scene_Map.prototype.refreshMapTint = function () {
    const tintSetup = this.getTintSetupByWeather(WorldManager.inst.getWeather());
    if (tintSetup && !$dataMap.meta['Ignore Tint Effect']) {
        const currentHour = WorldManager.inst.getHour();
        const tintConfig = this.getCorrectTintConfigByHour(tintSetup, currentHour);
        if (tintConfig) {
            this.changeWorldTint(tintConfig, 0);
        }
    } else {
        $gameScreen.startTint([0, 0, 0, 0], 0);
    }
    WorldManager.inst.setTintUpdateCallback(this.updateTintByTime.bind(this));
}
/**
 * Get Tint Setup By Weather
 * @param {string} weatherId
 */
Scene_Map.prototype.getTintSetupByWeather = function (weatherId) {
    const weatherConfigs = MapEffectAddonParams.weatherConfigs;
    for (const config of weatherConfigs) {
        if (config.weatherId === weatherId) {
            return config.tintConfigs;
        }
    }
    return MapEffectAddonParams.tintConfigs;
}
/**
 * Update Tint By Time
 */
Scene_Map.prototype.updateTintByTime = function () {
    if ($dataMap.meta['Ignore Tint Effect']) {
        return;
    }
    const currentHour = WorldManager.inst.getHour();
    const tintConfigs = this.getTintSetupByWeather(WorldManager.inst.getWeather());
    const currentTintConfig = this.getCorrectTintConfigByHour(tintConfigs, currentHour);
    if (currentTintConfig) {
        this.changeWorldTint(currentTintConfig, MapEffectAddonParams.tintTransitionDuration);
    }
}
/**
 * Get Correct Tint Config By Hour
 * @param {RpgMakerTintConfig[]} tintConfigs
 * @param {number} hour
 */
Scene_Map.prototype.getCorrectTintConfigByHour = function (tintConfigs, hour) {
    if (tintConfigs) {
        for (var i = tintConfigs.length - 1; i >= 0; i--) {
            const config = tintConfigs[i];
            if (config.hour <= hour) {
                return config;
            }
        }
    }
    return null;
}
/**
 * Change World Tint
 * @param {RpgMakerTintConfig} config
 * @param {number} duration
 */
Scene_Map.prototype.changeWorldTint = function (config, duration) {
    const tint = [config.red, config.green, config.blue, config.gray];
    $gameScreen.startTint(tint, duration);
    if (config.eval) {
        try {
            eval(config.eval);
        } catch (e) {
            console.error("Error executing custom tint code:", e);
        }
    }
    this._currentTintHour = config.hour;
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
//========================================================================
// END OF PLUGIN
//========================================================================