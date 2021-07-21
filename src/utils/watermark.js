import store from '@/store';
import filters from './filters';

let watermark = {};
let id = 'watermark';
let setWatermark = (str) => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
  if (store.state.user && store.state.user.user) {
    let can = document.createElement('canvas');
    // can.width = 3000 * 3;
    // can.height = 5000 * 3;
    // can.style.width = 3000 + 'px';
    // can.style.height = 5000 + 'px';
    can.width = 3000;
    can.height = 5000;

    let name = store.state.user.user.jwtClaims.un;
    let mobile = store.state.user.user.jwtClaims.id.substring(store.state.user.user.jwtClaims.id.length - 11);
    let curTime = new Date().getTime();
    let time = filters.DateTimeSecondEn(curTime / 1000);
    let opacity = 0.07;
    let ctx = can.getContext('2d');
    ctx.rotate(-15 * Math.PI / 180);
    ctx.globalAlpha = opacity;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 15; j++) {
        ctx.font = '10px';
        ctx.fillText('' + name + '  ' + mobile, -510 + i * 300, 20 + j * 150);
        ctx.fillText('' + time, -510 + i * 300, 38 + j * 150);
      }
    }
    // ctx.scale(3,3);
    // ctx.draw();

    let div = document.createElement('div');
    div.id = id;
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.right = '0px';
    div.style.bottom = '0px';
    div.style.position = 'fixed';
    div.style.zIndex = '100000';
    // div.style.width = document.documentElement.clientWidth + 'px';
    // div.style.height = document.documentElement.clientHeight + 'px';
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    document.body.appendChild(div);
    return id;
  }
};
let removeWatermark = (str) => {
  let div = document.getElementById(id);
  div.parentNode.removeChild(div);
};
watermark.remove = () => {
  // removeWatermark();
};
watermark.set = (str) => {
  // setWatermark();
};
export default watermark;
