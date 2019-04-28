<template>
<div>
  <p v-if="message">{{ message }}</p>
  <input type="file" :id="'upload' + index" value="Uploade ein Bild" @change="upload">
  <label :for="'upload' + index">
    Upload a file
  </label>
  
  <div class="profil-image">
    <img :src="croppedImage || pic">
    <!-- <button v-if="imageUploaded" @click="showCropper = !showCropper">Bild bearbeiten</button> -->
  </div>

  <div v-show="showCropper" class="image-cropper-wrapper">
    <div class="image-cropper">
      <vue-croppie
        ref="croppieRef"
        :enableExif="true"
        :mouseWheelZoom="false"
        :enableResize="false"
        :viewport="{ width: 200, height: 200, type: 'circle' }"
        @update="update"></vue-croppie>
      
    </div>
    <appButton class="crop" @buttonClick="crop()">Save</appButton>
  </div>

</div>
</template>
<script>
  import Vue from 'vue';
  import vueCroppie from 'vue-croppie';
  import appButton from '@/components/Button';

  Vue.use(vueCroppie);

  export default {
    data() {
      return  {
        imageUploaded: false,
        showCropper: null,
        croppedImage: null,
        pos: null,
        message: null
      }
    },
    props: ['index', 'pic'],
    components: {
      appButton
    },
    methods: {
      upload(event) {
        if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          alert('Keine Bilddatei');
          event.target.value = null;
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        this.message = 'Bild wird upgeloaded';

        reader.onload = () => {
          this.$refs.croppieRef.bind({
            url: reader.result,
          });
          event.target.value = null;
          this.imageUploaded = true;
          this.showCropper = true;
          this.message = null;
        };

      },
      crop() {
        const _this = this;
        const options = {
          type: 'base64',
          format: 'png', 
          circle: true
        }
        this.$refs.croppieRef.result(options, (output) => {
          this.croppedImage = output;
          this.showCropper = false;
          this.$emit('changedImage', {
            pos: _this.pos,
            base64: output, 
            index: _this.index,
            fileExt: options.format
          });
        });

      },
  
      update(val) {
        this.pos = val;
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  @import '@/styles/classes.scss';
  .image-cropper {
    height: 300px;
    margin-bottom: 80px;
  }
  .crop {
    margin-bottom: 50px;
  }

  .profil-image,
  label {
    margin-bottom: 20px;
  }

  input[type=file] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    & + label {
      &:before,
      &:after {
        display: none;
      }
      
      @extend %button;
      padding: 10px 20px;
      display: inline-block;
      width: auto;
      
    } 
  }
</style>


