const noop = Promise.resolve([]);

export const listMixin = {
  data() {
    return {
      list: [],
      searchKey: "",
      pageSize: 10,
      pageNum: 1,
      total: 0,
      status: "PE",
      lastStatus: "",
      showDialog: false,
      approvalId: "",
      methodMap: {
        PE: noop,
        FN: noop,
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // TODO: 将切换请求方法的逻辑移到组件中
    // fetch() {
    //   return noop;
    // },
    toggle(type) {
      if (type && this.status !== type) {
        this.status = type;
        this.initPageParams();
        this.fetch();
      }
    },
    fetch() {
      if (this.callbackMap && this.callbackMap[this.status]) {
        this.callbackMap[this.status]({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          filter: this.searchKey,
        }).then((res) => {
          if (res.success) {
            this.list = this.listFormatter(res.data.list);
            this.total = res.data.total;
          } else {
            this.list = [];
            this.total = 0;
          }
        });
      }
    },
    listFormatter: (list) => list,
    search(key) {
      this.searchKey = key;
      this.fetch();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.fetch();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetch();
    },
    showDetail(row) {
      this.approvalId = row.approvalId;
      this.showDialog = true;
    },
    initPageParams() {
      this.pageNum = 1;
      this.searchKsy = "";
    },
  },
};
