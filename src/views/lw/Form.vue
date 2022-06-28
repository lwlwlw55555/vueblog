<template>
    <!--    <div>-->
    <!--        <HeaderSearch></HeaderSearch>-->
    <!--        <div class="form-group">-->
    <!--            <label for="">订单时间: </label>-->
    <!--            <DateRange></DateRange>-->

    <!--            <template slot="searchOperations">-->
    <!--                <Button type="primary" @click="getTableList2"> <i class="iconfont icon-chaxun"></i>查询 </Button>-->
    <!--            </template>-->
    <!--        </div>-->
    <!--    </div>-->
    <div>
        <HeaderSearch></HeaderSearch>
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="活动名称">
                <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-col :span="11">
                    <el-date-picker type="dateutil" placeholder="选择日期" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="sizeForm.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox-group v-model="sizeForm.type">
                    <el-checkbox-button label="美食/餐厅线上活动" name="type"></el-checkbox-button>
                    <el-checkbox-button label="地推活动" name="type"></el-checkbox-button>
                    <el-checkbox-button label="线下主题活动" name="type"></el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
                <el-radio-group v-model="sizeForm.resource" size="medium">
                    <el-radio border label="线上品牌商赞助"></el-radio>
                    <el-radio border label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-container>
            <el-main>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>

            </el-main>
        </el-container> -->
    </div>
</template>

<script>
    import DateRange from "../lw/DateRange";
    import HeaderSearch from "../../components/HeaderSearch";

    export default {
        components: {
            DateRange,
            HeaderSearch
        },
        data() {
            return {
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            };
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>


<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .mlogo {
        height: 60%;
        margin-top: 10px;
    }

    .demo-ruleForm {
        max-width: 500px;
        margin: 0 auto;
    }

</style>