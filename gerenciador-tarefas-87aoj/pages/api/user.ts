import type {NextApiRequest,NextApiResponse} from 'next';
import {DefaultMsgResponse} from '../../Types/DefaultMsgResponse';
import{connect} from '../../middlewares/connectToMongoDB';
import {UserModel} from '../../models/UserModel';

const registerEndpoint= async(req:NextApiRequest,res:NextApiResponse<DefaultMsgResponse>) => {
    try{
        if(req.method ==='POST'){
            const {name,email,password}= req.body;
            if(!name ||name.trim().length <2){
                return res.status(400).json({error:'Nome nao valido'});
            }
            if(!email ||email.trim().length <5 || !email.includes('@') || !email.includes('.')){
                return res.status(400).json({error:'email nao valido'});
            }
            if(!password ||password.trim().length <5){
                return res.status(400).json({error:'Senha nao valido'});
            }

            const user = {
                name,
                email,
                password
            };
        
            await UserModel.create(user);
              return res.status(201).json({msg:'usuario criado'});
    }
    }catch(e){
        console.log('Erro', e);
        return res.status(500).json({error: 'Nao foi possivel'});
    }
}

export default connect(registerEndpoint);