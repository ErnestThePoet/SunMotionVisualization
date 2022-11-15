/* eslint-disable no-unused-vars */
<template>
  <div>
    <div
      class="d-flex flex-column div-controls-wrapper"
      :class="{'div-controls-wrapper-folded':isControlsWrapperFolded}"
      style="z-index: 49"
      @dblclick.stop=""
    >
      <label class="lbl-common-text lbl-guide"
        >Tip :
        直接双击地球上的点，就可以查看该纬度的太阳视运动了~也可以手动调整纬度前往哦！</label
      >

      <div class="div-common-control-block">
        <div
          class="d-flex flex-row justify-content-between"
          style="margin-bottom: 5px"
        >
          <div>
            <label class="lbl-common-text">纬度：</label>
            <label class="lbl-data-display"
              >{{ Math.abs(latDegFixed1) }}°{{
                latDegFixed1 > 0 ? "N" : latDegFixed1 == 0 ? "" : "S"
              }}</label
            >
          </div>

          <button class="btn btn-outline-light" @click="changeToGroundView">
            前往
          </button>
        </div>
        <input
          class="form-range"
          type="range"
          min="-90"
          max="90"
          step="0.1"
          v-model.number="latDegFixed1"
        />

        <div class="d-flex flex-row justify-content-between">
          <div class="div-adjust" @click="adjLatDegFixed1(0)">←</div>
          <div class="div-adjust" @click="adjLatDegFixed1(1)">→</div>
        </div>
      </div>

      <transition name="tr-ground-view">
        <div class="d-flex flex-column" v-if="isGroundControlsShow">
          <div class="div-common-control-block">
            <label class="lbl-common-text">太阳直射点纬度：</label>
            <label class="lbl-data-display"
              >{{ Math.abs(solarAltituteDeg) }}°{{
                solarAltituteDeg > 0 ? "N" : solarAltituteDeg == 0 ? "" : "S"
              }}</label
            >
            <input
              class="form-range"
              type="range"
              min="-23.5"
              max="23.5"
              step="0.1"
              v-model.number="solarAltituteDeg"
            />

            <div class="d-flex flex-row justify-content-between">
              <div class="div-adjust" @click="adjSolarAltituteDeg(0)">←</div>
              <div class="div-adjust" @click="adjSolarAltituteDeg(1)">→</div>
            </div>
          </div>

          <div class="div-common-control-block d-flex flex-column">
            <div>
              <label class="lbl-common-text">当地地方时：</label>
              <label class="lbl-data-display">{{ localTime }}</label>
            </div>
            <input
              class="form-range"
              style="margin-bottom: 5px"
              type="range"
              min="0"
              max="1439"
              step="1"
              v-model.number="timeMinutes"
            />

            <div class="d-flex flex-row justify-content-between">
              <div class="div-adjust" @click="adjLocalTime(0)">←</div>
              <div class="div-adjust" @click="adjLocalTime(1)">→</div>
            </div>

            <div style="margin: 10px 0">
              <label class="lbl-common-text">太阳高度角：</label>
              <label class="lbl-data-display"
                >{{ solarAltitudeAngleDeg.toFixed(1) }}°</label
              >
            </div>
            <button class="btn btn-outline-light" @click="switchAutoPlay">
              {{ windowIntervalHandlerNumber == -1 ? "启动" : "停止" }}循环播放
            </button>
          </div>

          <div
            class="div-common-control-block d-flex flex-column"
            style="margin-top: 0"
          >
            <button class="btn btn-outline-info" @click="switchGroundView">
              切换地平面/天球视图
            </button>
          </div>

          <div
            class="div-common-control-block d-flex flex-column"
            style="margin-top: 0"
          >
            <button class="btn btn-outline-danger" @click="exitGroundView">
              退出视图
            </button>
          </div>
        </div>
      </transition>

      <div class="div-bottom-controls d-flex justify-content-between align-items-center">
        <svg t="1668476575929" 
        class="svg-hover-color svg-about" 
        style="z-index: 50" 
        @click.stop="showAbout" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6202" width="32" height="32" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M618 669.9c-89.6 77.4-62.5-58.4-58.4-77.4 4.1-19 62.4-135.8 19.7-155.4-42.8-19.7-174.5 77.4-174.5 77.4s-21.7 15.6-19.7 19.7c14.3 25.1 77.4-19.7 77.4-19.7s21.7-17.6 19.7 0c-19 76.5-32 154.3-38.7 232.8 9.5 51.6 91 29.9 154.8-38.7 63.8-68.5 19.7-38.7 19.7-38.7z m0 0" p-id="6203"></path><path d="M566 378c24.2 1.3 47.3-10.4 60.5-30.7 13.2-20.3 14.7-46.1 3.7-67.8-11-21.6-32.6-35.8-56.9-37.1-24.2-1.3-47.3 10.4-60.5 30.7-13.2 20.3-14.7 46.1-3.7 67.8 11 21.6 32.7 35.8 56.9 37.1z m0 0" p-id="6204"></path><path d="M884.8 853.9c87.3-93.3 135.9-216.4 135.8-344.2C1020.6 228.5 792.7 0.6 511.5 0.6 230.3 0.6 2.4 228.6 2.4 509.7c0 281.2 227.9 509.1 509.1 509.1h475.2c14.3 0.1 27.1-8.7 32.1-22 5-13.4 1.1-28.4-9.7-37.7L884.8 853.9zM511.5 951C267.8 951 70.2 753.4 70.2 509.7 70.2 266 267.7 68.5 511.4 68.5S952.6 266 952.6 509.7c0.4 122.1-50.3 238.8-139.8 321.8-7.1 7-10.7 16.8-9.9 26.7 0.8 9.9 5.9 19 14 24.9l80.8 67.9H511.5z m0 0" p-id="6205"></path></svg>

        <svg t="1668476332112" 
        class="svg-hover-color svg-fold-controls-wrapper" 
        style="z-index: 50" 
        @click.stop="foldControlsWrapper" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4229" width="32" height="32" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M176 513.7l392.73-395.44a32 32 0 0 0-45.41-45.1L108 491.3a32 32 0 0 0 0.16 45.25L523.48 949a32 32 0 1 0 45.1-45.41z" p-id="4230"></path><path d="M525.23 513.7L918 118.26a32 32 0 1 0-45.41-45.1L457.27 491.3a32 32 0 0 0 0.16 45.25L872.7 949a32 32 0 0 0 45.1-45.41z" p-id="4231"></path></svg>
      </div>
    </div>

    <svg t="1668476563071" 
        v-if="isControlsWrapperFolded"
        class="svg-hover-color svg-unfold-controls-wrapper" 
        style="z-index: 50" 
        @click.stop="unfoldControlsWrapper"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5207" width="32" height="32" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M44.4 245.9h935.2c24.4 0 44.4-20 44.4-44.4s-19.8-44.4-44.4-44.4H44.4C20 157.1 0 177.1 0 201.5s20 44.4 44.4 44.4z m935.2 221.8H44.4C20 467.7 0 487.7 0 512.1s20 44.4 44.4 44.4h935.2c24.4 0 44.4-20 44.4-44.4s-20-44.4-44.4-44.4z m0 310.4H44.4C20 778.1 0 797.8 0 822.5s20 44.4 44.4 44.4h935.2c24.4 0 44.4-19.8 44.4-44.4s-20-44.4-44.4-44.4z" p-id="5208"></path></svg>

    <div
      class="d-flex flex-column align-items-center div-compass-wrapper"
      :style="{
        zIndex: 49,
        transform: `${
          isMobilePhoneBrowser ? 'scale(0.5) translate(140px,150px)' : ''
        }`,
      }"
    >
      <img
        src="./uires/comp_arrow.png"
        style="width: 30px; height: 30px; margin-bottom: 5px"
        draggable="false"
      />

      <div style="position: relative">
        <img
          src="./uires/comp.png"
          class="img-comp"
          :style="{ transform: 'rotateZ(' + compassRotationRad + 'rad)' }"
          draggable="false"
        />

        <compass-word
          word="北"
          textcolor="dodgerblue"
          :translatedata="compassWordTranslates[0]"
        ></compass-word>
        <compass-word
          word="东"
          textcolor="limegreen"
          :translatedata="compassWordTranslates[1]"
        ></compass-word>
        <compass-word
          word="南"
          textcolor="orangered"
          :translatedata="compassWordTranslates[2]"
        ></compass-word>
        <compass-word
          word="西"
          textcolor="orange"
          :translatedata="compassWordTranslates[3]"
        ></compass-word>

        <label class="lbl-center-info lbl-center-info-u">{{
          currentHeadingWord
        }}</label>
        <label class="lbl-center-info lbl-center-info-l"
          >{{ currentHeadingRoundedDeg }}°</label
        >
      </div>
    </div>

    <div
      class="div-about-wrapper"
      style="z-index: 50"
      :style="{
        transform:
          'translate(-50%,-50%) scale(' + (isAboutShow ? '100%' : '0%') + ')',
      }"
    >
      高中地理：太阳视运动可视化 ——献给我的母校山东省实验中学 (版本v3.2.0)<br />
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
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高二的一节地理课上，太阳的视运动让我们与想象力玩起了捉迷藏。那时隔帘初探计算机世界的我，在下课后有了一个令自己无比激动的想法：要是能写出一个可以实地展现太阳运动轨迹的程序，帮助大家更好地理解和记忆太阳的视运动，那该多好！当然，这主要由幻想构成的激动，在半节课后，就随着游走的笔头消逝在试卷之间了。
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;韶华的身影跳跃着。大二的一个傍晚，我完成了Three.js主要内容的自学；这时，我的天使告诉我：你可以回过头去，拾起三年前的小小心愿了。
      <br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——这便是我开始这个小小工程的一切动机。作为一份小小的礼物，我将它献给我的母校——山东省实验中学，献给我的恩师——孙玉娟老师；我永不会忘却，那些将地理之美呈现给我们、唤起我们对大千世界向往的课堂。<br />
      <div style="text-align: right">
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
import { autoPlayIntervalMs } from "./smv_modules/AppConstants";
import { initWebGLData, setUpWebGL } from "./smv_modules/AppSetup";
import {
  toDeg,
  toRad,
  calculateCompassWordTranslates,
} from "./smv_modules/GeoMath";
import * as SC from "./smv_modules/SceneControl";
import { getHeadingWord, convertToLocalTime } from "./smv_modules/UIHelpers";
import * as ANIMATIONS from "./smv_modules/Animations";

