const users = {
  netrunnerX: { id: 'netrunnerX', role: 'admin' },
  reliefAdmin: { id: 'reliefAdmin', role: 'contributor' }
};

export default (req, res, next) => {
  req.user = users[req.headers['x-user']] || users.netrunnerX;
  next();
};
