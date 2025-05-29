//=======================================================================
// * Plugin Name  : DSI-NpcScheduler.js
// * Last Updated : 5/4/2025
//========================================================================
/*:
 * @author sirogames
 * @plugindesc (v1.2) A plugin to schedule NPCs to move around the map at specific times.
 * @target MZ
 * @help 
 * ========================================================================
 * > Description
 * =======================================================================
 * This plugin allows you to schedule NPCs to move around the map at specific times.
 * You can set up multiple schedules for each NPC, and they will follow the schedule
 * you set up.
 * =======================================================================
 * > Required Plugins
 * =======================================================================
 * 1. DSI-WorldCore.js
 * 2. DSI-EventSpawner.js
 * 3. DSI-CoreMZ.js
 * =======================================================================
 * > Instructions
 * ======================================================================
 * 1. Open the plugin manager and add this plugin to your project.
 * 2. Setup the template event in the template map in DSI-EventSpawner.js
 * 3. Setup the NPC schedule in the plugin parameters.
 * 4. Setup Npc walkable regions in the plugin parameters.
 * 5. Setup the map connections in the plugin parameters.
 * 6. Draw the walkable regions in the map editor.
 * 7. Save the map and run the game.
 * 8. The NPCs will follow the schedule you set up.
 * 
 * @param schedules:arr_struct
 * @text Npc Scheduler Configurations
 * @desc Enter an array of Npc Scheduler Configurations
 * @type struct<NpcSchedulerConfig>[]
 * @default []
 * 
 * @param mapConnections:arr_struct
 * @text Map Connections
 * @desc Enter an array of object
 * @type struct<MapConnection>[]
 * @default []
 * 
 * @param npcWalkableRegionds:arr_num
 * @text Npc Walkable Region IDS
 * @desc Enter an array of number
 * @type number[]
 * @default ["20"]
 * 
 */
//========================================================================
// Custom Structs
//========================================================================
/*~struct~NpcSchedulerConfig:
 * @param npcId:str
 * @text Npc ID
 * @desc Enter a string. This is the ID of the NPC.
 * @default 
 * 
 * @param templateEventId:num
 * @text Template Event ID
 * @desc Enter a number
 * @default 0
 * 
 * @param position:location
 * @text Original Position
 * @desc Enter the original position of the NPC.
 * @type location
 * 
 * @param direction:num
 * @text Direction
 * @desc Enter the direction of the NPC.
 * @type select
 * @default 2
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * 
 * @param currentScheduleVarId:num
 * @text Current Schedule Variable ID
 * @desc Enter a variable ID. This is the variable ID that will be used to store the current schedule ID for this NPC.
 * @type variable
 * @default 0
 * 
 * @param allSchedules:arr_struct
 * @text All Schedules
 * @desc Enter an array of object
 * @type struct<ScheduleConfig>[]
 * @default []
 *
 * 
 */
/*~struct~MapConnection:
 * @param name:str
 * @text Connection Name
 * @desc Enter a descriptive name for this connection (for management purposes only).
 * @default 
 * 
 * @param firstLocation:location
 * @text First Location
 * @desc Enter the first location of the map connection.
 * @type location
 * 
 * @param secondLocation:location
 * @text Second Location
 * @desc Enter the second location of the map connection.
 * @type location
 * 
 * @param direction:num
 * @text First Location Spawn Direction
 * @desc When Npc teleport to the first location, what direction should it face?
 * @type select
 * @default 2
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * 
 * @param secondDirection:num
 * @text Second Location Spawn Direction
 * @desc When Npc teleport to the second location, what direction should it face?
 * @type select
 * @default 2
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * 
 */