import "../node_modules/bootstrap/dist/css/bootstrap.css";

import CompassWord from "./components/CompassWord.vue";
import { isMobilePhoneBrowser } from "./smv_modules/Utilities";

export default {
  name: "App",
  data() {
    return {
      title: "太阳视运动可视化",

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

      isAboutShow: false,

      isMobilePhoneBrowser: isMobilePhoneBrowser(),

      isControlsWrapperFolded:false
    };
  },

  mounted() {
    initWebGLData(this);
    setUpWebGL(this);
    SC.updateSunPosition(
      this,
      this.latRad,
      this.timeMinutes,
      this.solarAltituteDeg
    );

    window.onclick = () => {
      if (this.isAboutShow) {
        ANIMATIONS.hideAbout(() => {
          this.isAboutShow = false;
        });
      }
    };
  },

  watch: {
    latDegFixed1(newVal) {
      this.latRad = toRad(newVal);
    },

    sunPositionParams(newVal, oldVal) {
      if (!this.isGroundControlsShow) {
        return;
      }

      SC.updateSunPosition(this, newVal[0], newVal[1], newVal[2]);

      if (newVal[0] != oldVal[0] || newVal[2] != oldVal[2]) {
        SC.updateSunTrackLine(this, newVal[0], newVal[2]);
      }
    },
  },

  computed: {
    localTime() {
      return convertToLocalTime(this.timeMinutes);
    },
    sunPositionParams() {
      return [this.latRad, this.timeMinutes, this.solarAltituteDeg];
    },
    compassRotationRad() {
      return -this.currentHeadingRad;
    },
    // N E S W
    compassWordTranslates() {
      return calculateCompassWordTranslates(this.currentHeadingRad);
    },
    currentHeadingRoundedDeg() {
      return Math.round(toDeg(this.currentHeadingRad));
    },
    currentHeadingWord() {
      return getHeadingWord(this.currentHeadingRoundedDeg);
    },
  },

  methods: {
    adjLatDegFixed1(mode) {
      if (mode == 0) {
        this.latDegFixed1 = parseFloat(
          (this.latDegFixed1 - 0.1 < -90
            ? -90
            : this.latDegFixed1 - 0.1
          ).toFixed(1)
        );
      } else {
        this.latDegFixed1 = parseFloat(
          (this.latDegFixed1 + 0.1 > 90 ? 90 : this.latDegFixed1 + 0.1).toFixed(
            1
          )
        );
      }
    },
    adjSolarAltituteDeg(mode) {
      if (mode == 0) {
        this.solarAltituteDeg = parseFloat(
          (this.solarAltituteDeg - 0.1 < -23.5
            ? -23.5
            : this.solarAltituteDeg - 0.1
          ).toFixed(1)
        );
      } else {
        this.solarAltituteDeg = parseFloat(
          (this.solarAltituteDeg + 0.1 > 23.5
            ? 23.5
            : this.solarAltituteDeg + 0.1
          ).toFixed(1)
        );
      }
    },
    adjLocalTime(mode) {
      if (mode == 0) {
        this.timeMinutes =
          this.timeMinutes - 1 < 0 ? 1439 : this.timeMinutes - 1;
      } else {
        this.timeMinutes =
          this.timeMinutes + 1 > 1439 ? 0 : this.timeMinutes + 1;
      }
    },

    changeToGroundView() {
      SC.changeToGroundView(this);
    },
    exitGroundView() {
      SC.exitGroundView(this);
    },
    switchGroundView() {
      SC.switchGroundView(this);
    },

    switchAutoPlay() {
      if (!this.isGroundControlsShow) {
        return;
      }

      if (this.windowIntervalHandlerNumber == -1) {
        this.windowIntervalHandlerNumber = window.setInterval(() => {
          if (this.timeMinutes + 1 > 23 * 60 + 59) {
            this.timeMinutes = 0;
          } else {
            this.timeMinutes++;
          }
        }, autoPlayIntervalMs);
      } else {
        window.clearInterval(this.windowIntervalHandlerNumber);
        this.windowIntervalHandlerNumber = -1;
      }
    },
    showAbout() {
      if (this.isAboutShow) {
        return;
      }

      this.isAboutShow = true;

      ANIMATIONS.showAbout();
    },
    foldControlsWrapper(){
      this.isControlsWrapperFolded=true;
    },
    unfoldControlsWrapper(){
      this.isControlsWrapperFolded=false;
    }
  },
  components: {
    CompassWord,
  },
};
</script>

