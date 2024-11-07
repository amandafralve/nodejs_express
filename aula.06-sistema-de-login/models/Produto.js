// ORM - Sequelize
import Sequelize from "sequelize";
// Configuração do Sequelize
import connection from "../config/sequelize-config.js";

// .define cria a tabela no banco
const Produto = connection.define('produtos' ,{
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false
  },
});
Produto.sync({force: false})
export default Produto