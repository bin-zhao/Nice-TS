import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI } from "csharp";
import { UIManager } from "../../../../framework/ui/UIManager";
import { common } from "protobufjs";
import { commonUI } from "../../../../data/ui/common";
import { homeUI } from "../../../../data/ui/home";
import { VoHome } from "../vo/VoHome";
import { LoginAPI } from "../../../api/LoginAPI";
import { GameSession } from "../../../../framework/net/GameSession";
import { Opcode } from "../../../../data/pb/Opcode";
import { nice_ts } from "../../../../data/pb/gen/pb";



export class UIHomePage extends UIPage{

    @binder("chatBtn")
    public m_chatBtn:FairyGUI.GButton;
    @binder("bagBtn")
    public m_bagBtn:FairyGUI.GButton;
    @binder("shopBtn")
    public m_shopBtn:FairyGUI.GButton;
    @binder("levelBtn")
    public m_levelBtn:FairyGUI.GButton;

    @binder("nameTxt")
    public m_nameLbl:FairyGUI.GLabel;
    @binder("hpTxt")
    public m_hpLbl:FairyGUI.GLabel;
    @binder("mpTxt")
    public m_mpLbl:FairyGUI.GLabel;
    @binder("moneyTxt")
    public m_moneyLbl:FairyGUI.GLabel;


    public onAwake():void{
        super.onAwake();

        this.m_chatBtn.onClick.Add(()=>{
            this.onchatBtn();
        });
        this.m_bagBtn.onClick.Add(()=>{
            this.onbagBtn();
        });
        this.m_shopBtn.onClick.Add(()=>{
            this.onshopBtn();
        });
        this.m_levelBtn.onClick.Add(()=>{
            this.onlevelBtn();
        });
    }

    
    public onShow(vo:VoHome):void{
        super.onShow(vo);

        this.m_nameLbl.text = vo.name;
        this.m_mpLbl.text = vo.mp.toString();
        this.m_hpLbl.text = vo.hp.toString();
        this.m_moneyLbl.text = vo.money.toString();

        GameSession.Instance(GameSession).listen(Opcode.MSG_GS2C_Test,function(msg:nice_ts.GS2C_Test){
            console.log("收到服务器下发的消息。。。。"+msg.testResponse)
        })
    }
    public onClose(arg:any):void{
        super.onClose(arg);

    }


    public onchatBtn(){

        UIManager.Instance(UIManager).openWindow(
            commonUI.PackageName,
            commonUI.UIUINoticeWin,
            null);
        console.log("on chat...");
    }
    public onbagBtn(){
        console.log("on bag ..");

        //benchmark test
        LoginAPI.benchmarkTest();

    }
    public onshopBtn(){
        
        UIManager.Instance(UIManager).openPage(
            homeUI.PackageName,
            homeUI.UIShopPage);
    }
    public onlevelBtn(){
        console.log("on level...");
    }

}