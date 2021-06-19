<template>
  <div class="error-message">
    <h3>{{errorName}}</h3>
    <p>{{errorMessage}}</p>
  </div>
</template>

<script>
export default {
  props: ['errorName', 'errorMessage']
};
</script>
