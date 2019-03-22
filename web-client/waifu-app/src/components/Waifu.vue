<template>
  <v-layout class="card">
    <v-flex >
      <v-card>
        <v-img
          :src="image"
          aspect-ratio="1"
          position="top top"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{name}}</h3>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      name: this.$attrs.character.characterName,
      image: this.$attrs.character.imageAsBase64String
    };
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.25s;
}

.card:hover {
  transform: scale(1.1);
  cursor: pointer;
  border: 1px solid black;
}
</style>
