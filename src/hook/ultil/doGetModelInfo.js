
import axios from 'axios';
import server from '../../config/server';


export default function(MODEL=null,id=0){

    return new Promise((resolve,reject)=>{
        
        const url = server.base()+'/products?id='+id;

        axios.get(url)
            .then((res) => {
                //this.restResp(res); // KHÔNG LUU localStorage

                res = res.data ;
                if(res.name==='success'){
                    resolve(res.rows[0]);
                }
                
            },
            (error) => {

                var status = error.response.status;
                alert(JSON.stringify(error));

            }
        );
    })

}