<!--
size 选值为large、small、default或者不设置
showDelIcon 是否显示清除按钮
disable 禁用
showTable 是否显示表格
-->

<template>
  <div class="select" :style="{width: `${width}px`}" v-clickoutside="onBlur">
    <Input v-model="selectValue" style="cursor: pointer" :size="size" :disabled="disable" :readonly="!filterData" @click.native.stop="showBox"
           @mouseover.native="mouseoverHandler" @mouseout.native="mouseoutHandler" :placeholder="placeholder">
      <template>
        <Icon v-if="!showDelIcon" :type="show? 'ios-arrow-up' : 'ios-arrow-down'" slot="suffix"/>
        <Icon v-if="showDelIcon" type="ios-close-circle" slot="suffix" @click.native="del" title=""/>
      </template>
    </Input>
    <div class="select-body" v-if="showTable && !disable" :style="{width: `${width}px`}">
      <el-table
        :data="data"
        border
        v-show="show"
        max-height="250"
        style="width: 100%;"
        :size="size === 'small' ? 'mini' : 'medium'"
        highlight-current-row
        :header-cell-style="selectTable"
        oncontextmenu="return false;"
        @select="selectData"
        @select-all="selectAllData"
        ref="multipleTable"
        sortable="custom"
        empty-text="暂无数据">
        <el-table-column
          type="selection"
          width="36">
        </el-table-column>
        <el-table-column
          v-for="(item, key) in columns" :key="key"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <Row class="margin-top-10" v-if="show">
        <Page :total="listQuery.total" :current="listQuery.pageNum" :page-size="listQuery.pageSize"
              :size="size === 'small' ? size : ''" @on-change="pageChange"></Page>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "select-table-lnn",
    props: {
      size: {
        String,
        default: 'large'
      },
      width: {
        Number,
        default: 300
      },
      disable: {
        Boolean,
        default: false
      },
      value: {
        String,
        default: ''
      },
      filterData: {
        Boolean,
        default: false
      },
      data: {
        Array,
        default: () => []
      },
      columns: {
        Array,
        default: () => []
      },
      multiple: {
        Boolean,
        default: false
      },
      codeKey: {
        String,
        default: ''
      },
      nameKey: {
        String,
        default: '',
      },
      placeholder: {
        String
      },
      listQuery: {
        Object,
        default: () => {
          return {
            pageNum: 1,
            pageSize: 10,
            total: 0
          }
        }
      }
    },
    data() {
      return {
        showDelIcon: false,
        showTable: true,
        show: false, // 得失焦点显示icon
        selectValue: '',
        showPage: false
      }
    },
    computed: {
      selectTable() {
        return {
          fontSize: `${13}px`,
          fontWeight: 'bold',
          color: '#8c8c90',
          backgroundColor: 'rgb(245, 245, 245)'
        }
      }
    },
    methods: {
      mouseoverHandler() {
        if (this.selectValue.length) {
          this.showDelIcon = true;
        }
      },
      mouseoutHandler() {
        this.showDelIcon = false;
      },
      showBox() {
        if (!this.disable) {
          this.show = true;
          this.showTable = true
          this.$emit('click', this.show);
        }
      },
      del() {
        this.selectValue = ''
        this.$refs.multipleTable.clearSelection()
        this.showTable = false
        if (this.multiple) {
          this.$emit('on-change', [])
        } else {
          this.$emit('on-change', '')
        }

      },
      onBlur() {
        this.show = false
      },
      selectData(selection, row) {
        this.selectValue = ''
        let name = []
        let code = []
        if (this.multiple) {
          selection.forEach(item => {
            name.push(item[this.nameKey])
            code.push(item[this.codeKey])
          })
          this.selectValue = name.join(',')
        } else {
          this.$refs.multipleTable.clearSelection()
          this.$refs.multipleTable.toggleRowSelection(row)
          this.selectValue = row[this.nameKey]
          code = row[this.codeKey]
        }
        this.$emit('on-change', code)
      },
      selectAllData (selection) {
        this.selectValue = ''
        let name = []
        let code = []
        if (this.multiple) {
          selection.forEach(item => {
            name.push(item[this.nameKey])
            code.push(item[this.codeKey])
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
        this.selectValue = name.join(',')
        this.$emit('on-change', code)
      },
      pageChange(pageNum) {

      },
      testData () {
        if (this.data.length !== 0) {
          let temp = []
          let result = []
          this.data.forEach(item => {
            if (temp.indexOf(item[this.codeKey]) === -1) {
              temp.push(item[this.codeKey])
            } else {
              result.push(item[this.codeKey])
            }
          })
          if (temp.length !== this.data.length) {
            this.showTable = false
            console.log('传入数据中唯一标识有重复数据--->'+ result);
          } else {
            this.showTable = true
          }
        }
      }
    },
    mounted() {
      if (this.codeKey === '' || this.nameKey === '') {
        console.log('codeKey和nameKey必须指定数值');
      }
      this.testData()
    },
    watch: {
      value(newVal, oldVal) {
        this.$nextTick(() => {
          if (this.multiple) {
            let result = []
            newVal.forEach(it => {
              this.data.forEach(item => {
                if (it === item[this.codeKey]) {
                  this.$refs.multipleTable.toggleRowSelection(item)
                  result.push(item[this.nameKey])
                }
              })
            })
            this.selectValue = result.join(',')
          } else {
            if (typeof newVal !== 'string') {
              this.showTable = false
              console.log('单选模式下，传入数据不能为数组，只能为字符串string---->' + newVal);
              return
            }
            this.data.forEach(item => {
              if (item[this.codeKey] === newVal) {
                this.$refs.multipleTable.toggleRowSelection(item)
              }
            })
            this.selectValue = newVal
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .select {
    position: relative;
    cursor: pointer;
    .table {
      min-height: 250px;
    }
    .select-body {
      margin-top: 2px;
      position: absolute;
      z-index: 1000;
      border-radius: 5px 5px;
      box-shadow: darkgrey 0 0 5px 0;
      max-height: 300px;
      background-color: #fff;
    }
  }
</style>
