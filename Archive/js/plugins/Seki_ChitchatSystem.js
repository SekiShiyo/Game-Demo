/*:
 * @target MZ
 * @plugindesc EVA闲聊系统 v1.0.0 by Seki
 * @author Seki
 * @help
 * 
 * EVA闲聊系统
 * ==========
 * 
 * 与时间系统和好感度系统集成的闲聊功能
 * 
 * 基本规则：
 * - 每位NPC每天最多闲聊3次
 * - 从预设台词池随机抽取内容
 * - 所有台词都有选项，好感度变化由选项决定
 * - 支持节日台词优先
 * - 自动与好感度系统的最近动态同步
 * 
 * 使用方法：
 * 1. 在插件参数中配置NPC闲聊内容
 * 2. 在事件中使用插件指令"开始闲聊"
 * 3. 系统自动处理限制、台词选择和好感度变化
 * 
 * 脚本接口：
 * - $gameSystem.canChitchatWith(actorId) // 检查是否还能闲聊
 * - $gameSystem.getChitchatCount(actorId) // 获取今日闲聊次数
 * - $gameSystem.getRemainingChats(actorId) // 获取剩余次数
 * - $gameSystem.startChitchat(actorId) // 开始闲聊
 * 
 * 兼容性：
 * - 需要 Seki_TimeSystem.js
 * - 可选集成 FavorSystem.js
 * 
 * @command startChitchat
 * @text 开始闲聊
 * @desc 与指定NPC开始闲聊
 * 
 * @arg actorId
 * @text 角色ID
 * @type number
 * @min 1
 * @desc 要闲聊的NPC角色ID
 * @default 1
 * 
 * @param chitchatActors
 * @text 闲聊角色配置
 * @type struct<ChitchatActor>[]
 * @desc 配置可闲聊的角色和台词
 * @default []
 * 
 * @param maxChatsPerDay
 * @text 每日最大闲聊次数
 * @type number
 * @min 1
 * @max 10
 * @desc 每个NPC每天最多可闲聊的次数
 * @default 3
 * 
 * @param enableHolidayPriority
 * @text 启用节日台词优先
 * @type boolean
 * @desc 是否在节日时优先使用节日台词
 * @default true
 * 
 * @param updateFavorActivity
 * @text 更新好感度系统动态
 * @type boolean
 * @desc 是否将闲聊内容同步到好感度系统的最近动态
 * @default true
 * 
 * @param chatLimitMessage
 * @text 聊天次数限制提示
 * @type string
 * @desc 当天聊天次数已满时显示的消息
 * @default 今天已经聊了很多了，明天再来吧。
 * 
 * @param noChitchatMessage
 * @text 无闲聊内容提示
 * @type string
 * @desc 角色没有配置闲聊内容时的消息
 * @default 现在没什么想聊的。
 * 
 * @param cooldownMessage
 * @text 台词冷却提示
 * @type string
 * @desc 所有台词都在冷却期内时的消息
 * @default 最近聊了很多内容，过几天再来吧。
 * 
 * @param debugMode
 * @text 调试模式
 * @type boolean
 * @desc 开启调试信息输出
 * @default false
 * 
 * @param chitchatCooldownDays
 * @text 台词冷却天数
 * @type number
 * @min 0
 * @max 30
 * @desc 同一台词聊过后多少天内不能再聊（0表示无限制）
 * @default 3
 */

/*~struct~ChitchatActor:
 * @param actorId
 * @text 角色ID
 * @type number
 * @min 1
 * @desc 角色的唯一ID
 * 
 * @param name
 * @text 角色名称
 * @type string
 * @desc 角色显示名称
 * 
 * @param faceName
 * @text 头像文件名
 * @type file
 * @dir img/faces/
 * @desc 角色头像文件（可选，留空使用默认）
 * 
 * @param faceIndex
 * @text 头像索引
 * @type number
 * @min 0
 * @max 7
 * @desc 头像在文件中的索引
 * @default 0
 * 
 * @param affectionVariableId
 * @text 好感度变量ID
 * @type variable
 * @desc 存储该角色好感度的变量ID
 * 
 * @param chatLimitMessage
 * @text 聊天次数限制提示
 * @type string
 * @desc 当天聊天次数已满时的个性化提示（留空使用全局设置）
 * 
 * @param noContentMessage
 * @text 无台词内容提示
 * @type string
 * @desc 角色没有配置任何闲聊内容时的提示（留空使用全局设置）
 * 
 * @param cooldownMessage
 * @text 台词冷却提示
 * @type string
 * @desc 所有台词都在冷却期内时的提示（留空使用默认提示）
 * 
 * @param chitchats
 * @text 闲聊台词
 * @type struct<Chitchat>[]
 * @desc 该角色的闲聊台词列表
 * @default []
 */

/*~struct~Chitchat:
 * @param text
 * @text 台词内容
 * @type multiline_string
 * @desc 闲聊台词内容，支持多行。使用\\n表示换行，支持文本控制符
 * 
 * @param tags
 * @text 台词标签
 * @type string[]
 * @desc 台词类型标签，用逗号分隔多个标签。可使用：normal(普通)、holiday(通用节日)，或时间系统中定义的任何节日名称(如christmas、new_year等)
 * @default ["normal"]
 * 
 * @param condition
 * @text 显示条件
 * @type string
 * @desc 显示该台词的条件（JavaScript脚本，留空则总是显示）。可使用affection变量表示好感度
 * 
 * @param activityText
 * @text 动态记录
 * @type string
 * @desc 同步到好感度系统的最近动态文本（留空则使用台词前50字符）
 * 
 * @param choices
 * @text 选择项列表
 * @type struct<Choice>[]
 * @desc 玩家可选择的回应选项
 * @default []
 */

