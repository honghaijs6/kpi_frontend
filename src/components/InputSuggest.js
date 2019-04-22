
import doFindAll from '../hook/ultil/doFindAll' ; 

import React, { Component } from 'react';
import { Input } from 'reactstrap';


export default class InputSuggest extends Component{

    
    timeID = 2000 ; 
    state = {
        display:'none',
        value:'',
        rows:[],
        selectedIndex:null,
        
    }
    async _onChange(key){

        const resSup = await doFindAll('suppliers',key);
        this.setState({
            display:'block',
            value:key,
            time:0,
            rows: resSup.name === 'success' ? resSup.rows : [] 
        }); 

        
    }
    
    _detectState(){
        if(this.state.time===6){
            this.setState({
                display:'none'
            });
        }
    }
    componentWillUnmount(){
        window.removeEventListener("keyup",this._keyHandling);

        //clearInterval(this.timeID);

    }

    _keyHandling(e){
        
        let index = this.state.selectedIndex === null ? 0 : this.state.selectedIndex ; 

        switch(e.keyCode){
            case 40: // arrow down
                
                
                index = index > 5 ? 0 : index + 1 ; 
                this.setState({
                    selectedIndex:index
                });
                

            break ;
            case 38: // arrow up
                index = index < 0 ? 5 : index - 1 ; 
                this.setState({
                    selectedIndex:index
                });

            break ;
            
            case 13:
                alert('enter me')
            break ;
            
        }

    }
    componentDidMount(){

        window.addEventListener("keyup",this._keyHandling.bind(this));

        /*this.timeID =  setInterval(()=>{
           this.setState({
               time: this.state.time + 1
           });
           this._detectState();     
           
        },1000)*/
    }

    _onSelected(code){
        this.setState({
            display:'none',
            value:code
        });
        if(this.props.onSelected !== undefined){
            this.props.onSelected(code);
        }
    }


    render(){

        
        return(
            <div>
                <Input value={this.state.value} onChange={(e)=>{ this._onChange(e.target.value) }} {...this.props}  type="text" />
                <ul className="suggest-holder" style={{display:this.state.display}} >
                    {
                        this.state.rows.map((item,index)=>{

                            const markSlected = index === this.state.selectedIndex ? 'active' : '' ; 
                            return( 
                                <li className={markSlected} onClick={ ()=>{ this._onSelected(item.code) } } key={item.id}> { item.name } </li>
                            )
                        })
                    }
                </ul>
                
            </div>
        )
    }
}