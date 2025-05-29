/*:
 * @target MZ
 * @plugindesc 好感度系统 v2.0.0 - 桌面风格好感度界面
 * @author Claude & SekiShiyo
 * @help
 * 
 * 这个插件添加了一个好感度系统，可以在主菜单中显示NPC好感度。
 * 好感度值通过游戏变量进行管理，可以在事件中通过改变变量来调整好感度。
 * 
 * 使用方法：
 * 1. 设置NPC信息，包括姓名、头像、简介、喜好和对应的变量ID
 * 2. 配置好感度图标和等级
 * 3. 在游戏中通过改变变量来调整好感度
 * 4. 按下设定的菜单键打开好感度界面
 * 
 * 新版本特性:
 * 1. 左侧角色列表，右侧角色详情的分离式UI
 * 2. 可自定义好感度心形图标
 * 3. 支持所有UI元素的位置和大小调整
 * 4. 详情界面展示角色介绍、喜好和最近动态
 * 5. 支持自定义UI颜色和字体大小
 * 
 * 插件命令：
 * 添加最近动态 - 为指定NPC添加最近动态记录
 * 标记已遇到NPC - 手动标记指定NPC为已遇到状态
 * 测试历史记录 - 添加一条测试历史记录
 * 
 * 历史记录功能：
 * 1. 自动记录所有NPC的最近动态变化，包含时间戳
 * 2. 支持从闲聊系统自动记录活动
 * 3. 可通过历史记录按钮查看所有历史记录
 * 4. 历史记录窗口支持滚动查看
 * 5. 可自定义历史记录的显示样式和位置
 * 6. 历史记录会自动保存到存档中
 * 
 * 使用方法：
 * 1. 在好感度界面中点击"历史记录"按钮
 * 2. 历史记录窗口会替换详情窗口显示
 * 3. 使用鼠标滚轮或上下键滚动查看
 * 4. 按ESC键或再次点击按钮返回详情界面
 * 
 * 键盘快捷键：
 * - 右方向键或Tab键：从详情界面进入历史记录窗口
 * - 左方向键或ESC键：从历史记录窗口返回详情界面
 * - ESC键：从详情界面退出好感度系统
 * - 上下方向键：在历史记录窗口中滚动
 * 
 * @param npcList
 * @text NPC列表
 * @type struct<NPC>[]
 * @desc 设置需要显示好感度的NPC列表
 * @default []
 * 
 * @param favorLevels
 * @text 好感度等级设置
 * @type struct<FavorLevel>[]
 * @desc 设置好感度等级和对应的图标
 * @default ["{\"value\":\"0\",\"icon\":\"87\",\"name\":\"陌生\"}","{\"value\":\"20\",\"icon\":\"84\",\"name\":\"认识\"}","{\"value\":\"40\",\"icon\":\"89\",\"name\":\"友好\"}","{\"value\":\"60\",\"icon\":\"73\",\"name\":\"信任\"}","{\"value\":\"80\",\"icon\":\"77\",\"name\":\"亲密\"}","{\"value\":\"100\",\"icon\":\"81\",\"name\":\"挚爱\"}"]
 * 
 * @param maxFavorValue
 * @text 最大好感度值
 * @type number
 * @desc 好感度的最大值
 * @default 100
 * 
 * @param menuCommand
 * @text 菜单命令设置
 * @type struct<MenuCommand>
 * @desc 主菜单中的命令设置
 * @default {"enable":"true","name":"好感度","menuSwitch":"0"}
 * 
 * @param metFlag
 * @text 已遇到标志
 * @type variable
 * @desc 用于标记已遇到NPC的变量ID(该变量将作为位标志使用，每个NPC对应一个位)
 * @default 1
 * 
 * @param debugMode
 * @text 调试模式
 * @type boolean
 * @desc 开启调试模式，显示更多信息
 * @default false
 * 
 * @param backgroundImage
 * @text 背景图片
 * @type file
 * @dir img/pictures
 * @desc 好感度界面背景图片
 * @default 
 * 
 * @param backgroundX
 * @text 背景图X位置
 * @type number
 * @desc 背景图X位置
 * @default 0
 * 
 * @param backgroundY
 * @text 背景图Y位置
 * @type number
 * @desc 背景图Y位置
 * @default 0
 * 
 * @param bgOpacity
 * @text 背景透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 背景图透明度 (0-255)
 * @default 255
 * 
 * @param bgScaleX
 * @text 背景X轴缩放
 * @type number
 * @decimals 2
 * @desc 背景图X轴缩放比例
 * @default 1.00
 * 
 * @param bgScaleY
 * @text 背景Y轴缩放
 * @type number
 * @decimals 2
 * @desc 背景图Y轴缩放比例
 * @default 1.00
 * 
 * @param listSettings
 * @text 列表窗口设置
 * 
 * @param listX
 * @text 角色列表X位置
 * @parent listSettings
 * @type number
 * @desc 角色列表X位置
 * @default 50
 * 
 * @param listY
 * @text 角色列表Y位置
 * @parent listSettings
 * @type number
 * @desc 角色列表Y位置
 * @default 100
 * 
 * @param listWidth
 * @text 角色列表宽度
 * @parent listSettings
 * @type number
 * @desc 角色列表宽度
 * @default 300
 * 
 * @param listHeight
 * @text 角色列表高度
 * @parent listSettings
 * @type number
 * @desc 角色列表高度
 * @default 400
 * 
 * @param listFontSize
 * @text 角色列表字体大小
 * @parent listSettings
 * @type number
 * @desc 角色列表字体大小
 * @default 20
 * 
 * @param lineHeight
 * @text 角色列表行高
 * @parent listSettings
 * @type number
 * @desc 固定的行高(像素)，影响角色列表中每项的高度
 * @default 60
 * 
 * @param maxVisibleNPCs
 * @text 最大可见角色数
 * @parent listSettings
 * @type number
 * @desc 角色列表上同时显示的最大角色数量，超过会自动滚动
 * @default 6
 * 
 * @param selectionHighlightColor
 * @text 高亮选择颜色
 * @parent listSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 选择角色时高亮的颜色(0-31的系统颜色索引)
 * @default 2
 * 
 * @param selectionHighlightOpacity
 * @text 高亮不透明度
 * @parent listSettings
 * @type number
 * @min 0
 * @max 255
 * @desc 高亮背景的不透明度(0-255)
 * @default 128
 * 
 * @param selectionHighlightPadding
 * @text 高亮内边距
 * @parent listSettings
 * @type number
 * @min 0
 * @max 10
 * @desc 高亮背景的内边距(0-10像素)
 * @default 2
 * 
 * @param portraitSize
 * @text 列表头像大小
 * @parent listSettings
 * @type number
 * @min 32
 * @max 144
 * @desc 列表中头像显示的大小(像素)
 * @default 48
 * 
 * @param nameColor
 * @text 角色名称颜色
 * @parent listSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 角色名称文字颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param nameX
 * @text 名称X偏移
 * @parent listSettings
 * @type number
 * @desc 名称相对于头像右侧的X偏移量
 * @default 10
 * 
 * @param nameY
 * @text 名称Y偏移
 * @parent listSettings
 * @type number
 * @min -30
 * @max 30
 * @desc 名称Y偏移量，负值向上移动，正值向下移动
 * @default -5
 * 
 * @param heartIconImage
 * @text 爱心图标图片
 * @parent listSettings
 * @type file
 * @dir img/pictures
 * @desc 爱心图标图片，显示在角色名称下方
 * @default 
 * 
 * @param heartIconWidth
 * @text 爱心图标宽度
 * @parent listSettings
 * @type number
 * @min 8
 * @max 48
 * @desc 爱心图标的宽度
 * @default 16
 * 
 * @param heartIconHeight
 * @text 爱心图标高度
 * @parent listSettings
 * @type number
 * @min 8
 * @max 48
 * @desc 爱心图标的高度
 * @default 16
 * 
 * @param heartIconX
 * @text 爱心图标X偏移
 * @parent listSettings
 * @type number
 * @desc 爱心图标相对于头像右侧的X偏移量
 * @default 10
 * 
 * @param heartIconY
 * @text 爱心图标Y偏移
 * @parent listSettings
 * @type number
 * @min -30
 * @max 30
 * @desc 爱心图标Y偏移量，负值向上移动，正值向下移动
 * @default -5
 * 
 * @param maxHeartIcons
 * @text 最大爱心数量
 * @parent listSettings
 * @type number
 * @min 1
 * @max 10
 * @desc 最多显示多少个爱心图标
 * @default 5
 * 
 * @param halfHeartThreshold
 * @text 半颗爱心阈值
 * @parent listSettings
 * @type number
 * @min 0
 * @max 100
 * @desc 显示半颗爱心的好感度阈值百分比(0-100)
 * @default 10
 * 
 * @param portraitScaleMode
 * @text 头像缩放模式
 * @type select
 * @option 截取居中方形
 * @value square
 * @option 保持原始比例
 * @value original
 * @desc 头像的缩放模式：截取居中方形(保持一致性但可能裁剪)或保持原始比例(完整显示但可能留白)
 * @default square
 * 
 * @param listItemSpacing
 * @text 列表项间距
 * @type number
 * @min 0
 * @max 20
 * @desc 角色列表中相邻两项之间的垂直间距(像素)
 * @default 5
 * 
 * @command RegisterRecentActivity
 * @text 添加最近动态
 * @desc 为指定的NPC添加最近动态记录
 * 
 * @arg npcName
 * @text NPC名称
 * @type string
 * @desc 需要添加最近动态的NPC名称
 * 
 * @arg activityText
 * @text 动态内容
 * @type multiline_string
 * @desc 最近动态的内容
 * 
 * @command MarkNPCasMet
 * @text 标记已遇到NPC
 * @desc 手动标记指定的NPC为已遇到状态
 * 
 * @arg npcName
 * @text NPC名称
 * @type string
 * @desc 需要标记为已遇到的NPC名称
 * 
 * @command TestHistoryRecord
 * @text 测试历史记录
 * @desc 添加一条测试历史记录
 * 
 * @arg npcName
 * @text NPC名称
 * @type string
 * @desc 测试用的NPC名称
 * @default 测试角色
 * 
 * @arg activityText
 * @text 活动内容
 * @type multiline_string
 * @desc 测试用的活动内容
 * @default 这是一条测试历史记录
 * 
 * @param detailSettings
 * @text 详情窗口设置
 * 
 * @param detailX
 * @text 角色详情X位置
 * @parent detailSettings
 * @type number
 * @desc 角色详情X位置
 * @default 400
 * 
 * @param detailY
 * @text 角色详情Y位置
 * @parent detailSettings
 * @type number
 * @desc 角色详情Y位置
 * @default 100
 * 
 * @param detailWidth
 * @text 角色详情宽度
 * @parent detailSettings
 * @type number
 * @desc 角色详情宽度
 * @default 400
 * 
 * @param detailHeight
 * @text 角色详情高度
 * @parent detailSettings
 * @type number
 * @desc 角色详情高度
 * @default 400
 * 
 * @param detailPortraitSize
 * @text 详情头像大小
 * @parent detailSettings
 * @type number
 * @min 64
 * @max 200
 * @desc 详情中头像显示的大小(像素)
 * @default 96
 * 
 * @param detailPortraitX
 * @text 详情头像X位置
 * @parent detailSettings
 * @type number
 * @desc 详情头像X位置
 * @default 20
 * 
 * @param detailPortraitY
 * @text 详情头像Y位置
 * @parent detailSettings
 * @type number
 * @desc 详情头像Y位置
 * @default 20
 * 
 * @param detailNameX
 * @text 详情名称X位置
 * @parent detailSettings
 * @type number
 * @desc 详情名称X位置
 * @default 130
 * 
 * @param detailNameY
 * @text 详情名称Y位置
 * @parent detailSettings
 * @type number
 * @desc 详情名称Y位置
 * @default 30
 * 
 * @param detailNameFontSize
 * @text 详情名称字体大小
 * @parent detailSettings
 * @type number
 * @min 16
 * @max 32
 * @desc 详情名称字体大小
 * @default 22
 * 
 * @param detailNameColor
 * @text 详情名称颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 详情名称颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param detailFavorBarX
 * @text 详情好感度条X位置
 * @parent detailSettings
 * @type number
 * @desc 详情好感度条X位置
 * @default 130
 * 
 * @param detailFavorBarY
 * @text 详情好感度条Y位置
 * @parent detailSettings
 * @type number
 * @desc 详情好感度条Y位置
 * @default 60
 * 
 * @param detailFavorBarWidth
 * @text 详情好感度条宽度
 * @parent detailSettings
 * @type number
 * @desc 详情好感度条宽度
 * @default 250
 * 
 * @param detailFavorBarHeight
 * @text 详情好感度条高度
 * @parent detailSettings
 * @type number
 * @desc 详情好感度条高度
 * @default 20
 * 
 * @param detailFavorTextX
 * @text 详情好感度文本X位置
 * @parent detailSettings
 * @type number
 * @desc 详情好感度文本X位置
 * @default 130
 * 
 * @param detailFavorTextY
 * @text 详情好感度文本Y位置
 * @parent detailSettings
 * @type number
 * @desc 详情好感度文本Y位置
 * @default 85
 * 
 * @param detailFavorTextFontSize
 * @text 详情好感度文本字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 详情好感度文本字体大小
 * @default 16
 * 
 * @param introTitle
 * @text 介绍标题
 * @parent detailSettings
 * @type string
 * @desc 角色介绍标题文本
 * @default 角色介绍
 * 
 * @param introTitleX
 * @text 介绍标题X位置
 * @parent detailSettings
 * @type number
 * @desc 介绍标题X位置
 * @default 20
 * 
 * @param introTitleY
 * @text 介绍标题Y位置
 * @parent detailSettings
 * @type number
 * @desc 介绍标题Y位置
 * @default 130
 * 
 * @param introTitleFontSize
 * @text 介绍标题字体大小
 * @parent detailSettings
 * @type number
 * @min 16
 * @max 28
 * @desc 介绍标题字体大小
 * @default 18
 * 
 * @param introTitleColor
 * @text 介绍标题颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 介绍标题颜色(0-31的系统颜色索引)
 * @default 1
 * 
 * @param introX
 * @text 介绍内容X位置
 * @parent detailSettings
 * @type number
 * @desc 介绍内容X位置
 * @default 25
 * 
 * @param introY
 * @text 介绍内容Y位置
 * @parent detailSettings
 * @type number
 * @desc 介绍内容Y位置
 * @default 155
 * 
 * @param introFontSize
 * @text 介绍内容字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 介绍内容字体大小
 * @default 16
 * 
 * @param introColor
 * @text 介绍内容颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 介绍内容颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param introWidth
 * @text 介绍内容宽度
 * @parent detailSettings
 * @type number
 * @desc 介绍内容宽度
 * @default 360
 * 
 * @param likesTitle
 * @text 喜好标题
 * @parent detailSettings
 * @type string
 * @desc 角色喜好标题文本
 * @default 喜好
 * 
 * @param likesTitleX
 * @text 喜好标题X位置
 * @parent detailSettings
 * @type number
 * @desc 喜好标题X位置
 * @default 20
 * 
 * @param likesTitleY
 * @text 喜好标题Y位置
 * @parent detailSettings
 * @type number
 * @desc 喜好标题Y位置
 * @default 220
 * 
 * @param likesTitleFontSize
 * @text 喜好标题字体大小
 * @parent detailSettings
 * @type number
 * @min 16
 * @max 28
 * @desc 喜好标题字体大小
 * @default 18
 * 
 * @param likesTitleColor
 * @text 喜好标题颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 喜好标题颜色(0-31的系统颜色索引)
 * @default 1
 * 
 * @param likesX
 * @text 喜好内容X位置
 * @parent detailSettings
 * @type number
 * @desc 喜好内容X位置
 * @default 25
 * 
 * @param likesY
 * @text 喜好内容Y位置
 * @parent detailSettings
 * @type number
 * @desc 喜好内容Y位置
 * @default 245
 * 
 * @param likesFontSize
 * @text 喜好内容字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 喜好内容字体大小
 * @default 16
 * 
 * @param likesColor
 * @text 喜好内容颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 喜好内容颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param likesWidth
 * @text 喜好内容宽度
 * @parent detailSettings
 * @type number
 * @desc 喜好内容宽度
 * @default 360
 * 
 * @param statusTitle
 * @text 状态标题
 * @parent detailSettings
 * @type string
 * @desc 角色状态标题文本
 * @default 状态
 * 
 * @param statusTitleX
 * @text 状态标题X位置
 * @parent detailSettings
 * @type number
 * @desc 状态标题X位置
 * @default 20
 * 
 * @param statusTitleY
 * @text 状态标题Y位置
 * @parent detailSettings
 * @type number
 * @desc 状态标题Y位置
 * @default 280
 * 
 * @param statusTitleFontSize
 * @text 状态标题字体大小
 * @parent detailSettings
 * @type number
 * @min 16
 * @max 28
 * @desc 状态标题字体大小
 * @default 18
 * 
 * @param statusTitleColor
 * @text 状态标题颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 状态标题颜色(0-31的系统颜色索引)
 * @default 1
 * 
 * @param statusX
 * @text 状态内容X位置
 * @parent detailSettings
 * @type number
 * @desc 状态内容X位置
 * @default 25
 * 
 * @param statusY
 * @text 状态内容Y位置
 * @parent detailSettings
 * @type number
 * @desc 状态内容Y位置
 * @default 305
 * 
 * @param statusFontSize
 * @text 状态内容字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 状态内容字体大小
 * @default 16
 * 
 * @param statusColor
 * @text 状态内容颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 状态内容颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param statusWidth
 * @text 状态内容宽度
 * @parent detailSettings
 * @type number
 * @desc 状态内容宽度
 * @default 360
 * 
 * @param recentTitle
 * @text 最近动态标题
 * @parent detailSettings
 * @type string
 * @desc 最近动态标题文本
 * @default 最近动态
 * 
 * @param recentTitleX
 * @text 最近动态标题X位置
 * @parent detailSettings
 * @type number
 * @desc 最近动态标题X位置
 * @default 20
 * 
 * @param recentTitleY
 * @text 最近动态标题Y位置
 * @parent detailSettings
 * @type number
 * @desc 最近动态标题Y位置
 * @default 340
 * 
 * @param recentTitleFontSize
 * @text 最近动态标题字体大小
 * @parent detailSettings
 * @type number
 * @min 16
 * @max 28
 * @desc 最近动态标题字体大小
 * @default 18
 * 
 * @param recentTitleColor
 * @text 最近动态标题颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 最近动态标题颜色(0-31的系统颜色索引)
 * @default 1
 * 
 * @param recentX
 * @text 最近动态内容X位置
 * @parent detailSettings
 * @type number
 * @desc 最近动态内容X位置
 * @default 25
 * 
 * @param recentY
 * @text 最近动态内容Y位置
 * @parent detailSettings
 * @type number
 * @desc 最近动态内容Y位置
 * @default 365
 * 
 * @param recentFontSize
 * @text 最近动态内容字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 最近动态内容字体大小
 * @default 16
 * 
 * @param recentColor
 * @text 最近动态内容颜色
 * @parent detailSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 最近动态内容颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param recentWidth
 * @text 最近动态内容宽度
 * @parent detailSettings
 * @type number
 * @desc 最近动态内容宽度
 * @default 360
 * 
 * @param historyButtonSettings
 * @text 历史记录按钮设置
 * 
 * @param showHistoryButton
 * @text 显示历史记录按钮
 * @parent historyButtonSettings
 * @type boolean
 * @desc 是否显示历史记录按钮
 * @default true
 * 
 * @param historyButtonText
 * @text 历史记录按钮文本
 * @parent historyButtonSettings
 * @type string
 * @desc 历史记录按钮显示的文本
 * @default 历史记录
 * 
 * @param historyButtonX
 * @text 历史记录按钮X位置
 * @parent historyButtonSettings
 * @type number
 * @desc 历史记录按钮X位置
 * @default 20
 * 
 * @param historyButtonY
 * @text 历史记录按钮Y位置
 * @parent historyButtonSettings
 * @type number
 * @desc 历史记录按钮Y位置
 * @default 400
 * 
 * @param historyButtonWidth
 * @text 历史记录按钮宽度
 * @parent historyButtonSettings
 * @type number
 * @desc 历史记录按钮宽度
 * @default 100
 * 
 * @param historyButtonHeight
 * @text 历史记录按钮高度
 * @parent historyButtonSettings
 * @type number
 * @desc 历史记录按钮高度
 * @default 30
 * 
 * @param historyButtonFontSize
 * @text 历史记录按钮字体大小
 * @parent historyButtonSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 历史记录按钮字体大小
 * @default 16
 * 
 * @param historyButtonColor
 * @text 历史记录按钮字体颜色
 * @parent historyButtonSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 历史记录按钮字体颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param historyWindowSettings
 * @text 历史记录窗口设置
 * 
 * @param historyWindowX
 * @text 历史记录窗口X位置
 * @parent historyWindowSettings
 * @type number
 * @desc 历史记录窗口X位置
 * @default 400
 * 
 * @param historyWindowY
 * @text 历史记录窗口Y位置
 * @parent historyWindowSettings
 * @type number
 * @desc 历史记录窗口Y位置
 * @default 100
 * 
 * @param historyWindowWidth
 * @text 历史记录窗口宽度
 * @parent historyWindowSettings
 * @type number
 * @desc 历史记录窗口宽度
 * @default 400
 * 
 * @param historyWindowHeight
 * @text 历史记录窗口高度
 * @parent historyWindowSettings
 * @type number
 * @desc 历史记录窗口高度
 * @default 400
 * 
 * @param historyTitleFontSize
 * @text 历史记录标题字体大小
 * @parent historyWindowSettings
 * @type number
 * @min 16
 * @max 32
 * @desc 历史记录标题字体大小
 * @default 20
 * 
 * @param historyTitleColor
 * @text 历史记录标题字体颜色
 * @parent historyWindowSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 历史记录标题字体颜色(0-31的系统颜色索引)
 * @default 1
 * 
 * @param historyContentFontSize
 * @text 历史记录内容字体大小
 * @parent historyWindowSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 历史记录内容字体大小
 * @default 14
 * 
 * @param historyContentColor
 * @text 历史记录内容字体颜色
 * @parent historyWindowSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 历史记录内容字体颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param historyTimeFontSize
 * @text 历史记录时间字体大小
 * @parent historyWindowSettings
 * @type number
 * @min 10
 * @max 20
 * @desc 历史记录时间字体大小
 * @default 12
 * 
 * @param historyTimeColor
 * @text 历史记录时间字体颜色
 * @parent historyWindowSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 历史记录时间字体颜色(0-31的系统颜色索引)
 * @default 8
 * 
 * @param historyTimeX
 * @text 历史记录时间X偏移
 * @parent historyWindowSettings
 * @type number
 * @desc 历史记录时间相对于内容的X偏移量
 * @default 20
 * 
 * @param historyTimeY
 * @text 历史记录时间Y偏移
 * @parent historyWindowSettings
 * @type number
 * @min -20
 * @max 20
 * @desc 历史记录时间相对于内容的Y偏移量
 * @default 5
 * 
 * @param maxHistoryEntries
 * @text 最大历史记录条数
 * @parent historyWindowSettings
 * @type number
 * @min 10
 * @max 1000
 * @desc 最多保存多少条历史记录
 * @default 100
 * 
 * @param detailButtonSettings
 * @text 角色详情按钮设置
 * 
 * @param showDetailButton
 * @text 显示角色详情按钮
 * @parent detailButtonSettings
 * @type boolean
 * @desc 是否显示角色详情按钮
 * @default true
 * 
 * @param detailButtonText
 * @text 角色详情按钮文本
 * @parent detailButtonSettings
 * @type string
 * @desc 角色详情按钮显示的文本
 * @default 角色详情
 * 
 * @param detailButtonX
 * @text 角色详情按钮X位置
 * @parent detailButtonSettings
 * @type number
 * @desc 角色详情按钮X位置
 * @default 130
 * 
 * @param detailButtonY
 * @text 角色详情按钮Y位置
 * @parent detailButtonSettings
 * @type number
 * @desc 角色详情按钮Y位置
 * @default 400
 * 
 * @param detailButtonWidth
 * @text 角色详情按钮宽度
 * @parent detailButtonSettings
 * @type number
 * @desc 角色详情按钮宽度
 * @default 100
 * 
 * @param detailButtonHeight
 * @text 角色详情按钮高度
 * @parent detailButtonSettings
 * @type number
 * @desc 角色详情按钮高度
 * @default 30
 * 
 * @param detailButtonFontSize
 * @text 角色详情按钮字体大小
 * @parent detailButtonSettings
 * @type number
 * @min 12
 * @max 24
 * @desc 角色详情按钮字体大小
 * @default 16
 * 
 * @param detailButtonColor
 * @text 角色详情按钮字体颜色
 * @parent detailButtonSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 角色详情按钮字体颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param buttonHighlightColor
 * @text 按钮高亮颜色
 * @parent detailButtonSettings
 * @type number
 * @min 0
 * @max 31
 * @desc 选中按钮的高亮颜色(0-31的系统颜色索引)
 * @default 2
 * 
 * @param historyScrollSettings
 * @text 历史记录滚动设置
 * 
 * @param maxVisibleHistoryEntries
 * @text 最大可见历史记录条数
 * @parent historyScrollSettings
 * @type number
 * @min 1
 * @max 20
 * @desc 历史记录窗口同时显示的最大条目数量，超过会自动滚动
 * @default 5
 * 
 * @param historyEntrySpacing
 * @text 历史记录条目间距
 * @parent historyScrollSettings
 * @type number
 * @min 0
 * @max 50
 * @desc 历史记录条目之间的垂直间距(像素)
 * @default 15
 * 
 * @param historyWindowSettings
 * @text 历史记录窗口设置
 */

