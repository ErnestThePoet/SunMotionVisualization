/* eslint-disable no-unused-vars */
<template>
  <div>
<div class="d-flex flex-column div-controls-wrapper" style="z-index: 49;" @dblclick.stop="">
      <label class="lbl-common-text lbl-guide">Tip : 直接双击地球上的点，就可以查看该纬度的太阳视运动了~也可以手动调整纬度前往哦！</label>
    
      <div class="div-common-control-block">
        <div class="d-flex flex-row justify-content-between" style="margin-bottom: 5px;">
          <div>
            <label class="lbl-common-text">纬度：</label>
            <label
              class="lbl-data-display">{{Math.abs(latDegFixed1)}}°{{latDegFixed1>0?"N":(latDegFixed1==0?"":"S")}}</label>
          </div>
    
          <button class="btn btn-outline-light" @click="changeToGroundView">前往</button>
        </div>
        <input class="form-range" type="range" min="-90" max="90" step="0.1" v-model.number="latDegFixed1" />
    
        <div class="d-flex flex-row justify-content-between">
          <div class="div-adjust" @click="adjLatDegFixed1(0)">←</div>
          <div class="div-adjust" @click="adjLatDegFixed1(1)">→</div>
        </div>
      </div>
    
      <transition name="tr-ground-view">
        <div class="d-flex flex-column" v-if="isGroundControlsShow">
          <div class="div-common-control-block">
            <label class="lbl-common-text">太阳直射点纬度：</label>
            <label
              class="lbl-data-display">{{Math.abs(solarAltituteDeg)}}°{{solarAltituteDeg>0?"N":(solarAltituteDeg==0?"":"S")}}</label>
            <input class="form-range" type="range" min="-23.5" max="23.5" step="0.1" v-model.number="solarAltituteDeg" />
    
            <div class="d-flex flex-row justify-content-between">
              <div class="div-adjust" @click="adjSolarAltituteDeg(0)">←</div>
              <div class="div-adjust" @click="adjSolarAltituteDeg(1)">→</div>
            </div>
          </div>
    
          <div class="div-common-control-block d-flex flex-column">
            <div>
              <label class="lbl-common-text">当地地方时：</label>
              <label class="lbl-data-display">{{localTime}}</label>
            </div>
            <input class="form-range" style="margin-bottom: 5px;" type="range" min="0" max="1439" step="1"
              v-model.number="timeMinutes" />
    
            <div class="d-flex flex-row justify-content-between">
              <div class="div-adjust" @click="adjLocalTime(0)">←</div>
              <div class="div-adjust" @click="adjLocalTime(1)">→</div>
            </div>
    
            <div style="margin: 10px 0; ">
              <label class="lbl-common-text">太阳高度角：</label>
              <label class="lbl-data-display">{{solarAltitudeAngleDeg.toFixed(1)}}°</label>
            </div>
            <button class="btn btn-outline-light"
              @click="switchAutoPlay">{{windowIntervalHandlerNumber==-1?"启动":"停止"}}循环播放</button>
          </div>
    
          <div class="div-common-control-block d-flex flex-column" style="margin-top: 0;">
            <button class="btn btn-outline-info" @click="switchGroundView">切换地平面/天球视图</button>
          </div>
    
          <div class="div-common-control-block d-flex flex-column" style="margin-top: 0;">
            <button class="btn btn-outline-danger" @click="exitGroundView">退出视图</button>
          </div>
        </div>
      </transition>
    </div>
    
    <div class="d-flex flex-row justify-content-between align-items-center div-title-bar" style="z-index: 50;">
      <label class="lbl-title">{{title}}</label>
    
      <div class="div-windows-controls-container">
        <!--Must use closing tag or only the first element will be displayed-->
        <window-control class="wc-minmax" :imgsrc="require('./uires/min.png')" @click.stop="btnMinClick"></window-control>
        <window-control class="wc-minmax" :imgsrc="require('./uires/max.png')" @click.stop="btnMaxClick"></window-control>
        <window-control class="wc-close" :imgsrc="require('./uires/close.png')" @click.stop="btnCloseClick"></window-control>
      </div>
    </div>
    
    <div class="d-flex flex-column align-items-center div-compass-wrapper" style="z-index: 49;">
      <img src="./uires/comp_arrow.png" style="width: 30px; height: 30px; margin-bottom: 5px;" draggable="false" />
    
      <div style="position: relative;">
        <img src="./uires/comp.png" class="img-comp" :style="{transform:'rotateZ('+compassRotationRad+'rad)'}"
          draggable="false" />
    
        <compass-word word="北" textcolor="dodgerblue" :translatedata="compassWordTranslates[0]"></compass-word>
        <compass-word word="东" textcolor="limegreen" :translatedata="compassWordTranslates[1]"></compass-word>
        <compass-word word="南" textcolor="orangered" :translatedata="compassWordTranslates[2]"></compass-word>
        <compass-word word="西" textcolor="orange" :translatedata="compassWordTranslates[3]"></compass-word>
    
        <label class="lbl-center-info lbl-center-info-u">{{currentHeadingWord}}</label>
        <label class="lbl-center-info lbl-center-info-l">{{currentHeadingRoundedDeg}}°</label>
      </div>
    </div>
    
    <img class="img-about" style="z-index: 50;" src="./uires/about.png" @click.stop="showAbout" />
    
    <div class="div-about-wrapper" style="z-index: 50;"
      :style="{transform:'translate(-50%,-50%) scale('+(isAboutShow?'100%':'0%')+')'}">
      高中地理：太阳视运动可视化 ——献给我的母校山东省实验中学 (版本v3.0.0)<br />
      软件作者：崔子健(Ernest Cui)<br />
      作者单位：哈尔滨工业大学计算学部<br />
      作者联系方式：ecuiships@126.com<br />
      开发时间：2022.03.04 - 2022.03.08<br />
      项目简介：基于WebGL的太阳视运动可视化，可在地面或天球3D场景中自由观察太阳视运动轨迹，可选择任意观察纬度、动态调节太阳直射点纬度和地方时。项目使用真实距离比例和理想化数学模型，模拟准确度可满足高中地理教学的需要。
      <br /><br />
      本项目以GPL-3.0许可证开源。开源仓库地址：
      <br />
      https://github.com/ErnestThePoet/SunMotionVisualization
      https://gitee.com/ecui/SunMotionVisualization
      <br />
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高二的一节地理课上，太阳的视运动让我们与想象力玩起了捉迷藏。那时隔帘初探计算机世界的我，在下课后有了一个“大胆”的想法：要是能写出一个可以实地展现太阳运动轨迹的程序，帮助大家更好地理解和记忆太阳的视运动，那该多好！当然，这蚍蜉撼树式的激动，在半节课后，就随着游走的笔头消逝在试卷之间了。
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;韶华的身影跳跃着。大二的一个傍晚，我完成了Three.js主要内容的自学；这时，我的天使告诉我：你可以回过头去，拾起三年前的小小心愿了。
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——这便是我开始这个小小工程的一切动机。作为一份小小的礼物，我将它献给我的母校——山东省实验中学，献给我的恩师——孙玉娟老师；我永不会忘却，那些将地理之美呈现给我们、唤起我们对大千世界向往的课堂。<br />
      <div style="text-align: right;">
        2022年3月8日夜，于哈尔滨工业大学一公寓
      </div>
      <br />
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v3.0.0版本后记：深深感谢东校地理教研组长王桂林老师。使用过最初的版本后，王老师抽出宝贵的时间，结合教学实际，详细而耐心地为本项目提出了许多重要的改进建议，极大地完善和改进了这个项目。
      <br />
    </div>
  </div>