/*~struct~ScheduleConfig:
 * @@param id:str
 * @text Schedule ID
 * @desc Enter a string. This can be used in the future to identify the schedule.
 * @default 
 * 
 * @param time:str
 * @text Time
 * @desc Enter a string. hh:mm
 * @default 06:00
 * 
 * @param weekdays:array
 * @text Weekdays (Optional)
 * @desc Enter an array of string. This is the weekdays that the schedule will run. Leave empty to run every day.
 * @type string[]
 * @default []
 * 
 * @param monthNames:array
 * @text Month Names (Optional)
 * @desc Enter an array of string. This is the month names that the schedule will run. Leave empty to run every month.
 * @type string[]
 * @default []
 * 
 * @param enablerSwitchId:num
 * @text Enabler Switch ID (Optional)
 * @desc When you set up this switch, the switch will need to be ON for the schedule to run.
 * @type switch
 * @default 0
 * 
 * @param customCondition:note
 * @text Custom Condition (Optional) (For Advanced Users)
 * @desc Enter a custom condition that will be checked before the schedule runs.
 * @default "condition = true"
 * @type note
 * 
 * @param priority:num
 * @text Priority
 * @desc If multiple schedules are active at the same time, the one with the highest priority will run.
 * @default 0
 * 
 * @param targetLocation:location
 * @text Target Location
 * @desc Enter the target location that you want the NPC to go to.
 * @type location
 * 
 * @param targetDirection:num
 * @text Target Direction
 * @desc Enter the target direction that you want the NPC to face.
 * @type select
 * @default 2
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 */
//========================================================================
// Plugin Code
//========================================================================
var Imported = Imported || {};
Imported["DSI-NpcScheduler"] = true;

/** @type {DSI_NpcSchedulerParams} */
const NpcSchedulerParams = PluginManager.parametersEx('DSI-NpcScheduler');

if (!Imported['DSI-WorldCore']) {
    throw new Error("DSI-NpcScheduler requires DSI-WorldCore. Please install it first.");
}

