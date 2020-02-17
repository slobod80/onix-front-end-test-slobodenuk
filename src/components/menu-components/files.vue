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
import axios from "axios"

@Component

export default class files extends Vue 
{
  photo:string[]=[];

  info:any="";
mounted():void 
  {
    this.photo=activityname.photo;
  }

upload(data:object):void {
	this.info=data;
}

}
</script>

<style scoped>

.in_main {
  height:550px; 
}

</style>