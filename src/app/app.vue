<template>
  <div id="app" class="app">
    <div class="page-wrapper">
      <router-view class="container"/>
    </div>
    <!--for modals-->
    <portal-target name="modal-container" class="modal-container" multiple />
  </div>
</template>

<script src="./app.js"/>
<style src="./app.scss" lang="scss" />