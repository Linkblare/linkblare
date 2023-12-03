/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Item, type Collection } from '../node_modules/@prisma/client';
import { faker } from '../node_modules/@faker-js/faker'
import { type CreateCollectionInput } from '../src/schema/collection-schema';
import slugify from 'slugify';
import { db as prisma } from "../src/server/db";

function generateCollections(count: number) {
  const collections: CreateCollectionInput[] = [];
  for (let index = 0; index < count; index++) {
    const title = faker.lorem.words(3);
    const collection: CreateCollectionInput = {
      title,
      slug: slugify(title, { lower: true }),
      description: faker.lorem.sentence(),
      thumbnail: faker.image.url({ width: 500, height: 300 }),
      tags: Array(5).fill(null).map(n => faker.word.noun())
    }
    collections.push(collection);
  }
  return collections;
}

function generateItems(count: number, collections: Collection[]) {

  const items = Array(count).fill(null).map(n => {
    const collection = faker.helpers.arrayElement(collections);
    const title = faker.lorem.words(3);
    const item = {
      title,
      slug: slugify(title, { lower: true }),
      description: faker.lorem.sentence(),
      type: 'link',
      content: {
        url: faker.internet.url(),
        originUrl: faker.internet.url()
      },
      thumbnail: faker.image.url({ width: 500, height: 300 }),
      collectionId: collection.id,
      tags: Array(5).fill(null).map(n => faker.word.noun())
    }
    return item;

  })
  return items;
}

async function seedCollection() {

  // await prisma.collection.deleteMany();

  try {
    const forCreate = generateCollections(50);
    const createdCollections: Collection[] = [];

    for (const collection of forCreate) {
      const res = await prisma.collection.create({
        data: {
          ...collection,
          hash: faker.datatype.uuid(),
          tags: {
            connectOrCreate: collection.tags.map(name => ({
                where: { name },
                create: { name }
            }))
        }
        }
      })
      createdCollections.push(res);
    }
    console.log("Collection created: ", createdCollections)
    return createdCollections;

  } catch (error) {
    console.error("Error in seeding collections: ", error)
  }
}


async function seedItem(collections: Collection[]) {
  try {
    
    await prisma.item.deleteMany();
    const createdItems: Item[] = [];
    const forCreate = generateItems(50, collections);
    for (const item of forCreate) {
      const res = await prisma.item.create({
        data: {
          ...item,
          tags: {
  
            connectOrCreate: item.tags.map((name: string) => ({
                where: { name },
                create: { name },
            }))}
        }
      })
      createdItems.push(res);
    }
  } catch (error) {
    console.error("Error in seeding items: ", error)
  }
}

async function main() {
  const collections = await seedCollection();
  if(collections) {
    await seedItem(collections);
  }
}

void main();