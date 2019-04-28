<template>
  <div class="center store-bg padding">
    <h2>Book your appointment</h2>
    <div class="member">
      <img src="../../assets/member.jpg" />
    </div>
    <appButton @buttonClick="switchToView('forth','/services')" class="outline">Book now</appButton>
    <appButton @buttonClick="switchToView('forth', '/about')" class="outline">About us</appButton>

  </div>
</template>
<script>
  import switchToView from '@/mixins/switchToView';
  import appButton from '@/components/Button';
  export default {
    components: {
      appButton
    },
    mixins: [switchToView]
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/classes.scss';

  .member {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border: 5px solid #fff;
    margin-bottom: 50px;
    img {
      display: block;
      max-width: none;
      height: 100%;
      max-height: none;
      transform: translateX(-20%);
    }
  }
 
  h2 {
    margin-bottom: 50px;
  }

  button {
    width: 70%;
  }

  button + button{
    margin-top: 20px;
  }

  .store-bg {
    @extend %store-bg;
    &:after {
      background-image: url('../../#{$storeImage}');
    }
  }
</style>