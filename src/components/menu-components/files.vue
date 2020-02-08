<template lang ="pug">
  div.main
    div.in_main
      ul
        li(v-for="(item,index) in photo") {{  photo[index]  }}
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Idialog} from "../../components/menu-components/types/dialog"
import activityname from "../../store/modules/activity"

@Component

export default class files extends Vue 
{
  photo:string[]=[];


mounted():void 
  {
    this.photo=activityname.photo;
  }

}
</script>

<style scoped>

.in_main {
  height:550px; 
}

</style>