<template>
    <b-card bg-variant="primary" text-variant="white" :header="title" class="text-center">
        <b-card-text>{{value}}</b-card-text>
    </b-card>
</template>

<script>
export default {
  name: 'CardResume',
  props: {
    title: String,
    value: String
  }
}
</script>