class NpcSchedulerService extends ESL.Engine.GameService {
    /**
     * NpcSchedulerService
     */
    constructor() {
        super();
        NpcSchedulerService.inst = this;
        /** @type {Game_NpcData[]} */
        this._npcs = [];
        /** @type {Object.<string, NpcSchedulerConfig>} */
        this._scheduleMap = {};
        this._eventCreated = false;
        this.loadParams();
        WorldManager.inst.registerOnNewDayListener(this.onNewDay.bind(this));
    }
    /**
     * Load Params
     */
    loadParams() {
        NpcSchedulerParams.schedules.forEach((schedule) => {
            this._scheduleMap[schedule.npcId] = schedule;
            schedule.allSchedules.forEach((schedule) => {
                const time = schedule.time.split(":");
                schedule.totalMins = (+time[0] * 60) + (+time[1]);
            });
            schedule.allSchedules.sort((a, b) => { a.totalMins - b.totalMins });
        });
        this.processMapConnections();
    }
    /**
     * Process Map Connections
     */
    processMapConnections() {
        this._mapConnectionDict = {};
        NpcSchedulerParams.mapConnections.forEach((mapConnection) => {
            mapConnection.firstLocation = { x: +mapConnection.firstLocation.x, y: +mapConnection.firstLocation.y, mapId: +mapConnection.firstLocation.mapId };
            mapConnection.secondLocation = { x: +mapConnection.secondLocation.x, y: +mapConnection.secondLocation.y, mapId: +mapConnection.secondLocation.mapId };

            this._mapConnectionDict[mapConnection.firstLocation.mapId] = this._mapConnectionDict[mapConnection.firstLocation.mapId] ?? [];
            this._mapConnectionDict[mapConnection.firstLocation.mapId].push(new SimpleMapConnection(mapConnection.firstLocation, mapConnection.secondLocation, mapConnection.direction, mapConnection.secondDirection));
            this._mapConnectionDict[mapConnection.secondLocation.mapId] = this._mapConnectionDict[mapConnection.secondLocation.mapId] ?? [];
            this._mapConnectionDict[mapConnection.secondLocation.mapId].push(new SimpleMapConnection(mapConnection.secondLocation, mapConnection.firstLocation, mapConnection.secondDirection, mapConnection.direction));
        });
    }
    /**
     * On New Game
     */
    onNewGame() {
        Object.values(this._scheduleMap).forEach((schedule) => {
            const npcId = schedule.npcId;
            const position = { x: +schedule.position.x, y: +schedule.position.y };
            const mapId = +schedule.position.mapId;
            const direction = schedule.direction;
            // Create Npc Data
            const npcData = new Game_NpcData(npcId, position, direction, mapId);
            // Add Npc Data to the Service
            this.addNpcData(npcData);
        });
    }
    /**
     * Get Npc Schedule
     * @param {string} npcId
     * @return {NpcSchedulerConfig}
     */
    getNpcSchedule(npcId) {
        return this._scheduleMap[npcId];
    }
    /**
     * On Map Loaded
     */
    onMapLoaded() {
        console.log("NpcScheduler: onMapLoaded called, current map:", $gameMap.mapId());
        console.log("NpcScheduler: NPCs count:", this._npcs.length);
        
        if (!this._eventCreated) {
            this._npcs.forEach((npcData) => {
                const event = npcData.getEvent();
                console.log("NpcScheduler: Created event for NPC:", npcData._npcId);
            });
            this._eventCreated = true;
        }
        this._npcs.forEach((npcData) => {
            const { mapId, position, direction } = npcData.getInfo();
            const event = npcData.getEvent();
            console.log(`NpcScheduler: Processing NPC ${npcData._npcId} - target map: ${mapId}, current map: ${$gameMap.mapId()}, position: (${position.x}, ${position.y})`);
            
            if (mapId == $gameMap.mapId()) {
                console.log(`NpcScheduler: Spawning NPC ${npcData._npcId} on current map`);
                EventSpawner.inst.spawnExistingEvent(event, position.x, position.y, direction);
                event._mapId = mapId;
            } else {
                event._x = position.x;
                event._y = position.y;
                event._realX = position.x;
                event._realY = position.y;
                event._mapId = mapId;
                event.setDirection(direction);
            }
        });
    }
    /**
     * On New Day
     */
    onNewDay() {
        this._npcs.forEach((npcData) => {
            const config = npcData.getScheduleConfig();
            const event = npcData.getEvent();
            var targetMapId = +config.position.mapId;
            var targetPosition = { x: +config.position.x, y: +config.position.y };
            if (event._mapId == $gameMap.mapId() && targetMapId != $gameMap.mapId()) {
                EventSpawner.inst.despawnEvent(event);
            }
            npcData._mapId = targetMapId;
            npcData._position.x = targetPosition.x;
            npcData._position.y = targetPosition.y;
            npcData._direction = config.direction;
            event._mapId = targetMapId;
            event._realX = targetPosition.x;
            event._realY = targetPosition.y;
            event._x = targetPosition.x;
            event._y = targetPosition.y;
            event.setDirection(config.direction);
            event.clearCommands();
        });
    }
    /**
     * Add Npc Data
     * @param {Game_NpcData} npcData
     */
    addNpcData(npcData) {
        this._npcs.push(npcData);
    }
    /**
     * Get Npc Data
     * @param {string} npcId
     */
    getNpcData(npcId) {
        return this._npcs.find((npcData) => npcData._npcId == npcId);
    }
    /**
     * Save Properties
     */
    saveProperties() {
        return [
            ["@Arr:_npcs", this._npcs]
        ]
    }
    /**
     * Get Shortest Command List
     * @param {number} sourceMapId
     * @param {number} sourcePosition
     * @param {number} targetMapId
     * @param {number} targetPosition
     * @param {number} targetDirection
     */
    getShortestCommandList(sourceMapId, sourcePosition, targetMapId, targetPosition, targetDirection) {
        if (sourceMapId == targetMapId && sourcePosition.x == targetPosition.x && sourcePosition.y == targetPosition.y) {
            return [];
        }
        if (sourceMapId == targetMapId) {
            // Pathfind from sourcePosition to targetPosition on the same map
            var positions = this.findPathAStar(sourceMapId, sourcePosition, targetPosition);
            var commandList = [];
            positions.forEach((position) => {
                var moveCommand = new SimpleMoveCommand(position);
                commandList.push(moveCommand);
            });
            commandList.push(new SimpleTurnCommand(targetDirection));
            return commandList;
        } else {
            // Pathfind from sourceMapId to targetMapId
            var allPaths = this.findAllConnectionPaths(sourceMapId, targetMapId);
            var shortestCommandList = [];
            allPaths.sort((a, b) => { a.length - b.length });
            var shortestPath = allPaths[0];
            {
                var connectionPath = shortestPath;
                var currentCommandList = [];
                var currentPosition = sourcePosition;

                var firstConnection = connectionPath[0];
                if (firstConnection.sourceX != currentPosition.x || firstConnection.sourceY != currentPosition.y) {
                    // Move from source position to the first connection source position
                    var positions = this.findPathAStar(sourceMapId, currentPosition, { x: firstConnection.sourceX, y: firstConnection.sourceY });
                    positions.forEach((position) => {
                        var moveCommand = new SimpleMoveCommand(position);
                        currentCommandList.push(moveCommand);
                    });
                }
                // Teleport to the first connection target position
                var teleportCommand = new SimpleTeleportCommand(firstConnection.targetMapId, { x: firstConnection.targetX, y: firstConnection.targetY }, firstConnection.targetDirection);
                currentCommandList.push(teleportCommand);
                currentPosition = { x: firstConnection.targetX, y: firstConnection.targetY };
                for (var i = 1; i < connectionPath.length; i++) {
                    var connection = connectionPath[i];
                    var positions = this.findPathAStar(connection.sourceMapId, currentPosition, { x: connection.sourceX, y: connection.sourceY });
                    positions.forEach((position) => {
                        var moveCommand = new SimpleMoveCommand(position);
                        currentCommandList.push(moveCommand);
                    });
                    // Teleport to the first connection target position
                    var teleportCommand = new SimpleTeleportCommand(connection.targetMapId, { x: connection.targetX, y: connection.targetY }, connection.targetDirection);
                    currentCommandList.push(teleportCommand);
                    currentPosition = { x: connection.targetX, y: connection.targetY };
                }
                // Move from the last connection target position to the target position
                var lastPositions = this.findPathAStar(targetMapId, currentPosition, targetPosition);
                lastPositions.forEach((position) => {
                    var moveCommand = new SimpleMoveCommand(position);
                    currentCommandList.push(moveCommand);
                });
                currentCommandList.push(new SimpleTurnCommand(targetDirection));
                // Add the current command list to the shortest command list
                if (shortestCommandList.length == 0 || currentCommandList.length < shortestCommandList.length) {
                    shortestCommandList = currentCommandList;
                }
            }
            return shortestCommandList;
        }
    }
    /**
     * Find All Connection Paths
     * @param {number} sourceMapId
     * @param {number} targetMapId
     * @return {SimpleMapConnection[][]}
     * @desc Find all connection paths between two maps.
     */
    findAllConnectionPaths(sourceMapId, targetMapId) {
        var allPaths = [];
        var visited = new Set();
        this.dfs(sourceMapId, targetMapId, visited, allPaths);
        return allPaths;
    }
    /**
     * Dfs
     * @param {number} currentMapId
     * @param {number} targetMapId
     * @param {Set} visited
     * @param {SimpleMapConnection[][]} allPaths
     */
    dfs(currentMapId, targetMapId, visited, allPaths) {
        /** @type {ESL.Stack} */
        var stack = new ESL.Stack();
        stack.push({
            mapId: currentMapId,
            path: []
        });
        while (!stack.isEmpty()) {
            var current = stack.pop();
            var currentMapId = current.mapId;
            var currentPath = current.path;
            if (current.mapId == targetMapId) {
                allPaths.push(current.path);
                continue;
            }
            if (!this._mapConnectionDict.hasOwnProperty(current.mapId)) {
                continue;
            }
            for (var connection of this._mapConnectionDict[current.mapId]) {
                if (currentPath.includes(connection) || visited.has(connection.targetMapId)) {
                    continue;
                }
                visited.add(connection.targetMapId);
                var newPath = currentPath.slice();
                newPath.push(connection);
                stack.push({
                    mapId: connection.targetMapId,
                    path: newPath
                });
            }
        }
    }
    /**
     * Find Path A Star
     * @param {string} mapId
     * @param {{x: number, y: number}} sourcePosition
     * @param {{x: number, y: number}} targetPosition
     */
    findPathAStar(mapId, sourcePosition, targetPosition) {
        return ESL.Utils.easyAStar((x, y) => {
            return NpcSchedulerParams.npcWalkableRegionds.includes(ESL.getRegionId(mapId, x, y));
        }, sourcePosition, targetPosition);
    }
    /**
     * On Map Update
     */
    updateEvents() {
        const hour = WorldManager.inst.getHour();
        const minute = WorldManager.inst.getMinute();
        const weekdayName = WorldManager.inst.getWeekday();
        const monthName = WorldManager.inst.getMonthName();
        const totalMins = (hour * 60) + minute;
        
        console.log(`NpcScheduler: 当前时间 ${hour}:${minute} (${totalMins}分钟), 星期${weekdayName}, ${monthName}`);
        
        this._npcs.forEach((npcData) => {
            var event = npcData.getEvent();
            if (!event.isFollowingCommands()) {
                var allSchedules = npcData.getScheduleConfig().allSchedules;
                var availableSchedules = [];
                for (var i = allSchedules.length - 1; i >= 0; i--) {
                    var scheduleItem = allSchedules[i];
                    var monthNameOkay = scheduleItem.monthNames.length == 0 || scheduleItem.monthNames.includes(monthName);
                    var weekdayOkay = scheduleItem.weekdays.length == 0 || scheduleItem.weekdays.includes(weekdayName);
                    var enablerSwitchOkay = scheduleItem.enablerSwitchId == 0 || $gameSwitches.value(scheduleItem.enablerSwitchId);
                    var condition = true;
                    if (scheduleItem.customCondition && scheduleItem.customCondition.length > 0) {
                        eval(scheduleItem.customCondition);
                    }
                    var customConditionOkay = condition == true;

                    if (scheduleItem.totalMins <= totalMins && monthNameOkay && weekdayOkay && enablerSwitchOkay && customConditionOkay) {
                        availableSchedules.push(scheduleItem);
                    }
                }
                // Get the schedule with the highest priority
                var schedule = availableSchedules.sort((a, b) => b.priority - a.priority)[0];
                if (schedule) {
                    var targetPosition = { x: +schedule.targetLocation.x, y: +schedule.targetLocation.y };
                    var targetDirection = schedule.targetDirection;
                    var targetMapId = +schedule.targetLocation.mapId;
                    var commandList = this.getShortestCommandList(npcData._mapId, npcData._position, targetMapId, targetPosition, targetDirection);
                    event.followCommands(commandList);
                    var scheduleVariableId = npcData.getScheduleConfig().currentScheduleVarId;
                    if (scheduleVariableId > 0) {
                        $gameVariables.setValue(npcData.getScheduleConfig().currentScheduleVarId, schedule.id);
                    }
                }
            }
            if (event == null) {
                return;
            }
            if (event._mapId != $gameMap.mapId()) {
                // Update the outside even
                event.update();
            }
        });
    }
}
/** @type {NpcSchedulerService} */
NpcSchedulerService.inst = null;

