<template>
    <transition name="fade">
        <slot></slot>
    </transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
