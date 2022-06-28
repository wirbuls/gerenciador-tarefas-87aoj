import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultMsgResponse } from '../../Types/DefaultMsgResponse';

export default (req:NextApiRequest,res:NextApiResponse<DefaultMsgResponse>)=>{
    if(req.method ==='POST'){
        const{login,password} =req.body;
        if(login ==='gatto@aa.com' && password === '123'){
return res.status(200).json({msg:'Login autenticado!'});
 }
 return res.status(400).json({msg:'Usuario nao encontrado'});
}

    return res.status(405).json({error: 'Metodo informado nao é permitido'});
}