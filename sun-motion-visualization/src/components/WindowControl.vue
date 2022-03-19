<template>
  <img class="img-window-controls" :style="{width:size,height:size}" :src="imgsrc"/>
</template>

<script>
export default {
    props: {
        imgsrc: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: false,
            default: "35px"
        }
    }
}
</script>

<style>
.img-window-controls{
    padding: 5px;
    transition-duration: 100ms;

    -webkit-app-region: no-drag;
}
</style>