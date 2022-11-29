import axios from 'axios';
import { createStore } from 'vuex'
import { ISelectCurrency } from '../types/interface';

export default createStore({
  state: {
      exchangeRates: {} as any,
      fiatMoney: [{name:'USD', logo:'USD'},{name:'EUR', logo:'EUR'},{name:'UAH', logo:'UAH'}] as ISelectCurrency[],
      cryptoMoney: [{name:'BTC'},{name:'ETH'},{name:'BNB'},{name:'GBP'},{name:'XRP'}] as ISelectCurrency[]
  },
  getters: {
    getAllExchangeRates(state):any|null {
      return state.exchangeRates ? state.exchangeRates : null;
    },
    getFiatMoney(state):Array<ISelectCurrency> {
      return state.fiatMoney ? state.fiatMoney : [];
    },
    getCryptoMoney(state):Array<ISelectCurrency> {
      return state.cryptoMoney ? state.cryptoMoney : [];
    }
  },
  mutations: {
    setExchangeRates(state, data:Array<string>) {
      state.exchangeRates = data;
    },
    setCryptoMoney(state, data:Array<ISelectCurrency>) {
      state.cryptoMoney = data;
    },
    addCryptoMoney(state, data) {
      state.cryptoMoney.push({name:data.name});
      state.exchangeRates[data.name] = data.value;
    },
  },
  actions: {
    async createExchangeRates({ commit, getters }) {
      try {
        const cryptoMoney:string|null = localStorage.getItem('cryptoMoney');
        if (cryptoMoney) {
          commit('setCryptoMoney', JSON.parse(cryptoMoney));
        }
          const info = await axios({
              url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${getters.getCryptoMoney.map((item:ISelectCurrency) => item.name).toString()},USD&tsyms=${getters.getFiatMoney.map((item:ISelectCurrency) => item.name).toString()}`,
              method: 'get',
          });
          commit('setExchangeRates', info.data);
        } catch (e:any) {
          if (e && e.message) {
              throw { message: e.message };
          } else {
              throw { message: 'Error, try again!' };
          }
        }
      },
      async addCoin({ commit, getters }, nameCoin) {
        try {
          const name:string = nameCoin.toUpperCase();
            const info = await axios({
                url: `https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=${getters.getFiatMoney.map((item:ISelectCurrency) => item.name).toString()}`,
                method: 'get',
            });
            if (info.data.Response==='Error') {
              throw { message: 'I can\'t find this coin.' };
            } else if (getters.getCryptoMoney.some((item:ISelectCurrency) => item.name === name)) {
                throw { message: 'You already have this coin' };
            } else {
              commit('addCryptoMoney', {name, value:info.data});
              localStorage.setItem('cryptoMoney', JSON.stringify(getters.getCryptoMoney));
            }
          } catch (e:any) {
            if (e && e.message) {
                throw { message: e.message };
            } else {
                throw { message: 'Error, try again!' };
            }
        }
      }
  },
})
