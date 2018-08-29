<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md6 :style="baseStyle" red accent-2>
      <v-layout align-space-around justify-space-around fill-height column>
        <v-layout>
          <v-flex offset-xs2 xs3 mt-2>
            <v-text-field type="number" v-model="taxRate" label="Tax Rate (%)"></v-text-field>
          </v-flex>
          <v-flex offset-xs2 xs3 mt-2>
            <v-autocomplete
              :items="currencies"
              v-model="base"
              label="Base Currency"
              outline
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex offset-xs2 xs8>
            <v-text-field type="number" v-model="amount" :label="`Amount in ${base} w/o tax`">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex></v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm12 md6 :style="toStyle" blue accent-2>
      <v-layout align-space-around justify-space-around fill-height column>
        <v-layout>
          <v-flex offset-xs2 xs3 mt-2>
            <v-label>Exchange rate is: {{exRate}}</v-label>
          </v-flex>
          <v-flex offset-xs2 xs3 mt-2>
            <v-autocomplete
              :items="currencies"
              v-model="to"
              label="Converted Currency"
              outline
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <h1>{{result || ""}}</h1>
        </v-layout>
        <v-layout>
          <v-flex></v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
const json = require('../test.json');

export default {
  name: 'converter',
  data() {
    return {
      base: 'CAD',
      to: 'CNY',
      amount: 100,
      taxRate: 12,
      exTable: json,
    };
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm': return '50vh';
        default: return '100vh';
      }
    },
    baseStyle() {
      return `height: ${this.height};`;
    },
    toStyle() {
      return `height: ${this.height};`;
    },
    exRate() {
      if (this.base === 'EUR' && this.to === 'EUR') {
        return 1;
      } else if (this.base === 'EUR') {
        return this.exTable[this.to];
      } else if (this.to === 'EUR') {
        return 1 / this.exTable[this.base];
      }
      return this.exTable[this.to] / this.exTable[this.base];
    },
    result() {
      return this.round(this.amount * this.exRate * ((this.taxRate / 100) + 1));
    },
    currencies() {
      return Object.keys(this.exTable).concat(['EUR']).sort();
    },
  },
  methods: {
    round(input) {
      return Math.round(input * 100) / 100;
    },
  },
  beforeMount() {
    fetch('api').then(res => res.json()).then((table) => {
      this.exTable = table;
    }).catch((err) => {
      console.log(err);
    });
  },
};
</script>

<style lang="stylus" scoped>
</style>
