const { Op } = require("sequelize");

const paginationFunc = async (query, model, modelConfig) => {
  const page = query.page || 1;
  const size = query.size || 100;
  const search = query.search || null;
  const data = {};
  const allTable = await model.findAndCountAll({
    offset: (page - 1) * size,
    limit: size,
    where: search && {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    },
    ...modelConfig,
  });

  data.content = allTable.rows;
  data.pagination = {};
  data.pagination.totalPages = Math.ceil(allTable.count / size);
  data.pagination.hasNextPage = data.pagination.totalPages > page;
  data.pagination.page = page;
  data.pagination.isLastPage = data.pagination.totalPages > 0 && page > 1;
  data.pagination.totalItems = allTable.count;

  return data;
};

module.exports = paginationFunc;
