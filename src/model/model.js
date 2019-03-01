
/* MODEL NÀY CÓ THỂ KẾT NỐI VỚI REDUX - MOBX để luu cache database dùng lại*/

/*
MODEL : MAKE RESFUL API

    TRIGGER AFFTER DONE WITH DATABASE
    - SAVE PRIVATE DATA
    - SAVE GLOBAL DATA
          on POST
          on PUT
          on DELETE

    -> TRIGGER FOR MAIN DATACHANGE
    -> TRIGGER ON ACTION GET ERROR
*/


import store from '../redux/store';
import LocalData from './localData';


class Model {


  constructor(model){


    this.model = model; // string

    this.data = [];
    this.state = {}

    //this.status = {}; /* keep context data on doing POST - PUT  */
    //this.type = ''; /* type : http: method */
    //this.res = {};

    /* initial WHO */
    this.setup();


  }

  setup(){
    this.localData = new LocalData(this.model);


    this.listenOnSocketTick();
    this.listenDataChange();

    this.data = this.localData.list;
  }


  /* WHEN */
  /* start listen to socket server -> save LocalData -> send to reducers
    tren cung 1 may tinh se ko cap nhat socket realtime
  */

  axios(method,data={},onSuccess){

    switch (method) {
      case 'post':
          this.post(data,onSuccess);
      break;
      case 'put':

          const id = data.id;
          this.put(id,data,onSuccess);
      break;

    }

  }

  /* [id1,id2,id3] */
  deleteMulti(list=[]){



    if(list.length>0){

      const id = list[0].id;
      this.delete(id,(res)=>{
        if(res.name==='success'){
          let newlist = list.filter((item) => { return parseInt(item.id) !== parseInt(id) })
          this.deleteMulti(newlist);
        }
      })
    }

  }

  delete(id,onSuccess){

      this.localData.delete(id,(res)=>{
        this.listenDataChange()
        onSuccess(res)
      });

  }

  post(data,onSuccess){

    this.localData.post(data,(res)=>{
      this.listenDataChange()
      onSuccess(res.data);
    })

  }

  put(id,data,onSuccess){


      const _this = this ;
      this.localData.put(id,data,(res)=>{
          _this.listenDataChange();
          onSuccess(res);

      })

  }


  goto(p=0,onSuccess){



    this.localData.goto(p,(res)=>{
      this.listenDataChange();
      onSuccess(res);
    })

  }

  pre(onSuccess){

    this.localData.pre((res)=>{
      this.listenDataChange();
      onSuccess(res);
    })

  }
  next(onSuccess){

      this.localData.next((res)=>{

        this.listenDataChange();
        onSuccess(res);
      })

  }


  load(){


    this.localData.data.length === 0 ? this.localData.fetch((res)=>{ this.listenDataChange(); }) : this.listenDataChange();;

  }
  get(onSuccess){


      this.localData.fetch((res)=>{
        this.listenDataChange();
        onSuccess(res.data)
      })


  }

  listenOnSocketTick(){

    const _this = this ;
    /*  START REALTIME  */
    this.localData.listenOnSocketTick((res,list)=>{

       this.socketResp(res,list)

     });
  }
  listenDataChange(){
    this.localData.listenDataChange((res)=>{
       this.restResp(res);
    })
  }
  /* END WHEN*/

  /**** HOW ***/
  restResp(res){



    this.whereStateChange({
      type:this.localData.db.type+'-'+this.model,
      list:res.list,
      res:res.res
    })

  }
  socketResp(res,list){
    if(this.localData.jwt !== res.token){

      this.whereStateChange({
        type:'reset-'+res.model,
        list:list,
        res:res
      })

    }
  }
  /**** END HOW *****/

  /******WHERE*******/
  whereStateChange(newState){


    Object.assign(this.state,newState);


    store.dispatch(newState);


  }
  /*********END WHERE*************/

  set(name,value){
    this.localData.resetConfigDB(name,value);
  }


  getData(name){
    name = name || this.model;
    return this.data[name];
  }

}

export default Model
