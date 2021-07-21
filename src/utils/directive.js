import Vue from 'vue'
export default () => {
  Vue.directive('Int', {
    inserted: function (el) {
      // console.log(el);
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        if(charcode<48 || charcode>57){
          e.returnValue = false;
        }
        /*
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        let re = /d/;
        if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
            e.preventDefault();
          }else{
            e.returnValue = false;
          }
        }
         */
      });
    }
  });
}
