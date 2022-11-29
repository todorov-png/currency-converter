<template>
    <button class="big-btn">
        <span>{{ text }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BigBtn',
    props: {
        text: {
            require: true,
            type: String,
        },
    },
});
</script>

<style scoped lang="scss">
.big-btn {
    color: white;
    border: none;
    border-radius: 6px;
    background-color: rgba(#54bcff, 0.8);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 60px;
    cursor: pointer;
    transition: background-color 0.6s;
    &:hover {
        background-color: #54bcff;
    }
    &[disabled] {
        background-color: #36739ba4;
    }
}
</style>
