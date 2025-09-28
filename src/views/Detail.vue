<template>
<div>
    <h3>Detaylar</h3>
    <p style ="display: none;"> Sınav ID: {{ examId }}</p>
  <b-card>
  <b-form @submit.prevent="submitForm">
    <b-row>
      <b-col cols="12">
        <b-form-group label="Sınav Tarihi" label-for="h-sinav-tarihi" label-cols-md="4">
          <b-form-input id="h-sinav-tarihi" v-model="sinavTarihi" placeholder="Sınav Tarihi" readonly disabled />
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Ders Adı" label-for="h-ders-adi" label-cols-md="4">
          <b-form-input id="h-ders-adi" v-model="dersAdi" placeholder="Ders Adı" readonly disabled />
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Ders Kodu" label-for="h-ders-kodu" label-cols-md="4">
          <b-form-input id="h-ders-kodu" v-model="dersKodu" placeholder="Ders Kodu" readonly disabled />
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Kağıt Tipi" label-for="h-kagit-tipi" label-cols-md="4">
          <b-form-input id="h-kagit-tipi" v-model="kagitTipi" placeholder="Kağıt Tipi" readonly disabled />
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Sınav Cevap Anahtarı" label-for="h-sinav-cevap-anahtari" label-cols-md="4">
          <!-- Eğer bir sınav seçilmişse cevap anahtarını görüntüle, aksi takdirde sakla -->
          <b-form-radio-group id="h-sinav-cevap-anahtari" v-model="sinavCevapAnahtari" v-if="selectedSinav" disabled>
            <b-form-radio v-for="cevapAnahtari in selectedSinav.cevapAnahtar" :key="cevapAnahtari" :value="cevapAnahtari">{{ cevapAnahtari }}</b-form-radio>
          </b-form-radio-group>
          <b-form-radio-group id="h-sinav-cevap-anahtari" v-model="sinavCevapAnahtari" v-else disabled>
            <b-form-radio value="A">A</b-form-radio>
            <b-form-radio value="B">B</b-form-radio>
            <b-form-radio value="C">C</b-form-radio>
            <b-form-radio value="D">D</b-form-radio>
            <b-form-radio value="E">E</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-form-group label="Soru Sayısı" label-for="h-soru-sayisi" label-cols-md="4">
          <b-form-input id="h-soru-sayisi" v-model="soruSayisi" placeholder="Soru Sayısı" :readonly="!selectedSinav" disabled />
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Sınav Sonuç Belgesi" label-for="h-sinav-sonuc-belgesi" label-cols-md="4">
          <b-form-textarea id="h-sinav-sonuc-belgesi" v-model="sinavSonucBelgesi" readonly disabled />
        </b-form-group>
      </b-col>
      <b-col md="8" offset-md="4">
      </b-col>
    </b-row>
  </b-form>
  </b-card>
</div>
</template>

<script>
import { BRow, BCol, BFormGroup, BFormInput, BForm, BFormTextarea, BFormRadioGroup, BFormRadio, BCard } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BFormRadioGroup,
    BFormRadio,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      sinavTarihi: '',
      dersAdi: '',
      dersKodu: '',
      kagitTipi: '',
      soruSayisi: '',
      sinavCevapAnahtari: '',
      sinavSonucBelgesi: '',
      selectedSinav: null,
    }
  },

  props: {
    examId: String,
  },

  methods: {
    submitForm() {
      const formData = {
        sinavTarihi: this.sinavTarihi,
        dersAdi: this.dersAdi,
        dersKodu: this.dersKodu,
        kagitTipi: this.kagitTipi,
        soruSayisi: this.soruSayisi,
        sinavCevapAnahtari: this.sinavCevapAnahtari,
        sinavSonucBelgesi: this.sinavSonucBelgesi,
      };

      console.log(formData);
    },
  },
}
</script>