<style>
body {
  margin: 0;
  user-select: none;
  overflow: hidden;
}

.div-controls-wrapper {
  position: absolute;
  left: 0;
  top: 0;

  height: 100vh;
  width: 250px;

  overflow-y: auto;

  background-color: rgba(0, 0, 0, 0.3);

  transition-duration: 300ms;
}

.div-controls-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.div-controls-wrapper::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgb(145, 145, 145);
}

.div-controls-wrapper::-webkit-scrollbar-thumb:hover {
    background-color: rgb(160, 160, 160);
}

.div-controls-wrapper::-webkit-scrollbar-thumb:active {
    background-color: rgb(175, 175, 175);
}

.div-controls-wrapper::-webkit-scrollbar-track {
    background-color: rgba(220, 220, 220,0.2);
    border-radius: 3px;
}

.div-controls-wrapper-folded{
  transform: translateX(-100%);
}

.div-adjust {
  width: 49%;
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  text-align: center;
  transition-duration: 200ms;
}

.div-adjust:hover {
  background-color: rgba(255, 255, 255, 0.4);
}

.div-adjust:active {
  background-color: rgba(255, 255, 255, 0.5);
}

.lbl-common-text {
  color: white;
  font-size: small;
}

.lbl-guide {
  margin: 15px 10px 10px;
}

