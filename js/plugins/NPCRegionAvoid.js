/*:
 * @target MZ
 * @plugindesc Prevent NPCs and followers from walking into specified Region IDs during random movement (e.g., Region 1 = water)
 * @author SekiShiyo
 *
 * @param ForbiddenRegion
 * @text Forbidden Region ID
 * @type number
 * @default 1
 * @desc NPCs and followers will avoid entering this region during random movement.
 *
 * @help
 * This plugin prevents NPCs and followers from randomly moving into a
 * designated Region ID (such as water tiles for swimming).
 *
 * It overrides the random movement logic to check for the region ID
 * before moving into a tile.
 */

(() => {
    const pluginName = "NPCRegionAvoid";
    const parameters = PluginManager.parameters(pluginName);
    const forbiddenRegionId = Number(parameters["ForbiddenRegion"] || 1);
  
    const _Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
    Game_CharacterBase.prototype.canPass = function(x, y, d) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);
      if (regionId === forbiddenRegionId && (this instanceof Game_Event || this instanceof Game_Follower)) {
        return false;
      }
      return _Game_CharacterBase_canPass.call(this, x, y, d);
    };
  })();