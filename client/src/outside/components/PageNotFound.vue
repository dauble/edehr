<template lang='pug'>
  div
    h2 Page Not Found
    div URL: {{ location }}
    div This URL does not match any pages on this site
    what-to-do-instructions
</template>

<script>
import WhatToDoInstructions from '@/outside/components/WhatToDoInstructions'
export default {
  components: { WhatToDoInstructions },
  computed: {
    location () {
      return window.location
    }
  }
}
</script>

<style scoped>

</style>
