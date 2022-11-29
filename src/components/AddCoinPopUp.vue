<template>
    <div class="popup-wrap">
        <div class="popup-content" style="max-width: 370px">
            <div class="add-coin-pay-popup scroll">
                <div class="add-coin-pay-popup__title">
                    <icon-component type="BTC" style="width: 25px" />
                    <span style="margin-right: auto">Add coin</span>
                    <button class="add-coin-pay-popup__close" @click="closePopUp">
                        <icon-component type="cross" />
                    </button>
                </div>
                <p class="add-coin-pay-popup__description">Enter coin name</p>
                <input v-model="nameCoin" type="text" class="add-coin-pay-popup__input" placeholder="BTC" />
                <button class="add-coin-pay-popup__btn popup-btn" @click="checkAndAddCoin">Add</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';
import IconComponent from './inc/IconSvg.vue';

export default defineComponent({
    name: 'AddCoinPopUp',
    emits: ['close-pop-up', 'notice', 'preloader'],
    components: { IconComponent },
    data() {
        return {
            nameCoin: '' as string,
        };
    },
    created() {
        document.body.classList.add('no-scroll-ios');
    },
    methods: {
        ...mapActions(['addCoin']),
        closePopUp(): void {
            document.body.classList.remove('no-scroll-ios');
            this.$emit('close-pop-up', false);
        },
        async checkAndAddCoin() {
            this.$emit('preloader', true);
            if (this.nameCoin) {
                try {
                    await this.addCoin(this.nameCoin);
                    this.$emit('notice', { code: 200, message: 'Coin added successfully' });
                } catch (e: any) {
                    if (e && e.message) {
                        this.$emit('notice', { code: 500, message: e.message });
                    } else {
                        this.$emit('notice', { code: 500, message: 'Error, try again!' });
                    }
                }
            } else {
                this.$emit('notice', { code: 422, message: 'You did not enter a token name' });
            }
            this.$emit('preloader', false);
            this.closePopUp();
        },
    },
});
</script>

<style scoped lang="scss">
.add-coin-pay-popup {
    padding: 18px;
    max-height: 90vh;
    max-height: calc(var(--vh, 1vh) * 90);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    &__title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            font-weight: 600;
            font-size: 24px;
            line-height: 120%;
            margin-left: 10px;
        }
    }
    &__close {
        cursor: pointer;
        border: none;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        padding: 0;
        svg {
            fill: #6c727a;
            width: 13px;
            height: 13px;

            &:hover {
                fill: white;
            }
        }
    }
    &__description {
        color: #d1d1d6;
        font-weight: 400;
        font-size: 16px;
        line-height: 120%;
        margin: 16px 0;
        width: 100%;
        text-align: center;
    }
    &__input {
        width: 100%;
        height: 48px;
        padding: 14px;
        background: rgba(44, 44, 46, 0.8);
        border-radius: 6px;
        border: none;
        outline: none;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: white;
        margin-bottom: 20px;
    }
    &__btn {
        width: 100%;
        max-width: 100%;
        height: 56px;
        background-color: #54bcff;
    }
}
</style>
