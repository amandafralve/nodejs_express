// ORM - Sequelize
import Sequelize from "sequelize";
// Configuração do Sequelize
import connection from "../config/sequelize-config.js"

// .define cria a tabela no banco
const Pedido = connection.define('pedidos', {
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
});
Pedido.sync({force: false})
export default Pedido