<template>
  <div >
    <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
      <sidebar v-if="!sidebar.hide" class="sidebar-container"/>
      <div class="flexible-btn" :style="classObj.hideSidebar ? 'left: 55px' : ''" @click="toggleSideBar">
        <svg-icon icon-class="right" style="font-size: 16px;" v-if="classObj.hideSidebar"/>
        <svg-icon icon-class="left" style="font-size: 16px;" v-else/>
      </div>
    </div>
    <div class="main-container">
      <div class="fixed-header">
        <navbar/>
      </div>
      <div class="fixed-main" :style="classObj.hideSidebar ? 'width: calc(100% - 78px);' : ''">
        <app-main/>
      </div>
      <right-panel>
        <settings/>
      </right-panel>
    </div>
    <div class="fixed-bottom">
      <tags-view/>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      sideTheme: state => state.settings.sideTheme,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    variables() {
      return variables;
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/mixin.scss";
  @import "~@/assets/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }

  .fixed-bottom {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }

  .fixed-main {
    position: fixed;
    top: 68px;
    height: calc(100vh - 119px);
    right: 10px;
    z-index: 9;
    width: calc(100% - 225px);
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .sidebarHide .fixed-header {
    width: 100%;
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .flexible-btn {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 200px;
    height: 100px;
    width: 15px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    z-index: 10;
    transition: 0.28s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