</template>

<script>
import {autoPlayIntervalMs} from "./smv_modules/AppConstants"
import {initWebGLData,setUpWebGL} from "./smv_modules/AppSetup"
import {toDeg,toRad, calculateCompassWordTranslates} from "./smv_modules/GeoMath"
import * as SC from "./smv_modules/SceneControl"
import {getHeadingWord,convertToLocalTime} from "./smv_modules/UIHelpers"
import * as ANIMATIONS from "./smv_modules/Animations"

import "../node_modules/bootstrap/dist/css/bootstrap.css"

import WindowControl from "./components/WindowControl.vue"
import CompassWord from "./components/CompassWord.vue"

export default {
  name: 'App',
  data() {
        return {
            title: "太阳视运动可视化 - 山东省实验中学",

            latDegFixed1: 36.7,
            latRad: 0.6399541,

            solarAltituteDeg: 15,
            // time of the day in minutes
            timeMinutes: 510,

            // solar altitude angle
            solarAltitudeAngleDeg: 0,

            // this includes animation periods
            isGroundView: false,
            // this does not include animation periods
            isGroundControlsShow: false,

            windowIntervalHandlerNumber: -1,

            currentHeadingRad: 0,

            isAboutShow: false
        }
    },

    mounted() {
        initWebGLData(this)
        setUpWebGL(this)
        SC.updateSunPosition(this,this.latRad, this.timeMinutes, this.solarAltituteDeg)

        window.onclick = () => {
            if (this.isAboutShow) {
                ANIMATIONS.hideAbout(() => {
                    this.isAboutShow = false
                })
            }
        }
    },

    watch: {
        latDegFixed1(newVal) {
            this.latRad = toRad(newVal)
        },

        sunPositionParams(newVal, oldVal) {
            if (!this.isGroundControlsShow) {
                return
            }

            SC.updateSunPosition(this,newVal[0], newVal[1], newVal[2])

            if (newVal[0] != oldVal[0] || newVal[2] != oldVal[2]) {
                SC.updateSunTrackLine(this,newVal[0],newVal[2])
            }
        }
    },

    computed: {
        localTime() {
            return convertToLocalTime(this.timeMinutes)
        },
        sunPositionParams() {
            return [this.latRad, this.timeMinutes, this.solarAltituteDeg]
        },
        compassRotationRad() {
            return -this.currentHeadingRad
        },
        // N E S W
        compassWordTranslates() {
            return calculateCompassWordTranslates(this.currentHeadingRad)
        },
        currentHeadingRoundedDeg() {
            return Math.round(toDeg(this.currentHeadingRad))
        },
        currentHeadingWord() {
            return getHeadingWord(this.currentHeadingRoundedDeg)
        }
    },

    methods: {
        btnMinClick() {
            window.data.minimizeWindow()
        },
        btnMaxClick() {
            window.data.maximizeWindow()
        },
        btnCloseClick() {
            window.data.closeWindow()
        },
        adjLatDegFixed1(mode) {
            if (mode == 0) {
                this.latDegFixed1 =
                    parseFloat((this.latDegFixed1 - 0.1 < -90 ? -90 : this.latDegFixed1 - 0.1).toFixed(1))
            }
            else {
                this.latDegFixed1 =
                    parseFloat((this.latDegFixed1 + 0.1 > 90 ? 90 : this.latDegFixed1 + 0.1).toFixed(1))
            }
        },
        adjSolarAltituteDeg(mode) {
            if (mode == 0) {
                this.solarAltituteDeg =
                    parseFloat((this.solarAltituteDeg - 0.1 < -23.5 ? -23.5 : this.solarAltituteDeg - 0.1).toFixed(1))
            }
            else {
                this.solarAltituteDeg =
                    parseFloat((this.solarAltituteDeg + 0.1 > 23.5 ? 23.5 : this.solarAltituteDeg + 0.1).toFixed(1))
            }
        },
        adjLocalTime(mode) {
            if (mode == 0) {
                this.timeMinutes = this.timeMinutes - 1 < 0 ? 1439 : this.timeMinutes - 1
            }
            else {
                this.timeMinutes = this.timeMinutes + 1 > 1439 ? 0 : this.timeMinutes + 1
            }
        },

        changeToGroundView(){
            SC.changeToGroundView(this)
        },
        exitGroundView(){
            SC.exitGroundView(this)
        },
        switchGroundView(){
            SC.switchGroundView(this)
        },
        
        switchAutoPlay() {
            if (!this.isGroundControlsShow) {
                return
            }

            if (this.windowIntervalHandlerNumber == -1) {
                this.windowIntervalHandlerNumber = window.setInterval(() => {
                    if (this.timeMinutes + 1 > 23 * 60 + 59) {
                        this.timeMinutes = 0
                    }
                    else {
                        this.timeMinutes++
                    }
                }, autoPlayIntervalMs)
            }
            else {
                window.clearInterval(this.windowIntervalHandlerNumber)
                this.windowIntervalHandlerNumber = -1
            }
        },
        showAbout() {
            if (this.isAboutShow) {
                return
            }

            this.isAboutShow = true

            ANIMATIONS.showAbout()
        }
    },
  components: {
    WindowControl,
    CompassWord
  }
}

