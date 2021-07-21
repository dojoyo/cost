<template>
	<div class="users-wrap">
		<div
			:class="{'step':step,'last':index===users.length-1}"
			:key="index"
			class="avatar"
			v-for="(item,index) in users"
		>
			<span
				@click.stop
				class="close"
			>
				<i
					@click="removeUser(index)"
					class="iconfont icon-guanbi"
					v-show="edit"
				></i>
			</span>
			<el-tooltip
				:content="item.userName"
				effect="dark"
				placement="top"
			>
				<avatar :user="item" />
			</el-tooltip>
			<div
				style="line-height: 16px; padding-top: 8px"
				v-if="tags"
			>{{item.userTag || item.userName}}</div>
			<!--style="width: 45px; white-space: normal; line-height: 14px; padding-top: 10px"-->
			<div class="line"></div>
		</div>
		<div v-show="edit">
			<i
				@click="showMemberTransfer('transfer')"
				class="iconfont icon-tianjia pointer fs-22"
			></i>
		</div>
		<members-transfer
			:multi="multi"
			:role="role"
			:step="step"
			:users="users"
      :invest="invest"
			@SAVE_USERS="setUsers"
			ref="transfer"
		/>
	</div>
</template>
<script>
import avatar from "@/components/avatar";
import membersTransfer from "@/components/MemberTransfer";

export default {
  components: { avatar, membersTransfer },
  model: {
    prop: "users",
    event: "change"
  },
  props: {
    users: Array,
    step: {
      type: Boolean,
      default() {
        return false;
      }
    },
    edit: {
      type: Boolean,
      default() {
        return true;
      }
    },
    multi: {
      type: Boolean,
      default() {
        return true;
      }
    },
    placement: {
      type: String,
      default() {
        return "top";
      }
    },
    role: {
      type: Boolean,
      default() {
        return false;
      }
    },
    tags: {
      type: Boolean,
      default() {
        return false;
      }
    },
    invest: { // 是否跟投人员
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    setUsers(e) {
      this.$emit("change", e);
      this.$emit("SET_USERS", e);
    },
    showMemberTransfer(type) {
      this.$refs["" + type].show();
    },
    removeUser(index) {
      let list = this.users;
      list.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.users-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .avatar {
    width: 50px;
    margin-bottom: 15px;
    position: relative;

    .close {
      position: absolute;
      top: -15px;
      left: 28px;
      cursor: pointer;
      display: none;
    }

    .line {
      display: none;
    }

    .line:before {
      content: "";
      width: 80px;
      border-bottom: dotted 1px #c4c4c4;
      position: absolute;
      top: 15px;
      left: 35px;
    }

    .line:after {
      content: "";
      width: 8px;
      height: 8px;
      position: absolute;
      top: 9px;
      left: 117px;
      border: solid 2px #aaa;
      background: #ddd;
      border-radius: 50%;
    }
  }

  .avatar:hover {
    .close {
      display: block;
    }
  }

  .avatar.step {
    width: 140px;

    .line {
      display: block;
    }
  }

  .avatar.step.last {
    width: 50px;

    .line {
      display: none;
    }
  }
}
</style>