/*~struct~Choice:
 * @param text
 * @text 选项文本
 * @type string
 * @desc 显示给玩家的选项文本
 * 
 * @param affection
 * @text 好感度变化
 * @type number
 * @min -10
 * @max 10
 * @desc 选择该选项后的好感度变化
 * @default 1
 * 
 * @param response
 * @text NPC回应
 * @type multiline_string
 * @desc NPC对该选择的回应文本（可选）
 */

(() => {
    'use strict';
    
    const pluginName = "Seki_ChitchatSystem";
    const parameters = PluginManager.parameters(pluginName);
    
    // 解析参数
    const chitchatActors = JSON.parse(parameters['chitchatActors'] || '[]').map(actor => {
        const parsed = JSON.parse(actor);
        parsed.chitchats = JSON.parse(parsed.chitchats || '[]').map(chitchat => {
            const parsedChitchat = JSON.parse(chitchat);
            parsedChitchat.tags = JSON.parse(parsedChitchat.tags || '["normal"]');
            
            if (parsedChitchat.choices) {
                parsedChitchat.choices = JSON.parse(parsedChitchat.choices || '[]').map(choice => {
                    return JSON.parse(choice);
                });
            } else {
                parsedChitchat.choices = [];
            }
            
            return parsedChitchat;
        });
        return parsed;
    });
    
    const maxChatsPerDay = Number(parameters['maxChatsPerDay'] || 3);
    const enableHolidayPriority = parameters['enableHolidayPriority'] === 'true';
    const updateFavorActivity = parameters['updateFavorActivity'] === 'true';
    const chatLimitMessage = String(parameters['chatLimitMessage'] || '今天已经聊了很多了，明天再来吧。');
    const noChitchatMessage = String(parameters['noChitchatMessage'] || '现在没什么想聊的。');
    const cooldownMessage = String(parameters['cooldownMessage'] || '最近聊了很多内容，过几天再来吧。');
    const debugMode = parameters['debugMode'] === 'true';
    const chitchatCooldownDays = Number(parameters['chitchatCooldownDays'] || 3);
    
    //=============================================================================
    // 闲聊管理器
    //=============================================================================
    class ChitchatManager {
        static getActorConfig(actorId) {
            return chitchatActors.find(actor => actor.actorId == actorId);
        }
        
        static getPersonalizedMessage(actorId, messageType) {
            const config = this.getActorConfig(actorId);
            if (!config) return null;
            
            switch (messageType) {
                case 'chatLimit':
                    return config.chatLimitMessage || chatLimitMessage;
                case 'noContent':
                    return config.noContentMessage || noChitchatMessage;
                case 'cooldown':
                    return config.cooldownMessage || cooldownMessage;
                default:
                    return null;
            }
        }
        
        static canChitchat(actorId) {
            const config = this.getActorConfig(actorId);
            if (!config || !config.chitchats || config.chitchats.length === 0) {
                return false;
            }
            
            const count = $gameSystem.getChitchatCount(actorId);
            return count < maxChatsPerDay;
        }
        
        static getAvailableChitchats(actorId) {
            const config = this.getActorConfig(actorId);
            if (!config || !config.chitchats) {
                return [];
            }
            
            let availableChitchats = config.chitchats;
            
            // 过滤显示条件
            availableChitchats = availableChitchats.filter(chitchat => {
                if (!chitchat.condition || chitchat.condition.trim() === '') {
                    return true;
                }
                
                try {
                    // 创建评估上下文
                    const context = {
                        actorId: actorId,
                        affection: $gameVariables.value(config.affectionVariableId) || 0,
                        $gameVariables: $gameVariables,
                        $gameSystem: $gameSystem,
                        $gameSwitches: $gameSwitches
                    };
                    
                    // 使用Function构造器安全地评估条件
                    const conditionFunc = new Function('context', `with(context) { return ${chitchat.condition}; }`);
                    return conditionFunc(context);
                } catch (e) {
                    if (debugMode) {
                        console.warn(`台词条件评估失败：${chitchat.condition}，错误：${e.message}`);
                    }
                    return true; // 出错时默认显示
                }
            });
            
            if (debugMode && config.chitchats.length !== availableChitchats.length) {
                console.log(`角色${actorId}条件过滤：${config.chitchats.length} → ${availableChitchats.length}条台词`);
            }
            
            // 过滤掉冷却期内的台词
            if (chitchatCooldownDays > 0) {
                const recentContents = $gameSystem.getRecentChitchatContents(actorId, chitchatCooldownDays);
                availableChitchats = availableChitchats.filter(chitchat => {
                    const contentHash = this.getContentHash(chitchat.text);
                    return !recentContents.includes(contentHash);
                });
                
                if (debugMode) {
                    console.log(`角色${actorId}过滤冷却期台词后剩余：${availableChitchats.length}条`);
                }
            }
            
            // 检查是否启用节日优先且今天是节日
            if (enableHolidayPriority && $gameSystem.isFestivalToday && $gameSystem.isFestivalToday()) {
                const currentFestival = $gameSystem.getCurrentFestival ? $gameSystem.getCurrentFestival() : null;
                let holidayChitchats = [];
                
                // 优先匹配具体节日台词
                if (currentFestival) {
                    holidayChitchats = availableChitchats.filter(chitchat => 
                        chitchat.tags && chitchat.tags.includes(currentFestival)
                    );
                    
                    if (debugMode && holidayChitchats.length > 0) {
                        console.log(`节日模式：为角色${actorId}找到${holidayChitchats.length}条${currentFestival}台词`);
                    }
                }
                
                // 如果没有具体节日台词，使用通用节日台词
                if (holidayChitchats.length === 0) {
                    holidayChitchats = availableChitchats.filter(chitchat => 
                        chitchat.tags && chitchat.tags.includes('holiday')
                    );
                    
                    if (debugMode && holidayChitchats.length > 0) {
                        console.log(`节日模式：为角色${actorId}找到${holidayChitchats.length}条通用节日台词`);
                    }
                }
                
                // 如果有节日台词，则使用节日台词
                if (holidayChitchats.length > 0) {
                    availableChitchats = holidayChitchats;
                }
            }
            
            if (debugMode) {
                console.log(`角色${actorId}最终可用台词数量：${availableChitchats.length}`);
            }
            
            return availableChitchats;
        }
        
        static selectRandomChitchat(actorId) {
            const config = this.getActorConfig(actorId);
            if (!config || !config.chitchats || config.chitchats.length === 0) {
                return { status: 'no_content', chitchat: null };
            }
            
            const availableChitchats = this.getAvailableChitchats(actorId);
            
            if (availableChitchats.length === 0) {
                // 检查是否是因为冷却期导致的无台词
                if (chitchatCooldownDays > 0 && config.chitchats.length > 0) {
                    return { status: 'cooldown', chitchat: null };
                } else {
                    return { status: 'no_content', chitchat: null };
                }
            }
            
            const randomIndex = Math.floor(Math.random() * availableChitchats.length);
            return { status: 'success', chitchat: availableChitchats[randomIndex] };
        }
        
        static processChitchat(actorId, chitchat, skipCountRecord = false) {
            const config = this.getActorConfig(actorId);
            if (!config) return;
            
            // 更新好感度系统的最近动态
            if (updateFavorActivity && window.FavorSystem && FavorSystem.Manager) {
                const activityText = chitchat.activityText || this.extractActivityText(chitchat.text);
                FavorSystem.Manager.setRecentActivity(config.name, activityText);
                
                if (debugMode) {
                    console.log(`更新好感度系统动态：${config.name} - ${activityText}`);
                }
            }
            
            // 记录闲聊次数
            if (!skipCountRecord) {
                const contentHash = this.getContentHash(chitchat.text);
                $gameSystem.recordChitchat(actorId, contentHash);
            }
        }
        
        static processChoice(actorId, chitchat, choiceIndex) {
            const config = this.getActorConfig(actorId);
            if (!config || !chitchat.choices || choiceIndex < 0 || choiceIndex >= chitchat.choices.length) {
                if (debugMode) {
                    console.log(`processChoice参数错误：actorId=${actorId}, choiceIndex=${choiceIndex}, choices长度=${chitchat.choices ? chitchat.choices.length : 0}`);
                }
                return false;
            }
            
            const choice = chitchat.choices[choiceIndex];
            
            if (debugMode) {
                console.log(`处理选择：角色${actorId}，选项索引${choiceIndex}，选项内容"${choice.text}"`);
            }
            
            // 获取原有好感度值
            let currentAffection = 0;
            let affectionChange = 0;
            
            if (config.affectionVariableId) {
                currentAffection = $gameVariables.value(config.affectionVariableId);
                affectionChange = Number(choice.affection) || 0;
                $gameVariables.setValue(config.affectionVariableId, currentAffection + affectionChange);
                
                if (debugMode) {
                    console.log(`选项好感度变化：角色${actorId}，选项"${choice.text}"，变量${config.affectionVariableId}，${currentAffection} + ${affectionChange} = ${currentAffection + affectionChange}`);
                }
            }
            
            // 总是显示回应和好感度变化，即使没有设置回应文本
            this.showChoiceResponse(config, choice.response || "（无回应）", currentAffection, affectionChange);
            
            return true;
        }
        
        static showChoiceResponse(config, responseText, oldAffection, affectionChange) {
            if (debugMode) {
                console.log(`显示选择回应：${responseText}，好感度变化：${affectionChange}`);
            }
            
            // 模仿送礼系统的处理方式：清除消息并重新设置
                $gameMessage.clear();
                
                // 设置角色信息
                if (config.faceName) {
                    $gameMessage.setFaceImage(config.faceName, config.faceIndex || 0);
                }
                if (config.name) {
                    $gameMessage.setSpeakerName(config.name);
                }
                $gameMessage.setBackground(0); // 普通窗口
                
            // 添加回应内容（如果有回应内容且不是默认的"（无回应）"）
            if (responseText && responseText !== "（无回应）") {
                // 添加回应内容，支持多行
                const lines = responseText.split('\\n');
                lines.forEach(line => {
                    if (line.trim()) {
                        $gameMessage.add(line.trim());
                    }
                });
            }
            
            // 准备好感度变化消息（如果有变化）
            if (affectionChange !== 0) {
                let affectionText = "";
                if (affectionChange > 0) {
                    affectionText = `好感度提升了 ${affectionChange} 点！\\n当前好感度：${oldAffection + affectionChange}`;
                } else if (affectionChange < 0) {
                    affectionText = `好感度下降了 ${Math.abs(affectionChange)} 点！\\n当前好感度：${oldAffection + affectionChange}`;
                }
                
                // 使用临时存储来排队好感度消息
                $gameTemp._pendingAffectionMessage = affectionText;
                
                // 重写消息系统的更新方法来检查排队的消息
                const originalMessageUpdate = Window_Message.prototype.update;
                Window_Message.prototype.update = function() {
                    originalMessageUpdate.call(this);
                    
                    // 当消息窗口关闭且有排队的好感度消息时
                    if (!this.isOpen() && $gameTemp._pendingAffectionMessage && !$gameMessage.isBusy()) {
                        const affectionMsg = $gameTemp._pendingAffectionMessage;
                        $gameTemp._pendingAffectionMessage = null;
                        
                        // 显示好感度变化消息
                        setTimeout(() => {
                            $gameMessage.clear();
                            $gameMessage.setFaceImage("", 0); // 系统消息，无头像
                            $gameMessage.setSpeakerName(""); // 系统消息，无名字
                            $gameMessage.setBackground(0);
                            $gameMessage.add(affectionMsg);
                            
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
                // 如果没有好感度变化，直接监听当前消息结束
                const checkMessageEnd = setInterval(() => {
                    if (!$gameMessage.isBusy()) {
                        $gameSwitches.setValue(1, false); // 清除对话进行标志
                        clearInterval(checkMessageEnd);
                    }
                }, 100);
            }
            
            if (debugMode) {
                console.log(`选择回应添加完成`);
            }
        }
        
        static getAvailableChoices(actorId, chitchat) {
            if (!chitchat.choices || chitchat.choices.length === 0) {
                return [];
            }
            
            // 直接返回所有选项，不再进行条件过滤
            return chitchat.choices;
        }
        
        static extractActivityText(fullText) {
            // 提取台词的前50个字符作为动态记录
            let cleanText = fullText.replace(/\\[nN]/g, ' ')  // 替换换行符
                                   .replace(/\\[cC]\\[\\d+\\]/g, '')  // 移除颜色代码
                                   .replace(/\\[.*?\\]/g, '')       // 移除其他控制符
                                   .trim();
            
            if (cleanText.length > 50) {
                cleanText = cleanText.substring(0, 47) + '...';
            }
            
            return cleanText;
        }
        
        static getContentHash(text) {
            // 生成台词内容的简短哈希，用于识别重复台词
            let cleanText = text.replace(/\\[nN]/g, '')  // 移除换行符
                               .replace(/\\[cC]\\[\\d+\\]/g, '')  // 移除颜色代码
                               .replace(/\\[.*?\\]/g, '')       // 移除其他控制符
                               .replace(/\s+/g, '')             // 移除所有空格
                               .trim();
            
            // 使用前30个字符作为哈希
            return cleanText.substring(0, 30);
        }
        
        // 调试方法：检查角色的台词冷却状态
        static debugChitchatCooldowns(actorId) {
            if (!debugMode) return;
            
            const config = this.getActorConfig(actorId);
            if (!config) {
                console.log(`角色${actorId}没有闲聊配置`);
                return;
            }
            
            console.log(`=== 角色${actorId}(${config.name})的台词冷却状态 ===`);
            console.log(`总台词数：${config.chitchats.length}`);
            
            const recentContents = $gameSystem.getRecentChitchatContents(actorId, chitchatCooldownDays);
            const availableChitchats = this.getAvailableChitchats(actorId);
            
            console.log(`冷却期内台词：${recentContents.length}条`);
            console.log(`可用台词：${availableChitchats.length}条`);
            
            config.chitchats.forEach((chitchat, index) => {
                const hash = this.getContentHash(chitchat.text);
                const isCooling = recentContents.includes(hash);
                const status = isCooling ? "🔒冷却中" : "✅可用";
                console.log(`  ${index + 1}. ${status} ${hash} - ${chitchat.text.substring(0, 20)}...`);
            });
            
            console.log("=====================================");
        }
        
        // 调试方法：检查角色的节日台词配置
        static debugFestivalChitchats(actorId) {
            if (!debugMode) return;
            
            const config = this.getActorConfig(actorId);
            if (!config) {
                console.log(`角色${actorId}没有闲聊配置`);
                return;
            }
            
            console.log(`=== 角色${actorId}(${config.name})的节日台词配置 ===`);
            
            // 按节日分类统计台词
            const festivalStats = {
                normal: 0,
                holiday: 0,
                christmas: 0,
                new_year: 0,
                valentine: 0,
                birthday: 0,
                spring_festival: 0,
                summer_festival: 0,
                autumn_festival: 0,
                winter_festival: 0,
                graduation: 0,
                school_festival: 0,
                special_event: 0
            };
            
            config.chitchats.forEach((chitchat, index) => {
                const tags = chitchat.tags || ['normal'];
                tags.forEach(tag => {
                    if (festivalStats.hasOwnProperty(tag)) {
                        festivalStats[tag]++;
                    }
                });
            });
            
            console.log("节日台词统计：");
            Object.entries(festivalStats).forEach(([festival, count]) => {
                if (count > 0) {
                    console.log(`  ${festival}: ${count}条`);
                }
            });
            
            // 显示当前节日状态
            if ($gameSystem.isFestivalToday && $gameSystem.isFestivalToday()) {
                const currentFestival = $gameSystem.getCurrentFestival ? $gameSystem.getCurrentFestival() : 'unknown';
                console.log(`当前是节日：${currentFestival}`);
                
                const availableHolidayChitchats = config.chitchats.filter(chitchat => 
                    chitchat.tags && (chitchat.tags.includes(currentFestival) || chitchat.tags.includes('holiday'))
                );
                console.log(`可用节日台词：${availableHolidayChitchats.length}条`);
            } else {
                console.log("当前不是节日");
            }
            
            // 显示时间系统节日配置提示
            console.log("💡 提示：节日需要在Seki_TimeSystem插件中配置");
            console.log("   节日名称必须与台词标签完全匹配");
            
            console.log("=====================================");
        }
        
        // 获取所有支持的节日标签
        static getSupportedFestivals() {
            return [
                'normal', 'holiday', 'christmas', 'new_year', 'valentine', 
                'birthday', 'spring_festival', 'summer_festival', 'autumn_festival', 
                'winter_festival', 'graduation', 'school_festival', 'special_event'
            ];
        }
        
        // 获取时间系统中配置的节日列表
        static getTimeSystemFestivals() {
            // 尝试从时间系统获取节日配置
            if ($gameSystem && $gameSystem._gameTime && window.PluginManager) {
                try {
                    const timeSystemParams = PluginManager.parameters("Seki_TimeSystem");
                    if (timeSystemParams && timeSystemParams.festivals) {
                        const festivals = JSON.parse(timeSystemParams.festivals || '[]').map(festival => JSON.parse(festival));
                        return festivals.map(f => f.name).filter(name => name && name.trim());
                    }
                } catch (e) {
                    if (debugMode) {
                        console.warn("无法读取时间系统节日配置:", e.message);
                    }
                }
            }
            return [];
        }
        
        // 获取所有可用的节日标签（包括预设的和时间系统中的）
        static getAllAvailableFestivals() {
            const defaultFestivals = [
                'normal', 'holiday', 'christmas', 'new_year', 'valentine', 
                'birthday', 'spring_festival', 'summer_festival', 'autumn_festival', 
                'winter_festival', 'graduation', 'school_festival', 'special_event'
            ];
            const timeSystemFestivals = this.getTimeSystemFestivals();
            
            // 合并并去重
            const allFestivals = [...new Set([...defaultFestivals, ...timeSystemFestivals])];
            return allFestivals;
        }
        
        // 调试方法：查看角色的个性化提示配置
        static debugActorMessages(actorId) {
            if (!debugMode) return;
            
            const config = this.getActorConfig(actorId);
            if (!config) {
                console.log(`角色${actorId}没有闲聊配置`);
                return;
            }
            
            console.log(`=== 角色${actorId}(${config.name})的提示消息配置 ===`);
            
            console.log("聊天限制提示:");
            console.log(`  个性化: ${config.chatLimitMessage || '(未设置)'}`);
            console.log(`  实际使用: ${this.getPersonalizedMessage(actorId, 'chatLimit')}`);
            
            console.log("无内容提示:");
            console.log(`  个性化: ${config.noContentMessage || '(未设置)'}`);
            console.log(`  实际使用: ${this.getPersonalizedMessage(actorId, 'noContent')}`);
            
            console.log("冷却期提示:");
            console.log(`  个性化: ${config.cooldownMessage || '(未设置)'}`);
            console.log(`  实际使用: ${this.getPersonalizedMessage(actorId, 'cooldown')}`);
            
            console.log("=====================================");
        }
        
        // 调试方法：查看角色的台词条件配置
        static debugChitchatConditions(actorId) {
            if (!debugMode) return;
            
            const config = this.getActorConfig(actorId);
            if (!config) {
                console.log(`角色${actorId}没有闲聊配置`);
                return;
            }
            
            console.log(`=== 角色${actorId}(${config.name})的台词条件配置 ===`);
            console.log(`总台词数：${config.chitchats.length}`);
            
            const currentAffection = $gameVariables.value(config.affectionVariableId) || 0;
            console.log(`当前好感度：${currentAffection}`);
            
            config.chitchats.forEach((chitchat, index) => {
                const preview = chitchat.text.substring(0, 30).replace(/\\n/g, ' ') + '...';
                
                if (!chitchat.condition || chitchat.condition.trim() === '') {
                    console.log(`  ${index + 1}. ✅ 无条件 - ${preview}`);
                } else {
                    try {
                        const context = {
                            actorId: actorId,
                            affection: currentAffection,
                            $gameVariables: $gameVariables,
                            $gameSystem: $gameSystem,
                            $gameSwitches: $gameSwitches
                        };
                        
                        const conditionFunc = new Function('context', `with(context) { return ${chitchat.condition}; }`);
                        const result = conditionFunc(context);
                        const status = result ? "✅ 满足" : "❌ 不满足";
                        
                        console.log(`  ${index + 1}. ${status} [${chitchat.condition}] - ${preview}`);
                    } catch (e) {
                        console.log(`  ${index + 1}. ⚠️ 错误 [${chitchat.condition}] - ${preview}`);
                    }
                }
            });
            
            const availableCount = this.getAvailableChitchats(actorId).length;
            console.log(`当前可用台词：${availableCount}条`);
            console.log("=====================================");
        }
    }
    
    //=============================================================================
    // Game_System 扩展
    //=============================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.initializeChitchatSystem();
    };
    
    Game_System.prototype.initializeChitchatSystem = function() {
        this._chitchatHistory = this._chitchatHistory || {};
    };
    
    Game_System.prototype.getCurrentDateKey = function() {
        // 依赖时间系统提供当前日期
        if (this.getCurrentDate) {
            return this.getCurrentDate();
        }
        // 如果没有时间系统，使用默认日期
        return "L.C.0001-M1-D1";
    };
    
    Game_System.prototype.getChitchatCount = function(actorId) {
        if (!this._chitchatHistory) {
            this.initializeChitchatSystem();
        }
        
        const dateKey = this.getCurrentDateKey();
        const todayData = this._chitchatHistory[dateKey] || {};
        const actorData = todayData[actorId] || {};
        
        // 计算所有台词的总次数
        let totalCount = 0;
        for (const contentHash in actorData) {
            totalCount += actorData[contentHash] || 0;
        }
        
        return totalCount;
    };
    
    Game_System.prototype.getRemainingChats = function(actorId) {
        const used = this.getChitchatCount(actorId);
        return Math.max(0, maxChatsPerDay - used);
    };
    
    Game_System.prototype.getRecentChitchatContents = function(actorId, days) {
        if (!this._chitchatHistory || days <= 0) {
            return [];
        }
        
        const recentContents = [];
        const currentDate = this.getCurrentDateKey();
        
        // 获取日期计算函数（依赖时间系统）
        const getDateDaysAgo = (daysAgo) => {
            if (this.getDateDaysAgo) {
                return this.getDateDaysAgo(daysAgo);
            } else {
                // 简单的日期回退逻辑（如果没有时间系统）
                const match = currentDate.match(/L\.C\.(\d+)-M(\d+)-D(\d+)/);
                if (match) {
                    let year = parseInt(match[1]);
                    let month = parseInt(match[2]);
                    let day = parseInt(match[3]) - daysAgo;
                    
                    while (day <= 0) {
                        month--;
                        if (month <= 0) {
                            month = 12;
                            year--;
                        }
                        day += 30; // 简化为每月30天
                    }
                    
                    return `L.C.${year.toString().padStart(4, '0')}-M${month}-D${day}`;
                }
                return currentDate;
            }
        };
        
        // 收集最近几天的台词内容
        for (let i = 0; i < days; i++) {
            const checkDate = getDateDaysAgo(i);
            const dayData = this._chitchatHistory[checkDate];
            
            if (dayData && dayData[actorId]) {
                const actorData = dayData[actorId];
                for (const contentHash in actorData) {
                    if (actorData[contentHash] > 0 && !recentContents.includes(contentHash)) {
                        recentContents.push(contentHash);
                    }
                }
            }
        }
        
        if (debugMode && recentContents.length > 0) {
            console.log(`角色${actorId}最近${days}天内聊过的台词：`, recentContents);
        }
        
        return recentContents;
    };
    
    Game_System.prototype.recordChitchat = function(actorId, contentHash) {
        if (!this._chitchatHistory) {
            this.initializeChitchatSystem();
        }
        
        const dateKey = this.getCurrentDateKey();
        
        if (!this._chitchatHistory[dateKey]) {
            this._chitchatHistory[dateKey] = {};
        }
        
        if (!this._chitchatHistory[dateKey][actorId]) {
            this._chitchatHistory[dateKey][actorId] = {};
        }
        
        if (!this._chitchatHistory[dateKey][actorId][contentHash]) {
            this._chitchatHistory[dateKey][actorId][contentHash] = 0;
        }
        
        this._chitchatHistory[dateKey][actorId][contentHash] += 1;
        
        if (debugMode) {
            console.log(`记录闲聊：${dateKey} - 角色${actorId} - 内容${contentHash} - 第${this._chitchatHistory[dateKey][actorId][contentHash]}次`);
        }
    };
    
    Game_System.prototype.canChitchatWith = function(actorId) {
        return ChitchatManager.canChitchat(actorId);
    };
    
    Game_System.prototype.startChitchat = function(actorId) {
        const config = ChitchatManager.getActorConfig(actorId);
        
        if (!config) {
            if (debugMode) {
                console.log(`错误：找不到角色${actorId}的闲聊配置`);
            }
            // 如果没有配置，使用全局默认提示
            $gameMessage.add(noChitchatMessage);
            return false;
        }
        
        // 立即设置等待模式和NPC移动控制
        if ($gameMap._interpreter && $gameMap._interpreter.isRunning()) {
            $gameMap._interpreter.setWaitMode("message");
        }
        $gameSwitches.setValue(1, true); // 阻止NPC移动
        
        // 检查是否还能聊天
        if (!this.canChitchatWith(actorId)) {
            $gameMessage.add(ChitchatManager.getPersonalizedMessage(actorId, 'chatLimit'));
            
            // 监听消息结束，然后清除控制
            const checkEnd = setInterval(() => {
                if (!$gameMessage.isBusy()) {
                    $gameSwitches.setValue(1, false);
                    clearInterval(checkEnd);
                }
            }, 100);
            return false;
        }
        
        // 选择台词
        const chitchatResult = ChitchatManager.selectRandomChitchat(actorId);
        
        if (chitchatResult.status === 'no_content') {
            $gameMessage.add(ChitchatManager.getPersonalizedMessage(actorId, 'noContent'));
            
            // 监听消息结束，然后清除控制
            const checkEnd = setInterval(() => {
                if (!$gameMessage.isBusy()) {
                    $gameSwitches.setValue(1, false);
                    clearInterval(checkEnd);
                }
            }, 100);
            return false;
        } else if (chitchatResult.status === 'cooldown') {
            $gameMessage.add(ChitchatManager.getPersonalizedMessage(actorId, 'cooldown'));
            
            // 监听消息结束，然后清除控制
            const checkEnd = setInterval(() => {
                if (!$gameMessage.isBusy()) {
                    $gameSwitches.setValue(1, false);
                    clearInterval(checkEnd);
                }
            }, 100);
            return false;
        }
        
        const chitchat = chitchatResult.chitchat;
        
        // 设置说话者信息
        if (config.faceName) {
            $gameMessage.setFaceImage(config.faceName, config.faceIndex || 0);
        }
        
        if (config.name) {
            $gameMessage.setSpeakerName(config.name);
        }
        
        // 处理文本，支持多行
        const lines = chitchat.text.split('\\n');
        lines.forEach(line => {
            if (line.trim()) {
                $gameMessage.add(line.trim());
            }
        });
        
        // 处理选项（每个台词都有选项）
        const availableChoices = ChitchatManager.getAvailableChoices(actorId, chitchat);
        
        if (availableChoices.length > 0) {
            // 先处理基础信息（记录次数和动态）
            ChitchatManager.processChitchat(actorId, chitchat);
            
            // 建立选项索引映射
            const choiceIndexMap = [];
            const choiceTexts = [];
            
            availableChoices.forEach((choice, index) => {
                choiceTexts.push(choice.text);
                // 找到该选项在原始choices数组中的索引
                const originalIndex = chitchat.choices.indexOf(choice);
                choiceIndexMap.push(originalIndex);
            });
            
            // 显示选项
            $gameMessage.setChoices(choiceTexts, 0, -1);
            $gameMessage.setChoiceCallback(function(responseIndex) {
                // 使用延迟执行确保选择回调正常工作
                setTimeout(() => {
                    if (responseIndex >= 0 && responseIndex < choiceIndexMap.length) {
                        const originalChoiceIndex = choiceIndexMap[responseIndex];
                        ChitchatManager.processChoice(actorId, chitchat, originalChoiceIndex);
                }
                }, 1);
            });
            
            if (debugMode) {
                console.log(`显示${availableChoices.length}个选项给角色${actorId}`);
                console.log(`选项索引映射：`, choiceIndexMap);
            }
        } else {
            // 如果没有可用选项，显示错误提示
            if (debugMode) {
                console.warn(`角色${actorId}的台词没有可用选项！`);
            }
            ChitchatManager.processChitchat(actorId, chitchat);
            
            // 监听消息结束，然后清除控制
            const checkEnd = setInterval(() => {
                if (!$gameMessage.isBusy()) {
                    $gameSwitches.setValue(1, false);
                    clearInterval(checkEnd);
                }
            }, 100);
        }
        
        if (debugMode) {
            const remaining = this.getRemainingChats(actorId);
            console.log(`闲聊完成：角色${actorId}，剩余次数${remaining}`);
        }
        
        return true;
    };
    
    //=============================================================================
    // 清理过期的闲聊记录（可选优化）
    //=============================================================================
    Game_System.prototype.cleanupOldChitchatHistory = function() {
        if (!this._chitchatHistory) return;
        
        const currentDate = this.getCurrentDateKey();
        const historyKeys = Object.keys(this._chitchatHistory);
        
        // 只保留最近7天的记录
        if (historyKeys.length > 7) {
            historyKeys.sort();
            const toDelete = historyKeys.slice(0, -7);
            
            toDelete.forEach(key => {
                delete this._chitchatHistory[key];
            });
            
            if (debugMode) {
                console.log(`清理了${toDelete.length}天的闲聊历史记录`);
            }
        }
    };
    
    //=============================================================================
    // 插件指令
    //=============================================================================
    PluginManager.registerCommand(pluginName, "startChitchat", args => {
        // 立即设置等待模式和NPC移动控制
        if ($gameMap._interpreter && $gameMap._interpreter.isRunning()) {
            $gameMap._interpreter.setWaitMode("message");
        }
        $gameSwitches.setValue(1, true); // 阻止NPC移动
        
        const actorId = parseInt(args.actorId);
        
        if (!actorId || actorId <= 0) {
            if (debugMode) {
                console.log("错误：无效的角色ID");
            }
            // 显示错误消息
            $gameMessage.add("错误：无效的角色ID");
            
            // 监听错误消息结束，然后清除控制
            const checkMessageEnd = setInterval(() => {
                if (!$gameMessage.isBusy()) {
                    $gameSwitches.setValue(1, false); // 清除对话进行标志
                    clearInterval(checkMessageEnd);
                }
            }, 100);
            return;
        }
        
        // 如果角色ID有效，清除之前设置的控制，让startChitchat方法接管
        $gameSwitches.setValue(1, false);
        
        $gameSystem.startChitchat(actorId);
    });
    
    //=============================================================================
    // 场景更新时清理历史记录
    //=============================================================================
    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_onMapLoaded.call(this);
        
        // 偶尔清理一次历史记录
        if (Math.random() < 0.1) {
            $gameSystem.cleanupOldChitchatHistory();
        }
    };
    
    //=============================================================================
    // 兼容性检查
    //=============================================================================
    if (debugMode) {
        // 启动时检查依赖
        setTimeout(() => {
            console.log("=== 闲聊系统兼容性检查 ===");
            
            // 检查时间系统
            if ($gameSystem && $gameSystem.getCurrentDate) {
                console.log("✓ 时间系统已加载");
                if ($gameSystem.isFestivalToday) {
                    console.log("✓ 节日检测功能可用");
                    
                    // 检查当前节日状态
                    if ($gameSystem.isFestivalToday()) {
                        const currentFestival = $gameSystem.getCurrentFestival ? $gameSystem.getCurrentFestival() : 'unknown';
                        console.log(`  当前节日：${currentFestival}`);
                    } else {
                        console.log("  当前不是节日");
                    }
                    
                    // 显示支持的节日类型
                    console.log("  闲聊系统支持的节日标签：", ChitchatManager.getSupportedFestivals().join(', '));
                    console.log("  ⚠ 注意：具体节日需要在时间系统中配置，节日名称必须与台词标签匹配");
                } else {
                    console.log("⚠ 节日检测功能不可用");
                }
            } else {
                console.log("⚠ 时间系统未加载，使用默认日期");
            }
            
            // 显示时间系统中配置的节日
            const timeSystemFestivals = ChitchatManager.getTimeSystemFestivals();
            if (timeSystemFestivals.length > 0) {
                console.log("📅 时间系统中已配置的节日：", timeSystemFestivals.join(', '));
                console.log("💡 您可以在闲聊台词标签中使用这些节日名称");
            } else {
                console.log("📅 时间系统中暂未配置节日");
                console.log("💡 在时间系统的festivals参数中添加节日，然后在闲聊台词标签中使用对应名称");
            }
            
            // 显示所有可用标签
            const allAvailable = ChitchatManager.getAllAvailableFestivals();
            console.log("🏷️ 所有可用的台词标签：", allAvailable.join(', '));
            
            // 检查好感度系统
            if (window.FavorSystem && window.FavorSystem.Manager) {
                console.log("✓ 好感度系统已加载，支持动态更新");
            } else {
                console.log("⚠ 好感度系统未加载，不支持动态更新");
            }
            
            console.log(`已配置${chitchatActors.length}个闲聊角色`);
            console.log(`每日最大闲聊次数：${maxChatsPerDay}`);
            console.log(`台词冷却天数：${chitchatCooldownDays}天`);
            console.log("节日台词优先：", enableHolidayPriority ? "开启" : "关闭");
            console.log("💬 简化模式：所有台词都有选项，好感度变化由选项处理");
            console.log("🔧 个性化提示：每个角色可配置独立的聊天限制、无内容和冷却期提示");
            console.log("🎯 台词条件：支持基于好感度、变量、开关的台词显示条件");
            console.log("🐛 调试命令：debugActorMessages(角色ID) 查看角色提示配置");
            console.log("🐛 调试命令：debugChitchatConditions(角色ID) 查看台词条件状态");
            console.log("========================");
        }, 1000);
    }
    
    // 暴露 ChitchatManager 到全局作用域，方便调试和测试
    window.ChitchatManager = ChitchatManager;
    
    // 暴露调试函数
    window.debugChitchatCooldowns = (actorId) => ChitchatManager.debugChitchatCooldowns(actorId);
    window.debugFestivalChitchats = (actorId) => ChitchatManager.debugFestivalChitchats(actorId);
    window.debugActorMessages = (actorId) => ChitchatManager.debugActorMessages(actorId);
    window.debugChitchatConditions = (actorId) => ChitchatManager.debugChitchatConditions(actorId);
    window.getSupportedFestivals = () => ChitchatManager.getSupportedFestivals();
    window.getTimeSystemFestivals = () => ChitchatManager.getTimeSystemFestivals();
    window.getAllAvailableFestivals = () => ChitchatManager.getAllAvailableFestivals();
    
    //=============================================================================
    // 自动NPC移动控制 - 无需手动配置
    //=============================================================================
    
    // 重写Game_Event的更新方法，自动阻止对话期间的移动
    const _Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function() {
        // 如果1号开关为ON（对话进行中），阻止自主移动
        if ($gameSwitches.value(1)) {
            return; // 直接返回，不执行移动
        }
        
        // 否则正常执行移动
        _Game_Event_updateSelfMovement.call(this);
    };
    
    // 重写Game_Character的canMove方法，进一步确保对话期间不移动
    const _Game_Character_canMove = Game_Character.prototype.canMove;
    Game_Character.prototype.canMove = function() {
        // 如果1号开关为ON且这是一个事件（NPC），阻止移动
        if ($gameSwitches.value(1) && this instanceof Game_Event) {
            return false;
        }
        
        // 否则使用原来的判断逻辑
        return _Game_Character_canMove.call(this);
    };
    
    //=============================================================================
    // NPC移动控制说明（已自动配置，无需手动设置）
    //=============================================================================
    /*
     * ✅ 自动配置完成！
     * 
     * 现在所有NPC都会在送礼/闲聊期间自动停止移动，
     * 无需手动配置每个NPC事件的移动路线。
     * 
     * 工作原理：
     * - 对话开始时：自动设置1号开关为ON，所有NPC停止移动
     * - 对话结束后：自动设置1号开关为OFF，所有NPC恢复移动
     * 
     * 注意：这只影响NPC事件的自主移动，不影响玩家控制的角色移动。
     */
    
})();