<template>
  <el-dialog
    :visible.sync="visible"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="commerce-dialog"
  >
    <div slot="title" class="header">
      <div class="title">{{ title }}</div>
      <div class="options">
        <i
          class="iconfont icon-guanbi pointer fs-22"
          @click="visible = false"
        ></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-form :model="form" :rules="rules" ref="form" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="年份" required prop="costDate">
            <el-date-picker
              v-model="form.costDate"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" required prop="deptId">
            <el-cascader
              ref="department"
              class="mr-10"
              v-model="form.deptId"
              :options="deptTree"
              :show-all-levels="false"
              :props="{ checkStrictly: true, emitPath: false }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用" required prop="cost">
            <el-input v-model="form.cost" placeholder="请输入费用"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import api from "@/api/cost";
import filters from "@/utils/filters";
export default {
  props: {
    enumType: Object,
    deptTree: Array
  },
  data() {
    return {
      visible: false,
      title: "",
      userOptions: [],
      loading: false,
      form: {
        deptId: "",
        cost: "",
        costDate: "",
        id: "",
        deptName: "",
        remark: ""
      },
      rules: {
        deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
        costDate: [{ required: true, message: "请选择日期", trigger: "change" }],
        cost: [{ required: true, message: "请输入金额", trigger: "blur" }],
      }
    };
  },
  methods: {
    open(query) {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      this.visible = true;
      this.title = query.id ? "编辑" : "新增";
      if (query.id) {
        this.getData(query.id);
      }
    },
    getData(id) {
      api.expenseDetail(id).then(res => {
          if (res.code === 200) {
            this.form = res.data;
            this.form.costDate = filters.DateTimeEn(res.data.costDate);
            console.log(this.form)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const node = this.$refs.department.getCheckedNodes();
          this.form.deptName = node[0].label;
          let method = "addExpenseList";
          if (this.form.id) {
            method = "editExpenseList";
          }
          api[method](this.form)
            .then(res => {
              if (res.code === 200) {
                this.$message.success({ message: "操作成功" });
                this.$parent.$parent.getList();
                this.visible = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        api.getUser({ filter: query }).then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.userOptions = res.data;
          } else {
            this.userOptions = [];
          }
        });
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.commerce-dialog {
  .el-dialog__title {
    line-height: 48px;
    padding-left: 15px;
  }
  .el-input {
    width: 220px;
  }
  .dialog-footer {
    padding: 5px;
    text-align: left;
    padding-left: 115px;
  }
}
</style>