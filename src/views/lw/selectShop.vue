
<template>
    <Select
            transfer
            clearable
            :filterable="fuzzySearch"
            v-model="selectedShop"
            :disabled="disabled"
            :placeholder="_placeholder || '请选择'"
            @on-change="selectShop">
        <template v-if="!allShopList">
            <Option v-for="item in shopList" :value="item.shopName" :key="item.shopId">
                <!--{{item.shopName}}-->
                {{ isShowShopNick ? (item.shopNick || item.shopName) : item.shopName}}
            </Option>
        </template>
        <template v-else>
            <Option v-for="item in allShopList" :value="item.shopName" :key="item.shopId">
                <!--{{item.shopName}}-->
                {{ isShowShopNick ? (item.shopNick || item.shopName) : item.shopName}}
            </Option>
        </template>
    </Select>
</template>

<script>
    import http from '../common/http'
    import api from '../common/api'

    export default {
        props: ['disabled', 'defaultShopId', 'containsDeleted', 'shopType',
            'platform', 'shopPlatform', 'platformList', 'placeholder', 'fuzzySearch',
            'defaultShopNick', 'onlyOneSelected', 'allShopList', 'isShowShopNick'],
        mounted () {

            if (!this.allShopList) {
                // 售后中心需选择平台来修改显示的店铺，将店铺列表传入避免重复请求接口
                this.fetchShopList();
            } else {
                if (this.allShopList.length === 1 && this.defaultShopId) {
                    this.selectedShop = this.allShopList[0].shopName;
                    this.$emit('selected', { data:  this.allShopList[0] });
                }
            }
        },
        data () {
            return {
                shopList: [],
                selectedShop: '',
            }
        },
        computed: {
            _placeholder() {
                return this.placeholder || '请选择';
            },
            _fuzzySearch() {
                return this.fuzzySearch || false;
            }
        },
        watch: {
            defaultShopId(val) {
                if (val) {
                    if (!this.allShopList) {
                        this.shopList.forEach((item) => {
                            if (item.shopId == this.defaultShopId) {
                                this.selectedShop = item.shopName;
                            }
                        });
                    } else {
                        this.allShopList.forEach((item) => {
                            if (item.shopId == this.defaultShopId) {
                                this.selectedShop = item.shopName;
                            }
                        });
                    }
                } else {
                    this.selectedShop = '';
                }
            },
            allShopList(val) {
                this.selectedShop = '';
                if (val.length === 1) {
                    this.selectedShop = this.allShopList[0].shopName;
                    this.$emit('selected', { data: val[0] });
                }
            }
        },
        methods: {
            fetchShopList() {
                http({
                    instance: this,
                    url: api.getShopList,
                    data: {
                        data: {
                            containsDeleted: !!this.containsDeleted,
                            shopType: this.shopType,
                            // platform: this.platform,
                            platformList: this.platform ? [this.platform] : this.platformList,
                            shopPlatform: this.shopPlatform || ''
                        },
                    },
                    type: 'post',
                    hasLoading: false,
                    success: (res) => {
                        this.shopList = res.data;
                        if (this.defaultShopId) {
                            this.shopList.forEach((item) => {
                                if (item.shopId == this.defaultShopId) {
                                    this.selectedShop = item.shopName;
                                }
                            });
                        } else {
                            this.selectedShop = '';
                        }
                        if (this.defaultShopNick) {
                            this.selectedShop = this.shopList.find((item) => {
                                return item.shopNick === this.defaultShopNick;
                            }).shopName;
                        }
                        // http://jira.guanyc.cn/browse/OMS-4216 若店铺选项中只有一家店铺，则默认选择。若有多个，则不选中任何一家
                        if (this.onlyOneSelected) {
                            if (this.shopList.length === 1) {
                                this.selectedShop = this.shopList[0].shopName;
                                this.$emit('selected', { data: this.shopList[0] });
                            }
                        }
                    }
                });
            },
            selectShop() {
                if (this.selectedShop) {
                    let selectedShop = '';
                    if (!this.allShopList) {
                        selectedShop = this.shopList.find((item) => {
                            return item.shopName === this.selectedShop;
                        });
                    } else {
                        selectedShop = this.allShopList.find((item) => {
                            return item.shopName === this.selectedShop;
                        });
                    }
                    this.$emit('selected', { data: selectedShop });
                } else {
                    this.$emit('selected', {});
                }
            },
            clearData() {
                this.selectedShop = ''
            }
        }
    }
</script>
<style scoped>
    .fuzzy-search {
        margin: 6px 12px;
        width:89%;
    }
</style>