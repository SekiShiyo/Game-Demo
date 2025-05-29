/*:
 * @target MZ
 * @plugindesc 网格式物品栏界面
 * @author Claude
 * @help
 * 
 * 这个插件将物品栏转换为网格式布局，类似桌面图标的排列方式。
 * 物品图标显示在网格布局中，选择物品后可以显示详细信息。
 * 
 * 使用方法：
 * 1. 安装插件
 * 2. 在插件参数中调整网格布局、图标大小等设置
 * 3. 物品图标使用游戏内置的图标设置
 * 
 * @param layoutSettings
 * @text 布局设置
 * 
 * @param useGrid
 * @text 使用网格布局
 * @parent layoutSettings
 * @type boolean
 * @desc 是否使用网格布局自动排列物品图标
 * @default true
 * 
 * @param columns
 * @text 每行图标数
 * @parent layoutSettings
 * @type number
 * @min 1
 * @max 10
 * @desc 网格布局的列数
 * @default 4
 * 
 * @param rows
 * @text 显示行数
 * @parent layoutSettings
 * @type number
 * @min 1
 * @max 20
 * @desc 一次显示的最大行数（超出部分需要滚动）
 * @default 4
 * 
 * @param rowSpacing
 * @text 行间距
 * @parent layoutSettings
 * @type number
 * @min 50
 * @max 300
 * @desc 网格行之间的间距
 * @default 80
 * 
 * @param columnSpacing
 * @text 列间距
 * @parent layoutSettings
 * @type number
 * @min 50
 * @max 300
 * @desc 网格列之间的间距
 * @default 80
 * 
 * @param startX
 * @text 起始X坐标
 * @parent layoutSettings
 * @type number
 * @min 0
 * @max 1000
 * @desc 网格的起始X坐标
 * @default 50
 * 
 * @param startY
 * @text 起始Y坐标
 * @parent layoutSettings
 * @type number
 * @min 0
 * @max 1000
 * @desc 网格的起始Y坐标
 * @default 50
 * 
 * @param windowOpacity
 * @text 窗口透明度
 * @parent layoutSettings
 * @type number
 * @min 0
 * @max 255
 * @desc 物品窗口的透明度
 * @default 0
 * 
 * @param backgroundImage
 * @text 背景图片
 * @parent layoutSettings
 * @type file
 * @dir img/pictures
 * @desc 整个物品菜单的背景图片
 * @default 
 * 
 * @param backgroundX
 * @text 背景图片X位置
 * @parent layoutSettings
 * @type number
 * @min -1000
 * @max 2000
 * @desc 背景图片的X坐标
 * @default 0
 * 
 * @param backgroundY
 * @text 背景图片Y位置
 * @parent layoutSettings
 * @type number
 * @min -1000
 * @max 2000
 * @desc 背景图片的Y坐标
 * @default 0
 * 
 * @param backgroundScaleX
 * @text 背景图片X缩放
 * @parent layoutSettings
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 5.0
 * @desc 背景图片的X轴缩放比例
 * @default 1.00
 * 
 * @param backgroundScaleY
 * @text 背景图片Y缩放
 * @parent layoutSettings
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 5.0
 * @desc 背景图片的Y轴缩放比例
 * @default 1.00
 * 
 * @param windowSettings
 * @text 窗口设置
 * 
 * @param itemWindowWidth
 * @text 物品窗口宽度
 * @parent windowSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品窗口的宽度
 * @default 800
 * 
 * @param itemWindowHeight
 * @text 物品窗口高度
 * @parent windowSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品窗口的高度
 * @default 600
 * 
 * @param iconSettings
 * @text 图标设置
 * 
 * @param iconWidth
 * @text 图标宽度
 * @parent iconSettings
 * @type number
 * @min 20
 * @max 300
 * @desc 图标的默认宽度
 * @default 48
 * 
 * @param iconHeight
 * @text 图标高度
 * @parent iconSettings
 * @type number
 * @min 20
 * @max 300
 * @desc 图标的默认高度
 * @default 48
 * 
 * @param selectionColor
 * @text 选中效果颜色
 * @parent iconSettings
 * @type text
 * @desc 选中图标时的高亮颜色(CSS格式，如#ffcc00)
 * @default #ffcc00
 * 
 * @param detailSettings
 * @text 详情设置
 * 
 * @param detailX
 * @text 详情窗口X位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 详情窗口的X坐标
 * @default 400
 * 
 * @param detailY
 * @text 详情窗口Y位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 详情窗口的Y坐标
 * @default 150
 * 
 * @param detailWidth
 * @text 详情窗口宽度
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 详情窗口的宽度
 * @default 400
 * 
 * @param detailHeight
 * @text 详情窗口高度
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 详情窗口的高度
 * @default 300
 * 
 * @param nameX
 * @text 物品名称X位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品名称在详情窗口中的X坐标
 * @default 100
 * 
 * @param nameY
 * @text 物品名称Y位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品名称在详情窗口中的Y坐标
 * @default 30
 * 
 * @param countX
 * @text 物品数量X位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品数量在详情窗口中的X坐标
 * @default 300
 * 
 * @param countY
 * @text 物品数量Y位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品数量在详情窗口中的Y坐标
 * @default 30
 * 
 * @param countFontSize
 * @text 数量字体大小
 * @parent detailSettings
 * @type number
 * @min 10
 * @max 72
 * @desc 物品数量的字体大小
 * @default 20
 * 
 * @param countColor
 * @text 数量字体颜色
 * @parent detailSettings
 * @type text
 * @desc 物品数量的字体颜色(CSS格式，如#ffffff)
 * @default #ffffff
 * 
 * @param countPrefix
 * @text 数量前缀文本
 * @parent detailSettings
 * @type text
 * @desc 物品数量前显示的文本
 * @default 数量: 
 * 
 * @param iconX
 * @text 物品图标X位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品图标在详情窗口中的X坐标
 * @default 30
 * 
 * @param iconY
 * @text 物品图标Y位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品图标在详情窗口中的Y坐标
 * @default 30
 * 
 * @param descX
 * @text 物品描述X位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品描述在详情窗口中的X坐标
 * @default 30
 * 
 * @param descY
 * @text 物品描述Y位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品描述在详情窗口中的Y坐标
 * @default 80
 * 
 * @param nameFontSize
 * @text 名称字体大小
 * @parent detailSettings
 * @type number
 * @min 10
 * @max 72
 * @desc 物品名称的字体大小
 * @default 24
 * 
 * @param nameColor
 * @text 名称字体颜色
 * @parent detailSettings
 * @type text
 * @desc 物品名称的字体颜色(CSS格式，如#ffffff)
 * @default #ffffff
 * 
 * @param descFontSize
 * @text 描述字体大小
 * @parent detailSettings
 * @type number
 * @min 10
 * @max 72
 * @desc 物品描述的字体大小
 * @default 18
 * 
 * @param descColor
 * @text 描述字体颜色
 * @parent detailSettings
 * @type text
 * @desc 物品描述的字体颜色(CSS格式，如#ffffff)
 * @default #e0e0e0
 * 
 * @param goldSettings
 * @text 金币设置
 * 
 * @param showGold
 * @text 显示金币
 * @parent goldSettings
 * @type boolean
 * @desc 是否显示金币
 * @default true
 * 
 * @param goldInDetail
 * @text 金币显示在详情窗口
 * @parent goldSettings
 * @type boolean
 * @desc 是否将金币显示在详情窗口内（false则作为独立元素）
 * @default false
 * 
 * @param goldX
 * @text 金币X位置
 * @parent goldSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 金币的X坐标
 * @default 30
 * 
 * @param goldY
 * @text 金币Y位置
 * @parent goldSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 金币的Y坐标
 * @default 250
 * 
 * @param goldFontSize
 * @text 金币字体大小
 * @parent goldSettings
 * @type number
 * @min 10
 * @max 72
 * @desc 金币文本的字体大小
 * @default 20
 * 
 * @param goldColor
 * @text 金币字体颜色
 * @parent goldSettings
 * @type text
 * @desc 金币文本的字体颜色(CSS格式，如#ffffff)
 * @default #ffcc00
 * 
 * @param goldIcon
 * @text 金币图标索引
 * @parent goldSettings
 * @type number
 * @min 0
 * @max 1000
 * @desc 金币图标的索引（0代表不使用图标）
 * @default 314
 * 
 * @param totalSettings
 * @text 总数设置
 * @parent detailSettings
 * 
 * @param showTotal
 * @text 显示物品总数
 * @parent totalSettings
 * @type boolean
 * @desc 是否显示物品总数
 * @default true
 * 
 * @param totalX
 * @text 总数X位置
 * @parent totalSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品总数在详情窗口中的X坐标
 * @default 300
 * 
 * @param totalY
 * @text 总数Y位置
 * @parent totalSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 物品总数在详情窗口中的Y坐标
 * @default 250
 * 
 * @param totalFontSize
 * @text 总数字体大小
 * @parent totalSettings
 * @type number
 * @min 10
 * @max 72
 * @desc 物品总数的字体大小
 * @default 20
 * 
 * @param totalColor
 * @text 总数字体颜色
 * @parent totalSettings
 * @type text
 * @desc 物品总数的字体颜色(CSS格式，如#ffffff)
 * @default #ffffff
 * 
 * @param totalText
 * @text 总数文本前缀
 * @parent totalSettings
 * @type text
 * @desc 总数前显示的文本
 * @default 物品: 
 * 
 * @param categorySettings
 * @text 类别设置
 * 
 * @param categoryX
 * @text 类别窗口X位置
 * @parent categorySettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 类别窗口的X坐标
 * @default 0
 * 
 * @param categoryY
 * @text 类别窗口Y位置
 * @parent categorySettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 类别窗口的Y坐标
 * @default 0
 * 
 * @param categoryWidth
 * @text 类别窗口宽度
 * @parent categorySettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 类别窗口的宽度
 * @default 800
 * 
 * @param categoryHeight
 * @text 类别窗口高度
 * @parent categorySettings
 * @type number
 * @min 0
 * @max 2000
 * @desc 类别窗口的高度
 * @default 60
 * 
 * @param debugMode
 * @text 调试模式
 * @type boolean
 * @desc 开启调试模式，显示更多信息
 * @default false
 */

