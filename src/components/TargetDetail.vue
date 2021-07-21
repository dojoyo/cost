<template>
  <el-dialog :visible.sync="visible" width="900px" top="50px" :show-close="false" :before-close="closeDialog" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title">
      <div class="title" style="margin-top: 3px; font-size: 16px">
        <i class="iconfont icon-fenlei primary"></i> {{target.period && target.period.periodName}}
      </div>
      <div class="options">
        <el-tooltip class="item" effect="dark" content="编辑项目" placement="top" v-show="target.privileges && target.privileges.editObj">
          <i class="iconfont icon-bianji pointer fs-22 mr-10" @click="editTarget()"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="结束项目" placement="top"  v-show="target.privileges && target.privileges.closeObj">
          <i class="iconfont icon-guanbi1 pointer fs-22 mr-10" @click="getScoreInfo()"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除项目" placement="top" v-show="target.privileges && target.privileges.deleteObj">
          <i class="iconfont icon-delete pointer fs-22 mr-10" @click="deleteTarget()"></i>
        </el-tooltip>
        <i class="iconfont icon-guanbi pointer fs-22" @click="closeDialog()"></i>
      </div>
      <div class="clear"></div>
    </div>
    <div class="dialog-wrap">
      <el-row v-if="target.objParent">
        <el-col :span="4"><i class="iconfont mubiao_pressed"></i>父目标:{{target.objParent && target.objParent.objName}}</el-col>
        <el-col :span="3"><el-progress :percentage="target.objParent?target.objParent.objProgress.progress:0" :color="progressColor[target.objParent.objProgress.progressState.value]"></el-progress></el-col>
      </el-row>
      <el-row class="mt-15">
        <el-col :span="15">
          <div>
            <i class="iconfont icon-mubiao_normal"></i><span class="fs-22 gray-dark">{{target.objName}}</span>
            <br/><span class="fs-14 gray">
            目标类型：{{target.objTypeDisplay}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            截止时间：{{target.period && target.period.periodEnd}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            更新时间：{{target.progressUpdateTime | time}} </span>
            <el-progress v-if="target.objProgress" :percentage="target.objProgress?target.objProgress.progress:0" :color="progressColor[target.objProgress.progressState.value]"></el-progress>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div>
            <i class="iconfont icon-fuzeren"></i><span class="fs-14 gray">创建人</span><br/>
          </div>
          <div style="display: flex;">
            <avatar :user="target.objUser"  />
            <div class="fs-14 gray" style="padding:5px 0 0 5px">{{target.objUser && target.objUser.userName}}</div>
          </div>
        </el-col>

        <el-col :span="3">
          <div>
            <i class="iconfont icon-pingfen"></i><span class="fs-14 gray">评分</span><br/>
            <span class="fs-14 gray pl-10">{{target.scores && target.scores.score || '--'}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="mt-15">
        <el-col :span="24"><i class="iconfont icon-guanjianjiedian"></i>关键结果</el-col>
      </el-row>
      <el-row class="mt-15" style="line-height: 28px; padding-bottom: 15px; border-bottom: solid 1px #ddd" v-for="(item,index) in target.keyResults">
        <el-col :span="16">
          <el-progress :type="'circle'" :percentage="item.progress || 0" :width="60" :color="progressColor[item.progressState.value]" style="float: left"></el-progress>
          <div style="margin-left: 15px; float: left">
            {{item.keyResult || '********'}}[权重{{item.weight}}%]<br/>
            <span class="pr-10">当前进度:</span><el-input size="mini" style="width:150px" v-model="item.progressTxt" :disabled="!item.canView" @input="setProgress(index)"></el-input>
          </div>
        </el-col>
        <el-col :span="8" style="text-align: right">
          状态{{item.canView?'':'  ********'}}
          <el-radio-group v-if="item.canView" v-model="item.progressState.value" style="margin-left: 10px">
            <el-radio v-for="radio in enumType.ProgressState" :label="radio.value" :class="radio.value"
            >{{radio.name}}
            </el-radio>
          </el-radio-group>
          <br/>
          <el-button type="text" @click="showScoreRule(index)" :disabled="!item.canView">设置打分规则</el-button>
        </el-col>
      </el-row>
      <el-row class="mt-15">
        <el-col :span="24">
          <dialog-panel :comment="comment"  v-on:setComment="setComment"/>
          <el-button type="primary" size="mini" round style="margin-top: 10px" @click="updateProgress" :disabled="target.privileges && !target.privileges.updateProgress">更新进度</el-button>
        </el-col>
      </el-row>
      <el-row class="mt-15">
        <el-col :span="24"><i class="iconfont icon-fuzeren"></i>参与人</el-col>
      </el-row>
      <el-row class="mt-15">
        <el-col :span="24">
          <div class="review-wrap w-100p">
            <div class="short" v-for="(item,index) in target.objMembers" @click="objMembersPanel=true">
              <div class="close" @click.stop>
                <i class="iconfont icon-guanbi" @click="removeObjMembersMember(index)"></i>
              </div>
              <avatar :user="item"/>
              <!--{{item.short || item.userName.substring(0,2)}}-->
            </div>
            <i class="iconfont icon-tianjia_shixin" @click="objMembersPanel=true"></i>
            <member-panel
              top="-335px"
              left="0px"
              xKey="team"
              :visible="objMembersPanel"
              :member="target.objMembers"
              v-on:close="closeObjMembersPanel"
              v-on:setMember="setObjMembersMember" />
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 15px">
        <el-col :span="24">
          <span style="padding-right: 20px" class="fs-14 pointer" @click="view='comment'"><i class="iconfont icon-pinglun"></i>评论</span>
          <span style="padding-right: 20px" class="fs-14 pointer" @click="view='history'"><i class="iconfont icon-jindulishi"></i>进度历史</span>
          <span  class="fs-14 pointer" @click="view='activity'"><i class="iconfont icon-huodong"></i>活动</span>
          <like class="fr" :id="target.objId" :type="'obj'" />
        </el-col>
      </el-row>

      <el-row style="margin-top: 15px" v-show="view==='comment'">
        <el-col :span="22" :offset="1">
          <el-row v-for="item in msgList" style="margin-top: 10px; padding-bottom: 10px; border-bottom: solid 1px #ddd">
            <el-col :span="1">
              <avatar :user="item.commentUser" />
            </el-col>
            <el-col :span="23" style="padding-left: 10px">
              <div>{{item.commentUser.userName}} {{item.commentTime | DateTime}}</div>
              <div>{{item.content}}</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px"  v-show="view==='history'">
        <el-col :span="22" :offset="1">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in history"
              placement="top"
              :key="index"
              :timestamp="item.updateTime">

              <div v-show="item.progressType.value==='C'">
                {{item.progressType.name}}
              </div>
              <div v-show="item.progressType.value!=='C'">
                目标进度:{{item.progress.objProgress}}%
                <span v-show="item.progress.objProgressDiff!==0" :class="{'danger':item.progress.objProgressDiff<0,'success':item.progress.objProgressDiff>0}">
                  <i class="iconfont fs-12" :class="{'icon-xiajiang danger':item.progress.objProgressDiff<0,'icon-shangsheng success':item.progress.objProgressDiff>0}"></i>
                  {{item.progress.objProgressDiff}}%
                </span>
                <br/>
                <span v-show="item.progress.keyResultProgresses.length>0">
                  关键结果：
                  <span v-for="keyResult in item.progress.keyResultProgresses">
                    {{keyResult.keyResult}}:{{keyResult.progress}}%
                    <span v-show="keyResult.progressDiff!==0" :class="{'danger':keyResult.progressDiff<0,'success':keyResult.progressDiff>0}">
                     <i class="iconfont fs-12" :class="{'icon-xiajiang danger':keyResult.progressDiff<0,'icon-shangsheng success':keyResult.progressDiff>0}"></i>
                    {{keyResult.progressDiff}}%  &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                </span>
                <br/>
                <div style="background: #eee;padding: 5px; margin-top: 5px" v-show="item.comment.content">
                  {{item.updateUser.userName}}:{{item.comment.content}}
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px"  v-show="view==='activity'">
        <el-col :span="22" :offset="1">
          <activity :id="target.objId" :type="'obj'" />
        </el-col>
      </el-row>
    </div>
    <div slot="footer">
      <el-row style="padding: 15px">
        <el-col :span="1">
          <div class="round-title">
            <avatar v-if="userInfo" :user="userInfo" />
          </div>
        </el-col>
        <el-col :span="20" :offset="1" style="text-align: left">
          <dialog-panel :comment="comment" v-on:setComment="setMsg"/>
          <!--<el-input v-model="msg" placeholder="评论内容Enter发送" @keyup.enter.native="sendMsg"></el-input>-->
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="sendMsg">评论</el-button>
        </el-col>
      </el-row>
    </div>

    <!--设置规则打分-->
    <el-dialog :visible.sync="scoreRule.dialogVisible" width="50%" :show-close="false" append-to-body top="50px">
      <div slot="title">
        <div class="title">
          <i class="iconfont icon-mubiao_normal primary"></i> 设置打分规则
        </div>
        <div class="options">
          <i class="iconfont icon-guanbi pointer fs-22" @click="scoreRule.dialogVisible=false"></i>
        </div>
        <div class="clear"></div>
      </div>
      <div class="dialog-wrap table-wrap">
        <el-row style="border-top:solid 1px #ddd;">
          <el-col :span="4" class="gray-block">目标名称</el-col>
          <el-col :span="10">{{target.objName}}</el-col>
          <el-col :span="4" class="gray-block">目标负责人</el-col>
          <el-col :span="6" style="padding: 7px; display: flex; align-items: center">
            <span class="round-title">
              <avatar :user="target.objUser" />
            </span>
            <span class="fs-14 gray pl-10">{{target.objUser && target.objUser.userName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="gray-block">关键结果</el-col>
          <el-col :span="20">{{scoreRule.keyResult.keyResult}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="gray-block">起始数值</el-col>
          <el-col :span="8">{{scoreRule.keyResult.startVal}}{{scoreRule.keyResult.unit}}</el-col>
          <el-col :span="4" class="gray-block">目标数值</el-col>
          <el-col :span="8">{{scoreRule.keyResult.endVal}}{{scoreRule.keyResult.unit}}</el-col>
        </el-row>
        <el-form ref="form" :model="scoreRule.form" label-width="80px" style="margin-top: 20px">
          <el-form-item label="30分标准" >
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scoreRule.form.criterion30"></el-input>
          </el-form-item>

          <el-form-item label="70分标准" >
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scoreRule.form.criterion70"></el-input>
          </el-form-item>

          <el-form-item label="100分标准" >
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scoreRule.form.criterion100"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="mini" @click="saveScoreRule">保存</el-button>
            <el-button size="mini" @click="scoreRule.dialogVisible=false">取消</el-button>
            <el-button type='text' @click="clearScoreRule">清空</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>
    <!--修改目标-->
    <el-dialog :visible.sync="dialogVisible" width="60%" :show-close="false" append-to-body top="50px">
      <div slot="title">
        <div class="title">
          <i class="iconfont icon-bianji"></i> 修改目标
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
            <el-input v-model="target.period && target.period.periodName" disabled></el-input>
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
                  <el-input  type="textarea" :rows="2" placeholder="请输入内容" v-model="item.keyResult" :disabled="item.canView===false"></el-input>
                </el-col>
                <el-col :span="6" class="weight">
                  权重:
                  <el-input  placeholder="0" v-model="item.weight" :disabled="item.canView===false" class="weight-input" size="mini" type="number" @input="sumWeight"></el-input>
                  % <i class="iconfont icon-delete pointer" @click="removeKeyResult(index)"></i>
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin: 15px 0 15px;">
                <el-col :span="6">
                  <el-switch
                    style="margin-top: 5px"
                    :disabled="item.canView===false"
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
                  单位<el-input placeholder="%" v-model="item.unit" :disabled="item.canView===false" size="mini" style="width:50px;margin-left:10px; margin-right: 20px"></el-input>
                  起始<el-input placeholder="0" v-model="item.startVal" :disabled="item.canView===false" size="mini" style="width:60px;margin-left:10px; margin-right: 5px"></el-input>{{item.unit || '%'}}
                  <span class="ml-10">目标</span><el-input placeholder="100" v-model="item.endVal" :disabled="item.canView===false" size="mini" style="width:60px;margin-left:10px; margin-right: 5px"></el-input>{{item.unit || '%'}}
                </el-col>
              </el-row>
              <el-row style="margin: 15px 0 15px;padding-bottom: 15px; border-bottom: dashed 1px #999">
                <el-col :span="4">关键结果可见用户</el-col>
                <el-col :span="20">
                  <div class="plug-wrap">
                    <div class="review-wrap w-100p">
                      <div class="short" v-for="(user,uInx) in item.users" @click="showPanel(index)">
                        <div class="close" @click.stop>
                          <i class="iconfont icon-guanbi" v-show="item.canView" @click="removeMemberKeyResults(index,uInx)"></i>
                        </div>
                        <avatar :user="user" />
                      </div>
                      <i class="iconfont icon-tianjia_shixin" @click="showPanel(index)"></i>
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
            <el-button type="primary" size="mini" @click="saveTarget">确定</el-button>
            <el-button size="mini"  @click="dialogVisible = false">取消</el-button>
          </div>
        </el-form>
      </div>

      <el-dialog :visible.sync="parent.dialogVisible" width="50%" append-to-body :show-close="false">
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
                  :value="item.value"
                  :disabled="!item.canView"
                >
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
    <!--结束目标-->
    <el-dialog :visible.sync="score.dialogVisible" width="50%" :show-close="false" append-to-body top="50px">
      <div slot="title">
        <div class="title">
          <i class="iconfont icon-guanbi1 primary"></i> 结束目标
        </div>
        <div class="options">
          <i class="iconfont icon-guanbi pointer fs-22" @click="score.dialogVisible=false"></i>
        </div>
        <div class="clear"></div>
      </div>
      <div class="dialog-wrap">
        <el-row class="mt-15" v-for="(item,index) in score.list" style="border-bottom: solid 1px #ddd; padding-bottom: 20px">
          <el-col :span="3">
            <el-progress :type="'circle'" :percentage="item.progress || 0" :width="60" color="#48525C" style="float: left"></el-progress>
          </el-col>
          <el-col :span="21">
            <el-row>
              <el-col :span="24">
              {{item.keyResult || '********'}}[权重{{item.weight}}%]<br/>
              <span class="pr-10">当前进度:{{item.progress}}  起始:{{item.startVal}}  结束:{{item.endVal}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
              <el-col :span="3" style="padding-top: 9px">结果打分</el-col>
              <el-col :span="21"><el-slider v-model="item.score" :step="10" :marks="score.marks" style="width: 97%" @input="sumScoreResult"> </el-slider></el-col>
            </el-row>
            <el-row style="margin-top: 15px">
              <el-col :span="3" class="mt-20">结果总结</el-col>
              <el-col :span="21" class="mt-20">
                <el-input type="textarea" placeholder="请输入内容" v-model="item.summary"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px">
          <el-col :span="3">项目总结</el-col>
          <el-col :span="21">
            <el-input type="textarea" placeholder="请输入内容" v-model="score.summary"></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 15px">
          <el-col :span="20">
            <el-button type="primary" size="mini" class="mr-10" @click="setScore">确定</el-button>
            <el-button size="mini" @click="score.dialogVisible = false">取消</el-button>
          </el-col>
          <el-col :span="4">
            <i class="iconfont icon-target"></i>得分:{{score.result.toFixed(2)}}
          </el-col>
        </el-row>

      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import moment from 'moment'
  import dialogPanel from '@/components/DialogPanel'
  import memberPanel from '@/components/MemberPanel'
  import avatar from '@/components/avatar'
  // import activity from '@/components/activity'
  import like from '@/components/like'
  // import apiMembers from '@/api/system/members'
  // import api from '@/api/okr'
  export default {
    name: 'TargetDetail',
    props: {
      visible: {
        type: Boolean,
        default() {
          return false
        }
      },
      obj:Object
    },
    components:{dialogPanel, memberPanel, avatar,like},
    computed: {
      progressColor() {
        return this.$store.getters.progressColor
      },
      user(){
        return this.$store.getters.user
      }
    },
    data() {
      return {
        msg:'',
        enumType:{},
        scoreRule:{
          dialogVisible:false,
          form:{},
          keyResult:{}
        },
        comment:{},
        target:{},
        panelVisible:false,
        dialogVisible:false,
        form:{
          objType:'',
          users:[],
          keyResults:[{unitType:'YN', weight:0, keyResult:'',users:[],panelVisible:false}],
          parent:{},
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
        },
        objMembersPanel:false,
        score:{
          dialogVisible:false,
          list:[],
          marks:{
            0:'0',10:'10',20:'20',30:'30',40:'40',50:'50',60:'60',70:'70',80:'80',90:'90',100:{
              style: {
                width: '30px'
              },
              label: '100'
            }
          },
          result:0
        },
        userInfo:'',
        pageNum:1,
        pageSize:10,
        msgList:[],
        history:[],
        view:'comment'
      }
    },
    watch:{
      obj(val){
        this.target = val;
        for(let i in val.keyResults){
          this.$set(this.target.keyResults[i],'progressTxt',val.keyResults[i].progress);
        }
        this.target.objMembers = this.target.objMembers || [];
        this.getCommentList();
        this.getHistory();
      }
    },
    created() {
      this.getEnum('ProgressState');
    },
    mounted(){
      this.userInfo = {
        userAvatar:this.user.user.jwtClaims.ua,
        userId:this.user.user.jwtClaims.id,
        userName:this.user.user.jwtClaims.un,
        size:35
      };
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
      closeDialog(){
        this.$emit('closeTargetDetail');
      },
      //显示评分规则
      showScoreRule(index){
        api.scoreRule(this.target.keyResults[index].keyResultId).then(res => {
          if (res.code === 200) {
            this.scoreRule = {
              dialogVisible:true,
              form:res.data,
              keyResult:this.target.keyResults[index]
            }
          }
        }).catch(err => {
          console.log(err);
        })
        this.scoreRule.dialogVisible = true;
      },
      //保存目标评分规则
      saveScoreRule(){
        api.setScoreRule(this.scoreRule.form,this.scoreRule.keyResult.keyResultId).then(res => {
          if (res.code === 200) {
            this.$message.success({message: '打分规则设置成功!', duration: 1500})
            this.scoreRule = {
              dialogVisible:false,
              form:{},
              keyResult:{}
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //清除目标评分规则
      clearScoreRule(){
        for(let key in this.scoreRule.form){
          this.scoreRule.form[key] = '';
        }
      },
      //更新进度
      updateProgress(){
        let params = {
          'comment.content':this.comment.content || '',
        }
        if(this.comment.attachments && this.comment.attachments.length>0){
          for(let x in this.comment.attachments){
            params['comment.attachments['+x+']'] = 'https://dev-oss.cgvcap.com/file/'+this.comment.attachments[x].fileId+'/'+this.comment.attachments[x].accessCode
          }
        }
        let j = 0;
        for(let i in this.target.keyResults){
          if(this.target.keyResults[i].canView){
            params['keyResults['+j+'].keyResultId'] = this.target.keyResults[i].keyResultId;
            params['keyResults['+j+'].progress'] = this.target.keyResults[i].progress;
            params['keyResults['+j+'].progressState'] = this.target.keyResults[i].progressState?this.target.keyResults[i].progressState.value:'';
            j++
          }
        }
        api.updateProgress(params, this.target.objId).then(res => {
          if (res.code === 200) {
            this.comment = {
              hidden:true
            };
            this.$message.success({message: '进度更新成功!', duration: 1500})
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //监听评论
      setComment(e){
        this.comment = e;
      },
      //设置进度
      setProgress(index){
        this.$set(this.target.keyResults[index],'progress',Number(this.target.keyResults[index].progressTxt))
      },
      //编辑目标
      editTarget(){
        this.getEnum('ObjectiveType');
        this.getDeptTree();
        this.getList();
        this.form = {
            deptId:this.target.objDept?this.target.objDept.deptId:'',
            objType:this.target.objType,
            objName:this.target.objName,
            users:this.target.objUser.userId!=='-1'?[this.target.objUser]:[],
            keyResults:(()=>{
              for(let i in this.target.keyResults){
                this.target.keyResults[i].unitType =  this.target.keyResults[i].unitType.value
              }
              return this.target.keyResults
            })(),
            parent:{
              objName:this.target.objParent?this.target.objParent.objName:'',
              objId:this.target.objParent?this.target.objParent.objId:''
            },
            totalWeight:0
        };
        this.sumWeight();
        this.dialogVisible = true
      },
      //人员选择相关
      closePanel(){
        setTimeout(()=>{
          this.panelVisible = false;
          for(let i in this.form.keyResults){
            this.$set(this.form.keyResults[i],'panelVisible',false);
          }
        })
      },
      setMember(e){
        this.form.users = [e.data[e.data.length-1]];
        this.panelVisible = false;
      },
      setObjMembersMember(){},
      removeMember(index){
        this.form.users.splice(index,1)
      },
      removeMemberKeyResults(index,uInx){
        this.form.keyResults[index].users.splice(uInx,1)
      },
      removeObjMembersMember(index){
        this.target.objMembers.splice(index,1)
      },

      //添加关键结果
      addKeyResult(){
        // todo 添加了 canView:true 导致出错
        //  keyResults:[{unitType:'YN', weight:0, keyResult:'',users:[],panelVisible:false}],
        this.form.keyResults.push({
          canView:true,
          keyResult:'',
          progressState:{name:'', value:''},
          unitType:'YN',
          weight:0,
          users:[],
          panelVisible:false
        })
        console.log(this.form.keyResults);
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
        apiMembers.deptTree().then(res => {
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
          periodId:this.target.period.id,
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
      saveTarget(){
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
                objUserId:this.form.users[0]?(this.form.users[0].id||this.form.users[0].userId):'',
                periodId:this.target.period.id
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
              }
              api.objEdit(params, this.target.objId).then(res => {
                if (res.code === 200) {
                  this.$message.success({message: '目标修改成功!', duration: 1500});
                  this.getDetail();
                  this.$emit('refreshList');
                  this.dialogVisible = false
                }
              }).catch(err => {
                console.log(err);
              })
            }
          }
        });
      },
      showPanel(index){
        if(this.form.keyResults[index].canView){
          this.$set(this.form.keyResults[index],'panelVisible',true)
        }
      },

      // 更新目标参与人
      setObjMembersMember(){
        let arr = [];
        for(let i in this.target.objMembers){
          if(this.target.objMembers[i].id){
            arr.push(this.target.objMembers[i].id)
          }
        }
        api.updateMembers({userIds:arr}, this.target.objId).then(res => {
          if (res.code === 200) {}
        }).catch(err => {
          console.log(err);
        })
      },
      //显示目标参与人面板
      closeObjMembersPanel(){
        setTimeout(()=>{
          this.objMembersPanel = false;
        })
      },

      //获取目标详情
      getDetail(){
        api.objDetail(this.target.objId).then(res => {
          if (res.code === 200) {
            this.target = res.data;
          }
        }).catch(err => {
          console.log(err);
        })
      },

      //删除目标
      deleteTarget(){
        this.$confirm('即将删除目标,并且不能恢复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.objDelete(this.target.objId).then(r => {
            if (r.code === 200) {
              this.$message.success({message: '目标删除成功', duration: 1500})
              this.closeDialog();
              this.$emit('refreshList');
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {});
      },

      //结束项目相关信息
      getScoreInfo(){
        api.scoreInfo(this.target.objId).then(res => {
          if (res.code === 200) {
            this.score.dialogVisible = true;
            this.score.list = res.data
          }
        }).catch(err => {
          console.log(err);
        })
      },

      // 计算总分
      sumScoreResult(){
        let score = 0;
        for(let i in this.score.list){
          score+=Number(this.score.list[i].score*this.score.list[i].weight/100);
        }
        this.score.result = score;
      },

      //项目评分
      setScore(){
        let params = {
          objScore:this.score.result,
          scoreType:'PS',//todo 暂时hradcode 可用值:PS-个人评分,SS-上级评分
          summary:this.score.summary,
        }
        for(let i in this.score.list){
          params['scores['+i+'].keResultScore'] = this.score.list[i].score;
          params['scores['+i+'].keyResultId'] = this.score.list[i].keyResultId;
          params['scores['+i+'].keyResultSummary'] = this.score.list[i].summary;
        }

        console.log(params);

        api.setScore(params, this.target.objId).then(res => {
          if (res.code === 200) {
            this.$message.success({message: '项目评分成功!', duration: 1500})
            this.score.dialogVisible = false;
          }
        }).catch(err => {
          console.log(err);
        })

      },


      setMsg(e){
        this.msg = e;

      },
      //发评论
      sendMsg(){
        let params = {
          bizType:'obj',//可用值:obj-目标,bri-简报
          content:this.msg.content || ''
        }

        if(this.msg.attachments && this.msg.attachments.length>0){
          for(let x in this.msg.attachments){
            params['attachments['+x+']'] = 'https://dev-oss.cgvcap.com/file/'+this.msg.attachments[x].fileId+'/'+this.msg.attachments[x].accessCode
          }
        }
        api.addComment(params, this.target.objId).then(res => {
          if (res.code === 200) {
            this.msg='';
            this.$message.success({message: '发表评论成功', duration: 1500})
          }
        }).catch(err => {
          console.log(err);
        })
      },

      getCommentList(){
        let params = {
          bizType:'obj',//可用值:obj-目标,bri-简报
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
        api.commentList(params, this.target.objId).then(res => {
          if (res.code === 200) {
            this.msgList = res.data.list
          }
        }).catch(err => {
          console.log(err);
        })
      },

      getHistory(){
        api.history(this.target.objId).then(res => {
          if (res.code === 200) {
            this.history = res.data.reverse()
          }
        }).catch(err => {
          console.log(err);
        })
      }

    },
    filters: {
      time: function (value) {
        return moment.utc(value*1000).format('YYYY年MM月DD日');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .table-wrap{
    .el-row{
      border-bottom:solid 1px #ddd;
      border-left:solid 1px #ddd;
    }
    .el-col{
      padding: 15px 10px;
      border-right:solid 1px #ddd;
    }
    .gray-block{
      background: #f3f3f3;
    }
  }
  .new-target-dialog{
       line-height: 26px;
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
