<template>
  <div :style="{zIndex:zIndex,height:height,width:width}" class="pan-item" :class="{'pan-item-style2': style2}">
    <div v-if="style1" class="pan-info">
      <div class="pan-info-roles-container">
        <slot />
      </div>
    </div>
    <div v-if="style2 && !image" class="pan-info2">
      <div class="pan-info-roles-container container">
        <div class="el-upload el-upload--picture-card card">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <!-- eslint-disable-next-line -->
    <div v-if="image || style1" :style="{backgroundImage: `url(${image})`}" class="pan-thumb" :class="{'pan-thumb-style2': style2}"></div>
  </div>
</template>

<script>
export default {
  name: 'PanThumb',
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    },
    style2: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style1() {
      return !this.style2
    }
  }
}
</script>

<style lang="scss" scoped>
  .pan-item {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    cursor: default;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
    display: block;
  }
  .pan-info-roles-container {
    padding: 20px;
    text-align: center;
  }
  .pan-thumb {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
  /* .pan-thumb:after {
    content: '';
    width: 8px;
    height: 8px;
    position: absolute;
    border-radius: 50%;
    top: 40%;
    left: 95%;
    margin: -4px 0 0 -4px;
    background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
  } */
  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
  }
  .pan-info h3 {
    color: #fff;
    text-transform: uppercase;
    position: relative;
    letter-spacing: 2px;
    font-size: 18px;
    margin: 0 60px;
    padding: 22px 0 0 0;
    height: 85px;
    font-family: 'Open Sans', Arial, sans-serif;
    text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  .pan-info p {
    color: #fff;
    padding: 10px 5px;
    font-style: italic;
    margin: 0 30px;
    font-size: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
  .pan-info p a {
    display: block;
    color: #333;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    color: #fff;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 9px;
    letter-spacing: 1px;
    padding-top: 24px;
    margin: 7px auto 0;
    font-family: 'Open Sans', Arial, sans-serif;
    opacity: 0;
    transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
    transform: translateX(60px) rotate(90deg);
  }
  .pan-item-style2 {
    border-radius: initial;
    box-shadow: initial;
  }
  .pan-thumb-style2 {
    border-radius: 2px;
    border: 1px dashed #c0ccda;
  }
  .pan-info2 {
    width: 100%;
    height: 100%;
    .container {
      padding: 0;
      width: 100%;
      height: 100%;
      .card {
        width: 100%;
        height: 100%;
        line-height: initial;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
