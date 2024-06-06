<template>
  <div class="navbar">
    <div class="left-menu">
      <div class="my-logo" >
        <logo />
      </div>
<!--          <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

    </div>
    <div class="right-menu">
<!--      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav"/>-->
<!--      <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav"/>-->
<!--      <template v-if="device!=='mobile'">-->
<!--        <search id="header-search" class="right-menu-item" />-->

<!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

<!--        <el-tooltip content="布局大小" effect="dark" placement="bottom">-->
<!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>-->

<!--      </template>-->
      <div class="top-menu">
        <div class="top-menu-item">
          <svg-icon icon-class="work" style="font-size: 24px"/>
          工作台
        </div>
        <div class="top-menu-item">
          <svg-icon icon-class="app" style="font-size: 24px"/>
          应用库
        </div>
        <div class="top-menu-item">
          <svg-icon icon-class="msg" style="font-size: 24px"/>
          <div class="msg-num" v-if="msgNum > 0">{{ msgNum }}</div>
          消息
        </div>
      </div>
      <div class="user-info">
        <div class="info-item">
          <svg-icon icon-class="identity" style="font-size: 24px"/>
          <div class="info-text" style="width: 118px">国网南京供电公司检修一班</div>
        </div>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
<!--          <div class="avatar-wrapper">-->
<!--            <img :src="avatar" class="user-avatar">-->
<!--            <i class="el-icon-caret-bottom" />-->
<!--          </div>-->
          <div class="info-item">
            <svg-icon icon-class="user-icon" style="font-size: 24px"/>
            <div class="info-text" >{{ user.userName }}</div>
            <svg-icon icon-class="dropdown" style="font-size: 16px;padding-top: 5px;padding-left: 5px"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="setting = true">
              <span>布局设置</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="info-item" @click="logout">
          <svg-icon icon-class="logout" style="font-size: 24px;cursor: pointer;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import Logo from "@/layout/components/Sidebar/Logo";
import { getUserProfile } from '@/api/system/user'

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
    Logo
  },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      msgNum: 12
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup;
      });
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #526ADE;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  justify-content: space-between;
  .my-logo {
    margin: 0 20px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    //float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    //float: left;
    margin-left: 20px;
  }

  .topmenu-container {
    //position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu {
    display: flex;
    align-items: center;
  }
  .right-menu {
    display: flex;
    align-items: center;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .user-info {
      width: 400px;
      height: 40px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      color: #606266;
      background-image: url("../../assets/images/user-info-bg.png");
      background-size: 100%;
      margin-right: 10px;
      border-radius: 0 5px 5px 0;
      padding-left: 90px;
      justify-content: space-between;
      padding-right: 10px;
      .info-item {
        display: flex;
        align-items: center;
        font-size: 13px;
        .info-text {
          padding-left: 10px;
          padding-top: 5px;
          height: 40px;
          white-space: normal;
          display: flex;
          align-items: center;
        }
      }
    }
    .top-menu {
      display: flex;
      align-items: center;
      .top-menu-item {
        height: 50px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 16px;
        padding: 0 10px;
        cursor: pointer;
        position: relative;
        svg {
          margin-right: 8px;
        }
        &:hover {
          background: #768ae7;
        }
        .msg-num {
          position: absolute;
          top: 4px;
          left: 23px;
          width: 20px;
          height: 20px;
          border-radius: 50px;
          font-size: 12px;
          background: #FA3131;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