class Game_NpcData extends ESL.SaveableObject {
    /**
     * Game_NpcData
     */
    constructor(npcId, position, direction, mapId) {
        super();
        this._npcId = npcId;
        this._position = position;
        this._direction = direction;
        this._mapId = mapId;
        this._event = null;
    }
    /**
     * Get Info
     */
    getInfo() {
        return {
            npcId: this._npcId,
            position: this._position,
            direction: this._direction,
            mapId: this._mapId
        }
    }
    /**
     * Save Properties
     */
    saveProperties() {
        return [
            ["_npcId", this._npcId],
            ["_position", this._position],
            ["_direction", this._direction],
            ["_mapId", this._mapId],
        ]
    }
    /**
     * Get Schedule
     */
    getScheduleConfig() {
        return NpcSchedulerService.inst.getNpcSchedule(this._npcId);
    }
    /**
     * Get Event
     */
    getEvent() {
        const templateEventId = this.getScheduleConfig().templateEventId;
        if (this._event == null) {
            this._event = EventSpawner.inst.createClonedEvent(templateEventId);
            this._event.setShouldCollideWithCharacters(false);
            this._event._npcId = this._npcId;
            this._event._mapId = this._mapId;
            this._event._realX = this._position.x;
            this._event._realY = this._position.y;
            this._event._x = this._position.x;
            this._event._y = this._position.y;
        }
        return this._event;
    }
    /**
     * Transfer To
     * @param {number} mapId
     * @param {number} x
     * @param {number} y
     */
    transferTo(mapId, x, y) {
        const lastMapId = this._mapId;
        this._mapId = mapId;
        this._position.x = x;
        this._position.y = y;
        this._event._mapId = mapId;
        this._event.locate(x, y);
        if (this._mapId != $gameMap.mapId() && lastMapId == $gameMap.mapId()) {
            EventSpawner.inst.despawnEvent(this._event);
        } else if (lastMapId != $gameMap.mapId() && this._mapId == $gameMap.mapId()) {
            EventSpawner.inst.spawnExistingEvent(this._event, this._position.x, this._position.y, this._direction);
        }
    }
}

