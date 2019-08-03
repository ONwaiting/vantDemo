<template>
  <div class="hello">
    <van-progress :percentage="50" :show-pivot="false" />
    <div id="myChart"></div>
    <canvas id="can" style="background-color:#ccc;" width="640" height="1040"></canvas>
    <div id="img"></div>
    <!-- <img src="../assets/share.png" alt=""> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import wx from "weixin-js-sdk";
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
    draw() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        legend: {
          orient: "vertical",
          right: 0,
          top: 30,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["30%", "40%"],
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    share() {
      // var url = window.location.href;
      //  window.encodeURIComponent(window.location.href)
      this.axios({
        url: "http://api4.koudaitiku.com/wechat/sign.htm",
        method: "post",
        transformRequest: [
          data => {
            return this.$qs.stringify(data);
          }
        ],

        data: {
          url: encodeURIComponent(location.href.split("#")[0])
        }
      }).then(res => {
        var appId = res.data.data.appId;
        var timestamp = res.data.data.timeStamp;
        var nonceStr = res.data.data.nonceStr;
        var signature = res.data.data.signature;
        // console.log(appId)
        wx.config({
          debug: true,
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
    },
    imgs() {
      var canvas = document.getElementById("can");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.setAttribute("crossOrigin",'Anonymous')
      // https://smapi.koudaitiku.net/images/money/share.png
      img.src = "https://smapi.koudaitiku.net/images/money/share.png";
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(182, 830);
        // 
        ctx.rotate(355 * Math.PI / 180);
        ctx.font = "bold 100px microsoft"; //设置画笔的字体大小和格式
        ctx.fillStyle = "red"; //设置字体的颜色
        ctx.fillText("5", 0, 0); //将文字信息画在画布上，按照x,y的坐标，在手机上坐标不是很准确
        var image = new Image();
        image.src = canvas.toDataURL("image/png"); //将画布当前状态生成对应的base64串；
        image.width = document.getElementById("img").offsetWidth;
        image.height = document.getElementById("img").offsetHeight;
        document.getElementById("img").appendChild(image);
      };

      
    }
  },
  mounted() {
    this.imgs();

    this.draw();
  }
};
</script>

<style scoped>
#myChart {
  width: 375px;
}
#can {
  width: 320px;
  height: 520px;
  display: none;
}
#img {
  width: 320px;
  height: 520px;
}
#img img {
  width: 100%;
  height: 100%;
}
</style>
