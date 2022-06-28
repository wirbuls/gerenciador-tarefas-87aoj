import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import { DefaultMsgResponse } from '../Types/DefaultMsgResponse';
import mongoose from 'mongoose';

export const connect = (handler: NextApiHandler)=>
async (req: NextApiRequest, res: NextApiResponse <DefaultMsgResponse>)=> {
    console.log('MongoDB readyState',mongoose.connections[0].readyState);
    if(mongoose.connections[0].readyState){
        return handler(req,res);
    }
    
    const DB_CONNECTION_STRING = 'mongodb://localhost:27017/gerenciador-tarefas';

    mongoose.connection.on('connected',()=>console.log('Conectado'));
    mongoose.connection.on('error', err=>console.log('Erro de banco'));
    await mongoose.connect(DB_CONNECTION_STRING);

    return handler(req,res);
}