</script>

<style>
body{
    margin: 0;
    user-select: none;
    overflow: hidden;
}

.div-title-bar{
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height:fit-content;
    
    background-color: rgba(0, 0, 0, 0.3);

    -webkit-app-region: drag;

    user-select: none;
}

.lbl-title{
    color: white;
    font-size: 13px;
    padding-left: 10px;
}

.div-windows-controls-container{
    height: fit-content
}



.wc-minmax:hover{
    background-color: rgb(65, 105, 225);
}

.wc-close:hover{
    background-color: rgb(255, 69, 0);
}

.div-controls-wrapper{
    position: absolute;
    left: 0;
    top: 0;

    height: 100%;
    width: 250px;
    background-color: rgba(0, 0, 0, 0.3);

    padding-top: 35px;
}

.div-adjust{
    width: 49%;
    color: white;
    background-color: rgba(255,255,255,0.3);
    border-radius: 3px;
    text-align: center;
    transition-duration: 200ms;
}

.div-adjust:hover{
    background-color: rgba(255,255,255,0.4);
}

.div-adjust:active{
    background-color: rgba(255,255,255,0.5);
}

.lbl-common-text{
    color: white;
    font-size: small;
}

.lbl-guide{
    margin: 15px 10px 10px;
}

.div-common-control-block{
    margin: 10px 20px 10px;
    height: fit-content;
}

