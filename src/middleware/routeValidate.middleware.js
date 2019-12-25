export default (Model, req) => {
  for (const checkData in Model) {
    if (Model.hasOwnProperty(checkData)) {
      const { value, error } = Model[checkData].validate(req[checkData]);
      if (error) throw error;
      req[checkData] = value;
    }
  }
};
