<template>
  <div div="base">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'Base',
  components: {
    Navbar
  }
}
</script>
