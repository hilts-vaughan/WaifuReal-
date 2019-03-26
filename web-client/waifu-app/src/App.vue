<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Waifu</span>
        <span class="font-weight-light">Real?</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="total" class="mr-2">Average: {{(correct / total) * 100}}%</span>
      <v-btn
        flat
        href="https://vaughanhilts.me/"
        target="_blank"
      >
        <span class="mr-2">About</span>
      </v-btn>
      
    </v-toolbar>

    <v-content>
        <v-container fill-height>
          <v-layout v-if="waifus.right" row wrap offset-sm1 align-center>
            <v-flex xs12 sm5 offset-sm1 class="my-2">
              <Waifu v-bind:character="waifus.left" v-if="waifus.left" @click.native="onClickWaifu('left')"></Waifu>
            </v-flex>
            <v-flex v-if="waifus.right" xs12 sm5 offset-sm1 class="my-2">
              <Waifu v-bind:character="waifus.right" @click.native="onClickWaifu('right')"></Waifu>
            </v-flex>
         </v-layout>

         <v-layout v-if="!waifus.right" row align-center>
            <v-flex v-if="!waifus.right && !waifus.left" class="text-xs-center">
              <v-progress-circular
                  :size="150"
                  color="white"
                  indeterminate
                ></v-progress-circular>
            </v-flex>
         </v-layout>
        </v-container>  
    </v-content>
  </v-app>
</template>

<script>
import Waifu from './components/Waifu';
import Explanation from './components/Explanation';

const showMessage = (app, message) => {
  app.snackbar = true;
  app.text = message;
};

const getWaifus = app => {
  return fetch(`${process.env.VUE_APP_API_SERVER}/random`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      const index = Math.floor((Math.random() * 100) % 2);
      if (index === 0) {
        app.correctDirection = 'left';
        app.waifus.left = json.realCharacter;
        app.waifus.right = json.fakeCharacter;
      } else {
        app.correctDirection = 'right';
        app.waifus.right = json.realCharacter;
        app.waifus.left = json.fakeCharacter;
      }
    })
    .catch(() => {
      console.error('Looks like there is a problem contacting the Waifu service.');
      showMessage(app, 'Something went wrong! Could not contact the waifu server.');
    });
};

export default {
  name: 'App',
  components: {
    Waifu,
    Explanation
  },
  mounted: function() {
    getWaifus(this);
  },
  methods: {
    onClickWaifu: function(direction) {
      if (this.correctDirection === direction) {
        showMessage(this, 'Correct! Getting a new match up...');
        this.correct++;
      } else {
        showMessage(this, 'Wrong! Getting a new match up...');
      }

      this.total++;

      // remove them, so the loader will come up again
      this.waifus.left = null;
      this.waifus.right = null;

      getWaifus(this);
    }
  },
  data() {
    return {
      waifus: {
        left: null,
        right: null
      },
      correct: 0,
      total: 0,
      correctDirection: null,
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 3000,

      // Change this to something if you need something something to happen when you answer
      text: 'Hello! Click the one you believe to be correct.'
    };
  }
};
</script>
