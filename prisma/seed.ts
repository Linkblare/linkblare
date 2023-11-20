import { Collection, PrismaClient } from '@prisma/client';
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

async function seedCollection(){
    
    await prisma.collection.deleteMany();

    try {
        const collections: Collection[] = [];
        for (let index = 0; index < 50; index++) {
            const res = await prisma.collection.create({
                data: {
                  title: faker.lorem.words(3),
                  description: faker.lorem.sentence(),
                  thumbnail: faker.image.url({width: 500, height: 300}),
                  tags: {
                    connectOrCreate: Array(5).fill(null).map(n => faker.word.noun()).map(value => ({
                        where: {name: value},
                        create: {name: value}
                    }))
                  } 
                }
              })
          
              collections.push(res);
              console.log(`Collection {id: ${res.id}, name: ${res.title}} created successfully`);
            
        }
        return collections;

    } catch (error) {
        console.error("Error in seeding collections: ", error)
    }
}


// async function seedItem(collections: Collection[]){
    
// }