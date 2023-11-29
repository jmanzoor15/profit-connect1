<template>
  <div
    class="user-dropdown-box openUserDropdown"
    @mouseenter="openUserDropdown = true"
    @mouseleave="openUserDropdown = false"
  >
    <div class="user-open-menu">
      <img
        class="avatar-img"
        src="/images/svg/header/avatar-demo.png"
        alt="Avatar"
      />
    </div>

    <div
      class="user-dropdown userDropdown"
      :class="openUserDropdown ? 'is-active' : ''"
    >
      <div class="name">Ethan Matthews</div>
      <div class="role">Admin</div>

      <ul>
        <li>
          <a href="/">
            <img src="/images/svg/header/schedule.svg" alt="Schedule" />
            Schedule
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/svg/header/profile.svg" alt="Profile" />
            Profile
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/svg/header/social.svg" alt="Social" />
            Social
          </a>
        </li>
        <li>
          <a href="/">
            <img src="/images/svg/header/privacy.svg" alt="Privacy" />
            Privacy
          </a>
        </li>
        <li>
          <a id="logoutBtn" @click="initLogout">
            <img src="/images/svg/header/logout.svg" alt="Logout" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const openUserDropdown = ref(false);
const { initLogout } = useAuthStore();
</script>

<style lang="scss" scoped>
.user-dropdown-box {
  display: flex;
  align-items: center;
  position: relative;

  .user-open-menu {
    width: 50px;
    cursor: pointer;
    border-radius: 50%;
    // border: 1px solid #ffffff;
    overflow: hidden;

    .avatar-img {
      position: relative;
      z-index: 60;
    }
  }

  .user-dropdown {
    position: absolute;
    top: -4px;
    background: #ffffff;
    right: -3px;
    border-radius: 6px 20px 6px 6px;
    width: 200px;
    box-shadow: 0 0 13px #00000026;
    opacity: 0;
    transition: $transitionSpeed;
    z-index: -1;
    transform: scale(0.8);
    width: 50px;
    height: 50px;
    overflow: hidden;

    &.is-active {
      opacity: 1;
      z-index: 50;
      transform: scale(1);
      width: 250px;
      height: unset;
    }

    .name {
      font-weight: bold;
      max-width: 110px;
      line-height: 1.4;
      margin-left: 20px;
      margin-top: 10px;
    }

    .role {
      width: fit-content;
      font-size: 12px;
      background: #e9e9e9;
      padding: 2px 5px;
      margin-top: 7px;
      margin-left: 20px;
    }

    ul {
      list-style: none;
      margin: 20px 0 0;
      padding: 0;

      li {
        &:last-child {
          margin: 10px 0 5px;
        }
      }

      a {
        display: block;
        padding: 10px 20px;
        background: transparent;
        text-decoration: none;
        color: #000000;
        transition: $transitionSpeed;

        &:hover {
          background: #0000000d;
        }

        img {
          margin-right: 7px;
        }
      }
    }
  }
}
</style>
