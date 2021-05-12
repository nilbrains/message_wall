<template>
  <div class="add_wall container">

    <h2 class="text-center">请留言</h2>

    <el-form
      :model="wallForm"
      ref="form"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="内容">
        <el-input
          v-model="wallForm.content"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          maxlength="300"
          :show-word-limit="true"
          placeholder="这里是你要留言的内容"
        ></el-input>
      </el-form-item>
       <el-form-item label="标签">
        <el-input
          v-model="wallForm.label"
          placeholder="输入标签，用英文逗号分割"
        ></el-input>
      </el-form-item>
      <el-form-item label="留言对象">
        <el-input
          v-model="wallForm.toUsername"
          placeholder="输入留言对象昵称(eg: 牧云)"
        ></el-input>
      </el-form-item>
      <el-form-item label="留言QQ">
        <el-input
          v-model="wallForm.toQQ"
          placeholder="输入留言QQ号"
        ></el-input>
      </el-form-item>

      <el-form-item label="留言地址">
        <el-input
          v-model="wallForm.address"
          placeholder="你所在的地方(eg：你的学校名称)"
        ></el-input>
      </el-form-item>

      <el-form-item label="是否匿名">
        <el-switch v-model="wallForm.is_ni" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>




      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$router.go(-1);">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {createWall} from '@/api/wall';
import { mapGetters } from 'vuex'
export default {
  name: "add",
  computed: {
    ...mapGetters(['uid']),
  },
  data() {
    return {
      wallForm: {
        content:"",
        toQQ:"",
        toUsername:"",
        label:"",
        address:"",
        is_ni:"0"
      },
      loading: false,
    };
  },
  methods: {
    onSubmit(){
      let upData = this.wallForm;
      if (upData.content.trim().length == 0 || upData.toUsername.trim().length == 0) {
        this.$message.info("请补全内容")
        return
      }
      upData.user = this.uid;
      createWall(upData).then((res) => {
        // console.log(res)
        if (res.code === 20000) {
          this.$message.success(res.message)
          this.$router.go(-1);
        }
      }).catch(()=>{
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.add_wall {
  padding: 10px 0;
  .text-center{
    text-align: center;
  }
}
</style>
