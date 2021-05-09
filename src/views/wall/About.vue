<template>
  <div class="about container">
    <el-card shadow="hover" class="card">
      <div slot="header" >
        <span>留言墙介绍</span>
      </div>
      <div>
        <p>留言墙，留下你此时此刻的心情。</p>
        <p>
          留下你对曾经(现在)的他(她、它)最想说的话。
        </p>
        <p>
          你可以实名留言、也可以匿名留言。
        </p>
      </div>
    </el-card>
    <el-card shadow="hover"  class="card">
      <div slot="header">
        <span>注意事项</span>
      </div>
      <div>
        <p>
          1. 留言一但生成,将不可删除、不可修改、不可撤回,请在留言前确定留言相关信息是否正确
        </p>
        <p>
          2. 为营造良好的网络环境，请遵守相关法律法规，请勿发布垃圾、敏感等信息留言；若遇到不良信息一定要向我们举报。
        </p>
        <p>
          3. 如果你有更好的建议或者反馈 --> 那么 <a class="text-blue" href="https://support.qq.com/product/325310" target="_blank"> 使劲点我 </a> 
        </p>
      </div>
    </el-card>
    <el-card shadow="hover" class="card">
      <div slot="header">
        <span>赞助</span>
      </div>
      <div>
        <p>本网站所有产品均免费，相关维护与运营费用均由站长个人承担, 请大家不要发布无意义的内容。</p>
        <p>最后如果觉得该网站有用，可以随意打赏。 <span class="text-blue">支付宝</span> </p>
        <div>
          <el-image  style="width: 200px; height: 200px" :src="zfb" fit="fill" :lazy="true"></el-image>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import zfb from '@/assets/zfb.png';
export default {
  data(){
    return {
      zfb
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  padding: 10px;
  .text-blue {
    color: #7bc1ff;
  }
  .card {
    margin-bottom: 10px;
  }
}
</style>