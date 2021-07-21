<template>
  <div style="width:100%">
    <div class="test-textarea" id="contenteditablediv" ref="textarea"
         v-html="innerText"
         :contenteditable="canEdit"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText"
    ><br/></div>
  </div>
</template>
<script>
  export default {
    name: 'editDiv',
    props: {
      value: {
        type: String,
        default: ''
      },
      canEdit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        innerText: this.value,
        isLocked: false,
        firstInput:true
      }
    },
    watch: {
      'value'() {
        if (!this.isLocked || !this.innerText) {
          this.innerText = this.value;
        }
      }
    },
    mounted() {
      // console.log(this.value)
    },
    methods: {
      changeText(e) {
        //this.$emit('input', this.$el.innerHTML);
        this.$emit('input', this.$refs.textarea.innerHTML);
        this.$emit('change', this.$refs.textarea.innerHTML);
        if(this.$refs.textarea.innerHTML.length===1){
          setTimeout(()=>{
            this.keepLastIndex(e.target)
          },5)
        }
      },
      changeEmit() {
        this.$emit('change', this.$refs.textarea.innerHTML);
      },
      keepLastIndex(obj) {
        if (window.getSelection) { //ie11 10 9 ff safari
          obj.focus(); //解决ff不获取焦点无法定位问题
          var range = window.getSelection(); //创建range
          range.selectAllChildren(obj); //range 选择obj下所有子内容
          range.collapseToEnd(); //光标移至最后
        } else if (document.selection) { //ie10 9 8 7 6 5
          var range = document.selection.createRange(); //创建选择对象
          //var range = document.body.createTextRange();
          range.moveToElementText(obj); //range定位到obj
          range.collapse(false); //光标移至最后
          range.select();
        }
      },
      focusToLast(){
        let obj = this.$refs.textarea;
        obj.focus(); //解决ff不获取焦点无法定位问题
        var range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      },
      focusToPosition(e){
        let obj = this.$refs.textarea;
        obj.focus(); //解决ff不获取焦点无法定位问题
        return
        var range = window.getSelection(); //创建range
        range.collapse(range.focusNode,4)
      }
    }
  }
</script>

<style>
  .test-textarea {
    width: 99%;
    line-height: 24px;
    _height: 40px;
    padding: 3px;
    padding-left: 0px;
    outline: 0;
    font-size: 14px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only;
    border-radius: 2px;
    cursor: text;
  }
</style>
