<template>
    <TextInput title="Nama Dompet" placeholders="Dompet Ayank" models="namaDomper" description="Masukkan Nama Dompet" />
</template>

<script>
import TextInput from '@/components/Forms/TextInput.vue';
export default {
    name: 'FormTambahDompet',
    components: {
        TextInput
    }
}
</script>