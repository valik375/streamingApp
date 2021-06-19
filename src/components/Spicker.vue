<template>
  <div class="stream-spicker-item">
    <img :src="image && image.url ? image.url : anonimImage" :alt="name" />
    <h3 :style="color ? `color:${color}` : ''">{{ name }}</h3>
    <p class="position">{{ position }}</p>
    <p class="time">{{ time }}</p>
    <p class="title">{{ title }}</p>
    <a :href="link">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M54 0H6C2.7 0 0 2.7 0 6V54C0 57.3 2.7 60 6 60H54C57.3 60 60 57.3 60 54V6C60 2.7 57.3 0 54 0ZM18 51H9V24H18V51ZM13.5 18.9C10.5 18.9 8.1 16.5 8.1 13.5C8.1 10.5 10.5 8.1 13.5 8.1C16.5 8.1 18.9 10.5 18.9 13.5C18.9 16.5 16.5 18.9 13.5 18.9ZM51 51H42V35.1C42 32.7001 39.9 30.6 37.5 30.6C35.1 30.6 33 32.7001 33 35.1V51H24V24H33V27.6C34.5 25.2 37.8 23.4 40.5 23.4C46.2 23.4 51 28.2 51 33.9V51Z" :fill="color"/>
      </svg>
    </a>
  </div>
</template>

<script>
import anonymous from '../assets/anonymous.png'

export default {
  data: () => ({   
    anonimImage: anonymous,
  }),
  props: ['color', 'time', 'name', 'position', 'title', 'link', 'image'],
};
</script>

<style>
</style>