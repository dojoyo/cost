<template>
  <div class="new-target-dialog">
    <el-button type="primary" round size="mini" class="mr-10" @click="showDialog">+新建目标</el-button>
    <!--新建目标-->
    <el-dialog :visible.sync="dialogVisible" width="60%" :show-close="false" top="50px" :close-on-click-modal="false" :close-on-press-escape="false">
      <div slot="title">
        <div class="title">
          <i class="iconfont icon-mubiao_normal"></i> 新建目标
        </div>
        <div class="options">
          <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
        </div>
        <div class="clear"></div>
      </div>
      <div class="dialog-wrap stage-dialog">
        <el-form ref="form" :model="form" label-width="80px">
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
          <div class="plug-wrap fl">
            <div class="title fs-12" style="line-height: 19px">负责人</div>
            <div class="review-wrap w-100p pt-10">


              <div class="short" v-for="(item,index) in form.users" @click="panelVisible=true">
                <div class="close" @click.stop>
                  <i class="iconfont icon-guanbi" @click="removeMember('team',index)"></i>
                </div>
                <avatar :user="item" />
                <!--{{item.short || item.userName.substring(0,2)}}-->
              </div>

              <i class="iconfont icon-tianjia_shixin" @click="panelVisible=true"></i>
              <member-panel
                top="5px"
                left="-275px"
                xKey="team"
                :visible="panelVisible"
                :member="form.users"
                v-on:close="closePanel"
                v-on:setMember="setMember" />
            </div>
          </div>
          <div class="w-100p fl mt-15">
            <span class="tips">关键结果</span>
          </div>
          <div class="w-100p fl key-result-wrap">
            <div class="w-100p" v-for="(item,index) in form.keyResults">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="item.keyResult"></el-input>
                </el-col>
                <el-col :span="6" class="weight">
                  权重:
                  <el-input  placeholder="0" v-model="item.weight" class="weight-input" size="mini" type="number" @input="sumWeight"></el-input>
                  % <i class="iconfont icon-delete pointer" @click="removeKeyResult(index)"></i>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin: 15px 0 15px;">
                <el-col :span="6">
                  <el-switch
                    v-model="item.unitType"
                    active-value="SD"
                    inactive-value="YN"
                    active-text="自定单位"
                    inactive-text="是/否">
                  </el-switch>
                </el-col>
                <el-col :span="18" v-show="item.unitType==='YN'">
                  起始<el-input placeholder="未完成" disabled size="mini" style="width:80px;margin-left:10px; margin-right: 20px"></el-input>
                  起始<el-input placeholder="完成" disabled size="mini" style="width:60px;margin-left:10px"></el-input>
                </el-col>
                <el-col :span="18" v-show="item.unitType==='SD'">
                  单位<el-input placeholder="%" v-model="item.unit" size="mini" style="width:50px;margin-left:10px; margin-right: 20px"></el-input>
                  起始<el-input placeholder="0" v-model="item.startVal" size="mini" style="width:60px;margin-left:10px; margin-right: 5px"></el-input>{{item.unit || '%'}}
                  <span class="ml-10">目标</span><el-input placeholder="100" v-model="item.endVal" size="mini" style="width:60px;margin-left:10px; margin-right: 5px"></el-input>{{item.unit || '%'}}
                </el-col>
              </el-row>
              <el-row style="margin: 15px 0 15px;padding-bottom: 15px; border-bottom: dashed 1px #999">
                <el-col :span="4">关键结果可见用户</el-col>
                <el-col :span="20">
                  <div class="plug-wrap">
                    <div class="review-wrap w-100p">
                      <div class="short" v-for="(user,uInx) in item.users" :class="item.color" @click="item.panelVisible=true">
                        <div class="close" @click.stop>
                          <i class="iconfont icon-guanbi" @click="removeMemberKeyResults(index,uInx)"></i>
                        </div>
                        {{user.short || user.userName.substring(0,2)}}
                      </div>
                      <i class="iconfont icon-add" @click="item.panelVisible=true"></i>
                      <member-panel
                        top="5px"
                        left="-275px"
                        xKey="team"
                        :visible="item.panelVisible"
                        :member="item.users"
                        v-on:close="closePanel"
                      />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="w-100p">
              <el-button type="text" class="fl" @click="addKeyResult">+新增关键结果</el-button>
              <span class="fr" style="line-height: 36px">总权重:{{form.totalWeight}}%</span>
            </div>
          </div>
          <el-form-item class="w-100p fl" style="margin-top: 20px" label="父目标">
            <el-input :readonly="true" @click.native="showParent" :placeholder="form.parent?form.parent.objName:'请选择父目标'" style="width: 90%"></el-input>
            <span class="ml-10 pointer" @click="form.parent=''">清除</span>
          </el-form-item>
          <div class="clear"></div>
          <div class="w-100p">
            <el-button type="primary" size="mini" @click="saveTarget">保存</el-button>
            <el-button type="primary" size="mini" plain @click="saveTarget('draft')">保存为草稿</el-button>
            <el-button type="text" @click="dialogVisible = false">取消</el-button>
          </div>
        </el-form>
      </div>

      <el-dialog :visible.sync="parent.dialogVisible" width="50%" append-to-body :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <div slot="title">
          <div class="title">
            <i class="iconfont icon-setting"></i> 父目标
          </div>
          <div class="options">
            <i class="iconfont icon-guanbi pointer fs-22" @click="parent.dialogVisible=false"></i>
          </div>
          <div class="clear"></div>
        </div>
        <div class="dialog-wrap stage-dialog">

          <el-row :gutter="20">
            <el-col :span="16">
              <el-input
                placeholder="请输入内容"
                v-model="parent.searchKey">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-select v-model="parent.objType" placeholder="目标类型" style="width: 100%">
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
          <el-table v-if="parent.list && parent.list.length>0" :data="parent.list" style="width: 100%; margin-top:20px; "
                    :cell-style="{background:'#fdfdfd',cursor:'pointer'}" :header-cell-style="{background:'#fdfdfd'}"
                    @row-click = "setParent"
          >
            <el-table-column  width="200" label="负责人">
              <template slot-scope="scope">
                {{parent.list[scope.$index].objUser && parent.list[scope.$index].objUser.userName}}
              </template>
            </el-table-column>
            <el-table-column prop="objName" label="目标" width="250"></el-table-column>
            <el-table-column  width="200" label="类型">
              <template slot-scope="scope">
                <span v-show="parent.list[scope.$index].objType==='CP'">公司</span>
                <span v-show="parent.list[scope.$index].objType==='DP'">部门</span>
                <span v-show="parent.list[scope.$index].objType==='PS'">个人</span>
              </template>
            </el-table-column>
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
          <div v-show="parent.list && parent.list.length===0" class="w-100p gray" style="text-align: center;">
            <i class="iconfont icon-empty" style="font-size: 96px"></i>
            <br><span style="font-size: 14px">暂无数据</span><br/><br/>
          </div>

          <div class="clear"></div>
        </div>
      </el-dialog>

    </el-dialog>
  </div>
