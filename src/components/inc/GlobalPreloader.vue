<template>
    <div v-if="status" class="preloader">
        <icon-component type="preloader" class="preloader__image" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from './IconSvg.vue';

export default defineComponent({
    name: 'GlobalPreloader',
    components: { IconComponent },
    props: {
        status: {
            require: true,
            type: Boolean,
        },
    },
});
</script>

<style lang="scss" scoped>
.preloader {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: rgba(#171717, 0.6);
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    &__image {
        width: 90px;
        height: 90px;
        animation: preloader-rotate 5s infinite linear;
    }
    &.local-preloader {
        position: relative;
        background: none;
        padding: 10px;
        svg {
            margin: 0;
        }
    }
    @keyframes preloader-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
