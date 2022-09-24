<template>
    <div>
        <b-button id="btn-add-wallet" v-b-modal.modal-1>Tambah Dompet</b-button>
        <table class="table">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Anggaran</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.nama}}</td>
                    <td>{{item.anggaran}}</td>
                    <td>
                        <b-button class="button" @click="editWallet(item.id)">Edit</b-button>
                        <b-button class="button" @click="deleteWallet(item.id)">Delete</b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal id="modal-1" title="Tambah Dompet" @ok="this.addWallet">
            <TextInput title="Nama Dompet" placeholders="Dompet Ayank" v-model="dompet.nama"
                description="Masukkan Nama Dompet" />
            <TextInput title="Anggaran" placeholders="10000" v-model="dompet.anggaran"
            description="Masukkan Anggaran yang ditentukan" type="number"/>
        </b-modal>

        <b-modal id="modaledit" ref="modaledit" title="Edit Dompet" @ok="this.saveEdit">
            <TextInput title="Id" placeholders="Id" v-model="Editdompet.id" :value="Editdompet.id"/>
            <TextInput title="Nama Dompet" placeholders="Dompet Ayank" v-model="Editdompet.nama" :value="Editdompet.nama"
                description="Masukkan Nama Dompet" />
            <TextInput title="Anggaran" placeholders="10000" v-model="Editdompet.anggaran" :value="Editdompet.anggaran"
            description="Masukkan Anggaran yang ditentukan" type="number"/>
        </b-modal>
    </div>
</template>

<script>
import { db } from '../firebaseDb';
import TextInput from '@/components/Forms/TextInput.vue';
import { ref, set, get, child, push, update, remove } from "firebase/database";
const dbRef = ref(db)
export default {
    data() {
        return {
            // Note `isActive` is left out and will not appear in the rendered table
            fields: ["id", "nama", "nominal"],
            items: [],
            dompet: {
                id: "",
                nama: "",
                nominal: 0,
                anggaran: 0,
                listTransaksi: []
            },
            Editdompet: {
                id: "",
                nama: "",
                nominal: 0,
                anggaran: 0
            }
        };
    },
    mounted() {
        this.getListDompet()
    },
    methods: {
        saveEdit() {
            console.log(this.Editdompet)
        },
        editWallet(id) {
            this.items.forEach(element => {
                if (element.id === id) {
                    this.Editdompet.id = id
                    this.Editdompet.nama = element.nama
                    this.Editdompet.nominal = element.nominal
                    this.Editdompet.anggaran = element.anggaran
                    this.$refs.modaledit.show()
                }
            });
        },
        async addWallet() {
            this.dompet.id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

            try {
                set(ref(db, `dompet/${this.dompet.id}`), this.dompet);
                this.dompet = {
                    nama: "",
                    nominal: "",
                    anggaran: "",
                    listTransaksi: []
                }

                this.getListDompet()
            } catch (error) {
                alert(error)
            }
        },
        async getListDompet() {
            this.items = []
            get(child(dbRef, 'dompet')).then((snapshot) => {
                if (snapshot.exists()) {
                    Object.keys(snapshot.val()).map((value) => {
                        let result = snapshot.val()[value]
                        result.id = value
                        this.items.push(result)
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        async deleteWallet(id) {
            if (confirm("Yakin Hapus Dompet ini?") == true) {
                await remove(ref(db, `dompet/${id}`))
                this.getListDompet()
            } else {
                
            }
        }
    },
    components: { TextInput, TextInput }
}
</script>

<style>
#btn-add-wallet {
    margin-bottom: 20px;
}

.button {
    margin: 4px;
}
</style>