/*~struct~NPC:
 * @param name
 * @text NPC姓名
 * @type string
 * @desc NPC的姓名
 * 
 * @param faceName
 * @text 头像文件名
 * @type file
 * @dir img/faces/
 * @desc NPC的头像文件名(存放在img/faces/目录下)
 * 
 * @param faceIndex
 * @text 头像索引
 * @type number
 * @min 0
 * @max 7
 * @desc 头像在头像集中的索引(0-7)
 * @default 0
 * 
 * @param variableId
 * @text 变量ID
 * @type variable
 * @desc 用于存储该NPC好感度的变量ID
 * 
 * @param introduction
 * @text 角色介绍
 * @type note
 * @desc 角色的详细介绍
 * @default "这是一个角色的介绍。"
 * 
 * @param likes
 * @text 角色喜好
 * @type note
 * @desc 角色的喜好
 * @default "这个角色喜欢的东西。"
 * 
 * @param status
 * @text 角色状态
 * @type note
 * @desc 角色的当前状态（该字段将自动显示当前好感度等级）
 * @default ""
 * 
 * @param recentActivity
 * @text 最近动态
 * @type note
 * @desc 角色的最近动态（可通过插件命令"添加最近动态"自动更新）
 * @default ""
 */

/*~struct~FavorLevel:
 * @param value
 * @text 好感度值
 * @type number
 * @min 0
 * @desc 达到该等级所需的好感度值
 * 
 * @param icon
 * @text 图标ID
 * @type number
 * @desc 该等级对应的图标ID
 * 
 * @param name
 * @text 等级名称
 * @type string
 * @desc 该好感度等级的名称
 */

/*~struct~MenuCommand:
 * @param enable
 * @text 启用菜单命令
 * @type boolean
 * @desc 是否在主菜单中添加好感度命令
 * @default true
 * 
 * @param name
 * @text 命令名称
 * @type string
 * @desc 主菜单中显示的命令名称
 * @default 好感度
 * 
 * @param menuSwitch
 * @text 菜单开关
 * @type switch
 * @desc 控制菜单命令显示的开关ID(设为0则总是显示)
 * @default 0
 */

