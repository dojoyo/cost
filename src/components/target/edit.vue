<template>
  <el-dialog :visible.sync="dialogVisible" width="850px" :show-close="false" :append-to-body="append" top="50px" class="target-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-mubiao_normal"></i> {{type==='new'?'新建目标':'编辑目标'}}
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="closePanel()"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="目标类型" prop="objType" class="w-50p fl" :rules="{required: true, message: '目标类型'}">
        <el-select v-model="form.objType" placeholder="目标类型" class="w-100p">
          <el-option
            v-for="item in enumType.ObjectiveType"
            :key="item.value"
            :label="item.name"
            :value="item.value">
            <span>{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标周期" class="w-50p fl">
        <el-input v-model="stage.periodName" disabled></el-input>
      </el-form-item>
      <el-form-item v-show="form.objType === 'DP'" class="w-100p fl" label="部门">
        <el-select v-model="form.deptId" placeholder="目标类型" class="w-100p">
          <el-option
            v-for="item in deptList"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId">
            <span :style="{'paddingLeft':(item.level*10)+'px'}">{{ item.deptName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="w-100p fl" label="目标名称" prop="objName" :rules="{required: true, message: '目标名称', trigger: 'blur'}">
        <el-input v-model="form.objName"></el-input>
      </el-form-item>

      <el-form-item label="目标进度" prop="objType" class="w-100p fl" >
        <el-radio-group v-model="form.progressUpdateType">
          <el-radio :label="'AC'">关联更新
            <el-tooltip class="item" effect="dark" content="根据关键结果进度及权重自动计算更新" placement="top">
              <i class="iconfont icon-shuoming"></i>
            </el-tooltip>
          </el-radio>
          <el-radio :label="'MU'">手动更新</el-radio>
        </el-radio-group>

      </el-form-item>


      <div class="row" style="height: 38px">
        <div class="label">负责人&nbsp;</div>
        <div class="flex">
          <div class="avatar" style="" v-for="(item) in form.users" @click="panelVisible=true">
            <!--<span class="close" @click.stop><i class="iconfont icon-guanbi" @click="removeUsers()"></i></span>-->
            <avatar v-if="item" :user="item" />
          </div>
          <div v-show="form.users && form.users.length===0"><i class="iconfont icon-tianjia pointer fs-32" @click="panelVisible=true"></i></div>
        </div>
        <member-panel
          top="56px"
          left="-260px"
          xKey="team"
          :visible="panelVisible"
          :member="form.users"
          v-on:close="closeMembersPanel"
          v-on:setMember="setUsers" />
      </div>

      <div class="row">
        <div class="label">关键结果</div>
        <div class="key-wrap">
          <div class="w-100p" v-for="(item,index) in form.keyResults">
            <el-row :gutter="20">
              <el-col :span="form.progressUpdateType==='AC'?18:23">
                <el-input type="textarea" :rows="2" placeholder="输入关键结果" v-model="item.keyResult" :disabled="!item.canView"></el-input>
              </el-col>
              <el-col class="weight-wrap" :span="5" v-show="form.progressUpdateType==='AC'">
                权重:
                <el-input placeholder="0" v-model="item.weight" type="number" size="mini" @input="sumWeight" :disabled="!item.canView"></el-input>
                %
              </el-col>
              <el-col class="weight-wrap" :span="1">
                <i class="iconfont icon-delete pointer" @click="removeKeyResult(index)"></i>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="unit-wrap">
              <el-col :span="7">
                <el-switch
                  v-model="item.unitType"
                  active-value="SD"
                  inactive-value="YN"
                  active-text="自定单位"
                  inactive-text="是/否"
                  :disabled="!item.canView"
                >
                </el-switch>

                <el-tooltip class="item" effect="dark" content="是/否:仅有完成、未完成2种状态，即进度0%跟100%;  自定义单位:可自定义单位，进度可以手动输入。" placement="top">
                  <i class="iconfont icon-shuoming ml-10"></i>
                </el-tooltip>

              </el-col>
              <el-col :span="17" v-show="item.unitType==='YN'">
                起始<el-input placeholder="未完成" disabled size="mini" class="start-input"></el-input>
                结束<el-input placeholder="完成" disabled size="mini" class="end-input"></el-input>
              </el-col>
              <el-col :span="17" v-show="item.unitType==='SD'">
                单位<el-input placeholder="%" v-model="item.unit" size="mini" class="unit-input"></el-input>
                起始<el-input placeholder="0" v-model="item.startVal" size="mini" class="unit-start-input"></el-input>{{item.unit || '%'}}
                <span class="ml-10">目标</span><el-input placeholder="100" v-model="item.endVal" size="mini" class="unit-end-input"></el-input>{{item.unit || '%'}}
              </el-col>
            </el-row>
            <el-row class="user-wrap">
              <el-col :span="3">
                谁可以看
                <el-tooltip class="item" effect="dark" content="默认全员可见" placement="top">
                  <i class="iconfont icon-shuoming"></i>
                </el-tooltip>
              </el-col>
              <el-col :span="21" class="flex">
                <div class="avatar" v-for="(user,uInx) in item.users" @click="setKeyResultsitemPanelVisible(index)">
                  <span class="close" v-show="item.canView" @click.stop><i class="iconfont icon-guanbi" @click="removeMemberKeyResults(index,uInx)"></i></span>
                  <avatar v-if="user" :user="user" />
                </div>
                <div v-show="item.canView"><i class="iconfont icon-tianjia pointer fs-22" @click="setKeyResultsitemPanelVisible(index)"></i></div>
                <member-panel
                  top="-311px"
                  left="-275px"
                  xKey="users"
                  :visible="item.panelVisible"
                  :member="item.users"
                  v-on:close="closeMembersPanel"
                />
              </el-col>
            </el-row>
          </div>
          <div class="w-100p">
            <el-button type="text" class="fl" @click="addKeyResult">+新增关键结果</el-button>
            <div class="fr" v-show="form.progressUpdateType==='AC'">总权重：<span :class="{'danger':form.totalWeight!==100,'green':form.totalWeight===100}">{{form.totalWeight}}%</span></div>
          </div>
        </div>
      </div>

      <el-form-item class="w-100p fl mt-15" label="父目标">
        <el-input :readonly="true" @click.native="showParent" :placeholder="form.parent?form.parent.objName:'请选择父目标'" style="width: 90%"></el-input>
        <span class="ml-10 pointer" @click="form.parent=''">清除</span>
      </el-form-item>
      <div class="clear"></div>
      <div class="w-100p">
        <el-button type="primary" size="mini" @click="saveTarget('new')" v-show="type==='new'">确认</el-button>
        <el-button type="primary" size="mini" @click="saveTarget('modify')"  v-show="type==='modify' || type==='publish'">保存</el-button>
        <el-button type="primary" size="mini" plain @click="saveTarget('draft')"  v-show="type==='new'">保存为草稿</el-button>
        <el-button type="primary" size="mini" plain @click="saveTarget('communicate')"  v-show="type==='new'">目标沟通</el-button>
        <el-button type="primary" size="mini" @click="saveTarget('publish')" v-show="type==='publish'">发布</el-button>
        <el-button type="text" @click="closePanel">取消</el-button>
      </div>
    </el-form>

    <!--选择父目标-->
    <el-dialog :visible.sync="parent.dialogVisible" width="500" top="50px" append-to-body :show-close="false" class="target-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
      <div slot="title" class="header">
        <div class="title">
          <i class="iconfont icon-mubiao_pressed"></i> 父目标
        </div>
        <div class="options">
          <i class="iconfont icon-guanbi pointer fs-22" @click="parent.dialogVisible=false"></i>
        </div>
        <div class="clear"></div>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input
              @input="getList"
              placeholder="搜索目标名称、负责人"
              v-model="parent.searchKey">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-select v-model="parent.objType" placeholder="目标类型" class="w-100p" @input="getList">
              <el-option
                v-for="item in enumType.ObjectiveType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                <span>{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table v-if="parent.list && parent.list.length>0" :data="parent.list" class="mt-15"
                  :cell-style="{background:'#fff',cursor:'pointer'}" :header-cell-style="{background:'#eee'}"
                  @row-click = "setParent"
        >
          <el-table-column width="160" label="负责人">
            <template slot-scope="scope">
              <div class="flex" style="line-height: 32px" v-if="parent.list[scope.$index].objUser">
                <avatar :user="parent.list[scope.$index].objUser" />&nbsp;&nbsp; {{parent.list[scope.$index].objUser.userName}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="objName" label="目标" width="350"></el-table-column>
          <el-table-column label="类型" prop="objTypeDisplay" ></el-table-column>
        </el-table>
        <el-pagination
          v-if="parent.list && parent.list.length>0"
          style="margin-top: 20px"
          background
          :page-size="parent.pageSize"
          layout="prev, pager, next"
          :total="parent.total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <div v-show="parent.list && parent.list.length===0" class="w-100p gray txt-center">
          <img src="../../assets/no-list.png">
          <br><span style="font-size: 14px">暂无数据</span><br/><br/>
        </div>
        <div class="clear"></div>
      </div>
    </el-dialog>

    <!--沟通选项-->
    <target-communicate :params="communicate" :append="true" v-on:SEND_COMMUNICATE="onCommunicate" />
  </el-dialog>
</template>
<style lang="scss" scoped>

</style>
<script>
  // import api from '@/api/okr'
  // import apiMembers from '@/api/system/members'
  import avatar from '@/components/avatar'
  import memberPanel from '@/components/MemberPanel'
  import dialogPanel from '@/components/DialogPanel'
  import targetCommunicate from '@/components/target/communicate'
  export default {
    name: 'targetEdit',
    props: {
      stage: Object,
      visible: {
        type: Boolean,
        default() {
          return false
        }
      },
      append: {
        type: Boolean,
        default() {
          return false
        }
      },
      type:String,
      id:String,
      detail:Object
    },
    components:{memberPanel, avatar, dialogPanel,targetCommunicate},
    data() {
      return {
        panelVisible:false,
        enumType:{},
        dialogVisible:false,
        form:{
          progressUpdateType:'AC',
          objType:'',
          users:[],
          keyResults:[{
            canView:true,
            unitType:'YN',
            weight:100,
            keyResult:'',
            users:[],
            panelVisible:false,
            progressState:{name:'NM', value:'可控'},
            unit:'%',
            endVal:100,
            startVal:0
          }],
          parent:'',
          totalWeight:100
        },
        deptList:[],
        parent:{
          dialogVisible:false,
          list:'',
          searchKey:'',
          objType:'',
          pageSize:10,
          pageNum:1,
          total:0,
        },
        communicate:{
          users:[],
          panelVisible:false,
          comment:{},
          msg:'',
          dialogVisible:false,
          params:{}
        }
      }
    },
    computed: {
      user(){
        return this.$store.getters.user
      }
    },
    watch:{
      detail(val){
        if(val.objType){
          this.form = val;
          this.sumWeight();
        }else {
          this.form = {
            objType:'',
            progressUpdateType:'AC',
            users:[
              {
                userAvatar:this.user.user.jwtClaims.ua,
                userId:this.user.user.jwtClaims.id,
                userName:this.user.user.jwtClaims.un,
              }
            ],
            keyResults:[
              {
                canView:true,
                unitType:'YN',
                weight:0,
                keyResult:'',
                users:[],
                panelVisible:false,
                progressState:{name:'NM', value:'可控'},
                unit:'%',
                endVal:100,
                startVal:0
              }],
            parent:'',
            totalWeight:0
          }
        }
        this.dialogVisible = true;
      }
    },
    mounted() {
      this.getEnum('ObjectiveType');
      this.getDeptTree();
      this.getList();
      this.form.users = [{
        userAvatar:this.user.user.jwtClaims.ua,
        userId:this.user.user.jwtClaims.id,
        userName:this.user.user.jwtClaims.un,
      }]
    },
    methods: {
      init(){},
      //获取枚举类型
      getEnum(type){
        api.getEnum(type).then(res => {
          if (res.code === 200) {
            this.$set(this.enumType,type,res.data)
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取部门
      getDeptTree() {
        let params={
          withEntRoot:true
        }
        apiMembers.userDeptTree(params).then(res => {
          if (res.code === 200) {
            this.deptList = this.setSelectDept(res.data, 0);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //部门序列化
      setSelectDept(arr, level) {
        let temp = [];
        for (let i in arr) {
          temp.push({deptName: arr[i].deptName, deptId: arr[i].deptId, level: level})
          if (arr[i].subDepts) {
            arr[i].subDepts = this.setSelectDept(arr[i].subDepts, level + 1);
          }
          temp = temp.concat(arr[i].subDepts)
        }
        return temp
      },

      //选择负责人
      setUsers(e){
        if(e.data && e.data.length>0){
          this.form.users = [e.data[e.data.length - 1]];
        }
        this.panelVisible = false;
      },
      //移除负责人
      removeUsers(){
        this.form.users=[]
      },
      //关闭人员选择面板
      closeMembersPanel(){
        setTimeout(()=>{
          this.panelVisible = false;
          for(let i in this.form.keyResults){
            this.$set(this.form.keyResults[i],'panelVisible', false)
          }
        })
      },
      //打开关键结果选择面板
      setKeyResultsitemPanelVisible(index){
        if(this.form.keyResults[index].canView){
          this.$set(this.form.keyResults[index],'panelVisible', true)
        }
      },
      // 移除关键结果可见用户
      removeMemberKeyResults(index,uInx){
        this.form.keyResults[index].users.splice(uInx,1)
      },

      //添加关键结果
      addKeyResult(){
        this.form.keyResults.push({
          canView:true,
          unitType:'YN',
          weight:0,// 100-this.form.totalWeight
          keyResult:'',
          users:[],
          panelVisible:false,
          progressState:{name:'NM', value:'可控'},
          unit:'%',
          endVal:100,
          startVal:0
        })
        this.sumWeight();
      },
      // 移除关键结果
      removeKeyResult(index){
        if(this.form.keyResults.length===1){
          this.$message.warning({message: '关键结果至少保留1个!', duration: 1500})
        }else {
          this.form.keyResults.splice(index,1)
        }
        this.sumWeight();
      },

      //获取父目标
      getList(){
        let params = {
          filter:this.parent.searchKey,
          objType:this.parent.objType,//目标类型  全部、公司、部门、企业
          parentObj:true,
          periodId:this.stage.id,
          pageNum:this.parent.pageNum,
          pageSize:this.parent.pageSize
        }
        api.objQueryPage(params).then(res => {
          if (res.code === 200) {
            this.parent.list = res.data.list;
            this.parent.total = res.data.total
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //列表分页改变
      handleCurrentChange(val) {
        this.parent.pageNum = val;
        this.getList();
      },
      //显示父目标弹框
      showParent(){
        this.getList();
        this.parent.dialogVisible = true
      },
      //选取父目标
      setParent(e){
        console.log(e);
        console.log(this.id)
        if(e.objId!==this.id){
          this.form.parent = e;
          this.parent.dialogVisible = false
        }else {
          this.$message.warning({message: '不能选取为父目标！', duration: 1500})
        }

      },

      sumWeight(){
        let temp =0;
        for(let i in this.form.keyResults){
          temp+=Number(this.form.keyResults[i].weight)
        }
        this.form.totalWeight = temp;
      },

      // 目标保存相关操作
      saveTarget(type){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(this.form.objType ==='DP' && !this.form.deptId){
              this.$message.warning({message: '请选择部门!', duration: 1500})
            }else if(this.form.progressUpdateType === 'AC' && this.form.totalWeight!==100){
              this.$message.warning({message: '关键结果总权重须等于100%', duration: 1500})
            } else {
              for(let i in this.form.keyResults){
                if(this.form.keyResults[i].canView && !this.form.keyResults[i].keyResult){
                  this.$message.warning({message: '关键目标不能为空!', duration: 1500})
                  return
                }
                if(this.form.keyResults[i].unitType==='SD' && (this.form.keyResults[i].startVal<0 || !this.form.keyResults[i].endVal || !this.form.keyResults[i].unit)){
                  this.$message.warning({message: '关键目标自定义单位填写不规范!', duration: 1500})
                  return
                }
              }
              let params = {
                deptId:this.form.objType==='DP'?this.form.deptId:'',
                objName:this.form.objName,
                objParentId:this.form.parent?this.form.parent.objId:'',
                objType:this.form.objType,
                objUserId:this.form.users[0]?(this.form.users[0].id || this.form.users[0].userId):'',
                periodId:this.stage.id,
                progressUpdateType:this.form.progressUpdateType
              }

              for(let i in this.form.keyResults){
                if(this.form.keyResults[i].unitType==='YN'){
                  params['keyResults['+i+'].keyResult'] = this.form.keyResults[i].keyResult;
                  params['keyResults['+i+'].unitType'] = this.form.keyResults[i].unitType;
                  params['keyResults['+i+'].weight'] = Number(this.form.keyResults[i].weight);
                  params['keyResults['+i+'].startVal'] = 0;
                  params['keyResults['+i+'].endVal'] = 100;
                  params['keyResults['+i+'].unit'] = '';
                  params['keyResults['+i+'].userIds'] = (()=>{
                      let temp='';
                      for(let j in this.form.keyResults[i].users){
                        let id =this.form.keyResults[i].users[j].id || this.form.keyResults[i].users[j].userId
                        if(id!=='-1'){
                          temp += (id+',')
                        }
                      }
                      return temp.length>0?temp.substring(0,temp.length-1):''
                    }
                  )()
                }else {
                  params['keyResults['+i+'].keyResult'] = this.form.keyResults[i].keyResult;
                  params['keyResults['+i+'].unitType'] = this.form.keyResults[i].unitType;
                  params['keyResults['+i+'].weight'] = Number(this.form.keyResults[i].weight);
                  params['keyResults['+i+'].startVal'] = Number(this.form.keyResults[i].startVal);
                  params['keyResults['+i+'].endVal'] = Number(this.form.keyResults[i].endVal);
                  params['keyResults['+i+'].unit'] = this.form.keyResults[i].unit;
                  params['keyResults['+i+'].userIds'] = (()=>{
                      let temp='';
                      for(let j in this.form.keyResults[i].users){
                        let id =this.form.keyResults[i].users[j].id || this.form.keyResults[i].users[j].userId
                        if(id!=='-1'){
                          temp += (id+',')
                        }
                      }
                      return temp.length>0?temp.substring(0,temp.length-1):''
                    }
                  )()
                }
                if(this.type==='modify'){
                  params['keyResults['+i+'].keyResultId'] = this.form.keyResults[i].keyResultId
                }
              }

              if(type==='draft'){//草稿保存
                api.objAddDraft(params).then(res => {
                  if (res.code === 200) {
                    this.$message.success({message: '保存目标草稿成功!', duration: 1500})
                    this.targetEdit();
                  }
                }).catch(err => {
                  console.log(err);
                })
              }else if (type==='communicate'){//沟通保存
                this.communicate = {
                  users:[],
                  panelVisible:false,
                  comment:{},
                  dialogVisible:true,
                  params:params,
                  type:'communicate',
                };
              }else if(type==='new') {//目标新建
                api.objAdd(params).then(res => {
                  if (res.code === 200) {
                    this.$message.success({message: '新建目标成功!', duration: 1500})
                    this.targetEdit();
                    /*
                    this.$confirm('新建目标成功，是否要发系统消息通知他人?', '提示', {
                      confirmButtonText: '是',
                      cancelButtonText: '否',
                      type: 'warning'
                    }).then(() => {//进行通知
                      this.communicate = {
                          users:[],
                          panelVisible:false,
                          comment:{},
                          dialogVisible:true,
                          params:{},
                          type:'new',
                          id:res.data.objId,
                          messageType:res.data.messageType.value,
                          activities:res.data.activities
                      };
                    }).catch(err => {
                      this.targetEdit();
                    });
                    */
                  }
                }).catch(err => {
                  console.log(err);
                })
              }else if(type==='modify'){//目标修改
                api.objEdit(params, this.id).then(res => {
                  if (res.code === 200) {
                    this.$message.success({message: '目标修改成功!', duration: 1500});
                    this.targetEdit();
                  }
                }).catch(err => {
                  console.log(err);
                })
              }else if(type==='publish'){//草稿发布
                api.objEdit(params, this.id).then(res => {
                  if (res.code === 200) {
                    this.publish();
                  }
                }).catch(err => {
                  console.log(err);
                })
              }
            }
          }
        });
      },

      //草稿发布
      publish(){
        api.objPublish(this.id).then(res => {
          if (res.code === 200) {
            this.$confirm('草稿发布成功!是否要发系统消息通知他人?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {//进行通知
              this.communicate = {
                users:[],
                panelVisible:false,
                comment:{},
                dialogVisible:true,
                params:{},
                type:'new',
                id:this.id,
                messageType:res.data.messageType.value,
                activities:res.data.activities
              };
            }).catch(err => {
              this.targetEdit();
            });
          }
        }).catch(err => {
          console.log(err);
        })
      },

      closePanel(){
        this.dialogVisible = false;
        //this.$emit('closeTargetPanel');
      },

      onCommunicate(){
        this.dialogVisible = false;
        this.$emit('modifyTarget');
      },

      targetEdit(){
        this.dialogVisible = false;
        this.$emit('TARGET_EDIT');
      }
    }
  }
</script>


