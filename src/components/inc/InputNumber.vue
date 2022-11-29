<template>
    <input
        type="number"
        v-model="valueInput"
        class="input-number"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        :placeholder="minValue + ''"
        :step="0.1"
        :min="minValue"
        :max="maxValue"
        @input="changeInput($event)"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputNumber',
    emits: ['changeValue'],
    props: {
        minValue: {
            default: 0,
            type: Number,
        },
        maxValue: {
            default: 10000,
            type: Number,
        },
    },
    data() {
        return {
            valueInput: '' as string | number,
            oldValueInput: '' as string | number,
        };
    },
    watch: {
        maxValue(to) {
            if (
                (typeof this.valueInput === 'number' && to < this.valueInput) ||
                (typeof this.valueInput === 'string' && to < parseFloat(this.valueInput))
            ) {
                this.valueInput = to;
                this.$emit('changeValue', to);
            }
        },
    },
    methods: {
        changeInput($event: any): void {
            const newValueInput: string | number = $event.target.value;
            if (newValueInput === '' && this.oldValueInput === '') {
                this.valueInput = ' ';
                this.$emit('changeValue', this.minValue);
                return;
            }
            const newValueNumber: number =
                typeof newValueInput === 'string' ? parseFloat(newValueInput) : newValueInput;
            const oldValueNumber: number =
                typeof this.oldValueInput === 'string' ? parseFloat(this.oldValueInput) : this.oldValueInput;
            if (!isNaN(newValueNumber)) {
                if (newValueNumber < this.minValue) {
                    this.valueInput = '';
                    this.oldValueInput = '';
                    this.$emit('changeValue', this.minValue);
                } else if (newValueNumber > this.maxValue + 1) {
                    this.valueInput = this.oldValueInput;
                    this.$emit('changeValue', this.oldValueInput);
                } else {
                    const fractionLength: number | undefined = newValueNumber.toString().match(/\.(\d+)/)?.[1].length;
                    if (fractionLength && fractionLength > 2) {
                        this.valueInput = oldValueNumber;
                        this.$emit('changeValue', oldValueNumber);
                    } else {
                        this.oldValueInput = newValueNumber;
                        this.$emit('changeValue', newValueNumber);
                    }
                }
            } else if (!isNaN(oldValueNumber)) {
                this.valueInput = '';
                this.oldValueInput = '';
                this.$emit('changeValue', this.minValue);
            } else {
                this.$emit('changeValue', this.minValue);
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.input-number {
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
    &::placeholder {
        color: white !important;
    }
}
</style>
