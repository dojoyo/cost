<template>
	<div :style="{width:user.size?(user.size+'px'):'32px', height:user.size?(user.size+'px'):'32px'}">
		<img
			:src="avatarUrl"
			:style="{width:user.size?(user.size+'px'):'32px', height:user.size?(user.size+'px'):'32px'}"
			class="avatar-img"
			v-if="avatarUrl && avatar"
		/>
		<div
			:style="{width:user.size?(user.size+'px'):'32px', height:user.size?(user.size+'px'):'32px',lineHeight:user.size?(user.size+'px'):'32px',background:setColor(user.userName)}"
			class="avatar-name"
			v-if="!avatarUrl || !avatar"
		>{{user.userName | name}}</div>
	</div>
</template>
<script>
import vPinyin from "@/utils/vue-py.js";

export default {
  name: "Avatar",
  components: {},
  props: {
    user: Object,
    avatar: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      baseAPI: process.env.BASE_API,
      color: {
        A: "#007bff",
        B: "#6610f2",
        C: "#6f42c1",
        D: "#e83e8c",
        E: "#dc3545",
        F: "#fd7e14",
        G: "#ffc107",
        H: "#28a745",
        I: "#20c997",
        J: "#17a2b8",
        K: "#888",
        L: "#22d7bb",
        N: "#ffc442",
        M: "#ff5b57",
        O: "#007bff",
        P: "#6610f2",
        Q: "#6f42c1",
        R: "#e83e8c",
        S: "#dc3545",
        T: "#fd7e14",
        U: "#ffc107",
        V: "#28a745",
        W: "#20c997",
        X: "#17a2b8",
        Y: "#888",
        Z: "#22d7bb"
      }
    };
  },
  computed: {
    avatarUrl: function() {
      let preFix = process.env.BASE_API==='https://api.cgvcap.com'?'https://oss.cgvcap.com':'https://dev-oss.cgvcap.com';
      let str = this.user.userAvatar ? (this.user.userAvatar.startsWith("data:image") ? this.user.userAvatar : (this.user.userAvatar + "/38")): "";
      str = str?(str.indexOf('https')>-1?str:preFix+str):''
      return str
    }
  },
  watch: {},
  created() {},
  methods: {
    setColor(value) {
      return this.color[vPinyin.chineseToPinYin(value[0])[0].toUpperCase()];
    }
  },
  filters: {
    name: function(value) {
      var reg = /^[\u4E00-\u9FA5]+$/;
      if (!reg.test(value[0])) {
        //英文开头
        return value;
      } else {
        if (value.length < 3) {
          return value;
        } else {
          return value.substring(value.length - 2, value.length);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-name {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  background: #aaa;
}

.avatar-img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
}
</style>
