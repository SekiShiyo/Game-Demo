/*:
 * @target MZ
 * @plugindesc ♣ 高级服装系统 + 对话肖像映射 · 网格UI界面 v2.0.0 (中文)
 * @author YourName
 *
 * @param windowSettings
 * @text 窗口设置
 * 
 * @param backgroundImage
 * @text 背景图片
 * @parent windowSettings
 * @type file
 * @dir img/pictures
 * @desc 衣橱窗口的背景图片
 * @default 
 * 
 * @param windowWidth
 * @text 窗口宽度
 * @parent windowSettings
 * @type number
 * @min 400
 * @max 1200
 * @desc 衣橱窗口的宽度
 * @default 800
 * 
 * @param windowHeight
 * @text 窗口高度
 * @parent windowSettings
 * @type number
 * @min 300
 * @max 800
 * @desc 衣橱窗口的高度
 * @default 600
 * 
 * @param windowX
 * @text 窗口X位置
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 衣橱窗口的X坐标（-1表示居中）
 * @default -1
 * 
 * @param windowY
 * @text 窗口Y位置
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 衣橱窗口的Y坐标（-1表示居中）
 * @default -1
 * 
 * @param backgroundScaleX
 * @text 背景X缩放
 * @parent windowSettings
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 3.0
 * @desc 背景图片的X轴缩放比例
 * @default 1.00
 * 
 * @param backgroundScaleY
 * @text 背景Y缩放
 * @parent windowSettings
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 3.0
 * @desc 背景图片的Y轴缩放比例
 * @default 1.00
 * 
 * @param backgroundOffsetX
 * @text 背景X偏移
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 500
 * @desc 背景图片的X轴偏移
 * @default 0
 * 
 * @param backgroundOffsetY
 * @text 背景Y偏移
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 500
 * @desc 背景图片的Y轴偏移
 * @default 0
 * 
 * @param gridSettings
 * @text 网格设置
 * 
 * @param gridX
 * @text 网格区域X位置
 * @parent gridSettings
 * @type number
 * @min 0
 * @max 800
 * @desc 网格区域的X坐标（相对于窗口）
 * @default 20
 * 
 * @param gridY
 * @text 网格区域Y位置
 * @parent gridSettings
 * @type number
 * @min 0
 * @max 600
 * @desc 网格区域的Y坐标（相对于窗口）
 * @default 60
 * 
 * @param gridWidth
 * @text 网格区域宽度
 * @parent gridSettings
 * @type number
 * @min 200
 * @max 600
 * @desc 网格区域的宽度
 * @default 350
 * 
 * @param gridHeight
 * @text 网格区域高度
 * @parent gridSettings
 * @type number
 * @min 200
 * @max 500
 * @desc 网格区域的高度
 * @default 500
 * 
 * @param cellSize
 * @text 格子大小
 * @parent gridSettings
 * @type number
 * @min 48
 * @max 120
 * @desc 每个服装格子的大小（正方形）
 * @default 80
 * 
 * @param rowSpacing
 * @text 行间距
 * @parent gridSettings
 * @type number
 * @min 0
 * @max 20
 * @desc 行与行之间的间距
 * @default 8
 * 
 * @param columnSpacing
 * @text 列间距
 * @parent gridSettings
 * @type number
 * @min 0
 * @max 20
 * @desc 列与列之间的间距
 * @default 8
 * 
 * @param columnsPerRow
 * @text 每行列数
 * @parent gridSettings
 * @type number
 * @min 2
 * @max 8
 * @desc 每行显示多少个格子
 * @default 4
 * 
 * @param maxVisibleRows
 * @text 最大显示行数
 * @parent gridSettings
 * @type number
 * @min 2
 * @max 10
 * @desc 最多同时显示多少行（超出则滚动）
 * @default 5
 * 
 * @param highlightSettings
 * @text 高光设置
 * 
 * @param highlightColor
 * @text 高光颜色
 * @parent highlightSettings
 * @type string
 * @desc 选中时的高光颜色（十六进制）
 * @default #ffcc00
 * 
 * @param highlightOpacity
 * @text 高光透明度
 * @parent highlightSettings
 * @type number
 * @min 50
 * @max 255
 * @desc 高光的透明度（50-255）
 * @default 150
 * 
 * @param highlightBorderWidth
 * @text 高光边框宽度
 * @parent highlightSettings
 * @type number
 * @min 0
 * @max 10
 * @desc 高光边框的宽度（0表示无边框）
 * @default 3
 * 
 * @param highlightBorderColor
 * @text 高光边框颜色
 * @parent highlightSettings
 * @type string
 * @desc 高光边框的颜色（十六进制）
 * @default #ff9900
 * 
 * @param highlightCornerRadius
 * @text 高光圆角半径
 * @parent highlightSettings
 * @type number
 * @min 0
 * @max 30
 * @desc 高光矩形的圆角半径（0表示直角）
 * @default 8
 * 
 * @param highlightSize
 * @text 高光大小
 * @parent highlightSettings
 * @type number
 * @min 0
 * @max 100
 * @desc 高光的尺寸（0表示自动）
 * @default 0
 * 
 * @param detailSettings
 * @text 详情设置
 * 
 * @param detailX
 * @text 详情区域X位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 800
 * @desc 详情区域的X坐标（相对于窗口，-1表示自动）
 * @default -1
 * 
 * @param detailY
 * @text 详情区域Y位置
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 600
 * @desc 详情区域的Y坐标（相对于窗口）
 * @default 60
 * 
 * @param detailWidth
 * @text 详情区域宽度
 * @parent detailSettings
 * @type number
 * @min 200
 * @max 500
 * @desc 详情区域的宽度（-1表示自动）
 * @default -1
 * 
 * @param detailHeight
 * @text 详情区域高度
 * @parent detailSettings
 * @type number
 * @min 100
 * @max 400
 * @desc 详情区域的高度
 * @default 300
 * 
 * @param titleSettings
 * @text 标题设置
 * 
 * @param titleText
 * @text 窗口标题
 * @parent titleSettings
 * @type string
 * @desc 衣橱窗口的标题文字
 * @default 衣橱
 * 
 * @param titleX
 * @text 标题X位置
 * @parent titleSettings
 * @type number
 * @min 0
 * @max 800
 * @desc 标题的X坐标（相对于窗口）
 * @default 20
 * 
 * @param titleY
 * @text 标题Y位置
 * @parent titleSettings
 * @type number
 * @min 0
 * @max 100
 * @desc 标题的Y坐标（相对于窗口）
 * @default 20
 * 
 * @param titleFontSize
 * @text 标题字体大小
 * @parent titleSettings
 * @type number
 * @min 16
 * @max 36
 * @desc 标题的字体大小
 * @default 24
 * 
 * @param titleColor
 * @text 标题颜色
 * @parent titleSettings
 * @type string
 * @desc 标题的文字颜色（十六进制）
 * @default #ffffff
 * 
 * @param nameSettings
 * @text 服装名称设置
 * 
 * @param nameX
 * @text 服装名称X位置
 * @parent nameSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 服装名称的X位置（相对于详情区域）
 * @default 10
 * 
 * @param nameY
 * @text 服装名称Y位置
 * @parent nameSettings
 * @type number
 * @min -200
 * @max 400
 * @desc 服装名称的Y位置（相对于详情区域）
 * @default 10
 * 
 * @param nameFontSize
 * @text 服装名称字体大小
 * @parent nameSettings
 * @type number
 * @min 12
 * @max 32
 * @desc 服装名称的字体大小
 * @default 20
 * 
 * @param nameColor
 * @text 服装名称颜色
 * @parent nameSettings
 * @type string
 * @desc 服装名称的文字颜色（十六进制）
 * @default #ffffff
 * 
 * @param descriptionSettings
 * @text 服装描述设置
 * 
 * @param descriptionX
 * @text 服装描述X位置
 * @parent descriptionSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 服装描述的X位置（相对于详情区域）
 * @default 10
 * 
 * @param descriptionY
 * @text 服装描述Y位置
 * @parent descriptionSettings
 * @type number
 * @min -200
 * @max 400
 * @desc 服装描述的Y位置（相对于详情区域）
 * @default 50
 * 
 * @param descriptionFontSize
 * @text 服装描述字体大小
 * @parent descriptionSettings
 * @type number
 * @min 10
 * @max 28
 * @desc 服装描述的字体大小
 * @default 16
 * 
 * @param descriptionColor
 * @text 服装描述颜色
 * @parent descriptionSettings
 * @type string
 * @desc 服装描述的文字颜色（十六进制）
 * @default #cccccc
 *
 * @param clothes
 * @text 服装配置列表
 * @type struct<Cloth>[]
 * @desc 配置每套服装的预览、描述和对话肖像映射
 * @default []
 *
 * @command OpenWardrobe
 * @text 打开衣橱
 * @desc 打开衣橱窗口来选择和应用服装，并更新对话肖像
 */

