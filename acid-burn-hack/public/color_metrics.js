import _ from 'lodash';
import $ from 'jquery';
import 'plugins/acid-burn-hack/less/main.less';
import uiModules from 'ui/modules';
uiModules.get('kibana').config(($injector, $provide) => {

  if (!$injector.has('visualizeDirective')) return;

  var metrics = [
    {
      name: 'heapTotal',
      critical: 50 * (1024 ^ 3),
      warning: 100 * (1024 ^ 3)
    },
    {
      name: 'osload.1m',
      critical: 2,
      warning: 1.5
    },
    {
      name: 'psdelay',
      critical: 2,
      warning: 1
    }
  ];

  $provide.decorator('visualizeDirective', ($delegate) => {
    let visualizeDirective = $delegate[0];
    const newLink = _.wrap(visualizeDirective.link, (fn, ...args) => {
      const [ $scope, $el, $attr ] = args;
      $scope.$watch('renderbot.chartData', (data) => {
        if (!data) return;
        data.series.forEach((series) => {
          metrics.forEach((metric) => {
            const matches = series.label.match(metric.name);
            if (matches) {
              var panel = $el.parent().parent().parent();
              let lastValue = _.last(series.values);
              panel.removeClass('sledgehammer-critical');
              panel.removeClass('sledgehammer-warning');
              if (lastValue.y >= metric.critical) {
                panel.addClass('sledgehammer-critical');
              } else if (lastValue.y >= metric.warning) {
                panel.addClass('sledgehammer-warning');
              }
            }

          });
        });
      });
      fn(...args);
    });

    visualizeDirective.compile = () => {
      return newLink;
    };
    return $delegate;
  });

});
