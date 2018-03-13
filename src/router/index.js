import Vue from 'vue';
import Router from 'vue-router';
import ReportView from '@/components/ReportView';
import MapDetails from '@/components/map/MapDetails';
import ProcessorReportView from '@/components/ProcessorReportView';
import ListReportView from '@/components/ListReportView';
import TabularDetails from '@/components/tabular/TabularDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'reportView',
      component: ReportView,
      children: [
        { name: 'processorReportView', path: 'processorReportView', component: ProcessorReportView },
        { name: 'tabularDetails', path: 'tabulardetails', component: TabularDetails, props: true },
        { name: 'listReportView', path: 'listreportview', component: ListReportView, props: true },
        { name: 'mapDetails', path: 'mapdetails', component: MapDetails, props: true }
      ]
    }
  ]
});
