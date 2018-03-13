import Vue from 'vue'
import ReportView from './components/ReportView'
import MapDetails from '@/components/map/MapDetails';
import ProcessorReportView from '@/components/ProcessorReportView';
import ListReportView from '@/components/ListReportView';
import Router from 'vue-router';
import TabularDetails from '@/components/tabular/TabularDetails';

// Module API

export function render(component, props, element) {
  var report = props.report;

  Vue.use(Router);
  var router = new Router({
    routes: [
      {
        path: '/',
        name: 'reportView',
        component: ReportView,
        props: { report: report },
        children: [
          { name: 'processorReportView', path: 'processorReportView', component: ProcessorReportView },
          { name: 'tabularDetails', path: 'tabulardetails', component: TabularDetails, props: true },
          { name: 'listReportView', path: 'listreportview', component: ListReportView, props: { report: report } },
          { name: 'mapDetails', path: 'mapdetails', component: MapDetails, props: true }
        ]
      }
    ]
  });

  var vm = new Vue({
    el: '#reportTarget',
    router,
    components: { ReportView },
    template: '<router-view />',
    data: {
      report: props.report
    }
  })
  console.log(vm)
  console.log(component)
  console.log(props)
  vm.$mount(element)
}