</template>

<script>
  import memberPanel from '@/components/MemberPanel'
  import api from '@/api/okr'
  // import apiMembers from '@/api/system/members'
  import avatar from '@/components/avatar'
  export default {
    name: 'NewTarget',
    props: {
      stage: Object
    },
    components:{memberPanel, avatar},
    data() {
      return {
        panelVisible:false,
        enumType:{},
        dialogVisible:false,
        form:{
          objType:'',
          users:[],
          keyResults:[{unitType:'YN', weight:0, keyResult:'',users:[],panelVisible:false}],
          parent:'',
          totalWeight:0
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
        }
      }
    },
    watch:{
    },
    created() {
      this.getEnum('ObjectiveType');
      this.getDeptTree();
      this.getList();
    },
    methods: {
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
      //人员选择相关
      closePanel(){
        setTimeout(()=>{
          this.panelVisible = false;
          for(let i in this.form.keyResults){
            this.form.keyResults[i].panelVisible = false;
          }
        })
      },
      setMember(e){
        this.form.users = [e.data[e.data.length-1]];
        this.panelVisible = false;
      },
      removeMember(index){
        this.form.users.splice(index,1)
      },
      removeMemberKeyResults(index,uInx){
        this.form.keyResults[index].users.splice(uInx,1)
      },
      //添加关键结果
      addKeyResult(){
        this.form.keyResults.push({unitType:'YN', weight:0, keyResult:'',users:[],panelVisible:false})
      },
      // 移除关键结果
      removeKeyResult(index){
        if(this.form.keyResults.length===1){
          this.$message.warning({message: '关键结果至少保留1个!', duration: 1500})
        }else {
          this.form.keyResults.splice(index,1)
        }

      },
      //显示对话框
      showDialog(){
        this.dialogVisible = true;
      },
      //获取部门
      getDeptTree() {
        apiMembers.userDeptTree().then(res => {
          if (res.code === 200) {
            // 前端添加级别
            function setLevel(arr,level) {
              for (let i in arr) {
                arr[i].level = level
                if (arr[i].subDepts) {
                  arr[i].subDepts = setLevel(arr[i].subDepts, level + 1);
                }
              }
              return arr
            }
            //todo hardcode部门顶层是创新投资
            let arr = [{
              deptName: '创新投资',
              deptId: 'CGVC',
              isTop: true,
              subDepts: setLevel(res.data,1),
              level:0
            }];
            this.deptList = this.setSelectDept(arr, 0);
          }
        }).catch(err => {
          console.log(err);
        })
      },
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
        this.parent.dialogVisible = true
      },
      //选取父目标
      setParent(e){
        this.form.parent = e;
        this.parent.dialogVisible = false
      },
      sumWeight(){
        let temp =0;
        for(let i in this.form.keyResults){
          temp+=Number(this.form.keyResults[i].weight)
        }
        this.form.totalWeight = temp;
      },
      saveTarget(type){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(this.form.objType ==='DP' && !this.form.deptId){
              this.$message.warning({message: '请选择部门!', duration: 1500})
            }else if(this.form.totalWeight!==100){
              this.$message.warning({message: '关键目标总权重不是100%!', duration: 1500})
            } else {
              for(let i in this.form.keyResults){
                if(!this.form.keyResults[i].keyResult){
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
                objUserId:this.form.users[0]?this.form.users[0].id:'',
                periodId:this.stage.id
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
                        temp += (this.form.keyResults[i].users[j].id+',')
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
                        temp += (this.form.keyResults[i].users[j].id+',')
                      }
                      return temp.length>0?temp.substring(0,temp.length-1):''
                    }
                  )()
                }
              }
              if(type==='draft'){
                api.objAddDraft(params).then(res => {
                  if (res.code === 200) {
                    this.$message.success({message: '保存目标草稿成功!', duration: 1500})
                    this.$emit('newTargetDraft',res.data);
                    this.dialogVisible = false;

                  }
                }).catch(err => {
                  console.log(err);
                })
              }else {
                api.objAdd(params).then(res => {
                  if (res.code === 200) {
                    this.$message.success({message: '新建目标成功!', duration: 1500})
                    this.dialogVisible = false;
                    this.$emit('newTarget',res.data);
                  }
                }).catch(err => {
                  console.log(err);
                })
              }
            }
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .new-target-dialog{
    line-height: 26px;
    margin-top: 16px;
  }
  .plug-wrap{
    position: relative;
    .title{
      line-height: 36px;
      font-size: 14px;
    }
    .title:before{
      content: '';
      border-left: solid 3px #48525C;
      padding-right: 10px;
    }
    .review-wrap{
      display: flex;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-left: 10px;
      .iconfont{font-size: 32px; cursor: pointer}
      .short{
        position: relative;
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
        text-align: center;
        cursor: pointer;
        margin-bottom: 10px;
        .close{
          position: absolute;
          top: -13px;
          right: -3px;
          display: none;
          color: #333;
          z-index: 5;
          .iconfont{
            font-size: 12px;
          }
        }
      }
      .short:hover{
        .close{
          display: block;
        }
      }
    }
  }
  .stage-dialog{
    .tips{
      border-left:solid 3px #48525C; padding-left: 10px
    }
  }
  .key-result-wrap{
    background: #eee; padding: 20px; margin-top: 20px;
    .weight{
      padding-top: 13px; text-align: right;
      .weight-input{
        width: 80px;margin: 0 5px
      }
    }
  }
</style>
