/*:
 * @target MZ
 * @plugindesc 送礼系统插件 v1.3.6 - 支持通过角色名称选择 by Seki
 *
 * @command Gift
 * @text 送礼操作
 * @desc 启动送礼流程，玩家选择物品赠送给指定角色。
 *
 * @arg characterName
 * @type string
 * @text 角色名称
 * @desc 输入角色的名称，系统会自动查找对应的角色配置。
 *
 * @command GiftById
 * @text 送礼操作(ID)
 * @desc 通过ID启动送礼流程，玩家选择物品赠送给指定角色。
 *
 * @arg characterId
 * @type number
 * @text 角色编号
 * @desc 在插件配置中定义的角色ID，用于映射好感度与偏好设定。
 *
 * @param Characters
 * @text 角色送礼配置
 * @type struct<CharacterGift>[]
 * @desc 配置所有可以接受礼物的角色信息，包括好感度变量、物品偏好与回应语。
 *
 * @param DefaultValues
 * @text 通用设置
 * @type struct<GiftDefaults>
 * @desc 配置爱/喜欢/讨厌分别增加的好感度值
 */

/*~struct~CharacterGift:
 * @param Id
 * @type number
 * @text 角色ID
 *
 * @param ActorId
 * @type actor
 * @text 游戏角色ID
 * @desc 该角色对应的游戏中角色ID，用于显示头像和名称
 *
 * @param FavorVariableId
 * @type variable
 * @text 好感度变量
 *
 * @param LoveItems
 * @type number[]
 * @text 爱的物品ID
 *
 * @param LikeItems
 * @type number[]
 * @text 喜欢的物品ID
 *
 * @param HateItems
 * @type number[]
 * @text 讨厌的物品ID
 *
 * @param MessageLove
 * @text 爱的回应
 * @default 哇，这是我最喜欢的东西了！
 *
 * @param MessageLike
 * @text 喜欢的回应
 * @default 谢谢你，我很喜欢。
 *
 * @param MessageHate
 * @text 讨厌的回应
 * @default 你确定要给我这个……？
 *
 * @param FaceName
 * @type file
 * @dir img/faces/
 * @text 头像图片
 * @desc 角色的头像图片文件名（不填则使用ActorId的角色头像）
 *
 * @param FaceIndex
 * @type number
 * @min 0
 * @max 7
 * @text 头像索引
 * @desc 头像在图片中的索引位置（0-7）
 * @default 0
 *
 * @param CharacterName
 * @type string
 * @text 角色名称
 * @desc 角色的显示名称（不填则使用ActorId的角色名称）
 */

/*~struct~GiftDefaults:
 * @param LoveValue
 * @type number
 * @default 20
 *
 * @param LikeValue
 * @type number
 * @default 10
 *
 * @param HateValue
 * @type number
 * @default -10
 */

