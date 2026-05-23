const ServiceHandler = async (service, req, res) => {
  return service(req);
};

module.exports = { ServiceHandler };