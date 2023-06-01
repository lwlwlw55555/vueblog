<template>
    <div>
        <HeaderDe></HeaderDe>
        <div>
            <h3 style="text-align: center">DE电商-赠品忽略编码设置</h3>
            <LwBordor></LwBordor>
        </div>

        <el-form :model="outerIdForm" ref="outerIdForm" size="medium" class="demo-dynamic" style="text-align: center;">

            <el-form-item>
                <el-button class="el-button--lw" size="small" @click.prevent="refreshOuterId()">刷新</el-button>
                <!-- ③ 按钮动画 :loading="loading.listloading" -->
                <el-button class="el-button--lw_submit" size="small" :loading="loading.listloading" @click.prevent="exportOuterId()">导出</el-button>
            </el-form-item>

            <el-form-item class="el-form-item__label-lw"
                          :inline="true"
                          label-width="100px"
                          v-for="(outerId, index) in outerIdForm.outerIds"
                          :label="'sku编码' + (index+1)+':'"
                          :key="outerId"
                          :prop="'outerIds.' + index + '.value'"
                          :rules="{
      required: true, message: 'sku编码不能为空', trigger: 'blur'    }"
            >
                <el-input v-model="outerId.value" style="width: 190px;margin-right: 10px" clearable transfer></el-input>

                <el-button class="el-button--lw-new-diaodu" size="mini" @click.prevent="removeOuterId(outerId)">删除
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="el-button--lw_add" size="small" @click="addOuterId">新增</el-button>
                <el-button class="el-button--lw_submit" size="small" @click.prevent="submitOuterId(outerIdForm)">提交
                </el-button>
            </el-form-item>

        </el-form>
    </div>

</template>

