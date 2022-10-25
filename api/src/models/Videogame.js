const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('videogame', {
        id: {
            type: DataTypes.UUID, // genera un id aleatorio
            defaultValue: DataTypes.UUIDV4, // genera un id aleatorio
            allowNull: false, // no puede ser nulo
            primaryKey: true, // es la clave primaria
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        released: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        platforms: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        background_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createInDb: {
            // si el juego fue creado por el usuario o no
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    });
};
