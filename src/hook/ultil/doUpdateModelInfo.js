import axios from 'axios';
import server from '../../config/server' ; 

import {preLoad} from '../before' ; 


const doUpdateModelInfo = (strModel=null,data={})=>{

    let ret = {
        name:'hook-error',  
        message:''
    }

    return new Promise((resolve,reject)=>{

        if(strModel !==null && JSON.stringify(data)!=={}){
            
            if(data.id !== undefined){
                const id = data.id ;     
                
                const url = server.base() + '/' + strModel + '?id='+id;
                
                preLoad('put');
                

                axios.put(url,data,server.setHeader())
                    .then((res)=>{
                        
                        
                        ret = {
                            name:'success',
                            message:'',
                            res:res 
                        }
                        resolve(ret) ; 

                        preLoad('stop'); 


                    },(error)=>{

                        ret.message = 'Đã có lỗi update xảy ra';
                        console.log(ret);
                        
                        resolve(ret) ; 
                        preLoad('stop'); 

                })
            }else{  
                ret.message = 'Thiếu gia trị ID ';
                resolve(ret); 

            }   
                        
        }else{
            resolve(ret);
        }
        
    })

}

export default doUpdateModelInfo ; 