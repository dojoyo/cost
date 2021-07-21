<template>
    <div class="search-area">
        <el-input v-model="search.userName" placeholder="请输入人员姓名" class="mr-10"></el-input>
        <el-date-picker v-model="search.year" type="year" format="yyyy年" value-format="yyyy" placeholder="请选择年份" class="mr-10"></el-date-picker>
        <el-select v-model="search.month" class="mr-10">
            <el-option
                v-for="item in months"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
        </el-select>
        <el-cascader
            ref="department"
            class="mr-10"
            v-model="search.deptId"
            :options="tree"
            :show-all-levels="false"
            :props="{ checkStrictly: true, emitPath: false }"
            clearable></el-cascader>
      <el-button @click="doSearch" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
    </div>
</template>
<script>
export default {
    name: 'commonSearch',
    props: {
        feeMonth: Array,
        deptTree: Array
    },
    data() {
        return {
            months: [],
            tree: [],
            search: {
                userName: '',
                month: '',
                year: new Date().getFullYear() + '',
                deptId: 'all'
            }
        };
    },
    watch: {
        feeMonth: {
            handler(newV) {
                this.months = [{ name: '全部月份', value: '' }].concat(newV);
            },
            deep: true
        },
        deptTree: {
            handler(newV) {
                this.tree = [{ label: '全部部门', value: 'all' }].concat(newV);
            },
            deep: true
        }
    },
    mounted() {
    },
    methods: {
        doSearch() {
            let params = {
                ...this.search
            };
            if (this.search.deptId === 'all') {
                params.deptId = '';
            }
            this.$emit('doSearch', params);
        }
    }
};
</script>
<style lang="scss">
.search-area{
    margin: 15px 15px 0;
    padding: 20px;
    background-color: #fff;
    .el-input{width: 220px;}
    > * {
        margin-bottom: 10px;
    }
}
</style>
