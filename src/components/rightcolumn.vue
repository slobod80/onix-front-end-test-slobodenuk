<template lang ="pug">
.wrapper
  div.right-size
    div.flex-sect
      p.first Website Redesign
      div.icons
        img.photo2(src="../assets/user1.png" alt="User1")
        img.photo2(src="../assets/user2.png" alt="User2")
        img.photo2(src="../assets/user2.png" alt="User3")
        a.kind1(href="#") Share
        a.kind2(href="#") Chat
    nav.menu-2
      a.menu2(href="#") Tasks
      a.menu2(href="#") Kanban
      a.menu2(href="#") Activity
      a.menu2(href="#") Calendar
      a.menu2(href="#") Files

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class rightColumn extends Vue {
  



}
</script>

<style scoped>


.first {
  font-size: 32px;
  color: #131313;
  position: relative;
  margin-left: 85px;
  margin-top: 40px;
  text-align: left;
}


.first::before {
  content: "";
  background-color: #FFC300;
  background-image: url("../assets/Shapes@2x.png");
  width: 40px;
  height: 40px;
  background-size: cover;
  left: -50px;
  position: absolute;
}


.first::after {
  content: "";
  background-image: url("../assets/icon.png");
  width: 30px;
  height: 30px;
  background-size: cover;
  left: 270px;
  position: absolute;
  top:6px;
  opacity: 0.5;
  top: 0px;
}


.flex-sect {
  align-items: center;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}


.kind1 {
  vertical-align: middle;
  width: 67px;
  height: 30px;
  padding: 4px 10px;
    background: #EAEAEA;
    border-radius: 15px;
    color: #131313;
    text-decoration: none;
    margin-right: 15px;
    margin-left: 10px;
}


.kind2 {
  vertical-align: middle;
  width: 81px;
  height: 30px;
  padding: 4px 10px;
  background: #FFF8DD;
  border-radius: 15px;  
  color:#FFC200;
}


.icons {
  display: flex;
  text-align: center;
  align-items: center;
  align-self: flex-end;
}


.kind2::before {
  content: url("../assets/Combined Shape@1x.svg");
  margin-right: 10px;
}


.photo2 {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}


.menu-2 {
  display: flex;
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 11px;
}


.menu2 {
  opacity: 0.7;
  font-size: 16px;
  color: #131313;
  margin-right: 30px;
  text-decoration: none;
  margin-bottom: 10px;
}


.menu2:hover {
    padding-bottom: 8px;
    border-bottom: 2px solid #FFC200;
    margin-bottom: -8px;
}

.poin {
  cursor: pointer;
}


/*********************************/
@media (max-width: 1024px)
{

li a {
  font-size: 14px;
  color: #FFFFFF;
  line-height: 22px;
}


.first {
  font-size: 32px;
  color: #131313;
  position: relative;
  margin-left: 70px;
  text-align: left;
}


.first::before {
  content: "";
  background-image: url("../assets/Shapes@2x.png");
  width: 40px;
  height: 40px;
  background-size: cover;
  left: -50px;
  position: absolute;
}


.first::after {
  content: "";
  background-image: url("../assets/icon.png");
  width: 25px;
  height: 25px;
  background-size: cover;
  left: 270px;
  position: absolute;
  top:6px;
  opacity: 0.5;
}


.flex-sect {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  width: 100%;
}


.users {
  margin-top: 10px;
  margin-right: 80px;
  height: 40px;
  width: 40px;
  background: url("../assets/user1.png");
  background-size: 100%;
}


.users::before { 
  content: "";
  background-image: url("../assets/user2.png");
  width: 40px;
  height: 40px;
  background-size: cover;
  position: absolute;
  margin-left: 70px;
}


.users::after {
  content: "";
  background-image: url("../assets/user3.png");
  width: 40px;
  height: 40px;
  background-size: cover;
  position: absolute;
  margin-left: 30px;
}




}

@media (max-width: 900px) {
.first::after {
  left: 170px;
  top:30px;
  position: absolute;
  opacity: 0.5;
}
}
</style>