/*~struct~Cloth:
 * @param name
 * @text 显示名称
 * @type text
 * @desc 在衣橱列表中显示的名称
 *
 * @param description
 * @text 描述
 * @type text
 * @desc 在详情区域显示的简短描述
 *
 * @param imageName
 * @text 角色精灵文件名
 * @type text
 * @desc img/characters/中的文件名，必须包含$前缀以支持3×4精灵表格
 *
 * @param previewCell
 * @text 预览格子索引
 * @type number
 * @min 0
 * @max 11
 * @desc 使用3×4网格中的哪个48×48格子作为预览（0-11）
 *
 * @param actorName
 * @text 对话角色名称
 * @type text
 * @desc 在显示文字→"名称"框中输入的名称，用于映射肖像
 *
 * @param faceName
 * @text 对话肖像文件名
 * @type text
 * @desc img/faces/中的文件名，无扩展名；肖像表格，默认使用格子0
 *
 * @param faceIndex
 * @text 肖像格子索引
 * @type number
 * @min 0
 * @desc 可选：使用面部表格中的哪个格子（基于0，每行4列）
 */

(() => {
  const pluginName = document.currentScript.src.split('/').pop().replace(/\.js$/, '');
  const params = PluginManager.parameters(pluginName);
  
  // 解析参数
  const backgroundImage = String(params['backgroundImage'] || '');
  const windowWidth = Number(params['windowWidth'] || 800);
  const windowHeight = Number(params['windowHeight'] || 600);
  const windowX = Number(params['windowX'] || -1);
  const windowY = Number(params['windowY'] || -1);
  const backgroundScaleX = Number(params['backgroundScaleX'] || 1.00);
  const backgroundScaleY = Number(params['backgroundScaleY'] || 1.00);
  const backgroundOffsetX = Number(params['backgroundOffsetX'] || 0);
  const backgroundOffsetY = Number(params['backgroundOffsetY'] || 0);
  
  // 网格设置
  const gridX = Number(params['gridX'] || 20);
  const gridY = Number(params['gridY'] || 60);
  const gridWidth = Number(params['gridWidth'] || 350);
  const gridHeight = Number(params['gridHeight'] || 500);
  const cellSize = Number(params['cellSize'] || 80);
  const rowSpacing = Number(params['rowSpacing'] || 8);
  const columnSpacing = Number(params['columnSpacing'] || 8);
  const columnsPerRow = Number(params['columnsPerRow'] || 4);
  const maxVisibleRows = Number(params['maxVisibleRows'] || 5);
  
  // 高光设置
  const highlightColor = String(params['highlightColor'] || '#ffcc00');
  const highlightOpacity = Number(params['highlightOpacity'] || 150);
  const highlightBorderWidth = Number(params['highlightBorderWidth'] || 3);
  const highlightBorderColor = String(params['highlightBorderColor'] || '#ff9900');
  const highlightCornerRadius = Number(params['highlightCornerRadius'] || 8);
  const highlightSize = Number(params['highlightSize'] || 0);
  
  // 动画设置
  const WALKING_FRAMES = [0, 1, 2, 1]; // 行走动画帧序列
  const ANIMATION_SPEED = 12; // 每帧动画持续的更新次数
  
  // 详情设置
  const detailX = Number(params['detailX'] || -1);
  const detailY = Number(params['detailY'] || 60);
  const detailWidth = Number(params['detailWidth'] || -1);
  const detailHeight = Number(params['detailHeight'] || 300);
  
  // 标题设置
  const titleText = String(params['titleText'] || '衣橱');
  const titleX = Number(params['titleX'] || 20);
  const titleY = Number(params['titleY'] || 20);
  const titleFontSize = Number(params['titleFontSize'] || 24);
  const titleColor = String(params['titleColor'] || '#ffffff');
  
  // 服装名称设置
  const nameX = Number(params['nameX'] || 10);
  const nameY = Number(params['nameY'] || 10);
  const nameFontSize = Number(params['nameFontSize'] || 20);
  const nameColor = String(params['nameColor'] || '#ffffff');
  
  // 服装描述设置
  const descriptionX = Number(params['descriptionX'] || 10);
  const descriptionY = Number(params['descriptionY'] || 50);
  const descriptionFontSize = Number(params['descriptionFontSize'] || 16);
  const descriptionColor = String(params['descriptionColor'] || '#cccccc');
  
  const CLOTHES = JSON.parse(params['clothes'] || '[]').map(s => JSON.parse(s));

  // 注册插件指令：打开衣橱
  PluginManager.registerCommand(pluginName, 'OpenWardrobe', () => {
    SceneManager.push(Scene_Wardrobe);
  });

  // Hook Game_Player.refresh 以持久化服装选择
  const _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    const sys = $gameSystem;
    const defaultActor = $gameParty.leader();
    const spriteName = sys._clothingName || defaultActor.characterName();
    this.setImage(spriteName, 0);
    this._followers.refresh();
  };

  // Hook对话肖像映射基于actorName和选择的服装
  const _Game_Message_faceName = Game_Message.prototype.faceName;
  Game_Message.prototype.faceName = function() {
    const orig = _Game_Message_faceName.call(this);
    const speaker = this.speakerName();
    const cloth = CLOTHES.find(c => c.imageName === $gameSystem._clothingName && c.actorName === speaker);
    return cloth && cloth.faceName ? cloth.faceName : orig;
  };
  const _Game_Message_faceIndex = Game_Message.prototype.faceIndex;
  Game_Message.prototype.faceIndex = function() {
    const origIndex = _Game_Message_faceIndex.call(this);
    const speaker = this.speakerName();
    const cloth = CLOTHES.find(c => c.imageName === $gameSystem._clothingName && c.actorName === speaker);
    return cloth && cloth.faceIndex != null ? Number(cloth.faceIndex) : origIndex;
  };

  // 场景：衣橱菜单
  class Scene_Wardrobe extends Scene_MenuBase {
    create() {
      Scene_MenuBase.prototype.create.call(this);
      this._selectedIndex = 0;
      this._scrollRow = 0;
      this._loadedCount = 0;
      this._animationFrame = 0;    // 当前动画帧索引
      this._animationCount = 0;    // 动画计时器
      this._animationCell = null;  // 当前动画中显示的格子
      this.createCustomBackground();
      this.createElements();
      this.preloadImages();
    }
    
    createCustomBackground() {
      if (backgroundImage) {
        this._customBackground = new Sprite();
        this._customBackground.bitmap = ImageManager.loadPicture(backgroundImage);
        this._customBackground.bitmap.addLoadListener(() => {
          this._customBackground.scale.x = backgroundScaleX;
          this._customBackground.scale.y = backgroundScaleY;
          this._customBackground.x = (Graphics.width - this._customBackground.width * backgroundScaleX) / 2 + backgroundOffsetX;
          this._customBackground.y = (Graphics.height - this._customBackground.height * backgroundScaleY) / 2 + backgroundOffsetY;
        });
        this.addChild(this._customBackground);
      }
    }
    
    createElements() {
      // 计算窗口位置
      const finalX = windowX === -1 ? (Graphics.width - windowWidth) / 2 : windowX;
      const finalY = windowY === -1 ? (Graphics.height - windowHeight) / 2 : windowY;
      
      // 创建主面板
      this._panelSprite = new Sprite();
      this._panelSprite.bitmap = new Bitmap(windowWidth, windowHeight);
      this._panelSprite.x = finalX;
      this._panelSprite.y = finalY;
      this.addChild(this._panelSprite);
      
      // 存储面板位置
      this._panelX = finalX;
      this._panelY = finalY;
      
      this.createTitle();
      this.createGridArea();
      this.createDetailArea();
    }
    
    createTitle() {
      this._titleSprite = new Sprite();
      this._titleSprite.bitmap = new Bitmap(windowWidth, 40);
      this._titleSprite.bitmap.fontFace = $gameSystem.mainFontFace();
      this._titleSprite.bitmap.fontSize = titleFontSize;
      this._titleSprite.bitmap.textColor = titleColor;
      this._titleSprite.bitmap.drawText(titleText, titleX, 0, windowWidth - titleX - 20, 40);
      this._titleSprite.x = this._panelX;
      this._titleSprite.y = this._panelY + titleY;
      this.addChild(this._titleSprite);
    }
    
    createGridArea() {
      // 网格容器
      this._gridContainer = new Sprite();
      this._gridContainer.x = this._panelX + gridX;
      this._gridContainer.y = this._panelY + gridY;
      this.addChild(this._gridContainer);
      
      // 高光精灵
      const finalHighlightSize = highlightSize > 0 ? highlightSize : cellSize;
      this._highlightSprite = new Sprite();
      this._highlightSprite.bitmap = new Bitmap(finalHighlightSize, finalHighlightSize);
      this._highlightSprite.visible = false;
      
      // 创建高光位图
      this.createHighlightBitmap();
      
      // 创建动画精灵
      this._animationSprite = new Sprite();
      this._animationSprite.bitmap = new Bitmap(cellSize, cellSize);
      this._animationSprite.visible = false;
      
      this._cellSprites = [];
    }
    
    createHighlightBitmap() {
      const bitmap = this._highlightSprite.bitmap;
      const finalHighlightSize = highlightSize > 0 ? highlightSize : cellSize;
      bitmap.clear();
      
      // 绘制圆角矩形高光
      const context = bitmap._context;
      if (context) {
        context.save();
        context.globalAlpha = highlightOpacity / 255;
        
        // 绘制圆角矩形
        context.beginPath();
        this.drawRoundedRect(context, 0, 0, finalHighlightSize, finalHighlightSize, highlightCornerRadius);
        context.fillStyle = highlightColor;
        context.fill();
        
        // 绘制边框
        if (highlightBorderWidth > 0) {
          context.lineWidth = highlightBorderWidth;
          context.strokeStyle = highlightBorderColor;
          context.stroke();
        }
        
        context.restore();
        // 使用更兼容的方式刷新位图
        if (bitmap._setDirty) {
          bitmap._setDirty();
        } else if (bitmap._baseTexture) {
          bitmap._baseTexture.update();
        }
      }
    }
    
    drawRoundedRect(context, x, y, width, height, radius) {
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
    }
    
    createDetailArea() {
      // 计算详情区域位置和大小
      const finalDetailX = detailX === -1 ? gridX + gridWidth + 40 : detailX;
      const finalDetailWidth = detailWidth === -1 ? windowWidth - finalDetailX - 20 : detailWidth;
      
      this._detailSprite = new Sprite();
      this._detailSprite.bitmap = new Bitmap(finalDetailWidth, detailHeight);
      this._detailSprite.x = this._panelX + finalDetailX;
      this._detailSprite.y = this._panelY + detailY;
      this.addChild(this._detailSprite);
    }
    
    preloadImages() {
      CLOTHES.forEach(cloth => {
        const bmp = ImageManager.loadCharacter(cloth.imageName);
        bmp.addLoadListener(() => {
          if (++this._loadedCount >= CLOTHES.length) {
            this.refreshGrid();
            this.refreshDetail();
          }
        });
      });
      
      if (CLOTHES.length === 0) {
        this.refreshGrid();
        this.refreshDetail();
      }
    }
    
    refreshGrid() {
      // 清除旧的格子精灵
      this._cellSprites.forEach(sprite => {
        this._gridContainer.removeChild(sprite);
      });
      this._cellSprites = [];
      
      // 移除高光和动画精灵（如果已添加）
      if (this._highlightSprite.parent) {
        this._gridContainer.removeChild(this._highlightSprite);
      }
      if (this._animationSprite.parent) {
        this._gridContainer.removeChild(this._animationSprite);
      }
      
      // 计算可见范围
      const startRow = this._scrollRow;
      const endRow = Math.min(startRow + maxVisibleRows, Math.ceil(CLOTHES.length / columnsPerRow));
      
      let cellIndex = 0;
      for (let row = startRow; row < endRow; row++) {
        for (let col = 0; col < columnsPerRow; col++) {
          const dataIndex = row * columnsPerRow + col;
          if (dataIndex >= CLOTHES.length) break;
          
          const cloth = CLOTHES[dataIndex];
          const x = col * (cellSize + columnSpacing);
          const y = (row - startRow) * (cellSize + rowSpacing);
          
          // 创建格子精灵
          const cellSprite = new Sprite();
          cellSprite.bitmap = new Bitmap(cellSize, cellSize);
          cellSprite.x = x;
          cellSprite.y = y;
          cellSprite._dataIndex = dataIndex;
          cellSprite._visibleIndex = cellIndex;  // 保存在可见列表中的索引
          
          // 绘制服装预览
          this.drawClothPreview(cellSprite, cloth);
          
          this._gridContainer.addChild(cellSprite);
          this._cellSprites.push(cellSprite);
          cellIndex++;
        }
      }
      
      // 添加高光和动画精灵到最上层
      this._gridContainer.addChild(this._highlightSprite);
      this._gridContainer.addChild(this._animationSprite);
      
      this.refreshSelection();
    }
    
    drawClothPreview(cellSprite, cloth) {
      const bitmap = cellSprite.bitmap;
      const bmp = ImageManager.loadCharacter(cloth.imageName);
      
      if (bmp.isReady()) {
        const cell = Number(cloth.previewCell) || 0;
        const sw = 48, sh = 48;
        const col = cell % 3;
        const row = Math.floor(cell / 3);
        const sx = col * sw;
        const sy = row * sh;
        
        // 将48x48的预览缩放到格子大小
        const scale = cellSize / 48;
        bitmap.blt(bmp, sx, sy, sw, sh, 0, 0, cellSize, cellSize);
      } else {
        bmp.addLoadListener(() => {
          this.drawClothPreview(cellSprite, cloth);
        });
      }
    }
    
    refreshSelection() {
      if (CLOTHES.length === 0) {
        this._highlightSprite.visible = false;
        this._animationSprite.visible = false;
        return;
      }
      
      // 先重置所有单元格的可见性
      this._cellSprites.forEach(sprite => {
        sprite.visible = true;
      });
      
      // 计算当前选中项在网格中的位置
      const currentRow = Math.floor(this._selectedIndex / columnsPerRow);
      const currentCol = this._selectedIndex % columnsPerRow;
      
      // 检查是否在可见范围内
      if (currentRow >= this._scrollRow && currentRow < this._scrollRow + maxVisibleRows) {
        const x = currentCol * (cellSize + columnSpacing);
        const y = (currentRow - this._scrollRow) * (cellSize + rowSpacing);
        
        // 计算高光居中偏移
        const finalHighlightSize = highlightSize > 0 ? highlightSize : cellSize;
        const offsetX = (cellSize - finalHighlightSize) / 2;
        const offsetY = (cellSize - finalHighlightSize) / 2;
        
        this._highlightSprite.x = x + offsetX;
        this._highlightSprite.y = y + offsetY;
        this._highlightSprite.visible = true;
        
        // 将动画精灵放在同样的位置
        this._animationSprite.x = x;
        this._animationSprite.y = y;
        this._animationSprite.visible = true;
        
        // 隐藏被选中的单元格精灵，这样动画精灵就不会被挡住
        // 找到匹配当前选中数据索引的单元格精灵
        const selectedSprite = this._cellSprites.find(sprite => sprite._dataIndex === this._selectedIndex);
        if (selectedSprite) {
          selectedSprite.visible = false;
        }
        
        // 如果选择变了，更新动画数据
        if (this._animationCell !== this._selectedIndex) {
          this._animationCell = this._selectedIndex;
          this._animationFrame = 0;
          this._animationCount = 0;
          this.updateAnimationFrame();
        }
      } else {
        this._highlightSprite.visible = false;
        this._animationSprite.visible = false;
      }
    }
    
    updateAnimationFrame() {
      const frameIndex = this._animationFrame % WALKING_FRAMES.length;
      const frame = WALKING_FRAMES[frameIndex];
      
      const cloth = CLOTHES[this._selectedIndex];
      const bmp = ImageManager.loadCharacter(cloth.imageName);
      
      if (bmp.isReady()) {
        const baseCell = Number(cloth.previewCell) || 0;
        const baseRow = Math.floor(baseCell / 3);  // 获取角色所在的行
        const sw = 48, sh = 48;
        
        // 使用行走动画帧（同一行的前三列）
        const sx = frame * sw;
        const sy = baseRow * sh;
        
        // 清除之前的内容
        this._animationSprite.bitmap.clear();
        
        // 绘制新的帧
        this._animationSprite.bitmap.blt(bmp, sx, sy, sw, sh, 0, 0, cellSize, cellSize);
      } else {
        bmp.addLoadListener(() => {
          this.updateAnimationFrame();
        });
      }
    }
    
    refreshDetail() {
      this._detailSprite.bitmap.clear();
      
      if (CLOTHES.length === 0 || this._selectedIndex >= CLOTHES.length) return;
      
      const cloth = CLOTHES[this._selectedIndex];
      this._detailSprite.bitmap.fontFace = $gameSystem.mainFontFace();
      
      // 绘制服装名称
      this._detailSprite.bitmap.fontSize = nameFontSize;
      this._detailSprite.bitmap.textColor = nameColor;
      this._detailSprite.bitmap.drawText(
        cloth.name || '未命名服装',
        nameX,
        nameY,
        this._detailSprite.bitmap.width - nameX - 10,
        30
      );
      
      // 绘制服装描述
      this._detailSprite.bitmap.fontSize = descriptionFontSize;
      this._detailSprite.bitmap.textColor = descriptionColor;
      
      const descText = cloth.description || '暂无描述';
      const descWidth = this._detailSprite.bitmap.width - descriptionX - 10;
      const descHeight = this._detailSprite.bitmap.height - descriptionY - 10;
      
      this.drawWrappedText(descText, descriptionX, descriptionY, descWidth, descHeight);
    }
    
    drawWrappedText(text, x, y, maxWidth, maxHeight) {
      const lineHeight = descriptionFontSize + 4;
      const words = text.split('');
      let currentLine = '';
      let currentY = y;
      
      for (let i = 0; i < words.length; i++) {
        const char = words[i];
        const testLine = currentLine + char;
        const width = this._detailSprite.bitmap.measureTextWidth(testLine);
        
        if (width > maxWidth && currentLine) {
          this._detailSprite.bitmap.drawText(currentLine, x, currentY, maxWidth, lineHeight);
          currentLine = char;
          currentY += lineHeight;
          if (currentY + lineHeight > y + maxHeight) break;
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine && currentY + lineHeight <= y + maxHeight) {
        this._detailSprite.bitmap.drawText(currentLine, x, currentY, maxWidth, lineHeight);
      }
    }
    
    update() {
      Scene_MenuBase.prototype.update.call(this);
      this.updateInput();
      this.updateAnimation();
    }
    
    updateInput() {
      if (Input.isTriggered('cancel')) {
        this.popScene();
        return;
      }
      
      if (Input.isTriggered('ok')) {
        this.onOk();
        return;
      }
      
      if (Input.isRepeated('up')) {
        this.moveCursor(-columnsPerRow);
      } else if (Input.isRepeated('down')) {
        this.moveCursor(columnsPerRow);
      } else if (Input.isRepeated('left')) {
        this.moveCursor(-1);
      } else if (Input.isRepeated('right')) {
        this.moveCursor(1);
      }
    }
    
    moveCursor(direction) {
      if (CLOTHES.length === 0) return;
      
      const newIndex = this._selectedIndex + direction;
      if (newIndex >= 0 && newIndex < CLOTHES.length) {
        this._selectedIndex = newIndex;
        
        // 检查是否需要滚动
        const currentRow = Math.floor(this._selectedIndex / columnsPerRow);
        
        if (currentRow < this._scrollRow) {
          // 向上滚动
          this._scrollRow = currentRow;
          this.refreshGrid();
        } else if (currentRow >= this._scrollRow + maxVisibleRows) {
          // 向下滚动
          this._scrollRow = currentRow - maxVisibleRows + 1;
          this.refreshGrid();
        } else {
          // 只需要更新选择
          this.refreshSelection();
        }
        
        this.refreshDetail();
        SoundManager.playCursor();
      }
    }
    
    onOk() {
      if (CLOTHES.length === 0) return;
      
      const item = CLOTHES[this._selectedIndex];
      $gameSystem._clothingName = item.imageName;
      $gamePlayer.setImage(item.imageName, 0);
      $gamePlayer.refresh();
      SoundManager.playOk();
      this.popScene();
    }
    
    updateAnimation() {
      if (this._animationSprite && this._animationSprite.visible) {
        this._animationCount++;
        if (this._animationCount >= ANIMATION_SPEED) {
          this._animationCount = 0;
          this._animationFrame++;
          this.updateAnimationFrame();
        }
      }
    }
  }
  
  window.Scene_Wardrobe = Scene_Wardrobe;
})();
