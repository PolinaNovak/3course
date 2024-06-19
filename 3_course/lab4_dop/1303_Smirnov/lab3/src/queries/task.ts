import {Document} from "../models/document";
import {Issues} from "../models/issues";
import {Instance} from "../models/instance";
import {IssuesArchive} from "../models/issues_archive";
import {fn, Op, where} from 'sequelize';
import {Abonent} from "../models/abonent";
import {Cell} from "../models/cell";
import {Rack} from "../models/rack";
import {Shelf} from "../models/shelf";
import {Sequelize} from "sequelize-typescript";
import fs from 'fs';
export default async function taskQuery(sequelize: Sequelize){

    // -- Общее количество документов на заданную тему?

    const answer1 = await Document.count({
        where: {
            theme_name: 'документация'
        }
    });
    const textTask1 = 'Общее количество документов на заданную тему?\n' + JSON.stringify(answer1, null, 2);
    fs.writeFileSync('answer.txt', textTask1);

    // -- Тема документа по заданному названию?

    const answer2  = await Document.findOne({
        attributes: ['theme_name'],
        where: {document_title: 'План экономического развития на 2024'}
    })

    const textTask2 = '\nТема документа по заданному названию?\n' + JSON.stringify(answer2, null, 2);
    fs.appendFileSync('answer.txt', textTask2);

    // -- Название документа, который имеется в архиве в максимальном количестве экземпляров?

    const instance = await Instance.findOne(
        {
            attributes: [[fn('count', '*'), 'instance_count']],
            group: ['document_id'],
            order: [['instance_count', 'desc']]
        }
    )
    const maxCount =  parseInt(<string>instance.get('instance_count'));

    const answer3 = await Document.findAll({
        attributes: ['document_id', 'document_title'],

        include: {
            attributes: [],
            model: Instance,
            required: true
        },
        group: [`Document.document_id`],
        having: where(
            fn('count', '*'),
            Op.eq,
            maxCount
        )
    })

    const textTask3 = '\nНазвание документа, который имеется в архиве в максимальном количестве экземпляров?\n'
        + JSON.stringify(answer3, null, 2);
    fs.appendFileSync('answer.txt', textTask3);

    // -- Фамилия, имя и отчество абонента, который брал указанный документ последним?
    const documentName= 'Политика организации по охране труда'
    const resFromArchive = await IssuesArchive.findOne({
        attributes: ['date_of_issue'],
        include: [
            {
                attributes: ['document_title'],
                model: Document,
                where: {
                    document_title: documentName
                },
                required: true
            },
            {
                attributes: ['name', 'surname', 'middle_name'],
                model: Abonent,
                required: true
            }
        ],
        order: [['date_of_issue', 'DESC']]
    })
    const resFromIssues = await Issues.findOne({
        attributes: ['date_of_issue'],
        include: [
            {
                model: Instance,
                required: true,
                include: [{
                    attributes: ['document_title'],
                    model: Document,
                    where: {
                        document_title: documentName
                    }
                }]
            },
            {
                attributes: ['name', 'surname', 'middle_name'],
                model: Abonent,
                required: true
            }
        ],
        order: [['date_of_issue', 'DESC']]
    })
    const textTask4 = '\nФамилия, имя и отчество абонента, который брал указанный документ последним?\n';
    let answer4: string;
    if (!resFromArchive && !resFromIssues)
        answer4 = 'Документ не брали';
    else if (resFromArchive && !resFromIssues)
        answer4 = resFromArchive.abonent.fullName
    else if (!resFromArchive && resFromIssues)
        answer4 = resFromIssues.abonent.fullName
    else if (resFromIssues.date_of_issue > resFromArchive.date_of_issue)
        answer4 = resFromIssues.abonent.fullName
    else
        answer4 = resFromArchive.abonent.fullName

    fs.appendFileSync('answer.txt', textTask4 + answer4);

    // -- Есть ли в архиве пустые стеллажи, полки, ячейки, и в каком количестве?
    const textTask5 = '\nЕсть ли в архиве пустые стеллажи, полки, ячейки, и в каком количестве?\n'

    const answer5 = await sequelize.query(`
        WITH free_cells AS (
            SELECT cell.cell_id, rack.rack_id, shelf.shelf_id, CASE WHEN document_id IS NULL THEN 1 ELSE 0 END AS cell_empty FROM cell
                INNER JOIN rack ON rack.rack_id = cell.rack_id
                INNER JOIN shelf ON shelf.shelf_id = rack.shelf_id
                LEFT JOIN document ON document.cell_id = cell.cell_id
            ),
            free_racks AS (
                SELECT rack_id FROM free_cells
                GROUP BY rack_id
                HAVING COUNT(*) = SUM(cell_empty)
            ),
            free_shelfs AS (
                SELECT shelf_id FROM free_cells
                GROUP BY shelf_id
                HAVING COUNT(*) = SUM(cell_empty)
            )
            SELECT 'Ячеек' AS Название, SUM(cell_empty) AS Количество FROM free_cells
            UNION ALL
            SELECT 'Полок' AS Название, COUNT(rack_id) AS Количество FROM free_racks
            UNION ALL
            SELECT 'Стелажей' AS Название, COUNT(shelf_id) AS Количество FROM free_shelfs;`)

    fs.appendFileSync('answer.txt', textTask5 + JSON.stringify(answer5[0], null, 2));


    // -- Список документов, не востребованных в течение более, чем 5 лет?
    const textTask6 = '\nСписок документов, не востребованных в течение более, чем 5 лет?\n'

    let answer6 = await sequelize.query(
        `WITH all_issues AS (
	    SELECT document_id, date_of_issue FROM issues
  		INNER JOIN instance ON instance.instance_id = issues.instance_id
  	    UNION ALL
  	    SELECT document_id, date_of_issue FROM issues_archive
        )
        SELECT document.document_id, document_title, theme_name, MAX(date_of_issue) AS Дата_последней_выдачи FROM document
	    LEFT JOIN all_issues ON document.document_id = all_issues.document_id
   	    GROUP BY document.document_id
        HAVING MAX(date_of_issue) IS NULL OR age(MAX(date_of_issue)) > interval '5 years';`
    );
    fs.appendFileSync('answer.txt', textTask6 + JSON.stringify(answer6[0], null, 2));

    // -- Название наиболее востребованного документа?
    const textTask7 = '\nНазвание наиболее востребованного документа?\n'

    let answer7 = await sequelize.query(`
            WITH all_issues AS (
                SELECT document_id, date_of_issue FROM issues
                    INNER JOIN instance ON instance.instance_id = issues.instance_id
                UNION ALL
                SELECT document_id, date_of_issue FROM issues_archive
            )
            SELECT document_title, COUNT(*) AS Количество_выдач FROM all_issues
                INNER JOIN document ON all_issues.document_id = document.document_id
                GROUP BY document.document_id
                HAVING COUNT(*) = (SELECT COUNT(*) FROM all_issues GROUP BY document_id ORDER BY 1 DESC LIMIT 1);
    `)
    fs.appendFileSync('answer.txt', textTask7 + JSON.stringify(answer7[0], null, 2));
}