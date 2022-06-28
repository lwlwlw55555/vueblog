<!-- 即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent。 -->
<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域" style="width: 100%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
<!--        <el-form-item label="活动名称">-->
<!--            <el-input ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动区域">-->
<!--            <el-select v-model="formInline.region" placeholder="请选择活动区域">-->
<!--                <el-option label="区域一" value="shanghai"></el-option>-->
<!--                <el-option label="区域二" value="beijing"></el-option>-->
<!--            </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="活动时间">-->
<!--            <el-col :span="11">-->
<!--                <el-dateutil-picker type="dateutil" placeholder="选择日期" v-model="formInline.date1"-->
<!--                                style="width: 100%;"></el-dateutil-picker>-->
<!--            </el-col>-->
<!--            <el-col class="line" :span="2">-</el-col>-->
<!--            <el-col :span="11">-->
<!--                <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>-->
<!--            </el-col>-->
<!--        </el-form-item>-->
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>