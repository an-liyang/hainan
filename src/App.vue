/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
<template>
  <div id="app" class="web-font">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    data() {
        return {
        }
    },
    created(){
        this.$store.commit('getHeight', document.body.clientHeight)
        // console.log(this.$store.state.heightClient)
    },
    mounted(){
        const that = this
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.body.clientHeight
                that.$store.commit('getHeight', document.body.clientHeight)
            })()
        }
    
    },
    methods: {}
}
</script>

<style >
html,body,#app{
    height: 100%;
  }
#app {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2e384d; */
}

</style>
