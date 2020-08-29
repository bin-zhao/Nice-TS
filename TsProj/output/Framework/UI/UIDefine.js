"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIDefs = exports.UIComDefs = exports.UIPackages = exports.UILayerDef = exports.UITypeDef = void 0;
var UITypeDef;
(function (UITypeDef) {
    UITypeDef[UITypeDef["Unkown"] = 0] = "Unkown";
    UITypeDef[UITypeDef["Page"] = 1] = "Page";
    UITypeDef[UITypeDef["Window"] = 2] = "Window";
    UITypeDef[UITypeDef["Widget"] = 3] = "Widget";
    UITypeDef[UITypeDef["Loading"] = 4] = "Loading";
})(UITypeDef = exports.UITypeDef || (exports.UITypeDef = {}));
class UILayerDef {
    static getDefaultLayer(type) {
        switch (type) {
            case UITypeDef.Loading: return this.Loading;
            case UITypeDef.Widget: return this.Widget;
            case UITypeDef.Window: return this.NormalWindow;
            case UITypeDef.Page: return this.Page;
            case UITypeDef.Unkown: return this.Unkown;
            default: return this.Unkown;
        }
    }
}
exports.UILayerDef = UILayerDef;
UILayerDef.Background = 0;
UILayerDef.Page = 1000;
UILayerDef.NormalWindow = 2000;
UILayerDef.TopWindow = 3000;
UILayerDef.Widget = 4000;
UILayerDef.Loading = 5000;
UILayerDef.Unkown = 9999;
class UIPackages {
}
exports.UIPackages = UIPackages;
UIPackages.Game = "game";
class UIComDefs {
}
exports.UIComDefs = UIComDefs;
UIComDefs.BackBtn = "back_btn";
UIComDefs.WindowCloseBtn = "win_close_btn";
class UIDefs {
}
exports.UIDefs = UIDefs;
UIDefs.UILoadingPage = "LoadingPage";
UIDefs.UILoginPage = "LoginPage";
UIDefs.UIHomePage = "HomePage";
UIDefs.UILevelage = "LevelPage";
UIDefs.UIShopPage = "ShopPage";
UIDefs.UISelServerWin = "SelServerWin";
//# sourceMappingURL=UIDefine.js.map