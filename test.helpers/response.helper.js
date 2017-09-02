const td = require('testdouble');

exports.createRes = (fake) => {
  const res =  {
    status: function(code){
      fake.status = code;
      return this;
    },
    send: td.function(),
    end: td.function()
  };

  return res;
};