<template>
  <div>
    <b-card>
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Birim" label-for="h-birim" label-cols-md="4">
              <b-form-select
                  v-model="selectedBirim"
                  :options="birimOptions"
                  id="h-birim"
                  placeholder="Lütfen birim seçiniz..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" v-if="selectedBirim">
            <b-form-group label="Bölüm" label-for="h-bolum" label-cols-md="4">
              <b-form-select
                  v-model="selectedBolum"
                  :options="bolumOptions"
                  id="h-bolum"
                  placeholder="Lütfen bölüm seçiniz..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" v-if="selectedBolum">
            <b-form-group label="Hoca" label-for="h-hoca" label-cols-md="4">
              <b-form-select
                  v-model="selectedHoca"
                  :options="hocaOptions"
                  id="h-hoca"
                  placeholder="Lütfen hoca seçiniz..."
              />
            </b-form-group>
          </b-col>
          <b-col md="8" offset-md="4">
            <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-1"
                @click.prevent="submitForm"
                :disabled="!selectedBirim || !selectedBolum || !selectedHoca"
            >
              Ara
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card v-if="showTable">
      <b-table responsive="sm" :items="filteredItems">
        <template v-slot:cell(detay)="row">
          <router-link :to="'/detail/' + row.item.id">
            <b-button @click="passDataToDetail(row.item)">Detay</b-button>
          </router-link>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormSelect, BButton, BCard, BForm
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BButton,
    BCard,
    BForm,
  },
  directives: {
    Ripple,
  },

  computed: {
    filteredBolumOptions() {
      if (!this.selectedBirim) {
        return [];
      }
      return this.bolumOptions.filter(option => option.birim === this.selectedBirim);
    },
    getFilteredBolumOptions() {
      if (!this.selectedBirim) {
        return [];
      }
      return this.bolumOptions.filter(option => option.birim === this.selectedBirim);
    },
    getFilteredHocaOptions() {
      if (!this.selectedBolum) {
        return [];
      }
      return this.hocaOptions.filter(option => {
        // Seçilen bölüme göre hoca seçeneklerini filtrele
        return option.bolum === this.selectedBolum;
      });
    },
    get() {
      return this.items.filter(item => item.someCondition);
    },
    set(value) {
    },

    filteredItems() {
      let filteredData = this.items;

      if (this.selectedBirim) {
        filteredData = filteredData.filter(item => item.Birim_adi === this.selectedBirim);
      }

      if (this.selectedBolum) {
        filteredData = filteredData.filter(item => item.bolum_adi === this.selectedBolum);
      }

      if (this.selectedHoca) {
        filteredData = filteredData.filter(item => item.hoca_adi === this.selectedHoca);
      }

      return filteredData;
    }
  },

  data() {
    return {
      selectedItemData: null,
      selectedBirim: null,
      selectedBolum: null,
      selectedHoca: null,
      birimOptions: [
        { value: 'Birim 1', text: 'Birim 1' },
        { value: 'Birim 2', text: 'Birim 2' },
        { value: 'Birim 3', text: 'Birim 3' },
        { value: 'Birim 4', text: 'Birim 4' },
        { value: 'Birim 5', text: 'Birim 5' },
      ],
      bolumOptions: [
        { value: 'Bölüm 1', text: 'Bölüm 1' },
        { value: 'Bölüm 2', text: 'Bölüm 2' },
        { value: 'Bölüm 3', text: 'Bölüm 3' },
        { value: 'Bölüm 4', text: 'Bölüm 4' },
        { value: 'Bölüm 5', text: 'Bölüm 5' },
      ],
      hocaOptions: [
        { value: 'Hoca 1', text: 'Hoca 1' },
        { value: 'Hoca 2', text: 'Hoca 2' },
      ],

      items: [
        {
          Birim_adi: 'Birim 1', bolum_adi: 'Bölüm 1', hoca_adi: 'Hoca 1', ders_adi: 'aaaa',ders_donemi: 'aaaa', detay: '.'
        },
        {
          Birim_adi: 'Birim 2', bolum_adi: 'Bölüm 2', hoca_adi: 'Hoca 2', ders_adi: 'bbb',ders_donemi: 'aaaa', detay: '.'
        },
        {
          Birim_adi: 'Birim 3', bolum_adi: 'Bölüm 3', hoca_adi: 'Hoca 3', ders_adi: 'ccc',ders_donemi: 'aaaa', detay: '.'
        },
        {
          Birim_adi: 'Birim 4', bolum_adi: 'Bölüm 4', hoca_adi: 'Hoca 4', ders_adi: 'ddd',ders_donemi: 'aaaa', detay: '.'
        },
        {
          Birim_adi: 'Birim 5', bolum_adi: 'Bölüm 5', hoca_adi: 'Hoca 5', ders_adi: 'eee',ders_donemi: 'aaaa', detay: '.'
        },
      ],
      showTable: false,
      showAlert: false,
    }
  },

  methods: {
    submitForm() {
      if (!this.selectedBirim || !this.selectedBolum || !this.selectedHoca) {
        this.showAlert = true;
        this.showTable = false;
        this.selectedItemData = null;
      } else {
        this.showAlert = false;
        this.showTable = true;
        this.selectedItemData = null;
      }
    },

    passDataToDetail(item) {
      this.selectedItemData = item;
    },
  },
}
</script>