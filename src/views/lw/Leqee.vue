<template>
    <div>

        <HeaderSearch></HeaderSearch>
        <div>
            <h3 style="text-align: center">The search tool for order count</h3>
            <el-form ref="ssyForm" :inline="true" :model="ssyForm" size="medium" style="text-align: center;">
                <!--            size可取值为medium / small / mini-->
                <el-form-item label="时间">
                    <DateRange v-model="ssyForm.date" style="width: 370px;"
                               @getDate="(data)=>{this.ssyForm.date = data.date}"></DateRange>
                </el-form-item>

                <el-form-item label="店铺">
                    <Shop v-model="ssyForm.shop" @getRes="(data)=>{this.ssyForm.shop = data.shop}"></Shop>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('ssyForm')">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    v-loading="loading"
                    :data="tableData"
                    stripe
                    class="m-table" :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}"
                    border>
                <el-table-column
                        fixed
                        prop="date"
                        label="日期"
                        width="400"
                >
                </el-table-column>
                <el-table-column
                        prop="platform"
                        label="平台"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="shop"
                        label="店铺"
                        width="200"
                >
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="数量"
                        width="100"
                >
                </el-table-column>
                <!--            <el-table-column-->
                <!--                    fixed="right"-->
                <!--                    label="操作"-->
                <!--                    width="155"-->
                <!--            >-->
                <!--                <template slot-scope="scope">-->
                <!--                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                <!--                    <el-button type="text" size="small">编辑</el-button>-->
                <!--                </template>-->
                <!--            </el-table-column>-->
            </el-table>
        </div>
        <LwBordor></LwBordor>
        <div class="table-div">
            <h3 style="text-align: center">The top N for order count</h3>
            <el-form ref="ssyTopN" :inline="true" :model="ssyTopN" size="medium" fit
                     border>
                <el-form-item label="时间">
                    <DateRange v-model="ssyTopN.date" style="width: 370px;"
                               @getDate="(data)=>{this.ssyTopN.date = data.date}"></DateRange>
                </el-form-item>
                <el-form-item label="top N">
                    <el-select v-model="ssyTopN.topN" filterable style="width: 80px">
                        <el-option
                                v-for="item in ssyTopN.topN_list"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitTopN">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    v-loading="loading2"
                    :data="topNData"
                    stripe
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}"
                    border>
                <el-table-column
                        prop="no"
                        label="no"
                        width="40"
                >
                </el-table-column>
                <el-table-column
                        prop="platform"
                        label="平台"
                        width="60"
                >
                </el-table-column>
                <el-table-column
                        prop="shop"
                        label="店铺"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="数量"
                        width="90"
                >
                </el-table-column>
                <el-table-column
                        prop="platform1"
                        label="平台"
                        width="60"
                >
                </el-table-column>
                <el-table-column
                        prop="shop1"
                        label="店铺"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="num1"
                        label="数量"
                        width="90"
                >

                </el-table-column>
                <el-table-column
                        prop="platform2"
                        label="平台"
                        width="60"
                >
                </el-table-column>
                <el-table-column
                        prop="shop2"
                        label="店铺"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="num2"
                        label="数量"
                        width="90"
                >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import DateRange from "../lw/DateRange";
    import HeaderSearch from "../../components/HeaderSearch";
    import {timeChina} from "@/dateutil";
    import {Loading} from 'element-ui';
    import Shop from "../lw/Shop";
    import LwBordor from "@/views/lw/LwBordor";


    export default {
        components: {
            DateRange,
            HeaderSearch,
            Shop,
            LwBordor
        },
        data() {
            return {
                ssyForm: {
                    date: [],
                    shop: '',
                    shop_list: [],
                },
                ssyTopN: {
                    date: [],
                    topN: 10,
                    topN_list: [5, 10, 20, 50, 100]
                },
                tableData: [],
                topNData: [],
                loading: false,
                loading2: false,
                rules: {
                    date: [
                        {required: true},
                    ]
                }
            }
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // const _this = this
                        console.log("lw begin")
                        console.log((this.ssyForm.date[0]))
                        console.log((this.ssyForm.date[1]))
                        // return
                        const _this = this
                        console.log(timeChina(this.ssyForm.date[0]))
                        console.log(timeChina(this.ssyForm.date[1]))
                        // console.log(this.ssyForm.dateutil)
                        console.log(this.ssyForm.shop)
                        // return;
                        _this.loading = true
                        // Loading.service({target: document.body});
                        this.$http_php.get("/leqee_get_order_count.php", {
                            params: {
                                "start_date": timeChina(_this.ssyForm.date[0]),
                                "end_date": timeChina(_this.ssyForm.date[1]),
                                "shop_id": _this.ssyForm.shop.shop_id,
                                "shop_nick": _this.ssyForm.shop.shop_nick
                            }
                        }).then(res => {
                            _this.loading = false
                            // let loadingInstance = Loading.service({target: document.body});
                            // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            //     loadingInstance.close();
                            // });
                            console.log(res.data)
                            if (res.data.code === 0) {
                                // _this.ssyForm.shop_list = res.data.data;
                                _this.tableData = [];

                                let data = res.data.data;
                                for (let i in data) {
                                    console.log(i, data[i]);
                                    let row = []
                                    row['date'] = timeChina(_this.ssyForm.date[0]) + ' 至 ' + timeChina(_this.ssyForm.date[1])
                                    row['platform'] = i
                                    row['num'] = data[i]
                                    row['shop'] = _this.ssyForm.shop.shop_nick == null ? '全部' : _this.ssyForm.shop.shop_nick
                                    _this.tableData.push(row)
                                }
                                console.log(_this.tableData)
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
            onSubmitTopN() {
                const _this = this
                _this.loading2 = true
                console.log(_this.ssyTopN)
                this.$http_php.get("/leqee_get_order_count.php", {
                    params: {
                        "start_date": timeChina(_this.ssyTopN.date[0]),
                        "end_date": timeChina(_this.ssyTopN.date[1]),
                        "topN": _this.ssyTopN.topN
                    }
                }).then(res => {
                    _this.loading2 = false
                    // let loadingInstance = Loading.service({target: document.body});
                    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    //     loadingInstance.close();
                    // });
                    console.log(res.data)
                    if (res.data.code === 0) {
                        _this.topNData = [];

                        let data = res.data.data;
                        // console.log(data)
                        for (let i = 0; i < _this.ssyTopN.topN; i++) {
                            // console.log(data,"lwlwl2")
                            let row = [];
                            row['no'] = i + 1;
                            if (data['sync'][i] != null) {
                                row['platform'] = 'sync'
                                row['shop'] = data['sync'][i]['shopNick'];
                                row['num'] = data['sync'][i]['count'];
                            }
                            if (data['origin'][i] != null) {
                                row['platform1'] = 'origin'
                                row['shop1'] = data['origin'][i]['shopNick'];
                                row['num1'] = data['origin'][i]['count'];
                            }
                            if (data['oms'][i] != null) {
                                row['platform2'] = 'oms'
                                row['shop2'] = data['oms'][i]['shopNick'];
                                row['num2'] = data['oms'][i]['count'];
                            }
                            _this.topNData.push(row)
                        }
                        console.log(_this.topNData)
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
            setOrderTime(data) {
                console.log(data, "data", "data")
                this.ssyForm.date = data.date
            }
        }
    }
</script>

<style scoped>
    .m-table {
        /*max-width: 660px;*/
        max-width: 801px;
        margin: 0 auto;
        text-align: center;
        /*font-style: #4cae4c;*/
    }

    .m-table2 {
        /*max-width: 660px;*/
        max-width: 941px;
        margin: 0 auto;
        text-align: center;
        /*font-style: #4cae4c;*/
    }

    .styleTable {
        overflow-x: auto;
        white-space: nowrap;
        margin-bottom: 25px;
    }

    .table-div {
        /*display: inline-table;*/
        text-align: center;
    }

    .symbolWrap .el-table {
        display: inline-table;
        vertical-align: top;
        overflow-x: auto;
        /*auto !important;*/
    }

    .symbolWrap .el-table__body-wrapper {
        vertical-align: top;
        overflow-x: auto;
        /*auto !important;*/
    }
</style>