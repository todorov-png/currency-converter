<template>
    <div style="flex: 1 0 auto">
        <div class="container">
            <h1 class="main-title">Currency Converter</h1>
            <conversion-form-component />
            <exchange-rates-component
                @notice="dataNotice = $event"
                @preloader="showPreloader = $event"
                @add-coin-pop-up="showAddCoinPopUp = $event"
            />
        </div>
        <fade-transition-component>
            <notice-component :dataNotice="dataNotice" class="notice-component" @notice="dataNotice = $event" />
        </fade-transition-component>
        <fade-transition-component>
            <add-coin-pop-up-component
                v-if="showAddCoinPopUp"
                @click="closePopUp($event)"
                @preloader="showPreloader = $event"
                @notice="dataNotice = $event"
                @close-pop-up="showAddCoinPopUp = $event"
            />
        </fade-transition-component>
        <preloader-component :status="showPreloader" />
    </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';
import { INotice } from './types/interface';
import ConversionFormComponent from './components/ConversionForm.vue';
import ExchangeRatesComponent from './components/ExchangeRates.vue';
import AddCoinPopUpComponent from './components/AddCoinPopUp.vue';
import FadeTransitionComponent from './components/inc/FadeTransition.vue';
import NoticeComponent from './components/inc/QuickNotice.vue';
import PreloaderComponent from './components/inc/GlobalPreloader.vue';

export default defineComponent({
    name: 'App',
    components: {
        ConversionFormComponent,
        ExchangeRatesComponent,
        FadeTransitionComponent,
        AddCoinPopUpComponent,
        NoticeComponent,
        PreloaderComponent,
    },
    data() {
        return {
            dataNotice: {
                code: 0,
                message: '',
            } as INotice,
            showPreloader: true as boolean,
            showAddCoinPopUp: false as boolean,
        };
    },
    created() {
        document.body.scrollTop = 0;
        window.addEventListener('resize', this.onResize, true);
        window.addEventListener('touchmove', this.onResize, true);
        this.onResize();
    },
    async mounted() {
        try {
            await this.createExchangeRates();
        } catch (e: any) {
            if (e && e.message) {
                this.dataNotice = { code: 500, message: e.message };
            } else {
                this.dataNotice = { code: 500, message: 'Error, try again!' };
            }
        }
        this.showPreloader = false;
    },
    unmounted() {
        window.removeEventListener('resize', this.onResize, true);
        window.removeEventListener('touchmove', this.onResize, true);
    },
    methods: {
        ...mapActions(['createExchangeRates']),
        onResize() {
            const vh: number = window.innerHeight / 100;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        },
        closePopUp(event: any) {
            if (event.target.closest('.popup-content') === null) {
                document.body.classList.remove('no-scroll-ios');
                this.showAddCoinPopUp = false;
            }
        },
    },
});
</script>

<style lang="scss">
html,
body {
    margin: 0;
    height: 100%;
}
body {
    background-color: $bg;
    &.no-scroll-ios {
        height: 100%;
        width: 100%;
        position: fixed;
        overflow: hidden;
    }
}
* {
    box-sizing: border-box;
}
#app {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.container {
    width: 100%;
    height: 100%;
    max-width: $container;
    margin-left: auto;
    margin-right: auto;
    padding: 30px 10px 10px;
    background-color: $bg-container;
    @include min-w-next-sm {
        padding: 35px 15px 20px;
    }
    @include min-w-lg {
        padding: 40px 20px 30px;
    }
}
.main-title {
    text-align: center;
    font-size: 30px;
    margin: 0 auto 20px;
    color: white;
    @include min-w-next-sm {
        font-size: 35px;
    }
    @include min-w-lg {
        font-size: 40px;
    }
}
.scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar:horizontal {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(black, 0.4);
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: black;
    }
}
.popup-wrap {
    position: fixed;
    overflow: hidden;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    inset: 0px;
    width: 100vw;
    min-height: 150vh;
    min-height: calc(var(--vh, 1vh) * 150);
    padding-bottom: 50vh;
    padding-bottom: calc(var(--vh, 1vh) * 50);
    background: rgba(#171717, 0.7);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-content {
    background: #252525;
    border-radius: 12px;
    padding: 6px;
    width: calc(100vw - 40px);
}
.popup-btn {
    border: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: white;
    background-color: #54bcff;
    border-radius: 6px;
    flex-shrink: 0;
    transition: background-color 0.4s;
    &:hover {
        cursor: pointer;
        color: white;
        fill: white;
        background-color: #3ba9f1 !important;
    }
}
.notice-component {
    position: fixed;
    right: 20px;
    bottom: 10px;
}
input {
    &,
    &:hover,
    &:focus,
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        outline: none;
    }
}
</style>