(function() {
    'use strict';
    
    // 插件名称常量
    const PLUGIN_NAME = "FavorSystem";
    
    // 全局设置存储对象
    window.FavorSystem = {};
    
    //=============================================================================
    // 插件参数处理
    //=============================================================================
    const parameters = PluginManager.parameters(PLUGIN_NAME);
    
    // 解析JSON结构参数
    const parseStructParam = function(paramString) {
        try {
            return JSON.parse(paramString);
        } catch (e) {
            return {};
        }
    };
    
    const parseStructArrayParam = function(paramString) {
        try {
            return JSON.parse(paramString).map(item => parseStructParam(item));
        } catch (e) {
            return [];
        }
    };
    
    // 初始化参数
    FavorSystem.settings = {
    // NPC列表
        npcList: parseStructArrayParam(parameters['npcList'] || '[]'),
    
    // 好感度等级
        favorLevels: parseStructArrayParam(parameters['favorLevels'] || '[]')
            .sort((a, b) => Number(a.value) - Number(b.value)),
    
    // 最大好感度值
        maxFavorValue: Number(parameters['maxFavorValue'] || 100),
    
    // 菜单命令设置
        menuCommand: parseStructParam(parameters['menuCommand'] || '{}'),
    
    // 已遇到标志变量ID
        metFlagVarId: Number(parameters['metFlag'] || 1),
    
    // 调试模式
        debugMode: parameters['debugMode'] === 'true',
        
        // 背景设置
        backgroundImage: String(parameters['backgroundImage'] || ''),
        backgroundX: Number(parameters['backgroundX'] || 0),
        backgroundY: Number(parameters['backgroundY'] || 0),
        bgOpacity: Number(parameters['bgOpacity'] || 255),
        bgScaleX: Number(parameters['bgScaleX'] || 1.0),
        bgScaleY: Number(parameters['bgScaleY'] || 1.0),
        
        // 列表窗口设置
        listX: Number(parameters['listX'] || 50),
        listY: Number(parameters['listY'] || 100),
        listWidth: Number(parameters['listWidth'] || 300),
        listHeight: Number(parameters['listHeight'] || 400),
        listFontSize: Number(parameters['listFontSize'] || 20),
        lineHeight: Number(parameters['lineHeight'] || 60),
        maxVisibleNPCs: Number(parameters['maxVisibleNPCs'] || 6),
        
        // 选择高亮设置
        selectionHighlightColor: Number(parameters['selectionHighlightColor'] || 2),
        selectionHighlightOpacity: Number(parameters['selectionHighlightOpacity'] || 128),
        selectionHighlightPadding: Number(parameters['selectionHighlightPadding'] || 2),
        
        // 列表项设置
        portraitSize: Number(parameters['portraitSize'] || 48),
        nameColor: Number(parameters['nameColor'] || 0),
        nameX: Number(parameters['nameX'] || 10),
        nameY: Number(parameters['nameY'] || -5),
        
        // 爱心图标设置
        heartIconImage: String(parameters['heartIconImage'] || ''),
        heartIconWidth: Number(parameters['heartIconWidth'] || 16),
        heartIconHeight: Number(parameters['heartIconHeight'] || 16),
        heartIconX: Number(parameters['heartIconX'] || 10),
        heartIconY: Number(parameters['heartIconY'] || -5),
        maxHeartIcons: Number(parameters['maxHeartIcons'] || 5),
        halfHeartThreshold: Number(parameters['halfHeartThreshold'] || 10),
        
        // 详情窗口设置
        detailX: Number(parameters['detailX'] || 400),
        detailY: Number(parameters['detailY'] || 100),
        detailWidth: Number(parameters['detailWidth'] || 400),
        detailHeight: Number(parameters['detailHeight'] || 400),
        
        // 详情头像设置
        detailPortraitSize: Number(parameters['detailPortraitSize'] || 96),
        detailPortraitX: Number(parameters['detailPortraitX'] || 20),
        detailPortraitY: Number(parameters['detailPortraitY'] || 20),
        
        // 详情名称设置
        detailNameX: Number(parameters['detailNameX'] || 130),
        detailNameY: Number(parameters['detailNameY'] || 30),
        detailNameFontSize: Number(parameters['detailNameFontSize'] || 22),
        detailNameColor: Number(parameters['detailNameColor'] || 0),
        
        // 详情好感度条设置
        detailFavorBarX: Number(parameters['detailFavorBarX'] || 130),
        detailFavorBarY: Number(parameters['detailFavorBarY'] || 60),
        detailFavorBarWidth: Number(parameters['detailFavorBarWidth'] || 250),
        detailFavorBarHeight: Number(parameters['detailFavorBarHeight'] || 20),
        detailFavorTextX: Number(parameters['detailFavorTextX'] || 130),
        detailFavorTextY: Number(parameters['detailFavorTextY'] || 85),
        detailFavorTextFontSize: Number(parameters['detailFavorTextFontSize'] || 16),
        
        // 介绍设置
        introTitle: String(parameters['introTitle'] || '角色介绍'),
        introTitleX: Number(parameters['introTitleX'] || 20),
        introTitleY: Number(parameters['introTitleY'] || 130),
        introTitleFontSize: Number(parameters['introTitleFontSize'] || 18),
        introTitleColor: Number(parameters['introTitleColor'] || 1),
        introX: Number(parameters['introX'] || 25),
        introY: Number(parameters['introY'] || 155),
        introFontSize: Number(parameters['introFontSize'] || 16),
        introColor: Number(parameters['introColor'] || 0),
        introWidth: Number(parameters['introWidth'] || 360),
        
        // 喜好设置
        likesTitle: String(parameters['likesTitle'] || '喜好'),
        likesTitleX: Number(parameters['likesTitleX'] || 20),
        likesTitleY: Number(parameters['likesTitleY'] || 220),
        likesTitleFontSize: Number(parameters['likesTitleFontSize'] || 18),
        likesTitleColor: Number(parameters['likesTitleColor'] || 1),
        likesX: Number(parameters['likesX'] || 25),
        likesY: Number(parameters['likesY'] || 245),
        likesFontSize: Number(parameters['likesFontSize'] || 16),
        likesColor: Number(parameters['likesColor'] || 0),
        likesWidth: Number(parameters['likesWidth'] || 360),
        
        // 状态设置
        statusTitle: String(parameters['statusTitle'] || '状态'),
        statusTitleX: Number(parameters['statusTitleX'] || 20),
        statusTitleY: Number(parameters['statusTitleY'] || 280),
        statusTitleFontSize: Number(parameters['statusTitleFontSize'] || 18),
        statusTitleColor: Number(parameters['statusTitleColor'] || 1),
        statusX: Number(parameters['statusX'] || 25),
        statusY: Number(parameters['statusY'] || 305),
        statusFontSize: Number(parameters['statusFontSize'] || 16),
        statusColor: Number(parameters['statusColor'] || 0),
        statusWidth: Number(parameters['statusWidth'] || 360),
        
        // 最近动态设置
        recentTitle: String(parameters['recentTitle'] || '最近动态'),
        recentTitleX: Number(parameters['recentTitleX'] || 20),
        recentTitleY: Number(parameters['recentTitleY'] || 340),
        recentTitleFontSize: Number(parameters['recentTitleFontSize'] || 18),
        recentTitleColor: Number(parameters['recentTitleColor'] || 1),
        recentX: Number(parameters['recentX'] || 25),
        recentY: Number(parameters['recentY'] || 365),
        recentFontSize: Number(parameters['recentFontSize'] || 16),
        recentColor: Number(parameters['recentColor'] || 0),
        recentWidth: Number(parameters['recentWidth'] || 360),
        
        // 头像缩放模式
        portraitScaleMode: String(parameters['portraitScaleMode'] || 'square'),
        
        // 列表项间距
        listItemSpacing: Number(parameters['listItemSpacing'] || 5),
        
        // 历史记录按钮设置
        showHistoryButton: parameters['showHistoryButton'] === 'true',
        historyButtonText: String(parameters['historyButtonText'] || '历史记录'),
        historyButtonX: Number(parameters['historyButtonX'] || 20),
        historyButtonY: Number(parameters['historyButtonY'] || 400),
        historyButtonWidth: Number(parameters['historyButtonWidth'] || 100),
        historyButtonHeight: Number(parameters['historyButtonHeight'] || 30),
        historyButtonFontSize: Number(parameters['historyButtonFontSize'] || 16),
        historyButtonColor: Number(parameters['historyButtonColor'] || 0),
        
        // 历史记录窗口设置
        historyWindowX: Number(parameters['historyWindowX'] || 400),
        historyWindowY: Number(parameters['historyWindowY'] || 100),
        historyWindowWidth: Number(parameters['historyWindowWidth'] || 400),
        historyWindowHeight: Number(parameters['historyWindowHeight'] || 400),
        historyTitleFontSize: Number(parameters['historyTitleFontSize'] || 20),
        historyTitleColor: Number(parameters['historyTitleColor'] || 1),
        historyContentFontSize: Number(parameters['historyContentFontSize'] || 14),
        historyContentColor: Number(parameters['historyContentColor'] || 0),
        historyTimeFontSize: Number(parameters['historyTimeFontSize'] || 12),
        historyTimeColor: Number(parameters['historyTimeColor'] || 8),
        historyTimeX: Number(parameters['historyTimeX'] || 20),
        historyTimeY: Number(parameters['historyTimeY'] || 5),
        maxHistoryEntries: Number(parameters['maxHistoryEntries'] || 100),
        
        // 角色详情按钮设置
        showDetailButton: parameters['showDetailButton'] === 'true',
        detailButtonText: String(parameters['detailButtonText'] || '角色详情'),
        detailButtonX: Number(parameters['detailButtonX'] || 130),
        detailButtonY: Number(parameters['detailButtonY'] || 400),
        detailButtonWidth: Number(parameters['detailButtonWidth'] || 100),
        detailButtonHeight: Number(parameters['detailButtonHeight'] || 30),
        detailButtonFontSize: Number(parameters['detailButtonFontSize'] || 16),
        detailButtonColor: Number(parameters['detailButtonColor'] || 0),
        buttonHighlightColor: Number(parameters['buttonHighlightColor'] || 2),
        
        // 历史记录滚动设置
        maxVisibleHistoryEntries: Number(parameters['maxVisibleHistoryEntries'] || 5),
        historyEntrySpacing: Number(parameters['historyEntrySpacing'] || 15)
    };
    
    // 分解常用设置
    const enableMenuCommand = FavorSystem.settings.menuCommand.enable === 'true';
    const menuCommandName = String(FavorSystem.settings.menuCommand.name || '好感度');
    const menuSwitchId = Number(FavorSystem.settings.menuCommand.menuSwitch || 0);
    
    //=============================================================================
    // 插件命令注册
    //=============================================================================
    
    // MZ风格的插件命令注册函数
    PluginManager.registerCommand(PLUGIN_NAME, "RegisterRecentActivity", function(args) {
        const npcName = String(args.npcName || "");
        const activityText = String(args.activityText || "");
        
        if (FavorSystem.settings.debugMode) {
            console.log(`插件命令 RegisterRecentActivity 被调用, NPC名称: "${npcName}", 动态内容: "${activityText}"`);
        }
        
        if (npcName && activityText) {
            FavorSystem.Manager.setRecentActivity(npcName, activityText);
        } else {
            if (FavorSystem.settings.debugMode) {
                console.warn("RegisterRecentActivity 命令参数无效: 需要NPC名称和动态内容");
            }
        }
    });
    
    PluginManager.registerCommand(PLUGIN_NAME, "MarkNPCasMet", function(args) {
        const npcName = String(args.npcName || "");
        
        if (npcName) {
            // 直接传递名称给markNPCasMet方法
            FavorSystem.Manager.markNPCasMet(npcName);
        }
    });
    
    PluginManager.registerCommand(PLUGIN_NAME, "TestHistoryRecord", function(args) {
        const npcName = String(args.npcName || "测试角色");
        const activityText = String(args.activityText || "这是一条测试历史记录");
        
        if (FavorSystem.settings.debugMode) {
            console.log(`插件命令 TestHistoryRecord 被调用, NPC名称: "${npcName}", 活动内容: "${activityText}"`);
        }
        
        if (npcName && activityText) {
            FavorSystem.Manager.addTestHistoryRecord(npcName, activityText);
        } else {
            if (FavorSystem.settings.debugMode) {
                console.warn("TestHistoryRecord 命令参数无效: 需要NPC名称和活动内容");
            }
        }
    });
    
    //=============================================================================
    // 好感度管理器
    //=============================================================================
    FavorSystem.Manager = {
        // 存储所有NPC的最近动态
        _recentActivities: {},
        
        // 存储历史记录
        _activityHistory: [],
        
        getNPCList: function() {
            return FavorSystem.settings.npcList;
        },
        
        getFavorValue: function(npcIndex) {
            if (npcIndex >= 0 && npcIndex < FavorSystem.settings.npcList.length) {
                const variableId = Number(FavorSystem.settings.npcList[npcIndex].variableId);
            return $gameVariables.value(variableId);
        }
        return 0;
        },
        
        getFavorLevel: function(value) {
            let level = FavorSystem.settings.favorLevels[0];
            for (const lv of FavorSystem.settings.favorLevels) {
            if (value >= Number(lv.value)) {
                level = lv;
            } else {
                break;
            }
        }
        return level;
        },
    
        getFavorLevelName: function(value) {
        const level = this.getFavorLevel(value);
        return level ? level.name : '';
        },
    
        getFavorIcon: function(value) {
        const level = this.getFavorLevel(value);
        return level ? Number(level.icon) : 0;
        },
        
        getMaxFavorValue: function() {
            return FavorSystem.settings.maxFavorValue;
        },
    
    // 检查是否已经遇到过NPC
        hasMetNPC: function(npcIndex) {
            if (FavorSystem.settings.metFlagVarId <= 0) return true; // 如果没有设置变量ID，则默认所有NPC都已遇到
        
            const metFlag = $gameVariables.value(FavorSystem.settings.metFlagVarId) || 0;
        const bitFlag = 1 << npcIndex;
        return (metFlag & bitFlag) !== 0;
        },
    
    // 标记已遇到NPC
        markNPCasMet: function(npcIndex) {
            if (FavorSystem.settings.metFlagVarId <= 0) return; // 如果没有设置变量ID，则不进行标记
            
            // 如果传入的是名称字符串，先查找对应的索引
            if (typeof npcIndex === 'string') {
                const name = npcIndex;
                npcIndex = this.getNPCList().findIndex(npc => npc.name === name);
            }
            
            // 检查索引是否有效
            if (npcIndex < 0 || npcIndex >= this.getNPCList().length) {
                if (FavorSystem.settings.debugMode) {
                    console.log(`无法标记NPC: 索引无效 [${npcIndex}]`);
                }
                return;
            }
            
            const metFlag = $gameVariables.value(FavorSystem.settings.metFlagVarId) || 0;
        const bitFlag = 1 << npcIndex;
            $gameVariables.setValue(FavorSystem.settings.metFlagVarId, metFlag | bitFlag);
            
            if (FavorSystem.settings.debugMode) {
                console.log(`已手动标记NPC[${this.getNPCList()[npcIndex].name}]为已遇到`);
            }
        },
    
    // 获取已遇到的NPC列表
        getMetNPCList: function() {
        return this.getNPCList().filter((_, index) => this.hasMetNPC(index));
        },
        
        // 获取爱心图标显示数量
        getHeartIconCount: function(favorValue, maxFavorValue) {
            const heartCount = FavorSystem.settings.maxHeartIcons;
            if (!favorValue || !maxFavorValue) return 0;
            
            // 计算应该展示多少爱心
            const ratio = favorValue / maxFavorValue;
            const fullHearts = Math.floor(ratio * heartCount);
            
            return fullHearts;
        },
        
        // 是否显示半颗爱心
        shouldShowHalfHeart: function(favorValue, maxFavorValue) {
            const heartCount = FavorSystem.settings.maxHeartIcons;
            if (!favorValue || !maxFavorValue) return false;
            
            // 计算应该展示多少爱心
            const ratio = favorValue / maxFavorValue;
            const fullHearts = Math.floor(ratio * heartCount);
            const remainingPercent = (ratio * heartCount) - fullHearts;
            
            // 如果剩余百分比大于半颗爱心阈值，则显示半颗爱心
            return remainingPercent * 100 >= FavorSystem.settings.halfHeartThreshold;
        },
        
            // 设置NPC的最近动态
    setRecentActivity: function(npcName, activityText) {
        if (!npcName || !activityText) return;
        
        try {
            // 确保activityText是字符串
            activityText = String(activityText);
            
            // 查找NPC索引
            const npcIndex = this.getNPCList().findIndex(npc => 
                npc.name === npcName);
                
            if (npcIndex >= 0) {
                // 存储到内存中
                this._recentActivities[npcName] = activityText;
                
                // 添加到历史记录
                this.addToHistory(npcName, activityText);
                
                // 如果存档对象存在，也存储到存档中
                if ($gameSystem) {
                    if (!$gameSystem._favorRecentActivities) {
                        $gameSystem._favorRecentActivities = {};
                    }
                    $gameSystem._favorRecentActivities[npcName] = activityText;
                    
                    // 保存历史记录到存档
                    if (!$gameSystem._favorActivityHistory) {
                        $gameSystem._favorActivityHistory = [];
                    }
                    $gameSystem._favorActivityHistory = this._activityHistory;
                }
                
                if (FavorSystem.settings.debugMode) {
                    console.log(`设置NPC[${npcName}]的最近动态: ${activityText}`);
                    console.log(`保存后活动内容验证: ${this.getRecentActivity(npcName)}`);
                }
                
                // 更新已打开的好感度界面
                if (SceneManager._scene && SceneManager._scene instanceof Scene_Favor) {
                    const scene = SceneManager._scene;
                    if (scene._detailWindow && scene._detailWindow._npc && scene._detailWindow._npc.name === npcName) {
                        scene._detailWindow.refresh();
                        if (FavorSystem.settings.debugMode) {
                            console.log("已刷新当前打开的好感度窗口");
                        }
                    }
                    // 如果历史记录窗口正在显示，也刷新它
                    if (scene._historyWindow && scene._historyWindow.visible) {
                        scene._historyWindow.refresh();
                    }
                }
            } else {
                if (FavorSystem.settings.debugMode) {
                    console.log(`未找到名为[${npcName}]的NPC`);
                }
            }
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`设置NPC[${npcName}]的最近动态失败: ${e.message}`);
            }
        }
    },
        
        // 添加到历史记录
        addToHistory: function(npcName, activityText) {
            try {
                // 获取当前时间
                let timeString = "";
                if ($gameSystem && $gameSystem.getTimeString) {
                    timeString = $gameSystem.getTimeString();
                } else {
                    // 如果时间系统不可用，使用现实时间
                    const now = new Date();
                    timeString = now.toLocaleString();
                }
                
                // 创建历史记录条目
                const historyEntry = {
                    npcName: npcName,
                    activityText: activityText,
                    timestamp: timeString,
                    realTime: Date.now() // 用于排序
                };
                
                // 添加到历史记录数组
                this._activityHistory.push(historyEntry);
                
                // 限制历史记录数量
                const maxEntries = FavorSystem.settings.maxHistoryEntries;
                if (this._activityHistory.length > maxEntries) {
                    this._activityHistory = this._activityHistory.slice(-maxEntries);
                }
                
                // 按时间排序（最新的在前）
                this._activityHistory.sort((a, b) => b.realTime - a.realTime);
                
                if (FavorSystem.settings.debugMode) {
                    console.log(`添加历史记录: ${npcName} - ${activityText} (${timeString})`);
                }
            } catch (e) {
                if (FavorSystem.settings.debugMode) {
                    console.error(`添加历史记录失败: ${e.message}`);
                }
            }
        },
        
        // 获取所有历史记录
        getAllHistory: function() {
            return this._activityHistory || [];
        },
        
        // 获取指定NPC的历史记录
        getNPCHistory: function(npcName) {
            return this._activityHistory.filter(entry => entry.npcName === npcName);
        },
        
        // 清空历史记录
        clearHistory: function() {
            this._activityHistory = [];
            if ($gameSystem) {
                $gameSystem._favorActivityHistory = [];
            }
        },
        
            // 获取NPC的最近动态
    getRecentActivity: function(npcName) {
        if (!npcName) return "";
        
        try {
            // 尝试从存档中读取
            if ($gameSystem && $gameSystem._favorRecentActivities && $gameSystem._favorRecentActivities[npcName]) {
                const activity = $gameSystem._favorRecentActivities[npcName];
                if (FavorSystem.settings.debugMode) {
                    console.log(`从存档读取NPC[${npcName}]的最近动态: "${activity}"`);
                }
                
                // 检查是否是JSON格式字符串
                if (typeof activity === 'string' && activity.startsWith('"') && activity.endsWith('"')) {
                    try {
                        return JSON.parse(activity);
                    } catch (e) {
                        if (FavorSystem.settings.debugMode) {
                            console.error(`解析存档最近动态JSON失败: ${e.message}`);
                        }
                        return activity;
                    }
                }
                
                return activity;
            }
            
            // 尝试从内存中读取
            const memActivity = this._recentActivities[npcName] || "";
            if (memActivity && FavorSystem.settings.debugMode) {
                console.log(`从内存读取NPC[${npcName}]的最近动态: "${memActivity}"`);
            }
            
            // 检查是否是JSON格式字符串
            if (typeof memActivity === 'string' && memActivity.startsWith('"') && memActivity.endsWith('"')) {
                try {
                    return JSON.parse(memActivity);
                } catch (e) {
                    if (FavorSystem.settings.debugMode) {
                        console.error(`解析内存最近动态JSON失败: ${e.message}`);
                    }
                    return memActivity;
                }
            }
            
            return memActivity;
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`获取NPC[${npcName}]最近动态失败: ${e.message}`);
            }
            return "";
        }
    },
        
        // 获取自动生成的NPC状态文本
        getAutoStatusText: function(npcName, favorValue) {
            const levelName = this.getFavorLevelName(favorValue);
            return `${levelName}`;
        },
        
        // 获取下一个等级所需的好感度值
        getNextLevelValue: function(favorValue) {
            const levels = FavorSystem.settings.favorLevels;
            if (!levels || levels.length === 0) return 0;
            
            // 获取当前等级的索引
            let currentLevelIndex = -1;
            for (let i = 0; i < levels.length; i++) {
                if (favorValue >= Number(levels[i].value)) {
                    currentLevelIndex = i;
                } else {
                    break;
                }
            }
            
            // 如果是最高等级，返回最大好感度值
            if (currentLevelIndex >= levels.length - 1) {
                return this.getMaxFavorValue();
            }
            
            // 否则返回下一个等级的阈值
            return Number(levels[currentLevelIndex + 1].value);
        },
        
        addTestHistoryRecord: function(npcName, activityText) {
            if (FavorSystem.settings.debugMode) {
                console.log(`添加测试历史记录: NPC名称: "${npcName}", 活动内容: "${activityText}"`);
            }
            this.addToHistory(npcName, activityText);
        }
    };
    
    // 确保从存档加载数据
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        
        // 从存档中恢复最近动态数据
        if ($gameSystem && $gameSystem._favorRecentActivities) {
            FavorSystem.Manager._recentActivities = $gameSystem._favorRecentActivities;
            
            if (FavorSystem.settings.debugMode) {
                console.log("从存档加载最近动态数据:", $gameSystem._favorRecentActivities);
                // 记录加载的NPC名称
                const npcNames = Object.keys($gameSystem._favorRecentActivities);
                console.log(`已加载 ${npcNames.length} 个NPC的最近动态: ${npcNames.join(', ')}`);
            }
        } else if (FavorSystem.settings.debugMode) {
            console.log("存档中没有找到最近动态数据");
        }
        
        // 从存档中恢复历史记录数据
        if ($gameSystem && $gameSystem._favorActivityHistory) {
            FavorSystem.Manager._activityHistory = $gameSystem._favorActivityHistory;
            
            if (FavorSystem.settings.debugMode) {
                console.log("从存档加载历史记录数据:", $gameSystem._favorActivityHistory);
                console.log(`已加载 ${$gameSystem._favorActivityHistory.length} 条历史记录`);
            }
        } else {
            // 如果存档中没有历史记录，初始化为空数组
            FavorSystem.Manager._activityHistory = [];
            if (FavorSystem.settings.debugMode) {
                console.log("存档中没有找到历史记录数据，初始化为空");
            }
        }
    };
    
    //=============================================================================
    // 添加主菜单命令
    //=============================================================================
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);
        if (enableMenuCommand) {
            const enabled = this.isFavorSystemEnabled();
            this.addCommand(menuCommandName, 'favor', enabled);
        }
    };
    
    Window_MenuCommand.prototype.isFavorSystemEnabled = function() {
        return menuSwitchId === 0 || $gameSwitches.value(menuSwitchId);
    };
    
    //=============================================================================
    // 处理场景跳转
    //=============================================================================
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('favor', this.commandFavor.bind(this));
    };
    
    Scene_Menu.prototype.commandFavor = function() {
        SceneManager.push(Scene_Favor);
    };
    
    //=============================================================================
    // 监听对话事件，标记已遇到的NPC
    //=============================================================================
    /**
     * 已遇到NPC的自动标记功能
     * 
     * 工作原理：
     * 1. 当游戏中显示对话时，系统会自动检查是否匹配好感度系统中的NPC名称
     * 2. 如果匹配成功，则会自动将该NPC标记为"已遇到"
     * 3. 标记存储在变量中，使用位运算方式（每个NPC占用一个二进制位）
     * 
     * 使用方法：
     * 1. 在插件参数中设置"已遇到标志"变量ID
     * 2. 确保对话中使用的名称与好感度系统中设置的NPC名称一致
     * 3. 无需额外操作，系统会自动识别对话并标记NPC
     * 
     * 自动识别方式：
     * 1. 对话窗口上方显示的名称框
     * 2. 对话文本开头的"角色名："格式
     * 3. 脸图设置中的说话者名称
     * 4. 对话文本中的<npc:名称>标记（可选）
     */
    
    // 监听显示对话名称
    const _Window_NameBox_refresh = Window_NameBox.prototype.refresh;
    Window_NameBox.prototype.refresh = function() {
        _Window_NameBox_refresh.call(this);
        
        // 如果有显示名称，检查是否匹配NPC
        if (this._name) {
            const npcName = this._name;
            
            // 尝试标记NPC为已遇到
            if ($gameMessage) {
                $gameMessage._tryMarkNPCasMet(npcName, "名称框");
            }
        }
    };
    
    // 监听设置对话脸图，用于捕获名称
    const _Game_Message_setFaceImage = Game_Message.prototype.setFaceImage;
    Game_Message.prototype.setFaceImage = function(faceName, faceIndex) {
        _Game_Message_setFaceImage.call(this, faceName, faceIndex);
        
        // 尝试从$gameMessage._speakerName中获取说话者名称（如果存在）
        if (this._speakerName) {
            this._tryMarkNPCasMet(this._speakerName, "说话者设置");
        }
    };
    
    //=============================================================================
    // FavorListWindow - 好感度NPC列表窗口
    //=============================================================================
    
    function FavorListWindow() {
        this.initialize(...arguments);
    }
    
    FavorListWindow.prototype = Object.create(Window_Base.prototype);
    FavorListWindow.prototype.constructor = FavorListWindow;
    
    FavorListWindow.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._index = 0;
        this._scrollIndex = 0;  // 表示当前第一个可见项的索引
        this._data = [];
        this._detailWindow = null;
        this.opacity = 0;
        this.frameVisible = false;
        
        // 计算可见项目的数量，考虑到行高和间距
        const itemHeight = FavorSystem.settings.lineHeight || 60;
        const itemSpacing = FavorSystem.settings.listItemSpacing || 0;
        const totalItemHeight = itemHeight + itemSpacing;
        this._maxVisibleItems = Math.floor(this.innerHeight / totalItemHeight);
        
        this._handlers = {};
        this._touchSelectIndex = -1;
        this._heartBitmap = null;
        this._pendingImageLoads = 0;
        
        // 完全隐藏原生光标
        this.setCursorRect(0, 0, 0, 0);
        
        // 创建自定义高亮背景精灵
        this._highlightSprite = new Sprite();
        this._highlightSprite.bitmap = new Bitmap(1, 1);
        // 使用自定义颜色和不透明度
        const highlightColor = ColorManager.textColor(FavorSystem.settings.selectionHighlightColor);
        this._highlightSprite.opacity = FavorSystem.settings.selectionHighlightOpacity;
        this._highlightSprite.bitmap.fillAll(highlightColor);
        this.addChildToBack(this._highlightSprite);
        
        // 预加载所有图片
        this._portraits = {};
        this.preloadAllImages();
        
        this.refresh();
        this.select(0);
    };
    
    // 预加载所有图片
    FavorListWindow.prototype.preloadAllImages = function() {
        // 记录待加载的图像数量
        this._pendingImageLoads = 0;
        
        // 加载爱心图标
        if (FavorSystem.settings.heartIconImage) {
            this._pendingImageLoads++;
            this._heartBitmap = ImageManager.loadPicture(FavorSystem.settings.heartIconImage);
            this._heartBitmap.addLoadListener(this.onImageLoaded.bind(this));
        }
        
        // 加载所有角色头像
        const metNPCList = FavorSystem.Manager.getMetNPCList();
        for (const npc of metNPCList) {
            if (npc && npc.faceName) {
                this._pendingImageLoads++;
                
                // 处理脸图索引 - 构建包含索引的键值
                let faceKey = npc.faceName;
                if (npc.faceIndex !== undefined) {
                    faceKey = `${npc.faceName}_idx_${npc.faceIndex}`;
                }
                
                const bitmap = this.loadNPCPortrait(faceKey);
                // 只为未加载完成的图像添加监听
                if (!bitmap.isReady()) {
                    bitmap.addLoadListener(this.onImageLoaded.bind(this));
                } else {
                    // 如果已经加载完成，减少计数
                    this._pendingImageLoads--;
                }
            }
        }
        
        // 如果所有图像都已加载完成，直接刷新
        if (this._pendingImageLoads === 0) {
            this.refresh();
        }
    };
    
    // 单个图像加载完成时的回调
    FavorListWindow.prototype.onImageLoaded = function() {
        if (this._pendingImageLoads > 0) {
            this._pendingImageLoads--;
            
            // 当所有图像都加载完成时刷新
            if (this._pendingImageLoads === 0) {
                this.refresh();
            }
        }
    };
    
    // 加载NPC头像
    FavorListWindow.prototype.loadNPCPortrait = function(faceName) {
        // 兼容旧版本 - 检查是否包含索引信息
        let faceIndex = 0;
        if (faceName.includes("_idx_")) {
            const parts = faceName.split("_idx_");
            faceName = parts[0];
            faceIndex = parseInt(parts[1]) || 0;
        }
        
        const key = `${faceName}_${faceIndex}`;
        if (!this._portraits[key]) {
            if (FavorSystem.settings.debugMode) {
                console.log(`加载脸图: ${faceName}, 索引: ${faceIndex}`);
            }
            
            // 加载标准脸图
            const bitmap = ImageManager.loadFace(faceName);
            this._portraits[key] = bitmap;
            
            // 存储索引信息，用于之后绘制
            this._portraits[key].faceIndex = faceIndex;
            
            // 添加加载完成回调，确保图像加载后刷新
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(() => {
                    if (FavorSystem.settings.debugMode) {
                        console.log(`脸图加载完成: ${faceName}, 索引: ${faceIndex}, 宽度: ${bitmap.width}, 高度: ${bitmap.height}`);
                    }
                    this.refresh();
                });
            }
        }
        return this._portraits[key];
    };
    
    // 固定行高
    FavorListWindow.prototype.itemHeight = function() {
        return FavorSystem.settings.lineHeight || 60;
    };
    
    // 获取可见行数
    FavorListWindow.prototype.maxVisibleItems = function() {
        // 考虑间距后计算可见行数
        const itemHeight = this.itemHeight();
        const itemSpacing = FavorSystem.settings.listItemSpacing || 0;
        const totalItemHeight = itemHeight + itemSpacing;
        
        const availableHeight = this.innerHeight;
        const visibleItems = Math.floor(availableHeight / totalItemHeight);
        
        return Math.min(
            FavorSystem.settings.maxVisibleNPCs || 6,
            visibleItems
        );
    };
    
    // 总项目数
    FavorListWindow.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };
    
    // 处理输入
    FavorListWindow.prototype.processHandling = function() {
        if (this.isOpenAndActive()) {
            if (this.isOkTriggered() && this.maxItems() > 0) {
                this.processOk();
            } else if (this.isCancelTriggered()) {
                this.processCancel();
            }
        }
    };
    
    FavorListWindow.prototype.processOk = function() {
        if (this._handlers.ok) {
            this.playOkSound();
            this._handlers.ok();
        }
    };
    
    FavorListWindow.prototype.processCancel = function() {
        if (this._handlers.cancel) {
            this.playCancelSound();
            this._handlers.cancel();
        }
        // 如果没有cancel处理器，不做任何操作，让场景处理
    };
    
    FavorListWindow.prototype.isOkTriggered = function() {
        return Input.isTriggered("ok");
    };
    
    FavorListWindow.prototype.isCancelTriggered = function() {
        return Input.isTriggered("cancel");
    };
    
    FavorListWindow.prototype.setHandler = function(symbol, method) {
        this._handlers[symbol] = method;
    };
    
    FavorListWindow.prototype.callHandler = function(symbol) {
        if (this._handlers[symbol]) {
            this._handlers[symbol]();
        }
    };
    
    // 处理光标移动
    FavorListWindow.prototype.processCursorMove = function() {
        if (this.isCursorMovable()) {
            const lastIndex = this.index();
            if (Input.isRepeated("down")) {
                this.cursorDown();
            }
            if (Input.isRepeated("up")) {
                this.cursorUp();
            }
            if (this.index() !== lastIndex) {
                this.playCursorSound();
            }
        }
    };
    
    FavorListWindow.prototype.isCursorMovable = function() {
        return this.isOpenAndActive() && this.maxItems() > 0;
    };
    
    FavorListWindow.prototype.cursorDown = function() {
        if (this.index() < this.maxItems() - 1) {
            this.select(this.index() + 1);
        }
    };
    
    FavorListWindow.prototype.cursorUp = function() {
        if (this.index() > 0) {
            this.select(this.index() - 1);
        }
    };
    
    FavorListWindow.prototype.isOpenAndActive = function() {
        return this.active;
    };
    
    FavorListWindow.prototype.activate = function() {
        this.active = true;
    };
    
    FavorListWindow.prototype.deactivate = function() {
        this.active = false;
    };
    
    FavorListWindow.prototype.playOkSound = function() {
        SoundManager.playOk();
    };
    
    FavorListWindow.prototype.playCursorSound = function() {
        SoundManager.playCursor();
    };
    
    FavorListWindow.prototype.playCancelSound = function() {
        SoundManager.playCancel();
    };
    
    // 获取/设置当前选中索引
    FavorListWindow.prototype.index = function() {
        return this._index;
    };
    
    // 选择项目
    FavorListWindow.prototype.select = function(index) {
        const maxItems = this.maxItems();
        if (maxItems === 0) {
            this._index = -1;
            this._highlightSprite.visible = false;
            return;
        }
        
        // 确保索引在有效范围内
        this._index = index.clamp(0, maxItems - 1);
        
        // 更新滚动位置
        this.updateScrollPosition();
        
        // 更新光标位置
        this.updateCursor();
        
        // 更新详情窗口
        this.updateDetailWindow();
        
        // 触发选择事件
        if (this._handlers.select) {
            this.callHandler('select');
        }
    };
    
    // 更新滚动位置
    FavorListWindow.prototype.updateScrollPosition = function() {
        const index = this.index();
        const maxVisibleItems = this.maxVisibleItems();
        
        // 如果选中项在当前可见区域上方，向上滚动
        if (index < this._scrollIndex) {
            this._scrollIndex = index;
        }
        // 如果选中项在当前可见区域下方，向下滚动
        else if (index >= this._scrollIndex + maxVisibleItems) {
            this._scrollIndex = index - maxVisibleItems + 1;
        }
        
        // 确保滚动索引不会超出范围
        this._scrollIndex = this._scrollIndex.clamp(0, Math.max(0, this.maxItems() - maxVisibleItems));
        
        this.refresh();
    };
    
    // 更新光标
    FavorListWindow.prototype.updateCursor = function() {
        const index = this.index();
        const scrollIndex = this._scrollIndex;
        const maxVisibleItems = this.maxVisibleItems();
        
        // 确保原生光标保持隐藏
        this.setCursorRect(0, 0, 0, 0);
        
        // 只有当选中项在可见区域内时才显示高亮
        if (index >= scrollIndex && index < scrollIndex + maxVisibleItems) {
            const rect = this.itemRect(index - scrollIndex);
            
            // 更新高亮精灵位置和大小
            this._highlightSprite.visible = true;
            const padding = FavorSystem.settings.selectionHighlightPadding;
            
            // 使高亮宽度扩展到整个列表宽度
            this._highlightSprite.x = this.padding + padding;
            this._highlightSprite.y = rect.y + this.padding + padding;
            
            // 计算高亮宽度和高度 - 只设置高度，宽度保持整行
            const highlightWidth = this.innerWidth - (padding * 2);
            const highlightHeight = rect.height - (padding * 2);
            
            // 更新高亮精灵的大小和颜色
            if (this._highlightSprite.bitmap.width !== highlightWidth || 
                this._highlightSprite.bitmap.height !== highlightHeight) {
                this._highlightSprite.bitmap = new Bitmap(highlightWidth, highlightHeight);
                const highlightColor = ColorManager.textColor(FavorSystem.settings.selectionHighlightColor);
                this._highlightSprite.bitmap.fillAll(highlightColor);
            }
        } else {
            this._highlightSprite.visible = false;
        }
    };
    
    // 获取项目矩形
    FavorListWindow.prototype.itemRect = function(visibleIndex) {
        const itemHeight = this.itemHeight();
        const itemSpacing = FavorSystem.settings.listItemSpacing || 0;
        
        // 添加项目间距到计算中
        return {
            x: 0,
            y: visibleIndex * (itemHeight + itemSpacing),
            width: this.innerWidth,
            height: itemHeight
        };
    };
    
    // 刷新窗口
    FavorListWindow.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
        this.updateCursor();
    };
    
    // 获取当前项
    FavorListWindow.prototype.item = function() {
        return this._data && this._index >= 0 && this._index < this._data.length ? 
            this._data[this._index] : null;
    };
    
    // 处理更新
    FavorListWindow.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.processCursorMove();
        this.processHandling();
        this.updateCursor(); // 每帧更新光标，确保高亮不闪烁
    };
    
    // 构建项目列表
    FavorListWindow.prototype.makeItemList = function() {
        this._data = [];
        
        // 添加已遇到的NPC
        const metNPCList = FavorSystem.Manager.getMetNPCList();
        for (let i = 0; i < metNPCList.length; i++) {
            const npc = metNPCList[i];
            if (npc) {
        // 获取NPC在原始列表中的索引，用于获取好感度
                const originalIndex = FavorSystem.Manager.getNPCList().findIndex(n => 
            n.name === npc.name && n.faceName === npc.faceName);
            
                const favorValue = FavorSystem.Manager.getFavorValue(originalIndex);
                
                // 获取最近动态（优先从管理器中获取，如果没有则使用默认值）
                let recentActivity = FavorSystem.Manager.getRecentActivity(npc.name);
                if (!recentActivity && npc.recentActivity) {
                    recentActivity = npc.recentActivity;
                }
                if (FavorSystem.settings.debugMode) {
                    console.log(`加载NPC[${npc.name}]列表项，最近动态: "${recentActivity}"`);
                }
                
                this._data.push({
                    id: originalIndex,
                    name: npc.name,
                    faceName: npc.faceName,
                    faceIndex: npc.faceIndex || 0,
                    favorValue: favorValue,
                    introduction: npc.introduction,
                    likes: npc.likes,
                    // 状态字段不再需要从NPC对象中获取，而是在渲染时自动生成
                    recentActivity: recentActivity
                });
            }
        }
    };
    
    // 绘制所有项目
    FavorListWindow.prototype.drawAllItems = function() {
        if (!this.contents || !this._data) return;
        
        this.contents.clear();
        
        const maxVisibleItems = this.maxVisibleItems();
        for (let i = 0; i < maxVisibleItems; i++) {
            const dataIndex = this._scrollIndex + i;
            if (dataIndex < this.maxItems()) {
                this.drawItem(dataIndex, i);
            }
        }
    };
    
    // 绘制单个项目
    FavorListWindow.prototype.drawItem = function(dataIndex, visibleIndex) {
        if (!this.contents || !this._data || dataIndex < 0 || dataIndex >= this._data.length) return;
        
        const npc = this._data[dataIndex];
        if (!npc) return;
        
        const rect = this.itemRect(visibleIndex);
        const portraitSize = FavorSystem.settings.portraitSize;
        
        // 构建脸图的键值
        let faceKey = npc.faceName;
        if (npc.faceIndex !== undefined) {
            faceKey = `${npc.faceName}_idx_${npc.faceIndex}`;
        }
        
        // 绘制角色头像 - 如果还没有加载，尝试重新加载
        if (!this._portraits[faceKey]) {
            this._portraits[faceKey] = this.loadNPCPortrait(faceKey);
        }
        
        const portraitBitmap = this._portraits[faceKey];
        const portraitX = rect.x + 5;
        const portraitY = rect.y + (rect.height - portraitSize) / 2;
        
        // 调试信息
        if (FavorSystem.settings.debugMode) {
            console.log(`绘制NPC[${npc.name}], 图片键值: ${faceKey}, 图片就绪: ${portraitBitmap ? portraitBitmap.isReady() : false}`);
        }
        
        // 如果头像已加载完成，则绘制
        if (portraitBitmap && portraitBitmap.isReady()) {
            this.drawScaledPortrait(portraitBitmap, portraitX, portraitY, portraitSize);
        } else {
            // 如果头像未加载，显示一个占位符
            this.contents.fillRect(portraitX, portraitY, portraitSize, portraitSize, '#888888');
            
            // 尝试添加加载完成后的刷新
            if (portraitBitmap && !portraitBitmap._listenerAdded) {
                portraitBitmap._listenerAdded = true;
                portraitBitmap.addLoadListener(this.refresh.bind(this));
            }
        }
        
        // 计算头像垂直中心点，用于基准定位
        const portraitCenterY = portraitY + portraitSize / 2;
        
        // 绘制角色名称 - 支持负值Y偏移（向上移动）
        const nameX = portraitX + portraitSize + FavorSystem.settings.nameX;
        // 为名称设置一个垂直中心对齐的基准位置，然后应用Y偏移
        const nameY = portraitCenterY - this.contents.fontSize / 2 + FavorSystem.settings.nameY;
        
        this.contents.fontSize = FavorSystem.settings.listFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.nameColor));
        this.drawText(npc.name, nameX, nameY, rect.width - nameX, 'left');
        
        // 绘制好感度爱心 - 支持负值Y偏移（向上移动）
        const heartX = portraitX + portraitSize + FavorSystem.settings.heartIconX;
        // 为爱心图标设置一个垂直中心对齐的基准位置，然后应用Y偏移
        const heartY = portraitCenterY + FavorSystem.settings.heartIconY;
        
        this.drawHeartIcons(npc, heartX, heartY);
    };
    
    // 绘制缩放的头像
    FavorListWindow.prototype.drawScaledPortrait = function(bitmap, x, y, size) {
        const scaleMode = FavorSystem.settings.portraitScaleMode;
        
        // 检查是否是标准RPG Maker脸图
        if (bitmap.faceIndex !== undefined) {
            if (FavorSystem.settings.debugMode) {
                console.log(`绘制脸图: faceIndex=${bitmap.faceIndex}, bitmap宽度=${bitmap.width}, 高度=${bitmap.height}`);
            }
            
            // 标准RPG Maker MZ脸图常量
            const faceWidth = 144;
            const faceHeight = 144;
            
            // 计算脸图在脸图集中的位置
            const faceIndex = bitmap.faceIndex;
            const facesPerRow = 4; // 标准RPG Maker脸图每行4个
            const sx = (faceIndex % facesPerRow) * faceWidth;
            const sy = Math.floor(faceIndex / facesPerRow) * faceHeight;
            
            if (FavorSystem.settings.debugMode) {
                console.log(`绘制脸图位置: sx=${sx}, sy=${sy}, 宽=${faceWidth}, 高=${faceHeight}`);
            }
            
            if (bitmap.isReady() && bitmap.width >= sx + faceWidth && bitmap.height >= sy + faceHeight) {
                // 确保位图已加载且坐标有效
                if (scaleMode === 'square') {
                    // 直接绘制脸图
                    this.contents.blt(bitmap, sx, sy, faceWidth, faceHeight, x, y, size, size);
                } else {
                    // 保持原始比例模式 - 标准脸图本身就是正方形，所以实际上效果相同
                    this.contents.blt(bitmap, sx, sy, faceWidth, faceHeight, x, y, size, size);
                }
            } else {
                // 如果位图未准备好或坐标无效，显示灰色占位符
                if (FavorSystem.settings.debugMode) {
                    console.warn(`脸图尚未就绪或坐标无效: faceIndex=${faceIndex}, isReady=${bitmap.isReady()}`);
                }
                this.contents.fillRect(x, y, size, size, '#888888');
            }
        } else {
            // 旧版本兼容 - 处理自定义图片
            const origWidth = bitmap.width;
            const origHeight = bitmap.height;
            
            if (scaleMode === 'square') {
                // 截取居中正方形模式
                let sx = 0;
                let sy = 0;
                let sw = origWidth;
                let sh = origHeight;
                
                // 如果原图不是正方形，调整裁剪区域保持比例
                if (origWidth > origHeight) {
                    // 宽图 - 取中心部分
                    sx = (origWidth - origHeight) / 2;
                    sw = origHeight;
                } else if (origHeight > origWidth) {
                    // 高图 - 取中心部分
                    sy = (origHeight - origWidth) / 2;
                    sh = origWidth;
                }
                
                // 绘制头像，使用计算后的参数实现等比例缩放
                this.contents.blt(bitmap, sx, sy, sw, sh, x, y, size, size);
            } else {
                // 保持原始比例模式
                let dw = size;
                let dh = size;
                
                // 计算等比例缩放后的尺寸
                if (origWidth > origHeight) {
                    // 宽图 - 保持宽度，高度按比例缩小
                    dh = size * (origHeight / origWidth);
                } else if (origHeight > origWidth) {
                    // 高图 - 保持高度，宽度按比例缩小
                    dw = size * (origWidth / origHeight);
                }
                
                // 计算居中位置
                const dx = x + (size - dw) / 2;
                const dy = y + (size - dh) / 2;
                
                // 绘制头像
                this.contents.blt(bitmap, 0, 0, origWidth, origHeight, dx, dy, dw, dh);
            }
        }
    };
    
    // 绘制爱心图标
    FavorListWindow.prototype.drawHeartIcons = function(npc, x, y) {
        const heartIconWidth = FavorSystem.settings.heartIconWidth;
        const heartIconHeight = FavorSystem.settings.heartIconHeight;
        const spacing = 2; // 爱心之间的间距
        
        // 获取好感度值和最大值
        const favorValue = npc.favorValue;
        const maxValue = FavorSystem.Manager.getMaxFavorValue();
        
        // 计算应该显示多少个完整爱心
        const fullHeartCount = FavorSystem.Manager.getHeartIconCount(favorValue, maxValue);
        
        // 是否显示半颗爱心
        const showHalfHeart = FavorSystem.Manager.shouldShowHalfHeart(favorValue, maxValue);
        
        // 最大爱心数量
        const maxHearts = FavorSystem.settings.maxHeartIcons;
        
        // 如果有自定义爱心图标，使用自定义图标
        if (this._heartBitmap && this._heartBitmap.isReady()) {
            // 绘制完整爱心
            for (let i = 0; i < maxHearts; i++) {
                const heartX = x + i * (heartIconWidth + spacing);
                
                if (i < fullHeartCount) {
                    // 绘制完整爱心
                    this.contents.blt(this._heartBitmap, 0, 0, heartIconWidth, heartIconHeight, 
                                     heartX, y, heartIconWidth, heartIconHeight);
                } else if (i === fullHeartCount && showHalfHeart) {
                    // 绘制半颗爱心
                    // 先绘制半透明的完整爱心作为背景
                    this.contents.paintOpacity = 64;
                    this.contents.blt(this._heartBitmap, 0, 0, heartIconWidth, heartIconHeight, 
                                     heartX, y, heartIconWidth, heartIconHeight);
                    // 再绘制完全不透明的左半部分
                    this.contents.paintOpacity = 255;
                    this.contents.blt(this._heartBitmap, 0, 0, heartIconWidth / 2, heartIconHeight, 
                                     heartX, y, heartIconWidth / 2, heartIconHeight);
                } else {
                    // 绘制空心（绘制轮廓或灰色爱心）
                    // 这里可以在自定义心形图标中添加第二个状态作为空心
                    this.contents.paintOpacity = 64;
                    this.contents.blt(this._heartBitmap, 0, 0, heartIconWidth, heartIconHeight, 
                                     heartX, y, heartIconWidth, heartIconHeight);
                    this.contents.paintOpacity = 255;
                }
            }
        } else {
            // 使用文本作为替代
            let heartText = '';
            for (let i = 0; i < maxHearts; i++) {
                if (i < fullHeartCount) {
                    heartText += '♥ ';
                } else if (i === fullHeartCount && showHalfHeart) {
                    heartText += '♡ ';
                } else {
                    heartText += '♡ ';
                }
            }
            
            // 绘制好感度文本
            this.contents.fontSize = FavorSystem.settings.listFontSize - 4;
            this.changeTextColor(ColorManager.textColor(24)); // 使用红色系
            this.drawText(heartText, x, y, this.innerWidth - x, 'left');
        }
    };
    
    // 自定义字体设置
    FavorListWindow.prototype.resetFontSettings = function() {
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = FavorSystem.settings.listFontSize;
        this.resetTextColor();
    };
    
    // 设置详情窗口
    FavorListWindow.prototype.setDetailWindow = function(detailWindow) {
        this._detailWindow = detailWindow;
        this.updateDetailWindow();
    };
    
    // 更新详情窗口内容
    FavorListWindow.prototype.updateDetailWindow = function() {
        if (this._detailWindow && this.maxItems() > 0) {
            const npc = this.item();
            this._detailWindow.setNPC(npc);
        } else if (this._detailWindow) {
            this._detailWindow.setNPC(null);
        }
    };
    
    //=============================================================================
    // FavorDetailWindow - 好感度详情窗口
    //=============================================================================
    
    function FavorDetailWindow() {
        this.initialize(...arguments);
    }
    
    FavorDetailWindow.prototype = Object.create(Window_Base.prototype);
    FavorDetailWindow.prototype.constructor = FavorDetailWindow;
    
    FavorDetailWindow.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._npc = null;
        this._portraits = {};
        this._pendingImageLoads = 0;
        this.opacity = 0;
        this.frameVisible = false;
        this.refresh();
    };
    
    FavorDetailWindow.prototype.setNPC = function(npc) {
        if (this._npc !== npc) {
            this._npc = npc;
            
            if (npc && npc.faceName) {
                this._pendingImageLoads = 0;
                
                // 构建脸图的键值
                let faceKey = npc.faceName;
                if (npc.faceIndex !== undefined) {
                    faceKey = `${npc.faceName}_idx_${npc.faceIndex}`;
                }
                
                const bitmap = this.loadNPCPortrait(faceKey);
                
                // 只有当头像未加载完成时才添加监听
                if (!bitmap.isReady()) {
                    this._pendingImageLoads++;
                    bitmap.addLoadListener(this.onImageLoaded.bind(this));
                }
            }
            
            this.refresh();
        }
    };
    
    // 加载NPC头像
    FavorDetailWindow.prototype.loadNPCPortrait = function(faceName) {
        // 兼容旧版本 - 检查是否包含索引信息
        let faceIndex = 0;
        if (faceName.includes("_idx_")) {
            const parts = faceName.split("_idx_");
            faceName = parts[0];
            faceIndex = parseInt(parts[1]) || 0;
        }
        
        const key = `${faceName}_${faceIndex}`;
        if (!this._portraits[key]) {
            if (FavorSystem.settings.debugMode) {
                console.log(`详情窗口加载脸图: ${faceName}, 索引: ${faceIndex}`);
            }
            
            // 加载标准脸图
            const bitmap = ImageManager.loadFace(faceName);
            this._portraits[key] = bitmap;
            
            // 存储索引信息，用于之后绘制
            this._portraits[key].faceIndex = faceIndex;
            
            // 添加加载完成回调，确保图像加载后刷新
            if (!bitmap.isReady()) {
                bitmap.addLoadListener(() => {
                    if (FavorSystem.settings.debugMode) {
                        console.log(`详情窗口脸图加载完成: ${faceName}, 索引: ${faceIndex}, 宽度: ${bitmap.width}, 高度: ${bitmap.height}`);
                    }
                    this.refresh();
                });
            }
        }
        return this._portraits[key];
    };
    
    // 图像加载完成后的回调
    FavorDetailWindow.prototype.onImageLoaded = function() {
        this._pendingImageLoads--;
        if (this._pendingImageLoads <= 0) {
            this.refresh();
        }
    };
    
    FavorDetailWindow.prototype.refresh = function() {
        this.contents.clear();
        
        if (!this._npc) return;
        
        this.drawNPCInfo();
    };
    
    FavorDetailWindow.prototype.drawNPCInfo = function() {
        // 绘制头像
        this.drawNPCPortrait();
        
        // 绘制名称
        this.drawNPCName();
        
        // 绘制好感度条
        this.drawFavorBar();
        
        // 绘制好感度值和等级
        this.drawFavorValue();
        
        // 绘制角色介绍
        this.drawIntroduction();
        
        // 绘制角色喜好
        this.drawLikes();
        
        // 绘制角色状态
        this.drawStatus();
        
        // 绘制最近动态
        this.drawRecentActivity();
    };
    
    FavorDetailWindow.prototype.drawNPCPortrait = function() {
        const portraitSize = FavorSystem.settings.detailPortraitSize;
        const portraitX = FavorSystem.settings.detailPortraitX;
        const portraitY = FavorSystem.settings.detailPortraitY;
        
        try {
            // 构建脸图的键值
            let faceKey = this._npc.faceName;
            if (this._npc.faceIndex !== undefined) {
                faceKey = `${this._npc.faceName}_idx_${this._npc.faceIndex}`;
            }
            
            // 如果头像未加载，尝试加载
            if (!this._portraits[faceKey]) {
                this._portraits[faceKey] = this.loadNPCPortrait(faceKey);
            }
            
            const portraitBitmap = this._portraits[faceKey];
            if (portraitBitmap && portraitBitmap.isReady()) {
                // 使用列表窗口的同样方法绘制缩放头像
                this.drawScaledPortrait(portraitBitmap, portraitX, portraitY, portraitSize);
            } else {
                // 如果头像未加载，显示一个占位符
                this.contents.fillRect(portraitX, portraitY, portraitSize, portraitSize, '#888888');
                
                // 尝试添加加载完成后的刷新
                if (portraitBitmap && !portraitBitmap._detailRefreshListener) {
                    portraitBitmap._detailRefreshListener = true;
                    portraitBitmap.addLoadListener(this.refresh.bind(this));
                }
            }
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`详情窗口绘制头像失败: ${e.message}`);
            }
            this.contents.fillRect(portraitX, portraitY, portraitSize, portraitSize, '#888888');
        }
    };
    
    // 绘制缩放的头像 (为详情窗口复制相同的方法)
    FavorDetailWindow.prototype.drawScaledPortrait = function(bitmap, x, y, size) {
        try {
            const scaleMode = FavorSystem.settings.portraitScaleMode;
            
            // 检查是否是标准RPG Maker脸图
            if (bitmap.faceIndex !== undefined) {
                if (FavorSystem.settings.debugMode) {
                    console.log(`详情窗口绘制脸图: faceIndex=${bitmap.faceIndex}, bitmap宽度=${bitmap.width}, 高度=${bitmap.height}`);
                }
                
                // 标准RPG Maker MZ脸图常量
                const faceWidth = 144;
                const faceHeight = 144;
                
                // 计算脸图在脸图集中的位置
                const faceIndex = bitmap.faceIndex;
                const facesPerRow = 4; // 标准RPG Maker脸图每行4个
                const sx = (faceIndex % facesPerRow) * faceWidth;
                const sy = Math.floor(faceIndex / facesPerRow) * faceHeight;
                
                if (FavorSystem.settings.debugMode) {
                    console.log(`详情窗口绘制脸图位置: sx=${sx}, sy=${sy}, 宽=${faceWidth}, 高=${faceHeight}`);
                }
                
                if (bitmap.isReady() && bitmap.width >= sx + faceWidth && bitmap.height >= sy + faceHeight) {
                    // 确保位图已加载且坐标有效
                    if (scaleMode === 'square') {
                        // 直接绘制脸图
                        this.contents.blt(bitmap, sx, sy, faceWidth, faceHeight, x, y, size, size);
                    } else {
                        // 保持原始比例模式 - 标准脸图本身就是正方形，所以实际上效果相同
                        this.contents.blt(bitmap, sx, sy, faceWidth, faceHeight, x, y, size, size);
                    }
                } else {
                    // 如果位图未准备好或坐标无效，显示灰色占位符
                    if (FavorSystem.settings.debugMode) {
                        console.warn(`详情窗口脸图尚未就绪或坐标无效: faceIndex=${faceIndex}, isReady=${bitmap.isReady()}`);
                    }
                    this.contents.fillRect(x, y, size, size, '#888888');
                }
            } else {
                // 旧版本兼容 - 处理自定义图片
                const origWidth = bitmap.width;
                const origHeight = bitmap.height;
                
                if (scaleMode === 'square') {
                    // 截取居中正方形模式
                    let sx = 0;
                    let sy = 0;
                    let sw = origWidth;
                    let sh = origHeight;
                    
                    // 如果原图不是正方形，调整裁剪区域保持比例
                    if (origWidth > origHeight) {
                        // 宽图 - 取中心部分
                        sx = (origWidth - origHeight) / 2;
                        sw = origHeight;
                    } else if (origHeight > origWidth) {
                        // 高图 - 取中心部分
                        sy = (origHeight - origWidth) / 2;
                        sh = origWidth;
                    }
                    
                    // 绘制头像，使用计算后的参数实现等比例缩放
                    this.contents.blt(bitmap, sx, sy, sw, sh, x, y, size, size);
                } else {
                    // 保持原始比例模式
                    let dw = size;
                    let dh = size;
                    
                    // 计算等比例缩放后的尺寸
                    if (origWidth > origHeight) {
                        // 宽图 - 保持宽度，高度按比例缩小
                        dh = size * (origHeight / origWidth);
                    } else if (origHeight > origWidth) {
                        // 高图 - 保持高度，宽度按比例缩小
                        dw = size * (origWidth / origHeight);
                    }
                    
                    // 计算居中位置
                    const dx = x + (size - dw) / 2;
                    const dy = y + (size - dh) / 2;
                    
                    // 绘制头像
                    this.contents.blt(bitmap, 0, 0, origWidth, origHeight, dx, dy, dw, dh);
                }
            }
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`详情窗口绘制缩放头像失败: ${e.message}`);
            }
            this.contents.fillRect(x, y, size, size, '#888888');
        }
    };
    
    FavorDetailWindow.prototype.drawNPCName = function() {
        const nameX = FavorSystem.settings.detailNameX;
        const nameY = FavorSystem.settings.detailNameY;
        const nameFontSize = FavorSystem.settings.detailNameFontSize;
        
        this.contents.fontSize = nameFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.detailNameColor));
        this.drawText(this._npc.name, nameX, nameY, this.innerWidth - nameX, 'left');
    };
    
    FavorDetailWindow.prototype.drawFavorBar = function() {
        // 不再绘制进度条，该函数保留但为空
    };
    
    FavorDetailWindow.prototype.drawFavorValue = function() {
        const textX = FavorSystem.settings.detailFavorTextX;
        const textY = FavorSystem.settings.detailFavorTextY;
        const textFontSize = FavorSystem.settings.detailFavorTextFontSize;
        
        const favorValue = this._npc.favorValue;
        
        // 获取当前等级和下一个等级
        const currentLevel = FavorSystem.Manager.getFavorLevel(favorValue);
        const nextLevelValue = FavorSystem.Manager.getNextLevelValue(favorValue);
        
        this.contents.fontSize = textFontSize;
        this.resetTextColor();
        
        // 只显示好感度值，格式为"当前值/下一级所需值"
        const valueText = `好感度: ${favorValue}/${nextLevelValue}`;
        this.drawText(valueText, textX, textY, this.innerWidth - textX, 'left');
    };
    
    FavorDetailWindow.prototype.drawIntroduction = function() {
        // 绘制介绍标题
        const titleX = FavorSystem.settings.introTitleX;
        const titleY = FavorSystem.settings.introTitleY;
        const titleFontSize = FavorSystem.settings.introTitleFontSize;
        
        this.contents.fontSize = titleFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.introTitleColor));
        this.drawText(FavorSystem.settings.introTitle, titleX, titleY, this.innerWidth - titleX, 'left');
        
        // 绘制介绍内容
        const contentX = FavorSystem.settings.introX;
        const contentY = FavorSystem.settings.introY;
        const contentWidth = FavorSystem.settings.introWidth;
        const contentFontSize = FavorSystem.settings.introFontSize;
        
        this.contents.fontSize = contentFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.introColor));
        
        // 处理多行内容
        this.drawWrappedText(
            this._npc.introduction, 
            contentX, 
            contentY, 
            contentWidth
        );
    };
    
    FavorDetailWindow.prototype.drawLikes = function() {
        // 绘制喜好标题
        const titleX = FavorSystem.settings.likesTitleX;
        const titleY = FavorSystem.settings.likesTitleY;
        const titleFontSize = FavorSystem.settings.likesTitleFontSize;
        
        this.contents.fontSize = titleFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.likesTitleColor));
        this.drawText(FavorSystem.settings.likesTitle, titleX, titleY, this.innerWidth - titleX, 'left');
        
        // 绘制喜好内容
        const contentX = FavorSystem.settings.likesX;
        const contentY = FavorSystem.settings.likesY;
        const contentWidth = FavorSystem.settings.likesWidth;
        const contentFontSize = FavorSystem.settings.likesFontSize;
        
        this.contents.fontSize = contentFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.likesColor));
        
        // 处理多行内容
        this.drawWrappedText(
            this._npc.likes, 
            contentX, 
            contentY, 
            contentWidth
        );
    };
    
    FavorDetailWindow.prototype.drawStatus = function() {
        // 绘制状态标题
        const titleX = FavorSystem.settings.statusTitleX;
        const titleY = FavorSystem.settings.statusTitleY;
        const titleFontSize = FavorSystem.settings.statusTitleFontSize;
        
        this.contents.fontSize = titleFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.statusTitleColor));
        this.drawText(FavorSystem.settings.statusTitle, titleX, titleY, this.innerWidth - titleX, 'left');
        
        // 绘制状态内容 - 自动生成的状态文本
        const contentX = FavorSystem.settings.statusX;
        const contentY = FavorSystem.settings.statusY;
        const contentWidth = FavorSystem.settings.statusWidth;
        const contentFontSize = FavorSystem.settings.statusFontSize;
        
        this.contents.fontSize = contentFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.statusColor));
        
        // 使用自动生成的状态文本
        const statusText = FavorSystem.Manager.getAutoStatusText(this._npc.name, this._npc.favorValue);
        
        // 处理多行内容
        this.drawWrappedText(
            statusText, 
            contentX, 
            contentY, 
            contentWidth
        );
    };
    
    FavorDetailWindow.prototype.drawRecentActivity = function() {
        // 绘制最近动态标题
        const titleX = FavorSystem.settings.recentTitleX;
        const titleY = FavorSystem.settings.recentTitleY;
        const titleFontSize = FavorSystem.settings.recentTitleFontSize;
        
        this.contents.fontSize = titleFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.recentTitleColor));
        this.drawText(FavorSystem.settings.recentTitle, titleX, titleY, this.innerWidth - titleX, 'left');
        
        // 绘制最近动态内容
        const contentX = FavorSystem.settings.recentX;
        const contentY = FavorSystem.settings.recentY;
        const contentWidth = FavorSystem.settings.recentWidth;
        const contentFontSize = FavorSystem.settings.recentFontSize;
        
        this.contents.fontSize = contentFontSize;
        this.changeTextColor(ColorManager.textColor(FavorSystem.settings.recentColor));
        
        try {
            // 尝试从管理器获取最近动态，如果没有则使用NPC对象中的值
            let recentActivity = "";
            
            // 检查是否有更新的最近动态
            const updatedActivity = FavorSystem.Manager.getRecentActivity(this._npc.name);
            if (updatedActivity) {
                recentActivity = updatedActivity;
            } else if (this._npc.recentActivity) {
                // 尝试从NPC原始数据中获取
                recentActivity = this._npc.recentActivity;
                
                // 解析可能的JSON格式引号
                if (recentActivity.startsWith('"') && recentActivity.endsWith('"')) {
                    try {
                        recentActivity = JSON.parse(recentActivity);
                    } catch (e) {
                        if (FavorSystem.settings.debugMode) {
                            console.error(`解析最近动态JSON失败: ${e.message}`);
                        }
                    }
                }
            }
            
            if (FavorSystem.settings.debugMode) {
                console.log(`NPC[${this._npc.name}]的最近动态: "${recentActivity}"`);
            }
            
            // 处理多行内容
            this.drawWrappedText(
                recentActivity, 
                contentX, 
                contentY, 
                contentWidth
            );
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`绘制最近动态失败: ${e.message}`);
            }
        }
    };
    
    // 绘制自动换行的文本
    FavorDetailWindow.prototype.drawWrappedText = function(text, x, y, width) {
        if (!text) return 0;
        
        try {
            // 确保text是字符串
            text = String(text || '');
            
            // 移除JSON解析时可能存在的引号
            if (text.startsWith('"') && text.endsWith('"')) {
                text = text.substring(1, text.length - 1);
            }
            
            const lines = this.wrapText(text, width);
            const lineHeight = this.lineHeight();
            
            for (let i = 0; i < lines.length; i++) {
                this.drawText(lines[i], x, y + i * lineHeight, width, 'left');
            }
            
            return y + lines.length * lineHeight;
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`绘制换行文本失败: ${e.message}`);
            }
            return y;
        }
    };
    
    // 文本自动换行
    FavorDetailWindow.prototype.wrapText = function(text, width) {
        try {
            const lines = [];
            const words = text.split(' ');
            let currentLine = '';
            
            // 如果是中文文本，按字符分割
            if (/[\u4e00-\u9fa5]/.test(text)) {
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const testLine = currentLine + char;
                    
                    if (this.textWidth(testLine) > width) {
                        lines.push(currentLine);
                        currentLine = char;
                    } else {
                        currentLine = testLine;
                    }
                }
            } else {
                // 英文文本按词分割
                for (let i = 0; i < words.length; i++) {
                    const word = words[i];
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    
                    if (this.textWidth(testLine) > width) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                }
            }
            
            if (currentLine) {
                lines.push(currentLine);
            }
            
            return lines;
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`文本换行处理失败: ${e.message}`);
            }
            return [text || ""];
        }
    };
    
    //=============================================================================
    // Scene_Favor - 好感度场景
    //=============================================================================
    
    function Scene_Favor() {
        this.initialize(...arguments);
    }
    
    Scene_Favor.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Favor.prototype.constructor = Scene_Favor;
    
    Scene_Favor.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
    
    Scene_Favor.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        
        // 提前预加载所有可能用到的头像
        this.preloadAllPortraits();
        
        // 创建窗口
        this.createFavorWindows();
        
        // 创建调试窗口
        if (FavorSystem.settings.debugMode) {
            this.createDebugWindow();
        }
    };
    
    // 预加载所有NPC头像
    Scene_Favor.prototype.preloadAllPortraits = function() {
        const npcList = FavorSystem.Manager.getMetNPCList();
        
        // 调试用 - 显示所有NPC的最近动态
        if (FavorSystem.settings.debugMode) {
            console.log("==== 所有NPC的最近动态 ====");
            for (const npc of npcList) {
                if (npc) {
                    const activity = FavorSystem.Manager.getRecentActivity(npc.name);
                    const defaultActivity = npc.recentActivity || "";
                    console.log(`NPC[${npc.name}]: 动态="${activity}", 默认动态="${defaultActivity}"`);
                }
            }
            console.log("==========================");
        }
        
        for (const npc of npcList) {
            if (npc && npc.faceName) {
                // 加载脸图并保存索引引用
                const bitmap = ImageManager.loadFace(npc.faceName);
                
                if (FavorSystem.settings.debugMode) {
                    console.log(`预加载脸图: ${npc.faceName}, 索引: ${npc.faceIndex || 0}`);
                    
                    // 添加调试信息
                    bitmap.addLoadListener(() => {
                        console.log(`预加载脸图完成: ${npc.faceName}, 宽度: ${bitmap.width}, 高度: ${bitmap.height}`);
                    });
                }
            }
        }
    };
    
    Scene_Favor.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        
        // 如果有背景图片，创建背景精灵
        if (FavorSystem.settings.backgroundImage) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture(FavorSystem.settings.backgroundImage);
            this._backgroundSprite.x = FavorSystem.settings.backgroundX;
            this._backgroundSprite.y = FavorSystem.settings.backgroundY;
            this._backgroundSprite.scale.x = FavorSystem.settings.bgScaleX;
            this._backgroundSprite.scale.y = FavorSystem.settings.bgScaleY;
            this._backgroundSprite.opacity = FavorSystem.settings.bgOpacity;
            this.addChild(this._backgroundSprite);
        }
    };
    
    Scene_Favor.prototype.createFavorWindows = function() {
        // 创建窗口
        this.createDetailWindow();
        this.createListWindow();
        this.createHistoryWindow();
        this.createHistoryButton();
        this.createDetailButton();
        
        // 设置窗口关联
        this._listWindow.setDetailWindow(this._detailWindow);
        
        // 初始状态：显示详情窗口，隐藏历史记录窗口
        this._detailWindow.visible = true;
        this._historyWindow.visible = false;
        this._isShowingHistory = false;
        this._selectedButton = 'detail'; // 'detail' 或 'history'
        
        // 激活角色列表窗口，停用历史记录窗口
        this._listWindow.activate();
        this._listWindow.select(0);
        this._historyWindow.deactivate();
        
        // 更新按钮外观以反映初始状态
        this.updateButtonAppearance();
    };
    
    Scene_Favor.prototype.createDetailWindow = function() {
        const detailRect = new Rectangle(
            FavorSystem.settings.detailX, 
            FavorSystem.settings.detailY, 
            FavorSystem.settings.detailWidth, 
            FavorSystem.settings.detailHeight
        );
        
        this._detailWindow = new FavorDetailWindow(detailRect);
        this.addWindow(this._detailWindow);
    };
    
    Scene_Favor.prototype.createListWindow = function() {
        const listRect = new Rectangle(
            FavorSystem.settings.listX, 
            FavorSystem.settings.listY, 
            FavorSystem.settings.listWidth, 
            FavorSystem.settings.listHeight
        );
        
        this._listWindow = new FavorListWindow(listRect);
        // 移除cancel处理器，让场景统一处理ESC键
        this._listWindow.setHandler('ok', this.onFavorListOk.bind(this));
        
        // 添加列表窗口到场景中
        this.addWindow(this._listWindow);
        
        // 重新调整层级 - 将详情窗口放到列表窗口下方
        if (this._detailWindow) {
            // 先从场景中移除详情窗口
            this.removeChild(this._detailWindow);
            // 确保详情窗口在windowLayer中
            this._windowLayer.removeChild(this._detailWindow);
            // 将详情窗口添加到windowLayer，但位于列表窗口之下
            this._windowLayer.addChildAt(this._detailWindow, 0);
        }
    };
    
    Scene_Favor.prototype.createHistoryWindow = function() {
        const historyRect = new Rectangle(
            FavorSystem.settings.historyWindowX, 
            FavorSystem.settings.historyWindowY, 
            FavorSystem.settings.historyWindowWidth, 
            FavorSystem.settings.historyWindowHeight
        );
        
        this._historyWindow = new FavorHistoryWindow(historyRect);
        this.addWindow(this._historyWindow);
    };
    
    Scene_Favor.prototype.createHistoryButton = function() {
        if (!FavorSystem.settings.showHistoryButton) return;
        
        // 创建历史记录按钮精灵
        this._historyButtonSprite = new Sprite();
        this._historyButtonSprite.x = FavorSystem.settings.historyButtonX;
        this._historyButtonSprite.y = FavorSystem.settings.historyButtonY;
        
        // 创建按钮位图
        const buttonWidth = FavorSystem.settings.historyButtonWidth;
        const buttonHeight = FavorSystem.settings.historyButtonHeight;
        this._historyButtonSprite.bitmap = new Bitmap(buttonWidth, buttonHeight);
        
        // 绘制按钮文本
        this.drawHistoryButton();
        
        // 添加到场景
        this.addChild(this._historyButtonSprite);
        
        // 设置按钮交互
        this._historyButtonSprite.interactive = true;
        this._historyButtonHovered = false;
        this._historyButtonPressed = false;
    };
    
    Scene_Favor.prototype.drawHistoryButton = function() {
        if (!this._historyButtonSprite || !this._historyButtonSprite.bitmap) return;
        
        const bitmap = this._historyButtonSprite.bitmap;
        const width = bitmap.width;
        const height = bitmap.height;
        
        bitmap.clear();
        
        // 设置字体
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = FavorSystem.settings.historyButtonFontSize;
        bitmap.textColor = ColorManager.textColor(FavorSystem.settings.historyButtonColor);
        
        // 绘制按钮文本（无边框，纯文字）
        const text = FavorSystem.settings.historyButtonText;
        bitmap.drawText(text, 0, 0, width, height, 'center');
    };
    
    Scene_Favor.prototype.updateHistoryButton = function() {
        if (!this._historyButtonSprite || !FavorSystem.settings.showHistoryButton) return;
        
        // 获取鼠标位置
        const mouseX = TouchInput.x;
        const mouseY = TouchInput.y;
        
        // 检查鼠标是否在按钮区域内
        const buttonX = this._historyButtonSprite.x;
        const buttonY = this._historyButtonSprite.y;
        const buttonWidth = FavorSystem.settings.historyButtonWidth;
        const buttonHeight = FavorSystem.settings.historyButtonHeight;
        
        const isInButton = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                          mouseY >= buttonY && mouseY <= buttonY + buttonHeight;
        
        // 更新悬停状态
        if (isInButton !== this._historyButtonHovered) {
            this._historyButtonHovered = isInButton;
            this.updateHistoryButtonAppearance();
        }
        
        // 处理点击
        if (isInButton && TouchInput.isTriggered()) {
            this._historyButtonPressed = true;
            this.updateHistoryButtonAppearance();
            SoundManager.playOk();
        } else if (this._historyButtonPressed && !TouchInput.isPressed()) {
            this._historyButtonPressed = false;
            if (isInButton) {
                this.switchToHistory();
            }
            this.updateHistoryButtonAppearance();
        }
    };
    
    Scene_Favor.prototype.updateHistoryButtonAppearance = function() {
        if (!this._historyButtonSprite) return;
        
        // 根据状态调整按钮透明度
        if (this._historyButtonPressed) {
            this._historyButtonSprite.opacity = 180;
        } else if (this._historyButtonHovered) {
            this._historyButtonSprite.opacity = 220;
        } else {
            this._historyButtonSprite.opacity = 255;
        }
    };
    
    Scene_Favor.prototype.toggleHistoryWindow = function() {
        this._isShowingHistory = !this._isShowingHistory;
        
        if (this._isShowingHistory) {
            // 显示历史记录窗口，隐藏详情窗口
            this._detailWindow.visible = false;
            this._historyWindow.visible = true;
            
            // 设置历史记录窗口显示当前选中角色的历史记录
            const currentNPC = this._listWindow.item();
            this._historyWindow.setNPC(currentNPC);
            
            this._historyWindow.refresh();
            this._historyWindow.activate();
            // 停用角色列表窗口，避免键盘冲突
            this._listWindow.deactivate();
        } else {
            // 显示详情窗口，隐藏历史记录窗口
            this._historyWindow.visible = false;
            this._detailWindow.visible = true;
            this._historyWindow.deactivate();
            // 重新激活角色列表窗口
            this._listWindow.activate();
        }
    };
    
    Scene_Favor.prototype.onFavorListOk = function() {
        this._listWindow.activate();
    };
    
    //=============================================================================
    // 调试相关功能
    //=============================================================================
    
    // 创建调试窗口
    Scene_Favor.prototype.createDebugWindow = function() {
        // 创建更加紧凑的调试窗口，高度更小
        const rect = new Rectangle(0, Graphics.height - 150, Graphics.width, 150);
        this._debugWindow = new Debug_Window(rect);
        this._debugWindow.setScene(this);
        this.addWindow(this._debugWindow);
    };
    
    Scene_Favor.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        
        // 更新历史记录按钮
        this.updateHistoryButton();
        this.updateDetailButton();
        
        // 处理左右切换
        if (Input.isTriggered('left')) {
            this.switchToDetail();
            return;
        } else if (Input.isTriggered('right')) {
            this.switchToHistory();
            return;
        }
        
        // 处理Tab键切换
        if (Input.isTriggered('tab')) {
            if (this._selectedButton === 'detail') {
                this.switchToHistory();
            } else {
                this.switchToDetail();
            }
            return;
        }
        
        // 处理ESC键
        if (Input.isTriggered('cancel')) {
            this.popScene();
            return;
        }
        
        // 如果窗口位置被调试系统修改，需要更新窗口布局
        if (FavorSystem.settings.debugMode && this._debugWindow && this._debugWindow._isVisible) {
            this.updateWindowLayouts();
        }
    };
    
    Scene_Favor.prototype.switchToDetail = function() {
        this._selectedButton = 'detail';
        this._isShowingHistory = false;
        this._detailWindow.visible = true;
        this._historyWindow.visible = false;
        this._historyWindow.deactivate();
        // 重新激活角色列表窗口
        this._listWindow.activate();
        this.updateButtonAppearance();
    };
    
    Scene_Favor.prototype.switchToHistory = function() {
        if (FavorSystem.settings.showHistoryButton) {
            this._selectedButton = 'history';
            this._isShowingHistory = true;
            this._detailWindow.visible = false;
            this._historyWindow.visible = true;
            
            // 设置历史记录窗口显示当前选中角色的历史记录
            const currentNPC = this._listWindow.item();
            this._historyWindow.setNPC(currentNPC);
            
            this._historyWindow.refresh();
            this._historyWindow.activate();
            // 停用角色列表窗口，避免键盘冲突
            this._listWindow.deactivate();
            this.updateButtonAppearance();
        }
    };
    
    Scene_Favor.prototype.updateButtonAppearance = function() {
        this.drawDetailButton();
        this.drawHistoryButton();
    };
    
    Scene_Favor.prototype.updateWindowLayouts = function() {
        // 更新NPC列表窗口位置和大小
        if (this._listWindow) {
            this._listWindow.x = FavorSystem.settings.listX;
            this._listWindow.y = FavorSystem.settings.listY;
            // 如果窗口大小改变，需要重新创建窗口
            if (this._listWindow.width != FavorSystem.settings.listWidth || 
                this._listWindow.height != FavorSystem.settings.listHeight) {
                    
                const index = this._listWindow.index();
                const rect = new Rectangle(
                    FavorSystem.settings.listX,
                    FavorSystem.settings.listY,
                    FavorSystem.settings.listWidth,
                    FavorSystem.settings.listHeight
                );
                
                this.removeWindow(this._listWindow);
                this._listWindow = new FavorListWindow(rect);
                this._listWindow.setHandler('ok', this.onFavorListOk.bind(this));
                this._listWindow.setDetailWindow(this._detailWindow);
                this.addWindow(this._listWindow);
                
                this._listWindow.activate();
                this._listWindow.select(index);
            }
        }
        
        // 更新详情窗口位置和大小
        if (this._detailWindow) {
            this._detailWindow.x = FavorSystem.settings.detailX;
            this._detailWindow.y = FavorSystem.settings.detailY;
            
            // 如果窗口大小改变，需要重新创建窗口
            if (this._detailWindow.width != FavorSystem.settings.detailWidth || 
                this._detailWindow.height != FavorSystem.settings.detailHeight) {
                    
                const npc = this._detailWindow._npc;
                const rect = new Rectangle(
                    FavorSystem.settings.detailX,
                    FavorSystem.settings.detailY,
                    FavorSystem.settings.detailWidth,
                    FavorSystem.settings.detailHeight
                );
                
                this.removeWindow(this._detailWindow);
                this._detailWindow = new FavorDetailWindow(rect);
                if (this._listWindow) {
                    this._listWindow.setDetailWindow(this._detailWindow);
                }
                this.addWindow(this._detailWindow);
                
                if (npc) {
                    this._detailWindow.setNPC(npc);
                }
            }
        }
        
        // 更新历史记录窗口位置和大小
        if (this._historyWindow) {
            this._historyWindow.x = FavorSystem.settings.historyWindowX;
            this._historyWindow.y = FavorSystem.settings.historyWindowY;
            
            // 如果窗口大小改变，需要重新创建窗口
            if (this._historyWindow.width != FavorSystem.settings.historyWindowWidth || 
                this._historyWindow.height != FavorSystem.settings.historyWindowHeight) {
                    
                const wasVisible = this._historyWindow.visible;
                const rect = new Rectangle(
                    FavorSystem.settings.historyWindowX,
                    FavorSystem.settings.historyWindowY,
                    FavorSystem.settings.historyWindowWidth,
                    FavorSystem.settings.historyWindowHeight
                );
                
                this.removeWindow(this._historyWindow);
                this._historyWindow = new FavorHistoryWindow(rect);
                this.addWindow(this._historyWindow);
                this._historyWindow.visible = wasVisible;
            }
        }
        
        // 更新历史记录按钮位置和大小
        if (this._historyButtonSprite) {
            this._historyButtonSprite.x = FavorSystem.settings.historyButtonX;
            this._historyButtonSprite.y = FavorSystem.settings.historyButtonY;
            
            // 如果按钮大小改变，需要重新创建按钮
            const currentWidth = this._historyButtonSprite.bitmap ? this._historyButtonSprite.bitmap.width : 0;
            const currentHeight = this._historyButtonSprite.bitmap ? this._historyButtonSprite.bitmap.height : 0;
            
            if (currentWidth != FavorSystem.settings.historyButtonWidth || 
                currentHeight != FavorSystem.settings.historyButtonHeight) {
                    
                // 重新创建按钮位图
                const buttonWidth = FavorSystem.settings.historyButtonWidth;
                const buttonHeight = FavorSystem.settings.historyButtonHeight;
                this._historyButtonSprite.bitmap = new Bitmap(buttonWidth, buttonHeight);
                this.drawHistoryButton();
            }
        }
        
        // 更新角色详情按钮位置和大小
        if (this._detailButtonSprite) {
            this._detailButtonSprite.x = FavorSystem.settings.detailButtonX;
            this._detailButtonSprite.y = FavorSystem.settings.detailButtonY;
            
            // 如果按钮大小改变，需要重新创建按钮
            const currentWidth = this._detailButtonSprite.bitmap ? this._detailButtonSprite.bitmap.width : 0;
            const currentHeight = this._detailButtonSprite.bitmap ? this._detailButtonSprite.bitmap.height : 0;
            
            if (currentWidth != FavorSystem.settings.detailButtonWidth || 
                currentHeight != FavorSystem.settings.detailButtonHeight) {
                    
                // 重新创建按钮位图
                const buttonWidth = FavorSystem.settings.detailButtonWidth;
                const buttonHeight = FavorSystem.settings.detailButtonHeight;
                this._detailButtonSprite.bitmap = new Bitmap(buttonWidth, buttonHeight);
                this.drawDetailButton();
            }
        }
        
        // 更新背景图位置
        if (this._backgroundSprite) {
            this._backgroundSprite.x = FavorSystem.settings.backgroundX;
            this._backgroundSprite.y = FavorSystem.settings.backgroundY;
            this._backgroundSprite.scale.x = FavorSystem.settings.bgScaleX;
            this._backgroundSprite.scale.y = FavorSystem.settings.bgScaleY;
            this._backgroundSprite.opacity = FavorSystem.settings.bgOpacity;
        }
    };
    
    //=============================================================================
    // Debug_Window - 调试窗口
    //=============================================================================
    
    function Debug_Window() {
        this.initialize(...arguments);
    }
    
    Debug_Window.prototype = Object.create(Window_Base.prototype);
    Debug_Window.prototype.constructor = Debug_Window;
    
    Debug_Window.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._scene = null;
        this._selectedItem = 0;
        this._items = [
            { name: "背景图", propX: "backgroundX", propY: "backgroundY", obj: "_backgroundSprite", affectsAnimFrames: false },
            { name: "角色列表", propX: "listX", propY: "listY", propW: "listWidth", propH: "listHeight", obj: "_listWindow" },
            { name: "角色详情", propX: "detailX", propY: "detailY", propW: "detailWidth", propH: "detailHeight", obj: "_detailWindow" },
            { name: "角色详情按钮", propX: "detailButtonX", propY: "detailButtonY", propW: "detailButtonWidth", propH: "detailButtonHeight", obj: "_detailButtonSprite" },
            { name: "历史记录按钮", propX: "historyButtonX", propY: "historyButtonY", propW: "historyButtonWidth", propH: "historyButtonHeight", obj: "_historyButtonSprite" },
            { name: "历史记录窗口", propX: "historyWindowX", propY: "historyWindowY", propW: "historyWindowWidth", propH: "historyWindowHeight", obj: "_historyWindow" }
        ];
        this._isVisible = true;
        this._isAdjustingSize = false;
        this._adjustAmount = 1; // 默认调整量
        this._mouseStartX = 0;
        this._mouseStartY = 0;
        this._isDragging = false;
        this._buttons = [];
        this.createControlButtons();
        this.refresh();
    };
    
    Debug_Window.prototype.createControlButtons = function() {
        // 清除已有按钮
        this._buttons = [];
        
        // 计算按钮布局
        const rowHeight = 30;
        const marginY = 60; // 前两行是文本信息
        
        // 获取屏幕宽度，并计算按钮尺寸
        const colWidth = Math.floor(this.innerWidth / 10); // 每列的宽度
        const btnWidth = colWidth - 4;
        const btnHeight = 26;
        
        // 创建各种控制按钮 - 全部放在一行
        // 组件选择
        this.createButton("◀组件", colWidth * 0 + 2, marginY, btnWidth, btnHeight, () => this.selectPrevItem());
        this.createButton("组件▶", colWidth * 1 + 2, marginY, btnWidth, btnHeight, () => this.selectNextItem());
        
        // 位置调整按钮
        this.createButton("←", colWidth * 2 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(-1, 0));
        this.createButton("→", colWidth * 3 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(1, 0));
        this.createButton("↑", colWidth * 4 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(0, -1));
        this.createButton("↓", colWidth * 5 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(0, 1));
        
        // 大小调整
        this.createButton("W±", colWidth * 6 + 2, marginY, btnWidth, btnHeight, () => this.toggleSizeButtons());
        
        // 调整量
        this.createButton("×1", colWidth * 7 + 2, marginY, btnWidth, btnHeight, () => this.setAdjustAmount(1));
        this.createButton("×5", colWidth * 8 + 2, marginY, btnWidth, btnHeight, () => this.setAdjustAmount(5));
        
        // 保存按钮
        this.createButton("保存配置", colWidth * 9 + 2, marginY, btnWidth, btnHeight, () => this.saveSettings());
        
        // 第二行按钮 - 宽高调整按钮（隐藏）
        this._sizeButtonsVisible = false;
        this._sizeButtons = [];
        
        const sizeBtn1 = { text: "W-", x: colWidth * 6 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(-1, 0), isHovered: false, isPressed: false };
        const sizeBtn2 = { text: "W+", x: colWidth * 6 + btnWidth/2 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(1, 0), isHovered: false, isPressed: false };
        const sizeBtn3 = { text: "H-", x: colWidth * 7 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(0, -1), isHovered: false, isPressed: false };
        const sizeBtn4 = { text: "H+", x: colWidth * 7 + btnWidth/2 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(0, 1), isHovered: false, isPressed: false };
        
        this._sizeButtons.push(sizeBtn1, sizeBtn2, sizeBtn3, sizeBtn4);
    };
    
    Debug_Window.prototype.setScene = function(scene) {
        this._scene = scene;
    };
    
    Debug_Window.prototype.toggleVisibility = function() {
        this._isVisible = !this._isVisible;
        this.visible = this._isVisible;
    };
    
    Debug_Window.prototype.createButton = function(text, x, y, width, height, callback) {
        const button = { 
            text: text, 
            x: x, 
            y: y, 
            width: width, 
            height: height, 
            callback: callback,
            isHovered: false,
            isPressed: false
        };
        this._buttons.push(button);
    };
    
    Debug_Window.prototype.drawButton = function(button) {
        const x = button.x;
        const y = button.y;
        const width = button.width;
        const height = button.height;
        
        // 绘制按钮背景
        let color = button.isPressed ? ColorManager.textColor(4) : 
                    button.isHovered ? ColorManager.textColor(2) : 
                    ColorManager.itemBackColor2();
        
        this.contents.fillRect(x, y, width, height, color);
        this.contents.strokeRect(x, y, width, height, ColorManager.normalColor());
        
        // 绘制按钮文字
        this.contents.fontSize = Math.min(16, width / 4);
        this.resetTextColor();
        this.drawText(button.text, x, y + 2, width, 'center');
    };
    
    Debug_Window.prototype.setAdjustAmount = function(amount) {
        this._adjustAmount = amount;
        this.refresh();
    };
    
    Debug_Window.prototype.selectPrevItem = function() {
        this._selectedItem = (this._selectedItem - 1 + this._items.length) % this._items.length;
        this.refresh();
    };
    
    Debug_Window.prototype.selectNextItem = function() {
        this._selectedItem = (this._selectedItem + 1) % this._items.length;
        this.refresh();
    };
    
    Debug_Window.prototype.adjustPosition = function(dx, dy) {
        const item = this._items[this._selectedItem];
        const obj = this._scene[item.obj];
        
        if (obj) {
            if (dx !== 0) {
                FavorSystem.settings[item.propX] += dx * this._adjustAmount;
                obj.x += dx * this._adjustAmount;
            }
            
            if (dy !== 0) {
                FavorSystem.settings[item.propY] += dy * this._adjustAmount;
                obj.y += dy * this._adjustAmount;
            }
            
            this.refresh();
        }
    };
    
    Debug_Window.prototype.adjustSize = function(dw, dh) {
        const item = this._items[this._selectedItem];
        const obj = this._scene[item.obj];
        
        if (obj) {
            if (dw !== 0 && item.propW) {
                FavorSystem.settings[item.propW] += dw * this._adjustAmount;
                if (obj.width !== undefined) obj.width += dw * this._adjustAmount;
            }
            
            if (dh !== 0 && item.propH) {
                FavorSystem.settings[item.propH] += dh * this._adjustAmount;
                if (obj.height !== undefined) obj.height += dh * this._adjustAmount;
            }
            
            this.refresh();
            
            // 在改变大小后可能需要重新创建窗口
            this._scene.updateWindowLayouts();
        }
    };
    
    Debug_Window.prototype.toggleSizeButtons = function() {
        this._sizeButtonsVisible = !this._sizeButtonsVisible;
        this.refresh();
    };
    
    Debug_Window.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        
        // 检测F5键切换显示
        if (Input.isTriggered('f5') || Input.isTriggered('f8')) {  // macOS上可能F5不方便，增加F8作为替代
            this.toggleVisibility();
        }
        
        if (!this._isVisible || !this._scene) return;
        
        // 处理按键输入
        this.handleKeyInput();
        
        // 处理鼠标输入
        this.handleMouseInput();
    };
    
    Debug_Window.prototype.handleKeyInput = function() {
        // 基础按键控制
        const moveSpeed = this._adjustAmount;
        
        // 方向键移动
        if (Input.isPressed('left')) this.adjustPosition(-1, 0);
        if (Input.isPressed('right')) this.adjustPosition(1, 0);
        if (Input.isPressed('up')) this.adjustPosition(0, -1);
        if (Input.isPressed('down')) this.adjustPosition(0, 1);
        
        // 切换选择项 (Tab键)
        if (Input.isTriggered('tab')) {
            this._selectedItem = (this._selectedItem + 1) % this._items.length;
            this.refresh();
        }
        
        // 保存设置 (Command+S)
        if ((Input.isPressed('control') || Input.isPressed('command')) && Input.isTriggered('s')) {
            this.saveSettings();
        }
    };
    
    Debug_Window.prototype.handleMouseInput = function() {
        if (!TouchInput.isPressed()) {
            // 鼠标松开时重置拖拽状态
            this._isDragging = false;
        }
        
        // 获取相对于窗口的鼠标坐标
        const mouseX = TouchInput.x - this.x - this.padding;
        const mouseY = TouchInput.y - this.y - this.padding;
        
        // 检查按钮点击和悬停
        let buttonClicked = false;
        
        // 先检查普通按钮
        const allButtons = [...this._buttons];
        
        // 如果尺寸按钮可见，也加入检查
        if (this._sizeButtonsVisible && this._sizeButtons) {
            allButtons.push(...this._sizeButtons);
        }
        
        for (const button of allButtons) {
            const isInButton = mouseX >= button.x && mouseX <= button.x + button.width &&
                              mouseY >= button.y && mouseY <= button.y + button.height;
            
            // 检查悬停状态变化
            if (isInButton !== button.isHovered) {
                button.isHovered = isInButton;
                this.refresh();
            }
            
            // 检查点击
            if (isInButton && TouchInput.isTriggered()) {
                button.isPressed = true;
                this.refresh();
            } else if (button.isPressed && !TouchInput.isPressed()) {
                button.isPressed = false;
                if (isInButton) {
                    button.callback();
                    buttonClicked = true;
                }
                this.refresh();
            }
        }
        
        // 如果点击了按钮，不处理拖拽
        if (buttonClicked) return;
        
        // 处理组件拖拽
        if (TouchInput.isTriggered()) {
            this._mouseStartX = TouchInput.x;
            this._mouseStartY = TouchInput.y;
            this._isDragging = true;
        } else if (this._isDragging && TouchInput.isPressed()) {
            const deltaX = TouchInput.x - this._mouseStartX;
            const deltaY = TouchInput.y - this._mouseStartY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                const item = this._items[this._selectedItem];
                const obj = this._scene[item.obj];
                
                if (obj) {
                    // 移动组件
                    FavorSystem.settings[item.propX] += deltaX;
                    FavorSystem.settings[item.propY] += deltaY;
                    obj.x += deltaX;
                    obj.y += deltaY;
                    
                    this._mouseStartX = TouchInput.x;
                    this._mouseStartY = TouchInput.y;
                    this.refresh();
                }
            }
        }
    };
    
    Debug_Window.prototype.refresh = function() {
        this.contents.clear();
        if (!this._scene) return;
        
        // 绘制标题和当前选中项信息
        this.contents.fontSize = 16;
        
        // 绘制当前选中项信息
        const item = this._items[this._selectedItem];
        if (!item) return;
        
        // 第一行: 标题和当前组件信息
        this.drawText(`调试器: 当前选中[${item.name}] | 调整量×${this._adjustAmount}`, 5, 5, this.innerWidth - 10);
        
        // 第二行: 坐标和尺寸信息
        const obj = this._scene[item.obj];
        if (obj) {
            let info = `X:${obj.x}(${FavorSystem.settings[item.propX]}) Y:${obj.y}(${FavorSystem.settings[item.propY]})`;
            if (item.propW && item.propH) {
                info += ` W:${obj.width}(${FavorSystem.settings[item.propW]}) H:${obj.height}(${FavorSystem.settings[item.propH]})`;
            }
            this.drawText(info, 5, 30, this.innerWidth - 10);
        }
        
        // 绘制控制按钮
        for (const button of this._buttons) {
            this.drawButton(button);
        }
        
        // 如果尺寸按钮可见，则绘制它们
        if (this._sizeButtonsVisible && this._sizeButtons) {
            for (const button of this._sizeButtons) {
                this.drawButton(button);
            }
        }
    };
    
    Debug_Window.prototype.saveSettings = function() {
        const output = {};
        
        // 收集所有设置
        for (const key in FavorSystem.settings) {
            if (key !== 'debugMode') {
                output[key] = FavorSystem.settings[key];
            }
        }
        
        // 输出到控制台
        console.log("当前好感度系统配置:");
        console.log(JSON.stringify(output, null, 2));
        
        // 显示保存成功信息
        this.showSaveMessage();
    };
    
    Debug_Window.prototype.showSaveMessage = function() {
        // 在原有内容上显示保存成功信息
        const width = 300;
        const height = 60;
        const x = (this.innerWidth - width) / 2;
        const y = (this.innerHeight - height) / 2;
        
        this.contents.fillRect(x, y, width, height, ColorManager.textColor(29));
        this.contents.strokeRect(x, y, width, height, ColorManager.normalColor());
        
        this.contents.fontSize = 16;
        this.resetTextColor();
        this.drawText("配置已保存到控制台!", x, y + 10, width, 'center');
        this.drawText("按F12打开控制台查看", x, y + 35, width, 'center');
    };
    
    // 确保Scene_Favor定义在全局作用域
    window.Scene_Favor = Scene_Favor;
    
    // 监听对话文本，寻找特定标记来识别NPC
    const _Game_Message_add = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        _Game_Message_add.call(this, text);
        
        // 检查文本中是否包含NPC标记 <npc:名称>
        if (text && typeof text === 'string') {
            // 方法1: 检查文本中是否包含NPC标记 <npc:名称>
            const npcMatch = text.match(/<npc:([^>]+)>/i);
            if (npcMatch && npcMatch[1]) {
                const npcName = npcMatch[1].trim();
                this._tryMarkNPCasMet(npcName, "文本标记");
            } 
            // 方法2: 检查文本是否以"角色名："开头
            else {
                // 常见的对话格式：角色名：对话内容 或 角色名:对话内容
                const nameMatch = text.match(/^([^:：]+)[：:]/);
                if (nameMatch && nameMatch[1]) {
                    const possibleName = nameMatch[1].trim();
                    this._tryMarkNPCasMet(possibleName, "对话开头");
                }
            }
        }
    };

    // 尝试标记NPC为已遇到
    Game_Message.prototype._tryMarkNPCasMet = function(npcName, source) {
        // 在NPC列表中查找匹配的名称
        const npcIndex = FavorSystem.Manager.getNPCList().findIndex(npc => 
            npc.name === npcName);
        
        // 如果找到匹配的NPC，标记为已遇到
        if (npcIndex >= 0) {
            FavorSystem.Manager.markNPCasMet(npcIndex);
            
            if (FavorSystem.settings.debugMode) {
                console.log(`通过${source}已自动标记NPC[${npcName}]为已遇到`);
            }
            return true;
        }
        return false;
    };
    
    //=============================================================================
    // FavorHistoryWindow - 好感度历史记录窗口
    //=============================================================================
    
    function FavorHistoryWindow() {
        this.initialize(...arguments);
    }
    
    FavorHistoryWindow.prototype = Object.create(Window_Base.prototype);
    FavorHistoryWindow.prototype.constructor = FavorHistoryWindow;
    
    FavorHistoryWindow.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._scrollIndex = 0; // 当前显示的第一个条目索引
        this._maxScrollIndex = 0; // 最大滚动索引
        this._currentNPC = null; // 当前显示历史记录的NPC
        this.opacity = 0;
        this.frameVisible = false;
        this.refresh();
    };
    
    FavorHistoryWindow.prototype.setNPC = function(npc) {
        if (this._currentNPC !== npc) {
            this._currentNPC = npc;
            this._scrollIndex = 0; // 重置滚动位置
            this.refresh();
        }
    };
    
    FavorHistoryWindow.prototype.refresh = function() {
        this.contents.clear();
        this.drawHistoryTitle();
        this.drawHistoryEntries();
        this.updateScrollLimit();
    };
    
    FavorHistoryWindow.prototype.drawHistoryTitle = function() {
        // 不绘制标题和分隔线，保持方法存在以避免错误
    };
    
    FavorHistoryWindow.prototype.drawHistoryEntries = function() {
        // 获取当前NPC的历史记录
        let history = [];
        if (this._currentNPC && this._currentNPC.name) {
            history = FavorSystem.Manager.getNPCHistory(this._currentNPC.name);
        }
        
        const contentFontSize = FavorSystem.settings.historyContentFontSize;
        const contentColor = FavorSystem.settings.historyContentColor;
        const timeFontSize = FavorSystem.settings.historyTimeFontSize;
        const timeColor = FavorSystem.settings.historyTimeColor;
        const timeX = FavorSystem.settings.historyTimeX;
        const timeY = FavorSystem.settings.historyTimeY;
        const maxVisibleEntries = FavorSystem.settings.maxVisibleHistoryEntries;
        
        const startY = 20; // 从窗口顶部开始，留一点边距
        let currentY = startY;
        const lineHeight = contentFontSize + 8;
        const entrySpacing = FavorSystem.settings.historyEntrySpacing;
        
        if (history.length === 0) {
            this.contents.fontSize = contentFontSize;
            this.changeTextColor(ColorManager.textColor(contentColor));
            const message = this._currentNPC ? `${this._currentNPC.name} 暂无历史记录` : "请选择角色查看历史记录";
            this.drawText(message, 20, currentY, this.innerWidth - 40, 'center');
            return;
        }
        
        // 只显示当前可见范围内的条目
        const endIndex = Math.min(this._scrollIndex + maxVisibleEntries, history.length);
        
        for (let i = this._scrollIndex; i < endIndex; i++) {
            const entry = history[i];
            
            // 绘制活动内容（支持换行）
            this.contents.fontSize = contentFontSize;
            this.changeTextColor(ColorManager.textColor(contentColor));
            
            const wrappedText = this.wrapText(entry.activityText, this.innerWidth - 40);
            for (let j = 0; j < wrappedText.length; j++) {
                this.drawText(wrappedText[j], 20, currentY + j * lineHeight, this.innerWidth - 40, 'left');
            }
            
            // 绘制时间戳（使用自定义位置）
            const timeYPos = currentY + wrappedText.length * lineHeight + timeY;
            this.contents.fontSize = timeFontSize;
            this.changeTextColor(ColorManager.textColor(timeColor));
            this.drawText(entry.timestamp, timeX, timeYPos, this.innerWidth - timeX - 20, 'left');
            
            currentY = timeYPos + lineHeight + entrySpacing;
        }
    };
    
    FavorHistoryWindow.prototype.wrapText = function(text, width) {
        try {
            const lines = [];
            const words = text.split(' ');
            let currentLine = '';
            
            // 如果是中文文本，按字符分割
            if (/[\u4e00-\u9fa5]/.test(text)) {
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const testLine = currentLine + char;
                    
                    if (this.textWidth(testLine) > width) {
                        lines.push(currentLine);
                        currentLine = char;
                    } else {
                        currentLine = testLine;
                    }
                }
            } else {
                // 英文文本按词分割
                for (let i = 0; i < words.length; i++) {
                    const word = words[i];
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    
                    if (this.textWidth(testLine) > width) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                }
            }
            
            if (currentLine) {
                lines.push(currentLine);
            }
            
            return lines;
        } catch (e) {
            if (FavorSystem.settings.debugMode) {
                console.error(`历史记录文本换行处理失败: ${e.message}`);
            }
            return [text || ""];
        }
    };
    
    FavorHistoryWindow.prototype.updateScrollLimit = function() {
        // 获取当前NPC的历史记录
        let history = [];
        if (this._currentNPC && this._currentNPC.name) {
            history = FavorSystem.Manager.getNPCHistory(this._currentNPC.name);
        }
        
        const maxVisibleEntries = FavorSystem.settings.maxVisibleHistoryEntries;
        
        // 计算最大滚动索引
        this._maxScrollIndex = Math.max(0, history.length - maxVisibleEntries);
    };
    
    FavorHistoryWindow.prototype.scrollUp = function() {
        if (this._scrollIndex > 0) {
            this._scrollIndex--;
            this.refresh();
        }
    };
    
    FavorHistoryWindow.prototype.scrollDown = function() {
        if (this._scrollIndex < this._maxScrollIndex) {
            this._scrollIndex++;
            this.refresh();
        }
    };
    
    FavorHistoryWindow.prototype.processWheelScroll = function() {
        if (this.isOpen() && this.visible) {
            if (TouchInput.wheelY < 0) {
                this.scrollUp();
            } else if (TouchInput.wheelY > 0) {
                this.scrollDown();
            }
        }
    };
    
    FavorHistoryWindow.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.processWheelScroll();
        
        // 处理键盘滚动
        if (this.active) {
            if (Input.isRepeated('up')) {
                this.scrollUp();
            } else if (Input.isRepeated('down')) {
                this.scrollDown();
            }
        }
    };
    
    FavorHistoryWindow.prototype.activate = function() {
        this.active = true;
    };
    
    FavorHistoryWindow.prototype.deactivate = function() {
        this.active = false;
    };
    
    Scene_Favor.prototype.createDetailButton = function() {
        if (!FavorSystem.settings.showDetailButton) return;
        
        // 创建角色详情按钮精灵
        this._detailButtonSprite = new Sprite();
        this._detailButtonSprite.x = FavorSystem.settings.detailButtonX;
        this._detailButtonSprite.y = FavorSystem.settings.detailButtonY;
        
        // 创建按钮位图
        const buttonWidth = FavorSystem.settings.detailButtonWidth;
        const buttonHeight = FavorSystem.settings.detailButtonHeight;
        this._detailButtonSprite.bitmap = new Bitmap(buttonWidth, buttonHeight);
        
        // 绘制按钮文本
        this.drawDetailButton();
        
        // 添加到场景
        this.addChild(this._detailButtonSprite);
        
        // 设置按钮交互
        this._detailButtonSprite.interactive = true;
        this._detailButtonHovered = false;
        this._detailButtonPressed = false;
    };
    
    Scene_Favor.prototype.drawDetailButton = function() {
        if (!this._detailButtonSprite || !this._detailButtonSprite.bitmap) return;
        
        const bitmap = this._detailButtonSprite.bitmap;
        const width = bitmap.width;
        const height = bitmap.height;
        
        bitmap.clear();
        
        // 设置字体
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = FavorSystem.settings.detailButtonFontSize;
        
        // 根据选择状态设置颜色
        if (this._selectedButton === 'detail') {
            bitmap.textColor = ColorManager.textColor(FavorSystem.settings.buttonHighlightColor);
        } else {
            bitmap.textColor = ColorManager.textColor(FavorSystem.settings.detailButtonColor);
        }
        
        // 绘制按钮文本（无边框，纯文字）
        const text = FavorSystem.settings.detailButtonText;
        bitmap.drawText(text, 0, 0, width, height, 'center');
    };
    
    Scene_Favor.prototype.drawHistoryButton = function() {
        if (!this._historyButtonSprite || !this._historyButtonSprite.bitmap) return;
        
        const bitmap = this._historyButtonSprite.bitmap;
        const width = bitmap.width;
        const height = bitmap.height;
        
        bitmap.clear();
        
        // 设置字体
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = FavorSystem.settings.historyButtonFontSize;
        
        // 根据选择状态设置颜色
        if (this._selectedButton === 'history') {
            bitmap.textColor = ColorManager.textColor(FavorSystem.settings.buttonHighlightColor);
        } else {
            bitmap.textColor = ColorManager.textColor(FavorSystem.settings.historyButtonColor);
        }
        
        // 绘制按钮文本（无边框，纯文字）
        const text = FavorSystem.settings.historyButtonText;
        bitmap.drawText(text, 0, 0, width, height, 'center');
    };
    
    Scene_Favor.prototype.updateDetailButton = function() {
        if (!this._detailButtonSprite || !FavorSystem.settings.showDetailButton) return;
        
        // 获取鼠标位置
        const mouseX = TouchInput.x;
        const mouseY = TouchInput.y;
        
        // 检查鼠标是否在按钮区域内
        const buttonX = this._detailButtonSprite.x;
        const buttonY = this._detailButtonSprite.y;
        const buttonWidth = FavorSystem.settings.detailButtonWidth;
        const buttonHeight = FavorSystem.settings.detailButtonHeight;
        
        const isInButton = mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
                          mouseY >= buttonY && mouseY <= buttonY + buttonHeight;
        
        // 更新悬停状态
        if (isInButton !== this._detailButtonHovered) {
            this._detailButtonHovered = isInButton;
            this.updateDetailButtonAppearance();
        }
        
        // 处理点击
        if (isInButton && TouchInput.isTriggered()) {
            this._detailButtonPressed = true;
            this.updateDetailButtonAppearance();
            SoundManager.playOk();
        } else if (this._detailButtonPressed && !TouchInput.isPressed()) {
            this._detailButtonPressed = false;
            if (isInButton) {
                this.switchToDetail();
            }
            this.updateDetailButtonAppearance();
        }
    };
    
    Scene_Favor.prototype.updateDetailButtonAppearance = function() {
        if (!this._detailButtonSprite) return;
        
        // 根据状态调整按钮透明度
        if (this._detailButtonPressed) {
            this._detailButtonSprite.opacity = 180;
        } else if (this._detailButtonHovered) {
            this._detailButtonSprite.opacity = 220;
        } else {
            this._detailButtonSprite.opacity = 255;
        }
    };
})(); 