.in-lat-deg{
    height: 100%;
    background-color: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 3px;
    margin-right: 20px;
}

.lbl-data-display{
    font-size: 20px;
    color: white;
}

.tr-ground-view-enter-active,
.tr-ground-view-leave-active{
    transition: opacity 500ms ease;
}

.tr-ground-view-enter-from,
.tr-ground-view-leave-to{
    opacity: 0;
}

.div-compass-wrapper{
    position: absolute;
    bottom: 30px;
    right: 30px;

    filter: drop-shadow(5px 5px 5px black);
    opacity: 0;
}

.img-comp{
    width: 200px;
    height: 200px;
}



.lbl-center-info{
    position: absolute;
    left: 50%;
    top: 50%;

    color: white;
}

.lbl-center-info-u{
    font-size: 18px;
    transform: translate(-50%,-23px);
}

.lbl-center-info-l{
    font-size: 15px;
    transform: translate(-50%,5px);
}

.img-about{
    position: fixed;
    bottom: 10px;
    left: 10px;

    cursor:pointer;

    transition: 200ms;
    transition-timing-function: ease-in-out;
}

.img-about:hover{
    transform: scale(110%);
}

.img-about:active{
    transform: scale(102%);
}

.div-about-wrapper{
    position: fixed;

    top: 50%;
    left: 50%;

    font-size: small;
    color: white;

    background-color: rgba(0,0,0,0.75);

    opacity: 0;

    padding: 20px;
}
</style>