<script>
    import LwBordor from "@/views/lw/LwBordor";
    import {Loading} from 'element-ui';
    import HeaderDe from "../../components/HeaderDe";


    export default {
        components: {
            LwBordor,
            HeaderDe
        },
        data() {
            return {
                outerIdForm: {
                    outerIds: [{
                        value: ''
                    }],
                },
                // ③ 按钮动画
                loading :{
                    listloading: false
                }
            };
        },
        methods: {
            refreshOuterId() {
                const _this = this
                Loading.service({target: document.body});
                this.$http_php.get("/de_gift_ignore.php").then(res => {
                    let loadingInstance = Loading.service({target: document.body});
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                    if (res.data.code === 0) {
                        console.log(res.data, "res.data")
                        console.log(res.data.data.outerIdList, "res.data.outerIdList")
                        _this.outerIdForm.outerIds = [];
                        res.data.data.outerIdList.forEach(function (v, k) {
                            console.log(v, "res.data.v")
                            _this.outerIdForm.outerIds.push({
                                value: v
                            })
                        })
                        // console.log(this.tableDatas, "lwData")
                    } else {
                        _this.$alert('操作失败:' + JSON.stringify(res.data), '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push("/blogs")
                            }
                        });
                    }
                })
            },
            exportOuterId() {
                // ② 全局+字
                // const loading = this.$loading({
                //     lock: true,
                //     text: '正在导出',
                //     spinner: "el-icon-loading",
                //     background: 'raba(0, 0, 0, 0.7)'
                // });
                // ③ 按钮动画
                this.loading.listloading = true;
                this.$message({
                    type: "warning",
                    message:"数据正在导出，请耐心等待"
                });

                //!important 如果要在下面的函数中用结构体this 必须先把this赋予变量 结构体中调用_this!!!!
                const _this = this

                this.$http_php({
                    method: 'get',
                    url: "/de_gift_ignore.php",
                    params: {"is_export": true},
                    responseType: 'blob'
                }).then(function (response) {
                    // ② 全局+字
                    // loading.close();

                    // ① 全局+转圈
                    // let loadingInstance = Loading.service({target: document.body});
                    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    //     loadingInstance.close();
                    // });
                    console.log(response)
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    console.log(response.headers)
                    /*
                   todo
                    中文名乱码后端找了一下午找不到问题
                    从前端找找啊啊啊啊！
                    前端这里可以打印出来所有的header啊啊啊啊啊啊啊
                    在这里用decodeURI一下不就可以把后端转的urlcode转为中文了吗.....
                    反正前端肯定是认识urlcode的！！！！
                     */
                    fileLink.setAttribute('download', decodeURI(response.headers['filename']));
                    document.body.appendChild(fileLink);

                    fileLink.click();
                    // ③ 按钮动画
                    _this.loading.listloading = false;
                    _this.$message({
                        type: "success",
                        duration: 1000,
                        message: "操作成功"
                    });
                })
            },
            addOuterId() {
                this.outerIdForm.outerIds.push({
                    value: '',
                });
            },
            removeOuterId(item) {
                let index = this.outerIdForm.outerIds.indexOf(item)
                console.log(index, "1111")
                if (index !== -1) {
                    this.outerIdForm.outerIds.splice(index, 1)
                }
            },
            submitOuterId(outerIdForm) {
                console.log(this.$refs, "this.$refs")
                this.$refs['outerIdForm'].validate((valid) => {
                    if (valid) {
                        const _this = this
                        let outerIdList = []
                        outerIdForm.outerIds.forEach(
                            function (v, k) {
                                console.log(v, k, "v,k")
                                outerIdList.push(v.value)
                            }
                        )
                        console.log(outerIdList, "value")
                        // console.log(outerIdForm, "lwwlww")
                        // console.log(outerIdForm.outerIds, "lwwlww")
                        this.$http_php.get("/de_gift_ignore.php", {
                            params: {
                                outerIdList: outerIdList
                            }
                        }).then(res => {
                            if (res.data.code === 0) {
                                _this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push("/blogs")
                                    }
                                });
                                this.refreshOuterId();
                            } else {
                                _this.$alert('操作失败:' + JSON.stringify(res.data), '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push("/blogs")
                                    }
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created() {
            this.refreshOuterId();
        }
    }
</script>

<style scoped>
    .lw_boder {
        box-shadow: 0 2px 2px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 2px;
        /*border-top:3px solid #0e87e3;*/
        border-bottom: 3px solid #0e87e3;
        /*border-top: 3px solid #0e87e3;*/
        /*border-left: ;*/

    }

    .el-button--lw-test {
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
        /*border-top:3px solid #0e87e3;*/
        border: 2px solid #4cae4c;
        background: #4cae4c;
        active: #4cae4c;
        /*border-top: 3px solid #0e87e3;*/
        /*border-left: ;*/

    }

    .el-button--lw.is-active,
    .el-button--lw:active {
        background: #20B2AA;
        border-color: #20B2AA;
        color: #fff;
    }

    .el-button--lw-new-diaodu {
        color: #FFF;
        background-color: #e50404;
        border-color: #e50404;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--lw-new-diaodu:focus,
    .el-button--lw-new-diaodu:hover {
        background: #e307c6;
        border-color: #e307c6;
        color: #fff;
    }

    .el-button--lw:focus,
    .el-button--lw:hover {
        background: #48D1CC;
        border-color: #48D1CC;
        color: #fff;
    }

    .el-button--lw {
        color: #FFF;
        background-color: #20B2AA;
        border-color: #20B2AA;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--lw_add {
        color: #FFF;
        background-color: #5688c4;
        border-color: #5688c4;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--lw_add:focus,
    .el-button--lw_add:hover {
        background: #114c92;
        border-color: #114c92;
        color: #fff;
    }

    .el-button--lw_submit {
        color: #FFF;
        background-color: #c1a51a;
        border-color: #c1a51a;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--lw_submit:focus,
    .el-button--lw_submit:hover {
        background: #969508;
        border-color: #969508;
        color: #fff;
    }


    .m-content {
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        border: 2px solid #fff;
    }

    .lw {
        background: transparent;

        border-radius: 15px;

        border: 0px;

    }

    /*.maction {*/
    /*  margin: 10px 0;*/
    /*}*/
    .el-form-item__label-lw {
        text-align: justify;
        text-align-last: justify;
        margin-left: 300px;
        size: 300px;
    }
</style>

