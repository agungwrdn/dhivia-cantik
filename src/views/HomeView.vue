<template>
  <div class="home">
    <b-row>
      <b-col sm="4" v-for="item in items" @click="gotoDetailPage(item.id)">
        <CardsResume class="cardView" sm="4" :title="item.nama" :value="formatPrice(item.sisa)" />
      </b-col>
    </b-row>
  </div>
</template>

<style>
.cardView {
  margin-bottom: 20px;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CardsResume from '@/components/Cards/CardsResume.vue';
import { db } from '../firebaseDb';
import { ref, set, get, child, push, update, remove } from "firebase/database";
const dbRef = ref(db)

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    CardsResume
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    gotoDetailPage(id) {
      window.location.href = `/dompet/detail?id=${id}`
    },
    GetListDompet() {
      this.items = []
      get(child(dbRef, 'dompet')).then((snapshot) => {
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map(async (value) => {
            let result = snapshot.val()[value]
            result.id = value
            result.sisa = await this.GetDetailSisaDompet(value, snapshot.val()[value]['anggaran'])
            console.log(result)
            this.items.push(result)
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return `Rp. ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
    },
    GetDetailSisaDompet(id, anggaran) {
      return new Promise((resolve, reject) => {
        get(child(dbRef, `dompet/${id}/transaksi`)).then((snapshot) => {
          if (snapshot.exists()) {
            let nominalTransaksi = 0
            
            Object.keys(snapshot.val()).map((value) => {
              nominalTransaksi += snapshot.val()[value]['nominal']
            })

            return resolve((anggaran - nominalTransaksi))
          } 
          return resolve(anggaran)
        }).catch((error) => {
          return resolve(anggaran)
        })
      })
    }
  },
  mounted() {
    this.GetListDompet()
  }
}
</script>
