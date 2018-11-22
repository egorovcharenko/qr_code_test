<template>
  <div>
    <ApolloMutation
      :mutation="require('@/graphql/create_new.graphql')"
      @done="onDone"
    >
      <template slot-scope="{ mutate, loading, error }">
        <el-button :disabled="loading" type="primary" @click="mutate()">Create</el-button>
        <p v-if="error">An error occured: {{ error }}</p>
      </template>
    </ApolloMutation>
    
    <div class="containter">
      <img class="qr-img" :style="{ top: y, left: x }" :src="this.qrCode"/>
    </div>

    <ApolloQuery 
        v-if="this.qrCode" 
        :query="require('@/graphql/get_rectangle.graphql')" 
        :variables="{ nodeId: this.rectId }">
      <ApolloSubscribeToMore
        :document="require('@/graphql/subscribe_to_data.graphql')"
        :variables="{ nodeId: this.rectId }"
        :updateQuery="onUpdateOnServer"
      />
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occured: {{error}}</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  data: function() {
    return {
      rectId: null,
      qrCode: null,
      x: 0,
      y: 0
    };
  },
  methods: {
    onUpdateOnServer: function(
      previousResult,
      {
        subscriptionData: {
          data: {
            rectangle: {
              node: { x, y }
            }
          }
        }
      }
    ) {
      this.x = `${x}px`;
      this.y = `${y}px`;
    },
    onDone: async function({ data }) {
      this.rectId = data.createRectangle.id;
      this.qrCode = await QRCode.toDataURL(this.rectId);
    }
  }
};
</script>

<style>
.qr-img {
  position: absolute;
}
.containter {
  position: relative;
}
</style>
