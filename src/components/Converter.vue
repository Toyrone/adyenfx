/* eslint-disable space-before-function-paren */
<template>
  <div class="converter">
    <div class="converter__section">
      <div class="converter__section-wrapper">
        <label class="converter__label" for="from">You Have</label>
        <input v-model.number="currency.from" id="from" class="converter__input" type="number" />
      </div>
      <div class="converter__section-wrapper">
        <span class="converter__label light">{{ fromCurrency }}</span>
        <v-select
          :reduce="(country) => country.countryName"
          label="countryName"
          :options="currencies"
          v-model="country.from"
        ></v-select>
      </div>
    </div>
    <div class="converter__section">
      <div class="converter__section-wrapper">
        <label class="converter__label" for="to">You get</label>
        <span class="converter__input">{{ currency.to | formatCurrency }}</span>
      </div>
      <div class="converter__section-wrapper">
        <span class="converter__label light">{{ toCurrency }}</span>
        <v-select
          label="countryName"
          :reduce="(country) => country.countryName"
          v-model="country.to"
          :options="currencies"
          placeholder="Select currency"
        ></v-select>
      </div>
    </div>
    <button
      :disabled="!country.to || !country.from || !currency.to || !currency.from"
      @click="switchCurrencies"
      class="converter-switcher"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import currencyObj from '../utils/countries';

export default {
  name: 'Converter',
  data() {
    return {
      selectedCurrency: {},
      defaultCurrency: 'EUR',
      baseCurrency: '',
      currency: {
        from: 1000,
      },
      country: {
        from: 'Netherlands',
      },
    };
  },
  async created() {
    (this.handleRatesFetch = () => this.fetchBaseRates(this.defaultCurrency))();

    setInterval(this.handleRatesFetch, 120000);
    /**
     * Fetches IP and sets the base currency
     * based on returned IP
     */
    try {
      const response = await axios.get(`https://ipinfo.io/json?token=${process.env.VUE_APP_IP_KEY}`);

      this.baseCurrency = this.currencies.find(
        (currency) => currency.countryCode === response.data.country,
      ).currencyCode;
      return response;
    } catch (error) {
      this.baseCurrency = 'EUR';
      return error;
    }
  },
  watch: {
    /* eslint-disable space-before-function-paren */
    'country.to': function() {
      this.currency.to = Number(this.currency.from * this.currentRate).toFixed(2);
    },
    'currency.from': function(value) {
      this.currency.to = Number(value * this.currentRate).toFixed(2);
    },
    baseCurrency() {
      if (!this.rateObj.rates) {
        // TODO:  watch when baseCurrency changes and fetch new rates
      }
    },
  },
  computed: {
    ...mapGetters({ rateObj: 'getBaseRates' }),
    currencies() {
      return currencyObj;
    },
    fromCurrency() {
      const countryObj = this.currencies.find((currency) => currency.countryName === this.country.from);
      return countryObj ? countryObj.currencyCode : this.defaultCurrency;
    },
    toCurrency() {
      const countryObj = this.currencies.find((currency) => currency.countryName === this.country.to);
      return countryObj ? countryObj.currencyCode : '';
    },
    currentRate() {
      if (this.fromCurrency === 'EUR') {
        return this.rateObj.rates[this.toCurrency];
      }
      return Number(this.rateObj.rates[this.toCurrency]) / Number(this.rateObj.rates[this.fromCurrency]);
    },
  },
  methods: {
    ...mapActions(['fetchBaseRates']),
    /**
     * Handles conversion on form change
     */
    switchCurrencies() {
      [this.country.from, this.country.to] = [this.country.to, this.country.from];
    },
  },
  filters: {
    formatCurrency(money) {
      if (money) {
        const newMoney = new Intl.NumberFormat().format(Number(money));
        return newMoney;
      }
      return '';
    },
  },
  beforeDestroy() {
    clearInterval(this.handleRatesFetch);
  },
};
</script>