(function() {
    'use strict';
    
    // 插件兼容性标记
    var Imported = Imported || {};
    Imported.GridItem = true;
    
    // 获取插件参数
    const pluginName = "GridItem";
    const parameters = PluginManager.parameters(pluginName);
    
    // 布局设置
    const useGrid = parameters['useGrid'] === 'true';
    const columns = Number(parameters['columns'] || 4);
    const rows = Number(parameters['rows'] || 4);
    const rowSpacing = Number(parameters['rowSpacing'] || 80);
    const columnSpacing = Number(parameters['columnSpacing'] || 80);
    const startX = Number(parameters['startX'] || 50);
    const startY = Number(parameters['startY'] || 50);
    const windowOpacity = Number(parameters['windowOpacity'] || 0);
    const backgroundImage = String(parameters['backgroundImage'] || '');
    const backgroundX = Number(parameters['backgroundX'] || 0);
    const backgroundY = Number(parameters['backgroundY'] || 0);
    const backgroundScaleX = Number(parameters['backgroundScaleX'] || 1.00);
    const backgroundScaleY = Number(parameters['backgroundScaleY'] || 1.00);
    
    // 窗口设置
    const itemWindowWidth = Number(parameters['itemWindowWidth'] || 800);
    const itemWindowHeight = Number(parameters['itemWindowHeight'] || 600);
    
    // 图标设置
    const iconWidth = Number(parameters['iconWidth'] || 48);
    const iconHeight = Number(parameters['iconHeight'] || 48);
    const selectionColor = String(parameters['selectionColor'] || '#ffcc00');
    
    // 详情设置
    const detailX = Number(parameters['detailX'] || 400);
    const detailY = Number(parameters['detailY'] || 150);
    const detailWidth = Number(parameters['detailWidth'] || 400);
    const detailHeight = Number(parameters['detailHeight'] || 300);
    const nameX = Number(parameters['nameX'] || 100);
    const nameY = Number(parameters['nameY'] || 30);
    const countX = Number(parameters['countX'] || 300);
    const countY = Number(parameters['countY'] || 30);
    const countFontSize = Number(parameters['countFontSize'] || 20);
    const countColor = String(parameters['countColor'] || '#ffffff');
    const countPrefix = String(parameters['countPrefix'] || '数量: ');
    const iconX = Number(parameters['iconX'] || 30);
    const iconY = Number(parameters['iconY'] || 30);
    const descX = Number(parameters['descX'] || 30);
    const descY = Number(parameters['descY'] || 80);
    const nameFontSize = Number(parameters['nameFontSize'] || 24);
    const nameColor = String(parameters['nameColor'] || '#ffffff');
    const descFontSize = Number(parameters['descFontSize'] || 18);
    const descColor = String(parameters['descColor'] || '#e0e0e0');
    
    // 金币设置
    const showGold = parameters['showGold'] === 'true';
    const goldInDetail = parameters['goldInDetail'] === 'true';
    const goldX = Number(parameters['goldX'] || 30);
    const goldY = Number(parameters['goldY'] || 250);
    const goldFontSize = Number(parameters['goldFontSize'] || 20);
    const goldColor = String(parameters['goldColor'] || '#ffcc00');
    const goldIcon = Number(parameters['goldIcon'] || 314);
    
    // 总数设置
    const showTotal = parameters['showTotal'] === 'true';
    const totalX = Number(parameters['totalX'] || 300);
    const totalY = Number(parameters['totalY'] || 250);
    const totalFontSize = Number(parameters['totalFontSize'] || 20);
    const totalColor = String(parameters['totalColor'] || '#ffffff');
    const totalText = String(parameters['totalText'] || '物品: ');
    
    // 类别设置
    const categoryX = Number(parameters['categoryX'] || 0);
    const categoryY = Number(parameters['categoryY'] || 0);
    const categoryWidth = Number(parameters['categoryWidth'] || 800);
    const categoryHeight = Number(parameters['categoryHeight'] || 60);
    
    // 调试模式
    const debugMode = parameters['debugMode'] === 'true';
    
    //=============================================================================
    // 创建自定义物品列表窗口
    //=============================================================================
    
    const _Window_ItemList_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function(rect) {
        this._scrollX = 0; // 添加水平滚动位置变量
        _Window_ItemList_initialize.call(this, rect);
        
        // 设置数组
        this._iconSprites = [];
        this._selectionSprites = [];
        this._nameSprites = [];
        
        // 设置窗口属性
        this.opacity = windowOpacity;
        this.frameVisible = false;
        
        // 隐藏默认背景
        this._hideBackgroundSprites();
        
        // 设置背景图片
        if (backgroundImage) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture(backgroundImage);
            this._backgroundSprite.x = backgroundX;
            this._backgroundSprite.y = backgroundY;
            this._backgroundSprite.scale.x = backgroundScaleX;
            this._backgroundSprite.scale.y = backgroundScaleY;
            this._backgroundSprite.z = -1;
            this.addChild(this._backgroundSprite);
        }
        
        // 创建详情窗口
        this.createDetailWindow();
        
        // 立即更新金币显示
        if (showGold && !goldInDetail && this._goldSprite) {
            this._updateGoldDisplay();
            
            // 延迟一帧，确保金币显示在正确的位置
            setTimeout(() => {
                if (this._goldSprite) this._goldSprite.visible = true;
                if (this._goldIconSprite) this._goldIconSprite.visible = true;
            }, 10);
        }
    };
    
    // 隐藏窗口默认背景
    Window_ItemList.prototype._hideBackgroundSprites = function() {
        if (this._backSprite) {
            this._backSprite.visible = false;
        }
        if (this._frameSprite) {
            this._frameSprite.visible = false;
        }
    };
    
    // 创建物品详情窗口 - 使用纯Sprite实现
    Window_ItemList.prototype.createDetailWindow = function() {
        // 创建主容器
        this._detailContainer = new Sprite();
        this._detailContainer.x = detailX;
        this._detailContainer.y = detailY;
        this._detailContainer.visible = false; // 初始隐藏
        
        // 创建名称精灵
        this._detailNameSprite = new Sprite();
        this._detailNameSprite.x = nameX;
        this._detailNameSprite.y = nameY;
        this._detailNameSprite.bitmap = new Bitmap(detailWidth - nameX - 10, nameFontSize + 10);
        this._detailContainer.addChild(this._detailNameSprite);
        
        // 创建描述精灵
        this._detailDescSprite = new Sprite();
        this._detailDescSprite.x = descX;
        this._detailDescSprite.y = descY;
        this._detailDescSprite.bitmap = new Bitmap(detailWidth - descX - 10, detailHeight - descY - 20);
        this._detailContainer.addChild(this._detailDescSprite);
        
        // 创建数量精灵
        this._detailCountSprite = new Sprite();
        this._detailCountSprite.x = countX;
        this._detailCountSprite.y = countY;
        this._detailCountSprite.bitmap = new Bitmap(150, countFontSize + 10);
        this._detailContainer.addChild(this._detailCountSprite);
        
        // 创建金币精灵 - 可以选择放在详情内部或外部
        if (showGold) {
            this._goldSprite = new Sprite();
            
            if (goldInDetail) {
                // 放在详情窗口内
                this._goldSprite.x = goldX;
                this._goldSprite.y = goldY;
                this._detailContainer.addChild(this._goldSprite);
            } else {
                // 作为独立元素放在场景中
                this._goldSprite.x = goldX;
                this._goldSprite.y = goldY;
                // 将在稍后添加到场景
            }
            
            this._goldSprite.bitmap = new Bitmap(150, goldFontSize + 10);
            
            // 如果使用金币图标
            if (goldIcon > 0) {
                this._goldIconSprite = new Sprite();
                if (goldInDetail) {
                    this._goldIconSprite.x = goldX;
                    this._goldIconSprite.y = goldY;
                    this._detailContainer.addChild(this._goldIconSprite);
                } else {
                    this._goldIconSprite.x = goldX;
                    this._goldIconSprite.y = goldY;
                    // 将在稍后添加到场景
                }
            }
            
            // 立即初始化金币显示
            this._updateGoldDisplay();
        }
        
        // 创建物品总数精灵
        if (showTotal) {
            this._totalSprite = new Sprite();
            this._totalSprite.x = totalX;
            this._totalSprite.y = totalY;
            this._totalSprite.bitmap = new Bitmap(150, totalFontSize + 10);
            this._detailContainer.addChild(this._totalSprite);
        }
        
        // 将容器添加到父容器
        if (this.parent) {
            this.parent.addChild(this._detailContainer);
            
            // 如果金币显示在外部，也添加到父容器
            if (showGold && !goldInDetail) {
                if (this._goldSprite) this.parent.addChild(this._goldSprite);
                if (this._goldIconSprite) this.parent.addChild(this._goldIconSprite);
                
                // 确保金币可见
                if (this._goldSprite) this._goldSprite.visible = true;
                if (this._goldIconSprite) this._goldIconSprite.visible = true;
            }
        } else {
            setTimeout(() => {
                if (this.parent) {
                    this.parent.addChild(this._detailContainer);
                    
                    // 如果金币显示在外部，也添加到父容器
                    if (showGold && !goldInDetail) {
                        if (this._goldSprite) this.parent.addChild(this._goldSprite);
                        if (this._goldIconSprite) this.parent.addChild(this._goldIconSprite);
                        
                        // 确保金币可见
                        if (this._goldSprite) this._goldSprite.visible = true;
                        if (this._goldIconSprite) this._goldIconSprite.visible = true;
                    }
                }
            }, 1);
        }
    };
    
    // 重写refresh方法
    const _Window_ItemList_refresh = Window_ItemList.prototype.refresh;
    Window_ItemList.prototype.refresh = function() {
        // 确保物品列表已经创建
        this.makeItemList();
        
        this.contents.clear();
        
        // 创建网格图标
        this._createItemIcons();
    };
    
    // 清除旧的图标精灵
    Window_ItemList.prototype._clearIconSprites = function() {
        if (this._iconSprites) {
            for (const sprite of this._iconSprites) {
                if (sprite) this.removeChild(sprite);
            }
        }
        
        if (this._selectionSprites) {
            for (const sprite of this._selectionSprites) {
                if (sprite) this.removeChild(sprite);
            }
        }
        
        if (this._nameSprites) {
            for (const sprite of this._nameSprites) {
                if (sprite) this.removeChild(sprite);
            }
        }
        
        this._iconSprites = [];
        this._selectionSprites = [];
        this._nameSprites = [];
    };
    
    // 创建物品图标精灵
    Window_ItemList.prototype._createItemIcons = function() {
        // 清除旧的图标精灵
        this._clearIconSprites();
        
        const maxItems = this.maxItems();
        if (maxItems === 0) return;
        
        // 计算当前可见的物品范围
        const topIndex = this.topIndex();
        
        // 在单行模式下，根据可视区域宽度计算可显示的物品数量
        let visibleItems;
        if (rows <= 1) {
            const scrollAreaWidth = this.width - 2 * startX;
            const maxVisibleColumns = Math.ceil(scrollAreaWidth / columnSpacing) + 1; // 加1确保边缘物品也能显示
            visibleItems = Math.min(maxVisibleColumns, maxItems - topIndex);
            
            if (debugMode) {
                console.log(`创建图标 - 顶部索引: ${topIndex}, 可见物品: ${visibleItems}, 总物品: ${maxItems}`);
            }
        } else {
            visibleItems = Math.min(this.maxVisibleItems(), maxItems - topIndex);
        }
        
        for (let i = 0; i < visibleItems; i++) {
            const itemIndex = topIndex + i;
            if (itemIndex >= maxItems) break;
            
            const item = this.itemAt(itemIndex);
            if (!item) continue;
            
            // 决定图标位置
            let posX, posY;
            if (useGrid) {
                // 如果设置了单行模式，则所有物品都在同一行，并根据topIndex偏移显示
                if (rows <= 1) {
                    posX = startX + i * columnSpacing;
                    posY = startY;
                } else {
                    // 多行模式
                    const col = i % columns;
                    const row = Math.floor(i / columns);
                    posX = startX + col * columnSpacing;
                    posY = startY + row * rowSpacing;
                }
            } else {
                posX = startX + (i % 3) * 100;
                posY = startY + Math.floor(i / 3) * 100;
            }
            
            // 创建选择框精灵
            const selectionSprite = new Sprite();
            selectionSprite.bitmap = new Bitmap(iconWidth + 10, iconHeight + 10);
            selectionSprite.bitmap.fillAll(selectionColor);
            selectionSprite.x = posX - 5;
            selectionSprite.y = posY - 5;
            selectionSprite.visible = (itemIndex === this.index());
            this.addChild(selectionSprite);
            this._selectionSprites.push(selectionSprite);
            
            // 创建图标精灵
            const iconSprite = new Sprite();
            iconSprite.bitmap = new Bitmap(iconWidth, iconHeight);
            
            // 绘制物品图标
            const iconIndex = item.iconIndex;
            const bitmap = ImageManager.loadSystem('IconSet');
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;
            
            // 等待位图加载完成
            bitmap.addLoadListener(() => {
                iconSprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0, iconWidth, iconHeight);
                
                // 调试模式 - 显示额外信息
                if (debugMode) {
                    iconSprite.bitmap.fontSize = 12;
                    iconSprite.bitmap.textColor = '#ff0000';
                    iconSprite.bitmap.drawText(itemIndex.toString(), 5, 5, iconWidth - 10, 20, 'left');
                }
            });
            
            iconSprite.x = posX;
            iconSprite.y = posY;
            iconSprite._itemIndex = itemIndex;
            this.addChild(iconSprite);
            this._iconSprites.push(iconSprite);
        }
        
        if (debugMode && this._iconSprites.length > 0) {
            console.log(`已创建 ${this._iconSprites.length} 个图标精灵`);
        }
    };
    
    // 修复Window_ItemList.prototype.update的重复问题
    const _Window_ItemList_update2 = Window_ItemList.prototype.update;
    Window_ItemList.prototype.update = function() {
        _Window_ItemList_update2.call(this);
        
        // 确保背景透明度和帧可见性保持正确状态
        if (SceneManager._scene && SceneManager._scene._isGridItemScene) {
            this.opacity = windowOpacity;
            this.frameVisible = false;
            
            // 确保背景图层可见
            if (this._backgroundSprite) {
                this._backgroundSprite.visible = true;
            }
            
            // 自定义的更新函数已经在其他地方调用
        }
    };
    
    // 更新选择状态
    const _Window_ItemList_update = Window_ItemList.prototype.update;
    Window_ItemList.prototype.update = function() {
        _Window_ItemList_update.call(this);
        
        // 只在GridItem场景中执行
        if (SceneManager._scene && SceneManager._scene._isGridItemScene) {
            // 刷新图标选择状态
            this._updateIconSelection();
            
            // 刷新详情窗口
            this._updateDetailWindow();
            
            // 确保背景仍然是透明的
            this.opacity = windowOpacity;
            this.frameVisible = false;
            
            // 确保背景图层正确
            if (this._backgroundSprite) {
                this._backgroundSprite.visible = true;
            }
        }
    };
    
    // 更新图标选择状态
    Window_ItemList.prototype._updateIconSelection = function() {
        const currentIndex = this.index();
        const topIndex = this.topIndex();
        
        if (this._selectionSprites) {
            for (let i = 0; i < this._selectionSprites.length; i++) {
                const sprite = this._selectionSprites[i];
                if (sprite) {
                    // 获取此精灵对应的物品索引（从_iconSprites获取）
                    const itemIndex = this._iconSprites[i] ? this._iconSprites[i]._itemIndex : -1;
                    
                    // 检查是否是当前选中的物品
                    const isSelected = (itemIndex === currentIndex);
                    sprite.visible = isSelected;
                    
                    if (isSelected) {
                        // 简单的选中动画
                        const scale = 1.0 + 0.1 * Math.sin(Date.now() * 0.01);
                        sprite.scale.x = scale;
                        sprite.scale.y = scale;
                    }
                }
            }
        }
    };
    
    // 更新详情显示
    Window_ItemList.prototype._updateDetailWindow = function() {
        if (this._detailContainer) {
            const item = this.item();
            
            if (item && this.active) {
                // 显示详情容器
                this._detailContainer.visible = true;
                this._updateDetailContent(item);
            } else {
                // 隐藏详情容器
                this._detailContainer.visible = false;
            }
            
            // 始终显示和更新金币 - 无论是否选择了物品
            if (showGold) {
                if (goldInDetail) {
                    // 如果金币显示在详情窗口内，只在显示详情时显示金币
                    if (this._detailContainer.visible) {
                        this._updateGoldDisplay();
                    }
                } else {
                    // 如果金币作为独立元素，始终显示和更新
                    if (this._goldSprite) this._goldSprite.visible = true;
                    if (this._goldIconSprite) this._goldIconSprite.visible = true;
                    this._updateGoldDisplay();
                }
            }
            
            // 确保详情容器在正确的父容器中
            if (this.parent && this._detailContainer.parent !== this.parent) {
                if (this._detailContainer.parent) {
                    this._detailContainer.parent.removeChild(this._detailContainer);
                }
                this.parent.addChild(this._detailContainer);
                
                // 如果金币显示在外部，也添加到父容器
                if (showGold && !goldInDetail) {
                    if (this._goldSprite && this._goldSprite.parent !== this.parent) {
                        if (this._goldSprite.parent) {
                            this._goldSprite.parent.removeChild(this._goldSprite);
                        }
                        this.parent.addChild(this._goldSprite);
                    }
                    
                    if (this._goldIconSprite && this._goldIconSprite.parent !== this.parent) {
                        if (this._goldIconSprite.parent) {
                            this._goldIconSprite.parent.removeChild(this._goldIconSprite);
                        }
                        this.parent.addChild(this._goldIconSprite);
                    }
                }
            }
        }
    };
    
    // 更新详情内容 - 使用精灵实现
    Window_ItemList.prototype._updateDetailContent = function(item) {
        if (!this._detailContainer || !item) return;
        
        // 更新名称
        const nameBitmap = this._detailNameSprite.bitmap;
        nameBitmap.clear();
        nameBitmap.fontFace = $gameSystem.mainFontFace();
        nameBitmap.fontSize = nameFontSize;
        nameBitmap.textColor = nameColor;
        nameBitmap.drawText(item.name, 0, 0, nameBitmap.width, nameBitmap.height);
        
        // 更新描述
        const description = item.description || '';
        if (description) {
            const descBitmap = this._detailDescSprite.bitmap;
            descBitmap.clear();
            descBitmap.fontFace = $gameSystem.mainFontFace();
            descBitmap.fontSize = descFontSize;
            descBitmap.textColor = descColor;
            this._drawMultiLineText(description, descBitmap);
        }
        
        // 更新数量
        if ($gameParty.numItems(item) > 0) {
            const countBitmap = this._detailCountSprite.bitmap;
            countBitmap.clear();
            countBitmap.fontFace = $gameSystem.mainFontFace();
            countBitmap.fontSize = countFontSize;
            countBitmap.textColor = countColor;
            countBitmap.drawText(countPrefix + $gameParty.numItems(item), 0, 0, countBitmap.width, countBitmap.height, 'right');
        }
        
        // 更新金币显示 - 如果在详情窗口内
        if (showGold && goldInDetail) {
            this._updateGoldDisplay();
        }
        
        // 更新物品总数显示
        if (showTotal && this._totalSprite) {
            // 计算当前类别的物品总数
            const category = this._category || 'all';
            let totalItems = 0;
            
            // 计算不同类别的物品总数
            if (category === 'item') {
                totalItems = $gameParty.allItems().filter(i => DataManager.isItem(i) && i.itypeId === 1).length;
            } else if (category === 'weapon') {
                totalItems = $gameParty.allItems().filter(i => DataManager.isWeapon(i)).length;
            } else if (category === 'armor') {
                totalItems = $gameParty.allItems().filter(i => DataManager.isArmor(i)).length;
            } else if (category === 'keyItem') {
                totalItems = $gameParty.allItems().filter(i => DataManager.isItem(i) && i.itypeId === 2).length;
            } else {
                totalItems = $gameParty.allItems().length;
            }
            
            // 显示总数
            const totalBitmap = this._totalSprite.bitmap;
            totalBitmap.clear();
            totalBitmap.fontFace = $gameSystem.mainFontFace();
            totalBitmap.fontSize = totalFontSize;
            totalBitmap.textColor = totalColor;
            totalBitmap.drawText(totalText + totalItems, 0, 0, totalBitmap.width, totalBitmap.height);
        }
    };
    
    // 更新金币显示 - 抽取为独立方法以便重用
    Window_ItemList.prototype._updateGoldDisplay = function() {
        if (!showGold || !this._goldSprite) return;
        
        const gold = $gameParty.gold();
        const goldBitmap = this._goldSprite.bitmap;
        goldBitmap.clear();
        goldBitmap.fontFace = $gameSystem.mainFontFace();
        goldBitmap.fontSize = goldFontSize;
        goldBitmap.textColor = goldColor;
        
        // 如果使用金币图标，给文本留出空间
        const iconOffset = goldIcon > 0 ? 26 : 0;
        goldBitmap.drawText(gold, iconOffset, 0, goldBitmap.width - iconOffset, goldBitmap.height);
        
        // 如果使用金币图标，更新图标
        if (goldIcon > 0 && this._goldIconSprite) {
            const iconBitmap = new Bitmap(24, 24);
            this._goldIconSprite.bitmap = iconBitmap;
            
            // 绘制金币图标
            const goldIconIndex = goldIcon;
            const iconSet = ImageManager.loadSystem('IconSet');
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (goldIconIndex % 16) * pw;
            const sy = Math.floor(goldIconIndex / 16) * ph;
            
            iconSet.addLoadListener(() => {
                iconBitmap.blt(iconSet, sx, sy, pw, ph, 0, 0, 24, 24);
            });
        }
    };
    
    // 在位图上绘制多行文本
    Window_ItemList.prototype._drawMultiLineText = function(text, bitmap) {
        // 改进的自动换行文字绘制
        const lineHeight = descFontSize + 4;
        const maxLines = Math.floor(bitmap.height / lineHeight);
        const maxWidth = bitmap.width;
        
        // 分割文本为单词
        const words = text.split('');
        let lines = [];
        let currentLine = '';
        
        for (let i = 0; i < words.length; i++) {
            const char = words[i];
            const testLine = currentLine + char;
            const metrics = bitmap.measureTextWidth(testLine);
            
            if (metrics > maxWidth && currentLine) {
                // 如果当前行加上新字符超出宽度，且当前行不为空，则换行
                lines.push(currentLine);
                currentLine = char;
            } else {
                currentLine = testLine;
            }
        }
        
        // 添加最后一行（如果还有内容）
        if (currentLine) {
            lines.push(currentLine);
        }
        
        // 绘制每行文字
        for (let i = 0; i < lines.length; i++) {
            bitmap.drawText(lines[i], 0, i * lineHeight, bitmap.width, lineHeight);
        }
    };
    
    // 绘制物品描述（支持自动换行）
    Window_ItemList.prototype.drawItemDescription = function(text, x, y, width, height, targetContents) {
        const contents = targetContents || this.contents;
        const textState = {text: text, index: 0, x: x, y: y, width: width};
        
        // 简单的自动换行文字绘制
        let lines = [];
        let currentLine = '';
        const words = text.split(' ');
        
        const lineHeight = descFontSize + 4;
        const maxLines = Math.floor(height / lineHeight);
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = contents.measureTextWidth(testLine);
            
            if (metrics > width && currentLine) {
                lines.push(currentLine);
                currentLine = word;
                
                if (lines.length >= maxLines - 1) {
                    // 如果已经达到最大行数-1，添加当前行并跳出循环
                    if (i < words.length - 1) {
                        currentLine += '...'; // 添加省略号表示还有更多内容
                    }
                    lines.push(currentLine);
                    break;
                }
            } else {
                currentLine = testLine;
            }
        }
        
        if (currentLine && lines.length < maxLines) {
            lines.push(currentLine);
        }
        
        // 绘制每行文字
        for (let i = 0; i < lines.length; i++) {
            contents.drawText(lines[i], x, y + i * lineHeight, width, lineHeight);
        }
    };
    
    // 绘制物品图标
    Window_ItemList.prototype.drawIcon = function(iconIndex, x, y, targetContents) {
        const contents = targetContents || this.contents;
        const bitmap = ImageManager.loadSystem('IconSet');
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        
        // 等待位图加载完成
        bitmap.addLoadListener(() => {
            contents.blt(bitmap, sx, sy, pw, ph, x, y, iconWidth, iconHeight);
        });
    };
    
    // 重写滚动方法，根据设置的行数决定滚动方向
    Window_ItemList.prototype.maxVisibleItems = function() {
        if (useGrid && columns > 0) {
            return rows * columns;
        } else {
            return Window_Selectable.prototype.maxVisibleItems.call(this);
        }
    };
    
    // 重写行高度，确保滚动正确
    Window_ItemList.prototype.itemHeight = function() {
        if (useGrid) {
            return rowSpacing;
        } else {
            return Window_Selectable.prototype.itemHeight.call(this);
        }
    };
    
    // 重写可见行数计算
    Window_ItemList.prototype.numVisibleRows = function() {
        if (useGrid) {
            return rows;
        } else {
            return Window_Selectable.prototype.numVisibleRows.call(this);
        }
    };
    
    // 重写最大列数计算
    Window_ItemList.prototype.maxCols = function() {
        if (useGrid) {
            return columns;
        } else {
            return Window_Selectable.prototype.maxCols.call(this);
        }
    };
    
    // 重写页面项数计算
    Window_ItemList.prototype.maxPageItems = function() {
        if (useGrid) {
            return columns * rows;
        } else {
            return Window_Selectable.prototype.maxPageItems.call(this);
        }
    };
    
    // 修改导航方法，根据行数决定滚动方向
    Window_ItemList.prototype.cursorDown = function(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        
        // 如果下方有物品，则选择下方物品
        if (index < maxItems - maxCols) {
            this.smoothSelect(index + maxCols);
            // 确保滚动到正确位置
            this.updateOrigin();
        } else if (wrap) {
            // 到达底部时，如果启用环绕，则回到顶部同一列
            this.smoothSelect(index % maxCols);
            this.updateOrigin();
        }
    };

    Window_ItemList.prototype.cursorUp = function(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        const maxCols = this.maxCols();
        
        // 如果上方有物品，则选择上方物品
        if (index >= maxCols) {
            this.smoothSelect(index - maxCols);
            // 确保滚动到正确位置
            this.updateOrigin();
        } else if (wrap) {
            // 到达顶部时，如果启用环绕，则到底部同一列
            const maxRows = Math.ceil(maxItems / maxCols);
            const targetRow = maxRows - 1;
            let targetIndex = targetRow * maxCols + (index % maxCols);
            // 确保不超出实际物品数量
            targetIndex = Math.min(targetIndex, maxItems - 1);
            this.smoothSelect(targetIndex);
            this.updateOrigin();
        }
    };

    Window_ItemList.prototype.cursorRight = function(wrap) {
        const index = this.index();
        const maxItems = this.maxItems();
        
        if (debugMode) {
            console.log(`当前索引: ${index}, 最大物品数: ${maxItems}`);
        }
        
        // 确保可以导航到任意物品，不受可视范围限制
        if (index < maxItems - 1) {
            this.smoothSelect(index + 1);
            // 强制更新滚动位置，确保物品在视图中
            this.updateOrigin();
        } else if (wrap) {
            // 如果到达最后一个物品，且允许循环，则回到第一个物品
            this.smoothSelect(0);
            this.updateOrigin();
        }
    };

    Window_ItemList.prototype.cursorLeft = function(wrap) {
        const index = this.index();
        
        if (debugMode) {
            console.log(`当前索引(左): ${index}`);
        }
        
        // 确保可以导航到任意物品，不受可视范围限制
        if (index > 0) {
            this.smoothSelect(index - 1);
            // 强制更新滚动位置，确保物品在视图中
            this.updateOrigin();
        } else if (wrap) {
            // 如果是第一个物品，且允许循环，则跳到最后一个物品
            this.smoothSelect(this.maxItems() - 1);
            this.updateOrigin();
        }
    };
    
    // 重写itemRect方法以适应不同的滚动方向
    Window_ItemList.prototype.itemRect = function(index) {
        const maxCols = this.maxCols();
        
        if (useGrid && columns > 0) {
            // 计算相对于顶部索引的偏移
            const col = index % maxCols;
            const row = Math.floor(index / maxCols) - Math.floor(this.topIndex() / maxCols);
            
            // 计算X和Y位置
            const x = startX + col * columnSpacing;
            const y = startY + row * rowSpacing;
            
            return new Rectangle(x, y, iconWidth, iconHeight);
        } else {
            return Window_Selectable.prototype.itemRect.call(this, index);
        }
    };
    
    // 处理鼠标/触摸选择
    const _Window_ItemList_processTouch = Window_ItemList.prototype.processTouch;
    Window_ItemList.prototype.processTouch = function() {
        if (this.isOpenAndActive() && TouchInput.isTriggered()) {
            const touchPos = new Point(TouchInput.x - this.x, TouchInput.y - this.y);
            let hitIndex = -1;
            
            // 检测是否点击了图标
            if (this._iconSprites) {
                for (let i = 0; i < this._iconSprites.length; i++) {
                    const sprite = this._iconSprites[i];
                    if (!sprite) continue;
                    
                    const rect = new Rectangle(
                        sprite.x, 
                        sprite.y, 
                        iconWidth, 
                        iconHeight
                    );
                    
                    if (touchPos.x >= rect.x && touchPos.x <= rect.x + rect.width &&
                        touchPos.y >= rect.y && touchPos.y <= rect.y + rect.height) {
                        // 使用存储在精灵中的实际物品索引，而不是数组索引
                        hitIndex = sprite._itemIndex;
                        break;
                    }
                }
            }
            
            // 如果点击了有效图标，则选择并执行
            if (hitIndex >= 0) {
                this.select(hitIndex);
                if (TouchInput.isTriggered() && this.isTouchOkEnabled()) {
                    this.processOk();
                }
                return;
            }
        }
        
        // 如果没有点击到图标，调用原始方法处理其他触摸操作
        _Window_ItemList_processTouch.call(this);
    };
    
    // 覆盖绘制方法，隐藏原始文本
    Window_ItemList.prototype.drawItemBackground = function(index) {
        // 什么都不做，不绘制选择背景
    };
    
    Window_ItemList.prototype.drawItem = function(index) {
        // 保持为空，不调用原始方法，这样原始文本不会被绘制
    };
    
    // 保持原始光标矩形为空，这样系统光标就不会显示
    Window_ItemList.prototype._refreshCursor = function() {
        if (this._cursorSprite) {
            this._cursorSprite.visible = false;
        }
        this.setCursorRect(0, 0, 0, 0);
    };
    
    
    // 重写滚动计算
    Window_ItemList.prototype.topIndex = function() {
        if (useGrid) {
            // 计算当前可见的起始行
            const maxCols = this.maxCols();
            return Math.floor(this.scrollY() / this.itemHeight()) * maxCols;
        } else {
            return Window_Selectable.prototype.topIndex.call(this);
        }
    };

    // 重写updateOrigin方法
    Window_ItemList.prototype.updateOrigin = function() {
        if (useGrid) {
            const maxCols = this.maxCols();
            const maxRows = Math.ceil(this.maxItems() / maxCols);
            const row = Math.floor(this.index() / maxCols);
            
            // 计算应该显示的行范围
            const visibleRows = this.numVisibleRows();
            const topRow = Math.max(0, Math.min(row - Math.floor(visibleRows / 2), maxRows - visibleRows));
            
            // 设置滚动位置
            this._scrollY = topRow * this.itemHeight();
            
            // 更新图标显示
            this._createItemIcons();
        } else {
            Window_Selectable.prototype.updateOrigin.call(this);
        }
    };

    //=============================================================================
    // 修改Scene_Item支持自定义窗口位置和大小
    //=============================================================================
    
    // 重写物品窗口的位置和大小计算
    const _Scene_Item_itemWindowRect = Scene_Item.prototype.itemWindowRect;
    Scene_Item.prototype.itemWindowRect = function() {
        const rect = _Scene_Item_itemWindowRect.call(this);
        rect.width = itemWindowWidth;
        rect.height = itemWindowHeight;
        return rect;
    };
    
    // 重写类别窗口的位置和大小计算
    const _Scene_Item_categoryWindowRect = Scene_Item.prototype.categoryWindowRect;
    Scene_Item.prototype.categoryWindowRect = function() {
        const rect = _Scene_Item_categoryWindowRect.call(this);
        rect.x = categoryX;
        rect.y = categoryY;
        rect.width = categoryWidth;
        rect.height = categoryHeight;
        return rect;
    };
    
    // 重写Scene_Item的create方法，确保窗口正确加载
    const _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_create.call(this);
        
        // 确保窗口刷新
        if (this._itemWindow) {
            this._itemWindow.refresh();
        }
        
        // 确保在Item窗口中添加详情容器
        if (this._itemWindow && this._itemWindow._detailContainer) {
            this.addChild(this._itemWindow._detailContainer);
        }
        
        // 确保金币显示在场景创建后立即可见
        if (this._itemWindow && showGold && !goldInDetail) {
            if (this._itemWindow._goldSprite) {
                this.addChild(this._itemWindow._goldSprite);
                this._itemWindow._goldSprite.visible = true;
            }
            
            if (this._itemWindow._goldIconSprite) {
                this.addChild(this._itemWindow._goldIconSprite);
                this._itemWindow._goldIconSprite.visible = true;
            }
            
            // 立即更新金币显示
            this._itemWindow._updateGoldDisplay();
        }
        
        // 更新类别窗口的透明度
        if (this._categoryWindow) {
            this._categoryWindow.opacity = windowOpacity;
            // 隐藏类别窗口
            this._categoryWindow.hide();
            
            // 直接设置物品窗口为所有物品
            if (this._itemWindow) {
                this._itemWindow.setCategory('all');
                this._itemWindow.activate();
                this._itemWindow.selectLast();
            }
        }
    };
    
    // 修改物品显示开始位置
    Window_ItemList.prototype.drawAllItems = function() {
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index);
                // 不调用drawItem以避免默认绘制，我们用精灵代替
            }
        }
        
        // 在drawAllItems完成后创建图标
        this._createItemIcons();
    };
    
    // 修改物品窗口的includes方法，显示所有物品
    Window_ItemList.prototype.includes = function(item) {
        return item && $gameParty.numItems(item) > 0;
    };
    
    // 修改物品窗口的setCategory方法，忽略分类设置
    Window_ItemList.prototype.setCategory = function(category) {
        if (this._category !== 'all') {
            this._category = 'all';
            this.refresh();
            this.scrollTo(0, 0);
        }
    };
    
    // 修改物品窗口的makeItemList方法，显示所有物品
    Window_ItemList.prototype.makeItemList = function() {
        this._data = $gameParty.allItems().filter(item => this.includes(item));
    };
    
    // 修改当选择项变化时的处理
    Window_ItemList.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        this._updateIconSelection();
    };
    
    // 重写当滚动变化时的处理
    Window_ItemList.prototype.updateOrigin = function() {
        if (useGrid) {
            const maxCols = this.maxCols();
            const maxRows = Math.ceil(this.maxItems() / maxCols);
            const row = Math.floor(this.index() / maxCols);
            
            // 计算应该显示的行范围
            const visibleRows = this.numVisibleRows();
            const topRow = Math.max(0, Math.min(row - Math.floor(visibleRows / 2), maxRows - visibleRows));
            
            // 设置滚动位置
            this._scrollY = topRow * this.itemHeight();
            
            // 更新图标显示
            this._createItemIcons();
        } else {
            Window_Selectable.prototype.updateOrigin.call(this);
        }
    };
    
    // 当场景关闭时，也关闭详情容器和独立金币显示
    const _Scene_Item_terminate = Scene_Item.prototype.terminate;
    Scene_Item.prototype.terminate = function() {
        if (this._itemWindow) {
            if (this._itemWindow._detailContainer) {
                this._itemWindow._detailContainer.visible = false;
            }
            
            // 隐藏独立金币显示
            if (showGold && !goldInDetail) {
                if (this._itemWindow._goldSprite) {
                    this._itemWindow._goldSprite.visible = false;
                }
                if (this._itemWindow._goldIconSprite) {
                    this._itemWindow._goldIconSprite.visible = false;
                }
            }
        }
        _Scene_Item_terminate.call(this);
    };

    // 覆盖物品窗口的processHandling方法，禁止按空格键时触发状态窗口
    Window_ItemList.prototype.processHandling = function() {
        if (this.isOpenAndActive()) {
            // 确保能够接受Enter键和确定键(Z键)的输入
            if (this.isOkEnabled() && (Input.isRepeated('ok') || Input.isRepeated('enter'))) {
                if (debugMode) {
                    console.log(`按下确定键 - 当前索引: ${this.index()}, 物品: ${this.item() ? this.item().name : 'none'}`);
                }
                this.processOk();
            } else if (this.isCancelEnabled() && Input.isRepeated('cancel')) {
                this.processCancel();
            } else if (this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
                this.processPagedown();
            } else if (this.isHandled("pageup") && Input.isTriggered("pageup")) {
                this.processPageup();
            }
        }
    };

    // 扩展isOkTriggered方法，支持Enter键
    Window_ItemList.prototype.isOkTriggered = function() {
        return Input.isRepeated('ok') || Input.isRepeated('enter');
    };

    // 覆盖processOk方法，确保只处理有效物品
    Window_ItemList.prototype.processOk = function() {
        // 确保物品是有效的并且是可用的
        if (this.item() && this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            if (debugMode) {
                console.log(`物品无效或不可用 - ${this.item() ? this.item().name : 'no item'}`);
            }
            this.playBuzzerSound();
        }
    };

    // 修改默认的使用物品行为，不显示角色窗口
    Scene_Item.prototype.useItem = function() {
        const item = this.item();
        if (!item || !$gameParty.canUse(item)) {
            SoundManager.playBuzzer();
            this._itemWindow.activate();
            return;
        }
        
        const action = new Game_Action($gameParty.members()[0]);
        action.setItemObject(item);
        
        // 如果物品针对单个角色，则使用在当前菜单中选择的角色
        if (action.isForOne()) {
            const actor = $gameParty.menuActor();
            $gameParty.setLastItem(item);
            $gameParty.consumeItem(item);
            actor.gainHp(action.itemEffectForOne(actor, action.testItemEffect(actor)));
            this._itemWindow.redrawCurrentItem();
            this._itemWindow.activate();
        } 
        // 如果物品针对所有队员，则对所有队员应用效果
        else if (action.isForAll()) {
            $gameParty.setLastItem(item);
            $gameParty.consumeItem(item);
            for (const actor of $gameParty.members()) {
                actor.gainHp(action.itemEffectForOne(actor, action.testItemEffect(actor)));
            }
            this._itemWindow.redrawCurrentItem();
            this._itemWindow.activate();
        }
        // 其他情况(例如事件物品)
        else {
            $gameParty.setLastItem(item);
            $gameParty.consumeItem(item);
            this._itemWindow.redrawCurrentItem();
            this._itemWindow.activate();
        }
        
        // 播放使用物品的音效
        SoundManager.playUseItem();
        
        // 检查是否有公共事件需要执行
        this.checkCommonEvent();
    };
    
    // 检查公共事件
    Scene_Item.prototype.checkCommonEvent = function() {
        if ($gameTemp.isCommonEventReserved()) {
            SceneManager.goto(Scene_Map);
        }
    };

    // 覆盖createActorWindow方法
    const _Scene_Item_createActorWindow = Scene_Item.prototype.createActorWindow;
    Scene_Item.prototype.createActorWindow = function() {
        _Scene_Item_createActorWindow.call(this);
        if (this._actorWindow) {
            this._actorWindow.visible = false;
            this._actorWindow.opacity = 0;
            this._actorWindow.frameVisible = false;
            this._actorWindow.deactivate();
        }
    };
    
    // 覆盖onItemOk方法，不显示角色窗口
    Scene_Item.prototype.onItemOk = function() {
        const item = this.item();
        if (item && this._itemWindow.isCurrentItemEnabled()) {
            this.useItem();
        } else {
            SoundManager.playBuzzer();
        }
        this._itemWindow.activate();
    };

    // 扩展Scene_Item.prototype.initialize，添加标记
    const _Scene_Item_initialize = Scene_Item.prototype.initialize;
    Scene_Item.prototype.initialize = function() {
        _Scene_Item_initialize.call(this);
        this._isGridItemScene = true;
    };

    // 重写createItemWindow方法
    const _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _Scene_Item_createItemWindow.call(this);
        
        // 防止原生窗口显示内容
        if (this._itemWindow) {
            // 保存原始方法
            if (!this._itemWindow._originalDrawItem) {
                this._itemWindow._originalDrawItem = this._itemWindow.drawItem;
            }
            
            // 重写drawItem方法，防止原生绘制
            this._itemWindow.drawItem = function() {
                // 不执行任何绘制
            };
            
            // 确保其他所有窗口和背景隐藏
            this._itemWindow.frameVisible = false;
            
            // 确保所有背景图层隐藏
            for (const child of this._itemWindow.children) {
                if (child && child.constructor.name === "Sprite" && 
                    child !== this._itemWindow._backgroundSprite) {
                    child.visible = false;
                }
            }
        }
    };

    // 完全重写物品详情窗口的显示方法
    const _Window_ItemList_setHelpWindowItem = Window_ItemList.prototype.setHelpWindowItem;
    Window_ItemList.prototype.setHelpWindowItem = function(item) {
        // 检查是否处于GridItem场景
        if (SceneManager._scene && SceneManager._scene._isGridItemScene) {
            // 使用自己的详情窗口，不调用原始方法
            if (this._detailContainer) {
                this._updateDetailContent(item);
            }
        } else {
            // 在其他场景中保持原有行为
            _Window_ItemList_setHelpWindowItem.call(this, item);
        }
    };
    
    // 在场景创建时完全禁用帮助窗口
    Scene_Item.prototype.createHelpWindow = function() {
        if (this._isGridItemScene) {
            // 创建一个空的帮助窗口对象，但不添加到场景
            const rect = this.helpWindowRect();
            this._helpWindow = {
                setItem: function() {},
                clear: function() {},
                refresh: function() {},
                show: function() {},
                hide: function() {},
                visible: false,
                opacity: 0,
                frameVisible: false,
                activate: function() {},
                deactivate: function() {},
                update: function() {}
            };
        } else {
            // 调用原始方法
            Scene_MenuBase.prototype.createHelpWindow.call(this);
        }
    };

    // 禁用原生窗口显示内容的更新
    const _Window_Help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function(rect) {
        _Window_Help_initialize.call(this, rect);
        
        // 如果处于GridItem场景，隐藏帮助窗口
        if (SceneManager._scene && SceneManager._scene._isGridItemScene) {
            this.visible = false;
            this.opacity = 0;
            this.frameVisible = false;
        }
    };
    
    // 覆盖updateHelp方法以防止帮助内容显示
    const _Scene_Item_updateHelp = Scene_Item.prototype.updateHelp;
    Scene_Item.prototype.updateHelp = function() {
        // 只在非GridItem场景中执行
        if (!this._isGridItemScene) {
            _Scene_Item_updateHelp.call(this);
        }
    };
    
    // 禁用所有其他窗口
    const _Scene_Item_start = Scene_Item.prototype.start;
    Scene_Item.prototype.start = function() {
        _Scene_Item_start.call(this);
        
        // 显示金币（如果设置为显示）
        if (showGold && !goldInDetail) {
            // 创建金币显示
            this.createGoldWindow();
        }
        
        // 隐藏所有原生窗口，只在GridItem场景中执行
        if (this._isGridItemScene) {
            // 隐藏所有窗口，只保留物品列表窗口
            if (this._helpWindow) {
                this._helpWindow.visible = false;
                this._helpWindow.opacity = 0;
                this._helpWindow.frameVisible = false;
            }
            
            if (this._categoryWindow) {
                this._categoryWindow.visible = false;
                this._categoryWindow.opacity = 0;
                this._categoryWindow.frameVisible = false;
            }
            
            if (this._actorWindow) {
                this._actorWindow.visible = false;
                this._actorWindow.opacity = 0;
                this._actorWindow.frameVisible = false;
            }
        }
    };

    // 在Scene_Item中添加独立的金币显示方法
    Scene_Item.prototype.createGoldWindow = function() {
        // 只在GridItem场景中执行
        if (!this._isGridItemScene) return;
        
        // 创建独立的金币显示精灵
        this._goldSprite = new Sprite();
        this._goldSprite.x = goldX;
        this._goldSprite.y = goldY;
        this._goldSprite.bitmap = new Bitmap(200, goldFontSize + 10);
        this.addChild(this._goldSprite);
        
        // 如果使用金币图标
        if (goldIcon > 0) {
            this._goldIconSprite = new Sprite();
            this._goldIconSprite.x = goldX;
            this._goldIconSprite.y = goldY;
            this.addChild(this._goldIconSprite);
            
            // 绘制金币图标
            const iconBitmap = new Bitmap(24, 24);
            this._goldIconSprite.bitmap = iconBitmap;
            
            // 绘制金币图标
            const goldIconIndex = goldIcon;
            const iconSet = ImageManager.loadSystem('IconSet');
            const pw = ImageManager.iconWidth;
            const ph = ImageManager.iconHeight;
            const sx = (goldIconIndex % 16) * pw;
            const sy = Math.floor(goldIconIndex / 16) * ph;
            
            iconSet.addLoadListener(() => {
                iconBitmap.blt(iconSet, sx, sy, pw, ph, 0, 0, 24, 24);
            });
        }
        
        // 更新金币显示
        this.updateGoldDisplay();
    };
    
    // 更新金币显示的独立方法
    Scene_Item.prototype.updateGoldDisplay = function() {
        if (!this._goldSprite) return;
        
        const gold = $gameParty.gold();
        const goldBitmap = this._goldSprite.bitmap;
        goldBitmap.clear();
        goldBitmap.fontFace = $gameSystem.mainFontFace();
        goldBitmap.fontSize = goldFontSize;
        goldBitmap.textColor = goldColor;
        
        // 如果使用金币图标，给文本留出空间
        const iconOffset = goldIcon > 0 ? 26 : 0;
        goldBitmap.drawText(gold, iconOffset, 0, goldBitmap.width - iconOffset, goldBitmap.height);
    };

    // 添加update方法
    const _Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function() {
        _Scene_Item_update.call(this);
        
        // 更新金币显示
        if (this._isGridItemScene && showGold && !goldInDetail && this._goldSprite) {
            this.updateGoldDisplay();
        }
    };

})();
