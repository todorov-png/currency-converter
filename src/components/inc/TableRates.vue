<template>
    <div class="table-rates">
        <div v-for="(item, name) in getAllExchangeRates" :key="name" class="table-rates__item">
            <p>{{ name }}</p>
            <span> : </span>
            <p>{{ item[data] }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TableRates',
    props: {
        data: {
            require: true,
            default: 'USD',
            type: String,
        },
    },
    computed: { ...mapGetters(['getAllExchangeRates']) },
});
</script>

<style scoped lang="scss">
.table-rates {
    background: #252525;
    border-radius: 6px;
    width: 100%;
    padding: 18px 14px;
    font-weight: 500;
    font-size: 15px;
    line-height: 150%;
    color: white;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 60px;
    &__item {
        min-width: 50%;
        display: flex;
        align-items: center;
        @include min-w-sm {
            min-width: 33.33%;
        }
        @include min-w-next-sm {
            min-width: 50%;
        }
        @include min-w-lg {
            min-width: 33.33%;
        }
        p {
            margin: 0;
        }
        span {
            display: block;
            margin: 0 5px;
        }
    }
}
</style>
