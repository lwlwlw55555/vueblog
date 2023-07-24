<template>
    <div>
        <div>
            <h1 style="text-align: center;color: red;">25号还花呗！！</h1>
            <h2 style="text-align: center;color: #48D1CC">20号还抖音！！</h2>
            <h3 style="text-align: center;color: #4cae4c">6号还美团！！</h3>
            <h4 style="text-align: center;color: #0e87e3">LW-JSON解析工具</h4>
            <LwBordor></LwBordor>
        </div>

        <el-form :model="jsonForm" :rules="computed" ref="jsonForm" size="medium"
                 :inline="true"
                 style="text-align: center;">
            <el-form-item title="JSON" prop="textarea">
<!--                <el-input-->
<!--                        type="textarea" show-word-limit-->
<!--                        :rows="5"-->
<!--                        style="width: 750px;font-size: 19px"-->
<!--                        placeholder="请输入内容"-->
<!--                        v-model="jsonForm.textarea">-->
<!--                </el-input>-->
<!--                <b-code-editor v-model="jsonForm.textarea" :auto-format="true" :smart-indent="true" theme="idea" :indent-unit="40"-->
<!--                               :line-wrap="true" :lint="false" style="width: 100000px" ref="editor"></b-code-editor>-->
                <b-code-editor v-model="jsonForm.textarea" :lint="false" :autoFormat="false" :lineWrap="false" :auto-format="true" :smart-indent="true"
                               theme="material" style="width:760px;max-block-size: 760px;text-align: left" :indent-unit="4"
                               :line-wrap="false" ref="editor">

                </b-code-editor>
                <!--                :lint="false"-->
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="json('jsonForm')">转化</el-button>
                <el-button @click="reset('jsonForm')">重置</el-button>
            </el-form-item>
            <br>
            <el-form-item title="报文详情" v-if="isShow">
                <el-form-item>
                    <el-button type="text" @click="copyClick()">复制报文</el-button>
                </el-form-item>
                <json-viewer boxed class="el-button--lw" copyable
                             style="text-align: left; width: 760px;background: #fcf8e3;"
                             :value="jsonResult" sort expanded>
                </json-viewer>
            </el-form-item>

            <!--            <el-form-item>-->
            <!--                <json-viewer boxed class="el-button&#45;&#45;lw"-->
            <!--                             style="text-align: left; width: 750px;background: #fcf8e3; "-->
            <!--                             :value="jsonResult" sort expanded>-->
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
                jsonForm: {
                    textarea: ''
                },
                jsonResult: undefined,
                isShow: false,
                copyable: {copyText: '复制', copiedText: '已复制', timeout: 2000},
                computed: {
                    textarea: [
                        {required: true, message: "请输入JSON", trigger: "blur"}
                    ],
                }
            };
        },
        methods: {
            reset(jsonForm) {
                console.log(this.$refs)
                this.$refs[jsonForm].resetFields();
            },


            json(jsonForm) {
                this.$refs[jsonForm].validate((valid) => {
                    if (valid) {
                        // console.log(this.$refs[orderForm]);
                        // const _this = this
                        // console.log(this.formHead);
                        const _this = this
                        // let text = JSON.stringify(this.jsonResult, null, 2);
                        try {
                            console.log(this.jsonForm.textarea)
                            _this.jsonResult = JSON.parse(this.jsonForm.textarea)
                        } catch (err) {
                            console.log("2222")
                            console.log(err)
                            let nPosition = err.message.replace(/[^0-9]/ig, "");
                            let text = this.jsonForm.textarea.substr(0, nPosition) || this.jsonForm.textarea
                            _this.jsonResult = '报错了：' + err.message
                        }
                        _this.isShow = true
                    }
                });
            },
            copyClick() {
                const text = document.createElement('textarea'); // 创建节点
                text.setAttribute('readonly', 'readonly');
                text.value = JSON.stringify(this.jsonResult, null, 2); // 赋值
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

