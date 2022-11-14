(function(){"use strict";var e={2868:function(e,t,i){var n=i(9242),a=i(3396),o=i(7139),r=i(2174),s=i(1250),l=i(447);const c=(0,a._)("label",{class:"lbl-common-text lbl-guide"},"Tip : 直接双击地球上的点，就可以查看该纬度的太阳视运动了~也可以手动调整纬度前往哦！",-1),u={class:"div-common-control-block"},d={class:"d-flex flex-row justify-content-between",style:{"margin-bottom":"5px"}},h=(0,a._)("label",{class:"lbl-common-text"},"纬度：",-1),m={class:"lbl-data-display"},p={class:"d-flex flex-row justify-content-between"},v={key:0,class:"d-flex flex-column"},b={class:"div-common-control-block"},w=(0,a._)("label",{class:"lbl-common-text"},"太阳直射点纬度：",-1),g={class:"lbl-data-display"},M={class:"d-flex flex-row justify-content-between"},A={class:"div-common-control-block d-flex flex-column"},y=(0,a._)("label",{class:"lbl-common-text"},"当地地方时：",-1),x={class:"lbl-data-display"},f={class:"d-flex flex-row justify-content-between"},L={style:{margin:"10px 0"}},S=(0,a._)("label",{class:"lbl-common-text"},"太阳高度角：",-1),C={class:"lbl-data-display"},P={class:"div-common-control-block d-flex flex-column",style:{"margin-top":"0"}},O={class:"div-common-control-block d-flex flex-column",style:{"margin-top":"0"}},z={class:"d-flex flex-column align-items-center div-compass-wrapper",style:{"z-index":"49"}},I=(0,a._)("img",{src:r,style:{width:"30px",height:"30px","margin-bottom":"5px"},draggable:"false"},null,-1),k={style:{position:"relative"}},D={class:"lbl-center-info lbl-center-info-u"},j={class:"lbl-center-info lbl-center-info-l"},R=(0,a.uE)(' 高中地理：太阳视运动可视化 ——献给我的母校山东省实验中学 (版本v3.1.0)<br> 软件作者：崔子健(Ernest Cui)<br> 作者单位：哈尔滨工业大学计算学部<br> 作者联系方式：ecuiships@126.com<br> 开发时间：2022.03.04 - 2022.03.08<br> 项目简介：基于WebGL的太阳视运动可视化，可在地面或天球3D场景中自由观察太阳视运动轨迹，可选择任意观察纬度、动态调节太阳直射点纬度和地方时。项目使用真实距离比例和理想化数学模型，模拟准确度可满足高中地理教学的需要。 <br><br> 本项目以GPL-3.0许可证开源。开源仓库地址： <br> https://github.com/ErnestThePoet/SunMotionVisualization https://gitee.com/ecui/SunMotionVisualization <br><br>        高二的一节地理课上，太阳的视运动让我们与想象力玩起了捉迷藏。那时隔帘初探计算机世界的我，在下课后有了一个令自己无比激动的想法：要是能写出一个可以实地展现太阳运动轨迹的程序，帮助大家更好地理解和记忆太阳的视运动，那该多好！当然，这主要由幻想构成的激动，在半节课后，就随着游走的笔头消逝在试卷之间了。 <br>        韶华的身影跳跃着。大二的一个傍晚，我完成了Three.js主要内容的自学；这时，我的天使告诉我：你可以回过头去，拾起三年前的小小心愿了。 <br>        ——这便是我开始这个小小工程的一切动机。作为一份小小的礼物，我将它献给我的母校——山东省实验中学，献给我的恩师——孙玉娟老师；我永不会忘却，那些将地理之美呈现给我们、唤起我们对大千世界向往的课堂。<br><div style="text-align:right;"> 2022年3月8日夜，于哈尔滨工业大学一公寓 </div><br><br>        v3.0.0版本后记：深深感谢东校地理教研组长王桂林老师。使用过最初的版本后，王老师抽出宝贵的时间，结合教学实际，详细而耐心地为本项目提出了许多重要的改进建议，极大地完善和改进了这个项目。 <br>',29),Z=[R];function G(e,t,i,r,R,G){const T=(0,a.up)("compass-word");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",{class:"d-flex flex-column div-controls-wrapper",style:{"z-index":"49"},onDblclick:t[13]||(t[13]=(0,n.iM)((()=>{}),["stop"]))},[c,(0,a._)("div",u,[(0,a._)("div",d,[(0,a._)("div",null,[h,(0,a._)("label",m,(0,o.zw)(Math.abs(R.latDegFixed1))+"°"+(0,o.zw)(R.latDegFixed1>0?"N":0==R.latDegFixed1?"":"S"),1)]),(0,a._)("button",{class:"btn btn-outline-light",onClick:t[0]||(t[0]=(...e)=>G.changeToGroundView&&G.changeToGroundView(...e))}," 前往 ")]),(0,a.wy)((0,a._)("input",{class:"form-range",type:"range",min:"-90",max:"90",step:"0.1","onUpdate:modelValue":t[1]||(t[1]=e=>R.latDegFixed1=e)},null,512),[[n.nr,R.latDegFixed1,void 0,{number:!0}]]),(0,a._)("div",p,[(0,a._)("div",{class:"div-adjust",onClick:t[2]||(t[2]=e=>G.adjLatDegFixed1(0))},"←"),(0,a._)("div",{class:"div-adjust",onClick:t[3]||(t[3]=e=>G.adjLatDegFixed1(1))},"→")])]),(0,a.Wm)(n.uT,{name:"tr-ground-view"},{default:(0,a.w5)((()=>[R.isGroundControlsShow?((0,a.wg)(),(0,a.iD)("div",v,[(0,a._)("div",b,[w,(0,a._)("label",g,(0,o.zw)(Math.abs(R.solarAltituteDeg))+"°"+(0,o.zw)(R.solarAltituteDeg>0?"N":0==R.solarAltituteDeg?"":"S"),1),(0,a.wy)((0,a._)("input",{class:"form-range",type:"range",min:"-23.5",max:"23.5",step:"0.1","onUpdate:modelValue":t[4]||(t[4]=e=>R.solarAltituteDeg=e)},null,512),[[n.nr,R.solarAltituteDeg,void 0,{number:!0}]]),(0,a._)("div",M,[(0,a._)("div",{class:"div-adjust",onClick:t[5]||(t[5]=e=>G.adjSolarAltituteDeg(0))},"←"),(0,a._)("div",{class:"div-adjust",onClick:t[6]||(t[6]=e=>G.adjSolarAltituteDeg(1))},"→")])]),(0,a._)("div",A,[(0,a._)("div",null,[y,(0,a._)("label",x,(0,o.zw)(G.localTime),1)]),(0,a.wy)((0,a._)("input",{class:"form-range",style:{"margin-bottom":"5px"},type:"range",min:"0",max:"1439",step:"1","onUpdate:modelValue":t[7]||(t[7]=e=>R.timeMinutes=e)},null,512),[[n.nr,R.timeMinutes,void 0,{number:!0}]]),(0,a._)("div",f,[(0,a._)("div",{class:"div-adjust",onClick:t[8]||(t[8]=e=>G.adjLocalTime(0))},"←"),(0,a._)("div",{class:"div-adjust",onClick:t[9]||(t[9]=e=>G.adjLocalTime(1))},"→")]),(0,a._)("div",L,[S,(0,a._)("label",C,(0,o.zw)(R.solarAltitudeAngleDeg.toFixed(1))+"°",1)]),(0,a._)("button",{class:"btn btn-outline-light",onClick:t[10]||(t[10]=(...e)=>G.switchAutoPlay&&G.switchAutoPlay(...e))},(0,o.zw)(-1==R.windowIntervalHandlerNumber?"启动":"停止")+"循环播放 ",1)]),(0,a._)("div",P,[(0,a._)("button",{class:"btn btn-outline-info",onClick:t[11]||(t[11]=(...e)=>G.switchGroundView&&G.switchGroundView(...e))}," 切换地平面/天球视图 ")]),(0,a._)("div",O,[(0,a._)("button",{class:"btn btn-outline-danger",onClick:t[12]||(t[12]=(...e)=>G.exitGroundView&&G.exitGroundView(...e))}," 退出视图 ")])])):(0,a.kq)("",!0)])),_:1})],32),(0,a._)("div",z,[I,(0,a._)("div",k,[(0,a._)("img",{src:s,class:"img-comp",style:(0,o.j5)({transform:"rotateZ("+G.compassRotationRad+"rad)"}),draggable:"false"},null,4),(0,a.Wm)(T,{word:"北",textcolor:"dodgerblue",translatedata:G.compassWordTranslates[0]},null,8,["translatedata"]),(0,a.Wm)(T,{word:"东",textcolor:"limegreen",translatedata:G.compassWordTranslates[1]},null,8,["translatedata"]),(0,a.Wm)(T,{word:"南",textcolor:"orangered",translatedata:G.compassWordTranslates[2]},null,8,["translatedata"]),(0,a.Wm)(T,{word:"西",textcolor:"orange",translatedata:G.compassWordTranslates[3]},null,8,["translatedata"]),(0,a._)("label",D,(0,o.zw)(G.currentHeadingWord),1),(0,a._)("label",j,(0,o.zw)(G.currentHeadingRoundedDeg)+"°",1)])]),(0,a._)("img",{class:"img-about",style:{"z-index":"50"},src:l,onClick:t[14]||(t[14]=(0,n.iM)(((...e)=>G.showAbout&&G.showAbout(...e)),["stop"]))}),(0,a._)("div",{class:"div-about-wrapper",style:(0,o.j5)([{"z-index":"50"},{transform:"translate(-50%,-50%) scale("+(R.isAboutShow?"100%":"0%")+")"}])},Z,4)])}const T=100,F=.05,W=.15,H=100,B=.98,V=1,E="./SunMotionVisualization/static/",N=300,Y=20,q=3e3,X=62,U=200,J=25,K=35;var Q=i(7387),_=i(1114),$=i(6573),ee=i(4543),te=i(6497);function ie(e){return 180*e/Math.PI}function ne(e){return Math.PI*e/180}function ae(e,t){const i=[1.2,1.2,1.25,1.3,1.3,1.3,1.25,1.2,1.2];for(let n of t){let t=e.position.x,a=e.position.z,o=Math.sqrt(T**2*t**2/(t**2+a**2)),r=-Math.cos(n.smvLatRad)*o*a/t,s=Math.cos(n.smvLatRad)*o,l=Math.sin(n.smvLatRad)*T;0==n.smvSide?(n.position.x=r*i[n.smvLatType],n.position.y=l*i[n.smvLatType],n.position.z=s*i[n.smvLatType]):(n.position.x=-r*i[n.smvLatType],n.position.y=l*i[n.smvLatType],n.position.z=-s*i[n.smvLatType])}}function oe(e,t,i){const n=1e-4,a=23.48159662,o=Math.PI/2;let r=ne(i),s=a*Math.cos(o-r),l=a*Math.sin(o-r),c=Math.cos(Math.PI*t/720),u=0,d=0,h=0;if(Math.abs(e)<=n)u=-l*c,d=s,h=se(t)?0:Math.sqrt(l**2-u**2);else if(Math.abs(e-o)<=n)u=s,d=l*c,h=se(t)?0:Math.sqrt(l**2-d**2);else if(Math.abs(e+o)<=n)u=-s,d=-l*c,h=se(t)?0:Math.sqrt(l**2-d**2);else{let n=0-e,a=Math.sqrt(s**2/(Math.tan(n)**2+1));i<0&&(a=-a);let o=-Math.tan(n)*a,r=-Math.sqrt(l**2*a**2/(a**2+o**2))+o,m=(o-r)*o/a+a,p=m-a-a*(r-o)/o,v=l**2*c-a**2*(r-o)/o+a*(m-a);d=v/p,u=(a-d)*a/o+o,h=se(t)?0:Math.sqrt(l**2-(u-o)**2-(d-a)**2)}t<720&&(h=-h);const m=H/a;return[u*m,d*m,h*m]}function re(e,t){const i=1e-4,n=23.48159662,a=Math.PI/2;let o=ne(t),r=n*Math.cos(a-o),s=n*Math.sin(a-o),l=0,c=0,u=0,d=0;if(Math.abs(e-a)>i&&Math.abs(e+a)>i&&Math.abs(e)<Math.abs(Math.PI/2-Math.abs(ne(t)))){let i=0-e,a=Math.sqrt(r**2/(Math.tan(i)**2+1));t<0&&(a=-a);let o=-Math.tan(i)*a;l=u=o**2/a+a,c=-Math.sqrt(s**2-o**2-o**4/a**2),d=-c;const h=H/n;l*=h,c*=h,u*=h,d*=h}return[l,c,u,d]}function se(e){return 0==e||720==e}function le(e){let t=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];const i=[0,Math.PI/2,Math.PI,3*Math.PI/2];for(let n in t){let a=i[n]-e,o=X*Math.sin(a)+U/2,r=U/2-X*Math.cos(a);o-=J/2,r-=K/2,t[n].x=o,t[n].y=r}return t}function ce(e,t,i,n){const a=new _.Ny0(0,0,e*Math.cos(ne(t))+.5,e*Math.cos(ne(t))+.5,0,2*Math.PI,!1,Math.PI/2),o=(new _.u9r).setFromPoints(a.getPoints(100));let r;return o.rotateX(Math.PI/2),o.translate(0,e*Math.sin(ne(t)),0),r=n?new _.FT0({color:i,dashSize:3,gapSize:2}):new _.nls({color:i}),new _.x12(o,r).computeLineDistances()}function ue(e,t,i,n,a){const o=(new _.dpR).load(E+i),r=new _.xeV({map:o}),s=new _.jyi(r);return s.scale.set(12*a,12,1),s.smvLatRad=ne(e),s.smvLatType=t,s.smvSide=n,s}function de(e){const t=new _.ZAu,i=new _.ZAu,n=[-66.5,-60,-30,-23.5,0,23.5,30,60,66.5],a=[-66.5,-55,-30,-20,0,20,30,55,66.5],o=[8900346,16777215,16777215,16711935,16777215,16711935,16777215,16777215,8900346],r=[!0,!1,!1,!0,!1,!0,!1,!1,!0],s=["pcs.png","60s.png","30s.png","tocs.png","equa.png","tocn.png","30n.png","60n.png","pcn.png"],l=[2,1.75,1.75,2.5,2,2.5,1.75,1.75,2];for(let c in n)t.add(ce(e,n[c],o[c],r[c])),i.add(ue(a[c],c,s[c],0,l[c])),i.add(ue(a[c],c,s[c],1,l[c]));return(new _.ZAu).add(t,i)}function he(e,t,i=!1,n=100,a=16777215){const o=[];for(let c=0;c<n;c++){let i=1440*c/n;const a=oe(e,i,t);o.push(new _.Pa4(a[0]*V,a[1]*V,a[2]*V))}const r=(new _.u9r).setFromPoints(o),s=new _.nls({color:a}),l=new _.blk(r,s);if(i){const i=re(e,t),n=(new _.u9r).setFromPoints([new _.Pa4(W,i[0],i[1]),new _.Pa4(W,i[2],i[3])]),a=new _.FT0({color:16711680,dashSize:10,gapSize:5});l.add(new _.x12(n,a).computeLineDistances())}return l}class me{constructor(e,t){this.moveScale=1,this.enabled=!0,this.fovScale=1,this.maxFov=80,this.minFov=50,this.onHeadingChange=void 0,this._isMouseDown=!1,t.addEventListener("wheel",(t=>{this.enabled&&(t.deltaY>0?e.fov+5*this.fovScale>this.maxFov?e.fov=this.maxFov:e.fov+=5*this.fovScale:t.deltaY<0&&(e.fov-5*this.fovScale<this.minFov?e.fov=this.minFov:e.fov-=5*this.fovScale),e.updateProjectionMatrix())})),t.addEventListener("pointerdown",(()=>{this._isMouseDown=!0})),t.addEventListener("pointerup",(()=>{this._isMouseDown=!1})),t.addEventListener("pointermove",(t=>{if(this.enabled&&this._isMouseDown){const i=t.movementX*this.moveScale*.01;e.rotation.x-i<0?e.rotation.x=2*Math.PI+e.rotation.x-i:e.rotation.x-i>=2*Math.PI?e.rotation.x=e.rotation.x-i-2*Math.PI:e.rotation.x-=i;const n=Math.PI/2,a=t.movementY*this.moveScale*.01;if(e.rotation.y+a>n?e.rotation.y=n:e.rotation.y+a<-n?e.rotation.y=-n:e.rotation.y+=a,this.onHeadingChange){let t=-e.rotation.x+2.5*Math.PI;t>=2*Math.PI&&(t-=2*Math.PI),this.onHeadingChange(t)}}}))}}var pe=i(477),ve=i(4037);function be(e=.5,t=(()=>{})){pe.p8.to(".div-compass-wrapper",{duration:e,opacity:.95,ease:ve.EA.easeIn,onComplete:t})}function we(e=1,t=(()=>{})){pe.p8.to(".div-compass-wrapper",{duration:e,opacity:0,ease:ve.EA.easeOut,onComplete:t})}function ge(){pe.p8.to(".div-about-wrapper",{duration:.5,opacity:1,ease:ve.EA.easeIn})}function Me(e=(()=>{})){pe.p8.to(".div-about-wrapper",{duration:.5,opacity:0,ease:ve.EA.easeOut,onComplete:e})}function Ae(e){pe.p8.to(e,{duration:1,opacity:1,ease:ve.EA.easeIn})}function ye(e,t=(()=>{})){pe.p8.to(e,{duration:1,opacity:0,ease:ve.EA.easeOut,onComplete:t})}function xe(e){if(e.isGroundView)return;e.isGroundView=!0,e.orbitControlsOuter.enabled=!1,e.latData.visible=!1,e.sunLight.children[0].visible=!0,e.groundPlaneMesh.visible=!0,Se(e,e.latRad,e.timeMinutes,e.solarAltituteDeg),e.previousCameraZoom=e.cameraOuter.zoom,e.previousCameraPosition=e.cameraOuter.position.clone(),e.previousCameraQuaternion=e.cameraOuter.quaternion.clone();const t=new _.yC1("camera.position",[0,1],[e.cameraOuter.position.x,e.cameraOuter.position.y,e.cameraOuter.position.z,F,0,0],_.pIN),i=e.camera.clone();i.position.set(F,0,0),i.lookAt(F,1,0),i.rotation.z=-Math.PI/2;const n=new _.iLg("camera.quaternion",[0,1],[e.cameraOuter.quaternion.x,e.cameraOuter.quaternion.y,e.cameraOuter.quaternion.z,e.cameraOuter.quaternion.w,i.quaternion.x,i.quaternion.y,i.quaternion.z,i.quaternion.w]),a=new _.m7l("clip-camera",1,[t,n]),o=new _.Xcj(e.camera),r=o.clipAction(a);r.loop=_.jAl,o.addEventListener("finished",(t=>{t.action.stop(),e.camera.position.set(F,0,0),e.camera.setRotationFromQuaternion(i.quaternion),e.camera.updateProjectionMatrix(),e.sunTrackLineGroup.children[0]=he(e.latRad,e.solarAltituteDeg),e.sunTrackLineGroup.visible=!0,e.earthMesh.visible=!1,e.arrowMesh.position.set(0,0,0),e.arrowMesh.rotation.z=Math.PI/2,e.arrowMesh.visible=!0,e.isGroundControlsShow=!0,e.smvDragControls.enabled=!0,e.scene.background=0,e.sunLight.intensity=1,e.ambientLight.intensity=.35})),e.mixers=[o],r.play(),Ae(e.groundPlaneMesh.material),be()}function fe(e){e.isGroundControlsShow&&(e.isSkySphereView?(e.scene.rotation.z=0,e.sunTrackLineGroup.children[0].rotation.z=0,e.smvDragControls.enabled=!0,e.orbitControlsOuter.enabled=!1,e.sunLight.intensity=1,e.ambientLight.intensity=.35,e.sunLight.children[0].visible=!0,e.littleSunMesh.visible=!1,e.arrowBigMesh.visible=!1,e.skyCircleLine.visible=!1,e.skySphereUMesh.visible=!1,e.skySphereLMesh.visible=!1):(e.scene.rotation.z=Math.PI/2,e.sunTrackLineGroup.children[0].rotation.z=Math.PI/2,e.smvDragControls.enabled=!1,e.cameraOuter.position.set(372,196,330),e.cameraOuter.zoom=1,e.cameraOuter.updateProjectionMatrix(),e.orbitControlsOuter.enabled=!0,e.sunLight.intensity=.6,e.ambientLight.intensity=.5,e.sunLight.children[0].visible=!1,e.littleSunMesh.visible=!0,e.arrowBigMesh.visible=!0,e.skyCircleLine.visible=!0,e.skySphereUMesh.visible=!0,e.skySphereLMesh.visible=!0),e.isSkySphereView=!e.isSkySphereView,e.sunTrackLineGroup.children[0]=he(e.latRad,e.solarAltituteDeg,e.isSkySphereView),e.sunTrackLineGroup.children[0].rotation.z=e.isSkySphereView?Math.PI/2:0)}function Le(e){if(!e.isGroundControlsShow)return;e.isSkySphereView?(e.scene.rotation.z=0,e.sunTrackLineGroup.children[0].rotation.z=0,e.littleSunMesh.visible=!1,e.skyCircleLine.visible=!1,e.skySphereUMesh.visible=!1,e.skySphereLMesh.visible=!1,e.isSkySphereView=!1,e.arrowBigMesh.visible=!1,e.groundPlaneMesh.visible=!1):ye(e.groundPlaneMesh.material,(()=>{e.groundPlaneMesh.visible=!1})),e.earthMesh.visible=!0,e.sunTrackLineGroup.visible=!1,e.arrowMesh.visible=!1,e.isGroundControlsShow=!1,e.smvDragControls.enabled=!1,e.scene.background=e.sceneBackgroundTexture,e.ambientLight.intensity=1.3,e.sunLight.intensity=.5,e.sunLight.children[0].visible=!1,-1!=e.windowIntervalHandlerNumber&&(window.clearInterval(e.windowIntervalHandlerNumber),e.windowIntervalHandlerNumber=-1);const t=new _.yC1("camera.position",[0,1],[e.camera.position.x,e.camera.position.y,e.camera.position.z,e.previousCameraPosition.x,e.previousCameraPosition.y,e.previousCameraPosition.z],_.pIN),i=new _.iLg("camera.quaternion",[0,1],[e.camera.quaternion.x,e.camera.quaternion.y,e.camera.quaternion.z,e.camera.quaternion.w,e.previousCameraQuaternion.x,e.previousCameraQuaternion.y,e.previousCameraQuaternion.z,e.previousCameraQuaternion.w]),n=new _.m7l("clip-camera",1,[t,i]),a=new _.Xcj(e.camera),o=a.clipAction(n);o.loop=_.jAl,a.addEventListener("finished",(t=>{t.action.stop(),e.camera.position.set(e.previousCameraPosition.x,e.previousCameraPosition.y,e.previousCameraPosition.z),e.camera.setRotationFromQuaternion(e.previousCameraQuaternion),e.camera.updateProjectionMatrix(),e.cameraOuter.position.set(e.previousCameraPosition.x,e.previousCameraPosition.y,e.previousCameraPosition.z),e.cameraOuter.setRotationFromQuaternion(e.previousCameraQuaternion),e.cameraOuter.zoom=e.previousCameraZoom,e.cameraOuter.updateProjectionMatrix(),e.isGroundView=!1,e.orbitControlsOuter.enabled=!0,e.latData.visible=!0})),e.mixers=[a],o.play(),we(1,(()=>{e.currentHeadingRad=0}))}function Se(e,t,i,n){const a=oe(t,i,n);e.sunLight.position.set(a[0]*B,a[1]*B,a[2]*B),e.littleSunMesh.position.set(a[0]*V,a[1]*V,a[2]*V);let o=Math.acos(a[0]/Math.sqrt(a[0]**2+a[1]**2+a[2]**2)),r=Math.PI/2-o;r<0&&(r=0),e.solarAltitudeAngleDeg=ie(r)}function Ce(e,t,i){e.sunTrackLineGroup.children[0]=he(t,i,e.isSkySphereView),e.sunTrackLineGroup.children[0].rotation.z=e.isSkySphereView?Math.PI/2:0}function Pe(e){e.canvasWidth=0,e.canvasHeight=0,e.scene=void 0,e.camera=void 0,e.cameraOuter=void 0,e.renderer=void 0,e.sceneBackgroundTexture=void 0,e.earthMesh=void 0,e.ambientLight=void 0,e.sunLight=void 0,e.latData=void 0,e.skyCircleLine=void 0,e.skySphereUMesh=void 0,e.skySphereLMesh=void 0,e.groundPlaneMesh=void 0,e.sunTrackLineGroup=void 0,e.arrowMesh=void 0,e.arrowBigMesh=void 0,e.orbitControlsOuter=void 0,e.smvDragControls=void 0,e.rayCaster=void 0,e.mousePointer=void 0,e.clock=void 0,e.mixers=void 0,e.previousCameraZoom=void 0,e.previousCameraPosition=void 0,e.previousCameraQuaternion=void 0,e.isMouseOnEarth=!1}function Oe(e){e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.scene=new _.xsS,e.camera=new _.cPb(60,e.canvasWidth/e.canvasHeight,.01,1e4),e.cameraOuter=new _.iKG(-N,N,N*e.canvasHeight/e.canvasWidth,-N*e.canvasHeight/e.canvasWidth,.1,1e4),e.renderer=new _.CP7({alpha:!0});const t=new _.dpR;e.sceneBackgroundTexture=t.load(E+"starry.png"),e.scene.background=e.sceneBackgroundTexture,e.camera.name="camera",e.camera.position.set(218,0,-83),e.camera.lookAt(0,0,0),e.cameraOuter.position.set(218,0,-83),e.cameraOuter.lookAt(0,0,0),e.renderer.setSize(e.canvasWidth,e.canvasHeight),Q("body").append(e.renderer.domElement);const i=new $.y;i.load(E+"earth.fbx",(t=>{e.earthMesh=t,t.children[0].material.shininess=80,e.scene.add(t)})),i.load(E+"arrow.fbx",(t=>{e.arrowMesh=t,t.visible=!1,e.scene.add(t)})),i.load(E+"arrow_big.fbx",(t=>{e.arrowBigMesh=t,e.arrowBigMesh.position.set(0,0,0),e.arrowBigMesh.rotation.z=Math.PI/2,t.visible=!1,e.scene.add(t)}));const n=new _.zf8(H,100),a=t.load(E+"detail.bmp");a.wrapS=_.rpg,a.wrapT=_.rpg,a.repeat.set(q,q);const o=t.load(E+"detailb.bmp");o.wrapS=_.rpg,o.wrapT=_.rpg,o.repeat.set(q,q);const r=new _.Wid({map:a,bumpMap:o,side:_.ehD});r.transparent=!0,r.opacity=0,e.groundPlaneMesh=new _.Kj0(n,r),e.groundPlaneMesh.position.set(0,0,0),e.groundPlaneMesh.rotation.x=Math.PI/2,e.groundPlaneMesh.rotation.y=-Math.PI/2,e.groundPlaneMesh.visible=!1,e.scene.add(e.groundPlaneMesh);const s=new _.xo$(5,10,10),l=new _.vBJ({color:15787660});e.littleSunMesh=new _.Kj0(s,l),e.littleSunMesh.visible=!1,e.scene.add(e.littleSunMesh);const c=new _.Ny0(0,0,H,H),u=(new _.u9r).setFromPoints(c.getPoints(100)),d=new _.FT0({color:16747520,dashSize:6,gapSize:4,transparent:!0,opacity:.6});e.skyCircleLine=new _.x12(u,d).computeLineDistances(),e.skyCircleLine.rotation.x=Math.PI/2,e.skyCircleLine.visible=!1;const h=new _.xo$(H,100,100,0,2*Math.PI,0,Math.PI/2),m=new _.xo$(H,100,100,0,2*Math.PI,0,Math.PI/2),p=new _.vBJ({color:2003199,transparent:!0,opacity:.25,side:_.ehD}),v=new _.vBJ({color:8421504,transparent:!0,opacity:.25,side:_.ehD});e.skySphereUMesh=new _.Kj0(h,p),e.skySphereLMesh=new _.Kj0(m,v),e.skySphereUMesh.rotation.z=-Math.PI/2,e.skySphereLMesh.rotation.z=Math.PI/2,e.skySphereUMesh.visible=!1,e.skySphereLMesh.visible=!1,e.scene.add(e.skySphereUMesh,e.skySphereLMesh),e.latData=de(100),ae(e.cameraOuter,e.latData.children[1].children),e.scene.add(e.latData),e.sunTrackLineGroup=new _.ZAu,e.scene.add(e.sunTrackLineGroup),e.ambientLight=new _.Mig(16777215,1.3),e.sunLight=new _.Ox3(16777215,.5),e.sunLight.position.set(150,180,0);const b=t.load(E+"lf0.png"),w=t.load(E+"lf1.png"),g=new te.Z;g.addElement(new te.B(b,700,0,e.sunLight.color)),g.addElement(new te.B(w,60,.6)),g.addElement(new te.B(w,70,.7)),g.addElement(new te.B(w,120,.9)),g.addElement(new te.B(w,70,1)),e.sunLight.add(g),e.sunLight.children[0].visible=!1,e.scene.add(e.ambientLight),e.scene.add(e.sunLight),e.orbitControlsOuter=new ee.z(e.cameraOuter,e.renderer.domElement),e.orbitControlsOuter.enableDamping=!0,e.orbitControlsOuter.dampingFactor=.05,e.orbitControlsOuter.minZoom=.7350918906249998,e.orbitControlsOuter.maxZoom=4.658990676380596,e.smvDragControls=new me(e.camera,e.renderer.domElement),e.smvDragControls.enabled=!1,e.smvDragControls.onHeadingChange=t=>{e.currentHeadingRad=t},e.rayCaster=new _.iMs,e.mousePointer=new _.FM8,e.mixers=[],e.clock=new _.SUY;const M=()=>{requestAnimationFrame(M),e.isGroundView&&!e.isSkySphereView||e.orbitControlsOuter.update();const t=e.clock.getDelta();for(let i of e.mixers)i.update(t);e.renderer.render(e.scene,!e.isGroundView||e.isSkySphereView?e.cameraOuter:e.camera)};M(),window.onresize=()=>{e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.renderer.setSize(e.canvasWidth,e.canvasHeight),e.camera.aspect=e.canvasWidth/e.canvasHeight,e.camera.updateProjectionMatrix(),e.cameraOuter.top=N*e.canvasHeight/e.canvasWidth,e.cameraOuter.bottom=-N*e.canvasHeight/e.canvasWidth,e.cameraOuter.updateProjectionMatrix()},window.onmousemove=t=>{if(!e.isGroundView&&(e.mousePointer.x=t.clientX/window.innerWidth*2-1,e.mousePointer.y=-t.clientY/window.innerHeight*2+1,e.rayCaster.setFromCamera(e.mousePointer,e.cameraOuter),e.earthMesh)){const t=e.rayCaster.intersectObjects(e.earthMesh.children,!1);if(t.length>0){let i=Math.asin(t[0].point.y/T);e.latDegFixed1=parseFloat(ie(i).toFixed(1)),e.latRad=i,e.isMouseOnEarth=!0}else e.isMouseOnEarth=!1}},window.ondblclick=()=>{e.isMouseOnEarth&&xe(e)},e.orbitControlsOuter.addEventListener("change",(()=>{if(e.isGroundView||ae(e.cameraOuter,e.latData.children[1].children),e.isSkySphereView){let t=Math.acos(-e.cameraOuter.position.x/Math.sqrt(e.cameraOuter.position.x**2+e.cameraOuter.position.z**2));e.currentHeadingRad=e.cameraOuter.position.z>0?Math.PI-t:Math.PI+t}}))}function ze(e){return 0==e?"北":0<e&&e<90?"东北":90==e?"东":90<e&&e<180?"东南":180==e?"南":180<e&&e<270?"西南":270==e?"西":"西北"}function Ie(e){let t=e/60,i=parseInt(t),n=Math.round(60*(t-i)),a=n<10?`0${n}`:`${n}`;return`${i}:${a}`}function ke(e,t,i,n,r,s){return(0,a.wg)(),(0,a.iD)("label",{class:"lbl-compass-word",style:(0,o.j5)({color:i.textcolor,transform:"translate("+i.translatedata.x+"px,"+i.translatedata.y+"px)"})},(0,o.zw)(i.word),5)}var De={props:{word:{type:String,required:!0},translatedata:{type:Object,required:!0},textcolor:{type:String,required:!0}}},je=i(89);const Re=(0,je.Z)(De,[["render",ke],["__scopeId","data-v-4cb0db9c"]]);var Ze=Re,Ge={name:"App",data(){return{title:"太阳视运动可视化",latDegFixed1:36.7,latRad:.6399541,solarAltituteDeg:15,timeMinutes:510,solarAltitudeAngleDeg:0,isGroundView:!1,isGroundControlsShow:!1,windowIntervalHandlerNumber:-1,currentHeadingRad:0,isAboutShow:!1}},mounted(){Pe(this),Oe(this),Se(this,this.latRad,this.timeMinutes,this.solarAltituteDeg),window.onclick=()=>{this.isAboutShow&&Me((()=>{this.isAboutShow=!1}))}},watch:{latDegFixed1(e){this.latRad=ne(e)},sunPositionParams(e,t){this.isGroundControlsShow&&(Se(this,e[0],e[1],e[2]),e[0]==t[0]&&e[2]==t[2]||Ce(this,e[0],e[2]))}},computed:{localTime(){return Ie(this.timeMinutes)},sunPositionParams(){return[this.latRad,this.timeMinutes,this.solarAltituteDeg]},compassRotationRad(){return-this.currentHeadingRad},compassWordTranslates(){return le(this.currentHeadingRad)},currentHeadingRoundedDeg(){return Math.round(ie(this.currentHeadingRad))},currentHeadingWord(){return ze(this.currentHeadingRoundedDeg)}},methods:{adjLatDegFixed1(e){this.latDegFixed1=0==e?parseFloat((this.latDegFixed1-.1<-90?-90:this.latDegFixed1-.1).toFixed(1)):parseFloat((this.latDegFixed1+.1>90?90:this.latDegFixed1+.1).toFixed(1))},adjSolarAltituteDeg(e){this.solarAltituteDeg=0==e?parseFloat((this.solarAltituteDeg-.1<-23.5?-23.5:this.solarAltituteDeg-.1).toFixed(1)):parseFloat((this.solarAltituteDeg+.1>23.5?23.5:this.solarAltituteDeg+.1).toFixed(1))},adjLocalTime(e){this.timeMinutes=0==e?this.timeMinutes-1<0?1439:this.timeMinutes-1:this.timeMinutes+1>1439?0:this.timeMinutes+1},changeToGroundView(){xe(this)},exitGroundView(){Le(this)},switchGroundView(){fe(this)},switchAutoPlay(){this.isGroundControlsShow&&(-1==this.windowIntervalHandlerNumber?this.windowIntervalHandlerNumber=window.setInterval((()=>{this.timeMinutes+1>1439?this.timeMinutes=0:this.timeMinutes++}),Y):(window.clearInterval(this.windowIntervalHandlerNumber),this.windowIntervalHandlerNumber=-1))},showAbout(){this.isAboutShow||(this.isAboutShow=!0,ge())}},components:{CompassWord:Ze}};const Te=(0,je.Z)(Ge,[["render",G]]);var Fe=Te;(0,n.ri)(Fe).mount("body")},447:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAt1JREFUWEfVl0uojmsUx3//0UlspZTLUO6ZuR5KRiiXTJi4lBRicGZinxy2XEIGokQGzsEAM+Q2MZHIJYlzjsKAkEwkxEB/rd3z6d3ffm/7+3R256ln8r3Pu9bvXeu/nrU+0c9L/eyf/x+A7ZnAXGBE2hHEN2lfkHSvL1GtFQHbA4HfgNXA6IyD58A3YEzmt3+AU8BBSZ+qYCoBbC8F/gAmAdeAB0B85Q1Jr8OB7WHAtMyOCD0C9kv6qwyiFCA5P5sMrJQUX1a5bG8BdqeD2yV1Fb1UCGB7O7ANOAeE86+VnjMHbA8CrgKhmWWSwk6vlQtgexXwJ3BT0qy+OG4+azsiGGnMhegFkAR3K+W8Q9LHNgF+Ab4kTcxoFmYeQCewC+iUtKfKefrCX4F9kg7lnbe9AjgJ/C6poY3uo3kAfwMvJc2r4Xwc8G86917SkKJ3bIceRknKlmxPANuTgbvATklbqwBSCUa6podYJS0rAdgLbAJmSbrZONcjAhnlL5Z0oSZAXFITJd0pO2874M4AXZKiwnqnwPZRYC0wXNLbmgALgSlZowU6GAm8Ao5JWlcEcB4YL2lslXPb84EdwFSgNP8NW7afAY8lLW4ZwPZQ4B1wGYgSjRq/JGlBDegnwENJ8U77KbD9GRgQTUrSiQoNdAAfmgXesghtRzvubkaS6jS1OcB1YIWk00URqF2GtkN83ZUSAAEkKeaC3GV7I3AYmCzpfi5AqutaF5HtaFSNcjqSdHCxBOAKMCG2pEhdbw0kgFpXse2omEXJzgZJAVH09WuA48B6SVHqP1bLzch2DB3RakvHMNuDo6sCTyUtaSb8L9pxpCkGlNmSbtcCSKloayBpstHj+i1NQfZhqyNZw0amt+yVtDlPIHXqt3IoLRJfikLMkcube0BhFeQZqxjLX5QBZJ7FRdSjEcWzygg0G8/5YxJXbN11UdKB2hqoa7Wdc32OQDvOWhLhz3bYbO87DgRDMJN/SRAAAAAASUVORK5CYII="},1250:function(e,t,i){e.exports=i.p+"img/comp.9544400d.png"},2174:function(e){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAwCAYAAAC13uL+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAzLTA3VDIzOjAxOjE1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTA3VDIzOjAxOjE1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMy0wN1QyMzowMToxNSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDplZWUyNGFkMi03MDBmLTY2NGUtOWUxZC04NWE5OTA2YWE5MWYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4YzdjNjNhNS1mMTRlLTZmNGMtYjZiYy1l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"}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,i),o.exports}i.m=e,function(){var e=[];i.O=function(t,n,a,o){if(!n){var r=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var s=!0,l=0;l<n.length;l++)(!1&o||r>=o)&&Object.keys(i.O).every((function(e){return i.O[e](n[l])}))?n.splice(l--,1):(s=!1,o<r&&(r=o));if(s){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}}(),function(){i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,{a:t}),t}}(),function(){i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){i.p="SunMotionVisualization/"}(),function(){var e={143:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,r=n[0],s=n[1],l=n[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(a in s)i.o(s,a)&&(i.m[a]=s[a]);if(l)var u=l(i)}for(t&&t(n);c<r.length;c++)o=r[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(u)},n=self["webpackChunksun_motion_visualization"]=self["webpackChunksun_motion_visualization"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=i.O(void 0,[998],(function(){return i(2868)}));n=i.O(n)})();
//# sourceMappingURL=app.1f5bcd0d.js.map