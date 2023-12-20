<template>
    <div class="m-content">
        <el-form :model="formHead" :rules="headRules" :inline="true" ref="formHead" size="mini"
                 style="text-align: center;">
            <el-form-item>
                <el-button class="el-button--lw-new-diaodu" type="primary" @click="diaoduNew()">调度</el-button>
                <el-button class="el-button--lw" type="primary" @click="diaodu()">调度(老)</el-button>
                <!--                <el-link type="primary" href="http://47.98.252.4/leqee_xxl.php">调度</el-link>-->
            </el-form-item>
            <el-form-item label="内贸token" prop="innerToken">
                <el-input v-model="formHead.innerToken" placeholder="内贸" style="width: 190px;" clearable
                          transfer></el-input>
            </el-form-item>
            <el-form-item label="观云长token" prop="outerToken">
                <el-input v-model="formHead.outerToken" placeholder="观云长" style="width: 190px;" clearable
                          transfer></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()">查询</el-button>
                <el-button type="primary" @click="refresh('formHead')">更新</el-button>
                <el-button @click="reset('formHead')">重置</el-button>
            </el-form-item>
        </el-form>
        <!--        <div class="lw_boder">-->
        <!--        </div>-->
        <LwBordor></LwBordor>

        <!--        <el-skeleton :rows="3" animated/>-->
    </div>
</template>

<script>
    import LwBordor from "../views/lw/LwBordor";

    export default {
        components: {
            LwBordor
        },
        name: "HeaderSearch",
        data() {
            // let checkNotEmpty = (rule, value, callback) => {
            //     console.log("lw_vaild" + value);
            //     if (isEmpty(value)) { //可以更改判定条件
            //         return callback(new Error('params can not be null'))
            //     } else {
            //         return callback()   //没有会使this.$refs[formName].validate有问题
            //     }
            // };
            return {
                formHead: {
                    innerToken: '',
                    outerToken: ''
                },
                headRules: {
                    innerToken: [
                        {required: true, message: '请输入内贸token', trigger: 'blur'},
                    ],
                    outerToken: [
                        {required: true, message: '请输入观云长token', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            refresh(formHead) {
                this.$refs[formHead].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs[formHead]);
                        // const _this = this
                        // console.log(this.formHead);
                        const _this = this
                        this.$http_php.get("/leqee_refresh_token.php", {
                            params: {
                                "leqee_token": this.formHead.innerToken,
                                "gyc_token": this.formHead.outerToken
                            }
                        }).then(res => {
                            console.log(res.data)
                            if (res.data.code === 0) {
                                _this.$alert('操作成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        // _this.$router.push("/blogs")
                                    }
                                });
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
            },
            reset(formHead) {
                this.$refs[formHead].resetFields();
            },
            diaodu() {
                window.open("http://47.98.252.4/leqee_xxl.php");
            },
            diaoduNew() {
                // window.open("http://47.98.252.4/leqee_xxl.php");
                let routeData = this.$router.resolve({
                    path: '/web/leqeeXxl',
                });
                window.open(routeData.location.path, "_blank");
            },
            search() {
                const _this = this
                this.$http_php.get("/leqee_refresh_token.php", {
                    params: {
                        "is_search": true
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code === 0) {
                        _this.formHead.innerToken = res.data.data.leqee;
                        _this.formHead.outerToken = res.data.data.gyc;
                        // _this.$alert('操作成功', '提示', {
                        //     confirmButtonText: '确定',
                        //     callback: action => {
                        //         // _this.$router.push("/blogs")
                        //     }
                        // });
                    } else {
                        _this.$alert('操作失败:' + JSON.stringify(res.data), '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push("/blogs")
                            }
                        });
                    }
                })
            }
        },
        created() {
            this.search();
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
</style>

