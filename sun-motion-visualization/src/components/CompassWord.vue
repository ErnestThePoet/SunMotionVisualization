<template>
   <label class="lbl-compass-word" :style="{color:textcolor,transform:'translate('+translatedata.x+'px,'+translatedata.y+'px)'}">{{word}}</label>
</template>

<script>
export default {
  props: {
      word: {
          type: String,
          required: true
      },
      translatedata: {
          type: Object,
          required: true
      },
      textcolor: {
          type: String,
          required: true
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lbl-compass-word{
    position: absolute;
    left: 0;
    top: 0;

    font-size: 25px;
    font-weight: bold;
}
</style>
