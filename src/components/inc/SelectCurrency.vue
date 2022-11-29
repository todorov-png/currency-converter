<template>
    <div v-if="data.length > 0" class="select-currency-wrap">
        <div class="select-currency-title" @click="toggleOpenMenu">
            <icon-coin-component
                v-if="data[selectIndex].logo"
                class="select-currency__logo"
                :type="data[selectIndex].logo"
            />
            <div class="select-currency__text--active">
                <h5>{{ data[selectIndex].name }}</h5>
            </div>
            <icon-component class="select-currency__arrow" type="arrow-left" :class="statusOpenMenu ? 'open' : ''" />
        </div>
        <fade-transition-component>
            <div v-if="statusOpenMenu" class="select-currency-menu">
                <div class="select-currency-menu__search">
                    <button><icon-component type="search" /></button>
                    <input
                        type="text"
                        :value="valueSearch"
                        @input="updateDataSelect($event)"
                        placeholder="Search by name"
                    />
                </div>
                <div class="select-currency-menu__list scroll">
                    <div
                        v-for="(item, index) in dataSelect"
                        :key="index"
                        @click="updateSelect(index)"
                        class="select-currency-menu__item"
                    >
                        <icon-coin-component v-if="item.logo" class="select-currency__logo" :type="item.logo" />
                        <div class="select-currency__text">
                            <h5>{{ item.name }}</h5>
                            <span v-if="item.description">{{ item.description }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </fade-transition-component>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ISelectCurrency } from '../../types/interface';
import IconComponent from './IconSvg.vue';
import IconCoinComponent from './IconCoin.vue';
import FadeTransitionComponent from './FadeTransition.vue';

export default defineComponent({
    name: 'SelectCurrency',
    emits: ['change-select'],
    components: { IconComponent, FadeTransitionComponent, IconCoinComponent },
    props: {
        data: {
            type: Array as PropType<ISelectCurrency[]>,
            required: true,
        },
    },
    data() {
        return {
            valueSearch: '' as string,
            statusOpenMenu: false as boolean,
            selectIndex: 0 as number,
            dataSelect: this.data as ISelectCurrency[],
        };
    },
    methods: {
        updateDataSelect(event: any): void {
            this.valueSearch = event.target.value;
            if (this.valueSearch) {
                const bufArray: ISelectCurrency[] = [];
                this.data.forEach((item: ISelectCurrency) =>
                    item.name.toLowerCase().includes(this.valueSearch.toLowerCase()) ? bufArray.push(item) : null
                );
                this.dataSelect = bufArray;
            } else {
                this.dataSelect = this.data;
            }
        },
        updateSelect(index: number): void {
            const length = this.data.length;
            for (let i = 0; i < length; i++) {
                if (
                    this.data[i].name === this.dataSelect[index].name &&
                    this.data[i].description === this.dataSelect[index].description
                ) {
                    this.selectIndex = i;
                    this.$emit('change-select', i);
                    this.statusOpenMenu = !this.statusOpenMenu;
                    break;
                }
            }
        },
        toggleOpenMenu(): void {
            this.statusOpenMenu = !this.statusOpenMenu;
        },
    },
});
</script>

<style scoped lang="scss">
.select-currency {
    z-index: 2;
    &-wrap {
        position: relative;
        padding: 18px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 6px;
        background-color: rgba(#252525, 0.8);
    }
    &-menu {
        position: absolute;
        top: 100%;
        left: 4%;
        width: 92%;
        background: #3e3e42;
        border-radius: 16px;
        padding: 6px 6px 20px;
        z-index: 1;
        &__search {
            position: relative;
            padding: 14px 14px 24px;
            input {
                width: 100%;
                height: 48px;
                padding: 14px 14px 14px 50px;
                background: rgba(#2c2c2e, 0.8);
                border-radius: 6px;
                border: none;
                outline: none;
                font-weight: 500;
                font-size: 16px;
                line-height: 20px;
                color: white;
                margin-bottom: 0;
                &::placeholder {
                    color: #8e8e93;
                }
            }
            button {
                position: absolute;
                top: 14px;
                left: 14px;
                width: 48px;
                height: 48px;
                border: none;
                background: none;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            svg {
                width: 18px;
                height: 18px;
                fill: #8e8e93;
            }
        }
        &__list {
            max-height: 110px;
            padding: 0 14px;
        }
        &__item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            width: 100%;
            margin-right: auto;
            &:last-child {
                margin-bottom: 0;
            }
            &:hover {
                cursor: pointer;
                border-radius: 21px 16px 16px 21px;
                background: rgba(#3e3e42, 1);
            }
        }
    }
    &-title {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    &__logo {
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }
    &__text {
        &--active h5 {
            color: white;
            font-weight: 500;
            font-size: 16px;
            line-height: 150%;
            margin: 0;
            text-transform: uppercase;
        }
        h5 {
            color: white;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
            margin: 0;
            text-transform: uppercase;
        }
        span {
            color: #aeaeb2;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
        }
    }
    &__arrow {
        fill: #6c727a;
        width: 7px;
        height: 12px;
        transform: rotate(-90deg);
        margin-left: 10px;
        transition: transform 0.4s;
        &.open {
            transform: rotate(90deg);
        }
    }
}
</style>
