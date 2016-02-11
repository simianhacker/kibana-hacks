module.exports = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      sledgehammers: [
        'plugins/metric_sledgehammer/color_metrics'
      ]
    }
  });
};

