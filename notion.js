require('dotenv').config();
const { Client } = require("@notionhq/client")

const classesJson = require('./classes.json');

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

async function createClass(titulo, section, url, date) {
  try {
    const response = await notion.pages.create({
        parent: {
            type: 'database_id',
            database_id: databaseId
        },
        properties: {
            "Nome": {
                "title": [{
                    "text": {
                        "content": titulo
                    }
                }]
            },
            "Section": {
                "select": {
                    "name": section
                }
            },
            "Link": {
                "url": url
            },
            "Date": {
                "date": {
                    "start": date
                }
            }
        }
    })
    console.log(response);
  } catch (error) {
    console.error(error.body)
  }
}

async function createSectionClasses(section, baseDate, classArray){
    classArray.forEach(aula => createClass(aula.nome, section, aula.link, `${baseDate}${aula.date}`))
}

createSectionClasses(classesJson[1].sectionName, classesJson[1].sectionBaseDate ,classesJson[1].sectionClasses);

