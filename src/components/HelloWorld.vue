<template>
  <div class="hello">
    <van-progress :percentage="50" :show-pivot="false" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import wx from 'weixin-js-sdk';
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      url: "",
      flag: false
    };
  },
  methods: {
    ...mapActions(["getId"]),
    onRead(file) {
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.flag = true;
      this.axios
        .post("http://res4.koudaitiku.com/image/upload.htm", params, config)
        .then(res => {
          this.url = "http://img.koudaitiku.com/" + res.data.key;
          this.flag = false;
        });
    }
  },
  mounted() {
    this.getId(10);
    var url = window.location.href;
    //  window.encodeURIComponent(window.location.href)
    this.axios({
      url: "http://api4.koudaitiku.com/wechat/sign.htm",
      method: "post",
      transformRequest: [
        (data)=> {
          return this.$qs.stringify(data);
        }
      ],

      data: {
        url: window.location.href
      }
    }).then(res => {
      var appId = res.data.data.appId;
      var timestamp = res.data.data.timeStamp;
      var nonceStr = res.data.data.nonceStr;
      var signature = res.data.data.signature;
      // console.log(appId)
      wx.config({
        debug: false,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: [
          "onMenuShareWeibo",
          "onMenuShareQQ",
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ]
      });
      const shareParams = {
        title: "真题资料下载",
        desc: "2020考研，最全的考研专业课真题资料大礼包，免费赠送",
        link: "m.koudaitiku.com",
        imgUrl:
          "http://img.koudaitiku.com/50f6477b724b43188ff27edb52d56e7d.png",
        type: "",
        dataUrl: "",
        success: () => {
          alert(1);
        },
        cancel: () => {
          alert(0);
        }
      };

      wx.ready(() => {
        // 分享到朋友圈
        wx.onMenuShareTimeline(shareParams);
        // 分享给朋友
        wx.onMenuShareAppMessage(shareParams);
        // 分享到QQ
        wx.onMenuShareQQ(shareParams);
        // 分享到微博
        wx.onMenuShareWeibo(shareParams);
      });
    });
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
