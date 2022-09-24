<template>
    <div class="home">
        <h2>{{title}}</h2>
        <b-row>
            <b-col sm="4">
                <div class="col-sm-4">
                    <h5>Anggaran</h5>
                    <p>{{formatPrice(anggaran)}}</p>
                </div>
            </b-col>
            <b-col sm="4">
                <div class="col-sm-4">
                    <h5>Terpakai</h5>
                    <p>{{formatPrice(terpakai)}}</p>
                </div>
            </b-col>
            <b-col sm="4">
                <div class="col-sm-4">
                    <h5>Sisa</h5>
                    <p>{{formatPrice(sisa)}}</p>
                </div>
            </b-col>
        </b-row>
        <b-dropdown-divider></b-dropdown-divider>
        <h2>Daftar Transaksi</h2>
        <button v-b-modal.modal-transaksi>Tambah Transaksi</button>
        <table class="table">
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Nama</th>
                    <th>Nominal</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{item.tanggal}}</td>
                    <td>{{item.nama}}</td>
                    <td>{{item.nominal}}</td>
                </tr>
            </tbody>
        </table>

        <b-modal id="modal-transaksi" title="Tambah Dompet" @ok="this.tambahTransaksi">
            <TextInput title="Tanggal" placeholders="20/01/2000" v-model="form.tanggal"
                description="Masukkan Tanggal" type="date"/>
            <TextInput title="Judul Transaksi" placeholders="Seblak" v-model="form.nama"
                description="Masukkan Nama Transaksi" />
            <TextInput title="Nominal" placeholders="11.000" v-model="form.nominal"
            description="Masukkan Nominal" type="number"/>
        </b-modal>
    </div>
</template>

<style>
    h2 {
        margin-bottom: 32px;
    }
</style>

<script>
// @ is an alias to /src
import moment from "vue-moment";
import HelloWorld from '@/components/HelloWorld.vue'
import CardsResume from '@/components/Cards/CardsResume.vue';
import { db } from '../firebaseDb';
import { ref, set, get, child, push, update, remove } from "firebase/database";
import TextInput from "@/components/Forms/TextInput.vue";
const dbRef = ref(db)

export default {
    name: 'HomeView',
    components: {
    HelloWorld,
    CardsResume,
    TextInput
},
    data() {
        return {
            items: [],
            form: {
                tanggal: "",
                nama: "",
                nominal: "",
                sisa: ""
            },
            anggaran: 0,
            terpakai: 0,
            title: "",
            sisa: 0
        }
    },
    methods: {
        GetDetailDomper(id) {
            get(child(dbRef, `dompet/${id}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    this.anggaran = snapshot.val()['anggaran']
                    this.title = snapshot.val()['nama']
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        GetListTransaksi(id) {
            this.items = []
            get(child(dbRef, `dompet/${id}/transaksi`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let nominalTransaksi = 0
                    Object.keys(snapshot.val()).map((value) => {
                        nominalTransaksi += snapshot.val()[value]['nominal']
                        this.items.push(snapshot.val()[value])
                    })

                    this.terpakai = nominalTransaksi
                    this.sisa = this.anggaran - nominalTransaksi
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return `Rp. ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
        },
        tambahTransaksi() {
            const id = this.$route.query.id
            const uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

            try {
                set(ref(db, `dompet/${id}/transaksi/${uuid}`), this.form);
                this.form = {
                    tanggal: "",
                    nama: "",
                    nominal: ""
                }

                this.GetListTransaksi(id)
            } catch (error) {
                alert(error)
            }
        }
    },
    async mounted() {
        const id = this.$route.query.id
        await this.GetDetailDomper(id)
        await this.GetListTransaksi(id)
    }
}
</script>