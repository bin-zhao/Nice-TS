import { UIPage } from "../../../../framework/ui/UIPage";
import { binder } from "../../../../framework/common/NiceDecorator";
import { FairyGUI } from "csharp";
import { SessionManager } from "../../../../framework/net/SessionManager";
import { LoginAPI } from "../../../api/LoginAPI";
import { UIManager } from "../../../../framework/ui/UIManager";
import { loginUI } from "../../../../data/ui/login";
import { VoServer, VoServerItem } from "../vo/VoServer";
import { UIMessageManger } from "../../../event/UIMessageManager";
import { UIMessage } from "../../../event/UIMessage";
import { SceneManager } from "../../../../framework/scene/SceneManager";
import { SceneDef } from "../../../../framework/scene/SceneDef";
import { storyUI } from "../../../../data/ui/story";
import { nice_ts } from "../../../../data/pb/gen/pb";
import { combatUI } from "../../../../data/ui/combat";
import { commonUI } from "../../../../data/ui/common";



export class UILoginPage extends UIPage{

    @binder("account")
    public m_account:FairyGUI.GTextField;
    @binder("password")
    public m_password:FairyGUI.GTextField;

    @binder("selserverBtn")
    public m_selserverBtn:FairyGUI.GButton;

    @binder("loginBtn")
    public m_loginBtn:FairyGUI.GButton;

    @binder("storyBtn")
    public m_storyBtn:FairyGUI.GButton;

    @binder("newGuideBtn")
    public m_newGuideBtn:FairyGUI.GButton;

    private gateId:any;
    private gateKey:number|Long;

    public async onAwake(){
        super.onAwake();
        
        this.m_loginBtn.onClick.Add(()=>{
            this.onLoginClick();
        });

        this.m_storyBtn.onClick.Add(()=>{
            UIManager.Instance(UIManager).openWindow(
                storyUI.PackageName, 
                storyUI.UIStoryWin,
                null);
        });

        this.m_newGuideBtn.onClick.Add(()=>{
            UIManager.Instance(UIManager).openWindow(
                commonUI.PackageName,
                commonUI.UIUIGuideWin,
                null
            );
        });

        this.m_selserverBtn.onClick.Add(()=>{
            this.openSelServerWin();
        });

        

        let connected = await SessionManager.Instance(SessionManager).connectRealmServer();
        
        this.m_loginBtn.enabled = connected;
        console.log("connect ream server: "+connected)
    }
    

    private onSelectServer(serverItem:VoServerItem){

        console.log(" server selected: "+serverItem.serverName)
        this.m_selserverBtn.text = serverItem.serverName;
    }


    public onShow(vo:any):void{
        super.onShow(vo);

         //监听选服消息
         UIMessageManger.Instance(UIMessageManger).addListener(
            UIMessage.MSG_SELECT_SERVER,
            this,
            this.onSelectServer
        );
    }
    public onClose(arg:any):void{
        super.onClose(arg);

        UIMessageManger.Instance(UIMessageManger).removeListener(
            UIMessage.MSG_SELECT_SERVER,
            this.onSelectServer
        );
    }

    private openSelServerWin(){

        // 测试数据
        let voServer:VoServer = new VoServer();
        for(let i=1; i<10; i++){
            voServer.areaMap.set(i,"分区"+i);
            voServer.serverMap.set(i, new Array<VoServerItem>());

            for(let j=1; j<20; j++){

                let voServerItem:VoServerItem = new VoServerItem();
                voServerItem.areaId = i;
                voServerItem.serverId = j;

                voServerItem.serverName = "测试服务器"+i+":"+j;
                voServerItem.serverStatus = Math.floor(Math.random()*3+1);

                
                voServer.serverMap.get(i).push(voServerItem);
            }
        }

        UIManager.Instance(UIManager).openWindow(
            loginUI.PackageName, 
            loginUI.UISelServerWin,
            voServer);
    }

    private async onLoginClick(){

        let account = this.m_account.text;
        let password = this.m_password.text;

        console.log(`account:${account} - password: ${password}`);

        if(account != "" && password != ""){
            
            let msg = await LoginAPI.loginRealmServer(account, password)
            this.gateId = msg.GateId;
                    this.gateKey = msg.Key;
                    console.log("login ream succ, gate addr:"+msg.Address + ",key:"+msg.Key);

                    SessionManager.Instance(SessionManager).disconnectRealmServer();
                    
                    //登录网关服
                     let connected = await SessionManager.Instance(SessionManager).connectGateServer(msg.Address);
                     if(connected){
                            console.log("connect gate succ")

                            let msg = await LoginAPI.loginGateServer( this.gateId, this.gateKey)

                            let playerID = msg.PlayerId;
                            console.log("login gate response.." +playerID);

                            SceneManager.Instance(SceneManager).loadScene(SceneDef.HomeScene);

                     }else{
                        console.log("connect gate err ")
                     }


        }

    }
}