(() => {
  const pluginName = "Seki_Gift";
  const parameters = PluginManager.parameters(pluginName);
  const characters = JSON.parse(parameters.Characters || "[]").map(e => {
    const parsed = JSON.parse(e);
    parsed.LoveItems = parsed.LoveItems ? JSON.parse(parsed.LoveItems) : [];
    parsed.LikeItems = parsed.LikeItems ? JSON.parse(parsed.LikeItems) : [];
    parsed.HateItems = parsed.HateItems ? JSON.parse(parsed.HateItems) : [];
    return parsed;
  });
  const defaults = JSON.parse(parameters.DefaultValues || "{}");

  // 通过名称查找角色
  function findCharacterByName(name) {
    // 首先尝试完全匹配
    let charData = characters.find(c => 
      c.CharacterName === name || 
      (c.ActorId && $gameActors.actor(Number(c.ActorId)) && 
       $gameActors.actor(Number(c.ActorId)).name() === name)
    );
    
    // 如果没找到，尝试部分匹配
    if (!charData) {
      charData = characters.find(c => {
        const charName = c.CharacterName || 
          (c.ActorId && $gameActors.actor(Number(c.ActorId)) ? 
           $gameActors.actor(Number(c.ActorId)).name() : "");
        return charName.includes(name) || name.includes(charName);
      });
    }
    
    return charData;
  }

  // 通过名称送礼
  PluginManager.registerCommand(pluginName, "Gift", args => {
    // 立即设置等待模式和NPC移动控制
    if ($gameMap._interpreter && $gameMap._interpreter.isRunning()) {
      $gameMap._interpreter.setWaitMode("message");
    }
    $gameSwitches.setValue(1, true); // 阻止NPC移动
    
    const charName = args.characterName;
    const charData = findCharacterByName(charName);
    
    if (!charData) {
      console.warn(`未找到名称为"${charName}"的角色配置`);
      // 显示错误消息
      $gameMessage.add(`未找到名称为"${charName}"的角色配置`);
      
      // 监听错误消息结束，然后清除控制
      const checkMessageEnd = setInterval(() => {
        if (!$gameMessage.isBusy()) {
          $gameSwitches.setValue(1, false); // 清除对话进行标志
          clearInterval(checkMessageEnd);
        }
      }, 100);
      return;
    }
    
    // 如果找到角色配置，清除之前设置的控制，让送礼菜单接管
    $gameSwitches.setValue(1, false);
    
    // 直接打开送礼菜单
    SceneManager.push(Scene_GiftItem);
    Scene_GiftItem.prepare(charData, defaults);
  });
  
  // 保留原来通过ID送礼的方法
  PluginManager.registerCommand(pluginName, "GiftById", args => {
    // 立即设置等待模式和NPC移动控制
    if ($gameMap._interpreter && $gameMap._interpreter.isRunning()) {
      $gameMap._interpreter.setWaitMode("message");
    }
    $gameSwitches.setValue(1, true); // 阻止NPC移动
    
    const charId = Number(args.characterId);
    const charData = characters.find(e => Number(e.Id) === charId);
    if (!charData) {
      console.warn("未找到角色配置：" + charId);
      // 显示错误消息
      $gameMessage.add(`未找到ID为${charId}的角色配置`);
      
      // 监听错误消息结束，然后清除控制
      const checkMessageEnd = setInterval(() => {
        if (!$gameMessage.isBusy()) {
          $gameSwitches.setValue(1, false); // 清除对话进行标志
          clearInterval(checkMessageEnd);
        }
      }, 100);
      return;
    }
    
    // 如果找到角色配置，清除之前设置的控制，让送礼菜单接管
    $gameSwitches.setValue(1, false);
    
    // 直接打开送礼菜单
    SceneManager.push(Scene_GiftItem);
    Scene_GiftItem.prepare(charData, defaults);
  });
  
  //=============================================================================
  // * 送礼场景 - 完全兼容GridItem界面
  //=============================================================================
  function Scene_GiftItem() {
    this.initialize(...arguments);
  }
  
  Scene_GiftItem.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_GiftItem.prototype.constructor = Scene_GiftItem;
  
  Scene_GiftItem._charData = null;
  Scene_GiftItem._defaults = null;
  
  Scene_GiftItem.prepare = function(charData, defaults) {
    this._charData = charData;
    this._defaults = defaults;
  };
  
  Scene_GiftItem.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };
  
  Scene_GiftItem.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createItemWindow();
    this._charData = Scene_GiftItem._charData;
    this._defaults = Scene_GiftItem._defaults;
  };
  
  // 重写helpAreaHeight方法，使其返回0以避免背景下移
  Scene_GiftItem.prototype.helpAreaHeight = function() {
    return 0;
  };
  
  // 重写onItemOk方法
  Scene_GiftItem.prototype.onItemOk = function() {
    this.processGiftItem(this.item());
  };
  
  // 获取当前选择的物品
  Scene_GiftItem.prototype.item = function() {
    return this._itemWindow.item();
  };
  
  // 重写actor方法，防止打开角色窗口
  Scene_GiftItem.prototype.actor = function() {
    return null;
  };
  
  // 重写user方法，防止打开角色窗口
  Scene_GiftItem.prototype.user = function() {
    return null;
  };
  
  // 重写物品是否可用的判断
  Scene_GiftItem.prototype.isItemEnabled = function(item) {
    return true;
  };
  
  // 重写物品窗口的创建方法
  Scene_GiftItem.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_GiftItemList(rect);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._itemWindow);
    this._itemWindow.refresh();
    this._itemWindow.select(0);
    this._itemWindow.activate();
  };
  
  // 重写物品窗口的矩形计算方法
  Scene_GiftItem.prototype.itemWindowRect = function() {
    const wx = 0;
    const wy = 0; // 从顶部开始，没有帮助窗口
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
  };
  
  // 自定义礼物物品列表窗口
  function Window_GiftItemList() {
    this.initialize(...arguments);
  }
  
  Window_GiftItemList.prototype = Object.create(Window_ItemList.prototype);
  Window_GiftItemList.prototype.constructor = Window_GiftItemList;
  
  // 重写物品是否可用的判断
  Window_GiftItemList.prototype.isEnabled = function(item) {
    return item ? true : false;
  };
  
  // 重写当前物品是否可用的判断
  Window_GiftItemList.prototype.isCurrentItemEnabled = function() {
    return this.item() ? true : false;
  };
  
  // 处理确定按钮
  Window_GiftItemList.prototype.processOk = function() {
    if (this.item()) {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callOkHandler();
    } else {
      this.playBuzzerSound();
    }
  };
  
  // 重写包含物品的判断，只显示普通物品
  Window_GiftItemList.prototype.includes = function(item) {
    // 只包含普通物品(itypeId === 1)，不包含重要物品(itypeId === 2)
    return item && 
           DataManager.isItem(item) && 
           item.itypeId === 1 && 
           $gameParty.numItems(item) > 0;
  };
  
  // 重写分类设置方法，始终显示所有物品
  Window_GiftItemList.prototype.setCategory = function(category) {
    // 不做任何事情，忽略分类
  };
  
  // 重写物品列表创建，显示所有物品
  Window_GiftItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(item => this.includes(item));
  };
  
  Scene_GiftItem.prototype.processGiftItem = function(item) {
    if (!item) return;
    
    // 立即设置等待模式和NPC移动控制
    if ($gameMap._interpreter && $gameMap._interpreter.isRunning()) {
      $gameMap._interpreter.setWaitMode("message");
    }
    $gameSwitches.setValue(1, true); // 阻止NPC移动
    
    const itemId = item.id;
    const name = item.name;
    
    const love = this._charData.LoveItems.map(Number);
    const like = this._charData.LikeItems.map(Number);
    const hate = this._charData.HateItems.map(Number);
    const favorVar = Number(this._charData.FavorVariableId);
    
    const loveVal = Number(this._defaults.LoveValue || 20);
    const likeVal = Number(this._defaults.LikeValue || 10);
    const hateVal = Number(this._defaults.HateValue || -10);
    
    const messageLove = this._charData.MessageLove || "哇，这是我最喜欢的东西了！";
    const messageLike = this._charData.MessageLike || "谢谢你，我很喜欢。";
    const messageHate = this._charData.MessageHate || "你确定要给我这个……？";
    
    // 获取角色信息
    const actorId = Number(this._charData.ActorId || 0);
    let faceName = this._charData.FaceName || "";
    let faceIndex = Number(this._charData.FaceIndex || 0);
    let characterName = this._charData.CharacterName || "";
    
    // 如果没有指定头像和名称，但指定了角色ID，则使用角色的头像和名称
    if (actorId > 0) {
      const actor = $gameActors.actor(actorId);
      if (actor) {
        if (!faceName) faceName = actor.faceName();
        if (!characterName) characterName = actor.name();
      }
    }
    
    // 如果还是没有头像，使用默认头像
    if (!faceName) {
      faceName = "Actor1";
      faceIndex = 0;
    }
    
    // 如果还是没有名称，使用默认名称
    if (!characterName) {
      characterName = "角色";
    }
    
    // 直接使用游戏消息系统显示确认对话
    $gameMessage.setFaceImage("", 0); // 不显示脸图
    $gameMessage.setBackground(0); // 0 = 普通窗口
    $gameMessage.setSpeakerName(""); // 不显示名字
    $gameMessage.add(`要送出【${name}】吗？`);
    
    // 显示选择
    $gameMessage.setChoices(["是", "否"], 0, 0);
    $gameMessage.setChoiceCallback(n => {
      // 使用延迟执行确保选择回调正常工作
      setTimeout(() => {
      if (n === 0) { // 选择"是"
        // 处理赠送礼物
        let favorChange = 0;
        let message = "";
        if (love.includes(itemId)) {
          favorChange = loveVal;
          message = messageLove;
        } else if (hate.includes(itemId)) {
          favorChange = hateVal;
          message = messageHate;
        } else {
          favorChange = likeVal;
          message = messageLike;
        }
        
        // 获取原有好感度
        const oldFavor = $gameVariables.value(favorVar);
        
        // 增加好感度
        $gameVariables.setValue(favorVar, oldFavor + favorChange);
        
        // 添加调试日志
        console.log(`送礼系统: 更新变量ID ${favorVar}, 原值 ${oldFavor}, 变化 ${favorChange}, 新值 ${oldFavor + favorChange}`);
        
        // 减少物品
        $gameParty.loseItem(item, 1);
          
          // 1. 先显示角色回应 - 有脸图和名字
          $gameMessage.clear();
          $gameMessage.setFaceImage(faceName, faceIndex);
          $gameMessage.setBackground(0); // 普通窗口
          $gameMessage.setSpeakerName(characterName);
          $gameMessage.add(message);
          
          // 2. 准备好感度变化消息
          if (favorChange !== 0) {
            let favorText = "";
            if (favorChange > 0) {
              favorText = `好感度提升了 ${favorChange} 点！\\n当前好感度：${oldFavor + favorChange}`;
            } else if (favorChange < 0) {
              favorText = `好感度下降了 ${Math.abs(favorChange)} 点！\\n当前好感度：${oldFavor + favorChange}`;
            } else {
              favorText = `好感度没有变化。\\n当前好感度：${oldFavor + favorChange}`;
            }
            
            // 使用临时存储来排队好感度消息
            $gameTemp._pendingFavorMessage = favorText;
            
            // 重写消息系统的更新方法来检查排队的消息
          const originalMessageUpdate = Window_Message.prototype.update;
            Window_Message.prototype.update = function() {
            originalMessageUpdate.call(this);
            
              // 当消息窗口关闭且有排队的好感度消息时
              if (!this.isOpen() && $gameTemp._pendingFavorMessage && !$gameMessage.isBusy()) {
                const favorMsg = $gameTemp._pendingFavorMessage;
                $gameTemp._pendingFavorMessage = null;
              
                // 显示好感度变化消息
              setTimeout(() => {
                $gameMessage.clear();
                  $gameMessage.setFaceImage("", 0); // 系统消息，无头像
                  $gameMessage.setSpeakerName(""); // 系统消息，无名字
                $gameMessage.setBackground(0);
                  $gameMessage.add(favorMsg);
                  
                  // 恢复原来的update方法
                  Window_Message.prototype.update = originalMessageUpdate;
                  
                  // 监听好感度消息结束，然后清除NPC移动控制
                  const checkMessageEnd = setInterval(() => {
                    if (!$gameMessage.isBusy()) {
                      $gameSwitches.setValue(1, false); // 清除对话进行标志
                      clearInterval(checkMessageEnd);
                    }
                  }, 100);
                }, 50);
              }
            };
                } else {
            // 如果没有好感度变化，直接监听消息结束
            const checkMessageEnd = setInterval(() => {
              if (!$gameMessage.isBusy()) {
                $gameSwitches.setValue(1, false); // 清除对话进行标志
                clearInterval(checkMessageEnd);
              }
              }, 100);
            }
      } else { // 选择"否"
        // 显示取消消息 - 系统消息，无脸图和名字
        $gameMessage.clear();
        $gameMessage.setFaceImage("", 0);
        $gameMessage.setBackground(0);
        $gameMessage.setSpeakerName("");
        $gameMessage.add("你决定不送出礼物。");
          
          // 监听取消消息结束，然后清除控制
          const checkMessageEnd = setInterval(() => {
            if (!$gameMessage.isBusy()) {
              $gameSwitches.setValue(1, false); // 清除对话进行标志
              clearInterval(checkMessageEnd);
            }
          }, 100);
        }
      }, 1);
    });
    
    // 关闭物品菜单
    this.popScene();
    
    // 确保回到地图场景
    SceneManager.goto(Scene_Map);
  };
  
})();
