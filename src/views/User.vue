<template>
  <div>
    <b-card>
      <b-button size="sm" @click="showAddPersonModal" class="mb-2">Yeni Kişi Ekle</b-button>
      <b-table ref="myTable" responsive="sm" :items="items" :fields="fields" :key="1">
        <template #cell(actions)="row">
          <b-button size="sm" @click="editPerson(row.item)" class="mr-2">Düzenle</b-button>
          <b-button size="sm" @click="confirmDeletePerson(row.index)">Sil</b-button>
        </template>
      </b-table>
    </b-card>

    <b-modal v-model="showModal" title="Yeni Kişi Ekle" @ok="addPerson">
      <b-form>
        <b-form-group label="Ad" label-for="ad">
          <b-form-input v-model="newPerson.ad" id="ad" required></b-form-input>
        </b-form-group>
        <b-form-group label="Soyad" label-for="soyad">
          <b-form-input v-model="newPerson.soyad" id="soyad" required></b-form-input>
        </b-form-group>
        <b-form-group label="Birim" label-for="birim">
          <b-form-select v-model="newPerson.birim" id="birim" :options="birimOptions" required></b-form-select>
        </b-form-group>
        <b-form-group label="Bolum" label-for="bolum">
          <b-form-select v-model="newPerson.bolum" id="bolum" :options="bolumOptions" required></b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal v-model="showEditModal" :title="'Kişiyi Düzenle'" hide-footer>
      <b-form>
        <b-form-group label="Ad" label-for="edit_ad">
          <b-form-input v-model="editingPerson.ad" id="edit_ad" required></b-form-input>
        </b-form-group>
        <b-form-group label="Soyad" label-for="edit_soyad">
          <b-form-input v-model="editingPerson.soyad" id="edit_soyad" required></b-form-input>
        </b-form-group>
        <b-form-group label="Birim" label-for="edit_birim">
          <b-form-select v-model="editingPerson.birim" id="edit_birim" :options="birimOptions" required></b-form-select>
        </b-form-group>
        <b-form-group label="Bolum" label-for="edit_bolum">
          <b-form-select v-model="editingPerson.bolum" id="edit_bolum" :options="bolumOptions" required></b-form-select>
        </b-form-group>
        <div class="d-flex justify-content-end">
          <b-button @click="updatePersonAndCloseModal" variant="primary">Kaydet</b-button>
        </div>
      </b-form>
    </b-modal>

    <b-modal v-model="showDeleteModal" title="Kişiyi Sil" hide-footer>
      <p>Silmek istediğinizden emin misiniz?</p>
      <div class="d-flex justify-content-end">
        <b-button @click="deletePerson" variant="danger">Sil</b-button>
        <b-button @click="cancelDelete" variant="secondary">İptal</b-button>
      </div>
    </b-modal>

    <b-button @click="showAddPersonModal" class="add-person-button">Yeni Kişi Ekle</b-button>
  </div>
</template>

<script>
import { BCard, BTable, BButton, BForm, BFormGroup, BFormInput, BModal, BFormSelect } from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BTable,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BModal,
    BFormSelect,
  },
  data() {
    return {
      localStorageKey: 'kisiler',
      items: [],
      fields: ['ad', 'soyad', 'birim', 'bolum', 'actions'],
      showModal: false,
      showEditModal: false,
      tableKey: 0,
      showDeleteModal: false,
      birimOptions: ["Birim 1", "Birim 2", "Birim 3"],
      bolumOptions: ["Bolum 1", "Bolum 2", "Bolum 3"],
      newPerson: {
        ad: '',
        soyad: '',
        birim: '',
        bolum: '',
      },
      editingPerson: {},
      manuallyEnteredBirimler: [],
      manuallyEnteredBolumler: [],
    };
  },
  methods: {
    showAddPersonModal() {
      this.showModal = true;
    },
    addPerson() {
      this.items.push({ ...this.newPerson });
      this.resetNewPerson();
      this.showModal = false;
      this.saveDataToLocalStorage();
      this.refreshTable();
      this.saveManuallyEnteredData();
    },
    saveManuallyEnteredData() {
      if (this.newPerson.birim && !this.manuallyEnteredBirimler.includes(this.newPerson.birim)) {
        this.manuallyEnteredBirimler.push(this.newPerson.birim);
      }
      if (this.newPerson.bolum && !this.manuallyEnteredBolumler.includes(this.newPerson.bolum)) {
        this.manuallyEnteredBolumler.push(this.newPerson.bolum);
      }
    },
    deletePerson(index) {
      this.items.splice(index, 1);
      this.saveDataToLocalStorage();
      this.refreshTable();
      this.showDeleteModal = true;
      this.$emit('delete', this.deletingPersonIndex);
      this.showDeleteModal = false;
    },
    cancelDelete() {
      this.showDeleteModal = false;
    },
    confirmDeletePerson(index) {
      this.showDeleteModal = true;
      this.deletingPersonIndex = index;
    },
    editPerson(person) {
      this.editingPerson = { ...person };
      this.showEditModal = true;
    },
    resetNewPerson() {
      this.newPerson = {
        ad: '',
        soyad: '',
        birim: '',
        bolum: '',
      };
    },
    updatePersonAndCloseModal() {
      this.updatePerson();
      this.saveDataToLocalStorage();
      this.showEditModal = false;
    },
    saveDataToLocalStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
    },
    updatePerson() {
      this.showEditModal = false;

      const editedPersonId = this.editingPerson.id;

      const index = this.items.findIndex(item => item.id === editedPersonId);
      if (index !== -1) {
        this.items[index] = { ...this.editingPerson };
        this.saveDataToLocalStorage();
        console.log('updatePerson: Veri güncellendi', this.items);

        this.tableKey += 1;
      }
      this.editingPerson = {};
      this.refreshTable();
    },
    refreshTable() {
      this.$nextTick(() => {
        this.$refs.myTable.refresh();
      });
      this.tableKey += 1;
    },
    confirmDelete() {
      this.showDeleteModal = false;
    },
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const adSoyad = `${item.ad} ${item.soyad}`.toLowerCase();
        const birim = item.birim.toLowerCase();
        const bolum = item.bolum.toLowerCase();
        const matchesBirim = this.manuallyEnteredBirimler.some(entry => entry.toLowerCase() === birim);
        const matchesBolum = this.manuallyEnteredBolumler.some(entry => entry.toLowerCase() === bolum);
        return adSoyad.includes(this.filterText.toLowerCase()) || matchesBirim || matchesBolum;
      });
    },
  },

  mounted() {
    const storedData = localStorage.getItem(this.localStorageKey);

    if (storedData) {
      this.items = JSON.parse(storedData);
    }
    this.refreshTable();
  },
};
</script>

<style>
.add-person-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

