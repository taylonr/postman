module.exports = {
  ok: res => data => {
    res.status(200).send(data);
  },

  serverError: res => err => {
    res.status(500).send(err);
  },

  noContent: res => {
    res.status(204).send();
  },

  notFound: res => {
    res.status(404).end();
  }
};
