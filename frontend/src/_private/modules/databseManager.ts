import {PrismaClient} from '@prisma/client';
export default class DatabaseManager {
    
    public static db = new PrismaClient()
    
}