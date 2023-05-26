<template>
    <div>
        <div>
            <h3 style="text-align: center">DE电商-U1对接订单数据导入</h3>
            <LwBordor></LwBordor>
        </div>

        <el-form :model="uploadForm" ref="uploadForm" size="medium" class="demo-dynamic" :inline="true"
                 style="text-align: center;">

            <!--            <el-form-item label="类别">-->
            <!--                <el-select v-model="uploadType" placeholder="类别" style="width: 160px;" :filterable=true clearable-->
            <!--                           @change="uploadTypeChange" @focus="uploadTypeChange" v-loadmore="uploadTypeChange" value-key="name">-->
            <!--                    <el-option v-for="(item,index) in uploadTypeList" :key="item.key" :label="item.name"-->
            <!--                               :value="item">-->
            <!--                        {{ item.name }}-->
            <!--                    </el-option>-->
            <!--                </el-select>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="店铺">-->
            <!--                <el-select v-model="uploadShopNameType" placeholder="订单类必选" style="width: 170px;" :filterable=true clearable-->
            <!--                           @change="uploadShopNameTypeChange" @focus="uploadShopNameTypeChange" v-loadmore="uploadShopNameTypeChange" value-key="name">-->
            <!--                    <el-option v-for="(item,index) in uploadShopNameTypeList" :key="item.key" :label="item.name"-->
            <!--                               :value="item">-->
            <!--                        {{ item.name }}-->
            <!--                    </el-option>-->
            <!--                </el-select>-->
            <!--            </el-form-item>-->

            <el-form-item>
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        accept=".xls,.xlsx"
                        :action="url+uploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        :on-success="uploadSuccess"
                >
                    <el-button slot="trigger" size="big" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="big" type="success" @click="submitUpload">导入数据
                    </el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
                </el-upload>
            </el-form-item>

        </el-form>
    </div>

</template>

<script>
    import LwBordor from "@/views/lw/LwBordor";
    import {Loading} from 'element-ui';


    export default {
        components: {
            LwBordor
        },
        data() {
            return {
                url: this.$http_java.defaults.baseURL,
                uploadUrl: '/upload/uploadFile',
                fileList: [],
                uploadType: '',
                uploadTypeList: [],
                uploadShopNameType: '',
                uploadShopNameTypeList: []
            };
        },
        methods: {
           // todo el-upload上传文件携带额外参数

           //todo see https://blog.csdn.net/weixin_46361114/article/details/129916362
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            uploadSuccess(res, file, fileList) {
                console.log(res)
                console.log(file)
                const _this = this
                if (res.code === 0) {
                    _this.$alert("【" + file.name + '】操作成功，共录入' + res.data + "条数据!", '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            // _this.$router.push("/blogs")
                        }
                    });
                    this.refreshOuterId();
                } else {
                    console.log(1111)
                    _this.$alert("【" + file.name + '】操作失败：' + ((Object.keys(res.data).length === 0) ? res.message : res.data), '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            // _this.$router.push("/blogs")
                        }
                    });
                }
            }

            // uploadTypeChange() {
            //     const _this = this
            //     console.log(_this.uploadTypeList);
            //     if (_this.uploadTypeList.length === 0) {
            //         this.$http_java.post("/upload/uploadType").then(res => {
            //             console.log(res.data)
            //             if (res.data.code === 0) {
            //                 _this.uploadTypeList = res.data.data;
            //             } else {
            //                 _this.$alert('操作失败:' + JSON.stringify(res.data), '提示', {
            //                     confirmButtonText: '确定',
            //                     callback: action => {
            //                         // _this.$router.push("/blogs")
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // },
            //
            // uploadShopNameTypeChange() {
            //     const _this = this
            //     console.log(_this.uploadShopNameTypeList);
            //     if (_this.uploadShopNameTypeList.length === 0) {
            //         this.$http_java.post("/upload/uploadShopNameType","").then(res => {
            //             console.log(res)
            //             if (res.data.code === 0) {
            //                 _this.uploadShopNameTypeList = res.data.data;
            //             } else {
            //                 _this.$alert('操作失败:' + JSON.stringify(res.data), '提示', {
            //                     confirmButtonText: '确定',
            //                     callback: action => {
            //                         // _this.$router.push("/blogs")
            //                     }
            //                 });
            //             }
            //         })
            //     }
            // },

            // onChange(res) {
            //     this.$emit('getRes', {
            //         uploadTypeList: res,
            //     });
            // },


        },
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

