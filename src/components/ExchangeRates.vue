<template>
    <div class="exchange-rates">
        <label>
            <span>Currency</span>
            <select-currency-component
                :data="getFiatMoney"
                @change-select="indexSelectCurrencyIn = $event"
            />
        </label>
        <label>
            <span>Exchange rates</span>
            <table-rates-component :data="inCurrency" />
        </label>
        <div class="exchange-rates__btns">
            <big-btn-component text="Add currency" @click="$emit('add-coin-pop-up', true)" />
            <big-btn-component text="Update courses" @click="updateCourses($event.target)" />
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue';
import TableRatesComponent from './inc/TableRates.vue';
import BigBtnComponent from './inc/BigBtn.vue';
import SelectCurrencyComponent from './inc/SelectCurrency.vue';

export default defineComponent({
    name: 'ExchangeRates',
    emits: ['notice', 'preloader', 'add-coin-pop-up'],
    components: { SelectCurrencyComponent, TableRatesComponent, BigBtnComponent },
    data() {
        return {
            indexSelectCurrencyIn: 0 as number,
        };
    },
    computed: {
        ...mapGetters(['getFiatMoney']),
        inCurrency(): string {
            return this.getFiatMoney[this.indexSelectCurrencyIn].name;
        },
    },
    methods: {
        ...mapActions(['createExchangeRates']),
        async updateCourses(target: any) {
            this.$emit('preloader', true);
            target.disabled = true;
            try {
                await this.createExchangeRates();
                this.$emit('notice', { code: 200, message: 'Exchange rates successfully updated' });
            } catch (e: any) {
                if (e && e.message) {
                    this.$emit('notice', { code: 500, message: e.message });
                } else {
                    this.$emit('notice', { code: 500, message: 'Error, try again!' });
                }
            }
            this.$emit('preloader', false);
            setTimeout(() => (target.disabled = false), 5000);
        },
    },
});
</script>

<style scoped lang="scss">
.exchange-rates {
    @include min-w-next-sm {
        &,
        &__btns {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
    &__btns button,
    & > label {
        margin-bottom: 20px;
        @include min-w-next-sm {
            width: 49%;
            margin-bottom: 25px;
        }
    }
    & > label {
        display: block;
        span {
            font-weight: 600;
            font-size: 16px;
            line-height: 140%;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #77797d;
            display: block;
            margin-bottom: 5px;
        }
    }
    &__btns {
        width: 100%;
    }
}
</style>
