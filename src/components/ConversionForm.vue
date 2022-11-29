<template>
    <div class="conversion">
        <label>
            <span>I give</span>
            <select-currency-component
                :data="getFiatMoney"
                @change-select="indexSelectCurrencyIn = $event"
            />
        </label>
        <label>
            <span>get</span>
            <select-currency-component
                :data="getCryptoMoney"
                @change-select="indexSelectCurrencyOut = $event"
            />
        </label>
        <label>
            <span>{{ inCurrency }}</span>
            <input-number-component :maxValue="maxValue" @changeValue="valueCurrencyIn = $event" />
        </label>
        <label>
            <span>{{ outCurrency }}</span>
            <input
                type="text"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                disabled
                :value="valueCurrencyOut"
            />
        </label>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import InputNumberComponent from './inc/InputNumber.vue';
import SelectCurrencyComponent from './inc/SelectCurrency.vue';

export default defineComponent({
    name: 'ConversionForm',
    components: { InputNumberComponent, SelectCurrencyComponent },
    data() {
        return {
            valueCurrencyIn: 0 as number,
            indexSelectCurrencyIn: 0 as number,
            indexSelectCurrencyOut: 0 as number,
        };
    },
    computed: {
        ...mapGetters(['getFiatMoney', 'getCryptoMoney', 'getAllExchangeRates']),
        inCurrency(): string {
            return this.getFiatMoney[this.indexSelectCurrencyIn].name;
        },
        maxValue(): number {
            if (this.getAllExchangeRates && this.getAllExchangeRates['USD']) {
                return 10000 * this.getAllExchangeRates['USD'][this.inCurrency];
            }
            return 10000;
        },
        outCurrency(): string {
            return this.getCryptoMoney[this.indexSelectCurrencyOut].name;
        },
        exchangeRates(): number {
            if (this.getAllExchangeRates && this.getAllExchangeRates[this.outCurrency]) {
                return this.getAllExchangeRates[this.outCurrency][this.inCurrency];
            }
            return 1;
        },
        valueCurrencyOut(): number {
            return this.roundingToHundredths(this.valueCurrencyIn / this.exchangeRates);
        },
    },
    methods: {
        roundingToHundredths(value: number): number {
            return parseFloat(value.toFixed(6));
        },
    },
});
</script>

<style scoped lang="scss">
.conversion {
    @include min-w-next-sm {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    & > label {
        display: block;
        margin-bottom: 20px;
        @include min-w-next-sm {
            width: 49%;
            margin-bottom: 25px;
        }
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
        & > input {
            background: #252525;
            border-radius: 6px;
            width: 100%;
            padding: 18px 14px;
            border: none;
            font-weight: 500;
            font-size: 15px;
            line-height: 150%;
            color: white;
            &[disabled] {
                background: rgba(#252525, 0.6);
            }
            &::placeholder {
                color: #8e8e93;
            }
        }
    }
}
</style>
