<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0" :class="{ 'saydamlik': waitRes }">
      <!-- Left Text-->
      <b-col lg="8" style="display:flex; justify-content: center; align-items: center;"
             class="d-none d-lg-flex align-items-center">
        <div class="d-lg-flex align-items-center justify-content-center px-5">
          <b-img style="width: 800px;" fluid :src="imgUrl" alt="Login V2"/>
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            SUBÜ Kaynak Yönetim Sistemi
          </b-card-title>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <b-form-group label="Kullanıcı Adı" label-for="login-email">
                <validation-provider #default="{ errors }" name="Kullanıcı Adı" rules="required">
                  <b-form-input id="login-email" @blur="kullaniciBirimGetir" v-model="userEmail" :state="errors.length > 0 ? false : null"
                                name="login-email" placeholder="Kullanıcı Adınız"/>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group v-if="birimList.length > 1" label="Birim" label-for="login-email">
                <validation-provider #default="{ errors }" name="Rol" rules="required">
                  <v-select label="birim" v-model="birimSelected" placeholder="Birim seçiniz..."
                            :state="errors.length > 0 ? false : null" :options="birimList" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Şifre</label>
                </div>
                <validation-provider #default="{ errors }" name="Şifre" rules="required">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                    <b-form-input id="login-password" v-model="password" :state="errors.length > 0 ? false : null"
                                  class="form-control-merge" :type="passwordFieldType" name="login-password"
                                  placeholder="············"/>
                    <b-input-group-append is-text>
                      <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                                    @click="togglePasswordVisibility"/>
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button type="submit" variant="primary" block @click="validationForm">
                Giriş Yap
              </b-button>
            </b-form>
          </validation-observer>

        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
    <div class="container" v-if="waitRes">
      <div class="centered-item">
        <div class="text-center mb-2">
          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {
  BRow, BCol, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardTitle, BImg, BForm, BButton, BSpinner
} from 'bootstrap-vue'
import {required, email} from '@validations'
import {togglePasswordVisibility} from '@core/mixins/ui/forms'
import store from '@/store/index'
import axios from 'axios'
import AES_CBC from '@/libs/aes-cbc.js'
import vSelect from "vue-select";

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BImg,
    BForm,
    BSpinner,
    vSelect,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      waitRes: false,
      sideImg: require('@/assets/images/pages/logosubu.svg'),
      required,
      email,
      birimList: [],
      birimSelected: null,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/logosubu.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate()
          .then(success => {
            if (success) {
              this.waitRes = true
              setTimeout(() => {
                this.sendDataToApi()
              }, 1000)
            }
          })
    },
    async sendDataToApi() {
      await axios.post('/Auth/Login', {
        username: this.userEmail,
        birimId: this.birimSelected.birimId,
        password: this.password,
      })
          .then(response => {
            this.$toastApiResponse(response.data)
            this.waitRes = false

            if (response.data.success) {
              let token = AES_CBC.encrypt(response.data.data)
              localStorage.setItem('userToken', token)
              axios.defaults.headers.common.Authorization = `Bearer ${response.data.data}`
              this.$store.dispatch('subu/changeToken', response.data.data)
              this.$router.push('/')
            }
          })
          .catch(error => {
            this.waitRes = false
            let jwtError = localStorage.getItem('JwtError')
            if (jwtError) {
              jwtError = JSON.parse(jwtError)
              this.$toastSubu(jwtError.message, 'danger')
            } else {
              this.$toastSubu('Bilgilerinizi kontrol edin.', 'danger')
            }
          })
    },
    kullaniciBirimGetir() {
      if(this.userEmail.length > 1) {
        axios.post('/Auth/LoginBirim', {
          username: this.userEmail
        }).then(response => {
          if(response.data.data){
            this.birimList = response.data.data
            if(this.birimList.length === 1) {
              this.birimSelected = this.birimList[0]
            }
          }
        })
      }
    },
  },
  watch: {
    userEmail() {
      this.birimList = []
    },
    birimSelected(yeni, eski) {
      console.log(yeni,eski)
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@core/scss/vue/libs/vue-select';

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Sayfa yüksekliğine göre ayarlayın */
}

.centered-item {
  text-align: center;
}

.saydamlik {
  opacity: 0.5;
}
</style>
