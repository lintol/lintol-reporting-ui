<template>
   <div id='reportView'>
    <div class="reportRow" v-if="report">
        <div class="reportMainColumn">
          <label class="pageTitle">{{ report.name }}</label>
          <p class='instructions'>
           This report was created from Data Resource: <u>{{ content.tables[0].source}}</u>
          </p>
        </div>
        <div class="reportColumn">
          <label class="ranOn columnHeader">Ran On</label>
          <label v-if="report.createdAt">{{ convertDate(report.createdAt.date) }}</label>
        </div>
        <div class="reportColumn">
        </div>
        <div class="reportColumn">
          <label class="qualityScore" >{{ report.qualityScore }}</label>
          <label>Quality Score</label>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { convertDate } from '@/helpers.js';

export default {
  name: 'report-view',
  data () {
    return {};
  },
  methods: {
    convertDate: convertDate
  },
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  computed: {
    content: function () {
      var content;
      console.log('?');
      console.log(this.report);
      if (this.report) {
        content = this.report;
      } else {
        content = null;
      }
      return content;
    }
  },
  mounted: function () {
    console.log('Mounted ReportView');
    this.$router.push({ path: 'listreportview' });
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.reportRow {
   display: flex;
   flex-direction: row;
   flex-wrap: nowrap;
   justify-content: space-between;
   min-height: 80px;
   padding: 0px 10px;
   border-bottom: 1px solid black;
 }

.ranOn {
  font-weight: bold;
  font-size: 10px;
  + label {
    font-size: 11px;
  }
}

.reportColumn {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  flex: 1;
}

.reportMainColumn {
  display: flex;
  flex-direction: column; 
  justify-content: center;
  flex: 2;
}

.alignImage {
  vertical-align: middle;
  padding-right: 10px;
}

  
</style>
