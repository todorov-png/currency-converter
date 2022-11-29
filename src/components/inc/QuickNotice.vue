<template>
    <div v-if="dataNotice.code !== 0" class="notice">
        <icon-component :type="getType()" class="notice__status" />
        <span class="notice__message">{{ dataNotice.message }}</span>
        <icon-component type="cross" class="notice__cross" @click="closeNotice" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from './IconSvg.vue';
import { INotice } from '../../types/interface';

export default defineComponent({
    name: 'QuickNotice',
    components: { IconComponent },
    props: {
        dataNotice: {
            require: true,
            default: {
                code: 0,
                message: '',
            } as INotice,
        },
    },
    data() {
        return {
            timer: 0,
        };
    },
    watch: {
        dataNotice(newValue: any): void {
            if (newValue.message.length > 0 && newValue.code > 0) {
                if (this.timer !== 0) clearTimeout(this.timer);
                this.timer = window.setTimeout(() => this.closeNotice(), 5000);
            }
        },
    },
    methods: {
        closeNotice(): void {
            clearTimeout(this.timer);
            this.timer = 0;
            this.$emit('notice', { code: 0, message: '' });
        },
        getType(): any {
            if (this.dataNotice?.code === 200) {
                return 'success';
            } else if (this.dataNotice?.code === 422) {
                return 'processing';
            }
            return 'error';
        },
    },
});
</script>

<style lang="scss" scoped>
.notice {
    display: flex;
    align-items: center;
    background: #454545;
    border-radius: 16px;
    padding: 14px 10px;
    min-width: 200px;
    &__message {
        font-weight: 500;
        font-size: 12px;
        line-height: 120%;
        color: #b7babf;
        margin-left: 8px;
        margin-right: 12px;
    }
    &__cross {
        margin-top: -5px;
        margin-left: auto;
        align-self: flex-start;
        cursor: pointer;
        fill: #626a77;
        &:hover {
            fill: white;
        }
    }
}
</style>
