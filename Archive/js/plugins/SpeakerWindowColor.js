/*:
 * @target MZ
 * @plugindesc Speaker-based message and name window background color v1.7 (complete solution) by SekiShiyo
 * @author SekiShiyo
 *
 * @param SpeakerColors
 * @text Speaker Color Config
 * @type struct<ColorConfig>[]
 * @desc Set background colors for specific speakers
 *
 * @param DefaultColor
 * @text Default Background Color
 * @type string
 * @default rgba(0,0,0,0.3)
 * @desc Used when no speaker name matches; supports transparency
 *
 * @help
 * ✅ Keeps default window skin and border
 * ✅ Prevents white flash on name window open/close
 * ✅ Auto-hides background if no speaker name is shown
 * ✅ Complete choice window background fix
 * ✅ Replaces DialogueTint.js - disable other dialogue color plugins
 */

/*~struct~ColorConfig:
 * @param name
 * @text Speaker Name
 * @type string
 *
 * @param color
 * @text Background Color (RGBA)
 * @type string
 * @default rgba(0,0,0,180)
 */

(() => {
    const pluginName = "SpeakerWindowColor";
    const params = PluginManager.parameters(pluginName);
  
    const colorConfigs = JSON.parse(params["SpeakerColors"] || "[]").map(str => {
      const obj = JSON.parse(str);
      return { name: obj.name, color: obj.color };
    });
    const defaultColor = params["DefaultColor"] || "rgba(0,0,0,0.3)";
  
    function parseCssColor(text) {
      const vals = text.replace(/\s+/g, "").replace(/^rgba?\(/i, "").replace(/\)$/, "").split(",");
      if (vals.length >= 3) {
        const r = parseInt(vals[0]);
        const g = parseInt(vals[1]);
        const b = parseInt(vals[2]);
        let a = parseFloat(vals[3] ?? "255");
        if (a > 1) a = a / 255;
        return `rgba(${r},${g},${b},${a.toFixed(3)})`;
      }
      return text;
    }

    function updateCustomBackground(window, width, height) {
      const name = $gameMessage.speakerName();
      const match = colorConfigs.find(cfg => cfg.name === name);
      const color = match ? parseCssColor(match.color) : parseCssColor(defaultColor);

      // Clean up existing background
      if (window._customBgSprite) {
        window.removeChild(window._customBgSprite);
        window._customBgSprite.destroy();
        window._customBgSprite = null;
      }

      // Create background similar to NameBox approach
      const bmp = new Bitmap(width, height);
      bmp.fillRect(0, 0, width, height, color);
      window._customBgSprite = new Sprite(bmp);
      window._customBgSprite.z = -2;
      window.addChildToBack(window._customBgSprite);
    }
  
    // ✅ Message window background
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
      updateCustomBackground(this, this.width, this.height);
      _Window_Message_startMessage.call(this);
    };
  
    // ✅ Name box with no flash and window skin
    const _Window_NameBox_start = Window_NameBox.prototype.start;
    Window_NameBox.prototype.start = function () {
      const name = $gameMessage.speakerName();
      const showBg = name && name.trim();
      this._lastSpeakerName = name;
  
      if (this._customNameBg) {
        this.removeChild(this._customNameBg);
        this._customNameBg.destroy();
        this._customNameBg = null;
      }
  
      _Window_NameBox_start.call(this); // ← run system layout first
  
      if (showBg && this.width > 0 && this.height > 0) {
        const match = colorConfigs.find(cfg => cfg.name === name);
        const color = match ? parseCssColor(match.color) : parseCssColor(defaultColor);
  
        const bmp = new Bitmap(this.width, this.height);
        bmp.fillRect(0, 0, this.width, this.height, color);
        this._customNameBg = new Sprite(bmp);
        this._customNameBg.z = -2;
        this.addChildToBack(this._customNameBg);
      }
  
      if (this.contentsBack) {
        this.contentsBack.clear(); // 💡 prevent flashing system white bg
      }
    };

    // ✅ Choice window background - using contentsBack approach
    const _Window_ChoiceList_start = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function () {
      _Window_ChoiceList_start.call(this);
      
      // Apply background using contentsBack after all setup is complete
      if (this.width > 0 && this.height > 0) {
        updateCustomBackground(this, this.width, this.height);
      }
    };

    // ✅ Also override updateBackground to ensure correct background type
    const _Window_ChoiceList_updateBackground = Window_ChoiceList.prototype.updateBackground;
    Window_ChoiceList.prototype.updateBackground = function() {
      _Window_ChoiceList_updateBackground.call(this);
      
      // Apply our custom background after the native background is set
      if (this.width > 0 && this.height > 0) {
        updateCustomBackground(this, this.width, this.height);
      }
    };

    // ✅ Override refresh to maintain background
    const _Window_ChoiceList_refresh = Window_ChoiceList.prototype.refresh;
    Window_ChoiceList.prototype.refresh = function () {
      _Window_ChoiceList_refresh.call(this);
      
      // Reapply background after refresh
      if (this.width > 0 && this.height > 0) {
        updateCustomBackground(this, this.width, this.height);
      }
    };

    // ✅ Remove item selection background
    Window_ChoiceList.prototype.drawItemBackground = function(index) {
      // Skip drawing item background - we only want our custom window background
    };
  })();