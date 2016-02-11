module.exports = function (server) {

  server.route({
    path: '/metric_sledgehammer/api/example',
    method: 'GET',
    handler: function (req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
