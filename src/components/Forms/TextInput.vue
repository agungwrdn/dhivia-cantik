<template>
    <div role="group">
        <label for="input-live">{{title}}</label>
        <b-form-input id="input-live" @input="handleInput" v-model="values" :type="type"
            aria-describedby="input-live-help input-live-feedback" :placeholder="placeholders" trim></b-form-input>

        <b-form-text id="input-live-help">{{description}}</b-form-text>
    </div>
</template>

<script>
export default {
    name: 'TextInputForm',
    props: {
        title: String,
        description: String,
        placeholders: String,
        type: String,
        value: String
    },
    data() {
        return {
            values: this.value
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', this.values)
        }
    }
}
</script>