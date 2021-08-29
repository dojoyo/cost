<template>
    <div></div>
</template>
<script>
import api from '@/api/cost';
export default {
    data() {
        return {
            enumType: {},
            deptTree: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            list: [],
            countTotal: ''
        };
    },
    methods: {
        // 分页更改
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageNum = 1;
            this.getList();
        },
        // 换页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        // 获取枚举类
        getEnum(type, isAddAll) {
            return api.getEnum(type).then(res => {
                if (res.code === 200) {
                    if (isAddAll) {
                        res.data.unshift({ name: '全部', value: '' });
                    }
                    this.$set(this.enumType, type, res.data);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        // 获取部门树处理结构
        getDeptTree() {
            return api.getDeptTree().then(res => {
                if (res.code === 200) {
                    let tree = res.data;
                    this.deptTree = this.keepFinding(tree);
                }
            });
        },
        // 递归
        keepFinding(arr) {
            let temp = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].subDepts && arr[i].subDepts.length) { // 当做父级id
                    const children = this.keepFinding(arr[i].subDepts);
                    const obj = {
                        value: arr[i].deptId,
                        label: arr[i].deptName,
                        children: children
                    };
                    temp.push(obj);
                } else {
                    temp.push({
                        value: arr[i].deptId,
                        label: arr[i].deptName
                    });
                }
            }
            return temp;
        },
        //下载模板
        downLoadTempFile(method){
            api[method]().then(res => {
                let headers = res.headers;
                let title = headers['x-file-name'];
                let blob = new Blob([res.data], {
                    type: headers['content-type']
                });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = decodeURIComponent(title);
                link.click();
            });
        },
        // 设置第一列蓝色背景
        firstCellStyle({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
            return { backgroundColor: '#f5f9ff' };
            } else if (columnIndex === 13) {
            return { color: 'black' };
            }
        }
    }
};
</script>
