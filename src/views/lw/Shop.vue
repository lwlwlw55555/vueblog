<template>
    <el-select v-model="shop" placeholder="全部" style="width: 150px;" :filterable=true clearable
               @change="shopChange" @focus="shopChange" v-loadmore="shopChange" value-key="shop_nick">
        <el-option v-for="(item,index) in shop_list" :key="item.shop_id" :label="item.shop_nick"
                   :value="item">
            {{ item.shop_nick }}
        </el-option>
    </el-select>
</template>

<script>
    export default {
        data() {
            return {
                shop: '',
                shop_list: [],
            }
        },
        watch: {
            shop: {
                immediate: true,
                handler(val) {
                    console.log(val, 'lw');
                    this.onChange(val)
                }
            }
        },
        methods: {
            shopChange() {
                const _this = this
                console.log(_this.shop_list);
                if (_this.shop_list.length === 0) {
                    this.$http_php.get("/leqee_get_shops.php").then(res => {
                        console.log(res.data)
                        if (res.data.code === 0) {
                            _this.shop_list = res.data.data;
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
                    shop: res,
                });
            },
        }
    };
</script>