class SimpleMapConnection {
    /**
     * Constructor
     */
    constructor(sourceLocation, targetLocation, direction, secondDirection) {
        this.sourceMapId = sourceLocation.mapId;
        this.sourceX = sourceLocation.x;
        this.sourceY = sourceLocation.y;
        this.targetMapId = targetLocation.mapId;
        this.targetX = targetLocation.x;
        this.targetY = targetLocation.y;
        this.sourceDirection = direction;
        this.targetDirection = secondDirection;
    }
}

class SimplePathfindCommand {
    constructor() {
        this.isFinished = false;
    }
    /**
     * Run
     */
    run(npcEvent) {

    }
    /**
     * Update
     */
    update(npcEvent) {

    }
}

class SimpleMoveCommand extends SimplePathfindCommand {
    /**
     * Constructor
     * @param {{x: number, y: number}} targetPosition
     */
    constructor(targetPosition) {
        super();
        this.targetPosition = targetPosition;
        this._retryTimer = 0;
    }
    /**
     * Run
     * @param {Game_ClonedEvent} npcEvent
     */
    run(npcEvent) {
        let moveDir = 0;
        if (this.targetPosition.x != npcEvent.x) {
            moveDir = this.targetPosition.x > npcEvent.x ? 6 : 4;
        }
        if (this.targetPosition.y != npcEvent.y) {
            moveDir = this.targetPosition.y > npcEvent.y ? 2 : 8;
        }
        if (moveDir != 0) {
            npcEvent.moveStraight(moveDir);
        }
    }
    /**
     * Update
     */
    update(npcEvent) {
        if (npcEvent._realX == this.targetPosition.x && npcEvent._realY == this.targetPosition.y) {
            this.isFinished = true;
            var npcId = npcEvent._npcId;
            var npcData = NpcSchedulerService.inst.getNpcData(npcId);
            var event = npcData.getEvent();
            npcData._position.x = event._x;
            npcData._position.y = event._y;
            npcData._direction = event._direction;
        } else {
            this._retryTimer++;
            if (this._retryTimer > 30) {
                this.run(npcEvent);
            }
        }
    }
}

