module.exports = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      sledgehammers: [
        'plugins/acid-burn-hack/color_metrics'
      ]
    }
  });
};

