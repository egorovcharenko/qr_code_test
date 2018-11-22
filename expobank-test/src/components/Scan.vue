<template>
  <div>
    <div v-if="!rectId">
      <p class="error">{{ error }}</p>
      <p class="decode-result">Last result: <b>{{ result }}</b></p>
      <div style="width: 100px; height: 100px">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
    </div>
    <div v-if="rectId">
      <ApolloMutation
        :mutation="require('@/graphql/change_coords.graphql')"
        :variables="{ nodeId: this.rectId, x: this.x, y: this.y }">
        <p v-if="error">An error occured: {{ error }}</p>
        <template slot-scope="{ mutate, loading, error }">
          <el-button-group>
            <el-button type="primary" :disabled="loading" icon="el-icon-arrow-left" @click="left(mutate)">Move left</el-button>
            <el-button type="primary" :disabled="loading" @click="right(mutate)">Move right<i class="el-icon-arrow-right el-icon-right"></i></el-button>
          </el-button-group>
        </template>
      </ApolloMutation>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
      error: null,
      x: 0,
      y: 0,
      rectId: null
    };
  },
  methods: {
    left(mutate) {
      this.x -= 5;
      mutate();
    },
    right(mutate) {
      this.x += 5;
      mutate();
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else {
          console.log(error);
        }
      }
    },
    onDecode(result) {
      console.log(result);
      this.rectId = result;
    },

    logErrors(promise) {
      promise.catch(console.error);
    },
  }
};
</script>

<style>
.error {
  font-weight: bold;
  color: red;
}
</style>