class SimpleTeleportCommand extends SimplePathfindCommand {
    /**
     * Constructor
     * @param {number} mapId
     * @param {{x: number, y: number}} targetPosition
     * @param {number} direction
     */
    constructor(mapId, targetPosition, direction) {
        super();
        this.mapId = mapId;
        this.targetPosition = targetPosition;
        this.direction = direction;
    }
    /**
     * Run
     */
    run(npcEvent) {
        var npcId = npcEvent._npcId;
        var npcData = NpcSchedulerService.inst.getNpcData(npcId);
        npcData.transferTo(this.mapId, this.targetPosition.x, this.targetPosition.y);
        this.isFinished = true;
    }
}

class SimpleTurnCommand extends SimplePathfindCommand {
    /**
     * Constructor
     * @param {number} direction
     */
    constructor(direction) {
        super();
        this.direction = direction;
    }
    /**
     * Run
     * @param {Game_ClonedEvent} npcEvent
     */
    run(npcEvent) {
        var npcId = npcEvent._npcId;
        var npcData = NpcSchedulerService.inst.getNpcData(npcId);
        npcEvent.setDirection(this.direction);
        npcData._direction = this.direction;
        this.isFinished = true;
    }
}

Game_ClonedEvent.prototype.clearCommands = function () {
    this._commandList = null;
    this._currentCommand = null;
}

Game_ClonedEvent.prototype.followCommands = function (commandList) {
    this._commandList = commandList;
    this._currentCommand = null;
}

Game_ClonedEvent.prototype.isFollowingCommands = function () {
    return this._commandList != null && this._commandList.length > 0;
}

var DSI_NpcScheduler_Game_ClonedEvent_updateStop = Game_ClonedEvent.prototype.updateStop;
Game_ClonedEvent.prototype.updateStop = function () {
    DSI_NpcScheduler_Game_ClonedEvent_updateStop.call(this);
    this.updateCommands();
}


Game_ClonedEvent.prototype.updateCommands = function () {
    if ($gameMap.isEventRunning()) {
        return;
    }
    if ($gameMessage.isBusy()) {
        return;
    }
    if (this._commandList == null || this._commandList.length == 0) {
        return;
    }

    if (this._currentCommand && !this._currentCommand.isFinished) {
        this._currentCommand.update(this);
        return;
    }
    this._currentCommand = this._commandList.shift();
    this._currentCommand.run(this);
}

var DSI_NpcScheduler_Game_Map_updateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function () {
    DSI_NpcScheduler_Game_Map_updateEvents.call(this);
    if (NpcSchedulerService.inst != null) {
        NpcSchedulerService.inst.updateEvents();
    }
}

ESL.addGameService("NpcSchedulerService", NpcSchedulerService);

// 添加全局变量引用，确保可以在控制台访问
Object.defineProperty(window, 'NpcSchedulerService', {
    get: function() {
        return $gameSystem ? $gameSystem['@Service_NpcSchedulerService'] : null;
    }
});

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