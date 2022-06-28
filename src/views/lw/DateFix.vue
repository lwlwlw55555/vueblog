<template>
    <el-date-picker
            v-model="timevalue1"
            :picker-options="pickerOptions"
            type="daterange"
            placeholder="选择日期时间"
            align="right"
            @change="changeTime"/>
</template>

<script>
    export default {
        name: 'd2DateTimePicker',
        model: {
            prop: 'timevalue',
            event: 'change'
        },

        props: {
            timevalue: {
                type: Array,
                required: true,
                default: () => {
                    return []
                }
            }

        },
        data() {
            return {
                timevalue1: [new Date(), new Date(2021, 10, 11)],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                }
            }
        },
        watch: {
            timevalue: {
                immediate: true,
                handler(val) {
                    console.log(val, 'time');
                    if (val.length > 0) {
                        this.timevalue1 = val
                    }
                    this.$emit('change', val)
                }

            },
            timevalue1: {
                immediate: true,
                // console.log(val, 'time')
                handler(newVal) {
                    this.$emit('change', newVal)
                }

            }

        },
        methods: {
            changeTime(val) {
                // var oval = this.moment(val).format('YYYY-MM-DD HH:mm:ss')
                // console.log(val)
                this.$emit('change', val)
            }
        }

    }
</script>
