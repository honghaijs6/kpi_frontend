
import { detectForm } from '../../../../hook/before';

class formController {

    constructor(model,dispatcher=null){
      this.active = false ; /* FOR OPEN MODAL */

      this.state = {
        typeAction:'',
        onAction:'',
        status:''
      }

      this.model = model ;
      this.dispatcher = dispatcher || null ;

    }

    _stateDataTemp(){
      return {
        code:'',
        name:'',
        is_serial:0,
        categories_id:0,
        supplier_codes:'',
        price_1:0,
        price_2:0,
        price_3:0,
        price_4:0,
        unit:'',
        type:'main',
        images:'',
        content:''
      }
    }

    onSubmit(){

      const typeAction = this.state.typeAction; /* PUT - POST */
      /* HOOKED detectForm before save data*/
      // -->
      const fields = [
        'code','name','price_1','price_2','price_3','price_4'
      ];
      
      /*if(detectForm(fields,this.data)===''){

          this.model.axios(typeAction,this.data,(res)=>{
            // -->
            this._whereStateChange({
              onAction:'onSubmit',
              status:res.name
            });

          })
      }*/

    }

    onChange(name, value){
      //Object.assign(this.data,{ [name]:e.target.value});
      Object.assign(this.data,{ [name]:value});
      //this.data[name] = e.target.value;
      // --> initial HOW -> WHERE
      this.processForm(name,value);
    }

    /* START : HOW */
    open(typeAction, info){

      //const {temp} = info || FORM_TEMP ;
      this.data = info || this._stateDataTemp() ;
      this.active = true ;

      this._whereStateChange({
        typeAction:typeAction,
        onAction:'open',
        status:'opened'
      });

    }

    processForm(name,e){
       //-->
       this._whereStateChange({
         onAction:'processForm'
       });

    }


    toggle(){

      this.active = !this.active;

      // -->
      this._whereStateChange({
        onAction:'toggle_modal'
      })


    }

    /* START : WHERE */
    _whereStateChange(newState={}){

      Object.assign(this.state,newState);

      if(newState.status ==='success'){
        this.toggle()
      }else{
        //alert('FORM-'+this.model.model);
        this.dispatcher({
          type:'STATE-'+this.model.model,
          state:this.state
        })
      }

    }


}

export default formController;
