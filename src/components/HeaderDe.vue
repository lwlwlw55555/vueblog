<template>
    <div class="m-content">
        <el-form :model="formHead" :inline="true" ref="formHead" size="small"
                 style="text-align: center; margin-top: 10px;margin-bottom: -20px">
            <el-form-item>
                <el-button class="el-button--upload" type="primary" @click="de()">订单录入</el-button>
                <el-button class="el-button--gift" type="primary" @click="gift()">赠品设置</el-button>
                <el-button class="el-button--lw" type="primary" @click="order()">报文查看</el-button>
            </el-form-item>
        </el-form>
        <!--        <div class="lw_boder">-->
        <!--        </div>-->
<!--        <LwBordor></LwBordor>-->

        <!--        <el-skeleton :rows="3" animated/>-->
    </div>
</template>

<script>
    import LwBordor from "../views/lw/LwBordor";

    export default {
        components: {
            LwBordor
        },
        name: "HeaderDe",
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
                formHead:{

                }
            };
        },
        methods: {
            de() {
                // window.open("http://121.40.113.153/leqee_xxl.php");
                let routeData = this.$router.resolve({
                    path: '/web/de',
                });
                window.open(routeData.location.path, "_blank");
            },
            gift() {
                // window.open("http://121.40.113.153/leqee_xxl.php");
                let routeData = this.$router.resolve({
                    path: '/web/gift',
                });
                window.open(routeData.location.path, "_blank");
            },
            order() {
                // window.open("http://121.40.113.153/leqee_xxl.php");
                let routeData = this.$router.resolve({
                    path: '/web/order',
                });
                window.open(routeData.location.path, "_blank");
            }
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

    .el-button--upload {
        color: #FFF;
        background-color: #b5a300;
        border-color: #b5a300;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--upload:focus,
    .el-button--upload:hover {
        background: #e9cf03;
        border-color: #e9cf03;
        color: #fff;
    }


    .el-button--gift {
        color: #FFF;
        background-color: #6d77ef;
        border-color: #6d77ef;
        box-shadow: 0 3px 3px rgba(0, 0, 0, .50), 0 0 6px rgba(0, 0, 0, .50);
        border-radius: 3px;
    }

    .el-button--gift:focus,
    .el-button--gift:hover {
        background: #3278ea;
        border-color: #3278ea;
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

