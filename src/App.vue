<template>
  <div id="app">
    <BootstrapSidebar
      :initial-show="initialShow"
      :links="links"
      :header="header"
      :fa="true"
      @sidebarChanged="onSidebarChanged"
    >
      <template v-slot:navbar>
        <b-navbar
          id="mainNavbar"
          toggleable="lg"
          type="light"
          variant="light"
          fixed="top"
        >
          <b-navbar-nav>
            <b-nav-item> Dhiv Cantik </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </template>

      <template v-slot:content>
        <b-container style="margin-top: 56px">
          <router-view />
        </b-container>
      </template>
    </BootstrapSidebar>
  </div>
</template>
<style lang="scss">
  /* @import "node_modules/bootstrap/scss/bootstrap";
  @import "node_modules/bootstrap-vue/src/index.scss"; */
  @import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme";
</style>
<style>
body {
  padding: 1rem;
}
</style>

<script>
import BootstrapSidebar from "vue-bootstrap-sidebar";

export default {
  components: {
    BootstrapSidebar,
  },
  data() {
    return {
      initialShow: true,
      header: "<h3>Dhivia Cantik</h3>",
      links: [
        { name: "Home", href: { name: "home" }, faIcon: ["fas", "home"] },
        // {
        //   name: "Dropdown",
        //   faIcon: ["fas", "tint"],
        //   children: [
        //     {
        //       name: "Child Item 1",
        //       href: {
        //         name: "child-item-1",
        //       },
        //       faIcon: ["fas", "child"],
        //     }
        //   ],
        // },
        { name: "Master Dompet", href: { name: "dompet" }, faIcon: "users" }
      ],
    };
  },
  methods: {
    onSidebarChanged() {},
    addDataInitial() {
      // const db = getDatabase()
      // set(ref(db, 'dompet/'), {
      //   title: 'Uang Masak Bulanan',
      //   nominal: '1000000'
      // });
    }
  },
  mounted() {
    this.addDataInitial()
  }
};
</script>