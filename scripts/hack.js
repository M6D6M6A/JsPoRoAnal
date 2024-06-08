let Rarities={COMMON:0,GREAT:1,ULTRA:2,ROGUE:3,MASTER:4},Mode={MESSAGE:0,TITLE:1,COMMAND:2,FIGHT:3,BALL:4,TARGET_SELECT:5,MODIFIER_SELECT:6,SAVE_SLOT:7,PARTY:8,SUMMARY:9,STARTER_SELECT:10,EVOLUTION_SCENE:11,EGG_HATCH_SCENE:12,CONFIRM:13,OPTION_SELECT:14,MENU:15,MENU_OPTION_SELECT:16,SETTINGS:17,SETTINGS_DISPLAY:18,SETTINGS_AUDIO:19,SETTINGS_GAMEPAD:20,GAMEPAD_BINDING:21,SETTINGS_KEYBOARD:22,KEYBOARD_BINDING:23,ACHIEVEMENTS:24,GAME_STATS:25,VOUCHERS:26,EGG_LIST:27,EGG_GACHA:28,LOGIN_FORM:29,REGISTRATION_FORM:30,LOADING:31,SESSION_RELOAD:32,UNAVAILABLE:33,OUTDATED:34};const Achievements={_10K_MONEY:0,_100K_MONEY:1,_1M_MONEY:2,_10M_MONEY:3,_250_DMG:4,_1000_DMG:5,_2500_DMG:6,_10000_DMG:7,_250_HEAL:8,_1000_HEAL:9,_2500_HEAL:10,_10000_HEAL:11,LV_100:12,LV_250:13,LV_1000:14,_10_RIBBONS:15,_25_RIBBONS:16,_50_RIBBONS:17,_75_RIBBONS:18,_100_RIBBONS:19,TRANSFER_MAX_BATTLE_STAT:20,MAX_FRIENDSHIP:21,MEGA_EVOLVE:22,GIGANTAMAX:23,TERASTALLIZE:24,STELLAR_TERASTALLIZE:25,SPLICE:26,MINI_BLACK_HOLE:27,CATCH_MYTHICAL:28,CATCH_SUB_LEGENDARY:29,CATCH_LEGENDARY:30,SEE_SHINY:31,SHINY_PARTY:32,HATCH_MYTHICAL:33,HATCH_SUB_LEGENDARY:34,HATCH_LEGENDARY:35,HATCH_SHINY:36,HIDDEN_ABILITY:37,PERFECT_IVS:38,CLASSIC_VICTORY:39,MONO_GEN_ONE_VICTORY:40,MONO_GEN_TWO_VICTORY:41,MONO_GEN_THREE_VICTORY:42,MONO_GEN_FOUR_VICTORY:43,MONO_GEN_FIVE_VICTORY:44,MONO_GEN_SIX_VICTORY:45,MONO_GEN_SEVEN_VICTORY:46,MONO_GEN_EIGHT_VICTORY:47,MONO_GEN_NINE_VICTORY:48,MONO_NORMAL:49,MONO_FIGHTING:50,MONO_FLYING:51,MONO_POISON:52,MONO_GROUND:53,MONO_ROCK:54,MONO_BUG:55,MONO_GHOST:56,MONO_STEEL:57,MONO_FIRE:58,MONO_WATER:59,MONO_GRASS:60,MONO_ELECTRIC:61,MONO_PSYCHIC:62,MONO_ICE:63,MONO_DRAGON:64,MONO_DARK:65,MONO_FAIRY:66};class BaseScene{constructor(){this.minInt=-Math.pow(2,31),this.maxInt=Math.pow(2,31)-1,this.maxMoneyInt=Number.MAX_SAFE_INTEGER-this.maxInt}get scenes(){return Phaser.Display.Canvas.CanvasPool.pool[0].parent.game.scene.scenes}get currentScene(){return this.scenes[1<this.scenes.length?this.scenes.length-1:0]}get currentPhase(){return this.currentScene.currentPhase}get currentPhaseName(){return this.currentPhase.constructor.name}maxTeamLuck(){this.currentPhase.scene.getParty().forEach(e=>{e.luck=11})}setMoney(e){this.currentPhase.scene.money=e,this.currentPhase.scene.updateMoneyText(),this.currentPhase.scene.animateMoneyChanged(!1)}playBuySound(e){this.currentPhase.scene.playSound(e)}clearUI(){this.currentPhase.scene.ui.clearText()}setUIMode(e){return this.currentPhase.scene.ui.setMode(e)}}class SelectModifierPhaseScene extends BaseScene{constructor(){super()}rerollPhase(e,t){var n=3+(this.currentScene.modifiers.find(e=>"ExtraModifierModifier"===e.constructor.name)?.stackCount??0),s=Phaser.Display.Canvas.CanvasPool.pool[1].parent.parentContainer.parentContainer.displayList.list,s=s[s.length-1].list.find(e=>"UI"==e.constructor.name).list[17].list.slice(0,n).map(e=>e.modifierTypeOption).map(e=>e.type.tier),t=!0===(this.currentScene.lockModifierTiers=t)&&null===e?s:null===e?this.currentPhase.getModifierTypeOptions(n).map(e=>e.type.tier):new Array(n).fill(e);this.currentPhase.scene.ui.getHandler()?.updateLockRaritiesText(),this.currentPhase.scene.reroll=!0,this.currentPhase.scene.unshiftPhase(new this.currentPhase.constructor(this.currentScene,this.minInt,t))}execute(e,t){"SelectModifierPhase"===this.currentPhaseName?3!==Phaser.Display.Canvas.CanvasPool.pool[0].parent.game.scene.keys.battle.gameMode.modeId?(this.rerollPhase(e,t),this.clearUI(),this.setUIMode(0).then(()=>this.currentPhase.end()),this.maxTeamLuck(),this.setMoney(this.maxMoneyInt),this.playBuySound("buy")):console.log("You cant cheat in daily run!"):console.log("Not in a roll phase.")}}class DataResetter extends BaseScene{constructor(){super()}execute(){"TitlePhase"===this.currentPhaseName?this.currentScene.gameData.saveAll(this.currentScene,!0,!0,!0).then(e=>{if(!e)return this.currentScene.reset(!0);this.currentScene.gameData.tryClearSession(this.currentScene,this.currentScene.sessionSlotId).then(e=>{if(!e[0])return this.currentScene.reset(!0);this.currentScene.reset(),this.currentScene.unshiftPhase(new this.currentScene.constructor(this.scene)),this.currentPhase.end()})}):console.log("Go back to Title Screen first!")}}class AchvUnlocker extends BaseScene{constructor(){super()}execute(e,t,n){const s=Date.now()-1e3*(3600*e-60*t-n);this.currentScene.gameData.achvUnlocks=Object.keys(Achievements).reduce((e,t)=>(e[t]=s,e),{}),console.log("All achievements unlocked!")}}class Hack{constructor(){this.selectModifierPhaseScene=new SelectModifierPhaseScene,this.dataResetter=new DataResetter,this.achvUnlocker=new AchvUnlocker}roll(e=null,t=!0){this.selectModifierPhaseScene.execute(e,t)}allAchievements(e=0,t=0,n=0){this.achvUnlocker.execute(e,t,n)}RESET(){this.dataResetter.execute()}}window.HACK=new Hack;const HACK=window.HACK;!function(){var e,r=document.createElement("div"),t=(r.style.position="fixed",r.style.top="10px",r.style.right="10px",r.style.width="300px",r.style.padding="10px",r.style.backgroundColor="#121212",r.style.border="1px solid #e0681a",r.style.color="#ffffff",r.style.fontFamily="Roboto, sans-serif",r.style.zIndex=1e4,r.style.boxShadow="0px 0px 10px rgba(0, 0, 0, 0.5)",document.body.appendChild(r),document.createElement("div")),t=(t.style.backgroundColor="#1e1e1e",t.style.padding="5px",t.style.cursor="move",t.style.textAlign="center",t.style.color="#ffffff",t.innerText="MPB Hack Client",r.appendChild(t),t.onmousedown=function(e){var t=e.clientX-r.offsetLeft,n=e.clientY-r.offsetTop;function s(e){r.style.left=e.clientX-t+"px",r.style.top=e.clientY-n+"px"}document.addEventListener("mousemove",s),document.addEventListener("mouseup",function e(){document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",e)})},document.createElement("h3")),t=(t.innerText="Roll",t.style.color="#ffffff",r.appendChild(t),document.createElement("div")),n=(t.style.display="flex",t.style.gap="10px",t.style.alignItems="center",t.style.justifyContent="space-between",r.appendChild(t),document.createElement("button")),n=(n.innerText="Roll",n.style.backgroundColor="#e0681a",n.style.color="#ffffff",n.style.border="none",n.style.padding="5px 10px",n.style.cursor="pointer",n.onclick=function(){var e=s.checked,t="NONE"===c.value?null:parseInt(c.value);HACK.roll(t,e)},t.appendChild(n),document.createElement("label")),s=(n.innerText="Lock",n.style.color="#ffffff",document.createElement("input")),c=(s.type="checkbox",n.appendChild(s),t.appendChild(n),document.createElement("select"));for(e in c.style.backgroundColor="#1e1e1e",c.style.color="#ffffff",c.style.border="1px solid #e0681a",Rarities){var o=document.createElement("option");o.value=Rarities[e],o.innerText=e,c.appendChild(o)}var n=document.createElement("option"),n=(n.value="NONE",n.innerText="NONE",n.selected=!0,c.appendChild(n),t.appendChild(c),document.createElement("h3")),t=(n.innerText="Achievements",n.style.color="#ffffff",r.appendChild(n),document.createElement("div")),n=(t.style.display="flex",t.style.flexDirection="column",t.style.gap="10px",t.style.alignItems="center",t.style.justifyContent="space-between",r.appendChild(t),document.createElement("button")),n=(n.innerText="Unlock ALL",n.style.backgroundColor="#e0681a",n.style.color="#ffffff",n.style.border="none",n.style.padding="5px 10px",n.style.cursor="pointer",n.onclick=function(){var e=parseInt(l.value)||0,t=parseInt(a.value)||0,n=parseInt(i.value)||0;HACK.allAchievements(e,t,n)},t.appendChild(n),document.createElement("div")),l=(n.style.display="flex",n.style.gap="5px",t.appendChild(n),document.createElement("input")),a=(l.type="number",l.placeholder="Hours",l.style.width="60px",l.style.backgroundColor="#1e1e1e",l.style.color="#ffffff",l.style.border="1px solid #e0681a",n.appendChild(l),document.createElement("input")),i=(a.type="number",a.placeholder="Minutes",a.style.width="60px",a.style.backgroundColor="#1e1e1e",a.style.color="#ffffff",a.style.border="1px solid #e0681a",n.appendChild(a),document.createElement("input"));i.type="number",i.placeholder="Seconds",i.style.width="60px",i.style.backgroundColor="#1e1e1e",i.style.color="#ffffff",i.style.border="1px solid #e0681a",n.appendChild(i)}();