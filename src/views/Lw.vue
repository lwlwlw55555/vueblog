<template>
    <div id="ssyOrderCount">
        <!--获取时间段内（店铺--可选）的各系统订单量-->
        <div class="box-search">
            <search-content>
                <template slot="searchContent">
                    <div class="form-group">
                        <label for="">订单时间</label>
                        <date-range-picker
                            :needhms="true"
                            :start-time="searchDataOne.startDate"
                            :end-time="searchDataOne.endDate"
                            @getDate="setOrderTime"
                        >
                        </date-range-picker>
                    </div>
                    <div class="form-group">
                        <label for="">店铺</label>
                        <component id="searchShop" is="select-shop" v-model="searchDataOne.shopId" platform="TAOBAO" @selected="selectedShop">
                        </component>
                    </div>
                </template>
                <template slot="searchOperations">
                    <Button type="primary" @click="getTableList1"> <i class="iconfont icon-chaxun"></i>查询 </Button>
                </template>
            </search-content>
            <div class="table-content">
                <table class="main-table">
                    <thead>
                        <th>聚石塔单量</th>
                        <th>原始单单量</th>
                        <th>sync单单量</th>
                    </thead>
                    <tbody>
                        <tr v-if="Object.keys(tableOneInfo).length">
                            <td>{{ tableOneInfo.jushitaCount }}</td>
                            <td>{{ tableOneInfo.originCount }}</td>
                            <td>{{ tableOneInfo.syncCount }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="Object.keys(tableOneInfo).length === 0" class="table-note"><i class="iconfont icon-xiaolian"></i>暂无数据</div>
            </div>
        </div>

        <!--获取时间段内的各系统订单量top n的list-->
        <div class="box-search mt-20">
            <search-content>
                <template slot="searchContent">
                    <div class="form-group">
                        <label for="">订单时间</label>
                        <date-range-picker
                            :needhms="true"
                            :start-time="searchDataTwo.startDate"
                            :end-time="searchDataTwo.endDate"
                            @getDate="setOrderTime2"
                        >
                        </date-range-picker>
                    </div>
                    <div class="form-group">
                        <label for="">Top N</label>
                        <Select v-model="searchDataTwo.offset">
                            <Option :value="10">10</Option>
                            <Option :value="20">20</Option>
                            <Option :value="50">50</Option>
                            <Option :value="100">100</Option>
                        </Select>
                    </div>
                </template>
                <template slot="searchOperations">
                    <Button type="primary" @click="getTableList2"> <i class="iconfont icon-chaxun"></i>查询 </Button>
                </template>
            </search-content>
            <div class="table-flex-box">
                <div class="table-content table-flex-item">
                    <table class="main-table">
                        <caption>
                            <center>聚石塔</center>
                        </caption>

                        <thead>
                            <th>店铺</th>
                            <th>单量</th>
                        </thead>
                        <tbody>
                            <template v-if="tableTopInfo.jushitaLimit && tableTopInfo.jushitaLimit.length > 0">
                                <tr v-for="item in tableTopInfo.jushitaLimit">
                                    <td>{{ item.sellerNick }}</td>
                                    <td>{{ item.count }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div v-if="!tableTopInfo.jushitaLimit || tableTopInfo.jushitaLimit.length === 0" class="table-note">
                        <i class="iconfont icon-xiaolian"></i>暂无数据
                    </div>
                </div>
                <div class="table-content table-flex-item">
                    <table class="main-table">
                        <caption>
                            <center>sync单</center> 
                        </caption>
                        <thead>
                            <th>店铺</th>
                            <th>单量</th>
                        </thead>
                        <tbody>
                            <template v-if="tableTopInfo.syncOrderLimit && tableTopInfo.syncOrderLimit.length > 0">
                                <tr v-for="item in tableTopInfo.syncOrderLimit">
                                    <td>{{ item.shopNick }}</td>
                                    <td>{{ item.count }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div v-if="!tableTopInfo.syncOrderLimit || tableTopInfo.syncOrderLimit.length === 0" class="table-note">
                        <i class="iconfont icon-xiaolian"></i>暂无数据
                    </div>
                </div>
                <div class="table-content table-flex-item">
                    <table class="main-table">
                        <caption>
                            <center>原始单</center>
                        </caption>
                        <thead>
                            <th>店铺</th>
                            <th>单量</th>
                        </thead>
                        <tbody>
                            <template v-if="tableTopInfo.originOrderLimit && tableTopInfo.originOrderLimit.length > 0">
                                <tr v-for="item in tableTopInfo.originOrderLimit">
                                    <td>{{ item.shopNick }}</td>
                                    <td>{{ item.count }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div v-if="!tableTopInfo.originOrderLimit || tableTopInfo.originOrderLimit.length === 0" class="table-note">
                        <i class="iconfont icon-xiaolian"></i>暂无数据
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Http, { to } from "@/common/promiseHttp";
import api from "@/common/api";
import { timestampToTime } from "@/common/getDateStr";
import dateRangePicker from "@/component/dateRangePicker";
import selectShop from "@/component/selectShop";

export default {
    components: {
        dateRangePicker,
        selectShop,
    },
    data() {
        return {
            searchDataOne: {
                shopId: "",
                endDate: "",
                startDate: "",
            },
            searchDataTwo: {
                offset: 10,
                endDate: "",
                startDate: "",
            },
            tableOneInfo: {},
            tableTopInfo: {},
        };
    },
    mounted() {
        this.initDate();
    },
    methods: {
        initDate() {
            const nowDate = new Date().getTime();
            const beforeDate = nowDate - 5 * 60 * 1000; // 5 分钟之前
            this.searchDataOne.endDate = timestampToTime(nowDate);
            this.searchDataOne.startDate = timestampToTime(beforeDate);
            this.searchDataTwo.endDate = timestampToTime(nowDate);
            this.searchDataTwo.startDate = timestampToTime(beforeDate);
        },
        selectedShop(res) {
            if (res && res.data && res.data.shopId) {
                this.searchDataOne.shopId = res.data.shopId;
            } else {
                this.searchDataOne.shopId = "";
            }
        },
        async getTableList1() {
            const url = api.orderOriginGetSsyNum;
            let params = {
                startDate: this.searchDataOne.startDate,
                endDate: this.searchDataOne.endDate,
            };
            if (this.searchDataOne.shopId) {
                params.shopId = this.searchDataOne.shopId;
            }
            const [err, res] = await to(Http.post(url, params, this, true));
            if (res && res.data && res.data.resp) {
                const { jushitaCount, originCount, syncCount } = res.data.resp;
                this.tableOneInfo = { jushitaCount, originCount, syncCount };
            } else {
                this.tableOneInfo = {};
            }
        },
        async getTableList2() {
            const url = api.orderOriginGetSsyNum;
            let params = {
                ...this.searchDataTwo,
            };
            const [err, res] = await to(Http.post(url, params, this, true));
            if (res && res.data && res.data.respList) {
                this.tableTopInfo = res.data.respList;
            } else {
                this.tableTopInfo = {};
            }
        },
        setOrderTime(data) {
            this.searchDataOne.startDate = data.start_time;
            this.searchDataOne.endDate = data.end_time;
        },
        setOrderTime2(data) {
            this.searchDataTwo.startDate = data.start_time;
            this.searchDataTwo.endDate = data.end_time;
        },
    },
};
</script>
<style scoped lang="scss">
#ssyOrderCount {
    margin: 20px;

    .mt-20 {
        margin-top: 20px;
    }

    .table-flex-box {
        display: flex;

        .table-flex-item {
            flex: 1;
            margin: 0 10px;
        }
    }
}
</style>
