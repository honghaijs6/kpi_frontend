
import store from '../../../../redux/store';
import { detectForm } from '../../../../hook/before';
import { doLoadSubRegion } from '../../../../hook/ultil';


const REGION_CODE = '79'; // HCM
const SUBREGION_CODE = '760'; // quan 1



class formController {

    constructor(model){
      this.active = false ; /* FOR OPEN MODAL */

      this.state = {
        typeAction:'',
        onAction:'',
        status:''
      }

      this.model = model ;

    }

    _stateDataTemp(){
      return {
        code:'',
        name:'',
        dept:0,
        type:'product',
        contact_name:'',
        company_name:'',
        tax_no:'',
        email:'',
        phone:'',
        address:'',
        region_code:REGION_CODE,
        subregion:SUBREGION_CODE,
        address_2:'',
        note:''
      }
    } 

    loadDistrictList(parent_code,onSuccess){

      const _this = this;
      doLoadSubRegion(parent_code,(res)=>{
        this._whereStateChange({
          onAction:'loadDistrictList'
        })
      })

   }


    onSubmit(){

      const typeAction = this.state.typeAction; /* PUT - POST */

      /* HOOKED detectForm before save data*/
      // -->
      const fields = [
        'code','name','contact_name','company_name','tax_no','phone','address'
      ];

      if(detectForm(fields,this.data)===''){

          //  KIEM TRA TỒN TẠI 
          const CODE = this.data.code;
          let el = document.querySelector("#form-err");

          this.model.axios(typeAction,this.data,(res)=>{
            
            
            this._whereStateChange({
              onAction:'onSubmit',
              status:res.name
            });

          });
          

      }

    }

    onChange(name, e){
      Object.assign(this.data,{ [name]:e.target.value});
      //this.data[name] = e.target.value;
      // --> initial HOW -> WHERE
      //this.processForm(name,e);

    }

    onChangeDist(e){
      const code = e.target.value;
      this.data['subregion_code'] = code ;
      // --> HOW -> WHERE
      //this.processForm('subregion_code',e);



    }

    onChangeCity(e){
       const code = e.target.value;
       this.data['region_code'] = code ;
       // --> HOW -> WHERE
       this.loadDistrictList(code);


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
      this.popover.active =  false;

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
        store.dispatch({
          type:'STATE-'+this.model.model,
          state:this.state
        })
      }

    }

    popover = {
        active:false,

        parent:this,
        btnYes(){


          const id = this.parent.data.id;

          this.parent.model.delete(id,(res)=>{

              this.parent._whereStateChange({
                onAction:'btnYes',
                typeAction:'delete',
                status:res.name
              });

          })

        },

        toggle(){

           this.active = !this.active;
           this.parent._whereStateChange({
             onAction:'toggle_popover'
           })

        }
    }


}

export default formController;
