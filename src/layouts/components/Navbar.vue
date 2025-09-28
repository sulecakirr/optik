<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userName }}
            </p>
            <span class="user-status">{{ Array.isArray(role) ? role[0] : role }}</span>
          </div>
          <b-avatar size="40" :src="picture" variant="light-primary" badge class="badge-minimal" badge-variant="success">
            <feather-icon v-if="!userName" icon="UserIcon" size="22" />
          </b-avatar>
        </template>

        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Çıkış Yap</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import AES_CBC from '@/libs/aes-cbc'
import { mapGetters } from 'vuex'

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      role: 'subu/getRoles',
      userName: 'subu/getUserName',
      picture: 'subu/getPicture',
    })
  },
  created() {
  },
  methods: {
    logout() {
      this.$store.getters['subu/deleteLocalStorageToken']()
      this.$router.push('/login')
    },
  },
}
</script>