.div-common-control-block {
  margin: 10px 20px 10px;
  height: fit-content;
}

.in-lat-deg {
  height: 100%;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 3px;
  margin-right: 20px;
}

.lbl-data-display {
  font-size: 20px;
  color: white;
}

.tr-ground-view-enter-active,
.tr-ground-view-leave-active {
  transition: opacity 500ms ease;
}

.tr-ground-view-enter-from,
.tr-ground-view-leave-to {
  opacity: 0;
}

.div-compass-wrapper {
  position: absolute;
  bottom: 30px;
  right: 30px;

  filter: drop-shadow(5px 5px 5px black);
  opacity: 0;
}

.img-comp {
  width: 200px;
  height: 200px;
}

.lbl-center-info {
  position: absolute;
  left: 50%;
  top: 50%;

  color: white;
}

.lbl-center-info-u {
  font-size: 18px;
  transform: translate(-50%, -23px);
}

.lbl-center-info-l {
  font-size: 15px;
  transform: translate(-50%, 5px);
}

.div-bottom-controls{
  margin: auto 10px 10px;
}

.svg-about {
  width: 27px;
  height: 27px;

  cursor: pointer;
}

.svg-fold-controls-wrapper {
  width: 27px;
  height: 27px;

  cursor: pointer;
}

@keyframes svg-unfold-in{
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.svg-unfold-controls-wrapper {
  position: fixed;
  bottom: 10px;
  left: 10px;

  width: 32px;
  height: 32px;

  cursor: pointer;

  animation-duration: 300ms;
  animation-name: svg-unfold-in;
}

.svg-hover-color {
  fill: #ccc;
  transition: 200ms;
  transition-timing-function: ease-in-out;
}

.svg-hover-color:hover {
  fill: #fff;
}

.div-about-wrapper {
  position: fixed;

  top: 50%;
  left: 50%;

  font-size: small;
  color: white;

  background-color: rgba(0, 0, 0, 0.75);

  opacity: 0;

  padding: 20px;
}
</style>
