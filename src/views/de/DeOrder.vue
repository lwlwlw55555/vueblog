<template>
    <div>
        <div>
            <h3 style="text-align: center">DE电商-U1对接订单报文查看</h3>
            <LwBordor></LwBordor>
        </div>

        <el-form :model="orderForm" :rules="computed" ref="orderForm" size="medium"
                 :inline="true"
                 style="text-align: center;">

            <el-form-item label="类别" prop="orderType">
                <el-select v-model="orderForm.orderType" placeholder="类别" style="width: 160px;" :filterable=true
                           clearable
                           @change="typeChange" @focus="typeChange" v-loadmore="typeChange"
                           value-key="name">
                    <el-option v-for="(item,index) in typeList" :key="item.key" :label="item.name"
                               :value="item">
                        {{ item.name }}
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="店铺" prop="shopNameType">
                <el-select v-model="orderForm.shopNameType" placeholder="店铺" style="width: 170px;" :filterable=true
                           clearable
                           @change="shopNameTypeChange" @focus="shopNameTypeChange"
                           v-loadmore="shopNameTypeChange" value-key="name">
                    <el-option v-for="(item,index) in shopNameTypeList" :key="item.name" :label="item.name"
                               :value="item">
                        {{ item.name }}
                    </el-option>
                </el-select>
            </el-form-item>

            <br>
            <el-form-item label="平台订单号" prop="platformOrderSn">
                <el-input v-model="orderForm.platformOrderSn" placeholder="平台订单号" style="width: 280px;" clearable
                          transfer></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="search('orderForm')">查询</el-button>
                <el-button @click="reset('orderForm')">重置</el-button>
            </el-form-item>
            <br>

            <el-form-item title="报文详情"  v-if="isShow">
                <el-form-item>
                    <el-button type="text" @click="copyClick()">复制报文</el-button>
<!--                    <el-button type="text" @click="copyClick()">下载报文</el-button>-->
                </el-form-item>
                <json-viewer boxed class="el-button--lw" copyable
                             style="text-align: left; width: 750px;background: #fcf8e3; "
                             :value="orderResult" sort expanded>
                </json-viewer>
            </el-form-item>

<!--            <el-form-item>-->
<!--                <json-viewer boxed class="el-button&#45;&#45;lw"-->
<!--                             style="text-align: left; width: 750px;background: #fcf8e3; "-->
<!--                             :value="orderResult" sort expanded>-->
<!--                </json-viewer>-->
<!--            </el-form-item>-->

        </el-form>

    </div>

</template>

<script>
    import LwBordor from "@/views/lw/LwBordor";
    import {Loading} from 'element-ui';
    import JsonViewer from 'vue-json-viewer'

    export default {
        components: {
            LwBordor,
            JsonViewer
        },
        name: "DeOrder",
        data() {
            return {
                // url: this.$http_java.defaults.baseURL,
                // fileList: [],
                typeList: [],
                shopNameTypeList: [],
                orderForm: {
                    orderType: '',
                    shopNameType: '',
                    platformOrderSn: '',
                },
                orderResult: undefined,
                isShow:false,
                copyable: {copyText: '复制', copiedText: '已复制', timeout: 2000},
                computed: {
                    // type: [
                    //     {required: true, message: '类别必选', triangle: 'blur'},
                    // ],
                    orderType: [
                        {required: true, message: "不能为空", trigger: "change"}
                    ],
                    platformOrderSn: [
                        {required: true, message: '请输入平台订单号', trigger: 'blur'},
                    ],
                }
            };
        },
        methods: {
            reset(orderForm) {
                console.log(this.$refs)
                this.$refs[orderForm].resetFields();
            },
            typeChange() {
                const _this = this
                console.log(_this.typeList);
                if (_this.typeList.length === 0) {
                    this.$http_java.post("/open/orderType").then(res => {
                        console.log(res.data)
                        if (res.data.code === 0) {
                            _this.typeList = res.data.data;
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

            shopNameTypeChange() {
                const _this = this
                console.log(_this.shopNameTypeList);
                if (_this.shopNameTypeList.length === 0) {
                    this.$http_java.post("/open/orderShopNameType", "").then(res => {
                        console.log(res)
                        if (res.data.code === 0) {
                            _this.shopNameTypeList = res.data.data;
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

            onChange(res) {
                this.$emit('getRes', {
                    typeList: res,
                });
            },

            search(orderForm) {
                // console.log(this.$refs[orderForm])
                console.log(this.orderForm.orderType)
                console.log(this.orderForm.platformOrderSn)
                this.$refs[orderForm].validate((valid) => {
                    if (valid) {
                        // console.log(this.$refs[orderForm]);
                        // const _this = this
                        // console.log(this.formHead);
                        const _this = this
                        console.log(1111)

                        console.log(_this.orderForm.orderType)

                        console.log(_this.orderForm.orderType.key === 'AFTER_SALE_RETURN')

                        if (_this.orderForm.orderType.key === 'AFTER_SALE_RETURN') {
                            _this.$http_java.post("/open/afterSaleReturnOrder/byId", {
                                "shopName": _this.orderForm.shopNameType.name,
                                "platformOrderSn": _this.orderForm.platformOrderSn
                            }).then(res => {
                                console.log(res.data)
                                if (res.data.code === 0) {
                                    _this.orderResult = res.data.data
                                    _this.isShow = true;
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
                        } else {
                            _this.$http_java.post("/open/order/byId", {
                                "shopName": _this.orderForm.shopNameType.name,
                                "platformOrderSn": _this.orderForm.platformOrderSn
                            }).then(res => {
                                console.log(res.data)
                                if (res.data.code === 0) {
                                    _this.orderResult = res.data.data
                                    this.isShow = true;
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

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            copyClick() {
                const text = document.createElement('textarea'); // 创建节点
                text.setAttribute('readonly', 'readonly');
                text.value = JSON.stringify(this.orderResult,null,2); // 赋值
                document.body.appendChild(text); // 插入节点
                text.setSelectionRange(0, text.value.length);
                text.select(); // 选中节点
                document.execCommand('copy'); // 执行浏览器复制方法
                if (document.body.removeChild(text)) {
                    this.$message({type: 'success', message: '复制成功'})
                } else {
                    this.$message({type: 'error', message: '复制失败'})
                }
            },
            // showrawdata(data) {
            //     this.loading = true;
            //     refundAPI.refundQuery_RawData({ outRefundNo: data.outRefundNo }).then(
            //         data => {
            //             if (data.code == 0) {
            //                 this.jsondata = data.data;
            //                 this.isShow = true;
            //             } else {
            //                 this.$message({
            //                     message: data.message,
            //                     type: 'warning',
            //                 });
            //             }
            //             this.loading = false;
            //         }
            //     )
            // },
        }
        ,
        // created() {
        //     this.refreshOuterId();
        // }
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
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 3px rgba(0, 0, 0, .50);
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
        color: #122b40;
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
        color: #122b40;
    }

    .el-button--lw {
        color: #122b40;
        background-color: #20B2AA;
        border-color: #20B2AA;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--lw_add {
        color: #122b40;
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
</style>

