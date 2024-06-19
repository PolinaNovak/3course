import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js';
import {patientCard} from "./patient_card.js";
import {note} from "./note.js";

export const noteInCard = sequelize.define('noteInCard', {
    id_card: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: patientCard,
            key: 'id_card',
        },
    },
    id_note: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: note,
            key: 'id_note',
        },
    },
});


