<template>
  <el-dialog :visible.sync="meetingRoom.dialogVisible" width="650px" :append-to-body="true" :show-close="false"
             top="50px" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-huiyishiguanli"></i> 预订会议室--时间段：{{meetingRoom.tips}}
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="meetingRoom.dialogVisible = false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-form ref="meetingRoom.form" :model="meetingRoom.form" label-width="100px" style="margin-top: 20px">
      <el-form-item label="线上会议室">
        <div style="display: flex">
          <el-input v-model="meetingRoom.form.conferenceCode" placeholder="添加视频会议ID（选填）"
                    style="width: 350px; margin-right: 10px"></el-input>
          <el-input v-model="meetingRoom.form.conferencePwd" placeholder="会议密码（选填）" style="width: 200px;"></el-input>
        </div>
      </el-form-item>
      <div style="padding: 0 0 20px 18px">线下会议室<span style="font-weight: bold">（可用会议室）</span></div>
      <el-form-item label="">
        <div class="wrap" v-for="(item,index) in meetingRoom.list" :key="index">
          <img class="avatar" :src="item.meetingRoomImg"/>
          <div class="content">
            <div class="title">{{item.meetingRoomName}}</div>
            <div class="tags">
              {{item.devicesStr || '无设备'}}
            </div>
            <div class="tips" style="display: flex; align-items: center">
              <i class="iconfont icon-huiyishiyuding" style="margin-right: 10px"></i>
              <span style="margin-right: 20px; flex-shrink: 0">{{item.capacity}}</span>
              <i class="iconfont icon-didianx" style="margin-right: 10px"></i>
              {{item.address}}
            </div>
          </div>
          <el-button type="text">
            <el-radio v-model="meetingRoom.form.meetingRoomId" :label="item.meetingRoomId"
                      @change="pickMeetingRoom(item)">&nbsp;
            </el-radio>
          </el-button>
        </div>

        <div class="w-100p gray" v-show="meetingRoom.list && meetingRoom.list.length===0" style="text-align: center;">
          <img src="@/assets/no-list.png">
          <br><span style="font-size: 14px">当前时间段无可用会议室</span><br/><br/>
        </div>
      </el-form-item>
      <el-form-item label="">
        <div class="w-100p" style="text-align: left">
          <el-button type="primary" size="mini" @click="saveMeetingRoom()">确认</el-button>
          <el-button type="default" size="mini" @click="meetingRoom.dialogVisible = false">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
  import api from '@/api/manageInvest';
  import moment from 'moment-timezone';
  export default {
    name: '',
    components: {},
    props: {
      type: { // 文件
        type: String,
        default() {
          return '';
        }
      }
    },
    data() {
      return {
        meetingRoom: {
          dialogVisible: false,
          form: {
            reservationId: '',
            conferencePwd: '',
            conferenceCode: '',
            meetingRoomId: '',
            meetingRoomName: '',
            startStr: '',
            endStr: '',
            timeStr: '',
            tips: ''
          },
          list: []
        },
        start:'',
        end:''
      };
    },
    methods: {
      show(id,time,fullDay) {
        this.start = moment(time[0]).valueOf();
        this.end = moment(time[1]).valueOf();
        let params = {
          startTime: this.start / 1000,
          endTime: this.end / 1000,
          isFullDay: fullDay || false,
          bizId: id,
          bizType:this.type
        };
        api.getEnableMeetingRoom(params).then(res => {
          if (res.code === 200) {
            for (let i in res.data) {
              res.data[i].devicesStr = '';
              for (let j in res.data[i].devices) {
                if (res.data[i].devices[j].isSelected) {
                  res.data[i].devicesStr += (res.data[i].devicesStr ? (' / ' + res.data[i].devices[j].deviceName) : (res.data[i].devices[j].deviceName));
                }
              }
            }
            this.meetingRoom.list = res.data || [];
            this.meetingRoom.dialogVisible = true
            this.meetingRoom.tips = moment(params.startTime * 1000).format('YYYY年MM月DD日 HH:mm') + '~' + moment(params.endTime * 1000).format('YYYY年MM月DD日 HH:mm');
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pickMeetingRoom(item) {
        this.meetingRoom.form.meetingRoomId = item.meetingRoomId;
        this.meetingRoom.form.meetingRoomName = item.meetingRoomName;
        this.meetingRoom.form.startStr = moment(this.start).format('YYYY-MM-DD HH:mm');
        this.meetingRoom.form.endStr = moment(this.end).format('YYYY-MM-DD HH:mm')
        this.meetingRoom.form.timeStr = moment(this.start).format('YYYY-MM-DD HH:mm') + ' ~ ' + moment(this.end).format('HH:mm');
        this.meetingRoom.form.city = item.city;
        this.meetingRoom.form.address = item.address;
      },
      saveMeetingRoom(){
        this.$emit('SELECTED_MEETING_ROOM',this.meetingRoom.form);
        this.meetingRoom.dialogVisible = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: solid 1px #e5e5e5;
    padding-bottom: 10px;

    .avatar {
      width: 75px;
      height: 75px;
      border-radius: 5px;
      border: solid 1px #e5e5e5;
    }

    .content {
      width: 80%;
      font-size: 14px;
      line-height: 24px;
      color: #777;
      margin-left: 20px;
      margin-right: auto;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }

      .tips {
        display: flex;
        align-items: center;
      }

      .time-block {
        display: flex;

        span {
          width: 20px;
          height: 25px;
          background: #fff;
          border-left: solid 1px #e0e0e0;
          border-top: solid 1px #e0e0e0;
          border-bottom: solid 1px #e0e0e0;
          cursor: pointer;
        }

        span:last-child {
          border-right: solid 1px #e0e0e0;
        }

        span.over {
          background: #ededed;
        }

        span.self {
          background: #9ccbfb;
          cursor: pointer;
        }

        span.checked {
          background: #ddd;
          cursor: pointer;
        }
      }

      .time-tag {
        display: flex;
        margin-left: -5px;

        span {
          width: 40px;
          font-size: 12px;
          color: #999;
        }
      }
    }

    .options {
      width: 300px;
      margin-right: 20px;
      height: 80px;

      .time {
        color: #777;
        font-size: 14px;
        text-align: right;
      }

      .buttons {
        margin-top: 15px;
        text-align: right;
        height: 40px;
      }
    }
  }
</style>
