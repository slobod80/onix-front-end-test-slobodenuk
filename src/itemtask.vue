<template>
    <div>
        {{nameOfTask}}
    </div>
</template>
<script>


import { Component, Prop, Vue } from "vue-property-decorator";
export default class itemTask extends Vue
{
	name="itemTask",
	props: {
		nameOfTask:string,
	},
	data: {
		return {}
	}    
}
</script>