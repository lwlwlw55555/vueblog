<template>
    <div>
        <div>
            <h3 style="text-align: center">DE电商-U1回传配置</h3>
            <LwBordor></LwBordor>
            <el-form ref="deControl" :inline="true" :model="deControl" size="medium" style="text-align: center;">
                <el-form-item label="回传配置">
                    <template>
                        <el-radio v-model="deControl.radio" label="NORMAL">正常回传</el-radio>
                        <el-radio v-model="deControl.radio" label="REFUND">只回传退款退货</el-radio>
                        <el-radio v-model="deControl.radio" label="OFFLINE">不回传</el-radio>
                    </template>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('deControl')" size="mini">提交</el-button>
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
                deControl: {
                    radio: 'NORMAL'
                }
            };
        },
        methods: {
            onSubmit(deControl) {
                this.$refs[deControl].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs[deControl]);
                        // const _this = this
                        // console.log(this.formHead);
                        const _this = this
                        this.$http_php.get("/de_control.php", {
                            params: {
                                "control_status": this.deControl.radio
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
            search() {
                const _this = this
                this.$http_php.get("/de_control.php").then(res => {
                    console.log(res.data)
                    if (res.data.code === 0 && res.data.data.control_status != null) {
                        _this.deControl.radio = res.data.data.control_status;
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

</style>