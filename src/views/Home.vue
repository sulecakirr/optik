<template>
  <div>
    <b-card>
      <h1>Jwt Token</h1><br/>
      <p>{{ jwt }}</p><br/>
      <h1>User Data</h1><br/>
      <p>{{ userData }}</p><br/>
      <h1>UserName</h1><br/>
      <p>{{ userName }}</p><br/>
      <h1>Roles</h1><br/>
      <p>{{ roles }}</p><br/>
      <h1>Picture</h1><br/>
      <p>{{ picture }}</p><br/>
      <h1>Admin mi?</h1><br/>
      <p>{{ canHaveRole(['Admin']) }}</p><br/>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTable,
  BRow,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BBadge,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BBadge,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      jwt: 'subu/getToken',
      userData: 'subu/getUserData',
      userName: 'subu/getUserName',
      roles: 'subu/getRoles',
      picture: 'subu/getPicture',
      canHaveRole: 'subu/getCanHaveRole'
    }),
  },
  mounted() {

  },
  created() {

  },
  methods: {},
}
</script>

<style>

</style>
