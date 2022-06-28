<template>
    <el-date-picker
            v-model="date"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
    >
    </el-date-picker>
</template>

<script>
    export default {
        // props: ['datelw'],
        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近5分钟',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 60 * 1000 * 5);
                                picker.$emit('pick', [start, end]);
                                // this.date = [start, end]
                            }
                        }, {
                            text: '最近30分钟',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 60 * 1000 * 30);
                                picker.$emit('pick', [start, end]);
                                // this.date = [start, end]
                            }
                        }, {
                            text: '最近1小时',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 60 * 1000 * 60);
                                picker.$emit('pick', [start, end]);
                                // this.date = [start, end]
                            }
                        }, {
                            text: '最近2小时',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 60 * 1000 * 60 * 2);
                                picker.$emit('pick', [start, end]);
                                // this.date = [start, end]
                            }
                        }, {
                            text: '最近3小时',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 60 * 1000 * 60 * 3);
                                picker.$emit('pick', [start, end]);
                                // this.date = [start, end]
                            }
                        }, {
                            text: '今天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', [start, end]);
                                this.date = [start, end]
                                // console.log(picker)
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                                end.setTime(end.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '前天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                                end.setTime(end.getTime() - 3600 * 1000 * 24 * 2);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                                console.log(picker)
                            }
                        },
                        {
                            text: '最近一年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 12 * 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                },
                date: [new Date(), new Date(2021, 10, 11)],
            };
        },
        created() {
            const end = new Date();//获取当前的日期
            const start = new Date();
            start.setTime(start.getTime() - 60 * 1000 * 5)
            //计算，将当期日期-1天
            this.date[0] = start
            this.date[1] = end
        },
        watch: {
            date: {
                immediate: true,
                handler(val) {
                    console.log(val, 'lw');
                    // this.datelw = val
                    // console.log(this.datelw, "lw_lw")
                    this.onChangeDateRange(val)
                }
            }
        },
        methods: {
            onChangeDateRange(res) {
                console.log("res", "res", res);
                this.$emit('getDate', {
                    date: res,
                });
            },
        }
    };
</script>