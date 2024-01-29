<template>
  <q-page class="flex flex-center">
    <q-file type="file" filled v-model="selectedFile" label="Label">
      <template v-slot:prepend>
        <q-icon name="attachment" />
      </template>
    </q-file>
    <q-img :src="`http://localhost:3333/${image}`"></q-img>
    <q-btn
      label="upload image"
      class="full-width"
      color="green"
      @click="send"
    ></q-btn>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const selectedFile = ref();
    const image = ref();
    return {
      selectedFile,
      image,
      send() {
        if (selectedFile.value != null) {
          const formData = new FormData();
          formData.append("image", selectedFile.value);
          try {
            api
              .post("upload/image", formData)
              .then((res) => {
                console.log(res.data);
                image.value = res.data.imageURL;
              })
              .catch((err) => {
                console.error(err);
              });
          } catch (error) {
            console.error(error);
          }
        } else {
          alert("Esta vacio mi pana");
        }
      },
    };
  },
});
</script>
