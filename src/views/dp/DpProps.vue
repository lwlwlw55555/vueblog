<template>
    <div>
        <div>
            <h3 style="text-align: center">dp-LW Private Server Props</h3>
            <LwBordor></LwBordor>
            <el-form ref="dpProps" :inline="true" :model="dpProps" :rules="headRules" size="medium" style="text-align: center;">

                <el-form-item label="TCP" prop="TCP">
                    <el-input v-model="dpProps.TCP" placeholder="TCP" style="width: 245px;" clearable
                              transfer></el-input>
                </el-form-item>
                <el-form-item label="HTTP" prop="HTTP">
                    <el-input v-model="dpProps.HTTP" placeholder="HTTP" style="width: 245px;" clearable
                              transfer></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('dpProps')" size="mini">提交</el-button>
                    <el-button type="primary" @click="reStart()" size="mini">重启</el-button>
                    <el-button type="primary" @click="stop()" size="mini">停止</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import LwBordor from "@/views/lw/LwBordor";


    export default {
        components: {
            LwBordor
        },
        data() {
            return {
                dpProps: {
                    TCP: '',
                    HTTP: ''
                },
                headRules: {
                    TCP: [
                        {required: true, message: '请输入TCP', trigger: 'blur'},
                    ],
                    HTTP: [
                        {required: true, message: '请输入HTTP', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            onSubmit(dpProps) {
                this.$refs[dpProps].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs[dpProps]);
                        // const _this = this
                        // console.log(this.formHead);
                        const _this = this
                        this.$http_php.get("/dp_props.php", {
                            params: {
                                "BI-EB-URL": this.dpProps.HTTP,
                                "BI-DB-URL": this.dpProps.TCP
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
                })
            },
            reStart(){
                const _this = this
                this.$http_php.get("/dp_props.php", {
                    params: {
                        "restart": true
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code === 0) {
                        _this.$alert('重启成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push("/blogs")
                            }
                        });
                    } else {
                        _this.$alert('重启失败:' + JSON.stringify(res.data), '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push("/blogs")
                            }
                        });
                    }
                })
            },
            stop(){
                const _this = this
                this.$http_php.get("/dp_props.php", {
                    params: {
                        "stop": true
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code === 0) {
                        _this.$alert('停止成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push("/blogs")
                            }
                        });
                    } else {
                        _this.$alert('停止失败:' + JSON.stringify(res.data), '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // _this.$router.push("/blogs")
                            }
                        });
                    }
                })
            },
            search() {
                const _this = this
                this.$http_php.get("/dp_props.php").then(res => {
                    console.log(res.data)
                    if (res.data.code === 0) {
                        _this.dpProps.TCP = res.data.data['BI-DB-URL'];
                        _this.dpProps.HTTP = res.data.data['BI-EB-URL'];
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