import {Shelf} from "../models/shelf";
import {Rack} from "../models/rack";
import {Cell} from "../models/cell";
import {Document} from "../models/document";
import {Instance} from "../models/instance";
import {Department} from "../models/department";
import {Abonent} from "../models/abonent";
import {Issues} from "../models/issues";
import {IssuesArchive} from "../models/issues_archive";

export default async function fillTables() {
    const shelfs = await Shelf.bulkCreate([
        {shelf_unique_number: 1789131},
        {shelf_unique_number: 2124789},
        {shelf_unique_number: 3247893},
        {shelf_unique_number: 4489534},
        {shelf_unique_number: 5526783},
        {shelf_unique_number: 6890146}
    ], {returning: true});

    const racks = await Rack.bulkCreate([
        {shelf_id: shelfs[0].shelf_id, rack_unique_number: 1247890},
        {shelf_id: shelfs[0].shelf_id, rack_unique_number: 1589161},
        {shelf_id: shelfs[1].shelf_id, rack_unique_number: 2781313},
        {shelf_id: shelfs[1].shelf_id, rack_unique_number: 2894131},
        {shelf_id: shelfs[2].shelf_id, rack_unique_number: 3471123},
        {shelf_id: shelfs[2].shelf_id, rack_unique_number: 3857841},
        {shelf_id: shelfs[3].shelf_id, rack_unique_number: 4938732},
        {shelf_id: shelfs[3].shelf_id, rack_unique_number: 4538713},
        {shelf_id: shelfs[4].shelf_id, rack_unique_number: 5982412},
        {shelf_id: shelfs[4].shelf_id, rack_unique_number: 5001378},
        {shelf_id: shelfs[5].shelf_id, rack_unique_number: 6982412},
        {shelf_id: shelfs[5].shelf_id, rack_unique_number: 6001378}
    ], {returning: true});

    const cells = await Cell.bulkCreate([
        {rack_id: racks[0].rack_id, cell_unique_number: 1189313},
        {rack_id: racks[0].rack_id, cell_unique_number: 1289431},
        {rack_id: racks[1].rack_id, cell_unique_number: 2178941},
        {rack_id: racks[1].rack_id, cell_unique_number: 2278914},
        {rack_id: racks[2].rack_id, cell_unique_number: 3178913},
        {rack_id: racks[2].rack_id, cell_unique_number: 3289234},
        {rack_id: racks[3].rack_id, cell_unique_number: 4138732},
        {rack_id: racks[4].rack_id, cell_unique_number: 5182412},
        {rack_id: racks[5].rack_id, cell_unique_number: 6182412},
        {rack_id: racks[6].rack_id, cell_unique_number: 7178123},
        {rack_id: racks[7].rack_id, cell_unique_number: 8189723},
        {rack_id: racks[8].rack_id, cell_unique_number: 9136781},
        {rack_id: racks[9].rack_id, cell_unique_number: 8901331},
        {rack_id: racks[10].rack_id, cell_unique_number: 1678921},
        {rack_id: racks[11].rack_id, cell_unique_number: 8913124}
    ], {returning: true});

    const documents = await Document.bulkCreate([
        {theme_name: 'учет инвентаря', document_title: 'Учтенный инвентарь за 2023', inventory_number: '01000000012023', cell_id: cells[0].cell_id},
        {theme_name: 'документация', document_title: 'Правила инвентаризации', inventory_number: '01000100012023', cell_id: cells[3].cell_id},
        {theme_name: 'отчеты экономистов', document_title: 'План экономического развития на 2024', inventory_number: '02000020242023', cell_id: cells[4].cell_id},
        {theme_name: 'налоговая', document_title: 'Результаты налоговой инспекции за 2022', inventory_number: '02000011112022', cell_id: cells[6].cell_id},
        {theme_name: 'документация', document_title: 'Комплектная документация на станки от Bosh', inventory_number: '03000019982019', cell_id: cells[7].cell_id},
        {theme_name: 'история предприятия', document_title: 'История предприятия с момента октябрьской революции', inventory_number: '07108104522010', cell_id: cells[8].cell_id},
        {theme_name: 'охрана труда', document_title: 'Политика организации по охране труда', inventory_number: '08000035642010', cell_id: cells[9].cell_id}
    ], {returning: true});

    const instances  = await Instance.bulkCreate([
        {title: 'Учтенные станки', inventory_number: '000000010001', document_id: documents[0].document_id},
        {title: 'Правила инвентаризации экз.1', inventory_number: '000100010001', document_id:  documents[1].document_id},
        {title: 'Правила инвентаризации экз.2', inventory_number: '000100010002', document_id:  documents[1].document_id},
        {title: 'Новый экономический план на предприятии', inventory_number: '000020240001', document_id:  documents[2].document_id},
        {title: 'Документация на станок BOSH №313ADC31', inventory_number: '000019980001', document_id:  documents[4].document_id}
    ], {returning: true});

    const departments = await Department.bulkCreate([
        {department_name: 'материально-технического снабжения', department_phone: '013-00-06'},
        {department_name: 'планово-экономический', department_phone: '916-14-61'},
        {department_name: 'конструкторский', department_phone: '343-74-62'},
        {department_name: 'управления персоналом', department_phone: '949-25-48'},
        {department_name: 'военизированная охрана', department_phone: '045-22-26'}
    ], {returning: true});

    const abonents = await Abonent.bulkCreate([
        {phone_number: '7(416)127-21-37', surname: 'Осипова', name: 'Мария', middle_name: 'Дмитриевна', department_id: departments[0].department_id},
        {phone_number: '7(589)183-65-03', surname: 'Кириллов', name: 'Артём', middle_name: 'Робертович', department_id: departments[0].department_id},
        {phone_number: '7(842)993-16-33', surname: 'Богданова', name: 'Эмилия', middle_name: 'Александровна', department_id: departments[1].department_id},
        {phone_number: '7(712)011-66-67', surname: 'Кузнецов', name: 'Фёдор', middle_name: 'Никитич', department_id: departments[2].department_id},
        {phone_number: '7(404)450-48-49', surname: 'Буров', name: 'Илья', middle_name: 'Лукич', department_id: departments[4].department_id},
        {phone_number: '7(501)163-32-01', surname: 'Робертов', name: 'Артём', middle_name: 'Данилович', department_id: departments[3].department_id},
        {phone_number: '7(400)123-97-63', surname: 'Соколова', name: 'Софья', middle_name: 'Тимуровна', department_id: departments[1].department_id},
        {phone_number: '7(911)337-69-96', surname: 'Мухин', name: 'Антон', middle_name: 'Михайлович', department_id: departments[2].department_id}
    ], {returning: true})

    await Issues.bulkCreate([
        {instance_id: instances[0].instance_id, abonent_id: abonents[3].abonent_id, date_of_issue: new Date('2023-09-01')},
        {instance_id: instances[4].instance_id, abonent_id: abonents[3].abonent_id, date_of_issue: new Date('2023-10-03')},
        {instance_id: instances[1].instance_id, abonent_id: abonents[0].abonent_id, date_of_issue: new Date('2023-10-12')},
        {instance_id: instances[2].instance_id, abonent_id: abonents[1].abonent_id, date_of_issue: new Date('2023-10-15')},
        {instance_id: instances[3].instance_id, abonent_id: abonents[4].abonent_id, date_of_issue: new Date('2023-10-20')}
    ])

    await IssuesArchive.bulkCreate([
        {document_id: documents[5].document_id, abonent_id: abonents[5].abonent_id, date_of_issue: new Date('2010-01-01')},
        {document_id: documents[6].document_id, abonent_id: abonents[6].abonent_id, date_of_issue: new Date('2013-10-18')},
        {document_id: documents[4].document_id, abonent_id: abonents[7].abonent_id, date_of_issue: new Date('2020-11-11')},
        {document_id: documents[4].document_id, abonent_id: abonents[2].abonent_id, date_of_issue: new Date('2022-07-15')},
        {document_id: documents[4].document_id, abonent_id: abonents[4].abonent_id, date_of_issue: new Date('2016-09-24')},
    ])
}