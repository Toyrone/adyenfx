<template>
  <!-- eslint-disable max-len -->
  <main class="home">
    <section>
      <div class="container">
        <div class="hero mb-3">
          <div class="mb-3 grid grid__layout">
            <div class="col-8">
              <div class="hero__content">
                <h1 class="hero__primary">Global FX rates daily</h1>
                <p class="hero__caption">
                  Get updated on <strong>Adyen</strong> rates for international transactions across top currencies
                </p>
              </div>
            </div>
            <div class="col-4">
              <div class="flex pt-2">
                <span class="hero__icon">
                  <svg class="mr-1" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <title>Clock Icon</title>
                    <path
                      d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 22.956C5.958 22.956 1.043 18.042 1.043 12S5.958 1.043 12 1.043c6.042 0 10.956 4.915 10.956 10.957 0 6.042-4.914 10.956-10.956 10.956z"
                      fill="#000"
                    />
                    <path
                      d="M17.065 16.328l-4.544-4.544V3.653a.522.522 0 00-1.043 0V12c0 .14.055.272.152.37l4.696 4.696a.524.524 0 00.739 0 .522.522 0 000-.738z"
                      fill="#000"
                    />
                  </svg>
                </span>
                <div>
                  <p>
                    <strong>{{ date | formatDate('PP') }}</strong>
                  </p>
                  <span>{{ date | formatDate('ppp') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="hero__card mb-1">
            <Converter />
          </div>
          <span><strong>NB:</strong> *Rates will be refreshed every 2 mins</span>
        </div>
        <div class="hero__meta">
          <dl v-if="baseRates.rates" class="hero__meta-lists">
            <div>
              <dt class="hero__meta-label">{{ baseRates.base }}/USD</dt>
              <dd class="hero__meta-value">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.636 5.636l12.728 12.728m0 0h-9.9m9.9 0v-9.9"
                    stroke="red"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                ${{ baseRates.rates.USD.toFixed(2) }}
              </dd>
            </div>
            <div>
              <dt class="hero__meta-label">{{ baseRates.base }}/GBP</dt>
              <dd class="hero__meta-value">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.636 18.364L18.364 5.636m0 0h-9.9m9.9 0v9.9"
                    stroke="#0ABF53"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                &#163;{{ baseRates.rates.GBP.toFixed(2) }}
              </dd>
            </div>
            <div>
              <dt class="hero__meta-label">{{ baseRates.base }}/CAD</dt>
              <dd class="hero__meta-value">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.636 5.636l12.728 12.728m0 0h-9.9m9.9 0v-9.9"
                    stroke="red"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                ${{ baseRates.rates.CAD.toFixed(2) }}
              </dd>
            </div>
            <div>
              <dt class="hero__meta-label">{{ baseRates.base }}/JPY</dt>
              <dd class="hero__meta-value">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.636 5.636l12.728 12.728m0 0h-9.9m9.9 0v-9.9"
                    stroke="red"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                &#165;{{ baseRates.rates.JPY.toFixed(2) }}
              </dd>
            </div>
            <div>
              <dt class="hero__meta-label">{{ baseRates.base }}/NGN</dt>
              <dd class="hero__meta-value">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.636 18.364L18.364 5.636m0 0h-9.9m9.9 0v9.9"
                    stroke="#0ABF53"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                &#8358;{{ baseRates.rates.NGN.toFixed(2) }}
              </dd>
            </div>
          </dl>
          <div>
            <a class="hero-link" target="_blank" href="https://adyen.com"
              >Learn More
              <svg
                class="icon"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 2L8 6L4 10"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import { format } from 'date-fns';
import { mapGetters } from 'vuex';
import Converter from '../components/Converter';

export default {
  name: 'Home',
  data() {
    return {
      date: new Date(),
    };
  },
  async created() {},
  mounted() {
    this.updateTime = () => {
      this.date = new Date();
    };
    setInterval(this.updateTime, 1000);
  },
  computed: {
    ...mapGetters({ baseRates: 'getBaseRates' }),
  },
  watch: {
    baseRates: {
      handler(value, oldValue) {
        console.log(value, oldValue);
      },
      deep: true
    }
  },
  components: {
    Converter,
  },
  filters: {
    formatDate(date, pattern) {
      return format(date, pattern);
    },
  },
  beforeDestroy() {
    clearInterval(this.updateTime);
  },
};
</script>
