function init() {}

function log(err) {
  console.error(err);
}

const logger = {
  init,
  log,
};

export default logger;
