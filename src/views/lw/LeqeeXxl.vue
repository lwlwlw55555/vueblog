<template>
    <div>
        <HeaderSearch></HeaderSearch>
        <h3 style="text-align: center">调度</h3>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('ssyForm')">查询</el-button>
        </el-form-item>
        <div class="table-div">
            <el-form>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('')" size="medium">查询(全部)</el-button>
                    <el-button type="primary" @click="onSubmit('leqee')" size="medium">查询(内贸)</el-button>
                    <el-button type="primary" @click="onSubmit('gyc')" size="medium">查询(对外)</el-button>
                    <el-button type="primary" @click="download" size="medium">下载</el-button>
                </el-form-item>
            </el-form>
        </div>

        <LwBordor></LwBordor>

        <div class="table-div">

            <el-table
                    :data="tableDatas[0]"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[0]"
                        :label="tableNames[0]">
                    <el-table-column
                            v-for="item in tableColumns[0]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
                </el-table-column>
            </el-table>

            <LwBordor></LwBordor>

            <el-table
                    :data="tableDatas[1]"
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[1]"
                        :label="tableNames[1]">
                    <el-table-column
                            v-for="item in tableColumns[1]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
                </el-table-column>
            </el-table>

            <LwBordor></LwBordor>

            <el-table
                    :data="tableDatas[2]"
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[2]"
                        :label="tableNames[2]">
                    <el-table-column
                            v-for="item in tableColumns[2]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
                </el-table-column>
            </el-table>

            <LwBordor></LwBordor>

            <el-table
                    :data="tableDatas[3]"
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[3]"
                        :label="tableNames[3]">
                    <el-table-column
                            v-for="item in tableColumns[3]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
                </el-table-column>
            </el-table>

            <LwBordor></LwBordor>

            <el-table
                    :data="tableDatas[4]"
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[4]"
                        :label="tableNames[4]">
                    <el-table-column
                            v-for="item in tableColumns[4]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
                </el-table-column>
            </el-table>

            <LwBordor></LwBordor>

            <el-table
                    :data="tableDatas[5]"
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[5]"
                        :label="tableNames[5]">
                    <el-table-column
                            v-for="item in tableColumns[5]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
                </el-table-column>
            </el-table>

            <LwBordor></LwBordor>

            <el-table
                    :data="tableDatas[6]"
                    class="m-table2"
                    :header-cell-style="{textAlign:'center',background: '#07a023' ,color:'#1d1d1d'}"
                    :cell-style="{textAlign:'center'}" :row-class-name="tableRowClassName"
                    border>
                <el-table-column
                        :prop="tableNames[6]"
                        :label="tableNames[6]">
                    <el-table-column
                            v-for="item in tableColumns[6]" :key="item"
                            :prop="item"
                            align='center'
                            :formatter="formatter"
                            :label="item">
                    </el-table-column>
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
                tableColumns: [[], [], [], [], [], [], []],
                tableDatas: [[], [], [], [], [], [], []],
                tableNames: ['oms-v2-xxl-job', 'oms-kx-xxl-prod', 'oms-mz-xxl-prod', 'oms-mz2-xxl-prod', 'gyc-oms-xxl-job', 'PerfectDiary-Yiran-XXL-Job', 'ruyun-oms-xxl-job']
            }
        },
        methods: {
            onSubmit(db_type) {
                const _this = this
                console.log(db_type, "db_type")
                console.log("lw begin", db_type)
                // return;
                Loading.service({target: document.body});
                this.$http_php.get("/leqee_xxl_new.php", {
                    params: {
                        db_type: db_type
                    }
                }).then(res => {
                    let loadingInstance = Loading.service({target: document.body});
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                    // this.tableColumns = [[], [], [], [], [], [], []]
                    this.tableDatas = [[], [], [], [], [], [], []]
                    //console.log(res.data)
                    if (res.data.code === 0) {
                        _this.tableData = [];

                        let data = res.data.data;

                        for (let i = 0; i < 7; i++) {
                            // console.log(data[this.tableNames[i]], "foahihishaf")
                            if (data[this.tableNames[i]] !== undefined) {
                                this.tableColumns[i] = Object.keys(data[this.tableNames[i]][0]);
                                // console.log(Object.keys(data[this.tableNames[i]][0]), "foahihishaf")
                                for (let ii in data[this.tableNames[i]]) {
                                    console.log(Object.values(data[this.tableNames[i]][ii]), "llwlwl")
                                    this.tableDatas[i].push(data[this.tableNames[i]][ii]);
                                }
                            }
                        }

                        // console.log(this.tableDatas, "lwData")
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
            download() {
                // Loading.service({target: document.body});
                this.$http_php({
                    method: 'get',
                    url: "/leqee_xxl_export.php",
                    responseType: 'blob'
                }).then(function (response) {
                    // let loadingInstance = Loading.service({target: document.body});
                    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    //     loadingInstance.close();
                    // });
                    console.log(response)
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    console.log(response.headers)
                    fileLink.setAttribute('download', response.headers['filename']);
                    document.body.appendChild(fileLink);

                    fileLink.click();
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (row['address_list'] === null || row['handle_time'] == null) {
                    // console.log(row['address_list'], "row??????")
                    return 'warning-row';
                }
                return '';
            }
        }
    }
</script>

<style scoped>
    @import "../../lw.css";

    .m-table {
        /*max-width: 660px;*/
        max-width: 801px;
        margin: 0 auto;
        text-align: center;
        /*font-style: #4cae4c;*/
    }

    /*.m-table2 {
        !*max-width: 660px;*!
        max-width: 941px;
        margin: 0 auto;
        text-align: center;
        !*font-style: #4cae4c;*!
    }
*/
    .styleTable {
        overflow-x: auto;
        white-space: nowrap;
        margin-bottom: 25px;
    }

    .table-div {
        /*display: inline-table;*/
        text-align: center;
    }

    /*.symbolWrap .el-table {*/
    /*    display: inline-table;*/
    /*    vertical-align: top;*/
    /*    overflow-x: auto;*/
    /*    !*auto !important;*!*/
    /*}*/

    /*.symbolWrap .el-table__body-wrapper {*/
    /*    vertical-align: top;*/
    /*    overflow-x: auto;*/
    /*    !*auto !important;*!*/
    /*}*/
</style>