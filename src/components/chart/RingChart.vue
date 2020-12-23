<template>
  <ve-ring :data="chartData"  :settings="chartSettings"  :extend ="extend" :height="setHeight"></ve-ring>
</template>

<script>
export default {
    props:['chartData','chartSettings','extend'],
    data () {
        return {
            flag:true,
            setHeight:'200px'
        }   
    }
}
</script>
<style scoped>
</style>