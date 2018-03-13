<template>
   <div id="processorReportView processorReportView">
       <div id="reportResultDetails" class="infoBar" v-if="report">
          <div>
            <label class="issueCount">{{ report.errors }} Issues</label>
          </div>
              <div class="ragBar">
                <div>
                   <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                      <circle class="ragError" cx="7" cy="7" r="7"/>
                    </svg>
                    <label id="errors" style="vertical-align: top;" >{{ report.errors }}</label>
                 </div>
                 <div>
                 <svg height="14" width="14">
                    <polygon class="ragWarning" points="0,14 7,0 14,14"/>
                 </svg>
                 <label id="warnings" style="vertical-align: top;">{{ report.warnings }}</label>
                 </div>
                 <div>
                 <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <rect class="ragPass" width="14" height="14" />
                 </svg>
                 <label id="passes" style="vertical-align: top;">{{ report.passes }}</label>
               </div>
            </div>
          <div>
            <input id="searchValidations" type="text" class="searchBox" v-model="search"/>
            <select id="userFilter" v-model="filteredType" >
              <option disabled value="" >Filter by Type</option>
              <option v-for="type in filterByTypeOptions">{{ type }}</option>
            </select>
            <select id="userFilter" v-model="filteredProcessor" >
              <option disabled value="" >Filter by Processor</option>
              <option v-for="processor in filterByProcessorOptions">{{ processor }}</option>
            </select>
          </div>
       </div>
       <report-list-item :key="index" :reportId="reportId" :content="report" :reportItem="reportItem" v-for="(reportItem, index) in filteredReportItems"></report-list-item>
       <p v-if="reportItems.length === 0" >There are no items for this report</p>
  </div>
</template>

<script>
import ReportListItem from './ReportListItem';
export default {
  name: 'ReportView',
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      filteredType: '',
      filteredProcessor: '',
      processorResults: [],
      search: ''
    };
  },
  components: {
    ReportListItem: ReportListItem
  },
  mounted: function () {
    console.log('mounted listreportview');
    console.log(this.report);
  },
  computed: {
    reportItems: function () {
      var reportItems = [];
      console.log(this.report);
      if (this.report) {
        var content = this.report;
        reportItems = [];
        reportItems = reportItems.concat(content.tables[0].errors);
        reportItems = reportItems.concat(content.tables[0].warnings);
        reportItems = reportItems.concat(content.tables[0].informations);
        console.log('Report');
        console.log(reportItems);
      }
      return reportItems;
    },
    filterByProcessorOptions: function () {
      var result = [];
      var reportItems = [];
      if (this.report) {
        var content = this.report;
        reportItems = [];
        reportItems = reportItems.concat(content.tables[0].errors);
        reportItems = reportItems.concat(content.tables[0].warnings);
        reportItems = reportItems.concat(content.tables[0].informations);
        console.log(reportItems);
        reportItems.forEach((reportItem) => {
          if (result.indexOf(reportItem.processor) === -1) {
            result.push(reportItem.processor);
          }
        });
        console.log(result);
      }
      return result;
    },
    filterByTypeOptions: function () {
      var result = [];
      var reportItems = [];
      if (this.report) {
        var content = this.report;
        reportItems = [];
        reportItems = reportItems.concat(content.tables[0].errors);
        reportItems = reportItems.concat(content.tables[0].warnings);
        reportItems = reportItems.concat(content.tables[0].informations);
        console.log(reportItems);
        reportItems.forEach((reportItem) => {
          if (result.indexOf(reportItem.code) === -1) {
            result.push(reportItem.code);
          }
        });
        console.log(result);
      }
      return result;
    },
    filteredReportItems: function () {
      var result = this.reportItems;
      if (this.filteredType !== '') {
        result = result.filter((reportItem) => {
          return reportItem.code === this.filteredType;
        });
      }
      if (this.filteredProcessor !== '') {
        result = result.filter((reportItem) => {
          return reportItem.processor === this.filteredProcessor;
        });
      }
      try {
        var re = new RegExp(this.search);
        return result.filter((reportItem) => {
          return re.exec(reportItem.message);
        });
      } catch (e) {
        return this.reportItems;
      }
    }
  },
  watch: {
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.ragBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0.5;
}

.issueCount {
  font-size: 24px;
  color: #777776;
  vertical-align: middle;
}

.infoBar {
  margin: 30px 0px 41px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
