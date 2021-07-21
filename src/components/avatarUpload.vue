<template>
  <el-upload
    ref="upload"
    :action="BASE_API+url"
    :headers="headers"
    :limit="1"
    :auto-upload="false"
    :show-file-list="false"
    :data="data"
    :accept="accept"
    :on-change="onChangeFile"
  >
    <img :src="avatar" v-if="avatar" style="height: 100px; border: dashed 1px #ccc; border-radius: 7px">
    <img src="@/assets/add.png" v-if="!avatar" style="width: 100px; height: 100px;">
    <div slot="tip" class="el-upload__tip" v-show="tips || accept">{{tips?tips:('仅支持'+accept+'格式')}}</div>
  </el-upload>
</template>
<script>
  export default {
    name: '',
    components: {},
    props: {
      avatar: {
        type: String,
        default() {
          return '';
        }
      },
      url: {
        type: String,
        default() {
          return '/file';
        }
      },
      tag: {
        type: String,
        default() {
          return '';
        }
      },
      accept: {
        type: String,
        default() {
          return '';
        }
      },
      tips: {
        type: String,
        default() {
          return '';
        }
      }
    },
    data() {
      return {
        BASE_API: process.env.BASE_API,
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.user.token
        },
        data: {}
      };
    },
    methods: {
      onChangeFile(file) {
        if (file.response && file.response.code === 200 && file.response.data) {
          this.$emit('UPLOAD_AVATAR', file.response.data)
          this.$refs.upload.clearFiles();
        } else {
          this.$set(this.data, this.tag, file.raw);
          this.$refs.upload.submit();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
