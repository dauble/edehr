<template lang="pug">
  div
    //div TABLE VERT
    div(class="no-data" v-if="!hasData") There are no records or reports for this patient.
    div(v-else)
      table.table_vertical
        tbody
          tr(v-for="(column, colIndex) in transposedColumns", :class="tableColumnCss(column)")
            td(:class="transposeLabelCss(column)")
              div(v-if="colIndex === 0", style="min-height:3rem;") &nbsp;
              span(v-html="transposeLabel(column)")
            td(v-for="(cell, index) in transposeData(column)", :class="transposeValueCss(cell)")
              ui-button(v-if="colIndex === 0",v-on:buttonClicked="viewReport(pageDataKey, tableKey, index)")
                span View &nbsp;
                fas-icon(icon="file-pdf")
              ui-button(v-if="tableDef.tableAction && colIndex === 0",v-on:buttonClicked="tableAction(tableDef,index)")
                span {{ tableDef.tableActionLabel }} &nbsp;
                fas-icon(icon="notes-medical")
              div(v-for="cPart in cell.stack")
                ehr-table-element(v-if="!!cPart.value", :cell="cPart")
</template>

<script>
import EhrTableCommon from './EhrTableCommon'
import EhrTableElement from './EhrTableElement'
import UiButton from '@/app/ui/UiButton'

export default {
  extends: EhrTableCommon,
  components: { EhrTableElement, UiButton },
  inject: [ 'pageDataKey', 'tableKey'],
  data: function () {
    return {
      tableForm: {},
      transposedColumns: [],
      hasData: false
    }
  },
  computed: {
  },
  methods: {
    transposeLabel (column) {
      let cell = column[0] || {}
      return cell.label
    },
    transposeLabelCss (column) {
      let cell = column[0] || {}
      return cell.tableCss
    },
    transposeValueCss (cell) {
      let hdrCss = 'column_value' + (cell.tableCss ? ' ' + cell.tableCss : '')
      return hdrCss
    },
    transposeData (column) {
      return column.slice(1,column.length)
    },
    getCellData (cell) {
      // console.log('EhrTableVertical getCellData', cell)
      let stack = cell.stack
      let values = []
      stack.forEach ( (c) => {
        if (c.value) {
          values.push(c.value)
        }
      })
      return values.join(',')
    },
    tableColumnCss: function (column) {
    },
    refresh () {
      this.tableForm = this.ehrHelp.getTable(this.tableKey)
      this.hasData = this.tableForm.hasData
      this.transposedColumns = this.tableForm.transposedColumns
      // console.log('EhrTableVertical table view refresh', this.transposedColumns)
    }
  }
}
</script>
